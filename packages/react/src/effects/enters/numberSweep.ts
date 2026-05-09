import {
  EnterNumberSweepOptions,
  LetterState,
  NumberSweepFn,
} from "@types";

export const numberSweep: NumberSweepFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: EnterNumberSweepOptions
) => {
  const {
    rate = 40,
    cyclesPerDigit = 5,
    characterPool = "0123456789",
    startDelay = 0,
    direction = "rtl",
  } = options || {};

  await new Promise((r) => setTimeout(r, startDelay));

  let remainingCycles = text.length * cyclesPerDigit;

  while (remainingCycles > 0) {
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
    remainingCycles--;
    await new Promise((r) => setTimeout(r, rate));
  }
};
