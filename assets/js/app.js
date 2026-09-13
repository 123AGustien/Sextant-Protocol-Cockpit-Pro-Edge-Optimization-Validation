"use strict";

/* ============================================================
   SEXTANT PROTOCOL™ COCKPIT PRO
   EDGE OPTIMIZATION & DEPLOYMENT VALIDATION

   assets/js/app.js

   SYSTEM-WIRING BASELINE
   Version: 1.0.0-SYSTEM-WIRING

   GOLDEN OPTIMIZATION PIPELINE:
   OBSERVE → VERIFY → OPTIMIZE → ASSESS → VALIDATE → UPDATE

   SAFETY BOUNDARY:
   - LOCAL DETERMINISTIC SIMULATION
   - BACKEND CONNECTION DISABLED
   - PHYSICAL EXECUTION DISABLED
   - VESSEL ACTUATION DISABLED
   - EXTERNAL CONNECTION DISABLED
   - HUMAN AUTHORIZATION REQUIRED
============================================================ */


/* ============================================================
   APPLICATION VERSION
============================================================ */

const EDGE_APP_VERSION =
    "1.0.0-SYSTEM-WIRING";


/* ============================================================
   AUTHORITATIVE EDGE SYSTEM STATE
   SINGLE SOURCE OF TRUTH
============================================================ */

const EDGE_STATE =
    window.EDGE_STATE ||
    {
        scenario:
            "NORMAL",

        intensity:
            50,

        running:
            false,

        validation:
            false,

        selfTest:
            false,

        domains:
            {
                quantization:
                    50,

                pruning:
                    50,

                graph:
                    50,

                memory:
                    50,

                kernel:
                    50,

                runtime:
                    50
            }
    };


window.EDGE_STATE =
    EDGE_STATE;


/* ============================================================
   SYSTEM LOG STATE
============================================================ */

window.edgePipelineLog =
    Array.isArray(window.edgePipelineLog)
        ? window.edgePipelineLog
        : [];

window.edgeAuditLog =
    Array.isArray(window.edgeAuditLog)
        ? window.edgeAuditLog
        : [];


/* ============================================================
   DOM HELPERS
============================================================ */

function getElement(id) {

    return document.getElementById(id);
}


function setText(id, value) {

    const element =
        getElement(id);

    if (!element) {
        return false;
    }

    element.textContent =
        String(value);

    return true;
}


function formatOutput(value) {

    if (
        value === null ||
        typeof value === "undefined"
    ) {
        return "";
    }

    if (
        typeof value === "object"
    ) {

        try {

            return JSON.stringify(
                value,
                null,
                2
            );

        } catch (error) {

            return String(value);
        }
    }

    return String(value);
}


function write(id, value) {

    const element =
        getElement(id);

    if (!element) {
        return false;
    }

    element.textContent =
        formatOutput(value);

    return true;
}


/* ============================================================
   EDGE LOGGING
============================================================ */

function logEdge(message) {

    const entry =
        {
            timestamp:
                new Date().toISOString(),

            message:
                String(message)
        };

    window.edgePipelineLog.push(
        entry
    );

    write(
        "pipelineLog",
        window.edgePipelineLog
    );

    return entry;
}


function writeAudit(event, details) {

    const entry =
        {
            timestamp:
                new Date().toISOString(),

            event:
                String(event),

            details:
                details || {}
        };

    window.edgeAuditLog.push(
        entry
    );

    write(
        "audit",
        window.edgeAuditLog
    );

    return entry;
}


/* ============================================================
   INTENSITY
   AUTHORITATIVE SYSTEM CONTROL
============================================================ */

function normalizeOptimizationIntensity(value) {

    let intensity =
        Number(value);

    if (!Number.isFinite(intensity)) {
        intensity = 50;
    }

    intensity =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(intensity)
            )
        );

    return intensity;
}


function getOptimizationIntensity() {

    const slider =
        getElement(
            "optimizationIntensity"
        );

    if (slider) {

        EDGE_STATE.intensity =
            normalizeOptimizationIntensity(
                slider.value
            );
    }

    return normalizeOptimizationIntensity(
        EDGE_STATE.intensity
    );
}


function updateOptimizationIntensity() {

    const slider =
        getElement(
            "optimizationIntensity"
        );

    if (!slider) {
        return;
    }

    const intensity =
        normalizeOptimizationIntensity(
            slider.value
        );

    EDGE_STATE.intensity =
        intensity;


    setText(
        "intensityValue",
        `${intensity}%`
    );


    const fill =
        getElement(
            "fill"
        );

    if (fill) {

        fill.style.width =
            `${intensity}%`;
    }


    const progressFill =
        getElement(
            "progressFill"
        );

    if (progressFill) {

        progressFill.style.width =
            `${intensity}%`;
    }


    const scenario =
        getActiveOptimizationScenario();

    write(
        "scenarioPanel",
        {
            domain:
                "EDGE OPTIMIZATION",

            scenario:
                scenario,

            intensity:
                `${intensity}%`,

            execution:
                "LOCAL_DETERMINISTIC_SIMULATION",

            backend:
                "NOT CONNECTED"
        }
    );


    updateOptimizationDomainMonitor();


    logEdge(
        `Optimization intensity updated: ${intensity}%.`
    );
}
/* ============================================================
   AUTHORITATIVE EDGE SCENARIO STATE
   SINGLE SOURCE OF TRUTH
============================================================ */

function getActiveOptimizationScenario() {

    const scenario =
        typeof EDGE_STATE.scenario === "string"
            ? EDGE_STATE.scenario.trim().toUpperCase()
            : "NORMAL";

    return scenario || "NORMAL";
}


/* ============================================================
   SCENARIO CONTROL
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

    const normalizedScenario =
        scenario.trim().toUpperCase();

    EDGE_STATE.scenario =
        normalizedScenario;

    EDGE_STATE.validation =
        false;

    EDGE_STATE.running =
        false;

    const intensity =
        getOptimizationIntensity();

    write(
        "scenarioPanel",
        {
            domain:
                "EDGE OPTIMIZATION",

            scenario:
                getActiveOptimizationScenario(),

            intensity:
                `${intensity}%`,

            execution:
                "LOCAL_DETERMINISTIC_SIMULATION",

            backend:
                "NOT CONNECTED"
        }
    );

    write(
        "systemStatus",
        `SYSTEM STATUS: OPTIMIZATION SCENARIO ACTIVE — ${getActiveOptimizationScenario()}`
    );

    write(
        "optimizationStatus",
        "SCENARIO ACTIVE"
    );

    updateOptimizationDomainMonitor();

    logEdge(
        `Optimization scenario activated: ${getActiveOptimizationScenario()}`
    );
}


function resetOptimizationScenario() {

    EDGE_STATE.scenario =
        "NORMAL";

    EDGE_STATE.validation =
        false;

    write(
        "scenarioPanel",
        "Optimization scenario reset to NORMAL."
    );

    write(
        "systemStatus",
        "SYSTEM STATUS: READY — EDGE OPTIMIZATION"
    );

    write(
        "optimizationStatus",
        "WAITING"
    );

    updateOptimizationDomainMonitor();

    logEdge(
        "Optimization scenario reset."
    );
}


/* ============================================================
   DOMAIN MONITOR
============================================================ */

function calculateDomainIntensity(
    baseIntensity,
    factor
) {

    return Math.max(
        0,
        Math.min(
            100,
            Math.round(
                baseIntensity * factor
            )
        )
    );
}


function updateOptimizationDomainMonitor() {

    const intensity =
        getOptimizationIntensity();


    const domains =
        {
            quantization:
                calculateDomainIntensity(
                    intensity,
                    1.00
                ),

            pruning:
                calculateDomainIntensity(
                    intensity,
                    0.96
                ),

            graph:
                calculateDomainIntensity(
                    intensity,
                    0.92
                ),

            memory:
                calculateDomainIntensity(
                    intensity,
                    0.88
                ),

            kernel:
                calculateDomainIntensity(
                    intensity,
                    0.84
                ),

            runtime:
                calculateDomainIntensity(
                    intensity,
                    0.80
                )
        };


    EDGE_STATE.domains =
        domains;


    write(
        "domainQuantization",
        `${domains.quantization}% — QUANTIZATION`
    );

    write(
        "domainPruning",
        `${domains.pruning}% — PRUNING`
    );

    write(
        "domainGraph",
        `${domains.graph}% — GRAPH`
    );

    write(
        "domainMemory",
        `${domains.memory}% — MEMORY`
    );

    write(
        "domainKernel",
        `${domains.kernel}% — KERNEL`
    );

    write(
        "domainRuntime",
        `${domains.runtime}% — RUNTIME`
    );


    return domains;
}


/* ============================================================
   PIPELINE STAGE CONTROL
============================================================ */

function activatePipelineStage(
    stageId
) {

    const stages =
        [
            "stageOBSERVE",
            "stageVERIFY",
            "stageOPTIMIZE",
            "stageASSESS",
            "stageVALIDATE",
            "stageUPDATE"
        ];


    stages.forEach(
        (id) => {

            const element =
                getElement(id);

            if (!element) {
                return;
            }

            element.classList.remove(
                "active"
            );

            element.classList.remove(
                "complete"
            );
        }
    );


    const selectedIndex =
        stages.indexOf(stageId);


    if (selectedIndex < 0) {
        return;
    }


    stages.forEach(
        (id, index) => {

            const element =
                getElement(id);

            if (!element) {
                return;
            }

            if (
                index <
                selectedIndex
            ) {

                element.classList.add(
                    "complete"
                );
            }

            if (
                index ===
                selectedIndex
            ) {

                element.classList.add(
                    "active"
                );
            }
        }
    );
}


/* ============================================================
   OPTIMIZATION ASSESSMENT
   ACTIVE SCENARIO IS AUTHORITATIVE
============================================================ */

function calculateOptimizationResults() {

    const intensity =
        getOptimizationIntensity();

    const scenario =
        getActiveOptimizationScenario();


    /*
     * Deterministic simulated metrics.
     * Research/demo values only.
     * Not physical benchmark results.
     */

    const costReduction =
        Math.round(
            intensity * 0.65
        );

    const throughput =
        Math.round(
            intensity * 0.55
        );

    const efficiency =
        Math.round(
            50 +
            intensity * 0.50
        );


    write(
        "costReduction",
        `${costReduction}%`
    );

    write(
        "throughput",
        `${throughput}%`
    );

    write(
        "efficiency",
        `${efficiency}/100`
    );


    /* --------------------------------------------------------
       RAW SYSTEM STATE
    -------------------------------------------------------- */

    write(
        "state",
        {
            domain:
                "EDGE OPTIMIZATION",

            scenario:
                scenario,

            intensity:
                intensity,

            domains:
                {
                    ...EDGE_STATE.domains
                },

            execution:
                "LOCAL_DETERMINISTIC_SIMULATION",

            backend:
                "DISABLED",

            physicalExecution:
                "DISABLED"
        }
    );


    /* --------------------------------------------------------
       SYSTEM ASSESSMENT
    -------------------------------------------------------- */

    write(
        "assessment",
        {
            scenario:
                scenario,

            optimizationIntensity:
                intensity,

            status:
                "SIMULATED ASSESSMENT COMPLETE",

            physicalExecution:
                "DISABLED"
        }
    );


    /* --------------------------------------------------------
       NEURALEDGE DECISION
    -------------------------------------------------------- */

    write(
        "decision",
        {
            system:
                "NEURALEDGE OPTIMIZATION DECISION",

            scenario:
                scenario,

            decision:
                "MAINTAIN_SAFE_OPTIMIZATION_STATE",

            authorization:
                "HUMAN AUTHORIZATION REQUIRED",

            execution:
                "SIMULATION ONLY"
        }
    );
}
