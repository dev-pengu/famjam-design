import { AvatarShape, AvatarSize } from '../avatar/avatar.types';

export type AvatarGroupSpacing = 'compact' | 'normal' | 'loose';

export type AvatarGroupProps = {
  max?: number;
  spacing?: AvatarGroupSpacing;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
  children: React.ReactNode;
};
