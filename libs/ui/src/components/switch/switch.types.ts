export enum SwitchSize {
    Small = 'small',
    Default = 'default'
}

export enum SwitchVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Accent = 'accent',
    Success = 'success',
    Warning = 'warning',
    Info = 'info',
    Error = 'error'
}

export enum SwitchLabelPlacement {
    Top = 'top',
    Bottom = 'bottom',
    Start = 'start',
    End = 'end'
}

export type SwitchProps = {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (value: React.SetStateAction<boolean | undefined>) => void;
    size?: SwitchSize;
    variant?: SwitchVariant;
    label?: string;
    labelPlacement?: SwitchLabelPlacement;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}