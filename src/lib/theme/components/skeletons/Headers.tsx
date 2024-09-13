import React from 'react'
import { SkeletonBox } from '../../../Skeleton'

const Headers = () => {
    return (
        <div className='flex items-center justify-between gap-2' >
            <div className='flex flex-col gap-2'>
                <SkeletonBox width='w-[70px]' />
                <SkeletonBox width='w-[230px]' />
            </div>

            <SkeletonBox height='h-[35px]' width='w-[110px]' rounded='md' />
        </div>
    )
}

export default Headers
