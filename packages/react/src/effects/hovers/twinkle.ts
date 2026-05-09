import {
  LetterState,
  TwinkleFn,
  HoverState,
  HoverTwinkleOptions,
} from "@types";

export const twinkle: TwinkleFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: HoverTwinkleOptions,
  hover?: () => HoverState
) => {
  const {
    rate = 100,
    characterPool = "*^",
    maxNum = 5,
    opacity = 1,
  } = options || {};
  const len = text.length;
  while (hover && hover().hover) {
    const count = Math.floor(Math.random() * maxNum);
    const ids = Array.from({ length: count }, () =>
      Math.floor(Math.random() * len)
    );

    const newText = text.map((letter, i) => ({
      ...letter,
      char: ids.includes(i)
        ? characterPool[Math.floor(Math.random() * characterPool.length)]
        : letter.target,
      style: { ...letter.style, opacity: ids.includes(i) ? opacity : 1 },
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
