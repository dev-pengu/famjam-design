import { ReactNode } from 'react';
import { TypographyScale, TypographySize } from '../typography';

export enum LinkUnderline {
  None = 'none',
  Hover = 'hover',
  Always = 'always'
}

export type LinkProps = {
  children: ReactNode;
  variant?: TypographyScale;
  size?: TypographySize;
  bold?: boolean;
  underline?: LinkUnderline;
  as?: React.ElementType;
  testID?: string;
};
