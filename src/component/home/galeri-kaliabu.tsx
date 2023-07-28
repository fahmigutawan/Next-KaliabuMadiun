'use client'

import Link from 'next/link'
import { GoFileMedia } from 'react-icons/go'
import { useContext, useState, useEffect } from "react"
import { AppContext } from "@/context/provider"
import { NewsResponse } from "@/model/response/news/news-response"
import { toast } from "react-hot-toast"
import Loading from "@/component/base/Loading"
import { GalleryResponse } from '@/model/response/gallery/gallery-response'

export const GaleriKaliabu = () => {
    const repository = useContext(AppContext).repository;
    const [topGallery, setTopGallery] = useState<GalleryResponse[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        repository.getTopGalleryItems(
            (data) => {
                setTopGallery(data)
                setIsLoading(false)
            },
            (error) => {
                toast.error(error.message);
                setIsLoading(false)
            }
        );
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='flex flex-col gap-3 md:space-y-[16px]'>
            <div className='flex justify-between'>
                <div className='flex space-x-[16px]'>
                    <GoFileMedia color='#000000' className='md:w-[32px] text-2xl md:h-[32px]' />
                    <p className='text-sm md:text-[24px] text-black font-bold'>Gallery Kaliabu</p>
                </div>
                <Link
                    href={"/u/information/gallery"}
                    className='bg-transparent border text-xs flex items-center justify-center md:text-base border-black px-[8px] rounded hover:bg-slate-100'
                >Lihat Lainnya</Link>
            </div>
            {/*ITEM TOP */}
            {topGallery ?
            <img src={topGallery[0]?.url} alt={topGallery[0]?.description} className='w-full aspect-[2/1] md:aspect-[16/5] bg-slate-600'/>
            :
            <div className='w-full aspect-[2/1] md:aspect-[16/5] bg-slate-600' />
            }

            {/*ITEMS BOTTOM */}
            <div className='hidden md:grid grid-cols-4 gap-4'>
                {topGallery?.slice(1,5)?.map((data) => {
                    return <img key={data.id} src={data.url} alt={data.description} className='aspect-[16/9] bg-slate-600'/>
                })}
            </div>
            {/* MOBILE BOTTOM ITEMS */}
            <div className='grid md:hidden grid-cols-2 gap-3'>
                {topGallery?.slice(1,3)?.map((data) => {
                    return <img src={data.url} key={data.id} alt={data.description} className='aspect-[16/9] bg-slate-600' />
                })}
            </div>
        </div>
    )
}