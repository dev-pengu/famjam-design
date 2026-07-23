import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { CardProps, CardVariant, CardElevation } from './card.types';
import styles from './card.web.module.css';

export { CardVariant, CardElevation };

export const Card = ({
  children,
  variant = CardVariant.Elevated,
  elevation = CardElevation.Raised,
  className,
}: Readonly<CardProps>) => {
  useTheme();

  return (
    <div className={cx(styles.card, styles[variant], variant === CardVariant.Elevated && styles[elevation], className)}>
      {children}
    </div>
  );
};
