import { cocktailShakerSort } from "./sorting_algorithms/cocktailShaker";
import { quickSortSort } from "./sorting_algorithms/quickSort";
import { LetterState, SortFn } from "@types";

export const sort: SortFn = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?,
) => {
  const algorithm = options?.algorithm ?? "cocktail shaker";
  switch (algorithm) {
    case "cocktail shaker":
      await cocktailShakerSort(text, setText, options);
      break;
    case "quick sort":
      await quickSortSort(text, setText, options);
      break;
    default: {
      const _never: never = algorithm;
      return _never;
    }
  }
};
