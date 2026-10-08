#!/usr/bin/env node
'use strict';
// Execute the actual slide engine and CSS in headless Chrome/Chromium before deploying.
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {spawn,spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const candidates=[
 process.env.CHROME_BIN,'google-chrome','google-chrome-stable','chromium','chromium-browser'
].filter(Boolean);
const chrome=candidates.find(binary=>spawnSync(binary,['--version'],{stdio:'ignore'}).status===0);
if(!chrome){console.error('FAIL: Headless Chrome/Chromium is required for browser QA');process.exit(1);}
const fixture='<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="/styles.css"></head><body class="deckbody">'+
'<button id="completeBtn"></button><button id="notesBtn"></button><button id="fullBtn"></button>'+
'<aside class="teacher-panel" id="teacherPanel" hidden><p id="teacherText"></p></aside>'+
'<div class="deck" id="deck"></div><button id="backBtn"></button><span id="counter"></span><button id="nextBtn"></button>'+
['data.js',...Array.from({length:10},(_,i)=>'data-'+(i+1)+'.js'),'lesson.js']
 .map(f=>'<script src="/'+f+'"></script>').join('')+
'<script>'+
'(function(){'+
'const errors=[]; let allHidden=0;'+
'try {'+
'for(let n=0;n<slides.length;n++){'+
'  i=n;render();const s=slides[n];'+
'  for(const beat of s.querySelectorAll(".beat:not(.revealed)")) {'+
'    allHidden++;if(getComputedStyle(beat).display!=="none")errors.push("scene "+(n+1)+": an unrevealed answer is visible");'+
'  }'+
'}'+
'const index=slides.findIndex(s=>s.querySelector("h2")?.textContent.trim()==="What is a variable?");'+
'if(index<0)errors.push("Topic 1.2 variable slide missing");'+
'else{'+
'  i=index;render();const s=slides[index];'+
'  const model=s.querySelector(".topic12-variable-card");'+
'  const type=s.querySelector(".topic12-variable-type-row");'+
'  const definition=s.querySelector(".beat.conclusion");'+
'  if(!model||!type||!definition)errors.push("missing stable variable model or answer");'+
'  else {'+
'    if(s.querySelectorAll(".memory-board,.variable-profile").length)errors.push("duplicate memory representations");'+
'    if(getComputedStyle(type).display!=="none")errors.push("type leaked before reveal");'+
'    if(getComputedStyle(definition).display!=="none")errors.push("definition leaked before reveal");'+
'    next();'+
'    if(getComputedStyle(type).display==="none")errors.push("type not shown after reveal");'+
'    if(getComputedStyle(definition).display==="none")errors.push("definition not shown after reveal");'+
'    if(!type.classList.contains("revealed")||!definition.classList.contains("revealed")) errors.push("requires more than one click");'+
'    next();if(i===index)errors.push("duplicate reveal after full answer");'+
'  }'+
'}'+
'}catch(e){errors.push("browser QA exception: "+e.message)}'+
'const report={ok:errors.length===0,lessons:"u1-2",slides:slides.length,hiddenElementsChecked:allHidden,errors};'+
'const el=document.createElement("pre");el.id="browser-qa-result";el.textContent="BROWSER_QA_RESULT:"+JSON.stringify(report);'+
'document.body.appendChild(el);'+
'})();'+
'</script></body></html>';
const server=http.createServer((req,res)=>{
 const uri=new URL(req.url,'http://127.0.0.1');
 if(uri.pathname==='/qa'){
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
  res.end(fixture);return;
 }
 let file;
 try{file=path.resolve(root,'.'+decodeURIComponent(uri.pathname));}
 catch{res.writeHead(400);res.end();return;}
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404);res.end();return;}
 res.writeHead(200,{'Content-Type':file.endsWith('.css')?'text/css':'text/javascript','Cache-Control':'no-store'});
 fs.createReadStream(file).pipe(res);
});
server.listen(0,'127.0.0.1',()=>{
 const port=server.address().port;
 const args=['--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
  '--virtual-time-budget=3000','--dump-dom','http://127.0.0.1:'+port+'/qa?id=u1-2'];
 const child=spawn(chrome,args,{stdio:['ignore','pipe','pipe']});
 let stdout='',stderr='';
 child.stdout.on('data',chunk=>{stdout+=chunk.toString();});
 child.stderr.on('data',chunk=>{stderr+=chunk.toString();});
 const timer=setTimeout(()=>{child.kill('SIGKILL');},30000);
 child.on('error',e=>{clearTimeout(timer);console.error('FAIL: browser launch '+e.message);server.close();process.exitCode=1;});
 child.on('close',code=>{
  clearTimeout(timer);server.close();
  const m=stdout.match(/BROWSER_QA_RESULT:(\{[^<]+\})/);
  if(!m){console.error('FAIL: browser fixture did not run; exit '+code+' '+stderr.slice(-1200));process.exitCode=1;return;}
  let report;
  try{report=JSON.parse(m[1].replaceAll('&quot;','"').replaceAll('&amp;','&'));}
  catch(e){console.error('FAIL: malformed browser report: '+m[1].slice(0,400));process.exitCode=1;return;}
  console.log('Browser audit: '+report.slides+' slides; '+report.hiddenElementsChecked+' hidden answers checked');
  if(!report.ok){for(const e of report.errors)console.error('FAIL:',e);process.exitCode=1;}
  else console.log('PASS: Topic 1.2 initial state, one meaningful reveal, no duplicate table, and hidden-answer visibility');
 });
});
