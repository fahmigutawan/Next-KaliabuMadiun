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
        <Link href={`/u/information/news/${data.id}`} className='flex flex-col md:flex-row gap-1 md:gap-5 hover:bg-secondary200'>
            <div className='relative bg-gray-400 w-full md:w-[408px] aspect-video h-auto md:h-[212px]'>
                <img className='w-full h-full bg-slate-600 object-cover' alt={data.title} src={data.thumbnail} />
            </div>
            <div className='md:flex-1'>
                <h3 className='text-secondary800 font-semibold text-lg md:text-[28px] md:mb-3'>{data.title}</h3>
                <p className='text-secondary700 text-xs md:text-base'>{data.content}</p>
            </div>
        </Link>
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
        <div className="px-9 md:px-[5.5rem] py-[2.1rem]">
            <Breadcrumb page={["Informasi", "Berita"]}/>
            <h2 className="text-secondary900 text-lg lg:text-4xl font-semibold lg:font-bold mb-[28px] lg:mb-[53px]">Berita</h2>
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
