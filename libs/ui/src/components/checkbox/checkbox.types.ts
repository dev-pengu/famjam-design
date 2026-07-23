export enum CheckboxSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type CheckboxProps = {
  label?: string;
  size?: CheckboxSize;
  disabled?: boolean;
  error?: boolean;
  defaultChecked?: boolean | 'indeterminate';
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: React.SetStateAction<boolean | 'indeterminate' | undefined>) => void;
  className?: string;
  required?: boolean;
  id?: string;
};
