import React from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { LinkProps, LinkUnderline, PolymorphicProps } from './link.types';
import { TypographyScale, TypographySize } from '../typography/typography.types';
import { cx } from '../../utils/cx';
import styles from './link.web.module.css';
import { getBoldClass, sizeClassMap } from '../typography/typography.web';

export type WebLinkProps<C extends React.ElementType = 'a'> = PolymorphicProps<C, LinkProps>;

const underlineClassMap: Record<LinkUnderline, string | undefined> = {
  [LinkUnderline.Always]: styles['underline-always'],
  [LinkUnderline.Hover]: styles['underline-hover'],
  [LinkUnderline.None]: styles['underline-none'],
};

type LinkComponent = <C extends React.ElementType = 'a'>(props: WebLinkProps<C>) => React.ReactElement | null;

export const Link: LinkComponent = ({
  children,
  variant = TypographyScale.Body,
  size = TypographySize.Medium,
  bold = false,
  as,
  underline = LinkUnderline.Always,
  className,
  testID,
  ...props
}) => {
  useTheme();

  const Comp = (as ?? 'a') as React.ElementType;

  const resolvedRel =
    props.target === '_blank'
      ? [...new Set(['noopener', 'noreferrer', ...(props.rel?.split(/\s+/) ?? [])])].join(' ')
      : props.rel;

  return (
    <Comp
      rel={resolvedRel}
      className={cx(
        styles.link,
        underlineClassMap[underline],
        className,
        sizeClassMap[variant][size],
        getBoldClass(variant, bold),
      )}
      data-testid={testID}
      target={props.target}
      {...(props as any)}
    >
      {children}
    </Comp>
  );
};
