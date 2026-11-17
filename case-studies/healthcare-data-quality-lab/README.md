# Healthcare Data Quality Lab™ — RC3 draft review

**Student-developed · Simulated · Educational · No PHI**

This portfolio case study examines 12 fictional pre-visit healthcare administrative scenarios and the earliest failed control in each. It does not represent employer work, real patients, claims, payer decisions, or clinical clearance.

## Recruiter quick view

- **12 fictional records:** 10 routed to Review, 2 labeled Ready for human QA, 0 human approvals.
- **Independent Python evidence:** 14/14 data-quality tests passed; 19/19 in-memory negative probes passed; 8/8 intentional corruption detectors passed.
- **Defect investigation:** DEF-001 exposed how invalid or blank authorization-applicability values could bypass the original checkpoint. A separate disposable workbook contains the documented corrected rule. Neither the original workbook nor private patient records are in this repository.
- **Mobile testing:** Samsung Android screenshots confirm static presentation, 12 case cards, QA evidence and hashes; the user reported the native negative-probes section opened and closed.
- **Browser testing:** 22/22 automated Chromium interactions passed at a mobile-sized viewport. These are not equivalent to actual Android JavaScript acceptance.
- **Unresolved:** Four Google Sheets Android workbook acceptance checks remain unperformed. Three proposed future workflow controls remain unimplemented/untested.

## Explore the evidence

- [Offline dashboard](site/index.html): static HTML with optional JavaScript interaction.
- [Recruiter case study](docs/RECRUITER_CASE_STUDY.md).
- [QA execution results](evidence/QA_RESULTS.md) and [14-check test matrix](evidence/qa_test_matrix.csv).
- [Authorization DEF-001 analysis](docs/DEF001_CASE_STUDY.md).
- [Android acceptance evidence](docs/ANDROID_ACCEPTANCE_2026-11-09.md).
- [Independent Python validation script](validation/run_lab.py).
- [Source evidence manifest](evidence/evidence_manifest.json).
- [Release and deployment boundaries](docs/RELEASE_SCOPE.md).

## Reproducibility limitation

The full independent check requiring the original and repaired 18-sheet XLSX workbooks cannot be reproduced from this public review folder alone. Those source workbooks remain private and unchanged. The earlier read-only validation was performed with them and the source checksums are retained in the evidence manifest.

## Release controls

**Draft PR only.** This repository is public, so these review files are publicly readable before merge. The owner has not approved a merge or production deployment. A branch-specific `vercel.json` guard disables automatic Vercel Git deployments from this review branch per documented configuration. Vercel project-level preview state could not be checked through the connected account. No Railway services.
