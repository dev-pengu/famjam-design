export enum SkeletonVariant {
  Circular    = 'circular',
  Rectangular = 'rectangular',
  Rounded     = 'rounded',
  Text        = 'text',
}

export type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animate?: boolean;
  // Text variant only
  lines?: number;
  lastLineWidth?: number | string; // last line is usually shorter
  // Child inference
  children?: React.ReactNode;
  className?: string;
};