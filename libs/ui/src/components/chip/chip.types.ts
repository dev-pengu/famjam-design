import type { IconName } from '@famjam/icons';

export interface ChipProps {
  label: string;
  dark?: boolean;
  large?: boolean;
  leadingIcon?: IconName;
  dismissable?: boolean;
  onDismiss?: () => void;
  accessibilityLabel?: string;
  testID?: string;
}
