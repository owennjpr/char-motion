import { EnterRandomizedOptions, LetterState, RandomizedFn } from "@types";

export const randomized: RandomizedFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: EnterRandomizedOptions
) => {
  const {
    maxDelay = 1000,
    characterPool = "-._-",
    startDelay = 0,
  } = options || {};

  await new Promise((r) => setTimeout(r, startDelay));

  const pool = characterPool.split("");

  await Promise.all(
    text.map(async (_, i) => {
      // if (!active()) return;

      text[i] = { ...text[i], char: "" };
      setText([...text]);
      await new Promise((r) => setTimeout(r, Math.random() * (maxDelay / 2)));
      // if (!active()) return;

      text[i] = {
        ...text[i],
        char: pool[Math.floor(Math.random() * pool.length)],
        style: { opacity: 0.4 },
      };
      setText([...text]);
      await new Promise((r) => setTimeout(r, Math.random() * (maxDelay / 2)));
      // if (!active()) return;

      text[i] = { ...text[i], char: text[i].target, style: { opacity: 1 } };
      setText([...text]);
    })
  );
};
