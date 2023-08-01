'use client'

import Button from '@mui/material/Button'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import { FaRegNewspaper } from 'react-icons/fa'
import { AppContext } from "@/context/provider";
import { NewsResponse } from "@/model/response/news/news-response";
import { toast } from "react-hot-toast";

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
                <div className='flex items-center space-x-[16px]'>
                    <FaRegNewspaper color='#000000' className='md:w-[32px] text-2xl md:h-[32px]' />
                    <p className='text-sm md:text-[24px] text-black font-bold'>Berita Terkini</p>
                </div>
                <Link
                    href={"information/news"}
                    className='bg-transparent text-xs md:text-base border border-black px-[8px] rounded hover:bg-slate-100 flex items-center justify-center'
                >Lihat Lainnya
                </Link>
            </div>
            {
                data && <div className='flex flex-col md:flex-row w-full md:space-x-[16px] gap-4'>
                    {data.length >= 1 && <Link href={`/u/information/news/${data[0].id}`} className='w-full md:w-1/2 hover:bg-gray-100'>
                        {/*ITEM 1*/}
                        <img className='bg-slate-600 w-full aspect-[16/8] object-cover' alt={''} src={data[0].thumbnail} />
                        <div>
                            <div className='w-full'>
                                <p className='text-sm md:text-[18px] text-black font-semibold line-clamp-1'>
                                    {data[0].title}
                                </p>
                                <p className='text-[13px] md:text-[16px] text-black line-clamp-3 md:line-clamp-2'>
                                    {data[0].content}
                                </p>
                            </div>
                        </div>
                    </Link>}
                    <div className='w-full md:w-1/2 h-full flex flex-col space-y-[16px]'>
                        {/*ITEM 2*/}
                        {data.length >= 2 && <Link href={`/u/information/news/${data[1].id}`} className='w-full flex flex-col md:flex-row space-x-[8px] hover:bg-gray-100'>
                            <img className='w-full md:w-1/2 aspect-[16/9] bg-slate-600 object-cover' alt={''} src={data[1].thumbnail} />
                            <div className='w-full file:md:w-1/2'>
                                <div>
                                    <p className='text-sm md:text-[18px] text-black font-semibold line-clamp-1'>
                                        {data[1].title}
                                    </p>
                                    <p className='text-[13px] md:text-[16px] text-black line-clamp-3 md:line-clamp-4'>
                                        {data[1].content}
                                    </p>
                                </div>
                            </div>
                        </Link>}

                        {/*ITEM 3*/}
                        {data.length >= 3 && <Link href={`/u/information/news/${data[2].id}`} className='w-full flex flex-col md:flex-row space-x-[8px] hover:bg-gray-100'>
                            <img className='w-full md:w-1/2 aspect-[16/9] bg-slate-600 object-cover' alt={''} src={data[2].thumbnail} />
                            <div className='w-full file:md:w-1/2'>
                                <div>
                                    <p className='text-sm md:text-[18px] text-black font-semibold line-clamp-1'>
                                        {data[2].title}
                                    </p>
                                    <p className='text-[13px] md:text-[16px] text-black line-clamp-3 md:line-clamp-4'>
                                        {data[2].content}
                                    </p>
                                </div>
                            </div>
                        </Link>}
                    </div>
                </div>
            }
        </div>
    )
}