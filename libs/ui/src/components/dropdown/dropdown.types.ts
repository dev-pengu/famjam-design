import { LabelVariant } from '../input';
import { InputState } from '../input/input-base';

export enum DropdownSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum DropdownSelectionDisplay {
  Standard = 'standard',
  Icon = 'icon',
  Chip = 'chip',
}

export type DropdownOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type DropdownValueType = string | number;

export type DropdownProps = {
  options: DropdownOption[];
  defaultValue?: DropdownValueType | DropdownValueType[];
  value?: DropdownValueType | DropdownValueType[];
  onChange?: (value: React.SetStateAction<DropdownValueType | DropdownValueType[] | undefined>) => void;
  size?: DropdownSize;
  label?: string;
  labelVariant?: LabelVariant;
  helperMessage?: string;
  state?: InputState;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  multiple?: boolean;
  dropup?: boolean;
  selectionDisplay?: DropdownSelectionDisplay;
  className?: string;
};
