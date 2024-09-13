import React from 'react'

const skillData = {
    title: 'Frontend',
    skills: [
        'React, NextJs, Redux, Web socket, Soket.io, MUI, Styled-Component, Tailwindcss, Google Map, Storybook etc.',
    ]
}

type SkillProps = {
    title?: string
    skills?: string[]
}
const Sikll = ({
    title = skillData.title,
    skills = skillData.skills
}: SkillProps) => {
    return (
        <div className='mb-2'>
            <h3 className="text-sm font-bold">{title}</h3>
            <ul className='list-disc ml-3 list-outside text-sm text-justify'>
                {skills.map((skill, index) => <li key={index}><p>{skill}</p></li>)}
            </ul>
        </div>
    )
}

export default Sikll
