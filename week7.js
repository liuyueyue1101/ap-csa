/* Week 7 custom AP CSA decks. Requires w6code, w6answer, w6quiz from week6.js.
  All classroom-facing prose in English. Separate question from answer on every assessment. */
function w7diagram(parts){
 return '<div class="w7-diagram">'+parts.map(([name,value])=>'<div><span>'+esc(name)+'</span><strong>'+esc(value)+'</strong></div>').join('<div class="w7-link">→</div>')+'</div>';
}
function w7scenes(l,id,title,subtitle,teacher){
 return [apCover(l,id,title,subtitle,teacher)];
}
function buildTopic113(l){
 const s=w7scenes(l,'1.13','Object Creation<br>& Constructors',
  'Read a constructor signature, create an object, then track its reference.',
  'CSAwesome2 1.13.1 World, 1.13.2 Turtle, 1.13.3 references, 1.13.4 signatures, 1.13.5 arguments/call by value, 1.13.6 Custom Turtles. CED 1.13.A–C; no premature teaching of authoring constructors.');
 s.push(slide('Retrieve: does a declaration create an object?',
  w6code(['Turtle hero;'])+
  '<p class="q">How many Turtle objects are created by this statement?</p>'+
  w6answer('<b>ZERO.</b><p>This declares a local <code>Turtle</code> reference variable. It is not yet assigned an object.</p>'),
  'Build directly from 1.12. Local references are not automatically initialized to null.'));
 s.push(slide('The keyword new creates an instance',
  w6code(['World home = new World();'])+
  '<div class="w7-anatomy"><div>World<span>REFERENCE TYPE</span></div><div>home<span>VARIABLE</span></div><div>new World()<span>CONSTRUCTOR CALL</span></div></div>'+
  '<p class="scope-note">In the CSAwesome Turtle library, this creates a World object and stores its reference in <code>home</code>.</p>',
  'This is library-specific (World is not java.lang), but syntax generalizes to all Java reference types.'));
 s.push(slide('One line, three distinct actions',
  w6code(['World home = new World();'])+
  '<p class="q">What are the steps, in order, from Java source to a usable reference?</p>'+
  '<div class="beat eval-step">1. Declare a reference variable of type World.</div>'+
  '<div class="beat eval-step">2. new World() constructs and initializes the object.</div>'+
  '<div class="beat eval-step">3. Store the new object reference in home.</div>',
  'Three steps genuinely add new information; this is not three copies of one output.'));
 s.push(slide('The reference and the object are different',
  '<p class="q">Where does the object live, and what is stored in the variable?</p>'+
  '<div class="w7-ref-scene"><div class="w7-ref-name">home<span>REFERENCE VARIABLE</span></div><div class="w7-arrow">→</div><div class="w7-ref-object">World object<span>WIDTH · HEIGHT</span></div></div>'+
  '<p class="scope-note">The variable stores a reference to the object, not all of its attributes.</p>',
  'Single stable reference diagram, no duplicate memory boards.'));
 s.push(slide('A constructor has the SAME name as its class',
  '<div class="api-spec"><h3>Class: World</h3><p><code>World()</code></p><p><code>World(int width, int height)</code></p></div>'+
  '<p class="q">Are these methods called drawWorld, or constructors named World?</p>'+
  w6answer('<p>They are <b>constructors</b>. Each is named <code>World</code> to match the class and helps initialize a new instance.</p>'),
  'These are actual constructors in CSAwesome Turtle library.'));
 s.push(slide('Constructor signatures choose HOW to build',
  '<div class="api-spec"><h3>Available signatures</h3><p><code>World()</code> — default size</p><p><code>World(int, int)</code> — chosen width and height</p></div>'+
  '<p class="q">Which signature matches <code>new World(320, 240)</code>?</p>'+
  w6answer('<b>World(int, int)</b><p>There are two <code>int</code> arguments in the required order.</p>'),
  'Signature includes name and ordered parameter types, not argument names.'));
 s.push(slide('Overloading: one class, different signatures',
  w6code(['World first = new World();','World second = new World(320, 240);'])+
  '<p class="q">How can both constructor calls be valid?</p>'+
  w6answer('<p>The class has <b>overloaded constructors</b> with different parameter lists. The supplied arguments select one.</p>'),
  'Do not teach implementing a constructor; recognize selection.'));
 s.push(slide('No arguments still require parentheses',
  '<p class="q">Which expression actually calls the no-argument constructor?</p>'+
  w6code(['new World','new World()'])+
  w6answer('<b>new World()</b><p>The parentheses are required, even when no arguments are passed.</p>'),
  'Do not represent new World as compilable code.'));
 s.push(slide('Arguments initialize attributes',
  w6code(['World arena = new World(300, 400);'])+
  '<p class="q">Which values become the new World’s width and height?</p>'+
  w6answer(w6pair([['WIDTH','300'],['HEIGHT','400']])+
  '<p>The constructor receives arguments used to establish initial object state.</p>'),
  'Documented World signature (width,height); distinguish dimension order.'));
 s.push(slide('World is one class; Turtle is another',
  '<div class="api-spec"><h3>CSAwesome Turtle constructors</h3><p><code>Turtle(World)</code></p><p><code>Turtle(int x, int y, World)</code></p></div>'+
  '<p class="q">A Turtle needs a world to draw in. What information does the second constructor add?</p>'+
  w6answer('<p>It also receives the turtle’s starting x and y coordinates.</p>'),
  'Exact argument signatures from CSAwesome 1.13.2.'));
 s.push(slide('A correct Turtle constructor call',
  w6code(['World arena = new World(400, 300);','Turtle racer = new Turtle(80, 90, arena);'])+
  '<p class="q">Which arguments initialize position, and which identifies the world?</p>'+
  w6answer('<div class="w7-arg-row"><span>x = 80</span><span>y = 90</span><span>World = arena</span></div>'),
  'Order is (int,int,World), not (World,int,int).'));
 s.push(slide('Mismatch: the same values in the wrong order',
  w6code(['Turtle racer = new Turtle(arena, 80, 90);'])+
  '<p class="q">Why does this fail when the only signatures are Turtle(World) and Turtle(int,int,World)?</p>'+
  w6answer('<b>NO MATCHING CONSTRUCTOR.</b><p>The three-argument signature requires <code>(int, int, World)</code>, not <code>(World, int, int)</code>.</p>'),
  'Type/order mismatch, not null exception.'));
 s.push(slide('Count objects, not variable names',
  w6code(['World arena = new World();','Turtle a = new Turtle(arena);','Turtle b = a;'])+
  '<p class="q">How many World and Turtle objects were created?</p>'+
  w6answer(w6pair([['WORLD OBJECTS','1'],['TURTLE OBJECTS','1']])+
  '<p><code>b = a</code> copies a reference; it does not create another Turtle.</p>'),
  'No duplicate object diagram; count separately.'));
 s.push(slide('A SECOND new call creates a second object',
  w6code(['Turtle a = new Turtle(arena);','Turtle b = new Turtle(arena);'])+
  '<p class="q">Even with the same World argument, how many Turtles exist?</p>'+
  w6answer('<b>TWO.</b><p>Each evaluated <code>new Turtle(arena)</code> creates a distinct Turtle object.</p>'),
  'Causal contrast with preceding slide.'));
 s.push(slide('null holds no object',
  w6code(['Turtle mascot = null;'])+
  '<p class="q">Is this a reference to a special Turtle object, or the absence of an object?</p>'+
  w6answer('<p><b>No object.</b> The reference variable exists and stores <code>null</code>. No Turtle has been constructed.</p>'),
  'Distinguish null from uninitialized local reference variable.'));
 s.push(slide('From null to a real reference',
  w6code(['Turtle mascot = null;','mascot = new Turtle(arena);'])+
  '<p class="q">What changes after the second statement?</p>'+
  '<div class="w7-ref-scene"><div class="w7-ref-name">mascot<span>REFERENCE</span></div><div class="w7-arrow">→</div><div class="w7-ref-object"><span class="w7-old">null</span><span class="w7-new">Turtle object</span></div></div>'+
  '<span class="beat w7-switch" aria-hidden="true"></span>',
  'One stable reference display updates in place via CSS :has(.w7-switch.revealed).'));
 s.push(slide('Constructor arguments are passed by VALUE',
  w6code(['int width = 300;','World arena = new World(width, 200);','width = 500;'])+
  '<p class="q">Does changing the caller’s width variable afterwards resize the existing World automatically?</p>'+
  w6answer('<b>No.</b><p>The constructor received the value <code>300</code> when called. Reassigning the caller’s variable later does not rewrite the World’s width.</p>'),
  'A copied primitive argument is not a live connection. Do not confuse with reference sharing.'));
 s.push(slide('A constructor returns control to the caller',
  '<div class="w7-flow"><div>new World(300, 200)</div><div>constructor initializes object</div><div>caller stores reference</div></div>'+
  '<p class="scope-note">Constructor execution occurs before the following statement in the caller.</p>',
  'Trace control flow without inventing user-visible output.'));
 s.push(slide('Practice 1 — match a constructor',
  '<p class="practice-kicker">IN CLASS · AP STYLE</p>'+
  '<div class="api-spec"><h3>Available Date constructors</h3><p><code>Date()</code></p><p><code>Date(int year, int month, int day)</code></p></div>'+
  '<p class="q">Which call matches September 20, 2027?</p>'+
  '<div class="week5-options"><div>A. <code>new Date(9,20)</code></div><div>B. <code>new Date(2027,9,20)</code></div><div>C. <code>new Date(20,9,2027)</code></div><div>D. <code>new Date(2027)</code></div></div>'+
  w6answer('<b>ANSWER B.</b><p>The required order is year, month, day. Passing the same types in a different order can compile but produce a wrong date.</p>'),
  'Use the illustrated Date API, not java.util.Date (which differs).'));
 s.push(slide('Practice 2 — constructor troubleshooting',
  '<p class="q">Assume only <code>World()</code> and <code>World(int,int)</code> exist. Which constructor call has NO matching overload?</p>'+
  '<div class="week5-options"><div>A. <code>new World()</code></div><div>B. <code>new World(100, 200)</code></div><div>C. <code>new World(100)</code></div><div>D. <code>new World(640, 480)</code></div></div>'+
  w6answer('<b>ANSWER C.</b><p>There is no World constructor with exactly one int argument.</p>'),
  'Question first, answer single reveal.'));
 s.push(slide('Coding challenge — CustomTurtle constructors',
  '<p class="practice-kicker">CSAWESOME TURTLE LAB · 8–10 MINUTES</p>'+
  '<div class="api-spec"><h3>Available CustomTurtle constructor</h3><p><code>CustomTurtle(int x, int y, World w, Color body, Color shell, int width, int height)</code></p></div>'+
  '<div class="w6-tasks"><p>In the reference environment, create a turtle at (150, 300).</p><p>Make its body green, shell blue, and size 150 × 200.</p><p>Before running, check each argument’s type and position.</p></div>',
  'Reference source coding challenge with a genuine constructor. Environment includes World, CustomTurtle and java.awt.Color.'));
 s.push(slide('Review the CustomTurtle call',
  '<p class="q">Compare the ORDER of your arguments after trying the coding challenge.</p>'+
  w6answer(w6code(['CustomTurtle t = new CustomTurtle(','    150, 300, arena,','    Color.green, Color.blue, 150, 200);'],true)+
  '<p>Assumes <code>arena</code> is an initialized <code>World</code> in the CSAwesome lab.</p>'),
  'Partial code intentionally depends on given Turtle lab. Not standard Java library.'));
 s.push(slide('Topic 1.13 exit check',
  '<p class="q">Explain independently:</p>'+
  '<div class="w6-tasks"><p>How is <code>World w;</code> different from <code>World w = new World();</code>?</p><p>How do constructor signatures select an overload?</p><p>When can a reference variable contain <code>null</code>?</p></div>',
  'No automatic answer leak. Teacher diagnoses rather than reveals.'));
 s.push(slide('Reference and extension practice',resources(l.resources),
  'Exact CSAwesome 1.13 chapter and CustomTurtle project; official CED 1.13.A–C.'));
 return s.join('');
}

function buildTopic114(l){
 const s=w7scenes(l,'1.14','Calling<br>Instance Methods',
  'Class methods belong to a class. Instance methods act on a particular object.',
  'CSAwesome 1.14.1 static vs instance; 1.14.2 signatures; 1.14.3 calls/null; 1.14.4 arguments; 1.14.5 return; 1.14.6 Turtle House; 1.14.8 AP Practice. CED 1.14.A.');
 s.push(slide('The receiver changes the kind of call',
  w6code(['Math.sqrt(25);','yertle.forward(50);'])+
  '<p class="q">Which call names a CLASS, and which names a specific OBJECT?</p>'+
  w6answer(w6pair([['CLASS METHOD','Math.sqrt(25)'],['INSTANCE METHOD','yertle.forward(50)']])+
  '<p>Instance methods are called through an object reference.</p>'),
  'One contrast, not a repeated 1.10 overview.'));
 s.push(slide('The object BEFORE the dot is the receiver',
  '<div class="w7-anatomy"><div>yertle<span>OBJECT VARIABLE</span></div><div>.<span>DOT OPERATOR</span></div><div>forward<span>METHOD</span></div><div>(50)<span>ARGUMENT</span></div></div>'+
  '<p class="scope-note">General form: <code>objectName.methodName(arguments)</code>.</p>',
  'Anatomy of a valid instance call. Dot does not mean decimal point here.'));
 s.push(slide('Which object changes?',
  w6code(['Turtle first = new Turtle(arena);','Turtle second = new Turtle(arena);','first.forward(80);'])+
  '<p class="q">Does this move both turtles?</p>'+
  w6answer('<b>NO.</b><p>The receiver is <code>first</code>, so only its object changes position.</p>'),
  'Requires two independent objects; compares with aliasing later.'));
 s.push(slide('Read a method signature before calling',
  '<div class="api-spec"><h3>Turtle API excerpt</h3><p><code>forward()</code> — default movement</p><p><code>forward(int pixels)</code> — chosen movement</p></div>'+
  '<p class="q">Which call moves a turtle 35 pixels?</p>'+
  w6answer(w6code(['yertle.forward(35);'])+
  '<p>The method overload with one int parameter is selected.</p>'),
  'Reference has overloaded forward methods; match signature and argument.'));
 s.push(slide('Instance methods can take several arguments',
  '<div class="api-spec"><h3>Fictional Robot API</h3><p><code>moveTo(int x, int y)</code> — moves this robot to a coordinate</p></div>'+
  '<p class="q">Which call moves the robot to x=12 and y=30?</p>'+
  w6answer(w6code(['robot.moveTo(12, 30);'])),
  'Fictional explicitly labeled API prevents accidental claims about Turtle method names.'));
 s.push(slide('A null receiver has NO object',
  w6code(['String word = null;','System.out.println(word.length());'])+
  '<p class="q">Does Java print zero, the text null, or throw an error?</p>'+
  w6answer('<b>RUN-TIME ERROR.</b><p>Calling an instance method on a <code>null</code> reference throws a <code>NullPointerException</code>.</p>'),
  'Standard Java executable without Turtle. The println itself never successfully prints the length.'));
 s.push(slide('Fix the null-reference error',
  '<p class="q">What change makes the call valid?</p>'+
  w6code(['String word = "Hello";','System.out.println(word.length());'])+
  w6answer('<div class="console-box">5</div><p>Now <code>word</code> refers to a real String object.</p>'),
  'A separate debugging task, distinct from diagnosis.'));
 s.push(slide('Some instance methods CHANGE an object',
  '<div class="api-spec"><h3>Turtle: <code>forward(40)</code></h3><p>Moves this turtle ahead by 40 units.</p></div>'+
  '<p class="q">What kind of effect should we expect from <code>yertle.forward(40)</code>?</p>'+
  w6answer('<p>The turtle’s position changes. This is <b>mutator-like behavior</b>: an action that updates object state.</p>'),
  'Describes state changes, not a returned number.'));
 s.push(slide('Other instance methods RETURN information',
  '<div class="api-spec"><h3>Turtle: <code>int getXPos()</code></h3><p>Returns the turtle’s current x position.</p></div>'+
  '<p class="q">Does calling <code>getXPos()</code> necessarily move the turtle?</p>'+
  w6answer('<b>No.</b><p>It returns information about the receiver. A non-void result can be stored or printed.</p>'),
  'Accessor-like versus mutator-like behavior, without prematurely teaching authoring getters.'));
 s.push(slide('Do something with the RETURNED value',
  w6code(['int x = yertle.getXPos();','System.out.println(x);'])+
  '<p class="q">What is stored in x?</p>'+
  w6answer('<p>The int returned by <code>getXPos()</code> for that particular turtle. The exact number depends on its position.</p>'),
  'Do not invent numeric Turtle coordinate state.'));
 s.push(slide('A return value is not automatic OUTPUT',
  w6code(['yertle.getXPos();'])+
  '<p class="q">Will this line print the x position?</p>'+
  w6answer('<b>No.</b><p>The returned value is ignored. To display it, call <code>System.out.println(yertle.getXPos());</code>.</p>'),
  'Common CSAwesome mistake; the method call alone has no print side effect.'));
 s.push(slide('Practice: repair an area calculation',
  w6code(['int area;','yertle.getWidth() * getHeight;','System.out.println(area);'])+
  '<p class="q">Find TWO distinct mistakes before revealing a correction.</p>'+
  w6answer(w6code(['int area = yertle.getWidth() * yertle.getHeight();','System.out.println(area);'])+
  '<p>Both methods need the receiver, and the multiplication result must initialize <code>area</code>.</p>'),
  'Adapted from CSAwesome TurtleArea debugging, no fixed area output without a known Turtle size.'));
 s.push(slide('Use a provided class to trace state',
  w6code(['// Provided Rectangle class:','// Rectangle(int width, int height)','// void grow(int amount) increases width','// int area() returns width * height','Rectangle r = new Rectangle(4, 6);','r.grow(3);','System.out.println(r.area());'])+
  '<p class="q">Which value changes before <code>area()</code> runs?</p>'+
  '<div class="beat eval-step">width: 4 → 7; height stays 6</div>'+
  '<div class="beat console-box">42</div>',
  'Fictional provided Rectangle API, not standard library. Two genuinely distinct reveal steps.'));
 s.push(slide('Method calls suspend, then resume the caller',
  '<div class="w7-flow"><div>Call r.area()</div><div>Run area() body</div><div>Return value to caller</div></div>'+
  '<p class="scope-note">Execution continues after the call once the method completes or returns.</p>',
  'Control-flow review, now specifically from instance method.'));
 s.push(slide('Two variables can have ONE receiver object',
  w6code(['Turtle a = new Turtle(arena);','Turtle b = a;','b.forward(50);'])+
  '<p class="q">Which underlying object moved?</p>'+
  w6answer('<b>THE SAME OBJECT REFERENCED BY BOTH a AND b.</b><p>Copying the reference creates an alias, not another turtle.</p>'),
  'Connect 1.12 aliasing to 1.14 receiver semantics.'));
 s.push(slide('Method call or constructor call?',
  '<div class="w7-compare"><div><h3>Constructor</h3><code>new Turtle(arena)</code><p>Creates and initializes a new instance.</p></div>'+
  '<div><h3>Instance method</h3><code>yertle.forward(80)</code><p>Calls behavior on an existing object.</p></div></div>',
  'Explicit anti-confusion frame between topics 1.13 and 1.14.'));
 s.push(slide('Practice 1 — null receiver',
  '<p class="practice-kicker">IN CLASS · DEBUG</p>'+
  w6code(['String text = null;','int count = text.length();'])+
  '<p class="q">At which point does the error occur, and why?</p>'+
  w6answer('<p>The method invocation <code>text.length()</code> throws <code>NullPointerException</code> because <code>text</code> has no object.</p>'),
  'One answer reveal.'));
 s.push(slide('Practice 2 — instance vs class',
  '<p class="q">Which call uses an INSTANCE receiver?</p>'+
  '<div class="week5-options"><div>A. <code>Math.sqrt(9)</code></div><div>B. <code>Math.abs(-2)</code></div><div>C. <code>turtle.forward(9)</code></div><div>D. <code>new Turtle(arena)</code></div></div>'+
  w6answer('<b>ANSWER C.</b><p><code>turtle</code> is an object variable; <code>Math</code> and <code>System</code> name classes.</p>'),
  'The other choices are class methods or a constructor expression; only C uses an instance receiver.'));
 s.push(slide('Coding challenge — Turtle House',
  '<p class="practice-kicker">CSAWESOME TURTLE LAB · 8–10 MINUTES</p>'+
  '<p class="q">Use the library’s <code>forward(int)</code> and <code>turn(int)</code> or <code>turnRight()</code> to draw a simple house outline.</p>'+
  '<div class="w6-tasks"><p>Start by drawing a square.</p><p>Add two roof segments that meet at the top.</p><p>Before running, label which Turtle instance each method targets.</p></div>',
  'Adapts CSAwesome 1.14.6 Turtle House drawing. Roof requires orientation decisions; accept multiple correct paths.'));
 s.push(slide('Review — one correct square base',
  '<p class="q">Did your base return the turtle to its starting direction?</p>'+
  w6answer(w6code(['yertle.forward(80);','yertle.turnRight();','yertle.forward(80);','yertle.turnRight();','yertle.forward(80);','yertle.turnRight();','yertle.forward(80);','yertle.turnRight();'],true)+
  '<p>One square base in the CSAwesome Turtle environment. Students design their own roof path.</p>'),
  'Better avoid loops, user asked no ahead Unit2; needs rewrite as repeated statements instead.'));
 s.push(slide('Topic 1.14 exit diagnosis',
  '<p class="q">Explain: receiver, null exception, ignored return value, and object state update.</p>'+
  '<div class="w6-tasks"><p>What does <code>object.method(args)</code> mean?</p><p>Why is calling on <code>null</code> an error?</p><p>What must you do with a non-void result to use it?</p></div>',
  'No exit answers on student slide.'));
 s.push(slide('Reference and API practice',resources(l.resources),
  'CSAwesome 1.14 chapter and Turtle House challenge, official CED 1.14.'));
 return s.join('');
}

function buildTopic115(l){
 const s=w7scenes(l,'1.15','String<br>Manipulation',
  'A String is an immutable object; its methods return useful text, positions, and comparisons.',
  'CSAwesome 1.15.1 references; 1.15.2 concatenation; 1.15.3 index; 1.15.4–6 methods; 1.15.7 mistakes; 1.15.8 challenge; 1.15.10 AP practice. CED 1.15.A/B and String quick reference.');
 s.push(slide('A String is text AND an object',
  w6code(['String greeting = "Hello";'])+
  '<p class="q">Is String an int-like primitive or a class reference type?</p>'+
  w6answer('<p><b>Reference type.</b> A String object represents a sequence of characters. <code>String</code> is in <code>java.lang</code>.</p>'),
  'Class is in java.lang; link to 1.12.'));
 s.push(slide('Two ways to obtain String objects',
  w6code(['String a = "Ready";','String b = new String("Ready");'])+
  '<p class="q">Do both variables refer to strings containing the same TEXT?</p>'+
  w6answer('<b>Yes.</b><p>A String literal and a String constructor can create String objects with the same characters.</p>'),
  'Do not delve into string pool optimization; this is not in AP curriculum.'));
 s.push(slide('Concatenation joins text, not numbers',
  w6code(['String label = "AP" + " " + "CSA";','System.out.println(label);'])+
  '<p class="q">Where does the space come from?</p>'+
  w6answer('<div class="console-box">AP CSA</div><p>The literal <code>" "</code> supplies the space. Java does not insert one automatically.</p>'),
  'Reference common concatenation mistake.'));
 s.push(slide('String += creates a NEW value',
  w6code(['String word = "Go";','word += "!";'])+
  '<p class="q">What text does the variable refer to after the assignment?</p>'+
  w6answer('<div class="w7-word">Go!</div><p><code>+=</code> concatenates, then stores a reference to the resulting String. It does not change the old String object.</p>'),
  'String immutability and assignment; refrain from pretending old memory changed in place.'));
 s.push(slide('A String and a number concatenate left to right',
  w6code(['System.out.println("Score: " + 1 + 2);'])+
  '<p class="q">Does Java print Score: 3, or Score: 12?</p>'+
  w6answer('<div class="console-box">Score: 12</div><p>After a String is involved, both numbers are converted to text and appended in order.</p>'),
  'Shows a precedence source of common errors.'));
 s.push(slide('Parentheses make arithmetic happen first',
  w6code(['System.out.println("Score: " + (1 + 2));'])+
  '<p class="q">Only parentheses changed. What prints now?</p>'+
  w6answer('<div class="console-box">Score: 3</div><p>Parentheses force numeric addition before concatenation.</p>'),
  'New causal rule from previous slide. No repeated calculation steps.'));
 s.push(slide('String indices start at ZERO',
  '<p class="q">What index belongs to each character in <code>"JAVA"</code>?</p>'+
  '<div class="w7-index"><div><b>0</b><strong>J</strong></div><div><b>1</b><strong>A</strong></div><div><b>2</b><strong>V</strong></div><div><b>3</b><strong>A</strong></div></div>'+
  '<p class="scope-note">Index 0 is the first character. The last valid index is <code>length() - 1</code>.</p>',
  'Visual index model is visible; no pretend reveal where there is no answer concealment.'));
 s.push(slide('length() counts characters, not indexes',
  w6code(['String code = "AP CSA";','System.out.println(code.length());'])+
  '<p class="q">Does the space count as a character?</p>'+
  w6answer('<div class="console-box">6</div><p>Yes. <code>length()</code> counts every character, including spaces.</p>'),
  'AP index lesson and length() call.'));
 s.push(slide('substring(from, to) EXCLUDES to',
  w6code(['String word = "computer";','System.out.println(word.substring(1, 4));'])+
  '<p class="q">Take characters at indexes 1, 2 and 3. What prints?</p>'+
  w6answer('<div class="console-box">omp</div><p>Start index included; end index excluded.</p>'),
  'computer indices c0 o1 m2 p3 u4 t5 e6 r7; 1..3=omp.'));
 s.push(slide('substring(from) goes to the END',
  w6code(['String word = "computer";','System.out.println(word.substring(4));'])+
  '<p class="q">Starting from index 4, what is left?</p>'+
  w6answer('<div class="console-box">uter</div><p>It returns the suffix starting at index 4.</p>'),
  'Distinguish overload from two-argument method.'));
 s.push(slide('To extract ONE character, use two bounds',
  w6code(['String word = "computer";','System.out.println(word.substring(3, 4));'])+
  '<p class="q">How many characters does this return, and which one?</p>'+
  w6answer('<div class="console-box">p</div><p>To extract one character at index <code>k</code>, use <code>substring(k, k + 1)</code>.</p>'),
  'Matches CED 1.15.B.3.'));
 s.push(slide('indexOf finds the FIRST occurrence',
  w6code(['String text = "banana";','System.out.println(text.indexOf("an"));'])+
  '<p class="q">There are two matches. Which index is returned?</p>'+
  w6answer('<div class="console-box">1</div><p>The first occurrence begins at index 1.</p>'),
  'indexOf returns first starting position.'));
 s.push(slide('indexOf returns -1 when missing',
  w6code(['System.out.println("banana".indexOf("xy"));'])+
  '<p class="q">If the substring is absent, is the result 0 or -1?</p>'+
  w6answer('<div class="console-box">-1</div><p>Zero is a valid index; <code>-1</code> means not found.</p>'),
  'Distinguish absence sentinel from first index.'));
 s.push(slide('equals compares CONTENT',
  w6code(['String a = new String("cat");','String b = new String("cat");','System.out.println(a.equals(b));'])+
  '<p class="q">The two distinct objects contain identical characters. What prints?</p>'+
  w6answer('<div class="console-box">true</div><p><code>equals</code> compares character sequences.</p>'),
  'Explicit new String avoids interning ambiguity. This is String-to-String equality.'));
 s.push(slide('== and equals ask DIFFERENT questions',
  w6code(['String a = new String("cat");','String b = new String("cat");','System.out.println(a == b);'])+
  '<p class="q">Same content, but two different objects: what prints?</p>'+
  w6answer('<div class="console-box">false</div><p><code>==</code> compares reference identity here, not String content. Use <code>equals</code> for text matching.</p>'),
  'Java new ensures distinct String objects. Keep emphasis on equals as AP target.'));
 s.push(slide('compareTo reports relative alphabetical order',
  w6code(['System.out.println("apple".compareTo("banana"));'])+
  '<p class="q">Is the result NEGATIVE, ZERO, or POSITIVE?</p>'+
  w6answer('<b>NEGATIVE.</b><p>"apple" comes before "banana" lexicographically. For AP questions, focus on the result’s sign, not a specific magnitude.</p>'),
  'Do not require exact subtraction of character codes; ordering is the AP skill.'));
 s.push(slide('compareTo can return ZERO',
  w6code(['System.out.println("java".compareTo("java"));'])+
  '<p class="q">What does a zero result mean?</p>'+
  w6answer('<div class="console-box">0</div><p>Both Strings contain the same sequence of characters.</p>'),
  'Distinct zero case, not identical to prior negative case.'));
 s.push(slide('Strings are IMMUTABLE objects',
  w6code(['String original = "HELLO";','String prefix = original.substring(0, 2);'])+
  '<p class="q">After this call, did original become "HE"?</p>'+
  w6answer(w6pair([['original','HELLO'],['prefix','HE']])+
  '<p><code>substring</code> returns a new String; it does not edit the old one.</p>'),
  'Critical immutability consequence and new result.'));
 s.push(slide('A failed substring range throws an error',
  w6code(['String s = "code";','System.out.println(s.substring(1, 6));'])+
  '<p class="q">The length is 4. Will Java shorten the request automatically?</p>'+
  w6answer('<b>RUN-TIME ERROR.</b><p>The end index 6 exceeds the allowed range. A <code>StringIndexOutOfBoundsException</code> occurs.</p>'),
  'Index limit included/excluded: valid to bound <= length; 6 invalid.'));
 s.push(slide('Practice 1 — trace concatenation',
  '<p class="practice-kicker">IN CLASS · OUTPUT</p>'+
  w6code(['String a = "hi";','a += "!" + 3;','System.out.println(a);'])+
  '<p class="q">Predict the exact output, including punctuation.</p>'+
  w6answer('<div class="console-box">hi!3</div>'),
  'One hidden answer.'));
 s.push(slide('Practice 2 — trace method calls',
  '<p class="practice-kicker">IN CLASS · STRING METHODS</p>'+
  w6code(['String s = "mississippi";','int p = s.indexOf("iss");','String t = s.substring(p, p + 3);'])+
  '<p class="q">What are p and t?</p>'+
  w6answer(w6pair([['p','1'],['t','iss']])+
   '<p>Find the first "iss" at index 1; take [1,4).</p>'),
  'Combined independent transfer, two AP methods.'));
 s.push(slide('Practice 3 — String comparison',
  '<p class="practice-kicker">IN CLASS · AP STYLE</p>'+
  '<p class="q">Which expression tests whether two String values have the same characters?</p>'+
  '<div class="week5-options"><div>A. <code>a == b</code></div><div>B. <code>a.equals(b)</code></div><div>C. <code>a.compareTo(b) == 1</code></div><div>D. <code>a = b</code></div></div>'+
  w6answer('<b>ANSWER B.</b><p><code>equals</code> compares content. <code>compareTo</code> equals zero for matching content.</p>'),
  'Do not test equals with non-String Object; excluded.'));
 s.push(slide('Coding challenge — build a name badge',
  '<p class="practice-kicker">WRITE JAVA · 8–10 MINUTES</p>'+
  '<div class="w6-tasks"><p>Create a complete Java class <code>NameBadge</code> using <code>String first = "Ada";</code> and <code>String last = "Lovelace";</code>.</p>'+
  '<p>Print the full name with a space between words.</p>'+
  '<p>Print the total character count excluding the inserted space.</p>'+
  '<p>Print the first two letters of the last name, and find the index of <code>"love"</code> in the last name.</p></div>',
  'The last word Lovelace starts with capital L, so indexOf("love") is -1. Challenge tests case sensitivity and multiple methods.'));
 s.push(slide('Review — one complete Java solution',
  '<p class="q">Compare after writing, predicting, then running your program.</p>'+
  w6answer(w6code(['public class NameBadge {','  public static void main(String[] args) {','    String first = "Ada";','    String last = "Lovelace";','    System.out.println(first + " " + last);','    System.out.println(first.length() + last.length());','    System.out.println(last.substring(0, 2));','    System.out.println(last.indexOf("love"));','  }','}'],true)+
  '<div class="console-box">Ada Lovelace<br>11<br>Lo<br>-1</div>'),
  'Casing intentionally yields -1. Exact outputs 3+8=11. One answer reveal.'));
 s.push(slide('Topic 1.15 exit check',
  '<p class="q">Explain all four, without guessing:</p>'+
  '<div class="w6-tasks"><p>Why is <code>substring(1, 3)</code> two characters long?</p><p>What distinguishes <code>indexOf</code> result 0 from -1?</p><p>Why do we use <code>equals</code> instead of <code>==</code> to compare String text?</p><p>Why does <code>substring</code> not change the original String?</p></div>',
  'Do not display solutions before retrieval.'));
 s.push(slide('Reference, AP practice and String game',resources(l.resources),
  'Exact CSAwesome Topic 1.15 Strings and its String Methods Game, plus AP CED 1.15.B.'));
 return s.join('');
}

function buildWeek7Practice(l){
 // Original AP-style MCQs, not copied College Board exam questions.
 // Public textbook chapter exercises and official secure materials linked below.
 const questions=[
 // 1.13 — Constructors and references
 ['1.13','Declaration only','How many Turtle objects are created by this line?','Turtle racer;',
  ['0','1','2','Cannot be determined'],0,'It declares a local reference variable but constructs no Turtle.'],
 ['1.13','Constructor syntax','Which is a valid zero-argument World constructor call?','',
  ['new World','World()','new World()','World.new()'],2,'new and parentheses are both needed.'],
 ['1.13','World constructor','Given World() and World(int width,int height), which call is valid?','',
  ['new World(50)','new World(50,80)','new World(50,80,90)','new World("50",80)'],1,'Two int arguments match World(int,int).'],
 ['1.13','Constructor name','A constructor in class Robot must have which name?','',
  ['createRobot','Robot','newRobot','void'],1,'Constructors have the same name as the class.'],
 ['1.13','Constructor signature','What is the signature of public World(int width,int height)?','',
  ['World(width,height)','World(int,int)','public World','void World(int,int)'],1,'The signature is constructor name plus ordered parameter types.'],
 ['1.13','Overloading','Which pairs could form overloaded constructors in the same class?','',
  ['Box(int) and Box(double)','Box(int x) and Box(int y)','int Box(int) and double Box(int)','Box(int) and Box(int) with another access modifier'],0,'The parameter-type lists must differ; parameter names alone do not suffice.'],
 ['1.13','Turtle arguments','Given constructor Turtle(int x,int y,World w), which call matches?','',
  ['new Turtle(world,20,30)','new Turtle(20,30,world)','new Turtle(20,world,30)','new Turtle(world)'],1,'Matches int,int,World in that order.'],
 ['1.13','Argument order','Which is a likely effect of calling Date(2027,11,7) when the signature is Date(int year,int month,int day)?','',
  ['Month 2027','Year 2027, month 11, day 7','Compile-time error because all types differ','No Date object exists'],1,'Three ints match the parameter order year, month, day.'],
 ['1.13','New object count','How many Turtle objects does this code construct?','Turtle a = new Turtle(world);\nTurtle b = new Turtle(world);',
  ['0','1','2','3'],2,'Each new Turtle(world) creates a distinct object.'],
 ['1.13','Aliasing','How many Turtle objects are constructed?','Turtle a = new Turtle(world);\nTurtle b = a;',
  ['0','1','2','3'],1,'The second line copies the reference, not the object.'],
 ['1.13','World and Turtles','How many objects IN TOTAL are created?','World w = new World();\nTurtle a = new Turtle(w);\nTurtle b = a;',
  ['1','2','3','4'],1,'One World and one Turtle; b merely copies the Turtle reference.'],
 ['1.13','Null reference','Which statement is true about Turtle t = null;?','',
  ['A Turtle with blank state is created','t stores a null reference and no Turtle is created','t is an int','t is automatically assigned a new Turtle'],1,'null indicates the absence of an object.'],
 ['1.13','Reference assignment','What happens after the second statement?','Turtle t = null;\nt = new Turtle(world);',
  ['t still equals null','t now refers to a newly constructed Turtle','The World is deleted','The line always fails compilation'],1,'new constructs a Turtle and assigns its reference into t.'],
 ['1.13','Value-copy constructor','What happens to the width argument variable?','int width = 300;\nWorld w = new World(width,200);\nwidth = 500;',
  ['The World width automatically updates to 500','The World keeps initial width 300','The World becomes null','The object is rebuilt'],1,'The constructor received a copy of the numeric value 300 when called.'],
 ['1.13','Constructor selection','Which call does NOT match World() or World(int,int)?','',
  ['new World()','new World(100,200)','new World(100)','new World(640,480)'],2,'There is no one-argument overload.'],
 ['1.13','Constructor vs method','Which expression actually creates a NEW object?','',
  ['turtle.forward(50)','Math.sqrt(9)','new Turtle(world)','turtle.getXPos()'],2,'new followed by a matching constructor creates the object.'],
 // 1.14 — Instance methods
 ['1.14','Class vs instance','Which uses an INSTANCE as its receiver?','',
  ['Math.sqrt(16.0)','Math.pow(2,3)','robot.move(5)','Math.abs(-3)'],2,'robot is an object variable; Math denotes a class.'],
 ['1.14','Receiver identification','Which name identifies the receiver?','yertle.forward(80);',
  ['forward','80','yertle','int'],2,'The object variable to the left of the dot is the receiver.'],
 ['1.14','Independent state','Given separate Turtle a and b, which object is affected?','a.forward(50);',
  ['Only object a','Only object b','Both automatically','Neither'],0,'The method acts on a, its receiver.'],
 ['1.14','Call syntax','Which line calls an instance method with one int argument?','',
  ['forward.turtle(20);','turtle.forward(20);','Turtle.forward(20);','turtle->forward(20);'],1,'The standard form is object.method(argument).'],
 ['1.14','Overloaded forward','The Turtle API has forward() and forward(int pixels). Which calls can be valid?','',
  ['Only forward(10)','Only forward()','Both turtle.forward() and turtle.forward(10)','Neither'],2,'Two documented overloads support zero or one int argument.'],
 ['1.14','Wrong argument','The API says void turn(int degrees). Which call matches?','',
  ['t.turn()','t.turn("90")','t.turn(90)','t.turn(90,180)'],2,'The method requires exactly one int.'],
 ['1.14','Null dereference','What happens at the second line?','String word = null;\nSystem.out.println(word.length());',
  ['It prints 0','It prints null','NullPointerException at run time','Compiler error because null is not a reference'],2,'An instance method needs an actual object receiver.'],
 ['1.14','Fix null','Which change prevents this null receiver failure?','String word = null;\nint n = word.length();',
  ['String word = "";','Use n += 1','Remove method parentheses','Replace n with double'],0,'An empty String is a real object, so length() can be called and returns 0.'],
 ['1.14','Method purpose','Which is most clearly a state-changing method on a Turtle?','',
  ['getXPos()','getYPos()','forward(50)','getWidth()'],2,'forward changes the turtle’s position.'],
 ['1.14','Returned data','An API defines int getXPos(). Which assignment stores its result?','',
  ['int x = t.getXPos();','int x = t.getXPos;','int x = getXPos;','int x = t;'],0,'Call the nonvoid method using parentheses and store its int return.'],
 ['1.14','Ignored value','What does the standalone statement do, based on an accessor-only contract?','t.getXPos();',
  ['Automatically prints position','Calls the method and discards its result','Moves t forward','Creates a second Turtle'],1,'The return value is not automatically printed or stored.'],
 ['1.14','Void return','Which is invalid when the method is void forward(int pixels)?','',
  ['t.forward(10);','t.forward(50);','int x = t.forward(10);','t.forward(100);'],2,'A void method produces no value to store in int.'],
 ['1.14','Method return','A provided Rectangle(4,6) has grow(int) that adds to width and area() that returns width*height. What is r.area()?','Rectangle r = new Rectangle(4,6);\nr.grow(3);',
  ['24','42','18','7'],1,'Width changes to 7, height stays 6, so 7*6=42.'],
 ['1.14','Two names one receiver','Which object is affected by this call?','Turtle a = new Turtle(world);\nTurtle b = a;\nb.forward(10);',
  ['Only a new object b','The single Turtle object referenced by both a and b','No Turtle object','The World object only'],1,'b is an alias for a, so it selects the shared Turtle.'],
 ['1.14','Constructor or method','Which statement calls a constructor?','',
  ['t.forward(10);','t.getXPos();','new Turtle(world);','Math.sqrt(25);'],2,'new ClassName(arguments) invokes a constructor to create an instance.'],
 ['1.14','Return to caller','When a nonvoid instance method returns, what happens next?','',
  ['The JVM starts the entire program again','Control resumes at the caller using the returned value','The object is always deleted','The method becomes static'],1,'Execution returns to the caller; the returned value can be used in an expression.'],
 // 1.15 — Strings
 ['1.15','String type','In Java, String is what kind of type?','',
  ['Primitive int-like type','Class/reference type','Only a comment','Boolean operator'],1,'String is a class in java.lang.'],
 ['1.15','String creation','Which statement validly initializes a String using a literal?','',
  ['String text = "Hello";','string text = Hello;','String text = Hello;','String text = new String;'],0,'Double quotes create a String literal.'],
 ['1.15','Concatenation','What is printed?','System.out.println("Hi" + " " + "Sam");',
  ['HiSam','Hi Sam','Hi  Sam','Error'],1,'The explicit " " supplies one space.'],
 ['1.15','Missing space','What is printed?','System.out.println("Hi" + "Sam");',
  ['Hi Sam','HiSam','Hi,Sam','Hi\\nSam'],1,'Java adds no separator automatically.'],
 ['1.15','Left-to-right +','What is the output?','System.out.println("Value: " + 1 + 2);',
  ['Value: 3','Value: 12','Value: 1 2','Compiler error'],1,'After String concatenation begins, the numbers are appended as text.'],
 ['1.15','Arithmetic grouping','What is the output?','System.out.println("Value: " + (1 + 2));',
  ['Value: 12','Value: 3','Value: (1 + 2)','Compiler error'],1,'Parentheses force numeric addition before converting to String.'],
 ['1.15','Plus equals','What is printed?','String word = "go";\nword += "!";\nSystem.out.println(word);',
  ['go','go!','!go','Compile-time error'],1,'String += constructs a concatenated value and reassigns word.'],
 ['1.15','Immutability','What is true after this code?','String a = "HELLO";\nString b = a.substring(0,2);',
  ['a becomes HE','a remains HELLO and b is HE','Both become HE','a becomes null'],1,'substring returns new text without modifying the original String.'],
 ['1.15','Length including space','What is printed?','System.out.println("AP CSA".length());',
  ['5','6','7','4'],1,'AP CSA has 6 characters including a space.'],
 ['1.15','Last index','What is the last valid index in "code"?','',
  ['4','3','5','-1'],1,'Four characters occupy indices 0 through 3.'],
 ['1.15','Substring two bounds','What is printed?','System.out.println("computer".substring(1,4));',
  ['com','omp','ompu','mpu'],1,'Indexes 1,2,3 are included; index 4 is excluded.'],
 ['1.15','Substring suffix','What is printed?','System.out.println("computer".substring(4));',
  ['uter','puter','compute','er'],0,'Index 4 starts with u; rest is uter.'],
 ['1.15','Single character','Which expression returns "p" from "computer"?','',
  ['"computer".substring(3,4)','"computer".substring(3,3)','"computer".substring(4,5)','"computer".substring(2,3)'],0,'Index 3 is p, so use [3,4).'],
 ['1.15','First indexOf','What does this print?','System.out.println("banana".indexOf("an"));',
  ['0','1','3','-1'],1,'The earliest "an" begins at index 1.'],
 ['1.15','Not found','What does indexOf return if text is absent?','',
  ['0','1','false','-1'],3,'-1 marks not found; zero is a valid first index.'],
 ['1.15','equals content','What is printed?','String a = new String("cat");\nString b = new String("cat");\nSystem.out.println(a.equals(b));',
  ['true','false','null','Compile-time error'],0,'equals checks the sequence of characters, not reference identity.'],
 ['1.15','Reference identity','What is printed?','String a = new String("cat");\nString b = new String("cat");\nSystem.out.println(a == b);',
  ['true','false','null','Compile-time error'],1,'Distinct new String calls create distinct objects. == compares references.'],
 ['1.15','compareTo negative','What can be said about "apple".compareTo("banana")?','',
  ['It is negative','It equals zero','It is positive','It returns boolean false'],0,'apple is lexicographically before banana; only the sign matters.'],
 ['1.15','compareTo equal','What is the result of "Java".compareTo("Java")?','',
  ['-1','0','1','true'],1,'Identical sequences compare as zero.'],
 ['1.15','compareTo positive','What is true of "zoo".compareTo("ant")?','',
  ['Result is negative','Result is zero','Result is positive','It returns String "zoo"'],2,'zoo follows ant alphabetically, so the result is positive.'],
 ['1.15','Bad substring bound','What happens?','String s = "code";\nSystem.out.println(s.substring(1,6));',
  ['Prints ode','Prints code','Throws StringIndexOutOfBoundsException','Returns empty String'],2,'The end bound 6 exceeds the String length of 4.'],
 ['1.15','Combined trace','What is the value of result?','String s = "mississippi";\nint i = s.indexOf("iss");\nString result = s.substring(i,i+3);',
  ['mis','iss','ssi','ippi'],1,'First "iss" starts at 1, and substring(1,4) returns iss.']
 ];
 const s=[];
 s.push(slide('Official AP exam materials — source access',
  '<p class="practice-kicker">GENUINE COLLEGE BOARD SOURCES · LINKED, NOT COPIED</p>'+
  '<div class="w6-tasks"><p><a target="_blank" rel="noopener noreferrer" href="https://apclassroom.collegeboard.org/">AP Classroom — Unit 1 Progress Check, Topics 1.13–1.15 (authorized access)</a></p>'+
  '<p><a target="_blank" rel="noopener noreferrer" href="https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf">College Board AP CSA 2025 CED — Published Sample Exam Questions</a></p>'+
  '<p><a target="_blank" rel="noopener noreferrer" href="https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam/past-exam-questions">Released FRQ archive and scoring guidelines — verify topic coverage before assigning</a></p></div>'+
  '<p class="scope-note">The 54 questions in this deck are originally authored AP-style review, NOT claimed to be released official exam questions.</p>',
  'Official source links only, not ordinary lecture content.'));
 s.push(slide('Open matching CSAwesome practice banks',
  '<p class="practice-kicker">PUBLIC TEXTBOOK AP PRACTICE · ORIGINAL SOURCE</p>'+
  resources([
   {label:'CSAwesome Topic 1.13 — Constructors AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-1-13-constructors.html',kind:'Textbook exercise questions'},
   {label:'CSAwesome Topic 1.14 — Calling Instance Methods AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-1-14-calling-instance-methods.html',kind:'Textbook exercise questions'},
   {label:'CSAwesome Topic 1.15 — Strings AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-1-15-strings.html',kind:'Textbook exercise questions'},
   {label:'CSAwesome Unit 1B multiple-choice exercises',url:'https://runestone.academy/ns/books/published/csawesome2/unit1.html',kind:'Filter to relevant 1.13–1.15 questions'}
  ]),
  'Textbook AP practice is not official College Board past exam content.'));
 questions.forEach(([topic,subject,prompt,code,options,correct,reason],n)=>{
  s.push(w6quiz('Q'+String(n+1).padStart(2,'0')+' — '+esc(subject),
    'ORIGINAL AP-STYLE · TOPIC '+topic,prompt,code,options,correct,reason,
    'Do not reveal before student selects one letter. Require a rule-based explanation after the correct answer.'));
 });
 return s.join('');
}
