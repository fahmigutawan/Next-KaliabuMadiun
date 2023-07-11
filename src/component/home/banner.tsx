'use client'

import { AppContext } from "@/context/provider"
import { AllBannerResponse } from "@/model/response/home-banner/all-banner-response"
import { Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper'
import "swiper/css";
import Link from "next/link"

export const HomeBanner = () => {
    const repository = useContext(AppContext).repository
    const [data, setData] = useState<AllBannerResponse[]>([])

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
                                <img src={item.img_url} alt="" className='w-full aspect-[16/5] absolute top-[120] left-0 object-cover' />
                                <div className='w-full aspect-[16/5] flex flex-col justify-end p-[32px] relative bg-gradient-to-t from-black to-transparent'>
                                    <Typography className='text-[36px] line-clamp-1 text-white'>{item.title}</Typography>
                                    <Typography className='text-[18px] line-clamp-3 text-white'>{item.description}</Typography>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}