import { EnterNumberSweepOptions, LetterState, NumberSweepFn } from "@types";
import { resolveEnterStepTiming, sleep, stepDelay } from "@timing";

export const numberSweep: NumberSweepFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: EnterNumberSweepOptions,
) => {
  const {
    cyclesPerDigit = 5,
    characterPool = "0123456789",
    startDelay = 0,
    direction = "rtl",
  } = options || {};

  const stepCount = text.length * cyclesPerDigit;
  const timing = resolveEnterStepTiming(stepCount, options);

  await sleep(startDelay);

  for (let step = 0; step < stepCount; step++) {
    const remainingCycles = stepCount - step;
    const index = Math.floor(remainingCycles / Math.max(cyclesPerDigit, 1));

    for (let i = 0; i < text.length; i++) {
      let shouldScramble = false;

      if (direction === "rtl") {
        shouldScramble = i < index;
      } else if (direction === "ltr") {
        shouldScramble = i >= text.length - index;
      }

      text[i].char = shouldScramble
        ? characterPool[Math.floor(Math.random() * characterPool.length)]
        : text[i].target;
    }

    setText([...text]);
    await sleep(stepDelay(timing, step));
  }
};
