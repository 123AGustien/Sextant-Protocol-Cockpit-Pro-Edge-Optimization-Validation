"use strict";

/*
 * AIMfg Manufacturing Rule Engine
 * Sextant Resilience Processing Core (SRPC)
 * Research Domain Integration — v0.1
 *
 * PURPOSE:
 * Execute the AIMfg manufacturing rule data through a dedicated
 * deterministic domain rule-engine layer.
 *
 * DOCTRINE:
 * DATA → ALGORITHMS → COMPUTE
 *
 * ARCHITECTURE:
 * AIMfg Manufacturing Rule Data
 *          ↓
 * AIMfg Manufacturing Rule Engine
 *          ↓
 * AIMfg Manufacturing Scenario Engine
 *
 * SAFETY:
 * - Local deterministic research execution only
 * - No backend connection
 * - No external connection
 * - No physical manufacturing execution
 * - No autonomous actuation
 * - Human authorization remains required
 *
 * DESIGN PRINCIPLE:
 * Rules remain in DATA.
 * This engine executes/evaluates the supplied rule data.
 */

(function (global) {
    "use strict";

    const VERSION = "0.1.0-RESEARCH";

    function getRulesModule() {
        return global.AIMfgManufacturingRules || null;
    }

    function getRules() {
        const rulesModule = getRulesModule();

        if (
            !rulesModule ||
            typeof rulesModule.getAIMfgManufacturingRules !== "function"
        ) {
            return [];
        }

        return rulesModule.getAIMfgManufacturingRules();
    }

    function getRuleById(ruleId) {
        const rulesModule = getRulesModule();

        if (
            !rulesModule ||
            typeof rulesModule.getAIMfgManufacturingRuleById !== "function"
        ) {
            return null;
        }

        return rulesModule.getAIMfgManufacturingRuleById(ruleId);
    }

    function evaluateRule(rule, state) {
        if (!rule || typeof rule !== "object") {
            return {
                ruleId: null,
                name: null,
                passed: false,
                reason: "RULE_NOT_AVAILABLE"
            };
        }

        const rulesModule = getRulesModule();

        if (
            rulesModule &&
            typeof rulesModule.evaluateAIMfgManufacturingRule === "function"
        ) {
            return rulesModule.evaluateAIMfgManufacturingRule(
                rule,
                state
            );
        }

        /*
         * Compatibility fallback:
         * The authoritative rule module remains responsible for
         * rule evaluation. The fallback never invents a successful
         * manufacturing result.
         */
        return {
            ruleId: rule.id || rule.ruleId || null,
            name: rule.name || null,
            passed: false,
            reason: "RULE_EVALUATION_FUNCTION_UNAVAILABLE"
        };
    }

    function evaluateAll(state) {
        const rulesModule = getRulesModule();

        if (!rulesModule) {
            return {
                version: VERSION,
                available: false,
                allPassed: false,
                totalRules: 0,
                passedRules: 0,
                failedRules: 0,
                results: [],
                reason: "AIMFG_MANUFACTURING_RULES_UNAVAILABLE"
            };
        }

        if (
            typeof rulesModule.evaluateAllAIMfgManufacturingRules ===
            "function"
        ) {
            const result =
                rulesModule.evaluateAllAIMfgManufacturingRules(state);

            return {
                version: VERSION,
                available: true,
                allPassed: !!result.allPassed,
                totalRules:
                    Number(result.totalRules) ||
                    Array.isArray(result.results)
                        ? result.results.length
                        : 0,
                passedRules: Number(result.passedRules) || 0,
                failedRules: Number(result.failedRules) || 0,
                results: Array.isArray(result.results)
                    ? result.results
                    : []
            };
        }

        const rules = getRules();
        const results = rules.map(function (rule) {
            return evaluateRule(rule, state);
        });

        const passedRules = results.filter(function (item) {
            return item && item.passed === true;
        }).length;

        const failedRules = results.length - passedRules;

        return {
            version: VERSION,
            available: true,
            allPassed:
                results.length > 0 &&
                failedRules === 0,
            totalRules: results.length,
            passedRules: passedRules,
            failedRules: failedRules,
            results: results
        };
    }

    function assess(state) {
        const rulesModule = getRulesModule();

        if (
            rulesModule &&
            typeof rulesModule.assessAIMfgManufacturingRules ===
            "function"
        ) {
            return rulesModule.assessAIMfgManufacturingRules(state);
        }

        return evaluateAll(state);
    }

    function testDeterminism(state) {
        const first = evaluateAll(state);
        const second = evaluateAll(state);

        const firstJSON = JSON.stringify(first);
        const secondJSON = JSON.stringify(second);

        return {
            version: VERSION,
            deterministic: firstJSON === secondJSON,
            status:
                firstJSON === secondJSON
                    ? "AIMFG_MANUFACTURING_RULE_ENGINE_DETERMINISM_PASS"
                    : "AIMFG_MANUFACTURING_RULE_ENGINE_DETERMINISM_FAIL",
            firstResult: first,
            secondResult: second
        };
    }

    function getStatus() {
        const rulesModule = getRulesModule();
        const rules = getRules();

        return {
            version: VERSION,
            engineAvailable: true,
            rulesModuleAvailable: !!rulesModule,
            rulesAvailable: Array.isArray(rules) && rules.length > 0,
            ruleCount: Array.isArray(rules) ? rules.length : 0,

            physicalExecution: false,
            backendConnection: false,
            externalConnection: false,
            autonomousActuation: false,

            humanAuthorization: "REQUIRED"
        };
    }

    function reset() {
        return {
            version: VERSION,
            status: "RESET",
            results: []
        };
    }

    global.AIMfgManufacturingRuleEngine = {
        VERSION: VERSION,

        getRules: getRules,
        getRuleById: getRuleById,

        evaluateRule: evaluateRule,
        evaluateAll: evaluateAll,
        assess: assess,

        testDeterminism: testDeterminism,

        getStatus: getStatus,
        reset: reset
    };

})(window);