import { memo, useCallback } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SelectionCheckProps } from "../../types"

const SelectionCheck = ({
    handleChange,
    required,
    name,
    checked,
    label,
    ...props
}: SelectionCheckProps) => {
    const _handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        handleChange?.({ name, value: event.target.checked });
    }, [handleChange])
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={_handleChange}
                    name={name}
                    required={required}
                    {...props}
                />
            }
            label={label} />
    )
}

export default memo(SelectionCheck)