import assert from "node:assert/strict";

export function assertClose(
  actual: number,
  expected: number,
  precision = 5,
): void {
  const delta = 10 ** -precision;
  assert.ok(
    Math.abs(actual - expected) <= delta,
    `expected ${actual} to be close to ${expected} (precision ${precision})`,
  );
}
