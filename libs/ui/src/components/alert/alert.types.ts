import { Color } from '@famjam/tokens/base.styles';

export enum AlertVariant {
    Default = 'default',
    Filled = 'filled',
    Outline = 'outline'
}

export enum AlertSeverity {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
}

export type AlertProps = {
    icon?: React.ReactNode | false;
    severity: AlertSeverity
    children: React.ReactNode;
    title?: string;
    variant?: AlertVariant;
    color?: Color | `var(--${string})`;
    bgColor?: Color | `var(--${string})`;
    onClose?: () => void;
    action?: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;