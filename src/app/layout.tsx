'use client'

import '../globals.css'
import { Poppins } from 'next/font/google'
import { AppProvider } from "@/context/provider";
import { Navbar } from '@/component/base/navbar';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Routes } from '@/routes/routes';
import '@fontsource/poppins'
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [showNavbar, setShowNavbar] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        console.log("PATHNAME => " + pathname)
        switch(pathname){
            case Routes.HomePage:
                setShowNavbar(true)
                break
            case Routes.ProfilePage:
                setShowNavbar(true)
                break
            case Routes.GovermentPage:
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
    }, [pathname])

    return (
        <html lang="en">
            <AppProvider>
                <body className={`h-[100vh] bg-white`}>
                    {showNavbar && <Navbar />}
                    {children}
                    <Toaster/>
                </body>
            </AppProvider>
        </html>
    )
}
