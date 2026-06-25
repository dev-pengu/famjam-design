import { ReactNode } from 'react';

export enum ButtonVariant {
  Filled = 'filled',
  Outline = 'outline',
  Ghost = 'ghost',
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type ButtonProps = {
  children: ReactNode;
  asChild?: boolean;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};
