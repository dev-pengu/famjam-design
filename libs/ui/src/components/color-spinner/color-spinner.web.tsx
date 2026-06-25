import { useTheme } from '../theme-provider';
import { COLOR_SPINNER_SIZE_VALUE, ColorSpinnerSize, type ColorSpinnerProps } from './color-spinner.types';
import styles from './color-spinner.web.module.css';
import { Color } from '@famjam/tokens/base.styles';
import { cx } from '../../utils/cx';

export { ColorSpinnerSize };
const defaultPrimary = Color.SurfaceBrandSecondaryLight;
const defaultSecondary = Color.SurfaceAccentLight;

interface CustomSpinnerStyles extends React.CSSProperties {
  '--spinner-size'?: number;
  '--primary-color'?: string;
  '--secondary-color'?: string;
}

export const ColorSpinner = ({
  size = ColorSpinnerSize.Medium,
  primaryColor = defaultPrimary,
  secondaryColor = defaultSecondary,
  className,
  testID,
}: ColorSpinnerProps) => {
  useTheme();
  const sizeValue = COLOR_SPINNER_SIZE_VALUE[size];
  const inlineStyles: CustomSpinnerStyles = {
    '--spinner-size': sizeValue,
    '--primary-color': primaryColor,
    '--secondary-color': secondaryColor,
  };
  return (
    <span
      data-testid={testID}
      className={cx(styles.loader, className)}
      style={inlineStyles}
    ></span>
  );
};
