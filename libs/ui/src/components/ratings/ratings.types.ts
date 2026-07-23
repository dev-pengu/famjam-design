export enum RatingSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type RatingPrecision = 1 | 0.5 | 0.25 | 0.1;

export type RatingHoverInfo = {
  index: number; // which star (0-based)
  value: number; // the rating value the star/portion represents
};

export type RatingProps = {
  value: number | null;
  max?: number;
  precision?: RatingPrecision;
  count: number;
  hideCount?: boolean;
  size?: RatingSize;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: number | null) => void;
  onHoverChange?: (info: RatingHoverInfo | null) => void;
  onCountClick?: () => void;
  className?: string;
};
