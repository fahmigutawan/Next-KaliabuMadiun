'use client'

import { AdminCommandPanel } from "@/component/admin/admin-command-panel";
import { AdminNewsAdd } from "@/component/admin/news/admin-news-add";
import { AdminNewsEdit } from "@/component/admin/news/admin-news-edit";
import { AppContext } from "@/context/provider";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { NewsResponse } from "@/model/response/news/news-response";

export default function AdminNews() {
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [newsData, setNewsData] = useState<NewsResponse[] | null>(null)
    const [pickedData, setPickedData] = useState<NewsResponse | null>(null)
    const repository = useContext(AppContext).repository
    const [shouldRefresh, setShouldRefresh] = useState(false)

    const loadMoreData = () => {
        if (!loading && !noData) {
            if (newsData && newsData.length % 4 === 0) {
                setLoading(true);
                repository.getNextPageNews(
                    newsData[newsData.length - 1].id,
                    (data) => {
                        if (data.length === 0) {
                            setNoData(true);
                        } else {
                            setNewsData((prevnewsData) => {
                                return prevnewsData ? [...prevnewsData, ...data] : null;
                            });
                        }
                        setLoading(false);
                    },
                    (error) => {
                        console.error(error);
                        setLoading(false);
                    }
                );
            } else {
                setNoData(true)
            }
        }
    };

    useEffect(() => {
        repository.getFirstPageNews(
            (data) => {
                if (data.length === 0) {
                    setNoData(true);
                } else {
                    setNewsData(data);
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
    }, [newsData, loading, noData]);

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
            <div className="w-full flex items-end justify-end">
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
                        <th className='text-black w-[25%] font-medium'>Judul</th>
                        <th className='text-black font-medium'>Konten</th>
                        <th className='text-black font-medium'>Command</th>
                    </tr>
                </thead>
                <tbody>
                    {newsData?.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <td className='align-middle'>
                                    <img className='max-h-72 w-full object-cover' src={data.thumbnail} alt="" />
                                </td>
                                <td className='align-middle text-center'>
                                    {data.title}
                                </td>
                                <td className="align-middle text-center">
                                    <p className="line-clamp-4">{data.content}</p>
                                </td>
                                <td className=' align-middle'>
                                    <AdminCommandPanel
                                        editClicked={() => {
                                            setPickedData(data)
                                            setShowEdit(true)
                                        }}
                                        deleteClicked={() => {
                                            toast.loading("Sedang menghapus")
                                            repository.adminDeleteNews(
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
                <AdminNewsAdd
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
                <AdminNewsEdit
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
            <div className="flex items-center justify-center text-lg font-semibold">
                {loading && <div className="text-center">loading data ...</div>}
                {noData && <div className="text-center">no data anymore ...</div>}
            </div>
        </div>
    )
}