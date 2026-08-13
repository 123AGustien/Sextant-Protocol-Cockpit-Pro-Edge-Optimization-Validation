const EN002_BIODIESEL_PRICE_SHOCK = {

    id: "EN-002",

    domain: "EN",

    scenario: "BIODIESEL_PRICE_SHOCK",

    name: "Biodiesel Price Shock",

    description:
        "Energy resilience response to a significant increase in biodiesel cost.",

    evaluate(state = {}) {

        const energy =
            Number(state.energy ?? 0);

        const fx =
            Number(state.fx ?? 0);

        let rule;

        if (energy >= 70 && fx < 30) {

            rule = {

                id: "EN-002-R1",

                condition:
                    "ENERGY >= 70 AND FX < 30",

                solution:
                    "MAINTAIN_SAFE_STATE",

                recovery:
                    "CONTINUE_MONITORING_PRICE_EXPOSURE",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 50) {

            rule = {

                id: "EN-002-R2",

                condition:
                    "ENERGY >= 50",

                solution:
                    "ENERGY_COST_CONTROL_MODE",

                recovery:
                    "REDUCE_NON_CRITICAL_ENERGY_DEMAND_AND_MONITOR_COST",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 30) {

            rule = {

                id: "EN-002-R3",

                condition:
                    "30 <= ENERGY < 50",

                solution:
                    "ENERGY_CONTINGENCY_MODE",

                recovery:
                    "ACTIVATE_ALTERNATIVE_SUPPLY_AND_CONTROL_COST_EXPOSURE",

                priority:
                    "HIGH"
            };

        } else {

            rule = {

                id: "EN-002-R4",

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
                "BIODIESEL_PRICE_SHOCK",

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

                fx
            },

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }
};

window.SextantEN002BiodieselPriceShock =
    EN002_BIODIESEL_PRICE_SHOCK;