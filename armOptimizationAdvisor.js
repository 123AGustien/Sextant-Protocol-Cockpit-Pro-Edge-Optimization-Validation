/**
 * ARM Optimization Advisor
 * Deterministic bottleneck identification and tuning recommendation.
 * Simulation-only. Does not modify real ARM hardware.
 */

const OPTIMIZATION_DOMAINS = [
  "quantization",
  "pruning",
  "graphOptimization",
  "memoryOptimization",
  "kernelOptimization",
  "arm64Runtime"
];

function identifyBottleneck(observed = {}) {
  let bottleneck = OPTIMIZATION_DOMAINS[0];

  for (const domain of OPTIMIZATION_DOMAINS) {
    if (
      typeof observed[domain] === "number" &&
      observed[domain] < (observed[bottleneck] ?? Infinity)
    ) {
      bottleneck = domain;
    }
  }

  return bottleneck;
}

function recommendOptimization(observed = {}) {
  const bottleneck = identifyBottleneck(observed);
  const currentValue = Number(observed[bottleneck] ?? 0);

  return {
    bottleneck,
    currentValue,
    recommendation: `TUNE_${bottleneck.toUpperCase()}`,
    reason: `${bottleneck} is the lowest observed optimization domain.`,
    simulationOnly: true
  };
}

module.exports = {
  OPTIMIZATION_DOMAINS,
  identifyBottleneck,
  recommendOptimization
};