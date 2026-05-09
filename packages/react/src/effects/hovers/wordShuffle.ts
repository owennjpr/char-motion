import {
  HoverShuffleOptions,
  HoverState,
  LetterState,
  WordShuffleFn,
} from "@types";

export const wordShuffle: WordShuffleFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: HoverShuffleOptions,
  hover?: () => HoverState
) => {
  const {
    rate = 40,
    characterPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    delimiter = " ",
  } = options || {};

  let block = 0;
  const textBlocks = [];
  for (let i = 0; i < text.length; i++) {
    const l = text[i];
    if (l.target == delimiter) {
      block += 1;
    }
    textBlocks.push({ ...l, block: block });
  }
  while (hover && hover().hover) {
    // Wait for index to be set when mouse enters a specific span
    if (hover().index === -1) {
      await new Promise((resolve) => setTimeout(resolve, rate));
      continue;
    }
    const targetBlock = textBlocks[hover().index].block;
    const newText = textBlocks.map((letter) => ({
      ...letter,
      char:
        letter.block == targetBlock && letter.target !== delimiter
          ? characterPool[Math.floor(Math.random() * characterPool.length)]
          : letter.target,
    }));
    setText(newText);
    await new Promise((resolve) => setTimeout(resolve, rate));
  }

  const resetText = text.map((letter) => ({
    ...letter,
    char: letter.target,
  }));
  setText([...resetText]);
};
