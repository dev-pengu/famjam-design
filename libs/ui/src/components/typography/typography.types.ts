import { CSSProperties, ReactNode } from "react";
import { TextStyle } from "react-native";

export enum TypographyTextSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large'
}

export const TypographySize = TypographyTextSize;
export type TypographySize = TypographyTextSize;

export enum TypographyScale {
    Display = 'display',
    Headline = 'headline',
    Title = 'title',
    Body = 'body'
}

export enum HeadingTag {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6'
}

export type TypographyBaseProps = {
    children: ReactNode;
    size?: TypographySize;
    bold?: boolean;
    muted?: boolean;
    className?: string;
    style?: CSSProperties | TextStyle | undefined;
}

export type TypographyDisplayProps = TypographyBaseProps;

export type TypographyHeadlineProps = TypographyBaseProps;

export type TypographyTitleProps = TypographyBaseProps;

export type TypographyBodyProps = TypographyBaseProps;

export type TypographyProps = TypographyBodyProps;