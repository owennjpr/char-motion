import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  easeIn,
  easeInInverse,
  easeInOut,
  easeInOutInverse,
  easeOut,
  easeOutInverse,
  linear,
  linearInverse,
  resolveEasing,
  resolveInverseEasing,
} from "./easings";
import { assertClose } from "./testUtils";

describe("resolveEasing", () => {
  it("defaults to linear", () => {
    const fn = resolveEasing();
    assert.strictEqual(fn(0), 0);
    assert.strictEqual(fn(0.5), 0.5);
    assert.strictEqual(fn(1), 1);
  });

  it("maps named easings", () => {
    assert.strictEqual(resolveEasing("easeIn")(0.5), easeIn(0.5));
    assert.strictEqual(resolveEasing("easeOut")(0.5), easeOut(0.5));
    assert.strictEqual(resolveEasing("easeInOut")(0.5), easeInOut(0.5));
    assert.strictEqual(resolveEasing("linear")(0.5), linear(0.5));
  });

  it("uses custom functions", () => {
    const custom = (t: number) => t * t * t;
    assert.strictEqual(resolveEasing(custom)(0.5), 0.125);
  });

  it("clamps custom function input to [0, 1]", () => {
    const fn = resolveEasing(() => 1);
    assert.strictEqual(fn(-1), 1);
    assert.strictEqual(fn(2), 1);
  });
});

describe("inverse easings", () => {
  it("invert named forward curves", () => {
    for (const [forward, inverse] of [
      [linear, linearInverse],
      [easeIn, easeInInverse],
      [easeOut, easeOutInverse],
      [easeInOut, easeInOutInverse],
    ] as const) {
      assertClose(inverse(forward(0.25)), 0.25);
      assertClose(inverse(forward(0.75)), 0.75);
    }
  });

  it("resolveInverseEasing inverts custom functions", () => {
    const custom = (t: number) => t * t * t;
    const inverse = resolveInverseEasing(custom);
    assertClose(inverse(custom(0.5)), 0.5);
  });
});

describe("named easings", () => {
  it("are monotonic on [0, 1]", () => {
    for (const fn of [linear, easeIn, easeOut, easeInOut]) {
      let prev = fn(0);
      for (let i = 1; i <= 10; i++) {
        const t = i / 10;
        const next = fn(t);
        assert.ok(next >= prev);
        prev = next;
      }
      assert.strictEqual(fn(1), 1);
    }
  });
});
