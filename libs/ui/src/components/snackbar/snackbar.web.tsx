import { createPortal } from 'react-dom';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { SnackbarProps, ToastProps, ToastItem, SnackbarAnchorOrigin } from './snackbar.types';
import { useToastTimer, useSnackbarKeyboard, useToastVisibility } from '../../hooks/use-toast/use-toast.web';
import styles from './snackbar.web.module.css';
import { Typography, TypographyTextSize } from '../typography';
import { useCallback, useEffect, useRef } from 'react';
import { Button, ButtonSize, ButtonVariant } from '../button/button.web';
import { ButtonColor } from '../button';

const slideInClass = (origin: SnackbarAnchorOrigin): string => {
  if (origin.horizontal === 'left') return styles.slideInLeft!;
  if (origin.horizontal === 'right') return styles.slideInRight!;
  return origin.vertical === 'top' ? styles.slideInTop! : styles.slideInBottom!;
};

const slideOutClass = (origin: SnackbarAnchorOrigin): string => {
  if (origin.horizontal === 'left') return styles.slideOutLeft!;
  if (origin.horizontal === 'right') return styles.slideOutRight!;
  return origin.vertical === 'top' ? styles.slideOutTop! : styles.slideOutBottom!;
};

const Toast = ({
  id,
  message,
  children,
  action,
  autoHideDuration,
  anchorOrigin,
  onClose,
  isNew,
  registerKeyboardListener = true,
  className,
}: ToastProps) => {
  useTheme();
  const { visible, exiting, dismiss } = useToastVisibility({});

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleClose = useCallback(() => {
    console.log(`handleClose is being called for ${id}`);
    dismiss();
    setTimeout(() => onClose(id), 250);
  }, [id, dismiss]);

  const { pause, resume } = useToastTimer({
    duration: autoHideDuration,
    onClose: handleClose,
    enabled: !!autoHideDuration,
  });

  useSnackbarKeyboard({ isActive: registerKeyboardListener, onClose: handleClose });

  if (!visible) return null;

  return (
    <div
      role='status'
      aria-live='polite'
      aria-atomic
      className={cx(
        styles.toast,
        isNew && !exiting && slideInClass(anchorOrigin),
        exiting && slideOutClass(anchorOrigin),
        className,
      )}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {children ? (
        <div className={styles.childContent}>
          {children}
          <Button
            onClick={handleClose}
            aria-label='Close notification'
            size={ButtonSize.Small}
            variant={ButtonVariant.Text}
            color={ButtonColor.Inverted}
          >
            <Icon
              name={IconName.Close}
              decorative
              size={24}
            />
          </Button>
        </div>
      ) : (
        <div className={styles.messageContent}>
          {message && (
            <Typography.Body
              as='span'
              size={TypographyTextSize.Small}
            >
              {message}
            </Typography.Body>
          )}
          <div className={styles.controls}>
            {action && <div className={styles.action}>{action}</div>}
            <Button
              onClick={handleClose}
              aria-label='Close notification'
              size={ButtonSize.Small}
              variant={ButtonVariant.Text}
              color={ButtonColor.Inverted}
            >
              <Icon
                name={IconName.Close}
                decorative
                size={24}
              />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Snackbar = ({
  open,
  onClose,
  message,
  children,
  action,
  autoHideDuration,
  toasts,
  onToastClose,
  maxStack,
  anchorOrigin = { horizontal: 'left', vertical: 'bottom' },
  className,
}: Readonly<SnackbarProps>) => {
  useTheme();

  const seenIds = useRef<Set<string>>(new Set());
  const isStackmode = toasts !== undefined;
  const visibleToasts: ToastItem[] = isStackmode ? (maxStack ? toasts.slice(-maxStack) : toasts) : [];

  const container = (
    <div
      className={cx(styles.container, styles[`anchor-${anchorOrigin.vertical}-${anchorOrigin.horizontal}`], className)}
    >
      {isStackmode
        ? visibleToasts.map((toast, index) => {
            const isNew = !seenIds.current.has(toast.id);
            if (isNew) seenIds.current.add(toast.id);
            return (
              <Toast
                key={toast.id}
                id={toast.id}
                message={toast.message}
                action={toast.action}
                autoHideDuration={toast.persistent ? undefined : (toast.autoHideDuration ?? autoHideDuration)}
                anchorOrigin={anchorOrigin}
                onClose={(id) => onToastClose?.(id)}
                isNew={isNew}
                registerKeyboardListener={index === visibleToasts.length - 1}
              >
                {toast.children}
              </Toast>
            );
          })
        : open &&
          onClose && (
            <Toast
              id='single'
              message={message}
              action={action}
              autoHideDuration={autoHideDuration}
              anchorOrigin={anchorOrigin}
              onClose={() => onClose()}
              isNew={true}
            >
              {children}
            </Toast>
          )}
    </div>
  );

  return createPortal(container, document.body);
};
