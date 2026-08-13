"""
NeuralEdge Optimizer
ARM AI Acceleration Platform

Self-Test Module
----------------
Validates the core benchmark architecture before CI execution.

Research boundary:
- Simulation / benchmark environment
- No production deployment
- No customer-system control
- No live ARM hardware control
"""

from benchmark import (
    benchmark_function,
    compare_results,
    format_result,
)


def baseline_workload():
    """
    Reference workload representing the baseline execution path.
    """
    data = list(range(1000))
    return sum(x * x for x in data)


def optimized_workload():
    """
    Reference workload representing the optimized execution path.
    """
    return sum(x * x for x in range(1000))


def assert_valid_result(result, expected_name):
    """
    Validate the structure and numerical integrity of a benchmark result.
    """

    assert result.name == expected_name
    assert result.iterations > 0
    assert result.average_latency_ms >= 0
    assert result.minimum_latency_ms >= 0
    assert result.maximum_latency_ms >= 0
    assert result.throughput_per_second >= 0


def run_self_test():
    """
    Execute the complete NeuralEdge core self-test.
    """

    print("===================================")
    print(" NEURALEDGE OPTIMIZER")
    print(" CORE SELF-TEST")
    print("===================================")
    print()

    # ----------------------------------------
    # TEST 1 — BASELINE WORKLOAD
    # ----------------------------------------

    print("[1/5] Testing baseline workload...")

    baseline_result = benchmark_function(
        name="Baseline",
        function=baseline_workload,
        iterations=10
    )

    assert_valid_result(
        baseline_result,
        "Baseline"
    )

    print("PASS — Baseline workload")

    # ----------------------------------------
    # TEST 2 — OPTIMIZED WORKLOAD
    # ----------------------------------------

    print("[2/5] Testing optimized workload...")

    optimized_result = benchmark_function(
        name="Optimized",
        function=optimized_workload,
        iterations=10
    )

    assert_valid_result(
        optimized_result,
        "Optimized"
    )

    print("PASS — Optimized workload")

    # ----------------------------------------
    # TEST 3 — RESULT FORMATTING
    # ----------------------------------------

    print("[3/5] Testing result formatting...")

    baseline_output = format_result(baseline_result)
    optimized_output = format_result(optimized_result)

    required_fields = {
        "name",
        "iterations",
        "average_latency_ms",
        "minimum_latency_ms",
        "maximum_latency_ms",
        "throughput_per_second",
    }

    assert required_fields.issubset(
        baseline_output.keys()
    )

    assert required_fields.issubset(
        optimized_output.keys()
    )

    print("PASS — Result formatting")

    # ----------------------------------------
    # TEST 4 — COMPARISON ENGINE
    # ----------------------------------------

    print("[4/5] Testing comparison engine...")

    comparison = compare_results(
        baseline_result,
        optimized_result
    )

    assert "latency_improvement_percent" in comparison
    assert "throughput_improvement_percent" in comparison
    assert "speedup_factor" in comparison

    assert comparison["speedup_factor"] >= 0

    print("PASS — Comparison engine")

    # ----------------------------------------
    # TEST 5 — WORKLOAD EXECUTION INTEGRITY
    # ----------------------------------------

    print("[5/5] Testing workload execution integrity...")

    baseline_value = baseline_workload()
    optimized_value = optimized_workload()

    assert baseline_value == optimized_value
    assert baseline_value > 0

    print("PASS — Workload execution integrity")

    # ----------------------------------------
    # SUMMARY
    # ----------------------------------------

    print()
    print("===================================")
    print(" SELF-TEST RESULTS")
    print("===================================")
    print("Baseline Benchmark:       PASS")
    print("Optimized Benchmark:      PASS")
    print("Result Formatting:        PASS")
    print("Comparison Engine:        PASS")
    print("Workload Integrity:       PASS")
    print("-----------------------------------")
    print("NEURALEDGE SELF-TEST:      PASS")
    print("===================================")

    return True


if __name__ == "__main__":
    try:
        run_self_test()
    except Exception as error:
        print()
        print("===================================")
        print(" NEURALEDGE SELF-TEST: FAIL")
        print("===================================")
        print(f"Error: {error}")
        raise
