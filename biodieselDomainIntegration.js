/**
 * Sextant Protocol™ Optimizer
 * Biodiesel Domain Integration
 *
 * Phase 1 — JavaScript Simulator Wiring
 *
 * PURPOSE:
 * Connects the Optimizer cockpit to the existing
 * authoritative Biodiesel domain engine.
 *
 * IMPORTANT:
 * - No Biodiesel rules are duplicated here.
 * - Existing Biodiesel rule files remain authoritative.
 * - No backend connection.
 * - No Python.
 * - No physical execution.
 * - Human authorization remains mandatory.
 * - This file is simulator integration only.
 */

"use strict";

/* ============================================================
   BIODIESEL DOMAIN IDENTITY
============================================================ */

const BIODIESEL_DOMAIN = "ENERGY";

const BIODIESEL_SCENARIO =
    "BIODIESEL_SHORTAGE";

/* ============================================================
   AUTHORITATIVE ENGINE DISCOVERY
============================================================ */

function getBiodieselRuleAPI() {

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
        return window.getOptimizationIntensity();
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
        energy: intensity
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
            domain: BIODIESEL_DOMAIN,
            scenario: BIODIESEL_SCENARIO,
            error:
                "BIODIESEL_RULE_API_NOT_AVAILABLE"
        };
    }

    try {

        if (
            typeof ruleAPI.evaluate ===
            "function"
        ) {

            return ruleAPI.evaluate(
                BIODIESEL_DOMAIN,
                BIODIESEL_SCENARIO,
                state
            );
        }

        if (
            typeof ruleAPI.evaluateBiodieselRules ===
            "function"
        ) {

            return ruleAPI.evaluateBiodieselRules(
                state
            );
        }

        return {
            verified: false,
            domain: BIODIESEL_DOMAIN,
            scenario: BIODIESEL_SCENARIO,
            error:
                "BIODIESEL_RULE_EVALUATOR_NOT_AVAILABLE"
        };

    } catch (error) {

        return {
            verified: false,
            domain: BIODIESEL_DOMAIN,
            scenario: BIODIESEL_SCENARIO,
            error:
                "BIODIESEL_RULE_EVALUATION_FAILED",
            message:
                error?.message ||
                "Unknown Biodiesel rule error."
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
            domain: BIODIESEL_DOMAIN,
            scenario: BIODIESEL_SCENARIO,
            error:
                "BIODIESEL_RULE_API_NOT_AVAILABLE"
        };
    }

    try {

        if (
            typeof ruleAPI.deriveSolution ===
            "function"
        ) {

            return ruleAPI.deriveSolution(
                BIODIESEL_DOMAIN,
                BIODIESEL_SCENARIO,
                state,
                assessment
            );
        }

        if (
            typeof ruleAPI.deriveBiodieselSolution ===
            "function"
        ) {

            return ruleAPI.deriveBiodieselSolution(
                state,
                assessment
            );
        }

        return {
            valid: false,
            domain: BIODIESEL_DOMAIN,
            scenario: BIODIESEL_SCENARIO,
            error:
                "BIODIESEL_SOLUTION_DERIVER_NOT_AVAILABLE"
        };

    } catch (error) {

        return {
            valid: false,
            domain: BIODIESEL_DOMAIN,
            scenario: BIODIESEL_SCENARIO,
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

            ruleAssessment
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

            ruleAssessment,

            solution
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

        domain:
            BIODIESEL_DOMAIN,

        scenario:
            BIODIESEL_SCENARIO,

        intensity,

        ruleAPIAvailable:
            ruleAPI !== null,

        existingEngineDetected:
            ruleAPI !== null,

        state,

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

    result.passed =
        result.ruleAPIAvailable;

    result.status =
        result.passed
            ? "BIODIESEL_INTEGRATION_TEST_PASSED"
            : "BIODIESEL_INTEGRATION_TEST_FAILED";

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

    return result;
}

/* ============================================================
   PUBLIC API
============================================================ */

const BiodieselDomainIntegrationAPI = {

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

    runBiodieselIntegrationTest
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
}