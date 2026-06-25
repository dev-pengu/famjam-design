import { InputState } from "./input-base";

export enum InputVariant {
    Text = 'text',
    Password = 'password',
    TextArea = 'textarea'
}

export enum LabelVariant {
    Primary = 'primary',
    Float = 'float'
}

export interface InputProps {
    label?: string;
    labelVariant?: LabelVariant;
    variant?: InputVariant;
    helperMessage?: string;
    state?: InputState;
    showCharacterCount?: boolean;
    testID?: string;
    required?: boolean;
}