import { useState, useCallback, useRef, useMemo } from 'react';
import { AddToastOptions, SnackbarProviderProps } from './snackbar-provider.types';
import { ToastItem } from '../snackbar/snackbar.types';
import { SnackbarContext } from './snackbar-context';
import { Snackbar } from '../snackbar/snackbar.web';

export const SnackbarProvider = ({
  children,
  maxStack = 3,
  autoHideDuration,
  anchorOrigin = { horizontal: 'left', vertical: 'bottom' },
}: SnackbarProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counterRef = useRef(0);

  const addToast = useCallback(
    (options: AddToastOptions): string => {
      const id = `toast-${++counterRef.current}`;
      setToasts((prev) => {
        const next = [...prev, { ...options, id }];
        return maxStack ? next.slice(-maxStack) : next;
      });
      return id;
    },
    [maxStack],
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => setToasts([]), []);

  const value = useMemo(() => ({ addToast, removeToast, clearAll }), [addToast, removeToast, clearAll]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        toasts={toasts}
        onToastClose={removeToast}
        anchorOrigin={anchorOrigin}
        autoHideDuration={autoHideDuration}
      />
    </SnackbarContext.Provider>
  );
};
