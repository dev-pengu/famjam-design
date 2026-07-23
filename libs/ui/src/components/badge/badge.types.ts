export enum BadgeVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

export enum BadgeDisplay {
  Standard = 'standard',
  Dot = 'dot',
}

export enum BadgeHorizontalAlign {
  Left = 'left',
  Right = 'right',
}

export enum BadgeVerticalAlign {
  Top = 'top',
  Bottom = 'bottom',
}

export type BadgeProps = {
  children: React.ReactNode;
  content?: number | string;
  variant?: BadgeVariant;
  display?: BadgeDisplay;
  visible?: boolean;
  showZero?: boolean;
  max?: number;
  horizontalAlign?: BadgeHorizontalAlign;
  verticalAlign?: BadgeVerticalAlign;
  className?: string;
};