import { ToastItem, SnackbarAnchorOrigin } from '../snackbar/snackbar.types';

export type AddToastOptions = Omit<ToastItem, 'id'>;

export type SnackbarContextValue = {
  addToast: (options: AddToastOptions) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
};

export type SnackbarProviderProps = {
  children: React.ReactNode;
  maxStack?: number;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarAnchorOrigin;
};
