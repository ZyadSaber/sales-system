import { memo } from "react"
import TableCell from '@mui/material/TableCell';
import InputField from "../../input-field";
import InputNumber from "../../input-number";
import SelectionCheck from "../../checkbox"
import Select from "../../select"
import SelectWithApiQuery from "../../select-with-api-query";

const TableCellRow = ({
    value,
    column,
    onInputChange
}: any) => {
    const { inputProps } = column

    const renderInput = () => {
        if (inputProps?.inputType === "text") {
            return <InputField
                value={value}
                name={column.field}
                className="w-full"
                handleChange={onInputChange}
                {...inputProps}
            />
        } else if (inputProps?.inputType === "number") {
            return <InputNumber
                value={value}
                name={column.field}
                handleChange={onInputChange}
                className="w-full"
                {...inputProps}
            />
        } else if (inputProps?.inputType === "checkbox") {
            return <SelectionCheck
                checked={value}
                name={column.field}
                handleChange={onInputChange}
                {...inputProps}
            />
        } else if (inputProps?.inputType === "select") {
            return <Select
                value={value}
                name={column.field}
                handleChange={onInputChange}
                className="w-full"
                {...inputProps}
            />
        } else if (inputProps?.inputType === "selectWithApi") {
            return <SelectWithApiQuery
                value={value}
                name={column.field}
                handleChange={onInputChange}
                className="w-full"
                {...inputProps}
            />
        }
        return value.toString()
    }

    return (
        <TableCell>
            {renderInput()}
        </TableCell>
    )
}

export default memo(TableCellRow)