// Enter Option Types
export type EnterRandomizedOptions = {
  maxDelay?: number;
  characterPool?: string;
  startDelay?: number;
};

export type EnterTypedSweepOptions = {
  rate?: number;
  cursor?: string;
  startDelay?: number;
  direction?: "rtl" | "ltr";
};

export type EnterNumberSweepOptions = {
  rate?: number;
  cyclesPerDigit?: number;
  characterPool?: string;
  startDelay?: number;
  direction?: "rtl" | "ltr";
};

export type EnterCocktailShakerOptions = {
  rate?: number;
  startDelay?: number;
  direction?: "rtl" | "ltr";
};

// Hover Option Types
export type HoverTypedSweepOptions = {
  rate?: number;
  cursor?: string;
  idle?: boolean;
  idleRate?: number;
};

export type HoverShuffleOptions = {
  rate?: number;
  characterPool?: string;
  delimiter?: string;
};

export type HoverTwinkleOptions = {
  rate?: number;
  characterPool?: string;
  maxNum?: number;
  opacity?: number;
};

export type HoverCaseOptions = {
  type?: "upper" | "lower";
  extraMappings?: { [key: string]: string };
};

// Morph Option Types
export type MorphRetypeOptions = {
  deleteRate?: number;
  typeRate?: number;
  cursor?: string;
  keepCommonStart?: boolean;
};

export type Enter =
  | {
      type: "randomized";
      options?: EnterRandomizedOptions;
    }
  | {
      type: "typed sweep";
      options?: EnterTypedSweepOptions;
    }
  | {
      type: "number sweep";
      options?: EnterNumberSweepOptions;
    }
  | {
      type: "cocktail shaker";
      options?: EnterCocktailShakerOptions;
    };

export type Hover =
  | {
      type: "typed sweep";
      options?: HoverTypedSweepOptions;
    }
  | {
      type: "shuffle";
      options?: HoverShuffleOptions;
    }
  | {
      type: "twinkle";
      options?: HoverTwinkleOptions;
    }
  | {
      type: "case";
      options?: HoverCaseOptions;
    };

export type Morph = {
  type: "retype";
  options?: MorphRetypeOptions;
};

// internal state for characters
export type LetterState = {
  char: string; // current display character
  target: string; // final character (based on passed children)
  className?: string;
  style?: React.CSSProperties;
};

// internal state for hover
export type HoverState = {
  hover: boolean;
  index: number; // for effects that care about which letters are hovered
};

// generic effect type
export type EffectFn<T extends object> = (
  text: LetterState[],
  setText: (l: LetterState[]) => void,
  options?: T,
  hover?: () => HoverState,
  prevText?: LetterState[],
) => Promise<void>;

// Enter Functions
export type RandomizedFn = EffectFn<EnterRandomizedOptions>;
export type TypedSweepFn = EffectFn<EnterTypedSweepOptions>;
export type NumberSweepFn = EffectFn<EnterNumberSweepOptions>;
export type CocktailShakerFn = EffectFn<EnterCocktailShakerOptions>;

// Hover Functions
export type CursorSweepFn = EffectFn<HoverTypedSweepOptions>;
export type WordShuffleFn = EffectFn<HoverShuffleOptions>;
export type TwinkleFn = EffectFn<HoverTwinkleOptions>;
export type CaseFn = EffectFn<HoverCaseOptions>;

// Morph Functions
export type RetypeFn = EffectFn<MorphRetypeOptions>;
