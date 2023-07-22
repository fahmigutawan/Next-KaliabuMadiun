'use client'

import { AdminCommandPanel } from "@/component/admin/admin-command-panel"
import { ImagePicker } from "@/component/base/image-picker"
import { Button, Modal, TextField, Typography } from "@mui/material"
import { data } from "autoprefixer"
import link from "next/link"
import { title } from "process"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AppContext } from "@/context/provider";
import { AdminNewsAdd } from "@/component/admin/news/admin-news-add"

export default function AdminNews() {
    const [showAdd, setShowAdd] = useState(false)
    const [shouldRefresh, setShouldRefresh] = useState(false)

    useEffect(() => {
        //CALL NEWS API HERE
    },[shouldRefresh])

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
                        <th className='text-black font-medium'>Judul</th>
                        <th className='text-black font-medium'>Dibuat pada</th>
                    </tr>
                </thead>
                {/* <tbody>
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
                </tbody> */}
            </table>
            <Modal
                className='flex justify-center items-center px-[128px] py-[32px] overflow-auto'
                open={showAdd}
                onClose={() => {
                    setShowAdd(false)
                }}
            >
                <AdminNewsAdd
                    onShouldRefreshChange={(s) => {
                        setShouldRefresh(s)
                    }}
                    onShowAddChange={(s) => {
                        setShowAdd(s)
                    }}
                />
            </Modal>
        </div>
    )
}