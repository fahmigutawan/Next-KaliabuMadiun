import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { Button, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import toast from "react-hot-toast"

type AdminGalleryAddProps = {
    onShowAddChange: (state: boolean) => void,
    onShouldRefreshChange: (state: boolean) => void
}

export const AdminGalleryAdd: React.FC<AdminGalleryAddProps> = ({
    onShowAddChange,
    onShouldRefreshChange
}) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const repository = useContext(AppContext).repository

    function handleAddPhoto(){
        if (imageFile != null) {
            repository.adminAddGalleryItem(
                imageFile,
                content,
                date,
                () => {
                    onShowAddChange(false)
                    onShouldRefreshChange(true)
                },
                (error) => {
                    toast.error(error.message)
                }
            )
        } else {
            toast.error("Masukkan gambar")
        }
    }

    return (
        <div className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Tambah Foto</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <ImagePicker onFilePicked={(s) => {
                    setImageFile(s)
                }} />
                <TextField
                    onChange={(s) => {
                        setContent(s.target.value)
                    }}
                    placeholder="Deskripsi foto"
                    className='w-full'
                />
                <TextField
                    onChange={(s) => {
                        setDate(s.target.value)
                    }}
                    placeholder="Tanggal pengambilan foto"
                    className='w-full'
                />
            </div>
            <Button onClick={handleAddPhoto}>KIRIM</Button>
        </div>
    )
}