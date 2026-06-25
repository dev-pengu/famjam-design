import { Color } from '@famjam/tokens/base.styles';

export enum ColorSpinnerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',
}

export const COLOR_SPINNER_SIZE_VALUE: Record<ColorSpinnerSize, number> = {
  [ColorSpinnerSize.Small]: 16,
  [ColorSpinnerSize.Medium]: 18,
  [ColorSpinnerSize.Large]: 24,
  [ColorSpinnerSize.XLarge]: 32,
};

export interface ColorSpinnerProps {
  size?: ColorSpinnerSize;
  primaryColor?: Color;
  secondaryColor?: Color;
  className?: string;
  testID?: string;
}
