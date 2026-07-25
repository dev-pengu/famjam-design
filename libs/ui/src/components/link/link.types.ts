import { ReactNode } from 'react';
import { TypographyScale, TypographySize } from '../typography';

export enum LinkUnderline {
  None = 'none',
  Hover = 'hover',
  Always = 'always',
}

export type AsProp<C extends React.ElementType> = { as?: C };

export type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

export type PolymorphicProps<C extends React.ElementType, Props> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithRef<C>, PropsToOmit<C, Props>>;

export type LinkProps = {
  children: ReactNode;
  variant?: TypographyScale;
  size?: TypographySize;
  bold?: boolean;
  underline?: LinkUnderline;
  as?: React.ElementType;
  testID?: string;
  className?: string;
};
