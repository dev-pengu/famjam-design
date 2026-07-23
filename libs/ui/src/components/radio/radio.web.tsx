import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { RadioItemProps, RadioSize } from './radio.types';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import styles from './radio.web.module.css';
import { Typography } from '../typography';
import { useId } from 'react';

export { RadioSize };

export const RadioItem = ({
  value,
  label,
  labelPosition = 'end',
  size = RadioSize.Medium,
  disabled = false,
  error = false,
  className,
}: Readonly<RadioItemProps>) => {
  useTheme();
  const radioId = useId();
  const labelClass = labelPosition === 'start' ? 'labelStart' : 'labelEnd';

  const labelFragment = (
    <>
      {label && (
        <Typography.Body
          as='span'
          className={styles.label}
        >
          {label}
        </Typography.Body>
      )}
    </>
  );

  return (
    <label
      htmlFor={radioId}
      className={cx(
        styles.wrapper,
        styles[size],
        styles[labelClass],
        disabled && styles.disabled,
        error && styles.error,
        className,
      )}
    >
      {labelPosition === 'start' && labelFragment}
      <RadixRadioGroup.Item
        id={radioId}
        className={styles.root}
        value={value}
        disabled={disabled}
        aria-invalid={error}
      >
        <RadixRadioGroup.Indicator className={styles.indicator} />
      </RadixRadioGroup.Item>
      {labelPosition === 'end' && labelFragment}
    </label>
  );
};
