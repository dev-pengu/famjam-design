export type TooltipAlignment = 'start' | 'center' | 'end';

export type TooltipPosition = {
  horizontal: TooltipAlignment;
  vertical: TooltipAlignment;
};

export type TooltipProps = {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
  content: React.ReactNode;
  position?: TooltipPosition;
  showArrow?: boolean;
  delay?: number;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  describeChild?: boolean;
  className?: string;
};
