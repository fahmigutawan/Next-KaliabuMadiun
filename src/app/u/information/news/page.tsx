'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Card = () => {
    return (
        <div className='flex flex-row gap-5'>
            <Link href={"/u/information/news/berita1"} className='relative bg-gray-400 w-[408px] h-[212px]'>
                <div className='absolute bottom-0 right-0 bg-secondary800 w-[194px] h-[46px]'></div>
            </Link>
            <div className='flex-1'>
                <h3 className='text-secondary800 font-semibold text-[28px] mb-3'>Lorem ipsum dolor sit  amet</h3>
                <p className='text-secondary700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id tristique est. Aliquam purus eros, facilisis nec viverra in, placerat a leo. Nullam pretium, neque quis posuere pretium, risus nulla scelerisque urna, sed vestibulum enim lorem at mauris. Quisque in justo ut massa bibendum placerat eget vitae libero. Aliquam sit amet maximus magna, in tempor diam. Mauris imperdiet metus eu neque molestie egestas.</p>
            </div>
        </div>
    )
}

export default function NewsPage() {
    const pathname = usePathname()

    return (
        <div className='px-[5.5rem] py-[2.1rem]'>
            <h2 className='mb-9 text-secondary900 font-bold text-4xl'>Berita</h2>
            <div className='flex flex-col gap-9'>
                {[1, 2, 3].map(data => (
                    <Card />
                ))}
            </div>
        </div>
    );
};