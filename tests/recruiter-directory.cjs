'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const AxeBuilder=require('@axe-core/playwright').default;
const base='http://127.0.0.1:8766/';
const checkAxe=async(page,label)=>{
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
 assert.equal(audit.violations.length,0,label+': '+JSON.stringify(audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.slice(0,3).map(n=>n.target)}))));
};
const noOverflow=async(page,label)=>{
 const dims=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
 assert.ok(dims.scroll<=dims.viewport+2,label+' horizontal overflow '+JSON.stringify(dims));
};
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
 for(const width of [320,390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:890}});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base,{waitUntil:'domcontentloaded'});
  assert.match(await page.title(),/Kori Pickle/);
  assert.equal(await page.locator('h1').innerText(),'Healthcare Operations.\nA Human Perspective.');
  assert.match(await page.locator('h1').evaluate(e=>getComputedStyle(e).fontFamily),/Bodoni Moda/);
  assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(255, 255, 255)');
  assert.equal(await page.locator(':root').evaluate(e=>getComputedStyle(e).getPropertyValue('--tennessee-orange').trim().toUpperCase()),'#FF8200');
  assert.equal(await page.locator('#featured-grid .recruiter-card').count(),4);
  assert.equal(await page.locator('#directory-grid').count(),0,'Full directory must be on a separate page');
  assert.equal(await page.locator('#case-library .case-library-topic-list li').count(),4);
  assert.equal(await page.locator('#case-library .case-library-topic-count').allTextContents().then(x=>x.join(',')),'04,02,03,03');
  assert.equal(await page.locator('a.case-library-launch').getAttribute('href'),'https://public.flourish.studio/visualisation/30850574/');
  assert.match(await page.locator('#methodology').innerText(),/DETECT/i);
  assert.match(await page.locator('#publications').innerText(),/Healthcare Operations/);
  assert.ok(await page.locator('a[href="https://www.linkedin.com/in/kori-pickle"]').count()>=2);
  for(const name of ['Eligibility Verification Intelligence System','Prior Authorization Command System','Denial Prevention Intelligence System','Silent Breakpoint Intelligence']){
   assert.equal(await page.locator('#featured-grid h3').filter({hasText:name}).count(),1,'Missing flagship '+name);
  }
  if(width<=1050){
   const toggle=page.locator('#site-nav-toggle');
   assert.equal(await toggle.isVisible(),true);
   assert.equal(await page.locator('#primary-nav-links').isVisible(),false);
   await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');
   await page.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');
   await toggle.click();await page.locator('#primary-nav-links a[href="projects.html"]').click();
   await page.waitForURL('**/projects.html');
  }else{
   assert.equal(await page.locator('#site-nav-toggle').isVisible(),false);
   await page.goto(base+'projects.html',{waitUntil:'domcontentloaded'});
  }
  assert.match(await page.locator('h1').innerText(),/Healthcare Operations/);
  assert.equal(await page.locator('#directory-grid .recruiter-card').count(),10);
  assert.match(await page.locator('#result-count').innerText(),/10 of 10/);
  for(const c of await page.locator('#directory-grid .recruiter-card').all()){
   assert.ok((await c.locator('h3').innerText()).trim().length>=10);
   assert.ok((await c.locator('.card-purpose').innerText()).length>35);
   assert.ok((await c.locator('.card-competencies').innerText()).length>20);
   const links=c.locator('.card-actions a');
   assert.ok(await links.count()>=2);
   assert.match(await links.first().getAttribute('href'),/^https:\/\/github\.com\/koripickle1101-TN\//);
   assert.match(await links.nth(1).getAttribute('href'),/^https:\/\/github\.com\/koripickle1101-TN\//);
   assert.equal(await c.locator('.card-details summary').count(),1);
  }
  await page.locator('#project-search').fill('EVIS');
  assert.equal(await page.locator('#directory-grid .recruiter-card').count(),1);
  await page.locator('#project-search').fill('no-such-project');
  assert.equal(await page.locator('#directory-grid .recruiter-card').count(),0);
  assert.equal(await page.locator('#empty-results').isVisible(),true);
  await page.locator('#clear-filters').click();
  assert.equal(await page.locator('#directory-grid .recruiter-card').count(),10);
  await page.locator('#role-filter').selectOption('authorization');
  assert.ok(await page.locator('#directory-grid .recruiter-card').count()>=2);
  await page.locator('#project-search').fill('PARCS');
  assert.equal(await page.locator('#directory-grid .recruiter-card').count(),1);
  await page.locator('#clear-filters').click();
  assert.equal(await page.locator('#directory-grid .recruiter-card').count(),10);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://healthcare-operations-portfolio-hub.vercel.app/projects.html');
  await noOverflow(page,'projects '+width);
  await checkAxe(page,'projects '+width);
  await page.screenshot({path:'/tmp/portfolio-projects-'+width+'.png',fullPage:true});
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await noOverflow(page,'home '+width);
  await checkAxe(page,'home '+width);
  await page.screenshot({path:'/tmp/portfolio-home-'+width+'.png',fullPage:true});
  assert.deepEqual(errors,[],'Uncaught page errors '+width);
  await context.close();
  console.log('PASS home & projects at '+width+'px: four flagships; ten directory entries; search; filters; menu; axe; responsive layout');
 }
 const context=await browser.newContext({viewport:{width:390,height:844}});
 const resume=await context.newPage();
 await resume.goto(base+'resume.html',{waitUntil:'domcontentloaded'});
 const text=await resume.locator('main').innerText();
 for(const employer of ['Sonic','McDonald','The Millstone','Hampton Inn','Krystal','Vifan','Taco Bell'])assert.ok(text.includes(employer),'Historical employer missing: '+employer);
 assert.match(text,/Asana Academy/);
 assert.match(text,/in progress/i);
 assert.equal(await resume.locator('button[onclick="window.print()"]').count(),1);
 await resume.emulateMedia({media:'print'});
 const pdf=await resume.pdf({format:'Letter',printBackground:true});
 assert.ok(pdf.length>4000);
 assert.equal(pdf.subarray(0,4).toString(),'%PDF');
 await resume.emulateMedia({media:'screen'});
 await noOverflow(resume,'résumé');
 await checkAxe(resume,'résumé');
 await resume.screenshot({path:'/tmp/portfolio-resume-390.png',fullPage:true});
 console.log('PASS résumé: historical employment, Asana credential, PDF output, axe and no overflow');
 await context.close();
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
