import { LabelVariant, InputShape } from '../input';
import { InputState } from '../input/input-base';

export enum SelectSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum SelectSelectionDisplay {
  Standard = 'standard',
  Icon = 'icon',
  Chip = 'chip',
}

export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type SelectValueType = string | number;

export type SelectProps = {
  options: SelectOption[];
  defaultValue?: SelectValueType | SelectValueType[];
  value?: SelectValueType | SelectValueType[];
  onChange?: (value: React.SetStateAction<SelectValueType | SelectValueType[] | undefined>) => void;
  size?: SelectSize;
  label?: string;
  labelVariant?: LabelVariant;
  helperMessage?: string;
  state?: InputState;
  shape?: InputShape;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  multiple?: boolean;
  dropup?: boolean;
  selectionDisplay?: SelectSelectionDisplay;
  className?: string;
};
