'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useContext, useState, useRef } from "react"
import { AppContext } from "@/context/provider";
import { toast } from "react-hot-toast";
import Breadcrumb from '@/component/base/Breadcrumb';
import { SopResponse } from '@/model/response/sop/SopResponse';

interface CardProps {
    data: {
        title: string;
        content: string;
        id: string;
        thumbnail: string;
    };
}

const Card: React.FC<CardProps> = ({ data }) => {
    return (
        <div className='flex flex-row gap-5'>
            <Link href={`/u/information/news/${data.id}`} className='relative bg-gray-400 w-[408px] h-[212px]'>
                <img className='w-full h-full bg-slate-600 object-cover' alt={data.title} src={data.thumbnail} />
                <div className='absolute bottom-0 right-0 bg-secondary800 w-[194px] h-[46px]'></div>
            </Link>
            <div className='flex-1'>
                <h3 className='text-secondary800 font-semibold text-[28px] mb-3'>{data.title}</h3>
                <p className='text-secondary700'>{data.content}</p>
            </div>
        </div>
    )
}

export default function SopDesa() {
    const pathname = usePathname();
    const repository = useContext(AppContext).repository;
    const [sopData, setSopData] = useState<SopResponse[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    const loadMoreData = () => {
        if (!loading && !noData) {
            if (sopData && sopData.length % 20 === 0) {
                setLoading(true);
                repository.getNextSopDesa(
                    sopData[sopData.length - 1].id,
                    (data) => {
                        if (data.length === 0) {
                            setNoData(true);
                        } else {
                            setSopData((prevSopData) => {
                                return prevSopData ? [...prevSopData, ...data] : null;
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
        repository.getFirstSopDesa(
            (data) => {
                if (data.length === 0) {
                    setNoData(true);
                } else {
                    setSopData(data);
                }
                setLoading(false);
            },
            (error) => {
                toast.error(error.message);
                setLoading(false);
            }
        );
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sopData, loading, noData]);

    const handleScroll = () => {
        const isBottom =
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight;
        if (isBottom) {
            loadMoreData();
        }
    };

    return (
        <div className="px-[45px] md:px-[5.5rem] py-[2rem]">
            <Breadcrumb page={["Informasi", "SOP Penyuratan"]} />
            <h2 className="text-secondary900 text-lg lg:text-4xl font-semibold lg:font-bold mb-[32px] lg:mb-[53px]">SOP Penyuratan</h2>
            <div className='text-sm md:text-lg'>
                <div className='flex flex-row w-full bg-secondary800 py-3 text-secondary50'>
                    <p className='md:w-[184px] px-6'>No</p>
                    <p className='flex-1 px-6'>Perihal</p>
                </div>
                {sopData?.map((data, index) => (
                    <div key={data.id} className='flex flex-row w-full py-4 text-secondary800 text-xs md:text-base'>
                        <p className='md:w-[184px] px-6'>{index + 1}</p>
                        <p className='flex-1 px-6'>{data.title}</p>
                        <Link href={data.url} target='_blank' className='px-6 text-secondary700 hover:text-blue-400'>Lihat</Link>
                    </div>
                ))}
            </div>
            {loading && <div className="text-center">loading data ...</div>}
            {noData && <div className="text-center">no data anymore ...</div>}
        </div>
    );
}
