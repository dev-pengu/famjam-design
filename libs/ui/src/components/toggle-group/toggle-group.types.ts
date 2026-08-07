type BaseToggleGroupProps = {
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

export type MultiValueToggleGroupProps = BaseToggleGroupProps & {
  multi: true;
  defaultValue?: string[];
  value?: string[];
  onChange?: (value: React.SetStateAction<string[] | undefined>) => void;
};

export type SingleValueToggleGroupProps = BaseToggleGroupProps & {
  multi?: false;
  defaultValue?: string;
  value?: string;
  onChange?: (value: React.SetStateAction<string | undefined>) => void;
};

export type ToggleGroupProps = MultiValueToggleGroupProps | SingleValueToggleGroupProps;

export type ToggleGroupItemProps = {
  value: string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
};
