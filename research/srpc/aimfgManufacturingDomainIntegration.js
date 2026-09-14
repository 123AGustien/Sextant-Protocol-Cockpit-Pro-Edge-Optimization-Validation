"use strict";

/* ============================================================
   SEXTANT PROTOCOL™
   AIMfg MANUFACTURING DOMAIN INTEGRATION

   Central research gateway between:

   AIMfg Cockpit
          ↓
   AIMfg Domain Integration
          ↓
   AIMfg Scenario Engine
          ↓
   AIMfg Rule Engine
          ↓
   Manufacturing Resilience Result

   DOCTRINE:

   DATA → ALGORITHMS → COMPUTE

   PROCESS:

   OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

   SAFETY BOUNDARY:

   - Local deterministic research execution only.
   - No backend connection.
   - No external connection.
   - No physical manufacturing execution.
   - No autonomous actuation.
   - Human authorization remains mandatory.

   This integration layer does not create manufacturing rules.
   It does not replace the authoritative AIMfg rule data.
   It does not bypass the AIMfg rule engine.
============================================================ */

const AIMFG_MANUFACTURING_DOMAIN_INTEGRATION_VERSION =
    "0.1.0-RESEARCH";

/* ============================================================
   AIMfg DOMAIN REGISTRY
============================================================ */

const AIMFG_MANUFACTURING_DOMAIN =
    "AIMFG_MANUFACTURING";

/* ============================================================
   ENGINE REGISTRATION
============================================================ */

function getRuleEngine() {

    if (
        typeof window !== "undefined" &&
        window.AIMfgManufacturingRuleEngine
    ) {
        return window.AIMfgManufacturingRuleEngine;
    }

    return null;
}

function getScenarioEngine() {

    if (
        typeof window !== "undefined" &&
        window.AIMfgManufacturingScenarioEngine
    ) {
        return window.AIMfgManufacturingScenarioEngine;
    }

    return null;
}

function getScenarioModule() {

    if (
        typeof window !== "undefined" &&
        window.AIMfgManufacturingScenario
    ) {
        return window.AIMfgManufacturingScenario;
    }

    return null;
}

/* ============================================================
   DOMAIN STATUS
============================================================ */

function getStatus() {

    const ruleEngine =
        getRuleEngine();

    const scenarioEngine =
        getScenarioEngine();

    const scenarioModule =
        getScenarioModule();

    return {

        domain:
            AIMFG_MANUFACTURING_DOMAIN,

        version:
            AIMFG_MANUFACTURING_DOMAIN_INTEGRATION_VERSION,

        registered:
            true,

        active:
            Boolean(
                ruleEngine &&
                scenarioEngine &&
                scenarioModule
            ),

        ruleEngineAvailable:
            Boolean(ruleEngine),

        scenarioEngineAvailable:
            Boolean(scenarioEngine),

        scenarioAvailable:
            Boolean(scenarioModule),

        physicalExecution:
            false,

        backendConnection:
            false,

        externalConnection:
            false,

        autonomousActuation:
            false,

        humanAuthorization:
            "REQUIRED"
    };
}

/* ============================================================
   DOMAIN INPUT VERIFICATION
============================================================ */

function verifyInput(
    scenario,
    state = {}
) {

    if (
        typeof scenario !== "string" ||
        scenario.trim() === ""
    ) {

        return {

            valid:
                false,

            reason:
                "INVALID_SCENARIO"
        };
    }

    if (
        !state ||
        typeof state !== "object" ||
        Array.isArray(state)
    ) {

        return {

            valid:
                false,

            reason:
                "INVALID_MANUFACTURING_STATE"
        };
    }

    return {

        valid:
            true,

        domain:
            AIMFG_MANUFACTURING_DOMAIN,

        scenario:
            scenario.trim(),

        state:
            state
    };
}

/* ============================================================
   ENGINE VERIFICATION
============================================================ */

function verifyEngines() {

    const ruleEngine =
        getRuleEngine();

    const scenarioEngine =
        getScenarioEngine();

    const scenarioModule =
        getScenarioModule();

    return {

        ruleEngineAvailable:
            Boolean(ruleEngine),

        scenarioEngineAvailable:
            Boolean(scenarioEngine),

        scenarioAvailable:
            Boolean(scenarioModule),

        allAvailable:
            Boolean(
                ruleEngine &&
                scenarioEngine &&
                scenarioModule
            )
    };
}

/* ============================================================
   SCENARIO ROUTING
============================================================ */

function route(
    scenario,
    state = {}
) {

    const input =
        verifyInput(
            scenario,
            state
        );

    if (!input.valid) {

        return {

            routed:
                false,

            domain:
                AIMFG_MANUFACTURING_DOMAIN,

            scenario:
                scenario,

            reason:
                input.reason,

            physicalExecution:
                false,

            humanAuthorization:
                "REQUIRED"
        };
    }

    const scenarioEngine =
        getScenarioEngine();

    if (!scenarioEngine) {

        return {

            routed:
                false,

            domain:
                AIMFG_MANUFACTURING_DOMAIN,

            scenario:
                input.scenario,

            reason:
                "AIMFG_MANUFACTURING_SCENARIO_ENGINE_NOT_AVAILABLE",

            physicalExecution:
                false,

            humanAuthorization:
                "REQUIRED"
        };
    }

    if (
        typeof scenarioEngine.run ===
        "function"
    ) {

        return {

            routed:
                true,

            domain:
                AIMFG_MANUFACTURING_DOMAIN,

            scenario:
                input.scenario,

            result:
                scenarioEngine.run(
                    input.scenario,
                    input.state
                ),

            physicalExecution:
                false,

            humanAuthorization:
                "REQUIRED"
        };
    }

    return {

        routed:
            false,

        domain:
            AIMFG_MANUFACTURING_DOMAIN,

        scenario:
            input.scenario,

        reason:
            "AIMFG_MANUFACTURING_SCENARIO_ENGINE_HAS_NO_SUPPORTED_ENTRY_POINT",

        physicalExecution:
            false,

        humanAuthorization:
            "REQUIRED"
    };
}

/* ============================================================
   STANDARD AIMfg MANUFACTURING SCENARIO
============================================================ */

function runManufacturingLineDegradation(
    state = {}
) {

    return route(
        "AIMFG_MANUFACTURING_LINE_DEGRADATION",
        state
    );
}

/* ============================================================
   INTEGRATION TEST
============================================================ */

function runIntegrationTest(
    state = {}
) {

    const status =
        getStatus();

    const engines =
        verifyEngines();

    const routeResult =
        runManufacturingLineDegradation(
            state
        );

    const result =
        routeResult &&
        routeResult.result;

    const ruleResult =
        result &&
        result.ruleResult;

    const checks = {

        domainRegistered:
            status.registered === true,

        ruleEngineAvailable:
            engines.ruleEngineAvailable === true,

        scenarioEngineAvailable:
            engines.scenarioEngineAvailable === true,

        scenarioAvailable:
            engines.scenarioAvailable === true,

        scenarioRouted:
            routeResult.routed === true,

        rulesPassed:
            Boolean(
                ruleResult &&
                ruleResult.allPassed === true
            ),

        physicalExecutionDisabled:
            routeResult.physicalExecution === false,

        humanAuthorizationRequired:
            routeResult.humanAuthorization ===
            "REQUIRED"
    };

    const allPassed =
        Object.values(checks)
            .every(function (value) {
                return value === true;
            });

    return {

        test:
            "AIMFG_MANUFACTURING_DOMAIN_INTEGRATION",

        version:
            AIMFG_MANUFACTURING_DOMAIN_INTEGRATION_VERSION,

        status:
            allPassed
                ? "AIMFG_MANUFACTURING_INTEGRATION_TEST_PASSED"
                : "AIMFG_MANUFACTURING_INTEGRATION_TEST_FAILED",

        allPassed:
            allPassed,

        checks:
            checks,

        route:
            routeResult,

        safety: {

            physicalExecution:
                false,

            backendConnection:
                false,

            externalConnection:
                false,

            autonomousActuation:
                false,

            humanAuthorization:
                "REQUIRED"
        }
    };
}

/* ============================================================
   DETERMINISM TEST
============================================================ */

function testDeterminism(
    state = {}
) {

    const first =
        runManufacturingLineDegradation(
            state
        );

    const second =
        runManufacturingLineDegradation(
            state
        );

    const firstJSON =
        JSON.stringify(first);

    const secondJSON =
        JSON.stringify(second);

    const deterministic =
        firstJSON === secondJSON;

    return {

        deterministic:
            deterministic,

        status:
            deterministic
                ? "AIMFG_MANUFACTURING_INTEGRATION_DETERMINISM_PASS"
                : "AIMFG_MANUFACTURING_INTEGRATION_DETERMINISM_FAIL",

        firstResult:
            first,

        secondResult:
            second
    };
}

/* ============================================================
   RESET
============================================================ */

function reset() {

    return {

        domain:
            AIMFG_MANUFACTURING_DOMAIN,

        version:
            AIMFG_MANUFACTURING_DOMAIN_INTEGRATION_VERSION,

        status:
            "RESET",

        physicalExecution:
            false,

        backendConnection:
            false,

        externalConnection:
            false,

        autonomousActuation:
            false,

        humanAuthorization:
            "REQUIRED"
    };
}

/* ============================================================
   PUBLIC INTERFACE
============================================================ */

const AIMfgManufacturingDomainIntegration = {

    version:
        AIMFG_MANUFACTURING_DOMAIN_INTEGRATION_VERSION,

    domain:
        AIMFG_MANUFACTURING_DOMAIN,

    status:
        getStatus,

    verifyInput:
        verifyInput,

    verifyEngines:
        verifyEngines,

    route:
        route,

    run:
        route,

    runManufacturingLineDegradation:
        runManufacturingLineDegradation,

    runIntegrationTest:
        runIntegrationTest,

    testDeterminism:
        testDeterminism,

    reset:
        reset
};

/* ============================================================
   GLOBAL EXPORT
============================================================ */

if (
    typeof window !== "undefined"
) {

    window.AIMfgManufacturingDomainIntegration =
        AIMfgManufacturingDomainIntegration;

    /*
     * Compatibility alias.
     *
     * This does not replace the named AIMfg integration API.
     */

    window.AIMfgManufacturingIntegration =
        AIMfgManufacturingDomainIntegration;
}