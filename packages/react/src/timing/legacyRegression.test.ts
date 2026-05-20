import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { resolveEnterStepDelays, resolveEnterStepTiming } from "./schedule";
import { resolveRandomizedBudget } from "./resolveTiming";
import { assertClose } from "./testUtils";

/**
 * Golden-path fixtures mirroring pre-refactor enter effects that only use
 * legacy timing options (rate / maxDelay / startDelay).
 */

const expectConstantDelays = (delays: number[], expectedPerStep: number) => {
  assert.ok(delays.length > 0);
  for (const d of delays) {
    assertClose(d, expectedPerStep);
  }
};

/** Simulates startDelay running before the animated body (not folded into duration). */
async function simulateStartDelayThenSteps(
  startDelay: number,
  stepDelays: number[],
): Promise<{ elapsedBeforeFirstStep: number; totalElapsed: number }> {
  let elapsed = 0;

  await new Promise<void>((resolve) => {
    const start = performance.now();
    setTimeout(() => {
      elapsed = performance.now() - start;
      resolve();
    }, startDelay);
  });

  const elapsedBeforeFirstStep = elapsed;

  for (const delay of stepDelays) {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, delay);
    });
    elapsed += delay;
  }

  return { elapsedBeforeFirstStep, totalElapsed: elapsed };
}

describe("legacy regression: typed sweep", () => {
  const fixtures = [
    { textLength: 1, rate: 40 },
    { textLength: 5, rate: 40 },
    { textLength: 12, rate: 50 },
    { textLength: 8, rate: 40, startDelay: 150 },
  ] as const;

  for (const fixture of fixtures) {
    const { textLength, rate } = fixture;
    const startDelay = "startDelay" in fixture ? fixture.startDelay : undefined;
    const label = `rate=${rate}, length=${textLength}${
      startDelay !== undefined ? `, startDelay=${startDelay}` : ""
    }`;

    it(label, async () => {
      const stepCount = textLength;
      const delays = resolveEnterStepDelays(stepCount, { rate }, 40);

      expectConstantDelays(delays, rate);

      if (startDelay !== undefined) {
        const { elapsedBeforeFirstStep, totalElapsed } =
          await simulateStartDelayThenSteps(startDelay, delays);
        assert.ok(elapsedBeforeFirstStep >= startDelay - 5);
        assert.ok(totalElapsed >= startDelay + stepCount * rate - 5);
      }
    });
  }
});

describe("legacy regression: number sweep", () => {
  it("uses stepCount = textLength × cyclesPerDigit with constant rate", () => {
    const textLength = 4;
    const cyclesPerDigit = 5;
    const rate = 40;
    const stepCount = textLength * cyclesPerDigit;

    const delays = resolveEnterStepDelays(stepCount, { rate }, 40);

    expectConstantDelays(delays, rate);
  });
});

describe("legacy regression: randomized", () => {
  it("maxDelay maps to budget without easing", () => {
    const { budget, easing } = resolveRandomizedBudget({ maxDelay: 1000 });
    assert.strictEqual(budget, 1000);
    assert.strictEqual(easing, undefined);
  });
});

describe("legacy regression: sort (rate mode)", () => {
  it("rate mode uses fixed per-step delay", () => {
    const rate = 40;
    const timing = resolveEnterStepTiming(1, { rate });
    assert.strictEqual(timing.kind, "rate");
    if (timing.kind === "rate") assert.strictEqual(timing.ms, rate);
  });
});

describe("timing modes", () => {
  it("duration mode ignores rate and applies easing", () => {
    const rateDelays = resolveEnterStepDelays(10, { rate: 40, easing: "easeOut" }, 40);
    const durationDelays = resolveEnterStepDelays(
      10,
      { duration: 300, rate: 40, easing: "easeOut" },
      40,
    );

    expectConstantDelays(rateDelays, 40);
    assert.ok(durationDelays[0] < durationDelays[9]);
  });

  it("rate mode avoids allocating a delay array", () => {
    const timing = resolveEnterStepTiming(500, { rate: 40 });
    assert.deepStrictEqual(timing, { kind: "rate", ms: 40 });
  });

  it("duration wins over rate when both are set", () => {
    const delays = resolveEnterStepDelays(10, { duration: 300, rate: 40 }, 40);

    assertClose(
      delays.reduce((a, b) => a + b, 0),
      300,
    );
    expectConstantDelays(delays, 30);
  });
});
