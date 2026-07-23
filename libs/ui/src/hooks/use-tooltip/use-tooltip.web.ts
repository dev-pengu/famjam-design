import { useState, useRef, useCallback, useEffect } from 'react';
import { TooltipPosition } from '../../components/tooltip';
import { TooltipCoords, ResolvedPosition, ArrowCoords } from './use-tooltip.types';

const ARROW_SIZE = 8;
const VIEWPORT_PADDING = 8;

export const useTooltipVisibility = ({
  open: controlledOpen,
  onOpen,
  onClose,
  delay = 0,
}: {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  delay?: number;
}) => {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClosedAt = useRef<number>(0);

  const isOpen = isControlled ? controlledOpen : internalOpen;

  const show = useCallback(() => {
    const now = Date.now();
    const elapsed = now - lastClosedAt.current;
    const remaining = delay - elapsed;

    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);

    if (remaining > 0) {
      delayTimerRef.current = setTimeout(() => {
        if (!isControlled) setInternalOpen(true);
        onOpen?.();
      }, remaining);
    } else {
      if (!isControlled) setInternalOpen(true);
      onOpen?.();
    }
  }, [delay, isControlled, onOpen]);

  const hide = useCallback(() => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    lastClosedAt.current = Date.now();
    if (!isControlled) setInternalOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, []);

  return { isOpen, show, hide };
};

const flipHorizontal = (h: string) => (h === 'start' ? 'end' : h === 'end' ? 'start' : h);
const flipVertical = (v: string) => (v === 'start' ? 'end' : v === 'end' ? 'start' : v);

export const useTooltipPosition = ({
  triggerRef,
  tooltipRef,
  position,
  isOpen,
  showArrow,
}: {
  triggerRef: React.RefObject<HTMLElement | null>;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  position: TooltipPosition;
  isOpen: boolean;
  showArrow: boolean;
}): ResolvedPosition => {
  const [resolved, setResolved] = useState<ResolvedPosition>({
    position,
    coords: null,
    arrowCoords: null,
    arrowSide: 'bottom',
  });

  const calculate = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip || !isOpen) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const arrow = showArrow ? ARROW_SIZE : 0;

    let { horizontal, vertical } = position;

    const calcCoords = (
      h: TooltipPosition['horizontal'],
      v: TooltipPosition['vertical'],
    ): { top: number; left: number; arrowSide: ResolvedPosition['arrowSide'] } => {
      let top = 0;
      let left = 0;
      let arrowSide: ResolvedPosition['arrowSide'] = 'bottom';

      if (v === 'start') {
        top = triggerRect.top - tooltipRect.height - arrow;
        arrowSide = 'bottom';
      } else if (v === 'end') {
        top = triggerRect.bottom + arrow;
        arrowSide = 'top';
      } else {
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        arrowSide = h === 'start' ? 'right' : 'left';
      }

      if (v !== 'center') {
        if (h === 'start') {
          left = triggerRect.left;
        } else if (h === 'end') {
          left = triggerRect.right + tooltipRect.width;
        } else {
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        }
      } else {
        if (h === 'start') {
          left = triggerRect.left - tooltipRect.width - arrow;
        } else if (h === 'end') {
          left = triggerRect.right + arrow;
        } else {
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        }
      }

      return { top, left, arrowSide };
    };

    let { top, left, arrowSide } = calcCoords(horizontal, vertical);

    let didFlipV = false;
    let didFlipH = false;

    if (vertical !== 'center') {
      if (top < VIEWPORT_PADDING) {
        vertical = flipVertical(vertical) as TooltipPosition['vertical'];
        didFlipV = true;
      } else if (top + tooltipRect.height > vh - VIEWPORT_PADDING) {
        vertical = flipVertical(vertical) as TooltipPosition['vertical'];
        didFlipV = true;
      }
    }

    if (left < VIEWPORT_PADDING) {
      horizontal = flipHorizontal(horizontal) as TooltipPosition['horizontal'];
      didFlipH = true;
    } else if (left + tooltipRect.width > vw - VIEWPORT_PADDING) {
      horizontal = flipHorizontal(horizontal) as TooltipPosition['horizontal'];
      didFlipH = true;
    }

    if (didFlipV || didFlipH) {
      ({ top, left, arrowSide } = calcCoords(horizontal, vertical));
    }

    top = Math.max(VIEWPORT_PADDING, Math.min(top, vh - tooltipRect.height - VIEWPORT_PADDING));
    left = Math.max(VIEWPORT_PADDING, Math.min(left, vw - tooltipRect.width - VIEWPORT_PADDING));

    let arrowCoords: ArrowCoords = null;
    if (showArrow) {
      const triggerCenterX = triggerRect.left + triggerRect.width / 2 - left;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2 - top;

      if (arrowSide === 'top' || arrowSide === 'bottom') {
        arrowCoords = {
          left: Math.max(ARROW_SIZE, Math.min(triggerCenterX, tooltipRect.width - ARROW_SIZE)),
          [arrowSide]: -ARROW_SIZE,
        };
      } else {
        arrowCoords = {
          top: Math.max(ARROW_SIZE, Math.min(triggerCenterY, tooltipRect.height - ARROW_SIZE)),
          [arrowSide]: -ARROW_SIZE,
        };
      }
    }

    setResolved({
      position: { horizontal, vertical },
      coords: { top, left },
      arrowCoords,
      arrowSide,
    });
  }, [triggerRef, tooltipRef, position, isOpen, showArrow]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(calculate);
    return () => cancelAnimationFrame(frame);
  }, [isOpen, calculate]);

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('scroll', calculate, true);
    window.addEventListener('resize', calculate);
    return () => {
      window.removeEventListener('scroll', calculate, true);
      window.removeEventListener('resize', calculate);
    };
  }, [isOpen, calculate]);

  return resolved;
};
