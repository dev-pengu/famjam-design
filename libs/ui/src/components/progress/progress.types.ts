import { Color } from '@famjam/tokens/base.styles';

export enum ProgressBarVariant {
  Bar = 'bar',
  Dot = 'dot',
  Glass = 'glass',
}

export type ProgressBarProps = {
  bgColor?: Color;
  progress: number;
  maxValue?: number;
  label?: string;
  height?: number;
  variant?: ProgressBarVariant;
  hideText?: boolean;
  className?: string;
};
