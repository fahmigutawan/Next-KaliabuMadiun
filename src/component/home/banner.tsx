'use client'

import { Typography } from "@mui/material"

export const HomeBanner = () => {
    return (
        <div className='w-full aspect-[16/5]'>
            <div className='w-full aspect-[16/5] absolute top-[120] left-0 bg-slate-500'/>
            <div className='w-full aspect-[16/5] flex flex-col justify-end p-[32px] relative bg-gradient-to-t from-black to-transparent'>
                <Typography className='text-[36px] line-clamp-1'>Some TITLE</Typography>
                <Typography className='text-[18px] line-clamp-3'>Some description</Typography>
            </div>
        </div>
    )
}