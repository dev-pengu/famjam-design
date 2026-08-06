import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

export enum TimePickerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type TimePickerProps = {
  value?: string; // 'HH:mm'
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: TimePickerSize;
  label?: string;
  labelVariant?: LabelVariant;
  helperMessage?: string;
  state?: InputState;
  step?: number; // granularity in seconds, e.g. 60 for whole-minute steps, 900 for 15-minute steps
  required?: boolean;
  disabled?: boolean;
  testID?: string;
  className?: string;
};
