/* ============================================================
   SEXTANT PROTOCOL™ — EN-004
   RENEWABLE DIESEL STRESS
   ENERGY RESILIENCE AUTHORITATIVE RULES

   RULES → SOLUTION
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   Captain AI Lena provides decision support.
   Human authority remains final.
============================================================ */

const EN004_RENEWABLE_DIESEL_STRESS = {

    id: "EN-004",

    domain: "EN",

    scenario: "RENEWABLE_DIESEL_STRESS",

    name: "Renewable Diesel Stress",

    description:
        "Energy resilience response to sustained renewable diesel supply stress.",

    evaluate(state = {}) {

        const energy =
            Number(state.energy ?? 0);

        let rule;

        if (energy >= 70) {

            rule = {

                id: "EN-004-R1",

                condition:
                    "ENERGY >= 70",

                solution:
                    "MAINTAIN_SAFE_STATE",

                recovery:
                    "CONTINUE_MONITORING_RENEWABLE_DIESEL_SUPPLY",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 50) {

            rule = {

                id: "EN-004-R2",

                condition:
                    "50 <= ENERGY < 70",

                solution:
                    "ENERGY_CONSERVATION_MODE",

                recovery:
                    "REDUCE_NON_CRITICAL_DEMAND_AND_MONITOR_ALTERNATIVES",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 30) {

            rule = {

                id: "EN-004-R3",

                condition:
                    "30 <= ENERGY < 50",

                solution:
                    "ENERGY_CONTINGENCY_MODE",

                recovery:
                    "ACTIVATE_ALTERNATIVE_RENEWABLE_DIESEL_SUPPLY",

                priority:
                    "HIGH"
            };

        } else {

            rule = {

                id: "EN-004-R4",

                condition:
                    "ENERGY < 30",

                solution:
                    "ENERGY_EMERGENCY_MODE",

                recovery:
                    "ESCALATE_AND_ACTIVATE_EMERGENCY_ENERGY_SUPPLY",

                priority:
                    "CRITICAL"
            };
        }

        return {

            verified: true,

            domain: "EN",

            scenario:
                "RENEWABLE_DIESEL_STRESS",

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

window.SextantEN004RenewableDieselStress =
    EN004_RENEWABLE_DIESEL_STRESS;