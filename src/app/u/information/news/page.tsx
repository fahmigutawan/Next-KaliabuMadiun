'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useContext, useState, useRef } from "react"
import { AppContext } from "@/context/provider";
import { NewsResponse } from "@/model/response/news/news-response";
import { toast } from "react-hot-toast";
import { AiFillHome } from "react-icons/ai"
import Breadcrumb from '@/component/base/Breadcrumb';

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

export default function NewsPage() {
    const pathname = usePathname();
    const repository = useContext(AppContext).repository;
    const [newsData, setNewsData] = useState<NewsResponse[] | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    const loadMoreData = () => {
        if (!loading && !noData) {
            setLoading(true);
            if (newsData) {
                repository.getNextPageNews(
                    newsData[newsData.length - 1].id,
                    (data) => {
                        if (data.length === 0) {
                            setNoData(true);
                        } else {
                            setNewsData((prevNewsData) => {
                                return prevNewsData ? [...prevNewsData, ...data] : null;
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
            }
        }
    };

    useEffect(() => {
        loadMoreData(); 
    }, []);

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
        <div className="px-[5.5rem] py-[2.1rem]">
            <Breadcrumb page={["Informasi", "Berita"]}/>
            <h2 className="mb-9 text-secondary900 font-bold text-4xl">Berita</h2>
            <div className="flex flex-col gap-9">
                {newsData?.map((data, index) => (
                    <Card data={data} key={data.id} />
                ))}
            </div>
            {loading && <div className="text-center">loading data ...</div>}
            {noData && <div className="text-center">no data anymore ...</div>}
        </div>
    );
}
