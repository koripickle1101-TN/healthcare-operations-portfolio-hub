# Administrative Task & Handoff Tracker — Recruiter Evidence

**Kori Pickle | University of Phoenix | BS Healthcare Administration candidate**  
**Healthcare Operations Intelligence Engine™**  
**Professional question:** *Where did the workflow first lose control?*

**Status:** Technically documented, student-developed **fictional / no-PHI demonstration**, audited November 6, 2026. This is **not** a deployed healthcare workflow or professional client engagement.

## Open the evidence (original files)

1. [Branded 16-worksheet Excel tracker](./Administrative_Task_Handoff_Tracker_TENNESSEE_ORANGE_BRANDED.xlsx) — original workbook; contains synthetic task records and a demonstrator.
2. [November 6 technical QA receipt](./Prompt_03_Final_Technical_QA_Receipt.txt) — scope, methodology, results, and excluded tests.
3. [November 8 PV12 pre-visit healthcare QA case study](./PV12_Previsit_Administrative_QA_Case_Study.md) — 12 fictional cases, HQA-001–HQA-016 test mapping, first-control-loss analysis, and explicit human approval limitations. **An educational extension of this existing tracker, not another project.**

The original two files and the supporting PV12 case-study note are displayed here from a dedicated evidence branch. The published portfolio's `main` branch, résumé, original workbook and website were **not changed** to create this evidence link. To inspect spreadsheet contents, use a read-only GitHub preview if available or download a copy; downloading does not grant permission to edit this repository.

## Evidence supported by the November 6 technical QA receipt

| Scope | Documented result |
| --- | --- |
| Full-row checks | **216/216 PASS** across 60 cleaned rows and 12 demonstration rows, checking date classification, aging, and overdue logic |
| Dynamic regression scenarios | **15/15 PASS** (status/date changes, duplicates, missing fields, invalid dates, workflow statuses, sample tasks) |
| File/structural checks | **14/14 PASS** |
| Source-record reconciliation | **60 original rows → 60 cleaned rows; 0 unmatched** |
| 12-task demo | **7 Review, 5 Ready**, at fixed November 6, 2026 reference date |
| Historical QA register | 81 prior QA entries retained; **not independently re-executed** in the November 6 audit |

The November 6 QA receipt documents successful spreadsheet-engine export/re-import of an in-memory test copy. That is **not equivalent to all mobile interface acceptance checks passing**.

## Android / cross-platform limitations — NOT VERIFIED

- Whether Excel on Android interactively rejects invalid dropdown entries.
- Whether filtering and clearing filters work correctly in Android apps.
- Whether Google Sheets on Android preserves all Excel-specific validation and filter rules after import.
- Whether Android save/reopen preserves every formula, dropdown and setting (an engine roundtrip was verified, but not Android app persistence).

Other limitations: no actual customer use, demand, earnings, production EHR/payer access, verified healthcare outcomes, or PHI compliance validation beyond inspection of synthetic contents. This educational workbook does **not** establish clinical, coding, payer, or regulatory authority.

## Workbook integrity

SHA-256 of the original branded workbook, confirmed against the November 6 receipt:

`71c3632c4759ec7e3924b5ef9822200b0258a59e11c312f8ce35bcd19fa43b83`

The files are uploaded as source-format `.xlsx` and `.txt` copies; the workbook was **not** converted to Google Sheets. Verification date: November 8, 2026.

**Recruiter relevance:** source-to-cleaned lineage, controlled terminology, exception flags, owner review, task aging and overdue logic, reconciliation, and bounded QA reporting. All evidence is educational and synthetic; outcomes apply only to the modeled data.
