'use client'

import { Typography } from "@mui/material"

export const HomeSekilas = () => {
    return (
        <div className='pt-[32px] px-[48px] w-full h-[340px] flex items-center space-x-[16px]'>
            <div className='w-1/2 h-full bg-slate-500' />
            <div className='w-1/2 h-full flex flex-col justify-center'>
                <Typography className='text-[20px] px-[8px] text-black font-semibold'>Sekilas</Typography>
                <Typography className='text-[24px] px-[8px] text-black font-bold bg-slate-300'>Desa Kaliabu</Typography>
                <Typography className='text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu velit lacus. Mauris tincidunt aliquet velit, ac mattis leo auctor vel. Mauris vitae vehicula justo, in tempus lectus. Curabitur euismod neque at libero efficitur hendrerit. Fusce accumsan sollicitudin arcu ut sodales. Curabitur sit amet urna rutrum, fermentum metus ac, venenatis dolor. Praesent et tellus elit. Vestibulum viverra malesuada mi sit amet lacinia.</Typography>
            </div>
        </div>
    )
}