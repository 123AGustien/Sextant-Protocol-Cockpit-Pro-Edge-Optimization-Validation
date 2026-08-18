/**
 * Sextant Protocol™ Optimizer
 * Domain Integration Layer
 *
 * Phase 1 — JavaScript Simulator Wiring
 *
 * PURPOSE:
 * Cockpit → Domain Integration → Authoritative Rules
 * → Solution → Validation / Audit
 *
 * IMPORTANT:
 * - JavaScript simulator only.
 * - No Python backend.
 * - No backend connection.
 * - No domain rules are duplicated here.
 * - Existing engines remain authoritative.
 * - No physical execution.
 * - Human authorization remains mandatory.
 * - Optimization intensity is read from the existing
 *   simulator intensity control as the single source of truth.
 */

"use strict";

/* ============================================================
   DOMAIN REGISTRY
============================================================ */

const DOMAIN_REGISTRY = Object.freeze({
    FIN: "FIN",
    BHR: "BHR",
    ENERGY: "ENERGY",
    FX: "FX",
    DC: "DC",
    CYB: "CYB",
    INF: "INF",
    ENG: "ENG",
    OPS: "OPS"
});

const DOMAIN_ENGINES = new Map();

/* ============================================================
   DOMAIN NORMALIZATION
============================================================ */

function normalizeDomain(domain) {

    if (typeof domain !== "string") {
        throw new Error("Domain must be a string.");
    }

    return domain.trim().toUpperCase();
}

/* ============================================================
   DOMAIN ENGINE REGISTRATION
============================================================ */

function registerDomainEngine(domain, engine) {

    const normalizedDomain =
        normalizeDomain(domain);

    if (
        !Object.values(DOMAIN_REGISTRY)
            .includes(normalizedDomain)
    ) {
        throw new Error(
            `Unknown domain: ${normalizedDomain}`
        );
    }

    if (
        !engine ||
        typeof engine !== "object"
    ) {
        throw new Error(
            `Invalid engine for domain: ${normalizedDomain}`
        );
    }

    DOMAIN_ENGINES.set(
        normalizedDomain,
        engine
    );

    return {
        domain: normalizedDomain,
        registered: true,
        status: "ACTIVE"
    };
}

/* ============================================================
   DOMAIN STATUS
============================================================ */

function getDomainStatus(domain) {

    const normalizedDomain =
        normalizeDomain(domain);

    const registered =
        DOMAIN_ENGINES.has(
            normalizedDomain
        );

    return {
        domain: normalizedDomain,
        registered,
        status: registered
            ? "ACTIVE"
            : "PLANNED"
    };
}

function getRegisteredDomains() {

    return Array.from(
        DOMAIN_ENGINES.keys()
    );
}

/* ============================================================
   AUTHORITATIVE RULE API
============================================================ */

function getAuthoritativeRuleAPI() {

    if (
        typeof window !== "undefined" &&
        window.DomainRulesAPI
    ) {
        return window.DomainRulesAPI;
    }

    if (
        typeof globalThis !== "undefined" &&
        globalThis.DomainRulesAPI
    ) {
        return globalThis.DomainRulesAPI;
    }

    return null;
}

/* ============================================================
   INTENSITY — SINGLE SOURCE OF TRUTH
============================================================ */

let optimizationIntensity = 50;

function getOptimizationIntensity() {

    const slider =
        document.getElementById(
            "optimizationIntensity"
        );

    if (!slider) {
        return optimizationIntensity;
    }

    const value =
        Number(slider.value);

    if (!Number.isFinite(value)) {
        return optimizationIntensity;
    }

    optimizationIntensity =
        Math.max(
            0,
            Math.min(100, value)
        );

    return optimizationIntensity;
}

/* ============================================================
   INTENSITY DISPLAY WIRING
============================================================ */

function updateOptimizationIntensity() {

    const intensity =
        getOptimizationIntensity();

    const valueDisplay =
        document.getElementById(
            "intensityValue"
        );

    const fill =
        document.getElementById(
            "fill"
        );

    if (valueDisplay) {
        valueDisplay.textContent =
            `${intensity}%`;
    }

    if (fill) {
        fill.style.width =
            `${intensity}%`;
    }

    updateDomainMonitor(
        intensity
    );

    return intensity;
}

/* ============================================================
   DOMAIN MONITOR
============================================================ */

function updateDomainMonitor(
    intensity = getOptimizationIntensity()
) {

    const domainElements = [
        "domainQuantization",
        "domainPruning",
        "domainGraph",
        "domainMemory",
        "domainKernel",
        "domainRuntime"
    ];

    domainElements.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                `${intensity}`;
        }
    });

    return intensity;
}

/* ============================================================
   INPUT VERIFICATION
============================================================ */

function verifyDomainInput(
    domain,
    scenarioState = {},
    intensity = getOptimizationIntensity()
) {

    const normalizedDomain =
        normalizeDomain(domain);

    if (
        !Object.values(DOMAIN_REGISTRY)
            .includes(normalizedDomain)
    ) {
        return {
            verified: false,
            domain: normalizedDomain,
            error: "UNKNOWN_DOMAIN"
        };
    }

    if (
        scenarioState === null ||
        typeof scenarioState !== "object"
    ) {
        return {
            verified: false,
            domain: normalizedDomain,
            error: "INVALID_SCENARIO_STATE"
        };
    }

    const numericIntensity =
        Number(intensity);

    if (
        !Number.isFinite(
            numericIntensity
        )
    ) {
        return {
            verified: false,
            domain: normalizedDomain,
            error: "INVALID_INTENSITY"
        };
    }

    return {
        verified: true,
        domain: normalizedDomain,
        scenarioState,
        intensity:
            Math.max(
                0,
                Math.min(
                    100,
                    numericIntensity
                )
            )
    };
}

/* ============================================================
   SCENARIO VERIFICATION
============================================================ */

function verifyScenarioInput(
    domain,
    scenario,
    scenarioState = {},
    intensity = getOptimizationIntensity()
) {

    const verification =
        verifyDomainInput(
            domain,
            scenarioState,
            intensity
        );

    if (!verification.verified) {
        return verification;
    }

    if (
        typeof scenario !== "string" ||
        !scenario.trim()
    ) {
        return {
            verified: false,
            domain: verification.domain,
            error: "INVALID_SCENARIO"
        };
    }

    return {
        verified: true,
        domain: verification.domain,
        scenario:
            scenario.trim().toUpperCase(),
        scenarioState,
        intensity:
            verification.intensity
    };
}

/* ============================================================
   AUTHORITATIVE RULE EVALUATION
============================================================ */

function evaluateAuthoritativeRules(
    domain,
    scenario,
    scenarioState
) {

    const ruleAPI =
        getAuthoritativeRuleAPI();

    if (!ruleAPI) {

        return {
            verified: false,
            domain,
            scenario,
            error:
                "AUTHORITATIVE_RULE_API_NOT_AVAILABLE"
        };
    }

    if (
        typeof ruleAPI.evaluate !==
        "function"
    ) {

        return {
            verified: false,
            domain,
            scenario,
            error:
                "AUTHORITATIVE_RULE_EVALUATOR_NOT_AVAILABLE"
        };
    }

    try {

        const result =
            ruleAPI.evaluate(
                domain,
                scenario,
                scenarioState
            );

        return {
            ...result,
            verified:
                result?.verified === true
        };

    } catch (error) {

        return {
            verified: false,
            domain,
            scenario,
            error:
                "AUTHORITATIVE_RULE_EVALUATION_FAILED",
            message:
                error?.message ||
                "Unknown rule evaluation error."
        };
    }
}

/* ============================================================
   AUTHORITATIVE SOLUTION
============================================================ */

function deriveAuthoritativeSolution(
    domain,
    scenario,
    scenarioState,
    assessment = {}
) {

    const ruleAPI =
        getAuthoritativeRuleAPI();

    if (!ruleAPI) {

        return {
            valid: false,
            error:
                "AUTHORITATIVE_RULE_API_NOT_AVAILABLE"
        };
    }

    if (
        typeof ruleAPI.deriveSolution !==
        "function"
    ) {

        return {
            valid: false,
            error:
                "AUTHORITATIVE_SOLUTION_DERIVER_NOT_AVAILABLE"
        };
    }

    try {

        return ruleAPI.deriveSolution(
            domain,
            scenario,
            scenarioState,
            assessment
        );

    } catch (error) {

        return {
            valid: false,
            domain,
            scenario,
            error:
                "AUTHORITATIVE_SOLUTION_DERIVATION_FAILED",
            message:
                error?.message ||
                "Unknown solution derivation error."
        };
    }
}

/* ============================================================
   ROUTE SCENARIO
============================================================ */

function routeDomainScenario({
    domain,
    scenario,
    scenarioState = {},
    intensity = getOptimizationIntensity(),
    assessment = {}
}) {

    const verification =
        verifyScenarioInput(
            domain,
            scenario,
            scenarioState,
            intensity
        );

    if (!verification.verified) {

        return {
            status:
                "DOMAIN_INPUT_VERIFICATION_FAILED",
            verification
        };
    }

    const ruleAssessment =
        evaluateAuthoritativeRules(
            verification.domain,
            verification.scenario,
            scenarioState
        );

    if (!ruleAssessment.verified) {

        return {
            status:
                "DOMAIN_RULE_VERIFICATION_FAILED",
            verification,
            ruleAssessment
        };
    }

    const solution =
        deriveAuthoritativeSolution(
            verification.domain,
            verification.scenario,
            scenarioState,
            assessment
        );

    if (solution.valid !== true) {

        return {
            status:
                "DOMAIN_SOLUTION_DERIVATION_FAILED",
            verification,
            ruleAssessment,
            solution
        };
    }

    return {

        status:
            "DOMAIN_SCENARIO_VALIDATED",

        domain:
            verification.domain,

        scenario:
            verification.scenario,

        intensity:
            verification.intensity,

        verification,

        ruleAssessment,

        solution,

        execution: {
            authorized: false,
            physicalExecution: false,
            humanAuthorizationRequired: true
        }
    };
}

/* ============================================================
   REGISTER EXISTING RULE API
============================================================ */

function registerExistingDomainEngines() {

    const ruleAPI =
        getAuthoritativeRuleAPI();

    if (!ruleAPI) {
        return [];
    }

    /*
     * ENERGY owns BIODIESEL_SHORTAGE in the
     * authoritative rules.
     *
     * We therefore register ENERGY rather than
     * inventing a separate BIODIESEL rule engine.
     */

    registerDomainEngine(
        "FIN",
        ruleAPI
    );

    registerDomainEngine(
        "BHR",
        ruleAPI
    );

    registerDomainEngine(
        "ENERGY",
        ruleAPI
    );

    return getRegisteredDomains();
}

/* ============================================================
   DOMAIN INTEGRATION TEST
============================================================ */

function runDomainIntegrationTest() {

    const tests = [];

    const ruleAPI =
        getAuthoritativeRuleAPI();

    tests.push({
        test: "AUTHORITATIVE_RULE_API",
        passed:
            ruleAPI !== null
    });

    if (!ruleAPI) {

        return {
            status:
                "INTEGRATION_TEST_FAILED",
            passed: false,
            tests,
            registeredDomains:
                getRegisteredDomains()
        };
    }

    registerExistingDomainEngines();

    /* FIN */

    const fin =
        routeDomainScenario({
            domain: "FIN",
            scenario: "BANKING_STRESS",
            scenarioState: {
                fx: 50,
                inf: 50
            },
            intensity:
                getOptimizationIntensity(),
            assessment: {
                risk: "LOW"
            }
        });

    tests.push({
        test: "FIN_DOMAIN_ROUTE",
        passed:
            fin.status ===
            "DOMAIN_SCENARIO_VALIDATED"
    });

    /* BHR */

    const bhr =
        routeDomainScenario({
            domain: "BHR",
            scenario: "FORCED_LABOUR",
            scenarioState: {
                bhr: 50
            },
            intensity:
                getOptimizationIntensity(),
            assessment: {
                risk: "MEDIUM"
            }
        });

    tests.push({
        test: "BHR_DOMAIN_ROUTE",
        passed:
            bhr.status ===
            "DOMAIN_SCENARIO_VALIDATED"
    });

    /* ENERGY / BIODIESEL */

    const energy =
        routeDomainScenario({
            domain: "ENERGY",
            scenario: "BIODIESEL_SHORTAGE",
            scenarioState: {
                energy:
                    getOptimizationIntensity()
            },
            intensity:
                getOptimizationIntensity(),
            assessment: {
                risk: "MEDIUM"
            }
        });

    tests.push({
        test:
            "ENERGY_BIODIESEL_DOMAIN_ROUTE",
        passed:
            energy.status ===
            "DOMAIN_SCENARIO_VALIDATED"
    });

    const passed =
        tests.every(
            test => test.passed
        );

    const result = {

        status:
            passed
                ? "INTEGRATION_TEST_PASSED"
                : "INTEGRATION_TEST_FAILED",

        passed,

        intensity:
            getOptimizationIntensity(),

        tests,

        registeredDomains:
            getRegisteredDomains(),

        safetyBoundary: {
            backendConnection: false,
            physicalExecution: false,
            automaticExecution: false,
            humanAuthorizationRequired: true
        }
    };

    const display =
        document.getElementById(
            "domainIntegration"
        );

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
   RESET INTENSITY
============================================================ */

function resetOptimizationIntensity() {

    const slider =
        document.getElementById(
            "optimizationIntensity"
        );

    if (slider) {
        slider.value = "50";
    }

    optimizationIntensity = 50;

    updateOptimizationIntensity();

    return optimizationIntensity;
}

/* ============================================================
   BROWSER API
============================================================ */

if (typeof window !== "undefined") {

    window.DomainIntegrationAPI = {

        DOMAIN_REGISTRY,

        registerDomainEngine,

        getDomainStatus,

        getRegisteredDomains,

        getOptimizationIntensity,

        updateOptimizationIntensity,

        updateDomainMonitor,

        verifyDomainInput,

        verifyScenarioInput,

        evaluateAuthoritativeRules,

        deriveAuthoritativeSolution,

        routeDomainScenario,

        registerExistingDomainEngines,

        runDomainIntegrationTest,

        resetOptimizationIntensity
    };

    /*
     * Existing HTML controls can use these
     * without changing the screen layout.
     */

    window.getOptimizationIntensity =
        getOptimizationIntensity;

    window.updateOptimizationIntensity =
        updateOptimizationIntensity;

    window.updateDomainMonitor =
        updateDomainMonitor;

    window.runDomainIntegrationTest =
        runDomainIntegrationTest;

    window.resetOptimizationIntensity =
        resetOptimizationIntensity;
}

/* ============================================================
   INITIALIZE
============================================================ */

if (
    typeof document !== "undefined"
) {

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            const slider =
                document.getElementById(
                    "optimizationIntensity"
                );

            if (slider) {

                slider.addEventListener(
                    "input",
                    updateOptimizationIntensity
                );

                slider.addEventListener(
                    "change",
                    updateOptimizationIntensity
                );

                updateOptimizationIntensity();
            }

            registerExistingDomainEngines();
        }
    );
}