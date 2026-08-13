FIN Rule Index — SPD v13.1

Sextant Financial Resilience Rule Library

Domain: FIN — Financial Resilience Library: Sextant Rule Library Version: 1.0 Status: ACTIVE Governance: SPD v13 Governance Layer

Purpose
This file provides the governed scenario-to-rule mapping for the Financial Resilience (FIN) domain.

The FIN Rule Engine uses this index to identify the authoritative rule applicable to a selected financial resilience scenario.

The rule selected by this index must be evaluated before a FIN scenario is passed to the SPD v13.1 Captain AI Lena Golden Rule decision pipeline.

FIN Scenario Registry
Scenario ID| Rule ID| Rule Name| Category| Status "FX_SHOCK"| "FIN-001"| FX Stress (SGD/IDR)| Foreign Exchange| ACTIVE "BOND_OUTFLOW"| "FIN-002"| Bond Outflow Stress| Sovereign Bond Market| ACTIVE "LIQUIDITY_CRISIS"| "FIN-003"| Liquidity Stress| Liquidity Risk| ACTIVE "BANKING_STRESS"| "FIN-004"| Banking Stress| Banking System Stability| ACTIVE "INFLATION_SHOCK"| "FIN-005"| Inflation Shock| Inflation Risk| ACTIVE

Rule Mapping
FIN-001 — FX Stress

Scenario IDs:

"FX_SHOCK"
"FIN_STRESS"
Rule File:

"FIN/FIN-001.md"

Primary Evaluation:

Exchange-rate volatility
Capital flows
Foreign reserve pressure
Bond-market activity
Liquidity conditions
Market confidence
Cascade:

"FX Stress → Inflation Pressure → Interest Rate Pressure → Liquidity Tightening → Financial Market Stress"

FIN-002 — Bond Outflow Stress

Scenario ID:

"BOND_OUTFLOW"

Rule File:

"FIN/FIN-002.md"

Primary Evaluation:

Government bond yields
Foreign investor participation
Bond trading volume
Market volatility
Capital outflows
Credit spreads
Cascade:

"Bond Outflow → Higher Borrowing Costs → Liquidity Tightening → Financial Market Stress"

FIN-003 — Liquidity Stress

Scenario IDs:

"LIQUIDITY_CRISIS"
"LIQUIDITY_STRESS"
Rule File:

"FIN/FIN-003.md"

Primary Evaluation:

Interbank lending
Funding spreads
Cash reserves
Short-term funding
Money-market conditions
Market confidence
Cascade:

"Liquidity Stress → Funding Constraints → Credit Tightening → Financial Market Pressure"

FIN-004 — Banking Stress

Scenario IDs:

"BANKING_STRESS"
"BANKING_CRISIS"
Rule File:

"FIN/FIN-004.md"

Primary Evaluation:

Capital adequacy
Non-performing loans
Loan-to-deposit ratio
Deposit withdrawals
Interbank funding
Bank funding spreads
Credit indicators
Cascade:

"Banking Stress → Credit Tightening → Reduced Lending → Economic Slowdown"

FIN-005 — Inflation Shock

Scenario IDs:

"INFLATION_SHOCK"
"INFLATION_STRESS"
Rule File:

"FIN/FIN-005.md"

Primary Evaluation:

CPI
Core inflation
PPI
Interest rates
Wage growth
Exchange rates
Energy and commodity prices
Cascade:

"Inflation Shock → Interest Rate Pressure → Reduced Consumer Spending → Economic Slowdown"

Standard FIN Evaluation Procedure
Every FIN scenario must follow this procedure:

SCENARIO SELECTED ↓ SCENARIO IDENTIFICATION ↓ FIN DOMAIN VERIFICATION ↓ RULE ID SELECTION ↓ RULE LOADED ↓ INDICATORS EVALUATED ↓ THRESHOLD CONDITIONS CHECKED ↓ RISK CLASSIFICATION ↓ CASCADE ANALYSIS ↓ AFFECTED DOMAINS IDENTIFIED ↓ CONTINGENCY OPTIONS GENERATED ↓ CAPTAIN AI LENA DECISION SUPPORT ↓ HUMAN AUTHORIZATION GATE ↓ ACTION / MONITORING STATUS ↓ MEMORY CORE UPDATE ↓ AUDIT RECORD

Risk Classification
FIN rules use the following governed risk structure.

GREEN

Normal conditions.

System Response:

"MONITOR"

No contingency escalation required.

YELLOW

Early warning conditions.

System Response:

"INCREASE_MONITORING"

Review indicators and prepare for possible escalation.

ORANGE

Significant stress.

System Response:

"PREPARE_CONTINGENCY"

Strengthen monitoring and prepare appropriate resilience measures.

RED

Severe systemic stress.

System Response:

"ESCALATE_SYSTEMIC_RESPONSE"

Institutional emergency procedures may be recommended subject to appropriate human authority.

Cross-Domain Cascade
FIN scenarios may interact with other resilience domains.

Primary dependency structure:

FIN ↓ INF ↓ CYB ↓ DC

Additional domains may be activated when the selected rule identifies a relevant dependency.

The FIN Rule Engine must identify affected domains but must not independently execute actions in another domain.

Cross-domain execution remains subject to that domain's rule engine and the SPD human authorization framework.

Captain AI Lena Integration
After FIN rule evaluation, the result is passed to the SPD v13.1 Golden Rule Engine:

OBSERVE ↓ VERIFY ↓ ASSESS ↓ DECIDE ↓ ACT ↓ UPDATE

Captain AI Lena receives:

Selected FIN rule
Scenario
Scenario intensity
Evaluated indicators
Risk level
Resilience assessment
Cascade path
Affected domains
Contingency options
Execution authority
Execution Authority
The FIN Rule Engine is a decision-support component.

It does not possess independent execution authority.

FIN RULE ENGINE ↓ DECISION SUPPORT ↓ CAPTAIN AI LENA ↓ RECOMMENDATION ↓ HUMAN OPERATOR ↓ AUTHORIZATION REQUIRED ↓ EXECUTION

Monitoring-only recommendations may be recorded without execution authorization.

Any recovery, intervention, mitigation, or operational execution action requires human authorization.

Required Simulation Output
Every FIN evaluation should produce:

Rule ID
Rule Version
Domain
Scenario
Scenario Intensity
Indicators
Assessment
Risk Level
Resilience Score
Cascade Path
Affected Domains
Contingency Actions
Captain AI Lena Recommendation
Execution Authority
Execution Status
Memory Record
Audit Record
Timestamp
Audit Requirements
Each FIN evaluation must record:

Rule ID
Rule version
Scenario
Domain
Input state
Intensity
Assessment result
Risk classification
Resilience score
Decision
Execution authority
Execution status
Human authorization status where applicable
Timestamp
The audit record must provide sufficient information to reconstruct the simulation decision.

Governance
Rule Owner: Financial Resilience Domain

Rule Library: Sextant Rule Library

Governance Layer: SPD v13

Decision Architecture: Captain AI Lena Golden Rule Engine

Execution Authority: Human Operator

Review Cycle: Periodic or whenever the underlying resilience assumptions, institutional requirements, or applicable conditions materially change.

Current FIN Rule Set
FIN-001 → FX Stress FIN-002 → Bond Outflow Stress FIN-003 → Liquidity Stress FIN-004 → Banking Stress FIN-005 → Inflation Shock

FIN RULE LIBRARY STATUS: ACTIVE

REGISTERED FIN RULES: 5

ENGINE TARGET: "FINRuleEngine.js"

SPD INTEGRATION: DOMAIN INTEGRATION LAYER

DECISION AUTHORITY: HUMAN OPERATOR

Simulation Disclaimer
These rules are designed for deterministic simulation, resilience analysis, contingency planning, and decision-support research.

They are not intended to predict future financial markets or provide investment, financial, monetary, or regulatory advice.

Version History

v1.0 — Initial FIN Rule Index containing FIN-001 through FIN-005.

Governance Status: ACTIVE
