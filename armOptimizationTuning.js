/**
 * ARM Optimization Tuning
 * Deterministic simulated tuning adjustment.
 * Simulation-only. Does not modify real ARM hardware.
 */

const DEFAULT_TUNING_INCREMENT = 5;
const MAX_OPTIMIZATION = 100;

function applyDeterministicTuning(
  observed = {},
  bottleneck,
  increment = DEFAULT_TUNING_INCREMENT
) {
  const tuned = { ...observed };

  if (!Object.prototype.hasOwnProperty.call(tuned, bottleneck)) {
    throw new Error(`Unknown ARM optimization domain: ${bottleneck}`);
  }

  const current = Number(tuned[bottleneck]) || 0;

  tuned[bottleneck] = Math.min(
    MAX_OPTIMIZATION,
    current + increment
  );

  return tuned;
}

function calculateAverageOptimization(observed = {}) {
  const values = Object.values(observed)
    .filter(value => typeof value === "number");

  if (!values.length) {
    return 0;
  }

  return Number(
    (
      values.reduce((sum, value) => sum + value, 0) /
      values.length
    ).toFixed(2)
  );
}

module.exports = {
  DEFAULT_TUNING_INCREMENT,
  applyDeterministicTuning,
  calculateAverageOptimization
};