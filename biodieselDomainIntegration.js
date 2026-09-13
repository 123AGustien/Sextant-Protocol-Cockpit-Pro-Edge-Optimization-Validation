/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL DOMAIN INTEGRATION
   ENERGY DOMAIN
   Captain AI Lena Decision Support
   LOCAL DETERMINISTIC SIMULATOR

   VERSION: 2.1.0

   GOLDEN RULE:
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   SAFETY:
   - Backend connection: DISABLED
   - Physical execution: DISABLED
   - Automatic execution: DISABLED
   - Vessel actuation: DISABLED
   - External connection: DISABLED
   - Human authorization: REQUIRED
   ============================================================ */

(function (global) {

    "use strict";

    const BIODIESEL_DOMAIN = "ENERGY";
    const BIODIESEL_SCENARIO = "BIODIESEL_SHORTAGE";
    const BIODIESEL_INTEGRATION_VERSION = "2.1.0";


    /* ========================================================
       AUTHORITATIVE REGISTRY DISCOVERY
    ======================================================== */

    function getBiodieselRegistry() {

        const registry =
            global.BiodieselRuleRegistry;

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
                registry.version || "UNKNOWN",
            getRulesAvailable:
                typeof registry.getBiodieselRules === "function",
            getScenarioRuleAvailable:
                typeof registry.getBiodieselScenarioRule === "function",
            validationAvailable:
                typeof registry.validateBiodieselRules === "function"
        };
    }


    /* ========================================================
       AUTHORITATIVE ENGINE DISCOVERY
    ======================================================== */

    function getBiodieselEngine() {

        const engine =
            global.BiodieselRuleEngine;

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
                engine.version || "1.0.0",
            evaluateAvailable:
                typeof engine.evaluate === "function",
            deriveSolutionAvailable:
                typeof engine.deriveSolution === "function"
        };
    }


    /* ========================================================
       REGISTRY STATUS
    ======================================================== */

    function getBiodieselRegistryStatus() {

        return getBiodieselRegistry();
    }


    /* ========================================================
       ENGINE STATUS
    ======================================================== */

    function getBiodieselEngineStatus() {

        return getBiodieselEngine();
    }


    /* ========================================================
       BIODIESEL INTENSITY
    ======================================================== */

    function getBiodieselIntensity() {

        return 50;
    }


    /* ========================================================
       CREATE AUTHORITATIVE BIODIESEL STATE
    ======================================================== */

    function createBiodieselState(
        intensity = getBiodieselIntensity()
    ) {

        const energy =
            Number.isFinite(Number(intensity))
                ? Number(intensity)
                : 50;

        return {
            energy: energy
        };
    }


    /* ========================================================
       VALIDATE AUTHORITATIVE REGISTRY
    ======================================================== */

    function validateBiodieselRegistry() {

        const registry =
            global.BiodieselRuleRegistry;

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

        const result =
            registry.validateBiodieselRules();

        return {
            valid:
                result &&
                result.valid === true,
            result: result
        };
    }


    /* ========================================================
       AUTHORITATIVE RULE EVALUATION
    ======================================================== */

    function evaluateBiodieselRules(
        scenario = BIODIESEL_SCENARIO,
        state = createBiodieselState()
    ) {

        const engine =
            global.BiodieselRuleEngine;

        if (!engine) {

            return {
                verified: false,
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
                error:
                    "BIODIESEL_RULE_ENGINE_EVALUATE_NOT_AVAILABLE"
            };
        }

        return engine.evaluate(
            scenario,
            state
        );
    }


    /* ========================================================
       CAPTAIN AI LENA SOLUTION DERIVATION
    ======================================================== */

    function deriveBiodieselSolution(
        scenario = BIODIESEL_SCENARIO,
        state = createBiodieselState()
    ) {

        const engine =
            global.BiodieselRuleEngine;

        if (!engine) {

            return {
                verified: false,
                error:
                    "BIODIESEL_RULE_ENGINE_NOT_AVAILABLE"
            };
        }

        if (
            typeof engine.deriveSolution !==
            "function"
        ) {

            return {
                verified: false,
                error:
                    "BIODIESEL_RULE_ENGINE_DERIVE_SOLUTION_NOT_AVAILABLE"
            };
        }

        return engine.deriveSolution(
            scenario,
            state
        );
    }


    /* ========================================================
       RUN BIODIESEL DOMAIN
    ======================================================== */

    function runBiodieselDomain(
        scenario = BIODIESEL_SCENARIO,
        state = createBiodieselState()
    ) {

        const registryStatus =
            getBiodieselRegistryStatus();

        const engineStatus =
            getBiodieselEngineStatus();

        if (!registryStatus.available) {

            return {
                domain:
                    BIODIESEL_DOMAIN,

                scenario:
                    scenario,

                state:
                    state,

                registry:
                    registryStatus,

                engine:
                    engineStatus,

                verified:
                    false,

                status:
                    "BIODIESEL_DOMAIN_FAILED",

                failureReason:
                    registryStatus.error
            };
        }

        if (!engineStatus.available) {

            return {
                domain:
                    BIODIESEL_DOMAIN,

                scenario:
                    scenario,

                state:
                    state,

                registry:
                    registryStatus,

                engine:
                    engineStatus,

                verified:
                    false,

                status:
                    "BIODIESEL_DOMAIN_FAILED",

                failureReason:
                    engineStatus.error
            };
        }

        const ruleEvaluation =
            evaluateBiodieselRules(
                scenario,
                state
            );

        const solution =
            deriveBiodieselSolution(
                scenario,
                state
            );

        return {
            domain:
                BIODIESEL_DOMAIN,

            scenario:
                scenario,

            state:
                state,

            registry:
                registryStatus,

            engine:
                engineStatus,

            ruleEvaluation:
                ruleEvaluation,

            solution:
                solution,

            verified:
                Boolean(
                    ruleEvaluation &&
                    ruleEvaluation.verified === true
                ),

            humanAuthorizationRequired:
                true,

            physicalExecution:
                false,

            automaticExecution:
                false
        };
    }


    /* ========================================================
       BIODIESEL DOMAIN INTEGRATION TEST
    ======================================================== */

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

        let evaluation =
            null;

        let ruleEvaluationExecuted =
            false;

        let ruleVerified =
            false;

        if (
            registryStatus.available &&
            engineStatus.available &&
            engineStatus.evaluateAvailable
        ) {

            evaluation =
                evaluateBiodieselRules(
                    BIODIESEL_SCENARIO,
                    state
                );

            ruleEvaluationExecuted =
                Boolean(evaluation);

            ruleVerified =
                Boolean(
                    evaluation &&
                    evaluation.verified === true
                );
        }

        const result = {

            test:
                "BIODIESEL_DOMAIN_INTEGRATION",

            version:
                BIODIESEL_INTEGRATION_VERSION,

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

            intensity:
                intensity,

            state:
                state,

            authoritativeRegistry:
                registryStatus,

            authoritativeEngine:
                engineStatus,

            registryValidation:
                registryValidation,

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
                    ruleEvaluationExecuted,

                ruleVerified:
                    ruleVerified
            },

            evaluation:
                evaluation,

            passed:
                registryStatus.available === true &&
                registryStatus.validationAvailable === true &&
                registryValidation.valid === true &&
                engineStatus.available === true &&
                engineStatus.evaluateAvailable === true &&
                engineStatus.deriveSolutionAvailable === true &&
                ruleEvaluationExecuted === true &&
                ruleVerified === true,

            status:
                "BIODIESEL_INTEGRATION_TEST_FAILED",

            failureReason:
                null
        };


        /* ====================================================
           FINAL STATUS
        ==================================================== */

        if (result.passed === true) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_PASSED";

            result.failureReason =
                null;

        } else {

            if (!registryStatus.available) {

                result.failureReason =
                    "AUTHORITATIVE_BIODIESEL_RULE_REGISTRY_NOT_AVAILABLE";

            } else if (
                !registryValidation.valid
            ) {

                result.failureReason =
                    "AUTHORITATIVE_BIODIESEL_RULE_REGISTRY_VALIDATION_FAILED";

            } else if (
                !engineStatus.available
            ) {

                result.failureReason =
                    "AUTHORITATIVE_BIODIESEL_RULE_ENGINE_NOT_AVAILABLE";

            } else if (
                !ruleEvaluationExecuted
            ) {

                result.failureReason =
                    "BIODIESEL_RULE_EVALUATION_NOT_EXECUTED";

            } else if (
                !ruleVerified
            ) {

                result.failureReason =
                    "BIODIESEL_RULE_NOT_VERIFIED";

            } else {

                result.failureReason =
                    "BIODIESEL_INTEGRATION_TEST_FAILED";
            }
        }


        /* ====================================================
           CORRECT BIODIESEL UI TARGETS
        ==================================================== */

        const display =
            typeof document !== "undefined"
                ? document.getElementById(
                    "biodieselDomainIntegration"
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


        const integrationStatus =
            typeof document !== "undefined"
                ? document.getElementById(
                    "biodieselIntegration"
                )
                : null;

        if (integrationStatus) {

            integrationStatus.textContent =
                result.passed === true
                    ? "PASSED"
                    : "FAILED";
        }


        /* ====================================================
           BIODIESEL AUDIT LOG
        ==================================================== */

        if (
            Array.isArray(
                global.biodieselAuditLog
            )
        ) {

            global.biodieselAuditLog.push({

                test:
                    result.test,

                version:
                    result.version,

                scenario:
                    result.scenario,

                passed:
                    result.passed,

                status:
                    result.status,

                timestamp:
                    new Date().toISOString()
            });
        }


        return result;
    }


    /* ========================================================
       SELF TEST
    ======================================================== */

    function runBiodieselSelfTest() {

        return runBiodieselIntegrationTest();
    }


    /* ========================================================
       SELF TEST + CORRECTIVE ACTION
    ======================================================== */

    function runBiodieselSelfTestAndCorrectiveAction() {

        const result =
            runBiodieselIntegrationTest();

        return result;
    }


    /* ========================================================
       PUBLIC API
    ======================================================== */

    global.BiodieselDomainIntegrationAPI = {

        version:
            BIODIESEL_INTEGRATION_VERSION,

        domain:
            BIODIESEL_DOMAIN,

        scenario:
            BIODIESEL_SCENARIO,

        getBiodieselRegistryStatus:
            getBiodieselRegistryStatus,

        getBiodieselEngineStatus:
            getBiodieselEngineStatus,

        getBiodieselIntensity:
            getBiodieselIntensity,

        createBiodieselState:
            createBiodieselState,

        validateBiodieselRegistry:
            validateBiodieselRegistry,

        evaluateBiodieselRules:
            evaluateBiodieselRules,

        deriveBiodieselSolution:
            deriveBiodieselSolution,

        runBiodieselDomain:
            runBiodieselDomain,

        runBiodieselIntegrationTest:
            runBiodieselIntegrationTest,

        runBiodieselSelfTest:
            runBiodieselSelfTest,

        runBiodieselSelfTestAndCorrectiveAction:
            runBiodieselSelfTestAndCorrectiveAction
    };


    /* ========================================================
       GLOBAL COMPATIBILITY FUNCTIONS
    ======================================================== */

    global.runBiodieselDomain =
        runBiodieselDomain;

    global.runBiodieselIntegrationTest =
        runBiodieselIntegrationTest;

    global.runBiodieselSelfTest =
        runBiodieselSelfTest;

    global.runBiodieselSelfTestAndCorrectiveAction =
        runBiodieselSelfTestAndCorrectiveAction;


})(typeof window !== "undefined"
    ? window
    : globalThis);