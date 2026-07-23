import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { CardActionAreaProps } from './card-action-area.types';
import styles from './card-action-area.web.module.css';

export const CardActionArea = ({ children, disabled = false, className, ...props }: Readonly<CardActionAreaProps>) => {
  useTheme();

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as Extract<CardActionAreaProps, { href: string }>;

    return (
      <a
        href={href}
        aria-disabled={disabled}
        className={cx(styles.actionArea, disabled && styles.actionAreaDisabled, className)}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
        {...anchorProps}
      >
        {children}
        <span
          className={styles.actionAreaOverlay}
          aria-hidden
        />
      </a>
    );
  }

  const { ...buttonProps } = props as Extract<CardActionAreaProps, { href?: never }>;

  return (
    <button
      type='button'
      disabled={disabled}
      className={cx(styles.actionArea, disabled && styles.actionAreaDisabled, className)}
      {...buttonProps}
    >
      {children}
      <span
        className={styles.actionAreaOverlay}
        aria-hidden
      />
    </button>
  );
};
