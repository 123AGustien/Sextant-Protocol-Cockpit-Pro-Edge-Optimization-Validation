Sextant Resilience Processing Core (SRPC)

Research Test Harness — v0.1

File: "research/srpc/srpcTest.html"
Research Version: "0.1.0-RESEARCH"
Status: Experimental / Research Only

---

1. Purpose

This document defines the test procedure for the Sextant Resilience Processing Core (SRPC) research implementation.

The test harness validates the basic software wiring and deterministic behaviour of the three SRPC research modules:

1. "srpcKernel.js"
2. "srpcRules.js"
3. "srpcCompute.js"

The test is intentionally isolated from the protected Sextant Protocol™ Cockpit Pro Edge Optimization & Deployment Validation baseline.

The purpose of this research is to investigate whether a compact, deterministic, hardware-independent processing structure can support the Sextant processing doctrine:

DATA → ALGORITHMS → COMPUTE

This research test does not claim semiconductor implementation, processor implementation, hardware acceleration, production firmware, autonomous control, safety certification, or production readiness.

---

2. Research Architecture

The SRPC research architecture is:

SYSTEM INPUT
     |
     v
SRPC KERNEL
     |
     v
SRPC RULES
     |
     v
SRPC COMPUTE
     |
     v
DETERMINISTIC RESEARCH RESULT

The three modules have separate responsibilities.

Kernel

The kernel provides the deterministic processing structure.

Rules

The rules provide externally defined research logic.

Compute

The compute module connects the kernel and rules and executes the research processing sequence.

---

3. Files Under Test

3.1 SRPC Kernel

File:

"research/srpc/srpcKernel.js"

Version:

"0.1.0-RESEARCH"

Responsibilities:

- Validate SRPC input.
- Normalize system-state data.
- Execute an externally supplied algorithm.
- Maintain local research state.
- Test deterministic behaviour.
- Report research safety boundaries.
- Prevent physical execution.
- Prevent backend connection.
- Require human authority externally.

---

3.2 SRPC Rules

File:

"research/srpc/srpcRules.js"

Version:

"0.1.0-RESEARCH"

Responsibilities:

- Define SRPC research rules.
- Evaluate system-state data.
- Return individual rule results.
- Evaluate all enabled rules.
- Produce a compact research assessment.
- Keep domain-specific research logic outside the kernel.

Current research rules include:

- "SRPC-RULE-001" — "SYSTEM_STATE_PRESENT"
- "SRPC-RULE-002" — "RESILIENCE_SCORE_PRESENT"
- "SRPC-RULE-003" — "RESILIENCE_SCORE_RANGE"
- "SRPC-RULE-004" — "RESEARCH_INPUT_VALID"

These are illustrative research rules only.

They are not operational, safety-certified, or production rules.

---

3.3 SRPC Compute

File:

"research/srpc/srpcCompute.js"

Version:

"0.1.0-RESEARCH"

Responsibilities:

- Validate SRPC dependencies.
- Connect the kernel and rules.
- Execute SRPC research processing.
- Execute deterministic repeatability testing.
- Report compute status.
- Maintain research safety boundaries.

---

4. Test Harness

The executable browser test is:

"research/srpc/srpcTest.html"

The Markdown file you are reading is documentation for that executable test.

The HTML test harness loads the three modules in the following order:

srpcKernel.js
      |
      v
srpcRules.js
      |
      v
srpcCompute.js

The load order is intentional.

"srpcCompute.js" depends on the availability of both the kernel and rules modules.

---

5. Test Environment

The test is designed for local browser execution.

The research test does not require:

- Backend services
- Cloud services
- External APIs
- Network connections
- Database connections
- Physical equipment
- Autonomous control systems

The intended execution environment is a browser running the supplied local JavaScript files.

---

6. Test Input

The test harness uses a deterministic static input.

Example:

{
    "source": "SRPC_RESEARCH_TEST",
    "purpose": "DETERMINISTIC_PROCESSING_TEST",
    "timestamp": "STATIC_TEST_TIMESTAMP",
    "systemState": {
        "resilienceScore": 81.83,
        "domain": "EDGE_RESEARCH",
        "systemStatus": "STABLE",
        "testValue": 77
    }
}

The timestamp is intentionally static.

This prevents changing timestamps from introducing unnecessary variation into the deterministic test.

---

7. Component Availability Test

The first test verifies that the three required public APIs are available.

Expected components:

window.SRPCKernel
window.SRPCRules
window.SRPCCompute

Expected result:

Kernel: PASS
Rules: PASS
Compute: PASS

If any required component is unavailable, the overall research test must fail.

Expected failure status:

SRPC_RESEARCH_TEST_FAIL

---

8. Dependency Test

The compute module provides a dependency validation function.

The test verifies that:

SRPCKernel = available
SRPCRules  = available

Expected result:

Dependencies: PASS

The compute module must not report itself ready if its required dependencies are unavailable.

---

9. Input Validation Test

The kernel validates the supplied research input.

The minimum required structure is:

input
  |
  +-- systemState

The test verifies that "systemState" exists and is an object.

Expected result:

Input validation: PASS

The kernel should reject invalid input rather than attempting normal processing.

---

10. Rule Evaluation Test

The test evaluates all enabled SRPC research rules against the supplied system state.

The test input contains:

resilienceScore = 81.83

This score is:

- Present.
- Numeric.
- Within the defined range of 0–100.

The test also provides a non-empty system-state object.

Expected result:

Rule evaluation: PASS

Expected rule outcome:

SYSTEM_STATE_AVAILABLE
RESILIENCE_SCORE_AVAILABLE
RESILIENCE_SCORE_IN_RANGE
RESEARCH_INPUT_VALID

All enabled research rules should pass for the supplied deterministic test input.

---

11. Compute Execution Test

The compute layer executes the research processing sequence.

The expected sequence is:

INPUT
  |
  v
DEPENDENCY VALIDATION
  |
  v
KERNEL EXECUTION
  |
  v
RULE ASSESSMENT
  |
  v
COMPUTE RESULT

Expected result:

Compute execution: PASS

The resulting compute object should indicate:

executed: true

and:

deterministic: true

---

12. Determinism Test

The same input is executed twice using the same research rules.

The two outputs are serialized and compared.

Expected result:

Determinism: PASS

Expected status:

SRPC_COMPUTE_DETERMINISM_PASS

The test is intended to demonstrate repeatability for the supplied static input and rules.

This is a basic deterministic-behaviour test.

It is not a formal mathematical proof of determinism.

---

13. Safety Boundary Test

The SRPC research implementation must maintain explicit safety boundaries.

The research result must report:

physicalExecution: false
backendConnection: false
externalConnection: false
humanAuthorizationRequired: true

Expected results:

Physical execution: PASS
Backend connection: PASS
External connection: PASS
Human authority: PASS

These values describe the software research environment.

They do not constitute physical-system certification.

---

14. Physical Execution Boundary

The SRPC research implementation does not execute physical actions.

The expected state is:

physicalExecution: false

No command produced by the research test is connected to:

- Motors
- Thrusters
- Engines
- Actuators
- Industrial equipment
- Vehicles
- Vessels
- Aircraft
- Spacecraft
- Electrical infrastructure
- Other physical systems

---

15. Backend Boundary

The SRPC research implementation does not connect to a backend.

The expected state is:

backendConnection: false

The test is intended to remain locally executable.

---

16. External Connection Boundary

The SRPC research implementation does not require an external service.

The expected state is:

externalConnection: false

No external API or network service is required for the research test.

---

17. Human Authority

The SRPC research kernel does not become the final operational authority.

The expected state is:

humanAuthorizationRequired: true

The research software produces information and research results only.

No autonomous physical action is authorized by the SRPC research implementation.

---

18. Overall Test Result

The complete test should pass only when all required checks pass.

The successful overall result is:

SRPC_RESEARCH_TEST_PASS

The failure result is:

SRPC_RESEARCH_TEST_FAIL

The overall test combines:

- Component availability
- Dependency availability
- Input validation
- Rule evaluation
- Compute execution
- Determinism
- Physical execution boundary
- Backend boundary
- External connection boundary
- Human authority requirement

---

19. Expected Successful Result

A successful browser test should display:

SRPC_RESEARCH_TEST_PASS

The individual checks should show:

Kernel: PASS
Rules: PASS
Compute: PASS
Dependencies: PASS

Input validation: PASS
Rule evaluation: PASS
Compute execution: PASS
Determinism: PASS

Physical execution: PASS
Backend connection: PASS
External connection: PASS
Human authority: PASS

The detailed JSON output should confirm:

deterministic: true
physicalExecution: false
backendConnection: false
externalConnection: false
humanAuthorizationRequired: true

---

20. Protected Edge Baseline

The SRPC research test is intentionally separated from the protected Edge Optimization & Deployment Validation system.

The SRPC research work must not modify the protected Edge application.

In particular, the SRPC research test must not modify:

index.html
assets/js/app.js

It must not alter:

- Existing Edge domain modules.
- Existing Edge integration.
- Existing Edge self-test.
- Existing Edge validation.
- Existing Edge pipeline.
- Existing Edge audit.
- Existing Edge deployment configuration.
- Protected Pages source.
- The validated "1.0.0-SYSTEM-WIRING" baseline.

The SRPC research branch is experimental.

The protected Edge baseline remains the validated reference system.

---

21. Branch Separation

The intended research separation is:

PROTECTED BASELINE

1.0.0-SYSTEM-WIRING
        |
        v
Validated Edge Optimization & Deployment
Validation System

Separate from:

EXPERIMENTAL RESEARCH

feature/srpc-research-v0.1
        |
        v
research/srpc/

The research files are therefore additive and isolated.

No SRPC research file should be required by the protected Edge application.

---

22. Research Status

SRPC version:

"0.1.0-RESEARCH"

Status:

EXPERIMENTAL RESEARCH

This implementation investigates whether a common deterministic processing structure can be expressed independently from a specific application domain.

The current result is limited to software-level research behaviour.

---

23. What This Test Demonstrates

A successful test demonstrates:

- The three SRPC modules load correctly.
- Their public interfaces are available.
- Dependencies are correctly connected.
- The kernel accepts the research input.
- The rules evaluate the supplied system state.
- The compute layer executes the processing sequence.
- The same input produces the same research result.
- The research safety boundaries remain asserted.
- The implementation operates locally without backend or external connection.

This is a software wiring and deterministic processing demonstration.

---

24. What This Test Does Not Demonstrate

A successful test does not establish:

- Semiconductor implementation.
- CPU architecture.
- GPU architecture.
- NPU architecture.
- FPGA implementation.
- ASIC implementation.
- Hardware acceleration.
- Custom silicon.
- Production firmware.
- Real-time hardware performance.
- Hardware power efficiency.
- Hardware latency.
- Physical-system control.
- Autonomous operation.
- Safety certification.
- Regulatory certification.
- Production readiness.
- Commercial deployment readiness.

Those claims would require separate engineering, hardware, benchmarking, validation, and certification work.

---

25. Research Interpretation

The correct interpretation of a successful result is:

«The reconstructed SRPC v0.1 software modules demonstrate basic deterministic local processing and functional software wiring under the defined research test conditions.»

The result should not be interpreted as proof of a physical processing architecture.

---

26. Sextant Processing Doctrine

The research follows:

DATA
  |
  v
ALGORITHMS
  |
  v
COMPUTE

The kernel provides the processing structure.

The rules provide the research logic.

The compute layer executes the processing.

The architecture intentionally separates these responsibilities.

---

27. Rules Remain in Data

The research design preserves the principle:

Rules remain in Data.

The SRPC kernel does not contain the domain-specific research rules.

The rules module supplies the rule definitions and evaluation logic.

This allows the processing structure to remain separated from the particular research rule set.

---

28. Golden Rule

The wider Sextant decision doctrine remains:

OBSERVE
   |
   v
VERIFY
   |
   v
ASSESS
   |
   v
DECIDE
   |
   v
ACT
   |
   v
UPDATE

The SRPC v0.1 research test does not perform the physical "ACT" stage.

The research environment stops at software-level processing and assessment.

Human authority remains external to the research kernel.

---

29. Research Boundary

The correct boundary for this experiment is:

RESEARCH SOFTWARE
        |
        v
DETERMINISTIC PROCESSING
        |
        v
RESEARCH RESULT
        |
        X
NO PHYSICAL EXECUTION

This boundary must remain intact during SRPC v0.1 research.

---

30. Test File Relationship

The two test-related files have different purposes.

Executable Test

research/srpc/srpcTest.html

Purpose:

RUN THE TEST

Documentation

research/srpc/srpcTest.md

Purpose:

DOCUMENT THE TEST

The Markdown file is not loaded by the browser test.

The HTML file loads the three JavaScript research modules.

---

31. Final Research Assessment

If the browser test returns:

SRPC_RESEARCH_TEST_PASS

the SRPC v0.1 research wiring may be recorded as:

SOFTWARE RESEARCH TEST PASSED

The appropriate conclusion is:

Validated software research behaviour under the defined deterministic local test conditions.

It must not be described as hardware validation, semiconductor validation, autonomous-system validation, or production validation.

---

32. Version Control

Research version:

"0.1.0-RESEARCH"

Research branch:

"feature/srpc-research-v0.1"

Research location:

"research/srpc/"

Protected Edge baseline:

"1.0.0-SYSTEM-WIRING"

The SRPC research implementation remains separate from the protected baseline until a future research decision explicitly authorizes further integration work.

---

33. Research Freeze Condition

Once the three SRPC modules and the test harness produce the expected result, the current research state may be recorded as a research checkpoint.

No change should be made to the protected Edge baseline as part of this SRPC test.

Any future SRPC modification should be treated as a new experimental change and retested.

---

34. Conclusion

The SRPC v0.1 test harness provides an isolated research mechanism for testing:

Kernel → Rules → Compute

under deterministic local conditions.

A successful result establishes only:

VALIDATED SOFTWARE RESEARCH BEHAVIOUR

It does not establish hardware capability, semiconductor implementation, autonomous control, safety certification, or production readiness.

The protected Edge Optimization & Deployment Validation system remains unchanged and continues to serve as the validated reference baseline.