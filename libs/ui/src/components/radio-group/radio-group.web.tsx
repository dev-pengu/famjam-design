import { Children, cloneElement, isValidElement, useId } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { RadioGroupProps, RadioGroupOrientation } from './radio-group.types';
import { RadioSize, RadioItemProps } from '../radio/radio.types';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import styles from './radio-group.web.module.css';
import { Typography, TypographySize } from '../typography';
import { Icon } from '../icon';
import { IconName } from '@famjam/icons';

export const RadioGroup = ({
  children,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  size = RadioSize.Medium,
  radioLabelPosition = 'end',
  orientation = RadioGroupOrientation.Vertical,
  label,
  required = false,
  error = false,
  helperText,
  className,
}: Readonly<RadioGroupProps>) => {
  const helperId = useId();
  useTheme();

  const radios = Children.map(children, (child) => {
    if (!isValidElement<RadioItemProps>(child)) return child;

    return cloneElement(child, {
      size: size,
      disabled: child.props.disabled ?? disabled,
      labelPosition: child.props.labelPosition ?? radioLabelPosition,
    });
  });

  return (
    <div className={cx(styles.container, styles[size], error && styles.error)}>
      {label && (
        <label className={styles.label}>
          <Typography.Body>{label}</Typography.Body>
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <RadixRadioGroup.Root
        className={cx(styles.group, styles[orientation], className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        orientation={orientation}
      >
        {radios}
      </RadixRadioGroup.Root>
      {helperText && (
        <Typography.Body
          size={TypographySize.Small}
          id={helperId}
          className={cx(styles.helperText, error && styles.error)}
        >
          {error && (
            <Icon
              name={IconName.Error}
              decorative
              size={16}
            />
          )}{' '}
          {helperText}
        </Typography.Body>
      )}
    </div>
  );
};
