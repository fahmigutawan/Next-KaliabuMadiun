'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useContext, useState } from "react"
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
    const pathname = usePathname()
    const repository = useContext(AppContext).repository;
    const [newsData, setNewsData] = useState<NewsResponse[] | null>([]);
    const [isBtm, setIsBtm] = useState(false);

    const handleScroll = () => {
        const isAtBottom = window.scrollY >= document.body.offsetHeight;
        if (isAtBottom) {
            setIsBtm(true);
        }else{
            setIsBtm(false);
        }
    };

    useEffect(() => {
        repository.getFirstPageNews(
            (data) => {
                setNewsData(data);
            },
            (error) => {
                toast.error(error.message)
            }
        );
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if(isBtm && newsData){
            repository.getNextPageNews(
                newsData[newsData.length -1].id,
                (data) => {
                    // Append the new data to the existing newsData array
                    setNewsData((prevNewsData) => {
                        return prevNewsData ? [...prevNewsData, ...data] : null;
                    });
                },
                (error) => {
                    console.error(error)
                }
            );
        }
    },[isBtm])

    return (
        <div className='px-[5.5rem] py-[2.1rem]'>
            <h2 className='mb-9 text-secondary900 font-bold text-4xl'>Berita</h2>
            <div className='flex flex-col gap-9'>
                {newsData?.map(data => (
                    <Card key={data.id} data={data} />
                ))}
            </div>
        </div>
    );
};