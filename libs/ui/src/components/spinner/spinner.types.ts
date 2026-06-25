export enum SpinnerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const SPINNER_SIZE_VALUE: Record<SpinnerSize, number> = {
  [SpinnerSize.Small]: 16,
  [SpinnerSize.Medium]: 18,
  [SpinnerSize.Large]: 24,
};

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
  testID?: string;
}
