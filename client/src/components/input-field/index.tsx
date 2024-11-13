import { memo, useCallback } from "react";
import { TextField } from "@mui/material";
import { InputFieldProps } from "../../types"

const InputField = ({ name, value, handleChange, ...props }: InputFieldProps) => {
  const _handleChange = useCallback(
    (event: any) => {
      handleChange?.({ name, value: event.target.value });
    },
    [name, handleChange]
  );

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
