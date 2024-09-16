"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcHome } from "react-icons/fc";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { TbColorSwatch } from "react-icons/tb";

const SpeedDial = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const toggleSpeedDial = () => {
        setOpen(!open);
    };

    const handleNavigation = (path: string) => {
        router.push(path);

        setOpen(false);
    }

    return (
        <div className="fixed bottom-8 right-8">
            {/* Speed Dial Buttons (open upwards) */}
            <div
                className={`flex flex-col-reverse gap-2 items-center  ${open ? "opacity-100" : "opacity-0 pointer-events-none"
                    } transition-opacity duration-300`}
            >
                <button onClick={() => handleNavigation('/appearance')} className="bg-green-500 text-white flex justify-center items-center h-[40px] w-[40px] p-2 rounded-full shadow-lg hover:bg-green-600 transition duration-100 ease-in-out">
                    <TbColorSwatch />
                </button>
                <button className="bg-red-500 text-white h-[40px] w-[40px] p-2 flex justify-center items-center rounded-full shadow-lg hover:bg-red-600 transition duration-300 ease-in-out">
                    ❤️
                </button>
                <button onClick={() => handleNavigation('/')} className="bg-yellow-500 text-white h-[40px] w-[40px] p-2 flex justify-center items-center rounded-full shadow-lg hover:bg-yellow-600 transition duration-500 ease-in-out">
                    <FcHome />
                </button>
            </div>

            {/* Main Floating Button */}
            <button
                onClick={toggleSpeedDial}
                className="bg-blue-500 mt-3 text-white flex justify-center items-center h-[40px] w-[40px] p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
                <HiOutlineSquare3Stack3D />
            </button>
        </div>
    );
};

export default SpeedDial;
