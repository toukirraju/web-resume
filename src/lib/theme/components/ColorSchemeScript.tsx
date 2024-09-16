import React from 'react';
export interface ColorSchemeScriptProps extends React.ComponentPropsWithoutRef<'script'> {
  forceColorScheme?: 'light' | 'dark';
  defaultColorScheme?: 'light' | 'dark' | 'auto';
  localStorageKey?: string;
  themeLocalStorageKey?: string;
  colorType?: 'rgb' | 'hex';
  storage?: 'cookie' | 'localStorage';
}

const getScript = ({
  defaultColorScheme,
  localStorageKey,
  forceColorScheme,
  themeLocalStorageKey,
  colorType,
  storage = "localStorage", // default to localStorage
}: Pick<ColorSchemeScriptProps, 'defaultColorScheme' | 'localStorageKey' | 'forceColorScheme' | 'themeLocalStorageKey' | 'colorType' | 'storage'>) => `
// Utility functions for cookies
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

try {
  var storageType = "${storage}";
  var colorScheme = null;
  var themeData = null;

if (storageType === "cookie") {
    // Get color scheme and theme from cookies
    colorScheme = getCookie("${localStorageKey}") || "${defaultColorScheme}";
    themeData = getCookie("${themeLocalStorageKey}") ? JSON.parse(decodeURIComponent(getCookie("${themeLocalStorageKey}"))) : null;
  } else {
    // Default to localStorage
    colorScheme = window.localStorage.getItem("${localStorageKey}") || "${defaultColorScheme}";
    themeData = window.localStorage.getItem("${themeLocalStorageKey}") ? JSON.parse(window.localStorage.getItem("${themeLocalStorageKey}")) : null;
  }

  // Ensure valid color scheme
  colorScheme = colorScheme === "light" || colorScheme === "dark" || colorScheme === "auto" || colorScheme === "system" ? colorScheme : "${defaultColorScheme}";

  var computedColorScheme = (colorScheme !== "auto" && colorScheme !== "system") ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-mode", ${forceColorScheme ? `"${forceColorScheme}"` : 'computedColorScheme'});

  // Define the default theme
  var defaultThemeHex = {
    "name": "default",
    "mode": "system",
    "shades": [
        {
            "name": "primary",
            "color": "#008080",
            "shade": {
                "25": "#F5FCFC",
                "50": "#EDFAFA",
                "100": "#DAF2F2",
                "200": "#A8E0E0",
                "300": "#7ACCCC",
                "400": "#32A6A6",
                "500": "#008080",
                "600": "#006D73",
                "700": "#00525E",
                "800": "#003D4D",
                "900": "#002838",
                "950": "#001724",
                "light": "#F5FCFC",
                "dark": "#00070D"
            }
        },
        {
            "name": "secondary",
            "color": "#0000FF",
            "shade": {
                "25": "#F7FBFF",
                "50": "#F2F8FF",
                "100": "#E6F1FF",
                "200": "#BFD7FF",
                "300": "#99B8FF",
                "400": "#4D67FF",
                "500": "#0000FF",
                "600": "#0000E6",
                "700": "#0000BF",
                "800": "#000099",
                "900": "#000073",
                "950": "#00004A",
                "light": "#F7FBFF",
                "dark": "#00004A"
            }
        }
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
  
   // Store theme back into localStorage or cookies
  if (storageType === "cookie") {
    setCookie("${themeLocalStorageKey}", encodeURIComponent(JSON.stringify(defaultTheme)), 365);
  } else {
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
  storage = "localStorage", // new prop for storage type
  ...others
}: ColorSchemeScriptProps & { storage?: 'cookie' | 'localStorage' }) {
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
          colorType,
          storage,
        }),
      }}
    />
  );
}
