import { Slot } from '@radix-ui/react-slot';
import { ButtonProps, ButtonSize, ButtonVariant } from './button.types';
import { Spinner } from '../spinner';
import { SpinnerSize } from '../spinner';
import { useTheme } from '../theme-provider';
import { cx } from '../../utils/cx';
import styles from './button.web.module.css';

export { ButtonSize, ButtonVariant };

const spinnerSizeByButtonSize: Record<ButtonSize, SpinnerSize> = {
  [ButtonSize.Small]: SpinnerSize.Small,
  [ButtonSize.Medium]: SpinnerSize.Medium,
  [ButtonSize.Large]: SpinnerSize.Large,
};

export const Button = ({
  children,
  asChild = false,
  disabled,
  loading = false,
  variant = ButtonVariant.Filled,
  size = ButtonSize.Medium,
  onClick,
  className,
  ...props
}: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>) => {
  const Comp = asChild ? Slot : 'button';
  const isUnavailable = disabled || loading;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isUnavailable) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onClick?.(event);
  };

  useTheme();

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      className={cx(styles.button, styles[variant], styles[size], className)}
      data-disabled={isUnavailable ? '' : undefined}
      data-loading={loading ? '' : undefined}
      aria-disabled={asChild ? isUnavailable : undefined}
      disabled={asChild ? undefined : isUnavailable}
      onClick={handleClick}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
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
        </>
      )}
    </Comp>
  );
};
