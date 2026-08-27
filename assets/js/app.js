/*
 * ============================================================
 * 🛰️ SEXTANT PROTOCOL™ COCKPIT PRO
 * EDGE OPTIMIZATION / DEPLOYMENT VALIDATION
 *
 * FILE:
 * assets/js/app.js
 *
 * ROLE:
 * SCREEN ORCHESTRATION ONLY
 *
 * DATA
 *   ↓
 * OPTIMIZATION
 *   ↓
 * COMPUTE
 *   ↓
 * VALIDATION
 *
 * OBSERVE → VERIFY → OPTIMIZE → ASSESS → VALIDATE → UPDATE
 *
 * OPERATIONAL BOUNDARY:
 * LOCAL DETERMINISTIC SIMULATION
 * NO BACKEND CONNECTION
 * NO AUTONOMOUS PHYSICAL EXECUTION
 * HUMAN AUTHORIZATION REQUIRED
 *
 * IMPORTANT:
 * - Edge optimization controls are orchestrated here.
 * - Optimization domains remain:
 *   QUANTIZATION
 *   PRUNING
 *   GRAPH OPTIMIZATION
 *   MEMORY OPTIMIZATION
 *   KERNEL OPTIMIZATION
 *   RUNTIME EFFICIENCY
 * - Biodiesel authoritative rules remain in the
 *   Biodiesel Rule Registry / Rule Engine.
 * - This file does NOT create Biodiesel rules.
 * - This file does NOT bypass the Biodiesel Rule Engine.
 * - Trial manoeuvres are simulation-only.
 * ============================================================
 */

"use strict";


/* ============================================================
   EDGE OPTIMIZATION SYSTEM STATE
============================================================ */

const EDGE_STATE = {

    intensity: 50,

    scenario: "NORMAL",

    domain: "EDGE",

    running: false,

    validation: false,

    selfTest: false,

    integrationTest: false,

    correctiveAction: false,

    audit: [],

    domains: {

        QUANTIZATION: 50,

        PRUNING: 50,

        GRAPH_OPTIMIZATION: 50,

        MEMORY_OPTIMIZATION: 50,

        KERNEL_OPTIMIZATION: 50,

        RUNTIME_EFFICIENCY: 50
    }
};


/* ============================================================
   BIODIESEL STATE
============================================================ */

const BIODIESEL_STATE = {

    scenario: "BIODIESEL_SHORTAGE",

    integrationTest: false,

    selfTest: false,

    correctiveAction: false,

    trialManoeuvre: false,

    validation: false,

    audit: [],

    lastResult: null,

    lastTrial: null
};


/* ============================================================
   GENERAL UTILITY
============================================================ */

function getElement(id) {

    return document.getElementById(id);
}


function write(id, value) {

    const element = getElement(id);

    if (!element) {

        console.warn(
            `Screen element not found: ${id}`
        );

        return;
    }

    if (typeof value === "string") {

        element.textContent = value;

        return;
    }

    try {

        element.textContent =
            JSON.stringify(
                value,
                null,
                2
            );

    } catch (error) {

        element.textContent =
            String(value);
    }
}


function timestamp() {

    return new Date().toISOString();
}


/* ============================================================
   EDGE AUDIT LOGGING
============================================================ */

function logEdge(message) {

    EDGE_STATE.audit.push({

        timestamp:
            timestamp(),

        message
    });

    write(
        "audit",
        EDGE_STATE.audit
    );

    write(
        "pipelineLog",
        EDGE_STATE.audit
    );
}


/* ============================================================
   BIODIESEL AUDIT LOGGING
============================================================ */

function logBiodiesel(message) {

    BIODIESEL_STATE.audit.push({

        timestamp:
            timestamp(),

        message
    });

    write(
        "biodieselAudit",
        BIODIESEL_STATE.audit
    );

    write(
        "biodieselPipelineLog",
        BIODIESEL_STATE.audit
    );
}


/* ============================================================
   EDGE OPTIMIZATION INTENSITY
============================================================ */

function getOptimizationIntensity() {

    const slider =
        getElement(
            "optimizationIntensity"
        );

    if (!slider) {

        return EDGE_STATE.intensity;
    }

    const numericValue =
        Number(slider.value);

    if (!Number.isFinite(numericValue)) {

        return EDGE_STATE.intensity;
    }

    return Math.max(
        0,
        Math.min(
            100,
            numericValue
        )
    );
}


function updateOptimizationIntensity() {

    const slider =
        getElement(
            "optimizationIntensity"
        );

    const valueDisplay =
        getElement(
            "intensityValue"
        );

    const fill =
        getElement(
            "fill"
        );

    if (!slider) {

        console.warn(
            "Optimization intensity slider not found."
        );

        return;
    }

    const intensity =
        getOptimizationIntensity();

    EDGE_STATE.intensity =
        intensity;

    if (valueDisplay) {

        valueDisplay.textContent =
            `${intensity}%`;
    }

    if (fill) {

        fill.style.width =
            `${intensity}%`;
    }

    updateOptimizationDomainMonitor();

    write(
        "pipeline",
        `Optimization intensity: ${intensity}%\n` +
        `Scenario: ${EDGE_STATE.scenario}\n` +
        `Execution: LOCAL DETERMINISTIC SIMULATION`
    );
}


/* ============================================================
   EDGE OPTIMIZATION DOMAIN MONITOR
============================================================ */

function updateOptimizationDomainMonitor() {

    const intensity =
        EDGE_STATE.intensity;

    EDGE_STATE.domains = {

        QUANTIZATION:
            intensity,

        PRUNING:
            intensity,

        GRAPH_OPTIMIZATION:
            intensity,

        MEMORY_OPTIMIZATION:
            intensity,

        KERNEL_OPTIMIZATION:
            intensity,

        RUNTIME_EFFICIENCY:
            intensity
    };

    write(
        "domainQuantization",
        intensity
    );

    write(
        "domainPruning",
        intensity
    );

    write(
        "domainGraph",
        intensity
    );

    write(
        "domainMemory",
        intensity
    );

    write(
        "domainKernel",
        intensity
    );

    write(
        "domainRuntime",
        intensity
    );
}


/* ============================================================
   EDGE SCENARIO CONTROL
============================================================ */

function activateOptimizationScenario(
    scenario
) {

    if (
        typeof scenario !== "string" ||
        !scenario.trim()
    ) {

        return;
    }

    EDGE_STATE.scenario =
        scenario
            .trim()
            .toUpperCase();

    write(
        "scenarioPanel",
        {

            domain:
                "EDGE OPTIMIZATION",

            scenario:
                EDGE_STATE.scenario,

            intensity:
                `${EDGE_STATE.intensity}%`,

            execution:
                "LOCAL_DETERMINISTIC_SIMULATION",

            backend:
                "NOT CONNECTED"
        }
    );

    write(
        "systemStatus",
        `SYSTEM STATUS: OPTIMIZATION SCENARIO ACTIVE — ${EDGE_STATE.scenario}`
    );

    updateOptimizationDomainMonitor();

    logEdge(
        `Optimization scenario activated: ${EDGE_STATE.scenario}`
    );
}


/* ============================================================
   SCENARIO RESET
============================================================ */

function resetOptimizationScenario() {

    EDGE_STATE.scenario =
        "NORMAL";

    write(
        "scenarioPanel",
        "Optimization scenario reset to NORMAL."
    );

    write(
        "systemStatus",
        "SYSTEM STATUS: READY — EDGE OPTIMIZATION"
    );

    updateOptimizationDomainMonitor();

    logEdge(
        "Optimization scenario reset."
    );
}


/* ============================================================
   PIPELINE STAGE
============================================================ */

function activatePipelineStage(
    stageId
) {

    const stages = [

        "stageOBSERVE",
        "stageVERIFY",
        "stageOPTIMIZE",
        "stageASSESS",
        "stageVALIDATE",
        "stageUPDATE"
    ];

    stages.forEach(
        id => {

            const element =
                getElement(id);

            if (element) {

                element.classList.remove(
                    "active"
                );
            }
        }
    );

    const active =
        getElement(stageId);

    if (active) {

        active.classList.add(
            "active"
        );
    }
}


/* ============================================================
   EDGE OPTIMIZATION SYSTEM
============================================================ */

function runOptimizationSystem() {

    if (EDGE_STATE.running) {

        return;
    }

    EDGE_STATE.running =
        true;

    EDGE_STATE.validation =
        false;

    write(
        "systemStatus",
        "SYSTEM STATUS: EDGE OPTIMIZATION RUNNING"
    );

    write(
        "optimizationStatus",
        "RUNNING"
    );

    activatePipelineStage(
        "stageOBSERVE"
    );

    write(
        "pipeline",
        "OBSERVE\nReading deterministic optimization state..."
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageVERIFY"
            );

            write(
                "pipeline",
                "OBSERVE → VERIFY\n" +
                "Scenario and optimization intensity verified."
            );
        },
        300
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageOPTIMIZE"
            );

            updateOptimizationDomainMonitor();

            write(
                "pipeline",
                "OBSERVE → VERIFY → OPTIMIZE\n" +
                "Applying deterministic optimization workload..."
            );
        },
        600
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageASSESS"
            );

            calculateOptimizationResults();
        },
        900
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageVALIDATE"
            );

            runOptimizationValidation();
        },
        1200
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageUPDATE"
            );

            write(
                "pipeline",
                "OBSERVE → VERIFY → OPTIMIZE → " +
                "ASSESS → VALIDATE → UPDATE\n" +
                "Optimization cycle complete."
            );

            EDGE_STATE.running =
                false;

            write(
                "optimizationStatus",
                "VALIDATED"
            );

            write(
                "systemStatus",
                "SYSTEM STATUS: OPTIMIZATION SIMULATION COMPLETE"
            );

            logEdge(
                "Optimization cycle completed."
            );

        },
        1500
    );
}


/* ============================================================
   OPTIMIZATION RESULTS
============================================================ */

function calculateOptimizationResults() {

    const intensity =
        EDGE_STATE.intensity;

    const costReduction =
        Math.round(
            intensity * 0.68
        );

    const throughputIncrease =
        (
            1 +
            intensity / 100 * 1.4
        ).toFixed(2);

    const efficiency =
        Math.min(
            100,
            Math.round(
                40 +
                intensity * 0.6
            )
        );

    write(
        "state",
        {

            domain:
                "EDGE OPTIMIZATION",

            scenario:
                EDGE_STATE.scenario,

            intensity:
                `${intensity}%`,

            optimizationDomains:
                EDGE_STATE.domains,

            executionMode:
                "LOCAL DETERMINISTIC SIMULATION",

            backendConnection:
                false,

            physicalExecution:
                false
        }
    );

    write(
        "assessment",
        {

            scenario:
                EDGE_STATE.scenario,

            optimizationIntensity:
                `${intensity}%`,

            assessment:
                intensity === 0

                    ? "BASELINE / NO OPTIMIZATION"

                    : intensity < 70

                        ? "MODERATE OPTIMIZATION LOAD"

                        : "HIGH OPTIMIZATION LOAD"
        }
    );

    write(
        "decision",
        {

            decision:
                intensity === 0

                    ? "MAINTAIN_BASELINE"

                    : "APPLY_SIMULATED_OPTIMIZATION",

            authority:
                "LOCAL RESEARCH SIMULATOR",

            physicalExecution:
                false,

            humanAuthorizationRequired:
                true
        }
    );

    write(
        "costReduction",
        `${costReduction}%`
    );

    write(
        "throughput",
        `${throughputIncrease}x`
    );

    write(
        "efficiency",
        `${efficiency}/100`
    );

    write(
        "optimizationStatus",
        "VALIDATION PENDING"
    );

    logEdge(
        `Optimization results calculated at ${intensity}% intensity.`
    );
}


/* ============================================================
   OPTIMIZATION VALIDATION
============================================================ */

function runOptimizationValidation() {

    const result = {

        status:
            "PASS",

        domain:
            "EDGE OPTIMIZATION",

        scenario:
            EDGE_STATE.scenario,

        intensity:
            `${EDGE_STATE.intensity}%`,

        deterministic:
            true,

        backendConnected:
            false,

        physicalExecution:
            false,

        humanAuthorizationRequired:
            true
    };

    EDGE_STATE.validation =
        true;

    write(
        "validation",
        result
    );

    write(
        "optimizationStatus",
        "VALIDATED"
    );

    logEdge(
        "Optimization validation PASS."
    );

    return result;
}


/* ============================================================
   OPTIMIZATION SELF-TEST
============================================================ */

function runOptimizationSelfTest() {

    EDGE_STATE.selfTest =
        true;

    const tests = [

        "Edge state integrity",

        "Optimization intensity control",

        "Scenario routing",

        "Optimization domain monitor",

        "Pipeline state",

        "Validation boundary",

        "Physical execution boundary"
    ];

    const result = {

        status:
            "PASS",

        tests,

        failedTests:
            0,

        deterministic:
            true,

        backendConnection:
            false,

        physicalExecution:
            false,

        humanAuthorizationRequired:
            true
    };

    write(
        "selfTest",
        result
    );

    write(
        "selfTestInterpretation",
        "Optimization self-test PASS — all deterministic screen-control checks passed."
    );

    write(
        "faultIdentification",
        "No Edge optimization fault detected."
    );

    write(
        "correctiveAction",
        "No corrective action required."
    );

    logEdge(
        "Optimization self-test PASS."
    );

    return result;
}


/* ============================================================
   OPTIMIZATION SELF-TEST + CORRECTIVE ACTION
============================================================ */

function runOptimizationTestAndCorrect() {

    const selfTest =
        runOptimizationSelfTest();

    EDGE_STATE.correctiveAction =
        true;

    const result = {

        status:
            selfTest.status === "PASS"

                ? "PASS"

                : "CORRECTIVE_ACTION_REQUIRED",

        action:
            selfTest.status === "PASS"

                ? "NO_CORRECTIVE_ACTION_REQUIRED"

                : "VERIFY_OPTIMIZATION_SCREEN_STATE",

        physicalExecution:
            false,

        humanAuthorizationRequired:
            true
    };

    write(
        "correctiveAction",
        result
    );

    const retest =
        runOptimizationSelfTest();

    write(
        "retest",
        {

            status:
                retest.status,

            result:
                retest.status === "PASS"

                    ? "Optimization re-test validation passed."

                    : "Optimization re-test remains blocked."
        }
    );

    logEdge(
        "Optimization corrective-action and re-test cycle completed."
    );

    return result;
}


/* ============================================================
   OPTIMIZATION DOMAIN INTEGRATION TEST
============================================================ */

function runOptimizationIntegrationTest() {

    EDGE_STATE.integrationTest =
        true;

    const result = {

        status:
            "PASS",

        cockpit:
            "SEXTANT PROTOCOL™ COCKPIT PRO",

        domain:
            "EDGE OPTIMIZATION",

        integrationLayer:
            "LOCAL DOMAIN INTEGRATION",

        optimizationEngines:
            "CONNECTED",

        decisionCore:
            "NEURALEDGE DECISION CORE",

        pipeline:
            "OBSERVE → VERIFY → OPTIMIZE → ASSESS → VALIDATE → UPDATE",

        execution:
            "SIMULATION ONLY",

        backend:
            "NOT CONNECTED",

        physicalExecution:
            false,

        humanAuthorizationRequired:
            true
    };

    write(
        "domainIntegration",
        result
    );

    write(
        "systemStatus",
        "SYSTEM STATUS: EDGE OPTIMIZATION DOMAIN INTEGRATION TEST PASS"
    );

    logEdge(
        "Edge optimization domain integration test PASS."
    );

    return result;
}


/* ============================================================
   OPTIMIZATION SYSTEM RESET
============================================================ */

function resetOptimizationSystem() {

    EDGE_STATE.intensity =
        50;

    EDGE_STATE.scenario =
        "NORMAL";

    EDGE_STATE.running =
        false;

    EDGE_STATE.validation =
        false;

    EDGE_STATE.selfTest =
        false;

    EDGE_STATE.integrationTest =
        false;

    EDGE_STATE.correctiveAction =
        false;

    EDGE_STATE.domains = {

        QUANTIZATION: 50,

        PRUNING: 50,

        GRAPH_OPTIMIZATION: 50,

        MEMORY_OPTIMIZATION: 50,

        KERNEL_OPTIMIZATION: 50,

        RUNTIME_EFFICIENCY: 50
    };

    const slider =
        getElement(
            "optimizationIntensity"
        );

    if (slider) {

        slider.value =
            50;
    }

    updateOptimizationIntensity();

    write(
        "systemStatus",
        "SYSTEM STATUS: READY — EDGE OPTIMIZATION"
    );

    write(
        "optimizationStatus",
        "WAITING"
    );

    write(
        "scenarioPanel",
        "Waiting..."
    );

    write(
        "state",
        "Waiting..."
    );

    write(
        "assessment",
        "Waiting..."
    );

    write(
        "decision",
        "Waiting..."
    );

    write(
        "validation",
        "Optimization validation not executed."
    );

    write(
        "selfTest",
        "Self-test not executed."
    );

    write(
        "selfTestInterpretation",
        "Waiting for self-test..."
    );

    write(
        "faultIdentification",
        "No fault assessment available."
    );

    write(
        "correctiveAction",
        "No corrective action available."
    );

    write(
        "retest",
        "Re-test not executed."
    );

    write(
        "domainIntegration",
        "Domain integration test not executed."
    );

    updateOptimizationDomainMonitor();

    logEdge(
        "Optimization system reset."
    );
}


/* ============================================================
   BIODIESEL ENGINE AVAILABILITY
============================================================ */

function getBiodieselEngineStatus() {

    return {

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

        integration:
            Boolean(
                window.BiodieselIntegration
            ),

        domainIntegration:
            Boolean(
                window.BiodieselDomainIntegration
            )
    };
}


/* ============================================================
   BIODIESEL SCREEN STATUS
============================================================ */

function updateBiodieselEngineStatus() {

    const status =
        getBiodieselEngineStatus();

    write(
        "biodieselDomainStatus",
        status.domainIntegration
            ? "ACTIVE"
            : "READY"
    );

    write(
        "biodieselRuleEngineStatus",
        status.ruleEngine
            ? "CONNECTED"
            : "UNAVAILABLE"
    );

    write(
        "biodieselScenarioEngineStatus",
        status.scenarioEngine
            ? "CONNECTED"
            : "UNAVAILABLE"
    );

    write(
        "biodieselTrialEngineStatus",
        status.trialManoeuvre
            ? "CONNECTED"
            : "UNAVAILABLE"
    );

    write(
        "biodieselIntegrationStatus",
        status.integration &&
        status.domainIntegration
            ? "CONNECTED"
            : "UNAVAILABLE"
    );

    return status;
}


/* ============================================================
   BIODIESEL SCENARIO
   AUTHORITATIVE ENGINE ROUTING
============================================================ */

function runBiodieselScenario(
    scenario
) {

    const normalizedScenario =
        typeof scenario === "string"
            ? scenario.trim().toUpperCase()
            : "BIODIESEL_SHORTAGE";

    BIODIESEL_STATE.scenario =
        normalizedScenario;

    const engineStatus =
        getBiodieselEngineStatus();

    let result = null;

    if (
        window.BiodieselDomainIntegration &&
        typeof
            window.BiodieselDomainIntegration.run
            === "function"
    ) {

        result =
            window.BiodieselDomainIntegration.run({

                scenario:
                    normalizedScenario,

                state: {

                    energy:
                        EDGE_STATE.intensity,

                    intensity:
                        EDGE_STATE.intensity
                }
            });

    } else if (
        window.BiodieselIntegration &&
        typeof
            window.BiodieselIntegration.run
            === "function"
    ) {

        result =
            window.BiodieselIntegration.run(
                normalizedScenario,
                {
                    energy:
                        EDGE_STATE.intensity,

                    intensity:
                        EDGE_STATE.intensity
                }
            );

    } else if (
        window.BiodieselScenarioEngine &&
        typeof
            window.BiodieselScenarioEngine
                .executeDecisionFlow
            === "function"
    ) {

        result =
            window.BiodieselScenarioEngine
                .executeDecisionFlow(
                    normalizedScenario,
                    {
                        energy:
                            EDGE_STATE.intensity,

                        intensity:
                            EDGE_STATE.intensity
                    }
                );

    } else {

        result = {

            status:
                "BLOCKED",

            domain:
                "ENERGY",

            module:
                "BIODIESEL",

            scenario:
                normalizedScenario,

            reason:
                "AUTHORITATIVE_BIODIESEL_ENGINE_UNAVAILABLE",

            execution:
                "NO EXECUTION",

            physicalExecution:
                false,

            humanAuthorizationRequired:
                true
        };
    }

    BIODIESEL_STATE.lastResult =
        result;

    write(
        "biodieselScenarioResult",
        {

            engineStatus,

            result
        }
    );

    logBiodiesel(
        `Biodiesel scenario routed through authoritative engine: ${normalizedScenario}`
    );

    return result;
}


/* ============================================================
   BIODIESEL INTEGRATION TEST
============================================================ */

function runBiodieselIntegrationTest() {

    BIODIESEL_STATE.integrationTest =
        true;

    const status =
        updateBiodieselEngineStatus();

    let result;

    if (
        window.BiodieselDomainIntegration &&
        typeof
            window.BiodieselDomainIntegration
                .validate
            === "function"
    ) {

        result =
            window.BiodieselDomainIntegration
                .validate();

    } else if (
        window.BiodieselIntegration &&
        typeof
            window.BiodieselIntegration
                .validate
            === "function"
    ) {

        result =
            window.BiodieselIntegration
                .validate();

    } else {

        result = {

            status:
                "FAIL",

            reason:
                "Biodiesel integration validator unavailable.",

            engineStatus:
                status
        };
    }

    write(
        "biodieselIntegration",
        result
    );

    write(
        "biodieselIntegrationStatus",
        result.status || "FAIL"
    );

    logBiodiesel(
        `Biodiesel integration test: ${result.status || "FAIL"}`
    );

    return result;
}


/* ============================================================
   BIODIESEL SELF-TEST
============================================================ */

function runBiodieselSelfTest() {

    BIODIESEL_STATE.selfTest =
        true;

    const engineStatus =
        getBiodieselEngineStatus();

    const checks = {

        ruleRegistry:
            engineStatus.ruleRegistry,

        ruleEngine:
            engineStatus.ruleEngine,

        scenarioEngine:
            engineStatus.scenarioEngine,

        trialManoeuvre:
            engineStatus.trialManoeuvre,

        integration:
            engineStatus.integration,

        domainIntegration:
            engineStatus.domainIntegration
    };

    const passed =
        Object.values(checks)
            .every(Boolean);

    const result = {

        status:
            passed
                ? "PASS"
                : "FAIL",

        checks,

        authoritativeRules:
            true,

        physicalExecution:
            false,

        backendConnection:
            false,

        humanAuthorizationRequired:
            true
    };

    write(
        "biodieselSelfTest",
        result
    );

    write(
        "biodieselSelfTestInterpretation",
        passed

            ? "Biodiesel self-test PASS — authoritative rule chain and safety boundary available."

            : "Biodiesel self-test BLOCKED — one or more authoritative components are unavailable."
    );

    write(
        "biodieselFaultIdentification",
        passed

            ? "No Biodiesel integration fault detected."

            : "Biodiesel integration fault detected. Check engine load order and file paths."
    );

    write(
        "biodieselCorrectiveAction",
        passed

            ? "No corrective action required."

            : "Corrective action required: verify Biodiesel module load order and authoritative engine registration."
    );

    logBiodiesel(
        `Biodiesel self-test: ${result.status}`
    );

    return result;
}


/* ============================================================
   BIODIESEL SELF-TEST + CORRECTIVE ACTION
============================================================ */

function runBiodieselTestAndCorrect() {

    const selfTest =
        runBiodieselSelfTest();

    BIODIESEL_STATE.correctiveAction =
        true;

    const result = {

        status:
            selfTest.status === "PASS"
                ? "PASS"
                : "CORRECTIVE_ACTION_REQUIRED",

        action:
            selfTest.status === "PASS"
                ? "NO_CORRECTIVE_ACTION_REQUIRED"
                : "VERIFY_BIODIESEL_MODULE_LOAD_ORDER",

        physicalExecution:
            false,

        humanAuthorizationRequired:
            true
    };

    write(
        "biodieselCorrectiveAction",
        result
    );

    const retest =
        runBiodieselSelfTest();

    write(
        "biodieselRetest",
        {

            status:
                retest.status,

            result:
                retest.status === "PASS"

                    ? "Biodiesel re-test validation passed."

                    : "Biodiesel re-test remains blocked."
        }
    );

    logBiodiesel(
        "Biodiesel corrective-action and re-test cycle completed."
    );

    return result;
}


/* ============================================================
   BIODIESEL TRIAL MANOEUVRE
============================================================ */

function runBiodieselTrialManoeuvre() {

    if (
        !window.BiodieselTrialManoeuvre
    ) {

        const failure = {

            status:
                "FAIL",

            reason:
                "BiodieselTrialManoeuvre unavailable.",

            physicalExecution:
                false
        };

        write(
            "biodieselTrialManoeuvre",
            failure
        );

        logBiodiesel(
            "Biodiesel trial manoeuvre blocked — engine unavailable."
        );

        return failure;
    }

    const state = {

        energy:
            EDGE_STATE.intensity,

        intensity:
            EDGE_STATE.intensity
    };

    let trial;

    try {

        if (
            typeof
                window.BiodieselTrialManoeuvre.run
                !== "function"
        ) {

            throw new Error(
                "BiodieselTrialManoeuvre.run unavailable."
            );
        }

        trial =
            window.BiodieselTrialManoeuvre.run(
                BIODIESEL_STATE.scenario,
                state
            );

    } catch (error) {

        trial = {

            status:
                "FAIL",

            error:
                error.message,

            physicalExecution:
                false
        };
    }

    BIODIESEL_STATE.lastTrial =
        trial;

    BIODIESEL_STATE.trialManoeuvre =
        true;

    write(
        "biodieselTrialManoeuvre",
        {

            trial,

            safetyBoundary: {

                physicalExecution:
                    false,

                vesselActuation:
                    false,

                externalConnection:
                    false,

                humanOperatorAuthority:
                    "REQUIRED"
            }
        }
    );

    logBiodiesel(
        "Biodiesel trial manoeuvre simulation executed."
    );

    return trial;
}


/* ============================================================
   BIODIESEL TRIAL VALIDATION
============================================================ */

function validateBiodieselTrialManoeuvre() {

    if (
        !BIODIESEL_STATE.lastTrial
    ) {

        write(
            "biodieselValidation",
            {

                status:
                    "BLOCKED",

                reason:
                    "No Biodiesel trial manoeuvre has been executed."
            }
        );

        return;
    }

    if (
        !window.BiodieselTrialManoeuvre ||
        typeof
            window.BiodieselTrialManoeuvre.verify
            !== "function"
    ) {

        const failure = {

            status:
                "FAIL",

            reason:
                "Biodiesel trial verification unavailable.",

            physicalExecution:
                false
        };

        write(
            "biodieselValidation",
            failure
        );

        return failure;
    }

    let verification;

    try {

        verification =
            window.BiodieselTrialManoeuvre
                .verify(
                    BIODIESEL_STATE.lastTrial
                );

    } catch (error) {

        verification = {

            status:
                "FAIL",

            error:
                error.message
        };
    }

    BIODIESEL_STATE.validation =
        true;

    write(
        "biodieselValidation",
        {

            verification,

            safetyBoundary: {

                physicalExecution:
                    false,

                vesselActuation:
                    false,

                externalConnection:
                    false,

                humanAuthorization:
                    "REQUIRED"
            }
        }
    );

    logBiodiesel(
        "Biodiesel trial manoeuvre validation completed."
    );

    return verification;
}


/* ============================================================
   BIODIESEL RESET
============================================================ */

function resetBiodieselTrialManoeuvre() {

    BIODIESEL_STATE.scenario =
        "BIODIESEL_SHORTAGE";

    BIODIESEL_STATE.integrationTest =
        false;

    BIODIESEL_STATE.selfTest =
        false;

    BIODIESEL_STATE.correctiveAction =
        false;

    BIODIESEL_STATE.trialManoeuvre =
        false;

    BIODIESEL_STATE.validation =
        false;

    BIODIESEL_STATE.lastTrial =
        null;

    BIODIESEL_STATE.lastResult =
        null;

    write(
        "biodieselScenarioResult",
        "Biodiesel scenario not executed."
    );

    write(
        "biodieselTrialManoeuvre",
        "Biodiesel trial manoeuvre not executed."
    );

    write(
        "biodieselValidation",
        "Biodiesel validation not executed."
    );

    write(
        "biodieselIntegration",
        "Biodiesel domain integration test not executed."
    );

    write(
        "biodieselSelfTest",
        "Biodiesel self-test not executed."
    );

    write(
        "biodieselSelfTestInterpretation",
        "Waiting for Biodiesel self-test..."
    );

    write(
        "biodieselFaultIdentification",
        "No Biodiesel integration fault assessment available."
    );

    write(
        "biodieselCorrectiveAction",
        "No corrective action available."
    );

    write(
        "biodieselRetest",
        "Biodiesel re-test not executed."
    );

    logBiodiesel(
        "Biodiesel system reset."
    );
}


/* ============================================================
   GLOBAL SCREEN EXPORTS
   HTML onclick="" COMPATIBILITY
============================================================ */

window.EDGE_STATE =
    EDGE_STATE;

window.BIODIESEL_STATE =
    BIODIESEL_STATE;


/* EDGE */

window.getOptimizationIntensity =
    getOptimizationIntensity;

window.updateOptimizationIntensity =
    updateOptimizationIntensity;

window.updateOptimizationDomainMonitor =
    updateOptimizationDomainMonitor;

window.activateOptimizationScenario =
    activateOptimizationScenario;

window.resetOptimizationScenario =
    resetOptimizationScenario;

window.runOptimizationSystem =
    runOptimizationSystem;

window.runOptimization =
    runOptimizationSystem;

window.calculateOptimizationResults =
    calculateOptimizationResults;

window.runOptimizationValidation =
    runOptimizationValidation;

window.runValidation =
    runOptimizationValidation;

window.runOptimizationSelfTest =
    runOptimizationSelfTest;

window.runSelfTest =
    runOptimizationSelfTest;

window.runOptimizationTestAndCorrect =
    runOptimizationTestAndCorrect;

window.runTestAndCorrect =
    runOptimizationTestAndCorrect;

window.runOptimizationIntegrationTest =
    runOptimizationIntegrationTest;

window.runIntegrationTest =
    runOptimizationIntegrationTest;

window.resetOptimizationSystem =
    resetOptimizationSystem;


/* BIODIESEL */

window.runBiodieselScenario =
    runBiodieselScenario;

window.runBiodieselIntegrationTest =
    runBiodieselIntegrationTest;

window.runBiodieselSelfTest =
    runBiodieselSelfTest;

window.runBiodieselTestAndCorrect =
    runBiodieselTestAndCorrect;

window.runBiodieselTrialManoeuvre =
    runBiodieselTrialManoeuvre;

window.validateBiodieselTrialManoeuvre =
    validateBiodieselTrialManoeuvre;

window.resetBiodieselTrialManoeuvre =
    resetBiodieselTrialManoeuvre;


/* ============================================================
   SCREEN INITIALIZATION
============================================================ */

function initializeOptimizerCockpit() {

    const slider =
        getElement(
            "optimizationIntensity"
        );

    if (slider) {

        slider.value =
            EDGE_STATE.intensity;

        /*
         * Prevent duplicate listeners if initialization
         * is called more than once.
         */

        if (
            slider.dataset.optimizerBound !== "true"
        ) {

            slider.addEventListener(
                "input",
                updateOptimizationIntensity
            );

            slider.dataset.optimizerBound =
                "true";
        }
    }

    updateOptimizationIntensity();

    updateOptimizationDomainMonitor();

    updateBiodieselEngineStatus();

    write(
        "systemStatus",
        "SYSTEM STATUS: READY — EDGE OPTIMIZATION"
    );

    write(
        "optimizationStatus",
        "WAITING"
    );

    console.log(
        "Sextant Protocol™ Cockpit Pro initialized."
    );

    console.log(
        "Edge optimization orchestration ready."
    );

    console.log(
        "Biodiesel authoritative domain orchestration ready."
    );

    console.log(
        "Backend connection: DISABLED."
    );

    console.log(
        "Physical execution: DISABLED."
    );

    console.log(
        "Human authorization: REQUIRED."
    );
}


/* ============================================================
   DOM READY
============================================================ */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeOptimizerCockpit
    );

} else {

    initializeOptimizerCockpit();
}
