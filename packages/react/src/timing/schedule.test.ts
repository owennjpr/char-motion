import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeStepDelays,
  createAdaptiveScheduler,
  previewAdaptiveDelay,
  resolveEnterStepDelays,
  resolveEnterStepTiming,
} from "./schedule";
import { assertClose } from "./testUtils";

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

describe("computeStepDelays", () => {
  it("returns empty array for zero steps", () => {
    assert.deepStrictEqual(computeStepDelays(0, 100, "linear"), []);
  });

  it("sums to duration within floating-point tolerance", () => {
    const duration = 1200;
    const stepCount = 7;
    const delays = computeStepDelays(
      stepCount,
      duration,
      "easeInOut",
    );
    assert.strictEqual(delays.length, stepCount);
    assertClose(sum(delays), duration);
  });

  it("produces equal per-step delays for linear easing (constant rate)", () => {
    const rate = 40;
    const stepCount = 6;
    const duration = stepCount * rate;
    const delays = computeStepDelays(stepCount, duration, "linear");

    for (const d of delays) {
      assertClose(d, rate);
    }
  });

  it("has no negative delays", () => {
    const delays = computeStepDelays(12, 900, "easeOut");
    assert.ok(delays.every((d) => d >= 0));
  });

  it("easeIn starts slow and speeds up (longer early delays)", () => {
    const delays = computeStepDelays(20, 2000, "easeIn");
    assert.ok(delays[0] > delays[19]);
  });

  it("easeOut starts fast and slows down (shorter early delays)", () => {
    const delays = computeStepDelays(20, 2000, "easeOut");
    assert.ok(delays[0] < delays[19]);
  });

  it("easeInOut is slow at both ends and fast in the middle", () => {
    const delays = computeStepDelays(21, 2100, "easeInOut");
    const mid = Math.floor(delays.length / 2);
    assert.ok(delays[0] > delays[mid]);
    assert.ok(delays[delays.length - 1] > delays[mid]);
  });
});

describe("resolveEnterStepDelays", () => {
  it("uses constant rate when duration is not set", () => {
    const delays = resolveEnterStepDelays(6, { rate: 50 }, 40);
    for (const d of delays) assertClose(d, 50);
  });

  it("ignores easing when duration is not set", () => {
    const withEasing = resolveEnterStepDelays(8, { rate: 40, easing: "easeIn" }, 40);
    const withoutEasing = resolveEnterStepDelays(8, { rate: 40 }, 40);
    assert.deepStrictEqual(withEasing, withoutEasing);
  });

  it("uses duration and easing when duration is set", () => {
    const delays = resolveEnterStepDelays(20, { duration: 2000, easing: "easeOut" }, 40);
    assert.ok(delays[0] < delays[19]);
  });

  it("rate mode returns a compact timing descriptor", () => {
    assert.deepStrictEqual(resolveEnterStepTiming(8, { rate: 50 }), {
      kind: "rate",
      ms: 50,
    });
  });
});

describe("createAdaptiveScheduler", () => {
  it("previewed delays are non-negative and sum toward duration over estimate", () => {
    const duration = 400;
    const estimateSteps = 10;
    const easing = "linear";
    let total = 0;

    for (let step = 0; step < estimateSteps; step++) {
      const delay = previewAdaptiveDelay(step, estimateSteps, duration, easing);
      assert.ok(delay >= 0);
      total += delay;
    }

    assertClose(total, duration);
  });

  it("grows estimate when steps exceed the initial estimate", async () => {
    const scheduler = createAdaptiveScheduler({
      duration: 200,
      easing: "linear",
      estimateSteps: 3,
    });

    assert.strictEqual(scheduler.estimate, 3);

    const delays: number[] = [];
    for (let i = 0; i < 5; i++) {
      const before = scheduler.estimate;
      delays.push(
        previewAdaptiveDelay(scheduler.step, before, 200, "linear"),
      );
      await scheduler.wait();
    }

    assert.ok(scheduler.estimate >= 5);
    assert.ok(delays.every((d) => d >= 0));
  });

  it("elapsed time increases monotonically across waits", async () => {
    const scheduler = createAdaptiveScheduler({
      duration: 80,
      easing: "linear",
      estimateSteps: 4,
    });

    let elapsed = 0;
    let prev = -1;

    for (let i = 0; i < 4; i++) {
      elapsed += previewAdaptiveDelay(
        scheduler.step,
        scheduler.estimate,
        80,
        "linear",
      );
      await scheduler.wait();
      assert.ok(elapsed > prev);
      prev = elapsed;
    }
  });
});
