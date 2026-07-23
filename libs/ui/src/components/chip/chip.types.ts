import type { IconName } from '@famjam/icons';
import { MouseEvent } from 'react';

export enum ChipColor {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export type ChipProps = {
  label: string;
  color?: ChipColor;
  large?: boolean;
  leadingIcon?: IconName;
  dismissable?: boolean;
  onDismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
  accessibilityLabel?: string;
  testID?: string;
} & React.HTMLAttributes<HTMLDivElement>;