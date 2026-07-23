import { useId, useContext, useCallback } from 'react';
import { IconName } from '@famjam/icons';
import { Icon } from '../icon/icon.web';
import { Typography, TypographyTextSize } from '../typography/typography.web';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { AccordionProps } from './accordion.types';
import { useControlled } from '../../hooks';
import { useCollapseAnimation } from './accordion.hooks';
import styles from './accordion.web.module.css';
import { AccordionGroupContext } from '../accordion-group/accordion-group-context';

export const Accordion = ({
  summary,
  children,
  expanded: controlledExpanded,
  onChange,
  defaultExpanded = false,
  expandIcon,
  disabled = false,
  id,
  className,
}: Readonly<AccordionProps>) => {
  useTheme();

  const headerId = useId();
  const panelId = useId();
  const groupCtx = useContext(AccordionGroupContext);

  const isGroupControlled = groupCtx !== null && groupCtx.exclusive;
  const groupExpanded = isGroupControlled ? groupCtx?.expandedId === id : undefined;

  const handleGroupChange = useCallback(
    (next: React.SetStateAction<boolean | undefined>) => {
      if (!groupCtx || !id) return;
      groupCtx.setExpandedId(next ? id : undefined);
      onChange?.(next);
    },
    [groupCtx, id, onChange],
  );

  const [isExpanded, setIsExpanded] = useControlled({
    controlledValue: isGroupControlled ? groupExpanded : controlledExpanded,
    defaultValue: defaultExpanded,
    onChange: isGroupControlled ? handleGroupChange : onChange,
    disabled,
  });

  const { contentRef, height, visible } = useCollapseAnimation({ isExpanded: isExpanded! });

  const summaryNode =
    typeof summary === 'string' ? (
      <Typography.Title
        as='h4'
        size={TypographyTextSize.Small}
      >
        {summary}
      </Typography.Title>
    ) : (
      summary
    );

  return (
    <div className={cx(styles.accordion, isExpanded && styles.expanded, disabled && styles.disabled, className)}>
      {/* Trigger */}
      <button
        id={headerId}
        type='button'
        aria-expanded={isExpanded}
        aria-controls={panelId}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={() => setIsExpanded((prev) => !prev)}
        className={styles.trigger}
      >
        <span className={styles.summary}>{summaryNode}</span>
        <span
          className={cx(styles.expandIcon, isExpanded && styles.expandIconOpen)}
          aria-hidden
        >
          {expandIcon ?? (
            <Icon
              name={IconName.ChevronDown}
              size={22}
              decorative
            />
          )}
        </span>
      </button>

      {/* Collapsible panel */}
      {visible && (
        <div
          id={panelId}
          role='region'
          aria-labelledby={headerId}
          className={styles.panel}
          style={{
            height: height === 'auto' ? 'auto' : `${height}px`,
            overflow: height === 'auto' ? 'visible' : 'hidden',
            transition: `height 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <div
            ref={contentRef}
            className={styles.content}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
