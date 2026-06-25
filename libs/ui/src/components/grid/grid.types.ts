import type { ReactNode } from 'react';

export type GridBreakpointValues = {
    columns: number;
    gutter: number;
    margin: number;
    gap: number;
    width?: number;
}

export type GridProps = {
    children: ReactNode;
    mobileMargin?: 16 | 24;
    testID?: string;
    className?: string;
}

export type GridRowProps = {
    children: ReactNode;
    testID?: string;
    className?: string;
}

export type GridColumnProps = {
    children: ReactNode;
    span?: number;
    offset?: number;
    testID?: string;
    className?: string;
}