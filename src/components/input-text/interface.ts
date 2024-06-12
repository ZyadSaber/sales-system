export interface InputTextProps {
  width?: string;
  placeHolder?: string;
  name: string;
  onChange?: (ChangeEvent: { name: string; value: string | number }) => void;
  type?: string;
  label?: string;
  disabled?: boolean;
  value?: string | number;
  className?: string;
}
