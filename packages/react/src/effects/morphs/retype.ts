import {
  HoverState,
  LetterState,
  MorphRetypeOptions,
  RetypeFn,
} from "@types";
import { resolveStepTiming, sleep, stepDelay } from "@timing";

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
    startDelay = 0,
  } = options || {};

  if (!prevText) return;

  const targetString = text.map((l) => l.target).join("");
  const prevTargetString = prevText.map((l) => l.target).join("");

  if (prevTargetString === targetString) return;

  const commonPrefix = keepCommonStart
    ? getCommonPrefixLen(targetString, prevTargetString)
    : 0;

  const deleteStepCount = prevText.length - commonPrefix;
  const typeStepCount = text.length - commonPrefix;
  const totalSteps = deleteStepCount + typeStepCount;
  const usesDuration = options?.duration !== undefined;

  const timing = usesDuration
    ? resolveStepTiming(totalSteps, {
        duration: options?.duration,
        easing: options?.easing,
      })
    : undefined;
  const deleteTiming = !usesDuration
    ? resolveStepTiming(deleteStepCount, { rate: deleteRate })
    : undefined;
  const typeTiming = !usesDuration
    ? resolveStepTiming(typeStepCount, { rate: typeRate })
    : undefined;

  await sleep(startDelay);

  // delete
  const toDelete = prevText.map((l) => ({ ...l }));
  setText([...toDelete]);

  let step = 0;
  let deleteStep = 0;
  let deleteIndex = toDelete.length - 1;
  while (deleteIndex >= commonPrefix) {
    toDelete[deleteIndex] = {
      ...toDelete[deleteIndex],
      char: cursor,
    };
    setText([...toDelete]);
    await sleep(
      usesDuration
        ? stepDelay(timing!, step++)
        : stepDelay(deleteTiming!, deleteStep++),
    );

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

  let typeStep = 0;
  for (let i = commonPrefix; i < toType.length; i++) {
    if (i > 0) {
      toType[i - 1] = {
        ...toType[i - 1],
        char: toType[i - 1].target,
      };
    }

    toType[i] = { ...toType[i], char: cursor };
    setText([...toType]);

    await sleep(
      usesDuration
        ? stepDelay(timing!, step++)
        : stepDelay(typeTiming!, typeStep++),
    );
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
