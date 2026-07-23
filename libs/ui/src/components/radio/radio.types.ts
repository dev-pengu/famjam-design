export enum RadioSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type RadioItemProps = {
  value: string;
  label?: string;
  labelPosition?: 'start' | 'end';
  size?: RadioSize;
  disabled?: boolean;
  error?: boolean;
  className?: string;
};
