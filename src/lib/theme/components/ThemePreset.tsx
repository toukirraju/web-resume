"use client";
import React, { useState, useCallback } from 'react';
import { ThemeType, useTheme } from '../ThemeContext';

import { cn, getColorPalette, hexToRgb, setCookie } from '../utils';



const ThemePreset: React.FC = () => {
    const [presetVariable, setPresetVariable] = useState<string>('');
    const { theme, setTheme, config } = useTheme();


    const handleSetColor = useCallback((preset: string, color: string) => {
        if (!preset) {
            alert("Please select a preset variable first");
            return;
        }


        const generatedPalette = getColorPalette(color, {
            // colorType: "hex",
            // shades: ["25", '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', "950", 'light', 'dark']
            ...config
        });

        setTheme(prevTheme => {
            const updatedShades = prevTheme.shades.map(shade =>
                shade.name === preset
                    ? { ...shade, color: config?.colorType === "rgb" ? hexToRgb(color) : color, shade: generatedPalette.colors }
                    : shade
            );

            const updatedTheme = {
                ...prevTheme,
                shades: updatedShades
            };

            if (config?.storage === "cookie") {
                // Store the theme in cookies
                setCookie("trio-theme", JSON.stringify(updatedTheme), 365);
            } else {
                // Default to localStorage
                localStorage.setItem("trio-theme", JSON.stringify(updatedTheme));
            }

            // Check for existing style element
            let styleElement = document.getElementById('trio-theme-style');

            if (!styleElement) {
                // Create a new style element if it doesn't exist
                styleElement = document.createElement('style');
                styleElement.id = 'trio-theme-style';
                document.head.appendChild(styleElement);
            }

            // Update CSS variables
            let cssRules = ':root {';
            updatedShades.forEach(shade => {
                Object.entries(shade.shade).forEach(([key, value]) => {
                    cssRules += `--${shade.name}-${key}: ${value};`;
                });
            });
            cssRules += '}';
            styleElement.textContent = cssRules;

            return updatedTheme;
        });
    }, [setTheme]);

    const presetColors = [
        { name: "Red", color: "#FF0000" },
        { name: "Green", color: "#008600" },
        { name: "Blue", color: "#0000FF" },
        { name: "Pink", color: "#FF00FF" },
        { name: "Yellow", color: "#FFFF00" },
        { name: "Cyan", color: "#00FFFF" },
        { name: "Orange", color: "#FFA500" },
        { name: "Purple", color: "#800080" },
        { name: "Brown", color: "#A52A2A" },
        { name: "Teal", color: "#008080" },
        { name: "Indigo", color: "#4B0082" },
        { name: "Lime", color: "#00FF00" },
        { name: "Amber", color: "#FFBF00" },
        { name: "Deep Purple", color: "#673AB7" },
        { name: "Light Blue", color: "#03A9F4" },
        { name: "Light Green", color: "#8BC34A" },
        { name: "Deep Orange", color: "#FF5722" },
        { name: "Grey", color: "#9E9E9E" },
        { name: "Blue Grey", color: "#607D8B" },
        { name: "Black", color: "#000000" },
        { name: "White", color: "#FFFFFF" }
    ];


    // preset is active or not

    const isActivePreset = (color: string, theme: ThemeType) => {
        const dyColor = config?.colorType === "rgb" ? hexToRgb(color) : color;
        //check preset variable is matching with theme shades name
        //check preset color is matching with theme shades color
        return theme?.shades?.some(shade => shade.name === presetVariable && shade.color === dyColor);

    }




    return (
        <div className='flex flex-col gap-2 '>
            <div>
                <h1 className='text-sm'>Themes</h1>
                <p className='text-xs'>Choose any of the preset variable and pick color</p>
            </div>
            <select
                value={presetVariable}
                onChange={(e) => setPresetVariable(e.target.value)}
                className="bg-slate-200 transition-all duration-300 dark:bg-slate-700 max-w-[250px] py-1 px-2 rounded-md border shadow-sm hover:bg-gray-300 outline-none ring-0 hover:dark:bg-slate-800 dark:border-slate-600 text-sm text-gray-600 dark:text-slate-300 capitalize"
            >
                <option value="">Select preset</option>
                {theme?.shades?.map(shade => (
                    <option key={shade.name} value={shade.name}>{shade.name}</option>
                ))}
            </select>

            <div className="flex gap-2 flex-wrap max-w-[450px] md:max-w-[900px]">
                {presetColors.map(({ name, color }) => (
                    <button
                        key={name}
                        onClick={() => handleSetColor(presetVariable, color)}
                        className={cn("bg-gray-100 dark:bg-slate-700 transition-all duration-300  dark:text-slate-300 dark:border-slate-600 hover:dark:bg-slate-800 md:pr-4 md:pl-1 md:py-0.5 flex items-center gap-2 rounded-full border-[1px] border-slate-300 shadow-sm hover:bg-gray-300 text-sm text-gray-600",
                            isActivePreset(color, theme) ? "ring ring-primary-500 bg-primary-200 shadow-lg shadow-primary-500" : ""
                        )}
                    >
                        <div className="h-[25px] w-[25px] rounded-full" style={{ backgroundColor: color }} />
                        <span className='hidden md:block'>{name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemePreset;