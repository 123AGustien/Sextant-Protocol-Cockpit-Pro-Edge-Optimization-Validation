/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL RULE ENGINE
   ENERGY DOMAIN

   RULES → SOLUTION
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   The engine evaluates authoritative biodiesel rules.
   It does not perform physical execution.
   Human authorization remains mandatory.
============================================================ */

const BIODIESEL_RULE_ENGINE_VERSION = "1.0.0";

function evaluateBiodieselScenario(
    scenario,
    state = {}
) {

    const registry =
        window.BiodieselRuleRegistry;

    if (!registry) {

        return {

            verified: false,

            scenario,

            ruleStatus:
                "RULE_REGISTRY_UNAVAILABLE",

            solution:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }

    const scenarioRules =
        registry.getBiodieselScenarioRule(
            scenario
        );

    if (!scenarioRules) {

        return {

            verified: false,

            scenario,

            ruleStatus:
                "NO_AUTHORITATIVE_RULE",

            solution:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }

    const energy =
        Number(state.energy ?? 0);

    let selectedRule = null;

    if (energy >= 70) {

        selectedRule =
            scenarioRules.rules.find(
                rule =>
                    rule.id === "BDS-001"
            );

    } else if (energy >= 50) {

        selectedRule =
            scenarioRules.rules.find(
                rule =>
                    rule.id === "BDS-002"
            );

    } else if (energy >= 30) {

        selectedRule =
            scenarioRules.rules.find(
                rule =>
                    rule.id === "BDS-003"
            );

    } else {

        selectedRule =
            scenarioRules.rules.find(
                rule =>
                    rule.id === "BDS-004"
            );
    }

    if (!selectedRule) {

        return {

            verified: false,

            scenario,

            ruleStatus:
                "RULE_EVALUATION_FAILED",

            solution:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }

    return {

        verified: true,

        domain:
            "ENERGY",

        scenario,

        ruleStatus:
            "RULE_VERIFIED",

        ruleId:
            selectedRule.id,

        ruleCondition:
            selectedRule.condition,

        priority:
            selectedRule.priority,

        solution:
            selectedRule.solution,

        recommendedRecovery:
            selectedRule.recovery,

        basis: {

            energy
        },

        authority:
            "HUMAN OPERATOR",

        execution:
            "HUMAN AUTHORIZATION REQUIRED"
    };
}

/* ============================================================
   CAPTAIN AI LENA INTERFACE
============================================================ */

function deriveBiodieselCaptainLenaSolution(
    scenario,
    state = {}
) {

    const result =
        evaluateBiodieselScenario(
            scenario,
            state
        );

    if (!result.verified) {

        return {

            agent:
                "Captain AI Lena",

            scenario,

            decision:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            ruleVerified:
                false,

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }

    return {

        agent:
            "Captain AI Lena",

        domain:
            "ENERGY",

        scenario,

        decision:
            result.solution,

        recommendedRecovery:
            result.recommendedRecovery,

        ruleId:
            result.ruleId,

        ruleCondition:
            result.ruleCondition,

        rulePriority:
            result.priority,

        ruleVerified:
            true,

        authority:
            "HUMAN OPERATOR",

        execution:
            "HUMAN AUTHORIZATION REQUIRED"
    };
}

/* ============================================================
   PUBLIC INTERFACE
============================================================ */

window.BiodieselRuleEngine = {

    version:
        BIODIESEL_RULE_ENGINE_VERSION,

    evaluate:
        evaluateBiodieselScenario,

    deriveSolution:
        deriveBiodieselCaptainLenaSolution

};