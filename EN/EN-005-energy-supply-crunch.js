/* ============================================================
   SEXTANT PROTOCOL™ — EN-005
   ENERGY SUPPLY CRUNCH
   ENERGY RESILIENCE AUTHORITATIVE RULES

   RULES → SOLUTION
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   Captain AI Lena provides decision support.
   Human authority remains final.
============================================================ */

const EN005_ENERGY_SUPPLY_CRUNCH = {

    id: "EN-005",

    domain: "EN",

    scenario: "ENERGY_SUPPLY_CRUNCH",

    name: "Energy Supply Crunch",

    description:
        "Energy resilience response to a severe reduction in available energy supply.",

    evaluate(state = {}) {

        const energy =
            Number(state.energy ?? 0);

        const inf =
            Number(state.inf ?? 0);

        let rule;

        if (energy >= 70 && inf < 50) {

            rule = {

                id: "EN-005-R1",

                condition:
                    "ENERGY >= 70 AND INF < 50",

                solution:
                    "MAINTAIN_SAFE_STATE",

                recovery:
                    "CONTINUE_MONITORING_ENERGY_SUPPLY",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 50) {

            rule = {

                id: "EN-005-R2",

                condition:
                    "ENERGY >= 50",

                solution:
                    "ENERGY_CONSERVATION_MODE",

                recovery:
                    "REDUCE_NON_CRITICAL_ENERGY_DEMAND",

                priority:
                    "HIGH"
            };

        } else if (energy >= 30) {

            rule = {

                id: "EN-005-R3",

                condition:
                    "30 <= ENERGY < 50",

                solution:
                    "ENERGY_CONTINGENCY_MODE",

                recovery:
                    "ACTIVATE_ALTERNATIVE_ENERGY_SUPPLY",

                priority:
                    "HIGH"
            };

        } else {

            rule = {

                id: "EN-005-R4",

                condition:
                    "ENERGY < 30",

                solution:
                    "ENERGY_EMERGENCY_MODE",

                recovery:
                    "ESCALATE_AND_ACTIVATE_EMERGENCY_SUPPLY",

                priority:
                    "CRITICAL"
            };
        }

        return {

            verified: true,

            domain: "EN",

            scenario:
                "ENERGY_SUPPLY_CRUNCH",

            ruleId:
                rule.id,

            ruleCondition:
                rule.condition,

            solution:
                rule.solution,

            recommendedRecovery:
                rule.recovery,

            priority:
                rule.priority,

            basis: {

                energy,

                infrastructure:
                    inf
            },

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }
};

window.SextantEN005EnergySupplyCrunch =
    EN005_ENERGY_SUPPLY_CRUNCH;