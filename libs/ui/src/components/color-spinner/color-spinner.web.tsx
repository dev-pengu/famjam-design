import { useTheme } from '../theme-provider/theme-context';
import { ColorSpinnerSize, type ColorSpinnerProps } from './color-spinner.types';
import styles from './color-spinner.web.module.css';
import { cx } from '../../utils/cx';

export { ColorSpinnerSize };

export const ColorSpinner = ({
  size = ColorSpinnerSize.Medium,
  color = 'brand',
  className,
  testID,
}: ColorSpinnerProps) => {
  useTheme();
  return (
    <span
      data-testid={testID}
      className={cx(styles.loader, styles[size], styles[color], className)}
    ></span>
  );
};
