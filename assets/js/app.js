/*
 * ============================================================
 * 🛰️ SEXTANT PROTOCOL™ COCKPIT PRO
 * EDGE OPTIMIZATION / VALIDATION COCKPIT
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
   SINGLE SOURCE OF TRUTH
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
                "NOT_CONNECTED"
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
   BACKWARD-COMPATIBILITY SCREEN EXPORT
============================================================ */

window.EDGE_STATE =
    EDGE_STATE;

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
