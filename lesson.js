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
  '<div class="beat card"><h3>01</h3><p>In Calculator, what is input? What is output?</p></div>'+
  '<div class="beat card"><h3>02</h3><p>What does “processing” mean in our simple model?</p></div>'+
  '<div class="beat card"><h3>03</h3><p>How is an application related to a program?</p></div>'+
  '<div class="beat card"><h3>04</h3><p>Give one example of data used by a program.</p></div>',
  'Do not reveal all four prompts at once. Record any concept that needs retrieval tomorrow.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>Tomorrow, be ready to explain one example without notes.</p></div>','Keep the homework observational, not definition memorization.'));
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
  '<div class="beat card"><h3>01</h3><p>What is a source-code file?</p></div>'+
  '<div class="beat card"><h3>02</h3><p>What job does an editor do?</p></div>'+
  '<div class="beat card"><h3>03</h3><p>What is the relationship between Finder and Terminal?</p></div>'+
  '<div class="beat card"><h3>04</h3><p>What do <code>pwd</code>, <code>ls</code>, and <code>cd</code> help you do?</p></div>',
  'If Finder vs Terminal is unclear, redo the live same-folder demonstration.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>Tomorrow, be ready to show the folder and explain the role of each tool.</p></div>','The next lesson begins with the actual workspace, not definitions.'));
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
  '<div class="beat card"><h3>01</h3><p>What does <code>javac</code> do?</p></div>'+
  '<div class="beat card"><h3>02</h3><p>What file is produced from <code>Hello.java</code>?</p></div>'+
  '<div class="beat card"><h3>03</h3><p>What does the JVM do?</p></div>'+
  '<div class="beat card"><h3>04</h3><p>After changing source code, why compile again?</p></div>',
  'If compiler versus JVM is mixed up, return to the two verbs: transform versus execute.'));
 s.push(slide('Homework','<p class="big">'+esc(l.homework)+'</p><div class="beat conclusion"><p>Draw the pipeline from memory, then change the printed text, compile, and run again.</p></div>','The next session is practice, so bring the drawing and the working folder.'));
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
  '<div class="memory-board"><div class="name">score</div><div class="value">10</div></div>'+
  '<div class="beat eval-step">score + 1 → 10 + 1</div>'+
  '<div class="beat eval-step">10 + 1 → 11</div>'+
  '<div class="beat memory-board"><div class="name">score</div><div class="value">11</div></div>'+
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
 else if(L.id==='u1-2') deck.innerHTML=buildVariablesLesson(L);
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