'use client'

import { memo, useCallback, useState } from "react";
import { twMerge } from 'tailwind-merge'
import { InputTextProps } from "./interface"

const InputText = ({
    width,
    placeHolder,
    onChange,
    name,
    type,
    label,
    disabled,
    value,
    className
}: InputTextProps) => {

    const mergedClassName = twMerge("relative z-0 w-2/6 group", className)

    const isPasswordField = type === "password"

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPasswordChange = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        onChange?.({
            name, value: inputValue
        })
    }, [onChange, name]);

    return (
        <div className={mergedClassName} style={{
            width
        }} >
            <div className="relative z-0 w-full group">
                <input
                    type={!isPasswordField ? type : showPassword ? "" : "password" || "text"}
                    name="floating_input"
                    id={name}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder={placeHolder || " "}
                    onChange={handleInputChange}
                    disabled={disabled}
                    value={value}
                />
                {isPasswordField && <span className="absolute top-2.5 right-0 font-thin cursor-pointer" onClick={handleShowPasswordChange}>show</span>}
                <label
                    htmlFor={name}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
                >
                    {label}
                </label>
            </div>
        </div>
    )
}

export default memo(InputText)