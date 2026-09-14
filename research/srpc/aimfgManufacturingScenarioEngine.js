"use strict";

/* ============================================================
   SEXTANT PROTOCOL™ — AIMfg MANUFACTURING SCENARIO ENGINE
   MANUFACTURING RESILIENCE DOMAIN

   SCENARIO → RULE ENGINE → SOLUTION
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   This engine does not create rules.
   It does not bypass the authoritative rule engine.
   It does not execute physical manufacturing actions.
   Human authorization remains mandatory.
============================================================ */

const AIMFG_MANUFACTURING_SCENARIO_ENGINE_VERSION =
    "0.1.0-RESEARCH";

/* ============================================================
   SCENARIO EXECUTION
============================================================ */

function runAIMfgManufacturingScenario(
    scenario,
    state = {}
) {

    if (!window.AIMfgManufacturingRuleEngine) {

        return {

            verified: false,

            scenario,

            ruleVerified: false,

            decision:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            reason:
                "AIMfg manufacturing rule engine unavailable.",

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }

    const ruleResult =
        window.AIMfgManufacturingRuleEngine.evaluateAll(
            state
        );

    const ruleVerified =
        ruleResult &&
        ruleResult.allPassed === true;

    let assessment = null;
    let decision = null;

    /*
     * The scenario module remains the authoritative holder
     * of AIMfg scenario assessment and recovery-decision logic.
     *
     * The scenario engine coordinates the flow.
     * It does not create new manufacturing rules.
     */

    if (
        window.AIMfgManufacturingScenario &&
        typeof window.AIMfgManufacturingScenario
            .calculateAssessment === "function"
    ) {

        assessment =
            window.AIMfgManufacturingScenario
                .calculateAssessment(state);
    }

    if (
        window.AIMfgManufacturingScenario &&
        typeof window.AIMfgManufacturingScenario
            .generateDecision === "function"
    ) {

        decision =
            window.AIMfgManufacturingScenario
                .generateDecision(
                    state,
                    assessment
                );
    }

    if (!ruleVerified) {

        decision = {

            status:
                "RECOVERY_DECISION_BLOCKED",

            decision:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_RULES_VERIFIED",

            authority:
                "HUMAN OPERATOR",

            authorizationRequired:
                true
        };
    }

    return {

        pipeline:
            "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE",

        scenario,

        observedState:
            state,

        ruleResult,

        ruleVerified,

        assessment,

        decision,

        authority:
            "HUMAN OPERATOR",

        execution:
            "HUMAN AUTHORIZATION REQUIRED",

        physicalExecution:
            false,

        backendConnection:
            false,

        externalConnection:
            false,

        autonomousActuation:
            false
    };
}

/* ============================================================
   STANDARD AIMfg MANUFACTURING DEGRADATION SCENARIO
============================================================ */

function runAIMfgManufacturingLineDegradation(
    state = {}
) {

    return runAIMfgManufacturingScenario(
        "AIMFG_MANUFACTURING_LINE_DEGRADATION",
        state
    );
}

/* ============================================================
   SOLUTION PANEL CONNECTION
============================================================ */

function sendAIMfgManufacturingSolutionToPanel(
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
                "MANUFACTURING",

            ruleVerified:
                result.ruleVerified,

            decision:
                result.decision?.decision ??
                result.decision ??
                null,

            recommendedRecovery:
                result.decision?.recommendedRecovery ??
                null,

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

function executeAIMfgManufacturingDecisionFlow(
    scenario,
    state = {}
) {

    const result =
        runAIMfgManufacturingScenario(
            scenario,
            state
        );

    return sendAIMfgManufacturingSolutionToPanel(
        result
    );
}

/* ============================================================
   PUBLIC INTERFACE
============================================================ */

window.AIMfgManufacturingScenarioEngine = {

    version:
        AIMFG_MANUFACTURING_SCENARIO_ENGINE_VERSION,

    run:
        runAIMfgManufacturingScenario,

    runLineDegradation:
        runAIMfgManufacturingLineDegradation,

    executeDecisionFlow:
        executeAIMfgManufacturingDecisionFlow,

    sendSolutionToPanel:
        sendAIMfgManufacturingSolutionToPanel

};