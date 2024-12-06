import { SelectProps } from "@mui/material";
import { ChangePropType } from "../../types";

export type OptionsRecord = {
  label: string;
  value: string;
};

export type SelectItemsProps = SelectProps & {
  label: string;
  name: string;
  value?: string;
  handleChange?: (event: ChangePropType) => void;
  options?: OptionsRecord[];
  loading?: boolean;
};
