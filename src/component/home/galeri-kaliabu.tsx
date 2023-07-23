'use client'

import { GoFileMedia } from 'react-icons/go'

export const GaleriKaliabu = () => {
    return (
        <div className='flex flex-col space-y-[16px]'>
            <div className='flex justify-between'>
                <div className='flex space-x-[16px]'>
                    <GoFileMedia color='#000000' className='w-[32px] h-[32px]' />
                    <p className='text-[24px] text-black font-bold'>Galeri Kaliabu</p>
                </div>
                <button
                    onClick={() => {
                    }}
                    className='bg-transparent border border-black px-[8px] rounded hover:bg-slate-100'
                >Lihat Lainnya</button>
            </div>
            {/*ITEM TOP */}
            <div className='w-full aspect-[16/5] bg-slate-600'/>

            {/*ITEMS BOTTOM */}
            <div className='flex space-x-[16px]'>
                {[1,2,3,4,5].map((s) => {
                    return <div key={s} className='w-1/5 aspect-[16/9] bg-slate-600'/>
                })}
            </div>
        </div>
    )
}