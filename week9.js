/* Week 9 advanced selection and Boolean logic, aligned with revised 2025 AP CSA CED.
   Requires week6.js/w8 helper functions. Student-facing prose is English.
   Answers behind .beat; independent coding task solutions on the NEXT distinct slide. */
function w9code(lines,compact=false){return w8code(lines,compact);}
function w9ans(html){return w8ans(html);}
function w9quiz(title,question,code,options,key,explanation){return w6quiz(title,'PREDICT · COMMIT · REVEAL',question,code,options,key,explanation);}
function w9trace(items){return '<div class="w9-trace">'+items.map(([name,val])=>'<div><span>'+name+'</span><strong>'+val+'</strong></div>').join('')+'</div>';}
function w9truth(rows){
 return '<div class="w9-truth">'+rows.map((row,j)=>'<div class="'+(j===0?'head':'')+'">'+row.map(v=>'<span>'+v+'</span>').join('')+'</div>').join('')+'</div>';
}
function buildTopic24(l){
 const s=[apCover(l,'2.4','Nested if<br>& Multiway Selection',
  'A second question is evaluated only on the path that reaches it.',
  'CSAwesome2 2.4.1 else-if, 2.4.2 dangling else, 2.4.3 adventure; CED 2.4.A.1–A.3. Trace first-matching branch and ownership of braces, then write full Java.')];
 s.push(slide('Retrieve: an if-else chooses one path',
  w9code(['int score = 75;','if (score >= 70) {','    System.out.println("Pass");','} else {','    System.out.println("Retry");','}'])+
  '<p class="q">Which branch prints, and does Java also run the other one?</p>'+
  w9ans('<div class="console-box">Pass</div><p>Exactly one branch executes.</p>'),
  'Review 2.3 in one slide; now add a dependent second decision.'));
 s.push(slide('A second decision can depend on the first',
  '<p class="q">You can enter a club only if you are at least 13 AND have permission. When should the program even ASK about permission?</p>'+
  '<div class="w9-tree"><div>Age at least 13?</div><div>YES → check permission</div><div>NO → deny entry</div></div>'+
  w9ans('<p>Ask about permission only after the age check succeeds. This is <b>nested selection</b>.</p>'),
  'Teach dependency before nested braces.'));
 s.push(slide('Read an actual nested if',
  w9code(['int age = 14;','boolean hasPass = true;','if (age >= 13) {','    if (hasPass) {','        System.out.println("Enter");','    }','}'])+
  '<p class="q">Which condition executes first, and when is the inner if examined?</p>'+
  '<div class="beat eval-step">Outer: age >= 13 → true</div>'+
  '<div class="beat eval-step">Inner: hasPass → true</div>'+
  '<div class="beat console-box">Enter</div>',
  'Three causal reveals; code does not need to be a full class on tracing slides.'));
 s.push(slide('When the outer condition is FALSE',
  w9code(['int age = 12;','boolean hasPass = true;','if (age >= 13) {','    if (hasPass) {','        System.out.println("Enter");','    }','}','System.out.println("Done");'])+
  '<p class="q">Is <code>hasPass</code> tested? Which line prints?</p>'+
  w9ans('<div class="console-box">Done</div><p>The inner condition is <b>not evaluated</b> when the outer path is false.</p>'),
  'Required official 2.4.A.2. One reveal with exact output.'));
 s.push(slide('When only the inner condition is FALSE',
  w9code(['int age = 14;','boolean hasPass = false;','if (age >= 13) {','    if (hasPass) {','        System.out.println("Enter");','    }','}','System.out.println("Done");'])+
  '<p class="q">Does the first condition guarantee the message?</p>'+
  w9ans('<div class="console-box">Done</div><p>Outer true, inner false: the inner body is skipped.</p>'),
  'Different path through the same nested structure; explicit state progression.'));
 s.push(slide('Four input combinations, three behaviors',
  '<p class="q">Complete a trace table for the two booleans <code>oldEnough</code> and <code>hasPass</code>. When does the nested body execute?</p>'+
  '<div class="w9-case-table"><div>oldEnough</div><div>hasPass</div><div>Enter?</div>'+
  '<div>true</div><div>true</div><div class="beat" data-reveal-group="cases24">YES</div>'+
  '<div>true</div><div>false</div><div class="beat" data-reveal-group="cases24">NO</div>'+
  '<div>false</div><div>true</div><div class="beat" data-reveal-group="cases24">NO — inner not tested</div>'+
  '<div>false</div><div>false</div><div class="beat" data-reveal-group="cases24">NO — inner not tested</div></div>',
  'Four hidden result cells but four reveal clicks would be mechanical; reveal-group needed. All four should share one group and one click.');
 s.push(slide('An inner else belongs to the INNER if',
  w9code(['int age = 15;','boolean hasPass = false;','if (age >= 13) {','    if (hasPass) {','        System.out.println("Enter");','    } else {','        System.out.println("Get a pass");','    }','}'])+
  '<p class="q">Which conditional controls the <code>else</code>?</p>'+
  w9ans('<div class="console-box">Get a pass</div><p>Inside the outer braces, the else belongs to <code>if (hasPass)</code>.</p>'),
  'This covers block ownership with braces.'));
 s.push(slide('Outer else handles a different failure',
  w9code(['int age = 12;','boolean hasPass = true;','if (age >= 13) {','    if (hasPass) { System.out.println("Enter"); }','    else { System.out.println("Get a pass"); }','} else {','    System.out.println("Too young");','}'])+
  '<p class="q">Does the program print <code>Get a pass</code> or <code>Too young</code>?</p>'+
  w9ans('<div class="console-box">Too young</div><p>The outer condition is false, so only its <code>else</code> executes.</p>'),
  'Nested if-else alternatives are attached to the correct block.'));
 s.push(slide('A chain handles MORE THAN TWO outcomes',
  '<p class="q">A temperature may be cold, mild, or hot. Do we need nested braces for every new option?</p>'+
  w9code(['if (temp < 10) {','    System.out.println("Cold");','} else if (temp < 25) {','    System.out.println("Mild");','} else {','    System.out.println("Hot");','}'])+
  '<p class="scope-note"><code>else if</code> creates a <b>multiway selection</b>.</p>',
  'Official 2.4.A.3 introduces multiway else-if.'));
 s.push(slide('First true condition wins',
  w9code(['int temp = 8;','if (temp < 10) {','    System.out.println("Cold");','} else if (temp < 25) {','    System.out.println("Mild");','} else {','    System.out.println("Hot");','}'])+
  '<p class="q">Both comparisons are true numerically. Why does only one label print?</p>'+
  w9ans('<div class="console-box">Cold</div><p>The first matching condition executes. All later branches in the chain are skipped.</p>'),
  'Critical distinction between independent ifs and a chain.'));
 s.push(slide('Changing the order can break a classification',
  w9code(['int temp = 8;','if (temp < 25) {','    System.out.println("Mild");','} else if (temp < 10) {','    System.out.println("Cold");','}'])+
  '<p class="q">Can the second branch EVER print Cold for a temperature below 10?</p>'+
  w9ans('<div class="console-box">Mild</div><p>Any value below 10 also satisfies the earlier <code>temp &lt; 25</code>. The Cold branch is unreachable.</p>'),
  'Catch ordering bug; false to claim that first/second checks independent.'));
 s.push(slide('A trailing else handles every remaining case',
  w9code(['int score = 45;','if (score >= 90) {','    System.out.println("A");','} else if (score >= 70) {','    System.out.println("Pass");','} else {','    System.out.println("Retry");','}'])+
  '<p class="q">What prints if no earlier condition is true?</p>'+
  w9ans('<div class="console-box">Retry</div><p>The final else is the default outcome.</p>'),
  'Default branch plus threshold reasoning.'));
 s.push(slide('Without a final else, nothing may be chosen',
  w9code(['int n = -3;','if (n > 5) {','    System.out.print("H");','} else if (n == 0) {','    System.out.print("Z");','}','System.out.print("E");'])+
  '<p class="q">Does an else-if chain automatically have a fallback?</p>'+
  w9ans('<div class="console-box">E</div><p>No. Both conditions are false, so only the statement after the chain runs.</p>'),
  'No automatic trailing else, analogous to Week 8 first conditional.'));
 s.push(slide('Compare a chain with independent ifs',
  w9code(['int n = 20;','if (n > 5) { System.out.print("A"); }','if (n > 15) { System.out.print("B"); }'])+
  '<p class="q">What prints with TWO separate if statements?</p>'+
  w9ans('<div class="console-box">AB</div><p>Both conditions are evaluated; both are true.</p>'),
  'Contrast with first-match chain.'));
 s.push(slide('The dangling else: indentation is not enough',
  w9code(['int x = 1;','int y = 0;','if (x > 0)','    if (y > 0)','        System.out.print("A");','    else','        System.out.print("B");'])+
  '<p class="q">Which <code>if</code> owns the <code>else</code> when braces are absent?</p>'+
  w9ans('<div class="console-box">B</div><p>The <code>else</code> attaches to the nearest unmatched <code>if</code>. Use braces to make intent explicit.</p>'),
  'CSAwesome 2.4.2 dangling else core rule.'));
 s.push(slide('A counterexample exposes the dangling else',
  w9code(['int x = 0;','int y = 0;','if (x > 0)','    if (y > 0)','        System.out.print("A");','    else','        System.out.print("B");','System.out.print("C");'])+
  '<p class="q">Does the else run when the OUTER if is false?</p>'+
  w9ans('<div class="console-box">C</div><p>No: the entire inner if/else belongs inside the skipped outer if.</p>'),
  'Counterexample: outer false means inner else not considered.'));
 s.push(slide('Rewrite an ambiguous nested conditional',
  '<p class="q">How can braces make the intended outer/inner grouping unmistakable?</p>'+
  w9ans(w9code(['if (x > 0) {','    if (y > 0) {','        System.out.println("A");','    } else {','        System.out.println("B");','    }','}'],true)),
  'One reveal; intent is clear and legal Java if x/y declared.'));
 s.push(w9quiz('Practice 1 — first-match classification','What prints?',
  ['int n = 80;','if (n >= 90) System.out.print("A");','else if (n >= 70) System.out.print("B");','else System.out.print("C");'],
  ['A','B','C','Nothing'],1,'The first condition is false, the next is true, so B prints.'));
 s.push(w9quiz('Practice 2 — inner skipped','What prints?',
  ['int a = 0;','int b = 10;','if (a > 0) {','    if (b > 5) System.out.print("X");','}','System.out.print("Y");'],
  ['X','Y','XY','Nothing'],1,'The outer if is false, so the inner if is never examined; Y prints later.'));
 s.push(w9quiz('Practice 3 — independent ifs','What prints?',
  ['int n = 5;','if (n > 3) System.out.print("A");','if (n < 9) System.out.print("B");'],
  ['A','B','AB','Nothing'],2,'The two if statements are independent and both conditions hold.'));
 s.push(slide('Coding challenge — Adventure choice router',
  '<p class="practice-kicker">WRITE & RUN JAVA · 10 MINUTES</p>'+
  w8steps(['Write a complete class named AdventureChoice with an int direction set to 2','Use if / else if / else for north (1), east (2), or invalid direction','For east, add a nested if that checks boolean hasMap','Print "East with map" if true, otherwise "East without map"','Predict outcomes for direction 1, 2, 9 and both values of hasMap'])+
  '<p class="scope-note">One complete Java program. Do not add Scanner; change variables and rerun tests.</p>',
  'Adapted from CSAwesome 2.4.3 text adventure, reduced to static and deterministic behavior.'));
 s.push(slide('Review — AdventureChoice program',
  '<p class="q">Compare only after writing and testing your program.</p>'+
  w9ans(w9code(['public class AdventureChoice {','  public static void main(String[] args) {','    int direction = 2;','    boolean hasMap = false;','    if (direction == 1) {','      System.out.println("North");','    } else if (direction == 2) {','      if (hasMap) {','        System.out.println("East with map");','      } else {','        System.out.println("East without map");','      }','    } else {','      System.out.println("Invalid");','    }','  }','}'],true)+
  '<div class="console-box">East without map</div>'),
  'Complete 2.4 program, no new syntax beyond taught material.'));
 s.push(slide('Exit check — the first TRUE branch',
  '<p class="q">Explain independently: when is an inner if skipped? What does a dangling else attach to? What happens if no else-if condition matches and no final else exists?</p>',
  'Teacher answer only: outer false; nearest unmatched if; no branch runs. No reveal.'));
 s.push(slide('Topic 2.4 free text and practice',resources(l.resources),
  'Primary CSAwesome chapter and official CED. Later 2.5 compounds boolean operators, do not teach here.'));
 return s.join('');
}
function buildTopic25(l){
 const s=[apCover(l,'2.5','Compound Boolean<br>Expressions',
  'Combine requirements using AND, OR and NOT — with predictable evaluation order.',
  'CSAwesome2 2.5.1 logical operators, 2.5.2 truth tables, 2.5.3 short circuit, 2.5.4 POGIL/truth-table work, 2.5.6 AP practice. CED 2.5.A.1–2.')];
 s.push(slide('Retrieve: each comparison has a Boolean result',
  w9code(['int score = 82;','boolean passed = score >= 70;'])+
  '<p class="q">What value is stored in <code>passed</code>?</p>'+
  w9ans(w9trace([['passed','true']])+'<p>Each comparison gives one true/false value, which can be combined with another.</p>'),
  'Review 2.2 before new operators.'));
 s.push(slide('AND means both requirements must hold',
  '<p class="q">You may leave only after your room is clean AND homework is complete. If the room is clean but homework is not complete, may you leave?</p>'+
  w9ans('<p><b>No.</b> Java writes AND as <code>&amp;&amp;</code>; both conditions must be true.</p>'),
  'Introduce operator as meaning, not code-first.'));
 s.push(slide('Translate an English AND rule into Java',
  w9code(['boolean clean = true;','boolean homework = false;','System.out.println(clean && homework);'])+
  '<p class="q">Is this true or false?</p>'+
  w9ans('<div class="console-box">false</div><p>The first requirement is satisfied but the second is not.</p>'),
  'Actual Java output; no output until reveal.'));
 s.push(slide('Truth table for AND',
  '<p class="q">For which combinations of A and B is <code>A &amp;&amp; B</code> true?</p>'+
  '<div class="beat">'+w9truth([['A','B','A &amp;&amp; B'],['true','true','true'],['true','false','false'],['false','true','false'],['false','false','false']])+'</div>',
  'One reveal for the whole table; not four filler clicks.'));
 s.push(slide('OR means at least one requirement',
  '<p class="q">You may enter if you have a ticket OR a staff badge. Is entry allowed if you have both?</p>'+
  w9ans('<p><b>Yes.</b> Java writes OR as <code>||</code>. One condition or both can be true.</p>'),
  'Avoid exclusive-or mistake.'));
 s.push(slide('Truth table for OR',
  '<p class="q">Complete the table for <code>A || B</code>. Does true OR true remain true?</p>'+
  '<div class="beat">'+w9truth([['A','B','A || B'],['true','true','true'],['true','false','true'],['false','true','true'],['false','false','false']])+'</div>',
  'One reveal for entire table.'));
 s.push(slide('NOT reverses one Boolean value',
  w9code(['boolean canceled = false;','System.out.println(!canceled);'])+
  '<p class="q">What prints when the NOT operator flips false?</p>'+
  w9ans('<div class="console-box">true</div><p><code>!</code> negates a Boolean expression.</p>'),
  'A unary operator, applied before the others by precedence.'));
 s.push(slide('Three operators, three different meanings',
  '<div class="w9-three"><div><code>&amp;&amp;</code><span>AND: both</span></div><div><code>||</code><span>OR: either or both</span></div><div><code>!</code><span>NOT: reverse</span></div></div>'+
  '<p class="scope-note">Every completed compound expression is still of type <code>boolean</code>.</p>',
  'Static consolidation, not a fake reveal.'));
 s.push(slide('Write a range check with AND',
  w9code(['int score = 85;','boolean valid = score >= 0 && score <= 100;','System.out.println(valid);'])+
  '<p class="q">Why do we need BOTH comparisons for valid scores?</p>'+
  w9ans('<div class="console-box">true</div><p>Scores must be at least 0 <b>and</b> at most 100.</p>'),
  'Reference 2.5 range-checking task.'));
 s.push(slide('Write an OUT-OF-RANGE check with OR',
  w9code(['int score = -5;','boolean invalid = score < 0 || score > 100;','System.out.println(invalid);'])+
  '<p class="q">Would one invalid boundary be sufficient?</p>'+
  w9ans('<div class="console-box">true</div><p>Below 0 <b>or</b> above 100 is enough to reject the score.</p>'),
  'Contrast with prior AND, not already claiming equivalence proof (next topic).'));
 s.push(slide('Parentheses can force a different grouping',
  w9code(['boolean a = true;','boolean b = false;','boolean c = false;','System.out.println(a || b && c);'])+
  '<p class="q">Which operator runs first when parentheses are absent?</p>'+
  '<div class="beat eval-step">Grouping: a || (b &amp;&amp; c)</div>'+
  '<div class="beat"><div class="console-box">true</div><p>Since a is true, Java short-circuits OR and does not evaluate the right-hand operand.</p></div>',
  'Show grouping first and explain short-circuit execution correctly rather than pretending to evaluate b && c.'));
 s.push(slide('Operator precedence: NOT, then AND, then OR',
  '<div class="w9-precedence"><div>1 <code>!</code><span>highest</span></div><div>2 <code>&amp;&amp;</code><span>middle</span></div><div>3 <code>||</code><span>lowest</span></div></div>'+
  '<p class="scope-note">Use parentheses to make the intent explicit, especially with mixed operators.</p>',
  'Static reference ordering with no ambiguous code evaluations.'));
 s.push(slide('A different grouping changes the answer',
  w9code(['boolean a = true;','boolean b = false;','boolean c = false;','System.out.println((a || b) && c);'])+
  '<p class="q">Why is this output different from <code>a || b &amp;&amp; c</code>?</p>'+
  w9ans('<div class="console-box">false</div><p>The parentheses combine <code>a || b</code> first, then AND with false <code>c</code>.</p>'),
  'To be clear logical grouping precedence, not method execution trace.'));
 s.push(slide('Short-circuit: false AND skips the right side',
  w9code(['int divisor = 0;','boolean safe = divisor != 0 && 20 / divisor > 2;','System.out.println(safe);'])+
  '<p class="q">Does Java divide by zero?</p>'+
  w9ans('<div class="console-box">false</div><p><code>divisor != 0</code> is false, so the right operand is <b>not evaluated</b>.</p>'),
  'Important CED 2.5.A.2; safe guarding division.'));
 s.push(slide('Short-circuit: true OR skips the right side',
  w9code(['int divisor = 0;','boolean result = divisor == 0 || 20 / divisor > 2;','System.out.println(result);'])+
  '<p class="q">What prevents a division by zero?</p>'+
  w9ans('<div class="console-box">true</div><p>The first part of <code>||</code> is true, so Java skips the second.</p>'),
  'Contrasting OR short circuit.'));
 s.push(slide('Reversing the condition order can cause a crash',
  w9code(['int divisor = 0;','boolean unsafe = 20 / divisor > 2 && divisor != 0;'])+
  '<p class="q">Does a valid guard on the RIGHT prevent the earlier division?</p>'+
  w9ans('<b>RUNTIME ERROR.</b><p>The left operand executes first and divides by zero before Java can test the guard.</p>'),
  'Behavior fails, not a compile error. Exact RHS evaluation matters.'));
 s.push(slide('Short-circuit is also useful with object references',
  w9code(['String message = null;','boolean shortWord = message != null && message.length() < 5;'])+
  '<p class="q">Will <code>message.length()</code> be invoked?</p>'+
  w9ans('<p><b>No.</b> <code>message != null</code> is false, so AND skips the unsafe method call; <code>shortWord</code> is false.</p>'),
  'Safe null guard, bridges into 2.6 reference comparison. String length taught in 1.15.'));
 s.push(w9quiz('Practice 1 — AND conditions','What value is printed?',
  ['boolean ready = true;','boolean paid = false;','System.out.println(ready && paid);'],
  ['true','false','1','Compiler error'],1,'AND requires both operands to be true.'));
 s.push(w9quiz('Practice 2 — OR conditions','What value is printed?',
  ['boolean a = true;','boolean b = true;','System.out.println(a || b);'],
  ['false','true','2','Compiler error'],1,'OR is inclusive: true OR true is still true.'));
 s.push(w9quiz('Practice 3 — precedence','What value is produced?',
  ['boolean a = false, b = true, c = false;','System.out.println(a || b && !c);'],
  ['true','false','0','Compiler error'],0,'NOT false is true; true AND true is true; false OR true is true.'));
 s.push(slide('Coding challenge — admission rule checker',
  '<p class="practice-kicker">WRITE & RUN JAVA · 10 MINUTES</p>'+
  w8steps(['Write a complete public class AdmissionRule','Create int age = 15 and boolean hasPass = true','Allow entry only when age is 13–17 inclusive AND hasPass is true','Print "Allowed" or "Denied" with if/else','Change values to test boundary ages 12, 13, 17 and 18 and both pass values'])+
  '<p class="scope-note">Use the logical operators and a single condition. No loops yet.</p>',
  'Stand-alone coding challenge with complete result on next slide, not in prompt.'));
 s.push(slide('Review — admission rule implementation',
  '<p class="q">Compare only after writing the class and testing all boundaries.</p>'+
  w9ans(w9code(['public class AdmissionRule {','  public static void main(String[] args) {','    int age = 15;','    boolean hasPass = true;','    if (age >= 13 && age <= 17 && hasPass) {','      System.out.println("Allowed");','    } else {','      System.out.println("Denied");','    }','  }','}'],true)+
  '<div class="console-box">Allowed</div>'),
  'Compilable Java and expected output for initial variables.'));
 s.push(slide('Exit check — when is the right side skipped?',
  '<p class="q">Describe one situation where <code>&amp;&amp;</code> short-circuits and one where <code>||</code> short-circuits. Explain why operator order matters.</p>',
  'Expected false && / true ||, do not display answers.'));
 s.push(slide('Topic 2.5 references and extra exercises',resources(l.resources),
  'CSAwesome2 truth table POGIL and Boolean Game are available through matching chapter.'));
 return s.join('');
}
