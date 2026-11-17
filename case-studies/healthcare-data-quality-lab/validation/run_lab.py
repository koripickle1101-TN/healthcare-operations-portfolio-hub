#!/usr/bin/env python3
"""Read-only PV12 Healthcare Data Quality Lab — Python 3 standard library only.

The workbook is never opened for writing; no spreadsheet formulas are executed.
Test decisions come from independent Python rules applied to source field values.
"""
import argparse
import csv
import hashlib
import json
import re
from collections import Counter
from copy import deepcopy
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET
from zipfile import ZipFile

N = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
P = '{http://schemas.openxmlformats.org/package/2006/relationships}'
EXPECTED_SHA = {
    'repaired': '8fa7fc79bc2d40c0b5308e620aabbeac25e41baf6447605f466e0c1f6fef6567',
    'original': 'b647a736dec0dabf38e16ec5c619aab0dbdf11005c5b2b5e0394b235981a7164',
}
HEADERS = ['Record ID', 'Registration', 'Reg Consistency', 'Eligibility Evidence',
           'Auth Applicability', 'Auth Evidence', 'Responsible Role', 'Handoff Queue',
           'Escalation Due?', 'Escalation Recorded?', 'Expected First Failure',
           'Computed First Failure', 'Expected QA Outcome', 'Computed QA Outcome',
           'Rule Test', 'Human Review Gate', 'Human Approval', 'Case Notes']
ALLOWED = {
    'Registration': {'Complete', 'Missing'},
    'Reg Consistency': {'Consistent', 'Conflict'},
    'Eligibility Evidence': {'Documented', 'Missing', 'Pending', 'Not Assessed'},
    'Auth Applicability': {'Not Triggered', 'Required', 'Undetermined'},
    'Auth Evidence': {'Not Applicable', 'Undocumented', 'Pending', 'Decision Evidence Recorded'},
    'Escalation Due?': {'Yes', 'No'},
    'Escalation Recorded?': {'Yes', 'No', 'Not Needed'},
}


def sha256(path):
    h = hashlib.sha256()
    with open(path, 'rb') as fp:
        for chunk in iter(lambda: fp.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def xlsx_data(path):
    """Minimal standards-based, read-only XLSX unpacker for the PV12 fixtures."""
    with ZipFile(path) as z:
        workbook = ET.fromstring(z.read('xl/workbook.xml'))
        rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
        targets = {x.get('Id'): x.get('Target').lstrip('/') for x in rels.findall(f'{P}Relationship')}
        sheets = []
        paths = {}
        for s in workbook.findall(f'{N}sheets/{N}sheet'):
            name = s.get('name')
            sheets.append(name)
            paths[name] = targets[s.get(f'{R}id')]
        strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            root = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in root.findall(f'{N}si'):
                strings.append(''.join(node.text or '' for node in si.iter(f'{N}t')))
        all_cells = {}
        validations = {}
        for name in sheets:
            root = ET.fromstring(z.read(paths[name]))
            cells = {}
            for cell in root.findall(f'.//{N}sheetData/{N}row/{N}c'):
                ref = cell.get('r')
                raw = cell.findtext(f'{N}v')
                typ = cell.get('t')
                if typ == 's' and raw is not None:
                    value = strings[int(raw)]
                elif typ == 'inlineStr':
                    value = ''.join(c.text or '' for c in cell.iter(f'{N}t'))
                elif raw is None:
                    value = ''
                else:
                    value = raw
                cells[ref] = {'value': value, 'formula': cell.findtext(f'{N}f')}
            all_cells[name] = cells
            validations[name] = [{
                'sqref': dv.get('sqref', ''), 'type': dv.get('type', ''),
                'errorStyle': dv.get('errorStyle', ''),
                'showErrorMessage': dv.get('showErrorMessage', ''),
                'formula1': dv.findtext(f'{N}formula1', default='')
            } for dv in root.findall(f'.//{N}dataValidation')]
    return {'sheet_names': sheets, 'cells': all_cells, 'validations': validations}


def fixtures(book):
    cells = book['cells']['PV FIXTURES']
    header = [cells.get(f'{chr(65 + i)}1', {}).get('value', '') for i in range(18)]
    if header != HEADERS:
        raise ValueError('Unexpected PV FIXTURES header layout; refuse to guess mappings')
    records = []
    for row in range(2, 14):
        values = [cells.get(f'{chr(65 + i)}{row}', {}).get('value', '') for i in range(18)]
        records.append(dict(zip(HEADERS, values)))
    return records


def read_fixture_csv(path):
    with open(path, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        if reader.fieldnames != HEADERS:
            raise ValueError('CSV headers do not match the PV12 data contract')
        return [dict(r) for r in reader]


def first_failure(rec):
    """Independent ordered checkpoint logic; stricter invalid-enum handling is explicit."""
    if rec['Registration'] != 'Complete':
        return 'Registration completeness'
    if rec['Reg Consistency'] != 'Consistent':
        return 'Registration consistency'
    if rec['Eligibility Evidence'] != 'Documented':
        return 'Eligibility documentation'
    if rec['Auth Applicability'] not in ('Not Triggered', 'Required'):
        return 'Authorization applicability'
    if rec['Auth Applicability'] == 'Required' and rec['Auth Evidence'] != 'Decision Evidence Recorded':
        return 'Authorization status'
    if rec['Auth Applicability'] == 'Not Triggered' and rec['Auth Evidence'] != 'Not Applicable':
        return 'Authorization status'
    if not rec['Responsible Role'].strip():
        return 'Task ownership'
    if not rec['Handoff Queue'].strip():
        return 'Handoff control'
    if rec['Escalation Due?'] not in ALLOWED['Escalation Due?'] or rec['Escalation Recorded?'] not in ALLOWED['Escalation Recorded?']:
        return 'Exception escalation'
    if rec['Escalation Due?'] == 'Yes' and rec['Escalation Recorded?'] != 'Yes':
        return 'Exception escalation'
    return 'None detected'


def outcome(failure):
    return 'Ready for human QA' if failure == 'None detected' else 'Review'


def disallowed(rec):
    errors = []
    for field, allowed in ALLOWED.items():
        if rec.get(field, '') not in allowed:
            errors.append({'field': field, 'observed': rec.get(field, ''), 'reason': 'out-of-domain'})
    return errors


def check(id_, name, status, expected, observed, detail, *, category='Dataset'):
    return {'test_id': id_, 'test': name, 'category': category, 'status': status,
            'expected': expected, 'observed': observed, 'detail': detail}


def source_control(repaired, original):
    if repaired is None or original is None:
        return {'status': 'BLOCKED', 'errors': ['Both original and repaired XLSX files required'], 'changed_formula_cells': []}
    errs = []
    if repaired['sheet_names'] != original['sheet_names'] or len(repaired['sheet_names']) != 18:
        errs.append('Worksheet names/order/18-sheet count not preserved')
    diffs = []
    for name in set(original['sheet_names']) | set(repaired['sheet_names']):
        a = original['cells'].get(name, {})
        b = repaired['cells'].get(name, {})
        for ref in sorted(set(a) | set(b)):
            if a.get(ref) != b.get(ref):
                diffs.append((name, ref, a.get(ref), b.get(ref)))
    accepted = {f'L{i}' for i in range(2, 14)}
    changed = {(sheet, ref) for sheet, ref, _, _ in diffs}
    if changed != {('PV FIXTURES', ref) for ref in accepted}:
        errs.append('Cell differences outside exact allowed 12 PV FIXTURES L2:L13 formula cells')
    for sheet, ref, before, after in diffs:
        if before is None or after is None or before['value'] != after['value']:
            errs.append(f'{sheet}!{ref}: source value changed')
        if sheet == 'PV FIXTURES' and ref in accepted:
            row = int(ref[1:])
            desired = f'AND(E{row}<>"Required",E{row}<>"Not Triggered")'
            if desired not in (after or {}).get('formula', ''):
                errs.append(f'{sheet}!{ref}: repaired invalid-applicability predicate missing')
    original_v = next((x for x in original['validations']['PV FIXTURES'] if x['sqref'] == 'E2:E13'), None)
    repaired_v = next((x for x in repaired['validations']['PV FIXTURES'] if x['sqref'] == 'E2:E13'), None)
    if not original_v or not repaired_v or 'Required' not in repaired_v['formula1'] or repaired_v['errorStyle'] != 'stop' or repaired_v['showErrorMessage'] != '1':
        errs.append('Strict repaired E2:E13 dropdown metadata not confirmed')
    return {'status': 'PASSED' if not errs else 'FAILED', 'errors': errs,
            'changed_formula_cells': sorted([f'{s}!{r}' for s, r, _, _ in diffs]),
            'original_validation': original_v, 'repaired_validation': repaired_v}


def negative_probes(records):
    base = next(r for r in records if r['Record ID'] == 'PV-01')
    specs = [
        ('NEG-DQL-001', {'Auth Applicability': ''}, 'Authorization applicability', True),
        ('NEG-DQL-002', {'Auth Applicability': 'Unexpected Status'}, 'Authorization applicability', True),
        ('NEG-DQL-003', {'Auth Applicability': ' Required '}, 'Authorization applicability', True),
        ('NEG-DQL-004', {'Auth Applicability': 'Undetermined'}, 'Authorization applicability', False),
        ('NEG-DQL-005', {'Registration': 'Missing'}, 'Registration completeness', False),
        ('NEG-DQL-006', {'Reg Consistency': 'Conflict'}, 'Registration consistency', False),
        ('NEG-DQL-007', {'Eligibility Evidence': 'Missing'}, 'Eligibility documentation', False),
        ('NEG-DQL-008', {'Eligibility Evidence': 'Pending'}, 'Eligibility documentation', False),
        ('NEG-DQL-009', {'Auth Applicability': 'Required', 'Auth Evidence': 'Undocumented'}, 'Authorization status', False),
        ('NEG-DQL-010', {'Auth Applicability': 'Required', 'Auth Evidence': 'Pending'}, 'Authorization status', False),
        ('NEG-DQL-011', {'Auth Evidence': 'Pending'}, 'Authorization status', False),
        ('NEG-DQL-012', {'Responsible Role': ''}, 'Task ownership', False),
        ('NEG-DQL-013', {'Handoff Queue': ''}, 'Handoff control', False),
        ('NEG-DQL-014', {'Escalation Due?': 'Yes', 'Escalation Recorded?': 'No'}, 'Exception escalation', False),
        ('NEG-DQL-015', {'Reg Consistency': 'Conflict', 'Eligibility Evidence': 'Missing'}, 'Registration consistency', False),
        ('NEG-DQL-016', {'Auth Applicability': 'Required', 'Auth Evidence': 'Decision Evidence Recorded'}, 'None detected', False),
        ('NEG-DQL-017', {'Auth Applicability': 'Unknown'}, 'Authorization applicability', True),
        ('NEG-DQL-018', {'Escalation Due?': 'Maybe'}, 'Exception escalation', True),
        ('NEG-DQL-019', {'Escalation Recorded?': 'Unexpected'}, 'Exception escalation', True),
    ]
    out = []
    for tid, mutation, expected, should_have_domain_error in specs:
        work = deepcopy(base)
        work.update(mutation)
        actual = first_failure(work)
        domain_invalid = bool(disallowed(work))
        passed = actual == expected and (not should_have_domain_error or domain_invalid)
        out.append({'test_id': tid, 'mutation': mutation, 'expected_first_failure': expected,
                    'actual_first_failure': actual, 'expected_domain_invalid': should_have_domain_error,
                    'actual_domain_invalid': domain_invalid, 'status': 'PASSED' if passed else 'FAILED',
                    'scope': 'Independent Python rule probe on disposable in-memory dict; NOT Excel or Android UI'})
    return out


def run(records, workbook, original, source_hashes, preservation):
    tests = []
    IDs = [r['Record ID'] for r in records]
    errors = []
    expected_ids = {f'PV-{i:02d}' for i in range(1, 13)}
    ok = len(records) == 12 and set(IDs) == expected_ids
    tests.append(check('DQL-001','Fixture count and expected IDs','PASSED' if ok else 'FAILED',
                       '12 rows; IDs PV-01 through PV-12', f'{len(records)} rows, {len(set(IDs))} IDs', 'One fictional pre-visit scenario per source record'))
    bad_ids = [x for x in IDs if not re.fullmatch(r'PV-\d{2}', x or '')]
    counts = Counter(IDs)
    duplicates = sorted(k for k, v in counts.items() if v > 1)
    tests.append(check('DQL-002','Primary-key uniqueness and format', 'PASSED' if not bad_ids and not duplicates else 'FAILED',
                       'No blank, malformed, or duplicated IDs', f'bad={bad_ids}; duplicates={duplicates}', 'Exact source-grain key check'))
    enum_errors = [{'record_id': r['Record ID'], **e} for r in records for e in disallowed(r)]
    tests.append(check('DQL-003','Controlled-value conformance','PASSED' if not enum_errors else 'FAILED',
                       'All controlled tokens match documented enumerations', f'{len(enum_errors)} invalid fields',json.dumps(enum_errors, ensure_ascii=False)))

    gates = [first_failure(r) for r in records]
    specs = [
        ('DQL-004','Registration completeness and consistency', {'Registration completeness','Registration consistency'}, 'Registration'),
        ('DQL-005','Eligibility-documentation checkpoint', {'Eligibility documentation'}, 'Eligibility'),
        ('DQL-006','Authorization applicability and evidence', {'Authorization applicability','Authorization status'}, 'Authorization'),
        ('DQL-007','Accountable-owner checkpoint', {'Task ownership'}, 'Ownership'),
        ('DQL-008','Handoff destination checkpoint', {'Handoff control'}, 'Handoff'),
        ('DQL-009','Escalation-evidence checkpoint', {'Exception escalation'}, 'Escalation'),
    ]
    for tid, name, relevant, category in specs:
        matches = [(r['Record ID'], g) for r,g in zip(records, gates) if g in relevant]
        rows = [(r['Record ID'], first_failure(r), r['Expected First Failure']) for r in records if r['Expected First Failure'] in relevant]
        passed = bool(rows) and len(matches) == len(rows) and all(a == b for _,a,b in rows)
        tests.append(check(tid,name,'PASSED' if passed else 'FAILED',
                           'Applicable synthetic fixture(s) routed to expected first-failure gate',
                           f'{len(rows)} expected fixture(s), {len(matches)} detected',str(rows),category=category))
    mismatch_expected = [{'id':r['Record ID'],'expected':r['Expected First Failure'],'derived':g}
                         for r,g in zip(records,gates) if r['Expected First Failure'] != g]
    tests.append(check('DQL-010','Independent first-failure rule precedence',
                       'PASSED' if not mismatch_expected else 'FAILED','All 12 expected first failures reproduced',
                       f'{len(mismatch_expected)} mismatches',json.dumps(mismatch_expected)))
    mismatch_cached = [{'id':r['Record ID'], 'derived_gate':g,'cached_gate':r['Computed First Failure'],
                        'derived_outcome':outcome(g),'cached_outcome':r['Computed QA Outcome'],
                        'expected_outcome':r['Expected QA Outcome'],'workbook_rule_test':r['Rule Test']}
                       for r,g in zip(records,gates) if r['Computed First Failure'] != g or
                       r['Computed QA Outcome'] != outcome(g) or r['Expected QA Outcome'] != outcome(g) or
                       r['Rule Test'] != 'PASS']
    tests.append(check('DQL-011','Expected vs cached results reconciliation',
                       'PASSED' if not mismatch_cached else 'FAILED', 'Computed and expected checkpoint/outcome agree with independent Python, Rule Test=PASS',
                       f'{len(mismatch_cached)} mismatches',json.dumps(mismatch_cached),category='Reconciliation'))
    invalid_approval = [r['Record ID'] for r in records if r['Human Approval'] != 'Not Performed' or
                        not r['Human Review Gate'].strip()]
    tests.append(check('DQL-012','Human-approval boundary','PASSED' if not invalid_approval else 'FAILED',
                       'Human Approval=Not Performed and review gate populated for all cases',
                       f'{len(invalid_approval)} violations; approved=0',str(invalid_approval),category='Governance'))
    integrity_ok = all(source_hashes.get(k) == v for k,v in EXPECTED_SHA.items()) and preservation['status']=='PASSED'
    integrity_stat = 'BLOCKED' if workbook is None or original is None else ('PASSED' if integrity_ok else 'FAILED')
    tests.append(check('DQL-013','Historical checksum and workbook preservation',integrity_stat,
                       'Exact known SHA-256 matches, 18 sheets, only 12 repaired formula changes and E validation',
                       f'original_sha_match={source_hashes.get("original")==EXPECTED_SHA["original"]}; repaired_sha_match={source_hashes.get("repaired")==EXPECTED_SHA["repaired"]}; preservation={preservation["status"]}',
                       '; '.join(preservation.get('errors', [])) or 'Source and repaired workbooks read-only',category='Integrity'))
    probes = negative_probes(records)
    nbad = [p['test_id'] for p in probes if p['status']!='PASSED']
    tests.append(check('DQL-014','In-memory adversarial regression probes','PASSED' if not nbad else 'FAILED',
                       'All scenario probes meet independent Python expectations',
                       f'{len(probes)-len(nbad)}/{len(probes)} probes passed',f'Failed probes: {nbad}',category='Negative paths'))

    review_count = sum(outcome(g) == 'Review' for g in gates)
    ready_count = len(gates) - review_count
    return tests, probes, {'records':len(records), 'review':review_count, 'ready_for_human_QA':ready_count,
            'approved':0, 'first_failure_counts':dict(sorted(Counter(gates).items())),
            'tests':dict(Counter(t['status'] for t in tests)),
            'negative_probes':dict(Counter(p['status'] for p in probes))}



def deliberate_corruption_probes(records, workbook, original, hashes, preservation):
    """Exercise failure detection using *copies in memory*, never source workbook bytes."""
    specs = [
        ('COR-001', 'Missing fixture row', lambda rr: rr.pop(), 'DQL-001'),
        ('COR-002', 'Duplicate case ID', lambda rr: rr[1].__setitem__('Record ID', rr[0]['Record ID']), 'DQL-002'),
        ('COR-003', 'Invalid eligibility enum', lambda rr: rr[0].__setitem__('Eligibility Evidence','Unknown'), 'DQL-003'),
        ('COR-004', 'Incorrect cached first-failure', lambda rr: rr[0].__setitem__('Computed First Failure','Task ownership'), 'DQL-011'),
        ('COR-005', 'Unauthorized synthetic approval', lambda rr: rr[0].__setitem__('Human Approval','Approved'), 'DQL-012'),
        ('COR-006', 'Unknown escalation due token', lambda rr: rr[0].__setitem__('Escalation Due?','Maybe'), 'DQL-010'),
    ]
    out = []
    for tid, label, fn, expected_failed in specs:
        rr = deepcopy(records)
        fn(rr)
        results, _, _ = run(rr, workbook, original, hashes, preservation)
        actual = next(t['status'] for t in results if t['test_id'] == expected_failed)
        out.append({'test_id':tid, 'mutation':label,'expected_detection':expected_failed+'=FAILED',
                    'actual_detection':expected_failed+'='+actual,
                    'status':'PASSED' if actual == 'FAILED' else 'FAILED',
                    'scope':'In-memory corruption detection; original workbook untouched'})
    forged = dict(hashes)
    forged['repaired'] = '0'*64
    tests, _, _ = run(records, workbook, original, forged, preservation)
    actual = next(t['status'] for t in tests if t['test_id']=='DQL-013')
    out.append({'test_id':'COR-007','mutation':'Altered checksum supplied only in memory',
                'expected_detection':'DQL-013=FAILED','actual_detection':'DQL-013='+actual,
                'status':'PASSED' if actual=='FAILED' else 'FAILED',
                'scope':'Metadata tamper detection; no file changes'})
    if workbook and original:
        altered = deepcopy(workbook)
        altered['cells']['PV FIXTURES']['B2']['value'] = 'Tampered'
        actual = source_control(altered, original)['status']
        out.append({'test_id':'COR-008','mutation':'Altered protected source cell only in memory',
                    'expected_detection':'source_control=FAILED','actual_detection':'source_control='+actual,
                    'status':'PASSED' if actual=='FAILED' else 'FAILED',
                    'scope':'Structural preservation guard; no file changes'})
    return out

def write_csv(path, header, rows):
    with open(path,'w',newline='',encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=header, extrasaction='ignore')
        writer.writeheader()
        for r in rows:
            writer.writerow(r)


def json_out(path, obj):
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False, sort_keys=False)+'\n',encoding='utf-8')


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    source = ap.add_mutually_exclusive_group(required=True)
    source.add_argument('--workbook',type=Path,help='Read-only repaired PV12 workbook')
    source.add_argument('--csv',type=Path,help='Self-contained synthetic extracted fixture CSV')
    ap.add_argument('--original',type=Path,help='Read-only original PV12 workbook, needed for DQL-013')
    ap.add_argument('--qa-report',type=Path,help='Historical November 9 retest report (evidence reference only)')
    ap.add_argument('--output',type=Path,default=Path(__file__).parent/'outputs')
    args = ap.parse_args()
    args.output.mkdir(parents=True,exist_ok=True)
    workbook = xlsx_data(args.workbook) if args.workbook else None
    original = xlsx_data(args.original) if args.original else None
    records = fixtures(workbook) if workbook else read_fixture_csv(args.csv)
    hashes = {}
    for label, path in [('repaired',args.workbook),('original',args.original),('historical_retest_report',args.qa_report)]:
        if path:
            hashes[label] = sha256(path)
    preservation = source_control(workbook, original)
    tests, probes, profile = run(records, workbook, original, hashes, preservation)
    corruption = deliberate_corruption_probes(records, workbook, original, hashes, preservation)
    write_csv(args.output/'pv12_synthetic_cases.csv', HEADERS, records)
    cols = ['test_id','test','category','status','expected','observed','detail']
    write_csv(args.output/'qa_test_matrix.csv', cols, tests)
    write_csv(args.output/'negative_probes.csv',
              ['test_id','mutation','expected_first_failure','actual_first_failure',
               'expected_domain_invalid','actual_domain_invalid','status','scope'],
              [{**p,'mutation':json.dumps(p['mutation'],sort_keys=True)} for p in probes])
    write_csv(args.output/'corruption_detection.csv',
              ['test_id','mutation','expected_detection','actual_detection','status','scope'],corruption)
    now = datetime.now(timezone.utc).isoformat(timespec='seconds')
    report = {'run_utc':now,'workbook_executed':str(args.workbook.name) if args.workbook else None,
              'execution_mode':'read-only XLSX cell extraction + independent Python rules' if workbook else 'CSV fixture + independent Python rules',
              'profile':profile,'qa_tests':tests,'negative_probes':probes,'corruption_detection':corruption,'preservation':preservation,
              'historical_19_tests_reexecuted':False,
              'caveats':['No XLSX formulas recalculated in Excel, Google Sheets or artifact_tool',
                         'Negative tests mutate Python dictionaries in memory, not the workbook',
                         'Source workbook and repaired workbook remain untouched',
                         'No Android interaction/acceptance testing; no human approval, EHR or payer validation',
                         'The independent validator has additional strict-domain checks beyond the original spreadsheet formulas']}
    json_out(args.output/'qa_results.json',report)
    manifest={'project':'Healthcare Data Quality Lab™','phase':'Phase 1 source preservation + Phase 2 independent QA',
              'run_utc':now,'source_kind':'Student-developed synthetic/no-PHI fixture, 12 scenario grain',
              'sources':{
                  'repaired':{'filename':args.workbook.name if args.workbook else None,'sha256':hashes.get('repaired'),
                              'historical_sha256':EXPECTED_SHA['repaired'],'byte_identical_to_historical':hashes.get('repaired')==EXPECTED_SHA['repaired']},
                  'original':{'filename':args.original.name if args.original else None,'sha256':hashes.get('original'),
                              'historical_sha256':EXPECTED_SHA['original'],'byte_identical_to_historical':hashes.get('original')==EXPECTED_SHA['original']},
                  'historical_retest_report':{'filename':args.qa_report.name if args.qa_report else None,
                                             'sha256':hashes.get('historical_retest_report'),
                                             'interpretation':'Historical test receipt, not substituted for this run'}} ,
              'preservation':{'status':preservation['status'],'changed_formula_cells':preservation['changed_formula_cells'],
                              'errors':preservation['errors']},
              'execution':{'qa_suite_total':len(tests),'qa_passed':sum(t['status']=='PASSED' for t in tests),
                           'qa_failed':sum(t['status']=='FAILED' for t in tests),
                           'qa_blocked':sum(t['status']=='BLOCKED' for t in tests),
                           'negative_probes_total':len(probes),
                           'negative_probes_passed':sum(p['status']=='PASSED' for p in probes),
                           'negative_probes_failed':sum(p['status']=='FAILED' for p in probes),
                           'corruption_tests_total':len(corruption),
                           'corruption_tests_passed':sum(p['status']=='PASSED' for p in corruption),
                           'corruption_tests_failed':sum(p['status']=='FAILED' for p in corruption)},
              'boundaries':{'no_phi':True,'no_real_patient_or_payer_data':True,
                            'no_live_healthcare_environment':True,'excel_android_app_validation':'BLOCKED',
                            'human_approval':'NOT PERFORMED',
                            'railway':'NOT DEPLOYED','github':'NOT MODIFIED'}}
    json_out(args.output/'evidence_manifest.json',manifest)
    print(json.dumps({'summary':profile,'preservation':preservation['status'],
                      'failed_tests':[t['test_id'] for t in tests if t['status']!='PASSED'],
                      'failed_probes':[p['test_id'] for p in probes if p['status']!='PASSED'],
                      'failed_corruption_checks':[p['test_id'] for p in corruption if p['status']!='PASSED'],
                      'output_directory':str(args.output)},indent=2))
    return 0 if all(t['status']=='PASSED' for t in tests) and all(p['status']=='PASSED' for p in probes) and all(p['status']=='PASSED' for p in corruption) else 2

if __name__=='__main__':
    raise SystemExit(main())