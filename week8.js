/* Week 8: Unit 2 introductory slides. Requires week6.js helpers loaded first.
 * Classroom prose is English. CSAwesome2 and College Board resources are linked.
 * Unit scope: 2.1 algorithms as natural-language/pseudocode diagrams, 2.2 Boolean expressions,
 * 2.3 one-way and two-way if. Loops 2.7-2.8 and compound Boolean operators 2.5 deferred. */
function w8code(lines,compact=false){return w6code(lines,compact);}
function w8ans(html){return w6answer(html);}
function w8pair(items){return '<div class="w8-pair">'+items.map(([k,v])=>'<div><span>'+esc(k)+'</span><strong>'+esc(v)+'</strong></div>').join('')+'</div>';}
function w8steps(items){return '<div class="w8-steps">'+items.map((v,i)=>'<div><b>'+String(i+1).padStart(2,'0')+'</b><p>'+v+'</p></div>').join('')+'</div>';}
function w8quiz(title,question,code,opts,key,explanation){return w6quiz(title,'IN CLASS · COMMIT BEFORE REVEAL',question,code,opts,key,explanation);}
function buildTopic21(l){
 const s=[apCover(l,'2.1','Algorithms with Selection<br>& Repetition',
  'A complex algorithm can be designed using three simple control structures.',
  'Source CSAwesome2 2.1.1 selection, 2.1.2 repetition, 2.1.3 pseudocode and flowcharts, 2.1.4 snack algorithm. CED 2.1.A.1–5; write English pseudocode and diagrams, not for/while syntax.')];
 s.push(slide('Retrieve: a program has an execution order',
   w8code(['int count = 2;','count += 3;','System.out.println(count);'])+
   '<p class="q">What value prints when Java runs these lines in order?</p>'+
   w8ans('<div class="console-box">5</div><p>Normal execution follows the written sequence, top to bottom.</p>'),
   'Connect Unit 1 to new algorithm control structures; one reveal.'));
 s.push(slide('An algorithm is more than a list of commands',
   '<p class="q">Imagine a training plan: warm up, check the weather, and repeat short laps until the session ends. Which steps cannot be described as one straight list?</p>'+
   w8ans('<p>Checking the weather needs a <b>choice</b>; doing several laps needs <b>repetition</b>.</p>'),
   'Motivation. Ask for two changes of control flow, not details of syntax.'));
 s.push(slide('Three building blocks for algorithms',
   '<div class="w8-three"><div><b>SEQUENCE</b><p>Do steps in a specified order</p></div><div><b>SELECTION</b><p>Choose a path using a true/false decision</p></div><div><b>REPETITION</b><p>Repeat steps toward a goal</p></div></div>',
   'Static terminology page. The next pages attach reasoning to each block.'));
 s.push(slide('Sequencing — order changes the outcome',
   w8steps(['Fill a bottle with water','Close the cap','Put the bottle in the bag'])+
   '<p class="q">What happens if we put the bottle in the bag BEFORE closing the cap?</p>'+
   w8ans('<p>The outcome can change. Sequencing means operations follow a deliberate order.</p>'),
   'Two plausible sequences may have different effects. One reasoned reveal.'));
 s.push(slide('Selection — choose ONE path based on a fact',
   '<div class="w8-branch"><div>Is it raining?</div><div>TRUE → take rain jacket</div><div>FALSE → no rain jacket</div></div>'+
   '<p class="q">If it is sunny, which route is followed?</p>'+
   w8ans('<p><b>FALSE route.</b> Selection chooses based on a condition, not at random.</p>'),
   'Real-life branching; false side still continues after the decision.'));
 s.push(slide('Repetition — a step may happen many times',
   '<div class="w8-loop"><div>Is one lap still remaining?</div><div>YES → complete one lap → check again</div><div>NO → finish</div></div>'+
   '<p class="q">What signals that the repeated step should stop?</p>'+
   w8ans('<p>When the continuation condition is no longer satisfied. Repetition is not a second copy of the step typed by hand.</p>'),
   'Teach repetition concept; for/while syntax begins later in Unit 2.'));
 s.push(slide('Recognize structures in one morning routine',
   w8steps(['Get dressed','If it is cold, wear a sweater','Check every homework item in your bag','Leave home'])+
   '<p class="q">Identify the sequence, one selection, and one repetition.</p>'+
   w8ans(w8pair([['SELECTION','if it is cold'],['REPETITION','check every item']])+
    '<p>The full routine is a sequence of steps containing the other two structures.</p>'),
   'Adapted to CSAwesome 2.1.1/2.1.2 selection and repetition word recognition.'));
 s.push(slide('Pseudocode describes behavior without Java syntax',
   '<div class="w8-pseudocode">SET lapsCompleted to 0\nREPEAT until 3 laps are complete:\n    Run one lap\n    Increase lapsCompleted by 1\nPrint "Finished"</div>'+
   '<p class="scope-note">This is <b>pseudocode</b> (informal design), not Java source code.</p>',
   'Pseudocode is human-readable; no premature loop syntax. Fixed-width style preserves indentation.'));
 s.push(slide('Trace the pseudocode before coding',
   '<div class="w8-pseudocode">SET lapsCompleted to 0\nREPEAT until lapsCompleted equals 3:\n    Increase lapsCompleted by 1</div>'+
   '<p class="q">Which values does lapsCompleted have AFTER each repetition?</p>'+
   w8ans(w8pair([['AFTER FIRST','1'],['AFTER SECOND','2']])+'<p>After the third pass it is 3, so repetition stops.</p>'),
   'One reveal yields a complete trace; no unnecessary extra click.'));
 s.push(slide('Flowchart — decisions are not just boxes',
   '<div class="w8-flow"><div>START</div><div>↓</div><div class="w8-diamond">Condition true?</div><div class="w8-branchline">YES: action A &nbsp; | &nbsp; NO: action B</div><div>↓ Continue</div></div>'+
   '<p class="scope-note">Flowcharts visually show order and branch paths. Pseudocode expresses the same plan in words.</p>',
   'Conceptual flowchart, not a claim that every flowchart symbol must be exactly this shape.'));
 s.push(slide('The order of decisions can change a purchase',
   '<p class="q">You have $15. At each step, buy an item if affordable: first a $10 notebook, then a $5 pen. What do you purchase?</p>'+
   w8ans('<p><b>Both.</b> Spend $10 → $5 remains → spend $5. Nothing remains.</p>'),
   'Reference CSAwesome gift-selection algorithm, changed items and amount.'));
 s.push(slide('Now reverse the purchase order',
   '<p class="q">Same $15, but first try to buy a $5 pen, then a $10 notebook. Is the final purchase the same?</p>'+
   w8ans('<p><b>Yes for this starting amount.</b> But for other budgets, testing expensive items first can change what is bought. The order matters to the algorithm.</p>'),
   'Do not falsely claim this case changes the purchase. Use next slide for counterexample.'));
 s.push(slide('Counterexample — sequence really changes choices',
   '<p class="q">Budget $12. First check whether you can buy a $10 notebook, then a $5 pen. Now reverse the order. What changes?</p>'+
   w8ans(w8pair([['NOTEBOOK FIRST','notebook; $2 left'],['PEN FIRST','pen; $7 left']])+
    '<p>The same choices, but different order produces a different purchase.</p>'),
   'A real contrast. The second option cannot buy $10 after spending $5.'));
 s.push(slide('A repeat may contain a selection',
   '<div class="w8-pseudocode">REPEAT for every item on a packing list:\n    IF item is missing:\n        Put item in bag</div>'+
   '<p class="q">Do we make just one decision, or a decision for each item?</p>'+
   w8ans('<p>A new decision occurs <b>on every repetition</b>. Repetition and selection can work together.</p>'),
   'A conceptual preview of nested behavior without Java loop mechanics.'));
 s.push(slide('A selection may contain a repetition',
   '<div class="w8-pseudocode">IF the gym is open:\n    REPEAT 3 times:\n        Complete one lap\nOTHERWISE:\n    Rest at home</div>'+
   '<p class="q">What happens when the gym is closed?</p>'+
   w8ans('<p>No laps are done. The algorithm chooses the alternative path instead.</p>'),
   'Opposite composition: decision controls whether repetition happens.'));
 s.push(w8quiz('Practice 1 — recognize selection',
   'Which description is a selection?',null,
   ['Record the time, then print it','If the road is icy, choose an indoor workout','Repeat a drill four times','Read every item from a checklist'],1,
   'Selection chooses between paths based on a true/false condition.'));
 s.push(w8quiz('Practice 2 — recognize repetition',
   'Which description uses repetition?',null,
   ['Check the forecast once','Print one score','While a basket is not full, place another ball inside','Choose one of two drinks'],2,
   'The placement step repeats while the continuation requirement holds.'));
 s.push(slide('Coding/design challenge — choose a snack',
   '<p class="practice-kicker">INDEPENDENT PSEUDOCODE · 7 MINUTES</p>'+
   w8steps(['Check each available snack one at a time','If a snack matches the preference, choose it','Stop when a matching snack is found or the list is exhausted','Say what happens if there are no matching snacks'])+
   '<p class="q">Write pseudocode with sequence, selection, and repetition. Do not write Java loops yet.</p>',
   'Source-aligned adaptation of CSAwesome 2.1.4 snack algorithm; solution hidden on the next slide.'));
 s.push(slide('Review — one valid snack algorithm',
   '<p class="q">Compare your own pseudocode AFTER attempting the challenge.</p>'+
   w8ans('<div class="w8-pseudocode">SET snackFound to false\nFOR each available snack, until a match is found:\n    IF the snack matches the preference:\n        Choose the snack\n        SET snackFound to true\nIF no match was found:\n    Choose water instead</div>'+
    '<p>This is informal pseudocode; a full loop implementation belongs to later lessons.</p>'),
   'Pseudocode uses a collection iteration concept only, not arrays or Java loops.'));
 s.push(slide('Exit check — trace a design, not a keyword',
   '<div class="w8-pseudocode">SET x to 2\nREPEAT 3 times:\n    Add 2 to x\nIF x is greater than 6:\n    Display "High"\nOTHERWISE:\n    Display "Low"</div>'+
   '<p class="q">What message is displayed? Explain each step on paper.</p>',
   'Student answer not shown. x=8 and message High. Do not reveal on exit check.'));
 s.push(slide('Topic 2.1 free reference and homework',
   resources(l.resources),
   'Use CSAwesome 2.1.1–2.1.4 and official CED 2.1.A. Exact URL in metadata.'));
 return s.join('');
}
function buildTopic22(l){
 const s=[apCover(l,'2.2','Boolean<br>Expressions',
  'A comparison computes a value: true or false, without changing variables.',
  'CSAwesome2 2.2.1 equality, 2.2.2 relational comparisons, 2.2.3 boolean expressions, 2.2.4 even/odd/divisibility, 2.2.6 AP practice. CED 2.2.A.1–3; defer compound && || ! to 2.5.')];
 s.push(slide('Retrieve: a boolean value represents a fact',
   w8code(['boolean raining = false;','System.out.println(raining);'])+
   '<p class="q">Does the variable store a word string or a boolean value?</p>'+
   w8ans('<div class="console-box">false</div><p><code>false</code> is a boolean literal, not the String <code>"false"</code>.</p>'),
   'Review Unit 1 boolean type before introducing relational operators.'));
 s.push(slide('A comparison produces true OR false',
   w8code(['int score = 14;','System.out.println(score > 10);'])+
   '<p class="q">Does Java print score, or the result of comparing it with 10?</p>'+
   w8ans('<div class="console-box">true</div><p><code>score > 10</code> is an expression whose value is boolean.</p>'),
   'Establish relational expression evaluation.'));
 s.push(slide('Assignment = is NOT equality ==',
   '<div class="w8-compare"><div><code>x = 6;</code><p>Change stored value</p></div><div><code>x == 6</code><p>Test for equal values</p></div></div>'+
   '<p class="q">Which one could appear in <code>boolean same = ...</code>?</p>'+
   w8ans('<p><code>x == 6</code>, because it evaluates to true or false.</p>'),
   'Central confusion from CSAwesome 2.2.1.'));
 s.push(slide('Equal and not equal are opposites for int',
   w8code(['int age = 15;','int year = 14;','System.out.println(age == year);','System.out.println(age != year);'])+
   '<p class="q">Predict both output lines in order.</p>'+
   w8ans('<div class="console-box">false<br>true</div>'),
   'Adaptation of reference BoolTest1; no code answer until reveal.'));
 s.push(slide('Update a value, then compare again',
   w8code(['int age = 15;','int year = 14;','year = 15;','System.out.println(age == year);','System.out.println(age != year);'])+
   '<p class="q">What changes after year is assigned 15?</p>'+
   w8ans('<div class="console-box">true<br>false</div><p>The assignment changed year. The comparison did not.</p>'),
   'Separate the state change from equality check.'));
 s.push(slide('Six relational operators',
   '<div class="w8-ops"><div><code>==</code><span>equal</span></div><div><code>!=</code><span>not equal</span></div><div><code>&lt;</code><span>less than</span></div><div><code>&gt;</code><span>greater than</span></div><div><code>&lt;=</code><span>at most</span></div><div><code>&gt;=</code><span>at least</span></div></div>'+
   '<p class="scope-note"><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, and <code>&gt;=</code> compare numeric values.</p>',
   'A static compact reference table avoids redundant reveals.'));
 s.push(slide('Boundary cases: > and >= differ',
   '<p class="q">A score exactly equal to 70: does it satisfy both conditions?</p>'+
   w8code(['int score = 70;','System.out.println(score > 70);','System.out.println(score >= 70);'])+
   w8ans('<div class="console-box">false<br>true</div><p><code>&gt;=</code> includes the boundary value 70.</p>'),
   'One clear boundary misconception.'));
 s.push(slide('Compare ARITHMETIC expressions',
   w8code(['int x = 4;','int y = 5;','System.out.println(x * 3 > y + 6);'])+
   '<p class="q">Evaluate arithmetic on each side before comparing.</p>'+
   '<div class="beat eval-step">x * 3 → 12; y + 6 → 11</div>'+
   '<div class="beat console-box">true</div>',
   'Two clicks correspond to numerical evaluation, then comparison.'));
 s.push(slide('Integer division affects comparisons',
   w8code(['int points = 15;','System.out.println(points / 4 >= 3.5);'])+
   '<p class="q">Does dividing by an int first keep the fraction?</p>'+
   '<div class="beat eval-step">points / 4 → 3</div>'+
   '<div class="beat console-box">false</div>',
   'Connect Topic 1.3 int division to a Boolean value, with RHS double 3.5.'));
 s.push(slide('Primitive == compares VALUES',
   w8code(['int a = 7;','int b = a;','a = 12;','System.out.println(a == b);'])+
   '<p class="q">Does changing a make b change with it?</p>'+
   w8ans('<div class="console-box">false</div><p><code>a</code> is 12 and <code>b</code> remains 7.</p>'),
   'Revisit primitive copy model from 1.4.'));
 s.push(slide('Reference == compares OBJECT IDENTITY',
   w8code(['String a = new String("ok");','String b = a;','System.out.println(a == b);'])+
   '<p class="q">Do the two variables identify exactly the same object?</p>'+
   w8ans('<div class="console-box">true</div><p>The assignment copies the reference, so both variables point to one object.</p>'),
   'CED explicitly covers reference identity equality; String construction already taught.'));
 s.push(slide('Matching text does NOT imply same reference',
   w8code(['String a = new String("ok");','String b = new String("ok");','System.out.println(a == b);'])+
   '<p class="q">The characters match. Are the two object references equal?</p>'+
   w8ans('<div class="console-box">false</div><p>Two separate <code>new String(...)</code> calls create separate objects. To compare characters, use <code>a.equals(b)</code>.</p>'),
   'Avoid string literal interning ambiguity by using new String twice.'));
 s.push(slide('String equals checks TEXT contents',
   w8code(['String a = new String("ok");','String b = new String("ok");','System.out.println(a.equals(b));'])+
   '<p class="q">Would checking content give a different answer from ==?</p>'+
   w8ans('<div class="console-box">true</div><p>Content equality and reference identity answer different questions.</p>'),
   'Reinforces 1.15 String methods as the appropriate comparator.'));
 s.push(slide('A simple comparison fits in boolean storage',
   w8code(['int temperature = 72;','boolean warm = temperature >= 70;','System.out.println(warm);'])+
   '<p class="q">What type is the result of the relational expression?</p>'+
   w8ans('<div class="console-box">true</div><p>It returns a boolean value, so the assignment is type-correct.</p>'),
   'Connect code to type checking.'));
 s.push(slide('Remainder can identify even numbers',
   w8code(['int number = 18;','boolean even = (number % 2 == 0);','System.out.println(even);'])+
   '<p class="q">Why does remainder 0 mean number is even?</p>'+
   w8ans('<div class="console-box">true</div><p>18 has no remainder when divided by 2.</p>'),
   'Matches CSAwesome 2.2.4 divisisibility exercise.'));
 s.push(slide('A method can return a boolean expression',
   w8code(['public static boolean isDivisible(int number, int divisor) {','    return number % divisor == 0;','}'],true)+
   '<p class="q">What precondition keeps this method safe?</p>'+
   w8ans('<p><b>divisor != 0</b> must hold. The method returns true only when the remainder is zero.</p>'),
   'Bridge to method contracts from Topic 1.8; independent boolean return code.'));
 s.push(w8quiz('Practice 1 — equality after reassignment',
   'What is printed?', ['int a = 5;','int b = 5;','a += 2;','System.out.println(a == b);'],
   ['true','false','7','Compiler error'],1,
   'a has changed to 7, while b remains 5, so the two int values are not equal.'));
 s.push(w8quiz('Practice 2 — Boolean precedence',
   'What is printed?', ['System.out.println(4 + 3 > 2 * 3);'],
   ['true','false','7','Compiler error'],0,
   '4+3 is 7, 2*3 is 6, so 7>6 is true.'));
 s.push(slide('Coding challenge — three boolean questions',
   '<p class="practice-kicker">WRITE COMPLETE JAVA · 8 MINUTES</p>'+
   w8steps(['Declare int number = 18','Print whether number is negative','Print whether number is even','Print whether number is evenly divisible by 6'])+
   '<p class="q">Use comparisons and remainder. Predict each boolean output before running.</p>',
   'Source-aligned adaptation of CSAwesome 2.2 isNegative/isEven/isDivisible. No answers on task slide.'));
 s.push(slide('Review — complete boolean checks',
   '<p class="q">Compare only after writing and running your own Java code.</p>'+
   w8ans(w8code(['public class BooleanChecks {','  public static void main(String[] args) {','    int number = 18;','    System.out.println(number < 0);','    System.out.println(number % 2 == 0);','    System.out.println(number % 6 == 0);','  }','}'],true)+
    '<div class="console-box">false<br>true<br>true</div>'),
   'Complete runnable class. Check 18 is not negative, is even, divisible by 6.'));
 s.push(slide('Topic 2.2 independent exit test',
   '<p class="q">Explain each answer without notes.</p>'+
   w8steps(['Why are = and == different?','When does a reference == expression yield true?','Which comparison tests whether x is AT MOST 12?','How can you test whether n is divisible by 5?']),
   'No visible answers, diagnostic only.'));
 s.push(slide('Topic 2.2 reference and homework',resources(l.resources),
   'Source CSAwesome 2.2.1–2.2.6 and official CED. Future compound Boolean operators in 2.5.'));
 return s.join('');
}
