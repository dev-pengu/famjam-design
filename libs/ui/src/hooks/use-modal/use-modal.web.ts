import { useEffect, useRef, useCallback, useState } from 'react';

export const useFocusTrap = ({
  containerRef,
  isOpen,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  isOpen: boolean;
}) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the first focusable element in the modal
    const focusable = getFocusable(containerRef.current);
    focusable[0]?.focus();

    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isOpen, containerRef]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== 'Tab' || !containerRef.current) return;

      const focusable = getFocusable(containerRef.current);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [containerRef],
  );

  return { handleKeyDown };
};

const getFocusable = (container: HTMLElement | null): HTMLElement[] => {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.closest('[aria-hidden="true"]'));
};

export const useModalVisibility = ({
  open,
  fadeDuration,
  onClose,
}: {
  open: boolean;
  fadeDuration: number;
  onClose: () => void;
}) => {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState<'in' | 'out' | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);

    if (open) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating('in'));
    } else {
      setAnimating('out');
      fadeTimer.current = setTimeout(() => {
        setVisible(false);
        setAnimating(null);
      }, fadeDuration);
    }

    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [open, fadeDuration]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return { visible, animating };
};
