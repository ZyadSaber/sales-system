import { TextFieldProps, CheckboxProps } from "@mui/material";

export type RecordWithAnyValue = Record<string, any>;

export type ChangePropType = {
  name: string;
  value: string | number | boolean | RecordWithAnyValue | RecordWithAnyValue[];
  record?: RecordWithAnyValue;
};

export type InputFieldProps = TextFieldProps & {
  name: string;
  value: string;
  handleChange?: (event: ChangePropType) => void;
  wrapperClassName?: string;
};

export type SelectionCheckProps = CheckboxProps & {
  handleChange?: (event: ChangePropType) => void;
  name: string;
  checked: boolean;
  label?: string;
};
