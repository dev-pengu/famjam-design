
export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export const roundToPrecision = (value: number, precision: number) => Math.round(value / precision) * precision;

export const roundToStep = (value: number, step: number, min: number) => Math.round((value - min) / step) * step + min;

export const toPercent = (value: number, min: number, max: number) => ((value - min) / (max - min)) * 100;