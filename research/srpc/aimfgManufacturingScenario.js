"use strict"

/*
 * Sextant Resilience Processing Core (SRPC)
 * A*STAR AIMfg Manufacturing Resilience Scenario — v0.1
 *
 * PURPOSE:
 * Provide an isolated manufacturing-resilience research scenario
 * using the AIMfg manufacturing rule-data layer.
 *
 * SCENARIO:
 * AIMFG_MANUFACTURING_LINE_DEGRADATION
 *
 * DOCTRINE:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * RESEARCH BOUNDARY:
 * - Local deterministic simulation only.
 * - No backend connection.
 * - No external connection.
 * - No physical execution.
 * - No autonomous actuation.
 * - Human authorization remains required.
 *
 * ARCHITECTURE:
 * Manufacturing State
 *        ↓
 * AIMfg Rule Data
 *        ↓
 * Rule Evaluation
 *        ↓
 * Resilience Assessment
 *        ↓
 * Recovery Options
 *        ↓
 * Human Authorization
 *        ↓
 * Simulated / Recommended Action
 *        ↓
 * Updated Research State
 *
 * This is a research demonstrator only.
 */

const AIMFG_MANUFACTURING_SCENARIO_VERSION =
    "0.1.0-RESEARCH";

const AIMFG_MANUFACTURING_SCENARIO_ID =
    "AIMFG_MANUFACTURING_LINE_DEGRADATION";

/**
 * Default deterministic manufacturing research state.
 *
 * This represents a controlled research scenario:
 * MACHINE-03 is degraded, production impact is moderate,
 * three processes are dependent on the affected machine,
 * one redundancy path is available, and remaining capability
 * is estimated at 72%.
 */
const AIMFG_DEFAULT_SCENARIO_STATE = {

    source:
        "AIMFG_MANUFACTURING_RESEARCH",

    purpose:
        "MANUFACTURING_RESILIENCE_SCENARIO",

    scenario:
        AIMFG_MANUFACTURING_SCENARIO_ID,

    systemId:
        "AIMFG-DEMO-01",

    productionCells:
        2,

    criticalMachines:
        8,

    affectedMachine:
        "MACHINE-03",

    faultCondition:
        "DEGRADATION",

    productionImpact:
        "MODERATE",

    dependentProcesses:
        3,

    availableRedundancy:
        1,

    remainingCapability:
        72,

    systemStatus:
        "DEGRADED",

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

/**
 * Recovery options.
 *
 * These are structured research recommendations.
 * They are NOT executable manufacturing commands.
 */
const AIMFG_RECOVERY_OPTIONS = [

    {
        optionId:
            "AIMFG-OPTION-001",

        name:
            "MAINTAIN_CONTROLLED_PRODUCTION",

        description:
            "Maintain controlled production while monitoring the degraded machine.",

        suitability:
            "AVAILABLE"
    },

    {
        optionId:
            "AIMFG-OPTION-002",

        name:
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",

        description:
            "Research option to transfer affected workload to an available redundant machine.",

        suitability:
            "AVAILABLE_WHEN_REDUNDANCY_EXISTS"
    },

    {
        optionId:
            "AIMFG-OPTION-003",

        name:
            "REDUCE_PRODUCTION_RATE",

        description:
            "Reduce production rate to preserve system resilience during degradation.",

        suitability:
            "AVAILABLE"
    },

    {
        optionId:
            "AIMFG-OPTION-004",

        name:
            "ISOLATE_AFFECTED_PROCESS",

        description:
            "Isolate the affected process within the research model.",

        suitability:
            "AVAILABLE"
    },

    {
        optionId:
            "AIMFG-OPTION-005",

        name:
            "ESCALATE_FOR_MAINTENANCE",

        description:
            "Escalate the degraded machine for maintenance review.",

        suitability:
            "AVAILABLE"
    }
];

/**
 * Clone the default scenario state.
 */
function createAIMfgManufacturingScenario() {

    return Object.assign(
        {},
        AIMFG_DEFAULT_SCENARIO_STATE
    );
}

/**
 * Validate the basic manufacturing scenario structure.
 */
function validateAIMfgManufacturingScenario(
    systemState
) {

    if (
        !systemState ||
        typeof systemState !== "object"
    ) {

        return {
            valid: false,
            reason:
                "Manufacturing system state is missing."
        };
    }

    const requiredFields = [

        "systemId",
        "productionCells",
        "criticalMachines",
        "affectedMachine",
        "faultCondition",
        "productionImpact",
        "dependentProcesses",
        "availableRedundancy",
        "remainingCapability"

    ];

    const missingFields =
        requiredFields.filter(function (field) {

            return (
                systemState[field] === undefined ||
                systemState[field] === null
            );

        });

    if (missingFields.length > 0) {

        return {

            valid: false,

            reason:
                "Required manufacturing scenario data is missing.",

            missingFields:
                missingFields
        };
    }

    return {

        valid: true,

        reason:
            "Manufacturing scenario structure is valid.",

        missingFields:
            []
    };
}

/**
 * Calculate a deterministic research assessment.
 *
 * This calculation does not control equipment.
 */
function calculateAIMfgResilienceAssessment(
    systemState
) {

    const capability =
        Number(systemState.remainingCapability);

    const redundancy =
        Number(systemState.availableRedundancy);

    const dependentProcesses =
        Number(systemState.dependentProcesses);

    let resilienceLevel =
        "REQUIRES_REVIEW";

    if (
        capability >= 80 &&
        redundancy > 0
    ) {

        resilienceLevel =
            "STABLE_WITH_REDUNDANCY";

    } else if (
        capability >= 60 &&
        redundancy > 0
    ) {

        resilienceLevel =
            "CONTROLLED_DEGRADATION";

    } else if (
        capability >= 40
    ) {

        resilienceLevel =
            "DEGRADED";

    } else {

        resilienceLevel =
            "SEVERE_DEGRADATION";
    }

    let cascadeLevel =
        "LOW";

    if (dependentProcesses >= 5) {

        cascadeLevel =
            "HIGH";

    } else if (dependentProcesses >= 3) {

        cascadeLevel =
            "MODERATE";
    }

    return {

        remainingCapability:
            capability,

        availableRedundancy:
            redundancy,

        dependentProcesses:
            dependentProcesses,

        resilienceLevel:
            resilienceLevel,

        cascadeLevel:
            cascadeLevel,

        productionImpact:
            systemState.productionImpact
    };
}

/**
 * Generate structured recovery recommendations.
 *
 * No recommendation constitutes an executable command.
 */
function generateAIMfgRecoveryDecision(
    systemState,
    assessment
) {

    const options =
        AIMFG_RECOVERY_OPTIONS.map(function (option) {

            return Object.assign(
                {},
                option
            );

        });

    let recommendedOption =
        "ESCALATE_FOR_MAINTENANCE";

    if (
        assessment.availableRedundancy > 0 &&
        assessment.remainingCapability >= 60
    ) {

        recommendedOption =
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE";

    } else if (
        assessment.remainingCapability >= 40
    ) {

        recommendedOption =
            "REDUCE_PRODUCTION_RATE";
    }

    return {

        decisionStatus:
            "RECOVERY_OPTION_GENERATED",

        recommendedOption:
            recommendedOption,

        options:
            options,

        authority:
            "HUMAN_OPERATOR",

        authorizationRequired:
            true,

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

/**
 * Execute the complete AIMfg research scenario.
 *
 * "ACT" is deliberately represented as a simulated/recommended
 * action only. No manufacturing equipment is controlled.
 */
function runAIMfgManufacturingScenario(
    suppliedState
) {

    const systemState =
        suppliedState
            ? Object.assign({}, suppliedState)
            : createAIMfgManufacturingScenario();

    const observation = {

        stage:
            "OBSERVE",

        systemState:
            systemState,

        observed:
            true
    };

    const verification =
        validateAIMfgManufacturingScenario(
            systemState
        );

    const ruleModule =
        window.AIMfgManufacturingRules;

    if (
        !ruleModule ||
        typeof ruleModule.evaluateAll !== "function"
    ) {

        return {

            scenarioVersion:
                AIMFG_MANUFACTURING_SCENARIO_VERSION,

            scenario:
                AIMFG_MANUFACTURING_SCENARIO_ID,

            passed:
                false,

            status:
                "AIMFG_RULE_MODULE_UNAVAILABLE",

            observation:
                observation,

            verification:
                verification,

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

    if (verification.valid !== true) {

        return {

            scenarioVersion:
                AIMFG_MANUFACTURING_SCENARIO_VERSION,

            scenario:
                AIMFG_MANUFACTURING_SCENARIO_ID,

            passed:
                false,

            status:
                "AIMFG_SCENARIO_INPUT_INVALID",

            observation:
                observation,

            verification:
                verification,

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

    const ruleEvaluation =
        ruleModule.evaluateAll(
            systemState
        );

    const assessment =
        calculateAIMfgResilienceAssessment(
            systemState
        );

    const decision =
        generateAIMfgRecoveryDecision(
            systemState,
            assessment
        );

    const simulatedAction = {

        stage:
            "ACT",

        mode:
            "SIMULATED_RECOMMENDATION_ONLY",

        action:
            decision.recommendedOption,

        executed:
            false,

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

    const updatedState =
        Object.assign(
            {},
            systemState,
            {
                systemStatus:
                    "RECOVERY_OPTION_IDENTIFIED",

                lastResearchDecision:
                    decision.recommendedOption
            }
        );

    const update = {

        stage:
            "UPDATE",

        updated:
            true,

        systemState:
            updatedState
    };

    return {

        scenarioVersion:
            AIMFG_MANUFACTURING_SCENARIO_VERSION,

        scenario:
            AIMFG_MANUFACTURING_SCENARIO_ID,

        passed:
            ruleEvaluation.allPassed === true,

        status:
            ruleEvaluation.allPassed === true
                ? "AIMFG_MANUFACTURING_RESILIENCE_RESEARCH_PASS"
                : "AIMFG_MANUFACTURING_RESILIENCE_REQUIRES_REVIEW",

        doctrine:
            "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE",

        observation:
            observation,

        verification:
            verification,

        ruleEvaluation:
            ruleEvaluation,

        assessment:
            assessment,

        decision:
            decision,

        simulatedAction:
            simulatedAction,

        update:
            update,

        safetyBoundary: {

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
        }
    };
}

/**
 * Determinism test.
 *
 * Execute the same scenario twice and compare the
 * deterministic research outputs.
 */
function testAIMfgManufacturingScenarioDeterminism() {

    const first =
        runAIMfgManufacturingScenario();

    const second =
        runAIMfgManufacturingScenario();

    const firstOutput =
        JSON.stringify(first);

    const secondOutput =
        JSON.stringify(second);

    const deterministic =
        firstOutput === secondOutput;

    return {

        scenarioVersion:
            AIMFG_MANUFACTURING_SCENARIO_VERSION,

        deterministic:
            deterministic,

        status:
            deterministic
                ? "AIMFG_SCENARIO_DETERMINISM_PASS"
                : "AIMFG_SCENARIO_DETERMINISM_FAIL",

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
 * Return recovery options as data.
 */
function getAIMfgRecoveryOptions() {

    return AIMFG_RECOVERY_OPTIONS.map(
        function (option) {

            return Object.assign(
                {},
                option
            );

        }
    );
}

/**
 * Public AIMfg manufacturing scenario API.
 */
window.AIMfgManufacturingScenario = {

    version:
        AIMFG_MANUFACTURING_SCENARIO_VERSION,

    scenario:
        AIMFG_MANUFACTURING_SCENARIO_ID,

    create:
        createAIMfgManufacturingScenario,

    validate:
        validateAIMfgManufacturingScenario,

    assess:
        calculateAIMfgResilienceAssessment,

    getRecoveryOptions:
        getAIMfgRecoveryOptions,

    run:
        runAIMfgManufacturingScenario,

    testDeterminism:
        testAIMfgManufacturingScenarioDeterminism
};