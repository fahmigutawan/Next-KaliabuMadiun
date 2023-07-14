'use client'

import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { BannerResponse } from "@/model/response/home-banner/banner-response"
import { Typography, TextField, Button } from "@mui/material"
import { useState, useContext } from "react"
import toast from "react-hot-toast"

type AdminHomeBannerEditProps = {
    item: BannerResponse,
    onShowEditChange: (state: boolean) => void
}

export const AdminHomeBannerEdit: React.FC<AdminHomeBannerEditProps> = ({
    item,
    onShowEditChange
}) => {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [link, setLink] = useState(item.link)
    const [title, setTitle] = useState(item.title)
    const [description, setDescription] = useState(item.description)
    const repository = useContext(AppContext).repository

    return (
        <div className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Edit Banner</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <ImagePicker
                    onFilePicked={(s) => {
                        setThumbnailFile(s)
                    }}
                    defaultUrl={item.img_url}
                />
                <TextField
                    onChange={(s) => {
                        setLink(s.target.value)
                    }}
                    placeholder="Link yang dituju apabila gambar diklik..."
                    className='w-full'
                    value={link}
                />
                <TextField
                    onChange={(s) => {
                        setTitle(s.target.value)
                    }}
                    placeholder="Judul yang ditampilkan"
                    className='w-full'
                    value={title}
                />
                <TextField
                    onChange={(s) => {
                        setDescription(s.target.value)
                    }}
                    placeholder="Deskripsi yang ditampilkan"
                    className='w-full'
                    value={description}
                />
            </div>
            <Button onClick={() => {
                if (thumbnailFile != null) {
                    /*Handle Edit*/
                } else {
                    toast.error("Masukkan gambar")
                }
            }}>UPDATE</Button>
        </div>
    )
}