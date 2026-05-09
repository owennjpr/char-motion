import { EnterSortOptions, LetterState } from "@types";

type CocktailShakerSortOptions = Omit<EnterSortOptions, "algorithm">;

type ShakerItem = {
  letter: LetterState;
  value: number; // original index in the final (correct) ordering
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const cocktailShakerSort = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: CocktailShakerSortOptions
) => {
  const { rate = 40, startDelay = 0, direction = "ltr" } = options || {};

  await new Promise((r) => setTimeout(r, startDelay));

  // Randomize initial letter positions, but keep each letter's target character.
  let items: ShakerItem[] = shuffle(
    text.map((letter, i) => ({
      letter: { ...letter, char: letter.target, style: { ...letter.style } },
      value: i,
    }))
  );

  setText(items.map((x) => x.letter));

  const shouldSwap = (a: number, b: number) =>
    direction === "rtl" ? a < b : a > b; // rtl => big-to-small, ltr => small-to-big

  let start = 0;
  let end = items.length - 1;

  while (start < end) {
    let swapped = false;

    // left -> right pass
    for (let i = start; i < end; i++) {
      if (shouldSwap(items[i].value, items[i + 1].value)) {
        const next = [...items];
        [next[i], next[i + 1]] = [next[i + 1], next[i]];
        items = next;
        swapped = true;
      }

      setText(items.map((x) => x.letter));
      await new Promise((r) => setTimeout(r, rate));
    }

    if (!swapped) break;
    end--;
    swapped = false;

    // right -> left pass
    for (let i = end; i > start; i--) {
      if (shouldSwap(items[i - 1].value, items[i].value)) {
        const next = [...items];
        [next[i - 1], next[i]] = [next[i], next[i - 1]];
        items = next;
        swapped = true;
      }

      setText(items.map((x) => x.letter));
      await new Promise((r) => setTimeout(r, rate));
    }

    if (!swapped) break;
    start++;
  }

  // Ensure final state is exactly the sorted (correct) order.
  const final = [...items].sort((a, b) =>
    direction === "rtl" ? b.value - a.value : a.value - b.value
  );
  setText(final.map((x) => x.letter));
};
