'use client'

import { AppContext } from "@/context/provider"
import { BannerResponse } from "@/model/response/home-banner/banner-response"
import { Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper'
import "swiper/css";
import Link from "next/link"

export const HomeBanner = () => {
    const repository = useContext(AppContext).repository
    const [data, setData] = useState<BannerResponse[]>([])

    useEffect(() => {
        repository.getAllBanner().then(res => {
            setData(res)
        }).catch((err: Error) => {
            console.error(err.message)
        })
    }, [])

    return (
        <div className='w-full aspect-[16/5]'>
            <Swiper
                className='max-w-[100vw] relative mix-blend-normal'
                style={{
                    transition: 'linear'
                }}
                modules={[Autoplay]}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false
                }}
            >
                {data.map(item => {
                    return (
                        <SwiperSlide key={item.id}>
                            <Link href={item.link}>
                                <img src={item.img_url} alt="" className='w-full aspect-[1.8/1] md:aspect-[16/5] absolute top-[120] left-0 object-cover' />
                                <div className='w-full aspect-[1.8/1] md:aspect-[16/5] flex flex-col justify-end p-[32px] relative bg-gradient-to-t from-black to-transparent space-y-[8px]'>
                                    <p className='text-sm text-center md:text-start md:text-[28px] line-clamp-1 text-white font-semibold'>{item.title}</p>
                                    <p className='hidden md:block text-[18px] line-clamp-3 text-white'>{item.description}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}