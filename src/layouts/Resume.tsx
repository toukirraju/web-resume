
import { Certification, Education, Experiance, Header, ModeSwitch, Project, SectionHeader, Sikll, SpeedDial } from '@/components'
import { cookies } from 'next/headers'
import React from 'react'

const experianceData = [
    {
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
    },
    {
        title: 'PropertySource USA INC.',
        position: 'Web Developer',
        date: 'Aug 2023 – Oct 2023',
        location: 'Florida - US State',
        description: 'Property Source functions as an Off-Market Real Estate Network, serving as a cloud-based platform for real estate professionals to manage inventory acquisition and disposition transactions.',
        responsivities: [
            'Optimized usability of the software by refactoring codebase, handling proper state management and developing with worst case senario on mind.',
            'Developed and implemented new features with up to date technologies like nextjs, redux, tailwindcss and many more.',
            'Developed the software by researching various fields of need in mind.',
            'Fixed bugs and issues to make the software more usable',
        ]
    }
]

const skillData = [
    {
        title: 'Frontend',
        skills: [
            'React, NextJs, React Native, Expo, Redux, Web socket, Soket.io, MUI, Styled-Component, Tailwindcss, Google Map, Storybook etc.',
        ]
    },
    {
        title: 'Backend',
        skills: [
            'JavaScript, TypeScript, Node.js, Nestjs, TypeOrm, Prisma, Express.js, REST API etc.'
        ]
    },
    {
        title: 'Database',
        skills: [
            'MongoDB, MySQL, PostgreSQL'
        ]
    },
    {
        title: 'Tools',
        skills: [
            'Git, Npm, Docker, Jira, ClickUp, Postman, Thunder Client etc.'
        ]
    }

]

const educationData = [
    {
        title: 'BSC in Software Engineering',
        institution: 'Daffodil International University',
        cgpa: '3.59 out of 4.00',
        date: 'Jan 2019–Jun 2023'
    }
]

const projectData = [
    {
        title: 'Property365x',
        technologies: 'NextJs, Redux, Tailwindcss, Google Map, Prisma, Postgress etc.',
        description: 'Property365x is a white label real estate platform that allows real estate professionals to manage their inventory and transactions.',
        responsivities: [
            'Designed & Developed various research based ideas and projects with NextJs, redux, tailwindcss and many more.',
            'Developed backend and other functionalities. like - api creation & integration, auth security ensure etc.',
            'Developed and Integrated socket.io for realtime data transmission.',
            'Integrate Google map.'
        ],
        url: 'https://www.property365x.net'
    },
    {
        title: 'E-commerce platform',
        technologies: 'Nextjs, Redux, Tailwindcss,NestJs, Postgress, TypeOrm etc.',
        description: 'E-commerce platform is a platform where users can buy and sell their products. It has a user-friendly interface and a lot of features.',
        responsivities: [
            'Designed & Developed various research based ideas and projects with NextJs, redux, tailwindcss and many more.',
            'Developed backend and other functionalities. like - api creation & integration, auth security ensure etc.',
            'Developed and Integrated socket.io for realtime data transmission.',
            'Integrate Google map.'
        ],
        url: 'https://sv-ecommerce.vercel.app'
    },

    {
        title: '3D T-shirt Configurator',
        technologies: 'React, ThreeJs, Redux, Tailwindcss, Motion etc.',
        description: '3D T-shirt Configurator is a platform where users can customize their t-shirt with 3D view. It has a user-friendly interface and a lot of features.',
        responsivities: [
            'Designed & Developed various research based ideas and projects with ReactJs, redux, tailwindcss and many more.',
            'Customized 3D view for t-shirt.',
            'Dynamic color change for t-shirt.',
            'Upload custom design for t-shirt.',
        ],
        url: 'https://tshirt-configurator-indol.vercel.app'
    },
    {
        title: 'HomiFy – Home rental platform',
        technologies: 'React, NextJs, Redux, Tailwindcss, Google Map, Storybook etc.',
        description: 'Homify is a home rental platform where users can rent their home for a short period of time. It has a user-friendly interface and a lot of features.',
        responsivities: [
            'Designed & Developed various research based ideas and projects with ReactJs, redux, tailwindcss and many more.',
            'Developed backend and other functionalities. like - api creation & integration, auth security ensure etc.',
            'Developed and Integrated socket.io for realtime data transmission.',
            'Integrate Google map.'
        ],
        url: 'https://h0mify.com'

    },
]

const Resume = () => {
    const cookieStore = cookies()
    const trioTheme = JSON.parse(cookieStore.get('trio-theme')?.value || '{}')
    return (
        <div>
            <ModeSwitch themeProps={trioTheme} />
            <SpeedDial />
            {/* container */}
            <div className='max-w-[900px] mx-auto h-full p-4 md:p-10 '>

                {/* header section  */}
                <Header />

                {/* body section  */}
                <div className='mt-2'>
                    {/* left side  */}
                    <div className='w-full space-y-2'>
                        {/* about  */}
                        <div>
                            <SectionHeader title='About Me' />
                            <p className='text-justify text-sm'>
                                I&rsquo;m a committed Web Developer with over one year of professional experience. I specialize in JavaScript, Typescript, ReactJS, NextJS, Redux, Tailwind CSS, Nodejs, NestJs and various  development tools. I&rsquo;ve collaborated with technical teams, contributing to both startup and USA-based companies over the past year.
                            </p>
                        </div>
                        {/* experience  */}
                        <div>
                            <SectionHeader title='Experience' />
                            {/* exp  */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-x-2'>
                                {
                                    experianceData.map((exp, index) => <Experiance key={index} {...exp} />)
                                }
                            </div>
                        </div>
                    </div>
                    {/* right side  */}
                    <div className='w-full space-y-4'>
                        {/* skills  */}
                        <div>
                            <SectionHeader title='Skills' />
                            {
                                skillData.map((skill, index) => <Sikll key={index} {...skill} />)
                            }
                        </div>

                        {/* projects */}
                        <div>
                            <SectionHeader title='Projects' />
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 space-x-2'>
                                {
                                    projectData.map((project, index) => <Project key={index} {...project} />)
                                }
                            </div>
                        </div>

                        {/* education  */}
                        <div>
                            <SectionHeader title='Education' />
                            {
                                educationData.map((edu, index) => <Education key={index} {...edu} />)
                            }
                        </div>

                        {/* certification */}
                        <div>
                            <SectionHeader title='Certification' />
                            <Certification />
                        </div>
                    </div>
                </div>

                {/* footer  */}
                <div className='mt-4 text-center text-xs text-gray-500 dark:text-gray-400'>
                    <p>© {new Date().getFullYear()} Toukir Ahammed Raju. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Resume
