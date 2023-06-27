import {FirebaseApp, initializeApp} from "firebase/app";
import {Auth, getAuth} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore";

class Repository {
    fbAuth: Auth
    fbFirestore: Firestore

    constructor() {
        const app = initializeApp(
            {
                apiKey: process.env.NEXT_FIREBASE_apiKey,
                authDomain: process.env.NEXT_FIREBASE_authDomain,
                projectId: process.env.NEXT_FIREBASE_projectId,
                storageBucket: process.env.NEXT_FIREBASE_storageBucket,
                messagingSenderId: process.env.NEXT_FIREBASE_messagingSenderId,
                appId: process.env.NEXT_FIREBASE_appId
            }
        )

        this.fbAuth = getAuth(app)
        this.fbFirestore = getFirestore(app)
    }
}