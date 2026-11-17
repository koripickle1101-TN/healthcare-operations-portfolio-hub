# DEF-001 — Authorization Applicability Validation Bypass

Scope: student-created no-PHI healthcare administrative simulation.

## Original defect (source PV12 workbook)

The formula at `PV FIXTURES!L2` checked only the recognized `Undetermined` condition. Blank or unexpected values in authorization applicability (`E2`) could bypass the checkpoint, leaving `L2 = None detected` and `N2 = Ready for human QA`. Earlier NEG-001 and NEG-002 documented this failure in memory.

## Corrective implementation (separate disposable workbook)

The repaired formula now checks `AND(E2<>"Required",E2<>"Not Triggered")`, classifying all other values as `Authorization applicability / Review`. The corrective predicate is replicated in `L2:L13`. The `E2:E13` dropdown carries an errorStyle=stop setting and a user-facing error message.

## Evidence currently verified

- SHA-256 of the original and repaired workbooks agrees with the historical QA report.
- Exactly 12 existing formula cells changed; source cell values unchanged.
- Independent Python scenarios confirm that blank, unrecognized, whitespace, and `Undetermined` applicability are not ready for human QA.
- The historical repair report states that 19 of 19 file-based/in-memory tests passed; **this lab did not rerun those 19 in Excel**.

## Unresolved controls

Android dropdown enforcement, save/reopen behavior, and UI recalc are still blocked. Human approval was not performed. This demonstrates a simulated validation problem, not actual payer rules, clinical safety, or measured denial prevention.