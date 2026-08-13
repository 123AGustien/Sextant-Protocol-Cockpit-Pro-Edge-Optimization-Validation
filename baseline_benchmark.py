"""
NeuralEdge Optimizer
Baseline Benchmark Runner
"""

from benchmark import benchmark_function, format_result


def baseline_workload():
    """
    Reference workload representing the unoptimized baseline.
    """
    data = list(range(1000))
    return sum(x * x for x in data)


def main():
    print("===================================")
    print(" NEURALEDGE OPTIMIZER")
    print(" BASELINE BENCHMARK")
    print("===================================\n")

    print("Running baseline benchmark...")

    result = benchmark_function(
        name="Baseline",
        function=baseline_workload,
        iterations=100
    )

    output = format_result(result)

    print("\nBaseline Results")
    print("-----------------------------------")
    print(f"Iterations: {output['iterations']}")
    print(
        f"Average Latency: "
        f"{output['average_latency_ms']:.4f} ms"
    )
    print(
        f"Minimum Latency: "
        f"{output['minimum_latency_ms']:.4f} ms"
    )
    print(
        f"Maximum Latency: "
        f"{output['maximum_latency_ms']:.4f} ms"
    )
    print(
        f"Throughput: "
        f"{output['throughput_per_second']:.2f} executions/sec"
    )

    print("\nBaseline Benchmark: COMPLETE")


if __name__ == "__main__":
    main()
