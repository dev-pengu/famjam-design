import { useRef, useId, cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { TooltipPosition, TooltipProps } from './tooltip.types';
import { useTooltipVisibility, useTooltipPosition } from '../../hooks/use-tooltip/use-tooltip.web';
import styles from './tooltip.web.module.css';

export const Tooltip = ({
  children,
  content,
  position = { horizontal: 'center', vertical: 'start' },
  showArrow = true,
  delay = 0,
  open: controlledOpen,
  onOpen,
  onClose,
  describeChild = false,
  className,
}: TooltipProps) => {
  useTheme();

  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { isOpen, show, hide } = useTooltipVisibility({
    open: controlledOpen,
    onOpen,
    onClose,
    delay,
  });

  const { coords, arrowCoords, arrowSide } = useTooltipPosition({
    triggerRef,
    tooltipRef,
    position,
    isOpen,
    showArrow,
  });

  const trigger = cloneElement(children, {
    ref: triggerRef,
    [describeChild ? 'aria-describedby' : 'aria-labelledby']: isOpen ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      show();
      children.props.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      hide();
      children.props.onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      show();
      children.props.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      hide();
      children.props.onBlur?.(e);
    },
  });

  return (
    <>
      {trigger}
      {isOpen &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role='tooltip'
            className={cx(styles.tooltip, styles[`arrow-${arrowSide}`], !coords && styles.measuring, className)}
            style={coords ? { top: coords.top, left: coords.left } : { visibility: 'hidden', top: -9999, left: -9999 }}
          >
            {content}
            {showArrow && arrowCoords && (
              <span
                className={cx(styles.arrow, styles[`arrow-${arrowSide}`])}
                style={arrowCoords}
                aria-hidden
              />
            )}
          </div>,
          document.body,
        )}
    </>
  );
};
