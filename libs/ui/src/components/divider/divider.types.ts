export enum DividerVariant {
  FullWidth = 'fullWidth',
  Inset = 'inset',
  Middle = 'middle',
}

export enum DividerOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum DividerColor {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

export enum DividerChildAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export type DividerProps = {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  color?: DividerColor;
  childAlign?: DividerChildAlign;
  children?: React.ReactNode;
  className?: string;
};
