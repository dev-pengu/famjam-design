import React, { useState, useRef, useCallback } from 'react';

export const useControlled = <T = unknown>({
  controlledValue,
  defaultValue,
  onChange,
  disabled,
}: {
  controlledValue?: T;
  defaultValue?: T;
  onChange?: (value: React.SetStateAction<T | undefined>) => void;
  disabled?: boolean;
}): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = useCallback(
    (next: React.SetStateAction<T | undefined>) => {
      if (disabled) return;
      const resolved = typeof next === 'function' ? (next as (prev: T | undefined) => T | undefined)(value) : next;
      if (!isControlled) setInternalValue(resolved);
      onChange?.(resolved);
    },
    [disabled, isControlled, value, onChange],
  );

  return [value, setValue];
};
