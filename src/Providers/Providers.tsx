"use client"
import { Loader, ThemeProvider } from '@/lib/theme'
import React from 'react'

type ProvidersProps = {
    children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
    return (
        <ThemeProvider
            themeLoader={
                <Loader />
            }

            config={{
                colorType: 'rgb',
                shades: ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', 'light', 'dark'],
                // storage: 'localStorage',
                storage: 'cookie',

            }}
        // defaultTheme={{
        //     "name": "default-theme",
        //     "mode": "system",
        //     "shades": [
        //         {
        //             "name": "primary",
        //             "color": "#FF5722",
        //             "shade": {
        //                 "25": "#FFFCF7",
        //                 "50": "#FFFBF5",
        //                 "100": "#FFF5E8",
        //                 "200": "#FFE4C7",
        //                 "300": "#FFCFA6",
        //                 "400": "#FF9A63",
        //                 "500": "#FF5722",
        //                 "600": "#E6471C",
        //                 "700": "#BF3613",
        //                 "800": "#99260C",
        //                 "900": "#731907",
        //                 "950": "#4A0E03",
        //                 "light": "#FFFCF7",
        //                 "dark": "#1A0400"
        //             }
        //         },
        //         {
        //             "name": "secondary",
        //             "color": "#8BC34A",
        //             "shade": {
        //                 "25": "#FBFCF7",
        //                 "50": "#FBFCF5",
        //                 "100": "#F6FAEB",
        //                 "200": "#E5F0CC",
        //                 "300": "#D2E6AC",
        //                 "400": "#AFD479",
        //                 "500": "#8BC34A",
        //                 "600": "#74AD3B",
        //                 "700": "#5A9129",
        //                 "800": "#42751B",
        //                 "900": "#2A570F",
        //                 "950": "#183806",
        //                 "light": "#FBFCF7",
        //                 "dark": "#071401"
        //             }
        //         }
        //     ]
        // }}
        >
            {children}
        </ThemeProvider>
    )
}

export default Providers
