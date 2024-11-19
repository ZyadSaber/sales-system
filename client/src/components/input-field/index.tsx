import { useCallback, memo } from 'react';
import TextField from "@mui/material/TextField";
import { InputFieldProps } from "../../types"

const InputField = ({ name, value, handleChange, ...props }: InputFieldProps) => {
  const _handleChange =
    useCallback((event: any) => {
      handleChange?.({ name, value: event.target.value });
    }
      , [handleChange, name]);
  return (
    <TextField
      onChange={_handleChange}
      name={name}
      value={value}
      variant="standard"
      {...props}
    />
  );
};

export default memo(InputField);
