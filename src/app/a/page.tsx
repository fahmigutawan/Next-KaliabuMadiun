'use client'

import { Routes } from '@/routes/routes'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PreFunctionAdmin() {
    const router = useRouter()
    
    useEffect(() => {
        setTimeout(() => {
            router.push(Routes.AdminHomeBanner)
        }, 1000)
    },[])

    return (
        <div className='w-full h-[120vh] flex justify-center items-center'>
            <CircularProgress/>
        </div>
    )
}
