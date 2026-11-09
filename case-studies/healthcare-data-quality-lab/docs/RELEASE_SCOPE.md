# Release scope and deployment safeguards — November 9, 2026

**GitHub authorization:** The owner authorized a public review branch and a **draft pull request** only. The source `main` branch, current production website, and Railway are out of scope.

**Base revision captured:** `3539b8d495a5014ee9dbefad4a13aa7b790b3814`.

**Vercel trigger preflight:**
- The existing repository `vercel.json` contains cache headers only (no prior `git.deploymentEnabled` rule).
- Official Vercel Git integration may automatically deploy a preview on feature-branch pushes and PR events.
- The review branch adds `git.deploymentEnabled: { "review-dql-rc3-2026-11-09": false }` while preserving existing headers. Only this branch is excluded, rather than disabling all deployments. Documentation: https://vercel.com/docs/project-configuration/git-configuration
- The linked Vercel project was **not accessible** through the connected Vercel account. The branch guard is implemented, but this does not conclusively establish project-specific trigger behavior.
- Existing GitHub Actions `recruiter-hub-validation.yml` is configured for PRs targeting `main`; it may run validations but does not deploy a production release.

**Artifact scope:** This draft PR carries the audited dashboard, independent Python validator, QA matrix/results, source evidence manifest, the defect study, Android observation record, and recruiter case study. The complete private RC3 ZIP contains additional internal machine-readable logs and test harnesses, which are **not all included** in this public draft. No private source workbooks are uploaded.

**Evidence classification:**
- Python DQL 14/14, in-memory negative 19/19, corruption detectors 8/8: previously executed with documented inputs.
- Chromium 22/22: previously executed automated browser checks, **not** Android-device JS acceptance.
- Android layout/screenshots: observed from submitted screenshots.
- Android disclosure toggle: passed **by user report**, not instrumented.
- Four separate Google Sheets Android workbook checks: **UNTESTED / BLOCKED**.
- Three proposed future controls: **UNTESTED / NOT IMPLEMENTED**.

**Merge gate:** Do not merge, approve production deployment, publish the portfolio site, or remove branch protection without a separate explicit authorization.
