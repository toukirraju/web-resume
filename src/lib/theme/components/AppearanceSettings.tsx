
import { ThemeMode, ThemePalette, ThemePreset } from ".";

const AppearanceSettings: React.FC = () => {

    return (
        <main className="flex min-h-screen flex-col items-center  bg-primary-light dark:bg-primary-dark dark:text-white">
            <div className="flex flex-col justify-center items-start gap-3 w-full p-2 md:max-w-[70%]">
                <ThemeMode />
                <ThemePreset />
                <ThemePalette />
            </div>
        </main>
    );
};

export default AppearanceSettings;




