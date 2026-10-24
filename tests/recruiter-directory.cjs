const assert=require('node:assert/strict');const {chromium}=require('playwright');const AxeBuilder=require('@axe-core/playwright').default;
const base='http://127.0.0.1:8766/';
(async()=>{const browser=await chromium.launch({headless:true,args:['--no-sandbox']});try{
for(const viewport of [{width:390,height:844},{width:768,height:1024},{width:1440,height:900}]){
const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base,{waitUntil:'networkidle'});
assert.equal(await page.locator('#featured-grid .recruiter-card').count(),4);
assert.equal(await page.locator('#directory-grid .recruiter-card').count(),8);
assert.match(await page.locator('#result-count').innerText(),/8 of 8/);
await page.locator('#role-filter').selectOption('authorization');assert.ok(await page.locator('#directory-grid .recruiter-card').count()>=2);
await page.locator('#project-search').fill('PARCS');assert.equal(await page.locator('#directory-grid .recruiter-card').count(),1);
await page.locator('#project-search').fill('no-such-project');assert.equal(await page.locator('#directory-grid .recruiter-card').count(),0);assert.equal(await page.locator('#empty-results').isVisible(),true);
await page.locator('#clear-filters').click();assert.equal(await page.locator('#directory-grid .recruiter-card').count(),10);
const widths=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:window.innerWidth}));assert.ok(widths.document<=widths.viewport+2,'Horizontal overflow: '+JSON.stringify(widths));
const links=await page.locator('.recruiter-card a').evaluateAll(els=>els.map(e=>({url:e.href,text:e.textContent})));assert.ok(links.length>=16);assert.ok(links.every(l=>l.url.startsWith('https://github.com/')));
const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();assert.equal(audit.violations.length,0,JSON.stringify(audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.slice(0,3).map(n=>n.target)}))));
assert.deepEqual(errors,[]);await page.screenshot({path:'/tmp/portfolio-hub-'+viewport.width+'.png',fullPage:true});await context.close();
console.log('PASS viewport '+viewport.width+' featured=4 directory=8 filters, links, accessibility, no overflow');
}
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
