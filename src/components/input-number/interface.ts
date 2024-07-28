import { ChangeEvent } from "@/types";

export interface NumberInputProps {
  min?: number;
  max?: number;
  value: number;
  onChange?: (arg0: ChangeEvent) => void;
  name: string;
  disabled?: boolean;
  hidden?: boolean;
  width?: string;
  padding?: string;
  margin?: string;
}
