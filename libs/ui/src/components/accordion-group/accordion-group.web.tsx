import {
  useId,
  useMemo,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import { useTheme } from '../theme-provider/theme-context';
import { cx } from '../../utils/cx';
import { AccordionGroupContextValue, AccordionGroupProps } from './accordion-group.types';
import { AccordionGroupContext } from './accordion-group-context';
import { useControlled } from '../../hooks';
import { AccordionProps } from '../accordion/accordion.types';
import styles from './accordion-group.web.module.css';

export const AccordionGroup = ({
  children,
  exclusive = false,
  defaultExpandedId,
  expandedId: controlledExpandedId,
  onExpandedIdChange,
  className,
}: Readonly<AccordionGroupProps>) => {
  useTheme();

  const [expandedId, setExpandedId] = useControlled<string>({
    controlledValue: controlledExpandedId,
    defaultValue: defaultExpandedId,
    onChange: onExpandedIdChange,
  });

  const ctx: AccordionGroupContextValue = useMemo(() => ({ expandedId, setExpandedId, exclusive }), [expandedId, setExpandedId, exclusive]);

  const accordionId = useId();
  const childrenWithIds = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;
    return cloneElement(
        child as React.ReactElement<AccordionProps>,
        {id: `${accordionId}-${index}`}
    )
  })

  return (
    <AccordionGroupContext.Provider value={ctx}>
        <div className={cx(styles.group, className)}>
            {childrenWithIds}
        </div>
    </AccordionGroupContext.Provider>
  )
};
