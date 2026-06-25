import { ReactNode } from 'react';
import { TypographyScale, TypographySize } from '../typography';

export type LinkProps = {
  children: ReactNode;
  variant?: TypographyScale;
  size?: TypographySize;
  bold?: boolean;
  testID?: string;
};
