import { initializeApp } from "@firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import {addDoc, collection, doc, getDocs, getFirestore, setDoc} from 'firebase/firestore'
import imageCompression from 'browser-image-compression';
import {toast} from 'react-hot-toast'
import { randomUUID } from "crypto";
import { AllBannerResponse } from "@/model/response/home-banner/all-banner-response";


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

function create_UUID(){
    var dt = new Date().getTime();
    var uuid:string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export class Repository {
    auth = getAuth(fbApp)
    storage = getStorage(fbApp)
    firestore = getFirestore(fbApp)
    
    private homeBannerRef = (filename:string) => {return ref(this.storage, `home-banner/${filename}.jpg`)}

    async signInWithGoogle() {
        return await signInWithPopup(this.auth, new GoogleAuthProvider())
    }

    adminAddHomeBanner(image: File, link:string, title:string, description:string, onSuccess:() => void) {
        toast.loading("Sedang mengunggah...")

        const options = {
            maxSizeMB: 1.5,
            maxWidthOrHeight: 1024,
        }

        imageCompression(image, options)
            .then( (compressedFile) => {
                const randomizedUID = create_UUID()
                const ref = this.homeBannerRef(randomizedUID)

                uploadBytes(ref, compressedFile).then(() => {
                    getDownloadURL(ref).then(url => {
                        const id = create_UUID()
                        const ref = doc(this.firestore, 'home-banner', id)
                        setDoc(ref, {
                            id:id,
                            url:url,
                            link:link,
                            title:title,
                            description:description
                        }).then(() => {
                            toast.dismiss()
                            toast.success("Berhasil diunggah")
                            onSuccess()
                        })
                    })
                }).catch((err:Error) => {
                    toast.dismiss()
                    toast.error(err.message)
                })
            })
    }

    async getAllBanner():Promise<AllBannerResponse[]>{
        return (await getDocs(collection(this.firestore, 'home-banner'))).docs.map(res => {
            const s:AllBannerResponse = {
                id: res.data()['id'],
                img_url: res.data()['url'],
                link: res.data()['link'],
                title: res.data()['title'],
                description: res.data()['description']
            }

            return s
        })
    }
}