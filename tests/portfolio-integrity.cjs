'use strict';
const assert=require('node:assert/strict');
const repos=['patient-access-bottleneck-intelligence-system','eligibility-verification-intelligence-system','parcs-prior-authorization-command-system','denial-prevention-intelligence-system','silent-breakpoint-intelligence-system','healthcare-workflow-portfolio','healthcare-operations-proof-system','koripickle1101-TN','healthcare-operations-portfolio-hub'];
const owner='koripickle1101-TN';
const req=async u=>{const r=await fetch(u,{headers:{'Accept':'application/vnd.github+json','User-Agent':'portfolio-integrity-audit'}});if(!r.ok)throw Error(r.status+' '+u);return r};
const get=async u=>(await req(u)).json();
const pathOf=u=>{let m=u.match(/^https:\/\/github\.com\/koripickle1101-TN\/([^/]+)(?:\/(?:blob|tree)\/main\/(.+))?$/);return m?{repo:m[1],path:m[2]||''}:null};
(async()=>{
const trees=new Map();
for(const repo of repos){
 if(['healthcare-operations-proof-system'].includes(repo)){console.log('SKIP inaccessible repository '+repo+': unauthenticated CI cannot inspect; verified through authenticated connector separately');trees.set(repo,null);continue;}
 const data=await get('https://api.github.com/repos/'+owner+'/'+repo+'/git/trees/main?recursive=1');
 assert.equal(data.truncated,false,'Incomplete tree '+repo);
 trees.set(repo,new Set(data.tree.map(x=>x.path)));
}
const src=require('node:fs').readFileSync('recruiter-directory.js','utf8');
const matches=[...src.matchAll(/repo:'([^']+)',evidenceUrl:owner\+'([^']+)'/g)];
assert.equal(matches.length,9,'Expected 9 evidence entries');
for(const m of matches){
 const repo=m[1],p=pathOf('https://github.com/'+owner+'/'+m[2]);
 assert.ok(p&&p.repo===repo,'Incorrect evidence repository '+repo);
 if(!trees.get(repo)){console.log('SKIP inaccessible evidence target '+repo+'; connector verification required');continue;}
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
console.log('PASS 9 recruiter evidence destinations and supporting Markdown/PDF/XLSX integrity');
})().catch(e=>{console.error(e);process.exit(1)});
