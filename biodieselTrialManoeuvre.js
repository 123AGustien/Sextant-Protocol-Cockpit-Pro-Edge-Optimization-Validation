/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL TRIAL MANOEUVRE
   ENERGY DOMAIN

   RULE-DERIVED SOLUTION → TRIAL MANOEUVRE → VERIFY

   LOCAL DETERMINISTIC SIMULATION
   NO PHYSICAL EXECUTION
   HUMAN AUTHORIZATION REQUIRED

   VERSION:
   1.0.1 — TRIAL RESULT HANDOFF WIRING
============================================================ */

const BIODIESEL_TRIAL_MANOEUVRE_VERSION = "1.0.1";


/* ============================================================
   SHARED TRIAL RESULT STATE
============================================================ */

if (
    typeof window.biodieselTrialResult === "undefined"
) {
    window.biodieselTrialResult = null;
}


/* ============================================================
   RUN BIODIESEL TRIAL MANOEUVRE
============================================================ */

function runBiodieselTrialManoeuvre(
    scenario,
    state = {}
) {

    if (!window.BiodieselScenarioEngine) {

        const unavailableResult = {

            verified: false,

            scenario,

            status:
                "TRIAL_MANOEUVRE_UNAVAILABLE",

            reason:
                "Biodiesel Scenario Engine unavailable.",

            physicalExecution:
                false,

            backendConnection:
                false,

            humanAuthorization:
                "REQUIRED"
        };

        window.biodieselTrialResult =
            unavailableResult;

        return unavailableResult;
    }


    const decision =
        window.BiodieselScenarioEngine.run(
            scenario,
            state
        );


    const result = {

        verified:
            decision.ruleVerified === true,

        scenario,

        mode:
            "LOCAL TRIAL MANOEUVRE SIMULATION",

        ruleDerivedSolution:
            decision.decision,

        recommendedRecovery:
            decision.recommendedRecovery,

        simulatedAction:
            decision.decision,

        physicalExecution:
            false,

        backendConnection:
            false,

        humanAuthorization:
            "REQUIRED",

        status:
            decision.ruleVerified === true
                ? "TRIAL MANOEUVRE SIMULATED"
                : "TRIAL MANOEUVRE BLOCKED"
    };


    /* ========================================================
       TRIAL → VALIDATION RESULT HANDOFF

       The exact result produced by the trial manoeuvre is
       retained for the validation stage.

       No rule is changed.
       No decision is changed.
       No execution is performed.
    ======================================================== */

    window.biodieselTrialResult =
        result;


    return result;
}


/* ============================================================
   VERIFY BIODIESEL TRIAL MANOEUVRE
============================================================ */

function verifyBiodieselTrialManoeuvre(
    result
) {

    /*
     * Accept an explicitly supplied result.
     * If none is supplied, use the most recent trial result.
     */

    const validationResult =
        result ||
        window.biodieselTrialResult ||
        null;


    const valid =
        Boolean(
            validationResult &&
            validationResult.verified === true &&
            validationResult.physicalExecution === false &&
            validationResult.humanAuthorization === "REQUIRED"
        );


    return {

        trialManoeuvreVerified:
            valid,

        scenario:
            validationResult?.scenario ??
            null,

        deterministic:
            true,

        backendConnection:
            false,

        physicalExecution:
            false,

        ruleDerived:
            validationResult?.ruleDerivedSolution ??
            null,

        result:
            valid
                ? "TRIAL MANOEUVRE VALIDATION PASS"
                : "TRIAL MANOEUVRE VALIDATION FAIL"
    };
}


/* ============================================================
   PUBLIC INTERFACE
============================================================ */

window.BiodieselTrialManoeuvre = {

    version:
        BIODIESEL_TRIAL_MANOEUVRE_VERSION,

    run:
        runBiodieselTrialManoeuvre,

    verify:
        verifyBiodieselTrialManoeuvre

};