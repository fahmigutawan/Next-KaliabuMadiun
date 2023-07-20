'use client'

import {useContext, useState} from "react";
import {AppContext} from "@/context/provider";
import {LoadingButton} from "@mui/lab";
import {TextField} from "@mui/material";
import {toast} from "react-hot-toast";

export default function LoginPage() {
    const repository = useContext(AppContext).repository
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className='w-[100vw] h-[100vh] px-[196px] flex flex-col space-y-[8px] justify-center items-center'>
            <div className='w-full'>
                <p className='text-[24px] font-semibold'>Login ke Website desa Kaliabu</p>
                <p>Sebagai Admin</p>
            </div>
            <TextField
                className='w-full'
                id="filled-basic"
                label="Email"
                variant="filled"
                type="email"
                onChange={(s) => {
                    setEmail(s.target.value)
                }}
            />
            <TextField
                className='w-full'
                id="filled-basic"
                label="Password"
                variant="filled"
                type="password"
                onChange={(s) => {
                    setPassword(s.target.value)
                }}
            />
            <LoadingButton
                loading={loading}
                onClick={() => {
                    setLoading(true)
                    toast.loading("Sedang mengecek kredensial")

                    repository.adminLogin(
                        email,
                        password
                    ).then(res => {
                        setLoading(false)
                        toast.dismiss()
                        toast.success(`Login berhasil sebagai ${res.user.email}`)
                    }).catch((err:Error) => {
                        setLoading(false)
                        toast.dismiss()
                        toast.error(err.message)
                    })
                }}
                variant='contained'
                className='bg-blue-500 w-full'
            >Login</LoadingButton>
        </div>
    )
}