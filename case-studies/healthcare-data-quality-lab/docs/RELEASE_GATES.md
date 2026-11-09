# Release gates — draft review

| Gate | State | Evidence limit |
|---|---|---|
| 12-case synthetic scope | PASSED | 10 Review, 2 Ready for human QA, 0 approvals |
| Independent Python checks | PASSED | 14/14 quality, 19/19 probes, 8/8 corruption checks in documented run |
| Source workbook identity | PASSED | Historical SHA-256s in evidence manifest; raw workbooks not published |
| Android static presentation | PASSED FROM SCREENSHOTS | Not a live editor calculation |
| Android negative-probe accordion | PASSED — USER REPORTED | Open and close observed by user, no instrumented recording |
| Chromium interactive smoke | PASSED | 22/22; mobile-sized Chromium, not Samsung HTML viewer |
| Android JS search / CSV export | UNTESTED ON DEVICE | Browser automation is distinct |
| Google Sheets Android workbook | BLOCKED — 4 CHECKS | No directly observed mobile spreadsheet tests |
| Additional future controls | UNTESTED — 3 | Not implemented |
| GitHub draft review | AUTHORIZED | Public branch and draft PR only |
| Merge / production / Railway | PROHIBITED UNTIL SEPARATE APPROVAL | No deployment or merge requested |
