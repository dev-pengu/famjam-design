import { useId, useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { useControlled } from '../../hooks';
import { cx } from '../../utils/cx';
import { DatePickerProps, DatePickerSize } from './date-picker.types';
import styles from './date-picker.web.module.css';
import { Typography, TypographySize } from '../typography';
import { LabelVariant } from '../input';
import { InputState, helperPayloadMap } from '../input/input-base';
import { Icon } from '../icon/icon.web';

export { DatePickerSize };

const helperClassMap: Record<InputState, string | undefined> = {
  [InputState.Success]: styles.textSuccess,
  [InputState.Error]: styles.textError,
  [InputState.Disabled]: styles.textDisabled,
  [InputState.Default]: '',
  [InputState.Active]: '',
};

const containerClassMap: Record<InputState, string | undefined> = {
  [InputState.Success]: styles.success,
  [InputState.Error]: styles.error,
  [InputState.Disabled]: styles.disabled,
  [InputState.Default]: styles.resting,
  [InputState.Active]: styles.active,
};

export const DatePicker = ({
  value: controlledValue,
  defaultValue = '',
  onChange,
  size = DatePickerSize.Medium,
  label,
  labelVariant = LabelVariant.Primary,
  helperMessage,
  state = InputState.Default,
  min,
  max,
  required = false,
  disabled: disabledProp = false,
  testID,
  className,
}: Readonly<DatePickerProps>) => {
  const inputId = useId();
  const helperId = useId();
  const disabled = disabledProp || state === InputState.Disabled;
  const [isFocused, setIsFocused] = useState(false);

  const [value, setValue] = useControlled({
    controlledValue,
    defaultValue,
    onChange,
    disabled,
  });

  useEffect(() => {
    if (disabled) setIsFocused(false);
  }, [disabled]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    [setValue],
  );

  const isFloating = isFocused || !!value;
  const effectiveState: InputState = disabled
    ? InputState.Disabled
    : isFocused && state === InputState.Default
      ? InputState.Active
      : state;
  const helperPayload = helperPayloadMap[effectiveState];

  const showFloatingLabel = label && labelVariant === LabelVariant.Float;
  const showPrimaryLabel = label && labelVariant === LabelVariant.Primary;
  const showHelperLabel = helperPayload && helperMessage;

  const floatingLabelFragment = useMemo(
    () => (
      <>
        {label} <span className={styles.required}>{required && '*'}</span>
      </>
    ),
    [label, required],
  );

  return (
    <div className={cx(styles.wrapper, styles[size], className)}>
      {showPrimaryLabel && (
        <label
          htmlFor={inputId}
          className={styles.labelRow}
        >
          <Typography.Body>{label}</Typography.Body>
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <fieldset
        className={cx(
          styles.inputContainer,
          containerClassMap[effectiveState],
          showFloatingLabel && isFloating && styles.inputContainerFloating,
        )}
      >
        {showFloatingLabel && (
          <>
            <legend
              className={cx(styles.floatLegend, isFloating && styles.floatLegendVisible)}
              aria-hidden='true'
            >
              <span className={styles.floatingLegendText}>{floatingLabelFragment}</span>
            </legend>
            <label
              htmlFor={inputId}
              className={cx(helperClassMap[effectiveState], styles.floatLabel, isFloating && styles.floatLabelFloating)}
            >
              {floatingLabelFragment}
            </label>
          </>
        )}
        <input
          id={inputId}
          type='date'
          value={value}
          min={min}
          max={max}
          disabled={disabled}
          required={required}
          aria-describedby={helperMessage ? helperId : undefined}
          aria-invalid={effectiveState === InputState.Error}
          data-testid={testID}
          className={styles.input}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </fieldset>
      {showHelperLabel && (
        <div className={cx(styles.helperRow, helperClassMap[effectiveState])}>
          <Typography.Body
            size={TypographySize.Small}
            id={helperId}
            className={styles.helper}
          >
            {helperPayload?.iconName && (
              <Icon
                name={helperPayload?.iconName}
                decorative
                size={16}
              />
            )}{' '}
            {helperMessage}
          </Typography.Body>
        </div>
      )}
    </div>
  );
};
