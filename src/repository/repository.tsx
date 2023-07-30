import { initializeApp } from "@firebase/app";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithPhoneNumber,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
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
import { toast } from 'react-hot-toast'
import { randomUUID } from "crypto";
import { BannerResponse } from "@/model/response/home-banner/banner-response";
import { NewsResponse } from "@/model/response/news/news-response";
import { TentangResponse } from "@/model/response/tentang/tentang-response";
import { SejarahResponse } from "@/model/response/sejarah/sejarah-response";
import { GeoDemoResponse } from "@/model/response/geo-demo/geo-demo-response";
import { GalleryResponse } from "@/model/response/gallery/gallery-response";
import { SopResponse } from "@/model/response/sop/SopResponse";


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
    private sopPdfRef = (filename: string) => {
        return ref(this.storage, `sop-desa/${filename}.pdf`)
    }
    private galleryItemRef = (filename: string) => {
        return ref(this.storage, `gallery/${filename}.jpg`)
    }
    private geoStorageRef = () => {
        return ref(this.storage, `gallery/geo.jpg`)
    }
    private demoStorageRef = () => {
        return ref(this.storage, `gallery/demo.jpg`)
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
    ) {
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
        }).catch((err: Error) => {
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

    getTentangDesa(
        onSuccess: (item: TentangResponse) => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'tentang',
            'item'
        )

        getDoc(ref)
            .then(res => {
                onSuccess(
                    {
                        content: res.get('content')
                    }
                )
            })
            .catch((err: Error) => {
                onFailed(err)
            })
    }

    getSejarahDesa(
        onSuccess: (item: SejarahResponse) => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'sejarah',
            'item'
        )

        getDoc(ref)
            .then(res => {
                onSuccess(
                    {
                        content: res.get('content')
                    }
                )
            })
            .catch((err: Error) => {
                onFailed(err)
            })
    }

    getGeoDemoDesa(
        onSuccess: (item: GeoDemoResponse) => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'geo-demo',
            'item'
        )

        getDoc(ref)
            .then(res => {
                onSuccess(
                    {
                        geo_url: res.get('geo_url'),
                        geo_content: res.get('geo_content'),
                        demo_url: res.get('demo_url'),
                        demo_content: res.get('demo_content')
                    }
                )
            })
            .catch((err: Error) => {
                onFailed(err)
            })
    }

    getNewsById(
        id: string,
        onSuccess: (data: NewsResponse) => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'news',
            id
        )

        getDoc(ref)
            .then(res => {
                onSuccess(
                    {
                        id: res.get('id'),
                        title: res.get('title'),
                        content: res.get('content'),
                        thumbnail: res.get('thumbnail')
                    }
                )
            })
            .catch((err: Error) => {
                onFailed(err)
            })
    }

    getTopGalleryItems(
        onSuccess: (item: GalleryResponse[]) => void,
        onFailed: (err: Error) => void
    ) {
        getDocs(
            query(
                collection(this.firestore, 'gallery'),
                orderBy('created_at', 'desc'),
                limit(6)
            )
        ).then(res => {
            onSuccess(
                res.docs.map(res2 => {
                    const s: GalleryResponse = {
                        id: res2.data()['id'],
                        url: res2.data()['url'],
                        description: res2.data()['description'],
                        taken_at: res2.data()['taken_at']
                    }

                    return s
                })
            )
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    getFirstGalleryPage(
        onSuccess: (item: GalleryResponse[]) => void,
        onFailed: (err: Error) => void
    ) {
        getDocs(
            query(
                collection(this.firestore, 'gallery'),
                orderBy('created_at', 'desc'),
                limit(8)
            )
        ).then(res => {
            onSuccess(
                res.docs.map(res2 => {
                    const s: GalleryResponse = {
                        id: res2.data()['id'],
                        url: res2.data()['url'],
                        description: res2.data()['description'],
                        taken_at: res2.data()['taken_at']
                    }

                    return s
                })
            )
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    getNextGalleryPage(
        lastId: string,
        onSuccess: (item: GalleryResponse[]) => void,
        onFailed: (err: Error) => void
    ) {
        getDoc(
            doc(
                this.firestore,
                'gallery',
                lastId
            )
        ).then(s => {
            const last_created_at = s.get("created_at")

            getDocs(
                query(
                    collection(this.firestore, 'gallery'),
                    orderBy('created_at', 'desc'),
                    startAfter(last_created_at),
                    limit(8)
                )
            ).then(res => {
                onSuccess(
                    res.docs.map(res2 => {
                        const s: GalleryResponse = {
                            id: res2.data()['id'],
                            url: res2.data()['url'],
                            description: res2.data()['description'],
                            taken_at: res2.data()['taken_at']
                        }

                        return s
                    })
                )
            }).catch((err: Error) => {
                onFailed(err)
            })
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    getFirstSopDesa(
        onSuccess: (item: SopResponse[]) => void,
        onFailed: (err: Error) => void
    ) {
        getDocs(
            query(
                collection(this.firestore, 'sop-desa'),
                orderBy('created_at', 'desc'),
                limit(20)
            )
        ).then(res => {
            onSuccess(
                res.docs.map(res2 => {
                    const s: SopResponse = {
                        id: res2.data()['id'],
                        url: res2.data()['url'],
                        title: res2.data()['title']
                    }

                    return s
                })
            )
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    getNextSopDesa(
        lastId: string,
        onSuccess: (item: SopResponse[]) => void,
        onFailed: (err: Error) => void
    ) {
        getDoc(
            doc(
                this.firestore,
                'sop-desa',
                lastId
            )
        ).then(s => {
            const last_created_at = s.get("created_at")

            getDocs(
                query(
                    collection(this.firestore, 'sop-desa'),
                    orderBy('created_at', 'desc'),
                    startAfter(last_created_at),
                    limit(8)
                )
            ).then(res => {
                onSuccess(
                    res.docs.map(res2 => {
                        const s: SopResponse = {
                            id: res2.data()['id'],
                            url: res2.data()['url'],
                            title: res2.data()['title'],
                        }

                        return s
                    })
                )
            }).catch((err: Error) => {
                onFailed(err)
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

        deleteObject(
            this.homeBannerRef(id)
        ).then(() => {
            deleteDoc(
                ref
            ).then(() => {
                onSuccess()
            })
        }).catch((err: Error) => {
            //HANDLE ERROR LATER
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
        onFailed: (err: Error) => void
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
                content: content
            }
        ).then(() => {
            onSuccess()
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    adminDeleteNews(
        id: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'news',
            id
        )

        deleteObject(
            this.newsThumbnailRef(id)
        ).then(() => {
            deleteDoc(
                ref
            ).then(() => {
                onSuccess()
            }).catch((err: Error) => {
                onFailed(err)
            })
        }).catch((err: Error) => {
            onFailed(err)
        })

    }

    adminEditTentangDesa(
        content: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'tentang',
            'item'
        )

        updateDoc(
            ref,
            {
                content: content,
                updated_at: serverTimestamp()
            }
        ).then(() => {
            onSuccess()
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    adminEditSejarahDesa(
        content: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'sejarah',
            'item'
        )

        updateDoc(
            ref,
            {
                content: content,
                updated_at: serverTimestamp()
            }
        ).then(() => {
            onSuccess()
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    adminEditGeoDemoDesa(
        geo_photo: File,
        geo_content: string,
        demo_photo: File,
        demo_content: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        const ref = doc(
            this.firestore,
            'geo-demo',
            'item'
        )

        const geoStorageRef = this.geoStorageRef()

        const demoStorageRef = this.demoStorageRef()

        uploadBytes(
            geoStorageRef,
            geo_photo
        ).then(() => {
            uploadBytes(
                demoStorageRef,
                demo_photo
            ).then(() => {
                getDownloadURL(geoStorageRef)
                    .then((geo_url) => {
                        getDownloadURL(demoStorageRef)
                        .then((demo_url) => {
                            updateDoc(
                                ref,
                                {
                                    geo_url: geo_url,
                                    geo_content: geo_content,
                                    demo_url: demo_url,
                                    demo_content: demo_content,
                                    updated_at: serverTimestamp()
                                }
                            ).then(() => {
                                onSuccess()
                            }).catch((err: Error) => {
                                onFailed(err)
                            })
                        }).catch((err:Error) => {
                            onFailed(err)
                        })
                    }).catch((err: Error) => {
                        onFailed(err)
                    })
            }).catch((err: Error) => {
                onFailed(err)
            })
        }).catch((err: Error) => {
            onFailed(err)
        })
    }

    adminAddSopDesa(
        file: File,
        title: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        const randomized_id = create_UUID()
        const ref = this.sopPdfRef(randomized_id)

        uploadBytes(ref, file)
            .then(() => {
                getDownloadURL(ref)
                    .then(url => {
                        setDoc(
                            doc(this.firestore, 'sop-desa', randomized_id),
                            {
                                id: randomized_id,
                                title: title,
                                url: url,
                                created_at: serverTimestamp()
                            }
                        ).then(() => {
                            onSuccess()
                        }).catch((err: Error) => {
                            onFailed(err)
                        })
                    }).catch((err: Error) => {
                        onFailed(err)
                    })
            })
            .catch((err: Error) => {
                onFailed(err)
            })
    }

    adminDeleteSopDesa(
        id: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        deleteObject(
            this.sopPdfRef(id)
        ).then(() => {
            deleteDoc(
                doc(this.firestore, 'sop-desa', id)
            ).then(() => {
                onSuccess()
            }).catch((err: Error) => {
                onFailed(err)
            })
        }).catch((err: Error) => {
            onFailed(err)
        })
    }


    adminLogin(
        email: string,
        password: string,
        onSuccess:() => void,
        onFailed:(err:Error) => void
    ) {
        signInWithEmailAndPassword(
            this.auth,
            email,
            password
        ).then(() => {
            onSuccess()
        }).catch((err:Error) => {
            onFailed(err)
        })
    }

    adminLogout(
        onSuccess:() => void,
        onFailed:(err:Error) => void
    ){
        signOut(
            this.auth
        ).then(() => {
            onSuccess()
        }).catch((err:Error) => {
            onFailed(err)
        })
    }

    adminAddGalleryItem(
        file: File,
        content: string,
        taken_at: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        const randomized_id = create_UUID()

        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1024,
        }

        imageCompression(file, options)
            .then(compressed => {
                const ref = doc(
                    this.firestore,
                    'gallery',
                    randomized_id
                )

                uploadBytes(
                    this.galleryItemRef(randomized_id),
                    compressed
                ).then(r => {
                    getDownloadURL(
                        this.galleryItemRef(randomized_id)
                    ).then(url => {
                        setDoc(
                            ref,
                            {
                                id: randomized_id,
                                url: url,
                                description: content,
                                taken_at: taken_at,
                                created_at: serverTimestamp()
                            }
                        ).then(() => {
                            onSuccess()
                        }).catch((err: Error) => {
                            onFailed(err)
                        })
                    }).catch((err: Error) => {
                        onFailed(err)
                    })
                }).catch((err: Error) => {
                    onFailed(err)
                })
            })
            .catch((err: Error) => {
                onFailed(err)
            })
    }

    adminDeleteGalleryItem(
        id: string,
        onSuccess: () => void,
        onFailed: (err: Error) => void
    ) {
        const docRef = doc(
            this.firestore,
            'gallery',
            id
        )
        deleteObject(
            this.galleryItemRef(id)
        ).then(() => {
            deleteDoc(
                docRef
            ).then(() => {
                onSuccess()
            }).catch((err: Error) => {
                onFailed(err)
            })
        }).catch((err: Error) => {
            onFailed(err)
        })
    }
}