import { DefaultThemeType } from "./ThemeContext";

export const defaultThemeHex: DefaultThemeType = {
    name: "default",
    mode: "light",
    shades: [
        {
            name: "primary",
            color: "#0fffff",
            shade: {
                "25": "#F7FFFF",
                "50": "#F2FFFF",
                "100": "#E8FFFF",
                "200": "#C4FFFF",
                "300": "#9EFFFF",
                "400": "#57FFFF",
                "500": "#0fffff",
                "600": "#0BDBE6",
                "700": "#08A7BF",
                "800": "#067C99",
                "900": "#035373",
                "950": "#01314A",
                "light": "#F7FFFF",
                "dark": "#01314A"
            }
        },
        {
            name: "secondary",
            color: "#0f6fff",
            shade: {
                "25": "#f7fffe",
                "50": "#f2fffe",
                "100": "#e8f7ff",
                "200": "#c4e4ff",
                "300": "#9eb5ff",
                "400": "#578cff",
                "500": "#0f6fff",
                "600": "#0b2ce6",
                "700": "#0839bf",
                "800": "#063599",
                "900": "#035373",
                "950": "#011b4a",
                "light": "#f7fdff",
                "dark": "#010c4a"
            },
        },
    ]
}


export const defaultThemeRgb: DefaultThemeType = {
    "name": "default",
    "mode": "system",
    "shades": [
        {
            "name": "primary",
            "color": "0 128 128",
            "shade": {
                "25": "245 252 252",
                "50": "237 250 250",
                "100": "218 242 242",
                "200": "168 224 224",
                "300": "122 204 204",
                "400": "50 166 166",
                "500": "0 128 128",
                "600": "0 109 115",
                "700": "0 82 94",
                "800": "0 61 77",
                "900": "0 40 56",
                "950": "0 23 36",
                "light": "245 252 252",
                "dark": "0 7 13"
            }
        },
        {
            "name": "secondary",
            "color": "15 111 255",
            "shade": {
                "25": "247 253 255",
                "50": "242 251 255",
                "100": "232 247 255",
                "200": "196 233 255",
                "300": "158 215 255",
                "400": "87 168 255",
                "500": "15 111 255",
                "600": "11 95 230",
                "700": "8 72 191",
                "800": "6 53 153",
                "900": "3 35 115",
                "950": "1 20 74",
                "light": "247 253 255",
                "dark": "1 20 74"
            }
        }
    ]
};
