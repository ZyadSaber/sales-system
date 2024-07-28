'use client'

import { memo, useCallback, useState } from "react";
import TextField from '@mui/material/TextField';
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
    className,
    padding = "0",
    ...props
}: InputTextProps) => {

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
        <TextField
            id="outlined-basic"
            label={label}
            variant="outlined"
            className={className}
            type={isPasswordField && !showPassword ? "password" : 'text'}
            // onChange={handleShowPasswordChange}
            onChange={handleInputChange}
            value={value}
            disabled={disabled}
            style={{
                width,
                padding
            }}
            placeholder={placeHolder}
            size="small"
            {...props}
        />
    )
}

export default memo(InputText)