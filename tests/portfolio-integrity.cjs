'use strict';
const assert=require('node:assert/strict');
const repos=['patient-access-bottleneck-intelligence-system','eligibility-verification-intelligence-system','parcs-prior-authorization-command-system','denial-prevention-intelligence-system','silent-breakpoint-intelligence-system','healthcare-workflow-portfolio','koripickle1101-TN','healthcare-operations-portfolio-hub'];
const owner='koripickle1101-TN';
const req=async u=>{const headers={'Accept':'application/vnd.github+json','User-Agent':'portfolio-integrity-audit'};if(process.env.GH_API_TOKEN&&u.startsWith('https://api.github.com/'))headers.Authorization='Bearer '+process.env.GH_API_TOKEN;const r=await fetch(u,{headers});if(!r.ok){const details=(await r.text()).slice(0,260);throw Error(r.status+' '+u+' '+details)}return r};
const get=async u=>(await req(u)).json();
const pathOf=u=>{let m=u.match(/^https:\/\/github\.com\/koripickle1101-TN\/([^/]+)(?:\/(?:blob|tree)\/([^/]+)\/(.+))?$/);return m?{repo:m[1],ref:m[2]||'main',path:m[3]||''}:null};
(async()=>{
const trees=new Map();
for(const repo of repos){
 const data=await get('https://api.github.com/repos/'+owner+'/'+repo+'/git/trees/main?recursive=1');
 assert.equal(data.truncated,false,'Incomplete tree '+repo);
 trees.set(repo,new Set(data.tree.map(x=>x.path)));
}
const src=require('node:fs').readFileSync('recruiter-directory.js','utf8');
const matches=[...src.matchAll(/repo:'([^']+)',evidenceUrl:owner\+'([^']+)'/g)];
assert.equal(matches.length,10,'Expected 10 evidence entries');
assert.ok(!src.includes("healthcare-operations-proof-system/blob/"),'Recruiter listing must not link to the private Proof System');
for(const m of matches){
 const repo=m[1],p=pathOf('https://github.com/'+owner+'/'+m[2]);
 assert.ok(p&&p.repo===repo,'Incorrect evidence repository '+repo);
 if(repo==='healthcare-operations-portfolio-hub'&&p.path==='case-studies/01-medical-record-completeness/README.md'){
  const fs=require('node:fs');
  assert.ok(fs.existsSync(p.path),'Missing Case Study 01 README '+p.path);
  const workbook='case-studies/01-medical-record-completeness/Kori_Pickle_Medical_Record_Completeness_TENNESSEE_ORANGE_PORTFOLIO_FINAL (1) (1).xlsx';
  assert.ok(fs.existsSync(workbook),'Missing Case Study 01 workbook '+workbook);
  const buf=fs.readFileSync(workbook);
  assert.equal(buf.subarray(0,2).toString(),'PK','Invalid Case Study 01 workbook container');
  assert.ok(buf.length>10000,'Truncated Case Study 01 workbook');
  console.log('PASS Case Study 01 local README and workbook ('+buf.length+' bytes)');
  continue;
 }
 if(repo==='healthcare-operations-portfolio-hub'&&p.path==='evidence/Revenue_Cycle_Visibility_Tracker_Kori_Pickle.xlsx'){
  const fs=require('node:fs');
  assert.ok(fs.existsSync(p.path),'Missing public synthetic evidence workbook '+p.path);
  const buf=fs.readFileSync(p.path);
  assert.equal(buf.subarray(0,2).toString(),'PK','Invalid public evidence workbook container');
  assert.ok(buf.length>10000,'Truncated public evidence workbook');
  console.log('PASS public synthetic evidence workbook '+p.path+' ('+buf.length+' bytes)');
  continue;
 }
 assert.ok(!p.path||trees.get(repo).has(p.path)||[...trees.get(repo)].some(k=>k.startsWith(p.path+'/')),'Missing evidence target '+repo+'/'+p.path);
}
for(const repo of ['healthcare-workflow-portfolio','koripickle1101-TN']){
 const paths=trees.get(repo);
 const md=[...paths].filter(p=>p.endsWith('.md'));
 for(const path of md){
  const url='https://raw.githubusercontent.com/'+owner+'/'+repo+'/main/'+path.split('/').map(encodeURIComponent).join('/');
  const body=await (await req(url)).text();
  const links=[...body.matchAll(/\]\(([^)]+)\)/g)].map(x=>x[1]);
  for(const link of links){
   if(/^(?:https?:|mailto:|#|data:)/.test(link))continue;
   const dest=decodeURIComponent(link.split('#')[0].split('?')[0]);
   const posix=require('node:path').posix;
   const target=posix.normalize(posix.join(posix.dirname(path),dest));
   assert.ok(paths.has(target)||[...paths].some(p=>p.startsWith(target.replace(/\/$/,'')+'/')),'Broken internal link: '+repo+'/'+path+' -> '+link);
  }
 }
 console.log('PASS internal Markdown links: '+repo+' ('+md.length+' documents)');
}
for(const path of [...trees.get('koripickle1101-TN')].filter(p=>p.endsWith('.pdf'))){
 const u='https://raw.githubusercontent.com/'+owner+'/koripickle1101-TN/main/'+path;
 const b=Buffer.from(await (await req(u)).arrayBuffer());
 assert.equal(b.subarray(0,4).toString(),'%PDF','Invalid PDF '+path);
 assert.ok(b.length>1000,'Truncated PDF '+path);
 console.log('PASS PDF signature '+path+' ('+b.length+' bytes)');
}
for(const [repo,path] of [['patient-access-bottleneck-intelligence-system','Patient_Access_Bottleneck_Intelligence_System.xlsx']]){
 const u='https://raw.githubusercontent.com/'+owner+'/'+repo+'/main/'+path;
 const b=Buffer.from(await (await req(u)).arrayBuffer());
 assert.equal(b.subarray(0,2).toString(),'PK','Invalid XLSX container '+repo);
 assert.ok(b.length>1000,'Truncated XLSX '+repo);
 console.log('PASS XLSX ZIP signature '+repo+'/'+path);
}
console.log('PASS 10 public recruiter evidence destinations and supporting Markdown/PDF/XLSX container integrity; formulas, semantics and runtime outcomes not validated');
})().catch(e=>{console.error(e);process.exit(1)});
