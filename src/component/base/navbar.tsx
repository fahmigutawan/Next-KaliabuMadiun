'use client'

import { Routes } from "@/routes/routes"
import { Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BiMenu, BiChevronRight } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'
import { useState } from "react"

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
    const [isOpen, setIsOpen] = useState(false);
    const [subOpen, setSubOpen] = useState<number | null>(null);
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
                    word: 'Geografis & Demografis',
                    route: "/u/profile/geografis-demografi",
                },
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
    ]

    return (
        <nav className="w-full">
            <div className="hidden md:flex w-full bg-white justify-between z-30 px-5 ">
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
            <div className="w-full bg-white flex md:hidden flex-row justify-between px-9 py-4">
                <Link href={Routes.HomePage} className='flex items-center space-x-[16px]'>
                    <img src='/images/kab_madiun.png' alt="" className='w-[45px]' />
                    <div className="text-black text-xs md:text-[14px]">
                        <p
                            className='font-semibold'
                        >Desa Kaliabu</p>
                        <p
                            className='font-normal'
                        >Kabupaten Madiun</p>
                    </div>
                </Link>
                <button onClick={() => {
                    setIsOpen(!isOpen)
                    setSubOpen(null)}} className="p-2">
                    {isOpen ?
                        <GrClose className="text-lg" />
                        :
                        <BiMenu className="text-2xl" />
                    }
                </button>
            </div>
            <div className={`${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[100%]"} z-50 fixed pt-16 pb-40 flex 2xl:hidden flex-col justify-between font-semibold w-full bg-white h-full transition-all`}>
                <div className='flex flex-col px-6 gap-4 title-2 font-bold text-secondary900'>
                    {navbarItems.map((data, index) => (
                        <div key={data.word}>
                            {data.route ?
                                <Link onClick={() => setIsOpen(false)} href={data.route} key={"m-" + data.word}>{data.word}</Link>
                                :
                                <div className="flex flex-col items-start gap-3 w-full">
                                    <button className="flex flex-row items-center justify-between w-full" onClick={() => setSubOpen(index)}>
                                        {data.word}
                                        <BiChevronRight className="text-2xl"/>
                                    </button>
                                    <div className={`${subOpen === index ? "flex" : "hidden"} flex-col gap-2 font-normal px-4`}>
                                        {data.submenu?.map(data => (
                                            <Link key={data.word} onClick={() => setIsOpen(false)} href={data.route}>{data.word}</Link>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}