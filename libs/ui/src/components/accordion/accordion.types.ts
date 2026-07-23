import React from 'react';

export type AccordianSummary = string | React.ReactElement;

export type AccordionProps = {
  summary: AccordianSummary;
  children: React.ReactNode;
  expanded?: boolean;
  onChange?: (value: React.SetStateAction<boolean | undefined>) => void;
  defaultExpanded?: boolean;
  expandIcon?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
};
