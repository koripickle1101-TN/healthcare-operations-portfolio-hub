# Healthcare Operations & Workflow Intelligence Portfolio™ — Production Release Record

Record date: November 9, 2026  
Release status: **Version 5 published to production; Version 5.1 correction remains preview-only, not approved for publication.**  
Owner: Kori Pickle · University of Phoenix BS Healthcare Administration student

## What was actually published

| Field | Verified production record |
| --- | --- |
| Project | `kori-healthcare-workflow-intelligence` |
| Vercel project ID | `prj_zQYOsTjkkVqiB6o1eaj4gt4HYC5W` |
| Production domain | https://kori-healthcare-workflow-intelligen.vercel.app/ |
| Production deployment ID | `dpl_C42bPsMtXVXWAed5ho4nj9yjpotT` |
| Deployment target and build status | `production` · `READY` |
| Domain assignment | Canonical Vercel domain resolves **within Vercel's alias API** to the above production deployment |
| Source | Six website files fetched from `docs/` on `portfolio-evidence-links-2026-11-09` as they existed at release time |
| Consent | User explicitly authorized Version 5 publication to this separate project |
| Original recruiter hub | Not targeted, deployed, merged, or modified by this release |
| GitHub `main` | No merge or write performed by this release |

**Important:** Production is Version 5, not Version 5.1. After Version 5 was built, the branch's `docs/index.html` was changed to correct the fourth evidence link. The current HEAD of the release branch therefore does not exactly represent the published Version 5 HTML. Do not infer that newer branch edits are already live.

## Evidence links: production Version 5 versus corrected Version 5.1

| Portfolio card | Published Version 5 | Version 5.1 correction |
| --- | --- | --- |
| The Denial That Started Before Care™ | [DPIS five fictional review examples](https://github.com/koripickle1101-TN/denial-prevention-intelligence-system/blob/main/evidence/denial-queue-reviewer-guide.md) | Unchanged |
| Eligibility Verification Failure Analysis | [EVIS synthetic patient-access queue](https://github.com/koripickle1101-TN/eligibility-verification-intelligence-system/blob/main/evidence/patient-access-queue-reviewer-guide.md) | Unchanged |
| Prior Authorization Workflow Audit | [PARCS fictional authorization queue](https://github.com/koripickle1101-TN/parcs-prior-authorization-command-system/blob/main/evidence/prior-authorization-queue-example.md) | Unchanged |
| Registration Error Impact Study | [Patient Access Proof](https://github.com/koripickle1101-TN/healthcare-operations-proof-system/blob/main/project-examples/patient-access-proof.md) — **owner-private, archived repository; not suitable as a public recruiter link** | [Public EVIS metrics and registration methodology](https://github.com/koripickle1101-TN/eligibility-verification-intelligence-system/blob/main/evidence/metrics-and-scoring-methodology.md) — separate fictional registration scenario, **not measured improvement** |

The private/archived status of the originally published fourth destination was confirmed using the connected GitHub repository metadata. Successful owner-authenticated Android navigation to a private repository is not proof that an unauthenticated recruiter can open it.

All four cards are educational, fictional or synthetic. None of these links proves professional healthcare employment, real payer activity, actual eligibility or authorization decisions, or validated denial reduction. The linked repositories must be described as related work rather than completed validations of identically titled website briefs.

## Corrected Version 5.1 — NOT YET PUBLISHED

- Preview URL: https://kori-healthcare-workflow-intelligence-minfi1odp.vercel.app/
- Preview deployment ID: `dpl_Z3UYMsK1h72MZavJtedMAJCWnA5H`
- Preview deployment reported `READY` by the Vercel API; `target: null` (preview).
- The branch `portfolio-evidence-links-2026-11-09` currently has the new fourth EVIS link in `docs/index.html`.
- **Approval status:** No explicit approval to publish Version 5.1 has been received; **do not promote, redeploy, or reassign production for Version 5.1 without consent**.
- **Required new acceptance:** Open the Version 5.1 preview on Android, tap the updated fourth evidence button, and confirm the new EVIS page opens **without requiring sign-in to a private repository**. Prior Version 5 acceptance applies to the old URL only.

## Verification evidence and limitations

| Control | Result |
| --- | --- |
| Version 5 Vercel deployment | **PASSED:** `production`, `READY` |
| Version 5 canonical domain alias | **PASSED:** alias maps to `dpl_C42bPsMtXVXWAed5ho4nj9yjpotT` |
| Version 5 deployed source tree | **PASSED:** six expected website files present under `docs/` |
| Version 5 mobile navigation, contact and accordion controls | **USER-REPORTED PASS** on earlier Version 4, before evidence-link addition |
| Version 5 four evidence links on owner's Android | **USER-REPORTED PASS**; insufficient to establish public access to private fourth destination |
| Corrected Version 5.1 fourth link on Android | **NOT YET TESTED/CONFIRMED** |
| Independent unauthenticated production HTTP response | **BLOCKED:** external DNS resolution / browser retrieval unavailable from verification environment; Vercel `READY` and alias assignment are not substitutes |
| Production runtime error scan | **BLOCKED:** Vercel logs API returned 403; no claim of zero errors |
| Recruiter hub protection | **PASSED FOR THIS WORK:** Vercel project ID for the hub is different (`prj_l9WRpeU7ta8apt86IzKrkVV8K9FF`); no hub deployment, alias change, or `main` merge carried out |

## Brand constraints

Solid white `#FFFFFF` page background, Tennessee Orange `#FF8200` accents, black `#000000` primary text, Montserrat Semi-Bold headlines and Inter body. Premium feminine editorial, recruiter-readable, single-column mobile layouts, with explicit synthetic-data provenance and no PHI.

## Next controlled release step

1. User opens the corrected Version 5.1 preview and tests its fourth public EVIS evidence link.
2. User explicitly authorizes Version 5.1 production publication, separate from earlier Version 5 approval.
3. Release **only** to Vercel project `prj_zQYOsTjkkVqiB6o1eaj4gt4HYC5W`, preserving the recruiter hub and GitHub `main`.
4. Verify `production` target, `READY` state, exact source files, canonical domain mapping, and independent HTTP access if available.
5. Record a new Version 5.1 production deployment ID and close the remaining check limitations honestly.

**Current decision:** Version 5 is live via Vercel production mapping. Version 5.1 is a verified preview with a necessary public-link correction, not published, and not authorized for release.
