'use client'

import { AdminCommandPanel } from "@/component/admin/admin-command-panel";
import { AdminHomeBannerAdd } from "@/component/admin/home-banner/admin-homebanner-add";
import { AdminHomeBannerEdit } from "@/component/admin/home-banner/admin-homebanner-edit";
import { ImagePicker } from "@/component/base/image-picker";
import { AppContext } from "@/context/provider";
import { BannerResponse } from "@/model/response/home-banner/banner-response";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'

export default function AdminHomeBanner() {
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [data, setData] = useState<BannerResponse[]>([])
    const [pickedData, setPickedData] = useState<BannerResponse | null>(null)
    const repository = useContext(AppContext).repository
    const [shouldRefresh, setShouldRefresh] = useState(false)

    useEffect(() => {
        repository.getAllBanner().then(res => {
            setData(res)
            setShouldRefresh(false)
        })
    }, [shouldRefresh])

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
                    {data.map((s, index) => {
                        return (
                            <tr key={s.id}>
                                <td className='w-1/3 align-middle'>
                                    <img className='max-h-72 w-full object-cover' src={s.img_url} alt="" />
                                </td>
                                <td className='w-1/3 align-middle'>
                                    {s.link}
                                </td>
                                <td className='w-1/3 align-middle'>
                                    <AdminCommandPanel
                                        editClicked={() => {
                                            setPickedData(s)
                                            setShowEdit(true)
                                        }}
                                        deleteClicked={() => {
                                            toast.loading("Sedang menghapus")
                                            repository.adminDeleteHomeBanner(
                                                s.id,
                                                () => {
                                                    toast.dismiss()
                                                    toast.success("Item berhasil dihapus")
                                                    setShouldRefresh(true)
                                                }
                                            )
                                        }}
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/*All Modals*/}
            <Modal
                className='flex justify-center items-center px-[128px] py-[32px] overflow-auto'
                open={showAdd}
                onClose={() => {
                    setShowAdd(false)
                }}
            >
                <AdminHomeBannerAdd
                    onShowAddChange={(s) => {
                        setShowAdd(s)
                    }}
                    onShouldRefreshChange={(s) => {
                        setShouldRefresh(s)
                    }}
                />
            </Modal>
            {pickedData && <Modal
                className='flex justify-center items-center px-[128px] py-[32px] overflow-auto'
                open={showEdit}
                onClose={() => {
                    setShowEdit(false)
                }}
            >
                <AdminHomeBannerEdit
                    onShowEditChange={(s) => {
                        setShowEdit(s)
                    }}
                    onShouldRefreshChange={(s) => {
                        setShouldRefresh(s)
                    }}
                    item={pickedData}
                />
            </Modal>
            }
        </div>
    )
}