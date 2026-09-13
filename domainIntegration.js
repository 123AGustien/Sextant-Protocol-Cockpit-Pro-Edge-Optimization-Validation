/**
 * Sextant Protocol™ / SPD v13.1
 * Domain Integration Layer
 *
 * Central gateway between:
 * Sextant Cockpit → SPD Orchestration → Domain Rule Engines
 *
 * The integration layer does not contain domain-specific rules.
 * It registers authoritative domain engines and routes validated
 * scenario requests to the appropriate engine.
 *
 * Safety boundary:
 * - Domain execution remains deterministic.
 * - No automatic physical execution is authorized here.
 * - Human decision authority remains downstream of the decision pipeline.
 */

"use strict";

const SEXTANT_DOMAIN_INTEGRATION_VERSION = "1.0.0";

const SEXTANT_DOMAIN_REGISTRY = Object.freeze({
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

const SEXTANT_DOMAIN_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  PLANNED: "PLANNED"
});

const SEXTANT_DOMAIN_ENGINES = new Map();

function normalizeDomain(domain) {
  if (typeof domain !== "string") {
    throw new Error("Domain must be a string.");
  }

  return domain.trim().toUpperCase();
}

function registerDomainEngine(domain, engine) {
  const normalizedDomain = normalizeDomain(domain);

  if (
    !Object.values(SEXTANT_DOMAIN_REGISTRY)
      .includes(normalizedDomain)
  ) {
    throw new Error(
      `Unknown domain: ${normalizedDomain}`
    );
  }

  if (!engine || typeof engine !== "object") {
    throw new Error(
      `Invalid engine for domain: ${normalizedDomain}`
    );
  }

  SEXTANT_DOMAIN_ENGINES.set(
    normalizedDomain,
    engine
  );

  return {
    domain: normalizedDomain,
    status: SEXTANT_DOMAIN_STATUS.ACTIVE,
    registered: true
  };
}

function unregisterDomainEngine(domain) {
  const normalizedDomain =
    normalizeDomain(domain);

  return SEXTANT_DOMAIN_ENGINES.delete(
    normalizedDomain
  );
}

function getDomainStatus(domain) {
  const normalizedDomain =
    normalizeDomain(domain);

  const registered =
    SEXTANT_DOMAIN_ENGINES.has(
      normalizedDomain
    );

  return {
    domain: normalizedDomain,
    registered,
    status: registered
      ? SEXTANT_DOMAIN_STATUS.ACTIVE
      : SEXTANT_DOMAIN_STATUS.PLANNED
  };
}

function getRegisteredDomains() {
  return Array.from(
    SEXTANT_DOMAIN_ENGINES.keys()
  );
}

function verifyDomainInput(
  domain,
  scenarioState = {},
  intensity = 0
) {
  const normalizedDomain =
    normalizeDomain(domain);

  if (
    !Object.values(SEXTANT_DOMAIN_REGISTRY)
      .includes(normalizedDomain)
  ) {
    return {
      valid: false,
      domain: normalizedDomain,
      reason: "UNKNOWN_DOMAIN"
    };
  }

  if (
    !scenarioState ||
    typeof scenarioState !== "object"
  ) {
    return {
      valid: false,
      domain: normalizedDomain,
      reason: "INVALID_SCENARIO_STATE"
    };
  }

  if (
    typeof intensity !== "number" ||
    !Number.isFinite(intensity)
  ) {
    return {
      valid: false,
      domain: normalizedDomain,
      reason: "INVALID_INTENSITY"
    };
  }

  return {
    valid: true,
    domain: normalizedDomain,
    scenarioState,
    intensity
  };
}
function resolveDomainEngine(domain) {
  const normalizedDomain =
    normalizeDomain(domain);

  return (
    SEXTANT_DOMAIN_ENGINES.get(
      normalizedDomain
    ) || null
  );
}

function verifyDomainEngine(domain) {
  const normalizedDomain =
    normalizeDomain(domain);

  const engine =
    resolveDomainEngine(normalizedDomain);

  return {
    domain: normalizedDomain,
    registered: Boolean(engine),
    status: engine
      ? SEXTANT_DOMAIN_STATUS.ACTIVE
      : SEXTANT_DOMAIN_STATUS.PLANNED,
    engineAvailable: Boolean(engine)
  };
}

function routeDomainScenario(
  domain,
  scenario,
  scenarioState = {},
  intensity = 0
) {
  const input =
    verifyDomainInput(
      domain,
      scenarioState,
      intensity
    );

  if (!input.valid) {
    return {
      routed: false,
      domain: input.domain,
      scenario,
      reason: input.reason,
      authority:
        "HUMAN DECISION AUTHORITY"
    };
  }

  const engine =
    resolveDomainEngine(
      input.domain
    );

  if (!engine) {
    return {
      routed: false,
      domain: input.domain,
      scenario,
      reason:
        "DOMAIN_ENGINE_NOT_REGISTERED",
      authority:
        "HUMAN DECISION AUTHORITY"
    };
  }

  if (
    typeof engine.run === "function"
  ) {
    return {
      routed: true,
      domain: input.domain,
      scenario,
      result: engine.run(
        scenario,
        scenarioState
      ),
      physicalExecution: false,
      humanAuthorization:
        "REQUIRED"
    };
  }

  if (
    typeof engine.evaluate === "function"
  ) {
    return {
      routed: true,
      domain: input.domain,
      scenario,
      result: engine.evaluate(
        scenario,
        scenarioState
      ),
      physicalExecution: false,
      humanAuthorization:
        "REQUIRED"
    };
  }

  if (
    typeof engine.deriveSolution ===
    "function"
  ) {
    return {
      routed: true,
      domain: input.domain,
      scenario,
      result:
        engine.deriveSolution(
          scenario,
          scenarioState
        ),
      physicalExecution: false,
      humanAuthorization:
        "REQUIRED"
    };
  }

  return {
    routed: false,
    domain: input.domain,
    scenario,
    reason:
      "REGISTERED_ENGINE_HAS_NO_SUPPORTED_ENTRY_POINT",
    physicalExecution: false,
    humanAuthorization:
      "REQUIRED"
  };
}
function registerAvailableDomainEngines() {
  const registered = [];

  /*
   * BIODIESEL
   *
   * The gateway does not create Biodiesel rules.
   * It only registers the already-loaded authoritative
   * Biodiesel decision engine.
   */

  if (
    typeof window !== "undefined" &&
    window.BiodieselRuleEngine
  ) {
    registered.push(
      registerDomainEngine(
        "BIODIESEL",
        window.BiodieselRuleEngine
      )
    );
  }

  /*
   * Generic authoritative Domain Rules API.
   *
   * If present, expose it as the domain gateway engine
   * without duplicating or redefining its rules.
   */

  if (
    typeof window !== "undefined" &&
    window.DomainRulesAPI
  ) {
    registered.push(
      registerDomainEngine(
        "ENERGY",
        window.DomainRulesAPI
      )
    );
  }

  return registered;
}

function initializeDomainIntegration() {
  const registrations =
    registerAvailableDomainEngines();

  return {
    initialized: true,
    version:
      SEXTANT_DOMAIN_INTEGRATION_VERSION,
    registeredDomains:
      getRegisteredDomains(),
    registrations
  };
}

const SextantDomainIntegration = {
  version:
    SEXTANT_DOMAIN_INTEGRATION_VERSION,

  registry:
    SEXTANT_DOMAIN_REGISTRY,

  register:
    registerDomainEngine,

  unregister:
    unregisterDomainEngine,

  status:
    getDomainStatus,

  registeredDomains:
    getRegisteredDomains,

  verifyInput:
    verifyDomainInput,

  verifyEngine:
    verifyDomainEngine,

  resolve:
    resolveDomainEngine,

  route:
    routeDomainScenario,

  initialize:
    initializeDomainIntegration
};

if (
  typeof window !== "undefined"
) {
  window.SextantDomainIntegration =
    SextantDomainIntegration;

  window.registerDomainEngine =
    registerDomainEngine;

  window.getDomainStatus =
    getDomainStatus;

  window.getRegisteredDomains =
    getRegisteredDomains;

  window.verifyDomainInput =
    verifyDomainInput;

  window.verifyDomainEngine =
    verifyDomainEngine;

  window.routeDomainScenario =
    routeDomainScenario;

  window.initializeDomainIntegration =
    initializeDomainIntegration;
}
/*
 * Safe initialization
 *
 * No domain-specific rules are created here.
 * Existing engines are detected and registered only
 * when they are already available.
 */

if (
  typeof window !== "undefined"
) {
  try {
    window.SextantDomainIntegration.initialize();
  } catch (error) {
    console.error(
      "Sextant Domain Integration initialization failed:",
      error
    );
  }
}

/*
 * Compatibility aliases
 *
 * These preserve simple cockpit access without
 * replacing the central integration API.
 */

if (
  typeof window !== "undefined"
) {
  window.SPD_DOMAIN_INTEGRATION =
    window.SextantDomainIntegration;

  window.DomainIntegrationLayer =
    window.SextantDomainIntegration;
}
