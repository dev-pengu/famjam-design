import { useId, useMemo, Children, isValidElement, cloneElement } from 'react';
import { CheckboxGroupOrientation, CheckboxGroupProps, CheckboxGroupContextValue } from './checkbox-group.types';
import { cx } from '../../utils/cx';
import styles from './checkbox-group.web.module.css';
import { CheckboxSize, CheckboxProps } from '../checkbox/checkbox.types';
import { Typography } from '../typography/typography.web';
import { Icon } from '../icon/icon.web';
import { IconName } from '@famjam/icons';
import { TypographySize } from '../typography/typography.types';
import { CheckboxGroupContext } from './checkbox-group-context';
import { useTheme } from '../theme-provider/theme-context';
import { useControlled } from '../../hooks/use-controlled/use-controlled.web';

export const CheckboxGroup = ({
  children,
  size = CheckboxSize.Medium,
  orientation = CheckboxGroupOrientation.Vertical,
  className,
  label,
  required = false,
  error = false,
  helperText,
  exclusive = false,
  defaultCheckedId,
  checkedId: controlledCheckedId,
  onCheckedIdChange,
}: Readonly<CheckboxGroupProps>) => {
  useTheme();
  const helperId = useId();

  const [checkedId, setCheckedId] = useControlled({
    controlledValue: controlledCheckedId,
    defaultValue: defaultCheckedId,
    onChange: onCheckedIdChange,
  });

  const ctx: CheckboxGroupContextValue = useMemo(
    () => ({ checkedId, setCheckedId, exclusive }),
    [checkedId, setCheckedId, exclusive],
  );

  const groupId = useId();
  const checkboxes = Children.map(children, (child, index) => {
    if (!isValidElement<CheckboxGroupProps>(child)) return child;

    return cloneElement(child as React.ReactElement<CheckboxProps>, {
      size: size,
      id: `${groupId}-${index}`,
    });
  });

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div className={cx(styles.container, styles[size], error && styles.error)}>
        <label className={styles.label}>
          <Typography.Body>{label}</Typography.Body>
          {required && <span className={styles.required}>*</span>}
        </label>
        <div
          className={cx(styles.group, styles[orientation], className)}
          role='group'
          aria-describedby={helperId}
        >
          {checkboxes}
        </div>
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
    </CheckboxGroupContext.Provider>
  );
};
