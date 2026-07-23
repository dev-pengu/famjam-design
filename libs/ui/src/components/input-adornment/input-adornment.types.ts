import { RefObject } from 'react';

export type InputAdornmentProps = {
  position: 'end' | 'start';
  children: React.ReactNode;
  className?: string;
  disableTypography?: boolean;
  disablePointerEvents?: boolean;
  ownerRef?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
} & React.HTMLAttributes<HTMLSpanElement>;
