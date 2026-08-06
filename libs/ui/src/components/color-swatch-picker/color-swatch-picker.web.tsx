import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { IconName } from '@famjam/icons';
import { Color } from '@famjam/tokens/base.styles';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import { Typography, TypographyTextSize } from '../typography';
import styles from './color-swatch-picker.web.module.css';
import { ColorSwatchOption, ColorSwatchPickerProps, ColorSwatchPickerSize } from './color-swatch-picker.types';

export const DEFAULT_COLOR_SWATCH_OPTIONS: ColorSwatchOption[] = [
  { label: 'Red', value: 'red' },
  { label: 'Orange', value: 'orange' },
  { label: 'Amber', value: 'amber' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Lime', value: 'lime' },
  { label: 'Green', value: 'green' },
  { label: 'Teal', value: 'teal' },
  { label: 'Cyan', value: 'cyan' },
  { label: 'Blue', value: 'blue' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Violet', value: 'violet' },
  { label: 'Pink', value: 'pink' },
];

const SWATCH_COLOR: Record<string, Color> = {
  red: Color.PaletteRed,
  orange: Color.PaletteOrange,
  amber: Color.PaletteAmber,
  yellow: Color.PaletteYellow,
  lime: Color.PaletteLime,
  green: Color.PaletteGreen,
  teal: Color.PaletteTeal,
  cyan: Color.PaletteCyan,
  blue: Color.PaletteBlue,
  indigo: Color.PaletteIndigo,
  violet: Color.PaletteViolet,
  pink: Color.PalettePink,
};

export const ColorSwatchPicker = ({
  options = DEFAULT_COLOR_SWATCH_OPTIONS,
  value,
  defaultValue,
  onChange,
  label,
  size = ColorSwatchPickerSize.Medium,
  disabled = false,
  required = false,
  className,
}: Readonly<ColorSwatchPickerProps>) => {
  useTheme();

  return (
    <div className={cx(styles.container, className)}>
      {label && (
        <label className={styles.label}>
          <Typography.Body size={TypographyTextSize.Small}>{label}</Typography.Body>
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <RadixRadioGroup.Root
        className={styles.group}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <RadixRadioGroup.Item
            key={option.value}
            value={option.value}
            disabled={disabled}
            aria-label={option.label}
            className={cx(styles.swatch, styles[size])}
            style={{ backgroundColor: SWATCH_COLOR[option.value] ?? option.value }}
          >
            <RadixRadioGroup.Indicator className={styles.indicator}>
              <Icon
                name={IconName.Check}
                decorative
                size={14}
                color='var(--color-text-inverse)'
              />
            </RadixRadioGroup.Indicator>
          </RadixRadioGroup.Item>
        ))}
      </RadixRadioGroup.Root>
    </div>
  );
};
