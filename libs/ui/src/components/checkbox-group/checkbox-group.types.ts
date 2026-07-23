import React from 'react';
import { CheckboxSize } from '../checkbox/checkbox.types';

export enum CheckboxGroupOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type CheckboxGroupProps = {
  children: React.ReactNode;
  size?: CheckboxSize;
  orientation?: CheckboxGroupOrientation;
  className?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  exclusive?: boolean;
  defaultCheckedId?: string;
  checkedId?: string;
  onCheckedIdChange?: (id: React.SetStateAction<string | undefined>) => void;
};

export type CheckboxGroupContextValue = {
  checkedId: string | undefined;
  setCheckedId: React.Dispatch<React.SetStateAction<string | undefined>>;
  exclusive: boolean;
} | null;