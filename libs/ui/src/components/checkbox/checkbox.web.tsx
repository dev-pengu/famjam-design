import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckboxProps, CheckboxSize } from './checkbox.types';
import { useTheme } from '../theme-provider/theme-context';
import { useControlled } from '../../hooks/use-controlled/use-controlled.web';
import { cx } from '../../utils/cx';
import { Icon } from '../icon/icon.web';
import styles from './checkbox.web.module.css';
import { IconName } from '@famjam/icons';
import { Typography } from '../typography';
import { useCallback, useContext } from 'react';
import { CheckboxGroupContext } from '../checkbox-group/checkbox-group-context';

export { CheckboxSize };

const iconSizeByCheckboxSize: Record<CheckboxSize, number> = {
  [CheckboxSize.Small]: 12,
  [CheckboxSize.Medium]: 16,
  [CheckboxSize.Large]: 24,
};

export const Checkbox = ({
  label,
  size = CheckboxSize.Medium,
  disabled = false,
  error = false,
  required = false,
  defaultChecked,
  checked: controlledChecked,
  onCheckedChange,
  className,
  id
}: Readonly<CheckboxProps>) => {
  useTheme();

  const groupCtx = useContext(CheckboxGroupContext);

  const isGroupControlled = groupCtx !== null && groupCtx.exclusive;
  const groupChecked = isGroupControlled ? groupCtx?.checkedId === id : undefined;

  const handleGroupChange = useCallback(
    (next: React.SetStateAction<boolean | 'indeterminate' | undefined>) => {
      if (!groupCtx || !id) return;
      groupCtx.setCheckedId(next ? id : undefined);
      onCheckedChange?.(next);
    },
    [groupCtx, id, onCheckedChange]
  )

  const [checked, onChange] = useControlled({
    controlledValue: isGroupControlled ? groupChecked : controlledChecked,
    defaultValue: defaultChecked,
    onChange: isGroupControlled ? handleGroupChange : onCheckedChange,
    disabled
  })

  return (
    <label className={cx(styles.wrapper, styles[size], disabled && styles.disabled, error && styles.error, className)}>
      <RadixCheckbox.Root
        className={styles.root}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-invalid={error}
      >
        <RadixCheckbox.Indicator className={checked === 'indeterminate' ? styles.indeterminateIndicator : styles.indicator}>
          {checked === 'indeterminate' ? (
            <Icon
              name={IconName.Remove}
              size={iconSizeByCheckboxSize[size]}
            />
          ) : (
            <Icon
              name={IconName.Check}
              size={iconSizeByCheckboxSize[size]}
            />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      {label && <Typography.Body as='span' className={styles.label}>{label}</Typography.Body>}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
};
