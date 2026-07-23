import React from 'react';

export type AccordionGroupProps = {
  children: React.ReactNode;
  exclusive?: boolean;
  defaultExpandedId?: string;
  expandedId?: string;
  onExpandedIdChange?: (id: React.SetStateAction<string | undefined>) => void;
  className?: string;
};

export type AccordionGroupContextValue = {
  expandedId: string | undefined;
  setExpandedId: React.Dispatch<React.SetStateAction<string | undefined>>;
  exclusive: boolean;
} | null;
