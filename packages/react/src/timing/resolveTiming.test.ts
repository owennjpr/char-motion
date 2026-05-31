import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  DEFAULT_RANDOMIZED_BUDGET,
  resolveRandomizedBudget,
  usesDurationTiming,
} from "./resolveTiming";

describe("usesDurationTiming", () => {
  it("is true only when duration is set", () => {
    assert.strictEqual(usesDurationTiming(undefined), false);
    assert.strictEqual(usesDurationTiming(500), true);
  });
});

describe("resolveRandomizedBudget", () => {
  it("uses duration and passes easing through", () => {
    assert.deepStrictEqual(
      resolveRandomizedBudget({ duration: 800, easing: "easeOut" }),
      { budget: 800, easing: "easeOut" },
    );
  });

  it("uses maxDelay without easing", () => {
    assert.deepStrictEqual(resolveRandomizedBudget({ maxDelay: 750 }), {
      budget: 750,
      easing: undefined,
    });
  });

  it("defaults budget when no timing options", () => {
    assert.deepStrictEqual(resolveRandomizedBudget(), {
      budget: DEFAULT_RANDOMIZED_BUDGET,
      easing: undefined,
    });
  });
});
