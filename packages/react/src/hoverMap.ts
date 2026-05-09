import { caseChange } from "./effects/hovers/caseChange";
import { cursorSweep } from "./effects/hovers/cursorSweep";
import { twinkle } from "./effects/hovers/twinkle";
import { wordShuffle } from "./effects/hovers/wordShuffle";
import { CursorSweepFn, WordShuffleFn, TwinkleFn, CaseFn } from "@types";

type HoverEffectMap = {
  "typed sweep": CursorSweepFn;
  shuffle: WordShuffleFn;
  twinkle: TwinkleFn;
  case: CaseFn;
};
export const hoverEffects: HoverEffectMap = {
  "typed sweep": cursorSweep,
  shuffle: wordShuffle,
  twinkle: twinkle,
  case: caseChange,
};
