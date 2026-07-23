import { useId, useState } from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { SwitchProps, SwitchLabelPlacement, SwitchSize, SwitchVariant } from './switch.types';
import { cx } from '../../utils/cx';
import styles from './switch.web.module.css';
import { Typography } from '../typography';
import { useControlled } from '../../hooks';

export { SwitchLabelPlacement, SwitchSize, SwitchVariant };

export const Switch = ({
  checked,
  defaultChecked,
  onChange,
  size = SwitchSize.Default,
  variant = SwitchVariant.Primary,
  label,
  labelPlacement = SwitchLabelPlacement.End,
  required = false,
  disabled = false,
  className,
}: Readonly<SwitchProps>) => {
  useTheme();

  const switchId = useId();
  const [value, setValue] = useControlled({
    defaultValue: defaultChecked,
    controlledValue: checked,
    onChange,
    disabled
  });


  const handleChange = () => {
    setValue(prev => !prev);
  };

  const labelNode = label && (
    <label
      htmlFor={switchId}
      className={cx(styles.label, disabled && styles.labelDisabled)}
    >
      <Typography.Body>{label}</Typography.Body>
      {required && (
        <span
          className={styles.required}
          aria-hidden
        >
          *
        </span>
      )}
    </label>
  );

  const switchNode = (
    <button
      id={switchId}
      type='button'
      role='switch'
      aria-checked={value}
      aria-required={required}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handleChange}
      className={cx(
        styles.switch,
        styles[size],
        styles[variant],
        value && styles.checked,
        disabled && styles.disabled,
      )}
    >
      <span className={styles.thumb} />
    </button>
  );

  const isVertical = labelPlacement === SwitchLabelPlacement.Top || labelPlacement === SwitchLabelPlacement.Bottom;

  return (
    <div className={cx(styles.root, styles[`placement-${labelPlacement}`], isVertical && styles.vertical, className)}>
      {(labelPlacement === SwitchLabelPlacement.Top || labelPlacement === SwitchLabelPlacement.Start) && labelNode}
      {switchNode}
      {(labelPlacement === SwitchLabelPlacement.Bottom || labelPlacement === SwitchLabelPlacement.End) && labelNode}
    </div>
  );
};
