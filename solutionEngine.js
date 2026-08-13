/* ============================================================
   SEXTANT PROTOCOL™ — SOLUTION ENGINE
   Captain AI Lena Decision Support
   RULE-DERIVED SOLUTIONS ONLY
   LOCAL DETERMINISTIC EXECUTION

   Golden Rule:
   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   PURPOSE:
   Captain AI Lena does not invent a solution from a generic
   stress score.

   The solution must be derived from the authoritative domain
   rule result.

   Human Decision Authority remains the final execution gate.
============================================================ */

const SOLUTION_ENGINE_VERSION = "1.0.0";

/* ============================================================
   SOLUTION STATUS
============================================================ */

const SOLUTION_STATUS = {

    RULE_VERIFIED:
        "RULE_VERIFIED",

    SOLUTION_DERIVED:
        "SOLUTION_DERIVED",

    HUMAN_AUTHORIZATION_REQUIRED:
        "HUMAN_AUTHORIZATION_REQUIRED",

    NO_RULE:
        "NO_AUTHORITATIVE_RULE",

    INVALID_INPUT:
        "INVALID_INPUT"
};


/* ============================================================
   INPUT VALIDATION
============================================================ */

function validateSolutionInput(
    scenario,
    state,
    ruleResult
) {

    if (!scenario) {

        return {
            valid: false,
            status:
                SOLUTION_STATUS.INVALID_INPUT,
            reason:
                "Scenario not supplied."
        };
    }

    if (!state || typeof state !== "object") {

        return {
            valid: false,
            status:
                SOLUTION_STATUS.INVALID_INPUT,
            reason:
                "Scenario state not supplied."
        };
    }

    if (!ruleResult) {

        return {
            valid: false,
            status:
                SOLUTION_STATUS.NO_RULE,
            reason:
                "No authoritative rule result supplied."
        };
    }

    if (!ruleResult.verified) {

        return {
            valid: false,
            status:
                SOLUTION_STATUS.NO_RULE,
            reason:
                "Authoritative rule verification failed."
        };
    }

    return {
        valid: true,
        status:
            SOLUTION_STATUS.RULE_VERIFIED
    };
}


/* ============================================================
   SOLUTION DERIVATION
============================================================ */

function deriveSolutionFromRule(
    scenario,
    state,
    ruleResult
) {

    const validation =
        validateSolutionInput(
            scenario,
            state,
            ruleResult
        );

    if (!validation.valid) {

        return {

            agent:
                "Captain AI Lena",

            scenario,

            status:
                validation.status,

            decision:
                "REQUEST_ADDITIONAL_DIAGNOSTICS",

            recommendedRecovery:
                "NO_ACTION_UNTIL_AUTHORITATIVE_RULE_IS_VERIFIED",

            ruleBasis:
                validation.reason,

            authority:
                "HUMAN OPERATOR",

            execution:
                "HUMAN AUTHORIZATION REQUIRED"
        };
    }

    const solution =
        ruleResult.solution;

    const recovery =
        ruleResult.recommendedRecovery;

    return {

        agent:
            "Captain AI Lena",

        scenario,

        status:
            SOLUTION_STATUS.SOLUTION_DERIVED,

        ruleStatus:
            SOLUTION_STATUS.RULE_VERIFIED,

        decision:
            solution,

        recommendedRecovery:
            recovery,

        ruleBasis: {

            ruleEngine:
                ruleResult.ruleEngine,

            domain:
                ruleResult.domain,

            priority:
                ruleResult.rulePriority,

            ruleApplied:
                ruleResult.basis
                    ?.ruleApplied ?? null,

            observedState:
                ruleResult.basis ?? {}
        },

        reasoning:
            "Solution derived from the verified authoritative domain rule.",

        authority:
            "HUMAN OPERATOR",

        execution:
            "HUMAN AUTHORIZATION REQUIRED"
    };
}


/* ============================================================
   GOLDEN RULE DECISION OBJECT
============================================================ */

function createCaptainLenaDecision(
    scenario,
    state,
    ruleResult,
    assessment
) {

    const solution =
        deriveSolutionFromRule(
            scenario,
            state,
            ruleResult
        );

    return {

        pipeline:
            "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE",

        scenario,

        observed:
            state,

        verification: {

            verified:
                ruleResult.verified,

            ruleSource:
                ruleResult.ruleEngine,

            deterministic:
                true
        },

        assessment:
            assessment || null,

        decision:
            solution,

        executionGate: {

            status:
                "HUMAN_AUTHORIZATION_REQUIRED",

            automaticExecution:
                false
        }
    };
}


/* ============================================================
   HUMAN AUTHORIZATION HANDOFF
============================================================ */

function prepareHumanDecision(
    captainDecision
) {

    if (!captainDecision) {

        return {

            status:
                "INVALID_DECISION",

            execution:
                "BLOCKED"
        };
    }

    return {

        authority:
            "HUMAN OPERATOR",

        status:
            "PENDING",

        proposedDecision:
            captainDecision.decision.decision,

        proposedRecovery:
            captainDecision.decision
                .recommendedRecovery,

        executionGate:
            "HUMAN_AUTHORIZATION_REQUIRED",

        automaticExecution:
            false
    };
}


/* ============================================================
   SOLUTION PANEL FORMAT
============================================================ */

function formatSolutionPanel(
    captainDecision
) {

    if (!captainDecision) {

        return {

            status:
                "WAITING",

            message:
                "No Captain AI Lena solution available."
        };
    }

    const decision =
        captainDecision.decision;

    return {

        scenario:
            captainDecision.scenario,

        agent:
            decision.agent,

        solution:
            decision.decision,

        recommendedRecovery:
            decision.recommendedRecovery,

        ruleApplied:
            decision.ruleBasis
                ?.ruleApplied ?? null,

        rulePriority:
            decision.ruleBasis
                ?.priority ?? null,

        reasoning:
            decision.reasoning,

        authority:
            decision.authority,

        execution:
            decision.execution
    };
}


/* ============================================================
   EXPORT
============================================================ */

window.SextantSolutionEngine = {

    version:
        SOLUTION_ENGINE_VERSION,

    status:
        SOLUTION_STATUS,

    validateSolutionInput,

    deriveSolutionFromRule,

    createCaptainLenaDecision,

    prepareHumanDecision,

    formatSolutionPanel
};