import { TextFieldProps } from "@mui/material";

export type RecordWithAnyValue = Record<string, any>;

export type ChangePropType = {
  name: string;
  value: string | number | boolean;
};

export type InputFieldProps = TextFieldProps & {
  name: string;
  value: string;
  handleChange?: (event: ChangePropType) => void;
  wrapperClassName?: string;
};
