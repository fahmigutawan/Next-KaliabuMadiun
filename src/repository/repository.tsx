import {initializeApp} from "@firebase/app";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithPhoneNumber,
    signInWithEmailAndPassword
} from 'firebase/auth'
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
import {
    addDoc,
    collection,
    deleteDoc,
    doc, getDoc,
    getDocs,
    getFirestore, limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc, startAfter,
    updateDoc
} from 'firebase/firestore'
import imageCompression from 'browser-image-compression';
import {toast} from 'react-hot-toast'
import {randomUUID} from "crypto";
import {BannerResponse} from "@/model/response/home-banner/banner-response";
import {NewsResponse} from "@/model/response/news/news-response";


const fbApp = initializeApp(
    {
        apiKey: process.env.NEXT_FIREBASE_apiKey,
        authDomain: process.env.NEXT_FIREBASE_authDomain,
        projectId: process.env.NEXT_FIREBASE_projectId,
        storageBucket: process.env.NEXT_FIREBASE_storageBucket,
        messagingSenderId: process.env.NEXT_FIREBASE_messagingSenderId,
        appId: process.env.NEXT_FIREBASE_appId
    }
)

function create_UUID() {
    var dt = new Date().getTime();
    var uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export class Repository {
    auth = getAuth(fbApp)
    storage = getStorage(fbApp)
    firestore = getFirestore(fbApp)

    private homeBannerRef = (filename: string) => {
        return ref(this.storage, `home-banner/${filename}.jpg`)
    }
    private newsThumbnailRef = (filename: string) => {
        return ref(this.storage, `news-thumbnail/${filename}.jpg`)
    }

    async signInWithGoogle() {
        return await signInWithPopup(this.auth, new GoogleAuthProvider())
    }

    /**USERS API*/
    async getAllBanner(): Promise<BannerResponse[]> {
        return (
            await getDocs(
                query(
                    collection(this.firestore, 'home-banner'),
                    orderBy('created_at', 'desc')
                )
            )).docs.map(res => {
            const s: BannerResponse = {
                id: res.data()['id'],
                img_url: res.data()['url'],
                link: res.data()['link'],
                title: res.data()['title'],
                description: res.data()['description']
            }

            return s
        })
    }

    async getLast3News(): Promise<NewsResponse[]> {
        return (
            await getDocs(
                query(
                    collection(this.firestore, 'news'),
                    orderBy('created_at', 'desc'),
                    limit(3)
                )
            )
        ).docs.map(res => {
            const s: NewsResponse = {
                id: res.data()['id'],
                title: res.data()['title'],
                content: res.data()['content'],
                thumbnail: res.data()['thumbnail']
            }

            return s
        })
    }

    getFirstPageNews(
        onSuccess: (data: NewsResponse[]) => void,
        onFailed: (err: Error) => void
    ){
        getDocs(
            query(
                collection(this.firestore, 'news'),
                orderBy('created_at', 'desc'),
                limit(4)
            )
        ).then(res2 => {
            onSuccess(
                res2.docs.map(res => {
                    const s: NewsResponse = {
                        id: res.data()['id'],
                        title: res.data()['title'],
                        content: res.data()['content'],
                        thumbnail: res.data()['thumbnail']
                    }

                    return s
                })
            )
        }).catch((err:Error) => {
            onFailed(err)
        })
    }

    getNextPageNews(
        last_id: string,
        onSuccess: (data: NewsResponse[]) => void,
        onFailed: (err: Error) => void
    ) {
        getDoc(
            doc(this.firestore, 'news', last_id)
        ).then(res => {
            const last_created_at = res.get("created_at")

            getDocs(
                query(
                    collection(this.firestore, 'news'),
                    orderBy('created_at', 'desc'),
                    startAfter(last_created_at),
                    limit(4)
                )
            ).then(res2 => {
                onSuccess(
                    res2.docs.map(res => {
                        const s: NewsResponse = {
                            id: res.data()['id'],
                            title: res.data()['title'],
                            content: res.data()['content'],
                            thumbnail: res.data()['thumbnail']
                        }

                        return s
                    })
                )
            })
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    /**ADMIN API*/
    adminAddHomeBanner(image: File, link: string, title: string, description: string, onSuccess: () => void) {
        toast.loading("Sedang mengunggah...")

        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1024,
        }

        imageCompression(image, options)
            .then((compressedFile) => {
                const randomizedUID = create_UUID()
                const ref = this.homeBannerRef(randomizedUID)

                uploadBytes(ref, compressedFile).then(() => {
                    getDownloadURL(ref).then(url => {
                        const id = randomizedUID
                        const ref = doc(this.firestore, 'home-banner', id)
                        setDoc(ref, {
                            id: id,
                            url: url,
                            link: link,
                            title: title,
                            description: description,
                            created_at: serverTimestamp()
                        }).then(() => {
                            toast.dismiss()
                            toast.success("Berhasil diunggah")
                            onSuccess()
                        })
                    })
                }).catch((err: Error) => {
                    toast.dismiss()
                    toast.error(err.message)
                })
            })
    }

    adminUpdateHomeBanner(
        id: string,
        link: string,
        title: string,
        description: string,
        onSuccess: () => void
    ) {
        const ref = doc(
            this.firestore,
            'home-banner',
            id
        )

        updateDoc(
            ref,
            {
                title: title,
                link: link,
                description: description
            }
        ).then(() => {
            onSuccess()
        })
    }

    adminDeleteHomeBanner(
        id: string,
        onSuccess: () => void
    ) {
        const ref = doc(
            this.firestore,
            'home-banner',
            id
        )

        deleteDoc(ref).then(() => {
            onSuccess()
        })
    }

    adminAddNews(
        thumbnailFile: File,
        title: string,
        content: string,
        onSucces: () => void,
        onFailed: (err: Error) => void
    ) {
        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1024,
        }

        imageCompression(thumbnailFile, options)
            .then(compressed => {
                const randomizedUID = create_UUID()
                const ref = this.newsThumbnailRef(randomizedUID)

                uploadBytes(ref, compressed).then(res => {
                    getDownloadURL(ref).then(url => {
                        const id = randomizedUID
                        const docRef = doc(this.firestore, 'news', id)

                        setDoc(docRef, {
                            id: id,
                            title: title,
                            thumbnail: url,
                            content: content,
                            created_at: serverTimestamp()
                        }).then(() => {
                            onSucces()
                        })
                    })
                })
            })
            .catch((err: Error) => {
                onFailed(err)
            })
    }

    adminUpdateNews(
        id: string,
        title: string,
        content: string,
        onSuccess: () => void,
        onFailed:(err:Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'news',
            id
        )

        updateDoc(
            ref,
            {
                title: title,
                content:content
            }
        ).then(() => {
            onSuccess()
        }).catch((err:Error) => {
            onFailed(err)
        })
    }

    adminDeleteNews(
        id: string,
        onSuccess: () => void,
        onFailed:(err:Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'news',
            id
        )

        deleteDoc(ref).then(() => {
            onSuccess()
        }).catch((err:Error) => {
            onFailed(err)
        })
    }

    adminEditTentangDesa(
        content:string
    ){
        const ref = doc(
            this.firestore,
            'tentang',
            'item'
        )

        updateDoc(
            ref,
            {
                content:content,
                updated_at:serverTimestamp()
            }
        )
    }

    adminEditSejarahDesa(
        content:string
    ){
        const ref = doc(
            this.firestore,
            'sejarah',
            'item'
        )

        updateDoc(
            ref,
            {
                content:content,
                updated_at:serverTimestamp()
            }
        )
    }


    async adminLogin(
        email: string,
        password: string
    ) {
        return await signInWithEmailAndPassword(
            this.auth,
            email,
            password
        )
    }

    adminIsLogin() {
        return this.auth.currentUser != null
    }

}