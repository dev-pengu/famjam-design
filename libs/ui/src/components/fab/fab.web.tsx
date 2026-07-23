import { Spinner } from '../spinner/spinner.web';
import { SpinnerSize } from '../spinner/spinner.types';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { FabColor, FabProps, FabSize, FabVariant } from './fab.types';
import styles from './fab.web.module.css';
import { Typography } from '../typography';

export { FabSize, FabVariant };

const spinnerSizeByFabSize: Record<FabSize, SpinnerSize> = {
  [FabSize.Small]: SpinnerSize.Small,
  [FabSize.Medium]: SpinnerSize.Medium,
  [FabSize.Large]: SpinnerSize.Large,
};

export const Fab = ({
  icon,
  label,
  size = FabSize.Medium,
  variant = FabVariant.Filled,
  color = FabColor.Default,
  disabled = false,
  loading = false,
  extended = false,
  className,
  onClick,
  ...props
}: Readonly<FabProps>) => {
  useTheme();

  const isUnavailable = disabled || loading;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isUnavailable) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type='button'
      aria-label={extended ? undefined : label}
      aria-busy={loading}
      disabled={isUnavailable}
      data-loading={loading ? '' : undefined}
      data-disabled={isUnavailable ? '' : undefined}
      onClick={handleClick}
      className={cx(styles.fab, styles[size], styles[variant], styles[color], extended && styles.extended, className)}
      {...props}
    >
      <span
        className={loading ? styles.contentHidden : styles.content}
        aria-hidden={loading}
      >
        <Icon name={icon} />
        {extended && <Typography.Body>{label}</Typography.Body>}
      </span>
      {loading && (
        <span className={styles.spinnerOverlay}>
          <Spinner size={spinnerSizeByFabSize[size]} />
        </span>
      )}
    </button>
  );
};
