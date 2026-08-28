import { useId, useRef, useState, useEffect, useCallback, KeyboardEvent, useMemo } from 'react';
import { IconName } from '@famjam/icons';
import { Chip } from '../chip/chip.web';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { useControlled } from '../../hooks/use-controlled/use-controlled.web';
import { cx } from '../../utils/cx';
import { SelectProps, SelectSize, SelectSelectionDisplay, SelectOption } from './select.types';
import styles from './select.web.module.css';
import { Typography, TypographySize, TypographyTextSize } from '../typography';
import { InputShape, LabelVariant } from '../input';
import { helperPayloadMap, InputState } from '../input/input-base';

export { SelectSize, SelectSelectionDisplay };

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

export const Select = ({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  size = SelectSize.Medium,
  label,
  labelVariant = LabelVariant.Primary,
  helperMessage: helperText,
  state = InputState.Default,
  shape = InputShape.Square,
  placeholder,
  readOnly = false,
  required = false,
  multiple = false,
  dropup = false,
  selectionDisplay = SelectSelectionDisplay.Standard,
  className,
}: Readonly<SelectProps>) => {
  useTheme();

  const id = useId();
  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;
  const disabled = state === InputState.Disabled;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const [value, setValue] = useControlled({
    controlledValue,
    defaultValue,
    onChange,
    disabled,
  });

  const containsValue =
    (typeof value === 'string' && value.length > 0) ||
    (typeof value === 'number' && value !== undefined) ||
    (Array.isArray(value) && value.length > 0);

  const isFloating: boolean = open || containsValue || !!placeholder;
  const effectiveState: InputState = disabled
    ? InputState.Disabled
    : open && state === InputState.Default
      ? InputState.Active
      : state;
  const helperPayload = helperPayloadMap[effectiveState];

  const isInteractive = !disabled && !readOnly;
  const selectedValues = Array.isArray(value) ? value : value !== null ? [value!] : [];

  const selectedOptions = options.filter((o) => selectedValues.includes(o.value));

  const isSelected = (option: SelectOption) => selectedValues.includes(option.value);

  const getDisplayLabel = () => {
    if (selectedOptions.length === 0) return null;
    if (!multiple || selectionDisplay === SelectSelectionDisplay.Icon) {
      return selectedOptions.map((o) => o.label).join(', ');
    }
    return null;
  };

  const handleToggle = () => {
    if (!isInteractive) return;
    setOpen((prev) => !prev);
    setFocusedIndex(-1);
  };

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;

    if (!multiple) {
      setValue(option.value === value ? undefined : option.value);
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }

    const next = isSelected(option)
      ? selectedValues.filter((v) => v !== option.value)
      : [...selectedValues, option.value];

    setValue(next.length > 0 ? next : undefined);
  };

  const handleDismissChip = (optionValue: string | number) => {
    if (!isInteractive) return;
    const next = selectedValues.filter((v) => v !== optionValue);
    setValue(next.length > 0 ? next : undefined);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!isInteractive) return;

    const enabledOptions = options.filter((o) => !o.disabled);

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (open && focusedIndex >= 0) {
          handleSelect(enabledOptions[focusedIndex]!);
        } else {
          setOpen((prev) => !prev);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        setOpen(true);
        setFocusedIndex((prev) => Math.min(prev + 1, enabledOptions.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setOpen(true);
        setFocusedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(enabledOptions.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const showChips = multiple && selectionDisplay === SelectSelectionDisplay.Chip;
  const showIcons = multiple && selectionDisplay === SelectSelectionDisplay.Icon;
  const displayLabel = getDisplayLabel();
  const hasValue = selectedOptions.length > 0;
  const showFloatingLabel = label && labelVariant === LabelVariant.Float;
  const showPrimaryLabel = label && labelVariant === LabelVariant.Primary;
  const showHelperLabel = helperPayload && helperText;

  const floatingLabelFragment = useMemo(
    () => (
      <>
        {label} <span className={styles.required}>{required && '*'}</span>
      </>
    ),
    [label, required],
  );

  return (
    <div
      ref={containerRef}
      className={cx(styles.container, styles[size], readOnly && styles.readOnly, open && styles.open, className)}
    >
      {showPrimaryLabel && (
        <label
          id={labelId}
          htmlFor={id}
          className={styles.label}
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
      )}
      <fieldset
        className={cx(
          styles.triggerContainer,
          styles[shape],
          showFloatingLabel && isFloating && styles.triggerContainerFloating,
          containerClassMap[effectiveState],
        )}
      >
        {showFloatingLabel && (
          <>
            <legend
              className={cx(styles.floatLegend, isFloating && styles.floatLegendVisible)}
              aria-hidden='true'
            >
              <span className={styles.floatingLegend}>{floatingLabelFragment}</span>
            </legend>
            <label
              htmlFor={id}
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
        <button
          ref={triggerRef}
          id={id}
          type='button'
          role='combobox'
          aria-expanded={open}
          aria-haspopup='listbox'
          aria-controls={listboxId}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={helperText ? helperId : undefined}
          aria-required={required}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          aria-invalid={effectiveState === InputState.Error}
          aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : undefined}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={styles.trigger}
        >
          <span className={styles.triggerContent}>
            {showChips && selectedOptions.length > 0 ? (
              <span className={styles.chipList}>
                {selectedOptions.map((option) => (
                  <Chip
                    key={option.value}
                    label={option.label}
                    dismissable
                    onDismiss={(e) => {
                      e?.stopPropagation();
                      handleDismissChip(option.value);
                    }}
                  />
                ))}
              </span>
            ) : (
              <Typography.Body
                as='span'
                className={cx(styles.valueText, !hasValue && styles.placeholder)}
              >
                {hasValue ? displayLabel : showFloatingLabel ? '' : placeholder}
              </Typography.Body>
            )}
          </span>

          <Icon
            className={cx(styles.chevron, open && styles.chevronOpen)}
            name={dropup ? IconName.Dropup : IconName.Dropdown}
            decorative
            size={24}
          />
        </button>
      </fieldset>
      {open && (
        <ul
          id={listboxId}
          role='listbox'
          aria-multiselectable={multiple}
          aria-labelledby={label ? labelId : undefined}
          className={cx(styles.listbox, dropup && styles.dropup)}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role='option'
              aria-selected={isSelected(option)}
              aria-disabled={option.disabled}
              className={cx(
                styles.option,
                isSelected(option) && styles.optionSelected,
                option.disabled && styles.optionDisabled,
                focusedIndex === index && styles.optionFocused,
              )}
              onClick={() => handleSelect(option)}
            >
              {showIcons && (
                <span className={cx(styles.optionCheck, isSelected(option) && styles.optionCheckVisible)}>
                  <Icon
                    name={IconName.Check}
                    decorative
                  />
                </span>
              )}
              <Typography.Body as='span'>{option.label}</Typography.Body>
            </li>
          ))}
        </ul>
      )}

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
            {helperText}
          </Typography.Body>
        </div>
      )}
    </div>
  );
};
