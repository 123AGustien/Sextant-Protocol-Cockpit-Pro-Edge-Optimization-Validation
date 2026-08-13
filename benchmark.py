"""
NeuralEdge Optimizer
ARM AI Acceleration Platform

Benchmark Engine
----------------
Provides reproducible baseline-vs-optimized performance measurements.

Research boundary:
- Simulation / benchmark environment
- No production deployment
- No customer-system control
- Results depend on workload and hardware
"""

import time
import statistics
from dataclasses import dataclass
from typing import Callable, Dict, Any


@dataclass
class BenchmarkResult:
    name: str
    iterations: int
    average_latency_ms: float
    minimum_latency_ms: float
    maximum_latency_ms: float
    throughput_per_second: float


def benchmark_function(
    name: str,
    function: Callable[[], Any],
    iterations: int = 100
) -> BenchmarkResult:
    """
    Execute a callable repeatedly and measure execution performance.
    """

    if iterations <= 0:
        raise ValueError("iterations must be greater than zero")

    timings = []

    # Warm-up execution
    function()

    for _ in range(iterations):
        start = time.perf_counter()

        function()

        end = time.perf_counter()
        timings.append((end - start) * 1000)

    average_latency = statistics.mean(timings)
    minimum_latency = min(timings)
    maximum_latency = max(timings)

    total_seconds = sum(timings) / 1000

    throughput = (
        iterations / total_seconds
        if total_seconds > 0
        else 0.0
    )

    return BenchmarkResult(
        name=name,
        iterations=iterations,
        average_latency_ms=average_latency,
        minimum_latency_ms=minimum_latency,
        maximum_latency_ms=maximum_latency,
        throughput_per_second=throughput
    )


def compare_results(
    baseline: BenchmarkResult,
    optimized: BenchmarkResult
) -> Dict[str, float]:
    """
    Compare baseline and optimized benchmark results.
    """

    latency_change = (
        (
            baseline.average_latency_ms
            - optimized.average_latency_ms
        )
        / baseline.average_latency_ms
        * 100
        if baseline.average_latency_ms > 0
        else 0.0
    )

    throughput_change = (
        (
            optimized.throughput_per_second
            - baseline.throughput_per_second
        )
        / baseline.throughput_per_second
        * 100
        if baseline.throughput_per_second > 0
        else 0.0
    )

    speedup = (
        baseline.average_latency_ms
        / optimized.average_latency_ms
        if optimized.average_latency_ms > 0
        else 0.0
    )

    return {
        "latency_improvement_percent": latency_change,
        "throughput_improvement_percent": throughput_change,
        "speedup_factor": speedup
    }


def format_result(result: BenchmarkResult) -> Dict[str, Any]:
    """
    Convert a benchmark result into a serializable dictionary.
    """

    return {
        "name": result.name,
        "iterations": result.iterations,
        "average_latency_ms": round(
            result.average_latency_ms, 4
        ),
        "minimum_latency_ms": round(
            result.minimum_latency_ms, 4
        ),
        "maximum_latency_ms": round(
            result.maximum_latency_ms, 4
        ),
        "throughput_per_second": round(
            result.throughput_per_second, 4
        )
    }


if __name__ == "__main__":
    """
    Basic self-test workload.

    This is intentionally a deterministic computational workload
    suitable for verifying that the benchmark engine operates correctly.
    """

    def baseline_workload():
        data = list(range(1000))
        return sum(x * x for x in data)

    def optimized_workload():
        return sum(x * x for x in range(1000))

    baseline_result = benchmark_function(
        "Baseline",
        baseline_workload,
        iterations=100
    )

    optimized_result = benchmark_function(
        "Optimized",
        optimized_workload,
        iterations=100
    )

    comparison = compare_results(
        baseline_result,
        optimized_result
    )

    print("NeuralEdge Optimizer — Benchmark")
    print("--------------------------------")
    print("Baseline:")
    print(format_result(baseline_result))

    print("\nOptimized:")
    print(format_result(optimized_result))

    print("\nComparison:")
    print(
        f"Latency improvement: "
        f"{comparison['latency_improvement_percent']:.2f}%"
    )

    print(
        f"Throughput improvement: "
        f"{comparison['throughput_improvement_percent']:.2f}%"
    )

    print(
        f"Speedup: "
        f"{comparison['speedup_factor']:.2f}x"
    )

    print("\nBenchmark status: COMPLETE")
