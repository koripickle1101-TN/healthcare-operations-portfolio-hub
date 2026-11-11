'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const base='http://127.0.0.1:8766/';
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
   const context=await browser.newContext({viewport});
   const page=await context.newPage();
   const pageErrors=[];
   page.on('pageerror',error=>pageErrors.push(error.message));
   await page.goto(base+'analytics.html',{waitUntil:'domcontentloaded'});
   await page.locator('.kpi').first().waitFor();
   assert.equal(await page.locator('.kpi').count(),4);
   assert.match(await page.locator('.hero h1').innerText(),/Revenue flow\./);
   assert.equal(await page.locator('.mobilebar button').count(),6);
   const white=await page.locator('body').evaluate(el=>getComputedStyle(el).backgroundColor);
   assert.equal(white,'rgb(255, 255, 255)','Dashboard must have solid white canvas');
   const headingFont=await page.locator('.hero h1').evaluate(el=>getComputedStyle(el).fontFamily);
   assert.match(headingFont,/Instrument Sans/,'Editorial sans-serif heading font required');
   await page.locator('.mobilebar button[data-nav="denials"]').click({force:true});
   assert.match(await page.locator('main').innerText(),/Denial Intelligence/);
   await page.locator('[data-filter="payer"]').selectOption('Payer A');
   assert.ok(await page.locator('tr[data-case]').count()>0,'Missing real drilldown records');
   await page.locator('tr[data-case]').first().click();
   await page.locator('#caseform').waitFor();
   await page.locator('[data-filter="caseowner"]').selectOption('Billing');
   await page.locator('#caseform button[type="submit"]').click();
   const saved=await page.evaluate(()=>localStorage.getItem('careflow-demo-notes-v2'));
   assert.ok(saved&&saved.includes('Billing'),'Session browser-only decision was not saved');
   await page.locator('.mobilebar button[data-nav="scenario"]').click({force:true});
   const before=await page.locator('#scenarioResult').innerText();
   await page.locator('#reduce').evaluate(el=>{el.value='75';el.dispatchEvent(new Event('input',{bubbles:true}))});
   const after=await page.locator('#scenarioResult').innerText();
   assert.notEqual(before,after,'Scenario slider not reactive');
   await page.locator('.mobilebar button[data-nav="quality"]').click({force:true});
   assert.match(await page.locator('main').innerText(),/Data Integrity & QA/);
   assert.match(await page.locator('main').innerText(),/Unique claim IDs/);
   assert.equal(await page.locator('a.portfolio-return').getAttribute('href'),'index.html#featured');
   const widths=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(widths.document<=widths.viewport+2,'Dashboard has horizontal overflow '+JSON.stringify(widths));
   assert.deepEqual(pageErrors,[],'Uncaught JavaScript errors');
   await page.screenshot({path:'/tmp/careflow-editorial-'+viewport.width+'.png',fullPage:true});
   await context.close();
   console.log('PASS analytics interactive and editorial '+viewport.width);
  }
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exit(1)});
