import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NumberInputProps } from "./interface"

const NumberInput = ({
    min,
    max,
    value,
    onChange,
    name,
    disabled,
    hidden,
    width,
    padding,
    margin
}: NumberInputProps) => {

    const handleChange = useCallback((value: number | string) => {
        onChange?.({
            name, value
        })
    }, [name, onChange])

    const handleIncrement = useCallback(() => {
        if ((max && value < max) || !max) {
            handleChange(value + 1);
        }
    }, [handleChange, max, value]);

    const handleDecrement = useCallback(() => {
        if ((min && value > min) || !min) {
            handleChange(value - 1);
        }
    }, [handleChange, min, value]);

    return (
        !hidden ?
            <div
                className="relative flex items-center"
                style={{ width, padding, margin }}
            >
                <TextField
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    inputProps={{ min, max }}
                    className="w-full p-0"
                    size='small'
                    InputProps={{
                        className: 'p-0',
                    }}
                    disabled={disabled}
                />
                <div className="absolute right-0 flex flex-col">
                    <IconButton
                        onClick={handleIncrement}
                        disabled={(max && value >= max) || disabled}
                        className={`p-0 ${max && value >= max ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                        <ArrowDropUpIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleDecrement}
                        disabled={(min && value <= min) || disabled}
                        className={`p-0 ${min && value <= min ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                        <ArrowDropDownIcon />
                    </IconButton>
                </div>
            </div> : undefined
    );
};

export default NumberInput;
