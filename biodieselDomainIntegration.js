/**
 * Sextant Protocol™ Optimizer
 * Biodiesel Domain Integration
 *
 * Phase 2 — Authoritative Rule Engine Wiring
 *
 * PURPOSE:
 * Connects the Optimizer cockpit to the authoritative
 * Biodiesel Rule Registry and Biodiesel Rule Engine.
 *
 * IMPORTANT:
 * - BiodieselRuleRegistry is authoritative for rules.
 * - BiodieselRuleEngine is authoritative for evaluation.
 * - No Biodiesel rules are duplicated here.
 * - Scenario thresholds remain in the rule engine.
 * - No backend connection.
 * - No Python.
 * - No physical execution.
 * - No automatic execution.
 * - Human authorization remains mandatory.
 * - Simulator integration only.
 */

"use strict";

/* ============================================================
   BIODIESEL DOMAIN IDENTITY
============================================================ */

const BIODIESEL_DOMAIN = "ENERGY";

const BIODIESEL_SCENARIO =
    "BIODIESEL_SHORTAGE";

const BIODIESEL_INTEGRATION_VERSION =
    "2.1.0";

/* ============================================================
   GLOBAL OBJECT
============================================================ */

const BIODIESEL_GLOBAL =
    typeof globalThis !== "undefined"
        ? globalThis
        : (
            typeof window !== "undefined"
                ? window
                : null
        );

/* ============================================================
   AUTHORITATIVE REGISTRY DISCOVERY
============================================================ */

function getBiodieselRuleRegistry() {

    if (
        BIODIESEL_GLOBAL &&
        BIODIESEL_GLOBAL.BiodieselRuleRegistry
    ) {

        return BIODIESEL_GLOBAL.BiodieselRuleRegistry;
    }

    return null;
}

/* ============================================================
   AUTHORITATIVE ENGINE DISCOVERY
============================================================ */

function getBiodieselRuleAPI() {

    if (
        BIODIESEL_GLOBAL &&
        BIODIESEL_GLOBAL.BiodieselRuleEngine
    ) {

        return BIODIESEL_GLOBAL.BiodieselRuleEngine;
    }

    return null;
}

/* ============================================================
   REGISTRY STATUS
============================================================ */

function getBiodieselRegistryStatus() {

    const registry =
        getBiodieselRuleRegistry();

    if (!registry) {

        return {

            available: false,

            authoritativeRegistry:
                "BiodieselRuleRegistry",

            error:
                "BIODIESEL_RULE_REGISTRY_NOT_AVAILABLE"
        };
    }

    return {

        available: true,

        authoritativeRegistry:
            "BiodieselRuleRegistry",

        version:
            registry.version ||
            "UNKNOWN",

        getRulesAvailable:
            typeof registry.getBiodieselRules ===
            "function",

        getScenarioRuleAvailable:
            typeof registry.getBiodieselScenarioRule ===
            "function",

        validationAvailable:
            typeof registry.validateBiodieselRules ===
            "function"
    };
}

/* ============================================================
   ENGINE STATUS
============================================================ */

function getBiodieselEngineStatus() {

    const engine =
        getBiodieselRuleAPI();

    if (!engine) {

        return {

            available: false,

            authoritativeEngine:
                "BiodieselRuleEngine",

            error:
                "BIODIESEL_RULE_ENGINE_NOT_AVAILABLE"
        };
    }

    return {

        available: true,

        authoritativeEngine:
            "BiodieselRuleEngine",

        version:
            engine.version ||
            "UNKNOWN",

        evaluateAvailable:
            typeof engine.evaluate ===
            "function",

        deriveSolutionAvailable:
            typeof engine.deriveSolution ===
            "function"
    };
}

/* ============================================================
   INTENSITY — SINGLE SIMULATOR SOURCE OF TRUTH
============================================================ */

function getBiodieselIntensity() {

    if (
        BIODIESEL_GLOBAL &&
        typeof BIODIESEL_GLOBAL
            .getOptimizationIntensity ===
            "function"
    ) {

        const value =
            Number(
                BIODIESEL_GLOBAL
                    .getOptimizationIntensity()
            );

        if (
            Number.isFinite(value)
        ) {

            return Math.max(
                0,
                Math.min(
                    100,
                    value
                )
            );
        }
    }

    const slider =
        typeof document !== "undefined"
            ? document.getElementById(
                "optimizationIntensity"
            )
            : null;

    if (!slider) {

        return 50;
    }

    const value =
        Number(slider.value);

    if (
        !Number.isFinite(value)
    ) {

        return 50;
    }

    return Math.max(
        0,
        Math.min(
            100,
            value
        )
    );
}

/* ============================================================
   BIODIESEL STATE
============================================================ */

function createBiodieselState(
    intensity =
        getBiodieselIntensity()
) {

    return {

        energy:
            Math.max(
                0,
                Math.min(
                    100,
                    Number(intensity) || 0
                )
            )
    };
}

/* ============================================================
   AUTHORITATIVE REGISTRY VALIDATION
============================================================ */

function validateBiodieselRegistry() {

    const registry =
        getBiodieselRuleRegistry();

    if (!registry) {

        return {

            valid: false,

            error:
                "BIODIESEL_RULE_REGISTRY_NOT_AVAILABLE"
        };
    }

    if (
        typeof registry.validateBiodieselRules !==
        "function"
    ) {

        return {

            valid: false,

            error:
                "BIODIESEL_RULE_REGISTRY_VALIDATOR_NOT_AVAILABLE"
        };
    }

    try {

        const result =
            registry.validateBiodieselRules();

        return {

            valid:
                result &&
                result.valid === true,

            result
        };

    } catch (error) {

        return {

            valid: false,

            error:
                "BIODIESEL_RULE_REGISTRY_VALIDATION_FAILED",

            message:
                error?.message ||
                "Unknown registry validation error."
        };
    }
}

/* ============================================================
   AUTHORITATIVE RULE EVALUATION
============================================================ */

function evaluateBiodieselRules(
    state =
        createBiodieselState()
) {

    const engine =
        getBiodieselRuleAPI();

    if (!engine) {

        return {

            verified: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            ruleStatus:
                "RULE_ENGINE_UNAVAILABLE",

            error:
                "BIODIESEL_RULE_ENGINE_NOT_AVAILABLE"
        };
    }

    if (
        typeof engine.evaluate !==
        "function"
    ) {

        return {

            verified: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            ruleStatus:
                "RULE_EVALUATOR_UNAVAILABLE",

            error:
                "BIODIESEL_RULE_EVALUATOR_NOT_AVAILABLE"
        };
    }

    try {

        const result =
            engine.evaluate(
                BIODIESEL_SCENARIO,
                state
            );

        if (!result) {

            return {

                verified: false,

                domain:
                    BIODIESEL_DOMAIN,

                scenario:
                    BIODIESEL_SCENARIO,

                ruleStatus:
                    "EMPTY_RULE_RESULT",

                error:
                    "BIODIESEL_RULE_ENGINE_RETURNED_NO_RESULT"
            };
        }

        return {

            ...result,

            domain:
                result.domain ||
                BIODIESEL_DOMAIN,

            scenario:
                result.scenario ||
                BIODIESEL_SCENARIO
        };

    } catch (error) {

        return {

            verified: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            ruleStatus:
                "RULE_EVALUATION_EXCEPTION",

            error:
                "BIODIESEL_RULE_EVALUATION_FAILED",

            message:
                error?.message ||
                "Unknown Biodiesel rule error."
        };
    }
}

/* ============================================================
   AUTHORITATIVE SOLUTION DERIVATION
============================================================ */

function deriveBiodieselSolution(
    state =
        createBiodieselState(),

    assessment = {}
) {

    const engine =
        getBiodieselRuleAPI();

    if (!engine) {

        return {

            valid: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            error:
                "BIODIESEL_RULE_ENGINE_NOT_AVAILABLE"
        };
    }

    if (
        typeof engine.deriveSolution !==
        "function"
    ) {

        return {

            valid: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            error:
                "BIODIESEL_SOLUTION_DERIVER_NOT_AVAILABLE"
        };
    }

    try {

        const result =
            engine.deriveSolution(
                BIODIESEL_SCENARIO,
                state
            );

        if (!result) {

            return {

                valid: false,

                domain:
                    BIODIESEL_DOMAIN,

                scenario:
                    BIODIESEL_SCENARIO,

                error:
                    "BIODIESEL_SOLUTION_EMPTY"
            };
        }

        return {

            valid:
                result.ruleVerified === true,

            domain:
                result.domain ||
                BIODIESEL_DOMAIN,

            scenario:
                result.scenario ||
                BIODIESEL_SCENARIO,

            result,

            assessment
        };

    } catch (error) {

        return {

            valid: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            error:
                "BIODIESEL_SOLUTION_DERIVATION_FAILED",

            message:
                error?.message ||
                "Unknown Biodiesel solution error."
        };
    }
}

/* ============================================================
   RUN BIODIESEL DOMAIN
============================================================ */

function runBiodieselDomain(
    assessment = {}
) {

    const intensity =
        getBiodieselIntensity();

    const state =
        createBiodieselState(
            intensity
        );

    const registryStatus =
        getBiodieselRegistryStatus();

    const engineStatus =
        getBiodieselEngineStatus();

    const registryValidation =
        validateBiodieselRegistry();

    if (
        !registryStatus.available ||
        !registryValidation.valid
    ) {

        return {

            status:
                "BIODIESEL_RULE_REGISTRY_VERIFICATION_FAILED",

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            intensity,

            state,

            registryStatus,

            registryValidation,

            engineStatus,

            execution: {

                authorized: false,

                physicalExecution: false,

                automaticExecution: false,

                humanAuthorizationRequired: true
            }
        };
    }

    if (
        !engineStatus.available
    ) {

        return {

            status:
                "BIODIESEL_RULE_ENGINE_UNAVAILABLE",

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            intensity,

            state,

            registryStatus,

            registryValidation,

            engineStatus,

            execution: {

                authorized: false,

                physicalExecution: false,

                automaticExecution: false,

                humanAuthorizationRequired: true
            }
        };
    }

    const ruleAssessment =
        evaluateBiodieselRules(
            state
        );

    if (
        ruleAssessment.verified !== true
    ) {

        return {

            status:
                "BIODIESEL_RULE_VERIFICATION_FAILED",

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            intensity,

            state,

            registryStatus,

            registryValidation,

            engineStatus,

            ruleAssessment,

            execution: {

                authorized: false,

                physicalExecution: false,

                automaticExecution: false,

                humanAuthorizationRequired: true
            }
        };
    }

    const solution =
        deriveBiodieselSolution(
            state,
            assessment
        );

    if (
        solution.valid !== true
    ) {

        return {

            status:
                "BIODIESEL_SOLUTION_DERIVATION_FAILED",

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            intensity,

            state,

            registryStatus,

            registryValidation,

            engineStatus,

            ruleAssessment,

            solution,

            execution: {

                authorized: false,

                physicalExecution: false,

                automaticExecution: false,

                humanAuthorizationRequired: true
            }
        };
    }

    return {

        status:
            "BIODIESEL_DOMAIN_VALIDATED",

        domain:
            BIODIESEL_DOMAIN,

        scenario:
            BIODIESEL_SCENARIO,

        intensity,

        state,

        registryStatus,

        registryValidation,

        engineStatus,

        ruleAssessment,

        solution,

        execution: {

            authorized: false,

            physicalExecution: false,

            automaticExecution: false,

            humanAuthorizationRequired: true
        }
    };
}

/* ============================================================
   BIODIESEL INTEGRATION TEST
============================================================ */

function runBiodieselIntegrationTest() {

    const intensity =
        getBiodieselIntensity();

    const state =
        createBiodieselState(
            intensity
        );

    const registryStatus =
        getBiodieselRegistryStatus();

    const engineStatus =
        getBiodieselEngineStatus();

    const registryValidation =
        validateBiodieselRegistry();

    const result = {

        test:
            "BIODIESEL_DOMAIN_INTEGRATION",

        version:
            BIODIESEL_INTEGRATION_VERSION,

        domain:
            BIODIESEL_DOMAIN,

        scenario:
            BIODIESEL_SCENARIO,

        intensity,

        state,

        authoritativeRegistry:
            registryStatus,

        authoritativeEngine:
            engineStatus,

        registryValidation,

        safetyBoundary: {

            backendConnection: false,

            physicalExecution: false,

            automaticExecution: false,

            vesselActuation: false,

            externalConnection: false,

            humanAuthorizationRequired: true
        },

        checks: {

            ruleRegistry:
                registryStatus.available === true,

            registryValidator:
                registryStatus.validationAvailable === true,

            registryValid:
                registryValidation.valid === true,

            engineDetected:
                engineStatus.available === true,

            evaluateFunctionAvailable:
                engineStatus.evaluateAvailable === true,

            deriveSolutionFunctionAvailable:
                engineStatus.deriveSolutionAvailable === true,

            ruleEvaluationExecuted:
                false,

            ruleVerified:
                false
        }
    };

    if (
        !result.checks.ruleRegistry
    ) {

        result.passed = false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "AUTHORITATIVE_BIODIESEL_RULE_REGISTRY_NOT_AVAILABLE";

    } else if (
        !result.checks.registryValidator
    ) {

        result.passed = false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "BIODIESEL_RULE_REGISTRY_VALIDATOR_NOT_AVAILABLE";

    } else if (
        !result.checks.registryValid
    ) {

        result.passed = false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "BIODIESEL_RULE_REGISTRY_VALIDATION_FAILED";

    } else if (
        !result.checks.engineDetected
    ) {

        result.passed = false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "AUTHORITATIVE_BIODIESEL_RULE_ENGINE_NOT_AVAILABLE";

    } else if (
        !result.checks.evaluateFunctionAvailable
    ) {

        result.passed = false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "AUTHORITATIVE_EVALUATE_FUNCTION_NOT_AVAILABLE";

    } else if (
        !result.checks.deriveSolutionFunctionAvailable
    ) {

        result.passed = false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "AUTHORITATIVE_DERIVE_SOLUTION_FUNCTION_NOT_AVAILABLE";

    } else {

        const evaluation =
            evaluateBiodieselRules(
                state
            );

        result.evaluation =
            evaluation;

        result.checks.ruleEvaluationExecuted =
            true;

        result.checks.ruleVerified =
            evaluation.verified === true;

        result.passed =
            result.checks.ruleVerified;

        result.status =
            result.passed
                ? "BIODIESEL_INTEGRATION_TEST_PASSED"
                : "BIODIESEL_INTEGRATION_TEST_FAILED";

        if (!result.passed) {

            result.failureReason =
                evaluation.error ||
                evaluation.ruleStatus ||
                "AUTHORITATIVE_RULE_VERIFICATION_FAILED";
        }
    }

    const display =
        typeof document !== "undefined"
            ? document.getElementById(
                "domainIntegration"
            )
            : null;

    if (display) {

        display.textContent =
            JSON.stringify(
                result,
                null,
                2
            );
    }

    if (
        BIODIESEL_GLOBAL &&
        Array.isArray(
            BIODIESEL_GLOBAL.biodieselAuditLog
        )
    ) {

        BIODIESEL_GLOBAL
            .biodieselAuditLog
            .push({

                timestamp:
                    new Date()
                        .toISOString(),

                test:
                    result.test,

                status:
                    result.status,

                passed:
                    result.passed
            });
    }

    return result;
}

/* ============================================================
   BIODIESEL SELF-TEST
============================================================ */

function runBiodieselSelfTest() {

    const integration =
        runBiodieselIntegrationTest();

    const result = {

        test:
            "BIODIESEL_SELF_TEST",

        domain:
            BIODIESEL_DOMAIN,

        scenario:
            BIODIESEL_SCENARIO,

        passed:
            integration.passed === true,

        checks: {

            ruleRegistry:
                integration
                    .checks
                    ?.ruleRegistry === true,

            registryValidation:
                integration
                    .checks
                    ?.registryValid === true,

            integration:
                integration.passed === true,

            ruleEngineDetected:
                integration
                    .checks
                    ?.engineDetected === true,

            ruleEvaluation:
                integration
                    .checks
                    ?.ruleVerified === true,

            safetyBoundary:
                integration
                    .safetyBoundary
                    ?.physicalExecution === false,

            humanAuthority:
                integration
                    .safetyBoundary
                    ?.humanAuthorizationRequired === true
        }
    };

    result.status =
        result.passed
            ? "BIODIESEL_SELF_TEST_PASSED"
            : "BIODIESEL_SELF_TEST_FAILED";

    result.failedTests =
        Object.values(
            result.checks
        ).filter(
            value => value !== true
        ).length;

    return result;
}

/* ============================================================
   SELF-TEST + CORRECTIVE ACTION
============================================================ */

function runBiodieselSelfTestAndCorrectiveAction() {

    const selfTest =
        runBiodieselSelfTest();

    const result = {

        test:
            "BIODIESEL_SELF_TEST_CORRECTIVE_ACTION",

        selfTest,

        correctiveAction: {

            executed: false,

            physicalExecution: false,

            automaticExecution: false,

            action:
                selfTest.passed
                    ? "NO_CORRECTIVE_ACTION_REQUIRED"
                    : "REQUEST_ADDITIONAL_DIAGNOSTICS"
        },

        humanAuthorizationRequired:
            true
    };

    result.retest =
        runBiodieselSelfTest();

    result.passed =
        result.retest.passed === true;

    result.status =
        result.passed
            ? "BIODIESEL_CORRECTIVE_RETEST_PASSED"
            : "BIODIESEL_CORRECTIVE_RETEST_FAILED";

    return result;
}

/* ============================================================
   PUBLIC API
============================================================ */

const BiodieselDomainIntegrationAPI = {

    version:
        BIODIESEL_INTEGRATION_VERSION,

    domain:
        BIODIESEL_DOMAIN,

    scenario:
        BIODIESEL_SCENARIO,

    getBiodieselRuleRegistry,

    getBiodieselRuleAPI,

    getBiodieselRegistryStatus,

    getBiodieselEngineStatus,

    getBiodieselIntensity,

    createBiodieselState,

    validateBiodieselRegistry,

    evaluateBiodieselRules,

    deriveBiodieselSolution,

    runBiodieselDomain,

    runBiodieselIntegrationTest,

    runBiodieselSelfTest,

    runBiodieselSelfTestAndCorrectiveAction
};

/* ============================================================
   BROWSER EXPORT
============================================================ */

if (
    typeof window !== "undefined"
) {

    window.BiodieselDomainIntegrationAPI =
        BiodieselDomainIntegrationAPI;

    window.runBiodieselDomain =
        runBiodieselDomain;

    window.runBiodieselIntegrationTest =
        runBiodieselIntegrationTest;

    window.runBiodieselSelfTest =
        runBiodieselSelfTest;

    window.runBiodieselSelfTestAndCorrectiveAction =
        runBiodieselSelfTestAndCorrectiveAction;
}

/* ============================================================
   GLOBAL EXPORT
============================================================ */

if (
    BIODIESEL_GLOBAL
) {

    BIODIESEL_GLOBAL
        .BiodieselDomainIntegrationAPI =
            BiodieselDomainIntegrationAPI;
}