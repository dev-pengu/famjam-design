import React from 'react';

export type SnackbarHorizontal = 'left' | 'center' | 'right';
export type SnackbarVertical = 'top' | 'bottom';

export type SnackbarAnchorOrigin = {
  horizontal: SnackbarHorizontal;
  vertical: SnackbarVertical;
};

export type ToastItem = {
  id: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  autoHideDuration?: number;
  persistent?: boolean;
};

export type SnackbarProps = {
  open?: boolean;
  onClose?: () => void;
  message?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  autoHideDuration?: number;

  toasts?: ToastItem[];
  onToastClose?: (id: string) => void;
  maxStack?: number;

  anchorOrigin?: SnackbarAnchorOrigin;
  className?: string;
};

export type ToastProps = {
  id: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
  autoHideDuration?: number;
  anchorOrigin: SnackbarAnchorOrigin;
  onClose: (id: string) => void;
  className?: string;
  isNew: boolean;
  registerKeyboardListener?: boolean;
};
