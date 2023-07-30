'use client'

import { ImagePicker } from "@/component/base/image-picker";
import { AppContext } from "@/context/provider";
import { Button, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { AdminSopDesaAdd } from "@/component/admin/sop-desa/admin-sopdesa-add";
import { SopResponse } from "@/model/response/sop/SopResponse";
import Link from "next/link";

export default function AdminSopDesa() {
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [dokumenData, setDokumenData] = useState<SopResponse[] | null>(null)
    const repository = useContext(AppContext).repository
    const [shouldRefresh, setShouldRefresh] = useState(false)

    const loadMoreData = () => {
        if (!loading && !noData) {
            if (dokumenData && dokumenData.length % 8 === 0) {
                setLoading(true);
                repository.getNextSopDesa(
                    dokumenData[dokumenData.length - 1].id,
                    (data) => {
                        if (data.length === 0) {
                            setNoData(true);
                        } else {
                            setDokumenData((prevdokumenData) => {
                                return prevdokumenData ? [...prevdokumenData, ...data] : null;
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
        repository.getFirstSopDesa(
            (data) => {
                if (data.length === 0) {
                    setNoData(true);
                } else {
                    setDokumenData(data);
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
    }, [dokumenData, loading, noData]);

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
                        <th className='text-black w-1/3 font-medium'>Link dokumen</th>
                        <th className='text-black font-medium'>Nama Dokumen</th>
                        <th className='text-black font-medium'>Command</th>
                    </tr>
                </thead>
                <tbody>
                    {dokumenData?.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <td className='align-middle text-center'>
                                    <Link href={data.url} className="text-blue-500 underline">Buka Dokumen</Link>
                                </td>
                                <td className='align-middle text-center'>
                                    {data.title}
                                </td>
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
                                                    toast.dismiss()
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
                <AdminSopDesaAdd
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