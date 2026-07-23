import { useEffect, useRef, useCallback, useState } from 'react';

import { useTimeout } from '../use-timeout';
import { useEventCallback } from '../use-event-callback';

export const useToastTimer = ({
  duration,
  onClose,
  enabled,
  resumeDuration,
}: {
  duration?: number | null;
  onClose: () => void;
  enabled: boolean;
  resumeDuration?: number | null;
}) => {
  const timerAutoHide = useTimeout();

  const handleClose = useEventCallback(() => onClose?.());

  const setAutoHideTimer = useEventCallback((autoHideDuration: number | null) => {
    if (!onClose || autoHideDuration == null) return;

    timerAutoHide?.start(autoHideDuration, () => {
      handleClose();
    });
  });

  useEffect(() => {
    if (enabled) {
      setAutoHideTimer(duration ?? null);
    }

    return timerAutoHide?.clear;
  }, [open, duration, setAutoHideTimer, timerAutoHide]);

  const handleClickAway = () => {
    onClose?.();
  };

  const handlePause = timerAutoHide?.clear;

  const handleResume = useCallback(() => {
    if (duration != null) {
      setAutoHideTimer(resumeDuration != null ? resumeDuration : duration);
    }
  }, [duration, resumeDuration, setAutoHideTimer]);

  return { pause: handlePause, resume: handleResume, onClickAway: handleClickAway };
};

export const useSnackbarKeyboard = ({ isActive, onClose }: { isActive: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (!isActive) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isActive, onClose]);
};

export const useToastVisibility = ({ slideDuration = 250 }: { slideDuration?: number }) => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    setExiting(true);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, slideDuration);
  }, [slideDuration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { visible, exiting, dismiss };
};
