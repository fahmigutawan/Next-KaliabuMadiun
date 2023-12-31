'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useContext, useState, useRef } from "react"
import { AppContext } from "@/context/provider";
import { toast } from "react-hot-toast";
import Breadcrumb from '@/component/base/Breadcrumb';
import { GalleryResponse } from '@/model/response/gallery/gallery-response';

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

export default function GalleryPage() {
    const pathname = usePathname();
    const repository = useContext(AppContext).repository;
    const [galleryData, setGalleryData] = useState<GalleryResponse[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

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
    }, []);

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
        <div className="px-[45px] md:px-[5.5rem] py-[2rem]">
            <Breadcrumb page={["Informasi", "Gelari"]}/>
            <h2 className="text-secondary900 text-lg lg:text-4xl font-semibold lg:font-bold mb-[32px] lg:mb-[53px]">Galeri</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5">
                {galleryData?.map((data, index) => (
                    <div key={data.id} className='md:h-[200px] flex flex-col'>
                        <div className='flex-1 bg-secondary300 w-full aspect-video bg-cover bg-center' style={{backgroundImage: `url(${data.url})`}}>
                        </div>
                        <div className='w-full py-2 md:py-4 bg-secondary800 font-semibold text-white text-[10px] md:text-base flex items-center justify-center'>{data.description}</div>
                    </div>
                ))}
            </div>
            {loading && <div className="text-center">loading data ...</div>}
            {noData && <div className="text-center">no data anymore ...</div>}
        </div>
    );
}
