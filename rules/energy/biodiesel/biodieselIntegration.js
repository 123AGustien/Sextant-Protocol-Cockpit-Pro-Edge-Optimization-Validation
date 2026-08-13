/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL INTEGRATION
   ENERGY DOMAIN

   COCKPIT
      ↓
   BIODIESEL SCENARIO ENGINE
      ↓
   BIODIESEL RULE ENGINE
      ↓
   AUTHORITATIVE BIODIESEL RULES
      ↓
   CAPTAIN AI LENA SOLUTION
      ↓
   SOLUTION PANEL
      ↓
   HUMAN DECISION AUTHORITY
      ↓
   TRIAL MANOEUVRE
      ↓
   MEMORY / AUDIT

   NO AUTOMATIC PHYSICAL EXECUTION
============================================================ */

const BIODIESEL_INTEGRATION_VERSION = "1.0.0";

/* ============================================================
   RUN BIODIESEL DECISION FLOW
============================================================ */

function runBiodieselIntegration(
    scenario = "BIODIESEL_SHORTAGE",
    state = {}
) {

    if (!window.BiodieselScenarioEngine) {

        return {

            status:
                "FAIL",

            scenario,

            reason:
                "BiodieselScenarioEngine unavailable."
        };
    }

    const result =
        window.BiodieselScenarioEngine
            .executeDecisionFlow(
                scenario,
                state
            );

    return {

        status:
            result.ruleVerified
                ? "PASS"
                : "BLOCKED",

        domain:
            "ENERGY",

        scenario,

        ruleVerified:
            result.ruleVerified,

        decision:
            result.decision,

        recommendedRecovery:
            result.recommendedRecovery,

        ruleId:
            result.ruleResult?.ruleId ?? null,

        ruleCondition:
            result.ruleResult?.ruleCondition ?? null,

        authority:
            "HUMAN OPERATOR",

        execution:
            "HUMAN AUTHORIZATION REQUIRED"
    };
}

/* ============================================================
   RUN BIODIESEL TRIAL MANOEUVRE
============================================================ */

function runIntegratedBiodieselTrial(
    scenario = "BIODIESEL_SHORTAGE",
    state = {}
) {

    if (!window.BiodieselTrialManoeuvre) {

        return {

            status:
                "FAIL",

            reason:
                "BiodieselTrialManoeuvre unavailable."
        };
    }

    const trial =
        window.BiodieselTrialManoeuvre.run(
            scenario,
            state
        );

    const verification =
        window.BiodieselTrialManoeuvre.verify(
            trial
        );

    return {

        status:
            verification.trialManoeuvreVerified
                ? "PASS"
                : "FAIL",

        trial,

        verification
    };
}

/* ============================================================
   INTEGRATION SELF-TEST
============================================================ */

function validateBiodieselIntegration() {

    const components = {

        ruleRegistry:
            Boolean(
                window.BiodieselRuleRegistry
            ),

        ruleEngine:
            Boolean(
                window.BiodieselRuleEngine
            ),

        scenarioEngine:
            Boolean(
                window.BiodieselScenarioEngine
            ),

        trialManoeuvre:
            Boolean(
                window.BiodieselTrialManoeuvre
            ),

        solutionPanel:
            Boolean(
                window.SextantSolutionPanel
            )
    };

    const passed =
        Object.values(components)
            .filter(Boolean)
            .length;

    const total =
        Object.keys(components).length;

    return {

        status:
            passed === total
                ? "PASS"
                : "FAIL",

        domain:
            "ENERGY",

        components,

        passed,

        total,

        execution:
            "HUMAN AUTHORIZATION REQUIRED"
    };
}

/* ============================================================
   PUBLIC INTERFACE
============================================================ */

window.BiodieselIntegration = {

    version:
        BIODIESEL_INTEGRATION_VERSION,

    run:
        runBiodieselIntegration,

    runTrial:
        runIntegratedBiodieselTrial,

    validate:
        validateBiodieselIntegration

};