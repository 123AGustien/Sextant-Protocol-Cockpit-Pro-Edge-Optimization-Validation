"use strict";

/*
 * Sextant Resilience Processing Core (SRPC)
 * Research Rules Module — v0.1
 *
 * PURPOSE:
 * Provide externally defined, deterministic research rules for SRPC.
 *
 * DOCTRINE:
 * DATA → ALGORITHMS → COMPUTE
 *
 * DESIGN:
 * - Rules remain in data structures.
 * - The kernel remains domain-independent.
 * - No backend connection.
 * - No external connection.
 * - No physical execution.
 * - No autonomous actuation.
 * - Human authority remains external.
 */

const SRPC_RULES_VERSION = "0.1.0-RESEARCH";

/**
 * SRPC research rule definitions.
 *
 * These are illustrative research rules only.
 * They are not operational, safety-certified, or production rules.
 */
const SRPC_RULE_DATA = [
    {
        ruleId: "SRPC-RULE-001",
        name: "SYSTEM_STATE_PRESENT",
        description: "Confirm that system-state data is available.",
        enabled: true,
        priority: 1,
        condition: function (systemState) {
            return (
                systemState !== null &&
                typeof systemState === "object" &&
                Object.keys(systemState).length > 0
            );
        },
        resultWhenTrue: "SYSTEM_STATE_AVAILABLE",
        resultWhenFalse: "SYSTEM_STATE_MISSING"
    },

    {
        ruleId: "SRPC-RULE-002",
        name: "RESILIENCE_SCORE_PRESENT",
        description: "Check whether a resilience score is supplied.",
        enabled: true,
        priority: 2,
        condition: function (systemState) {
            return typeof systemState.resilienceScore === "number";
        },
        resultWhenTrue: "RESILIENCE_SCORE_AVAILABLE",
        resultWhenFalse: "RESILIENCE_SCORE_MISSING"
    },

    {
        ruleId: "SRPC-RULE-003",
        name: "RESILIENCE_SCORE_RANGE",
        description: "Check whether the resilience score is between 0 and 100.",
        enabled: true,
        priority: 3,
        condition: function (systemState) {
            if (typeof systemState.resilienceScore !== "number") {
                return false;
            }

            return (
                systemState.resilienceScore >= 0 &&
                systemState.resilienceScore <= 100
            );
        },
        resultWhenTrue: "RESILIENCE_SCORE_IN_RANGE",
        resultWhenFalse: "RESILIENCE_SCORE_OUT_OF_RANGE"
    },

    {
        ruleId: "SRPC-RULE-004",
        name: "RESEARCH_INPUT_VALID",
        description: "Confirm that the supplied research input is usable.",
        enabled: true,
        priority: 4,
        condition: function (systemState) {
            return (
                systemState !== null &&
                typeof systemState === "object"
            );
        },
        resultWhenTrue: "RESEARCH_INPUT_VALID",
        resultWhenFalse: "RESEARCH_INPUT_INVALID"
    }
];

/**
 * Return a copy of the research rule data.
 *
 * Rules are exposed as data while executable conditions remain
 * attached to the rule definitions for this browser-based prototype.
 */
function getSRPCRules() {
    return SRPC_RULE_DATA.map(function (rule) {
        return {
            ruleId: rule.ruleId,
            name: rule.name,
            description: rule.description,
            enabled: rule.enabled,
            priority: rule.priority,
            resultWhenTrue: rule.resultWhenTrue,
            resultWhenFalse: rule.resultWhenFalse
        };
    });
}

/**
 * Find a rule by its identifier.
 */
function getSRPCRuleById(ruleId) {
    return SRPC_RULE_DATA.find(function (rule) {
        return rule.ruleId === ruleId;
    }) || null;
}

/**
 * Evaluate one rule against system-state data.
 */
function evaluateSRPCRule(rule, systemState) {
    if (!rule || typeof rule.condition !== "function") {
        return {
            evaluated: false,
            ruleId: rule ? rule.ruleId : null,
            passed: false,
            result: "RULE_INVALID",
            reason: "A valid executable rule is required."
        };
    }

    if (rule.enabled !== true) {
        return {
            evaluated: false,
            ruleId: rule.ruleId,
            passed: false,
            result: "RULE_DISABLED",
            reason: "The rule is disabled."
        };
    }

    const passed = Boolean(rule.condition(systemState));

    return {
        evaluated: true,
        ruleId: rule.ruleId,
        ruleName: rule.name,
        priority: rule.priority,
        passed: passed,
        result: passed
            ? rule.resultWhenTrue
            : rule.resultWhenFalse
    };
}

/**
 * Evaluate all enabled SRPC research rules.
 */
function evaluateAllSRPCRules(systemState) {
    const results = SRPC_RULE_DATA
        .filter(function (rule) {
            return rule.enabled === true;
        })
        .sort(function (firstRule, secondRule) {
            return firstRule.priority - secondRule.priority;
        })
        .map(function (rule) {
            return evaluateSRPCRule(rule, systemState);
        });

    const passedCount = results.filter(function (result) {
        return result.passed === true;
    }).length;

    const failedCount = results.filter(function (result) {
        return result.passed === false;
    }).length;

    return {
        rulesVersion: SRPC_RULES_VERSION,
        evaluated: true,
        totalRules: results.length,
        passedCount: passedCount,
        failedCount: failedCount,
        allPassed: failedCount === 0,
        results: results,
        physicalExecution: false,
        backendConnection: false,
        externalConnection: false,
        humanAuthorizationRequired: true
    };
}

/**
 * Return a compact research assessment.
 */
function assessSRPCRules(systemState) {
    const evaluation = evaluateAllSRPCRules(systemState);

    let assessment = "RESEARCH_INPUT_REQUIRES_REVIEW";

    if (evaluation.allPassed === true) {
        assessment = "RESEARCH_INPUT_PASSES_RULE_CHECKS";
    }

    return {
        rulesVersion: SRPC_RULES_VERSION,
        assessment: assessment,
        ruleEvaluation: evaluation,
        physicalExecution: false,
        backendConnection: false,
        externalConnection: false,
        humanAuthorizationRequired: true
    };
}

/**
 * Public SRPC rules API.
 */
window.SRPCRules = {
    version: SRPC_RULES_VERSION,

    getRules: getSRPCRules,
    getRuleById: getSRPCRuleById,
    evaluateRule: evaluateSRPCRule,
    evaluateAll: evaluateAllSRPCRules,
    assess: assessSRPCRules
};