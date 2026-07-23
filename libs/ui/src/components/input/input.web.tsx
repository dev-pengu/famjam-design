import {
  useId,
  useState,
  useCallback,
  useEffect,
  useMemo,
  Children,
  isValidElement,
  useRef,
  cloneElement,
} from 'react';
import { useControlled } from '../../hooks';
import styles from './input.web.module.css';
import { cx } from '../../utils/cx';
import { InputProps, InputSize, InputVariant, LabelVariant } from './input.types';
import { TypographySize } from '../typography/typography.types';
import { Typography } from '../typography/typography.web';
import { InputState, helperPayloadMap } from './input-base';
import { Icon } from '../icon/icon.web';
import { InputAdornment, InputAdornmentProps } from '../input-adornment';

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
  inputSize = InputSize.Medium,
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
  value: controlledValue,
  children,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) => {
  const helperId = useId();
  const inputId = useId();
  const disabled = state === InputState.Disabled;
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useControlled({
    controlledValue,
    defaultValue,
    disabled,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange, setValue],
  );

  const isTextArea = variant === InputVariant.TextArea;

  const containsValue =
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'number' && value !== undefined) ||
    (Array.isArray(value) && value.length > 0);

  const isFloating: boolean = isFocused || containsValue;

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

  const floatingLabelFragment = useMemo(
    () => (
      <>
        {label} <span className={styles.labelRequired}>{required && '*'}</span>
      </>
    ),
    [label, required],
  );

  const childrenArray = Children.toArray(children);

  const startAdornment =
    children &&
    cloneElement(
      childrenArray.find(
        (child) =>
          isValidElement<InputAdornmentProps>(child) &&
          child.type === InputAdornment &&
          child.props.position === 'start',
      ) as React.ReactElement<InputAdornmentProps>,
      { ownerRef: isTextArea ? textareaRef : inputRef },
    );

  const endAdornment =
    children &&
    cloneElement(
      childrenArray.find(
        (child) =>
          isValidElement<InputAdornmentProps>(child) && child.type === InputAdornment && child.props.position === 'end',
      ) as React.ReactElement<InputAdornmentProps>,
      { ownerRef: isTextArea ? textareaRef : inputRef },
    );

  const commonInputProps = {
    ...props,
    id: inputId,
    value,
    disabled,
    'aria-describedby': helperId,
    'aria-invalid': effectiveState === InputState.Error,
    'data-testid': testID,
    className: isTextArea ? styles.textarea : styles.input,
    maxLength,
    placeholder: showFloatingLabel ? '' : props.placeholder,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return (
    <div className={cx(styles.wrapper, styles[inputSize], className)}>
      {showPrimaryLabel && (
        <label
          htmlFor={inputId}
          className={styles.labelRow}
        >
          <Typography.Body>{label}</Typography.Body>
          {required && <span className={styles.labelRequired}>*</span>}
        </label>
      )}
      <fieldset
        className={cx(
          styles.inputContainer,
          isTextArea ? styles.multiline : styles.field,
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
        {startAdornment}
        {isTextArea ? (
          <textarea
            {...commonInputProps}
            ref={textareaRef}
          />
        ) : (
          <input
            {...commonInputProps}
            ref={inputRef}
            type={variant}
          />
        )}
        {endAdornment}
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
              size={TypographySize.Small}
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
              {String(value).length}/{maxLength ?? 0}
            </Typography.Body>
          )}
        </div>
      )}
    </div>
  );
};
