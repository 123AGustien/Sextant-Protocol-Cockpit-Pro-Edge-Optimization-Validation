/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL RULE REGISTRY
   ENERGY DOMAIN
   Captain AI Lena Decision Support
   RULES → SOLUTION
   LOCAL DETERMINISTIC SIMULATOR
   ============================================================ */

const BIODIESEL_RULE_REGISTRY_VERSION = "1.0.0";

const BIODIESEL_RULES = {

    BIODIESEL_SHORTAGE: {

        scenario: "BIODIESEL_SHORTAGE",
        domain: "ENERGY",

        rules: [

            {
                id: "BDS-001",
                condition: "energy >= 70",
                solution: "MAINTAIN_SAFE_STATE",
                recovery: "CONTINUE_MONITORING",
                priority: "HIGH"
            },

            {
                id: "BDS-002",
                condition: "energy >= 50 && energy < 70",
                solution: "ENERGY_CONSERVATION_MODE",
                recovery: "REDUCE_NON_CRITICAL_ENERGY_DEMAND",
                priority: "MEDIUM"
            },

            {
                id: "BDS-003",
                condition: "energy >= 30 && energy < 50",
                solution: "ENERGY_CONTINGENCY_MODE",
                recovery: "ACTIVATE_ALTERNATIVE_ENERGY_SUPPLY",
                priority: "HIGH"
            },

            {
                id: "BDS-004",
                condition: "energy < 30",
                solution: "ENERGY_EMERGENCY_MODE",
                recovery: "ESCALATE_AND_ACTIVATE_EMERGENCY_SUPPLY",
                priority: "CRITICAL"
            }

        ]
    }

};

function getBiodieselRules() {
    return BIODIESEL_RULES;
}

function getBiodieselScenarioRule(scenario) {

    return BIODIESEL_RULES[scenario] || null;

}

function validateBiodieselRules() {

    const scenario =
        BIODIESEL_RULES.BIODIESEL_SHORTAGE;

    return {

        valid:
            Boolean(scenario),

        scenario:
            "BIODIESEL_SHORTAGE",

        domain:
            "ENERGY",

        ruleCount:
            scenario ? scenario.rules.length : 0,

        version:
            BIODIESEL_RULE_REGISTRY_VERSION
    };

}

window.BiodieselRuleRegistry = {

    version:
        BIODIESEL_RULE_REGISTRY_VERSION,

    rules:
        BIODIESEL_RULES,

    getBiodieselRules,

    getBiodieselScenarioRule,

    validateBiodieselRules

};