import {
  HoverState,
  LetterState,
  MorphRetypeOptions,
  RetypeFn,
} from "@types";

const getCommonPrefixLen = (s1: string, s2: string) => {
  const minL = Math.min(s1.length, s2.length);
  let i = 0;
  while (i < minL && s1[i] === s2[i]) {
    i++;
  }

  return i;
};

export const retype: RetypeFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: MorphRetypeOptions,
  hover?: () => HoverState,
  prevText?: LetterState[]
) => {
  const {
    deleteRate = 40,
    typeRate = 40,
    cursor = "_",
    keepCommonStart = true,
  } = options || {};

  if (!prevText) return;

  const targetString = text.map((l) => l.target).join("");
  const prevTargetString = prevText.map((l) => l.target).join("");

  if (prevTargetString === targetString) return;

  const commonPrefix = keepCommonStart
    ? getCommonPrefixLen(targetString, prevTargetString)
    : 0;

  // delete
  const toDelete = prevText.map((l) => ({ ...l }));
  setText([...toDelete]);

  let deleteIndex = toDelete.length - 1;
  while (deleteIndex >= commonPrefix) {
    toDelete[deleteIndex] = {
      ...toDelete[deleteIndex],
      char: cursor,
    };
    setText([...toDelete]);
    await new Promise((r) => setTimeout(r, deleteRate));

    toDelete[deleteIndex] = {
      ...toDelete[deleteIndex],
      char: "",
    };

    setText([...toDelete]);
    deleteIndex--;
  }

  // retype
  const toType = text.map((l, i) => ({
    ...l,
    char: i < commonPrefix ? l.target : "",
  }));

  setText([...toType]);

  for (let i = commonPrefix; i < toType.length; i++) {
    if (i > 0) {
      toType[i - 1] = {
        ...toType[i - 1],
        char: toType[i - 1].target,
      };
    }

    toType[i] = { ...toType[i], char: cursor };
    setText([...toType]);

    await new Promise((r) => setTimeout(r, typeRate));
  }

  // fix last character
  if (toType.length > 0) {
    toType[toType.length - 1] = {
      ...toType[toType.length - 1],
      char: toType[toType.length - 1].target,
    };
    setText([...toType]);
  }
};
