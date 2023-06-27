/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_FIREBASE_apiKey:process.env.NEXT_FIREBASE_apiKey,
        NEXT_FIREBASE_authDomain:process.env.NEXT_FIREBASE_authDomain,
        NEXT_FIREBASE_projectId:process.env.NEXT_FIREBASE_projectId,
        NEXT_FIREBASE_storageBucket:process.env.NEXT_FIREBASE_storageBucket,
        NEXT_FIREBASE_messagingSenderId:process.env.NEXT_FIREBASE_messagingSenderId,
        NEXT_FIREBASE_appId:process.env.NEXT_FIREBASE_appId
    }
}

module.exports = nextConfig
