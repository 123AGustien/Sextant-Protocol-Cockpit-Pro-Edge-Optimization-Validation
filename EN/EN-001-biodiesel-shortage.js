/* ============================================================
   SEXTANT PROTOCOL™ — EN-001
   BIODIESEL SHORTAGE
   ENERGY RESILIENCE AUTHORITATIVE RULES

   RULES → SOLUTION
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   Captain AI Lena provides decision support.
   Human authority remains final.
============================================================ */

const EN001_BIODIESEL_SHORTAGE = {

    id: "EN-001",

    domain: "EN",

    scenario: "BIODIESEL_SHORTAGE",

    name: "Biodiesel Shortage",

    description:
        "Energy resilience response to a biodiesel supply disruption.",

    evaluate(state = {}) {

        const energy =
            Number(state.energy ?? 0);

        let rule;

        if (energy >= 70) {

            rule = {

                id: "EN-001-R1",

                condition:
                    "ENERGY >= 70",

                solution:
                    "MAINTAIN_SAFE_STATE",

                recovery:
                    "CONTINUE_MONITORING",

                priority:
                    "HIGH"
            };

        } else if (energy >= 50) {

            rule = {

                id: "EN-001-R2",

                condition:
                    "50 <= ENERGY < 70",

                solution:
                    "ENERGY_CONSERVATION_MODE",

                recovery:
                    "REDUCE_NON_CRITICAL_ENERGY_DEMAND",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 30) {

            rule = {

                id: "EN-001-R3",

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

                id: "EN-001-R4",

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
                "BIODIESEL_SHORTAGE",

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

                energy
            },

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }
};

window.SextantEN001BiodieselShortage =
    EN001_BIODIESEL_SHORTAGE;