import React from 'react';
import { useTheme } from '../theme-provider';
import { LinkProps } from './link.types';
import { TypographyScale, TypographySize } from '../typography';
import { cx } from '../../utils/cx';
import styles from './link.web.module.css';
import { getBoldClass, sizeClassMap } from '../typography';

export type WebLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({
  children,
  variant = TypographyScale.Body,
  size = TypographySize.Medium,
  bold = false,
  rel,
  className,
  testID,
  target,
  ...props
}: Readonly<WebLinkProps>) => {
  useTheme();

  const resolvedRel =
    target === '_blank' ? [...new Set(['noopener', 'noreferrer', ...(rel?.split(/\s+/) ?? [])])].join(' ') : rel;

  return (
    <a
      rel={resolvedRel}
      className={cx(styles.link, className, sizeClassMap[variant][size], getBoldClass(variant, bold))}
      data-testid={testID}
      {...props}
    >
      {children}
    </a>
  );
};
