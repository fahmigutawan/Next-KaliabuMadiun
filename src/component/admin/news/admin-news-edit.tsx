'use client'

import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { NewsResponse } from "@/model/response/news/news-response"
import { Typography, TextField, Button } from "@mui/material"
import { useState, useContext } from "react"
import toast from "react-hot-toast"

type AdminNewsEditProps = {
    item: NewsResponse,
    onShowEditChange: (state: boolean) => void,
    onShouldRefreshChange: (state: boolean) => void
}

export const AdminNewsEdit: React.FC<AdminNewsEditProps> = ({
    item,
    onShowEditChange,
    onShouldRefreshChange
}) => {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [title, setTitle] = useState(item.title)
    const [description, setDescription] = useState(item.content)
    const repository = useContext(AppContext).repository

    return (
        <div className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Edit Banner</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <ImagePicker
                    onFilePicked={(s) => {
                        setThumbnailFile(s)
                    }}
                    defaultUrl={item.thumbnail}
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
                    multiline={true}
                />
            </div>
            <Button onClick={() => {
                toast.loading("Sedang mengupdate")
                repository.adminUpdateNews(
                    item.id,
                    title,
                    description,
                    () => {
                        toast.dismiss()
                        toast.success("Berhasil di-update")
                        onShowEditChange(false)
                        onShouldRefreshChange(true)
                    },
                    (error) => {
                        toast.error(error.message)
                    }
                )
            }}>UPDATE</Button>
        </div>
    )
}