import { IconName, icons } from '@famjam/icons';
import styles from './chip.web.module.css';
import { cx } from '../../utils/cx';
import { ChipColor, ChipProps } from './chip.types';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { Typography } from '../typography/typography.web';
import { TypographySize } from '../typography/typography.types';
import { FontSize } from '@famjam/tokens/ui.styles';
import { useMemo } from 'react';

export const Chip = ({
  label,
  color = ChipColor.Default,
  large = false,
  leadingIcon,
  dismissable,
  onDismiss,
  accessibilityLabel,
  testID,
  ...props
}: Readonly<ChipProps>) => {
  useTheme();
  const iconSize = large ? (FontSize.v16 ?? 16) : (FontSize.v14 ?? 14);
  const isDismissible = dismissable ?? true;

  const leadingIconFragment = useMemo(
    () => (
      <>
        {leadingIcon && (
          <span className={styles.iconContainer}>
            <Icon
              name={leadingIcon}
              size={iconSize}
              decorative
            />
          </span>
        )}
      </>
    ),
    [leadingIcon, iconSize],
  );

  return (
    <div
      className={cx(styles.chip, large ? styles.chipLarge : styles.chipDefault, styles[color])}
      aria-label={accessibilityLabel ?? label}
      data-testid={testID}
      {...props}
    >
      {leadingIconFragment}
      <Typography.Body
        as='span'
        size={large ? TypographySize.Large : TypographySize.Medium}
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
