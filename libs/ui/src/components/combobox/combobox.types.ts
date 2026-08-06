import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

export enum ComboboxSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type ComboboxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: React.SetStateAction<string | undefined>) => void;
  size?: ComboboxSize;
  label?: string;
  labelVariant?: LabelVariant;
  helperMessage?: string;
  state?: InputState;
  placeholder?: string;
  noOptionsMessage?: string;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
};
