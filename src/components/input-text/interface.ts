import { ChangeEvent } from "@/types";

export interface InputTextProps {
  width?: string;
  placeHolder?: string;
  name: string;
  onChange?: (arg0: ChangeEvent) => void;
  type?: string;
  label?: string;
  disabled?: boolean;
  value?: string | number;
  className?: string;
  padding?: string;
}
