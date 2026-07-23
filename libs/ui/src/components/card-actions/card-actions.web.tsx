import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { CardActionsProps } from './card-actions.types';
import styles from './card-actions.web.module.css';

export const CardActions = ({ children, disableSpacing = false, className }: Readonly<CardActionsProps>) => {
  useTheme();
  return <div className={cx(styles.actions, disableSpacing && styles.actionsNoSpacing, className)}>{children}</div>;
};
