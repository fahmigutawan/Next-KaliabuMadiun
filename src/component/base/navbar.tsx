'use client'

import { Routes } from "@/routes/routes"
import { Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavbarItem = {
    word: string,
    route: string
}

export const Navbar = () => {
    const pathname = usePathname()
    const navbarItems: NavbarItem[] = [
        {
            word: 'BERANDA',
            route: Routes.HomePage
        },
        {
            word: 'PROFIL',
            route: Routes.ProfilePage
        },
        {
            word: 'PEMERINTAHAN',
            route: Routes.GovermentPage
        },
        {
            word: 'INFORMASI',
            route: Routes.InformationPage
        },
        {
            word: 'LAYANAN',
            route: Routes.ServicesPage
        },
        {
            word: 'PRODUK UNGGULAN',
            route: Routes.ProductPage
        }
    ]

    return (
        <div className='w-full h-[120px] px-[48px] bg-white flex items-center justify-between shadow-sm'>
            <Link href={Routes.HomePage} className='flex items-center space-x-[16px]'>
                <img src='/images/kab_madiun.png' alt="" className='w-[70px]' />
                <div>
                    <p
                        className='text-black text-[14px] font-semibold'
                    >Desa Kaliabu</p>
                    <p
                        className='text-black text-[14px] font-normal'
                    >Kabupaten Madiun</p>
                </div>
            </Link>
            <div className='flex items-center space-x-[16px]'>
                {
                    navbarItems.map(item => {
                        return (
                            <Link key={item.word} href={item.route}>
                                <p className={`${(item.route == pathname) ? 'text-primary500 font-extrabold': 'text-black'} text-[14px]`}>{item.word}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}