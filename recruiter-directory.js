'use strict';
const owner='https://github.com/koripickle1101-TN/';
const projects=[
{id:'case01',title:'Medical Record Completeness KPI Dashboard',acronym:'CASE STUDY 01',purpose:'Inspect a synthetic documentation-completeness dashboard and its assumptions, controls, and limitations.',competencies:'Documentation quality · KPI definitions · Excel analytics',action:'Review medical record completeness case study',category:'Documentation / medical records',featured:true,status:'Portfolio-ready · simulated educational case',roles:['documentation','quality','data','revenue'],summary:'Compares baseline and hypothetical document-completeness controls across 500 fictional records, with 40 modeled defects and documented limitations.',evidence:'500-record synthetic Excel dashboard · Exception Log · Methodology',repo:'healthcare-operations-portfolio-hub',evidenceUrl:owner+'healthcare-operations-portfolio-hub/blob/main/case-studies/01-medical-record-completeness/README.md'},
{id:'pabis',title:'Patient Access Bottleneck Intelligence System',acronym:'PABIS',purpose:'Explore a fictional patient-access workbook focused on registration accuracy, follow-up queues, and potential bottlenecks.',competencies:'Patient access · Registration accuracy · Follow-up tracking',action:'Explore patient access workbook',category:'Patient access',featured:true,status:'Automated workbook checks passed · educational',roles:['access','quality','data'],summary:'Excel-based fictional registration, accuracy-control and follow-up exercise with a 12-case tracker.',evidence:'Excel workbook · 12-case educational exercise',repo:'patient-access-bottleneck-intelligence-system',evidenceUrl:owner+'patient-access-bottleneck-intelligence-system/blob/main/Patient_Access_Bottleneck_Intelligence_System.xlsx'},
{id:'evis',title:'Eligibility Verification Intelligence System',acronym:'EVIS',purpose:'Review fictional eligibility exceptions, patient-access queue decisions, and demographic verification controls.',competencies:'Insurance eligibility · Patient access · Demographic accuracy',action:'Explore eligibility verification evidence',category:'Patient access / eligibility',featured:true,status:'Automated smoke passed · review pending',roles:['access','documentation','data'],summary:'Models eligibility exceptions, patient-access queue decisions and a separate demographic control simulation.',evidence:'12-case queue guide · Synthetic source records',repo:'eligibility-verification-intelligence-system',evidenceUrl:owner+'eligibility-verification-intelligence-system/blob/main/evidence/patient-access-queue-reviewer-guide.md'},
{id:'parcs',title:'Prior Authorization Command System',acronym:'PARCS',purpose:'Review fictional authorization requirements, documentation readiness, request ownership, escalation, and closure checks.',competencies:'Prior authorization · Escalation controls · Documentation readiness',action:'Explore prior authorization evidence',category:'Authorizations / referrals',featured:true,status:'Browser smoke passed · educational',roles:['authorization','access','revenue','documentation'],summary:'Models authorization requirement review, documentation readiness, queue ownership, escalation and closure checks.',evidence:'Five-case fictional queue · Reviewer guide',repo:'parcs-prior-authorization-command-system',evidenceUrl:owner+'parcs-prior-authorization-command-system/blob/main/evidence/prior-authorization-queue-example.md'},
{id:'dpis',title:'Denial Prevention Intelligence System',acronym:'DPIS',purpose:'Review fictional claim-readiness exceptions and potential upstream documentation or authorization defects.',competencies:'Revenue cycle · Claims readiness · Denial risk analysis',action:'Explore denial prevention evidence',category:'Revenue cycle',featured:true,status:'Browser smoke passed · educational',roles:['revenue','documentation','data'],summary:'Explores fictional claim-readiness exceptions, denial signals and upstream control hypotheses.',evidence:'Five-case fictional claim-readiness reviewer guide',repo:'denial-prevention-intelligence-system',evidenceUrl:owner+'denial-prevention-intelligence-system/blob/main/evidence/denial-queue-reviewer-guide.md'},
{id:'sbi',title:'Silent Breakpoint Intelligence',acronym:'SBI',purpose:'Inspect a synthetic breakpoint log and examine the first potential control loss in an administrative handoff.',competencies:'Workflow analysis · Handoff controls · Quality improvement',action:'Explore workflow breakpoint evidence',category:'Workflow / quality',featured:true,status:'Synthetic evidence check passed · educational',roles:['quality','revenue','data'],summary:'Organizes hypothetical first-control-loss investigation and cross-workflow handoff analysis.',evidence:'Breakpoint-log CSV template',repo:'silent-breakpoint-intelligence-system',evidenceUrl:owner+'silent-breakpoint-intelligence-system/blob/main/templates/breakpoint-log.csv'},
{id:'workflow',title:'Healthcare Workflow Portfolio',purpose:'Browse case studies and prototypes covering healthcare administrative handoffs and documentation.',competencies:'Case-study writing · Workflow mapping · Process documentation',action:'Browse healthcare workflow case studies',category:'Case-study library',featured:false,status:'Supporting library',roles:['access','authorization','revenue','documentation','quality','data'],summary:'Larger collection of case studies, interactive prototypes and healthcare workflow learning materials.',evidence:'Case studies · Workflow pages · Supporting prototypes',repo:'healthcare-workflow-portfolio',evidenceUrl:owner+'healthcare-workflow-portfolio/tree/main/case-studies'},
{id:'proof',title:'Healthcare Operations Proof System',purpose:'Review supporting educational templates and a revenue-cycle visibility workbook, subject to documented evidence limitations.',competencies:'Evidence organization · Spreadsheet analysis · Documentation controls',action:'Review supporting portfolio evidence',category:'Supporting evidence',featured:false,status:'Consolidation review',roles:['access','authorization','revenue','quality','data'],summary:'Templates, portfolio case examples, visual assets and a revenue-cycle visibility workbook.',evidence:'Tools directory · Example workbook',repo:'healthcare-operations-proof-system',evidenceUrl:owner+'healthcare-operations-proof-system/blob/main/tools/Revenue_Cycle_Visibility_Tracker_Kori_Pickle.xlsx'},
{id:'profile',title:'GitHub Profile & Case-Study Collection',purpose:'Find the professional introduction, project directory, and additional portfolio case-study references.',competencies:'Technical documentation · Project presentation · Case-study organization',action:'Explore GitHub case-study collection',category:'Professional profile',featured:false,status:'Supporting profile',roles:['access','authorization','revenue','documentation','quality','data'],summary:'GitHub profile README and additional healthcare operations case studies.',evidence:'GitHub profile · Project directory',repo:'koripickle1101-TN',evidenceUrl:owner+'koripickle1101-TN/tree/main/projects'},
{id:'hub',title:'Healthcare Operations Portfolio Hub',purpose:'Inspect the central recruiter-facing project directory and related evidence references.',competencies:'Portfolio architecture · Recruiter navigation · Evidence traceability',action:'Inspect portfolio hub repository',category:'Recruiter directory',featured:false,status:'Central directory',roles:['access','authorization','revenue','documentation','quality','data'],summary:'Central recruiter-facing directory connecting the portfolio and its supporting evidence.',evidence:'Project directory · Role filters · Direct repository links',repo:'healthcare-operations-portfolio-hub',evidenceUrl:owner+'healthcare-operations-portfolio-hub'}
];
const create=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text!==undefined)e.textContent=text;return e};
function link(label,url){const a=create('a','evidence-link',label);a.href=url;if(url.startsWith('https:')){a.target='_blank';a.rel='noopener noreferrer'}return a}
const featuredIds=new Set(['evis','parcs','dpis','sbi']);
const actionLabels={
case01:'Explore documentation analytics',pabis:'Explore patient access analysis',
evis:'Explore eligibility verification',parcs:'Explore prior authorization',
dpis:'Explore denial prevention',sbi:'Explore workflow intelligence',
workflow:'Browse healthcare case studies',proof:'Review supporting evidence',
profile:'View GitHub portfolio',hub:'View portfolio documentation'
};
function card(p,compact=false){
 const article=create('article','recruiter-card');
 article.dataset.project=p.id;
 const top=create('div','card-top');
 top.append(create('span','card-category',p.category));
 article.append(top,create('h3','',p.title));
 if(p.acronym){
  const classification=p.id==='case01'?'Educational case study':'Educational portfolio project';
  article.append(create('p','card-acronym',p.acronym+' · '+classification));
 }else{
  article.append(create('p','card-acronym','Supporting educational portfolio resource'));
 }
 article.append(create('p','card-purpose',p.purpose||p.summary));
 if(p.competencies){
  const skills=create('div','card-competencies');
  skills.append(create('span','competencies-label','Educational competencies'),create('p','',p.competencies));
  article.append(skills);
 }
 const ev=create('p','card-evidence');
 ev.append(create('strong','', 'Available evidence: '),document.createTextNode(p.evidence));
 article.append(ev);
 if(!compact){
  const details=create('details','card-details');
  details.append(create('summary','','Project details and validation status'));
  details.append(create('p','',p.summary));
  details.append(create('p','','Validation / review status: '+p.status));
  article.append(details);
 }
 const actions=create('div','card-actions');
 const primary=actionLabels[p.id]||p.action||'Review project evidence';
 actions.append(link(primary,p.evidenceUrl));
 actions.append(link('View source for '+p.title,owner+p.repo));
 if(p.live)actions.append(link('Open project demonstration for '+p.title,p.live));
 article.append(actions);
 return article;
}
function renderDirectory(){
 const filter=document.getElementById('role-filter');
 const search=document.getElementById('project-search');
 const dir=document.getElementById('directory-grid');
 if(!filter||!search||!dir)return;
 const role=filter.value;
 const term=search.value.toLocaleLowerCase().trim();
 const filtered=projects.filter(p=>(role==='all'||p.roles.includes(role))&&[p.title,p.acronym||'',p.category,p.purpose||'',p.competencies||'',p.summary,p.evidence].join(' ').toLocaleLowerCase().includes(term));
 dir.replaceChildren(...filtered.map(p=>card(p,false)));
 const count=document.getElementById('result-count');
 if(count)count.textContent=filtered.length+' of '+projects.length+' portfolio directory entries shown';
 const empty=document.getElementById('empty-results');
 if(empty)empty.hidden=filtered.length!==0;
}
const featured=document.getElementById('featured-grid');
if(featured)featured.replaceChildren(...projects.filter(p=>featuredIds.has(p.id)).map(p=>card(p,true)));
if(document.getElementById('directory-grid')){
 const role=document.getElementById('role-filter');
 const search=document.getElementById('project-search');
 const reset=document.getElementById('clear-filters');
 role.addEventListener('change',renderDirectory);
 search.addEventListener('input',renderDirectory);
 reset.addEventListener('click',()=>{role.value='all';search.value='';renderDirectory();role.focus()});
 renderDirectory();
}
