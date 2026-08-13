/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL SCENARIO ENGINE
   ENERGY DOMAIN

   SCENARIO → RULE ENGINE → SOLUTION
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   This engine does not create rules.
   It does not bypass the authoritative rule engine.
   It does not execute physical actions.
   Human authorization remains mandatory.
============================================================ */

const BIODIESEL_SCENARIO_ENGINE_VERSION = "1.0.0";

/* ============================================================
   SCENARIO EXECUTION
============================================================ */

function runBiodieselScenario(
    scenario,
    state = {}
) {

    if (!window.BiodieselRuleEngine) {

        return {

            verified: false,

            scenario,

            ruleVerified: false,

            decision:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            reason:
                "Biodiesel rule engine unavailable.",

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }

    const solution =
        window.BiodieselRuleEngine.deriveSolution(
            scenario,
            state
        );

    return {

        pipeline:
            "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE",

        scenario,

        observedState:
            state,

        ruleResult:
            solution,

        ruleVerified:
            solution.ruleVerified === true,

        decision:
            solution.decision,

        recommendedRecovery:
            solution.recommendedRecovery,

        authority:
            "HUMAN OPERATOR",

        execution:
            "HUMAN AUTHORIZATION REQUIRED"
    };
}

/* ============================================================
   STANDARD BIODIESEL SHORTAGE SCENARIO
============================================================ */

function runBiodieselShortage(
    state = {}
) {

    return runBiodieselScenario(
        "BIODIESEL_SHORTAGE",
        state
    );
}

/* ============================================================
   SOLUTION PANEL CONNECTION
============================================================ */

function sendBiodieselSolutionToPanel(
    result
) {

    if (
        window.SextantSolutionPanel &&
        typeof window.SextantSolutionPanel.update ===
        "function"
    ) {

        window.SextantSolutionPanel.update({

            scenario:
                result.scenario,

            domain:
                "ENERGY",

            ruleVerified:
                result.ruleVerified,

            decision:
                result.decision,

            recommendedRecovery:
                result.recommendedRecovery,

            ruleId:
                result.ruleResult?.ruleId ?? null,

            rulePriority:
                result.ruleResult?.rulePriority ?? null,

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        });
    }

    return result;
}

/* ============================================================
   FULL SCENARIO → SOLUTION FLOW
============================================================ */

function executeBiodieselDecisionFlow(
    scenario,
    state = {}
) {

    const result =
        runBiodieselScenario(
            scenario,
            state
        );

    return sendBiodieselSolutionToPanel(
        result
    );
}

/* ============================================================
   PUBLIC INTERFACE
============================================================ */

window.BiodieselScenarioEngine = {

    version:
        BIODIESEL_SCENARIO_ENGINE_VERSION,

    run:
        runBiodieselScenario,

    runShortage:
        runBiodieselShortage,

    executeDecisionFlow:
        executeBiodieselDecisionFlow,

    sendSolutionToPanel:
        sendBiodieselSolutionToPanel

};