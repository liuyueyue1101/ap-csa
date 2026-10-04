const D=window.COURSE_DATA;
const params=new URLSearchParams(location.search);
const id=params.get('id');
const L=D.lessons.find(x=>x.id===id)||D.optional.find(x=>x.id===id);
const deck=document.querySelector('#deck');
let i=0;
const progressKey='oscar-apcsa-progress';
function getProgress(){return new Set(JSON.parse(localStorage.getItem(progressKey)||'[]'));}
function updateCompleteButton(){const p=getProgress();const b=document.querySelector('#completeBtn');if(!L||!b)return;b.textContent=p.has(L.id)?'Completed ✓':'Mark complete';b.classList.toggle('completed',p.has(L.id));}
function toggleComplete(){if(!L)return;const p=getProgress();p.has(L.id)?p.delete(L.id):p.add(L.id);localStorage.setItem(progressKey,JSON.stringify([...p]));updateCompleteButton();}


function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function note(text){return '<div class="teacher">'+esc(text)+'</div>';}
function slide(title,body,teacher=''){
  return '<section class="slide"><div class="slidecontent"><h2>'+title+'</h2>'+body+note(teacher)+'</div></section>';
}
function cards(items){return '<div class="cards">'+items.map((x,k)=>'<div class="card"><h3>'+String(k+1).padStart(2,'0')+'</h3><p>'+esc(x)+'</p></div>').join('')+'</div>';}
function resources(rs){return '<div class="resources-grid">'+(rs||[]).map(r=>'<div class="resourcecard"><span class="kind">'+esc(r.kind)+'</span><p><a target="_blank" rel="noopener" href="'+r.url+'">'+esc(r.label)+'</a></p></div>').join('')+'</div>';}


function cover(l,title,subtitle,teacher){
  return '<section class="slide active"><div class="slidecontent"><p class="lesson-meta">WEEK '+l.week+' · '+esc(l.sessionInWeek)+' · FOUNDATION</p><h1>'+title+'</h1><p class="big muted">'+subtitle+'</p>'+note(teacher)+'</div></section>';
}

function buildPythonOnRamp(l){
 const s=[];
 s.push(cover(l,'Python On-Ramp','Write → run → notice → change → run again.','Keep Python in its role: a low-friction way to experience programming. Java remains the main AP language. Ask for a prediction before every run.'));
 s.push(slide('Bring back the big idea',
  '<p class="q">What has to happen between writing code and seeing a result?</p>'+
  '<div class="beat conclusion"><p>We write instructions, run them, observe what happened, then use that evidence to decide what to change.</p></div>',
  'Accept a simple answer. The point is to reconnect source code and execution, not to quiz JVM details.'));

 s.push(slide('One line. One prediction.',
  '<pre class="code"><span class="code-line focus-line">print("Hello, Oscar!")</span></pre>'+
  '<p class="q">What do you expect to appear?</p>'+
  '<div class="beat output-box">Hello, Oscar!</div>'+
  '<div class="beat conclusion"><p><code>print(...)</code> asks Python to display a value.</p></div>',
  'Do not describe print first. Ask Oscar to predict, run it, then name what he just observed.'));

 s.push(slide('Change only the value',
  '<pre class="code"><span class="code-line">print("<span class="old">Hello, Oscar!</span><span class="beat new">Training starts now.</span>")</span></pre>'+
  '<p class="q">If the words change, what will the output do?</p>'+
  '<div class="beat output-box">Training starts now.</div>'+
  '<div class="beat conclusion"><p>Small code changes can produce visible behavior changes immediately.</p></div>',
  'Let Oscar say the expected output before revealing the changed text. This is the edit–run feedback loop.'));

 s.push(slide('These look similar. Are they?',
  '<pre class="code"><span class="code-line">print(7 + 8)</span></pre>'+
  '<p class="q">What will this print?</p>'+
  '<div class="beat equation">7 + 8 → 15</div>'+
  '<div class="beat output-box">15</div>'+
  '<div class="beat"><pre class="code"><span class="code-line">print("7 + 8")</span></pre></div>'+
  '<div class="beat"><p class="q">Now what will this print?</p></div>'+
  '<div class="beat output-box">7 + 8</div>'+
  '<div class="beat conclusion"><p>Without quotes, Python evaluates arithmetic. Inside quotes, the characters are text.</p></div>',
  'This contrast is more useful than a long definition of string versus number. Pause before the second output.'));

 s.push(slide('Give a value a name',
  '<pre class="code"><span class="code-line">score = 10</span><span class="code-line focus-line">print(score)</span></pre>'+
  '<p class="q">What will print?</p>'+
  '<div class="beat value-board"><div class="name">score</div><div class="value">10</div></div>'+
  '<div class="beat output-box">10</div>'+
  '<div class="beat conclusion"><p><code>score</code> is a variable name. Right now, it refers to the value <code>10</code>.</p></div>',
  'Use natural language first. Formal terminology comes after Oscar sees the name/value relationship.'));

 s.push(slide('A variable can change',
  '<pre class="code"><span class="code-line">score = 10</span><span class="code-line focus-line">score = score + 1</span><span class="code-line">print(score)</span></pre>'+
  '<p class="q">Before we run it: what value will <code>score</code> have?</p>'+
  '<div class="beat equation">score + 1 → 10 + 1</div>'+
  '<div class="beat equation">10 + 1 → 11</div>'+
  '<div class="beat value-board"><div class="name">score</div><div class="value">11</div></div>'+
  '<div class="beat output-box">11</div>'+
  '<div class="beat conclusion"><p>The right side uses the current value first. Then the new value is stored under the same name.</p></div>',
  'This is the important state-change scene. If Oscar says “score equals score plus one makes no sense,” distinguish mathematical equality from assignment without over-formalizing.'));

 s.push(slide('A tiny decision',
  '<pre class="code"><span class="code-line">score = 11</span><span class="code-line">if score >= 10:</span><span class="code-line">    print("Goal met")</span></pre>'+
  '<p class="q">Will the message appear?</p>'+
  '<div class="beat equation">11 >= 10 → True</div>'+
  '<div class="beat output-box">Goal met</div>'+
  '<div class="beat conclusion"><p>The <code>if</code> block runs only when its condition is true.</p></div>',
  'Keep this light. The goal is only to show that code can respond to a condition. Do not turn this into a full branching lesson.'));

 s.push(slide('Your turn: Athlete Card',
  '<p class="q">Create a tiny program that introduces an athlete.</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Store a name in a variable.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Store a sport or event.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Store one number, such as sessions this week.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Print the values in a readable way.</span></div>'+
  '<div class="beat conclusion"><p>Then change one value. Predict the new output before running again.</p></div>',
  'Oscar should type. If stuck, ask what information the program needs before suggesting syntax.'));

 s.push(slide('Exit check',
  '<p class="q">One question at a time.</p>'+
  '<div class="beat card"><h3>01</h3><p>What is the difference between <code>7 + 8</code> and <code>"7 + 8"</code>?</p></div>'+
  '<div class="beat card"><h3>02</h3><p>After <code>score = 10</code> and then <code>score = score + 1</code>, what is <code>score</code>?</p></div>'+
  '<div class="beat card"><h3>03</h3><p>What does changing one line and rerunning help you learn?</p></div>',
  'Reveal the next exit question only after Oscar answers the current one.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>Write your prediction before you run the changed version.</p></div>','Keep it short and independent.'));
 s.push(slide('Free resources',resources(l.resources),'Use these only after Oscar has attempted the code himself.'));
 return s.join('');
}

function buildInputDebugging(l){
 const s=[];
 s.push(cover(l,'Input & Debugging','Let the program receive data. Then learn to use errors as evidence.','Today the habit matters more than the number of error types. Keep asking: expected? actual? clue? smallest fix?'));
 s.push(slide('Start with yesterday',
  '<p class="q">Show one change you made to your Python program. What did you predict before you ran it?</p>'+
  '<div class="beat conclusion"><p>Prediction gives us something concrete to compare against what actually happened.</p></div>',
  'If Oscar did not write a prediction, create one now before running the program again.'));

 s.push(slide('Can a program wait for you?',
  '<pre class="code"><span class="code-line">name = input("Name: ")</span><span class="code-line focus-line">print("Hello", name)</span></pre>'+
  '<p class="q">What do you think happens when this program reaches <code>input(...)</code>?</p>'+
  '<div class="beat output-box">Name: <span class="code-em">Oscar</span></div>'+
  '<div class="beat value-board"><div class="name">name</div><div class="value">"Oscar"</div></div>'+
  '<div class="beat output-box">Hello Oscar</div>'+
  '<div class="beat conclusion"><p>The program pauses, receives keyboard input, stores it, and continues.</p></div>',
  'Have Oscar actually type the input. Connect this back to Input → Processing → Output.'));

 s.push(slide('A trap worth discovering',
  '<pre class="code"><span class="code-line">minutes = input("Minutes: ")</span><span class="code-line focus-line">print(minutes + 10)</span></pre>'+
  '<p class="q">If we type <code>40</code>, will this print <code>50</code>?</p>'+
  '<div class="beat value-board"><div class="name">minutes</div><div class="value">"40"</div></div>'+
  '<div class="beat error-box"><p><b>Type problem:</b> the keyboard input is text, but <code>10</code> is a number.</p></div>'+
  '<div class="beat"><pre class="code"><span class="code-line">minutes = int(input("Minutes: "))</span><span class="code-line">print(minutes + 10)</span></pre></div>'+
  '<div class="beat output-box">50</div>',
  'Let the mismatch create the need for int(). No full Python type-system lecture is needed.'));

 s.push(slide('When something goes wrong',
  '<p class="q">What should we do before changing random lines?</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text"><b>Expected:</b> What did I think would happen?</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text"><b>Actual:</b> What happened instead?</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text"><b>Clue:</b> What does the computer tell me?</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text"><b>Inspect:</b> Which line is most suspicious?</span></div>'+
  '<div class="beat step-line"><span class="step-num">05</span><span class="step-text"><b>Fix:</b> Make the smallest change, then test again.</span></div>',
  'This is the core debugging routine. Repeat the exact language throughout the lesson.'));

 s.push(slide('Bug 1 — read before fixing',
  '<pre class="code"><span class="code-line">name = input("Name: ")</span><span class="code-line focus-line">print("Hello, name)</span></pre>'+
  '<p class="q">Do not fix it yet. What looks unusual?</p>'+
  '<div class="beat error-box"><p>The quote starts, but it never closes.</p></div>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">print("Hello", name)</span></pre></div>'+
  '<div class="beat conclusion"><p>The useful move was not guessing. It was inspecting the line the error points us toward.</p></div>',
  'Ask Oscar to identify the visual clue before naming it as a syntax error.'));

 s.push(slide('Bug 2 — the name matters',
  '<pre class="code"><span class="code-line">minutes = 40</span><span class="code-line focus-line">print(minute)</span></pre>'+
  '<p class="q">What variable names exist right now?</p>'+
  '<div class="beat value-board"><div class="name">defined</div><div class="value">minutes</div></div>'+
  '<div class="beat error-box"><p><code>minute</code> is a different name. Python cannot find a value stored under it.</p></div>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">print(minutes)</span></pre></div>',
  'The point is to inspect exact spelling, not memorize an error-message paragraph.'));

 s.push(slide('Bug 3 — the program runs, but...',
  '<pre class="code"><span class="code-line">minutes = 40</span><span class="code-line">sessions = 3</span><span class="code-line focus-line">total = minutes + sessions</span><span class="code-line">print(total)</span></pre>'+
  '<p class="q">The program runs. Is the result correct for total training minutes?</p>'+
  '<div class="beat equation">Expected: 40 × 3 → 120</div>'+
  '<div class="beat equation">Actual: 40 + 3 → 43</div>'+
  '<div class="beat conclusion"><p>This is a <b>logic bug</b>: the computer followed our instructions, but our instructions did not match the goal.</p></div>',
  'Important contrast: not every bug produces an error message. Expected versus actual output becomes the evidence.'));

 s.push(slide('Your debugging drill',
  '<p class="q">For each bug, say the five debugging steps out loud before fixing it.</p>'+
  '<div class="beat card"><h3>A</h3><p>missing quote or parenthesis</p></div>'+
  '<div class="beat card"><h3>B</h3><p>misspelled variable name</p></div>'+
  '<div class="beat card"><h3>C</h3><p>text used where a number is needed</p></div>'+
  '<div class="beat card"><h3>D</h3><p>wrong operator but valid code</p></div>',
  'Do not let the exercise become speed-fixing. The verbal diagnosis is the learning target.'));

 s.push(slide('Exit check',
  '<p class="q">Answer before revealing the next question.</p>'+
  '<div class="beat card"><h3>01</h3><p>What does <code>input()</code> give us first: text or a number?</p></div>'+
  '<div class="beat card"><h3>02</h3><p>Why might we use <code>int(...)</code>?</p></div>'+
  '<div class="beat card"><h3>03</h3><p>What are the first three things you check when debugging?</p></div>'+
  '<div class="beat card"><h3>04</h3><p>Can a program have a bug even if it runs?</p></div>',
  'Record where Oscar hesitates; that becomes retrieval in Day 6.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>For each bug, record <b>symptom → clue → fix</b>.</p></div>','The log is more important than the number of bugs.'));
 s.push(slide('Free resources',resources(l.resources),'Use resources for reinforcement after attempting the debugging drill.'));
 return s.join('');
}

function buildPythonChallenge(l){
 const s=[];
 s.push(cover(l,'Small Python Challenge','Turn a problem into an algorithm, then turn the algorithm into code.','Do not show the full solution at the start. Today is about decomposition and testing, not copying a finished program.'));
 s.push(slide('The challenge',
  '<p class="q">Build a program for an athlete.</p>'+
  '<div class="beat conclusion"><p>Ask for <b>minutes per training session</b>.</p></div>'+
  '<div class="beat conclusion"><p>Ask for the <b>number of sessions</b>.</p></div>'+
  '<div class="beat conclusion"><p>Display the <b>total training minutes</b>.</p></div>',
  'Reveal requirements only after Oscar restates the problem in his own words. Do not show code.'));

 s.push(slide('Before code: identify the flow',
  '<p class="q">What are the input, processing, and output?</p>'+
  '<div class="beat step-line"><span class="step-num">IN</span><span class="step-text">minutes per session + number of sessions</span></div>'+
  '<div class="beat step-line"><span class="step-num">DO</span><span class="step-text">multiply the two numbers</span></div>'+
  '<div class="beat step-line"><span class="step-num">OUT</span><span class="step-text">total training minutes</span></div>',
  'This reconnects Day 1 IPO to real program design. Oscar should identify each part before it appears.'));

 s.push(slide('Say the algorithm in English',
  '<p class="q">No Python yet. What steps should the program perform?</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Ask for minutes per session.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Convert that input to a number.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Ask for number of sessions and convert it.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Multiply the two numbers.</span></div>'+
  '<div class="beat step-line"><span class="step-num">05</span><span class="step-text">Display the result.</span></div>',
  'If Oscar cannot say the steps clearly, code will only hide the confusion.'));

 s.push(slide('Now write line 1',
  '<p class="q">How can we ask for minutes and make sure arithmetic will work?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">minutes = int(input("Minutes per session: "))</span></pre></div>'+
  '<div class="beat conclusion"><p>One line can perform several small jobs: prompt → receive text → convert → store.</p></div>',
  'Let Oscar attempt syntax first. Reveal only after an attempt.'));

 s.push(slide('Add the second input',
  '<pre class="code"><span class="code-line">minutes = int(input("Minutes per session: "))</span><span class="beat code-line focus-line">sessions = int(input("Number of sessions: "))</span></pre>'+
  '<p class="q">What variable name would make the second value easy to understand?</p>',
  'Names should help a reader understand the program. Do not over-focus on naming style yet.'));

 s.push(slide('Do the processing',
  '<pre class="code"><span class="code-line">minutes = int(input("Minutes per session: "))</span><span class="code-line">sessions = int(input("Number of sessions: "))</span><span class="beat code-line focus-line">total = minutes * sessions</span></pre>'+
  '<p class="q">Why is multiplication the right operation here?</p>'+
  '<div class="beat equation">40 minutes × 3 sessions → 120 minutes</div>',
  'Tie the operator back to the English algorithm.'));

 s.push(slide('Make the result readable',
  '<pre class="code"><span class="code-line">minutes = int(input("Minutes per session: "))</span><span class="code-line">sessions = int(input("Number of sessions: "))</span><span class="code-line">total = minutes * sessions</span><span class="beat code-line focus-line">print("Total training minutes:", total)</span></pre>'+
  '<p class="q">Why is this better than printing only the number?</p>'+
  '<div class="beat output-box">Total training minutes: 120</div>',
  'Output is communication. A correct number can still be unclear to the user.'));

 s.push(slide('Test before trusting it',
  '<p class="q">For each test, predict the answer before running the program.</p>'+
  '<div class="beat card"><h3>TEST 1</h3><p>30 minutes × 4 sessions</p></div>'+
  '<div class="beat equation">Expected → 120</div>'+
  '<div class="beat card"><h3>TEST 2</h3><p>60 minutes × 0 sessions</p></div>'+
  '<div class="beat equation">Expected → 0</div>'+
  '<div class="beat card"><h3>TEST 3</h3><p>45 minutes × 7 sessions</p></div>'+
  '<div class="beat equation">Expected → 315</div>',
  'The expected result must be decided before the program supplies an answer. Otherwise “it ran” may be mistaken for “it is correct.”'));

 s.push(slide('Change one thing',
  '<p class="q">Choose one improvement. Do not ask for the solution yet.</p>'+
  '<div class="beat card"><h3>A</h3><p>also show total hours</p></div>'+
  '<div class="beat card"><h3>B</h3><p>print a message when total ≥ 300</p></div>'+
  '<div class="beat card"><h3>C</h3><p>add a second type of training</p></div>'+
  '<div class="beat conclusion"><p>Say the new algorithm in English before editing the code.</p></div>',
  'Let Oscar choose. Ownership matters; a small successful modification is enough.'));

 s.push(slide('Break it on purpose',
  '<p class="q">Create one bug. Then debug it using evidence.</p>'+
  '<div class="beat conclusion"><p>Expected → Actual → Clue → Suspicious line → Smallest fix → Test again</p></div>',
  'This integrates Day 5. Ask Oscar to classify whether the bug prevents execution or produces wrong behavior.'));

 s.push(slide('What did you actually practice?',
  '<p class="q">Programming is more than typing syntax. What process did we use?</p>'+
  '<div class="beat equation">Problem → Algorithm</div>'+
  '<div class="beat equation">Algorithm → Code</div>'+
  '<div class="beat equation">Code → Test</div>'+
  '<div class="beat equation">Mismatch → Debug</div>'+
  '<div class="beat conclusion"><p>This workflow transfers directly into Java and AP CSA.</p></div>',
  'End on the transferable workflow, not on Python vocabulary.'));

 s.push(slide('Exit check',
  '<p class="q">Answer one at a time.</p>'+
  '<div class="beat card"><h3>01</h3><p>What are the two inputs?</p></div>'+
  '<div class="beat card"><h3>02</h3><p>What is the processing?</p></div>'+
  '<div class="beat card"><h3>03</h3><p>Why predict test results before running?</p></div>'+
  '<div class="beat card"><h3>04</h3><p>Why write the algorithm before the code?</p></div>',
  'Use the answers to decide what Practice 2 should emphasize.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>Bring the improved code and one question to Practice 2.</p></div>','One independent modification is enough.'));
 s.push(slide('Free resources',resources(l.resources),'Resources come after the attempt.'));
 return s.join('');
}

function buildFoundationPractice2(l){
 const s=[];
 s.push(cover(l,'Practice 2','Python basics · debugging · small-program reasoning','Do not add new concepts. The session should expose what Oscar can retrieve and rebuild without support.'));
 s.push(slide('Retrieval 1',
  '<p class="q">What is different about these two expressions?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line">7 + 8</span></pre></div>'+
  '<div class="beat"><pre class="code"><span class="code-line">"7 + 8"</span></pre></div>'+
  '<div class="beat conclusion"><p>One is arithmetic. One is text.</p></div>',
  'Do not reveal the second expression until Oscar explains the first.'));

 s.push(slide('Retrieval 2',
  '<p class="q">Why might this need <code>int(...)</code>?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line">minutes = input("Minutes: ")</span></pre></div>'+
  '<div class="beat value-board"><div class="name">minutes</div><div class="value">"40"</div></div>'+
  '<div class="beat conclusion"><p>Keyboard input arrives as text. Arithmetic needs a numeric value.</p></div>',
  'Ask for the reason, not just “because we learned int.”'));

 s.push(slide('Trace without running',
  '<pre class="code"><span class="code-line">score = 5</span><span class="code-line">score = score + 2</span><span class="code-line">score = score * 3</span><span class="code-line focus-line">print(score)</span></pre>'+
  '<p class="q">What will print?</p>'+
  '<div class="beat equation">5 + 2 → 7</div>'+
  '<div class="beat equation">7 × 3 → 21</div>'+
  '<div class="beat output-box">21</div>',
  'Have Oscar keep a tiny trace table on paper.'));

 s.push(slide('Debug without rushing',
  '<pre class="code"><span class="code-line">minutes = int(input("Minutes: "))</span><span class="code-line">sessions = 3</span><span class="code-line focus-line">total = minute + sessions</span><span class="code-line">print(total)</span></pre>'+
  '<p class="q">Before fixing anything: what did we expect, and what line deserves inspection?</p>'+
  '<div class="beat conclusion"><p>First clue: <code>minute</code> was never defined; the stored name is <code>minutes</code>.</p></div>'+
  '<div class="beat conclusion"><p>Second question: even after fixing the name, is <code>+</code> the correct operation for total training minutes?</p></div>',
  'There are two layers: a name bug and a logic bug. Let Oscar find them separately.'));

 s.push(slide('Rebuild from a specification',
  '<p class="q">Write a new program that asks for laps and minutes per lap, then prints total minutes.</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Say the algorithm in English.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Identify input, processing, and output.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Write the code without looking at yesterday’s solution.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Choose two tests and predict both results first.</span></div>',
  'This is the strongest transfer check of the week. Give hints before code.'));

 s.push(slide('Error log',
  '<p class="q">Pick the most useful mistake from today.</p>'+
  '<div class="beat step-line"><span class="step-num">1</span><span class="step-text">What was I trying to do?</span></div>'+
  '<div class="beat step-line"><span class="step-num">2</span><span class="step-text">What did I think would happen?</span></div>'+
  '<div class="beat step-line"><span class="step-num">3</span><span class="step-text">What actually happened?</span></div>'+
  '<div class="beat step-line"><span class="step-num">4</span><span class="step-text">What clue helped me repair it?</span></div>',
  'One thoughtful entry is enough.'));

 s.push(slide('Exit check',
  '<p class="q">Can you now explain the whole week in one chain?</p>'+
  '<div class="beat equation">Write → Predict → Run</div>'+
  '<div class="beat equation">Observe → Explain → Modify</div>'+
  '<div class="beat equation">Break → Debug → Test</div>'+
  '<div class="beat conclusion"><p>If this workflow feels natural, we are ready to make Java the main language.</p></div>',
  'If one link is weak, record it and retrieve it at the beginning of the next lesson.'));
 s.push(slide('Free resources',resources(l.resources),'Optional reinforcement only.'));
 return s.join('');
}


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
 if(L.id==='f4') deck.innerHTML=buildPythonOnRamp(L);
 else if(L.id==='f5') deck.innerHTML=buildInputDebugging(L);
 else if(L.id==='f6') deck.innerHTML=buildPythonChallenge(L);
 else if(L.id==='p-foundation-2') deck.innerHTML=buildFoundationPractice2(L);
 else if(L.id==='u1-2') deck.innerHTML=buildVariablesLesson(L);
 else deck.innerHTML=L.kind==='practice'?buildPractice(L):buildLesson(L);
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

document.querySelector('#completeBtn').onclick=toggleComplete;
updateCompleteButton();
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