# SEXTANT PROTOCOL™ — BIODIESEL DOMAIN INTEGRATION

## ENERGY DOMAIN

**Captain AI Lena Decision Support**

**Integration Version:** 2.1.0  
**Rule Registry Version:** 1.0.0  
**Rule Engine Version:** 1.0.0

---

## 1. Purpose

The Biodiesel Domain Integration provides a deterministic local simulation interface between the authoritative Biodiesel Rule Registry, Biodiesel Rule Engine, Scenario Engine, Trial Manoeuvre layer, and Captain AI Lena decision-support workflow.

The integration validates that the Biodiesel domain is correctly wired before a scenario solution is presented to the user.

The integration does not provide autonomous physical control.

---

## 2. Doctrine

The Biodiesel domain follows the Sextant Protocol™ Golden Rule:

> OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE

The integration preserves the core architecture:

> DATA → ALGORITHMS → COMPUTE

### DATA

The authoritative Biodiesel Rule Registry contains the domain rules and scenario definitions.

### ALGORITHMS

The Biodiesel Rule Engine evaluates the supplied state against the authoritative rules.

### COMPUTE

The Scenario Engine and integration layer execute the deterministic computation required to produce the verified solution.
## 3. Authoritative Components

The Biodiesel integration requires the following components:

1. `BiodieselRuleRegistry`
2. `BiodieselRuleEngine`
3. `BiodieselScenarioEngine`
4. `BiodieselTrialManoeuvre`
5. `BiodieselModule`
6. `BiodieselDomainIntegration`

The authoritative rule registry is:

`window.BiodieselRuleRegistry`

The authoritative rule engine is:

`window.BiodieselRuleEngine`

---

## 4. Script Load Order

The required loading order is:

```html
<script src="rules/energy/biodiesel/biodieselRuleRegistry.js"></script>
<script src="biodieselRules.js"></script>
<script src="biodieselRuleEngine.js"></script>
<script src="biodieselScenarioEngine.js"></script>
<script src="biodieselTrialManoeuvre.js"></script>
<script src="biodieselModule.js"></script>
<script src="biodieselDomainIntegration.js"></script>
<script src="assets/js/app.js"></script>
## 6. Authoritative Rule Registry

The Biodiesel Rule Registry contains four deterministic rules.

| Rule | Condition | Solution | Recovery | Priority |
|---|---|---|---|---|
| BDS-001 | energy >= 70 | MAINTAIN_SAFE_STATE | CONTINUE_MONITORING | HIGH |
| BDS-002 | energy >= 50 && energy < 70 | ENERGY_CONSERVATION_MODE | REDUCE_NON_CRITICAL_ENERGY_DEMAND | MEDIUM |
| BDS-003 | energy >= 30 && energy < 50 | ENERGY_CONTINGENCY_MODE | ACTIVATE_ALTERNATIVE_ENERGY_SUPPLY | HIGH |
| BDS-004 | energy < 30 | ENERGY_EMERGENCY_MODE | ESCALATE_AND_ACTIVATE_EMERGENCY_SUPPLY | CRITICAL |

Rules remain in the authoritative data registry.

The integration layer does not duplicate or replace the rules.

---

## 7. Integration Architecture

```text
BIODIESEL INPUT
      |
      v
OBSERVE
      |
      v
VERIFY
      |
      v
BIODIESEL RULE REGISTRY
      |
      v
BIODIESEL RULE ENGINE
      |
      v
ASSESS
      |
      v
CAPTAIN AI LENA
      |
      v
DECIDE
      |
      v
HUMAN AUTHORIZATION
      |
      v
RECOMMENDED ACTION
      |
      v
UPDATE / AUDIT
## 8. Safety Boundary

The Biodiesel integration is a local deterministic simulator.

The following boundaries are enforced:

- Backend connection: `false`
- Physical execution: `false`
- Automatic execution: `false`
- Vessel actuation: `false`
- External connection: `false`
- Human authorization required: `true`

Therefore:

- No backend connection is required.
- No physical equipment is controlled.
- No automatic execution occurs.
- No vessel actuation occurs.
- No external system is connected.
- Human authorization remains mandatory.

---

## 9. Integration Test

The integration test is:

`BIODIESEL_DOMAIN_INTEGRATION`

Integration version:

`2.1.0`

The test verifies:

1. Rule Registry availability
2. Registry validator availability
3. Registry validity
4. Rule Engine availability
5. Evaluate function availability
6. Derive Solution function availability
7. Rule evaluation execution
8. Rule verification

The integration test passes only when all required checks are true.

## 10. Verified Test Result

Test input:

```json
{
  "domain": "ENERGY",
  "scenario": "BIODIESEL_SHORTAGE",
  "intensity": 50,
  "state": {
    "energy": 50
  }
}

