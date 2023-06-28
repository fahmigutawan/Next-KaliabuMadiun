import {initializeApp} from "@firebase/app";
import {getAuth, RecaptchaVerifier, signInWithPopup, GoogleAuthProvider, signInWithPhoneNumber} from 'firebase/auth'

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

export class Repository {
    auth = getAuth(fbApp)

    async signInWithGoogle() {
        return await signInWithPopup(this.auth, new GoogleAuthProvider())
    }
}