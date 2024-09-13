
import clsx from "./clsx";
import { twMerge } from "./tailwind-merge";

type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(args));
};