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
['data.js',...Array.from({length:10},(_,i)=>'data-'+(i+1)+'.js'),'practice-banks.js','lesson.js']
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
'} else if(new URLSearchParams(location.search).get("id")==="u1-6") {'+
'  const t=(title)=>slides.findIndex(s=>s.querySelector("h2")?.textContent.trim()===title);'+
'  const memory=t("Follow the variable, not the abbreviation");'+
'  if(memory<0)errors.push("Topic 1.6 memory update slide missing");'+
'  else {'+
'    i=memory;render();const scene=slides[memory];'+
'    const boxes=scene.querySelectorAll(".memory-board");'+
'    const before=scene.querySelector(".state-old"),after=scene.querySelector(".state-new"),clue=scene.querySelector(".beat.conclusion");'+
'    if(boxes.length!==1||!before||!after||!clue)errors.push("compound assignment must use ONE stable memory box");'+
'    else {'+
'      if(getComputedStyle(after).display!=="none"||getComputedStyle(clue).display!=="none")errors.push("compound update or explanation visible too early");'+
'      next();if(getComputedStyle(after).display==="none"||getComputedStyle(before).display!=="none"||getComputedStyle(clue).display==="none")errors.push("one click must update the SAME box AND reveal explanation");'+
'      next();if(i===memory)errors.push("extra redundant compound memory reveal");'+
'    }'+
'  }'+
'  const grouping=t("A compound assignment uses the entire RIGHT side");'+
'  if(grouping<0)errors.push("RHS evaluation scene missing");'+
'  else {'+
'    i=grouping;render();const scene=slides[grouping];'+
'    const compute=scene.querySelector(".beat.eval-step"),state=scene.querySelector(".beat .memory-board");'+
'    if(!compute||!state||getComputedStyle(compute).display!=="none"||getComputedStyle(state.closest(".beat")).display!=="none")errors.push("RHS computation or answer visible before reveal");'+
'    else {next();if(getComputedStyle(compute).display==="none"||getComputedStyle(state.closest(".beat")).display!=="none")errors.push("first reveal must ONLY evaluate entire RHS");next();if(getComputedStyle(state.closest(".beat")).display==="none")errors.push("second reveal must show new stored value");}'+
'  }'+
'  const wrong=t("Practice 2 — the shortcut spelling matters");'+
'  if(wrong<0)errors.push("=+ debugging practice missing");'+
'  else {i=wrong;render();const scene=slides[wrong],answer=scene.querySelector(".beat");'+
'    if(!scene.textContent.includes("=+ 4")||!answer||getComputedStyle(answer).display!=="none")errors.push("=+ debug prompt or answer gating broken");'+
'    else {next();if(getComputedStyle(answer).display==="none")errors.push("=+ bug solution not revealed");next();if(i===wrong)errors.push("=+ debug repeats the same answer");}'+
'  }'+
'  const maze=t("Operators Maze — trace without a computer");'+
'  if(maze<0)errors.push("Operators Maze tracing challenge missing");'+
'  else {i=maze;render();const answers=slides[maze].querySelector(".beat.compound-trace");'+
'    if(!answers||getComputedStyle(answers).display!=="none")errors.push("Maze answer shown before tracing");'+
'    else {next();if(getComputedStyle(answers).display==="none")errors.push("Maze final trace failed to reveal");}'+
'  }'+
'  const challenge=t("Coding challenge — training scorekeeper");'+
'  if(challenge<0)errors.push("TrainingScore programming task missing");'+
'  else if(slides[challenge].querySelector("pre.code,.console-box,.compound-answers"))errors.push("TrainingScore task leaked completed program");'+
'  const worked=t("Review — training scorekeeper");'+
'  if(worked<0)errors.push("TrainingScore worked solution missing");'+
'  else {i=worked;render();const answer=slides[worked].querySelector(".beat"),code=slides[worked].querySelector(".beat pre.code"),output=slides[worked].querySelector(".beat .console-box");'+
'    if(!answer||!code||!output||getComputedStyle(answer).display!=="none")errors.push("TrainingScore answer visible before reveal");'+
'    else {next();if(getComputedStyle(answer).display==="none"||!output.textContent.includes("3"))errors.push("TrainingScore answer/expected output failed");next();if(i===worked)errors.push("duplicate full-code reveal");}'+
'  }'+
'} else if(["u1-7","u1-8","u1-9","p-1-7-1-9"].includes(new URLSearchParams(location.search).get("id"))) {'+
' const id=new URLSearchParams(location.search).get("id");'+
' const t=(title)=>slides.findIndex(s=>s.querySelector("h2")?.textContent.trim()===title);'+
' if(id==="u1-7") {'+
'   const q=t("Read one API entry instead of guessing");'+
'   if(q<0)errors.push("Topic 1.7 API usage exercise missing");'+
'   else {i=q;render();const answer=slides[q].querySelector(".beat");'+
'     if(!answer||getComputedStyle(answer).display!=="none")errors.push("API call leaked before reveal");'+
'     else {next();if(getComputedStyle(answer).display==="none"||!answer.textContent.includes("forward(80)"))errors.push("Turtle method example not revealed");}}'+
'   const challenge=t("Coding challenge — draw with Turtle");'+
'   if(challenge<0)errors.push("Turtle drawing challenge missing");'+
'   else if(slides[challenge].querySelector(".beat"))errors.push("Turtle prompt contains premature answer reveal");'+
' }'+
' if(id==="u1-8") {'+
'   const q=t("A comment does not execute");'+
'   if(q<0)errors.push("Topic 1.8 comment output question missing");'+
'   else {i=q;render();const ans=slides[q].querySelector(".beat");'+
'     if(!ans||getComputedStyle(ans).display!=="none")errors.push("comment output leaked");'+
'     else {next();if(getComputedStyle(ans).display==="none"||!ans.textContent.includes("7"))errors.push("comment output did not reveal");}}'+
'   const contract=t("Document the contract in Javadoc");'+
'   if(contract<0||!slides[contract].textContent.includes("Precondition: divisor"))errors.push("Javadoc precondition teaching missing");'+
' }'+
' if(id==="u1-9") {'+
'   const q=t("The signature is NOT the entire header");'+
'   if(q<0||!slides[q].textContent.includes("ORDERED TYPES"))errors.push("Method signature definition missing");'+
'   const overload=t("Changing only the return type is NOT overloading");'+
'   if(overload<0)errors.push("Duplicate signature counterexample missing");'+
'   else {i=overload;render();const answer=slides[overload].querySelector(".beat");'+
'     if(!answer||getComputedStyle(answer).display!=="none")errors.push("overload resolution leaked");'+
'     else {next();if(getComputedStyle(answer).display==="none")errors.push("overload answer missing");}}'+
'   const review=t("Review the parameterized song");'+
'   if(review<0)errors.push("Song solution missing");'+
'   else if(getComputedStyle(slides[review].querySelector(".beat")).display!=="none")errors.push("Song code leaked before attempt");'+
' }'+
' if(id==="p-1-7-1-9") {'+
'    const questions=slides.filter(s=>/^Q\\d+ —/.test(s.querySelector("h2")?.textContent.trim()||""));'+
'    if(questions.length!==44)errors.push("Week 5 bank must provide all 44 full AP-style questions; found "+questions.length);'+
'    for(const [k,slide] of questions.entries()) {'+
'      const ans=slide.querySelector(".beat.week5-answer");'+
'      if(!ans||getComputedStyle(ans).display!=="none")errors.push("Q"+(k+1)+" answer visible before reveal");'+
'      if(slide.querySelectorAll(".week5-options>div").length!==4)errors.push("Q"+(k+1)+" requires four choices");'+
'    }'+
'    if(questions.length){i=slides.indexOf(questions[0]);render();const ans=questions[0].querySelector(".beat");'+
'      next();if(getComputedStyle(ans).display==="none")errors.push("First MCQ answer failed to reveal");next();if(i===slides.indexOf(questions[0]))errors.push("First MCQ has duplicate answer reveal");'+
'    }'+
'    const all=slides.map(x=>x.textContent).join(" ");'+
'    if(!all.includes("AP Classroom")||!all.includes("CompSci.Rocks"))errors.push("Official and public practice source links missing");'+
'    if(slides.some(x=>/Homework|Exit check|Concept summary/.test(x.querySelector("h2")?.textContent||"")))errors.push("Week 5 practice must contain only questions and question sources");'+
' }'+
'}'+
'} else if(["p-foundation-1","p-foundation-2","p-1-1-1-3","p-1-4-1-6"].includes(new URLSearchParams(location.search).get("id"))) {'+
' const id=new URLSearchParams(location.search).get("id");'+
' const expected={"p-foundation-1":24,"p-foundation-2":25,"p-1-1-1-3":38,"p-1-4-1-6":42}[id];'+
' const questions=slides.filter(s=>/^Q\d+ —/.test(s.querySelector("h2")?.textContent.trim()||""));'+
' if(questions.length!==expected)errors.push("Wrong complete retake bank count: "+id+" found "+questions.length+" expected "+expected);'+
' const sourceSlides=slides.filter(s=>s.querySelector("h2")?.textContent.includes("question sources")||s.querySelector("h2")?.textContent.includes("Reference sources"));'+
' if(sourceSlides.length===0)errors.push("Retake bank missing original question-source links");'+
' for(const [k,scene] of questions.entries()) {'+
'   const answers=scene.querySelectorAll(".beat.week5-answer");'+
'   const choices=scene.querySelectorAll(".week5-options>div");'+
'   if(answers.length!==1||getComputedStyle(answers[0]).display!=="none")errors.push("Question "+(k+1)+" has leaked/missing answer");'+
'   if(choices.length!==4)errors.push("Question "+(k+1)+" must show four choices");'+
'   if(!/^ANSWER [ABCD]/.test(answers[0]?.textContent||""))errors.push("Question "+(k+1)+" missing answer key");'+
' }'+
' if(questions.length){i=slides.indexOf(questions[0]);render();const answer=questions[0].querySelector(".beat");'+
'   next();if(getComputedStyle(answer).display==="none")errors.push("Answer failed to reveal in one click");'+
'   next();if(i===slides.indexOf(questions[0]))errors.push("Unnecessary second answer reveal");'+
' }'+
' const forbidden=slides.filter(s=>/^(Retrieval|Debug|Homework|Exit check|Resources|Error log|Write)$/.test(s.querySelector("h2")?.textContent.trim()||""));'+
' if(forbidden.length)errors.push("Old practice template not fully replaced");'+
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
