"use client";
import React, { useCallback, useEffect } from 'react'
import { useTheme } from '../../ThemeContext';
import { isObjectEqual, setCookie } from '../../utils';
import { PaletteGenerator } from '..';
import { PaletteSkeleton } from '../skeletons';

const ThemePalette = () => {
    const { theme, setTheme, config } = useTheme();
    const [updatedTheme, setUpdatedTheme] = React.useState(theme);
    const [isPaletteChanged, setIsPaletteChanged] = React.useState(false);
    const isInitialMount = React.useRef(true);

    useEffect(() => {
        setUpdatedTheme(theme);
        setIsPaletteChanged(false)
    }, [theme]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        setIsPaletteChanged(!isObjectEqual(theme, updatedTheme));
    }, [updatedTheme, theme]);

    const handleChangePalette = useCallback((palette: { name: string; colors: Record<string, string> }) => {
        setUpdatedTheme(prevTheme => {
            if (!prevTheme || !prevTheme.shades) {
                // console.error('Previous theme or shades are undefined');
                return prevTheme;
            }

            const newTheme = {
                ...prevTheme,
                shades: prevTheme.shades.map(shade =>
                    shade.name === palette.name
                        ? { ...shade, shade: palette.colors, color: palette.colors['500'] }
                        : shade
                )
            };

            let styleElement = document.getElementById('trio-theme-style');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'trio-theme-style';
                document.head.appendChild(styleElement);
            }

            let cssRules = ':root {';
            newTheme.shades.forEach(shade => {
                Object.entries(shade.shade).forEach(([key, value]) => {
                    cssRules += `--${shade.name}-${key}: ${value};`;
                });
            });
            cssRules += '}';
            styleElement.textContent = cssRules;

            return newTheme;
        });
    }, [theme]);

    //loading skeleton
    if (!theme || !theme.shades) {
        return <div className='md:min-w-[68%]'><PaletteSkeleton /></div>;
    }

    const handleSaveTheme = () => {
        console.log('Saving theme', updatedTheme);
        // localStorage.setItem("trio-theme", JSON.stringify(updatedTheme));
        if (config?.storage === "cookie") {
            // Store the theme in cookies with an expiration of 365 days
            setCookie("trio-theme", JSON.stringify(updatedTheme), 365);
        } else {
            // Default to localStorage
            localStorage.setItem("trio-theme", JSON.stringify(updatedTheme));
        }
        setTheme(updatedTheme);
        setIsPaletteChanged(false);
    };

    return (
        <div className='space-y-2'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='text-sm'>Palettes</h1>
                    <p className='text-xs'>Make a color palettes from single color</p>
                </div>
                <button
                    className='bg-cyan-700 hover:bg-cyan-800 text-gray-100 border border-slate-400 text-sm rounded-md py-1 px-1 md:px-3 min-w-24 dark:border-slate-600 disabled:bg-slate-400 disabled:text-gray-500 disabled:cursor-not-allowed transition-all duration-300'
                    disabled={!isPaletteChanged}
                    onClick={handleSaveTheme}
                >
                    Save Theme
                </button>
            </div>

            <div className='grid grid-cols-12 gap-2'>
                {theme.shades.map((shade) => (
                    <div key={shade.name} className='col-span-12 md:col-span-6'>
                        <PaletteGenerator
                            config={config}
                            color={shade.color}
                            shadeName={shade.name}
                            getPalette={handleChangePalette}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ThemePalette