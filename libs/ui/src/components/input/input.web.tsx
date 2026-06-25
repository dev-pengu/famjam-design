import { useId, useState, useCallback, useEffect, useMemo } from 'react';
import styles from './input.web.module.css';
import { cx } from '../../utils/cx';
import { InputProps, InputVariant, LabelVariant } from './input.types';
import { Typography, TypographySize } from '../typography';
import { InputState, helperPayloadMap } from './input-base';
import { Icon } from '../icon';

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

export const Input = ({
  variant = InputVariant.Text,
  labelVariant = LabelVariant.Primary,
  state = InputState.Default,
  defaultValue = '',
  label,
  helperMessage,
  required,
  maxLength,
  showCharacterCount,
  className,
  testID,
  onChange,
  onFocus,
  onBlur,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) => {
  const helperId = useId();
  const inputId = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [valueState, setValueState] = useState(defaultValue);

  const disabled = state === InputState.Disabled;
  const isTextArea = variant === InputVariant.TextArea;

  const isFloating = isFocused || !valueState;

  const effectiveState: InputState = disabled
    ? InputState.Disabled
    : isFocused && state === InputState.Default
      ? InputState.Active
      : state;

  const helperPayload = helperPayloadMap[effectiveState];

  const showFloatingLabel = label && labelVariant === LabelVariant.Float;
  const showPrimaryLabel = label && labelVariant === LabelVariant.Primary;
  const showHelperLabel = helperPayload && helperMessage;

  useEffect(() => {
    if (disabled) setIsFocused(false);
  }, [disabled]);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValueState(event.target.value);
      onChange?.(event);
    },
    [onChange, setValueState],
  );

  const Comp = isTextArea ? 'textarea' : 'input';

  const floatingLabelFragment = useMemo(
    () => (
      <>
        {label} <span className={styles.labelRequired}>{required && '*'}</span>
      </>
    ),
    [label, required],
  );

  return (
    <div className={cx(styles.wrapper, className)}>
      {showPrimaryLabel && (
        <label
          htmlFor={inputId}
          className={styles.labelRow}
        >
          <Typography.Body
            size={TypographySize.Large}
            bold
          >
            {label}
          </Typography.Body>
          {required && <span className={styles.labelRequired}>*</span>}
        </label>
      )}
      <fieldset
        className={cx(
          styles.inputContainer,
          isTextArea ? styles.large : styles.field,
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
              className={cx(
                helperClassMap[effectiveState],
                styles.floatLabel,
                styles.label,
                isFloating && styles.floatLabelFloating,
              )}
            >
              {floatingLabelFragment}
            </label>
          </>
        )}
        <Comp
          {...props}
          id={inputId}
          value={valueState}
          disabled={disabled}
          aria-describedby={helperId}
          aria-invalid={effectiveState === InputState.Error}
          data-testid={testID}
          className={isTextArea ? styles.textarea : styles.input}
          type={isTextArea ? undefined : variant}
          maxLength={maxLength}
          placeholder={showFloatingLabel ? '' : props.placeholder}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </fieldset>
      {(showHelperLabel || showCharacterCount) && (
        <div
          className={cx(
            styles.helperRow,
            helperClassMap[effectiveState],
            !showHelperLabel && showCharacterCount && styles.characterCount,
          )}
        >
          {showHelperLabel && (
            <Typography.Body
              size={TypographySize.Medium}
              id={helperId}
              data-testid={testID}
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
          )}
          {showCharacterCount && (
            <Typography.Body
              size={TypographySize.Small}
              muted
            >
              {String(valueState).length}/{maxLength ?? 0}
            </Typography.Body>
          )}
        </div>
      )}
    </div>
  );
};
