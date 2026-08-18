/**
 * Sextant Protocol™ / SPD v13.1
 * Domain Integration Layer
 *
 * Central gateway between:
 * Sextant Cockpit → SPD Orchestration → Domain Rule Engines
 *
 * IMPORTANT:
 * - This file contains NO domain-specific rules.
 * - Authoritative rules remain in the domain rules module.
 * - This is JavaScript simulator wiring only.
 * - No backend connection.
 * - No physical execution.
 * - Human authorization remains mandatory.
 */

"use strict";

/* ============================================================
   DOMAIN REGISTRY
============================================================ */

const DOMAIN_REGISTRY = Object.freeze({
  FIN: "FIN",
  BHR: "BHR",
  BIODIESEL: "BIODIESEL",
  FX: "FX",
  DC: "DC",
  CYB: "CYB",
  INF: "INF",
  ENG: "ENG",
  OPS: "OPS"
});

const DOMAIN_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  PLANNED: "PLANNED"
});

/* ============================================================
   DOMAIN ENGINE REGISTRY
============================================================ */

const DOMAIN_ENGINES = new Map();

/* ============================================================
   DOMAIN NORMALIZATION
============================================================ */

function normalizeDomain(domain) {
  if (typeof domain !== "string") {
    throw new Error("Domain must be a string.");
  }

  return domain.trim().toUpperCase();
}

/* ============================================================
   DOMAIN ENGINE REGISTRATION
============================================================ */

function registerDomainEngine(domain, engine) {
  const normalizedDomain = normalizeDomain(domain);

  if (
    !Object.values(DOMAIN_REGISTRY).includes(normalizedDomain)
  ) {
    throw new Error(
      `Unknown domain: ${normalizedDomain}`
    );
  }

  if (
    !engine ||
    typeof engine !== "object"
  ) {
    throw new Error(
      `Invalid engine for domain: ${normalizedDomain}`
    );
  }

  DOMAIN_ENGINES.set(
    normalizedDomain,
    engine
  );

  return {
    domain: normalizedDomain,
    status: DOMAIN_STATUS.ACTIVE,
    registered: true
  };
}

/* ============================================================
   DOMAIN ENGINE REMOVAL
============================================================ */

function unregisterDomainEngine(domain) {
  const normalizedDomain =
    normalizeDomain(domain);

  return DOMAIN_ENGINES.delete(
    normalizedDomain
  );
}

/* ============================================================
   DOMAIN STATUS
============================================================ */

function getDomainStatus(domain) {
  const normalizedDomain =
    normalizeDomain(domain);

  const registered =
    DOMAIN_ENGINES.has(
      normalizedDomain
    );

  return {
    domain: normalizedDomain,
    registered,
    status: registered
      ? DOMAIN_STATUS.ACTIVE
      : DOMAIN_STATUS.PLANNED
  };
}

/* ============================================================
   REGISTERED DOMAINS
============================================================ */

function getRegisteredDomains() {
  return Array.from(
    DOMAIN_ENGINES.keys()
  );
}

/* ============================================================
   AUTHORITATIVE RULE API DISCOVERY
============================================================ */

/*
 * The integration layer does not own DOMAIN_RULES.
 *
 * It obtains the authoritative rule API already provided
 * by the domain-rules module.
 */

function getAuthoritativeRuleAPI() {

  if (
    typeof window !== "undefined" &&
    window.DomainRulesAPI
  ) {
    return window.DomainRulesAPI;
  }

  if (
    typeof globalThis !== "undefined" &&
    globalThis.DomainRulesAPI
  ) {
    return globalThis.DomainRulesAPI;
  }

  return null;
}

/* ============================================================
   VERIFY DOMAIN INPUT
============================================================ */

function verifyDomainInput(
  domain,
  scenarioState = {},
  intensity = 0
) {
  const normalizedDomain =
    normalizeDomain(domain);

  if (
    !Object.values(
      DOMAIN_REGISTRY
    ).includes(normalizedDomain)
  ) {
    return {
      verified: false,
      domain: normalizedDomain,
      error: "UNKNOWN_DOMAIN"
    };
  }

  if (
    scenarioState === null ||
    typeof scenarioState !== "object"
  ) {
    return {
      verified: false,
      domain: normalizedDomain,
      error: "INVALID_SCENARIO_STATE"
    };
  }

  const numericIntensity =
    Number(intensity);

  if (
    !Number.isFinite(
      numericIntensity
    )
  ) {
    return {
      verified: false,
      domain: normalizedDomain,
      error: "INVALID_INTENSITY"
    };
  }

  return {
    verified: true,
    domain: normalizedDomain,
    scenarioState,
    intensity: numericIntensity
  };
}

/* ============================================================
   VERIFY SCENARIO
============================================================ */

function verifyScenarioInput(
  domain,
  scenario,
  scenarioState = {},
  intensity = 0
) {
  const inputVerification =
    verifyDomainInput(
      domain,
      scenarioState,
      intensity
    );

  if (
    !inputVerification.verified
  ) {
    return inputVerification;
  }

  if (
    typeof scenario !== "string" ||
    !scenario.trim()
  ) {
    return {
      verified: false,
      domain: inputVerification.domain,
      error: "INVALID_SCENARIO"
    };
  }

  const normalizedScenario =
    scenario.trim().toUpperCase();

  return {
    verified: true,
    domain: inputVerification.domain,
    scenario: normalizedScenario,
    scenarioState,
    intensity: inputVerification.intensity
  };
}

/* ============================================================
   EVALUATE AUTHORITATIVE DOMAIN RULES
============================================================ */

function evaluateAuthoritativeRules(
  domain,
  scenario,
  scenarioState
) {
  const ruleAPI =
    getAuthoritativeRuleAPI();

  if (!ruleAPI) {
    return {
      verified: false,
      domain,
      scenario,
      error:
        "AUTHORITATIVE_RULE_API_NOT_AVAILABLE"
    };
  }

  if (
    typeof ruleAPI.evaluate !==
    "function"
  ) {
    return {
      verified: false,
      domain,
      scenario,
      error:
        "AUTHORITATIVE_RULE_EVALUATOR_NOT_AVAILABLE"
    };
  }

  try {

    const result =
      ruleAPI.evaluate(
        domain,
        scenario,
        scenarioState
      );

    return {
      ...result,
      verified:
        result?.verified === true
    };

  } catch (error) {

    return {
      verified: false,
      domain,
      scenario,
      error:
        "AUTHORITATIVE_RULE_EVALUATION_FAILED",
      message:
        error?.message ||
        "Unknown rule evaluation error."
    };
  }
}

/* ============================================================
   DERIVE AUTHORITATIVE SOLUTION
============================================================ */

function deriveAuthoritativeSolution(
  domain,
  scenario,
  scenarioState,
  assessment = {}
) {
  const ruleAPI =
    getAuthoritativeRuleAPI();

  if (!ruleAPI) {
    return {
      valid: false,
      domain,
      scenario,
      error:
        "AUTHORITATIVE_RULE_API_NOT_AVAILABLE"
    };
  }

  if (
    typeof ruleAPI.deriveSolution !==
    "function"
  ) {
    return {
      valid: false,
      domain,
      scenario,
      error:
        "AUTHORITATIVE_SOLUTION_DERIVER_NOT_AVAILABLE"
    };
  }

  try {

    return ruleAPI.deriveSolution(
      domain,
      scenario,
      scenarioState,
      assessment
    );

  } catch (error) {

    return {
      valid: false,
      domain,
      scenario,
      error:
        "AUTHORITATIVE_SOLUTION_DERIVATION_FAILED",
      message:
        error?.message ||
        "Unknown solution derivation error."
    };
  }
}

/* ============================================================
   ROUTE DOMAIN REQUEST
============================================================ */

function routeDomainScenario({
  domain,
  scenario,
  scenarioState = {},
  intensity = 0,
  assessment = {}
}) {

  const verification =
    verifyScenarioInput(
      domain,
      scenario,
      scenarioState,
      intensity
    );

  if (!verification.verified) {

    return {
      status:
        "DOMAIN_INPUT_VERIFICATION_FAILED",

      verification
    };
  }

  const normalizedDomain =
    verification.domain;

  const normalizedScenario =
    verification.scenario;

  /* ----------------------------------------------------------
     Evaluate authoritative rules
  ---------------------------------------------------------- */

  const ruleAssessment =
    evaluateAuthoritativeRules(
      normalizedDomain,
      normalizedScenario,
      scenarioState
    );

  if (
    !ruleAssessment.verified
  ) {

    return {
      status:
        "DOMAIN_RULE_VERIFICATION_FAILED",

      verification,

      ruleAssessment
    };
  }

  /* ----------------------------------------------------------
     Derive authoritative solution
  ---------------------------------------------------------- */

  const solution =
    deriveAuthoritativeSolution(
      normalizedDomain,
      normalizedScenario,
      scenarioState,
      assessment
    );

  if (
    solution.valid !== true
  ) {

    return {
      status:
        "DOMAIN_SOLUTION_DERIVATION_FAILED",

      verification,

      ruleAssessment,

      solution
    };
  }

  /* ----------------------------------------------------------
     Return routing result
  ---------------------------------------------------------- */

  return {

    status:
      "DOMAIN_SCENARIO_VALIDATED",

    domain:
      normalizedDomain,

    scenario:
      normalizedScenario,

    intensity:
      verification.intensity,

    verification,

    ruleAssessment,

    solution,

    execution: {
      authorized: false,
      physicalExecution: false,
      humanAuthorizationRequired: true
    }
  };
}

/* ============================================================
   REGISTER EXISTING AUTHORITATIVE ENGINES
============================================================ */

/*
 * IMPORTANT:
 *
 * These registrations only expose existing browser-side
 * engines to the integration layer.
 *
 * No engine is created here.
 * No domain rule is duplicated here.
 */

function registerExistingDomainEngines() {

  const ruleAPI =
    getAuthoritativeRuleAPI();

  if (ruleAPI) {

    registerDomainEngine(
      "FIN",
      ruleAPI
    );

    registerDomainEngine(
      "BHR",
      ruleAPI
    );

    registerDomainEngine(
      "BIODIESEL",
      ruleAPI
    );
  }

  return getRegisteredDomains();
}

/* ============================================================
   DOMAIN INTEGRATION TEST
============================================================ */

function runDomainIntegrationTest() {

  const testResults = [];

  const ruleAPI =
    getAuthoritativeRuleAPI();

  /* ----------------------------------------------------------
     Test 1 — Rule API availability
  ---------------------------------------------------------- */

  testResults.push({
    test: "AUTHORITATIVE_RULE_API",
    passed:
      ruleAPI !== null
  });

  if (!ruleAPI) {

    return {
      status:
        "INTEGRATION_TEST_FAILED",

      passed: false,

      tests: testResults,

      registeredDomains:
        getRegisteredDomains()
    };
  }

  /* ----------------------------------------------------------
     Test 2 — FIN
  ---------------------------------------------------------- */

  const finTest =
    routeDomainScenario({
      domain: "FIN",
      scenario: "BANKING_STRESS",
      scenarioState: {
        fx: 50,
        inf: 50
      },
      intensity: 50,
      assessment: {
        risk: "LOW"
      }
    });

  testResults.push({
    test: "FIN_DOMAIN_ROUTE",
    passed:
      finTest.status ===
      "DOMAIN_SCENARIO_VALIDATED"
  });

  /* ----------------------------------------------------------
     Test 3 — BHR
  ---------------------------------------------------------- */

  const bhrTest =
    routeDomainScenario({
      domain: "BHR",
      scenario: "FORCED_LABOUR",
      scenarioState: {
        bhr: 50
      },
      intensity: 50,
      assessment: {
        risk: "MEDIUM"
      }
    });

  testResults.push({
    test: "BHR_DOMAIN_ROUTE",
    passed:
      bhrTest.status ===
      "DOMAIN_SCENARIO_VALIDATED"
  });

  /* ----------------------------------------------------------
     Test 4 — BIODIESEL
  ---------------------------------------------------------- */

  const biodieselTest =
    routeDomainScenario({
      domain: "BIODIESEL",
      scenario: "BIODIESEL_SHORTAGE",
      scenarioState: {
        energy: 50
      },
      intensity: 50,
      assessment: {
        risk: "MEDIUM"
      }
    });

  /*
   * The current authoritative rules identify ENERGY as the
   * domain for BIODIESEL_SHORTAGE.
   *
   * Therefore this test deliberately verifies that the
   * integration layer does not invent a BIODIESEL rule.
   */

  testResults.push({
    test: "BIODIESEL_RULE_OWNERSHIP_CHECK",
    passed:
      biodieselTest.status ===
      "DOMAIN_RULE_VERIFICATION_FAILED" ||
      biodieselTest.status ===
      "DOMAIN_SOLUTION_DERIVATION_FAILED"
  });

  /* ----------------------------------------------------------
     Final result
  ---------------------------------------------------------- */

  const passed =
    testResults.every(
      test => test.passed
    );

  return {

    status:
      passed
        ? "INTEGRATION_TEST_PASSED"
        : "INTEGRATION_TEST_FAILED",

    passed,

    tests: testResults,

    registeredDomains:
      getRegisteredDomains(),

    safetyBoundary: {
      backendConnection: false,
      physicalExecution: false,
      automaticExecution: false,
      humanAuthorizationRequired: true
    }
  };
}

/* ============================================================
   PUBLIC API
============================================================ */

const DomainIntegrationAPI = {

  DOMAIN_REGISTRY,

  registerDomainEngine,

  unregisterDomainEngine,

  getDomainStatus,

  getRegisteredDomains,

  verifyDomainInput,

  verifyScenarioInput,

  evaluateAuthoritativeRules,

  deriveAuthoritativeSolution,

  routeDomainScenario,

  registerExistingDomainEngines,

  runDomainIntegrationTest
};

/* ============================================================
   BROWSER EXPORT
============================================================ */

if (
  typeof window !== "undefined"
) {

  window.DOMAIN_REGISTRY =
    DOMAIN_REGISTRY;

  window.DomainIntegrationAPI =
    DomainIntegrationAPI;

  window.registerDomainEngine =
    registerDomainEngine;

  window.unregisterDomainEngine =
    unregisterDomainEngine;

  window.getDomainStatus =
    getDomainStatus;

  window.getRegisteredDomains =
    getRegisteredDomains;

  window.verifyDomainInput =
    verifyDomainInput;

  window.verifyScenarioInput =
    verifyScenarioInput;

  window.evaluateAuthoritativeRules =
    evaluateAuthoritativeRules;

  window.deriveAuthoritativeSolution =
    deriveAuthoritativeSolution;

  window.routeDomainScenario =
    routeDomainScenario;

  window.registerExistingDomainEngines =
    registerExistingDomainEngines;

  window.runDomainIntegrationTest =
    runDomainIntegrationTest;
}