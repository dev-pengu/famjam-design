import React from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import {
  ListProps,
  ListItemProps,
  ListItemButtonProps,
  ListItemIconProps,
  ListItemAvatarProps,
  ListItemTextProps,
  ListDividerProps,
  ListSubheaderProps,
} from './list.types';
import styles from './list.web.module.css';
import { Typography, TypographyTextSize } from '../typography';

export const List = <T extends React.ElementType = 'ul'>({
  as,
  dense = false,
  disablePadding = false,
  children,
  className,
  ...props
}: ListProps<T>) => {
  useTheme();
  const Comp = (as ?? 'ul') as React.ElementType;

  return (
    <Comp
      className={cx(styles.list, dense && styles.dense, disablePadding && styles.disablePadding, className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const ListItem = <T extends React.ElementType = 'li'>({
  as,
  dense = false,
  selected = false,
  disabled = false,
  inset = false,
  disableGutters = false,
  alignItems = 'center',
  children,
  className,
  ...props
}: ListItemProps<T>) => {
  useTheme();
  const Comp = (as ?? 'li') as React.ElementType;

  return (
    <Comp
      aria-selected={selected}
      aria-disabled={disabled}
      className={cx(
        styles.listItem,
        dense && styles.dense,
        selected && styles.selected,
        disabled && styles.disabled,
        inset && styles.inset,
        disableGutters && styles.disableGutters,
        styles[`align-${alignItems}`],
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};

export const ListItemButton = ({
  dense = false,
  selected = false,
  disabled = false,
  inset = false,
  disableGutters = false,
  alignItems = 'center',
  children,
  as: LinkComp = 'a',
  className,
  ...props
}: ListItemButtonProps) => {
  useTheme();
  if (('href' in props && props.href) || ('to' in props && props.to)) {
    const { href, to, ...anchorProps } = props as Extract<ListItemButtonProps, { href?: string; to?: string }>;
    return (
      <LinkComp
        {...(to ? { to } : { href })}
        aria-selected={selected}
        aria-disabled={disabled}
        className={cx(
          styles.listItemButton,
          dense && styles.dense,
          selected && styles.selected,
          disabled && styles.disabled,
          inset && styles.inset,
          disableGutters && styles.disableGutters,
          styles[`align-${alignItems}`],
          className,
        )}
        onClick={disabled ? (e: React.SyntheticEvent) => e.preventDefault() : undefined}
        {...anchorProps}
      >
        {children}
      </LinkComp>
    );
  }

  const { ...buttonProps } = props as Extract<ListItemButtonProps, { href?: never }>;

  return (
    <button
      type='button'
      aria-selected={selected}
      disabled={disabled}
      className={cx(
        styles.listItemButton,
        dense && styles.dense,
        selected && styles.selected,
        disabled && styles.disabled,
        inset && styles.inset,
        disableGutters && styles.disableGutters,
        styles[`align-${alignItems}`],
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export const ListItemIcon = ({ children, className }: ListItemIconProps) => {
  useTheme();
  return <span className={cx(styles.listItemIcon, className)}>{children}</span>;
};

export const ListItemAvatar = ({ children, className }: ListItemAvatarProps) => {
  useTheme();

  return <span className={cx(styles.listItemAvatar, className)}>{children}</span>;
};

export const ListItemText = ({ primary, secondary, inset = false, className, ...props }: ListItemTextProps) => {
  useTheme();
  return (
    <span
      className={cx(styles.listItemText, inset && styles.inset, className)}
      {...props}
    >
      {primary && <Typography.Body className={styles.primaryText}>{primary}</Typography.Body>}
      {secondary && (
        <Typography.Body
          className={styles.secondaryText}
          size={TypographyTextSize.Small}
        >
          {secondary}
        </Typography.Body>
      )}
    </span>
  );
};

export const ListDivider = ({ inset = false, variant = 'fullWidth', className }: ListDividerProps) => {
  useTheme();
  return (
    <li
      role='separator'
      aria-hidden
      className={cx(styles.listDivider, styles[variant], inset && styles.inset, className)}
    />
  );
};

export const ListSubheader = ({
  children,
  inset = false,
  sticky = false,
  disableGutters = false,
  className,
}: ListSubheaderProps) => {
  useTheme();
  return (
    <li
      className={cx(
        styles.listSubheader,
        inset && styles.inset,
        sticky && styles.sticky,
        disableGutters && styles.disableGutters,
        className,
      )}
    >
      {children}
    </li>
  );
};
