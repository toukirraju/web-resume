import React from 'react'

type SectionHeaderProps = {
    title: string
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
    return (
        <div>
            <h2 className='font-bold text-base uppercase'>{title}</h2>
            <div className='w-full border-b-2 border-slate-500' />
        </div>
    )
}

export default SectionHeader
