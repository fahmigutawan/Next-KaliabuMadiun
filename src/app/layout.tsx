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
    return (
        <html lang="en">
            <AppProvider>
                <body className={`h-[100vh] bg-white`}>
                    {children}
                    <Toaster/>
                </body>
            </AppProvider>
        </html>
    )
}
