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
'if(new URLSearchParams(location.search).get("id")==="u1-2") {'+
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
'} else if(new URLSearchParams(location.search).get("id")==="u1-3") {'+
'  const t=(name)=>slides.findIndex(s=>s.querySelector("h2")?.textContent.trim()===name);'+
'  const esc=t("Use the escape sequences");'+
'  if(esc<0)errors.push("Topic 1.3 escape-sequence lesson missing");'+
'  else {'+
'    i=esc;render(); const scene=slides[esc];'+
'    const slash=String.fromCharCode(92);'+
'    const code=scene.querySelector("pre.code")?.textContent||"";'+
'    if(!code.includes(slash+"\\"Go!"+slash+"\\""))errors.push("the Java quote-escape sample lost its backslashes");'+
'    if(!code.includes("C:"+slash+slash+"training"))errors.push("the Java path sample needs doubled backslashes");'+
'    if(!code.includes("Lap 1"+slash+"nLap 2"))errors.push("the Java newline escape sample is wrong");'+
'    const out=scene.querySelector(".beat.console-box");'+
'    if(!out||getComputedStyle(out).display!=="none")errors.push("escape-sequence OUTPUT leaked before prediction");'+
'    else {'+
'      next();'+
'      if(getComputedStyle(out).display==="none")errors.push("escape-sequence OUTPUT missing after reveal");'+
'      if(!out.textContent.includes("C:"+slash+"training"))errors.push("displayed path output lost backslash");'+
'    }'+
'  }'+
'  const practice=t("Practice 2 — remainder sprint");'+
'  if(practice<0)errors.push("Topic 1.3 in-class remainder quiz missing");'+
'  else {'+
'    i=practice;render(); const scene=slides[practice];'+
'    const answer=scene.querySelector(".beat.lesson13-answer-bar");'+
'    if(!answer||getComputedStyle(answer).display!=="none")errors.push("quiz answer is visible before reveal");'+
'    else {next();if(getComputedStyle(answer).display==="none")errors.push("quiz answer did not reveal in one click");next();if(i===practice)errors.push("duplicate unnecessary remainder quiz reveal");}'+
'  }'+
'  const challenge=t("Coding challenge — build a pay calculator");'+
'  if(challenge<0)errors.push("Topic 1.3 pay calculator challenge missing");'+
'  else if(slides[challenge].querySelector(".console-box,.eval-step,.lesson13-answer-bar"))errors.push("pay calculator challenge leaked its solution");'+
'} else if(new URLSearchParams(location.search).get("id")==="u1-4") {'+
'  const t=(name)=>slides.findIndex(s=>s.querySelector("h2")?.textContent.trim()===name);'+
'  const assign=t("Assignment is not mathematical equality");'+
'  if(assign<0)errors.push("Topic 1.4 directional assignment lesson missing");'+
'  else {'+
'    i=assign;render();const scene=slides[assign];'+
'    const box=scene.querySelector(".memory-board"),before=scene.querySelector(".state-old"),after=scene.querySelector(".state-new");'+
'    if(!box||scene.querySelectorAll(".memory-board").length!==1||!before||!after) errors.push("Assignment must use one stable memory box");'+
'    else {'+
'      if(getComputedStyle(after).display!=="none")errors.push("new assignment value visible before reveal");'+
'      next();'+
'      if(getComputedStyle(after).display==="none"||getComputedStyle(before).display!=="none")errors.push("assignment reveal did not update the SAME memory box");'+
'      next();if(i===assign)errors.push("duplicate assignment reveal");'+
'    }'+
'  }'+
'  const evaluate=t("First evaluate the RIGHT side");'+
'  if(evaluate<0)errors.push("Topic 1.4 evaluate-first lesson missing");'+
'  else {'+
'    i=evaluate;render();const scene=slides[evaluate];'+
'    const expr=scene.querySelector(".beat.eval-step"),after=scene.querySelector(".state-new"),output=scene.querySelector(".beat.console-box");'+
'    if(!expr||!after||!output)errors.push("missing expression, memory update or output");'+
'    else {'+
'      if(getComputedStyle(output).display!=="none"||getComputedStyle(after).display!=="none")errors.push("state or output leaked before prediction");'+
'      next();if(getComputedStyle(expr).display==="none"||getComputedStyle(after).display!=="none")errors.push("first reveal should ONLY evaluate expression");'+
'      next();if(getComputedStyle(after).display==="none"||getComputedStyle(output).display!=="none")errors.push("second reveal should update memory without printing yet");'+
'      next();if(getComputedStyle(output).display==="none")errors.push("third reveal should display console output");'+
'    }'+
'  }'+
'  const practice=t("Practice 1 — three short traces");'+
'  if(practice<0)errors.push("Topic 1.4 assignment trace practice missing");'+
'  else {'+
'    i=practice;render();const ans=slides[practice].querySelector(".beat.assignment-answer-grid");'+
'    if(!ans||getComputedStyle(ans).display!=="none")errors.push("assignment practice answer leaked");'+
'    else {next();if(getComputedStyle(ans).display==="none")errors.push("assignment practice answers failed to reveal");next();if(i===practice)errors.push("assignment practice duplicated reveal");}'+
'  }'+
'  const challenge=t("Coding challenge — Pet Years");'+
'  if(challenge<0)errors.push("Pet Years challenge missing");'+
'  else if(slides[challenge].querySelector("pre.code,.console-box,.assignment-answer-grid"))errors.push("Pet Years prompt should not reveal worked solution");'+
'  const review=t("Review the Pet Years program");'+
'  if(review<0)errors.push("Pet Years solution review missing");'+
'  else{'+
'    i=review;render();const solve=slides[review].querySelector(".beat pre.code");'+
'    if(!solve||getComputedStyle(solve.parentElement).display!=="none")errors.push("Pet Years worked solution visible before student attempt");'+
'    else{next();if(getComputedStyle(solve.parentElement).display==="none")errors.push("Pet Years answer failed to reveal");}'+
'  }'+
'} else if(new URLSearchParams(location.search).get("id")==="u1-5") {'+
'  const t=(name)=>slides.findIndex(s=>s.querySelector("h2")?.textContent.trim()===name);'+
'  const casting=t("Cast BEFORE division");'+
'  if(casting<0)errors.push("Topic 1.5 pre-division cast scene missing");'+
'  else {'+
'    i=casting;render();const scene=slides[casting];'+
'    const ev=scene.querySelector(".beat.eval-step"),answer=scene.querySelector(".beat .console-box")?.closest(".beat");'+
'    if(!ev||!answer||getComputedStyle(ev).display!=="none"||getComputedStyle(answer).display!=="none")errors.push("casting answer leaked before prediction");'+
'    else{next();if(getComputedStyle(ev).display==="none"||getComputedStyle(answer).display!=="none")errors.push("first reveal should show cast only");next();if(getComputedStyle(answer).display==="none")errors.push("second reveal should show 7.5");next();if(i===casting)errors.push("extra meaningless casting reveal");}'+
'  }'+
'  const late=t("Casting AFTER division is too late");'+
'  if(late<0||!slides[late].textContent.includes("7.0"))errors.push("post-division cast contrast missing");'+
'  const quiz=t("Practice 1 — cast and predict");'+
'  if(quiz<0)errors.push("Topic 1.5 casting quiz missing");'+
'  else {i=quiz;render();const ans=slides[quiz].querySelector(".beat.casting-answer-grid");'+
'    if(!ans||getComputedStyle(ans).display!=="none")errors.push("casting quiz answers leaked before prediction");'+
'    else{next();if(getComputedStyle(ans).display==="none")errors.push("casting quiz answers should reveal together");next();if(i===quiz)errors.push("duplicate casting quiz answer reveal");}'+
'  }'+
'  const challenge=t("Coding challenge — average 3 scores");'+
'  if(challenge<0)errors.push("Average 3 Scores challenge missing");'+
'  else if(slides[challenge].querySelector("pre.code,.console-box,.casting-answer-grid"))errors.push("Average challenge leaks solution");'+
'  const solution=t("Review — average 3 scores");'+
'  if(solution<0)errors.push("Average challenge worked solution missing");'+
'  else {i=solution;render();const pre=slides[solution].querySelector(".beat pre.code");'+
'    if(!pre||getComputedStyle(pre.parentElement).display!=="none")errors.push("Average code visible before reveal");'+
'    else {next();if(getComputedStyle(pre.parentElement).display==="none")errors.push("Average code did not reveal");}'+
'  }'+
'}'+
'}catch(e){errors.push("browser QA exception: "+e.message)}'+
'const report={ok:errors.length===0,lessons:new URLSearchParams(location.search).get("id"),slides:slides.length,hiddenElementsChecked:allHidden,errors};'+
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
  '--virtual-time-budget=3000','--dump-dom','http://127.0.0.1:'+port+'/qa?id='+(process.argv[2]||'u1-2')];
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
  else console.log('PASS: '+report.lessons+' browser presentation QA (hidden answers, exact escape output, required exercises)');
 });
});
