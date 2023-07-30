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
            <head>
                <link rel="icon" href="/kab_madiun.png" sizes="any" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#ffffff" />
                <title>Website Resmi Desa Kaliabu, Madiun</title>
                <meta name="description" content="Website Resmi Desa Kaliabu, Madiun" />
                <meta name="keywords" content="Website Resmi Desa Kaliabu, Madiun" />
                <meta name="author" content="Kaliabu Madiun" />
                <meta name="application-name" content="Website Resmi Desa Kaliabu, Madiun" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-title"
                    content="Website Resmi Desa Kaliabu, Madiun"
                />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="robots" content="index, follow" />
            </head>
            <AppProvider>
                <body className={`h-[100vh] bg-white`}>
                    {children}
                    <Toaster />
                </body>
            </AppProvider>
        </html>
    )
}
