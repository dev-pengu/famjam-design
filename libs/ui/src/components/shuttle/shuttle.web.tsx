import { useState, useCallback } from 'react';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { ShuttleProps, ShuttleItem } from './shuttle.types';
import styles from './shuttle.web.module.css';
import { Typography, TypographyTextSize } from '../typography';
import { useControlled } from '../../hooks';
import { Button, ButtonColor, ButtonShape, ButtonSize } from '../button';

const ListPanel = ({
  label,
  panelItems,
  selectedValues,
  onToggle,
  disabled = false,
}: {
  label: string;
  panelItems: ShuttleItem[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  disabled?: boolean;
}) => (
  <div className={styles.panel}>
    <div className={styles.panelHeader}>
      <Typography.Body
        as='span'
        className={styles.panelLabel}
      >
        {label}
      </Typography.Body>
      <span className={styles.panelCount}>
        {selectedValues.length > 0 ? `${selectedValues.length} / ${panelItems.length}` : panelItems.length}
      </span>
    </div>
    <ul
      role='listbox'
      aria-multiselectable
      className={styles.list}
    >
      {panelItems.length === 0 ? (
        <li className={styles.empty}>
          <Typography.Body size={TypographyTextSize.Small}>No items</Typography.Body>
        </li>
      ) : (
        panelItems.map((item) => (
          <li
            key={item.value}
            role='option'
            aria-selected={selectedValues.includes(item.value)}
            aria-disabled={item.disabled || disabled}
            className={cx(
              styles.item,
              selectedValues.includes(item.value) && styles.itemSelected,
              (item.disabled || disabled) && styles.itemDisabled,
            )}
            onClick={() => {
              if (item.disabled || disabled) return;
              onToggle(item.value);
            }}
          >
            <span className={cx(styles.itemCheck, selectedValues.includes(item.value) && styles.itemCheckVisible)}>
              <Icon
                name={IconName.Check}
                decorative
              />
            </span>
            <Typography.Body as='span'>{item.label}</Typography.Body>
          </li>
        ))
      )}
    </ul>
  </div>
);

export const Shuttle = ({
  items,
  value: controlledValue,
  defaultValue = [],
  onChange,
  sourceLabel = 'Available',
  targetLabel = 'Selected',
  disabled = false,
  className,
}: Readonly<ShuttleProps>) => {
  useTheme();

  const [value, setValue] = useControlled({
    controlledValue,
    defaultValue,
    onChange,
    disabled,
  });

  const [sourceSelected, setSourceSelected] = useState<string[]>([]);
  const [targetSelected, setTargetSelected] = useState<string[]>([]);

  const sourceItems = items.filter((item) => !value?.includes(item.value));
  const targetItems = items.filter((item) => value?.includes(item.value));

  const toggleSourceSelection = (itemValue: string) => {
    setSourceSelected((prev) =>
      prev.includes(itemValue) ? prev.filter((v) => v !== itemValue) : [...prev, itemValue],
    );
  };

  const toggleTargetSelection = (itemValue: string) => {
    setTargetSelected((prev) =>
      prev.includes(itemValue) ? prev.filter((v) => v !== itemValue) : [...prev, itemValue],
    );
  };

  const moveSelected = () => {
    const next = [...value!, ...sourceSelected.filter((v) => !items.find((i) => i.value === v)?.disabled)];
    setValue(next);
    setSourceSelected([]);
  };

  const moveAll = () => {
    const next = items.filter((item) => !item.disabled).map((item) => item.value);
    setValue(next);
    setSourceSelected([]);
  };

  const removeSelected = () => {
    const next = value?.filter((v) => !targetSelected.includes(v));
    setValue(next);
    setTargetSelected([]);
  };

  const removeAll = () => {
    const enableTargetValues = targetItems.filter((item) => !item.disabled).map((item) => item.value);
    const next = value?.filter((v) => !enableTargetValues.includes(v));
    setValue(next);
    setTargetSelected([]);
  };

  const canMoveSelected = sourceSelected.length > 0 && !disabled;
  const canMoveAll = sourceItems.some((i) => !i.disabled) && !disabled;
  const canRemoveSelected = targetSelected.length > 0 && !disabled;
  const canRemoveAll = targetItems.some((i) => !i.disabled) && !disabled;

  return (
    <div className={cx(styles.root, disabled && styles.disabled, className)}>
      <ListPanel
        label={sourceLabel}
        panelItems={sourceItems}
        selectedValues={sourceSelected}
        onToggle={toggleSourceSelection}
      />
      <div className={styles.controls}>
        <Button
          onClick={moveAll}
          disabled={!canMoveAll}
          aria-label='Move all to selected'
          title='Move all'
          color={ButtonColor.Secondary}
          shape={ButtonShape.Square}
          size={ButtonSize.Small}
        >
          <Icon
            name={IconName.ChevronsRight}
            decorative
          />
        </Button>

        <Button
          onClick={moveSelected}
          disabled={!canMoveSelected}
          aria-label='Move selected to selected'
          title='Move selected'
          color={ButtonColor.Secondary}
          shape={ButtonShape.Square}
          size={ButtonSize.Small}
        >
          <Icon
            name={IconName.ChevronRight}
            decorative
          />
        </Button>

        <Button
          onClick={removeSelected}
          disabled={!canRemoveSelected}
          aria-label='Remove selected from selected'
          title='Remove selected'
          color={ButtonColor.Secondary}
          shape={ButtonShape.Square}
          size={ButtonSize.Small}
        >
          <Icon
            name={IconName.ChevronLeft}
            decorative
          />
        </Button>

        <Button
          onClick={removeAll}
          disabled={!canRemoveAll}
          aria-label='Remove all from selected'
          title='Remove all'
          color={ButtonColor.Secondary}
          shape={ButtonShape.Square}
          size={ButtonSize.Small}
        >
          <Icon
            name={IconName.ChevronsLeft}
            decorative
          />
        </Button>
      </div>
      <ListPanel
        label={targetLabel}
        panelItems={targetItems}
        selectedValues={targetSelected}
        onToggle={toggleTargetSelection}
      />
    </div>
  );
};
