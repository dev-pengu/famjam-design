import React, { useRef, useState, useId, useCallback, useEffect } from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import {
  SliderProps,
  SliderSize,
  SliderOrientation,
  SliderVariant,
  SliderLabelDisplay,
  SliderMark,
  SliderRangeProps,
  SliderSingleProps,
} from './slider.types';
import { clamp, roundToStep, toPercent } from '../../utils/math-utils';
import styles from './slider.web.module.css';
import { useControlled } from '../../hooks';

export { SliderSize, SliderOrientation, SliderVariant, SliderLabelDisplay };

const resolveMarks = (marks: SliderMark[] | boolean, min: number, max: number, step: number): SliderMark[] => {
  if (marks === false) return [];
  if (marks === true) {
    const result: SliderMark[] = [];
    for (let v = min; v <= max; v = Math.round((v + step) * 1e10) / 1e10) {
      result.push({ value: v });
    }
    return result;
  }
  return marks;
};

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  restrictToMarks = false,
  size = SliderSize.Default,
  variant = SliderVariant.Primary,
  orientation = SliderOrientation.Horizontal,
  disabled = false,
  labelDisplay = SliderLabelDisplay.Auto,
  className,
  ...valueProps
}: Readonly<SliderProps>) => {
  useTheme();

  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null);
  const [hoveredThumb, setHoveredThumb] = useState<0 | 1 | null>(null);

  const isRange = valueProps.range === true;
  const minDistance = isRange ? ((valueProps as SliderRangeProps).minDistance ?? 0) : 0;
  const pushable = isRange ? ((valueProps as SliderRangeProps).pushable ?? true) : true;
  const defaultVal = isRange
    ? ((valueProps as SliderRangeProps).defaultValue ?? ([min, min] as [number, number]))
    : ((valueProps as SliderSingleProps).defaultValue ?? min);

  const changeCallback = useCallback(
    (next: React.SetStateAction<number | [number, number] | undefined>) => {
      if (isRange) {
        (valueProps as SliderRangeProps).onChange?.(next as React.SetStateAction<[number, number] | undefined>);
      } else {
        (valueProps as SliderSingleProps).onChange?.(next as React.SetStateAction<number | undefined>);
      }
    },
    [isRange, valueProps],
  );

  const [value, setValue] = useControlled<number | [number, number]>({
    defaultValue: defaultVal,
    controlledValue: valueProps.value,
    onChange: changeCallback,
    disabled,
  });

  const isVertical = orientation === SliderOrientation.Vertical;

  const resolvedMarks = resolveMarks(marks, min, max, step);
  const markValues = resolvedMarks.map((m) => m.value);

  const getValue = (raw: number): number => {
    if (restrictToMarks && markValues.length > 0) {
      return markValues.reduce((prev, curr) => (Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev));
    }
    return clamp(roundToStep(raw, step, min), min, max);
  };

  const clampRange = useCallback(
    (next: [number, number], activeThumbIndex: 0 | 1): [number, number] => {
      if (!isRange || minDistance === 0) return next;

      let [lo, hi] = next;

      if (activeThumbIndex === 0) {
        // Lower thumb moving right — check it doesn't breach hi
        if (lo > hi - minDistance) {
          if (pushable) {
            // Push hi along with lo
            hi = clamp(lo + minDistance, min, max);
            lo = hi - minDistance;
          } else {
            // Block lo from getting closer
            lo = hi - minDistance;
          }
        }
      } else {
        // Upper thumb moving left — check it doesn't breach lo
        if (hi < lo + minDistance) {
          if (pushable) {
            // Push lo along with hi
            lo = clamp(hi - minDistance, min, max);
            hi = lo + minDistance;
          } else {
            // Block hi from getting closer
            hi = lo + minDistance;
          }
        }
      }

      return [clamp(lo, min, max), clamp(hi, min, max)];
    },
    [isRange, minDistance, pushable, min, max],
  );

  const handleChange = (next: number | [number, number]) => {
    setValue(next);
  };

  const getValueFromPointer = useCallback(
    (event: PointerEvent | React.PointerEvent): number => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const fraction = isVertical
        ? 1 - (event.clientY - rect.top) / rect.height
        : (event.clientX - rect.left) / rect.width;
      return getValue(min + clamp(fraction, 0, 1) * (max - min));
    },
    [min, max, step, isVertical, restrictToMarks, markValues],
  );

  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();

    const newValue = getValueFromPointer(event);

    if (isRange) {
      const [lo, hi] = value as [number, number];
      const distLo = Math.abs(newValue - lo);
      const distHi = Math.abs(newValue - hi);
      const thumb = distLo <= distHi ? 0 : 1;
      setActiveThumb(thumb);
      const next: [number, number] = thumb === 0 ? [clamp(newValue, min, hi), hi] : [lo, clamp(newValue, lo, max)];
      handleChange(clampRange(next, thumb));
    } else {
      setActiveThumb(0);
      handleChange(newValue);
    }
  };

  useEffect(() => {
    if (activeThumb == null) return;

    const handlePointerMove = (event: PointerEvent) => {
      const newValue = getValueFromPointer(event);

      if (isRange) {
        const [lo, hi] = value as [number, number];

        if (minDistance === 0) {
          if (activeThumb === 0 && newValue > hi) {
            setActiveThumb(1);
            handleChange(clampRange([lo, clamp(newValue, lo, max)], 1));
            return;
          }
          if (activeThumb === 1 && newValue < lo) {
            setActiveThumb(0);
            handleChange(clampRange([clamp(newValue, min, hi), hi], 0));
            return;
          }
        }

        const next: [number, number] =
          activeThumb === 0 ? [clamp(newValue, min, hi), hi] : [lo, clamp(newValue, lo, max)];
        handleChange(clampRange(next, activeThumb));
      } else {
        handleChange(newValue);
      }
    };

    const handlePointerUp = () => setActiveThumb(null);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [activeThumb, getValueFromPointer, isRange, min, max, clampRange]);

  const handleThumbKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, thumbIndex: 0 | 1) => {
    if (disabled) return;

    const getNext = (current: number, direction: 1 | -1): number => {
      if (restrictToMarks && markValues.length > 0) {
        const sorted = [...markValues].sort((a, b) => a - b);
        const idx = sorted.indexOf(current);
        const next = sorted[idx + direction];
        return next !== undefined ? next : current;
      }
      return clamp(current + direction * step, min, max);
    };

    if (isRange) {
      const [lo, hi] = value as [number, number];
      const current = thumbIndex === 0 ? lo : hi;

      const update = (next: number) => {
        const clamped = thumbIndex === 0 ? clamp(next, min, hi) : clamp(next, lo, max);
        const newPair: [number, number] = thumbIndex === 0 ? [clamped, hi] : [lo, clamped];
        handleChange(clampRange(newPair, thumbIndex));
      };

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          update(getNext(current, 1));
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          update(getNext(current, -1));
          break;
        case 'Home':
          event.preventDefault();
          update(thumbIndex === 0 ? min : lo);
          break;
        case 'End':
          event.preventDefault();
          update(thumbIndex === 0 ? hi : max);
          break;
      }
    } else {
      const current = value as number;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          event.preventDefault();
          handleChange(getNext(current, 1));
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          event.preventDefault();
          handleChange(getNext(current, -1));
          break;
        case 'Home':
          event.preventDefault();
          handleChange(min);
          break;
        case 'End':
          event.preventDefault();
          handleChange(max);
          break;
      }
    }
  };

  const thumbValues: number[] = isRange ? (value as [number, number]) : [value as number];

  const showLabel = (thumbIndex: 0 | 1) => {
    if (labelDisplay === SliderLabelDisplay.On) return true;
    if (labelDisplay === SliderLabelDisplay.Off) return false;
    return activeThumb === thumbIndex || hoveredThumb === thumbIndex;
  };

  const trackFillStyle = isRange
    ? isVertical
      ? {
          bottom: `${toPercent(thumbValues[0]!, min, max)}%`,
          height: `${toPercent(thumbValues[1]!, min, max) - toPercent(thumbValues[0]!, min, max)}%`,
        }
      : {
          left: `${toPercent(thumbValues[0]!, min, max)}%`,
          width: `${toPercent(thumbValues[1]!, min, max) - toPercent(thumbValues[0]!, min, max)}%`,
        }
    : isVertical
      ? {
          bottom: 0,
          height: `${toPercent(thumbValues[0]!, min, max)}%`,
        }
      : {
          left: 0,
          width: `${toPercent(thumbValues[0]!, min, max)}%`,
        };

  return (
    <div
      className={cx(
        styles.root,
        styles[size],
        styles[variant],
        styles[orientation],
        disabled && styles.disabled,
        className,
      )}
    >
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={handleTrackPointerDown}
      >
        <div
          className={styles.trackFill}
          style={trackFillStyle}
        />

        {resolvedMarks.map((mark) => {
          const percent = toPercent(mark.value, min, max);
          const isActive = isRange
            ? mark.value >= thumbValues[0]! && mark.value <= thumbValues[1]!
            : mark.value <= thumbValues[0]!;
          return (
            <div
              key={mark.value}
              className={cx(styles.mark, isActive && styles.markActive)}
              style={isVertical ? { bottom: `${percent}%` } : { left: `${percent}%` }}
            >
              {mark.label && (
                <span
                  className={styles.markLabel}
                  style={
                    isVertical
                      ? { top: '50%', left: '1rem', transform: 'translateY(-50%)' }
                      : { top: '1rem', left: '50%', transform: 'translateX(-50%)' }
                  }
                >
                  {mark.label}
                </span>
              )}
            </div>
          );
        })}

        {thumbValues.map((thumbValue, thumbIndex) => {
          const percent = toPercent(thumbValue, min, max);
          return (
            <div
              key={thumbIndex}
              role='slider'
              id={`${id}-thumb-${thumbIndex}`}
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={isRange && thumbIndex === 1 ? thumbValues[0] : min}
              aria-valuemax={isRange && thumbIndex === 0 ? thumbValues[1] : max}
              aria-valuenow={thumbValue}
              aria-orientation={orientation}
              aria-disabled={disabled}
              className={cx(styles.thumb, activeThumb === thumbIndex && styles.thumbActive)}
              style={isVertical ? { bottom: `${percent}%` } : { left: `${percent}%` }}
              onKeyDown={(e) => handleThumbKeyDown(e, thumbIndex as 0 | 1)}
              onPointerEnter={() => setHoveredThumb(thumbIndex as 0 | 1)}
              onPointerLeave={() => setHoveredThumb(null)}
            >
              {showLabel(thumbIndex as 0 | 1) && <div className={styles.valueLabel}>{thumbValue}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
