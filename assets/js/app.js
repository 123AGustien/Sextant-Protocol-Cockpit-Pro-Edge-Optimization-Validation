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

function activateOptimizationScenario(scenario) {

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
     * These are research/demo metrics only.
     * They do not represent physical benchmark results.
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


/* ============================================================
   OPTIMIZATION VALIDATION
   VALIDATES THE CURRENT ACTIVE SCENARIO
============================================================ */

function runOptimizationValidation() {

    const scenario =
        getActiveOptimizationScenario();

    const intensity =
        getOptimizationIntensity();

    EDGE_STATE.validation =
        true;

    write(
        "validation",
        {
            status:
                "VALIDATION PASS",

            scenario:
                scenario,

            intensity:
                intensity,

            domains:
                Object.keys(
                    EDGE_STATE.domains
                ),

            deterministic:
                true,

            backend:
                "DISABLED",

            physicalExecution:
                "DISABLED",

            authorization:
                "HUMAN AUTHORIZATION REQUIRED"
        }
    );

    write(
        "optimizationStatus",
        "VALIDATED"
    );

    logEdge(
        `Optimization validation PASS — scenario: ${scenario}.`
    );
}


/* ============================================================
   COMPLETE OPTIMIZATION RUN
   SCENARIO LOCKED FOR THIS RUN
============================================================ */

function runOptimizationSystem() {

    if (EDGE_STATE.running) {
        return;
    }

    EDGE_STATE.running =
        true;

    const runScenario =
        getActiveOptimizationScenario();

    const runIntensity =
        getOptimizationIntensity();

    write(
        "systemStatus",
        `SYSTEM STATUS: EDGE OPTIMIZATION RUNNING — ${runScenario}`
    );

    write(
        "optimizationStatus",
        "RUNNING"
    );

    write(
        "scenarioPanel",
        {
            domain:
                "EDGE OPTIMIZATION",

            scenario:
                runScenario,

            intensity:
                `${runIntensity}%`,

            execution:
                "LOCAL_DETERMINISTIC_SIMULATION",

            backend:
                "NOT CONNECTED"
        }
    );

    activatePipelineStage(
        "stageOBSERVE"
    );

    write(
        "pipeline",
        `OBSERVE\n` +
        `Reading deterministic optimization state...\n` +
        `Scenario: ${runScenario}\n` +
        `Intensity: ${runIntensity}%`
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageVERIFY"
            );

            write(
                "pipeline",
                `OBSERVE → VERIFY\n` +
                `Scenario verified: ${runScenario}\n` +
                `Optimization intensity verified: ${runIntensity}%`
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
                `OBSERVE → VERIFY → OPTIMIZE\n` +
                `Applying deterministic optimization workload...\n` +
                `Active scenario: ${runScenario}`
            );

        },
        600
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageASSESS"
            );

            /*
             * EDGE_STATE.scenario remains authoritative.
             * If the operator changes the scenario while a run
             * is active, the displayed state follows the current
             * state rather than silently reverting to NORMAL.
             */

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

            const finalScenario =
                getActiveOptimizationScenario();

            const finalIntensity =
                getOptimizationIntensity();

            write(
                "pipeline",
                `OBSERVE → VERIFY → OPTIMIZE → ` +
                `ASSESS → VALIDATE → UPDATE\n` +
                `Optimization cycle complete.\n` +
                `Scenario: ${finalScenario}\n` +
                `Intensity: ${finalIntensity}%`
            );

            EDGE_STATE.running =
                false;

            write(
                "optimizationStatus",
                "VALIDATED"
            );

            write(
                "systemStatus",
                `SYSTEM STATUS: OPTIMIZATION SIMULATION COMPLETE — ${finalScenario}`
            );

            logEdge(
                `Optimization cycle completed — scenario: ${finalScenario}.`
            );

        },
        1500
    );
}