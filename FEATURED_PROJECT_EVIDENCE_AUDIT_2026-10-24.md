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
