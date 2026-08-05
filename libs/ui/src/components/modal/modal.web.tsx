import { useRef, useId } from 'react';
import { createPortal } from 'react-dom';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import {
  ModalProps,
  ModalSize,
  ModalSlideFrom,
  ModalTitleProps,
  ModalContentProps,
  ModalContentTextProps,
  ModalActionsProps,
} from './modal.types';
import { useFocusTrap, useModalVisibility } from '../../hooks/use-modal/use-modal.web';
import styles from './modal.web.module.css';
import { Typography } from '../typography';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../button';

export { ModalSize, ModalSlideFrom };

export const ModalTitle = ({ children, className }: ModalTitleProps) => {
  return (
    <div className={cx(styles.title, className)}>
      <Typography.Title>{children}</Typography.Title>
    </div>
  );
};

export const ModalContentText = ({ children, className }: ModalContentTextProps) => {
  return <Typography.Body className={cx(styles.contentText, className)}>{children}</Typography.Body>;
};

export const ModalContent = ({ children, className }: ModalContentProps) => {
  return <div className={cx(styles.content, className)}>{children}</div>;
};

export const ModalActions = ({ children, align = 'end', className }: ModalActionsProps) => {
  return <div className={cx(styles.actions, styles[`actions-${align}`], className)}>{children}</div>;
};

export const Modal = ({
  open,
  onClose,
  size = ModalSize.Medium,
  slideFrom = ModalSlideFrom.Bottom,
  isAlert = false,
  closeable = true,
  ariaLabel,
  ariaDescribedBy,
  fadeDuration = 250,
  children,
  className,
}: Readonly<ModalProps>) => {
  useTheme();

  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const { visible, animating } = useModalVisibility({ open, fadeDuration, onClose });
  const { handleKeyDown } = useFocusTrap({ containerRef: modalRef, isOpen: open });

  if (!visible) return null;

  return createPortal(
    <>
      <div
        aria-hidden
        className={cx(
          styles.backdrop,
          animating === 'in' && styles.backdropIn,
          animating === 'out' && styles.backdropOut,
        )}
        style={{ '--fade-duration': `${fadeDuration}ms` } as React.CSSProperties}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        role={isAlert ? 'alertdialog' : 'dialog'}
        aria-modal
        aria-label={ariaLabel}
        aria-labelledby={ariaLabel ? undefined : titleId}
        aria-describedby={ariaDescribedBy}
        aria-live={isAlert ? 'assertive' : undefined}
        className={cx(
          styles.modal,
          styles[size],
          styles[`slide-${slideFrom}`],
          animating === 'in' && styles.slideIn,
          animating === 'out' && styles.slideOut,
          className,
        )}
        style={{ '--fade-duration': `${fadeDuration}ms` } as React.CSSProperties}
        onKeyDown={handleKeyDown}
      >
        {/* Close button sits in its own absolutely positioned slot
            so it doesn't affect the layout of ModalTitle */}
        {closeable && (
          <div className={styles.closeButton}>
            <Button
              // className={styles.closeButton}
              onClick={onClose}
              aria-label='Close modal'
              variant={ButtonVariant.Text}
              shape={ButtonShape.Square}
              size={ButtonSize.Small}
            >
              <Icon
                name={IconName.Close}
                size={18}
                decorative
              />
            </Button>
          </div>
        )}

        {/* Title gets the labelledby id injected via a wrapper */}
        <div
          id={titleId}
          className={styles.titleWrapper}
        >
          {/* ModalTitle, ModalContent, ModalActions render here as children */}
          {children}
        </div>
      </div>
    </>,
    document.body,
  );
};
