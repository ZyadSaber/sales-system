import { memo, useCallback } from "react";
import InputField from "../input-field";
import { ChangePropType, InputFieldProps } from "../../types"

export type InputNumberProps = InputFieldProps & {
    min?: number;
    max?: number;
};

const InputNumber = ({
    min,
    max,
    handleChange: _handleChange,
    ...props
}: InputNumberProps) => {

    const handleChange = useCallback(({ name, value }: ChangePropType) => {
        if ((min === 0 || min) && +value < min) return _handleChange?.({ name, value: min })
        if ((max === 0 || max) && +value > max) return _handleChange?.({ name, value: max })
        _handleChange?.({ name, value })
    }, [_handleChange, min, max])

    return (
        <>
            <InputField
                type="number"
                // inputProps={{
                //     className: "appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden css-1xp5r68-MuiFormControl-root-MuiTextField-root"
                // }}
                handleChange={handleChange}
                {...props}
            />
        </>
    )
}

export default memo(InputNumber)