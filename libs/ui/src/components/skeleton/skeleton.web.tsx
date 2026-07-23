import React, { cloneElement, isValidElement, Children, ComponentRef } from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { SkeletonProps, SkeletonVariant } from './skeleton.types';
import { useChildDimensions, useReducedMotion } from '../../hooks/use-skeleton/use-skeleton.web';
import styles from './skeleton.web.module.css';

export { SkeletonVariant };

type SkeletonBarProps = {
  variant: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  animate: boolean;
  className?: string;
};

const SkeletonBar = ({ variant, width, height, animate, className }: SkeletonBarProps) => (
  <span
    className={cx(styles.skeleton, styles[variant], animate && styles.animate, className)}
    aria-hidden
    style={{
      width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    }}
  />
);

export const Skeleton = ({
  variant = SkeletonVariant.Rectangular,
  width,
  height,
  animate: animateProp = true,
  lines = 1,
  lastLineWidth = '60%',
  children,
  className,
}: Readonly<SkeletonProps>) => {
  useTheme();

  const hasChildren = Children.count(children) > 0;
  const reducedMotion = useReducedMotion();
  const animate = animateProp && !reducedMotion;

  const { childRef, dimensions } = useChildDimensions({
    enabled: hasChildren,
  });

  const resolvedWidth = width ?? (dimensions.width ? `${dimensions.width}px` : undefined);
  const resolvedHeight = height ?? (dimensions.height ? `${dimensions.height}px` : undefined);

  if (variant === SkeletonVariant.Text && lines > 1) {
    return (
      <span
        className={cx(styles.textGroup, className)}
        aria-busy
        aria-label='Loading'
      >
        {Array.from({ length: lines }, (_, i) => {
          const isLast = i === lines - 1;
          const lineWidth = isLast ? lastLineWidth : (resolvedWidth ?? '100%');
          return (
            <SkeletonBar
              key={i}
              variant={variant}
              width={lineWidth}
              height={resolvedHeight}
              animate={animate}
            />
          );
        })}
      </span>
    );
  }

  if (hasChildren) {
    const child = Children.only(children);

    if (!isValidElement(child)) return null;

    return (
      <span className={cx(styles.childWrapper, className)}>
        <span
          className={styles.childMeasure}
          aria-hidden
        >
          {cloneElement(child as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>, { ref: childRef })}
        </span>
        <SkeletonBar
          variant={variant}
          width={resolvedWidth}
          height={resolvedHeight}
          animate={animate}
          className={styles.childOverlay}
        />
      </span>
    );
  }

  return (
    <SkeletonBar
      variant={variant}
      width={resolvedWidth}
      height={resolvedHeight}
      animate={animate}
      className={className}
    />
  );
};
