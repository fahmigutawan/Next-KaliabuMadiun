'use client'

import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/provider";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/routes/routes";
import { AdminNav } from "@/component/base/adminnav";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const repository = useContext(AppContext).repository
    const pathname = usePathname()
    const router = useRouter()
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        if(!isChecked){
            onAuthStateChanged(
                repository.auth,
                (user) => {
                    if (!user) {
                        toast.error("Harap login terlebih dahulu")
                        router.push("/a/login")
                    }

                    setIsChecked(true)
                })
        }
    }, [isChecked])

    useEffect(() => {
        setIsChecked(false)
    }, [pathname])

    

    return (
        <div>
            {pathname.includes("/a/login") ?
                "" : <AdminNav />
            }
            {children}
        </div>
    )
}