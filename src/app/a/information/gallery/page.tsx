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
    const [galleryData, setGalleryData] = useState<GalleryResponse[] | null>(null)
    const [pickedData, setPickedData] = useState<GalleryResponse | null>(null)
    const repository = useContext(AppContext).repository
    const [shouldRefresh, setShouldRefresh] = useState(false)

    const loadMoreData = () => {
        if (!loading && !noData) {
            if (galleryData && galleryData.length % 8 === 0) {
                setLoading(true);
                repository.getNextGalleryPage(
                    galleryData[galleryData.length - 1].id,
                    (data) => {
                        if (data.length === 0) {
                            setNoData(true);
                        } else {
                            setGalleryData((prevgalleryData) => {
                                return prevgalleryData ? [...prevgalleryData, ...data] : null;
                            });
                        }
                        setLoading(false);
                    },
                    (error) => {
                        console.error(error);
                        setLoading(false);
                    }
                );
            } else{
                setNoData(true)
            }
        }
    };

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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [galleryData, loading, noData]);

    const handleScroll = () => {
        const isBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight;
        if (isBottom) {
            loadMoreData();
        }
    };

    return (
        <div className='p-[32px] flex flex-col space-y-[16px]'>
            <div className="w-full flex  justify-end">
                <Button
                    onClick={() => {
                        setShowAdd(true)
                    }}
                    className='bg-primary500 hover:bg-primary600 text-white'
                >TAMBAH</Button>
            </div>
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
            <div className="flex items-center justify-center text-lg font-semibold">
                {loading && <div className="text-center">loading data ...</div>}
                {noData && <div className="text-center">no data anymore ...</div>}
            </div>
        </div>
    )
}