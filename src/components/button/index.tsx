'use client'

import { memo } from "react";
import { twMerge } from 'tailwind-merge';
import { ButtonProps } from "./interface"

const Button = ({
    label,
    className,
    onClick,
    disabled,
    width
}: ButtonProps) => {
    const mergedClassName = twMerge("px-5 py-2 rounded-md shadow-md", disabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-400 ", className)
    return (
        <button
            className={mergedClassName}
            onClick={onClick}
            disabled={disabled}
            style={{
                width
            }}
        >
            {label}
        </button>
    )
}

export default memo(Button)