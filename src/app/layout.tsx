'use client'

import '../globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from "@/context/provider";
import { Navbar } from '@/component/base/navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <AppProvider>
                <body className={`${inter.className} h-[100vh] bg-white`}>
                    <Navbar />
                    {children}
                </body>
            </AppProvider>
        </html>
    )
}
