export type ShuttleItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type ShuttleProps = {
  items: ShuttleItem[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: React.SetStateAction<string[] | undefined>) => void;
  sourceLabel?: string;
  targetLabel?: string;
  disabled?: boolean;
  className?: string;
};
