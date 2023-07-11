'use client'

import Button from '@mui/material/Button'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaRegNewspaper } from 'react-icons/fa'

export const BeritaTerkini = () => {
    return (
        <div className='flex flex-col space-y-[16px]'>
            <div className='flex justify-between'>
                <div className='flex space-x-[16px]'>
                    <FaRegNewspaper color='#000000' className='w-[32px] h-[32px]' />
                    <p className='text-[24px] text-black font-bold'>Berita Terkini</p>
                </div>
                <button
                    onClick={() => {

                    }}
                    className='bg-transparent border border-black px-[8px] rounded hover:bg-slate-100'
                >Lihat Lainnya</button>
            </div>
            <div className='flex w-full space-x-[16px]'>
                <div className='w-1/2'>
                    {/*ITEM 1*/}
                    <div className='bg-slate-600 w-full aspect-[16/8]' />
                    <Link href={''}>
                        <div className='w-full'>
                            <p className='text-[18px] text-black font-semibold line-clamp-1'>
                                Desa Kaliabu Merupakan Desa yang Sangat Damai
                            </p>
                            <p className='text-[16px] text-black line-clamp-1'>
                                Lorem Ipsum Bla Bla Bla
                            </p>
                        </div>
                    </Link>
                </div>
                <div className='w-1/2 h-full flex flex-col space-y-[16px]'>
                    {/*ITEM 2*/}
                    <div className='w-full flex space-x-[8px]'>
                        <div className='w-1/2 aspect-[16/9] bg-slate-600' />
                        <Link  className='w-1/2' href={''}>
                            <div>
                                <p className='text-[18px] text-black font-semibold line-clamp-2'>
                                    Desa Kaliabu Merupakan Desa yang Sangat Damai
                                </p>
                                <p className='text-[16px] text-black line-clamp-3'>
                                    Lorem Ipsum Bla Bla Bla
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/*ITEM 3*/}
                    <div className='w-full flex space-x-[8px]'>
                        <div className='w-1/2 aspect-[16/9] bg-slate-600' />
                        <Link  className='w-1/2' href={''}>
                            <div>
                                <p className='text-[18px] text-black font-semibold line-clamp-2'>
                                    Seorang Developer Ternyata Bisa Suka Dengan Wanita Juga Lho
                                </p>
                                <p className='text-[16px] text-black line-clamp-3'>
                                    Lorem Ipsum Bla Bla Bla
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}