
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PaletteConfig } from "./types";
import { isHex, isRgb } from "./utils";


type ShadeType = {
  name: string;
  color: string;
  shade: Record<string, string>;
};

type BaseThemeType = {
  mode: string;
  shades: ShadeType[];
};

export type DefaultThemeType = BaseThemeType & {
  name: "default";
};

export type CustomThemeType = BaseThemeType & {
  name: Exclude<string, "default">;
};

export type ThemeType = DefaultThemeType | CustomThemeType;

type ThemeContextType = {
  config: PaletteConfig;
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  toggleDarkMode: (mode: string) => void;
  changeTheme: (theme: Partial<ThemeType>) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: CustomThemeType;
  themeLoader?: React.ReactNode;
  config: PaletteConfig;
};


const defaultThemeHex: DefaultThemeType = {
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


const defaultThemeRgb: DefaultThemeType = {
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


export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themeLoader,
  config,
  defaultTheme
}) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeType>(() => ({

  } as ThemeType));


  // initialized theme 
  useEffect(() => {
    const initTheme = async () => {
      // get local storage theme 
      const localTheme = localStorage.getItem("trio-theme");

      if (defaultTheme) {
        if (defaultTheme.name === "default") {
          throw new Error("Please change default theme name from 'default' to something else because 'default' is a reserved keyword. e.g. name: 'my-default-theme'");
        }
        if (localTheme) {
          const themeObj = JSON.parse(localTheme) as ThemeType;

          if (defaultTheme.name !== "default" && themeObj?.name !== defaultTheme.name) {
            // if default theme name is not 'default' and local storage theme name is not same as default theme name then remove local storage and set default theme
            localStorage.setItem("trio-theme", JSON.stringify(defaultTheme));
            setTheme(defaultTheme);
          } else {
            //check if color type is rgb or hex if config color type is rgb but local storage is hex then remove local storage and set default theme 
            //also if config color type is same as local storage then set local storage theme
            if (config.colorType === "rgb" && themeObj.shades[0].color.includes("#")) {
              setTheme(defaultThemeRgb);
              localStorage.setItem("trio-theme", JSON.stringify(defaultThemeRgb));
            } else if (config.colorType === "hex" && !themeObj.shades[0].color.includes("#")) {
              setTheme(defaultThemeHex);
              localStorage.setItem("trio-theme", JSON.stringify(defaultThemeHex));
            } else {
              setTheme(themeObj);
              localStorage.setItem("trio-theme", JSON.stringify(themeObj));

              // apply dark mode
              applyDarkMode(themeObj.mode);
            }
          }


        } else {
          console.log("local theme not found");
          // const initialTheme = defaultTheme || (config.colorType === "rgb" ? defaultThemeRgb : defaultThemeHex);
          // setTheme(initialTheme);
          // localStorage.setItem("trio-theme", JSON.stringify(initialTheme));
        }
      } else {
        // if default theme is not provided then set local storage theme 
        if (localTheme) {
          const themeObj = JSON.parse(localTheme) as ThemeType;

          //check if color type is rgb or hex if config color type is rgb but local storage is hex then remove local storage and set default theme 
          //also if config color type is same as local storage then set local storage theme
          if (config.colorType === "rgb" && themeObj.shades[0].color.includes("#")) {
            setTheme(defaultThemeRgb);
            localStorage.setItem("trio-theme", JSON.stringify(defaultThemeRgb));
          } else if (config.colorType === "hex" && !themeObj.shades[0].color.includes("#")) {
            setTheme(defaultThemeHex);
            localStorage.setItem("trio-theme", JSON.stringify(defaultThemeHex));
          } else {
            setTheme(themeObj);

            // apply dark mode
            applyDarkMode(themeObj.mode);
          }

        } else {
          const initialTheme = defaultTheme || (config.colorType === "rgb" ? defaultThemeRgb : defaultThemeHex);
          setTheme(initialTheme);
          localStorage.setItem("trio-theme", JSON.stringify(initialTheme));
        }
      }

      setLoading(false);
    };

    initTheme();
  }, [
    theme.name,
    theme.mode,
    config.colorType,
    defaultTheme
  ]);


  // apply dark mode
  const applyDarkMode = (mode: string) => {
    if (mode === "dark") {
      // set data-mode attribute for dark mode
      document.documentElement.setAttribute("data-mode", "dark");
    } else if (mode === "light") {
      // set data-mode attribute for light mode
      document.documentElement.setAttribute("data-mode", "light");
    } else if (mode === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // set data-mode attribute for dark mode
        document.documentElement.setAttribute("data-mode", "dark");
      } else {
        // set data-mode attribute for light mode
        document.documentElement.setAttribute("data-mode", "light");
      }
    }
    localStorage.setItem("theme-mode", mode);
  };

  const changeTheme = (theme: Partial<ThemeType>) => {
    // change theme color variables
    setTheme(prev => {
      const updatedTheme = { ...prev, ...theme };
      localStorage.setItem("trio-theme", JSON.stringify(updatedTheme));
      return updatedTheme;
    });
  }


  const toggleDarkMode = (mode: string) => {
    // toggle dark,light,system mode and update theme mode and theme list and local storage accordingly
    applyDarkMode(mode);
    setTheme(prev => {
      const updatedTheme = { ...prev, mode };
      localStorage.setItem("trio-theme", JSON.stringify(updatedTheme));
      return updatedTheme;
    });


  }


  const contextValue = useMemo(() => ({
    config,
    theme,
    setTheme,
    toggleDarkMode,
    changeTheme,
  }), [
    config,
    theme,
    setTheme,
    toggleDarkMode,
    changeTheme,
  ]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {loading && themeLoader ? themeLoader : children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};