// @ts-ignore
import colorNamer from "color-namer";
// @ts-ignore
import convert from "color-convert";
import { ShadeOption } from "../types";

export type Palette = {
    name: string;
    colors: {
        [key: string | number]: string;
    };
};

const CMY_HUES = [180, 300, 60];
const RGB_HUES = [360, 240, 120, 0];

export function getTextColor(color: string): "#FFF" | "#333" {
    const rgbColor = convert.hex.rgb(color);

    if (!rgbColor) {
        return "#333";
    }

    const [r, g, b] = rgbColor;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luma < 120 ? "#FFF" : "#333";
}

function hueShift(hues: Array<number>, hue: number, intensity: number) {
    const closestHue = hues.sort(
        (a, b) => Math.abs(a - hue) - Math.abs(b - hue)
    )[0],
        hueShift = closestHue - hue;
    return Math.round(intensity * hueShift * 0.5);
}

function lighten(hex: string, intensity: number): string {
    if (!hex) {
        return "";
    }

    const [h, s, v] = convert.hex.hsv(hex);
    const hue = h + hueShift(CMY_HUES, h, intensity);
    const saturation = s - Math.round(s * intensity);
    const value = v + Math.round((100 - v) * intensity);

    return `#${convert.hsv.hex([hue, saturation, value])}`;
}

function darken(hex: string, intensity: number): string {
    if (!hex) {
        return "";
    }

    const inverseIntensity = 1 - intensity;
    const [h, s, v] = convert.hex.hsv(hex);
    const hue = h + hueShift(RGB_HUES, h, inverseIntensity);
    const saturation = s + Math.round((100 - s) * inverseIntensity);
    const value = v - Math.round(v * inverseIntensity);

    return `#${convert.hsv.hex([hue, saturation, value])}`;
}

export function isValidHexColorCode(str: string) {
    return /^#([0-9A-Fa-f]{3}){1,2}$/.test(str);
}

export function getColorName(color: string): string {
    const { name } = colorNamer(`#${color}`.replace("##", "#")).ntc[0];
    const sanitizedName = name
        .replace(/['/]/gi, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

    return sanitizedName;
}

export function sixDigitsColorHex(hexColor: string) {
    const hexValue = hexColor.replace("#", "");
    return `#${hexValue.length === 3
        ? hexValue.replace(/(.)/g, "$1$1")
        : hexValue.padEnd(6, "0")
        }`;
}

// Color conversion functions
export function hexToHSL(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result || result.length < 4) return [0, 0, 0]; // Return black color if invalid hex

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
        if (l < 0.5) {
            s = (max - min) / (max + min);
        } else {
            s = (max - min) / (2.0 - max - min);
        }
        switch (max) {
            case r:
                h = (g - b) / (max - min);
                break;
            case g:
                h = 2.0 + (b - r) / (max - min);
                break;
            case b:
                h = 4.0 + (r - g) / (max - min);
                break;
        }
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = Math.round(l * 100);
    s = Math.round(s * 100);
    return [h, s, l];
}

export function hslToHex(h: number, s: number, l: number) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x: number) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToRgba(hex: string, alpha?: number): string {
    // Remove the leading # if present
    hex = hex.replace(/^#/, "");

    // Parse r, g, b values
    let r, g, b;

    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
    } else {
        throw new Error("Invalid hex color code");
    }

    if (alpha !== undefined) {
        // return `${r} ${g} ${b} / ${alpha}`;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
        return `${r} ${g} ${b}`;
    }
}


export default function getColorPalette(baseColor?: string, option?: {
    colorType?: "hex" | "rgb";
    alpha?: number;
    shades?: ShadeOption[];
}): Palette {
    if (!baseColor) {
        // thro console error
        return {
            name: "Invalid Color",
            colors: {},
        };
    }

    const fullColorCode = sixDigitsColorHex(baseColor);

    const name = getColorName(fullColorCode);

    const response: Palette = {
        name,
        colors: {},
    };

    const intensityMap: {
        [key in ShadeOption]: number;
    } = {
        '25': 0.97,
        '50': 0.95,
        '100': 0.9,
        '200': 0.75,
        '300': 0.6,
        '400': 0.3,
        '500': 0,
        '600': 0.9,
        '700': 0.75,
        '800': 0.6,
        '900': 0.45,
        '950': 0.29,
        'light': 0.97,  // Same as '50'
        'dark': 0.10,  // Same as '900'
    };

    const convertColor = (color: string) => {
        if (option?.colorType === "rgb") {
            return hexToRgba(color, option.alpha);
        }
        return color;
    };

    const shadesToGenerate = option?.shades || Object.keys(intensityMap) as ShadeOption[];

    shadesToGenerate.forEach((shade) => {
        if (shade === '500') {
            response.colors[shade] = convertColor(fullColorCode);
        } else {
            const intensity = intensityMap[shade];
            const color = shade < '500' || shade === 'light'
                ? lighten(fullColorCode, intensity)
                : darken(fullColorCode, intensity);
            response.colors[shade] = convertColor(color);
        }
    });

    return response as Palette;
}


export const hexToRgb = (hex: string) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
    return `${r} ${g} ${b}`;
};

export const rgbToHex = (rgb: string) => {
    const [r, g, b] = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};


export function isHex(color: string): boolean {
    // Check if it starts with '#' and is 4, 7, or 9 characters long (e.g., #fff, #ffffff, #ffffffff)
    return /^#([0-9A-Fa-f]{3}){1,2}$|^#([0-9A-Fa-f]{4}){1,2}$/.test(color);
}

export function isRgb(color: string): boolean {
    // Check if it's a space-separated string of 3 numbers (e.g., "15 155 155")
    return /^(\d{1,3})\s(\d{1,3})\s(\d{1,3})$/.test(color);
}

