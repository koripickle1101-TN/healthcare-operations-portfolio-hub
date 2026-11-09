# Healthcare Operations & Workflow Intelligence Portfolio™ — Release Readiness v5

Review date: November 9, 2026
Status: **Recommended for controlled publication after explicit authorization — not yet published to production**
Prepared for: Kori Pickle, BS Healthcare Administration student

## Scope and protections

- The **original recruiter hub** on `main` is not part of this release and must remain unchanged.
- The portfolio source remains in `docs/` on branch `portfolio-evidence-links-2026-11-09`.
- Preview deployment: https://kori-healthcare-workflow-intelligence-5mfn7powy.vercel.app/
- Vercel project: `kori-healthcare-workflow-intelligence`
- Deployment ID: `dpl_2BiQqqgSAwumRXDGf82ZkUx2YPNR`
- Deployment target: preview (`target: null`); Vercel API reports `READY`.
- The existing `kori-healthcare-workflow-intelligence-npelv9w0d.vercel.app` preview and the separately maintained recruiter hub are not release targets for this change.

## Verified evidence navigation

| Portfolio card | Linked source | Evidence status |
| --- | --- | --- |
| The Denial That Started Before Care™ | [DPIS five-case denial/claim-readiness reviewer guide](https://github.com/koripickle1101-TN/denial-prevention-intelligence-system/blob/main/evidence/denial-queue-reviewer-guide.md) | Related **fictional** worked examples; does not prove the exact flagship scenario was completed or validated |
| Eligibility Verification Failure Analysis | [EVIS 12-case patient-access queue reviewer guide](https://github.com/koripickle1101-TN/eligibility-verification-intelligence-system/blob/main/evidence/patient-access-queue-reviewer-guide.md) | Related separate **synthetic** queue; does not establish real payer verification |
| Prior Authorization Workflow Audit | [PARCS five-case authorization queue guide](https://github.com/koripickle1101-TN/parcs-prior-authorization-command-system/blob/main/evidence/prior-authorization-queue-example.md) | Related **fictional** records; no live determination or completed exact audit implied |
| Registration Error Impact Study | [Patient Access Proof case study](https://github.com/koripickle1101-TN/healthcare-operations-proof-system/blob/main/project-examples/patient-access-proof.md) | Related student-developed patient-access example, not proof of a stand-alone impact evaluation |

All four destination files were fetched and confirmed to exist through the connected GitHub account. The four links are plain external anchors with `target="_blank"` and `rel="noopener noreferrer"`.

## Quality gates

| Gate | Evidence | Status |
| --- | --- | --- |
| v4 mobile navigation, accordion, Email and LinkedIn links | User reports completed Android checks | **Passed for v4 only** |
| v5 source includes exactly four linked evidence actions | Connected GitHub `docs/index.html` inspection | **Passed** |
| v5 internal anchor references | Ten `#...` links checked against document IDs, no missing targets | **Passed (static)** |
| v5 simulation and provenance disclaimer | `docs/index.html` text checked | **Passed (static)** |
| Typography and branding | Montserrat/Inter referenced; `#FF8200` in source; mobile stylesheet excludes cream/ivory styles | **Passed (source inspection)** |
| v5 deployment build | Vercel `dpl_2BiQqqgSAwumRXDGf82ZkUx2YPNR` | **READY** |
| v5 files present in deployed source tree | Vercel returned `docs/index.html`, stylesheet layers, `script.js`, and favicon | **Passed (source tree)** |
| Public unauthenticated HTTP response | Separate web/browser check unable to access Vercel address; local DNS unavailable | **Blocked — not verified** |
| v5 links work on actual Android | User explicitly confirmed all four evidence buttons opened their intended GitHub pages on November 9, 2026 | **Passed (user-reported device acceptance)** |
| Production release approval | User requested recommendation only; explicitly prohibited publication without approval | **Pending — do not publish** |

## Exact design constraints

Primary page background `#FFFFFF`; Tennessee Orange accent `#FF8200`; primary text `#000000`. Montserrat Semi-Bold headings and Inter body text. All copy describes student-developed simulations; no real-world healthcare employment, PHI, or operational outcomes are claimed.

## Android acceptance record and production smoke tests

- **v4 Android user acceptance:** mobile menu, project accordions, Email Me, and LinkedIn passed per the user's explicit report.
- **v5 Android evidence-link acceptance:** all four newly added evidence buttons passed per the user's explicit November 9, 2026 report. This establishes the user's device test of the preview, not an independent automated HTTP test.
- **Remaining release-time checks:** after an explicitly authorized production deployment, confirm the new production URL opens in an unauthenticated browser, contains the four links, retains navigation and contact links, and shows the exact white/orange/black mobile design.
- **Verification limitation:** an independent unauthenticated HTTP/browser request from the test environment was previously blocked. Do not replace this limitation with an ungrounded pass claim.

A second pre-release Android tap-through is not required merely to repeat the accepted v5 evidence-link checks.

## Final publication route — separate from recruiter hub

When explicit authorization is received (v5 Android evidence links already reported passed):
- Release **only** the separate `kori-healthcare-workflow-intelligence` Vercel project.
- Preserve `healthcare-operations-portfolio-hub` production and its `main` branch unchanged.
- Verify a production-target deployment, its source files, assigned production domain, and public response.
- Do not merge the evidence branch into the recruiter hub's `main` merely to release this separate site.
- Record the release URL, deployment ID, readiness result, and any unresolved checks.
- **Deployment caution:** The exact v5 preview deployment `dpl_2BiQqqgSAwumRXDGf82ZkUx2YPNR` reports READY. The separate Vercel project subsequently showed a newer CANCELED preview deployment. Never use the canceled deployment for release; pin the verified v5 files and confirm a successful production-target build before assigning a production domain.
- Ensure the recruiter hub project `healthcare-operations-portfolio-hub` is not selected as a deployment or domain target.

**No production release or main-branch merge is authorized by this checklist.**

## Publication recommendation — November 9, 2026

**Recommendation: APPROVE WHEN USER EXPLICITLY AUTHORIZES; NO AUTOMATIC RELEASE.** The v5 preview has a READY build, four grounded evidence links, intact student/synthetic-data disclaimers, and user-reported Android acceptance of the four new links. The earlier v4 navigation, accordion, and contact tests also passed on the user's device. The remaining release gate is explicit consent for the distinct `kori-healthcare-workflow-intelligence` production target, followed by post-release URL/asset/link verification. The source branch must remain separate from `main` in the original recruiter hub repository. No publication has been executed as part of this recommendation.
