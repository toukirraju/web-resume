// @typescript-eslint/no-unused-vars
import React from 'react';
export interface ColorSchemeScriptProps extends React.ComponentPropsWithoutRef<'script'> {
  forceColorScheme?: 'light' | 'dark';
  defaultColorScheme?: 'light' | 'dark' | 'auto';
  localStorageKey?: string;
  themeLocalStorageKey?: string;
  colorType?: 'rgb' | 'hex';
}


const getScript = ({
  defaultColorScheme,
  localStorageKey,
  forceColorScheme,
  themeLocalStorageKey,
  colorType,
}: Pick<ColorSchemeScriptProps, 'defaultColorScheme' | 'localStorageKey' | 'forceColorScheme' | 'themeLocalStorageKey' | 'colorType'>) => `
try {
  var _colorScheme = window.localStorage.getItem("${localStorageKey}");
  var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" || _colorScheme === "system" ? _colorScheme : "${defaultColorScheme}";
  var computedColorScheme = (colorScheme !== "auto" && colorScheme !== "system") ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-mode", ${forceColorScheme ? `"${forceColorScheme}"` : 'computedColorScheme'});

  // Define the default theme
  var defaultThemeHex = {
    "name": "default",
    "mode": "light",
    "shades": [
        {
            "name": "primary",
            "color": "#0fffff",
            "shade": {
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
            "name": "secondary",
            "color": "#0f6fff",
            "shade": {
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
            }
        },
    ]
  };

   var defaultThemeRgb = {
    name: "default",
    mode: "light",
    shades: [
      {
        name: "primary",
        color: "15 255 255",
        shade: {
          "25": "247 255 255",
          "50": "242 255 255",
          "100": "232 255 255",
          "200": "196 255 255",
          "300": "158 255 255",
          "400": "87 255 255",
          "500": "15 255 255",
          "600": "11 219 230",
          "700": "8 167 191",
          "800": "6 124 153",
          "900": "3 83 115",
          "950": "1 49 74",
          "light": "247 255 255",
          "dark": "1 49 74"
        }
      },
      {
        name: "secondary",
        color: "15 111 255",
        shade: {
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
      },
    ]
  };

  // Insert theme colors
  var themeData = JSON.parse(window.localStorage.getItem("${themeLocalStorageKey}") || "null");

   // Select the appropriate default theme based on the colorType
      var defaultTheme = ${colorType} === 'rgb' ? defaultThemeRgb : defaultThemeHex;

  // If themeData doesn't exist, use the default theme
  themeData = themeData && themeData.shades ? themeData : defaultTheme;

  var styleElementId = 'trio-theme-style';
  var existingStyleElement = document.getElementById(styleElementId);
  var style = existingStyleElement || document.createElement('style');
  
  if (!existingStyleElement) {
    style.id = styleElementId;
    document.head.appendChild(style);
  }
  
  var cssRules = ':root {';
  themeData.shades.forEach(shade => {
    Object.entries(shade.shade).forEach(([key, value]) => {
      cssRules += \`--\${shade.name}-\${key}: \${value};\`;
    });
  });
  cssRules += '}';
  style.textContent = cssRules;
  
  // Store default theme in localStorage if not already stored
  if (!window.localStorage.getItem("${themeLocalStorageKey}")) {
    window.localStorage.setItem("${themeLocalStorageKey}", JSON.stringify(defaultTheme));
  }
} catch (e) {
  console.error("Error setting color scheme:", e);
}
`;
export function ColorSchemeScript({
  defaultColorScheme = 'light',
  localStorageKey = 'trio-color-scheme-value',
  themeLocalStorageKey = 'trio-theme',
  forceColorScheme,
  colorType = "hex",
  ...others
}: ColorSchemeScriptProps) {
  const _defaultColorScheme = ['light', 'dark', 'auto'].includes(defaultColorScheme)
    ? defaultColorScheme
    : 'light';
  return (
    <script
      {...others}
      data-trio-script
      dangerouslySetInnerHTML={{
        __html: getScript({
          defaultColorScheme: _defaultColorScheme,
          localStorageKey,
          forceColorScheme,
          themeLocalStorageKey,
        }),
      }}
    />
  );
}