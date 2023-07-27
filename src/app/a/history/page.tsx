'use client'
import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { BannerResponse } from "@/model/response/home-banner/banner-response"
import { Typography, TextField, Button } from "@mui/material"
import { useState, useContext, useEffect } from "react"
import { TentangResponse } from "@/model/response/tentang/tentang-response"
import toast from "react-hot-toast"
import Loading from "@/component/base/Loading"

const HistoryPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState<string>("")
    const repository = useContext(AppContext).repository

    useEffect(() => {
        setIsLoading(true)
        repository.getSejarahDesa(
            (data) => {
                setContent(data.content)
                setIsLoading(false)
            },
            (error) => {
                toast.error(error.message);
                setIsLoading(false)
            }
        );
    }, [])

    if (isLoading) {
        return <Loading />
    }

    return (
        <form className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Edit Tentang</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <textarea className="border-2 border-secondary800 p-2" rows={10} value={content} onChange={(e) => setContent(e.target.value)}>

                </textarea>
            </div>
            <Button onClick={() => {
                toast.loading("Sedang mengupdate")
                if (content) {
                    repository.adminEditSejarahDesa(
                        content,
                        () => {
                            toast.dismiss()
                            toast.success("Berhasil di-update")
                        },
                        (error) => {
                            toast.error(error.message)
                        }
                    )
                }
            }}>UPDATE</Button>
        </form>
    )
}

export default HistoryPage