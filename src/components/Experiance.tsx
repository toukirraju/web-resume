import React from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { MdOutlineCalendarMonth } from 'react-icons/md'
const expData = {
    title: 'Cloud Development & Data Analytics',
    position: 'Jr. Frontend Developer',
    date: 'Nov 2023 – Present',
    location: 'Dhaka, Bangladesh',
    description: 'Cloud Development & Data Analytics (CDDA) is a research based startup where they worked with innovative ideas.',
    responsivities: [
        'Designed & Developed various research based ideas and projects with NextJs, redux, tailwindcss and many more.',
        'Designed mockups for pages and other functionalities. like - api integration, auth security ensure etc.',
        'Developed and Integrated socket.io for realtime data transmission.',
        'Work on Google map integration.',
        'Developed NPM packages based on requirement.'
    ]
}

type ExperianceProps = {
    title?: string
    position?: string
    date?: string
    location?: string
    description?: string
    responsivities?: string[]
}

const Experiance = ({
    title = expData.title,
    position = expData.position,
    date = expData.date,
    location = expData.location,
    description = expData.description,
    responsivities = expData.responsivities
}: ExperianceProps) => {

    return (
        <div>
            <h3 className='text-lg font-bold text-primary-400 dark:text-primary-500'>{title}</h3>
            <p className='text-md font-bold dark:text-slate-500'>{position}</p>
            <div className='flex justify-between items-center md:gap-2 dark:text-slate-600'>
                <div className="flex items-center gap-1 text-xs md:text-sm"><MdOutlineCalendarMonth />{date}</div>
                <div className="flex items-center gap-1 text-xs md:text-sm"><FaMapLocationDot />{location}</div>
            </div>
            <div className='text-justify text-sm space-y-1 my-2'>
                {/* short description */}
                <p>{description}</p>
                {/* responsivities */}
                <ul className='list-disc ml-3 list-outside text-sm'>
                    {
                        responsivities.map((resp, index) => <li key={index}>{resp}</li>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Experiance
