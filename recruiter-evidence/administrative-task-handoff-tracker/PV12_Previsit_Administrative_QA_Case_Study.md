# Where Did the Workflow First Lose Control?
## Pre-Visit Administrative Workflow — PV12 QA Case Study

**Healthcare Operations Intelligence Engine™**  
**Kori Pickle | Bachelor of Science in Healthcare Administration candidate, University of Phoenix**  
**November 8, 2026**

**Student-developed, simulated, no-PHI healthcare operations portfolio project.** This document supplements the **existing Administrative Task & Handoff Tracker**; it is not a new system, healthcare deployment, professional employment project, or evidence of operational results.

### Question and approach

Can a documented task route be trusted when registration inputs, eligibility evidence, authorization information, task ownership, or handoff documentation are incomplete?

**Detect → Diagnose → Prevent → Improve & Validate.** In an isolated 12-record fictional pre-visit worksheet, deterministic spreadsheet checks identify the first observable failing control in this order:

1. Registration completeness and consistency
2. Eligibility verification documentation
3. Authorization applicability and documentation/status
4. Responsible administrative role
5. Handoff destination
6. Exception escalation

These are rule-based checks, **not machine learning or deployed AI**. Human approval remains mandatory for consequential decisions.

### Simulated QA results

| Measure | Result | Interpretation |
| --- | ---: | --- |
| Synthetic cases evaluated | 12 | Fictional records only |
| Case classifications matching the expected result | 12/12 | Independent test-fixture rule output, not operational accuracy |
| Records flagged for review | 10 | Deliberately constructed exceptions |
| Records marked **Ready for human QA** | 2 | Documentation checks only; **not** service clearance |
| Temporary regression scenarios | 4/4 matched | Inputs changed and restored for testing |
| Historical QA register entries preserved | 81 | Earlier T01–T81 entries were **not re-executed** here |
| Human approvals performed | 0 | All PV12 fixtures show **Not Performed** |

#### Fixture-to-test mapping

| Fixture | QA register ID | Expected and observed first failing control | QA classification |
| --- | --- | --- | --- |
| PV-01 | HQA-001 | None detected | Ready for human QA |
| PV-02 | HQA-002 | Registration completeness | Review |
| PV-03 | HQA-003 | Eligibility documentation | Review |
| PV-04 | HQA-004 | Eligibility documentation | Review |
| PV-05 | HQA-005 | Authorization applicability | Review |
| PV-06 | HQA-006 | Authorization status | Review |
| PV-07 | HQA-007 | Authorization status | Review |
| PV-08 | HQA-008 | Registration consistency | Review |
| PV-09 | HQA-009 | Task ownership | Review |
| PV-10 | HQA-010 | Handoff control | Review |
| PV-11 | HQA-011 | Exception escalation | Review |
| PV-12 | HQA-012 | None detected | Ready for human QA |

**Earliest observable control failures:** PV-02 and PV-08 fail at registration. This identifies the first failing *stage* in those fictional fixtures, not a proven root cause in an actual organization. Missing verification evidence does **not** establish inactive coverage. Pending or undocumented authorization does **not** imply payer approval or denial. A handoff destination does **not** prove receiving-party acceptance.

**Regression tests:** HQA-013 (PV-01 registration changed to missing), HQA-014 (PV-03 eligibility evidence restored), HQA-015 (PV-11 escalation recorded), and HQA-016 (PV-12 authorization evidence changed to pending). Each returned the expected rule response; temporary changes were restored.

### Human control gates and next improvement

The simulation flags exceptions for registration, eligibility, authorization, operations, handoff, or supervisory review. Two proposals remain **unimplemented**: (1) a receiving-role handoff acknowledgment checkpoint and (2) explicit documented human final sign-off. A spreadsheet-based validation mechanism is sufficient for this test scope; there is no demonstrated requirement for LLM, RAG, machine-learning, or agentic-AI deployment.

### Evidence index — November 8 workbook

Source workbook: `Administrative_Tracker_PV12_Healthcare_QA_2026-11-08.xlsx` (retained as a distinct tested copy; **not the original November 6 workbook**).

- `PV FIXTURES!A2:R13` — 12 fictional source inputs and results; `L2:O13` — computed control classifications and QA matches.
- `PV FIXTURES!Q2:Q13` — human approvals recorded as **Not Performed**.
- `QA TESTS!A83:F94` — HQA-001–HQA-012, fixture classifications.
- `QA TESTS!A95:F98` — HQA-013–HQA-016, temporary regression cases.
- `PV QA GUIDE!A12:B19` — summary; `A28:B37` — limitations.
- `QA TESTS!A2:F82` — historical T01–T81 entries preserved, not independently re-executed in the healthcare exercise.
- [Original administrative demonstration and November 6 receipt](./README.md) — separate, pre-existing generic task/hand-off work.

**Evidence availability:** This public Markdown case study reproduces the synthetic test mappings, but the November 8 QA workbook remains in the owner's controlled files. The workbook is not represented as a public GitHub attachment. Recruiters can inspect this explanatory record and the separately linked original generic workbook without receiving access to a private Drive file.

### Recruiter-relevant competencies, within the tested scope

Structured data validation · expected-versus-actual QA · exception classification · first-control-loss analysis · workflow ownership review · non-destructive evidence preservation · human-in-the-loop administrative controls.

**Not tested or claimed:** real patient records, PHI handling certification, payer decisions, clinical approvals, deployed AI, production EHR integration, Android-specific acceptance for the healthcare worksheet, actual customer use, real-world denials or cost savings, or validated operational improvement.

> **Project classification:** Student-developed · Simulated · No PHI · Educational QA evidence · No professional healthcare employment claimed.
