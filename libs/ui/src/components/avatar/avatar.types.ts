import { Color } from '@famjam/tokens/base.styles';
import { IconName } from '@famjam/icons';

export enum AvatarSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum AvatarShape {
  Round = 'round',
  Square = 'square',
}

export enum AvatarVariant {
  Image = 'image',
  Letter = 'letter',
  Icon = 'icon',
  Name = 'name',
}

export type AvatarProps = {
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: Color;
  // Image
  src?: string;
  alt?: string;
  // Letter (explicit single/double letter)
  letter?: string;
  // Name (auto-derives initials + color)
  name?: string;
  // Icon
  icon?: IconName;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
