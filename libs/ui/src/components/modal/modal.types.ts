export enum ModalSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  FullScreen = 'fullScreen',
}

export enum ModalSlideFrom {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  Center = 'center', // scales in from center rather than sliding
}

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  slideFrom?: ModalSlideFrom;
  isAlert?: boolean;
  closeable?: boolean;
  ariaLabel?: string;       // required if no ModalTitle is present
  ariaDescribedBy?: string;
  fadeDuration?: number;
  children?: React.ReactNode;
  className?: string;
};

export type ModalTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export type ModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export type ModalContentTextProps = {
  children: React.ReactNode;
  className?: string;
};

export type ModalActionsProps = {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'space-between';
  className?: string;
};