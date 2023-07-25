'use client'

import { Footer } from "@/component/base/footer"
import { Navbar } from "@/component/base/navbar"
import { Routes } from "@/routes/routes"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const [showNavbar, setShowNavbar] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        switch (pathname) {
            case Routes.HomePage:
                setShowNavbar(true)
                break
            case Routes.ProfilePage:
                setShowNavbar(true)
                break
            case Routes.GovermentPage:
                setShowNavbar(true)
                break
            case Routes.NewsPage:
                setShowNavbar(true)
                break
            case Routes.InformationPage:
                setShowNavbar(true)
                break
            case Routes.ServicesPage:
                setShowNavbar(true)
                break
            case Routes.ProductPage:
                setShowNavbar(true)
                break
            default:
                setShowNavbar(false)
                break
        }
        
        if(pathname.startsWith(Routes.NewsPage)){
            setShowNavbar(true)
        }else if(pathname.startsWith(Routes.ProfilePage)){
            setShowNavbar(true)
        }else if(pathname.startsWith(Routes.UserPage)){
            setShowNavbar(true)
        }
        
    }, [pathname])

    return (
        <div>
            {showNavbar && <Navbar />}
            {children}
            <Footer />
        </div>
    )
}
