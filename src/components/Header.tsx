import React from 'react'
import { BiLogoGmail } from 'react-icons/bi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaGithubSquare } from 'react-icons/fa'
import { FaLinkedin, FaMapLocationDot, FaMedium } from 'react-icons/fa6'
import { TbWorldWww } from 'react-icons/tb'
import TrioQRcode from './TrioQRcode'

const headerData = {
    name: 'Taukir Ahmad Raju',
    designation: 'Jr. Frontend Developer',
    contact: [
        { icon: <BsFillTelephoneFill />, text: '01952667055' },
        { icon: <BiLogoGmail />, text: 'toukirraju@gmail.com' },
        { icon: <FaMapLocationDot />, text: 'Gazipur, Dhaka, Bangladesh' }
    ],
    social: [
        { icon: <FaGithubSquare /> },
        { icon: <FaLinkedin /> },
        { icon: <TbWorldWww /> },
        { icon: <FaMedium /> }
    ]

}
type HeaderProps = {
    name?: string
    designation?: string
    contact?: { icon: JSX.Element, text: string }[]
    social?: { icon: JSX.Element }[]
}
const Header = ({
    name = headerData.name,
    designation = headerData.designation,
    contact = headerData.contact,
    social = headerData.social
}: HeaderProps) => {
    return (
        <div className='flex justify-between'>
            <div>
                {/* title  */}
                <div>
                    <h1 className='text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-300'>{name}</h1>
                    <p className='text-lg font-bold text-primary'>{designation}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    {/* contact  */}
                    <div className='flex gap-0 text-sm md:text-base md:gap-2 flex-col md:flex-row items-start md:items-center flex-wrap'>
                        {
                            contact.map((item, index) => <div key={index} className="flex items-center gap-1">{item.icon} <span>{item.text}</span></div>)
                        }
                    </div>
                    {/* social  */}
                    <div className="flex items-center gap-2">
                        {
                            social.map((item, index) => <div key={index}>{item.icon}</div>)
                        }
                    </div>
                </div>
            </div>
            <div className=''>
                {/* image */}
                <div className='h-[calc(15vw+40px)] overflow-hidden p-1 w-[calc(15vw+40px)] max-h-[100px] max-w-[100px] mt-[calc(2rem)] md:mt-0 rounded-full flex justify-center items-center bg-gray-600'>
                    <TrioQRcode padding='md' rounded='full' bgColor='rgba(var(--primary-500)/1)' fgColor='rgba(var(--primary-100)/1)' />
                </div>
            </div>
        </div>
    )
}

export default Header
