/**
 * Sextant Protocol™ Optimizer
 * Biodiesel Domain Integration
 *
 * Phase 2 — Authoritative Rule Engine Wiring
 *
 * PURPOSE:
 * Connects the Optimizer cockpit to the existing
 * authoritative Biodiesel Rule Engine.
 *
 * IMPORTANT:
 * - No Biodiesel rules are duplicated here.
 * - BiodieselRuleEngine remains authoritative.
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
    "2.0.0";

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
   AUTHORITATIVE ENGINE DISCOVERY
============================================================ */

/**
 * The authoritative engine is:
 *
 * window.BiodieselRuleEngine
 *
 * Compatibility aliases are supported only so that
 * existing cockpit wiring does not break.
 *
 * NO RULES ARE IMPLEMENTED HERE.
 */

function getBiodieselRuleAPI() {

    if (
        BIODIESEL_GLOBAL &&
        BIODIESEL_GLOBAL.BiodieselRuleEngine
    ) {

        return BIODIESEL_GLOBAL.BiodieselRuleEngine;
    }

    if (
        BIODIESEL_GLOBAL &&
        BIODIESEL_GLOBAL.BiodieselRuleAPI
    ) {

        return BIODIESEL_GLOBAL.BiodieselRuleAPI;
    }

    if (
        BIODIESEL_GLOBAL &&
        BIODIESEL_GLOBAL.BiodieselIntegrationAPI
    ) {

        return BIODIESEL_GLOBAL.BiodieselIntegrationAPI;
    }

    return null;
}

/* ============================================================
   AUTHORITATIVE ENGINE STATUS
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
        Number(
            slider.value
        );

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
   AUTHORITATIVE RULE EVALUATION
============================================================ */

/**
 * IMPORTANT:
 *
 * BiodieselRuleEngine.evaluate()
 * expects:
 *
 * evaluate(scenario, state)
 *
 * NOT:
 *
 * evaluate(domain, scenario, state)
 *
 * The integration layer does not alter the rule logic.
 */

function evaluateBiodieselRules(
    state =
        createBiodieselState()
) {

    const ruleAPI =
        getBiodieselRuleAPI();

    if (!ruleAPI) {

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
        typeof ruleAPI.evaluate !==
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
            ruleAPI.evaluate(
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

    const ruleAPI =
        getBiodieselRuleAPI();

    if (!ruleAPI) {

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
        typeof ruleAPI.deriveSolution !==
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

        /**
         * Authoritative engine signature:
         *
         * deriveSolution(
         *     scenario,
         *     state
         * )
         *
         * The existing engine derives the decision
         * from the authoritative rule evaluation.
         *
         * The assessment parameter is retained at
         * the integration boundary for future
         * cockpit compatibility but is not used
         * to modify authoritative rules.
         */

        const result =
            ruleAPI.deriveSolution(
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

    const engineStatus =
        getBiodieselEngineStatus();

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

            engineStatus,

            execution: {

                authorized:
                    false,

                physicalExecution:
                    false,

                automaticExecution:
                    false,

                humanAuthorizationRequired:
                    true
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

            engineStatus,

            ruleAssessment,

            execution: {

                authorized:
                    false,

                physicalExecution:
                    false,

                automaticExecution:
                    false,

                humanAuthorizationRequired:
                    true
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

            engineStatus,

            ruleAssessment,

            solution,

            execution: {

                authorized:
                    false,

                physicalExecution:
                    false,

                automaticExecution:
                    false,

                humanAuthorizationRequired:
                    true
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

        engineStatus,

        ruleAssessment,

        solution,

        execution: {

            authorized:
                false,

            physicalExecution:
                false,

            automaticExecution:
                false,

            humanAuthorizationRequired:
                true
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

    const engineStatus =
        getBiodieselEngineStatus();

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

        authoritativeEngine:
            engineStatus,

        safetyBoundary: {

            backendConnection:
                false,

            physicalExecution:
                false,

            automaticExecution:
                false,

            vesselActuation:
                false,

            externalConnection:
                false,

            humanAuthorizationRequired:
                true
        },

        checks: {

            engineDetected:
                engineStatus.available,

            evaluateFunctionAvailable:
                engineStatus.evaluateAvailable,

            deriveSolutionFunctionAvailable:
                engineStatus.deriveSolutionAvailable
        }
    };

    /* --------------------------------------------------------
       ENGINE AVAILABILITY CHECK
    -------------------------------------------------------- */

    if (
        !engineStatus.available
    ) {

        result.passed =
            false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "AUTHORITATIVE_BIODIESEL_RULE_ENGINE_NOT_AVAILABLE";

    } else if (
        !engineStatus.evaluateAvailable
    ) {

        result.passed =
            false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "AUTHORITATIVE_EVALUATE_FUNCTION_NOT_AVAILABLE";

    } else if (
        !engineStatus.deriveSolutionAvailable
    ) {

        result.passed =
            false;

        result.status =
            "BIODIESEL_INTEGRATION_TEST_FAILED";

        result.failureReason =
            "AUTHORITATIVE_DERIVE_SOLUTION_FUNCTION_NOT_AVAILABLE";

    } else {

        /* ----------------------------------------------------
           LIVE AUTHORITATIVE RULE TEST
        ---------------------------------------------------- */

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
            evaluation.verified === true;

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

    /* --------------------------------------------------------
       DISPLAY RESULT
    -------------------------------------------------------- */

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

    /* --------------------------------------------------------
       AUDIT EVENT
    -------------------------------------------------------- */

    if (
        BIODIESEL_GLOBAL &&
        Array.isArray(
            BIODIESEL_GLOBAL
                .biodieselAuditLog
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

            integration:
                integration.passed === true,

            ruleEngineDetected:
                integration
                    .authoritativeEngine
                    ?.available === true,

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

/**
 * Corrective action is intentionally limited to
 * simulator state/reporting.
 *
 * It does NOT modify Biodiesel rules.
 * It does NOT execute a physical action.
 */

function runBiodieselSelfTestAndCorrectiveAction() {

    const selfTest =
        runBiodieselSelfTest();

    const result = {

        test:
            "BIODIESEL_SELF_TEST_CORRECTIVE_ACTION",

        selfTest,

        correctiveAction: {

            executed:
                false,

            physicalExecution:
                false,

            automaticExecution:
                false,

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

    getBiodieselRuleAPI,

    getBiodieselEngineStatus,

    getBiodieselIntensity,

    createBiodieselState,

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