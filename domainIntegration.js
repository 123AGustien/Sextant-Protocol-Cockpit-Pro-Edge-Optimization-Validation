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
