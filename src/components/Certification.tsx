import React from 'react'
import TrioQRcode from './TrioQRcode'

const Certification = () => {
    return (
        <div className='text-sm dark:text-slate-600'>
            <div className='flex items-center'>
                <div>
                    <h3 className='text-md font-bold text-primary-400 dark:text-primary-500'>Redux: Think in a Redux way</h3>
                    {/* technologies */}
                    <p className='text-sm dark:text-slate-600'><span className='text-sm font-bold dark:text-slate-500'>Modules included:</span>Vanilla Redux, Redux Toolkit & RTK Query with React-Redux integration</p>
                </div>
                <div>
                    {/* qr code or preview */}
                    <div className='h-[50px] w-[50px]'><TrioQRcode padding='none' bgColor='rgba(var(--primary-100)/1)' fgColor='rgba(var(--primary-500)/1)' /></div>
                </div>
            </div>
        </div>
    )
}

export default Certification
