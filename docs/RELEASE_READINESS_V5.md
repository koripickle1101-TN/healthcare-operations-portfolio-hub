# Healthcare Operations & Workflow Intelligence Portfolio™ — Release Readiness v5

Review date: November 9, 2026
Status: **Release candidate — not approved for production promotion**
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
| v5 links work on actual Android | No user test reported for newly added evidence links | **Untested** |
| Production release approval | Not yet given | **Pending** |

## Exact design constraints

Primary page background `#FFFFFF`; Tennessee Orange accent `#FF8200`; primary text `#000000`. Montserrat Semi-Bold headings and Inter body text. All copy describes student-developed simulations; no real-world healthcare employment, PHI, or operational outcomes are claimed.

## Final Android acceptance steps

1. Open the **v5 preview** above with Desktop site turned off.
2. Open the menu; select Projects; confirm the navigation works.
3. Expand one of the three `Focus & proposed deliverables` accordions.
4. Tap **each of the four new evidence links** and confirm the intended GitHub evidence page opens.
5. Tap Email and LinkedIn and verify the expected destinations.
6. Verify white background, orange accents, black Montserrat/Inter typography, and single-column phone cards.
7. Confirm no login/paywall or browser warning blocks public viewing.

Record any failures before release. Do **not** treat the v4 acceptance report as proof that the v5 evidence links work.

## Final publication route — separate from recruiter hub

When explicit authorization is received and the v5 Android checks pass:
- Release **only** the separate `kori-healthcare-workflow-intelligence` Vercel project.
- Preserve `healthcare-operations-portfolio-hub` production and its `main` branch unchanged.
- Verify a production-target deployment, its source files, assigned production domain, and public response.
- Do not merge the evidence branch into the recruiter hub's `main` merely to release this separate site.
- Record the release URL, deployment ID, readiness result, and any unresolved checks.

**No production release or main-branch merge is authorized by this checklist.**
