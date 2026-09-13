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
