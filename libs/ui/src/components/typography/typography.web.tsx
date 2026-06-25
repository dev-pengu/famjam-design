import React from 'react';
import { useTheme } from '../theme-provider';
import {
  HeadingTag,
  TypographyBodyProps,
  TypographyDisplayProps,
  TypographyHeadlineProps,
  TypographyProps,
  TypographyScale,
  TypographyTitleProps,
  TypographySize,
  TypographyTextSize,
} from './typography.types';
import { cx } from '../../utils/cx';
import styles from './typography.web.module.css';

export { TypographyScale, TypographyTextSize };

type WebTypographyElementProps = React.HtmlHTMLAttributes<HTMLElement>;

export const sizeClassMap = {
  [TypographyScale.Display]: {
    [TypographySize.Small]: styles.displaySmall,
    [TypographySize.Medium]: styles.displayMedium,
    [TypographySize.Large]: styles.displayLarge,
  },
  [TypographyScale.Headline]: {
    [TypographySize.Small]: styles.headlineSmall,
    [TypographySize.Medium]: styles.headlineMedium,
    [TypographySize.Large]: styles.headlineLarge,
  },
  [TypographyScale.Title]: {
    [TypographySize.Small]: styles.titleSmall,
    [TypographySize.Medium]: styles.titleMedium,
    [TypographySize.Large]: styles.titleLarge,
  },
  [TypographyScale.Body]: {
    [TypographySize.Small]: styles.bodySmall,
    [TypographySize.Medium]: styles.bodyMedium,
    [TypographySize.Large]: styles.bodyLarge,
  },
};

export function getBoldClass(scale: TypographyScale, isBold: boolean) {
  if (!isBold) {
    return styles.regular;
  }
  return scale === TypographyScale.Display ? styles.bold : styles.semibold;
}

const displayTagMap: Record<TypographySize, HeadingTag> = {
  [TypographySize.Large]: HeadingTag.H1,
  [TypographySize.Medium]: HeadingTag.H2,
  [TypographySize.Small]: HeadingTag.H3,
};

const headlineTagMap: Record<TypographySize, HeadingTag> = {
  [TypographySize.Large]: HeadingTag.H4,
  [TypographySize.Medium]: HeadingTag.H5,
  [TypographySize.Small]: HeadingTag.H6,
};

export const TypographyDisplay = ({
  children,
  size = TypographySize.Large,
  bold = false,
  muted = false,
  as,
  className,
  ...props
}: Readonly<TypographyDisplayProps & WebTypographyElementProps & { as?: HeadingTag }>) => {
  useTheme();
  const Component = as ?? displayTagMap[size];

  return (
    <Component
      className={cx(
        styles.base,
        sizeClassMap[TypographyScale.Display][size],
        bold ? styles.bold : styles.regular,
        muted && styles.muted,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const TypographyHeadline = ({
  children,
  size = TypographySize.Medium,
  bold = false,
  muted = false,
  as,
  className,
  ...props
}: Readonly<TypographyHeadlineProps & WebTypographyElementProps & { as?: HeadingTag }>) => {
  useTheme();
  const Component = as ?? headlineTagMap[size];

  return (
    <Component
      className={cx(
        styles.base,
        sizeClassMap[TypographyScale.Headline][size],
        getBoldClass(TypographyScale.Headline, bold),
        muted && styles.muted,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const TypographyTitle = ({
  children,
  size = TypographySize.Medium,
  bold = false,
  muted = false,
  as = 'p',
  className,
  ...props
}: Readonly<TypographyTitleProps & WebTypographyElementProps & { as?: string }>) => {
  useTheme();
  const Component = as as React.ElementType;

  return (
    <Component
      className={cx(
        styles.base,
        sizeClassMap[TypographyScale.Title][size],
        getBoldClass(TypographyScale.Title, bold),
        muted && styles.muted,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const TypographyBody = ({
  children,
  size = TypographySize.Medium,
  bold = false,
  muted = false,
  as = 'p',
  className,
  ...props
}: Readonly<TypographyBodyProps & WebTypographyElementProps & { as?: string }>) => {
  useTheme();
  const Component = as as React.ElementType;

  return (
    <Component
      className={cx(
        styles.base,
        sizeClassMap[TypographyScale.Body][size],
        getBoldClass(TypographyScale.Body, bold),
        muted && styles.muted,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

type TypographyComponent = ((
  props: Readonly<TypographyProps & WebTypographyElementProps & { as?: string }>,
) => React.JSX.Element) & {
  Display: typeof TypographyDisplay;
  Headline: typeof TypographyHeadline;
  Title: typeof TypographyTitle;
  Body: typeof TypographyBody;
};

export const Typography = Object.assign(
  function Typography(props: Readonly<TypographyProps & WebTypographyElementProps & { as?: string }>) {
    return <TypographyBody {...props} />;
  },
  {
    Display: TypographyDisplay,
    Headline: TypographyHeadline,
    Title: TypographyTitle,
    Body: TypographyBody,
  },
) as TypographyComponent;

export {
  TypographyBody as Body,
  TypographyDisplay as Display,
  TypographyHeadline as headline,
  TypographyTitle as Title,
};

export default Typography;
