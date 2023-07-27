'use client'

import Link from 'next/link'
import { GoFileMedia } from 'react-icons/go'

export const GaleriKaliabu = () => {
    return (
        <div className='flex flex-col gap-3 md:space-y-[16px]'>
            <div className='flex justify-between'>
                <div className='flex space-x-[16px]'>
                <GoFileMedia color='#000000' className='md:w-[32px] text-2xl md:h-[32px]' />
                    <p className='text-sm md:text-[24px] text-black font-bold'>Berita Terkini</p>
                </div>
                <Link
                href={"/u/information/gallery"}
                    className='bg-transparent border text-xs flex items-center justify-center md:text-base border-black px-[8px] rounded hover:bg-slate-100'
                >Lihat Lainnya</Link>
            </div>
            {/*ITEM TOP */}
            <div className='w-full aspect-[2/1] md:aspect-[16/5] bg-slate-600'/>

            {/*ITEMS BOTTOM */}
            <div className='hidden md:grid grid-cols-4 gap-4'>
                {[1,2,3,4].map((s) => {
                    return <div key={s} className='aspect-[16/9] bg-slate-600'/>
                })}
            </div>
            {/* MOBILE BOTTOM ITEMS */}
            <div className='grid md:hidden grid-cols-2 gap-3'>
                {[1,2].map((s) => {
                    return <div key={s} className='aspect-[16/9] bg-slate-600'/>
                })}
            </div>
        </div>
    )
}