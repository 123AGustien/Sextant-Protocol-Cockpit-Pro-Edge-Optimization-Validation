const EN003_BIODIESEL_SUPPLY_DISRUPTION = {

    id: "EN-003",

    domain: "EN",

    scenario: "BIODIESEL_SUPPLY_DISRUPTION",

    name: "Biodiesel Supply Disruption",

    description:
        "Energy resilience response to a disruption in biodiesel availability.",

    evaluate(state = {}) {

        const energy =
            Number(state.energy ?? 0);

        const inf =
            Number(state.inf ?? 0);

        let rule;

        if (energy >= 70 && inf < 50) {

            rule = {

                id: "EN-003-R1",

                condition:
                    "ENERGY >= 70 AND INF < 50",

                solution:
                    "MAINTAIN_SAFE_STATE",

                recovery:
                    "CONTINUE_MONITORING_SUPPLY",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 50) {

            rule = {

                id: "EN-003-R2",

                condition:
                    "ENERGY >= 50",

                solution:
                    "ENERGY_CONSERVATION_MODE",

                recovery:
                    "REDUCE_NON_CRITICAL_DEMAND_AND_MONITOR_SUPPLY",

                priority:
                    "MEDIUM"
            };

        } else if (energy >= 30) {

            rule = {

                id: "EN-003-R3",

                condition:
                    "30 <= ENERGY < 50",

                solution:
                    "ENERGY_CONTINGENCY_MODE",

                recovery:
                    "ACTIVATE_ALTERNATIVE_SUPPLY_CHAIN",

                priority:
                    "HIGH"
            };

        } else {

            rule = {

                id: "EN-003-R4",

                condition:
                    "ENERGY < 30",

                solution:
                    "ENERGY_EMERGENCY_MODE",

                recovery:
                    "ESCALATE_AND_ACTIVATE_EMERGENCY_SUPPLY_CHAIN",

                priority:
                    "CRITICAL"
            };
        }

        return {

            verified: true,

            domain: "EN",

            scenario:
                "BIODIESEL_SUPPLY_DISRUPTION",

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

window.SextantEN003BiodieselSupplyDisruption =
    EN003_BIODIESEL_SUPPLY_DISRUPTION;