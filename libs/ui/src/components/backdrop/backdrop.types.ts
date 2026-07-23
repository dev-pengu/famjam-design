export type BackdropProps = {
  children?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  fadeDuration?: number; // ms
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
