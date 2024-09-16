import { ThemeType } from "../ThemeContext";

export const applyThemeInDOM = (theme: ThemeType) => {
    let styleElement = document.getElementById("trio-theme-style");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "trio-theme-style";
        document.head.appendChild(styleElement);
    }

    let cssRules = ":root {";
    theme.shades.forEach((shade) => {
        Object.entries(shade.shade).forEach(([key, value]) => {
            cssRules += `--${shade.name}-${key}: ${value};`;
        });
    });
    cssRules += "}";
    styleElement.textContent = cssRules;
}