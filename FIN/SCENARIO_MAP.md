FIN Scenario Map — SPD v13.1

Sextant Financial Resilience Scenario Map

Domain: FIN — Financial Resilience Library: Sextant Rule Library Version: 1.0 Status: ACTIVE Engine: "FINRuleEngine.js" Governance: SPD v13 Governance Layer Execution Authority: HUMAN_OPERATOR

Purpose
This file provides the authoritative scenario-to-rule mapping for the FIN Financial Resilience domain.

Every FIN scenario selected by the SPD v13.1 cockpit must resolve to a registered FIN rule before evaluation.

The scenario map ensures that:

Every supported FIN scenario has an authoritative rule.
Scenario aliases resolve to the correct rule.
Unregistered scenarios are rejected.
FIN rule evaluation remains deterministic.
Human authorization remains mandatory for execution.
Authoritative Scenario Registry
Scenario ID| Rule ID| Rule Name| Category| Status "FX_SHOCK"| "FIN-001"| FX Stress| Foreign Exchange| ACTIVE "BOND_OUTFLOW"| "FIN-002"| Bond Outflow Stress| Sovereign Bond Market| ACTIVE "LIQUIDITY_CRISIS"| "FIN-003"| Liquidity Stress| Liquidity Risk| ACTIVE "BANKING_STRESS"| "FIN-004"| Banking Stress| Banking System Stability| ACTIVE "INFLATION_SHOCK"| "FIN-005"| Inflation Shock| Inflation Risk| ACTIVE

Scenario Aliases
FIN-001 — FX Stress

Primary scenario:

"FX_SHOCK"

Alias:

"FIN_STRESS"

Rule file:

"FIN/FIN-001.md"

FIN-002 — Bond Outflow Stress

Primary scenario:

"BOND_OUTFLOW"

Alias:

"BOND_MARKET_STRESS"

Rule file:

"FIN/FIN-002.md"

FIN-003 — Liquidity Stress

Primary scenario:

"LIQUIDITY_CRISIS"

Alias:

"LIQUIDITY_STRESS"

Rule file:

"FIN/FIN-003.md"

FIN-004 — Banking Stress

Primary scenario:

"BANKING_STRESS"

Alias:

"BANKING_CRISIS"

Rule file:

"FIN/FIN-004.md"

FIN-005 — Inflation Shock

Primary scenario:

"INFLATION_SHOCK"

Alias:

"INFLATION_STRESS"

Rule file:

"FIN/FIN-005.md"

Machine-Readable Scenario Mapping
FX_SHOCK → FIN-001 FIN_STRESS → FIN-001

BOND_OUTFLOW → FIN-002 BOND_MARKET_STRESS → FIN-002

LIQUIDITY_CRISIS → FIN-003 LIQUIDITY_STRESS → FIN-003

BANKING_STRESS → FIN-004 BANKING_CRISIS → FIN-004

INFLATION_SHOCK → FIN-005 INFLATION_STRESS → FIN-005

Scenario Resolution Procedure
Every FIN scenario must follow:

SCENARIO SELECTED ↓ NORMALIZE SCENARIO ↓ LOOKUP SCENARIO MAP ↓ RESOLVE FIN RULE ID ↓ LOAD AUTHORITATIVE RULE ↓ EVALUATE FIN SCENARIO

If the scenario is not registered:

FIN_SCENARIO_NOT_REGISTERED

must be returned and evaluation must not proceed.

Rule Files
Rule ID| Rule File "FIN-001"| "FIN/FIN-001.md" "FIN-002"| "FIN/FIN-002.md" "FIN-003"| "FIN/FIN-003.md" "FIN-004"| "FIN/FIN-004.md" "FIN-005"| "FIN/FIN-005.md"

Scenario Cascade References
FIN-001

FX Stress ↓ Inflation Pressure ↓ Interest Rate Pressure ↓ Liquidity Tightening ↓ Financial Market Stress

FIN-002

Bond Outflow ↓ Higher Borrowing Costs ↓ Liquidity Tightening ↓ Financial Market Stress

FIN-003

Liquidity Stress ↓ Funding Constraints ↓ Credit Tightening ↓ Financial Market Pressure

FIN-004

Banking Stress ↓ Credit Tightening ↓ Reduced Lending ↓ Economic Slowdown

FIN-005

Inflation Shock ↓ Interest Rate Pressure ↓ Reduced Consumer Spending ↓ Economic Slowdown

Cross-Domain Dependency
Primary FIN dependency structure:

FIN ↓ INF ↓ CYB ↓ DC

The FIN Rule Engine may identify affected domains.

It must not independently execute actions belonging to another domain.

Cross-domain execution remains subject to:

Relevant domain rule engine
SPD Domain Integration Layer
Captain AI Lena decision-support pipeline
Human authorization framework
Evaluation Gate
A FIN scenario may proceed to the decision-support pipeline only after:

Scenario Registered ↓ FIN Rule Resolved ↓ Rule Valid ↓ Indicators Evaluated ↓ Risk Classified ↓ Cascade Generated ↓ Affected Domains Identified

Only then may the result proceed to Captain AI Lena.

Captain AI Lena Integration
The evaluated FIN result is passed into the SPD v13.1 Golden Rule pipeline:

OBSERVE ↓ VERIFY ↓ ASSESS ↓ DECIDE ↓ ACT ↓ UPDATE

Captain AI Lena receives:

FIN rule
Scenario
Scenario intensity
Input indicators
Assessment
Risk level
Resilience score
Cascade path
Affected domains
Contingency options
Execution authority
Human Execution Gate
FIN remains a decision-support domain.

FIN RULE ENGINE ↓ DECISION SUPPORT ↓ CAPTAIN AI LENA ↓ RECOMMENDATION ↓ HUMAN OPERATOR ↓ AUTHORIZATION REQUIRED ↓ EXECUTION

Autonomous financial execution is disabled.

No financial, monetary, banking, liquidity, currency, or operational intervention may be executed automatically by this scenario map.

Unknown Scenario Handling
Unknown or unregistered scenarios must produce:

success: false domain: FIN error: FIN_SCENARIO_NOT_REGISTERED

The system must not:

Guess a rule
Select a nearest scenario
Execute a fallback financial action
Bypass rule validation
Pass an unresolved scenario to Captain AI Lena
Governance
Rule Owner: Financial Resilience Domain

Rule Library: Sextant Rule Library

Governance Layer: SPD v13

Decision Architecture: Captain AI Lena Golden Rule Engine

Execution Authority: HUMAN_OPERATOR

Autonomous Execution: DISABLED

Review Cycle: Periodic or whenever the underlying resilience assumptions, institutional requirements, or applicable conditions materially change.

Current FIN Rule Set
FIN-001 → FX Stress FIN-002 → Bond Outflow Stress FIN-003 → Liquidity Stress FIN-004 → Banking Stress FIN-005 → Inflation Shock

FIN RULE LIBRARY STATUS: ACTIVE

REGISTERED FIN RULES: 5

ENGINE TARGET: "FINRuleEngine.js"

DOMAIN INTEGRATION TARGET: "domainIntegration.js"

DECISION AUTHORITY: HUMAN OPERATOR

Validation Requirement
Before FIN is connected to the live cockpit:

FIN-001 FIN-002 FIN-003 FIN-004 FIN-005 ↓ FINRuleEngine.js ↓ FINRuleEngine.test.js ↓ VALIDATION PASS ↓ DOMAIN INTEGRATION

If validation fails:

DOMAIN INTEGRATION MUST NOT PROCEED

Simulation Disclaimer
This scenario map is designed for deterministic simulation, resilience analysis, contingency planning, and decision-support research.

It is not intended to predict future financial markets or provide investment, financial, monetary, banking, lending, trading, or regulatory advice.

Version History

v1.0 — Initial FIN Scenario Map containing FIN-001 through FIN-005.

Governance Status: ACTIVE
