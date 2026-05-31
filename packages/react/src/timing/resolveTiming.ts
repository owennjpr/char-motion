import type { Easing } from "./easings";

export const DEFAULT_RANDOMIZED_BUDGET = 1000;

export function usesDurationTiming(duration?: number): boolean {
  return duration !== undefined;
}

export function resolveRandomizedBudget(options?: {
  duration?: number;
  maxDelay?: number;
  easing?: Easing;
}): { budget: number; easing?: Easing } {
  const budget =
    options?.duration ?? options?.maxDelay ?? DEFAULT_RANDOMIZED_BUDGET;
  const easing = usesDurationTiming(options?.duration)
    ? options?.easing
    : undefined;
  return { budget, easing };
}
