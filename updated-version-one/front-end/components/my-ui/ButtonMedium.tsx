

import React from 'react'

function ButtonMedium({icon, text , onClick}
                    : { icon: React.ReactNode, text: string , onClick?: () => void | Promise<void> }
) {
    return (
        <div
            className="flex items-center justify-center
            gap-2 w-32 h-10 cursor-pointer border-2 border-gray-400 dark:border-gray-50 rounded-md
            hover:bg-gray-400 transition-all duration-600 font-mono font-bold text-gray-700 dark:text-gray-50
            " onClick={onClick}>
            {icon}
            {text}
        </div>
    )
}

export default ButtonMedium
