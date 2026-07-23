import { IconName } from '@famjam/icons';

export enum FabSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum FabColor {
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

export enum FabVariant {
  Filled = 'filled',
  Outline = 'outline',
  Ghost = 'ghost',
  Glass = 'glass',
}

export type FabProps = {
  icon: IconName;
  label: string;
  size?: FabSize;
  variant?: FabVariant;
  color?: FabColor;
  disabled?: boolean;
  loading?: boolean;
  extended?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
