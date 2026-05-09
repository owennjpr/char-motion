import { numberSweep } from "./effects/enters/numberSweep";
import { cocktailShaker } from "./effects/enters/cocktailShaker";
import { randomized } from "./effects/enters/randomized";
import { typedSweep } from "./effects/enters/typedSweep";
import {
  CocktailShakerFn,
  NumberSweepFn,
  RandomizedFn,
  TypedSweepFn,
} from "./types";

type EnterEffectMap = {
  "typed sweep": TypedSweepFn;
  "number sweep": NumberSweepFn;
  randomized: RandomizedFn;
  "cocktail shaker": CocktailShakerFn;
};
export const enterEffects: EnterEffectMap = {
  "typed sweep": typedSweep,
  "number sweep": numberSweep,
  randomized: randomized,
  "cocktail shaker": cocktailShaker,
};
