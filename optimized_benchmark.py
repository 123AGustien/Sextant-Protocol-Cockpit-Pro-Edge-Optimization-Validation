"""
NeuralEdge Optimizer
Optimized Benchmark Runner
"""

from benchmark import benchmark_function, format_result


def optimized_workload():
    """
    Reference workload representing the optimized execution path.
    """
    return sum(x * x for x in range(1000))


def main():
    print("===================================")
    print(" NEURALEDGE OPTIMIZER")
    print(" OPTIMIZED BENCHMARK")
    print("===================================\n")

    print("Running optimized benchmark...")

    result = benchmark_function(
        name="Optimized",
        function=optimized_workload,
        iterations=100
    )

    output = format_result(result)

    print("\nOptimized Results")
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

    print("\nOptimized Benchmark: COMPLETE")


if __name__ == "__main__":
    main()
