import { View } from 'react-native';

const MockIcon = (props: Record<string, unknown>) => <View {...props} />;

export const icons = {
  check: MockIcon,
  error: MockIcon,
  warning: MockIcon,
} as const;

export const IconName = {
  Check: 'check',
  Error: 'error',
  Warning: 'warning',
} as const;

export type IconName = (typeof IconName)[keyof typeof IconName];
