import React from 'react';
import { ButtonVariant, ButtonSize } from '../button/button.types';

export enum ButtonGroupOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type ButtonGroupProps = {
    children: React.ReactNode;
    size?: ButtonSize;
    variant?: ButtonVariant;
    orientation?: ButtonGroupOrientation;
    className?: string;
}
