import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import Link from 'next/link'

export const Footer = () => {
    return (
        <div className='bg-black p-[34px] md:p-[48px] flex flex-col space-y-[16px]'>
            <div className='flex flex-col md:flex-row gap-[22px] md:gap-0 text-[12px] md:text-[14px]'>
                <div className='w-full md:w-1/4'>
                    <img className='h-[72px]' src="/images/kab_madiun.png" alt="" />
                    <p className='text-white text-[14px] md:text-[18px] font-semibold'>Desa Kaliabu</p>
                    <p className='text-white'>Lorem Ipsum Bla Bla Bla</p>
                </div>
                <div className='w-full md:w-1/4 flex flex-col space-y-[8px]'>
                    <p className='text-white text-[14px] md:text-[18px] font-semibold'>Profil</p>
                    <Link href={"/u/profile/about"}>
                        <p className='text-white'>Tentang</p>
                    </Link>
                    <Link href={"/u/profile/history"}>
                        <p className='text-white'>Sejarah Desa</p>
                    </Link>
                    <Link href={"/u/profile/geografis-demografi"}>
                        <p className='text-white'>Geografis dan Demografi Desa</p>
                    </Link>
                </div>
                {/* <div className='w-full md:w-1/4 flex flex-col space-y-[8px]'>
                    <p className='text-white text-[14px] md:text-[18px] font-semibold'>Pemerintahan</p>
                    <Link href={''}>
                        <p className='text-white'>Struktur Organisasi</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white'>Perangkat Desa</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white'>Lembaga Desa</p>
                    </Link>
                </div> */}
                <div className='w-full md:w-1/4 flex flex-col space-y-[8px]'>
                    <p className='text-white text-[14px] md:text-[18px] font-semibold'>Layanan</p>
                    <Link href={"/u/profile/document"}>
                        <p className='text-white'>Pengajuan Surat</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white'>Kritik dan Saran</p>
                    </Link>
                </div>
                <div className='w-full md:w-1/4 flex flex-col space-y-[8px]'>
                    <p className='text-white text-[14px] md:text-[18px] font-semibold'>Informasi</p>
                    <Link href={"/u/information/news"}>
                        <p className='text-white'>Berita</p>
                    </Link>
                    <Link href={"/u/information/gallery"}>
                        <p className='text-white'>Galeri</p>
                    </Link>
                </div>
            </div>
            <div className='w-full h-[2px] bg-white hidden md:block' />
            <div className='flex flex-col md:flex-row justify-between items-start gap-7 md:gap-0 md:items-center'>
                <div className='flex items-center space-x-[8px]'>
                    <Link href={''}>
                        <IoLogoWhatsapp className='w-[32px] h-[32px]' color='#fff' />
                    </Link>
                    <Link href={''}>
                        <AiFillInstagram className='w-[32px] h-[32px]' color='#fff' />
                    </Link>
                    <Link href={''}>
                        <BsFacebook className='w-[32px] h-[32px]' color='#fff' />
                    </Link>
                </div>
                <div className='w-full h-[2px] bg-white md:hidden block' />
                <p className='text-white text-xs'>
                    &copy; Copyright Desa Kaliabu. All Rights Reserved
                </p>
            </div>
        </div>
    )
}