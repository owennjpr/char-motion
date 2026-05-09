import { EnterSortOptions, LetterState } from "@types";

type QuickSortOptions = Omit<EnterSortOptions, "algorithm">;

type SortItem = {
  letter: LetterState;
  value: number;
};

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const quickSortSort = async (
  text: LetterState[],
  setText: (t: LetterState[]) => void,
  options?: QuickSortOptions
) => {
  const { rate = 40, startDelay = 0, direction = "ltr" } = options || {};

  await new Promise((r) => setTimeout(r, startDelay));

  let items: SortItem[] = shuffle(
    text.map((letter, i) => ({
      letter: { ...letter, char: letter.target, style: { ...letter.style } },
      value: i,
    }))
  );

  setText(items.map((x) => x.letter));

  const belongsLeftOfPivot = (v: number, pivotVal: number) =>
    direction === "ltr" ? v <= pivotVal : v >= pivotVal;

  async function swapIndices(i: number, j: number) {
    if (i === j) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    items = next;
    setText(items.map((x) => x.letter));
    await new Promise((r) => setTimeout(r, rate));
  }

  async function partition(low: number, high: number): Promise<number> {
    const pivotVal = items[high].value;
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (belongsLeftOfPivot(items[j].value, pivotVal)) {
        i++;
        await swapIndices(i, j);
      }
    }
    await swapIndices(i + 1, high);
    return i + 1;
  }

  async function quickSort(low: number, high: number) {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSort(low, pi - 1);
      await quickSort(pi + 1, high);
    }
  }

  if (items.length > 1) {
    await quickSort(0, items.length - 1);
  }

  const final = [...items].sort((a, b) =>
    direction === "rtl" ? b.value - a.value : a.value - b.value
  );
  setText(final.map((x) => x.letter));
};
