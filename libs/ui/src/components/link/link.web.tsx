import React from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { LinkProps, LinkUnderline } from './link.types';
import { TypographyScale, TypographySize } from '../typography/typography.types';
import { cx } from '../../utils/cx';
import styles from './link.web.module.css';
import { getBoldClass, sizeClassMap } from '../typography/typography.web';

export type WebLinkProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const underlineClassMap: Record<LinkUnderline, string | undefined> = {
  [LinkUnderline.Always]: styles['underline-always'],
  [LinkUnderline.Hover]: styles['underline-hover'],
  [LinkUnderline.None]: styles['underline-none'],
};

export const Link = ({
  children,
  variant = TypographyScale.Body,
  size = TypographySize.Medium,
  bold = false,
  rel,
  as: Comp = 'a',
  underline = LinkUnderline.Always,
  className,
  testID,
  target,
  ...props
}: Readonly<WebLinkProps>) => {
  useTheme();

  const resolvedRel =
    target === '_blank' ? [...new Set(['noopener', 'noreferrer', ...(rel?.split(/\s+/) ?? [])])].join(' ') : rel;

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
      target={target}
      {...props}
    >
      {children}
    </Comp>
  );
};
