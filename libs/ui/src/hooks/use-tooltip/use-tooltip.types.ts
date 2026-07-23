import { TooltipPosition } from "../../components/tooltip/tooltip.types";

export type TooltipCoords = {
  top: number;
  left: number;
} | null;

export type ArrowCoords = {
  top?: number;
  left?: number;
  transform?: string;
} | null;

export type ResolvedPosition = {
  position: TooltipPosition;
  coords: TooltipCoords;
  arrowCoords: ArrowCoords;
  arrowSide: 'top' | 'bottom' | 'left' | 'right';
};