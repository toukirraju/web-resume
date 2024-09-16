"use client";
import { useTheme } from "@/lib/theme";
import { ThemeType } from "@/lib/theme/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { PiMonitor } from "react-icons/pi";

const ModeSwitch = ({ themeProps }: { themeProps?: ThemeType }) => {
    const { theme, toggleDarkMode } = useTheme();
    const [mode, setMode] = useState(themeProps?.mode || "system");
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            if (!themeProps?.mode && theme?.mode) {
                setMode(theme.mode);
            } else {
                setMode(themeProps?.mode || "system");
            }
            isFirstRender.current = false; // Mark as processed
        }
    }, [themeProps, theme]);

    const handleToggle = () => {
        if (mode === "system") {
            setMode("light");
            toggleDarkMode("light");
        } else if (mode === "light") {
            setMode("dark");
            toggleDarkMode("dark");
        } else {
            setMode("system");
            toggleDarkMode("system");
        }
    };

    return (
        <button
            onClick={handleToggle}
            className="fixed text-primary-dark dark:text-primary-light bottom-8 right-[5rem] rounded-full h-[40px] w-[40px] p-2 bg-primary-100 dark:bg-primary shadow-md flex justify-center items-center"
        >
            {mode === "system" && <PiMonitor />}
            {mode === "light" && <MdLightMode />}
            {mode === "dark" && <MdDarkMode />}
        </button>
    );
};

export default ModeSwitch;
