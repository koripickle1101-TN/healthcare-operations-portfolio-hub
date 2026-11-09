# Portfolio case study — Healthcare Data Quality Lab™

**Type:** Student-developed simulated QA demonstration  
**Technology:** Python 3 (standard library), spreadsheet OOXML inspection, CSV/JSON evidence, static HTML/CSS/JavaScript  
**Healthcare subject:** Patient access documentation / authorization / ownership and handoffs (fictional records)

## Problem

A workflow can appear ready to proceed when a required control is bypassed by a missing, invalid or inconsistently recorded field. In the original simulated PV12 worksheet, blank/unrecognized authorization-applicability values could result in `Ready for human QA` instead of escalation for review.

## Approach

1. Preserved source versions and checked their SHA-256 fingerprints.
2. Extracted 12 fictional pre-visit records and applied independently specified, ordered control checks.
3. Reproduced the documented DEF-001 weakness and reviewed the separately repaired workbook's regression evidence.
4. Ran 14 independent QA checks, 19 in-memory negative rule probes, and 8 intentional corruption-detection probes.
5. Designed an offline, mobile-friendly static evidence dashboard and captured bounded Android visual/user-reported interaction acceptance.

## Documented findings

- 10 of 12 synthetic cases were routed to `Review`; 2 were `Ready for human QA` (not approved).
- 14/14 DQL baseline checks, 19/19 independent negative probes and 8/8 corruption detection tests passed for the stated Python test scope.
- A separate prior workbook repair report recorded 19/19 file-based/in-memory cases passed following DEF-001 repair. **These are different suites** and cannot be added together as identical workbook tests.
- Screenshots show the corrected Android static fallback and evidence. On November 9, the user reported that the negative-probes section opened and closed successfully.

## What this demonstrates

Rule design; source preservation and provenance; data-quality controls; negative/pathological case testing; structured defect documentation; careful distinction between documented outcomes and unverified mobile spreadsheet behavior; concise evidence presentation.

## Scope limitations

This is **not** evidence of healthcare employment, patient outcomes, live payer eligibility checks, clinical or claims automation, production EHR access, HIPAA compliance certification, or savings. Original spreadsheet runtime behavior and four Google Sheets Android workbook checks remain open. Automated Chromium search/filter/export checks passed (22/22), but these functions have not been acceptance-tested in the Android file viewer.

## Interview example (roughly 45 seconds)

“In a student-developed healthcare operations lab, I created quality controls for twelve fictional pre-visit administrative scenarios. I focused on where a workflow first loses control—registration, eligibility documentation, authorization evidence, or handoffs. Earlier negative tests exposed a case where blank authorization applicability could incorrectly produce a ready-for-review result. I kept the source unchanged and used a separate repaired copy, then built an independent Python validator. The documented validation produced fourteen passing baseline checks, nineteen passing negative probes and eight successful corruption-detection checks. I also checked that the evidence dashboard rendered on Android. The work was simulated, so I present it as a technical learning project rather than real patient or payer outcomes.”