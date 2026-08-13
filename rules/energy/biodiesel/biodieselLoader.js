/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL MODULE LOADER
   ENERGY DOMAIN

   LOAD ORDER:
   RULES
   → RULE ENGINE
   → SCENARIO ENGINE
   → TRIAL MANOEUVRE
   → INTEGRATION

   LOCAL DETERMINISTIC EXECUTION
============================================================ */

const BIODIESEL_MODULE_VERSION = "1.0.0";

const BIODIESEL_MODULE_STATUS = {

    domain: "ENERGY",

    module: "BIODIESEL",

    version:
        BIODIESEL_MODULE_VERSION,

    requiredComponents: [

        "BiodieselRuleRegistry",

        "BiodieselRuleEngine",

        "BiodieselScenarioEngine",

        "BiodieselTrialManoeuvre",

        "BiodieselIntegration"

    ],

    loaded: false
};

function validateBiodieselModule() {

    const components =
        BIODIESEL_MODULE_STATUS
            .requiredComponents
            .reduce(
                (result, name) => {

                    result[name] =
                        Boolean(
                            window[name]
                        );

                    return result;

                },
                {}
            );

    const loaded =
        Object.values(components)
            .every(Boolean);

    BIODIESEL_MODULE_STATUS.loaded =
        loaded;

    return {

        status:
            loaded
                ? "PASS"
                : "FAIL",

        domain:
            "ENERGY",

        module:
            "BIODIESEL",

        components,

        loaded
    };
}

window.BiodieselModule = {

    version:
        BIODIESEL_MODULE_VERSION,

    status:
        BIODIESEL_MODULE_STATUS,

    validate:
        validateBiodieselModule

};