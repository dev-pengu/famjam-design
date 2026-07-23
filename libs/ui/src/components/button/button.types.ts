import React, { ReactNode } from 'react';
import { IconName } from '@famjam/icons';

export enum ButtonVariant {
  Filled = 'filled',
  Outline = 'outline',
  Ghost = 'ghost',
  Glass = 'glass',
  Text = 'text',
}

export enum ButtonSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum ButtonColor {
  Default = 'default',
  Inverted = 'inverted',
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export enum ButtonShape {
  Rounded = 'rounded',
  Square = 'square',
}

type BaseButtonProps = {
  children: ReactNode;
  asChild?: boolean;
  disabled?: boolean;
  color?: ButtonColor;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  startIcon?: IconName;
  endIcon?: IconName;
  as?: React.ElementType;
};

export type ButtonProps = BaseButtonProps & {
  href?: never;
  to?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type LinkButtonProps = BaseButtonProps & {
  href?: string;
  to?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonPropsType = ButtonProps | LinkButtonProps;
