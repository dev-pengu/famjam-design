import { isValidElement, MouseEvent, MouseEventHandler } from 'react';
import { InputAdornmentProps } from './input-adornment.types';
import { cx } from '../../utils/cx';
import { useTheme } from '../theme-provider/theme-context';
import styles from './input-adornment.web.module.css';
import { Typography } from '../typography';

export const InputAdornment = ({
  position,
  children,
  disablePointerEvents = false,
  disableTypography = false,
  ownerRef,
  className,
  onClick,
  ...props
}: Readonly<InputAdornmentProps>) => {
  const child = isValidElement(children) ? (
    children
  ) : disableTypography ? (
    children
  ) : (
    <Typography.Body as='span'>{children}</Typography.Body>
  );

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    if (disablePointerEvents) {
      e.preventDefault();
      ownerRef?.current?.focus();
    } else {
      onClick?.(e);
    }
  };

  return (
    <span
      className={cx(styles.adornmentWrapper, className)}
      {...props}
      onClick={handleClick}
    >
      {child}
    </span>
  );
};
