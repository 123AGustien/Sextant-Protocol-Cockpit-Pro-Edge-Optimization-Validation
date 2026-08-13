/**
 * ARM Closed-Loop Improvement Test
 *
 * Verifies:
 * OBSERVE → VERIFY → OPTIMIZE → ASSESS
 * → IDENTIFY BOTTLENECK → RECOMMEND → TUNE
 * → RETEST → COMPARE → VALIDATE → UPDATE → AUDIT
 *
 * Simulation-only.
 */

const {
  runArmImprovementLoop
} = require("./armImprovementLoop");

const baselineObserved = {
  quantization: 40,
  pruning: 38,
  graphOptimization: 38,
  memoryOptimization: 40,
  kernelOptimization: 43,
  arm64Runtime: 48
};

describe("ARM Closed-Loop Improvement Engine", () => {
  test("identifies the lowest optimization domain", () => {
    const result = runArmImprovementLoop({
      scenario: "THERMAL_STRESS",
      intensity: 50,
      observed: baselineObserved
    });

    expect(result.assessment.bottleneck).toBe("pruning");
  });

  test("produces a deterministic tuning recommendation", () => {
    const result = runArmImprovementLoop({
      scenario: "THERMAL_STRESS",
      intensity: 50,
      observed: baselineObserved
    });

    expect(result.recommendation.bottleneck).toBe("pruning");
    expect(result.recommendation.recommendation).toBe(
      "TUNE_PRUNING"
    );
    expect(result.recommendation.simulationOnly).toBe(true);
  });

  test("improves the identified bottleneck during simulation", () => {
    const result = runArmImprovementLoop({
      scenario: "THERMAL_STRESS",
      intensity: 50,
      observed: baselineObserved
    });

    expect(result.tuning.baselineValue).toBe(38);
    expect(result.tuning.tunedValue).toBe(43);
    expect(result.comparison.improvement).toBeGreaterThan(0);
  });

  test("validates the before-and-after result", () => {
    const result = runArmImprovementLoop({
      scenario: "THERMAL_STRESS",
      intensity: 50,
      observed: baselineObserved
    });

    expect(result.validation.valid).toBe(true);
    expect(result.validation.deterministic).toBe(true);
    expect(result.validation.improvementDetected).toBe(true);
  });

  test("records the closed-loop audit result", () => {
    const result = runArmImprovementLoop({
      scenario: "THERMAL_STRESS",
      intensity: 50,
      observed: baselineObserved
    });

    expect(result.audit.event).toBe(
      "ARM_CLOSED_LOOP_IMPROVEMENT"
    );

    expect(result.audit.scenario).toBe(
      "THERMAL_STRESS"
    );

    expect(result.audit.simulationOnly).toBe(true);
  });

  test("produces identical results for identical inputs", () => {
    const first = runArmImprovementLoop({
      scenario: "THERMAL_STRESS",
      intensity: 50,
      observed: baselineObserved
    });

    const second = runArmImprovementLoop({
      scenario: "THERMAL_STRESS",
      intensity: 50,
      observed: baselineObserved
    });

    expect(first).toEqual(second);
  });
});