'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {Routes} from "@/routes/routes";

export default function RegisterPage(){
    const router = useRouter()

    useEffect(() => {
        router.push(Routes.LoginPage)
    }, [])
}