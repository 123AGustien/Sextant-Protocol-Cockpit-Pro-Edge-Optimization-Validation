"use strict"

/*
 * Sextant Resilience Processing Core (SRPC)
 * AIMfg Manufacturing Scenario Rule Engine — v0.1
 *
 * PURPOSE:
 * Execute the algorithmic layer for the governed, data-only
 * AIMfg manufacturing scenario-rule catalogue.
 *
 * ARCHITECTURE:
 * DATA → ALGORITHMS → COMPUTE
 *
 * DATA SOURCE:
 * aimfgManufacturingScenarioRules.js
 *
 * DESIGN:
 * - Scenario rules remain in the data catalogue.
 * - This engine matches and evaluates rule applicability.
 * - This engine does not redefine manufacturing rules.
 * - SRPC core remains domain-independent.
 * - Deterministic local research execution only.
 * - No backend connection.
 * - No external connection.
 * - No physical execution.
 * - No autonomous actuation.
 * - Human authority remains external.
 *
 * RESEARCH BOUNDARY:
 * This engine is a research demonstrator.
 * It is not an industrial-control engine, production controller,
 * safety-certified system, or A*STAR-approved manufacturing system.
 */

const AIMFG_MANUFACTURING_SCENARIO_RULE_ENGINE_VERSION =
    "0.1.0-RESEARCH";

/**
 * Confirm that the scenario-rule data catalogue is available.
 */
function isScenarioRuleDataAvailable() {

    return (
        typeof window.AIMfgManufacturingScenarioRules === "object" &&
        typeof window.AIMfgManufacturingScenarioRules.getRules === "function" &&
        typeof window.AIMfgManufacturingScenarioRules.getRulesByScenario === "function"
    );
}

/**
 * Validate the selected scenario identifier.
 */
function validateScenario(scenario) {

    if (
        typeof scenario !== "string" ||
        scenario.trim().length === 0
    ) {
        return {
            valid: false,
            reason: "A valid AIMfg manufacturing scenario identifier is required."
        };
    }

    if (!isScenarioRuleDataAvailable()) {
        return {
            valid: false,
            reason: "AIMfg manufacturing scenario-rule data is unavailable."
        };
    }

    const scenarioIds =
        window.AIMfgManufacturingScenarioRules.getScenarioIds();

    const valid =
        Array.isArray(scenarioIds) &&
        scenarioIds.includes(scenario);

    return {
        valid: valid,
        scenario: scenario,
        reason: valid
            ? "Scenario identifier is available in the rule catalogue."
            : "Scenario identifier is not available in the rule catalogue."
    };
}

/**
 * Retrieve all governed rules for one scenario.
 */
function getRulesForScenario(scenario) {

    const validation =
        validateScenario(scenario);

    if (validation.valid !== true) {
        return [];
    }

    return window.AIMfgManufacturingScenarioRules
        .getRulesByScenario(scenario);
}

/**
 * Confirm whether a rule contains the minimum governed data structure.
 */
function validateRuleStructure(rule) {

    if (
        !rule ||
        typeof rule !== "object"
    ) {
        return {
            valid: false,
            reason: "Rule record is not an object."
        };
    }

    const requiredFields = [
        "ruleId",
        "version",
        "domain",
        "scenario",
        "triggerConditions",
        "indicators",
        "thresholdLogic",
        "expectedCascade",
        "contingencyActions",
        "recoveryActions",
        "auditRequirements",
        "versionHistory"
    ];

    const missingFields =
        requiredFields.filter(function (field) {

            return !Object.prototype.hasOwnProperty.call(
                rule,
                field
            );

        });

    return {
        valid: missingFields.length === 0,
        ruleId: rule.ruleId || null,
        missingFields: missingFields,
        reason: missingFields.length === 0
            ? "Rule structure is valid."
            : "Rule structure is incomplete."
    };
}

/**
 * Check whether a rule's indicators are represented in the supplied state.
 *
 * This is an indicator-presence check only.
 * It does not invent values or perform industrial-control actions.
 */
function evaluateRuleIndicators(rule, systemState) {

    const indicators =
        Array.isArray(rule.indicators)
            ? rule.indicators
            : [];

    const state =
        systemState &&
        typeof systemState === "object"
            ? systemState
            : {};

    const indicatorResults =
        indicators.map(function (indicator) {

            const present =
                Object.prototype.hasOwnProperty.call(
                    state,
                    indicator
                ) &&
                state[indicator] !== null &&
                typeof state[indicator] !== "undefined";

            return {
                indicator: indicator,
                present: present
            };

        });

    const missingIndicators =
        indicatorResults
            .filter(function (result) {

                return result.present !== true;

            })
            .map(function (result) {

                return result.indicator;

            });

    return {
        evaluated: true,
        indicators: indicatorResults,
        missingIndicators: missingIndicators,
        allIndicatorsPresent:
            missingIndicators.length === 0
    };
}

/**
 * Evaluate one governed scenario rule.
 *
 * The engine performs:
 * - Rule-structure verification.
 * - Scenario matching.
 * - Indicator-presence evaluation.
 *
 * Threshold logic remains governed data and is reported,
 * not converted into hidden executable manufacturing rules.
 */
function evaluateScenarioRule(rule, scenario, systemState) {

    const structure =
        validateRuleStructure(rule);

    if (structure.valid !== true) {

        return {
            evaluated: false,
            ruleId: rule ? rule.ruleId : null,
            scenario: scenario,
            passed: false,
            status: "RULE_STRUCTURE_INVALID",
            structureValidation: structure
        };
    }

    const scenarioMatch =
        rule.scenario === scenario;

    if (scenarioMatch !== true) {

        return {
            evaluated: false,
            ruleId: rule.ruleId,
            scenario: scenario,
            passed: false,
            status: "SCENARIO_MISMATCH",
            structureValidation: structure
        };
    }

    const indicatorEvaluation =
        evaluateRuleIndicators(
            rule,
            systemState
        );

    return {

        evaluated: true,

        ruleId:
            rule.ruleId,

        ruleVersion:
            rule.version,

        ruleName:
            rule.name,

        domain:
            rule.domain,

        scenario:
            scenario,

        passed:
            indicatorEvaluation.allIndicatorsPresent,

        status:
            indicatorEvaluation.allIndicatorsPresent
                ? "RULE_INDICATORS_PRESENT"
                : "RULE_INDICATORS_REQUIRES_REVIEW",

        structureValidation:
            structure,

        indicatorEvaluation:
            indicatorEvaluation,

        triggerConditions:
            rule.triggerConditions,

        thresholdLogic:
            rule.thresholdLogic,

        expectedCascade:
            rule.expectedCascade,

        contingencyActions:
            rule.contingencyActions,

        recoveryActions:
            rule.recoveryActions,

        auditRequirements:
            rule.auditRequirements
    };
}

/**
 * Evaluate all governed scenario rules for a selected scenario.
 */
function evaluateAllAIMfgManufacturingScenarioRules(
    scenario,
    systemState = {}
) {

    const scenarioValidation =
        validateScenario(scenario);

    if (scenarioValidation.valid !== true) {

        return {

            evaluated: false,

            rulesVersion:
                AIMFG_MANUFACTURING_SCENARIO_RULE_ENGINE_VERSION,

            domain:
                "AIMFG_MANUFACTURING",

            scenario:
                scenario,

            totalRules:
                0,

            evaluatedRules:
                0,

            passedCount:
                0,

            failedCount:
                0,

            allPassed:
                false,

            status:
                "SCENARIO_REQUIRES_REVIEW",

            reason:
                scenarioValidation.reason,

            results:
                [],

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

    const rules =
        getRulesForScenario(scenario);

    const results =
        rules.map(function (rule) {

            return evaluateScenarioRule(
                rule,
                scenario,
                systemState
            );

        });

    const passedCount =
        results.filter(function (result) {

            return result.passed === true;

        }).length;

    const failedCount =
        results.filter(function (result) {

            return result.passed !== true;

        }).length;

    return {

        evaluated:
            true,

        rulesVersion:
            AIMFG_MANUFACTURING_SCENARIO_RULE_ENGINE_VERSION,

        domain:
            "AIMFG_MANUFACTURING",

        scenario:
            scenario,

        totalRules:
            rules.length,

        evaluatedRules:
            results.filter(function (result) {

                return result.evaluated === true;

            }).length,

        passedCount:
            passedCount,

        failedCount:
            failedCount,

        allPassed:
            results.length > 0 &&
            failedCount === 0,

        status:
            failedCount === 0 &&
            results.length > 0
                ? "SCENARIO_RULES_PASS"
                : "SCENARIO_RULES_REQUIRES_REVIEW",

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
 * Produce a compact scenario-rule assessment.
 */
function assessAIMfgManufacturingScenarioRules(
    scenario,
    systemState = {}
) {

    const evaluation =
        evaluateAllAIMfgManufacturingScenarioRules(
            scenario,
            systemState
        );

    return {

        rulesVersion:
            AIMFG_MANUFACTURING_SCENARIO_RULE_ENGINE_VERSION,

        domain:
            "AIMFG_MANUFACTURING",

        scenario:
            scenario,

        assessment:
            evaluation.allPassed === true
                ? "SCENARIO_RULES_PASS"
                : "SCENARIO_RULES_REQUIRES_REVIEW",

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
 * Test deterministic repeatability.
 */
function testAIMfgManufacturingScenarioRuleEngineDeterminism(
    scenario,
    systemState = {}
) {

    const firstResult =
        evaluateAllAIMfgManufacturingScenarioRules(
            scenario,
            systemState
        );

    const secondResult =
        evaluateAllAIMfgManufacturingScenarioRules(
            scenario,
            systemState
        );

    const firstSerialized =
        JSON.stringify(firstResult);

    const secondSerialized =
        JSON.stringify(secondResult);

    return {

        deterministic:
            firstSerialized === secondSerialized,

        firstResult:
            firstResult,

        secondResult:
            secondResult
    };
}

/**
 * Return engine status.
 */
function getAIMfgManufacturingScenarioRuleEngineStatus() {

    return {

        version:
            AIMFG_MANUFACTURING_SCENARIO_RULE_ENGINE_VERSION,

        domain:
            "AIMFG_MANUFACTURING",

        dataCatalogueAvailable:
            isScenarioRuleDataAvailable(),

        algorithm:
            "SCENARIO_MATCHING_AND_INDICATOR_EVALUATION",

        dataOnlyRules:
            true,

        deterministic:
            true,

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
 * Public AIMfg manufacturing scenario-rule engine API.
 */
window.AIMfgManufacturingScenarioRuleEngine = {

    version:
        AIMFG_MANUFACTURING_SCENARIO_RULE_ENGINE_VERSION,

    domain:
        "AIMFG_MANUFACTURING",

    validateScenario:
        validateScenario,

    getRulesForScenario:
        getRulesForScenario,

    validateRuleStructure:
        validateRuleStructure,

    evaluateRule:
        evaluateScenarioRule,

    evaluateAll:
        evaluateAllAIMfgManufacturingScenarioRules,

    assess:
        assessAIMfgManufacturingScenarioRules,

    testDeterminism:
        testAIMfgManufacturingScenarioRuleEngineDeterminism,

    getStatus:
        getAIMfgManufacturingScenarioRuleEngineStatus
};