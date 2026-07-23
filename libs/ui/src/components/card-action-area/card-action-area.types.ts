type CardActionAreaBase = {
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
};

type CardActionAreaAsButton = CardActionAreaBase & {
  href?: never;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CardActionAreaBase>;

type CardActionAreaAsAnchor = CardActionAreaBase & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CardActionAreaBase>;

export type CardActionAreaProps = CardActionAreaAsButton | CardActionAreaAsAnchor;
