export type ShadeOption = '25' | '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950' | 'light' | 'dark';
export type AlgorithmOption = "base-500" | "base-primary";
export type ColorType = "hex" | "rgb";

export type PaletteConfig = {
    shades?: ShadeOption[],
    // algorithm?: AlgorithmOption,
    colorType?: ColorType,
    alpha?: number
}

export type PaletteGeneratorProps = {
    color: string;
    shadeName?: string;
    getPalette: (palette: {
        name: string;
        colors: Record<string, string>
    }) => void;
    config?: PaletteConfig;
}