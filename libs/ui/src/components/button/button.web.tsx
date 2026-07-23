import { isValidElement, useMemo } from 'react';
import { Slot } from '@radix-ui/react-slot';
import {
  ButtonPropsType,
  ButtonSize,
  ButtonVariant,
  ButtonColor,
  LinkButtonProps,
  ButtonProps,
  ButtonShape,
} from './button.types';
import { Spinner } from '../spinner/spinner.web';
import { SpinnerSize } from '../spinner/spinner.types';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import styles from './button.web.module.css';
import { Icon } from '../icon/icon.web';
import { Typography, TypographyTextSize } from '../typography';

export { ButtonSize, ButtonVariant };

const spinnerSizeByButtonSize: Record<ButtonSize, SpinnerSize> = {
  [ButtonSize.Small]: SpinnerSize.Small,
  [ButtonSize.Medium]: SpinnerSize.Medium,
  [ButtonSize.Large]: SpinnerSize.Large,
};

const iconSizeByButtonSize: Record<ButtonSize, number> = {
  [ButtonSize.Small]: 16,
  [ButtonSize.Medium]: 22,
  [ButtonSize.Large]: 22,
};

export const Button = ({
  children,
  asChild = false,
  disabled,
  loading = false,
  variant = ButtonVariant.Filled,
  size = ButtonSize.Medium,
  color: state = ButtonColor.Default,
  shape = ButtonShape.Rounded,
  startIcon,
  endIcon,
  as: LinkComp = 'a',
  className,
  ...props
}: Readonly<ButtonPropsType>) => {
  const isUnavailable = disabled || loading;

  useTheme();
  const content = isValidElement(children) ? (
    children
  ) : (
    <Typography.Body
      as='span'
      size={TypographyTextSize.Small}
    >
      {children}
    </Typography.Body>
  );

  const startIconFragment = useMemo(
    () => (
      <>
        {startIcon && (
          <Icon
            className={loading ? styles.contentHidden : styles.content}
            name={startIcon}
            size={iconSizeByButtonSize[size]}
          />
        )}
      </>
    ),
    [startIcon, loading, size],
  );

  const endIconFragment = useMemo(
    () => (
      <>
        {endIcon && (
          <Icon
            className={loading ? styles.contentHidden : styles.content}
            name={endIcon}
            size={iconSizeByButtonSize[size]}
          />
        )}
      </>
    ),
    [endIcon, loading, size],
  );
  const isIconButton = isValidElement(children) && children.type === Icon;

  if (('href' in props && props.href) || ('to' in props && props.to)) {
    const { href, to, ...anchorProps } = props as LinkButtonProps;
    return (
      <LinkComp
        className={cx(
          styles.button,
          styles[variant],
          styles[size],
          styles[state],
          styles[shape],
          isIconButton && styles.iconButton,
          className,
        )}
        data-disabled={isUnavailable ? '' : undefined}
        data-loading={loading ? '' : undefined}
        aria-disabled={asChild ? isUnavailable : undefined}
        onClick={isUnavailable ? (event: React.SyntheticEvent) => event.preventDefault() : () => {}}
        {...(to ? { to } : { href })}
        {...anchorProps}
      >
        <>
          {startIconFragment}
          <span
            className={loading ? styles.contentHidden : styles.content}
            aria-hidden={loading}
          >
            {content}
          </span>
          {loading && (
            <span className={styles.spinnerOverlay}>
              <Spinner size={spinnerSizeByButtonSize[size]} />
            </span>
          )}
          {endIconFragment}
        </>
      </LinkComp>
    );
  }

  const Comp = asChild ? Slot : 'button';
  const { ...buttonProps } = props as ButtonProps;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isUnavailable) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    buttonProps.onClick?.(event);
  };

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      className={cx(
        styles.button,
        styles[variant],
        styles[size],
        styles[state],
        styles[shape],
        isIconButton && styles.iconButton,
        className,
      )}
      data-disabled={isUnavailable ? '' : undefined}
      data-loading={loading ? '' : undefined}
      aria-disabled={asChild ? isUnavailable : undefined}
      disabled={asChild ? undefined : isUnavailable}
      onClick={handleClick}
      {...buttonProps}
    >
      {asChild ? (
        <>
          {startIconFragment}
          {content}
          {endIconFragment}
        </>
      ) : (
        <>
          {startIconFragment}
          <span
            className={loading ? styles.contentHidden : styles.content}
            aria-hidden={loading}
          >
            {children}
          </span>
          {loading && (
            <span className={styles.spinnerOverlay}>
              <Spinner size={spinnerSizeByButtonSize[size]} />
            </span>
          )}
          {endIconFragment}
        </>
      )}
    </Comp>
  );
};
