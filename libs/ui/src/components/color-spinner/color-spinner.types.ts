export enum ColorSpinnerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xlarge',
}

export interface ColorSpinnerProps {
  size?: ColorSpinnerSize;
  color?: 'monotone' | 'brand' | 'dark';
  className?: string;
  testID?: string;
}
