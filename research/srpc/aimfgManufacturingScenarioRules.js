"use strict"

/*
 * Sextant Resilience Processing Core (SRPC)
 * AIMfg Manufacturing Scenario Rules — v0.1
 *
 * PURPOSE:
 * Provide governed, data-only manufacturing-resilience scenario rules
 * for AIMfg research and deterministic simulation.
 *
 * DOCTRINE:
 * DATA → ALGORITHMS → COMPUTE
 *
 * DESIGN:
 * - Rules remain in data structures.
 * - SRPC core remains domain-independent.
 * - This module is additive research only.
 * - Existing AIMfg input-validation rules remain unchanged.
 * - No backend connection.
 * - No external connection.
 * - No physical execution.
 * - No autonomous actuation.
 * - Human authority remains external.
 *
 * RESEARCH BOUNDARY:
 * These are illustrative research/model rules.
 * They are not validated industrial-control rules, production controls,
 * safety-certified rules, or A*STAR-approved manufacturing rules.
 */

const AIMFG_MANUFACTURING_SCENARIO_RULES_VERSION =
    "0.1.0-RESEARCH";

const AIMFG_MANUFACTURING_SCENARIO_RULE_DATA = [

    {
        ruleId: "AIMFG-MFG-001",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_MANUFACTURING_LINE_DEGRADATION",

        name: "LINE_DEGRADATION_INPUT_REVIEW",

        triggerConditions: [
            "A manufacturing machine reports degradation.",
            "The affected machine is associated with production activity."
        ],

        indicators: [
            "affectedMachine",
            "faultCondition",
            "productionImpact",
            "remainingCapability"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            condition: "faultCondition === DEGRADATION",
            impactLevels: [
                "LOW",
                "MODERATE",
                "HIGH",
                "CRITICAL"
            ],
            capabilityRange: {
                minimum: 0,
                maximum: 100,
                unit: "PERCENT"
            }
        },

        expectedCascade: [
            "Affected machine performance may reduce.",
            "Dependent production processes may be affected.",
            "Production throughput may decrease."
        ],

        contingencyActions: [
            "Maintain controlled production if capability permits.",
            "Review dependent processes.",
            "Confirm available redundancy."
        ],

        recoveryActions: [
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "ISOLATE_AFFECTED_PROCESS",
            "ESCALATE_FOR_MAINTENANCE"
        ],

        auditRequirements: [
            "Record observed machine condition.",
            "Record production impact.",
            "Record remaining capability.",
            "Record selected recovery recommendation.",
            "Record human authorization status."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    },

    {
        ruleId: "AIMFG-MFG-002",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_CRITICAL_MACHINE_FAILURE",

        name: "CRITICAL_MACHINE_FAILURE_REVIEW",

        triggerConditions: [
            "A critical manufacturing machine is unavailable.",
            "The machine failure affects one or more production processes."
        ],

        indicators: [
            "affectedMachine",
            "machineCriticality",
            "productionImpact",
            "dependentProcesses",
            "availableRedundancy"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            criticalityRequired: true,
            minimumDependentProcesses: 0,
            minimumAvailableRedundancy: 0
        },

        expectedCascade: [
            "Critical machine availability may be lost.",
            "Dependent production processes may stop or degrade.",
            "Production continuity may be reduced."
        ],

        contingencyActions: [
            "Confirm machine-failure state.",
            "Identify dependent production processes.",
            "Check whether an alternate machine is available.",
            "Preserve controlled operating state."
        ],

        recoveryActions: [
            "ISOLATE_AFFECTED_PROCESS",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "ESCALATE_FOR_MAINTENANCE",
            "MAINTAIN_CONTROLLED_PRODUCTION"
        ],

        auditRequirements: [
            "Record machine-failure observation.",
            "Record criticality classification.",
            "Record affected processes.",
            "Record redundancy assessment.",
            "Record human recovery authorization."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    },

    {
        ruleId: "AIMFG-MFG-003",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_REDUNDANCY_TRANSFER",

        name: "REDUNDANCY_TRANSFER_REVIEW",

        triggerConditions: [
            "A production-affecting machine is degraded or unavailable.",
            "One or more redundant resources are reported."
        ],

        indicators: [
            "affectedMachine",
            "availableRedundancy",
            "remainingCapability",
            "dependentProcesses",
            "productionImpact"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            redundancyRequired: true,
            minimumAvailableRedundancy: 1,
            capabilityRange: {
                minimum: 0,
                maximum: 100,
                unit: "PERCENT"
            }
        },

        expectedCascade: [
            "Load transfer may alter dependent-process conditions.",
            "Redundant capacity may become constrained.",
            "Additional degradation may occur if transfer capacity is insufficient."
        ],

        contingencyActions: [
            "Verify redundant-resource availability.",
            "Compare required and available capability.",
            "Review dependent-process compatibility.",
            "Do not perform automatic transfer."
        ],

        recoveryActions: [
            "REQUEST_REDUNDANCY_TRANSFER_REVIEW",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "ESCALATE_FOR_MAINTENANCE"
        ],

        auditRequirements: [
            "Record redundancy count.",
            "Record transfer assessment.",
            "Record capability before proposed transfer.",
            "Record capability after simulated transfer.",
            "Record human authorization decision."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    },

    {
        ruleId: "AIMFG-MFG-004",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_PRODUCTION_BOTTLENECK",

        name: "PRODUCTION_BOTTLENECK_REVIEW",

        triggerConditions: [
            "Production demand exceeds the available modeled capability.",
            "One or more processes report constrained throughput."
        ],

        indicators: [
            "productionDemand",
            "remainingCapability",
            "dependentProcesses",
            "productionImpact",
            "availableRedundancy"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            demandComparisonRequired: true,
            capabilityRange: {
                minimum: 0,
                maximum: 100,
                unit: "PERCENT"
            }
        },

        expectedCascade: [
            "Work-in-progress may accumulate.",
            "Downstream processes may become under-supplied.",
            "Production completion time may increase."
        ],

        contingencyActions: [
            "Review process throughput.",
            "Identify the constrained production stage.",
            "Compare available and required capability.",
            "Consider controlled production-rate reduction."
        ],

        recoveryActions: [
            "REDUCE_PRODUCTION_RATE",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "ISOLATE_AFFECTED_PROCESS",
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "ESCALATE_FOR_MAINTENANCE"
        ],

        auditRequirements: [
            "Record bottleneck indicators.",
            "Record modeled capability.",
            "Record affected processes.",
            "Record proposed throughput adjustment.",
            "Record human authorization status."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    },

    {
        ruleId: "AIMFG-MFG-005",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_CASCADE_PROCESS_DISRUPTION",

        name: "CASCADE_PROCESS_DISRUPTION_REVIEW",

        triggerConditions: [
            "A machine or process disruption affects dependent processes.",
            "More than one production dependency is identified."
        ],

        indicators: [
            "affectedMachine",
            "dependentProcesses",
            "productionImpact",
            "availableRedundancy",
            "remainingCapability"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            minimumDependentProcesses: 1,
            cascadeAssessmentRequired: true,
            capabilityRange: {
                minimum: 0,
                maximum: 100,
                unit: "PERCENT"
            }
        },

        expectedCascade: [
            "The initiating disruption may affect dependent processes.",
            "Multiple process dependencies may reduce production resilience.",
            "Redundancy may be consumed across more than one process."
        ],

        contingencyActions: [
            "Map affected process dependencies.",
            "Identify the first affected process.",
            "Identify downstream process exposure.",
            "Review available isolation and redundancy options."
        ],

        recoveryActions: [
            "ISOLATE_AFFECTED_PROCESS",
            "REDUCE_PRODUCTION_RATE",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "ESCALATE_FOR_MAINTENANCE"
        ],

        auditRequirements: [
            "Record initiating disruption.",
            "Record dependency count.",
            "Record modeled cascade path.",
            "Record affected-process list.",
            "Record human review and authorization."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    },

    {
        ruleId: "AIMFG-MFG-006",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_QUALITY_PROCESS_DEGRADATION",

        name: "QUALITY_PROCESS_DEGRADATION_REVIEW",

        triggerConditions: [
            "A quality-related manufacturing process reports degradation.",
            "The degradation may affect product or process quality."
        ],

        indicators: [
            "affectedMachine",
            "faultCondition",
            "productionImpact",
            "dependentProcesses",
            "remainingCapability"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            qualityImpactReviewRequired: true,
            capabilityRange: {
                minimum: 0,
                maximum: 100,
                unit: "PERCENT"
            }
        },

        expectedCascade: [
            "Quality inspection or process-control capacity may be reduced.",
            "Nonconforming output risk may require review.",
            "Downstream production may require controlled restriction."
        ],

        contingencyActions: [
            "Review quality-process condition.",
            "Separate production continuity from quality acceptance.",
            "Request additional diagnostics.",
            "Consider process isolation."
        ],

        recoveryActions: [
            "ISOLATE_AFFECTED_PROCESS",
            "REDUCE_PRODUCTION_RATE",
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "ESCALATE_FOR_MAINTENANCE",
            "REQUEST_ADDITIONAL_DIAGNOSTICS"
        ],

        auditRequirements: [
            "Record quality-process observation.",
            "Record affected process.",
            "Record quality-impact assessment.",
            "Record diagnostic recommendation.",
            "Record human authorization status."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    },

    {
        ruleId: "AIMFG-MFG-007",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_SUPPLY_CHAIN_DISRUPTION",

        name: "SUPPLY_CHAIN_DISRUPTION_REVIEW",

        triggerConditions: [
            "A required manufacturing input or material is constrained.",
            "The constraint may affect one or more production processes."
        ],

        indicators: [
            "affectedMaterial",
            "materialAvailability",
            "dependentProcesses",
            "productionImpact",
            "remainingCapability"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            materialAvailabilityReviewRequired: true,
            capabilityRange: {
                minimum: 0,
                maximum: 100,
                unit: "PERCENT"
            }
        },

        expectedCascade: [
            "Material shortages may interrupt production flow.",
            "Dependent processes may become unavailable.",
            "Production scheduling may require revision."
        ],

        contingencyActions: [
            "Identify affected material or input.",
            "Identify dependent processes.",
            "Review available inventory assumptions.",
            "Assess controlled production alternatives."
        ],

        recoveryActions: [
            "REDUCE_PRODUCTION_RATE",
            "ISOLATE_AFFECTED_PROCESS",
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "ESCALATE_FOR_MAINTENANCE",
            "REQUEST_ADDITIONAL_DIAGNOSTICS"
        ],

        auditRequirements: [
            "Record supply-chain observation.",
            "Record affected material.",
            "Record affected processes.",
            "Record modeled production impact.",
            "Record human authorization decision."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    },

    {
        ruleId: "AIMFG-MFG-008",
        version: "0.1.0-RESEARCH",
        domain: "AIMFG_MANUFACTURING",
        scenario: "AIMFG_MAINTENANCE_RESOURCE_CONSTRAINT",

        name: "MAINTENANCE_RESOURCE_CONSTRAINT_REVIEW",

        triggerConditions: [
            "A manufacturing asset requires maintenance attention.",
            "Maintenance personnel, tools, parts, or time are constrained."
        ],

        indicators: [
            "affectedMachine",
            "maintenanceResourceAvailability",
            "productionImpact",
            "remainingCapability",
            "availableRedundancy"
        ],

        thresholdLogic: {
            type: "RESEARCH_CLASSIFICATION",
            maintenanceAvailabilityReviewRequired: true,
            capabilityRange: {
                minimum: 0,
                maximum: 100,
                unit: "PERCENT"
            }
        },

        expectedCascade: [
            "Repair or restoration may be delayed.",
            "The affected machine may remain degraded for longer.",
            "Production exposure may increase over time."
        ],

        contingencyActions: [
            "Record maintenance-resource constraints.",
            "Review safe controlled-production assumptions.",
            "Review redundancy availability.",
            "Escalate unresolved maintenance requirements."
        ],

        recoveryActions: [
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "REDUCE_PRODUCTION_RATE",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "ISOLATE_AFFECTED_PROCESS",
            "ESCALATE_FOR_MAINTENANCE"
        ],

        auditRequirements: [
            "Record maintenance constraint.",
            "Record affected machine.",
            "Record available capability.",
            "Record modeled exposure.",
            "Record human authorization status."
        ],

        versionHistory: [
            "0.1.0-RESEARCH — Initial research rule."
        ]
    }
];

/**
 * Return a defensive copy of the complete scenario-rule catalogue.
 */
function getAIMfgManufacturingScenarioRules() {

    return AIMFG_MANUFACTURING_SCENARIO_RULE_DATA.map(function (rule) {

        return JSON.parse(JSON.stringify(rule));

    });
}

/**
 * Find one scenario rule by identifier.
 */
function getAIMfgManufacturingScenarioRuleById(ruleId) {

    const rule =
        AIMFG_MANUFACTURING_SCENARIO_RULE_DATA.find(function (item) {

            return item.ruleId === ruleId;

        });

    return rule
        ? JSON.parse(JSON.stringify(rule))
        : null;
}

/**
 * Return all rules belonging to one scenario.
 */
function getAIMfgManufacturingScenarioRulesByScenario(scenario) {

    return AIMFG_MANUFACTURING_SCENARIO_RULE_DATA
        .filter(function (rule) {

            return rule.scenario === scenario;

        })
        .map(function (rule) {

            return JSON.parse(JSON.stringify(rule));

        });
}

/**
 * Return the available scenario identifiers.
 */
function getAIMfgManufacturingScenarioRuleScenarioIds() {

    return Array.from(
        new Set(
            AIMFG_MANUFACTURING_SCENARIO_RULE_DATA.map(function (rule) {

                return rule.scenario;

            })
        )
    );
}

/**
 * Return catalogue status.
 */
function getAIMfgManufacturingScenarioRulesStatus() {

    return {

        version:
            AIMFG_MANUFACTURING_SCENARIO_RULES_VERSION,

        domain:
            "AIMFG_MANUFACTURING",

        ruleCount:
            AIMFG_MANUFACTURING_SCENARIO_RULE_DATA.length,

        scenarioCount:
            getAIMfgManufacturingScenarioRuleScenarioIds().length,

        dataOnly:
            true,

        researchOnly:
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
 * Public AIMfg manufacturing scenario-rule API.
 */
window.AIMfgManufacturingScenarioRules = {

    version:
        AIMFG_MANUFACTURING_SCENARIO_RULES_VERSION,

    domain:
        "AIMFG_MANUFACTURING",

    getRules:
        getAIMfgManufacturingScenarioRules,

    getRuleById:
        getAIMfgManufacturingScenarioRuleById,

    getRulesByScenario:
        getAIMfgManufacturingScenarioRulesByScenario,

    getScenarioIds:
        getAIMfgManufacturingScenarioRuleScenarioIds,

    getStatus:
        getAIMfgManufacturingScenarioRulesStatus
};