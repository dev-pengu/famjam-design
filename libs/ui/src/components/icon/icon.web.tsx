import { AccessibleIcon } from '@radix-ui/react-accessible-icon';
import { icons } from '@famjam/icons';
import { IconProps } from './icon.types';

export const Icon = ({ name, size, color, decorative = true, accessibilityLabel, ...props }: IconProps) => {
  const iconColor = color ?? 'currentColor';
  const iconSize = size ?? '1em';

  const IconComponent = icons[name];
  if (!IconComponent) {
    return null;
  }

  if (decorative) {
    return (
      <IconComponent
        width={iconSize}
        height={iconSize}
        fill={iconColor}
        aria-hidden
        {...props}
      />
    );
  }

  return (
    <AccessibleIcon label={accessibilityLabel!}>
      <IconComponent
        width={iconSize}
        height={iconSize}
        fill={iconColor}
        {...props}
      />
    </AccessibleIcon>
  );
};
