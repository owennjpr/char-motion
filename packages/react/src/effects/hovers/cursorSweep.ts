import {
  CursorSweepFn,
  LetterState,
  HoverState,
  HoverTypedSweepOptions,
} from "@types";

export const cursorSweep: CursorSweepFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: HoverTypedSweepOptions,
  hover?: () => HoverState
) => {
  // Reset to original state when hover is false
  if (!hover || !hover().hover) {
    const resetText = text.map((letter) => ({
      ...letter,
      char: letter.target,
    }));
    setText([...resetText]);
    return;
  }

  const {
    rate = 30,
    cursor = "_",
    idle = true,
    idleRate = 300,
  } = options || {};

  let sweepIndex = 0;
  let flicker = false;
  let flickerState = false;

  const updateText = () => {
    const updated = text.map((letter, index) => {
      if (index < sweepIndex) {
        return { ...letter, char: letter.target };
      } else if (index === sweepIndex && !flicker) {
        return { ...letter, char: cursor };
      } else if (index === sweepIndex && flicker) {
        return { ...letter, char: flickerState ? cursor : " " };
      } else {
        return { ...letter, char: letter.target };
      }
    });

    // add extra cursor elem
    if (sweepIndex >= text.length && flicker) {
      updated.push({
        char: flickerState ? cursor : " ",
        target: "",
      });
    }

    setText([...updated]);
  };

  updateText();

  // sweep phase
  while (sweepIndex < text.length && hover().hover) {
    await new Promise((resolve) => setTimeout(resolve, rate));
    sweepIndex++;
    updateText();
  }

  // transition to flicker phase (if idle selected)
  if (sweepIndex >= text.length && idle && hover().hover) {
    flicker = true;

    // flicker phase
    while (hover().hover) {
      await new Promise((resolve) => setTimeout(resolve, idleRate));
      flickerState = !flickerState;
      updateText();
    }
  }
};
