import React from 'react'

const education = {
    title: 'BSC in Software Engineering',
    institution: 'Daffodil International University',
    cgpa: '3.59 out of 4.00',
    date: 'Jan 2019–Jun 2023'
}
type EducationProps = {
    title?: string
    institution?: string
    cgpa?: string
    date?: string
}
const Education = ({
    title = education.title,
    institution = education.institution,
    cgpa = education.cgpa,
    date = education.date
}: EducationProps) => {
    return (
        <div>
            <h3 className='text-md font-bold dark:text-slate-500 '>{title}</h3>
            <p className='text-md font-bold text-primary-400 dark:text-primary-500'>{institution}</p>
            <div className='text-sm dark:text-slate-600 flex justify-between items-center gap-2'>
                <span>- {cgpa}</span>
                <span>{date}</span>
            </div>
        </div>
    )
}

export default Education
