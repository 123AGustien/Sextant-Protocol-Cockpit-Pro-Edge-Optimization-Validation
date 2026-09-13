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
