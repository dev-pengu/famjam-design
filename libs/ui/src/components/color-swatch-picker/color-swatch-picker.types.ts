export enum ColorSwatchPickerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type ColorSwatchOption = {
  label: string;
  value: string;
};

export type ColorSwatchPickerProps = {
  options?: ColorSwatchOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  size?: ColorSwatchPickerSize;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};
