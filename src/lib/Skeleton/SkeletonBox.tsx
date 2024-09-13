
import React from 'react';
import { cn } from '../theme/utils';

// Define types for rounded, color, shadow, and animation variants
type RoundedVariant = 'sm' | 'md' | 'lg' | 'full' | 'none';
type ColorVariant = 'primary' | 'secondary' | 'success' | 'error' | 'default' | 'none';
type ShadowVariant = 'sm' | 'md' | 'lg' | 'none';
type AnimationType = 'pulse' | 'leftToRight' | 'none';
type ImageSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

// Props type for the SkeletonBox component
interface BoxProps {
    className?: string;
    height?: string; // Height utility class from Tailwind
    width?: string;  // Width utility class from Tailwind
    rounded?: RoundedVariant;
    color?: ColorVariant;
    shadow?: ShadowVariant;
    shadowColor?: ColorVariant;
    animation?: AnimationType;
    image?: boolean;
    imageSize?: ImageSize;
    children?: React.ReactNode;
}

const SkeletonBox: React.FC<BoxProps> = ({
    className = '',
    height = 'h-2.5', // Default height
    width = 'w-full', // Default width
    rounded = 'full', // Default rounded
    color = 'default', // Default color
    shadow = 'md', // Default shadow
    shadowColor = 'default', // Default shadow color
    animation = 'pulse', // Default animation
    image,
    imageSize = 'sm',
    children
}) => {

    // Map rounded variants to Tailwind classes
    const roundedClasses: Record<RoundedVariant, string> = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
        none: 'rounded-none',
    };

    // Map color variants to Tailwind classes
    const colorClasses: Record<ColorVariant, string> = {
        default: 'bg-gray-500/50 dark:bg-gray-600/50',
        primary: 'bg-primary-500 opacity-[0.7] dark:bg-primary-700',
        secondary: 'bg-secondary-500 opacity-[0.1] dark:bg-secondary-700',
        success: 'bg-green-500 dark:bg-green-700 opacity-[0.2]',
        error: 'bg-red-500 dark:bg-red-700 opacity-[0.7]',
        none: 'bg-transparent',
    };

    // Map shadow variants to Tailwind classes
    const shadowClasses: Record<ShadowVariant, string> = {
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        none: '',
    };

    // Map shadow color variants to Tailwind classes
    const shadowColorClasses: Record<ColorVariant, string> = {
        default: 'shadow-gray-700 dark:shadow-gray-900 ',
        primary: 'shadow-primary-500',
        secondary: 'shadow-secondary-500',
        success: 'shadow-green-500',
        error: 'shadow-red-500',
        none: 'shadow-transparent',
    };

    // Map animation types to custom animation classes
    const animationClasses: Record<AnimationType, string> = {
        pulse: 'animate-pulse duration-300',
        leftToRight: 'animate-pulse-left-to-right',
        none: '',
    };

    const imageClasses: Record<ImageSize, string> = {
        xxs: 'w-3 h-3',
        xs: 'w-5 h-5',
        sm: 'w-10 h-10',
        md: 'w-20 h-20',
        lg: 'w-40 h-40',
    };

    return (
        <div
            className={cn(
                'flex items-center justify-center',
                height,
                width,
                roundedClasses[rounded],
                colorClasses[color],
                shadowClasses[shadow],
                shadowColorClasses[shadowColor],
                animationClasses[animation],
                className
            )}
        >
            {image ? <svg className={cn(
                'w-5 h-5',
                imageClasses[imageSize],
                'text-gray-500 dark:text-gray-400'
            )} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg> : children && children}
        </div>
    );
};

export default SkeletonBox;
