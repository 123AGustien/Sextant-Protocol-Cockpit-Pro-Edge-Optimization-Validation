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

const DOMAIN_STATUS = {
  ACTIVE: "ACTIVE",
  PLANNED: "PLANNED"
};

const DOMAIN_ENGINES = new Map();

function normalizeDomain(domain) {
  if (typeof domain !== "string") {
    throw new Error("Domain must be a string.");
  }

  return domain.trim().toUpperCase();
}

function registerDomainEngine(domain, engine) {
  const normalizedDomain = normalizeDomain(domain);

  if (!Object.values(DOMAIN_REGISTRY).includes(normalizedDomain)) {
    throw new Error(`Unknown domain: ${normalizedDomain}`);
  }

  if (!engine || typeof engine !== "object") {
    throw new Error(`Invalid engine for domain: ${normalizedDomain}`);
  }

  DOMAIN_ENGINES.set(normalizedDomain, engine);

  return {
    domain: normalizedDomain,
    status: DOMAIN_STATUS.ACTIVE,
    registered: true
  };
}

function unregisterDomainEngine(domain) {
  const normalizedDomain = normalizeDomain(domain);

  return DOMAIN_ENGINES.delete(normalizedDomain);
}

function getDomainStatus(domain) {
  const normalizedDomain = normalizeDomain(domain);

  return {
    domain: normalizedDomain,
    registered: DOMAIN_ENGINES.has(normalizedDomain),
    status: DOMAIN_ENGINES.has(normalizedDomain)
      ? DOMAIN_STATUS.ACTIVE
      : DOMAIN_STATUS.PLANNED
  };
}

function getRegisteredDomains() {
  return Array.from(DOMAIN_ENGINES.keys());
}

function verifyDomainInput(domain, scenarioState = {}, intensity = 0) {
  const normalizedDomain = normalizeDomain(domain);

  if (!Object