/* ============================================================
   SEXTANT PROTOCOL™ — DOMAIN RULE ENGINE
   Captain AI Lena Decision Support
   LOCAL DETERMINISTIC SIMULATOR
   RULES → SOLUTION
   ============================================================ */

const DOMAIN_RULE_ENGINE_VERSION = "1.0.0";

/*
Golden Rule:
OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

The rule engine does NOT make an autonomous physical decision.
It derives a recommended solution from the authoritative
scenario rules and passes that recommendation to Captain AI Lena.

Human authority remains final.
*/

const DOMAIN_RULES = {

    BIODIESEL_SHORTAGE: {

        domain: "ENERGY",

        description:
            "Biodiesel supply disruption affecting energy resilience.",

        rules: [

            {
                condition:
                    "energy >= 70",

                solution:
                    "MAINTAIN_SAFE_STATE",

                recovery:
                    "CONTINUE_MONITORING",

                priority:
                    "HIGH"
            },

            {
                condition:
                    "energy >= 50 && energy < 70",

                solution:
                    "ENERGY_CONSERVATION_MODE",

                recovery:
                    "REDUCE_NON_CRITICAL_ENERGY_DEMAND",

                priority:
                    "MEDIUM"
            },

            {
                condition:
                    "energy >= 30 && energy < 50",

                solution:
                    "ENERGY_CONTINGENCY_MODE",

                recovery:
                    "ACTIVATE_ALTERNATIVE_ENERGY_SUPPLY",

                priority:
                    "HIGH"
            },

            {
                condition:
                    "energy < 30",

                solution:
                    "ENERGY_EMERGENCY_MODE",

                recovery:
                    "ESCALATE_AND_ACTIVATE_EMERGENCY_SUPPLY",

                priority:
                    "CRITICAL"
            }
        ]
    }
};

/* ============================================================
   RULE VALIDATION
============================================================ */

function validateDomainRules() {

    return {

        valid:
            Object.keys(DOMAIN_RULES).length > 0,

        ruleCount:
            Object.values(DOMAIN_RULES)
                .reduce(
                    (total, rule) =>
                        total + rule.rules.length,
                    0
                ),

        version:
            DOMAIN_RULE_ENGINE_VERSION
    };
}

/* ============================================================
   RULE EVALUATION
============================================================ */

function evaluateDomainRules(
    scenario,
    state
) {

    const domainRule =
        DOMAIN_RULES[scenario];

    if (!domainRule) {

        return {

            verified: false,

            scenario,

            solution:
                "NO_RULE_AVAILABLE",

            recovery:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            reason:
                "No authoritative rule exists for this scenario."
        };
    }

    const energy =
        Number(state.energy ?? 0);

    let selectedRule = null;

    if (energy >= 70) {

        selectedRule =
            domainRule.rules[0];

    } else if (energy >= 50) {

        selectedRule =
            domainRule.rules[1];

    } else if (energy >= 30) {

        selectedRule =
            domainRule.rules[2];

    } else {

        selectedRule =
            domainRule.rules[3];
    }

    return {

        verified: true,

        scenario,

        domain:
            domainRule.domain,

        ruleEngine:
            "DOMAIN_RULE_ENGINE",

        rulePriority:
            selectedRule.priority,

        solution:
            selectedRule.solution,

        recommendedRecovery:
            selectedRule.recovery,

        basis: {

            energy,

            ruleApplied:
                selectedRule.condition
        }
    };
}

/* ============================================================
   CAPTAIN AI LENA SOLUTION DERIVATION
============================================================ */

function deriveCaptainLenaSolution(
    scenario,
    state
) {

    const ruleResult =
        evaluateDomainRules(
            scenario,
            state
        );

    if (!ruleResult.verified) {

        return {

            agent:
                "Captain AI Lena",

            decision:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            ruleStatus:
                "NOT_VERIFIED",

            authority:
                "HUMAN OPERATOR",

            execution:
                "NOT AUTHORIZED AUTOMATICALLY"
        };
    }

    return {

        agent:
            "Captain AI Lena",

        decision:
            ruleResult.solution,

        recommendedRecovery:
            ruleResult.recommendedRecovery,

        ruleApplied:
            ruleResult.basis.ruleApplied,

        rulePriority:
            ruleResult.rulePriority,

        authority:
            "HUMAN OPERATOR",

        execution:
            "HUMAN AUTHORIZATION REQUIRED"
    };
}

/* ============================================================
   EXPORT
============================================================ */

window.SextantDomainRuleEngine = {

    version:
        DOMAIN_RULE_ENGINE_VERSION,

    rules:
        DOMAIN_RULES,

    validateDomainRules,

    evaluateDomainRules,

    deriveCaptainLenaSolution
};