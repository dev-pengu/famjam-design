import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

export enum DatePickerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type DatePickerProps = {
  value?: string; // ISO date, 'YYYY-MM-DD'
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: DatePickerSize;
  label?: string;
  labelVariant?: LabelVariant;
  helperMessage?: string;
  state?: InputState;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  testID?: string;
  className?: string;
};
