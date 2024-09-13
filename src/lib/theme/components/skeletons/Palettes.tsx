import React from 'react'
import { SkeletonBox } from '../../../Skeleton'

const PaletteSkeleton = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2' >
                <div className='flex flex-col gap-2'>
                    <SkeletonBox width='w-[70px]' />
                    <SkeletonBox width='w-[230px]' />
                </div>

                <SkeletonBox height='h-[35px]' width='w-[110px]' rounded='md' />
            </div>
            <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-12 md:col-span-6'>
                    <SkeletonBox height='h-[320px]' rounded='md' />
                </div>
                <div className='col-span-12 md:col-span-6'>
                    <SkeletonBox height='h-[320px]' rounded='md' />
                </div>
            </div>
        </div>
    )
}

export default PaletteSkeleton
