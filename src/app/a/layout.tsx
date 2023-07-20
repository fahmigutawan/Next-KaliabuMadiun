'use client'

import {useContext, useEffect} from "react";
import {AppContext} from "@/context/provider";
import {usePathname, useRouter} from "next/navigation";
import {Routes} from "@/routes/routes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const repository = useContext(AppContext).repository
    const pathname = usePathname()
    const router = useRouter()

    // useEffect(() => {
    //     if(!repository.adminIsLogin()){
    //         router.push(Routes.HomePage)
    //     }
    // },[pathname])

    return (
        <div>
            {children}
        </div>
    )
}