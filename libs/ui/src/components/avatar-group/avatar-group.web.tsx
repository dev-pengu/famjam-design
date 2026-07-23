import { Children, isValidElement, cloneElement } from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { AvatarGroupProps, AvatarGroupSpacing } from './avatar-group.types';
import { AvatarSize, AvatarShape, AvatarProps } from '../avatar/avatar.types';
import styles from './avatar-group.web.module.css';
import { Typography, TypographyTextSize } from '../typography';

const spacingOffset: Record<AvatarGroupSpacing, string> = {
  compact: '-0.75rem',
  normal: '-0.5rem',
  loose: '-0.25rem',
};

export const AvatarGroup = ({
  max,
  spacing = 'normal',
  size = AvatarSize.Medium,
  shape = AvatarShape.Round,
  children,
  className,
}: Readonly<AvatarGroupProps>) => {
  useTheme();
  const childArray = Children.toArray(children).filter((c) => isValidElement<AvatarProps>(c));
  const total = childArray.length;
  const visible = max !== undefined ? childArray.slice(0, max) : childArray;
  const overflow = max !== undefined ? Math.max(0, total - max) : 0;
  const offset = spacingOffset[spacing];

  return (
    <div
      className={cx(styles.group, className)}
      role='group'
      aria-label={`${total} avatars`}
    >
      {visible.map((child, index) => (
        <div
          className={styles.groupItem}
          style={{ marginLeft: index === 0 ? 0 : offset, zIndex: total - index }}
        >
          {cloneElement(child, {
            size,
            shape,
          })}
        </div>
      ))}

      {overflow > 0 && (
        <div
          className={cx(styles.avatar, styles[size], styles[shape], styles.overflow)}
          style={{ marginLeft: offset }}
          aria-label={`${overflow} more`}
        >
          <Typography.Body
            as='span'
            className={styles.text}
            size={TypographyTextSize.Large}
          >
            +{overflow}
          </Typography.Body>
        </div>
      )}
    </div>
  );
};
