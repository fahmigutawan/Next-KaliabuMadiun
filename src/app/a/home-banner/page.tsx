'use client'

import { ImagePicker } from "@/component/base/image-picker";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AdminHomeBanner() {
    const [showAdd, setShowAdd] = useState(false)
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [link, setLink] = useState('')

    return (
        <div className='p-[32px] flex flex-col space-y-[16px] items-end'>
            <Button
                onClick={() => {
                    setShowAdd(true)
                }}
            >TAMBAH</Button>
            <table className='w-full'>
                <thead className='bg-primary400'>
                    <tr>
                        <th className='text-black font-medium'>Gambar</th>
                        <th className='text-black font-medium'>Link</th>
                        <th className='text-black font-medium'>Command</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>

                    </tr>
                </tbody>
            </table>
            <Modal
                className='flex justify-center items-center px-[128px] py-[32px] overflow-auto'
                open={showAdd}
                onClose={() => {
                    setShowAdd(false)
                }}
            >
                <div className='w-full h-full bg-white p-[16px] overflow-auto flex flex-col justify-between space-y-[32px]'>
                    <Typography className='text-black'>Tambah Banner</Typography>
                    <div className='flex flex-col space-y-[32px]'>
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
                    </div>
                    <Button onClick={() => {

                    }}>KIRIM</Button>
                </div>
            </Modal>
        </div>
    )
}