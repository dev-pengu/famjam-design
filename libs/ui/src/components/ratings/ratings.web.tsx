import { useId, useState, useRef } from 'react';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { roundToPrecision, clamp } from '../../utils/math-utils';
import { RatingProps, RatingSize, RatingHoverInfo } from './ratings.types';
import styles from './ratings.web.module.css';
import { IconName } from '@famjam/icons';
import { Typography } from '../typography/typography.web';
import { TypographySize } from '../typography/typography.types';
import { Button, ButtonSize, ButtonVariant } from '../button';

export { RatingSize };

const typographySizeByRatingSize: Record<RatingSize, TypographySize> = {
  [RatingSize.Small]: TypographySize.Small,
  [RatingSize.Medium]: TypographySize.Medium,
  [RatingSize.Large]: TypographySize.Large,
};

export const Rating = ({
  value,
  max = 5,
  precision = 1,
  count,
  hideCount = false,
  size = RatingSize.Medium,
  readOnly = false,
  disabled = false,
  onChange,
  onHoverChange,
  onCountClick,
  className,
}: Readonly<RatingProps>) => {
  useTheme();

  const groupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isInteractive = !readOnly && !disabled;
  const displayValue = hoverValue ?? value ?? 0;

  const getValueFromPointer = (
    event: React.PointerEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
    starIndex: number,
  ) => {
    const star = event.currentTarget;
    const rect = star.getBoundingClientRect();
    const fraction = clamp((event.clientX, rect.left) / rect.width, 0, 1);
    const rawValue = starIndex + fraction;
    return clamp(roundToPrecision(rawValue, precision), precision, max);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>, starIndex: number) => {
    if (!isInteractive) return;

    const nextValue = getValueFromPointer(event, starIndex);
    setHoverValue(nextValue);
    onHoverChange?.({ index: starIndex, value: nextValue });
  };

  const handlePointerLeave = () => {
    if (!isInteractive) return;
    setHoverValue(null);
    onHoverChange?.(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    if (!isInteractive) return;
    const nextValue = getValueFromPointer(event, starIndex);
    onChange?.(nextValue === value ? null : nextValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;

    const current = value ?? 0;
    const step = precision;

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      onChange?.(clamp(current + step, step, max));
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      onChange?.(clamp(current - step, step, max));
    } else if (event.key === 'Home') {
      event.preventDefault();
      onChange?.(step);
    } else if (event.key === 'End') {
      event.preventDefault();
      onChange?.(max);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onChange?.(null);
    }
  };

  let countFragment: React.ReactNode;
  if (onCountClick && !hideCount) {
    countFragment = (
      <Button
        variant={ButtonVariant.Text}
        className={cx(styles.count, styles.countButton)}
        size={ButtonSize.Small}
        onClick={onCountClick}
      >
        <Typography.Body
          as='span'
          size={typographySizeByRatingSize[size]}
        >
          ({count})
        </Typography.Body>
      </Button>
    );
  } else if (!hideCount) {
    countFragment = (
      <Typography.Body
        as='span'
        size={typographySizeByRatingSize[size]}
        className={styles.count}
      >
        ({count})
      </Typography.Body>
    );
  }

  return (
    <div
      ref={containerRef}
      role={isInteractive ? 'slider' : 'img'}
      aria-label={isInteractive ? `Rating: ${value ?? 'no value'} out of ${max}` : `Rated ${value ?? 0} out of ${max}`}
      aria-valuemin={isInteractive ? precision : undefined}
      aria-valuemax={isInteractive ? max : undefined}
      aria-valuenow={isInteractive ? (value ?? undefined) : undefined}
      aria-readonly={readOnly}
      aria-disabled={disabled}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={handleKeyDown}
      onPointerLeave={handlePointerLeave}
      className={cx(styles.rating, styles[size], disabled && styles.disabled, readOnly && styles.readOnly, className)}
    >
      {Array.from({ length: max }, (_, starIndex) => {
        const fillAmount = clamp(displayValue - starIndex, 0, 1);

        return (
          <div
            key={`${groupId}-star-${starIndex}`}
            className={styles.starWrapper}
            onPointerMove={(event) => handlePointerMove(event, starIndex)}
            onClick={(event) => handleClick(event, starIndex)}
          >
            <Icon
              className={styles.starEmpty}
              name={IconName.Star}
            />
            <div
              className={styles.starFillClip}
              style={{ width: `${fillAmount * 100}%` }}
            >
              <Icon
                className={styles.starFilled}
                name={IconName.Star}
              />
            </div>
          </div>
        );
      })}
      {countFragment}
    </div>
  );
};
