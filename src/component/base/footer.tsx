import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import Link from 'next/link'

export const Footer = () => {
    return (
        <div className='bg-black p-[48px] flex flex-col space-y-[16px]'>
            <div className='flex'>
                <div className='w-1/4'>
                    <img className='h-[72px]' src="/images/kab_madiun.png" alt="" />
                    <p className='text-white text-[18px] font-semibold'>Desa Kaliabu</p>
                    <p className='text-white text-[14px]'>Lorem Ipsum Bla Bla Bla</p>
                </div>
                <div className='w-1/4 flex flex-col space-y-[8px]'>
                    <p className='text-white text-[18px] font-semibold'>Profil</p>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Tentang</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Visi dan Misi</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Sejarah Desa</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Geografi Desa</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Demografi Desa</p>
                    </Link>
                </div>
                <div className='w-1/4 flex flex-col space-y-[8px]'>
                    <p className='text-white text-[18px] font-semibold'>Pemerintahan</p>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Struktur Organisasi</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Perangkat Desa</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Lembaga Desa</p>
                    </Link>
                </div>
                <div className='w-1/4 flex flex-col space-y-[8px]'>
                    <p className='text-white text-[18px] font-semibold'>Layanan</p>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Layanan Pengaduan</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Pengajuan Surat</p>
                    </Link>
                    <Link href={''}>
                        <p className='text-white text-[14px]'>Kritik dan Saran</p>
                    </Link>
                </div>
            </div>
            <div className='w-full h-[2px] bg-white' />
            <div className='flex justify-between items-center'>
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
                <p className='text-white'>
                    Copyright Desa Kaliabu. All Rights Reserved
                </p>
            </div>
        </div>
    )
}