import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { CardMediaProps } from './card-media.types';
import styles from './card-media.web.module.css';

export const CardMedia = ({
  src,
  alt,
  height,
  component: Comp = 'img',
  children,
  className,
  ...props
}: Readonly<CardMediaProps>) => {
  useTheme();
  const style = height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined;

  if (children) {
    return (
      <div
        className={cx(styles.media, className)}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <Comp
      src={src}
      alt={alt ?? ''}
      className={cx(styles.media, styles.mediaImg, className)}
      style={style}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    />
  );
};
