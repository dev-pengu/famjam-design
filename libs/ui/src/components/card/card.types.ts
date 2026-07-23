export enum CardVariant {
  Elevated = 'elevated',
  Outlined = 'outlined',
}

export enum CardElevation {
  Flat = 'flat',
  Raised = 'raised',
  Floating = 'floating',
}

export type CardProps = {
  children?: React.ReactNode;
  variant?: CardVariant;
  elevation?: CardElevation;
  className?: string;
};
