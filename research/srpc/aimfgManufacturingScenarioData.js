"use strict"

/*
 * Sextant Resilience Processing Core (SRPC)
 * AIMfg Manufacturing Scenario Data — v0.1.0-RESEARCH
 *
 * PURPOSE:
 * Authoritative scenario-data catalogue for AIMfg manufacturing
 * resilience research.
 *
 * DOCTRINE:
 * DATA → ALGORITHMS → COMPUTE
 *
 * GOLDEN RULE:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * IMPORTANT:
 * - This file contains DATA ONLY.
 * - No executable decision logic.
 * - No physical execution.
 * - No backend connection.
 * - No external connection.
 * - No autonomous execution.
 * - Human authorization remains mandatory.
 *
 * ARCHITECTURE:
 *
 * AIMfg Manufacturing Scenario Data
 *              ↓
 * AIMfg Manufacturing Rule Data
 *              ↓
 * AIMfg Manufacturing Rule Engine
 *              ↓
 * AIMfg Manufacturing Scenario Engine
 *              ↓
 * AIMfg Manufacturing Domain Integration
 *              ↓
 * AIMfg Manufacturing Module
 *              ↓
 * Cockpit / Human Authorization
 */

const AIMFG_MANUFACTURING_SCENARIO_DATA_VERSION =
    "0.1.0-RESEARCH";

const AIMFG_MANUFACTURING_SCENARIO_DOMAIN =
    "AIMFG_MANUFACTURING";

const AIMFG_MANUFACTURING_SCENARIO_DATA = {

    AIMFG_MANUFACTURING_LINE_DEGRADATION: {

        scenarioId:
            "AIMFG_MANUFACTURING_LINE_DEGRADATION",

        name:
            "Manufacturing Line Degradation",

        category:
            "EQUIPMENT_DEGRADATION",

        description:
            "Reduced capability of a manufacturing machine affecting production continuity.",

        defaultState: {

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
                72
        },

        assessmentDimensions: [

            "PRODUCTION_IMPACT",
            "DEPENDENT_PROCESSES",
            "REDUNDANCY",
            "REMAINING_CAPABILITY",
            "CASCADE_RISK"
        ],

        recoveryOptions: [

            "MAINTAIN_CONTROLLED_PRODUCTION",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "ISOLATE_AFFECTED_PROCESS",
            "ESCALATE_FOR_MAINTENANCE"
        ]
    },


    AIMFG_CRITICAL_MACHINE_FAILURE: {

        scenarioId:
            "AIMFG_CRITICAL_MACHINE_FAILURE",

        name:
            "Critical Machine Failure",

        category:
            "EQUIPMENT_FAILURE",

        description:
            "Complete loss of a critical manufacturing machine requiring resilience assessment and recovery planning.",

        defaultState: {

            systemId:
                "AIMFG-DEMO-01",

            productionCells:
                2,

            criticalMachines:
                8,

            affectedMachine:
                "MACHINE-03",

            faultCondition:
                "CRITICAL_FAILURE",

            productionImpact:
                "HIGH",

            dependentProcesses:
                4,

            availableRedundancy:
                1,

            remainingCapability:
                58
        },

        assessmentDimensions: [

            "PRODUCTION_IMPACT",
            "CRITICAL_MACHINE_STATUS",
            "DEPENDENT_PROCESSES",
            "REDUNDANCY",
            "REMAINING_CAPABILITY",
            "CASCADE_RISK"
        ],

        recoveryOptions: [

            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "ISOLATE_AFFECTED_PROCESS",
            "ESCALATE_FOR_MAINTENANCE",
            "MAINTAIN_SAFE_PRODUCTION_STATE"
        ]
    },


    AIMFG_REDUNDANCY_TRANSFER: {

        scenarioId:
            "AIMFG_REDUNDANCY_TRANSFER",

        name:
            "Redundancy Transfer",

        category:
            "RESILIENCE_TRANSFER",

        description:
            "Transfer of manufacturing workload from an affected machine to available redundant capacity.",

        defaultState: {

            systemId:
                "AIMFG-DEMO-01",

            productionCells:
                2,

            criticalMachines:
                8,

            affectedMachine:
                "MACHINE-03",

            faultCondition:
                "CAPACITY_REDUCTION",

            productionImpact:
                "MODERATE",

            dependentProcesses:
                3,

            availableRedundancy:
                2,

            remainingCapability:
                76
        },

        assessmentDimensions: [

            "AVAILABLE_REDUNDANCY",
            "TRANSFER_CAPACITY",
            "DEPENDENT_PROCESSES",
            "REMAINING_CAPABILITY",
            "PRODUCTION_CONTINUITY"
        ],

        recoveryOptions: [

            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "BALANCE_PRODUCTION_LOAD",
            "MAINTAIN_CONTROLLED_PRODUCTION",
            "REDUCE_PRODUCTION_RATE",
            "ESCALATE_FOR_MAINTENANCE"
        ]
    },


    AIMFG_PRODUCTION_BOTTLENECK: {

        scenarioId:
            "AIMFG_PRODUCTION_BOTTLENECK",

        name:
            "Production Bottleneck",

        category:
            "CAPACITY_CONSTRAINT",

        description:
            "A constrained manufacturing process reduces overall production throughput.",

        defaultState: {

            systemId:
                "AIMFG-DEMO-01",

            productionCells:
                2,

            criticalMachines:
                8,

            affectedMachine:
                "MACHINE-05",

            faultCondition:
                "CAPACITY_CONSTRAINT",

            productionImpact:
                "MODERATE",

            dependentProcesses:
                5,

            availableRedundancy:
                1,

            remainingCapability:
                64
        },

        assessmentDimensions: [

            "THROUGHPUT",
            "PROCESS_CAPACITY",
            "DEPENDENT_PROCESSES",
            "REDUNDANCY",
            "REMAINING_CAPABILITY",
            "CASCADE_RISK"
        ],

        recoveryOptions: [

            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "BALANCE_PRODUCTION_LOAD",
            "REDUCE_PRODUCTION_RATE",
            "ISOLATE_BOTTLENECK",
            "ESCALATE_FOR_CAPACITY_RECOVERY"
        ]
    },


    AIMFG_CASCADE_PROCESS_DISRUPTION: {

        scenarioId:
            "AIMFG_CASCADE_PROCESS_DISRUPTION",

        name:
            "Cascade Process Disruption",

        category:
            "DEPENDENCY_CASCADE",

        description:
            "A manufacturing disturbance propagates across dependent processes.",

        defaultState: {

            systemId:
                "AIMFG-DEMO-01",

            productionCells:
                2,

            criticalMachines:
                8,

            affectedMachine:
                "MACHINE-02",

            faultCondition:
                "PROCESS_DISRUPTION",

            productionImpact:
                "HIGH",

            dependentProcesses:
                6,

            availableRedundancy:
                1,

            remainingCapability:
                51
        },

        assessmentDimensions: [

            "DEPENDENCY_DEPTH",
            "CASCADE_LEVEL",
            "PRODUCTION_IMPACT",
            "REDUNDANCY",
            "REMAINING_CAPABILITY",
            "PROCESS_ISOLATION"
        ],

        recoveryOptions: [

            "ISOLATE_AFFECTED_PROCESS",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "MAINTAIN_SAFE_PRODUCTION_STATE",
            "ESCALATE_FOR_CASCADE_DIAGNOSTICS"
        ]
    },


    AIMFG_QUALITY_PROCESS_DEGRADATION: {

        scenarioId:
            "AIMFG_QUALITY_PROCESS_DEGRADATION",

        name:
            "Quality Process Degradation",

        category:
            "QUALITY_DEGRADATION",

        description:
            "Degradation in a manufacturing process creates potential quality and production impacts.",

        defaultState: {

            systemId:
                "AIMFG-DEMO-01",

            productionCells:
                2,

            criticalMachines:
                8,

            affectedMachine:
                "MACHINE-06",

            faultCondition:
                "QUALITY_DEGRADATION",

            productionImpact:
                "MODERATE",

            dependentProcesses:
                2,

            availableRedundancy:
                1,

            remainingCapability:
                69
        },

        assessmentDimensions: [

            "QUALITY_IMPACT",
            "PRODUCTION_IMPACT",
            "DEPENDENT_PROCESSES",
            "REDUNDANCY",
            "REMAINING_CAPABILITY"
        ],

        recoveryOptions: [

            "ISOLATE_AFFECTED_PROCESS",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "HOLD_FOR_QUALITY_VERIFICATION",
            "ESCALATE_FOR_MAINTENANCE"
        ]
    },


    AIMFG_SUPPLY_CHAIN_DISRUPTION: {

        scenarioId:
            "AIMFG_SUPPLY_CHAIN_DISRUPTION",

        name:
            "Supply Chain Disruption",

        category:
            "MATERIAL_INPUT_DISRUPTION",

        description:
            "Disruption of a required manufacturing input reduces production capability.",

        defaultState: {

            systemId:
                "AIMFG-DEMO-01",

            productionCells:
                2,

            criticalMachines:
                8,

            affectedMachine:
                "MATERIAL-INPUT-01",

            faultCondition:
                "SUPPLY_DISRUPTION",

            productionImpact:
                "HIGH",

            dependentProcesses:
                4,

            availableRedundancy:
                1,

            remainingCapability:
                55
        },

        assessmentDimensions: [

            "MATERIAL_AVAILABILITY",
            "DEPENDENT_PROCESSES",
            "PRODUCTION_IMPACT",
            "REDUNDANCY",
            "REMAINING_CAPABILITY"
        ],

        recoveryOptions: [

            "TRANSFER_TO_AVAILABLE_INPUT_SOURCE",
            "REDUCE_PRODUCTION_RATE",
            "PRIORITIZE_CRITICAL_PRODUCTION",
            "ISOLATE_AFFECTED_PROCESS",
            "ESCALATE_FOR_SUPPLY_RECOVERY"
        ]
    },


    AIMFG_MAINTENANCE_RESOURCE_CONSTRAINT: {

        scenarioId:
            "AIMFG_MAINTENANCE_RESOURCE_CONSTRAINT",

        name:
            "Maintenance Resource Constraint",

        category:
            "MAINTENANCE_CONSTRAINT",

        description:
            "Limited maintenance resources delay recovery of an affected manufacturing asset.",

        defaultState: {

            systemId:
                "AIMFG-DEMO-01",

            productionCells:
                2,

            criticalMachines:
                8,

            affectedMachine:
                "MACHINE-04",

            faultCondition:
                "MAINTENANCE_DELAY",

            productionImpact:
                "MODERATE",

            dependentProcesses:
                3,

            availableRedundancy:
                1,

            remainingCapability:
                67
        },

        assessmentDimensions: [

            "MAINTENANCE_CAPACITY",
            "RECOVERY_DELAY",
            "DEPENDENT_PROCESSES",
            "REDUNDANCY",
            "REMAINING_CAPABILITY",
            "PRODUCTION_CONTINUITY"
        ],

        recoveryOptions: [

            "MAINTAIN_CONTROLLED_PRODUCTION",
            "TRANSFER_LOAD_TO_REDUNDANT_MACHINE",
            "REDUCE_PRODUCTION_RATE",
            "ISOLATE_AFFECTED_PROCESS",
            "ESCALATE_FOR_MAINTENANCE_RESOURCES"
        ]
    }
};


/*
 * DATA ACCESS FUNCTIONS
 *
 * These functions expose scenario DATA.
 * They do not execute scenario algorithms.
 */

function getAIMfgManufacturingScenarioData() {

    return AIMFG_MANUFACTURING_SCENARIO_DATA;
}


function getAIMfgManufacturingScenarioDataById(scenarioId) {

    if (!scenarioId) {
        return null;
    }

    return AIMFG_MANUFACTURING_SCENARIO_DATA[scenarioId] || null;
}


function getAIMfgManufacturingScenarioIds() {

    return Object.keys(
        AIMFG_MANUFACTURING_SCENARIO_DATA
    );
}


function getAIMfgManufacturingScenarioCount() {

    return Object.keys(
        AIMFG_MANUFACTURING_SCENARIO_DATA
    ).length;
}


function getAIMfgManufacturingScenarioCatalogue() {

    return Object.keys(
        AIMFG_MANUFACTURING_SCENARIO_DATA
    ).map(function (scenarioId) {

        const scenario =
            AIMFG_MANUFACTURING_SCENARIO_DATA[scenarioId];

        return {

            scenarioId:
                scenario.scenarioId,

            name:
                scenario.name,

            category:
                scenario.category,

            description:
                scenario.description
        };
    });
}


/*
 * SAFETY / RESEARCH STATUS
 */

function getAIMfgManufacturingScenarioDataStatus() {

    return {

        domain:
            AIMFG_MANUFACTURING_SCENARIO_DOMAIN,

        version:
            AIMFG_MANUFACTURING_SCENARIO_DATA_VERSION,

        scenarioCount:
            getAIMfgManufacturingScenarioCount(),

        scenarioIds:
            getAIMfgManufacturingScenarioIds(),

        researchOnly:
            true,

        simulationOnly:
            true,

        backendConnection:
            false,

        externalConnection:
            false,

        physicalExecution:
            false,

        autonomousExecution:
            false,

        humanAuthorizationRequired:
            true
    };
}


/*
 * PUBLIC DATA API
 */

window.AIMfgManufacturingScenarioData = {

    version:
        AIMFG_MANUFACTURING_SCENARIO_DATA_VERSION,

    domain:
        AIMFG_MANUFACTURING_SCENARIO_DOMAIN,

    getAll:
        getAIMfgManufacturingScenarioData,

    getById:
        getAIMfgManufacturingScenarioDataById,

    getIds:
        getAIMfgManufacturingScenarioIds,

    getCount:
        getAIMfgManufacturingScenarioCount,

    getCatalogue:
        getAIMfgManufacturingScenarioCatalogue,

    getStatus:
        getAIMfgManufacturingScenarioDataStatus
};

window.AIMfgManufacturingScenarioDataVersion =
    AIMFG_MANUFACTURING_SCENARIO_DATA_VERSION;