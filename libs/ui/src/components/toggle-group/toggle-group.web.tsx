import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import {
  MultiValueToggleGroupProps,
  SingleValueToggleGroupProps,
  ToggleGroupItemProps,
  ToggleGroupProps,
} from './toggle-group.types';
import styles from './toggle-group.web.module.css';
import { useTheme } from '../theme-provider';
import { cx } from '../../utils/cx';

const MultiToggleGroup = ({
  defaultValue,
  value,
  onChange,
  ariaLabel,
  disabled,
  className,
  children,
}: Readonly<MultiValueToggleGroupProps>) => (
  <ToggleGroupPrimitive.Root
    type='multiple'
    value={value}
    defaultValue={defaultValue}
    onValueChange={onChange}
    disabled={disabled}
    aria-label={ariaLabel}
    className={cx(styles.toggleGroup, className)}
  >
    {children}
  </ToggleGroupPrimitive.Root>
);

const SingleToggleGroup = ({
  defaultValue,
  value,
  onChange,
  ariaLabel,
  disabled,
  className,
  children,
}: Readonly<SingleValueToggleGroupProps>) => (
  <ToggleGroupPrimitive.Root
    type='single'
    value={value}
    defaultValue={defaultValue}
    onValueChange={onChange}
    disabled={disabled}
    aria-label={ariaLabel}
    className={cx(styles.toggleGroup, className)}
  >
    {children}
  </ToggleGroupPrimitive.Root>
);

export const ToggleGroup = (props: Readonly<ToggleGroupProps>) => {
  useTheme();

  if (props.multi) {
    return <MultiToggleGroup {...(props as MultiValueToggleGroupProps)} />;
  }

  return <SingleToggleGroup {...(props as SingleValueToggleGroupProps)} />;
};

export const ToggleGroupItem = ({
  value,
  disabled,
  ariaLabel,
  className,
  children,
}: Readonly<ToggleGroupItemProps>) => (
  <ToggleGroupPrimitive.Item
    value={value}
    disabled={disabled}
    aria-label={ariaLabel}
    className={cx(styles.toggleGroupItem, className)}
  >
    {children}
  </ToggleGroupPrimitive.Item>
);
