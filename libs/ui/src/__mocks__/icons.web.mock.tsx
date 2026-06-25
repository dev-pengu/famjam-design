import * as React from 'react';

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M0 0h24v240z' />
  </svg>
);

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
