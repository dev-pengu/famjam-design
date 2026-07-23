export enum PaginationButton {
  First = 'first',
  Previous = 'previous',
  Next = 'next',
  Last = 'last',
  StartEllipsis = 'start-ellipsis',
  EndEllipsis = 'end-ellipsis',
}

export type PaginationItemRenderProps = {
  onClick?: () => void;
  type: PaginationButton | 'page';
  page: number | null;
  selected: boolean;
  disabled?: boolean;
  'aria-current'?: 'page' | undefined;
};

export type PaginationOptions = {
  boundaryCount?: number;
  count?: number;
  defaultPage?: number;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: (value: React.SetStateAction<number | undefined>) => void;
  page?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
};

export enum PaginationColor {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
}

export enum PaginationShape {
  Circular = 'circular',
  Rounded = 'rounded',
}

export enum PaginationSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum PaginationVariant {
  Text = 'text',
  Outlined = 'outlined',
}

export type PaginationDisplayProps = {
  color?: PaginationColor;
  shape?: PaginationShape;
  size?: PaginationSize;
  variant?: PaginationVariant;
};

export type PaginationItemProps = PaginationItemRenderProps &
  PaginationDisplayProps & { 'aria-label'?: string; className?: string };

export type PaginationProps = {
  itemRenderer?: (params: PaginationItemProps) => React.ReactNode;
  ariaLabelProvider?: (type: PaginationButton | 'page', page: number | null, selected: boolean) => string;
  className?: string;
} & PaginationOptions &
  PaginationDisplayProps;
