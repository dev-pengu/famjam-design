import { IconName } from '@famjam/icons';
import styles from './chip.web.module.css';
import { cx } from '../../utils/cx';
import { ChipProps } from './chip.types';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { Typography } from '../typography/typography.web';
import { TypographySize } from '../typography/typography.types';
import { FontSize } from '@famjam/tokens/ui.styles';

export const Chip = ({
  label,
  dark = false,
  large = false,
  leadingIcon,
  dismissable,
  onDismiss,
  accessibilityLabel,
  testID,
}: Readonly<ChipProps>) => {
  useTheme();
  const iconSize = large ? (FontSize.v20 ?? 20) : (FontSize.v16 ?? 16);
  const isDismissible = dismissable ?? true;

  return (
    <div
      className={cx(
        styles.chip,
        large ? styles.chipLarge : styles.chipDefault,
        dark ? styles.chipDark : styles.chipLight,
      )}
      aria-label={accessibilityLabel ?? label}
      data-testid={testID}
    >
      {leadingIcon && (
        <span className={styles.iconContainer}>
          <Icon
            name={leadingIcon}
            size={iconSize}
            decorative
          />
        </span>
      )}

      <Typography.Body
        as='span'
        size={TypographySize.Large}
        className={styles.label}
      >
        {label}
      </Typography.Body>

      {isDismissible && (
        <button
          type='button'
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label='Dismiss'
          data-testid={testID ? `${testID}-dismiss` : undefined}
        >
          <Icon
            name={IconName.Close}
            size={iconSize}
            decorative
          />
        </button>
      )}
    </div>
  );
};
