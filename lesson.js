const D=window.COURSE_DATA;
const params=new URLSearchParams(location.search);
const id=params.get('id');
const L=D.lessons.find(x=>x.id===id)||D.optional.find(x=>x.id===id);
const deck=document.querySelector('#deck');
let i=0;

function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function note(text){return '<div class="teacher">'+esc(text)+'</div>';}
function slide(title,body,teacher=''){
  return '<section class="slide"><div class="slidecontent"><h2>'+title+'</h2>'+body+note(teacher)+'</div></section>';
}
function cards(items){return '<div class="cards">'+items.map((x,k)=>'<div class="card"><h3>'+String(k+1).padStart(2,'0')+'</h3><p>'+esc(x)+'</p></div>').join('')+'</div>';}
function resources(rs){return '<div class="resources-grid">'+(rs||[]).map(r=>'<div class="resourcecard"><span class="kind">'+esc(r.kind)+'</span><p><a target="_blank" rel="noopener" href="'+r.url+'">'+esc(r.label)+'</a></p></div>').join('')+'</div>';}

function buildVariablesLesson(l){
  const currentIndex=D.lessons.findIndex(x=>x.id===l.id);
  const prev=currentIndex>0?D.lessons[currentIndex-1]:null;
  const prevTask=prev?.homework||'Review the previous lesson.';
  const s=[];

  s.push('<section class="slide active"><div class="slidecontent"><p class="lesson-meta">WEEK '+l.week+' · '+esc(l.sessionInWeek)+' · AP TOPIC 1.2</p><h1>Variables<br>and Data Types</h1><p class="big muted">A lesson about values, names, and choosing the right kind of data.</p>'+note('Today, do not begin with definitions. Let Oscar experience variables as changing stored values first. The formal vocabulary comes after the first prediction cycle.')+'</div></section>');

  s.push(slide('Before we start',
    '<p class="prompt-label">FROM THE PREVIOUS LESSON</p><p class="q">'+esc(prevTask)+'</p><div class="beat conclusion"><p>Show one example before explaining it.</p></div>',
    'Ask to see the previous work. If the compiler/error distinction from Topic 1.1 is shaky, repair it briefly. Then move on.'));

  s.push(slide('What will this print?',
    '<pre class="code"><span class="code-line">int a = 5;</span><span class="code-line">int b = 3;</span><span class="code-line focus-line">System.out.println(a + b);</span></pre><p class="q">Make a prediction before we reveal anything.</p>'+
    '<div class="beat value-board"><div class="name">a</div><div class="value">5</div></div>'+
    '<div class="beat value-board"><div class="name">b</div><div class="value">3</div></div>'+
    '<div class="beat equation">a + b → 5 + 3</div>'+
    '<div class="beat equation">5 + 3 → 8</div>'+
    '<div class="beat conclusion"><p><b>Output:</b> 8</p></div>',
    'Do not reveal until Oscar commits to an answer. After each reveal, ask what changed in his mental picture. The goal is to connect the variable name to the value currently stored there.'));

  s.push(slide('Change one thing',
    '<pre class="code"><span class="code-line">int a = <span class="old">5</span><span class="beat new">8</span>;</span><span class="code-line">int b = 3;</span><span class="code-line focus-line">System.out.println(a + b);</span></pre>'+
    '<p class="q">Now what will the program print?</p>'+
    '<div class="beat equation">a + b → 8 + 3</div>'+
    '<div class="beat equation">8 + 3 → 11</div>'+
    '<div class="beat conclusion"><p>The expression uses the <b>current values</b> stored in the variables.</p></div>',
    'Pause after revealing the new 8. Ask whether the println line changed. The important insight: behavior changes because stored state changed, not because the output statement changed.'));

  s.push(slide('So what is a variable?',
    '<p class="q">Based on what you just saw, how would you describe <code>a</code>?</p>'+
    '<div class="beat conclusion"><p>A variable is a <b>named storage location</b> whose value can be used and, in many cases, changed.</p></div>'+
    '<div class="beat"><div class="value-board"><div class="name">name</div><div class="value">a</div><div class="name">type</div><div class="value">int</div><div class="name">current value</div><div class="value">8</div></div></div>',
    'Let Oscar propose wording first. Then reveal the formal language. Avoid treating the definition as the beginning of learning; it is a label for the experience he just had.'));

  s.push(slide('Can every value go into every variable?',
    '<pre class="code"><span class="code-line focus-line">int raceTime = 37.8;</span></pre><p class="q">Do you think this compiles?</p>'+
    '<div class="beat conclusion"><p><b>No.</b> <code>int</code> represents whole-number values. <code>37.8</code> has a fractional part.</p></div>'+
    '<div class="beat"><pre class="code"><span class="code-line focus-line">double raceTime = 37.8;</span></pre></div>'+
    '<div class="beat conclusion"><p>The <b>type</b> tells Java what kind of value the variable is meant to store and which operations make sense.</p></div>',
    'Ask for a prediction before revealing the compile issue. Keep the rule practical: int for whole numbers; double when fractional numeric values matter.'));

  s.push(slide('Choose the type',
    '<p class="prompt-label">ONE AT A TIME</p><p class="q">What type would you choose for each value?</p>'+
    '<div class="beat card"><h3>NUMBER OF LAPS</h3><p>12</p><p class="muted">Choose before the next reveal.</p></div>'+
    '<div class="beat conclusion"><p><code>int laps = 12;</code></p></div>'+
    '<div class="beat card"><h3>RACE TIME</h3><p>37.8 seconds</p></div>'+
    '<div class="beat conclusion"><p><code>double time = 37.8;</code></p></div>'+
    '<div class="beat card"><h3>PERSONAL BEST?</h3><p>yes / no</p></div>'+
    '<div class="beat conclusion"><p><code>boolean personalBest = true;</code></p></div>',
    'Each reveal is a fresh question. Do not race through them. Ask “why this type?” after the student chooses.'));

  s.push(slide('One more kind of value',
    '<p class="q">What about a name such as <b>Oscar</b>?</p>'+
    '<div class="beat"><pre class="code"><span class="code-line focus-line">String athlete = "Oscar";</span></pre></div>'+
    '<div class="beat conclusion"><p><code>String</code> stores text. Notice that it begins with a capital letter because it is a class type, not one of Java’s primitive types.</p></div>',
    'Keep the distinction light. Today Oscar only needs to recognize int/double/boolean as primitive types and String as a commonly used reference type. Do not expand into memory-model details yet.'));

  s.push(slide('Predict before running',
    '<pre class="code"><span class="code-line">int laps = 4;</span><span class="code-line">laps = 6;</span><span class="code-line focus-line">System.out.println(laps);</span></pre><p class="q">What prints: 4 or 6?</p>'+
    '<div class="beat equation">laps → 6</div>'+
    '<div class="beat conclusion"><p>Assignment replaces the variable’s previous value with a new compatible value.</p></div>',
    'This is the key state-change check. If Oscar says 4, go back to the variable box idea rather than explaining assignment abstractly.'));

  s.push(slide('Your turn',
    '<p class="q">Model a training session with four variables.</p>'+
    '<div class="beat cards"><div class="card"><h3>01</h3><p>athlete name</p></div><div class="card"><h3>02</h3><p>laps completed</p></div><div class="card"><h3>03</h3><p>average lap time</p></div></div>'+
    '<div class="beat card"><h3>04</h3><p>whether today was a personal best</p></div>'+
    '<div class="beat conclusion"><p>For each variable: choose a name, choose a type, choose a sample value, and explain your choice.</p></div>',
    'Oscar should do the typing. Prompt with “What kind of information is this?” rather than giving the Java type.'));

  s.push(slide('AP connection',
    '<p class="big">AP questions often hide a simple type or state question inside a longer code segment.</p>'+
    '<div class="beat conclusion"><p>When tracing code, keep asking: <b>What value is stored here right now?</b></p></div>'+
    '<div class="beat conclusion"><p>And: <b>Does this value match the variable’s type?</b></p></div>',
    'Make the AP link after the concept is understood. Do not let exam terminology become the lesson itself.'));

  s.push(slide('Exit check',
    '<p class="q">Answer without looking back.</p>'+
    '<div class="beat card"><h3>01</h3><p>What does a variable store?</p></div>'+
    '<div class="beat card"><h3>02</h3><p>Why is <code>double</code> better than <code>int</code> for 37.8?</p></div>'+
    '<div class="beat card"><h3>03</h3><p>If <code>int x = 3;</code> then <code>x = 9;</code>, what is x now?</p></div>',
    'Do not reveal all exit questions at once. Let each one appear after the previous answer. Record hesitation for the next retrieval warm-up.'));

  s.push(slide('Homework',
    '<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>Bring one example you are unsure about. The next lesson will start there.</p></div>',
    'Keep it short. Consistency matters more than volume.'));

  s.push(slide('Free resources',resources(l.resources),
    'Use these after the lesson for reinforcement. Do not substitute watching for predicting, tracing, and writing code.'));

  return s.join('');
}

function buildLesson(l){
 const s=[];const currentIndex=D.lessons.findIndex(x=>x.id===l.id);const prev=currentIndex>0?D.lessons[currentIndex-1]:null;
 s.push('<section class="slide active"><div class="slidecontent"><p class="lesson-meta">Week '+(l.week||'Optional')+' · '+esc(l.sessionInWeek||'Enrichment')+' · '+esc(l.apTopic)+'</p><h1>'+esc(l.title)+'</h1><p class="big muted">'+esc(l.subtitle||'')+'</p>'+note('Start by checking the previous work before explaining anything new.')+'</div></section>');
 if(prev){const prevTask=prev.homework||'Review the previous session and bring one question or uncertainty.';s.push(slide('Previous work','<p class="q">'+esc(prevTask)+'</p><div class="beat conclusion"><p>Show → Explain → Repair</p></div>','Treat this as a diagnostic conversation. Repair one misconception before moving on.'));}
 s.push(slide('Retrieval warm-up','<p class="q">Without notes: what idea from the previous lesson could help with today’s topic?</p>','Use 3–5 minutes diagnostically.'));
 s.push(slide('Today’s mental model','<p class="big">'+esc(l.model)+'</p>','Keep the mental model short enough to restate in the student’s own words.'));
 if(l.code)s.push(slide('Predict first','<pre class="code">'+esc(l.code)+'</pre><p class="q">What will happen? Commit to a prediction before moving on.</p><div class="beat conclusion"><p>Now trace the program state line by line.</p></div>','Do not explain the code before the prediction.'));
 s.push(slide('Core ideas',cards(l.points||[]),'Ask why after each point. Prefer a concrete example over a definition.'));
 s.push(slide('Think','<p class="q">'+esc(l.think)+'</p><div class="beat conclusion"><p>Use a tiny test case if you are unsure.</p></div>','Wait for a prediction and reason before revealing the prompt.'));
 s.push(slide('Hands-on activity','<p class="big">'+esc(l.activity)+'</p>','Oscar should do the typing or tracing. Give hints before code.'));
 s.push(slide('AP connection','<p class="big">'+esc(l.apConnection||'This supports current AP CSA code reasoning.')+'</p>','Connect to AP after the underlying concept is understood.'));
 s.push(slide('Exit check',cards(['Explain the mental model in your own words.','Give one common mistake.','What would you test to know the code is correct?']),'Reveal one question at a time if the slide contains beats in future revisions.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p>','The next lesson should begin by checking this.'));
 s.push(slide('Free resources',resources(l.resources),'Use resources for reinforcement after an attempt.'));
 return s.join('');
}

function buildPractice(l){
 const cover=l.covers||[],s=[];
 s.push('<section class="slide active"><div class="slidecontent"><p class="lesson-meta">Week '+l.week+' · Practice</p><h1>'+esc(l.title)+'</h1><p class="big muted">'+esc(l.subtitle||'')+'</p>'+note('This is diagnostic practice. Record repeated hesitation instead of turning every miss into a lecture.')+'</div></section>');
 s.push(slide('Retrieval — no notes',cards(cover.map(x=>'Explain the key idea from: '+x)),'Ask for examples and reasoning.'));
 s.push(slide('Trace','<p class="q">Choose one recent code example. Predict every important variable value or output before running it.</p>','Have Oscar use a trace table.'));
 s.push(slide('Debug','<p class="q">Introduce one bug on purpose. Diagnose it from evidence.</p><div class="beat conclusion"><p>Expected → Actual → Clue → Cause → Smallest fix</p></div>','Name the error category before fixing it.'));
 s.push(slide('Write','<p class="q">Rebuild one small solution from a specification without looking at the old code.</p>','Say the algorithm in English first.'));
 s.push(slide('Error log','<p class="big">For every miss: what was tested, what did I think, why was it wrong, and what mental model fixes it?</p>','One good error-log entry is more valuable than ten rushed questions.'));
 s.push(slide('Resources',resources(l.resources),'Use resources after the attempt.'));
 s.push(slide('Exit check',cards(['What was strongest today?','What mistake repeated?','What should the next lesson retrieve first?']),'Record one specific weak point.'));
 return s.join('');
}

if(!L){
 deck.innerHTML='<section class="slide active"><div class="slidecontent"><h1>Lesson not found</h1><p><a href="index.html">Return to course</a></p></div></section>';
}else{
 document.title=L.title+' • Oscar AP CSA';
 deck.innerHTML=L.id==='u1-2'?buildVariablesLesson(L):(L.kind==='practice'?buildPractice(L):buildLesson(L));
}

const slides=[...document.querySelectorAll('.slide')];
const panel=document.querySelector('#teacherPanel');
const teacherText=document.querySelector('#teacherText');

function currentSlide(){return slides[i];}
function hiddenBeats(slide=currentSlide()){return [...slide.querySelectorAll('.beat:not(.revealed)')];}
function revealedBeats(slide=currentSlide()){return [...slide.querySelectorAll('.beat.revealed')];}
function updateTeacher(){
 const t=currentSlide()?.querySelector('.teacher')?.textContent?.trim()||'No teacher note for this scene.';
 teacherText.textContent=t;
}
function render(){
 slides.forEach((s,j)=>s.classList.toggle('active',j===i));
 const hidden=hiddenBeats();
 const revealed=revealedBeats();
 document.querySelector('#counter').textContent='Scene '+(i+1)+' / '+slides.length+(hidden.length?' · '+revealed.length+'/'+(hidden.length+revealed.length)+' reveals':'');
 document.querySelector('#nextBtn').textContent=hidden.length?'Reveal →':'Next →';
 updateTeacher();
}
function next(){
 const hidden=hiddenBeats();
 if(hidden.length){hidden[0].classList.add('revealed');render();return;}
 if(i<slides.length-1){i++;render();}
}
function prev(){
 const shown=revealedBeats();
 if(shown.length){shown[shown.length-1].classList.remove('revealed');render();return;}
 if(i>0){i--;render();}
}
function toggleTeacher(){panel.hidden=!panel.hidden;updateTeacher();}
function toggleFullscreen(){if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.();}

document.querySelector('#nextBtn').onclick=next;
document.querySelector('#backBtn').onclick=prev;
document.querySelector('#notesBtn').onclick=toggleTeacher;
document.querySelector('#fullBtn').onclick=toggleFullscreen;
document.addEventListener('keydown',e=>{
 if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();next();}
 if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prev();}
 if(e.key.toLowerCase()==='t'||e.key.toLowerCase()==='n')toggleTeacher();
 if(e.key.toLowerCase()==='f')toggleFullscreen();
});
render();