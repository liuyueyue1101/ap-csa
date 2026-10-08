const D=window.COURSE_DATA;
const params=new URLSearchParams(location.search);
const id=params.get('id');
const L=D.lessons.find(x=>x.id===id)||D.optional.find(x=>x.id===id);
const deck=document.querySelector('#deck');
let i=0;
const progressKey='apcsa-progress';
const legacyProgressKey='oscar-apcsa-progress';
if(!localStorage.getItem(progressKey)&&localStorage.getItem(legacyProgressKey)) localStorage.setItem(progressKey,localStorage.getItem(legacyProgressKey));
const studentKey='apcsa-student-name';
function studentName(){return localStorage.getItem(studentKey)?.trim()||'Student';}
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



function buildWhatIsComputer(l){
 const s=[];
 s.push(cover(l,'What Is a Computer?','Start with something you already use: a MacBook and a browser.','Do not start with CPU architecture. Today the goal is one usable mental model: input → processing → output, plus a light introduction to program/application/data.'));
 s.push(slide('You do something. Then something happens.',
  '<p class="q">You type a website name and press Return. A webpage appears.</p>'+
  '<div class="beat conclusion"><p>What did <b>you</b> give the computer?</p></div>'+
  '<div class="beat concept-reveal">A website name + the Return key</div>'+
  '<div class="beat conclusion"><p>What did the computer give <b>you</b>?</p></div>'+
  '<div class="beat concept-reveal">A webpage on the screen</div>',
  'Ask the first question before revealing the wording. Accept typing/clicking/keys as input. Do not explain networking or servers today.'));

 s.push(slide('There is a middle step',
  '<div class="step-line"><span class="step-num">YOU</span><span class="step-text">type a website name and press Return</span></div>'+
  '<div class="beat equation">↓</div>'+
  '<div class="beat"><p class="q">Something happens inside the computer. What should we call that middle work?</p></div>'+
  '<div class="beat concept-reveal">Processing</div>'+
  '<div class="beat equation">↓</div>'+
  '<div class="beat step-line"><span class="step-num">MAC</span><span class="step-text">shows the webpage</span></div>',
  'The word processing is introduced after {{student}} notices the missing middle. Keep it broad; no CPU internals.'));

 s.push(slide('A model we can reuse',
  '<p class="q">Can we give names to the three parts?</p>'+
  '<div class="beat equation">INPUT</div>'+
  '<div class="beat equation">↓</div>'+
  '<div class="beat equation">PROCESSING</div>'+
  '<div class="beat equation">↓</div>'+
  '<div class="beat equation">OUTPUT</div>'+
  '<div class="beat conclusion"><p>This is a simple model—not every detail of a computer—but it is useful for understanding what programs do.</p></div>',
  'Have {{student}} say the three words aloud. The power of the model comes from transferring it to new examples.'));

 s.push(slide('Try it with Calculator',
  '<p class="q">You enter <code>7 + 8</code> in Calculator. The screen shows <code>15</code>. What is each part?</p>'+
  '<div class="beat step-line"><span class="step-num">IN</span><span class="step-text"><code>7 + 8</code></span></div>'+
  '<div class="beat step-line"><span class="step-num">DO</span><span class="step-text">calculate the result</span></div>'+
  '<div class="beat step-line"><span class="step-num">OUT</span><span class="step-text"><code>15</code></span></div>'+
  '<div class="beat conclusion"><p>The same model works even though Calculator is very different from Safari.</p></div>',
  'Reveal only one row after {{student}} answers that part.'));

 s.push(slide('What is doing the work?',
  '<p class="q">Safari, Notes, and Calculator look different. What do they have in common?</p>'+
  '<div class="beat card"><h3>SAFARI</h3><p>browse the web</p></div>'+
  '<div class="beat card"><h3>NOTES</h3><p>write and organize notes</p></div>'+
  '<div class="beat card"><h3>CALCULATOR</h3><p>calculate</p></div>'+
  '<div class="beat conclusion"><p>An <b>application (app)</b> is a kind of <b>program</b> you use to do a task.</p></div>',
  'This is a working idea, not a formal definition to memorize. Let examples come first.'));

 s.push(slide('Programs work with data',
  '<p class="q">What information is Safari working with when you browse?</p>'+
  '<div class="beat conclusion"><p>Words you type, pages you open, images, links, and other information are examples of <b>data</b>.</p></div>'+
  '<div class="beat equation">Computer + Program + Data</div>'+
  '<div class="beat conclusion"><p>The program tells the computer what to do with the data.</p></div>',
  'Keep data concrete. Do not turn this into a data-representation lecture yet.'));

 s.push(slide('Your turn: analyze a familiar app',
  '<p class="q">Choose one application you actually use.</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">What input do you give it?</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">What processing seems to happen?</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">What output do you receive?</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">What data is the program working with?</span></div>',
  'Good choices: Safari, Calculator, Notes, a game. Keep the processing description at the level {{student}} can observe or reasonably infer.'));

 s.push(slide('A careful definition',
  '<p class="q">After these examples, what is a computer doing?</p>'+
  '<div class="beat conclusion"><p>A computer is a machine that <b>stores and manipulates representations of information according to instructions</b>.</p></div>'+
  '<div class="beat conclusion"><p>For now, “instructions” can simply mean the steps a program tells the computer to carry out.</p></div>',
  'Reveal the formal definition late, after experience. Do not require verbatim memorization.'));

 s.push(slide('Exit check',
  '<p class="q">One question at a time.</p>'+
  '<div class="card"><h3>01</h3><p>In Calculator, what is input? What is output?</p></div>'+
  '<div class="card"><h3>02</h3><p>What does “processing” mean in our simple model?</p></div>'+
  '<div class="card"><h3>03</h3><p>How is an application related to a program?</p></div>'+
  '<div class="card"><h3>04</h3><p>Give one example of data used by a program.</p></div>',
  'Do not reveal all four prompts at once. Record any concept that needs retrieval tomorrow.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="conclusion"><p>Tomorrow, be ready to explain one example without notes.</p></div>','Keep the homework observational, not definition memorization.'));
 s.push(slide('Free resources',resources(l.resources),'Optional. The hands-on observation is the primary learning activity.'));
 return s.join('');
}

function buildFilesEnvironment(l){
 const s=[];
 s.push(cover(l,'Programs, Files & Your Mac','Where does source code live before it becomes a running program?','Begin with the Day 1 homework. Today should demystify files, source code, editor, and Terminal. Terminal mastery is not the goal.'));

 s.push(slide('Start with your homework',
  '<p class="q">Choose one application you observed yesterday.</p>'+
  '<div class="beat step-line"><span class="step-num">IN</span><span class="step-text">What input did you give it?</span></div>'+
  '<div class="beat step-line"><span class="step-num">DO</span><span class="step-text">What processing happened?</span></div>'+
  '<div class="beat step-line"><span class="step-num">OUT</span><span class="step-text">What output did you get?</span></div>'+
  '<div class="beat step-line"><span class="step-num">DATA</span><span class="step-text">What information was it working with?</span></div>',
  'Let {{student}} explain before revealing the labels. This is retrieval, not a second lecture.'));

 s.push(slide('Where does a program come from?',
  '<p class="q">Before a program can run, a programmer has to write instructions somewhere. Where can text like that live on your Mac?</p>'+
  '<div class="beat conclusion"><p>In a <b>file</b>.</p></div>'+
  '<div class="beat conclusion"><p>Files can be organized inside <b>folders</b>.</p></div>',
  'Connect to Finder because it is already familiar. Avoid filesystem theory.'));

 s.push(slide('Make a place for our work',
  '<p class="q">Open Finder. What should we create so our CS files have one clear home?</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Create a folder named <code>CS-Learning</code>.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Open it.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Create or save a small text file inside it.</span></div>'+
  '<div class="beat conclusion"><p>The folder is not the program. It is just where we organize the files we are working with.</p></div>',
  'Do this live on the Mac. The physical action matters more than a screenshot.'));

 s.push(slide('Source code is text',
  '<pre class="code"><span class="code-line">print("Hello")</span></pre>'+
  '<p class="q">At this moment, before we run anything, what is this?</p>'+
  '<div class="beat conclusion"><p>It is <b>source code</b>: text that describes instructions for a program.</p></div>'+
  '<div class="beat conclusion"><p>When saved, that text lives inside a file.</p></div>',
  'Do not imply source code is already a running program. That distinction prepares Day 3.'));

 s.push(slide('What is the editor doing?',
  '<p class="q">If source code is text in a file, what job does an editor have?</p>'+
  '<div class="beat conclusion"><p>An <b>editor</b> lets you create and change the source-code text.</p></div>'+
  '<div class="beat equation">Editor → edits → Source file</div>'+
  '<div class="beat conclusion"><p>Saving writes those changes into the file on your Mac.</p></div>',
  'Use the editor {{student}} is actually using. Do not compare many IDEs today.'));

 s.push(slide('Finder shows the files visually',
  '<p class="q">In Finder, can you locate the folder and file you just created?</p>'+
  '<div class="beat step-line"><span class="step-num">FOLDER</span><span class="step-text"><code>CS-Learning</code></span></div>'+
  '<div class="beat step-line"><span class="step-num">FILE</span><span class="step-text">your saved source/text file</span></div>'+
  '<div class="beat conclusion"><p>Finder is one way to navigate your Mac’s files and folders.</p></div>',
  'Make {{student}} point to the actual folder and file rather than only reading the slide.'));

 s.push(slide('Terminal can look at the same place',
  '<p class="q">If Finder already exists, why might programmers also use Terminal?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">pwd</span></pre></div>'+
  '<div class="beat conclusion"><p><code>pwd</code> shows the folder Terminal is currently “in.”</p></div>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">ls</span></pre></div>'+
  '<div class="beat conclusion"><p><code>ls</code> lists what is in that folder.</p></div>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">cd CS-Learning</span></pre></div>'+
  '<div class="beat conclusion"><p><code>cd</code> changes the current folder.</p></div>',
  'Run each command live. The goal is orientation, not memorizing shell commands.'));

 s.push(slide('Two views. Same files.',
  '<p class="q">When Finder shows <code>CS-Learning</code> and Terminal also navigates into <code>CS-Learning</code>, did we create two folders?</p>'+
  '<div class="beat equation">Finder → same file system ← Terminal</div>'+
  '<div class="beat conclusion"><p><b>No.</b> Finder and Terminal are two different ways to interact with the same computer and the same files.</p></div>',
  'This is the most important mental model of Day 2. Ask {{student}} to restate it in his own words.'));

 s.push(slide('Your development environment',
  '<p class="q">What tools have we used so far?</p>'+
  '<div class="beat step-line"><span class="step-num">EDIT</span><span class="step-text">an editor changes source code</span></div>'+
  '<div class="beat step-line"><span class="step-num">STORE</span><span class="step-text">files and folders organize the work</span></div>'+
  '<div class="beat step-line"><span class="step-num">NAV</span><span class="step-text">Finder or Terminal locates those files</span></div>'+
  '<div class="beat conclusion"><p>Together, tools like these form part of a <b>development environment</b>: the setup used to create and work with programs.</p></div>',
  'Keep “development environment” as a practical umbrella term. No need for IDE taxonomy.'));

 s.push(slide('Hands-on check',
  '<p class="q">Can you prove Finder and Terminal are looking at the same work?</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Open <code>CS-Learning</code> in Finder.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Navigate to it in Terminal.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Use <code>ls</code> and find the same file.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Edit and save the file, then inspect it again.</span></div>',
  '{{student}} should drive the Mac. If he gets lost, ask “Where are you now?” before giving the next command.'));

 s.push(slide('Exit check',
  '<p class="q">One at a time.</p>'+
  '<div class="card"><h3>01</h3><p>What is a source-code file?</p></div>'+
  '<div class="card"><h3>02</h3><p>What job does an editor do?</p></div>'+
  '<div class="card"><h3>03</h3><p>What is the relationship between Finder and Terminal?</p></div>'+
  '<div class="card"><h3>04</h3><p>What do <code>pwd</code>, <code>ls</code>, and <code>cd</code> help you do?</p></div>',
  'If Finder vs Terminal is unclear, redo the live same-folder demonstration.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="conclusion"><p>Tomorrow, be ready to show the folder and explain the role of each tool.</p></div>','The next lesson begins with the actual workspace, not definitions.'));
 s.push(slide('Free resources',resources(l.resources),'Optional reinforcement. Keep Terminal scope narrow.'));
 return s.join('');
}

function buildSourceExecution(l){
 const s=[];
 s.push(cover(l,'From Source Code to Execution','A saved Java file is not yet a running program. What has to happen in between?','The core sequence is Java source → javac/compiler → bytecode → JVM → execution. Do not teach JVM internals.'));

 s.push(slide('Show me your workspace',
  '<p class="q">Open your <code>CS-Learning</code> folder. Can you point to a file and explain what role Finder, the editor, and Terminal each play?</p>'+
  '<div class="beat conclusion"><p>Today we start from that saved source file and follow what happens next.</p></div>',
  'Use the real Mac. Repair any confusion from Day 2 before introducing compile/run.'));

 s.push(slide('We have a Java source file',
  '<pre class="code"><span class="code-line">public class Hello {</span><span class="code-line">    public static void main(String[] args) {</span><span class="code-line">        System.out.println("Hello");</span><span class="code-line">    }</span><span class="code-line">}</span></pre>'+
  '<p class="q">If this is saved as <code>Hello.java</code>, is the source file itself already “running”?</p>'+
  '<div class="beat conclusion"><p>No. It is still source code stored in a file.</p></div>',
  'Do not teach the Java syntax yet. The code is only an object to follow through the pipeline.'));

 s.push(slide('What could transform the source?',
  '<p class="q">Java uses a tool that transforms source code into another form before execution. What kind of job is that?</p>'+
  '<div class="beat concept-reveal">Compiler</div>'+
  '<div class="beat conclusion"><p>The Java compiler we will use is called <code>javac</code>.</p></div>',
  'Introduce the compiler as a transformation tool. Avoid machine-code/JIT detail.'));

 s.push(slide('Predict what this command creates',
  '<pre class="code"><span class="code-line focus-line">javac Hello.java</span></pre>'+
  '<p class="q">After this succeeds, what new file should appear?</p>'+
  '<div class="beat equation">Hello.java → javac → ?</div>'+
  '<div class="beat concept-reveal">Hello.class</div>'+
  '<div class="beat conclusion"><p><code>Hello.class</code> contains Java <b>bytecode</b>.</p></div>',
  'Run ls before and after javac so the new file is visible evidence.'));

 s.push(slide('Source and bytecode are not the same thing',
  '<div class="step-line"><span class="step-num">.java</span><span class="step-text">source code written for people/programmers to edit</span></div>'+
  '<div class="beat step-line"><span class="step-num">.class</span><span class="step-text">Java bytecode produced by the compiler</span></div>'+
  '<div class="beat conclusion"><p>We normally edit the source file, then compile again. We do not hand-edit the bytecode.</p></div>',
  'Keep this conceptual. “Bytecode” is enough; no class-file structure.'));

 s.push(slide('Who executes the bytecode?',
  '<p class="q">We now have <code>Hello.class</code>. What still has to happen before we see output?</p>'+
  '<div class="beat concept-reveal">The JVM executes the Java bytecode.</div>'+
  '<div class="beat equation">Hello.class → JVM → execution</div>'+
  '<div class="beat conclusion"><p><b>Compiler = transform.</b> <b>JVM = execute.</b></p></div>',
  'This verb contrast is the teaching target. Ask {{student}} to say it before revealing the final line.'));

 s.push(slide('The whole pipeline',
  '<p class="q">Can you rebuild the sequence before we reveal it?</p>'+
  '<div class="beat equation">Hello.java</div>'+
  '<div class="beat equation">↓ javac / compiler</div>'+
  '<div class="beat equation">Hello.class / bytecode</div>'+
  '<div class="beat equation">↓ JVM</div>'+
  '<div class="beat equation">execution → output</div>',
  'Reveal one stage at a time. After each stage, ask “what kind of thing is this: file, tool, or execution?”'));

 s.push(slide('Where does the JDK fit?',
  '<p class="q">We used <code>javac</code>. Where did that development tool come from?</p>'+
  '<div class="beat conclusion"><p>The <b>JDK</b> is a toolkit for developing Java programs. It includes tools such as the Java compiler.</p></div>'+
  '<div class="beat conclusion"><p>For today, you do not need to memorize its internal parts.</p></div>',
  'Keep JDK at toolkit level. The point is practical orientation, not platform architecture.'));

 s.push(slide('Live experiment: before compiling',
  '<p class="q">Navigate to the folder containing <code>Hello.java</code>. What should <code>ls</code> show before we compile?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line">pwd</span><span class="code-line focus-line">ls</span></pre></div>'+
  '<div class="beat terminal-box">Hello.java</div>',
  'Use {{student}}’s actual Terminal. If setup fails, narrate the intended sequence rather than losing the lesson to configuration.'));

 s.push(slide('Live experiment: compile',
  '<pre class="code"><span class="code-line focus-line">javac Hello.java</span></pre>'+
  '<p class="q">Before running <code>ls</code> again, predict what changed.</p>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">ls</span></pre></div>'+
  '<div class="beat terminal-box">Hello.java    Hello.class</div>',
  'The appearance of Hello.class is the concrete evidence that compilation produced something new.'));

 s.push(slide('Live experiment: run',
  '<pre class="code"><span class="code-line focus-line">java Hello</span></pre>'+
  '<p class="q">What job is this command asking Java to do now: compile or execute?</p>'+
  '<div class="beat terminal-box">Hello</div>'+
  '<div class="beat conclusion"><p><code>javac</code> compiles. <code>java</code> starts execution through the Java runtime/JVM.</p></div>',
  'Do not get distracted by why java uses Hello rather than Hello.class. Mention only if {{student}} asks.'));

 s.push(slide('Change the source. What must happen next?',
  '<p class="q">Suppose you edit the printed text inside <code>Hello.java</code>. Can the old <code>Hello.class</code> magically contain that new change?</p>'+
  '<div class="beat conclusion"><p>No. Compile again.</p></div>'+
  '<div class="beat equation">Edit source → compile → run</div>'+
  '<div class="beat conclusion"><p>This edit–compile–run cycle will become a normal Java programming habit.</p></div>',
  'This prepares the practical loop {{student}} will use in the AP core.'));

 s.push(slide('Exit check',
  '<p class="q">One question at a time.</p>'+
  '<div class="card"><h3>01</h3><p>What does <code>javac</code> do?</p></div>'+
  '<div class="card"><h3>02</h3><p>What file is produced from <code>Hello.java</code>?</p></div>'+
  '<div class="card"><h3>03</h3><p>What does the JVM do?</p></div>'+
  '<div class="card"><h3>04</h3><p>After changing source code, why compile again?</p></div>',
  'If compiler versus JVM is mixed up, return to the two verbs: transform versus execute.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="conclusion"><p>Draw the pipeline from memory, then change the printed text, compile, and run again.</p></div>','The next session is practice, so bring the drawing and the working folder.'));
 s.push(slide('Free resources',resources(l.resources),'Optional reinforcement. Do not expand into JVM internals.'));
 return s.join('');
}

function buildFoundationPractice1(l){
 const s=[];
 s.push(cover(l,'Practice 1','Can you rebuild the Week 1 mental models without being retaught?','This is retrieval and transfer. Resist re-explaining too quickly; let gaps become visible.'));

 s.push(slide('Retrieval: the first model',
  '<p class="q">Complete this from memory.</p>'+
  '<div class="beat equation">INPUT</div>'+
  '<div class="beat equation">↓</div>'+
  '<div class="beat equation">PROCESSING</div>'+
  '<div class="beat equation">↓</div>'+
  '<div class="beat equation">OUTPUT</div>'+
  '<div class="beat conclusion"><p>Give a new example—not Calculator or Safari.</p></div>',
  'A transferred example is stronger evidence than repeating the original example.'));

 s.push(slide('Classify the pieces',
  '<p class="q">Which of these are files, tools, or ideas?</p>'+
  '<div class="beat card"><h3>FILE</h3><p><code>Hello.java</code></p></div>'+
  '<div class="beat card"><h3>TOOL</h3><p>editor</p></div>'+
  '<div class="beat card"><h3>TOOL / VIEW</h3><p>Finder</p></div>'+
  '<div class="beat card"><h3>TOOL / VIEW</h3><p>Terminal</p></div>'+
  '<div class="beat card"><h3>IDEA</h3><p>source code</p></div>',
  'Ask {{student}} to classify before each label appears.'));

 s.push(slide('Same folder, two ways',
  '<p class="q">Finder shows <code>CS-Learning</code>. Terminal navigates into <code>CS-Learning</code>. Are these two copies?</p>'+
  '<div class="beat equation">Finder → same files ← Terminal</div>'+
  '<div class="beat conclusion"><p>Two interfaces, one file system.</p></div>',
  'If this is not automatic, do the live proof with ls again.'));

 s.push(slide('Hands-on navigation',
  '<p class="q">Without looking back, what would you use to...</p>'+
  '<div class="beat card"><h3>01</h3><p>show the current folder?</p></div>'+
  '<div class="beat concept-reveal">pwd</div>'+
  '<div class="beat card"><h3>02</h3><p>list what is here?</p></div>'+
  '<div class="beat concept-reveal">ls</div>'+
  '<div class="beat card"><h3>03</h3><p>move into a folder?</p></div>'+
  '<div class="beat concept-reveal">cd folderName</div>',
  'The goal is functional recognition. Have {{student}} actually run the commands after answering.'));

 s.push(slide('Rebuild the Java pipeline',
  '<p class="q">Start with <code>Hello.java</code>. What comes next?</p>'+
  '<div class="beat equation">Hello.java</div>'+
  '<div class="beat equation">↓ javac / compiler</div>'+
  '<div class="beat equation">Hello.class / bytecode</div>'+
  '<div class="beat equation">↓ JVM</div>'+
  '<div class="beat equation">execution → output</div>',
  'Reveal only after {{student}} names the next stage. Ask file/tool/action classification along the way.'));

 s.push(slide('Which command has which job?',
  '<p class="q">Match the command to the job.</p>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">javac Hello.java</span></pre></div>'+
  '<div class="beat conclusion"><p><b>Compile:</b> source → bytecode</p></div>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">java Hello</span></pre></div>'+
  '<div class="beat conclusion"><p><b>Run:</b> execute the compiled program</p></div>',
  'Require the verbs compile and execute, not just “first command / second command.”'));

 s.push(slide('Mini lab',
  '<p class="q">Can you complete the full cycle on the Mac?</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Locate <code>Hello.java</code>.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Predict what <code>javac Hello.java</code> will create.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Compile, then verify with <code>ls</code>.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Predict the output, then run <code>java Hello</code>.</span></div>'+
  '<div class="beat step-line"><span class="step-num">05</span><span class="step-text">Change the printed text and repeat.</span></div>',
  '{{student}} should drive. If setup becomes the problem, preserve the mental model and postpone environment repair.'));

 s.push(slide('Debugging thought exercise',
  '<p class="q">You edited <code>Hello.java</code>, but the output still shows the old message. What might have happened?</p>'+
  '<div class="beat conclusion"><p>You may have run the old compiled bytecode without recompiling the changed source.</p></div>'+
  '<div class="beat equation">Edit → Compile again → Run again</div>',
  'This is an early causal debugging question without needing formal debugging vocabulary yet.'));

 s.push(slide('Exit check',
  '<p class="q">Can you explain Week 1 in three connected sentences?</p>'+
  '<div class="beat conclusion"><p>Programs take input, process data, and produce output.</p></div>'+
  '<div class="beat conclusion"><p>Source code is text saved in files that we edit and navigate on the computer.</p></div>'+
  '<div class="beat conclusion"><p>Java source is compiled to bytecode, then the JVM executes that bytecode.</p></div>',
  'Ask {{student}} for his version before revealing these model sentences.'));
 s.push(slide('Next: Python On-Ramp',
  '<p class="q">Week 1 answered: “What are programs and how can code become execution?”</p>'+
  '<div class="beat conclusion"><p>Next we start writing, changing, running, and debugging tiny programs ourselves.</p></div>',
  'This transition explains why Python appears briefly before Java becomes the main language.'));
 s.push(slide('Free resources',resources(l.resources),'Optional reinforcement only.'));
 return s.join('');
}


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
  '<pre class="code"><span class="code-line focus-line">print("Hello, {{student}}!")</span></pre>'+
  '<p class="q">What do you expect to appear?</p>'+
  '<div class="beat console-box">Hello, {{student}}!</div>'+
  '<div class="beat conclusion"><p><code>print(...)</code> asks Python to display a value.</p></div>',
  'Do not describe print first. Ask {{student}} to predict, run it, then name what he just observed.'));

 s.push(slide('Change only the value',
  '<pre class="code"><span class="code-line">print("<span class="old">Hello, {{student}}!</span><span class="beat new">Training starts now.</span>")</span></pre>'+
  '<p class="q">If the words change, what will the output do?</p>'+
  '<div class="beat console-box">Training starts now.</div>'+
  '<div class="beat conclusion"><p>Small code changes can produce visible behavior changes immediately.</p></div>',
  'Let {{student}} say the expected output before revealing the changed text. This is the edit–run feedback loop.'));

 s.push(slide('These look similar. Are they?',
  '<pre class="code"><span class="code-line">print(7 + 8)</span></pre>'+
  '<p class="q">What will this print?</p>'+
  '<div class="beat equation">7 + 8 → 15</div>'+
  '<div class="beat console-box">15</div>'+
  '<div class="beat"><pre class="code"><span class="code-line">print("7 + 8")</span></pre></div>'+
  '<div class="beat"><p class="q">Now what will this print?</p></div>'+
  '<div class="beat console-box">7 + 8</div>'+
  '<div class="beat conclusion"><p>Without quotes, Python evaluates arithmetic. Inside quotes, the characters are text.</p></div>',
  'This contrast is more useful than a long definition of string versus number. Pause before the second output.'));

 s.push(slide('Give a value a name',
  '<pre class="code"><span class="code-line">score = 10</span><span class="code-line focus-line">print(score)</span></pre>'+
  '<p class="q">What will print?</p>'+
  '<div class="beat memory-board"><div class="name">score</div><div class="value">10</div></div>'+
  '<div class="beat console-box">10</div>'+
  '<div class="beat conclusion"><p><code>score</code> is a variable name. Right now, it refers to the value <code>10</code>.</p></div>',
  'The MEMORY view is the stored state; the CONSOLE view is what print displays. Keep those two representations visually distinct and consistent. Formal terminology comes after the student sees the relationship.'));

 s.push(slide('A variable can change',
  '<pre class="code"><span class="code-line">score = 10</span><span class="code-line focus-line">score = score + 1</span><span class="code-line">print(score)</span></pre>'+
  '<p class="q">Before we run it: what value will <code>score</code> have after line 2?</p>'+
  '<div class="stateful-example"><div class="memory-board"><div class="name">score</div><div class="value"><span class="state-old">10</span><span class="state-new">11</span></div></div>'+
  '<div class="beat eval-step">score + 1 → 10 + 1</div>'+
  '<div class="beat eval-step">10 + 1 → 11</div>'+
  '<div class="beat value-update-trigger" aria-hidden="true"></div></div>'+
  '<div class="beat console-box">11</div>'+
  '<div class="beat conclusion"><p>First the right side is evaluated. Then <code>score</code> is updated in memory. Only after that does <code>print(score)</code> display the current value.</p></div>',
  'Keep the visual language stable: MEMORY always means stored state; EVALUATION shows the calculation; CONSOLE shows printed output. The useful change is 10 → 11 in memory, not a change of container.'));

 s.push(slide('A tiny decision',
  '<pre class="code"><span class="code-line">score = 11</span><span class="code-line">if score >= 10:</span><span class="code-line">    print("Goal met")</span></pre>'+
  '<p class="q">Will the message appear?</p>'+
  '<div class="beat equation">11 >= 10 → True</div>'+
  '<div class="beat console-box">Goal met</div>'+
  '<div class="beat conclusion"><p>The <code>if</code> block runs only when its condition is true.</p></div>',
  'Keep this light. The goal is only to show that code can respond to a condition. Do not turn this into a full branching lesson.'));

 s.push(slide('Your turn: Athlete Card',
  '<p class="q">Create a tiny program that introduces an athlete.</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Store a name in a variable.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Store a sport or event.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Store one number, such as sessions this week.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Print the values in a readable way.</span></div>'+
  '<div class="beat conclusion"><p>Then change one value. Predict the new output before running again.</p></div>',
  '{{student}} should type. If stuck, ask what information the program needs before suggesting syntax.'));

 s.push(slide('Exit check',
  '<p class="q">One question at a time.</p>'+
  '<div class="beat card"><h3>01</h3><p>What is the difference between <code>7 + 8</code> and <code>"7 + 8"</code>?</p></div>'+
  '<div class="beat card"><h3>02</h3><p>After <code>score = 10</code> and then <code>score = score + 1</code>, what is <code>score</code>?</p></div>'+
  '<div class="beat card"><h3>03</h3><p>What does changing one line and rerunning help you learn?</p></div>',
  'Reveal the next exit question only after {{student}} answers the current one.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>Write your prediction before you run the changed version.</p></div>','Keep it short and independent.'));
 s.push(slide('Free resources',resources(l.resources),'Use these only after {{student}} has attempted the code himself.'));
 return s.join('');
}

function buildInputDebugging(l){
 const s=[];
 s.push(cover(l,'Input & Debugging','Let the program receive data. Then learn to use errors as evidence.','Today the habit matters more than the number of error types. Keep asking: expected? actual? clue? smallest fix?'));
 s.push(slide('Start with yesterday',
  '<p class="q">Show one change you made to your Python program. What did you predict before you ran it?</p>'+
  '<div class="beat conclusion"><p>Prediction gives us something concrete to compare against what actually happened.</p></div>',
  'If {{student}} did not write a prediction, create one now before running the program again.'));

 s.push(slide('Can a program wait for you?',
  '<pre class="code"><span class="code-line">name = input("Name: ")</span><span class="code-line focus-line">print("Hello", name)</span></pre>'+
  '<p class="q">What do you think happens when this program reaches <code>input(...)</code>?</p>'+
  '<div class="beat console-box">Name: <span class="code-em">{{student}}</span></div>'+
  '<div class="beat memory-board"><div class="name">name</div><div class="value">"{{student}}"</div></div>'+
  '<div class="beat console-box">Hello {{student}}</div>'+
  '<div class="beat conclusion"><p>The program pauses, receives keyboard input, stores it, and continues.</p></div>',
  'Have {{student}} actually type the input. Connect this back to Input → Processing → Output.'));

 s.push(slide('A trap worth discovering',
  '<pre class="code"><span class="code-line">minutes = input("Minutes: ")</span><span class="code-line focus-line">print(minutes + 10)</span></pre>'+
  '<p class="q">If we type <code>40</code>, will this print <code>50</code>?</p>'+
  '<div class="beat memory-board"><div class="name">minutes</div><div class="value">"40"</div></div>'+
  '<div class="beat error-box"><p><b>Type problem:</b> the keyboard input is text, but <code>10</code> is a number.</p></div>'+
  '<div class="beat"><pre class="code"><span class="code-line">minutes = int(input("Minutes: "))</span><span class="code-line">print(minutes + 10)</span></pre></div>'+
  '<div class="beat console-box">50</div>',
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
  'Ask {{student}} to identify the visual clue before naming it as a syntax error.'));

 s.push(slide('Bug 2 — the name matters',
  '<pre class="code"><span class="code-line">minutes = 40</span><span class="code-line focus-line">print(minute)</span></pre>'+
  '<p class="q">What variable names exist right now?</p>'+
  '<div class="beat concept-reveal">Defined variable: <code>minutes</code></div>'+
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
  'Record where {{student}} hesitates; that becomes retrieval in Day 6.'));
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
  'Reveal requirements only after {{student}} restates the problem in his own words. Do not show code.'));

 s.push(slide('Before code: identify the flow',
  '<p class="q">What are the input, processing, and output?</p>'+
  '<div class="beat step-line"><span class="step-num">IN</span><span class="step-text">minutes per session + number of sessions</span></div>'+
  '<div class="beat step-line"><span class="step-num">DO</span><span class="step-text">multiply the two numbers</span></div>'+
  '<div class="beat step-line"><span class="step-num">OUT</span><span class="step-text">total training minutes</span></div>',
  'This reconnects Day 1 IPO to real program design. {{student}} should identify each part before it appears.'));

 s.push(slide('Say the algorithm in English',
  '<p class="q">No Python yet. What steps should the program perform?</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Ask for minutes per session.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Convert that input to a number.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Ask for number of sessions and convert it.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Multiply the two numbers.</span></div>'+
  '<div class="beat step-line"><span class="step-num">05</span><span class="step-text">Display the result.</span></div>',
  'If {{student}} cannot say the steps clearly, code will only hide the confusion.'));

 s.push(slide('Now write line 1',
  '<p class="q">How can we ask for minutes and make sure arithmetic will work?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line focus-line">minutes = int(input("Minutes per session: "))</span></pre></div>'+
  '<div class="beat conclusion"><p>One line can perform several small jobs: prompt → receive text → convert → store.</p></div>',
  'Let {{student}} attempt syntax first. Reveal only after an attempt.'));

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
  '<div class="beat console-box">Total training minutes: 120</div>',
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
  'Let {{student}} choose. Ownership matters; a small successful modification is enough.'));

 s.push(slide('Break it on purpose',
  '<p class="q">Create one bug. Then debug it using evidence.</p>'+
  '<div class="beat conclusion"><p>Expected → Actual → Clue → Suspicious line → Smallest fix → Test again</p></div>',
  'This integrates Day 5. Ask {{student}} to classify whether the bug prevents execution or produces wrong behavior.'));

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
 s.push(cover(l,'Practice 2','Python basics · debugging · small-program reasoning','Do not add new concepts. The session should expose what {{student}} can retrieve and rebuild without support.'));
 s.push(slide('Retrieval 1',
  '<p class="q">What is different about these two expressions?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line">7 + 8</span></pre></div>'+
  '<div class="beat"><pre class="code"><span class="code-line">"7 + 8"</span></pre></div>'+
  '<div class="beat conclusion"><p>One is arithmetic. One is text.</p></div>',
  'Do not reveal the second expression until {{student}} explains the first.'));

 s.push(slide('Retrieval 2',
  '<p class="q">Why might this need <code>int(...)</code>?</p>'+
  '<div class="beat"><pre class="code"><span class="code-line">minutes = input("Minutes: ")</span></pre></div>'+
  '<div class="beat memory-board"><div class="name">minutes</div><div class="value">"40"</div></div>'+
  '<div class="beat conclusion"><p>Keyboard input arrives as text. Arithmetic needs a numeric value.</p></div>',
  'Ask for the reason, not just “because we learned int.”'));

 s.push(slide('Trace without running',
  '<pre class="code"><span class="code-line">score = 5</span><span class="code-line">score = score + 2</span><span class="code-line">score = score * 3</span><span class="code-line focus-line">print(score)</span></pre>'+
  '<p class="q">What will print?</p>'+
  '<div class="beat equation">5 + 2 → 7</div>'+
  '<div class="beat equation">7 × 3 → 21</div>'+
  '<div class="beat console-box">21</div>',
  'Have {{student}} keep a tiny trace table on paper.'));

 s.push(slide('Debug without rushing',
  '<pre class="code"><span class="code-line">minutes = int(input("Minutes: "))</span><span class="code-line">sessions = 3</span><span class="code-line focus-line">total = minute + sessions</span><span class="code-line">print(total)</span></pre>'+
  '<p class="q">Before fixing anything: what did we expect, and what line deserves inspection?</p>'+
  '<div class="beat conclusion"><p>First clue: <code>minute</code> was never defined; the stored name is <code>minutes</code>.</p></div>'+
  '<div class="beat conclusion"><p>Second question: even after fixing the name, is <code>+</code> the correct operation for total training minutes?</p></div>',
  'There are two layers: a name bug and a logic bug. Let {{student}} find them separately.'));

 s.push(slide('Rebuild from a specification',
  '<p class="q">Write a new program that asks for laps and minutes per lap, then prints total minutes.</p>'+
  '<div class="beat step-line"><span class="step-num">01</span><span class="step-text">Say the algorithm in English.</span></div>'+
  '<div class="beat step-line"><span class="step-num">02</span><span class="step-text">Identify input, processing, and output.</span></div>'+
  '<div class="beat step-line"><span class="step-num">03</span><span class="step-text">Write the code without looking at yesterday’s solution.</span></div>'+
  '<div class="beat step-line"><span class="step-num">04</span><span class="step-text">Choose two tests and predict both results first.</span></div>',
  'This is the strongest transfer check of the week. Give hints before code.'));

 s.push(slide('Error log',
  '<p class="q">Pick the most useful mistake from today.</p>'+
  '<div class="step-line"><span class="step-num">1</span><span class="step-text">What was I trying to do?</span></div>'+
  '<div class="step-line"><span class="step-num">2</span><span class="step-text">What did I think would happen?</span></div>'+
  '<div class="step-line"><span class="step-num">3</span><span class="step-text">What actually happened?</span></div>'+
  '<div class="step-line"><span class="step-num">4</span><span class="step-text">What clue helped me repair it?</span></div>',
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



function apCover(l,topic,title,subtitle,teacher){
 return '<section class="slide active"><div class="slidecontent"><p class="lesson-meta">WEEK '+l.week+' · '+esc(l.sessionInWeek)+' · AP TOPIC '+topic+'</p><h1>'+title+'</h1><p class="big muted">'+subtitle+'</p>'+note(teacher)+'</div></section>';
}

function buildTopic11(l){
 const s=[];

 s.push(apCover(
  l,'1.1','Algorithms, Programs<br>& Errors',
  'From an idea → to Java → to evidence about what went wrong.',
  'Keep the algorithm portion short. This lesson should quickly move into real Java reading, compiling, error messages, and debugging. Every reveal must add a new reasoning step.'
 ));

 s.push(slide('Retrieve the workflow',
  '<p class="q">Last week we used this workflow. What belongs in the missing middle?</p>'+
  '<div class="flow-step">Problem → ? → Code → Test → Debug</div>'+
  '<div class="beat concept-reveal">Problem → <b>Algorithm</b> → Code → Test → Debug</div>',
  'One reveal only. This is retrieval, not a new lecture. Ask the student to explain algorithm in their own words.'
 ));

 s.push(slide('A route with a choice',
  '<p class="q">It is raining today. Which path through this plan will actually happen?</p>'+
  '<div class="flowchart rain-route">'+
    '<div class="flow-node rain-active">Put on shoes</div><div class="flow-down rain-active">↓</div>'+
    '<div class="flow-node rain-active">Check weather</div><div class="flow-down rain-active">↓</div>'+
    '<div class="flow-node choice rain-active">Raining?</div>'+
    '<div class="flow-split">'+
      '<div class="flow-branch rain-active"><span class="flow-label">YES</span><div class="flow-node">Take indoor gear</div></div>'+
      '<div class="flow-branch rain-inactive"><span class="flow-label">NO</span><div class="flow-node">Take track bag</div></div>'+
    '</div>'+
    '<div class="flow-merge"><span class="rain-active">↘</span><span class="rain-inactive">↙</span></div>'+
    '<div class="flow-node rain-active">Fill water bottle</div><div class="flow-down rain-active">↓</div>'+
    '<div class="flow-node rain-active">Leave for training</div>'+
    '<span class="beat branch-answer" aria-hidden="true"></span>'+
  '</div>',
  'Ask first. On reveal, the YES route becomes visually dominant and the NO route fades. Do not add a second textual answer underneath—the diagram itself should carry the meaning.'
 ));

 s.push(slide('Change one fact',
  '<p class="q">Tomorrow it is <b>not raining</b>. What changes? What stays the same?</p>'+
  '<div class="beat concept-reveal"><b>Changed:</b> indoor gear → track bag<br><b>Stayed the same:</b> the execution still follows one ordered path, one step at a time.</div>',
  'Do not repeat the full diagram. The learner already has it mentally. The point is to identify the invariant.'
 ));

 s.push(slide('Now name the idea',
  '<p class="q">What simple ideas explain both days?</p>'+
  '<div class="beat concept-reveal"><p><b>Algorithm:</b> a step-by-step process for completing a task or solving a problem.</p><p><b>Sequencing:</b> the order in which the steps are completed.</p></div>',
  'One reveal, one abstraction. Do not split the two definitions into separate clicks.'
 ));

 s.push(slide('Same algorithm, different representation',
  '<p class="q">What stayed the same? What changed?</p>'+
  '<div class="representation-grid">'+
    '<div class="representation-panel"><h3>WRITTEN LANGUAGE</h3><p>1. Put on shoes<br>2. Check weather<br>3. If raining, take indoor gear; otherwise take track bag<br>4. Fill water bottle<br>5. Leave for training</p></div>'+
    '<div class="representation-panel"><h3>DIAGRAM</h3>'+
      '<div class="flowchart compact">'+
        '<div class="flow-node">Put on shoes</div><div class="flow-down">↓</div>'+
        '<div class="flow-node">Check weather</div><div class="flow-down">↓</div>'+
        '<div class="flow-node choice">Raining?</div>'+
        '<div class="flow-split">'+
          '<div class="flow-branch"><span class="flow-label">YES</span><div class="flow-node">Indoor gear</div></div>'+
          '<div class="flow-branch"><span class="flow-label">NO</span><div class="flow-node">Track bag</div></div>'+
        '</div>'+
        '<div class="flow-merge">↘ ↙</div>'+
        '<div class="flow-node">Fill water</div><div class="flow-down">↓</div><div class="flow-node">Leave</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div class="beat concept-reveal"><b>Same algorithm.</b> The representation changed; the steps, order, and choice did not.</div>',
  'The two representations must be visible before asking the comparison. The answer is the only reveal.'
 ));

 s.push(slide('Now look at real Java',
  '<pre class="code"><span class="code-line">public class TrainingApp {</span><span class="code-line">    public static void main(String[] args) {</span><span class="code-line">        System.out.println("Ready to train.");</span><span class="code-line">    }</span><span class="code-line">}</span></pre>'+
  '<p class="q">Without explaining every symbol: which line do you think produces visible output?</p>'+
  '<div class="beat concept-reveal"><code>System.out.println("Ready to train.");</code></div>',
  'This is the first real Java reading scene. Do not teach every keyword. Let familiarity build before formal explanations later.'
 ));

 s.push(slide('Read the structure, not every keyword',
  '<pre class="code"><span class="code-line">public class TrainingApp {</span><span class="code-line">    public static void main(String[] args) {</span><span class="code-line">        System.out.println("Ready to train.");</span><span class="code-line">    }</span><span class="code-line">}</span></pre>'+
  '<p class="q">Find these three things in the code.</p>'+
  '<div class="practice-grid"><div class="practice-item"><h3>1</h3><p>the class name</p></div><div class="practice-item"><h3>2</h3><p>where this simple program begins executing</p></div><div class="practice-item"><h3>3</h3><p>the statement that prints</p></div></div>'+
  '<div class="beat"><div class="practice-answer-grid"><div><b>Class name</b><span>TrainingApp</span></div><div><b>Entry point</b><span>main</span></div><div><b>Output statement</b><span>System.out.println(...)</span></div></div></div>',
  'Let the student point at the code first. Reveal the answer panel once. Do not make three nearly identical clicks.'
 ));

 s.push(slide('Edit → compile → run',
  '<p class="q">If we change only the message to <code>"Ready for competition."</code>, what must happen before we see the new output?</p>'+
  '<div class="flow-step">Edit source → compile again → run again</div>'+
  '<div class="beat conclusion"><p>The compiler checks whether the source follows Java rules before execution can proceed.</p></div>',
  'This retrieves Week 1 and attaches it to a real Java program. One reveal is enough.'
 ));

 s.push(slide('Syntax error: the compiler can stop us',
  '<pre class="code"><span class="code-line">System.out.println("Warm up");</span><span class="code-line focus-line">System.out.println("Run 3 laps")</span><span class="code-line">System.out.println("Stretch");</span></pre>'+
  '<p class="q">What looks suspicious before we even compile?</p>'+
  '<div class="beat error-box"><span class="error-badge">SYNTAX ERROR</span><p>The second statement is missing <code>;</code>. The compiler can detect this before the program runs.</p></div>',
  'Ask the student to inspect punctuation first. The reveal adds the error category and compiler stage.'
 ));

 s.push(slide('Logic error: valid Java can still be wrong',
  '<p class="q">The intended order is <b>warm up → run → stretch</b>. Does this program match the plan?</p>'+
  '<pre class="code"><span class="code-line">System.out.println("Warm up");</span><span class="code-line">System.out.println("Stretch");</span><span class="code-line">System.out.println("Run 3 laps");</span></pre>'+
  '<div class="beat console-box">Warm up<br>Stretch<br>Run 3 laps</div>'+
  '<div class="beat error-box"><span class="error-badge">LOGIC ERROR</span><p>The code compiles and runs, but its behavior does not match the intended algorithm.</p></div>',
  'Two meaningful reveals: first observe actual behavior, then classify why that behavior is wrong.'
 ));

 s.push(slide('Run-time error: the problem appears during execution',
  '<pre class="code"><span class="code-line focus-line">System.out.println(10 / 0);</span></pre>'+
  '<p class="q">The statement follows Java syntax. What kind of failure appears only when execution reaches it?</p>'+
  '<div class="beat error-box"><span class="error-badge">RUN-TIME ERROR</span><p>Integer division by zero causes an <code>ArithmeticException</code> while the program is running.</p></div>',
  'Only one reveal. Topic 1.3 will later explain division in detail; here the focus is when the failure occurs.'
 ));

 s.push(slide('Three failure stages',
  '<p class="q">Use the stage to decide where to look first.</p>'+
  '<div class="stage-strip"><div><b>Before run</b><span>Compiler rejects invalid Java syntax.</span></div><div><b>Program runs</b><span>Testing reveals behavior that does not match intent.</span></div><div><b>During run</b><span>An execution problem interrupts the program.</span></div></div>'+
  '<div class="stage-strip"><div><span class="error-badge">SYNTAX</span></div><div><span class="error-badge">LOGIC</span></div><div><span class="error-badge">RUN-TIME</span></div></div>',
  'Static summary. No reveal. This page is for comparison, so the whole table must be visible together.'
 ));

 s.push(slide('Practice 1 — compile or fix?',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<p class="q">For each line: compile or fail? If it fails, what is the smallest fix?</p>'+
  '<div class="practice-grid">'+
    '<div class="practice-item"><h3>A</h3><pre class="code">System.out.println("Ready")</pre></div>'+
    '<div class="practice-item"><h3>B</h3><pre class="code">system.out.println("Ready");</pre></div>'+
    '<div class="practice-item"><h3>C</h3><pre class="code">System.out.println("Ready);</pre></div>'+
  '</div>'+
  '<div class="beat"><div class="practice-answer-grid"><div><b>A</b><span>Add <code>;</code></span></div><div><b>B</b><span><code>System</code> needs a capital S</span></div><div><b>C</b><span>Add the closing quote</span></div></div></div>',
  'All questions are visible at once. The student answers all three first. Then reveal one answer panel once.'
 ));

 s.push(slide('Practice 2 — read the compiler message',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<div class="compiler-message">TrainingApp.java:4: error: unclosed string literal\n    System.out.println("Ready);\n                       ^\n1 error</div>'+
  '<p class="q">Before fixing anything, what useful clues can you extract?</p>'+
  '<div class="beat"><div class="practice-answer-grid"><div><b>File</b><span>TrainingApp.java</span></div><div><b>Start looking near</b><span>line 4</span></div><div><b>Message</b><span>unclosed string literal</span></div><div><b>Caret</b><span>look near the quotation mark</span></div></div></div>',
  'The answer panel appears once after discussion. The habit is: read evidence before editing.'
 ));

 s.push(slide('Practice 3 — comments or instructions?',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<pre class="code"><span class="code-line">// Today\'s message</span><span class="code-line">System.out.println("Train smart");</span><span class="code-line">// System.out.println("Extra");</span></pre>'+
  '<p class="q">Exactly what will appear in OUTPUT?</p>'+
  '<div class="beat console-box">Train smart</div>'+
  '<div class="conclusion"><p>Comments help humans read source code; they are not executed as program instructions.</p></div>',
  'One prediction, one output reveal. Keep the explanation visible after the answer.'
 ));

 s.push(slide('Practice 4 — one program, two bugs',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<pre class="code"><span class="code-line">public class Warmup {</span><span class="code-line">  public static void main(String[] args) {</span><span class="code-line focus-line">    system.out.println("Start")</span><span class="code-line">  }</span><span class="code-line">}</span></pre>'+
  '<p class="q">Find one problem. Mentally fix it. Then inspect the same line again.</p>'+
  '<div class="beat concept-reveal">First: <code>system</code> → <code>System</code></div>'+
  '<div class="beat concept-reveal">Then: the statement still needs <code>;</code></div>'+
  '<div class="conclusion"><p>Debugging is iterative: one fix can expose the next problem.</p></div>',
  'Two reveals are justified here because the learning goal is iterative debugging: fix one, then re-inspect.'
 ));

 s.push(slide('AP Topic 1.1 — what matters',
  '<div class="ap-scope"><b>REPRESENT</b><span>Describe everyday algorithms with written language or diagrams.</span><b>SEQUENCE</b><span>Reason about the order in which steps occur.</span><b>COMPILE</b><span>Connect source code, compilation, and execution.</span><b>ERRORS</b><span>Distinguish syntax, logic, and run-time errors from evidence.</span></div>'+
  '<div class="conclusion"><p>The goal is not a vocabulary list. It is knowing what the program is trying to do, what Java actually does, and where a failure belongs.</p></div>',
  'Static scope summary. Do not reveal this table piece by piece.'
 ));

 s.push(slide('Exit check',
  '<p class="q">Answer without notes.</p>'+
  '<div class="cards"><div class="card"><h3>01</h3><p>Why can a compiler catch a syntax error but miss a logic error?</p></div><div class="card"><h3>02</h3><p>A program begins running and then stops abnormally. Which error category should you investigate first?</p></div><div class="card"><h3>03</h3><p>In the Java skeleton, what are the class name, <code>main</code>, and <code>println</code> doing at a practical level?</p></div></div>',
  'No answers on the slide. This is assessment, so keep the prompts visible together and listen for causal explanations.'
 ));

 s.push(slide('Homework',
  '<p class="big">Create one tiny Java program that prints two lines. Then deliberately make two different syntax mistakes, compile each version, and record the most useful clue from the compiler message.</p>'+
  '<div class="scope-note">Also write one example of a logic error that would still compile.</div>',
  'The homework now reinforces actual Java familiarity and compiler-reading habits instead of repeating the training-route diagram.'
 ));

 s.push(slide('Free resources',resources(l.resources),
  'Use the current CED as the scope check. CSAwesome and the linked free videos are reinforcement after the student has attempted the lesson activities.'
 ));

 return s.join('');
}

function buildTopic12(l){
 const s=[];

 s.push(apCover(
  l,'1.2','Variables<br>& Data Types',
  'A variable gives a value a place, a name, and a type.',
  'Scope for current AP Topic 1.2: variable mental model; data types as values + operations; primitive vs reference; int/double/boolean; declaring variables for numeric and Boolean data. Assignment/initialization belongs to Topic 1.4. Use CSAwesome for pedagogy, but preserve the current College Board topic boundaries.'
 ));

 s.push(slide('Warm-up: a program needs to remember something',
  '<pre class="code"><span class="code-line">System.out.println("Score:");</span><span class="code-line">System.out.println(12);</span></pre>'+
  '<p class="q">Printing <code>12</code> is easy. But what if the program needs to <b>remember</b> the score and use it later?</p>'+
  '<div class="beat concept-reveal">It needs a place to store the value.</div>',
  'This is the bridge from Topic 1.1 Java familiarity into variables. One question, one reveal.'
 ));

 s.push(slide('What is a variable?',
  '<p class="q">A program needs to remember a score of <code>12</code>. What identifies the stored value—and what else does Java need to know?</p>'+
  '<div class="topic12-variable-card">'+
    '<div class="topic12-variable-card-title">ONE VARIABLE IN MEMORY</div>'+
    '<div class="topic12-variable-row"><span>name</span><strong>score</strong></div>'+
    '<div class="topic12-variable-row"><span>current value</span><strong>12</strong></div>'+
    '<div class="beat topic12-variable-row topic12-variable-type-row" data-reveal-group="variable-model"><span>data type</span><strong>int <small>(whole-number values)</small></strong></div>'+
  '</div>'+
  '<div class="beat conclusion" data-reveal-group="variable-model"><p>A <b>variable</b> is named storage with an associated <b>data type</b>. Its stored value can change as the program runs.</p></div>',
  'Initial view: one memory representation, showing only name and stored value. Ask what the name identifies and whether Java can store just any kind of value there. Reveal once: a type row is added to THE SAME memory view, together with the single concise definition. Never display a second duplicate table. The next slide explains WHY types matter.'
 ));

 s.push(slide('Why does a variable need a type?',
  '<p class="q">Why should Java care whether a stored value is <code>12</code>, <code>37.8</code>, or <code>true</code>?</p>'+
  '<div class="beat concept-reveal"><p>A <b>data type</b> defines a set of possible values and the operations that make sense for those values.</p></div>',
  'This is the core AP definition of data type. Let the student give an example of an operation that makes sense for numbers but not for true/false.'
 ));

 s.push(slide('Two categories of data types',
  '<div class="two-type-grid">'+
    '<div class="type-family"><h3>PRIMITIVE TYPES</h3><p>Store primitive values such as numbers and Boolean values.</p><div class="type-family-examples"><code>int</code><code>double</code><code>boolean</code></div></div>'+
    '<div class="type-family"><h3>REFERENCE TYPES</h3><p>Used for objects that are not primitive values.</p><div class="type-family-examples"><code>String</code> <span class="muted">is one example</span></div></div>'+
  '</div>'+
  '<div class="scope-note">For Topic 1.2, know the category difference. We will work with objects and <code>String</code> in much more depth later.</div>',
  'Static explanation page. Do not reveal this piece by piece. The current CED requires primitive vs reference categories; do not introduce memory-address details.'
 ));

 s.push(slide('The three primitive types you need for AP CSA',
  '<div class="primitive-catalog">'+
    '<div><h3><code>int</code></h3><p>integer values</p><strong>12 &nbsp; 0 &nbsp; -76</strong></div>'+
    '<div><h3><code>double</code></h3><p>real-number values</p><strong>37.8 &nbsp; -0.9 &nbsp; 3.14</strong></div>'+
    '<div><h3><code>boolean</code></h3><p>true-or-false values</p><strong>true &nbsp; false</strong></div>'+
  '</div>'+
  '<div class="scope-note">Other Java primitive types such as <code>long</code>, <code>short</code>, <code>byte</code>, <code>float</code>, and <code>char</code> are outside the AP CSA exam scope.</div>',
  'This is the map of the territory. Keep all three visible together so the student can compare them.'
 ));

 s.push(slide('<code>int</code>: whole-number quantities',
  '<p class="q">Which kinds of information naturally fit <code>int</code>?</p>'+
  '<div class="example-strip"><div><b>laps</b><span>12</span></div><div><b>people</b><span>4</span></div><div><b>score</b><span>-3</span></div></div>'+
  '<div class="beat concept-reveal"><code>int</code> is appropriate when the value is an integer: no fractional part is needed.</div>',
  'Use examples that are quantities. Ask whether “2.5 people” makes sense in the intended model.'
 ));

 s.push(slide('<code>double</code>: fractional numeric values',
  '<p class="q">A 100-meter time is <code>10.42</code> seconds. Would <code>int</code> preserve the information we care about?</p>'+
  '<div class="beat concept-reveal" data-reveal-group="double-answer"><p>No. A <code>double</code> can represent real-number values with a fractional part.</p></div>'+
  '<div class="beat example-strip" data-reveal-group="double-answer"><div><b>raceTime</b><span>10.42</span></div><div><b>temperature</b><span>18.75</span></div><div><b>average</b><span>89.5</span></div></div>',
  'This mirrors the source’s average-grade and race-time reasoning: choose double when fractional information matters.'
 ));

 s.push(slide('<code>boolean</code>: a two-state fact',
  '<p class="q">What type best represents “Is it raining?”</p>'+
  '<div class="beat concept-reveal" data-reveal-group="boolean-answer"><code>boolean</code></div>'+
  '<div class="beat example-strip" data-reveal-group="boolean-answer"><div><b>isRaining</b><span>true</span></div><div><b>hasInsurance</b><span>false</span></div><div><b>goalMet</b><span>true</span></div></div>'+
  '<div class="beat conclusion" data-reveal-group="boolean-answer"><p>Java Boolean values are written <code>true</code> and <code>false</code>—not <code>1</code> or <code>0</code>.</p></div>',
  'The source contrasts boolean with using 0/1 or text. Keep the Java representation clear.'
 ));

 s.push(slide('A value can look numeric without being a quantity',
  '<p class="q">A locker code is written as <code>0042</code>. Are we going to add, subtract, or average locker codes?</p>'+
  '<div class="beat"><div class="concept-reveal"><p>It is an <b>identifier</b>, not a quantity.</p></div><pre class="code"><span class="code-line">String lockerCode;</span></pre><p><code>String</code> is a reference type used for text.</p></div>',
  'This is a modeling example, not a String lesson. Do not teach concatenation or String methods here.'
 ));

 s.push(slide('Declaring a variable in Java',
  '<p class="q">A declaration gives Java a type and a name. How would you declare these three variables?</p>'+
  '<div class="declaration-form"><span class="decl-type">type</span><span class="decl-name">name</span><span class="decl-end">;</span></div>'+
  '<div class="beat"><pre class="code"><span class="code-line">int score;</span><span class="code-line">double raceTime;</span><span class="code-line">boolean isRaining;</span></pre></div>',
  'Current Topic 1.2 requires writing declarations for numbers and Boolean values. Do not formally teach = assignment or initialization yet; that is Topic 1.4.'
 ));

 s.push(slide('Read a declaration',
  '<pre class="code"><span class="code-line focus-line">double averageTime;</span></pre>'+
  '<p class="q">What can you know from this one line?</p>'+
  '<div class="beat variable-profile"><div class="name">name</div><div class="value">averageTime</div><div class="name">type</div><div class="value">double</div><div class="name">can store</div><div class="value">real-number values</div></div>'+
  '<div class="beat conclusion"><p>The declaration does <b>not</b> tell us a current value yet.</p></div>',
  'This distinction is important because initialization belongs to Topic 1.4. Do not invent a value for an uninitialized declaration.'
 ));

 s.push(slide('Java habit: choose useful variable names',
  '<div class="naming-rules">'+
    '<div><b>Meaningful</b><span><code>gameScore</code> is clearer than <code>x</code>.</span></div>'+
    '<div><b>No spaces</b><span><code>raceTime</code>, not <code>race time</code>.</span></div>'+
    '<div><b>Case-sensitive</b><span><code>gameScore</code> and <code>gamescore</code> are different names.</span></div>'+
    '<div><b>Do not use keywords</b><span><code>int</code>, <code>class</code>, <code>if</code>, etc. are reserved.</span></div>'+
  '</div>'+
  '<div class="scope-note">Common Java style starts variable names with a lowercase letter and uses <b>camelCase</b> for multiple words.</div>',
  'This naming material comes from the CSAwesome reference as practical Java hygiene. It is useful, but it is not a separate AP Topic 1.2 learning objective.'
 ));

 s.push(slide('Practice 1 — choose the type',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<p class="q">Choose the best type for each specification. Give a reason.</p>'+
  '<div class="practice-grid">'+
    '<div class="practice-item"><h3>A</h3><p>average course grade: 89.5</p></div>'+
    '<div class="practice-item"><h3>B</h3><p>number of people in a household: 4</p></div>'+
    '<div class="practice-item"><h3>C</h3><p>first name: "Maya"</p></div>'+
    '<div class="practice-item"><h3>D</h3><p>is it raining?</p></div>'+
    '<div class="practice-item"><h3>E</h3><p>100-meter winning time: 9.81</p></div>'+
    '<div class="practice-item"><h3>F</h3><p>registration code: "007A"</p></div>'+
  '</div>'+
  '<div class="beat"><div class="practice-answer-grid">'+
    '<div><b>A</b><span><code>double</code></span></div>'+
    '<div><b>B</b><span><code>int</code></span></div>'+
    '<div><b>C</b><span>reference / <code>String</code></span></div>'+
    '<div><b>D</b><span><code>boolean</code></span></div>'+
    '<div><b>E</b><span><code>double</code></span></div>'+
    '<div><b>F</b><span>reference / <code>String</code></span></div>'+
  '</div></div>',
  'These are adapted from the reference’s type-selection activities. All prompts are visible first; reveal the entire answer panel only after the student commits.'
 ));

 s.push(slide('Practice 2 — which lines declare variables?',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<pre class="code"><span class="code-line">public class Player {</span><span class="code-line">    public static void main(String[] args) {</span><span class="code-line">        int numLives;</span><span class="code-line">        System.out.println("Start");</span><span class="code-line">        double health;</span><span class="code-line">        boolean powerUp;</span><span class="code-line">    }</span><span class="code-line">}</span></pre>'+
  '<p class="q">Which three lines are variable declarations?</p>'+
  '<div class="beat concept-reveal"><code>int numLives;</code><br><code>double health;</code><br><code>boolean powerUp;</code></div>',
  'This is modeled on the reference’s “find the declarations” exercise, but avoids assignment so we remain inside Topic 1.2.'
 ));

 s.push(slide('Practice 3 — legal name or fix it?',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<div class="practice-grid">'+
    '<div class="practice-item"><h3>A</h3><p><code>gameScore</code></p></div>'+
    '<div class="practice-item"><h3>B</h3><p><code>game score</code></p></div>'+
    '<div class="practice-item"><h3>C</h3><p><code>class</code></p></div>'+
    '<div class="practice-item"><h3>D</h3><p><code>gamescore</code></p></div>'+
  '</div>'+
  '<p class="q">Which are legal names? Which would you improve?</p>'+
  '<div class="beat"><div class="practice-answer-grid">'+
    '<div><b>A</b><span>legal + clear</span></div>'+
    '<div><b>B</b><span>illegal: no spaces</span></div>'+
    '<div><b>C</b><span>illegal: reserved keyword</span></div>'+
    '<div><b>D</b><span>legal, but <code>gameScore</code> is clearer camelCase</span></div>'+
  '</div></div>',
  'This separates legal syntax from good style. Do not imply that gamescore is illegal; it is simply less readable.'
 ));

 s.push(slide('Practice 4 — write the declarations',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<p class="q">Write one Java declaration for each piece of data.</p>'+
  '<div class="practice-grid">'+
    '<div class="practice-item"><h3>1</h3><p>number of students</p></div>'+
    '<div class="practice-item"><h3>2</h3><p>average GPA</p></div>'+
    '<div class="practice-item"><h3>3</h3><p>whether registration is open</p></div>'+
  '</div>'+
  '<div class="beat"><pre class="code"><span class="code-line">int numStudents;</span><span class="code-line">double averageGPA;</span><span class="code-line">boolean registrationOpen;</span></pre></div>',
  'Have the student write first. This directly targets AP 1.2.B: develop code to declare variables that store numbers and Boolean values.'
 ));

 s.push(slide('Practice 5 — AP-style choice',
  '<p class="practice-kicker">IN-CLASS PRACTICE</p>'+
  '<p class="q">Which pair is the most appropriate declaration for a student GPA and the number of students?</p>'+
  '<div class="choice-list">'+
    '<div>A. <code>int GPA; int numStudents;</code></div>'+
    '<div>B. <code>double GPA; int numStudents;</code></div>'+
    '<div>C. <code>double GPA; double numStudents;</code></div>'+
    '<div>D. <code>int GPA; boolean numStudents;</code></div>'+
  '</div>'+
  '<div class="beat concept-reveal"><b>B.</b> GPA may have a fractional value; the number of students is a whole-number count.</div>',
  'This mirrors the reasoning style of the reference’s AP practice without reproducing its exact exercise format.'
 ));

 s.push(slide('Scope check — what belongs to Topic 1.2?',
  '<div class="scope-columns">'+
    '<div><h3>YES — TODAY</h3><p>variable = storage + name + type</p><p>data type = values + operations</p><p>primitive vs reference</p><p><code>int</code>, <code>double</code>, <code>boolean</code></p><p>variable declarations</p></div>'+
    '<div><h3>NOT YET</h3><p><code>=</code> assignment and initialization → Topic 1.4</p><p>changing stored values with statements → Topic 1.4</p><p>casting / numeric range → Topic 1.5</p><p>String operations → Topic 1.15</p></div>'+
  '</div>',
  'This page is deliberately explicit because the CSAwesome reference includes material that the revised AP framework now places in later topics.'
 ));

 s.push(slide('Exit check',
  '<p class="q">Explain, do not just name the keyword.</p>'+
  '<div class="cards">'+
    '<div class="card"><h3>01</h3><p>What three ideas are attached to a variable?</p></div>'+
    '<div class="card"><h3>02</h3><p>Why is a data type more than a label?</p></div>'+
    '<div class="card"><h3>03</h3><p>When would you choose <code>double</code> instead of <code>int</code>?</p></div>'+
    '<div class="card"><h3>04</h3><p>Write a declaration for a true/false value named <code>goalMet</code>.</p></div>'+
  '</div>',
  'No answer reveal here. This is the teacher’s diagnostic. Listen for storage/name/type, values+operations, fractional information, and boolean goalMet.'
 ));

 s.push(slide('Homework',
  '<p class="big">Choose six pieces of real-world information. For each one: choose the best data type, explain why, and write a Java declaration when the type is <code>int</code>, <code>double</code>, or <code>boolean</code>.</p>'+
  '<div class="scope-note">Include one example that looks numeric but is really an identifier.</div>',
  'Keep the homework inside Topic 1.2. No assignment statements are required.'
 ));

 s.push(slide('Free resources',resources(l.resources),
  'The matching CSAwesome Topic 1.2 page is the primary optional reference. It contains additional assignment/initialization activities that we intentionally defer until Topic 1.4 under the revised AP framework.'
 ));

 return s.join('');
}

function buildTopic13(l){
 const s=[];
 s.push(apCover(l,'1.3','Expressions<br>& Output',
   'Predict exactly what Java prints—and explain the rule behind it.',
   'Reference alignment: CSAwesome 1.3.1 Output, 1.3.2 Expressions/Operators, 1.3.3 Compound Expressions, 1.3.4 Remainder, 1.3.5 Pay Calculator, 1.3.7 AP Practice. Official objectives 1.3.A/B/C. The order is adapted for learning, not copied. Explicitly exclude Topic 1.4 assignment, Topic 1.5 casting, Topic 1.15 concatenation.'
 ));

 // Output and string literals (reference 1.3.1).
 s.push(slide('What exactly appears on the screen?',
  '<pre class="code"><span class="code-line">System.out.print("Ready ");</span><span class="code-line">System.out.println("Go");</span><span class="code-line">System.out.print("Again");</span></pre>'+
  '<p class="q">Predict the exact output, including spaces and line breaks.</p>'+
  '<div class="beat console-box">Ready Go<br>Again</div>',
  'First require an exact prediction. Then reveal actual OUTPUT. Ask which statement moved to the next line: println prints then advances; print does not.'
 ));

 s.push(slide('Why are <code>print</code> and <code>println</code> different?',
  '<div class="lesson13-comparison"><div><h3>System.out.print(value)</h3><p>Displays the value; stays on the current line.</p></div>'+
  '<div><h3>System.out.println(value)</h3><p>Displays the value; then starts a new line.</p></div></div>'+
  '<p class="scope-note">The program can run several statements without showing anything extra between them. Line breaks are part of output behavior.</p>',
  'Static concept consolidation—not an unnecessary second reveal of the same output. This is the precise rule students use in the next edit exercise.'
 ));

 s.push(slide('Edit one method; keep three statements',
  '<pre class="code"><span class="code-line">System.out.print("Hi ");</span><span class="code-line focus-line">System.out.println("there");</span><span class="code-line">System.out.print("!");</span></pre>'+
  '<p class="q">Make the output exactly <code>Hi there!</code> on ONE line. Change as little as possible.</p>'+
  '<div class="beat"><p class="practice-kicker">SMALLEST FIX</p><pre class="code"><span class="code-line focus-line">System.out.print("there");</span></pre><p>Remove only the newline caused by the middle <code>println</code>.</p></div>',
  'Adapted from CSAwesome Activity 1.3.1. Ask the student to specify which single method to change before reveal. Do not reveal a duplicate full program.'
 ));

 s.push(slide('What is a literal?',
  '<pre class="code"><span class="code-line">System.out.println(7 + 8);</span><span class="code-line">System.out.println("7 + 8");</span></pre>'+
  '<p class="q">The characters look similar. Will the outputs be identical?</p>'+
  '<div class="beat"><div class="lesson13-output-pair"><div><span>FIRST LINE</span><strong>15</strong></div><div><span>SECOND LINE</span><strong>7 + 8</strong></div></div><p>A <b>literal</b> is a fixed value written in source code. Double quotes create a <b>string literal</b> (text), not a calculation.</p></div>',
  'One reveal adds the contrast and the concept. This lays groundwork for String literals without teaching concatenation.'
 ));

 s.push(slide('Special characters inside a String literal',
  '<p class="q">How can source code represent a quote, a backslash, or a line break as <b>text</b>?</p>'+
  '<div class="lesson13-escape-list">'+
  '<div><code>\\"</code><span>one quotation mark</span></div>'+
  '<div><code>\\\\</code><span>one backslash</span></div>'+
  '<div><code>\\n</code><span>one new line</span></div>'+
  '</div>'+
  '<p class="scope-note">These are the three escape sequences required in AP CSA Topic 1.3.</p>',
  'Static reference table, not a three-click reveal. An escape sequence begins with backslash inside a Java string literal.'
 ));

 s.push(slide('Use the escape sequences',
  '<pre class="code"><span class="code-line">System.out.println("Coach said: \\"Go!\\"");</span><span class="code-line">System.out.println("C:\\\\training");</span><span class="code-line">System.out.println("Lap 1\\nLap 2");</span></pre>'+
  '<p class="q">Predict the output. Where do the quote, slash, and new line actually appear?</p>'+
  '<div class="beat console-box">Coach said: "Go!"<br>C:\training<br>Lap 1<br>Lap 2</div>',
  'This is direct use of all three official escape sequences. The output is actual displayed characters; the backslash before quotes does not print. No String concatenation is used.'
 ));

 // Arithmetic fundamentals (reference 1.3.2).
 s.push(slide('An expression produces a value',
  '<p class="q">An arithmetic expression uses values and operators to calculate one numeric result.</p>'+
  '<div class="lesson13-operators"><div><code>+</code><span>add</span></div><div><code>-</code><span>subtract</span></div><div><code>*</code><span>multiply</span></div><div><code>/</code><span>divide</span></div><div><code>%</code><span>remainder</span></div></div>'+
  '<div class="scope-note">Java writes multiplication as <code>*</code>, not ×, and division as <code>/</code>, not ÷.</div>',
  'Static operator reference. Do not require a reveal to learn a five-item vocabulary map. The next slides show what these operators actually do.'
 ));

 s.push(slide('An expression can use variables',
  '<div class="lesson13-givens"><span>Given</span><code>sessions = 4</code><code>minutes = 35</code></div>'+
  '<pre class="code"><span class="code-line">System.out.println(sessions * minutes);</span></pre>'+
  '<p class="q">What is evaluated before <code>println</code> displays anything?</p>'+
  '<div class="beat eval-step">sessions * minutes → 4 * 35</div>'+
  '<div class="beat console-box">140</div>',
  'Values are given as a state snapshot. Do not teach assignment/initialization syntax here; that belongs to 1.4. Show that evaluation happens before output, which connects to Topic 1.2.'
 ));

 s.push(slide('Two integers: a surprising division',
  '<pre class="code"><span class="code-line">System.out.println(7 / 2);</span></pre>'+
  '<p class="q">Will this display <code>3.5</code>? Both numbers are <code>int</code>.</p>'+
  '<div class="beat"><div class="console-box">3</div><p>In <code>int / int</code>, Java discards the fractional part of the quotient. This is called <b>integer division</b>.</p></div>',
  'One reveal adds the output and the reason, rather than repeating the answer across multiple boxes.'
 ));

 s.push(slide('Change only the type of one operand',
  '<pre class="code"><span class="code-line">System.out.println(7.0 / 2);</span></pre>'+
  '<p class="q">Only one character changed. What happens to the result?</p>'+
  '<div class="beat"><div class="console-box">3.5</div><p>At least one <code>double</code> operand means this arithmetic calculation produces a <code>double</code>.</p></div>',
  'Deliberate contrast with the previous slide: 7 / 2 versus 7.0 / 2. Ask what stayed constant and what changed.'
 ));

 s.push(slide('Type rules survive a longer expression',
  '<div class="lesson13-givens"><span>Given</span><code>total = 18.0</code><code>groups = 5</code></div>'+
  '<p class="scope-note"><code>total</code> is <code>double</code>; <code>groups</code> is <code>int</code>.</p>'+
  '<pre class="code"><span class="code-line">System.out.println(total / groups);</span></pre>'+
  '<p class="q">Would integer division apply just because one variable is an <code>int</code>?</p>'+
  '<div class="beat"><div class="console-box">3.6</div><p>No. One operand is <code>double</code>, so the operation uses <code>double</code> arithmetic.</p></div>',
  'Transfer from literal operands to variables, explicitly required by 1.3.C. This is a new skill, not another decorative version of 7 / 2.'
 ));

 s.push(slide('A program can run and still calculate the wrong answer',
  '<p class="q">100 centimeters is how many inches? (1 inch = 2.54 cm)</p>'+
  '<pre class="code"><span class="code-line">System.out.println(100 * 2.54);</span></pre>'+
  '<p class="q">The code compiles. What is the <b>logic</b> problem?</p>'+
  '<div class="beat"><p class="practice-kicker">REPAIR THE FORMULA</p><pre class="code"><span class="code-line">System.out.println(100 / 2.54);</span></pre><p>The result is approximately <b>39.37 inches</b>. We divide centimeters by centimeters-per-inch.</p></div>',
  'Inspired by CSAwesome Activity 1.3.4. Classify it correctly as a logic error, NOT a Java exception. The displayed approximation is not labeled OUTPUT because Java prints more digits.'
 ));

 s.push(slide('A different division problem stops execution',
  '<pre class="code"><span class="code-line">System.out.println(10 / 0);</span></pre>'+
  '<p class="q">Syntax problem, wrong numeric result, or failure while running?</p>'+
  '<div class="beat error-box"><span class="error-badge">RUN-TIME ERROR</span><p>Integer division by zero throws <code>ArithmeticException</code> during execution.</p></div>',
  'Connect to Topic 1.1 error categories. The current AP CED excludes double divide-by-zero behavior. Do not extend into Infinity or NaN.'
 ));

 // Compound expressions (reference 1.3.3).
 s.push(slide('Longer expression, same few rules',
  '<pre class="code"><span class="code-line">System.out.println(2 + 3 * 4);</span></pre>'+
  '<p class="q">Will Java print <code>20</code> or <code>14</code>? Which operation is evaluated first?</p>'+
  '<div class="beat eval-step">3 * 4 → 12</div>'+
  '<div class="beat"><div class="console-box">14</div><p><code>*</code>, <code>/</code>, and <code>%</code> have higher precedence than <code>+</code> and <code>-</code>.</p></div>',
  'Reveal the grouping first, then the final output and rule. These two steps are genuinely different; avoid additional decorative clicks.'
 ));

 s.push(slide('Parentheses change the grouping',
  '<pre class="code"><span class="code-line">System.out.println((2 + 3) * 4);</span></pre>'+
  '<p class="q">Only parentheses changed. Which operation now happens first?</p>'+
  '<div class="beat eval-step">(2 + 3) → 5</div>'+
  '<div class="beat console-box">20</div>',
  'A causal comparison to the previous scene. Once the student sees grouping, do not require another redundant “definition” reveal.'
 ));

 s.push(slide('Equal precedence means left to right',
  '<p class="q">These look similar. Will they give the same output?</p>'+
  '<div class="lesson13-comparison"><div><h3>A</h3><p><code>18 / 3 * 2</code></p></div><div><h3>B</h3><p><code>18 / (3 * 2)</code></p></div></div>'+
  '<div class="beat"><div class="lesson13-output-pair"><div><span>A — LEFT TO RIGHT</span><strong>12</strong></div><div><span>B — PARENTHESES FIRST</span><strong>3</strong></div></div><p>With equal precedence, <code>/</code> and <code>*</code> group left to right unless parentheses change the grouping.</p></div>',
  'This slide isolates a new source of mistakes (same-precedence grouping) rather than repeating multiplication-before-addition.'
 ));

 // Remainder (reference 1.3.4).
 s.push(slide('The remainder answers a different question',
  '<p class="q">Seventeen cones. Five per rack. After filling full racks, how many are left over?</p>'+
  '<pre class="code"><span class="code-line">System.out.println(17 % 5);</span></pre>'+
  '<div class="beat"><div class="lesson13-remainder"><span>● ● ● ● ●</span><span>● ● ● ● ●</span><span>● ● ● ● ●</span><b>● ●</b></div><p>Three full racks of five, with <b>2 left over</b>.</p><div class="console-box">2</div></div>',
  'One meaningful visual reveal shows physical grouping + Java output. Here % computes remainder, not a percentage.'
 ));

 s.push(slide('Remainder when the first number is smaller',
  '<pre class="code"><span class="code-line">System.out.println(3 % 8);</span></pre>'+
  '<p class="q">Can you form even one complete group of eight? What remains?</p>'+
  '<div class="beat"><div class="console-box">3</div><p>Zero full groups fit, so all <b>3</b> remain.</p></div>',
  'Matches the important edge case in CSAwesome 1.3.4. Use positive operands in the AP scope.'
 ));

 // Classroom exercises with answers truly concealed.
 s.push(slide('Practice 1 — exact output',
  '<p class="practice-kicker">IN-CLASS · OUTPUT</p>'+
  '<pre class="code"><span class="code-line">System.out.print("Team ");</span><span class="code-line">System.out.println("A");</span><span class="code-line">System.out.print("Start");</span></pre>'+
  '<p class="q">Write the exact two lines that appear. Check every space and newline.</p>'+
  '<div class="beat console-box">Team A<br>Start</div>',
  'All prompts visible first. Teacher should collect answer before one reveal. It tests formatting on an unfamiliar example.'
 ));

 s.push(slide('Practice 2 — remainder sprint',
  '<p class="practice-kicker">IN-CLASS · REMAINDER</p>'+
  '<p class="q">Predict all three before revealing any answer.</p>'+
  '<div class="lesson13-quiz-grid"><div><code>23 % 10</code></div><div><code>4 % 9</code></div><div><code>20 % 5</code></div></div>'+
  '<div class="beat lesson13-answer-bar"><span><b>23 % 10</b> → 3</span><span><b>4 % 9</b> → 4</span><span><b>20 % 5</b> → 0</span></div>',
  'One answer key for all three, NOT one reveal per answer. These deliberately cover remainder, smaller dividend, and exact multiple.'
 ));

 s.push(slide('Practice 3 — read a mixed expression',
  '<p class="practice-kicker">IN-CLASS · TRACE</p>'+
  '<pre class="code"><span class="code-line">System.out.println(5 + 18 / 4 * 2);</span></pre>'+
  '<p class="q">Name the rules first. Then predict exactly what is printed.</p>'+
  '<div class="beat eval-step">18 / 4 → 4 <span class="muted">(int division)</span></div>'+
  '<div class="beat eval-step">4 * 2 → 8 <span class="muted">(left to right)</span></div>'+
  '<div class="beat console-box">13</div>',
  'Three meaningful reasoning moves: integer division, equal precedence, final printed result. Have the student articulate each before clicking.'
 ));

 s.push(slide('Practice 4 — modify one expression',
  '<p class="practice-kicker">IN-CLASS · TRANSFER</p>'+
  '<pre class="code"><span class="code-line">System.out.println((5 + 18) / 4 * 2);</span></pre>'+
  '<p class="q">Only the parentheses changed. What will print now?</p>'+
  '<div class="beat"><div class="eval-step">(5 + 18) / 4 * 2 → 23 / 4 * 2 → 5 * 2</div><div class="console-box">10</div></div>',
  'Single reveal combines the short new evaluation and result. This checks whether the learner can transfer all earlier rules.'
 ));

 s.push(slide('Practice 5 — AP-style multiple choice',
  '<p class="practice-kicker">IN-CLASS · AP REASONING</p>'+
  '<pre class="code"><span class="code-line">System.out.println(5 + 5 / 2 * 3 - 1);</span></pre>'+
  '<p class="q">Which output is correct? Explain why the other choices fail.</p>'+
  '<div class="lesson13-mcq"><div>A. 9</div><div>B. 10</div><div>C. 11.5</div><div>D. 14</div></div>'+
  '<div class="beat"><p><b>Answer: B</b></p><div class="eval-step">5 / 2 → 2; 2 * 3 → 6; 5 + 6 - 1 → 10</div><p><code>int / int</code> and precedence are the drivers.</p></div>',
  'Adapted in reasoning difficulty from the reference AP Practice; do not reveal the key until students select and defend a choice.'
 ));

 s.push(slide('Coding challenge — build a pay calculator',
  '<p class="practice-kicker">IN-CLASS · WRITE JAVA</p>'+
  '<p class="q">Write <code>System.out.println(...)</code> statements that calculate:</p>'+
  '<div class="lesson13-tasks"><div><b>1</b> Pay for 4 hours at $10/hour</div><div><b>2</b> Hours represented by $120 at $15/hour</div><div><b>3</b> Pay for 12 hours at $7.50/hour</div><div><b>4</b> Whole hours and leftover dollars from $100 at $9/hour</div></div>'+
  '<p class="scope-note">Type and run the code. Predict outputs first. You may work with a partner.</p>',
  'Reference alignment: CSAwesome Project 1.3.9 pay calculator. Give 8–10 minutes. No answers on this scene, and no new variables or assignment syntax required.'
 ));

 s.push(slide('Review the pay calculator',
  '<p class="q">Show your working Java statements before looking at a possible solution.</p>'+
  '<div class="beat"><pre class="code"><span class="code-line">System.out.println(4 * 10);</span><span class="code-line">System.out.println(120 / 15);</span><span class="code-line">System.out.println(12 * 7.50);</span><span class="code-line">System.out.println(100 / 9);</span><span class="code-line">System.out.println(100 % 9);</span></pre><div class="lesson13-answer-bar"><span>40</span><span>8</span><span>90.0</span><span>11</span><span>1</span></div></div>',
  'Reveal this complete worked answer key only after students have actually written code. The final two lines deliberately distinguish integer quotient and remainder.'
 ));

 s.push(slide('Topic 1.3 — exit check',
  '<p class="q">Answer without looking at previous slides.</p>'+
  '<div class="lesson13-tasks"><div><b>1</b> Why do <code>print</code> and <code>println</code> produce different line breaks?</div>'+
  '<div><b>2</b> Write a Java string literal that contains a quotation mark.</div>'+
  '<div><b>3</b> Explain why <code>11 / 4</code> and <code>11.0 / 4</code> differ.</div>'+
  '<div><b>4</b> Predict <code>2 + 13 % 5 * 2</code> and identify the driver.</div></div>',
  'Teacher diagnostic: answers are 1) newline behavior, 2) use \\" within quotes, 3) int vs double arithmetic, 4) 8 (13 % 5=3; 3*2=6; 2+6=8). Do not display the solutions to students.'
 ));

 s.push(slide('Homework and reference',
  '<p class="big">Create a Java program that prints a short two-line report and calculates one quantity using <code>/</code>, one using <code>%</code>, and one compound expression with parentheses.</p>'+
  '<div class="scope-note">Before you run it, predict every output. Bring one mistake or surprising result to our next lesson.</div>'+
  '<div class="beat"><p class="practice-kicker">FREE FOLLOW-UP MATERIAL</p>'+resources(l.resources)+'</div>',
  'CSAwesome2 Topic 1.3 is the matching reference. Optional practice follows student attempt. AP Topic 1.3 includes print/println, literals and three escapes, arithmetic expressions/int/double, remainder, precedence, and int divide-by-zero. Deferred: assignment (1.4), casting (1.5), concatenation (1.15).'
 ));
 return s.join('');
}

function buildWeek3Practice(l){
 const s=[];
 s.push(apCover(l,'1.1–1.3','Week 3 Practice','Can you find the simple rule inside a mixed problem?','This practice should not reteach the lessons. It should expose whether the learner can transfer the three mental models: execution/error stage, type/model choice, and expression evaluation.'));

 s.push(slide('Challenge 1 — trace the path',
  '<p class="q">A training plan says: check weather; if raining, choose indoor gear; otherwise choose track gear; then fill water and leave. Today it is dry.</p>'+
  '<div class="beat flow-step">Check weather → track gear → water → leave</div>'+
  '<div class="conclusion"><p>What simple concept lets you describe the actual run? <b>Sequencing along the chosen path.</b></p></div>'+
  '<div class="scope-note">You are not being tested on Java conditionals yet.</div>',
  'The surface includes a choice, but the required Week 3 insight is ordered execution.'));

 s.push(slide('Challenge 2 — what kind of failure?',
  '<p class="q">Classify each from evidence, not from memorized definitions.</p>'+
  '<div class="card"><h3>A</h3><p>Compiler reports a missing semicolon.</p></div>'+
  '<div class="beat concept-reveal" data-reveal-group="answers">syntax</div>'+
  '<div class="card"><h3>B</h3><p>Program runs but prints Stretch before Run, against the specification.</p></div>'+
  '<div class="beat concept-reveal" data-reveal-group="answers">logic</div>'+
  '<div class="card"><h3>C</h3><p>Program begins, reaches <code>10 / 0</code>, and stops.</p></div>'+
  '<div class="beat concept-reveal" data-reveal-group="answers">run-time / exception</div>',
  'Require the detection stage: compiler, testing/behavior, execution.'));

 s.push(slide('Challenge 3 — choose the representation',
  '<p class="q">A registration system needs these four pieces of information. Choose types and explain the non-obvious one.</p>'+
  '<div class="type-choice"><div class="type-label">laps</div><div>12</div><div>?</div></div>'+
  '<div class="type-choice"><div class="type-label">time</div><div>37.8</div><div>?</div></div>'+
  '<div class="type-choice"><div class="type-label">qualified</div><div>true / false</div><div>?</div></div>'+
  '<div class="type-choice"><div class="type-label">bib</div><div>007</div><div>?</div></div>'+
  '<div class="beat conclusion" data-reveal-group="answers"><p>The bib is the trap: appearance does not determine meaning. An identifier should not be modeled as a quantity merely because it contains digits.</p></div>',
  'Look for reasoning: whole number → int; fractional number → double; two-state logic → boolean; identifier → reference/text category.'));

 s.push(slide('Challenge 4 — a longer expression',
  '<pre class="code"><span class="code-line focus-line">System.out.println(3 + 14 / 5 * 2);</span></pre>'+
  '<p class="q">Do not calculate randomly. Name the rules first.</p>'+
  '<div class="beat eval-step">14 / 5 → 2 <span class="muted">(int division)</span></div>'+
  '<div class="beat eval-step">2 * 2 → 4 <span class="muted">(same precedence, left to right)</span></div>'+
  '<div class="beat eval-step">3 + 4 → 7</div>'+
  '<div class="beat console-box">7</div>',
  'This is a transfer test: the expression looks longer than lesson examples, but no new rule is needed.'));

 s.push(slide('Challenge 5 — change one thing',
  '<p class="q">What if only <code>14</code> becomes <code>14.0</code>?</p>'+
  '<pre class="code"><span class="code-line focus-line">System.out.println(3 + 14.0 / 5 * 2);</span></pre>'+
  '<div class="beat eval-step">14.0 / 5 → 2.8</div>'+
  '<div class="beat eval-step">2.8 * 2 → 5.6</div>'+
  '<div class="beat eval-step">3 + 5.6 → 8.6</div>'+
  '<div class="beat console-box">8.6</div>'+
  '<div class="beat conclusion"><p>One type change can propagate through the entire expression.</p></div>',
  'This connects Topic 1.2 type choice to Topic 1.3 arithmetic behavior.'));

 s.push(slide('Build a tiny Java report',
  '<p class="q">Write code that declares three primitive variables and prints three separate lines.</p>'+
  '<div class="step-line"><span class="step-num">1</span><span class="step-text">an <code>int</code> for completed laps</span></div>'+
  '<div class="step-line"><span class="step-num">2</span><span class="step-text">a <code>double</code> for race time</span></div>'+
  '<div class="step-line"><span class="step-num">3</span><span class="step-text">a <code>boolean</code> for whether a goal was met</span></div>'+
  '<div class="step-line"><span class="step-num">4</span><span class="step-text">use <code>println</code> to display each value on its own line</span></div>'+
  '<div class="conclusion"><p>Stay inside Week 3 scope: declarations + output. No assignment updates, conditionals, or String concatenation needed.</p></div>',
  'This is a genuine code-production task with a deliberate scope boundary.'));

 s.push(slide('Error log',
  '<p class="q">Choose the mistake that taught you the most.</p>'+
  '<div class="beat step-line"><span class="step-num">1</span><span class="step-text">What did I predict?</span></div>'+
  '<div class="beat step-line"><span class="step-num">2</span><span class="step-text">What rule did I forget or misuse?</span></div>'+
  '<div class="beat step-line"><span class="step-num">3</span><span class="step-text">What evidence corrected me?</span></div>'+
  '<div class="beat step-line"><span class="step-num">4</span><span class="step-text">What new example would test the same idea?</span></div>',
  'The last prompt turns an error into a transfer problem.'));

 s.push(slide('Week 3 exit',
  '<p class="q">Can you connect all three topics?</p>'+
  '<div class="conclusion"><p><b>1.1:</b> execution follows an algorithm; failures occur at different stages.</p></div>'+
  '<div class="conclusion"><p><b>1.2:</b> types model what values mean and which operations fit them.</p></div>'+
  '<div class="conclusion"><p><b>1.3:</b> expressions follow deterministic evaluation rules before output is displayed.</p></div>'+
  '<div class="conclusion"><p>Longer code becomes manageable when you can identify which small rule is driving each part.</p></div>',
  'This is the Week 3 north star. Ask the learner to give a fresh example for one of the three statements.'));

 s.push(slide('Free resources',resources(l.resources),'Use practice resources to reinforce weak points discovered in the error log.'));
 return s.join('');
}


function buildVariablesLesson(l){
  const currentIndex=D.lessons.findIndex(x=>x.id===l.id);
  const prev=currentIndex>0?D.lessons[currentIndex-1]:null;
  const prevTask=prev?.homework||'Review the previous lesson.';
  const s=[];

  s.push('<section class="slide active"><div class="slidecontent"><p class="lesson-meta">WEEK '+l.week+' · '+esc(l.sessionInWeek)+' · AP TOPIC 1.2</p><h1>Variables<br>and Data Types</h1><p class="big muted">A lesson about values, names, and choosing the right kind of data.</p>'+note('Today, do not begin with definitions. Let {{student}} experience variables as changing stored values first. The formal vocabulary comes after the first prediction cycle.')+'</div></section>');

  s.push(slide('Before we start',
    '<p class="prompt-label">FROM THE PREVIOUS LESSON</p><p class="q">'+esc(prevTask)+'</p><div class="beat conclusion"><p>Show one example before explaining it.</p></div>',
    'Ask to see the previous work. If the compiler/error distinction from Topic 1.1 is shaky, repair it briefly. Then move on.'));

  s.push(slide('What will this print?',
    '<pre class="code"><span class="code-line">int a = 5;</span><span class="code-line">int b = 3;</span><span class="code-line focus-line">System.out.println(a + b);</span></pre><p class="q">Make a prediction before we reveal anything.</p>'+
    '<div class="beat memory-board"><div class="name">a</div><div class="value">5</div></div>'+
    '<div class="beat memory-board"><div class="name">b</div><div class="value">3</div></div>'+
    '<div class="beat equation">a + b → 5 + 3</div>'+
    '<div class="beat equation">5 + 3 → 8</div>'+
    '<div class="beat console-box">8</div>',
    'Do not reveal until {{student}} commits to an answer. After each reveal, ask what changed in his mental picture. The goal is to connect the variable name to the value currently stored there.'));

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
    '<div class="beat variable-profile"><div class="name">name</div><div class="value">a</div><div class="name">type</div><div class="value">int</div><div class="name">current value</div><div class="value">8</div></div>',
    'Let {{student}} propose wording first. Then reveal the formal language. Avoid treating the definition as the beginning of learning; it is a label for the experience he just had.'));

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
    '<p class="q">What about a name such as <b>{{student}}</b>?</p>'+
    '<div class="beat"><pre class="code"><span class="code-line focus-line">String athlete = "{{student}}";</span></pre></div>'+
    '<div class="beat conclusion"><p><code>String</code> stores text. Notice that it begins with a capital letter because it is a class type, not one of Java’s primitive types.</p></div>',
    'Keep the distinction light. Today {{student}} only needs to recognize int/double/boolean as primitive types and String as a commonly used reference type. Do not expand into memory-model details yet.'));

  s.push(slide('Predict before running',
    '<pre class="code"><span class="code-line">int laps = 4;</span><span class="code-line">laps = 6;</span><span class="code-line focus-line">System.out.println(laps);</span></pre><p class="q">What prints: 4 or 6?</p>'+
    '<div class="beat equation">laps → 6</div>'+
    '<div class="beat conclusion"><p>Assignment replaces the variable’s previous value with a new compatible value.</p></div>',
    'This is the key state-change check. If {{student}} says 4, go back to the variable box idea rather than explaining assignment abstractly.'));

  s.push(slide('Your turn',
    '<p class="q">Model a training session with four variables.</p>'+
    '<div class="beat cards"><div class="card"><h3>01</h3><p>athlete name</p></div><div class="card"><h3>02</h3><p>laps completed</p></div><div class="card"><h3>03</h3><p>average lap time</p></div></div>'+
    '<div class="beat card"><h3>04</h3><p>whether today was a personal best</p></div>'+
    '<div class="beat conclusion"><p>For each variable: choose a name, choose a type, choose a sample value, and explain your choice.</p></div>',
    '{{student}} should do the typing. Prompt with “What kind of information is this?” rather than giving the Java type.'));

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
 s.push(slide('Hands-on activity','<p class="big">'+esc(l.activity)+'</p>','{{student}} should do the typing or tracing. Give hints before code.'));
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
 s.push(slide('Trace','<p class="q">Choose one recent code example. Predict every important variable value or output before running it.</p>','Have {{student}} use a trace table.'));
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
 document.title=L.title+' • AP CSA Foundations';
 if(L.id==='f1') deck.innerHTML=buildWhatIsComputer(L);
 else if(L.id==='f2') deck.innerHTML=buildFilesEnvironment(L);
 else if(L.id==='f3') deck.innerHTML=buildSourceExecution(L);
 else if(L.id==='p-foundation-1') deck.innerHTML=buildFoundationPractice1(L);
 else if(L.id==='f4') deck.innerHTML=buildPythonOnRamp(L);
 else if(L.id==='f5') deck.innerHTML=buildInputDebugging(L);
 else if(L.id==='f6') deck.innerHTML=buildPythonChallenge(L);
 else if(L.id==='p-foundation-2') deck.innerHTML=buildFoundationPractice2(L);
 else if(L.id==='u1-1') deck.innerHTML=buildTopic11(L);
 else if(L.id==='u1-2') deck.innerHTML=buildTopic12(L);
 else if(L.id==='u1-3') deck.innerHTML=buildTopic13(L);
 else if(L.id==='p-1-1-1-3') deck.innerHTML=buildWeek3Practice(L);
 else deck.innerHTML=L.kind==='practice'?buildPractice(L):buildLesson(L);
}

deck.innerHTML=deck.innerHTML.replaceAll('{{student}}',esc(studentName()));
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

function markRevealHistory(){
 const shown=revealedBeats();
 shown.forEach((el,idx)=>el.classList.toggle('past-beat',idx<shown.length-1));
}

function fitCurrentSlide(){
 const slide=currentSlide();
 const content=slide?.querySelector('.slidecontent');
 if(!slide||!content)return;

 // Start large. Only compact when the current reveal state actually needs it.
 slide.classList.remove('fit-compact','fit-dense');
 content.style.zoom='1';

 requestAnimationFrame(()=>{
   const style=getComputedStyle(slide);
   const availableH=slide.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
   const availableW=slide.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);

   const over=()=>content.scrollHeight>availableH*0.985 || content.scrollWidth>availableW*0.995;

   if(over()) slide.classList.add('fit-compact');

   requestAnimationFrame(()=>{
     if(over()) slide.classList.add('fit-dense');

     requestAnimationFrame(()=>{
       const h=content.scrollHeight;
       const w=content.scrollWidth;
       let scale=Math.min(1,availableH/Math.max(h,1),availableW/Math.max(w,1));

       // Keep text readable on a TV; dense spacing usually prevents needing
       // more than this. Still allow enough reduction to avoid scrolling.
       scale=Math.max(0.68,Math.min(1,scale));
       content.style.zoom=String(scale);
     });
   });
 });
}

function render(){
 slides.forEach((s,j)=>s.classList.toggle('active',j===i));
 const hidden=hiddenBeats();
 const revealed=revealedBeats();
 markRevealHistory();
 document.querySelector('#counter').textContent='Scene '+(i+1)+' / '+slides.length+(hidden.length?' · '+revealed.length+'/'+(hidden.length+revealed.length)+' reveals':'');
 document.querySelector('#nextBtn').textContent=hidden.length?'Reveal →':'Next →';
 updateTeacher();
 fitCurrentSlide();
}
function next(){
 const hidden=hiddenBeats();
 if(hidden.length){
   const first=hidden[0];
   const group=first.dataset.revealGroup;
   if(group) hidden.filter(x=>x.dataset.revealGroup===group).forEach(x=>x.classList.add('revealed'));
   else first.classList.add('revealed');
   render();return;
 }
 if(i<slides.length-1){i++;render();}
}
function prev(){
 const shown=revealedBeats();
 if(shown.length){
   const last=shown[shown.length-1];
   const group=last.dataset.revealGroup;
   if(group) shown.filter(x=>x.dataset.revealGroup===group).forEach(x=>x.classList.remove('revealed'));
   else last.classList.remove('revealed');
   render();return;
 }
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
window.addEventListener('resize',fitCurrentSlide);
document.addEventListener('fullscreenchange',()=>requestAnimationFrame(fitCurrentSlide));
if(document.fonts?.ready) document.fonts.ready.then(fitCurrentSlide);
render();