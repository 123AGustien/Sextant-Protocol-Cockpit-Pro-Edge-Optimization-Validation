"use strict"

/*
 * Sextant Resilience Processing Core (SRPC)
 * Research Kernel — v0.1
 *
 * PURPOSE:
 * Hardware-independent deterministic processing kernel for SRPC research.
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
 * - Human authority remains external to this research kernel
 */

const SRPC_KERNEL_VERSION = "0.1.0-RESEARCH";

const SRPC_KERNEL_STATE = {
    initialized: false,
    lastInput: null,
    lastOutput: null,
    executionCount: 0
};

/**
 * Validate the minimum SRPC input structure.
 */
function validateSRPCInput(input) {
    if (!input || typeof input !== "object") {
        return {
            valid: false,
            reason: "SRPC input must be an object."
        };
    }

    if (!input.systemState || typeof input.systemState !== "object") {
        return {
            valid: false,
            reason: "systemState is required."
        };
    }

    return {
        valid: true,
        reason: "SRPC input structure valid."
    };
}

/**
 * Normalize incoming system-state data.
 *
 * Rules remain external to the kernel.
 * The kernel prepares data for deterministic processing.
 */
function normalizeSRPCInput(input) {
    const validation = validateSRPCInput(input);

    if (!validation.valid) {
        return {
            valid: false,
            systemState: null,
            metadata: {
                reason: validation.reason
            }
        };
    }

    return {
        valid: true,

        systemState: {
            ...input.systemState
        },

        metadata: {
            source: input.source ?? "LOCAL_SIMULATION",
            purpose: input.purpose ?? "SRPC_RESEARCH",
            timestamp: input.timestamp ?? null
        }
    };
}

/**
 * Deterministic kernel execution.
 *
 * The kernel does not contain domain-specific decision rules.
 * It provides the processing structure for externally supplied rules.
 */
function executeSRPCKernel(input, algorithm) {
    const normalized = normalizeSRPCInput(input);

    if (!normalized.valid) {
        return {
            kernelVersion: SRPC_KERNEL_VERSION,
            executed: false,
            deterministic: true,
            physicalExecution: false,
            backendConnection: false,
            humanAuthorizationRequired: true,
            output: null,
            error: normalized.metadata.reason
        };
    }

    if (typeof algorithm !== "function") {
        return {
            kernelVersion: SRPC_KERNEL_VERSION,
            executed: false,
            deterministic: true,
            physicalExecution: false,
            backendConnection: false,
            humanAuthorizationRequired: true,
            output: null,
            error: "SRPC algorithm function is required."
        };
    }

    const algorithmInput = {
        systemState: {
            ...normalized.systemState
        },

        metadata: {
            ...normalized.metadata
        }
    };

    const output = algorithm(algorithmInput);

    SRPC_KERNEL_STATE.initialized = true;
    SRPC_KERNEL_STATE.lastInput = algorithmInput;
    SRPC_KERNEL_STATE.lastOutput = output;
    SRPC_KERNEL_STATE.executionCount += 1;

    return {
        kernelVersion: SRPC_KERNEL_VERSION,
        executed: true,
        deterministic: true,

        physicalExecution: false,
        backendConnection: false,
        externalConnection: false,
        humanAuthorizationRequired: true,

        output
    };
}

/**
 * Execute the same input twice and compare serialized results.
 *
 * This provides a basic deterministic-behaviour test.
 */
function testSRPCDeterminism(input, algorithm) {
    const first = executeSRPCKernel(input, algorithm);
    const second = executeSRPCKernel(input, algorithm);

    const firstOutput = JSON.stringify(first.output);
    const secondOutput = JSON.stringify(second.output);

    return {
        kernelVersion: SRPC_KERNEL_VERSION,
        deterministic: firstOutput === secondOutput,
        firstOutput: first.output,
        secondOutput: second.output,
        physicalExecution: false,
        backendConnection: false,
        humanAuthorizationRequired: true,
        status:
            firstOutput === secondOutput
                ? "SRPC_DETERMINISM_PASS"
                : "SRPC_DETERMINISM_FAIL"
    };
}

/**
 * Return current kernel status.
 */
function getSRPCKernelStatus() {
    return {
        kernelVersion: SRPC_KERNEL_VERSION,
        initialized: SRPC_KERNEL_STATE.initialized,
        executionCount: SRPC_KERNEL_STATE.executionCount,
        deterministic: true,
        backendConnection: false,
        externalConnection: false,
        physicalExecution: false,
        humanAuthorizationRequired: true
    };
}

/**
 * Reset research kernel state.
 */
function resetSRPCKernel() {
    SRPC_KERNEL_STATE.initialized = false;
    SRPC_KERNEL_STATE.lastInput = null;
    SRPC_KERNEL_STATE.lastOutput = null;
    SRPC_KERNEL_STATE.executionCount = 0;

    return {
        kernelVersion: SRPC_KERNEL_VERSION,
        reset: true,
        status: "SRPC_KERNEL_RESET"
    };
}

/**
 * Public SRPC research API.
 */
window.SRPCKernel = {
    version: SRPC_KERNEL_VERSION,

    validateInput: validateSRPCInput,
    normalizeInput: normalizeSRPCInput,
    execute: executeSRPCKernel,
    testDeterminism: testSRPCDeterminism,
    getStatus: getSRPCKernelStatus,
    reset: resetSRPCKernel
};