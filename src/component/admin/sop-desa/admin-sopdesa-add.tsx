import { ImagePicker } from "@/component/base/image-picker"
import { AppContext } from "@/context/provider"
import { Button, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react"
import toast from "react-hot-toast"

type DocPickerProps = {
    onFilePicked: (file: File | null) => void;
};

const DocPicker: React.FC<DocPickerProps> = ({ onFilePicked }) => {
    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0] || null;
        onFilePicked(file);
    }

    return (
        <input
            type="file"
            accept=".pdf, .doc, .docx" // Specify accepted file types here
            onChange={handleFileChange}
        />
    );
};


type AdminSopDesaAddProps = {
    onShowAddChange: (state: boolean) => void,
    onShouldRefreshChange: (state: boolean) => void
}

export const AdminSopDesaAdd: React.FC<AdminSopDesaAddProps> = ({
    onShowAddChange,
    onShouldRefreshChange
}) => {
    const [docFile, setDocFile] = useState<File | null>(null)
    const [title, setTitle] = useState('')
    const repository = useContext(AppContext).repository

    function handleAddPhoto() {
        if (docFile != null) {
            repository.adminAddSopDesa(
                docFile,
                title,
                () => {
                    onShowAddChange(false)
                    onShouldRefreshChange(true)
                },
                (error) => {
                    console.log(error.message)
                    toast.error(error.message)
                }
            )
        } else {
            toast.error("Masukkan dokumen")
        }
    }

    return (
        <div className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
            <Typography className='text-black'>Tambah dokumen SOP Desa</Typography>
            <div className='flex flex-col space-y-[16px]'>
                <DocPicker onFilePicked={(s) => {
                    setDocFile(s)
                }} />
                <TextField
                    onChange={(s) => {
                        setTitle(s.target.value)
                    }}
                    placeholder="Deskripsi foto"
                    className='w-full'
                />
            </div>
            <Button onClick={handleAddPhoto}>KIRIM</Button>
        </div>
    )
}