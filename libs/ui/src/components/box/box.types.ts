import type { ReactNode } from 'react';

export enum BoxVariant {
  Left = 'left',
  Center = 'center',
  Right = 'right',
}

export type BoxProps = {
  children?: ReactNode;
  variant?: BoxVariant;
};
