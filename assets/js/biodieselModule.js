/*
 * Sextant Protocol™ Cockpit Pro
 * Biodiesel Energy Resilience Module
 *
 * Version: 1.0.0
 *
 * Purpose:
 * - Provide a stable Biodiesel module-level integration status.
 * - Detect the existing Biodiesel Domain Integration.
 * - Keep the module additive and deterministic.
 * - Do not execute physical systems.
 * - Do not create backend connections.
 *
 * Safety:
 * LOCAL DETERMINISTIC SIMULATION ONLY
 * BACKEND CONNECTION DISABLED
 * PHYSICAL EXECUTION DISABLED
 * VESSEL ACTUATION DISABLED
 * EXTERNAL CONNECTION DISABLED
 * HUMAN AUTHORIZATION REQUIRED
 */

(function (window) {
    "use strict";

    const BIODIESEL_MODULE_VERSION = "1.0.0";

    const REQUIRED_COMPONENTS = [
        "BiodieselRuleRegistry",
        "BiodieselRuleEngine",
        "BiodieselScenarioEngine",
        "BiodieselTrialManoeuvre"
    ];

    function componentAvailable(name) {
        return !!window[name];
    }

    function getIntegration() {
        /*
         * The actual Biodiesel integration layer is the
         * Biodiesel Domain Integration object.
         *
         * Support the canonical name first.
         */
        if (window.BiodieselDomainIntegration) {
            return window.BiodieselDomainIntegration;
        }

        /*
         * Compatibility fallback for any existing integration
         * object using the shorter historical name.
         */
        if (window.BiodieselIntegration) {
            return window.BiodieselIntegration;
        }

        return null;
    }

    function getComponentStatus() {
        const integration = getIntegration();

        return {
            BiodieselRuleRegistry:
                componentAvailable("BiodieselRuleRegistry"),

            BiodieselRuleEngine:
                componentAvailable("BiodieselRuleEngine"),

            BiodieselScenarioEngine:
                componentAvailable("BiodieselScenarioEngine"),

            BiodieselTrialManoeuvre:
                componentAvailable("BiodieselTrialManoeuvre"),

            BiodieselDomainIntegration:
                !!integration
        };
    }

    function isReady() {
        const status = getComponentStatus();

        return (
            status.BiodieselRuleRegistry &&
            status.BiodieselRuleEngine &&
            status.BiodieselScenarioEngine &&
            status.BiodieselTrialManoeuvre &&
            status.BiodieselDomainIntegration
        );
    }

    function getStatus() {
        const components = getComponentStatus();
        const integration = getIntegration();
        const ready = isReady();

        return {
            version: BIODIESEL_MODULE_VERSION,

            domain: "BIODIESEL ENERGY RESILIENCE",

            status: ready
                ? "BIODIESEL_MODULE_READY"
                : "BIODIESEL_MODULE_INCOMPLETE",

            integrationAvailable: !!integration,

            integrationStatus: integration
                ? "CONNECTED"
                : "UNAVAILABLE",

            components: components,

            safety: {
                localDeterministicSimulation: true,
                backendConnectionDisabled: true,
                physicalExecutionDisabled: true,
                vesselActuationDisabled: true,
                externalConnectionDisabled: true,
                humanAuthorizationRequired: true
            }
        };
    }

    function testIntegration() {
        const status = getStatus();

        return {
            version: BIODIESEL_MODULE_VERSION,
            passed: status.status === "BIODIESEL_MODULE_READY",
            status: status.status,
            integrationAvailable: status.integrationAvailable,
            integrationStatus: status.integrationStatus,
            components: status.components,
            safety: status.safety
        };
    }

    function reset() {
        return {
            version: BIODIESEL_MODULE_VERSION,
            status: "BIODIESEL_MODULE_RESET",
            integrationAvailable: !!getIntegration()
        };
    }

    window.BiodieselModule = {
        VERSION: BIODIESEL_MODULE_VERSION,

        getIntegration: getIntegration,

        getComponentStatus: getComponentStatus,

        isReady: isReady,

        getStatus: getStatus,

        testIntegration: testIntegration,

        reset: reset,

        REQUIRED_COMPONENTS: REQUIRED_COMPONENTS
    };

})(window);