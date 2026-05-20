import type { Easing } from "./easings";
import { resolveInverseEasing } from "./easings";
import { sleep } from "./sleep";

export const DEFAULT_ENTER_RATE = 40;

function easedIntervalDelay(
  step: number,
  totalSteps: number,
  duration: number,
  inverse: (p: number) => number,
): number {
  const t0 = inverse(step / totalSteps);
  const t1 = inverse((step + 1) / totalSteps);
  return (t1 - t0) * duration;
}

export function computeStepDelays(
  stepCount: number,
  duration: number,
  easing?: Easing,
): number[] {
  if (stepCount <= 0) return [];

  const inverse = resolveInverseEasing(easing);
  const delays: number[] = [];
  for (let i = 0; i < stepCount; i++) {
    delays.push(easedIntervalDelay(i, stepCount, duration, inverse));
  }
  return delays;
}

export type EnterStepTimingOptions = {
  duration?: number;
  rate?: number;
  easing?: Easing;
};

export type EnterStepTiming =
  | { kind: "rate"; ms: number }
  | { kind: "duration"; delays: number[] };

export function resolveEnterStepTiming(
  stepCount: number,
  options: EnterStepTimingOptions | undefined,
  defaultRate = DEFAULT_ENTER_RATE,
): EnterStepTiming {
  const duration = options?.duration;
  if (duration !== undefined) {
    return {
      kind: "duration",
      delays: computeStepDelays(stepCount, duration, options?.easing),
    };
  }
  return { kind: "rate", ms: options?.rate ?? defaultRate };
}

export function stepDelay(timing: EnterStepTiming, index: number): number {
  return timing.kind === "rate" ? timing.ms : timing.delays[index];
}

/** @deprecated Prefer `resolveEnterStepTiming` — expands rate mode to a full array. */
export function resolveEnterStepDelays(
  stepCount: number,
  options: EnterStepTimingOptions | undefined,
  defaultRate = DEFAULT_ENTER_RATE,
): number[] {
  const timing = resolveEnterStepTiming(stepCount, options, defaultRate);
  if (timing.kind === "duration") return timing.delays;
  return Array.from({ length: stepCount }, () => timing.ms);
}

export type EnterStepWaiter = {
  wait: () => Promise<void>;
};

export function createEnterStepWaiter(
  options: EnterStepTimingOptions | undefined,
  estimateSteps: number,
  defaultRate = DEFAULT_ENTER_RATE,
): EnterStepWaiter {
  const duration = options?.duration;
  if (duration !== undefined) {
    return createAdaptiveScheduler({
      duration,
      easing: options?.easing,
      estimateSteps,
    });
  }

  const rate = options?.rate ?? defaultRate;
  return { wait: async () => sleep(rate) };
}

export type AdaptiveSchedulerOptions = {
  duration: number;
  easing?: Easing;
  estimateSteps: number;
};

export type AdaptiveScheduler = {
  wait: () => Promise<void>;
  readonly step: number;
  readonly estimate: number;
};

export function createAdaptiveScheduler(
  options: AdaptiveSchedulerOptions,
): AdaptiveScheduler {
  const { duration, estimateSteps } = options;
  const inverse = resolveInverseEasing(options.easing);

  let step = 0;
  let estimate = Math.max(1, estimateSteps);

  const scheduler: AdaptiveScheduler = {
    get step() {
      return step;
    },
    get estimate() {
      return estimate;
    },
    async wait() {
      if (step >= estimate) {
        estimate = step + 1;
      }

      const delay = easedIntervalDelay(step, estimate, duration, inverse);
      step += 1;
      await sleep(Math.max(0, delay));
    },
  };

  return scheduler;
}

export function previewAdaptiveDelay(
  step: number,
  estimate: number,
  duration: number,
  easing?: Easing,
): number {
  const safeEstimate = Math.max(1, step >= estimate ? step + 1 : estimate);
  const inverse = resolveInverseEasing(easing);
  return Math.max(
    0,
    easedIntervalDelay(step, safeEstimate, duration, inverse),
  );
}
