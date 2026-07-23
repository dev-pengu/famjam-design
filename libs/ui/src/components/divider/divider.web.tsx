import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { DividerProps, DividerVariant, DividerOrientation, DividerColor, DividerChildAlign } from './divider.types';
import styles from './divider.web.module.css';

export { DividerVariant, DividerOrientation, DividerColor, DividerChildAlign };

export const Divider = ({
  variant = DividerVariant.FullWidth,
  orientation = DividerOrientation.Horizontal,
  color = DividerColor.Default,
  childAlign = DividerChildAlign.Center,
  children,
  className,
}: Readonly<DividerProps>) => {
  const isVertical = orientation === DividerOrientation.Vertical;
  const hasChildren = children !== undefined && children !== null;

  const renderChildren = hasChildren && !isVertical;

  if (renderChildren) {
    return (
      <div
        role='separator'
        aria-orientation='horizontal'
        className={cx(
          styles.divider,
          styles[variant],
          styles.horizontal,
          styles[color],
          renderChildren && styles.withChildren,
          renderChildren && styles[childAlign],
          className,
        )}
      >
        <hr
          className={styles.hr}
          aria-hidden
        />
        <span className={styles.childWrapper}>{children}</span>
        <hr
          className={styles.hr}
          aria-hidden
        />
      </div>
    );
  }

  return (
    <hr
      aria-orientation={orientation}
      className={cx(styles.divider, styles[variant], styles[orientation], styles[color], className)}
    />
  );
};
