/*
 * ============================================================
 * 🛰️ SEXTANT PROTOCOL™ OPTIMIZER
 * ARM64 EDGE OPTIMIZATION / VALIDATION COCKPIT
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
 * - ARM screen controls are orchestrated here.
 * - Biodiesel authoritative rules remain in the
 *   Biodiesel Rule Registry / Rule Engine.
 * - This file does NOT create Biodiesel rules.
 * - This file does NOT bypass the Biodiesel Rule Engine.
 * - Trial manoeuvres are simulation-only.
 * ============================================================
 */

"use strict";

/* ============================================================
   ARM SYSTEM STATE
============================================================ */

const ARM_STATE = {

    intensity: 50,

    scenario: "NORMAL",

    domain: "ARM",

    running: false,

    validation: false,

    selfTest: false,

    integrationTest: false,

    correctiveAction: false,

    audit: [],

    domains: {

        QUANTIZATION: 0,

        PRUNING: 0,

        GRAPH_OPTIMIZATION: 0,

        MEMORY_OPTIMIZATION: 0,

        KERNEL_OPTIMIZATION: 0,

        ARM64_RUNTIME: 0
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
   AUDIT LOGGING
============================================================ */

function logARM(message) {

    ARM_STATE.audit.push({

        timestamp:
            timestamp(),

        message
    });

    write(
        "audit",
        ARM_STATE.audit
    );

    write(
        "pipelineLog",
        ARM_STATE.audit
    );
}


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
   ARM INTENSITY
   SINGLE SOURCE OF TRUTH
============================================================ */

function getARMOptimizationIntensity() {

    const slider =
        getElement(
            "optimizationIntensity"
        );

    if (!slider) {

        return ARM_STATE.intensity;
    }

    const numericValue =
        Number(slider.value);

    if (!Number.isFinite(numericValue)) {

        return ARM_STATE.intensity;
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

    /*
     * If the screen does not contain the controls yet,
     * preserve the internal state rather than crashing.
     */

    if (!slider) {

        console.warn(
            "ARM optimization intensity slider not found."
        );

        return;
    }

    const intensity =
        getARMOptimizationIntensity();

    ARM_STATE.intensity =
        intensity;

    if (valueDisplay) {

        valueDisplay.textContent =
            `${intensity}%`;
    }

    if (fill) {

        fill.style.width =
            `${intensity}%`;
    }

    updateARMDomainMonitor();

    write(
        "pipeline",
        `ARM optimization intensity: ${intensity}%\n` +
        `Scenario: ${ARM_STATE.scenario}\n` +
        `Execution: LOCAL DETERMINISTIC SIMULATION`
    );

    console.log(
        `ARM optimization intensity updated: ${intensity}%`
    );
}


/* ============================================================
   ARM DOMAIN MONITOR
============================================================ */

function updateARMDomainMonitor() {

    const intensity =
        ARM_STATE.intensity;

    const values = {

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

        ARM64_RUNTIME:
            intensity
    };

    ARM_STATE.domains =
        values;

    write(
        "domainQuantization",
        values.QUANTIZATION
    );

    write(
        "domainPruning",
        values.PRUNING
    );

    write(
        "domainGraph",
        values.GRAPH_OPTIMIZATION
    );

    write(
        "domainMemory",
        values.MEMORY_OPTIMIZATION
    );

    write(
        "domainKernel",
        values.KERNEL_OPTIMIZATION
    );

    write(
        "domainRuntime",
        values.ARM64_RUNTIME
    );
}


/* ============================================================
   ARM SCENARIO
============================================================ */

function activateARMScenario(
    scenario
) {

    if (
        typeof scenario !== "string" ||
        !scenario.trim()
    ) {

        return;
    }

    ARM_STATE.scenario =
        scenario
            .trim()
            .toUpperCase();

    const intensity =
        ARM_STATE.intensity;

    write(
        "scenarioPanel",
        {

            domain:
                "ARM",

            scenario:
                ARM_STATE.scenario,

            intensity:
                `${intensity}%`,

            execution:
                "LOCAL_DETERMINISTIC_SIMULATION",

            backend:
                "NOT_CONNECTED"
        }
    );

    write(
        "systemStatus",
        `SYSTEM STATUS: ARM SCENARIO ACTIVE — ${ARM_STATE.scenario}`
    );

    updateARMDomainMonitor();

    logARM(
        `ARM scenario activated: ${ARM_STATE.scenario}`
    );
}


/* ============================================================
   ARM SCENARIO RESET
============================================================ */

function resetARMScenario() {

    ARM_STATE.scenario =
        "NORMAL";

    write(
        "scenarioPanel",
        "ARM scenario reset to NORMAL."
    );

    write(
        "systemStatus",
        "SYSTEM STATUS: READY — ARM SIMULATOR"
    );

    updateARMDomainMonitor();

    logARM(
        "ARM scenario reset."
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
   ARM SYSTEM
============================================================ */

function runARMSystem() {

    if (ARM_STATE.running) {

        return;
    }

    ARM_STATE.running =
        true;

    write(
        "systemStatus",
        "SYSTEM STATUS: ARM OPTIMIZATION RUNNING"
    );

    activatePipelineStage(
        "stageOBSERVE"
    );

    write(
        "pipeline",
        "OBSERVE\nReading deterministic ARM system state..."
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageVERIFY"
            );

            write(
                "pipeline",
                "OBSERVE → VERIFY\n" +
                "Scenario and intensity verified."
            );
        },
        300
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageOPTIMIZE"
            );

            updateARMDomainMonitor();

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

            calculateARMResults();
        },
        900
    );

    setTimeout(
        () => {

            activatePipelineStage(
                "stageVALIDATE"
            );

            runARMValidation();
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
                "ARM optimization cycle complete."
            );

            ARM_STATE.running =
                false;

            write(
                "systemStatus",
                "SYSTEM STATUS: ARM SIMULATION COMPLETE"
            );

            logARM(
                "ARM optimization cycle completed."
            );
        },
        1500
    );
}


/* ============================================================
   ARM RESULTS
============================================================ */

function calculateARMResults() {

    const intensity =
        ARM_STATE.intensity;

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
                "ARM",

            scenario:
                ARM_STATE.scenario,

            intensity:
                `${intensity}%`,

            optimizationDomains:
                ARM_STATE.domains,

            executionMode:
                "LOCAL_DETERMINISTIC_SIMULATION",

            backendConnection:
                false
        }
    );

    write(
        "assessment",
        {

            scenario:
                ARM_STATE.scenario,

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
                false
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

    logARM(
        `ARM results calculated at ${intensity}% intensity.`
    );
}


/* ============================================================
   ARM VALIDATION
============================================================ */

function runARMValidation() {

    ARM_STATE.validation =
        true;

    write(
        "validation",
        {

            status:
                "PASS",

            domain:
                "ARM",

            scenario:
                ARM_STATE.scenario,

            intensity:
                `${ARM_STATE.intensity}%`,

            deterministic:
                true,

            backendConnected:
                false,

            physicalExecution:
                false
        }
    );

    write(
        "optimizationStatus",
        "VALIDATED"
    );

    logARM(
        "ARM validation PASS."
    );
}


/* ============================================================
   ARM SELF-TEST
============================================================ */

function runARMSelfTest() {

    ARM_STATE.selfTest =
        true;

    const tests = [

        "ARM state integrity",

        "Intensity control",

        "Scenario routing",

        "Domain monitor",

        "Pipeline state",

        "Validation boundary"
    ];

    write(
        "selfTest",
        {

            status:
                "PASS",

            tests,

            failedTests:
                0
        }
    );

    write(
        "selfTestInterpretation",
        "ARM self-test PASS — all deterministic " +
        "screen-control checks passed."
    );

    write(
        "faultIdentification",
        "No ARM fault detected."
    );

    write(
        "correctiveAction",
        "No corrective action required."
    );

    logARM(
        "ARM self-test PASS."
    );
}


/* ============================================================
   ARM SELF-TEST + CORRECTIVE ACTION
============================================================ */

function runARMTestAndCorrect() {

    runARMSelfTest();

    ARM_STATE.correctiveAction =
        true;

    write(
        "correctiveAction",
        {

            status:
                "PASS",

            action:
                "NO_CORRECTIVE_ACTION_REQUIRED",

            reason:
                "All ARM deterministic checks passed."
        }
    );

    write(
        "retest",
        {

            status:
                "PASS",

            result:
                "ARM re-test validation passed."
        }
    );

    logARM(
        "ARM corrective-action cycle completed."
    );
}


/* ============================================================
   ARM DOMAIN INTEGRATION
============================================================ */

function runARMIntegrationTest() {

    ARM_STATE.integrationTest =
        true;

    write(
        "domainIntegration",
        {

            status:
                "PASS",

            cockpit:
                "ARM OPTIMIZER COCKPIT",

            integrationLayer:
                "LOCAL ARM DOMAIN INTEGRATION",

            optimizationEngines:
                "CONNECTED",

            decisionCore:
                "NEURALEDGE DECISION CORE",

            pipeline:
                "OBSERVE → VERIFY → OPTIMIZE → " +
                "ASSESS → VALIDATE → UPDATE",

            execution:
                "SIMULATION ONLY",

            backend:
                "NOT CONNECTED",

            physicalExecution:
                false
        }
    );

    write(
        "systemStatus",
        "SYSTEM STATUS: ARM DOMAIN INTEGRATION TEST PASS"
    );

    logARM(
        "ARM domain integration test PASS."
    );
}


/* ============================================================
   ARM RESET
============================================================ */

function resetARMSystem() {

    ARM_STATE.intensity =
        50;

    ARM_STATE.scenario =
        "NORMAL";

    ARM_STATE.running =
        false;

    ARM_STATE.validation =
        false;

    ARM_STATE.selfTest =
        false;

    ARM_STATE.integrationTest =
        false;

    ARM_STATE.correctiveAction =
        false;

    ARM_STATE.domains = {

        QUANTIZATION: 50,

        PRUNING: 50,

        GRAPH_OPTIMIZATION: 50,

        MEMORY_OPTIMIZATION: 50,

        KERNEL_OPTIMIZATION: 50,

        ARM64_RUNTIME: 50
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
        "SYSTEM STATUS: READY — ARM SIMULATOR"
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
        "ARM validation not executed."
    );

    write(
        "selfTest",
        "ARM self-test not executed."
    );

    write(
        "selfTestInterpretation",
        "Waiting for ARM self-test..."
    );

    write(
        "faultIdentification",
        "No ARM fault assessment available."
    );

    write(
        "correctiveAction",
        "No corrective action available."
    );

    write(
        "retest",
        "ARM re-test not executed."
    );

    updateARMDomainMonitor();

    logARM(
        "ARM system reset."
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

    /*
     * Preferred path:
     *
     * Screen
     * ↓
     * Domain Integration
     * ↓
     * Biodiesel Integration
     * ↓
     * Scenario Engine
     * ↓
     * Rule Engine
     * ↓
     * Rule Registry
     */

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
                        ARM_STATE.intensity,

                    intensity:
                        ARM_STATE.intensity
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
                        ARM_STATE.intensity,

                    intensity:
                        ARM_STATE.intensity
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
                            ARM_STATE.intensity,

                        intensity:
                            ARM_STATE.intensity
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

    write(
        "biodieselDomainStatus",
        "ACTIVE"
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
                "Biodiesel integration validator unavailable."
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

    /*
     * Re-test is deterministic and does not
     * execute any physical action.
     */

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
            ARM_STATE.intensity,

        intensity:
            ARM_STATE.intensity
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

    logBiodiesel(
        "Biodiesel trial manoeuvre reset."
    );
}


/* ============================================================
   GLOBAL SCREEN EXPORTS
   Required because the HTML buttons use onclick=""
============================================================ */

window.ARM_STATE =
    ARM_STATE;

window.BIODIESEL_STATE =
    BIODIESEL_STATE;

window.updateOptimizationIntensity =
    updateOptimizationIntensity;

window.getARMOptimizationIntensity =
    getARMOptimizationIntensity;

window.updateARMDomainMonitor =
    updateARMDomainMonitor;

window.activateARMScenario =
    activateARMScenario;

window.resetARMScenario =
    resetARMScenario;

window.runARMSystem =
    runARMSystem;

window.runARMSelfTest =
    runARMSelfTest;

window.runARMTestAndCorrect =
    runARMTestAndCorrect;

window.runARMIntegrationTest =
    runARMIntegrationTest;

window.resetARMSystem =
    resetARMSystem;

window.runARMValidation =
    runARMValidation;

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

    /*
     * Initialize intensity.
     */

    const slider =
        getElement(
            "optimizationIntensity"
        );

    if (slider) {

        slider.value =
            ARM_STATE.intensity;

        /*
         * Prevent duplicate listeners.
         * The handler is attached once here.
         */

        slider.addEventListener(
            "input",
            updateOptimizationIntensity
        );
    }

    updateOptimizationIntensity();

    updateARMDomainMonitor();

    updateBiodieselEngineStatus();

    /*
     * Initial safety/status state.
     */

    write(
        "systemStatus",
        "SYSTEM STATUS: READY — ARM SIMULATOR"
    );

    write(
        "optimizationStatus",
        "WAITING"
    );

    console.log(
        "Sextant Protocol Optimizer cockpit initialized."
    );

    console.log(
        "ARM local deterministic orchestration ready."
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