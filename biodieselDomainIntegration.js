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
 * - Biodiesel rules remain authoritative in BiodieselRuleEngine.
 * - No Biodiesel rules are duplicated here.
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
   AUTHORITATIVE ENGINE DISCOVERY
============================================================ */

/**
 * Locate the existing authoritative Biodiesel Rule Engine.
 *
 * Authoritative priority:
 *
 * 1. BiodieselRuleEngine
 * 2. BiodieselRuleAPI
 * 3. BiodieselIntegrationAPI
 *
 * No rules are implemented in this integration layer.
 */

function getBiodieselRuleAPI() {

    if (
        typeof window !== "undefined" &&
        window.BiodieselRuleEngine
    ) {
        return window.BiodieselRuleEngine;
    }

    if (
        typeof window !== "undefined" &&
        window.BiodieselRuleAPI
    ) {
        return window.BiodieselRuleAPI;
    }

    if (
        typeof window !== "undefined" &&
        window.BiodieselIntegrationAPI
    ) {
        return window.BiodieselIntegrationAPI;
    }

    if (
        typeof globalThis !== "undefined" &&
        globalThis.BiodieselRuleEngine
    ) {
        return globalThis.BiodieselRuleEngine;
    }

    if (
        typeof globalThis !== "undefined" &&
        globalThis.BiodieselRuleAPI
    ) {
        return globalThis.BiodieselRuleAPI;
    }

    if (
        typeof globalThis !== "undefined" &&
        globalThis.BiodieselIntegrationAPI
    ) {
        return globalThis.BiodieselIntegrationAPI;
    }

    return null;
}

/* ============================================================
   INTENSITY — EXISTING SIMULATOR SOURCE OF TRUTH
============================================================ */

function getBiodieselIntensity() {

    if (
        typeof window !== "undefined" &&
        typeof window.getOptimizationIntensity ===
            "function"
    ) {
        const value =
            Number(
                window.getOptimizationIntensity()
            );

        if (Number.isFinite(value)) {

            return Math.max(
                0,
                Math.min(100, value)
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

    if (!Number.isFinite(value)) {

        return 50;
    }

    return Math.max(
        0,
        Math.min(100, value)
    );
}

/* ============================================================
   BIODIESEL STATE
============================================================ */

function createBiodieselState(
    intensity = getBiodieselIntensity()
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

function evaluateBiodieselRules(
    state = createBiodieselState()
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

            error:
                "BIODIESEL_RULE_ENGINE_NOT_AVAILABLE"
        };
    }

    try {

        /* ----------------------------------------------------
           AUTHORITATIVE ENGINE
        ---------------------------------------------------- */

        if (
            typeof ruleAPI.evaluate ===
            "function"
        ) {

            const result =
                ruleAPI.evaluate(
                    BIODIESEL_SCENARIO,
                    state
                );

            if (
                result &&
                typeof result === "object"
            ) {

                return result;
            }
        }

        /* ----------------------------------------------------
           LEGACY COMPATIBILITY
        ---------------------------------------------------- */

        if (
            typeof ruleAPI.evaluateBiodieselRules ===
            "function"
        ) {

            const result =
                ruleAPI.evaluateBiodieselRules(
                    state
                );

            if (
                result &&
                typeof result === "object"
            ) {

                return result;
            }
        }

        return {

            verified: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            error:
                "BIODIESEL_RULE_EVALUATOR_NOT_AVAILABLE"
        };

    } catch (error) {

        return {

            verified: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            error:
                "BIODIESEL_RULE_EVALUATION_FAILED",

            message:
                error?.message ||
                "Unknown Biodiesel rule evaluation error."
        };
    }
}

/* ============================================================
   AUTHORITATIVE SOLUTION
============================================================ */

function deriveBiodieselSolution(
    state = createBiodieselState(),
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

    try {

        /* ----------------------------------------------------
           AUTHORITATIVE ENGINE
        ---------------------------------------------------- */

        if (
            typeof ruleAPI.deriveSolution ===
            "function"
        ) {

            const result =
                ruleAPI.deriveSolution(
                    BIODIESEL_SCENARIO,
                    state
                );

            if (
                result &&
                typeof result === "object"
            ) {

                /*
                 * The authoritative engine returns the
                 * Captain AI Lena decision object.
                 *
                 * Add integration validity without
                 * modifying the authoritative rule result.
                 */

                return {

                    valid:
                        result.ruleVerified === true,

                    domain:
                        result.domain ||
                        BIODIESEL_DOMAIN,

                    scenario:
                        result.scenario ||
                        BIODIESEL_SCENARIO,

                    ...result
                };
            }
        }

        /* ----------------------------------------------------
           LEGACY COMPATIBILITY
        ---------------------------------------------------- */

        if (
            typeof ruleAPI.deriveBiodieselSolution ===
            "function"
        ) {

            const result =
                ruleAPI.deriveBiodieselSolution(
                    state,
                    assessment
                );

            if (
                result &&
                typeof result === "object"
            ) {

                return {

                    valid:
                        result.valid === true ||
                        result.ruleVerified === true,

                    domain:
                        result.domain ||
                        BIODIESEL_DOMAIN,

                    scenario:
                        result.scenario ||
                        BIODIESEL_SCENARIO,

                    ...result
                };
            }
        }

        return {

            valid: false,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            error:
                "BIODIESEL_SOLUTION_DERIVER_NOT_AVAILABLE"
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

    const ruleAssessment =
        evaluateBiodieselRules(
            state
        );

    /* --------------------------------------------------------
       RULE VERIFICATION GATE
    -------------------------------------------------------- */

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

            ruleAssessment,

            execution: {

                authorized: false,

                physicalExecution: false,

                automaticExecution: false,

                humanAuthorizationRequired: true
            }
        };
    }

    /* --------------------------------------------------------
       AUTHORITATIVE SOLUTION
    -------------------------------------------------------- */

    const solution =
        deriveBiodieselSolution(
            state,
            assessment
        );

    /* --------------------------------------------------------
       SOLUTION VALIDATION GATE
    -------------------------------------------------------- */

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

    /* --------------------------------------------------------
       FULL VALIDATED RESULT
    -------------------------------------------------------- */

    return {

        status:
            "BIODIESEL_DOMAIN_VALIDATED",

        integrationVersion:
            BIODIESEL_INTEGRATION_VERSION,

        domain:
            BIODIESEL_DOMAIN,

        scenario:
            BIODIESEL_SCENARIO,

        intensity,

        state,

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

    const ruleAPI =
        getBiodieselRuleAPI();

    const result = {

        test:
            "BIODIESEL_DOMAIN_INTEGRATION",

        integrationVersion:
            BIODIESEL_INTEGRATION_VERSION,

        domain:
            BIODIESEL_DOMAIN,

        scenario:
            BIODIESEL_SCENARIO,

        intensity,

        state,

        ruleAPIAvailable:
            ruleAPI !== null,

        authoritativeEngineDetected:
            Boolean(
                ruleAPI &&
                (
                    typeof ruleAPI.evaluate ===
                        "function" ||
                    typeof ruleAPI.evaluateBiodieselRules ===
                        "function"
                )
            ),

        solutionEngineDetected:
            Boolean(
                ruleAPI &&
                (
                    typeof ruleAPI.deriveSolution ===
                        "function" ||
                    typeof ruleAPI.deriveBiodieselSolution ===
                        "function"
                )
            ),

        safetyBoundary: {

            backendConnection:
                false,

            physicalExecution:
                false,

            automaticExecution:
                false,

            humanAuthorizationRequired:
                true
        }
    };

    /* --------------------------------------------------------
       TEST RESULT
    -------------------------------------------------------- */

    result.passed =
        result.ruleAPIAvailable &&
        result.authoritativeEngineDetected &&
        result.solutionEngineDetected &&
        result.safetyBoundary.backendConnection === false &&
        result.safetyBoundary.physicalExecution === false &&
        result.safetyBoundary.automaticExecution === false &&
        result.safetyBoundary.humanAuthorizationRequired === true;

    result.status =
        result.passed
            ? "BIODIESEL_INTEGRATION_TEST_PASSED"
            : "BIODIESEL_INTEGRATION_TEST_FAILED";

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
       AUDIT LOG
    -------------------------------------------------------- */

    if (
        typeof window !== "undefined" &&
        Array.isArray(
            window.biodieselAuditLog
        )
    ) {

        window.biodieselAuditLog.push({

            timestamp:
                new Date().toISOString(),

            message:
                result.passed
                    ? "Biodiesel domain integration test PASS."
                    : "Biodiesel domain integration test FAIL.",

            status:
                result.status
        });
    }

    return result;
}

/* ============================================================
   FULL BIODIESEL SELF-TEST
============================================================ */

function runBiodieselSelfTest() {

    const integration =
        runBiodieselIntegrationTest();

    const result = {

        test:
            "BIODIESEL_DOMAIN_SELF_TEST",

        integration,

        checks: {

            ruleEngineDetected:
                integration.authoritativeEngineDetected,

            solutionEngineDetected:
                integration.solutionEngineDetected,

            intensityAvailable:
                Number.isFinite(
                    integration.intensity
                ),

            stateCreated:
                Boolean(
                    integration.state
                ),

            safetyBoundaryIntact:
                integration.safetyBoundary
                    .backendConnection === false &&
                integration.safetyBoundary
                    .physicalExecution === false &&
                integration.safetyBoundary
                    .automaticExecution === false &&
                integration.safetyBoundary
                    .humanAuthorizationRequired === true
        }
    };

    result.passed =
        integration.passed &&
        result.checks.ruleEngineDetected &&
        result.checks.solutionEngineDetected &&
        result.checks.intensityAvailable &&
        result.checks.stateCreated &&
        result.checks.safetyBoundaryIntact;

    result.status =
        result.passed
            ? "BIODIESEL_SELF_TEST_PASSED"
            : "BIODIESEL_SELF_TEST_FAILED";

    return result;
}

/* ============================================================
   SELF-TEST + CORRECTIVE ACTION
============================================================ */

function runBiodieselSelfTestCorrectiveAction() {

    const selfTest =
        runBiodieselSelfTest();

    /*
     * No automatic modification of the authoritative
     * Biodiesel Rule Engine is permitted.
     *
     * Corrective action is limited to reporting.
     */

    const result = {

        status:
            selfTest.passed
                ? "BIODIESEL_SELF_TEST_PASS"
                : "BIODIESEL_CORRECTIVE_ACTION_REQUIRED",

        selfTest,

        correctiveAction:
            selfTest.passed
                ? "NO_CORRECTIVE_ACTION_REQUIRED"
                : "INSPECT_AUTHORITATIVE_BIODIESEL_ENGINE_AND_SCRIPT_LOAD_ORDER",

        automaticModification:
            false,

        physicalExecution:
            false,

        humanAuthorizationRequired:
            true
    };

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

    getBiodieselIntensity,

    createBiodieselState,

    evaluateBiodieselRules,

    deriveBiodieselSolution,

    runBiodieselDomain,

    runBiodieselIntegrationTest,

    runBiodieselSelfTest,

    runBiodieselSelfTestCorrectiveAction
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

    window.runBiodieselSelfTestCorrectiveAction =
        runBiodieselSelfTestCorrectiveAction;
}