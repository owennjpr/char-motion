import { numberSweep } from "./effects/enters/numberSweep";
import { randomized } from "./effects/enters/randomized";
import { sort } from "./effects/enters/sort";
import { typedSweep } from "./effects/enters/typedSweep";
import {
  NumberSweepFn,
  RandomizedFn,
  SortFn,
  TypedSweepFn,
} from "@types";

type EnterEffectMap = {
  "typed sweep": TypedSweepFn;
  "number sweep": NumberSweepFn;
  randomized: RandomizedFn;
  sort: SortFn;
};
export const enterEffects: EnterEffectMap = {
  "typed sweep": typedSweep,
  "number sweep": numberSweep,
  randomized: randomized,
  sort,
};
