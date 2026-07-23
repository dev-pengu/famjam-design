import { useState, useEffect, useRef, useCallback } from 'react';

export const useBackdropVisibility = ({
  open = false,
  fadeDuration,
  onClose,
}: {
  open?: boolean;
  fadeDuration: number;
  onClose?: () => void;
}) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const [visible, setVisible] = useState(false);   // controls mount
  const [fading, setFading] = useState(false);      // controls fade-out class
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isOpen = isControlled ? open : internalOpen;

  const close = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  useEffect(() => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);

    if (isOpen) {
      setVisible(true);
      // rAF ensures the element is mounted before the fade-in class applies
      requestAnimationFrame(() => setFading(false));
    } else {
      setFading(true);
      fadeTimer.current = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, fadeDuration);
    }

    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [isOpen, fadeDuration]);

  return { isOpen, visible, fading, close };
};

export const useBackdropKeyboard = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
};