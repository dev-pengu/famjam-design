import { RadioSize } from '../radio/radio.types';

export enum RadioGroupOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type RadioGroupProps = {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: RadioSize;
  radioLabelPosition?: 'start' | 'end';
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  orientation?: RadioGroupOrientation;
  className?: string;
};
