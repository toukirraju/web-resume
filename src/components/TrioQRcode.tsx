import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/theme/utils';

type TrioQRcodeProps = {
    value?: string
    rounded?: "none" | "sm" | "md" | "lg" | "full",
    padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl",
    className?: string,

}

const TrioQRcode = ({
    value,
    rounded,
    padding,
    className,
}: TrioQRcodeProps) => {

    const roundedClasses: Record<string, string> = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };

    const paddingClasses: Record<string, string> = {
        none: 'p-0',
        xs: 'p-0.5',
        sm: 'p-1',
        md: 'p-3',
        lg: 'p-5',
        xl: 'p-7',
    };


    return (
        <div
            className={
                cn('bg-primary-500 flex items-center justify-center',
                    roundedClasses[rounded || 'md'],
                    paddingClasses[padding || 'md'],
                    className

                )
            }
        >
            <QRCodeSVG
                value={value || 'https://example.com'}
                // size={90} // QR code size
                bgColor={"var(--primary-500)"}
                fgColor={"var(--primary-100)"}
                level={"L"} // Error correction level
                className='h-full w-full rounded-md'
            />
        </div>
    );
};

export default TrioQRcode;
