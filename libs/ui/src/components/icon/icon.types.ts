import { IconName } from '@famjam/icons';
import { Color } from '@famjam/tokens/base.styles';

type BaseIconProps = {
  name: IconName;
  size?: number;
  color?: Color | 'currentColor' | `var(--${string})`;
};

type DecorativeIconProps = BaseIconProps & {
  decorative?: true;
  accessibilityLabel?: string;
};

type InformativeIconProps = BaseIconProps & {
  decorative: false;
  accessibilityLabel: string;
};

export type IconProps = DecorativeIconProps | InformativeIconProps;

export { IconName, Color };
