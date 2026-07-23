export type CardMediaProps = {
  src?: string;
  alt?: string;
  height?: number | string;
  component?: 'img' | 'video' | 'iframe';
  children?: React.ReactNode; // for non-img media
  className?: string;
} & React.HTMLAttributes<HTMLElement>;
