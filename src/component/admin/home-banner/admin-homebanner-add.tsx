import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { Button, TextField, Typography } from "@mui/material"
import link from "next/link"
import { title } from "process"
import { useContext, useState } from "react"
import toast from "react-hot-toast"

type AdminHomeBannerAddProps = {
    onShowAddChange:(state:boolean) => void,
    onShouldRefreshChange:(state:boolean) => void
}

export const AdminHomeBannerAdd:React.FC<AdminHomeBannerAddProps> = ({
    onShowAddChange,
    onShouldRefreshChange
}) => {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [link, setLink] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const repository = useContext(AppContext).repository

    return (
        <div className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Tambah Banner</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <ImagePicker onFilePicked={(s) => {
                    setThumbnailFile(s)
                }} />
                <TextField
                    onChange={(s) => {
                        setLink(s.target.value)
                    }}
                    placeholder="Link yang dituju apabila gambar diklik..."
                    className='w-full'
                />
                <TextField
                    onChange={(s) => {
                        setTitle(s.target.value)
                    }}
                    placeholder="Judul yang ditampilkan"
                    className='w-full'
                />
                <TextField
                    onChange={(s) => {
                        setDescription(s.target.value)
                    }}
                    placeholder="Deskripsi yang ditampilkan"
                    className='w-full'
                    multiline={true}
                />
            </div>
            <Button onClick={() => {
                if (thumbnailFile != null) {
                    repository.adminAddHomeBanner(
                        thumbnailFile,
                        link,
                        title,
                        description,
                        () => { 
                            onShowAddChange(false)
                            onShouldRefreshChange(true)
                         }
                    )
                } else {
                    toast.error("Masukkan gambar")
                }
            }}>KIRIM</Button>
        </div>
    )
}