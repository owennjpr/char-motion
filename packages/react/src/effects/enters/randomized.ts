import { EnterRandomizedOptions, LetterState, RandomizedFn } from "@types";
import { resolveInverseEasing, resolveRandomizedBudget, sleep } from "@timing";

export const randomized: RandomizedFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: EnterRandomizedOptions,
) => {
  const { characterPool = "-._-", startDelay = 0 } = options || {};

  const { budget, easing } = resolveRandomizedBudget(options);
  const halfBudget = budget / 2;
  const inverse = resolveInverseEasing(easing);
  const randomPhaseDelay = () => inverse(Math.random()) * halfBudget;

  await sleep(startDelay);

  const pool = characterPool.split("");

  await Promise.all(
    text.map(async (_, i) => {
      text[i] = { ...text[i], char: "" };
      setText([...text]);
      await sleep(randomPhaseDelay());

      text[i] = {
        ...text[i],
        char: pool[Math.floor(Math.random() * pool.length)],
        style: { opacity: 0.4 },
      };
      setText([...text]);
      await sleep(randomPhaseDelay());

      text[i] = { ...text[i], char: text[i].target, style: { opacity: 1 } };
      setText([...text]);
    }),
  );
};
