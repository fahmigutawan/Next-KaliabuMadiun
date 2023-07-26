'use client'

import { Routes } from "@/routes/routes"
import { Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SubmenuItem = {
    word: string,
    route: string,
}

type NavbarItem = {
    word: string,
    route?: string,
    submenu?: SubmenuItem[],
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
            submenu: [
                {
                    word: 'Tentang',
                    route: "/u/profile/about",
                },
                {
                    word: 'Sejarah',
                    route: "/u/profile/history",
                },
                {
                    word: 'Visi dan Misi',
                    route: "/u/profile/visi-misi"
                },
                {
                    word: 'Geografis & Demografis',
                    route: "/u/profile/geografis-demografi",
                },
            ]
        },
        {
            word: 'PEMERINTAHAN',
            submenu: [
                {
                    word: 'Struktur Organisasi',
                    route: "/u/profile/about",
                },
                {
                    word: 'Lembaga Desa',
                    route: Routes.ProfilePage,
                }
            ]
        },
        {
            word: 'INFORMASI',
            submenu: [
                {
                    word: 'Berita',
                    route: "/u/information/news",
                },
                {
                    word: 'Galeri',
                    route: "/u/information/gallery",
                }
            ]
        },
        {
            word: 'LAYANAN',
            submenu: [
                {
                    word: 'SOP Penyuratan',
                    route: "/u/layanan/document",
                },
                {
                    word: 'Keritik dan Saran',
                    route: "",
                }
            ]
        },
        {
            word: 'PRODUK UNGGULAN',
            route: Routes.ProductPage
        }
    ]

    return (
        <div className="flex w-full bg-white justify-between z-30 px-5 ">
            <Link href={Routes.HomePage} className='flex items-center space-x-[16px] py-4'>
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
            <div className='flex text-black font-semibold items-center'>
                {navbarItems.map((item) => (
                    <div
                        className={`relative group/nav hover:bg-gray-100 text-sm`}
                        key={item.word}
                    >
                        {item.route ?
                            <Link href={item.route}>
                                <h3 className={`px-4 ${item.submenu && 'cursor-default'} h-full py-5 2xl:py-7`}>{item.word}</h3>
                            </Link>
                            :
                            <h3 className={`px-4 ${item.submenu && 'cursor-default'} h-full py-5 2xl:py-7`}>{item.word}</h3>}
                        {item.submenu &&
                            <div className="hidden group-hover/nav:block absolute bg-gray-100 min-w-[100px] z-50 border-[1px]">
                                {item.submenu.map((item) => (
                                    <Link href={item.route} key={item.word} className="group/dropdown">
                                        <div className='px-[10px] py-4 w-max'>
                                            <h4 className='z-30 text-sm'>{item.word}</h4>
                                            <div className='h-[1px] bg-black w-0 group-hover/dropdown:w-full'></div>
                                        </div>
                                    </Link>
                                ))}
                            </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}