export interface Timer {
  currentId: ReturnType<typeof setTimeout> | null;
  start: (delay: number, fn: Function) => void;
  clear: () => void;
  disposeEffect: React.EffectCallback;
}
