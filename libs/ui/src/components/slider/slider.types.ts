export enum SliderSize {
  Small = 'small',
  Default = 'default',
}

export enum SliderOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum SliderVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export enum SliderLabelDisplay {
  Auto = 'auto',
  On = 'on',
  Off = 'off',
}

export type SliderMark = {
  value: number;
  label?: string;
};

export type SliderSingleProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: React.SetStateAction<number | undefined>) => void;
  range?: false;
};

export type SliderRangeProps = {
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: React.SetStateAction<[number, number] | undefined>) => void;
  range: true;
  minDistance?: number;
  pushable?: boolean;
};

export type SliderBaseProps = {
  min?: number;
  max?: number;
  step?: number;
  marks?: SliderMark[] | boolean;
  restrictToMarks?: boolean;
  size?: SliderSize;
  variant?: SliderVariant;
  orientation?: SliderOrientation;
  disabled?: boolean;
  labelDisplay?: SliderLabelDisplay;
  className?: string;
};

export type SliderProps = SliderBaseProps & (SliderSingleProps | SliderRangeProps);
