'use client'

import { Typography } from "@mui/material"
import Link from "next/link"

type NavbarItem = {
    word: string,
    route: string
}

export const Navbar = () => {
    const navbarItems: NavbarItem[] = [
        {
            word: 'BERANDA',
            route: ''
        },
        {
            word: 'PROFIL',
            route: ''
        },
        {
            word: 'PEMERINTAHAN',
            route: ''
        },
        {
            word: 'INFORMASI',
            route: ''
        },
        {
            word: 'LAYANAN',
            route: ''
        },
        {
            word: 'PRODUK UNGGULAN',
            route: ''
        }
    ]

    return (
        <div className='w-full h-[120px] px-[48px] bg-white flex items-center justify-between shadow-sm'>
            <div className='flex items-center space-x-[16px]'>
                <img src='/images/kab_madiun.png' alt="" className='w-[70px]' />
                <div>
                    <Typography
                        className='text-black text-[14px] font-semibold'
                    >Desa Kaliabu</Typography>
                    <Typography
                        className='text-black text-[14px] font-normal'
                    >Kabupaten Madiun</Typography>
                </div>
            </div>
            <div className='flex items-center space-x-[16px]'>
                {
                    navbarItems.map(item => {
                        return (
                            <Link href={item.route}>
                                <Typography className='text-black text-[14px]'>{item.word}</Typography>
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}