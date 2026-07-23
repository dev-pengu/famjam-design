import React, { CSSProperties, useId } from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { ProgressBarProps, ProgressBarVariant } from './progress.types';
import { Typography, TypographyTextSize } from '../typography/typography.web';
import { cx } from '../../utils/cx';
import styles from './progress.web.module.css';
import { isDark } from '../../utils/avatar-utils';
import { Color } from '@famjam/tokens/base.styles';

export { ProgressBarVariant };

export const ProgressBar = ({
  bgColor = Color.SurfaceBrandSecondaryDark,
  progress,
  maxValue = 100,
  label,
  height = 16,
  variant = ProgressBarVariant.Bar,
  hideText = false,
  className,
}: Readonly<ProgressBarProps>) => {
  const { theme } = useTheme();
  const progressBarId = useId();

  const percentage = Math.round((progress / maxValue) * 100);

  const textColor =
    bgColor && isDark(bgColor)
      ? (theme.tokens?.Color.TextInverse ?? Color.TextInverse)
      : (theme.tokens?.Color.TextSecondary ?? Color.TextSecondary);

  let progressBar: React.ReactNode;
  if (variant === ProgressBarVariant.Dot) {
    progressBar = (
      <div
        className={styles.dotsWrapper}
        aria-hidden
      >
        {Array.from({ length: maxValue }, (_, i) => (
          <span
            key={i}
            className={cx(styles.progressDot, i < progress && styles.progressDotFilled)}
            style={bgColor && i < progress ? { backgroundColor: bgColor } : undefined}
          />
        ))}
      </div>
    );
  } else {
    progressBar = (
      <div
        className={cx(styles.progressWrapper, styles[variant], className)}
        style={{ height }}
        aria-hidden
      >
        <div
          className={styles.progressBar}
          style={
            variant === ProgressBarVariant.Glass
              ? { width: `${percentage}%` }
              : {
                  width: `${percentage}%`,
                  backgroundColor: bgColor,
                }
          }
        >
          {!hideText && percentage > 0 && (
            <Typography.Body
              as='span'
              size={TypographyTextSize.Small}
              bold
              className={styles.progressText}
              style={variant === ProgressBarVariant.Glass ? undefined : { color: textColor }}
            >
              {`${percentage}%`}
            </Typography.Body>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={cx(styles.wrapper, className)}>
      {label && (
        <label htmlFor={progressBarId}>
          <Typography.Body as='span'>{label}</Typography.Body>
        </label>
      )}
      <progress
        id={progressBarId}
        value={progress}
        max={maxValue}
        className={styles.nativeProgress}
        aria-label={label ?? `${percentage}%`}
      />
      {progressBar}
    </div>
  );
};
