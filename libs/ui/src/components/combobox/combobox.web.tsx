import { useId, useRef, useState, useEffect, useCallback, useMemo, KeyboardEvent, ChangeEvent } from 'react';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { useControlled } from '../../hooks/use-controlled/use-controlled.web';
import { cx } from '../../utils/cx';
import { ComboboxProps, ComboboxSize, ComboboxOption } from './combobox.types';
import styles from './combobox.web.module.css';
import { Typography, TypographySize } from '../typography';
import { InputShape, LabelVariant } from '../input';
import { helperPayloadMap, InputState } from '../input/input-base';

export { ComboboxSize };

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

export const Combobox = ({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  size = ComboboxSize.Medium,
  label,
  labelVariant = LabelVariant.Primary,
  helperMessage: helperText,
  state = InputState.Default,
  shape = InputShape.Square,
  placeholder,
  noOptionsMessage = 'No options found',
  readOnly = false,
  required = false,
  className,
}: Readonly<ComboboxProps>) => {
  useTheme();

  const id = useId();
  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;
  const disabled = state === InputState.Disabled;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const [value, setValue] = useControlled<string>({
    controlledValue,
    defaultValue,
    onChange,
    disabled,
  });

  const isInteractive = !disabled && !readOnly;
  const selectedOption = options.find((o) => o.value === value);
  const isFloating = open || !!selectedOption || !!placeholder;
  const effectiveState: InputState = disabled
    ? InputState.Disabled
    : open && state === InputState.Default
      ? InputState.Active
      : state;
  const helperPayload = helperPayloadMap[effectiveState];

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!open || !q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query, open]);

  const openList = useCallback(() => {
    if (!isInteractive) return;
    setOpen(true);
    setFocusedIndex(-1);
  }, [isInteractive]);

  const closeList = useCallback(() => {
    setOpen(false);
    setQuery('');
    setFocusedIndex(-1);
  }, []);

  const handleSelect = (option: ComboboxOption) => {
    if (option.disabled) return;
    setValue(option.value);
    closeList();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setOpen(true);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isInteractive) return;

    const enabledOptions = filteredOptions.filter((o) => !o.disabled);

    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        if (open && focusedIndex >= 0 && enabledOptions[focusedIndex]) {
          handleSelect(enabledOptions[focusedIndex]);
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
        closeList();
        break;
      case 'Tab':
        closeList();
        break;
    }
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeList();
      }
    },
    [closeList],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const showFloatingLabel = label && labelVariant === LabelVariant.Float;
  const showPrimaryLabel = label && labelVariant === LabelVariant.Primary;
  const showHelperLabel = helperPayload && helperText;
  const displayValue = open ? query : (selectedOption?.label ?? '');

  const floatingLabelFragment = (
    <>
      {label} <span className={styles.required}>{required && '*'}</span>
    </>
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
        <div className={styles.trigger}>
          <input
            ref={inputRef}
            id={id}
            type='text'
            role='combobox'
            autoComplete='off'
            aria-expanded={open}
            aria-haspopup='listbox'
            aria-controls={listboxId}
            aria-autocomplete='list'
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={helperText ? helperId : undefined}
            aria-required={required}
            aria-disabled={disabled}
            aria-readonly={readOnly}
            aria-invalid={effectiveState === InputState.Error}
            aria-activedescendant={focusedIndex >= 0 ? `${id}-option-${focusedIndex}` : undefined}
            disabled={disabled}
            readOnly={readOnly}
            value={displayValue}
            placeholder={showFloatingLabel ? '' : placeholder}
            onFocus={openList}
            onClick={openList}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />
          <Icon
            className={cx(styles.chevron, open && styles.chevronOpen)}
            name={IconName.Dropdown}
            decorative
            size={24}
          />
        </div>
      </fieldset>
      {open && (
        <ul
          id={listboxId}
          role='listbox'
          aria-labelledby={label ? labelId : undefined}
          className={styles.listbox}
        >
          {filteredOptions.length === 0 && (
            <li className={styles.noOptions}>
              <Typography.Body
                as='span'
                className={styles.placeholder}
              >
                {noOptionsMessage}
              </Typography.Body>
            </li>
          )}
          {filteredOptions.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-option-${index}`}
              role='option'
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              className={cx(
                styles.option,
                option.value === value && styles.optionSelected,
                option.disabled && styles.optionDisabled,
                focusedIndex === index && styles.optionFocused,
              )}
              onClick={() => handleSelect(option)}
            >
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
