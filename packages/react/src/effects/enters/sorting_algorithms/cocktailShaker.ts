import { EnterSortOptions, LetterState } from "@types";
import { createEnterStepWaiter, DEFAULT_ENTER_RATE, sleep } from "@timing";
import { shuffle } from "../shuffle";

type CocktailShakerSortOptions = Omit<EnterSortOptions, "algorithm">;

type ShakerItem = {
  letter: LetterState;
  value: number;
};

export const cocktailShakerSort = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: CocktailShakerSortOptions,
) => {
  const { startDelay = 0, direction = "ltr" } = options || {};
  const n = text.length;
  const scheduler = createEnterStepWaiter(options, n * n, DEFAULT_ENTER_RATE);

  await sleep(startDelay);

  // Randomize initial letter positions, but keep each letter's target character.
  let items: ShakerItem[] = shuffle(
    text.map((letter, i) => ({
      letter: { ...letter, char: letter.target, style: { ...letter.style } },
      value: i,
    })),
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
      await scheduler.wait();
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
      await scheduler.wait();
    }

    if (!swapped) break;
    start++;
  }

  // Ensure final state is exactly the sorted (correct) order.
  const final = [...items].sort((a, b) =>
    direction === "rtl" ? b.value - a.value : a.value - b.value,
  );
  setText(final.map((x) => x.letter));
};
