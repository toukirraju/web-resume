import React from 'react'
import TrioQRcode from './TrioQRcode'

const project = {
    title: 'HomiFy – Home rental platform',
    technologies: 'React, NextJs, Redux, Tailwindcss, Google Map, Storybook etc.',
    description: 'Homify is a home rental platform where users can rent their home for a short period of time. It has a user-friendly interface and a lot of features.',
    responsivities: [
        'Designed & Developed various research based ideas and projects with ReactJs, redux, tailwindcss and many more.',
        'Developed backend and other functionalities. like - api creation & integration, auth security ensure etc.',
        'Developed and Integrated socket.io for realtime data transmission.',
        'Integrate Google map.'
    ]
}

type ProjectProps = {
    title?: string
    technologies?: string
    description?: string
    responsivities?: string[]
}

const Project = ({
    title = project.title,
    technologies = project.technologies,
    description = project.description,
    responsivities = project.responsivities
}: ProjectProps) => {
    return (
        <div>
            <div className='flex items-center'>
                <div>
                    <h3 className='text-md font-bold text-primary-400 dark:text-primary-500'>{title}</h3>
                    {/* technologies */}
                    <p className='text-sm dark:text-slate-600'><span className='text-sm font-bold dark:text-slate-500'>Technologies:</span>{technologies}</p>
                </div>
                <div>
                    {/* qr code or preview */}
                    <div className='h-[50px] w-[50px]'><TrioQRcode padding='none' bgColor='rgba(var(--primary-100)/1)' fgColor='rgba(var(--primary-500)/1)' /></div>
                </div>
            </div>
            <div className='text-justify text-sm space-y-1 my-1'>
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

export default Project
