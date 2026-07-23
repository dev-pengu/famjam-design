import React from 'react';

export type ListProps<T extends React.ElementType = 'ul'> = {
  as?: T;
  dense?: boolean;
  disablePadding?: boolean;
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'className'>;

export type ListItemProps<T extends React.ElementType = 'li'> = {
  as?: T;
  dense?: boolean;
  selected?: boolean;
  disabled?: boolean;
  inset?: boolean;
  disableGutters?: boolean;
  alignItems?: 'center' | 'start';
  children?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'className'>;

type ListItemButtonBase = {
  dense?: boolean;
  selected?: boolean;
  disabled?: boolean;
  inset?: boolean;
  disableGutters?: boolean;
  alignItems?: 'center' | 'start';
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
};

type ListItemButtonAsButton = ListItemButtonBase & {
  href?: never;
  to?: never;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ListItemButtonBase>;

type ListItemButtonAsLink = ListItemButtonBase & {
  href?: string;
  to?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ListItemButtonBase>;

export type ListItemButtonProps = ListItemButtonAsButton | ListItemButtonAsLink;

export type ListItemIconProps = {
  children?: React.ReactNode;
  className?: string;
};

export type ListItemAvatarProps = {
  children?: React.ReactNode;
  className?: string;
};

export type ListItemTextProps = {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  inset?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export type ListDividerProps = {
  inset?: boolean;
  variant?: 'fullWidth' | 'inset' | 'middle';
  className?: string;
};

export type ListSubheaderProps = {
  children?: React.ReactNode;
  inset?: boolean;
  sticky?: boolean;
  disableGutters?: boolean;
  className?: string;
};
