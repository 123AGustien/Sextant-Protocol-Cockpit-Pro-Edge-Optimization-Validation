/* ============================================================
   SPD v13.1 — AUTHORITATIVE DOMAIN RULES
   Captain AI Lena Autonomous Agent Core

   PURPOSE:
   Scenario-specific rules are the authoritative source for
   solution generation.

   IMPORTANT:
   - Generic stress scores DO NOT generate solutions.
   - Rules generate findings and required controls.
   - Captain AI Lena derives the recommended solution from
     those verified rules.
   - No physical execution occurs in this module.
   - Human authorization remains mandatory.
============================================================ */

const DOMAIN_RULES = {

    /* ========================================================
       FIN — FINANCIAL RESILIENCE
    ======================================================== */

    FIN: {

        BANKING_STRESS: {
            domain: "FIN",
            scenario: "BANKING_STRESS",

            rules: [
                {
                    id: "FIN-BANK-001",
                    condition: state => state.fx < 30,
                    finding: "FOREIGN_EXCHANGE_STRESS",
                    control: "MONITOR_FX_EXPOSURE"
                },
                {
                    id: "FIN-BANK-002",
                    condition: state => state.inf > 60,
                    finding: "INFLATIONARY_PRESSURE",
                    control: "MONITOR_INFLATION_EXPOSURE"
                }
            ],

            solution: {
                primary: "MAINTAIN_FINANCIAL_SAFE_STATE",
                recovery: "CONTINUE_FINANCIAL_MONITORING"
            }
        },

        LIQUIDITY_CRISIS: {
            domain: "FIN",
            scenario: "LIQUIDITY_CRISIS",

            rules: [
                {
                    id: "FIN-LIQ-001",
                    condition: state => state.fx < 30,
                    finding: "LIQUIDITY_FX_PRESSURE",
                    control: "PROTECT_LIQUIDITY"
                },
                {
                    id: "FIN-LIQ-002",
                    condition: state.inf > 60,
                    finding: "LIQUIDITY_COST_PRESSURE",
                    control: "CONTROL_LIQUIDITY_EXPOSURE"
                }
            ],

            solution: {
                primary: "LIQUIDITY_PROTECTION_MODE",
                recovery: "CONTINUE_LIQUIDITY_MONITORING"
            }
        }
    },


    /* ========================================================
       BHR — BUSINESS & HUMAN RIGHTS RESILIENCE
    ======================================================== */

    BHR: {

        FORCED_LABOUR: {
            domain: "BHR",
            scenario: "FORCED_LABOUR",

            rules: [
                {
                    id: "BHR-FL-001",
                    condition: state => state.bhr >= 40,
                    finding: "FORCED_LABOUR_RISK",
                    control: "INITIATE_HUMAN_RIGHTS_DUE_DILIGENCE"
                },
                {
                    id: "BHR-FL-002",
                    condition: state => state.bhr >= 70,
                    finding: "SEVERE_FORCED_LABOUR_RISK",
                    control: "ESCALATE_TO_AUTHORITY"
                }
            ],

            solution: {
                primary: "SUSPEND_AFFECTED_ACTIVITY_PENDING_REVIEW",
                recovery: "INITIATE_REMEDIATION_AND_DUE_DILIGENCE"
            }
        },

        CHILD_LABOUR: {
            domain: "BHR",
            scenario: "CHILD_LABOUR",

            rules: [
                {
                    id: "BHR-CL-001",
                    condition: state => state.bhr >= 40,
                    finding: "CHILD_LABOUR_RISK",
                    control: "INITIATE_IMMEDIATE_REVIEW"
                },
                {
                    id: "BHR-CL-002",
                    condition: state => state.bhr >= 70,
                    finding: "SEVERE_CHILD_LABOUR_RISK",
                    control: "ESCALATE_AND_PROTECT_AFFECTED_PERSONS"
                }
            ],

            solution: {
                primary: "SUSPEND_AFFECTED_ACTIVITY_PENDING_REVIEW",
                recovery: "PROTECT_AFFECTED_PERSONS_AND_INITIATE_REMEDIATION"
            }
        },

        OCCUPATIONAL_HEALTH_SAFETY: {
            domain: "BHR",
            scenario: "OCCUPATIONAL_HEALTH_SAFETY",

            rules: [
                {
                    id: "BHR-OHS-001",
                    condition: state => state.bhr >= 40,
                    finding: "OCCUPATIONAL_SAFETY_RISK",
                    control: "INITIATE_SAFETY_REVIEW"
                },
                {
                    id: "BHR-OHS-002",
                    condition: state => state.bhr >= 70,
                    finding: "SEVERE_SAFETY_RISK",
                    control: "STOP_AFFECTED_OPERATION_AND_ESCALATE"
                }
            ],

            solution: {
                primary: "MAINTAIN_SAFE_STATE",
                recovery: "SAFETY_REVIEW_AND_REMEDIATION"
            }
        }
    },


    /* ========================================================
       ENERGY — ENERGY RESILIENCE
    ======================================================== */

    ENERGY: {

        BIODIESEL_SHORTAGE: {
            domain: "ENERGY",
            scenario: "BIODIESEL_SHORTAGE",

            rules: [

                {
                    id: "EN-BIO-001",

                    condition: state =>
                        state.energy >= 40 &&
                        state.energy < 70,

                    finding:
                        "ENERGY_SUPPLY_PRESSURE",

                    control:
                        "INCREASE_ENERGY_SUPPLY_MONITORING"
                },

                {
                    id: "EN-BIO-002",

                    condition: state =>
                        state.energy >= 70 &&
                        state.energy < 85,

                    finding:
                        "HIGH_BIODIESEL_SUPPLY_RISK",

                    control:
                        "PROTECT_AVAILABLE_ENERGY_RESERVE"
                },

                {
                    id: "EN-BIO-003",

                    condition: state =>
                        state.energy >= 85,

                    finding:
                        "CRITICAL_BIODIESEL_SUPPLY_RISK",

                    control:
                        "ESCALATE_ENERGY_CONTINGENCY_RESPONSE"
                }
            ],

            solution: {
                low: {
                    primary:
                        "MAINTAIN_SAFE_STATE",

                    recovery:
                        "CONTINUE_MONITORING"
                },

                medium: {
                    primary:
                        "ENERGY_PROTECTION_MODE",

                    recovery:
                        "PROTECT_RESERVE_AND_CONTINUE_MONITORING"
                },

                high: {
                    primary:
                        "ENERGY_CONTINGENCY_MODE",

                    recovery:
                        "ESCALATE_AND_ACTIVATE_CONTINGENCY_PLAN"
                }
            }
        }
    }
};


/* ============================================================
   RULE EVALUATION
============================================================ */

function evaluateDomainRules(domain, scenario, state) {

    const domainRules =
        DOMAIN_RULES[domain];

    if (!domainRules) {

        return {
            verified: false,
            domain,
            scenario,
            error: "DOMAIN_RULES_NOT_FOUND"
        };
    }

    const scenarioRules =
        domainRules[scenario];

    if (!scenarioRules) {

        return {
            verified: false,
            domain,
            scenario,
            error: "SCENARIO_RULES_NOT_FOUND"
        };
    }

    const findings = [];
    const controls = [];
    const matchedRules = [];

    scenarioRules.rules.forEach(rule => {

        let matched = false;

        try {
            matched = Boolean(
                rule.condition(state)
            );
        }
        catch(error) {
            matched = false;
        }

        if (matched) {

            matchedRules.push(rule.id);

            findings.push(
                rule.finding
            );

            controls.push(
                rule.control
            );
        }
    });

    return {

        verified: true,

        domain,

        scenario,

        matchedRules,

        findings,

        requiredControls: controls,

        ruleCount:
            scenarioRules.rules.length,

        matchedRuleCount:
            matchedRules.length,

        ruleSource:
            "AUTHORITATIVE_DOMAIN_RULES"
    };
}


/* ============================================================
   SOLUTION DERIVATION
============================================================ */

function deriveRuleSolution(
    domain,
    scenario,
    state,
    assessment
) {

    const domainRules =
        DOMAIN_RULES[domain];

    if (!domainRules) {

        return {
            valid: false,
            error: "DOMAIN_RULES_NOT_FOUND"
        };
    }

    const scenarioRules =
        domainRules[scenario];

    if (!scenarioRules) {

        return {
            valid: false,
            error: "SCENARIO_RULES_NOT_FOUND"
        };
    }

    /*
       ENERGY BIODIESEL RULE SELECTION
    */

    if (
        domain === "ENERGY" &&
        scenario === "BIODIESEL_SHORTAGE"
    ) {

        let solution =
            scenarioRules.solution.low;

        if (
            state.energy >= 70 &&
            state.energy < 85
        ) {
            solution =
                scenarioRules.solution.medium;
        }

        if (
            state.energy >= 85
        ) {
            solution =
                scenarioRules.solution.high;
        }

        return {

            valid: true,

            source:
                "AUTHORITATIVE_DOMAIN_RULES",

            domain,

            scenario,

            ruleAssessment:
                evaluateDomainRules(
                    domain,
                    scenario,
                    state
                ),

            solution
        };
    }


    /*
       DEFAULT RULE SOLUTION
    */

    return {

        valid: true,

        source:
            "AUTHORITATIVE_DOMAIN_RULES",

        domain,

        scenario,

        ruleAssessment:
            evaluateDomainRules(
                domain,
                scenario,
                state
            ),

        solution:
            scenarioRules.solution
    };
}


/* ============================================================
   PUBLIC DOMAIN RULE API
============================================================ */

const DomainRulesAPI = {

    getRules(domain, scenario) {

        if (
            !DOMAIN_RULES[domain] ||
            !DOMAIN_RULES[domain][scenario]
        ) {
            return null;
        }

        return DOMAIN_RULES[domain][scenario];
    },

    evaluate(
        domain,
        scenario,
        state
    ) {

        return evaluateDomainRules(
            domain,
            scenario,
            state
        );
    },

    deriveSolution(
        domain,
        scenario,
        state,
        assessment
    ) {

        return deriveRuleSolution(
            domain,
            scenario,
            state,
            assessment
        );
    }
};


/* ============================================================
   BROWSER EXPORT
============================================================ */

if (typeof window !== "undefined") {

    window.DOMAIN_RULES =
        DOMAIN_RULES;

    window.DomainRulesAPI =
        DomainRulesAPI;

    window.evaluateDomainRules =
        evaluateDomainRules;

    window.deriveRuleSolution =
        deriveRuleSolution;
}