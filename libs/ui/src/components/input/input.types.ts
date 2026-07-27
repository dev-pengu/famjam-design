import { InputState } from './input-base';

export enum InputVariant {
  Text = 'text',
  Number = 'number',
  Password = 'password',
  TextArea = 'textarea',
  Email = 'email',
}

export enum LabelVariant {
  Primary = 'primary',
  Float = 'float',
}

export enum InputSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface InputProps {
  label?: string;
  labelVariant?: LabelVariant;
  variant?: InputVariant;
  inputSize?: InputSize;
  helperMessage?: string;
  state?: InputState;
  showCharacterCount?: boolean;
  testID?: string;
  required?: boolean;
  children?: React.ReactNode;
}
