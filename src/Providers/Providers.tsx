"use client"
import { ThemeProvider } from '@/lib/theme'
import React from 'react'

type ProvidersProps = {
    children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <ThemeProvider
            config={{
                colorType: 'hex',
                shades: ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', 'light', 'dark'],
            }}
        >
            {children}
        </ThemeProvider>
    )
}

export default Providers
