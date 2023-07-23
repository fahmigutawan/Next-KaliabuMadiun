'use client'

import Button from '@mui/material/Button'
import Link from 'next/link'
import {useContext, useEffect, useRef, useState} from 'react'
import {FaRegNewspaper} from 'react-icons/fa'
import {AppContext} from "@/context/provider";
import {NewsResponse} from "@/model/response/news/news-response";
import {toast} from "react-hot-toast";

export const BeritaTerkini = () => {
    const repository = useContext(AppContext).repository
    const [data, setData] = useState<NewsResponse[] | null>(null)

    useEffect(() => {
        repository
            .getLast3News()
            .then(res => {
                setData(res)
            })
            .catch((err: Error) => {
                toast.error(err.message)
            })
    }, [])

    return (
        <div className='flex flex-col space-y-[16px]'>
            <div className='flex justify-between'>
                <div className='flex space-x-[16px]'>
                    <FaRegNewspaper color='#000000' className='w-[32px] h-[32px]'/>
                    <p className='text-[24px] text-black font-bold'>Berita Terkini</p>
                </div>
                <Link
                    href={"information/news"}
                    className='bg-transparent border border-black px-[8px] rounded hover:bg-slate-100 flex items-center justify-center'
                >Lihat Lainnya
                </Link>
            </div>
            {
                data && <div className='flex w-full space-x-[16px]'>
                    <div className='w-1/2 hover:bg-gray-100'>
                        {/*ITEM 1*/}
                        <img className='bg-slate-600 w-full aspect-[16/8] object-cover' alt={''} src={data[0].thumbnail}/>
                        <Link href={''}>
                            <div className='w-full'>
                                <p className='text-[18px] text-black font-semibold line-clamp-1'>
                                    {data[0].title}
                                </p>
                                <p className='text-[16px] text-black line-clamp-1'>
                                    {data[0].content}
                                </p>
                            </div>
                        </Link>
                    </div>
                    <div className='w-1/2 h-full flex flex-col space-y-[16px]'>
                        {/*ITEM 2*/}
                        <div className='w-full flex space-x-[8px] hover:bg-gray-100'>
                            <img className='w-1/2 aspect-[16/9] bg-slate-600 object-cover' alt={''} src={data[0].thumbnail}/>
                            <Link className='w-1/2' href={''}>
                                <div>
                                    <p className='text-[18px] text-black font-semibold line-clamp-2'>
                                        {data[1].title}
                                    </p>
                                    <p className='text-[16px] text-black line-clamp-3'>
                                        {data[1].content}
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/*ITEM 3*/}
                        <div className='w-full flex space-x-[8px] hover:bg-gray-100'>
                            <img className='w-1/2 aspect-[16/9] bg-slate-600 object-cover' alt={''} src={data[2].thumbnail}/>
                            <Link className='w-1/2' href={''}>
                                <div>
                                    <p className='text-[18px] text-black font-semibold line-clamp-2'>
                                        {data[2].title}
                                    </p>
                                    <p className='text-[16px] text-black line-clamp-3'>
                                        {data[2].content}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}