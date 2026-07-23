import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { CardContentProps } from './card-content.types';
import styles from './card-content.web.module.css';

export const CardContent = ({ children, className }: Readonly<CardContentProps>) => {
  useTheme();
  return <div className={cx(styles.content, className)}>{children}</div>;
};
