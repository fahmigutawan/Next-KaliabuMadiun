'use client'

import { AdminCommandPanel } from "@/component/admin/admin-command-panel";
import { ImagePicker } from "@/component/base/image-picker";
import { AppContext } from "@/context/provider";
import { AllBannerResponse } from "@/model/response/home-banner/all-banner-response";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'

export default function AdminHomeBanner() {
    const [showAdd, setShowAdd] = useState(false)
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [link, setLink] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [data, setData] = useState<AllBannerResponse[]>([])
    const repository = useContext(AppContext).repository

    useEffect(() => {
        repository.getAllBanner().then(res => {
            setData(res)
        })
    }, [])

    return (
        <div className='p-[32px] flex flex-col space-y-[16px] items-end'>
            <Button
                onClick={() => {
                    setShowAdd(true)
                }}
                className='bg-primary500 hover:bg-primary600 text-white'
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
                    {data.map(s => {
                        return (
                            <tr key={s.id}>
                                <td className='w-1/3 align-middle'>
                                    <img className='max-h-72 w-full object-cover' src={s.img_url} alt="" />
                                </td>
                                <td className='w-1/3 align-middle'>
                                    {s.link}
                                </td>
                                <td className='w-1/3 align-middle'>
                                    <AdminCommandPanel />
                                </td>
                            </tr>
                        )
                    })}
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
                        />
                    </div>
                    <Button onClick={() => {
                        if (thumbnailFile != null) {
                            repository.adminAddHomeBanner(
                                thumbnailFile,
                                link,
                                title,
                                description,
                                () => { setShowAdd(false) }
                            )
                        } else {
                            toast.error("Masukkan gambar")
                        }
                    }}>KIRIM</Button>
                </div>
            </Modal>
        </div>
    )
}