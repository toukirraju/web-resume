import React from 'react'
import SkeletonBox from '../../Skeleton/SkeletonBox'
import { useTheme } from '../ThemeContext';
import { cn } from '../utils';

const ThemeMode = () => {
    const { theme, toggleDarkMode } = useTheme();
    return (
        <div className='flex flex-col gap-1'>
            <div>
                <h1 className='text-sm'>Mode</h1>
                <p className='text-xs'>Select your default theme</p>
            </div>
            <div className='flex gap-2 '>
                <div className='flex flex-col gap-1 justify-center items-center text-xs'>
                    <button className={cn('rounded-md', theme?.mode === "dark" && "ring ring-blue-500")} onClick={() => toggleDarkMode('dark')}>
                        <DarkMode />
                    </button>
                    <p className={cn(theme?.mode === "dark" && "text-blue-500")}>Dark</p>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center text-xs'>
                    <button className={cn('rounded-md', theme?.mode === "system" && "ring ring-blue-500")} onClick={() => toggleDarkMode('system')}>
                        <SystemMode />
                    </button>
                    <p className={cn(theme?.mode === "system" && "text-blue-500")}>System</p>
                </div>
                <div className='flex flex-col gap-1 justify-center items-center text-xs'>
                    <button className={cn('rounded-md', theme?.mode === "light" && "ring ring-blue-500")} onClick={() => toggleDarkMode('light')}>
                        <LightMode />
                    </button>
                    <p className={cn(theme?.mode === "light" && "text-blue-500")}>Light</p>
                </div>
            </div>
        </div>
    )
}

export default ThemeMode


const LightMode = () => {
    return (
        <SkeletonBox className='min-w-[97px] max-w-[150px] md:w-[150px] h-full flex flex-col gap-2 items-start py-2 px-2 bg-white dark:bg-white' rounded='md' color='default' animation='none' shadow='sm' >
            <SkeletonBox className='w-full h-[10px] items-start gap-2' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

            <SkeletonBox className='w-full h-[10px] gap-6 flex justify-between' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-1/2 h-[10px] gap-2' rounded='md' color='none' animation='none' shadow='none' >
                    <SkeletonBox className='w-full h-[10px]' rounded='md' color='primary' animation='none' shadowColor='primary' shadow='sm' />
                    <SkeletonBox className='w-full h-[10px]' rounded='md' color='error' animation='none' shadowColor='error' shadow='sm' />
                </SkeletonBox>
            </SkeletonBox>

            <SkeletonBox className='w-full h-full gap-2 justify-between items-start' rounded='md' color='none' animation='none' shadow='none'  >
                <SkeletonBox className='w-[80%] h-[30px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-[20%] h-[20px]' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

        </SkeletonBox>
    )
}


const SystemMode = () => {
    return (<div className='min-w-[97px] max-w-[150px] md:w-[150px] h-full flex'  >
        {/* light part  */}
        <SkeletonBox className='w-full h-full flex flex-col gap-2 pl-2 py-2 rounded-tr-none rounded-br-none bg-white dark:bg-white' rounded='md' color='default' animation='none' shadow='sm' >
            {/* first line  */}
            <SkeletonBox className='w-full h-full flex gap-2 bg-white dark:bg-white' rounded='none' color='default' animation='none' shadow='none' >
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-[50%] h-[10px] rounded-tr-none rounded-br-none' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

            {/* second line  */}
            <SkeletonBox className='w-full h-[10px] gap-6 flex justify-between' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-full h-[10px] rounded-tr-none rounded-br-none' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

            {/* 3rd line  */}
            <SkeletonBox className='w-full h-[30px] ' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-full h-[30px] rounded-tr-none rounded-br-none' rounded='md' color='default' animation='none' shadow='none' />
            </SkeletonBox>

        </SkeletonBox>

        {/* dark part  */}
        <SkeletonBox className='w-full h-full flex flex-col gap-2  pr-2 py-2 rounded-tl-none rounded-bl-none  bg-slate-800 dark:bg-slate-800' rounded='md' color='default' animation='none' shadow='sm' >
            {/* first line  */}
            <SkeletonBox className='w-full h-full gap-2 bg-slate-800 dark:bg-slate-800' rounded='none' color='default' animation='none' shadow='none' >
                <SkeletonBox className='w-[50%] h-[10px] rounded-tl-none rounded-bl-none' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

            {/* second line  */}
            <SkeletonBox className='w-full h-[10px] gap-2 flex justify-between' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-full h-[10px] rounded-tl-none rounded-bl-none' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-full h-[10px] gap-2' rounded='md' color='none' animation='none' shadow='none' >
                    <SkeletonBox className='w-[15px] h-[10px]' rounded='md' color='primary' animation='none' shadowColor='primary' shadow='sm' />
                    <SkeletonBox className='w-[15px] h-[10px]' rounded='md' color='error' animation='none' shadowColor='error' shadow='sm' />
                </SkeletonBox>
            </SkeletonBox>

            {/* 3rd line  */}
            <SkeletonBox className='w-full h-[30px] gap-2 flex justify-between items-start' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-[40%] h-[30px] rounded-tl-none rounded-bl-none' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-[35%] h-[20px]' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

        </SkeletonBox>
    </div>)
}


const DarkMode = () => {
    return (
        <SkeletonBox className='min-w-[97px] max-w-[150px] md:w-[150px] h-full flex flex-col gap-2 items-start py-2 px-2 bg-slate-800 dark:bg-slate-800' rounded='md' color='default' animation='none' shadow='sm' >
            <SkeletonBox className='w-full h-[10px] items-start gap-2' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

            <SkeletonBox className='w-full h-[10px] gap-6 flex justify-between' rounded='md' color='none' shadow='none' animation='none' >
                <SkeletonBox className='w-full h-[10px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-1/2 h-[10px] gap-2' rounded='md' color='none' animation='none' shadow='none' >
                    <SkeletonBox className='w-full h-[10px]' rounded='md' color='primary' animation='none' shadowColor='primary' shadow='sm' />
                    <SkeletonBox className='w-full h-[10px]' rounded='md' color='error' animation='none' shadowColor='error' shadow='sm' />
                </SkeletonBox>
            </SkeletonBox>

            <SkeletonBox className='w-full h-full gap-2 justify-between items-start' rounded='md' color='none' animation='none' shadow='none'  >
                <SkeletonBox className='w-[80%] h-[30px]' rounded='md' color='default' animation='none' shadow='sm' />
                <SkeletonBox className='w-[20%] h-[20px]' rounded='md' color='default' animation='none' shadow='sm' />
            </SkeletonBox>

        </SkeletonBox>
    )
}