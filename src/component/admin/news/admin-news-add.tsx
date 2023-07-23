import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { Typography, TextField, Button } from "@mui/material"
import { useState, useContext } from "react"
import toast from "react-hot-toast"

type AdminNewsAddProps = {
    onShowAddChange:(state:boolean) => void,
    onShouldRefreshChange:(state:boolean) => void
}

export const AdminNewsAdd:React.FC<AdminNewsAddProps> = ({
    onShowAddChange,
    onShouldRefreshChange
}) => {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const repository = useContext(AppContext).repository

    return (
        <div className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Tambah Berita Baru</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <ImagePicker onFilePicked={(s) => {
                    setThumbnailFile(s)
                }} />
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
                    toast.loading("Sedang mengunggah...")
                    repository.adminAddNews(
                        thumbnailFile,
                        title,
                        description,
                        () => {
                            toast.dismiss()
                            toast.success("Berita ditambahkan")
                            onShouldRefreshChange(true)
                            onShowAddChange(false)
                        },
                        (err) => {
                            toast.dismiss()
                            toast.error(err.message)
                        }
                    )
                } else {
                    toast.error("Masukkan gambar")
                }
            }}>KIRIM</Button>
        </div>
    )
}