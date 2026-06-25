import { icons } from '@famjam/icons/native';
import { useTheme } from '../theme-provider/theme-context';
import { IconProps } from './icon.types';

const FALLBACK_SIZE = 24;
const FALLBACK_COLOR = 'rgba(34,34,34,1)';

export const Icon = ({ name, size, color, decorative = true, accessibilityLabel, ...props }: IconProps) => {
  const {
    theme: { tokens },
  } = useTheme();
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  const iconSize = size ?? tokens?.Size.v24 ?? FALLBACK_SIZE;
  const iconColor = color ?? tokens?.Color.IconPrimary ?? FALLBACK_COLOR;

  return (
    <IconComponent
      width={iconSize}
      height={iconSize}
      fill={iconColor}
      accessibilityRole={decorative ? undefined : 'image'}
      accessibilityLabel={decorative ? undefined : accessibilityLabel}
      accessible={!decorative}
      {...props}
    />
  );
};
