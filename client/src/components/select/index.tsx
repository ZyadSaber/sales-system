import { memo, useCallback } from "react"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { RecordWithAnyValue } from "../../types";
import { SelectItemsProps } from "./interface"
import LoadingOverlay from "../loading-overlay";

const SelectField = ({
    label,
    name,
    value,
    handleChange,
    options,
    loading,
    ...props
}: SelectItemsProps) => {
    const _handleChange = useCallback(({ value, record }: { value: string | number, record: RecordWithAnyValue }) => () => {
        handleChange?.({ name, value, record })
    }, [handleChange, name])

    return (
        <Select
            size="small"
            labelId={`${name}_${label}_${value}`}
            id={`${name}_${label}_${value}`}
            value={value}
            label={label}
            {...props}
        >
            {
                !loading ? options?.map(({ label, value, ...record }) => (
                    <MenuItem value={value} onClick={_handleChange({
                        value,
                        record: {
                            label,
                            value,
                            ...record
                        }
                    })}>{label}</MenuItem>
                )) : <MenuItem >
                    <LoadingOverlay loading className="h-3" />
                </MenuItem>
            }
        </Select>
    )
}

export default memo(SelectField)
export * from "./interface"