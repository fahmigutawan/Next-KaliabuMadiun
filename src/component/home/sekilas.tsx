'use client'

import { Typography } from "@mui/material"

export const HomeSekilas = () => {
    return (
        <div className='w-full h-[340px] flex items-center space-x-[16px]'>
            <div className='w-1/2 h-full bg-slate-500' />
            <div className='w-1/2 h-full flex flex-col justify-center'>
                <p className='text-[20px] px-[8px] text-black font-semibold'>Sekilas</p>
                <p className='text-[24px] px-[8px] text-black font-bold bg-slate-300'>Desa Kaliabu</p>
                <p className='text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu velit lacus. Mauris tincidunt aliquet velit, ac mattis leo auctor vel. Mauris vitae vehicula justo, in tempus lectus. Curabitur euismod neque at libero efficitur hendrerit. Fusce accumsan sollicitudin arcu ut sodales. Curabitur sit amet urna rutrum, fermentum metus ac, venenatis dolor. Praesent et tellus elit. Vestibulum viverra malesuada mi sit amet lacinia.</p>
            </div>
        </div>
    )
}