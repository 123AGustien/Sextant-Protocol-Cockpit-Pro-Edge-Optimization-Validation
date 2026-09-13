/* ============================================================
   SEXTANT PROTOCOL™ — BIODIESEL DOMAIN INTEGRATION
   ENERGY DOMAIN
   Captain AI Lena Decision Support

   PURPOSE:
   BIODIESEL COCKPIT
        ↓
   DOMAIN INTEGRATION
        ↓
   BIODIESEL RULE ENGINE
        ↓
   BIODIESEL SCENARIO ENGINE
        ↓
   TRIAL MANOEUVRE
        ↓
   VALIDATION / AUDIT

   IMPORTANT:
   - This file contains NO domain rules.
   - Rules remain in the authoritative rule source.
   - No physical execution occurs.
   - No backend connection occurs.
   - Human authorization remains mandatory.
============================================================ */

(function (global) {

    "use strict";

    const BIODIESEL_DOMAIN =
        "ENERGY";

    const BIODIESEL_INTEGRATION_VERSION =
        "2.3.0";

    /* ========================================================
       INTERNAL STATE
    ======================================================== */

    if (!Array.isArray(global.biodieselAuditLog)) {
        global.biodieselAuditLog = [];
    }

    if (!Array.isArray(global.biodieselPipelineLog)) {
        global.biodieselPipelineLog = [];
    }

    /* ========================================================
       UI HELPERS
    ======================================================== */

    function updateBiodieselElement(
        id,
        value
    ) {
        const element =
            document.getElementById(id);

        if (!element) {
            return false;
        }

        if (
            typeof value === "object"
        ) {
            element.textContent =
                JSON.stringify(
                    value,
                    null,
                    2
                );
        } else {
            element.textContent =
                String(value);
        }

        return true;
    }

    function writeBiodieselAudit(
        event,
        result
    ) {
        global.biodieselAuditLog.push({
            timestamp:
                new Date().toISOString(),
            domain:
                BIODIESEL_DOMAIN,
            event,
            result
        });

        updateBiodieselElement(
            "biodieselAudit",
            global.biodieselAuditLog
        );
    }

    function writeBiodieselPipelineLog(
        stage,
        status,
        result
    ) {
        global.biodieselPipelineLog.push({
            timestamp:
                new Date().toISOString(),
            stage,
            status,
            result
        });

        updateBiodieselElement(
            "biodieselPipelineLog",
            global.biodieselPipelineLog
        );
    }

    /* ========================================================
       AUTHORITATIVE MODULE ACCESS
    ======================================================== */

    function getBiodieselRegistry() {
        return (
            global.BiodieselRuleRegistry ||
            null
        );
    }

    function getBiodieselEngine() {
        return (
            global.BiodieselRuleEngine ||
            null
        );
    }

    function getBiodieselScenarioEngine() {
        return (
            global.BiodieselScenarioEngine ||
            null
        );
    }

    function getBiodieselTrialManoeuvre() {
        return (
            global.BiodieselTrialManoeuvre ||
            null
        );
    }

    /* ========================================================
       MODULE STATUS
    ======================================================== */

    function getBiodieselIntegrationStatus() {

        return {
            domain:
                BIODIESEL_DOMAIN,

            registryAvailable:
                Boolean(
                    getBiodieselRegistry()
                ),

            ruleEngineAvailable:
                Boolean(
                    getBiodieselEngine()
                ),

            scenarioEngineAvailable:
                Boolean(
                    getBiodieselScenarioEngine()
                ),

            trialManoeuvreAvailable:
                Boolean(
                    getBiodieselTrialManoeuvre()
                ),

            integrationAvailable:
                true,

            physicalExecution:
                false,

            backendConnection:
                false,

            humanAuthorization:
                "REQUIRED"
        };
    }

    /* ========================================================
       SCENARIO ACTIVATION
    ======================================================== */

    function activateBiodieselScenario(
        scenario,
        state = {}
    ) {

        const engine =
            getBiodieselScenarioEngine();

        if (
            !engine ||
            typeof engine.run !== "function"
        ) {
            const result = {
                verified: false,
                scenario,
                decision:
                    "REQUEST_ADDITIONAL_DIAGNOSTICS",
                reason:
                    "Biodiesel Scenario Engine unavailable.",
                authority:
                    "HUMAN OPERATOR",
                execution:
                    "HUMAN AUTHORIZATION REQUIRED"
            };

            updateBiodieselElement(
                "biodieselScenarioPanel",
                result
            );

            return result;
        }

        const result =
            engine.run(
                scenario,
                state
            );

        updateBiodieselElement(
            "biodieselScenarioPanel",
            result
        );

        writeBiodieselAudit(
            "SCENARIO",
            result
        );

        writeBiodieselPipelineLog(
            "SCENARIO",
            result.ruleVerified === true
                ? "PASS"
                : "FAIL",
            result
        );

        return result;
    }

    /* ========================================================
       DOMAIN INTEGRATION TEST
    ======================================================== */

    function runBiodieselIntegrationTest() {

        const registry =
            getBiodieselRegistry();

        const engine =
            getBiodieselEngine();

        const scenarioEngine =
            getBiodieselScenarioEngine();

        const trial =
            getBiodieselTrialManoeuvre();

        const registryAvailable =
            Boolean(registry);

        const engineAvailable =
            Boolean(engine);

        const scenarioAvailable =
            Boolean(scenarioEngine);

        const trialAvailable =
            Boolean(trial);

        const registryValidation =
            registry &&
            typeof registry
                .validateBiodieselRules ===
                "function"
                ? registry.validateBiodieselRules()
                : {
                    valid: false
                };

        const evaluateAvailable =
            Boolean(
                engine &&
                typeof engine.evaluate ===
                "function"
            );

        const deriveAvailable =
            Boolean(
                engine &&
                typeof engine.deriveSolution ===
                "function"
            );

        const scenarioRunAvailable =
            Boolean(
                scenarioEngine &&
                typeof scenarioEngine.run ===
                "function"
            );

        const trialRunAvailable =
            Boolean(
                trial &&
                typeof trial.run ===
                "function"
            );

        const trialVerifyAvailable =
            Boolean(
                trial &&
                typeof trial.verify ===
                "function"
            );

        const safetyChecks = {
            physicalExecutionDisabled:
                true,

            backendConnectionDisabled:
                true,

            externalConnectionDisabled:
                true,

            humanAuthorizationRequired:
                true
        };

        const allChecks = [
            registryAvailable,
            engineAvailable,
            scenarioAvailable,
            trialAvailable,
            registryValidation.valid === true,
            evaluateAvailable,
            deriveAvailable,
            scenarioRunAvailable,
            trialRunAvailable,
            trialVerifyAvailable,
            safetyChecks
                .physicalExecutionDisabled,
            safetyChecks
                .backendConnectionDisabled,
            safetyChecks
                .externalConnectionDisabled,
            safetyChecks
                .humanAuthorizationRequired
        ];

        const passed =
            allChecks.every(
                Boolean
            );

        const result = {
            version:
                BIODIESEL_INTEGRATION_VERSION,

            domain:
                BIODIESEL_DOMAIN,

            registryAvailable,

            registryVersion:
                registry?.version ??
                null,

            registryValidation,

            ruleEngineAvailable:
                engineAvailable,

            ruleEngineVersion:
                engine?.version ??
                null,

            evaluateAvailable,

            deriveAvailable,

            scenarioEngineAvailable:
                scenarioAvailable,

            scenarioEngineVersion:
                scenarioEngine?.version ??
                null,

            trialManoeuvreAvailable:
                trialAvailable,

            trialManoeuvreVersion:
                trial?.version ??
                null,

            scenarioRunAvailable,

            trialRunAvailable,

            trialVerifyAvailable,

            safetyChecks,

            allChecksPassed:
                passed,

            passed,

            status:
                passed
                    ? "BIODIESEL_INTEGRATION_TEST_PASSED"
                    : "BIODIESEL_INTEGRATION_TEST_FAILED",

            physicalExecution:
                false,

            backendConnection:
                false,

            humanAuthorization:
                "REQUIRED"
        };

        updateBiodieselElement(
            "biodieselDomainIntegration",
            result
        );

        writeBiodieselAudit(
            "INTEGRATION_TEST",
            result
        );

        writeBiodieselPipelineLog(
            "DOMAIN_INTEGRATION",
            passed
                ? "PASS"
                : "FAIL",
            result
        );

        return result;
    }

    /* ========================================================
       SELF TEST
    ======================================================== */

    function runBiodieselSelfTest() {

        const result =
            runBiodieselIntegrationTest();

        updateBiodieselElement(
            "biodieselSelfTest",
            result
        );

        return result;
    }

    /* ========================================================
       SELF TEST INTERPRETATION
    ======================================================== */

    function interpretBiodieselSelfTest(
        result
    ) {

        const passed =
            Boolean(
                result &&
                result.passed === true
            );

        const interpretation = {
            passed,
            status:
                passed
                    ? "BIODIESEL SELF-TEST PASS"
                    : "BIODIESEL SELF-TEST FAIL",
            interpretation:
                passed
                    ? "All required Biodiesel integration components are connected and available."
                    : "One or more Biodiesel integration components are unavailable.",
            authority:
                "HUMAN OPERATOR",
            physicalExecution:
                false,
            backendConnection:
                false
        };

        updateBiodieselElement(
            "biodieselSelfTestInterpretation",
            interpretation
        );

        writeBiodieselAudit(
            "SELF_TEST_INTERPRETATION",
            interpretation
        );

        return interpretation;
    }

    /* ========================================================
       FAULT IDENTIFICATION
    ======================================================== */

    function identifyBiodieselFault(
        result
    ) {

        const passed =
            Boolean(
                result &&
                result.passed === true
            );

        const fault = {
            faultDetected:
                !passed,

            status:
                passed
                    ? "NO_FAULT_DETECTED"
                    : "BIODIESEL_INTEGRATION_FAULT",

            reason:
                passed
                    ? "No Biodiesel integration fault detected."
                    : "One or more Biodiesel integration checks failed.",

            failedChecks:
                result
                    ? Object.keys(result)
                        .filter(
                            key =>
                                key !== "passed" &&
                                result[key] === false
                        )
                    : []
        };

        updateBiodieselElement(
            "biodieselFaultIdentification",
            fault
        );

        writeBiodieselAudit(
            "FAULT_IDENTIFICATION",
            fault
        );

        return fault;
    }

    /* ========================================================
       CORRECTIVE ACTION
    ======================================================== */

    function executeBiodieselCorrectiveAction(
        fault
    ) {

        const action = {
            correctiveActionRequired:
                Boolean(
                    fault &&
                    fault.faultDetected === true
                ),

            action:
                fault &&
                fault.faultDetected === true
                    ? "VERIFY_BIODIESEL_MODULE_LOAD_ORDER_AND_SCRIPT_AVAILABILITY"
                    : "NO_CORRECTIVE_ACTION_REQUIRED",

            physicalExecution:
                false,

            backendConnection:
                false,

            humanAuthorization:
                "REQUIRED"
        };

        updateBiodieselElement(
            "biodieselCorrectiveAction",
            action
        );

        writeBiodieselAudit(
            "CORRECTIVE_ACTION",
            action
        );

        return action;
    }

    /* ========================================================
       SELF TEST + CORRECTIVE ACTION
    ======================================================== */

    function runBiodieselSelfTestAndCorrectiveAction() {

        const test =
            runBiodieselIntegrationTest();

        const interpretation =
            interpretBiodieselSelfTest(
                test
            );

        const fault =
            identifyBiodieselFault(
                test
            );

        const correctiveAction =
            executeBiodieselCorrectiveAction(
                fault
            );

        const retest =
            runBiodieselIntegrationTest();

        updateBiodieselElement(
            "biodieselRetest",
            retest
        );

        writeBiodieselAudit(
            "RETEST",
            retest
        );

        writeBiodieselPipelineLog(
            "SELF_TEST_CORRECTIVE_RETEST",
            retest.passed
                ? "PASS"
                : "FAIL",
            retest
        );

        return {
            test,
            interpretation,
            fault,
            correctiveAction,
            retest
        };
    }

    /* ========================================================
       TRIAL MANOEUVRE
    ======================================================== */

    function runBiodieselTrialManoeuvre(
        scenario =
            "BIODIESEL_SHORTAGE",
        state = {}
    ) {

        const trial =
            getBiodieselTrialManoeuvre();

        if (
            !trial ||
            typeof trial.run !== "function"
        ) {
            const result = {
                verified: false,
                executed: false,
                scenario,
                status:
                    "TRIAL_MANOEUVRE_UNAVAILABLE",
                physicalExecution:
                    false,
                backendConnection:
                    false,
                humanAuthorization:
                    "REQUIRED"
            };

            updateBiodieselElement(
                "biodieselTrialManoeuvre",
                result
            );

            return result;
        }

        const result =
            trial.run(
                scenario,
                state
            );

        updateBiodieselElement(
            "biodieselTrialManoeuvre",
            result
        );

        writeBiodieselAudit(
            "TRIAL_MANOEUVRE",
            result
        );

        writeBiodieselPipelineLog(
            "TRIAL_MANOEUVRE",
            result.verified === true
                ? "PASS"
                : "FAIL",
            result
        );

        return result;
    }

    /* ========================================================
       TRIAL VALIDATION
    ======================================================== */

    function validateBiodieselTrialManoeuvre(
        result
    ) {

        const trial =
            getBiodieselTrialManoeuvre();

        if (
            !trial ||
            typeof trial.verify !== "function"
        ) {
            const validation = {
                trialManoeuvreVerified:
                    false,

                status:
                    "TRIAL_VALIDATION_UNAVAILABLE",

                deterministic:
                    true,

                backendConnection:
                    false,

                physicalExecution:
                    false,

                humanAuthorization:
                    "REQUIRED"
            };

            updateBiodieselElement(
                "biodieselValidation",
                validation
            );

            return validation;
        }

        const validation =
            trial.verify(
                result
            );

        updateBiodieselElement(
            "biodieselValidation",
            validation
        );

        writeBiodieselAudit(
            "TRIAL_VALIDATION",
            validation
        );

        writeBiodieselPipelineLog(
            "TRIAL_VALIDATION",
            validation.trialManoeuvreVerified
                ? "PASS"
                : "FAIL",
            validation
        );

        return validation;
    }

    /* ========================================================
       RESET
    ======================================================== */

    function resetBiodiesel() {

        global.biodieselAuditLog = [];
        global.biodieselPipelineLog = [];

        const resetIds = [
            "biodieselScenarioPanel",
            "biodieselDomainIntegration",
            "biodieselSelfTest",
            "biodieselSelfTestInterpretation",
            "biodieselFaultIdentification",
            "biodieselCorrectiveAction",
            "biodieselRetest",
            "biodieselTrialManoeuvre",
            "biodieselValidation",
            "biodieselAudit",
            "biodieselPipelineLog"
        ];

        resetIds.forEach(
            id => {
                const element =
                    document.getElementById(id);

                if (element) {
                    element.textContent =
                        id ===
                        "biodieselAudit"
                            ? "[]"
                            : id ===
                              "biodieselPipelineLog"
                            ? "[]"
                            : "Waiting...";
                }
            }
        );

        return {
            reset: true,
            domain:
                BIODIESEL_DOMAIN
        };
    }

    /* ========================================================
       PUBLIC API
    ======================================================== */

    global.BiodieselDomainIntegration = {

        version:
            BIODIESEL_INTEGRATION_VERSION,

        domain:
            BIODIESEL_DOMAIN,

        getStatus:
            getBiodieselIntegrationStatus,

        run:
            runBiodieselIntegrationTest,

        integrationTest:
            runBiodieselIntegrationTest,

        activateScenario:
            activateBiodieselScenario,

        selfTest:
            runBiodieselSelfTest,

        selfTestAndCorrect:
            runBiodieselSelfTestAndCorrectiveAction,

        interpretSelfTest:
            interpretBiodieselSelfTest,

        identifyFault:
            identifyBiodieselFault,

        correctiveAction:
            executeBiodieselCorrectiveAction,

        trialManoeuvre:
            runBiodieselTrialManoeuvre,

        validateTrialManoeuvre:
            validateBiodieselTrialManoeuvre,

        reset:
            resetBiodiesel
    };

    /* ========================================================
       COCKPIT COMPATIBILITY EXPORTS
    ======================================================== */

    global.runBiodieselDomain =
        runBiodieselIntegrationTest;

    global.runBiodieselIntegrationTest =
        runBiodieselIntegrationTest;

    global.activateBiodieselScenario =
        activateBiodieselScenario;

    global.runBiodieselSelfTest =
        runBiodieselSelfTest;

    global.runBiodieselSelfTestAndCorrectiveAction =
        runBiodieselSelfTestAndCorrectiveAction;

    /*
     * Existing cockpit button uses this shorter name.
     */
    global.runBiodieselSelfTestAndCorrect =
        runBiodieselSelfTestAndCorrectiveAction;

    global.runBiodieselTrialManoeuvre =
        runBiodieselTrialManoeuvre;

    global.validateBiodieselTrialManoeuvre =
        validateBiodieselTrialManoeuvre;

    global.resetBiodiesel =
        resetBiodiesel;

})(window);