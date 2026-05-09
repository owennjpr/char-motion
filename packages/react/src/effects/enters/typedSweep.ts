import { EnterTypedSweepOptions, LetterState, TypedSweepFn } from "@types";

export const typedSweep: TypedSweepFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: EnterTypedSweepOptions
) => {
  const {
    rate = 40,
    cursor = "_",
    startDelay = 0,
    direction = "ltr",
  } = options || {};

  await new Promise((r) => setTimeout(r, startDelay));

  // set initial empty state
  const updated = text.map((l) => ({ ...l, char: "" }));
  setText([...updated]);

  for (let i = 0; i < text.length; i++) {
    if (i > 0) {
      // prev char --> target
      const idx = direction == "ltr" ? i - 1 : text.length - i;
      updated[idx] = {
        ...updated[idx],
        char: updated[idx].target,
      };
    }

    const cursorIdx = direction == "ltr" ? i : text.length - i - 1;
    if (cursorIdx >= 0)
      updated[cursorIdx] = { ...updated[cursorIdx], char: cursor };

    setText([...updated]);
    await new Promise((r) => setTimeout(r, rate));
  }

  // handle last character
  if (updated.length > 0) {
    const lastIdx = direction == "ltr" ? text.length - 1 : 0;
    updated[lastIdx] = {
      ...updated[lastIdx],
      char: updated[lastIdx].target,
    };
    setText([...updated]);
  }
};
