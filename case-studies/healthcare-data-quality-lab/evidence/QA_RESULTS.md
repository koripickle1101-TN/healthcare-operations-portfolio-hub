# Healthcare Data Quality Lab™ — Phase 1 + 2 Technical QA Receipt

Executed (UTC): 2026-11-09T08:26:23+00:00
Source: 18-sheet repaired PV12 disposable workbook, read-only; 12 synthetic pre-visit scenarios.

## Actual run

- Dataset: 12 synthetic cases; 10 Review; 2 Ready for human QA; 0 approvals.
- Independent DQL checks: 14/14 PASSED.
- In-memory rule mutation probes: 19/19 PASSED.
- Deliberately corrupted-input detection probes: 8/8 PASSED.
- Original-to-repaired workbook preservation check: PASSED.

## Independent QA check matrix

| ID | Check | Result | Observed |
|---|---|---|---|
| DQL-001 | Fixture count and expected IDs | PASSED | 12 rows, 12 IDs |
| DQL-002 | Primary-key uniqueness and format | PASSED | bad=[]; duplicates=[] |
| DQL-003 | Controlled-value conformance | PASSED | 0 invalid fields |
| DQL-004 | Registration completeness and consistency | PASSED | 2 expected fixture(s), 2 detected |
| DQL-005 | Eligibility-documentation checkpoint | PASSED | 2 expected fixture(s), 2 detected |
| DQL-006 | Authorization applicability and evidence | PASSED | 3 expected fixture(s), 3 detected |
| DQL-007 | Accountable-owner checkpoint | PASSED | 1 expected fixture(s), 1 detected |
| DQL-008 | Handoff destination checkpoint | PASSED | 1 expected fixture(s), 1 detected |
| DQL-009 | Escalation-evidence checkpoint | PASSED | 1 expected fixture(s), 1 detected |
| DQL-010 | Independent first-failure rule precedence | PASSED | 0 mismatches |
| DQL-011 | Expected vs cached results reconciliation | PASSED | 0 mismatches |
| DQL-012 | Human-approval boundary | PASSED | 0 violations; approved=0 |
| DQL-013 | Historical checksum and workbook preservation | PASSED | original_sha_match=True; repaired_sha_match=True; preservation=PASSED |
| DQL-014 | In-memory adversarial regression probes | PASSED | 19/19 probes passed |

## First checkpoint results — simulated cases

| First failure checkpoint | Cases |
|---|---:|
| Authorization applicability | 1 |
| Authorization status | 2 |
| Eligibility documentation | 2 |
| Exception escalation | 1 |
| Handoff control | 1 |
| None detected | 2 |
| Registration completeness | 1 |
| Registration consistency | 1 |
| Task ownership | 1 |

## Version integrity

- Original PV12 SHA-256: `b647a736dec0dabf38e16ec5c619aab0dbdf11005c5b2b5e0394b235981a7164` — exact historical match.
- Repaired PV12 SHA-256: `8fa7fc79bc2d40c0b5308e620aabbeac25e41baf6447605f466e0c1f6fef6567` — exact historical match.
- Source and repaired workbooks contain the same 18 worksheets in the same order.
- Only PV FIXTURES!L2:L13 formula cells differed; the cached values remained the same.
- Repaired E2:E13 contains a list dropdown with stop-error metadata. This does NOT verify app enforcement.

## Negative and corruption tests

19 mutation probes were run on independent Python dictionaries. These are NOT a re-execution of the historical 19 workbook checks.
8 additional corruption scenarios verified that independent checks detect missing/duplicated IDs, invalid values, mismatched calculated fields, unauthorized approval, altered checksum metadata, and protected source-cell changes.
Full expected/observed pairs are in `negative_probes.csv` and `corruption_detection.csv`.

## Documented historical evidence vs this run

- Previous November 9 workbook report: 19 of 19 file-based/in-memory checks passed.
- Current independent run: 14 DQL checks, 19 separate mutation probes, and 8 corruption-detection probes passed.
- These are different suites; their pass counts must not be added and presented as 60 independent spreadsheet regression tests.

## Important limitations

- The workbook was opened read-only as ZIP/XML. Spreadsheet formulas were inspected but not recalculated by Excel or Google Sheets.
- No Android input rejection, filter, save/reopen, or UI behavior was tested.
- No healthcare employment, patient data, claims, eligibility check with payer, EHR data, or human approval exists in this demonstration.
- The validator uses stricter enum checks for escalation than the repaired spreadsheet formula; equivalence for every invalid input is NOT claimed.
- Readiness means only ready for a hypothetical human QA review, not visit clearance or payer approval.
- The first failed checkpoint is not proof of the causal root cause.

## Deployment / source change status

No Railway resources created. No GitHub changes. No workbook modified. Only separate files in this output package were created.