import { BsFacebook } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'

export const Footer = () => {
    return (
        <div className='bg-black py-[16px] px-[48px] flex flex-col space-y-[16px]'>
            <div className='w-full h-[2px] bg-white' />
            <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-[8px]'>
                    <IoLogoWhatsapp className='w-[32px] h-[32px]' color='#fff' />
                    <AiFillInstagram className='w-[32px] h-[32px]' color='#fff' />
                    <BsFacebook className='w-[32px] h-[32px]' color='#fff' />
                </div>
                <p className='text-white'>
                    Copyright Desa Kaliabu. All Rights Reserved
                </p>
            </div>
        </div>
    )
}