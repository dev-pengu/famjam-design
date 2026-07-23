import { useState } from 'react';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { AvatarProps, AvatarSize, AvatarShape } from './avatar.types';
import { stringToColor, getInitials, isDark } from '../../utils/avatar-utils';
import { Color } from '@famjam/tokens/base.styles';
import styles from './avatar.web.module.css';

export { AvatarSize, AvatarShape };

export const Avatar = ({
  size = AvatarSize.Medium,
  shape = AvatarShape.Round,
  color,
  src,
  alt,
  letter,
  name,
  icon,
  className,
  ...props
}: Readonly<AvatarProps>) => {
  useTheme();

  const [imgError, setImgError] = useState(false);

  const resolveContent = () => {
    if (src && !imgError) {
      return (
        <img
          src={src}
          alt={alt ?? 'avatar'}
          className={styles.image}
          onError={() => setImgError(true)}
        />
      );
    }

    if (src && imgError) {
      return <span className={styles.text}>{(alt && alt[0])?.toUpperCase() ?? 'A'}</span>;
    }

    if (letter) {
      return <span className={styles.text}>{letter.slice(0, 2).toUpperCase()}</span>;
    }

    if (name) {
      return <span className={styles.text}>{getInitials(name)}</span>;
    }

    if (icon) {
      return (
        <Icon
          name={icon}
          decorative
          className={styles.icon}
        />
      );
    }

    if (alt) {
      return <span className={styles.text}>{alt[0]?.toUpperCase()}</span>;
    }

    return (
      <Icon
        name={IconName.User}
        decorative
        className={styles.icon}
      />
    );
  };

  const resolveBackground = (): React.CSSProperties => {
    let colorSource = name;
    if (!colorSource) colorSource = letter;
    if (!colorSource) colorSource = alt;
    if (!src || !imgError) {
      let bg: Color | string = color ?? 'var(--color-surface-tertiary)';
      if (colorSource && !color) {
        bg = stringToColor(colorSource);
      }
      return {
        backgroundColor: bg,
        color: isDark(bg) ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
      };
    }
    return {};
  };

  return (
    <div
      className={cx(styles.avatar, styles[size], styles[shape], className)}
      style={resolveBackground()}
      aria-label={alt ?? name ?? 'avatar'}
      role='img'
      {...props}
    >
      {resolveContent()}
    </div>
  );
};
