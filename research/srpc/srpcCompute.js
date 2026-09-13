"use strict";

/*
 * Sextant Resilience Processing Core (SRPC)
 * Research Compute Module — v0.1
 *
 * PURPOSE:
 * Connect the SRPC kernel with the externally defined SRPC rules.
 *
 * DOCTRINE:
 * DATA → ALGORITHMS → COMPUTE
 *
 * SAFETY:
 * - Local deterministic processing only
 * - No backend connection
 * - No external connection
 * - No physical execution
 * - No autonomous actuation
 * - Human authority remains external
 */

const SRPC_COMPUTE_VERSION = "0.1.0-RESEARCH";

/**
 * Confirm that the required SRPC modules are available.
 */
function validateSRPCDependencies() {
    const kernelAvailable =
        typeof window.SRPCKernel !== "undefined";

    const rulesAvailable =
        typeof window.SRPCRules !== "undefined";

    return {
        valid: kernelAvailable && rulesAvailable,
        kernelAvailable: kernelAvailable,
        rulesAvailable: rulesAvailable
    };
}

/**
 * Execute SRPC research processing.
 *
 * Processing sequence:
 * 1. Validate dependencies.
 * 2. Execute the kernel.
 * 3. Apply externally defined rules.
 * 4. Produce a deterministic research result.
 */
function executeSRPCResearch(input) {
    const dependencies = validateSRPCDependencies();

    if (!dependencies.valid) {
        return {
            computeVersion: SRPC_COMPUTE_VERSION,
            executed: false,
            dependencies: dependencies,
            output: null,
            error: "Required SRPC dependencies are unavailable.",
            physicalExecution: false,
            backendConnection: false,
            externalConnection: false,
            humanAuthorizationRequired: true
        };
    }

    const kernelResult = window.SRPCKernel.execute(
        input,
        function (algorithmInput) {
            return window.SRPCRules.assess(
                algorithmInput.systemState
            );
        }
    );

    return {
        computeVersion: SRPC_COMPUTE_VERSION,
        executed: kernelResult.executed,
        deterministic: kernelResult.deterministic,
        kernelVersion: kernelResult.kernelVersion,
        kernelOutput: kernelResult.output,
        error: kernelResult.error || null,
        physicalExecution: false,
        backendConnection: false,
        externalConnection: false,
        humanAuthorizationRequired: true
    };
}

/**
 * Test deterministic SRPC research processing.
 */
function testSRPCResearchDeterminism(input) {
    const dependencies = validateSRPCDependencies();

    if (!dependencies.valid) {
        return {
            computeVersion: SRPC_COMPUTE_VERSION,
            deterministic: false,
            status: "SRPC_DEPENDENCY_FAILURE",
            dependencies: dependencies,
            physicalExecution: false,
            backendConnection: false,
            externalConnection: false,
            humanAuthorizationRequired: true
        };
    }

    const result = window.SRPCKernel.testDeterminism(
        input,
        function (algorithmInput) {
            return window.SRPCRules.assess(
                algorithmInput.systemState
            );
        }
    );

    return {
        computeVersion: SRPC_COMPUTE_VERSION,
        deterministic: result.deterministic,
        status: result.deterministic
            ? "SRPC_COMPUTE_DETERMINISM_PASS"
            : "SRPC_COMPUTE_DETERMINISM_FAIL",
        firstOutput: result.firstOutput,
        secondOutput: result.secondOutput,
        physicalExecution: false,
        backendConnection: false,
        externalConnection: false,
        humanAuthorizationRequired: true
    };
}

/**
 * Return the current SRPC compute status.
 */
function getSRPCComputeStatus() {
    const dependencies = validateSRPCDependencies();

    return {
        computeVersion: SRPC_COMPUTE_VERSION,
        dependencies: dependencies,
        ready: dependencies.valid,
        deterministic: true,
        physicalExecution: false,
        backendConnection: false,
        externalConnection: false,
        humanAuthorizationRequired: true
    };
}

/**
 * Public SRPC compute API.
 */
window.SRPCCompute = {
    version: SRPC_COMPUTE_VERSION,

    validateDependencies: validateSRPCDependencies,
    execute: executeSRPCResearch,
    testDeterminism: testSRPCResearchDeterminism,
    getStatus: getSRPCComputeStatus
};