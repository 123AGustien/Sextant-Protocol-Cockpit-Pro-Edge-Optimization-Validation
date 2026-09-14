"use strict"

/*
 * Sextant Resilience Processing Core (SRPC)
 * AIMfg Manufacturing Resilience Rules — v0.1
 *
 * PURPOSE:
 * Provide externally defined manufacturing-resilience research
 * rules for the A*STAR AIMfg research scenario.
 *
 * RESEARCH SCENARIO:
 * AIMFG_MANUFACTURING_LINE_DEGRADATION
 *
 * DOCTRINE:
 * DATA → ALGORITHMS → COMPUTE
 *
 * DESIGN:
 * - Manufacturing rules remain in data structures.
 * - SRPC core remains domain-independent.
 * - This module is additive research only.
 * - No modification of srpcRules.js.
 * - No backend connection.
 * - No external connection.
 * - No physical execution.
 * - No autonomous actuation.
 * - Human authority remains external.
 *
 * RESEARCH BOUNDARY:
 * This module does not claim factory control, production deployment,
 * semiconductor implementation, or safety certification.
 */

const AIMFG_MANUFACTURING_RULES_VERSION = "0.1.0-RESEARCH";

/**
 * AIMfg manufacturing resilience research rule definitions.
 *
 * These rules represent a deterministic research model for assessing
 * manufacturing-line degradation and generating structured recovery
 * recommendations.
 *
 * They are research rules only.
 */
const AIMFG_MANUFACTURING_RULE_DATA = [

    {
        ruleId: "AIMFG-RULE-001",
        name: "MANUFACTURING_SYSTEM_PRESENT",
        description: "Confirm that manufacturing system-state data is available.",
        enabled: true,
        priority: 1,

        condition: function (systemState) {
            return (
                systemState !== null &&
                typeof systemState === "object" &&
                typeof systemState.systemId === "string" &&
                systemState.systemId.length > 0
            );
        },

        resultWhenTrue: "MANUFACTURING_SYSTEM_AVAILABLE",
        resultWhenFalse: "MANUFACTURING_SYSTEM_MISSING"
    },

    {
        ruleId: "AIMFG-RULE-002",
        name: "MACHINE_DEGRADATION_PRESENT",
        description: "Confirm that an affected manufacturing machine and degradation condition are identified.",
        enabled: true,
        priority: 2,

        condition: function (systemState) {
            return (
                typeof systemState.affectedMachine === "string" &&
                systemState.affectedMachine.length > 0 &&
                systemState.faultCondition === "DEGRADATION"
            );
        },

        resultWhenTrue: "MACHINE_DEGRADATION_IDENTIFIED",
        resultWhenFalse: "MACHINE_DEGRADATION_NOT_IDENTIFIED"
    },

    {
        ruleId: "AIMFG-RULE-003",
        name: "PRODUCTION_IMPACT_PRESENT",
        description: "Confirm that the production impact has been classified.",
        enabled: true,
        priority: 3,

        condition: function (systemState) {
            return (
                typeof systemState.productionImpact === "string" &&
                [
                    "LOW",
                    "MODERATE",
                    "HIGH",
                    "CRITICAL"
                ].includes(systemState.productionImpact)
            );
        },

        resultWhenTrue: "PRODUCTION_IMPACT_CLASSIFIED",
        resultWhenFalse: "PRODUCTION_IMPACT_UNCLASSIFIED"
    },

    {
        ruleId: "AIMFG-RULE-004",
        name: "DEPENDENCY_DATA_PRESENT",
        description: "Confirm that dependent-process information is available.",
        enabled: true,
        priority: 4,

        condition: function (systemState) {
            return (
                typeof systemState.dependentProcesses === "number" &&
                Number.isFinite(systemState.dependentProcesses) &&
                systemState.dependentProcesses >= 0
            );
        },

        resultWhenTrue: "DEPENDENCY_DATA_AVAILABLE",
        resultWhenFalse: "DEPENDENCY_DATA_MISSING"
    },

    {
        ruleId: "AIMFG-RULE-005",
        name: "REDUNDANCY_DATA_PRESENT",
        description: "Confirm that available manufacturing redundancy is quantified.",
        enabled: true,
        priority: 5,

        condition: function (systemState) {
            return (
                typeof systemState.availableRedundancy === "number" &&
                Number.isFinite(systemState.availableRedundancy) &&
                systemState.availableRedundancy >= 0
            );
        },

        resultWhenTrue: "REDUNDANCY_DATA_AVAILABLE",
        resultWhenFalse: "REDUNDANCY_DATA_MISSING"
    },

    {
        ruleId: "AIMFG-RULE-006",
        name: "REMAINING_CAPABILITY_VALID",
        description: "Confirm that remaining manufacturing capability is within the research range.",
        enabled: true,
        priority: 6,

        condition: function (systemState) {
            return (
                typeof systemState.remainingCapability === "number" &&
                Number.isFinite(systemState.remainingCapability) &&
                systemState.remainingCapability >= 0 &&
                systemState.remainingCapability <= 100
            );
        },

        resultWhenTrue: "REMAINING_CAPABILITY_VALID",
        resultWhenFalse: "REMAINING_CAPABILITY_INVALID"
    },

    {
        ruleId: "AIMFG-RULE-007",
        name: "RECOVERY_OPTION_AVAILABLE",
        description: "Confirm that a structured recovery option can be considered.",
        enabled: true,
        priority: 7,

        condition: function (systemState) {

            if (
                typeof systemState.remainingCapability !== "number" ||
                typeof systemState.availableRedundancy !== "number"
            ) {
                return false;
            }

            return (
                systemState.remainingCapability > 0 ||
                systemState.availableRedundancy > 0
            );
        },

        resultWhenTrue: "RECOVERY_OPTION_AVAILABLE",
        resultWhenFalse: "RECOVERY_OPTION_REQUIRES_REVIEW"
    },

    {
        ruleId: "AIMFG-RULE-008",
        name: "HUMAN_AUTHORITY_REQUIRED",
        description: "Confirm that manufacturing recovery remains subject to human authorization.",
        enabled: true,
        priority: 8,

        condition: function (systemState) {
            return (
                systemState.humanAuthorizationRequired === true
            );
        },

        resultWhenTrue: "HUMAN_AUTHORIZATION_REQUIRED",
        resultWhenFalse: "HUMAN_AUTHORIZATION_REQUIREMENT_MISSING"
    }
];

/**
 * Return a copy of the AIMfg manufacturing rule data.
 *
 * Executable conditions are intentionally excluded from the returned
 * public data copy, matching the SRPC research rules pattern.
 */
function getAIMfgManufacturingRules() {

    return AIMFG_MANUFACTURING_RULE_DATA.map(function (rule) {

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
 * Find an AIMfg manufacturing rule by identifier.
 */
function getAIMfgManufacturingRuleById(ruleId) {

    return AIMFG_MANUFACTURING_RULE_DATA.find(function (rule) {

        return rule.ruleId === ruleId;

    }) || null;
}

/**
 * Evaluate one AIMfg manufacturing rule.
 */
function evaluateAIMfgManufacturingRule(rule, systemState) {

    if (!rule || typeof rule.condition !== "function") {

        return {
            evaluated: false,
            ruleId: rule ? rule.ruleId : null,
            passed: false,
            result: "RULE_INVALID",
            reason: "A valid AIMfg manufacturing research rule is required."
        };
    }

    if (rule.enabled !== true) {

        return {
            evaluated: false,
            ruleId: rule.ruleId,
            passed: false,
            result: "RULE_DISABLED",
            reason: "The AIMfg manufacturing research rule is disabled."
        };
    }

    const passed = Boolean(
        rule.condition(systemState)
    );

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
 * Evaluate all enabled AIMfg manufacturing rules.
 */
function evaluateAllAIMfgManufacturingRules(systemState) {

    const results = AIMFG_MANUFACTURING_RULE_DATA
        .filter(function (rule) {

            return rule.enabled === true;

        })
        .sort(function (firstRule, secondRule) {

            return firstRule.priority - secondRule.priority;

        })
        .map(function (rule) {

            return evaluateAIMfgManufacturingRule(
                rule,
                systemState
            );

        });

    const passedCount = results.filter(function (result) {

        return result.passed === true;

    }).length;

    const failedCount = results.filter(function (result) {

        return result.passed === false;

    }).length;

    return {

        rulesVersion:
            AIMFG_MANUFACTURING_RULES_VERSION,

        domain:
            "AIMFG_MANUFACTURING",

        scenario:
            "AIMFG_MANUFACTURING_LINE_DEGRADATION",

        evaluated: true,

        totalRules:
            results.length,

        passedCount:
            passedCount,

        failedCount:
            failedCount,

        allPassed:
            failedCount === 0,

        results:
            results,

        physicalExecution:
            false,

        backendConnection:
            false,

        externalConnection:
            false,

        autonomousActuation:
            false,

        humanAuthorizationRequired:
            true
    };
}

/**
 * Return a compact AIMfg manufacturing resilience assessment.
 */
function assessAIMfgManufacturingRules(systemState) {

    const evaluation =
        evaluateAllAIMfgManufacturingRules(
            systemState
        );

    let assessment =
        "MANUFACTURING_INPUT_REQUIRES_REVIEW";

    if (evaluation.allPassed === true) {

        assessment =
            "MANUFACTURING_INPUT_PASSES_RULE_CHECKS";
    }

    return {

        rulesVersion:
            AIMFG_MANUFACTURING_RULES_VERSION,

        domain:
            "AIMFG_MANUFACTURING",

        scenario:
            "AIMFG_MANUFACTURING_LINE_DEGRADATION",

        assessment:
            assessment,

        ruleEvaluation:
            evaluation,

        physicalExecution:
            false,

        backendConnection:
            false,

        externalConnection:
            false,

        autonomousActuation:
            false,

        humanAuthorizationRequired:
            true
    };
}

/**
 * Public AIMfg manufacturing rules API.
 */
window.AIMfgManufacturingRules = {

    version:
        AIMFG_MANUFACTURING_RULES_VERSION,

    domain:
        "AIMFG_MANUFACTURING",

    scenario:
        "AIMFG_MANUFACTURING_LINE_DEGRADATION",

    getRules:
        getAIMfgManufacturingRules,

    getRuleById:
        getAIMfgManufacturingRuleById,

    evaluateRule:
        evaluateAIMfgManufacturingRule,

    evaluateAll:
        evaluateAllAIMfgManufacturingRules,

    assess:
        assessAIMfgManufacturingRules
};