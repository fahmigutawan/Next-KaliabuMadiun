'use client'

import { AdminCommandPanel } from "@/component/admin/admin-command-panel";
import { AdminGalleryAdd } from "@/component/admin/gallery/admin-gallery-add";
import { ImagePicker } from "@/component/base/image-picker";
import { AppContext } from "@/context/provider";
import { Button, Modal } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import { GalleryResponse } from "@/model/response/gallery/gallery-response";

export default function AdminGallery() {
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [galleryData, setGalleryData] = useState<GalleryResponse[]>([])
    const [pickedData, setPickedData] = useState<GalleryResponse | null>(null)
    const repository = useContext(AppContext).repository
    const [shouldRefresh, setShouldRefresh] = useState(false)
    const router = useRouter()

    useEffect(() => {
        repository.getFirstGalleryPage(
            (data) => {
                if (data.length === 0) {
                    setNoData(true);
                } else {
                    setGalleryData(data);
                }
                setLoading(false);
            },
            (error) => {
                toast.error(error.message);
                setLoading(false);
            }
        );
    }, [shouldRefresh]);

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
                        <th className='text-black w-1/3 font-medium'>Gambar</th>
                        <th className='text-black font-medium'>Content</th>
                        <th className='text-black font-medium'>Taken At</th>
                        <th className='text-black font-medium'>Command</th>
                    </tr>
                </thead>
                <tbody>
                    {galleryData?.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <td className='align-middle'>
                                    <img className='max-h-72 w-full object-cover' src={data.url} alt="" />
                                </td>
                                <td className='align-middle text-center'>
                                    {data.description}
                                </td>
                                <td className="align-middle text-center">{data.taken_at}</td>
                                <td className='align-middle text-center'>
                                    <Button
                                        className='bg-error500 hover:bg-error600 text-white'
                                        onClick={() => {
                                            toast.loading("Sedang menghapus")
                                            repository.adminDeleteGalleryItem(
                                                data.id,
                                                () => {
                                                    toast.dismiss()
                                                    toast.success("Item berhasil dihapus")
                                                    setShouldRefresh(true)
                                                },
                                                (error) => {
                                                    toast.error(error.message)
                                                }
                                            )
                                        }}
                                    >HAPUS</Button>
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
                <AdminGalleryAdd
                    onShowAddChange={(s) => {
                        setShowAdd(s)
                    }}
                    onShouldRefreshChange={(s) => {
                        setShouldRefresh(s)
                    }}
                />
            </Modal>
        </div>
    )
}