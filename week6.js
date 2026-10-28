/* Week 6 custom decks — class methods, Math, objects, and cumulative AP-style practice.
   Student-facing material is English. Exact source activities are linked, not copied. */
function w6code(lines,compact=false){
 const rows=Array.isArray(lines)?lines:String(lines).split('\n');
 return '<pre class="code'+(compact?' code-compact':'')+'">'+rows.map(line=>'<span class="code-line">'+esc(line)+'</span>').join('')+'</pre>';
}
function w6answer(s){return '<div class="beat week5-answer">'+s+'</div>';}
function w6pair(items){
 return '<div class="w6-pair">'+items.map(([a,b])=>'<div><span>'+a+'</span><strong>'+b+'</strong></div>').join('')+'</div>';
}
function w6quiz(title,kicker,question,code,options,correct,explanation,teacher=''){
 const opts=options.map((x,i)=>'<div><b>'+String.fromCharCode(65+i)+'.</b> '+esc(x)+'</div>').join('');
 return slide(title,'<p class="practice-kicker">'+esc(kicker)+'</p><p class="q">'+esc(question)+'</p>'+
   (code?w6code(code,true):'')+'<div class="week5-options">'+opts+'</div>'+
   w6answer('<b>ANSWER '+String.fromCharCode(65+correct)+'</b><p>'+esc(explanation)+'</p>'),teacher||'Require the student to choose a letter and justify before clicking once.');
}
function buildTopic110(l){
 const s=[];
 s.push(apCover(l,'1.10','Calling Class<br>Methods','A method can belong to the class itself, rather than a particular object.',
  'Source: CSAwesome 1.10.1 nonvoid methods, 1.10.2 calling/debugging, 1.10.3 outside class, 1.10.4 Ladder on Tower, AP practice. CED 1.10.A.1–2. Focus each slide on one new causal difference.'));
 s.push(slide('Retrieve: what does a method call do?',
  w6code(['public static int twice(int x) {','    return x * 2;','}','int value = twice(6);'])+
  '<p class="q">Where does execution go at <code>twice(6)</code>, and what value comes back?</p>'+
  w6answer('<p>The caller enters <code>twice</code> with <code>x = 6</code>, receives <code>12</code>, and stores it in <code>value</code>.</p>'),
  'Quick retrieval from Topic 1.9, then introduce class methods rather than repeating the method-signature lesson.'));
 s.push(slide('What makes a method a CLASS method?',
  w6code(['public static int twice(int x) {','    return x * 2;','}'])+
  '<p class="q">Which keyword says this method is associated with its class?</p>'+
  w6answer('<p><code>static</code>. A <b>class method</b> belongs to the class, not to an individual object.</p>'),
  'Emphasize the static keyword, not the spelling of the class.'));
 s.push(slide('Call a class method from ANOTHER class',
  '<p class="q">Suppose the method <code>twice(int)</code> is defined in <code>NumberTools</code>. How should a different class call it?</p>'+
  w6code(['int answer = NumberTools.twice(6);'])+
  '<div class="w6-anatomy"><div>NumberTools<span>CLASS</span></div><div>.</div><div>twice<span>METHOD</span></div><div>(6)<span>ARGUMENT</span></div></div>'+
  '<p class="scope-note">Typical call pattern: <code>ClassName.methodName(arguments)</code>.</p>',
  'A method from a separate class uses the class name and dot operator. Showing the answer structure is the new rule, not an unrevealed quiz.'));
 s.push(slide('Inside the defining class, the class name is optional',
  w6code(['public class NumberTools {','  public static int twice(int n) { return 2 * n; }','  public static void main(String[] args) {','    int a = twice(3);','    int b = NumberTools.twice(3);','    System.out.println(a + b);','  }','}'],true)+
  '<p class="q">Do the two calls reach the same method? What prints?</p>'+
  w6answer('<b>12.</b><p>Both calls return 6. Within <code>NumberTools</code>, the class prefix is optional for its static method.</p>'),
  'This is a full compilable Java example. Distinguish the same-class exception.'));
 s.push(slide('The result of a non-void call is a VALUE',
  w6code(['int n = NumberTools.twice(4);','System.out.println(n + 3);'])+
  '<p class="q">Which number replaces <code>NumberTools.twice(4)</code> in the expression?</p>'+
  '<div class="beat eval-step">NumberTools.twice(4) → 8</div>'+
  '<div class="beat console-box">11</div>',
  'Two meaningful reveals: returned value then final printed result.'));
 s.push(slide('A returned value can be used directly',
  w6code(['System.out.println(NumberTools.twice(5));'])+
  '<p class="q">Does the caller need a separate temporary variable?</p>'+
  w6answer('<div class="console-box">10</div><p>No. Non-void calls can be used directly where their return type fits.</p>'),
  'This adds the no-temporary pattern, not another definition of static.'));
 s.push(slide('A void method is NOT a numeric expression',
  w6code(['public static void announce() {','    System.out.println("Start");','}','int result = announce();'])+
  '<p class="q">Would assigning this call to <code>int result</code> compile?</p>'+
  w6answer('<b>NO — COMPILE-TIME ERROR.</b><p><code>announce()</code> returns no value. Call it as a standalone statement.</p>'),
  'Retrieve void/nonvoid distinction in the context of invoking a class method.'));
 s.push(slide('Match the method PARAMETERS',
  '<div class="api-spec"><h3>API: <code>double divide(int amount, double parts)</code></h3><p>Return a numeric quotient.</p></div>'+
  '<p class="q">Which call supplies the right number, order and types of arguments?</p>'+
  '<div class="week5-options"><div>A. <code>divide(20.0, 4)</code></div><div>B. <code>divide(20, 4.0)</code></div><div>C. <code>divide(20)</code></div><div>D. <code>divide("20", 4)</code></div></div>'+
  w6answer('<b>ANSWER B.</b><p>First parameter needs <code>int</code>; second needs <code>double</code>.</p>'),
  'Inspired by reference AP practice; new values and name, not copied.'));
 s.push(slide('A correct call can still have the wrong destination type',
  w6code(['// divide(int, double) returns double','int quotient = NumberTools.divide(20, 4.0);'])+
  '<p class="q">Arguments match. Why does assignment still fail?</p>'+
  w6answer('<b>INCOMPATIBLE TYPES.</b><p>The call returns <code>double</code>, which cannot be assigned directly to <code>int</code>. Declare <code>double quotient</code>.</p>'),
  'This is a distinct debugging layer: return type, not argument types.'));
 s.push(slide('Trace a call from one method into another',
  w6code(['public static int square(int n) { return n * n; }','public static int addTwo(int n) {','    return square(n) + 2;','}','System.out.println(addTwo(4));'])+
  '<p class="q">What is the order of method calls before the output appears?</p>'+
  '<div class="beat eval-step">addTwo(4) → square(4) + 2</div>'+
  '<div class="beat eval-step">16 + 2 → 18</div>'+
  '<div class="beat console-box">18</div>',
  'Calls in method bodies may call other methods. Ask student to trace flow and preserve three different reasoning steps.'));
 s.push(slide('A library class already contains useful static methods',
  w6code(['double result = Math.sqrt(81.0);','System.out.println(result);'])+
  '<p class="q">Which class provides the method, and what value is returned?</p>'+
  w6answer('<b>Math</b><div class="console-box">9.0</div><p>The next lesson studies the <code>Math</code> API in detail.</p>'),
  'Only an intentional preview, not the full Math class lesson.'));
 s.push(slide('Ladder on a tower — which calls fit?',
  '<p class="q">A ladder spans a horizontal distance of 6 m and a height of 8 m. Use the Pythagorean rule to compute its length.</p>'+
  '<div class="w6-math">length = √(width² + height²)</div>'+
  '<p class="scope-note">Choose a Java expression that uses documented static Math methods.</p>',
  'Reference 1.10.4 ladder challenge. Ask student to write the Java expression on paper before proceeding.'));
 s.push(slide('Reveal the ladder expression AFTER attempting it',
  '<p class="q">Compare your expression to one valid Java solution.</p>'+
  w6answer(w6code(['double length = Math.sqrt(Math.pow(6, 2) + Math.pow(8, 2));','System.out.println(length);'])+
   '<div class="console-box">10.0</div>'),
  'One answer reveal: both pow calls return doubles, sqrt returns the nonnegative square root.'));
 s.push(w6quiz('Practice 1 — same class or separate?','AP-STYLE · CLASS METHOD','A static method belongs to a class named Tool. Which call is normally appropriate from an unrelated class?','',
  ['Tool.run();','run.Tool();','new Tool.run();','Tool->run();'],0,'Use the class name, dot, and method call parentheses.'));
 s.push(w6quiz('Practice 2 — parameter mismatch','AP-STYLE · DEBUG','Which call correctly matches the method header?','public static double average(int total, int count)',
  ['average(12.0, 3)','average(12, 3)','average(12)','average("12", 3)'],1,'Both parameters are int; the method returns double.'));
 s.push(w6quiz('Practice 3 — return type','AP-STYLE · RETURN','The method doubleIt(int) returns int. Which statement compiles and stores its result?','',
  ['boolean x = doubleIt(3);','int x = doubleIt(3);','int x = doubleIt();','void x = doubleIt(3);'],1,'The returned type is int, and the call needs one int argument.'));
 s.push(slide('Coding challenge — class method across files',
  '<p class="practice-kicker">WRITE JAVA · 8–10 MINUTES</p>'+
  '<div class="w6-tasks"><p><b>1.</b> In <code>Numbers.java</code>, define <code>public static int triple(int n)</code>.</p>'+
  '<p><b>2.</b> In <code>App.java</code>, call <code>Numbers.triple(7)</code> from <code>main</code>.</p>'+
  '<p><b>3.</b> Print the returned result and predict it first.</p></div>',
  'This directly tests calling a class method across classes; original implementation, within AP scope. Build and run both files.'));
 s.push(slide('Review — two complete Java classes',
  '<p class="q">Check only after writing both Java files.</p>'+
  w6answer('<p class="practice-kicker">Numbers.java</p>'+w6code(['public class Numbers {','  public static int triple(int n) {','    return 3 * n;','  }','}'],true)+
  '<p class="practice-kicker">App.java</p>'+w6code(['public class App {','  public static void main(String[] args) {','    System.out.println(Numbers.triple(7));','  }','}'],true)+'<div class="console-box">21</div>'),
  'Two independently compilable class files, one answer reveal.'));
 s.push(slide('Topic 1.10 exit diagnosis',
  '<p class="q">Explain the distinction in one sentence each:</p>'+
  '<div class="w6-tasks"><p>Why is a method marked <code>static</code>?</p><p>When can its class prefix be omitted?</p><p>Why does a call with correct arguments still sometimes fail assignment?</p></div>',
  'Teacher notes: associated with class; prefix optional inside declaring class; nonvoid return type may not fit destination. No displayed answer.'));
 s.push(slide('Source-aligned homework and practice',resources(l.resources),
  'Use exact CSAwesome 1.10 chapter, especially code tracing and Ladder on Tower. Official CED 1.10.A.'));
 return s.join('');
}
function buildTopic111(l){
 const s=[];
 s.push(apCover(l,'1.11','Math Class','A built-in class makes mathematical calculations reusable—and random ranges predictable.',
 'CSAwesome 1.11.1 mathematical functions, 1.11.2 random, 1.11.3 combination lock challenge, AP practice. CED 1.11.A.1–3. Teach exact bounds; never fake a specific Math.random output.'));
 s.push(slide('Why use a library instead of rewriting math?',
  '<p class="q">We need a square root, an absolute value and a random number. Must we write those algorithms from scratch?</p>'+
  w6answer('<p><b>No.</b> <code>java.lang.Math</code> already provides documented <b>static</b> class methods. No import or Math object is required.</p>'),
  'This links Topic 1.10 class methods to the Math class.'));
 s.push(slide('The AP Math quick-reference subset',
  '<div class="w6-math-table"><div><b>METHOD</b><b>RETURNS</b></div>'+
  '<div><code>abs(int)</code><span>int</span></div><div><code>abs(double)</code><span>double</span></div>'+
  '<div><code>pow(double, double)</code><span>double</span></div><div><code>sqrt(double)</code><span>double</span></div>'+
  '<div><code>random()</code><span>double</span></div></div>'+
  '<p class="scope-note">All are <code>Math.</code> class methods on the AP Java Quick Reference.</p>',
  'One static reference, not six reveals; later slides each introduce a new consequence.'));
 s.push(slide('Absolute value is distance from zero',
  w6code(['System.out.println(Math.abs(-12));','System.out.println(Math.abs(-12.5));'])+
  '<p class="q">Do these calls return the same TYPE?</p>'+
  w6answer(w6pair([['Math.abs(int)','12'],['Math.abs(double)','12.5']])+
   '<p>There are two <b>overloads</b>. The returned type matches the argument’s numeric type.</p>'),
  'Connect to Topic 1.9 overloading; no confusion with casting.'));
 s.push(slide('Distance between two positions',
  '<p class="q">A runner moves from position -3 to position 5. How far apart are those positions?</p>'+
  w6code(['int distance = Math.abs(-3 - 5);'])+
  w6answer('<div class="memory-board"><div class="name">distance</div><div class="value">8</div></div><p>Subtract first; then take the absolute value.</p>'),
  'Reference 1.11 distance exercise in a different context.'));
 s.push(slide('Math.pow takes BASE and EXPONENT',
  w6code(['System.out.println(Math.pow(2, 3));'])+
  '<p class="q">Is this <code>2 × 3</code> or <code>2³</code>? What type is the output?</p>'+
  w6answer('<div class="console-box">8.0</div><p>First argument is the base; second is the exponent. Return type: <code>double</code>.</p>'),
  'Math.pow returns double even for integer-looking inputs.'));
 s.push(slide('The argument ORDER changes the power',
  w6code(['Math.pow(3, 2)','Math.pow(2, 3)'])+
  '<p class="q">Which expression gives 9.0 and which gives 8.0?</p>'+
  w6answer(w6pair([['Math.pow(3,2)','9.0'],['Math.pow(2,3)','8.0']])+'<p>Method parameters are ordered.</p>'),
  'One reveal contrasting distinct arguments, not extra prose.'));
 s.push(slide('Square root returns a DOUBLE',
  w6code(['double result = Math.sqrt(49);','System.out.println(result);'])+
  '<p class="q">Why is <code>result</code> declared <code>double</code>?</p>'+
  w6answer('<div class="console-box">7.0</div><p><code>Math.sqrt(double)</code> returns <code>double</code>. The integer argument 49 can widen to double.</p>'),
  'Different from pow: return type matching and widening.'));
 s.push(slide('Nested Math calls evaluate inside first',
  w6code(['System.out.println(Math.sqrt(Math.pow(3, 2) + Math.pow(4, 2)));'])+
  '<p class="q">Explain the order of operations BEFORE predicting the output.</p>'+
  '<div class="beat eval-step">Math.pow(3,2) → 9.0; Math.pow(4,2) → 16.0</div>'+
  '<div class="beat eval-step">Math.sqrt(25.0) → 5.0</div>'+
  '<div class="beat console-box">5.0</div>',
  'Three meaningful steps, no repeated printed answer.'));
 s.push(slide('Math.random() never needs arguments',
  w6code(['double r = Math.random();'])+
  '<p class="q">What is the exact guaranteed range, even though we cannot predict a particular value?</p>'+
  w6answer('<div class="w6-interval">0.0 <span>≤ r &lt;</span> 1.0</div><p>0.0 is included; 1.0 is excluded.</p>'),
  'IMPORTANT: no made-up deterministic sample output.'));
 s.push(slide('Scaling random changes the range',
  w6code(['double r = Math.random() * 6;'])+
  '<p class="q">What is the new numeric interval?</p>'+
  w6answer('<div class="w6-interval">0.0 <span>≤ r &lt;</span> 6.0</div><p>Multiplying by 6 scales both ends.</p>'),
  'No casting yet. Different skill: scalar multiplication of interval.'));
 s.push(slide('Casting creates a finite set of integers',
  w6code(['int face = (int) (Math.random() * 6);'])+
  '<p class="q">Which integers are possible? Can <code>face</code> ever be 6?</p>'+
  w6answer('<div class="w6-range"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div><p>No 6: the double before casting is always below 6.0.</p>'),
  'Connect range to int truncation from 1.5.'));
 s.push(slide('Shift the range to simulate a die',
  w6code(['int die = (int) (Math.random() * 6) + 1;'])+
  '<p class="q">After adding one, which six whole numbers can be generated?</p>'+
  w6answer('<div class="w6-range"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span></div><p>Exactly six possible outcomes, both 1 and 6 included.</p>'),
  'Actual output varies from run to run; show range, not a fixed sample.'));
 s.push(slide('General integer range: minimum through maximum',
  '<p class="q">For inclusive integers <code>min</code> through <code>max</code>, how many different outcomes are there?</p>'+
  '<div class="w6-math">count = max - min + 1</div>'+
  w6answer(w6code(['int result = (int)(Math.random() * (max - min + 1)) + min;'],true)+
  '<p>Multiply by the number of choices, truncate, then shift by <code>min</code>.</p>'),
  'Use int endpoints satisfying min<=max; avoid int overflow on the width for larger ranges.'));
 s.push(slide('Can you create the interval [5, 10]?',
  '<p class="q">Inclusive minimum = 5; inclusive maximum = 10. Fill the multiplication width and shift.</p>'+
  w6code(['int value = (int)(Math.random() * ___) + ___;'])+
  w6answer(w6code(['int value = (int)(Math.random() * 6) + 5;'])+
   '<div class="w6-range"><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div>'),
  'Reference CED emphasizes endpoints inclusive/exclusive.'));
 s.push(slide('An exclusive endpoint changes the count',
  '<p class="q">What change generates values from 5 through 9 inclusive, but never 10?</p>'+
  w6code(['int value = (int)(Math.random() * 5) + 5;'])+
  w6answer('<p><b>Five choices:</b> 5, 6, 7, 8, 9. The exclusive upper bound of 10 is not generated.</p>'),
  'Distinct from previous slide: exclusive upper endpoint.'));
 s.push(w6quiz('Practice 1 — Math return type','AP-STYLE · TYPE','Which statement is correct about Math.pow(2, 3)?','',
 ['Returns int 8','Returns double 8.0','Returns boolean true','Fails because arguments are ints'],1,'The int arguments are widened; pow returns double.'));
 s.push(w6quiz('Practice 2 — random endpoint','AP-STYLE · RANDOM','What can (int)(Math.random() * 8) produce?','',
 ['1 through 8','0 through 8','0 through 7','1 through 7'],2,'Math.random()*8 stays below 8; truncation gives integers 0 through 7.'));
 s.push(w6quiz('Practice 3 — shifting the range','AP-STYLE · RANDOM','Which expression produces an int from 3 through 7 inclusive?','',
 ['(int)(Math.random()*5)+3','(int)(Math.random()*7)+3','(int)(Math.random()*4)+3','(int)(Math.random()*5)+2'],0,'Five integers; shift values 0–4 upward by 3.'));
 s.push(slide('Coding challenge — 3-number lock',
  '<p class="practice-kicker">WRITE & RUN JAVA · 8–10 MINUTES</p>'+
  '<div class="w6-tasks"><p><b>1.</b> Generate three independently chosen integers from 0 through 39 inclusive.</p>'+
  '<p><b>2.</b> Print each on a new line.</p>'+
  '<p><b>3.</b> Predict the set of possible outputs, not any particular run.</p>'+
  '<p><b>4.</b> Use <code>Math.pow</code> to compute how many ordered combinations are possible.</p></div>',
  'Reference CSAwesome 1.11.3 combination lock. No expected deterministic random values.'));
 s.push(slide('Review — three independent lock digits',
  '<p class="q">Compare your implementation only after writing and testing it.</p>'+
  w6answer(w6code(['public class LockCode {','  public static void main(String[] args) {','    int a = (int)(Math.random() * 40);','    int b = (int)(Math.random() * 40);','    int c = (int)(Math.random() * 40);','    System.out.println(a);','    System.out.println(b);','    System.out.println(c);','    System.out.println(Math.pow(40, 3));','  }','}'],true)+
   '<p><b>Range per value:</b> 0–39. <b>Possible combinations:</b> 64,000.0.</p>'),
  'Review does not fake specific random values. Math.pow(40,3) returns double 64000.0.'));
 s.push(slide('Topic 1.11 exit check',
  '<p class="q">Without looking back: state every AP Math method and its return type; then build a range.</p>'+
  '<div class="w6-tasks"><p>How do <code>abs(int)</code> and <code>abs(double)</code> differ?</p>'+
  '<p>Why does <code>Math.random()</code> never return 1.0?</p>'+
  '<p>How would you generate an integer in [10, 14]?</p></div>',
  'Expected: int/double overloads; [0,1) half-open; (int)(Math.random()*5)+10. Teacher checks orally.'));
 s.push(slide('Math reference and public practice',resources(l.resources),
  'Source CSAwesome exact Topic 1.11 and CED. Official CED Sample MCQ #2 directly maps to Topic 1.11.'));
 return s.join('');
}
function buildTopic112(l){
 const s=[];
 s.push(apCover(l,'1.12','Objects: Instances<br>of Classes','A class describes a kind of thing; an object is one particular thing with its own state.',
  'CSAwesome 1.12 class/object analogy, attributes/behaviors, Turtle reference variables, drawing task, hierarchy/NSObject background, AP practice. CED 1.12.A/B. Constructor details reserved for Topic 1.13, instance method details 1.14.'));
 s.push(slide('A blueprint is NOT the finished object',
  '<p class="q">One blueprint can be used to build many houses. Is each house the same physical object?</p>'+
  w6answer('<p><b>No.</b> A <b>class</b> defines a blueprint or type; an <b>object</b> is a particular instance of that class.</p>'),
  'One motivation and one definition, not separate duplicate slides.'));
 s.push(slide('One class can describe many objects',
  '<div class="w6-objects"><div class="w6-type">CLASS<br><strong>Turtle</strong></div>'+
  '<div class="w6-object">OBJECT A<br><strong>yertle</strong></div><div class="w6-object">OBJECT B<br><strong>myrtle</strong></div></div>'+
  '<p class="q">Can both objects have the same kinds of features but different individual values?</p>'+
  w6answer('<p><b>Yes.</b> They share a class definition but keep separate object states.</p>'),
  'Physical class vs object distinction. yertle/myrtle used as object labels only.'));
 s.push(slide('What an object KNOWS vs what it DOES',
  '<div class="w6-pair"><div><span>ATTRIBUTES</span><strong>color, position, size</strong></div>'+
  '<div><span>BEHAVIORS</span><strong>forward, turnLeft, turnRight</strong></div></div>'+
  '<p class="scope-note">Attributes store data. Methods implement behavior. Both are defined by the class.</p>',
  'Static comparison reuses Topic 1.7 API vocabulary, advances to per-object state.'));
 s.push(slide('Same class, different state',
  '<div class="w6-objects"><div class="w6-object">Turtle A<br><strong>color: blue</strong><p>position: (10, 30)</p></div>'+
  '<div class="w6-object">Turtle B<br><strong>color: red</strong><p>position: (80, 50)</p></div></div>'+
  '<p class="q">Does changing Turtle A’s color automatically repaint Turtle B?</p>'+
  w6answer('<p><b>No.</b> Each separate object can hold its own values for its attributes.</p>'),
  'Distinct skill: object independence, no aliasing here.'));
 s.push(slide('Java class names are reference TYPES',
  w6code(['Turtle first;','Turtle second;'])+
  '<p class="q">How many Turtle objects have been created by these declarations?</p>'+
  w6answer('<b>ZERO.</b><p>These lines declare local reference variables. They do not create Turtle objects; they are uninitialized until assigned.</p>'),
  'Critical distinction from 1.13 constructors. No claim that declared local references default to null.'));
 s.push(slide('A reference variable is NOT the whole object',
  '<div class="w6-reference"><div>VARIABLE<br><strong>first</strong><span>reference value</span></div><div class="w6-arrow">→</div><div>OBJECT<br><strong>Turtle A</strong><span>color, location, methods</span></div></div>'+
  '<p class="scope-note">The variable stores a <b>reference</b> that identifies the object, not all of the object’s attributes.</p>',
  'Single stable diagram as requested: reference box points to distinct object box.'));
 s.push(slide('Two reference variables may point to ONE object',
  w6code(['Turtle first = new Turtle(habitat);','Turtle second = first;'])+
  '<p class="q">Did the second statement create a NEW Turtle object?</p>'+
  w6answer('<div class="w6-alias"><div><span>first</span><span>second</span></div><div>↘ &nbsp; ↙</div><strong>ONE Turtle object</strong></div>'+
   '<p>No. It copied the reference; both variables identify the same object.</p>'),
  'Turtle constructor is an explicit PREVIEW of next topic 1.13. Do not develop constructor overloading here.'));
 s.push(slide('Creating a second object is different',
  w6code(['Turtle first = new Turtle(habitat);','Turtle second = new Turtle(habitat);'])+
  '<p class="q">Is <code>second</code> another name for the first object?</p>'+
  w6answer(w6pair([['first','Turtle object A'],['second','Turtle object B']])+
   '<p>Two separate constructor calls represent two distinct objects.</p>'),
  'Contrasts copying a reference to independently creating instances. Code preview from CSAwesome Turtle environment.'));
 s.push(slide('Primitive values vs references',
  '<div class="w6-pair"><div><span>PRIMITIVE</span><strong>int count = 4;</strong><p>Value 4 is stored directly.</p></div>'+
  '<div><span>REFERENCE</span><strong>Turtle t;</strong><p>The variable can hold a reference to a Turtle object.</p></div></div>',
  'Primitive type vs class reference type. Turtle t is not initialized; do not dereference it.'));
 s.push(slide('null means no object reference',
  w6code(['Turtle t = null;'])+
  '<p class="q">Does <code>t</code> currently identify a Turtle object?</p>'+
  w6answer('<b>No.</b><p><code>null</code> marks the absence of an object reference. It is not a Turtle object and not numeric zero.</p>'),
  '1.13 will teach instantiation; this recalls null from Topic 1.4.'));
 s.push(slide('Class hierarchy is a relationship of TYPES',
  '<div class="w6-hierarchy"><div>Animal (superclass)</div><div>Dog &nbsp;&nbsp; Cat (subclasses)</div></div>'+
  '<p class="q">What is shared when related classes inherit from one parent type?</p>'+
  w6answer('<p>Subclasses can reuse attributes and behavior defined by a superclass. This is called <b>inheritance</b>.</p>'),
  'CED 1.12.A.2 mentions inheritance as a concept but EXCLUDES designing/implementing hierarchies.'));
 s.push(slide('Every Java class connects to Object',
  '<div class="w6-hierarchy"><div>Object</div><div>String &nbsp;&nbsp; Turtle &nbsp;&nbsp; Other classes</div></div>'+
  '<p class="scope-note">All Java classes are subclasses of <code>Object</code>, directly or indirectly. Building an inheritance hierarchy is outside the current AP CSA exam scope.</p>',
  'Exact CED 1.12.A.3. Brief conceptual mention only; no extends syntax exercises.'));
 s.push(slide('Trace Turtle variables in source code',
  w6code(['World habitat = new World(300, 300);','Turtle yertle = new Turtle(habitat);','Turtle myrtle = yertle;'])+
  '<p class="q">How many distinct Turtle objects are created in these THREE statements?</p>'+
  w6answer('<b>ONE Turtle object.</b><p>The first line also creates a <code>World</code> object; the final line copies the Turtle reference.</p>'),
  'Reference Turtle library available in CSAwesome activity, not standard Java installation.'));
 s.push(slide('Turtle coding lab — separate objects',
  '<p class="practice-kicker">CSAWESOME TURTLE LAB · 8–10 MINUTES</p>'+
  '<p class="q">In the reference Turtle environment, create TWO turtles in one World. Move the first forward and turn the second.</p>'+
  '<div class="w6-tasks"><p><b>1.</b> Find the library’s constructor example.</p><p><b>2.</b> Add a second named Turtle object.</p><p><b>3.</b> Trace which object receives each method call.</p></div>',
  'Reference 1.12.3 and 1.12.4; works in CSAwesome Turtle environment only. No premature solution.'));
 s.push(slide('Review — two independent Turtle objects',
  '<p class="q">Does the code create one Turtle or two?</p>'+
  w6answer(w6code(['World habitat = new World(300, 300);','Turtle yertle = new Turtle(habitat);','Turtle myrtle = new Turtle(habitat);','yertle.forward(50);','myrtle.turnRight();'],true)+
   '<p><b>Two.</b> Each call to <code>new Turtle(...)</code> constructs an independent object. This is a preview of Topic 1.13.</p>'),
  'Use within provided Turtle activity imports and context.'));
 s.push(w6quiz('Practice 1 — identify an instance','AP-STYLE · CLASS VS OBJECT','In Dog pet; which name is the reference TYPE?','',
  ['pet','Dog','Both','Neither'],1,'Dog is the class/type; pet is the variable declared to hold a Dog reference.'));
 s.push(w6quiz('Practice 2 — count objects','AP-STYLE · REFERENCES','How many distinct String objects do these two variables refer to?','String a = "ready";\nString b = a;',
  ['0','1','2','Unknown because Strings are primitive'],1,'The second assignment copies a reference to the same object.'));
 s.push(w6quiz('Practice 3 — inheritance scope','AP-STYLE · OBJECT MODEL','Which statement is accurate in the current course framework?','',
  ['Students must implement deep inheritance hierarchies','All classes are subclasses of Object; implementation of inheritance hierarchies is excluded','Every object is a primitive variable','Superclass is the same word as a method'],1,'The framework includes conceptual hierarchy relationships, not writing inheritance implementations.'));
 s.push(slide('Topic 1.12 exit diagnosis',
  '<p class="q">Explain without looking back:</p>'+
  '<div class="w6-tasks"><p>What is a class? What is one instance?</p><p>What is actually stored in a reference variable?</p><p>How do you distinguish two references to one object from two separate objects?</p></div>',
  'No answers on screen. Diagnose misconceptions before 1.13.'));
 s.push(slide('Source-aligned reference and practice',resources(l.resources),
  'Use CSAwesome Turtle lab and AP practice. Constructors are taught in Topic 1.13; calling instance methods fully in Topic 1.14.'));
 return s.join('');
}

function buildWeek6Practice(l){
 // All on-slide MCQs below are independently authored AP-style questions.
 // College Board's actual public Sample MCQ #2 (Math Class) is linked, NOT copied.
 const questions=[
 ['1.10','Static keyword','What distinguishes a class method from an instance method?','',
 ['It can only use int','It has static in its header','It cannot return a value','It must be called on a newly created object'],1,'Class methods are associated with the class and have the static modifier.'],
 ['1.10','Method ownership','A class method belongs to which entity?','',
 ['An individual object','The class itself','An argument variable','Only main'],1,'A static method is associated with the class, not one object.'],
 ['1.10','Call syntax','Given static int triple(int n) inside Calculator, which call is normally valid from another class?','',
 ['Calculator.triple(4)','triple.Calculator(4)','new triple(4)','Calculator->triple(4)'],0,'Use ClassName.methodName(arguments).'],
 ['1.10','Same-class calls','Which statement about a call to a class method inside its defining class is correct?','',
 ['The class prefix is always required','The class prefix is optional','Static calls require an object','Such calls are illegal'],1,'Inside the defining class, the class name can be omitted.'],
 ['1.10','Call result','What value is stored in x?','public static int square(int n) { return n*n; }\nint x = square(5);',
 ['5','10','25','Compiler error'],2,'square(5) returns 5*5 = 25.'],
 ['1.10','Return in output','What is printed?','public static int twice(int n) { return n*2; }\nSystem.out.println(twice(7)+1);',
 ['14','15','8','Compiler error'],1,'twice(7) returns 14; 14+1=15.'],
 ['1.10','Void return','Why does this declaration fail?','public static void show() { System.out.println(3); }\nint x = show();',
 ['The method has no parameters','show returns void, not int','println always returns int','Static methods cannot print'],1,'A void call cannot provide a value to initialize int x.'],
 ['1.10','Type mismatch','Suppose average(int,int) returns double. Which assignment is valid?','',
 ['int a = average(4,2);','boolean a = average(4,2);','double a = average(4,2);','String a = average(4,2);'],2,'A double result can be stored in a double variable.'],
 ['1.10','Argument types','Given static double ratio(int a, double b), which call is correct?','',
 ['ratio(9.0,3)','ratio(9,3.0)','ratio("9",3.0)','ratio(9)'],1,'The first parameter is int, second is double.'],
 ['1.10','Argument count','Given static int add(int a,int b), which call matches its signature?','',
 ['add(2)','add(2,3)','add(2,3,4)','add("2",3)'],1,'Two int arguments are required.'],
 ['1.10','Nested calls','What is printed?','public static int addOne(int n) { return n+1; }\nSystem.out.println(addOne(addOne(3)));',
 ['3','4','5','6'],2,'The inner call gives 4; the outer call gives 5.'],
 ['1.10','Method-to-method','What does second(3) return?','public static int first(int n) { return n*n; }\npublic static int second(int n) { return first(n)+2; }',
 ['5','9','11','18'],2,'first(3)=9; 9+2=11.'],
 ['1.10','Return statement','Which best describes what return does in a nonvoid method?','',
 ['Only prints text','Ends the method and provides the value to the caller','Automatically constructs an object','Always returns boolean'],1,'A return statement ends the method execution and supplies the specified value.'],
 ['1.10','Math preview','Which call uses a class method correctly?','',
 ['Math.sqrt(16.0)','Math->sqrt(16.0)','new Math().sqrt(16.0)','sqrt.Math(16.0)'],0,'Math.sqrt is a static method invoked by the class name.'],
 ['1.10','Widening argument','Given static double root(double n), which call may use implicit int-to-double widening?','',
 ['root("9")','root(true)','root(9)','root()'],2,'An int argument can widen to double where required.'],
 ['1.10','Code repair','Which change corrects this statement if calculate(int) returns double?','int result = Toolkit.calculate(6);',
 ['Remove the argument','Change int result to double result','Replace Toolkit with result','Change = to +='],1,'The stored variable type must be compatible with the return type.'],
 ['1.11','Math package','Which package contains Math, available without an explicit import?','',
 ['java.io','java.lang','java.util','java.awt'],1,'Math is in java.lang.'],
 ['1.11','abs int','What does Math.abs(-9) return?','',
 ['-9','0','9','9.0 only'],2,'The int overload returns positive int 9.'],
 ['1.11','abs double','What is the type and value of Math.abs(-2.5)?','',
 ['int 2','double 2.5','double -2.5','boolean true'],1,'The double overload returns double 2.5.'],
 ['1.11','pow return','What is the value and type of Math.pow(2, 4)?','',
 ['int 8','double 8.0','double 16.0','int 16 only'],2,'2 raised to 4 is 16, and pow returns double.'],
 ['1.11','pow order','What does Math.pow(3,2) return?','',
 ['6.0','8.0','9.0','5.0'],2,'3 squared is 9.0.'],
 ['1.11','sqrt result','What does Math.sqrt(81) return?','',
 ['9.0','9 as int only','40.5','6561.0'],0,'sqrt returns the nonnegative double root.'],
 ['1.11','sqrt signature','Which is a valid call to Math.sqrt?','',
 ['Math.sqrt()','Math.sqrt(2,3)','Math.sqrt(25.0)','Math.sqrt 25'],2,'The method requires one numeric argument enclosed in parentheses.'],
 ['1.11','Distance','Which expression calculates the nonnegative distance between numbers a and b?','',
 ['Math.abs(a-b)','Math.abs(a)+Math.abs(b)','Math.sqrt(a+b)','Math.pow(a,b)'],0,'Absolute value of the difference gives distance on a number line.'],
 ['1.11','Nested methods','What does this expression return?','Math.sqrt(Math.pow(3,2)+Math.pow(4,2))',
 ['7.0','5.0','25.0','12.0'],1,'9.0+16.0=25.0, and its square root is 5.0.'],
 ['1.11','random lower','Can Math.random() return exactly 0.0?','',
 ['Yes','Never','Only after casting','It always returns 1.0'],0,'The lower endpoint 0.0 is inclusive.'],
 ['1.11','random upper','Can Math.random() return exactly 1.0?','',
 ['Yes','No','Only when multiplied by 1','Only when rounded'],1,'The upper endpoint 1.0 is excluded.'],
 ['1.11','Scaled random','Which real-number interval contains Math.random()*8?','',
 ['[1,8]','[0,8)','(0,8]','[0,9)'],1,'Scale [0,1) by 8 to get [0,8).'],
 ['1.11','Cast range','Which values are possible from (int)(Math.random()*5)?','',
 ['1 through 5','0 through 4','0 through 5','1 through 4'],1,'Truncation of [0,5) gives ints 0,1,2,3,4.'],
 ['1.11','Die range','What values can this program produce?','int die = (int)(Math.random()*6)+1;',
 ['0 through 5','1 through 6','0 through 6','1 through 7'],1,'Scale to six outcomes 0–5 then add 1.'],
 ['1.11','Inclusive 5 to 10','Which expression produces every int from 5 through 10 inclusive, with no values outside?','',
 ['(int)(Math.random()*5)+5','(int)(Math.random()*6)+5','(int)(Math.random()*10)+5','(int)(Math.random()*6)'],1,'Six outcomes shifted up by 5 produce 5,6,7,8,9,10.'],
 ['1.11','Exclusive maximum','Which expression gives integer outcomes 10 through 14 (excluding 15)?','',
 ['(int)(Math.random()*5)+10','(int)(Math.random()*6)+10','(int)(Math.random()*4)+10','(int)(Math.random()*15)'],0,'Five equally sized integers 0–4 shifted by 10.'],
 ['1.11','Combos','Three independent digits each have 40 possible values. How many ordered combinations exist?','',
 ['120','1600','64000','40'],2,'40*40*40 = 40^3 = 64000.'],
 ['1.11','Deterministic output','What must be true about a single call to Math.random()?','',
 ['It always returns 0.5','It is >=0.0 and <1.0','It is >0.0 and <=1.0','It returns an int'],1,'The exact value is not predetermined but its interval is guaranteed.'],
 ['1.12','Blueprint','A Java class is best described as what?','',
 ['An instance with one fixed value','A blueprint that defines object attributes and behaviors','A primitive number','A package containing only source files'],1,'A class specifies the features of objects of that type.'],
 ['1.12','Instance','If Rover is one object of class Dog, what is Rover?','',
 ['A package','A variable type','An instance of Dog','A primitive int'],2,'An object is a specific instance of its class.'],
 ['1.12','Attribute','Which item is a likely attribute of a Turtle object?','',
 ['color','turnLeft()','forward()','moveTo()'],0,'An attribute is stored state; method calls represent behavior.'],
 ['1.12','Behavior','Which item is a likely behavior of a Turtle object?','',
 ['width','color','forward()','position'],2,'forward is a method that changes the object’s state.'],
 ['1.12','Distinct objects','Two different Turtle objects have separate colors. Which statement is accurate?','',
 ['They must have identical values','They can have different state despite sharing the same class','They cannot share method definitions','They are primitive variables'],1,'The class describes the common structure; each instance has its own values.'],
 ['1.12','Reference variable','What does a variable declared as Turtle t ordinarily store after being initialized with an object?','',
 ['All object attributes copied directly into t','A reference identifying a Turtle object','Only an int','A method definition'],1,'Reference variables hold object references, not the full object contents.'],
 ['1.12','Declaration','How many Turtle objects are created by this statement alone?','Turtle first;',
 ['0','1','2','As many as the JVM wants'],0,'A local reference variable declaration does not create an object.'],
 ['1.12','Two references','How many distinct String objects are referenced by a and b?','String a = "start";\nString b = a;',
 ['0','1','2','3'],1,'Assignment copies the object reference; the two variables identify the same object.'],
 ['1.12','Two objects','Assume habitat is a valid World object. How many distinct Turtles are created by these two statements in the CSAwesome Turtle library?','Turtle a = new Turtle(habitat);\nTurtle b = new Turtle(habitat);',
 ['0','1','2','Not a valid Java declaration'],2,'Each new Turtle call constructs another distinct object.'],
 ['1.12','null','What does null mean in Turtle t = null?','',
 ['A Turtle object with zero size','No associated object reference','An invalid variable type','An integer value 0'],1,'null indicates that the variable refers to no object.'],
 ['1.12','Superclass','What does a superclass provide in a class hierarchy?','',
 ['Shared attributes and behaviors reusable by subclasses','Only a source filename','A Math.random value','A local parameter name'],0,'Superclass defines common features from which subclasses can inherit.'],
 ['1.12','Object superclass','Which class is an ancestor of all Java classes?','',
 ['Math','Scanner','Object','System.out'],2,'All classes directly or indirectly extend Object.'],
 ['1.12','Inheritance exam scope','Which statement matches the revised AP CSA scope?','',
 ['Students must implement inheritance hierarchies','Inheritance is not mentioned at all','Conceptual hierarchy relationships are taught, but designing/implementing them is excluded','Object is an int type'],2,'The CED covers conceptual superclass/subclass relationships but excludes designing/implementing hierarchies.'],
 ['1.12','Class vs variable','In Turtle myrtle;, which is the reference type?','',
 ['myrtle','Turtle','Neither','Both'],1,'Turtle is the class name/type and myrtle is the variable name.']
 ];
 const s=[];
 s.push(slide('Official AP exam questions — source access',
  '<p class="practice-kicker">OFFICIAL COLLEGE BOARD MATERIAL · LINKED, NOT COPIED</p>'+
  '<div class="w6-tasks"><p><a target="_blank" rel="noopener noreferrer" href="https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf">Official 2025 AP CSA Course and Exam Description — Sample MCQ #2 (Topic 1.11)</a></p>'+
  '<p><a target="_blank" rel="noopener noreferrer" href="https://apclassroom.collegeboard.org/">AP Classroom — Unit 1 Progress Check (requires authorized access)</a></p>'+
  '<p><a target="_blank" rel="noopener noreferrer" href="https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam/past-exam-questions">College Board released FRQs and scoring (mostly involve later topics)</a></p></div>'+
  '<p class="scope-note">These are official sources. No secure College Board questions are reproduced. The following questions are <b>original AP-style</b>.</p>',
  'Question-source slide only: not ordinary recap. The published CED sample MCQ #2 is explicitly indexed to 1.11.A.'));
 s.push(slide('Open CSAwesome chapter practice questions',
  '<p class="practice-kicker">FREE TEXTBOOK QUESTIONS · NOT OFFICIAL PAST EXAM ITEMS</p>'+
  resources([
   {label:'Topic 1.10 — AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-1-10-calling-class-methods.html',kind:'Public textbook questions'},
   {label:'Topic 1.11 — AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-1-11-Math.html',kind:'Public textbook questions'},
   {label:'Topic 1.12 — AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-1-12-objects.html',kind:'Public textbook questions'}
  ]),
  'These exercises are separate from the original 48-question bank below.'));
 for(let n=0;n<questions.length;n++){
  const [topic,scope,prompt,code,opts,key,reason]=questions[n];
  s.push(w6quiz('Q'+String(n+1).padStart(2,'0')+' — '+esc(scope),
    'ORIGINAL AP-STYLE · TOPIC '+topic,prompt,code,opts,key,reason,
    'Practice only. Record the chosen letter before reveal; explain the governing rule in one sentence.'));
 }
 return s.join('');
}
