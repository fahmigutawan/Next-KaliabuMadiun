'use client'
import { useContext, useState, FormEvent } from "react"
import { AppContext } from "@/context/provider"
import { toast } from "react-hot-toast"
import { TentangResponse } from "@/model/response/tentang/tentang-response"
import { useRouter } from "next/navigation"

const LoginPAge = () => {
    const repository = useContext(AppContext).repository;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const router = useRouter()

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        toast.loading("Sedang mengecek kredensial")
        repository.adminLogin(
            email,
            password,
            () => {
                toast.dismiss()
                toast.success("Berhasil login, tunggu beberapa detik")
                setTimeout(() => {
                    router.push("/a")
                }, 1000)
            },
            (err) => {
                toast.dismiss()
                toast.error(err.message)
            }
        )
    }

    return (
        <div className="w-full bg-gradient-to-r from-slate-300 to-slate-800 h-screen flex items-center justify-center">
            <form onSubmit={(e) => handleSubmit(e)} className="h-[60%] aspect-square bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg px-6 py-8">
                <h2 className="text-center text-3xl font-bold text-secondary800">Admin Login</h2>
                <div className="flex flex-col mt-12 gap-3 mb-6">
                    <label htmlFor="email" className="required">Email</label>
                    <input content={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email" className="p-1 rounded-lg" type="email" />
                    <label htmlFor="password" className="required">Password</label>
                    <input content={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" className="p-1 rounded-lg" type="password" />
                </div>
                <div className="w-full flex items-center justify-center">
                    <button className="text-center bg-secondary800 w-full py-2 rounded-lg text-lg text-white hover:opacity-90">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPAge