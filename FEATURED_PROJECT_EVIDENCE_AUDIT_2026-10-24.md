Featured-project evidence review — 2026-10-24

Scope: source-backed static evidence inspection only; no claim of full app execution.

PARCS — CONDITIONAL PASS, documentation sample
- Reviewer guide exists and describes five fictional cases PARCS-001 through PARCS-005.
- Linked CSV exists and has the same five case IDs, statuses, and conservative follow-up dispositions.
- No payer approvals, completed follow-up, or clinical decisions claimed in these files.
- Remaining: execute Streamlit and HTML controls; inspect risk-model assumptions and README claims.

DPIS — CONDITIONAL PASS, documentation sample
- Reviewer guide and linked CSV both exist, with five matching fictional cases DPI-001 through DPI-005.
- The records correctly distinguish illustrative actions from performed healthcare work.
- No observed denial reduction or verified payer outcomes established.
- Remaining: test interactive controls, reconcile source provenance, review all claims.

SBI — CONDITIONAL PASS, template evidence
- Breakpoint-log CSV exists and contains three synthetic cases SB001 through SB003 with documented hypotheses, queues, priorities, and follow-up dates.
- Hypotheses are not proven root causes and template entries are not actual operational outcomes.
- Remaining: check index page and supporting template/metric definitions for accuracy and usable navigation.

Enterprise Rev Ops — CONDITIONAL PASS, code presence only
- app.py exists and imports Streamlit, pandas, and ReportLab; the source contains explicitly fictional default records and Tennessee-orange branding.
- requirements.txt lists Streamlit and ReportLab but does not list pandas as an explicit direct dependency, even though app.py imports pandas. Streamlit may transitively install pandas; declare direct dependencies explicitly for reproducibility.
- Synthetic data standard exists. No live deployment or functionality verified.
- Remaining: run app, exercise workflows, inspect CSV exports/PDFs, test edge cases and claims.

PABIS — BLOCKED: workbook confirmed in GitHub tree, but binary XLSX not available through current text-only connector for formula inspection.
EVIS — AUTOMATED SMOKE PASS: successful run 40078060075; manual screenshot/accessibility artifact inspection and final claims review outstanding.

RELEASE: HOLD. No merge or production publication.


Portfolio-wide scope correction — October 25, 2026

This audit is NOT a complete inventory of the recruiter's portfolio. The release covers six featured projects (PABIS, EVIS, PARCS, DPIS, SBI, Enterprise Rev Ops), the supporting Healthcare Workflow Portfolio, Healthcare Operations Proof System, GitHub Profile & Case-Study Collection, and the central Portfolio Hub, plus resume and direct evidence links. Do not describe PABIS and EVIS as the only remaining release checks.

PARCS and DPIS: configured browser and accessibility smoke suites now PASS on their review branches (PARCS run 40187996045; DPIS run 40188192314). These do not prove Streamlit or every interactive workflow; retain the conditional scope of certification.
SBI: synthetic evidence check passed (run 40103304057); full workflow claims still require bounded review.
EVIS: automated synthetic arithmetic and selected HTML controls passed (run 40078060075); broader module and source-claim audit still needed.
PABIS: corrected workbook has been structurally inspected outside GitHub, but the published repository binary has not been replaced and verified.
Enterprise Rev Ops: archived and unverified, with known direct dependency documentation gap. This status is acceptable for a clearly labeled archived source project, not for a runnable-demo claim.
Supporting repositories: verify that all displayed case-study, template and profile links resolve, their titles match the destinations, and their claims are properly qualified. These repositories are not exempt from link and accuracy checks because they are not featured.
Recruiter website: test search and role filters, mobile and desktop layouts, accessibility, resume accuracy and print behavior, all external evidence links, and the complete user journey from home to project evidence and back. Validate current branch checks after each content update.

No site redesign, removal of projects, or production release is authorized by this audit.
