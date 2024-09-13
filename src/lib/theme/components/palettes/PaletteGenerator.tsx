
"use client";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { PaletteGeneratorProps } from "../../types";
import { getColorPalette } from "../../utils";

const PaletteGenerator = ({
    color,
    shadeName,
    getPalette,
    config
}: PaletteGeneratorProps) => {
    const [defaultColor, setDefaultColor] = useState(config?.colorType === 'rgb' ? rgbToHex(color) : color || "#0a6b56");
    const [inputValue, setInputValue] = useState(color || "#0a6b56");

    const colorType = config?.colorType || "hex";


    useEffect(() => {

        if (color) {
            if (config?.colorType === 'rgb') {
                const rgbRegex = /^(\d{1,3}) \s*(\d{1,3}) \s*(\d{1,3})$/;

                if (rgbRegex.test(color)) {
                    setDefaultColor(rgbToHex(color));
                    setInputValue(color);
                }
            } else {

                const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
                if (hexRegex.test(color)) {
                    setDefaultColor(color.startsWith('#') ? color : `#${color}`);
                    setInputValue(color.startsWith('#') ? color : `#${color}`);
                }
            }
        }

    }, [color]);



    const generatedPalette = useMemo(() => {
        return getColorPalette(defaultColor, {
            colorType,
            shades: config?.shades || ["25", "50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950", "light", "dark"],
            ...(config?.alpha && { alpha: config.alpha }),
        });
    }, [defaultColor, config, colorType]);

    useEffect(() => {
        if (generatedPalette && generatedPalette.name) {
            getPalette({
                name: shadeName ? shadeName : generatedPalette.name,
                colors: generatedPalette.colors,
            });

        }
    }, [generatedPalette, getPalette, shadeName]);

    const getTextColor = useCallback((shade: string) => {
        const numericShade = parseInt(shade, 10);
        return numericShade >= 500 || shade === "dark" ? "#ffffff" : "#000000";
    }, []);

    const copyToClipboard = useCallback((colorCode: string) => {
        navigator.clipboard.writeText(colorCode)
            .then(() => alert(`Copied ${colorCode} to clipboard!`))
            .catch(() => alert('Failed to copy color code.'));
    }, []);

    const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (colorType === "rgb") {
            const rgbRegex = /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/;
            if (rgbRegex.test(newValue)) {
                setDefaultColor(newValue);
            }
        } else {
            const hexRegex = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
            if (hexRegex.test(newValue)) {
                setDefaultColor(newValue.startsWith('#') ? newValue : `#${newValue}`);
            }
        }
    }, [colorType]);

    const handleColorPickerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const hexValue = e.target.value;
        setDefaultColor(hexValue);
        if (colorType === "rgb") {
            const rgbValue = hexToRgb(hexValue);

            setInputValue(rgbValue);
        } else {
            // setDefaultColor(hexValue);
            setInputValue(hexValue);
        }
    }, [colorType]);

    const formatColorForDisplay = useCallback((color: string) => {
        if (colorType === "rgb") {
            return `rgb(${color})`;
        }
        return color;
    }, [colorType]);



    return (
        <div className="rounded-md shadow-md overflow-hidden shadow-slate-800 max-w-md" style={{ background: formatColorForDisplay(inputValue) }}>
            <div className="p-2 flex flex-col gap-1 box">
                <h1 className='capitalize text-2xl drop-shadow-xl font-bold'>{shadeName}</h1>
                <p className="text-xs">{generatedPalette.name}</p>

                <div className="flex justify-between">
                    <input
                        id='color-input'
                        type="text"
                        value={inputValue}
                        onChange={handleColorChange}
                        placeholder={colorType === "rgb" ? "R, G, B" : "#RRGGBB"}
                        className="bg-transparent w-full outline-none"
                    />
                    <label htmlFor={`color-picker-${shadeName}`} className="cursor-pointer h-7 w-7 bg-white rounded-lg shadow-md flex justify-center items-center">
                        <div className="h-5 w-5  rounded-md flex justify-center items-center" style={{ background: formatColorForDisplay(`var(--${shadeName}-200)`) }}>
                            <div className="h-3 w-3 rounded-md flex justify-center items-center" style={{ background: formatColorForDisplay(inputValue) }}>
                                <input
                                    className="sr-only"
                                    id={`color-picker-${shadeName}`}
                                    type="color"
                                    value={colorType === "rgb" ? rgbToHex(inputValue) : inputValue}
                                    onChange={handleColorPickerChange}
                                />
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div className='flex text-sm flex-wrap justify-center'>
                {Object.entries(generatedPalette.colors).map(([key, value]) => (
                    <div
                        className='flex items-center justify-center flex-grow flex-col cursor-pointer'
                        title="Double click to copy color code"
                        key={key}
                        style={{
                            backgroundColor: colorType === "hex" ? value : `rgb(${value})`,
                            color: getTextColor(key),
                            width: 'calc(5vw + 25px)',
                            height: 'calc(5vh + 10px)',
                            fontSize: 'calc(0.5vw + 6px)',
                            padding: 'calc(0.3vw + 1px)',
                        }}
                        onDoubleClick={() => copyToClipboard(value)}
                    >
                        <strong>{key}</strong>
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Helper functions for color conversion rgb value like "255 255 255" to hex value like "#ffffff"
function rgbToHex(rgb: string): string {
    const [r, g, b] = rgb.split(' ').map((val) => parseInt(val, 10));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

}

function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '';
}

export default PaletteGenerator;

