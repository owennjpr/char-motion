export type EasingName = "linear" | "easeIn" | "easeOut" | "easeInOut";

export type Easing = EasingName | ((t: number) => number);

export type EasingFn = (t: number) => number;

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export const linear: EasingFn = (t) => clamp01(t);

export const easeIn: EasingFn = (t) => {
  const x = clamp01(t);
  return x * x;
};

export const easeOut: EasingFn = (t) => {
  const x = clamp01(t);
  return 1 - (1 - x) * (1 - x);
};

export const easeInOut: EasingFn = (t) => {
  const x = clamp01(t);
  if (x < 0.5) return 2 * x * x;
  return 1 - Math.pow(-2 * x + 2, 2) / 2;
};

const namedEasings: Record<EasingName, EasingFn> = {
  linear,
  easeIn,
  easeOut,
  easeInOut,
};

/** Inverse of linear progress curve: maps animation progress → normalized time. */
export const linearInverse: EasingFn = linear;

export const easeInInverse: EasingFn = (p) => Math.sqrt(clamp01(p));

export const easeOutInverse: EasingFn = (p) => {
  const x = clamp01(p);
  return 1 - Math.sqrt(1 - x);
};

export const easeInOutInverse: EasingFn = (p) => {
  const x = clamp01(p);
  if (x < 0.5) return Math.sqrt(x / 2);
  return 1 - Math.sqrt((1 - x) / 2);
};

const namedInverseEasings: Record<EasingName, EasingFn> = {
  linear,
  easeIn: easeInInverse,
  easeOut: easeOutInverse,
  easeInOut: easeInOutInverse,
};

/** Binary-search inverse for custom easing functions. */
function createNumericalInverse(forward: EasingFn): EasingFn {
  return (p: number) => {
    const target = clamp01(p);
    if (target <= 0) return 0;
    if (target >= 1) return 1;

    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 32; i++) {
      const mid = (lo + hi) / 2;
      if (forward(mid) < target) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  };
}

/** Resolve optional easing to a function on t ∈ [0, 1]. Default: linear. */
export function resolveEasing(easing?: Easing): EasingFn {
  if (easing === undefined) return linear;
  if (typeof easing === "function") return (t) => easing(clamp01(t));
  return namedEasings[easing];
}

/**
 * Inverse easing: maps animation progress ∈ [0, 1] to normalized time.
 * Used to derive per-step delays from a progress curve.
 */
export function resolveInverseEasing(easing?: Easing): EasingFn {
  if (easing === undefined) return linearInverse;
  if (typeof easing === "function") {
    return createNumericalInverse(resolveEasing(easing));
  }
  return namedInverseEasings[easing];
}
