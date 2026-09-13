/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL DOMAIN INTEGRATION
   ENERGY DOMAIN
   Captain AI Lena Decision Support
   LOCAL DETERMINISTIC SIMULATOR

   VERSION 2.1.0

   Golden Rule:
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   SAFETY:
   - No backend connection
   - No physical execution
   - No automatic execution
   - No vessel actuation
   - No external connection
   - Human authorization required
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
       AUTHORITATIVE RULE ENGINE DISCOVERY
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
       Deterministic test input
       ======================================================== */

    function getBiodieselIntensity() {

        return 50;
    }


    /* ========================================================
       CREATE BIODIESEL STATE
       ======================================================== */

    function createBiodieselState(
        intensity = getBiodieselIntensity()
    ) {

        const numericIntensity =
            Number(intensity);

        return {
            energy:
                Number.isFinite(numericIntensity)
                    ? numericIntensity
                    : 50
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
                    "BIODIESEL_REGISTRY_VALIDATOR_NOT_AVAILABLE"
            };
        }

        const result =
            registry.validateBiodieselRules();

        return {
            valid:
                result &&
                result.valid === true,

            result:
                result
        };
    }


    /* ========================================================
       EVALUATE BIODIESEL RULES
       Authoritative Rule Engine only
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
       DERIVE BIODIESEL SOLUTION
       Authoritative Rule Engine only
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

    function runBiodieselDomain() {

        const registryStatus =
            getBiodieselRegistryStatus();

        const engineStatus =
            getBiodieselEngineStatus();

        const state =
            createBiodieselState();

        if (
            !registryStatus.available ||
            !engineStatus.available
        ) {

            return {

                domain:
                    BIODIESEL_DOMAIN,

                scenario:
                    BIODIESEL_SCENARIO,

                state:
                    state,

                registry:
                    registryStatus,

                engine:
                    engineStatus,

                ruleEvaluation:
                    null,

                solution:
                    null,

                verified:
                    false,

                humanAuthorizationRequired:
                    true,

                physicalExecution:
                    false,

                automaticExecution:
                    false,

                status:
                    "BIODIESEL_DOMAIN_INTEGRATION_UNAVAILABLE"
            };
        }


        const ruleEvaluation =
            evaluateBiodieselRules(
                BIODIESEL_SCENARIO,
                state
            );


        const solution =
            deriveBiodieselSolution(
                BIODIESEL_SCENARIO,
                state
            );


        return {

            domain:
                BIODIESEL_DOMAIN,

            scenario:
                BIODIESEL_SCENARIO,

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
                false,

            status:
                (
                    ruleEvaluation &&
                    ruleEvaluation.verified === true
                )
                    ? "BIODIESEL_DOMAIN_INTEGRATION_VERIFIED"
                    : "BIODIESEL_DOMAIN_INTEGRATION_FAILED"
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


        let evaluation = null;

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
                true;

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


            /* =================================================
               AUTHORITATIVE COMPONENTS
               ================================================= */

            authoritativeRegistry:
                registryStatus,

            authoritativeEngine:
                engineStatus,

            registryValidation:
                registryValidation,


            /* =================================================
               SAFETY BOUNDARY
               ================================================= */

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


            /* =================================================
               VALIDATION CHECKS
               ================================================= */

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
                false,


            status:
                "BIODIESEL_INTEGRATION_TEST_FAILED",


            failureReason:
                null
        };


        /* =====================================================
           FINAL PASS CONDITION

           Every authoritative integration requirement must
           pass before the domain is considered integrated.
           ===================================================== */

        result.passed =
            result.checks.ruleRegistry === true &&
            result.checks.registryValidator === true &&
            result.checks.registryValid === true &&
            result.checks.engineDetected === true &&
            result.checks.evaluateFunctionAvailable === true &&
            result.checks.deriveSolutionFunctionAvailable === true &&
            result.checks.ruleEvaluationExecuted === true &&
            result.checks.ruleVerified === true;


        if (result.passed === true) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_PASSED";

            result.failureReason =
                null;

        } else if (
            result.checks.ruleRegistry !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "AUTHORITATIVE_BIODIESEL_RULE_REGISTRY_NOT_AVAILABLE";

        } else if (
            result.checks.registryValidator !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "BIODIESEL_REGISTRY_VALIDATOR_NOT_AVAILABLE";

        } else if (
            result.checks.registryValid !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "BIODIESEL_RULE_REGISTRY_VALIDATION_FAILED";

        } else if (
            result.checks.engineDetected !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "BIODIESEL_RULE_ENGINE_NOT_AVAILABLE";

        } else if (
            result.checks.evaluateFunctionAvailable !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "BIODIESEL_RULE_ENGINE_EVALUATE_NOT_AVAILABLE";

        } else if (
            result.checks.deriveSolutionFunctionAvailable !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "BIODIESEL_RULE_ENGINE_DERIVE_SOLUTION_NOT_AVAILABLE";

        } else if (
            result.checks.ruleEvaluationExecuted !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "BIODIESEL_RULE_EVALUATION_NOT_EXECUTED";

        } else if (
            result.checks.ruleVerified !== true
        ) {

            result.status =
                "BIODIESEL_INTEGRATION_TEST_FAILED";

            result.failureReason =
                "BIODIESEL_RULE_VERIFICATION_FAILED";
        }


        /* =====================================================
           UI OUTPUT
           ===================================================== */

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


        /* =====================================================
           AUDIT LOG
           ===================================================== */

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

                domain:
                    result.domain,

                scenario:
                    result.scenario,

                passed:
                    result.passed,

                status:
                    result.status,

                failureReason:
                    result.failureReason,

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

        return runBiodieselIntegrationTest();
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

        getBiodieselRegistry:
            getBiodieselRegistry,

        getBiodieselEngine:
            getBiodieselEngine,

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


})(window);