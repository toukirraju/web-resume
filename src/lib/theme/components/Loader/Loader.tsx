import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen w-screen
                    bg-white dark:bg-gray-800
                    [&:has(html[data-mode='dark'])]:bg-gray-800
                    [&:has(html[data-mode='light'])]:bg-white">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 
                      border-gray-900 dark:border-white
                      [&:has(html[data-mode='dark'])]:border-white
                      [&:has(html[data-mode='light'])]:border-gray-900">
            </div>
        </div>
    );
};

export default Loader;