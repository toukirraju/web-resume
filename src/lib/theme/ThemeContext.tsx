"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PaletteConfig } from "./types";
import { defaultThemeHex, defaultThemeRgb } from "./data";
import { applyThemeInDOM } from "./utils/applyThemeInDOM";


// Utility functions for cookies
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  // Dispatch a custom event when a cookie is set
  window.dispatchEvent(new CustomEvent('cookieChange', { detail: { key: name, value } }));
};

const getCookie = (name: string) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

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


export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themeLoader,
  config,
  defaultTheme
}) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeType>(() => ({} as ThemeType));

  // Utility function to get theme from either localStorage or cookie
  const getStoredTheme = () => {
    if (config.storage === "cookie") {
      const cookieTheme = getCookie("trio-theme");
      return cookieTheme ? JSON.parse(cookieTheme) : null;
    } else {
      const localTheme = localStorage.getItem("trio-theme");
      return localTheme ? JSON.parse(localTheme) : null;
    }
  };



  // Utility function to store theme in either localStorage or cookie
  const storeTheme = (theme: ThemeType) => {
    if (config.storage === "cookie") {
      setCookie("trio-theme", JSON.stringify(theme), 365); // Store for 1 year
    } else {
      localStorage.setItem("trio-theme", JSON.stringify(theme));
    }
    // Dispatch a custom event when the theme is stored
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  };

  useEffect(() => {

    const initTheme = async () => {
      // const storedTheme = getStoredTheme();
      const localTheme = getStoredTheme();

      if (defaultTheme) {
        if (defaultTheme.name === "default") {
          throw new Error(
            "Please change default theme name from 'default' to something else because 'default' is a reserved keyword. e.g. name: 'my-default-theme'"
          );
        }
        if (localTheme) {
          const themeObj = localTheme as ThemeType;

          if (defaultTheme.name !== "default" && themeObj?.name !== defaultTheme.name) {
            // if default theme name is not 'default' and local storage theme name is not same as default theme name then remove local storage and set default theme
            storeTheme(defaultTheme);
            setTheme(defaultTheme);
          } else {
            //check if color type is rgb or hex if config color type is rgb but local storage is hex then remove local storage and set default theme 
            //also if config color type is same as local storage then set local storage theme
            if (config.colorType === "rgb" && themeObj.shades[0].color.includes("#")) {
              setTheme(defaultThemeRgb);
              storeTheme(defaultThemeRgb);
            } else if (config.colorType === "hex" && !themeObj.shades[0].color.includes("#")) {
              setTheme(defaultThemeHex);
              storeTheme(defaultThemeHex);
            } else {
              setTheme(themeObj);
              storeTheme(themeObj);
              applyDarkMode(themeObj.mode);
            }
          }

        } else {
          console.log("local theme not found");
        }
      } else {
        if (localTheme) {
          const themeObj = localTheme as ThemeType;
          if (config.colorType === "rgb" && themeObj.shades[0].color.includes("#")) {
            setTheme(defaultThemeRgb);
            storeTheme(defaultThemeRgb);
          } else if (config.colorType === "hex" && !themeObj.shades[0].color.includes("#")) {
            setTheme(defaultThemeHex);
            storeTheme(defaultThemeHex);
          } else {
            setTheme(themeObj);
            storeTheme(themeObj);
            applyDarkMode(themeObj.mode);
          }
        } else {
          const initialTheme = defaultTheme || (config.colorType === "rgb" ? defaultThemeRgb : defaultThemeHex);
          setTheme(initialTheme);
          storeTheme(initialTheme);
        }

      }


      setLoading(false);
    };

    initTheme();

    // Add event listener for theme changes
    const handleThemeChange = (event: CustomEvent) => {
      applyThemeInDOM(event.detail.theme);
    };
    window.addEventListener('themeChange', handleThemeChange as EventListener);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, [config, defaultTheme]);




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
    setCookie("theme-mode", mode, 365);
    localStorage.setItem("theme-mode", mode);
    // if (config.storage === "cookie") {
    //   console.log("set moed")
    //   setCookie("theme-mode", mode, 365);
    // } else {
    //   localStorage.setItem("theme-mode", mode);
    // }
  };

  const changeTheme = (theme: Partial<ThemeType>) => {
    setTheme((prev) => {
      const updatedTheme = { ...prev, ...theme };
      storeTheme(updatedTheme);
      return updatedTheme;
    });
  };

  const toggleDarkMode = (mode: string) => {
    applyDarkMode(mode);
    setTheme((prev) => {
      const updatedTheme = { ...prev, mode };
      storeTheme(updatedTheme);
      return updatedTheme;
    });
  };

  const contextValue = useMemo(
    () => ({
      config,
      theme,
      setTheme,
      toggleDarkMode,
      changeTheme,
    }),
    [config, theme]
  );

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
