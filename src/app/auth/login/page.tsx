'use client'

import {useContext, useState} from "react";
import {AppContext} from "@/context/provider";
import {LoadingButton} from "@mui/lab";

export default function LoginPage() {
    const repository = useContext(AppContext).repository
    const [loading, setLoading] = useState(false)

    return (
        <div className='w-[100vw] h-[100vh] flex flex-col space-y-[8px] justify-center items-center'>
            <LoadingButton
                loading={loading}
                onClick={() => {
                    setLoading(true)

                    repository
                        .signInWithGoogle()
                        .then(res => {
                            setLoading(false)
                        })
                        .catch(err => {
                            setLoading(false)
                        })
                }}
                variant='contained'
                className='bg-blue-500'
            >Google Login</LoadingButton>
        </div>
    )
}