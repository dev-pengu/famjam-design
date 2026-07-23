import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { BackdropProps } from './backdrop.types';
import { useBackdropVisibility, useBackdropKeyboard } from '../../hooks/use-backdrop/use-backdrop.web';
import styles from './backdrop.web.module.css';

export const Backdrop = ({
  children,
  open = false,
  onClose,
  fadeDuration = 200,
  className,
  ...props
}: Readonly<BackdropProps>) => {
  useTheme();

  const contentRef = useRef<HTMLDivElement>(null);

  const { isOpen, visible, fading, close } = useBackdropVisibility({
    open,
    fadeDuration,
    onClose,
  });

  useBackdropKeyboard({ isOpen, onClose: close });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      close();
    }
  };

  if (!visible) return null;

  return createPortal(
    <div
      role='presentation'
      aria-hidden={!isOpen}
      className={cx(styles.backdrop, fading ? styles.fadeOut : styles.fadeIn, className)}
      style={{ '--fade-duration': `${fadeDuration}ms` } as React.CSSProperties}
      onClick={handleBackdropClick}
      {...props}
    >
      {children && (
        <div
          ref={contentRef}
          className={styles.content}
        >
          {children}
        </div>
      )}
    </div>,
    document.body,
  );
};
