import { useCallback } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CheckBoxProps } from "./interface"

const CheckBox = ({
    checked,
    label,
    name,
    onChange,
    disabled,
    hidden
}: CheckBoxProps) => {

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.checked;
        onChange?.({
            name, value: inputValue
        })
    }, [onChange, name]);

    const element =
        <Checkbox
            checked={checked}
            onChange={handleInputChange}
        />

    return (
        <FormControlLabel
            hidden={hidden}
            control={element}
            label={label}
            disabled={disabled}
            name={name}
        />
    )
}

export default CheckBox