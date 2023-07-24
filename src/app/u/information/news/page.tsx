'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useContext, useState, useRef } from "react"
import { AppContext } from "@/context/provider";
import { NewsResponse } from "@/model/response/news/news-response";
import { toast } from "react-hot-toast";
import Image from 'next/image';

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
            <Link href={"/u/information/news/berita1"} className='relative bg-gray-400 w-[408px] h-[212px]'>
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
    const [isbtm, setIsbtm] = useState(false);
    const cardRef = useRef(null);
    const [idxRef, setIdxRef] = useState(3);

    useEffect(() => {
        repository.getFirstPageNews(
            (data) => {
                setNewsData(data);
            },
            (error) => {
                toast.error(error.message);
            }
        );
    }, []);

    useEffect(() => {
        if (isbtm && newsData) {
            repository.getNextPageNews(
                newsData[newsData.length - 1].id,
                (data) => {
                    setNewsData((prevNewsData) => {
                        return prevNewsData ? [...prevNewsData, ...data] : null;
                    });
                    setIdxRef(newsData.length - 1);
                },
                (error) => {
                    console.error(error);
                }
            );
        }
    }, [isbtm, newsData]);

    useEffect(() => {
        if (isbtm) {
            setIsbtm(false);
        }
    }, [isbtm]);

    useEffect(() => {
        if (newsData) {
            setIdxRef(newsData.length - 1);
        }
    }, [newsData]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.target === cardRef.current) {
                    setIsbtm(true);
                }
            });
        });

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [newsData]);

    return (
        <div className="px-[5.5rem] py-[2.1rem]">
            <h2 className="mb-9 text-secondary900 font-bold text-4xl">Berita</h2>
            <div className="flex flex-col gap-9">
                {newsData?.map((data, index) => (
                    <div key={data.id} ref={index === idxRef ? cardRef : null} className={`${index == idxRef && "bg-red-500"}`}>
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
}
