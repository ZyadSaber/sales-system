import { memo, useCallback, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputFieldProps } from "../../types"

const InputField = ({ name, value, handleChange, wrapperClassName, ...props }: InputFieldProps) => {
  const _handleChange = useCallback(
    (event: any) => {
      handleChange?.({ name, value: event.target.value });
    },
    []
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, [])

  return (
    <div className={`relative ${wrapperClassName}`}>
      <TextField
        onChange={_handleChange}
        name={name}
        value={value}
        variant="standard"
        style={{
          width: "100%",
        }}
        {...props}
        type={showPassword ? 'text' : 'password'}
      />
      <IconButton
        aria-label={
          showPassword ? 'hide the password' : 'display the password'
        }
        className="absolute right-3 top-3"
        onClick={handleClickShowPassword}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </div>
  );
};

export default memo(InputField);
