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

function buildTopic26(l){
 const s=[apCover(l,'2.6','Comparing Boolean<br>Expressions',
  'Equivalent logic gives the same result in EVERY case, not just one example.',
  'CSAwesome2 2.6.1 De Morgan, 2.6.2 truth tables, 2.6.3 simplification, 2.6.4–2.6.7 object reference/String/null checks, 2.6.10 AP practice; CED 2.6.A.1–2 and 2.6.B.1–3. Do not teach overriding equals.')];
 s.push(slide('One successful test does NOT prove equivalence',
  w9code(['boolean a = true;','boolean b = false;','System.out.println(a && b);','System.out.println(a == b);'])+
  '<p class="q">Both print false here. Are these expressions always equivalent?</p>'+
  w9ans('<b>NO.</b><p>If a=false and b=false: <code>a &amp;&amp; b</code> is false, but <code>a == b</code> is true.</p>'),
  'Concrete counterexample before formal definition.'));
 s.push(slide('Equivalent means SAME truth value in ALL cases',
  '<div class="w9-equivalence"><div><code>!(a &amp;&amp; b)</code></div><div>Equivalent?</div><div><code>!a || !b</code></div></div>'+
  '<p class="q">How can we PROVE or disprove two expressions for every possible pair of inputs?</p>'+
  w9ans('<p>List every possible Boolean input combination and compare the resulting columns in a <b>truth table</b>.</p>'),
  'Definition of semantic equivalence, not string similarity.'));
 s.push(slide('A truth table enumerates FOUR cases',
  '<p class="q">With two Boolean variables a and b, how many combinations of true and false exist?</p>'+
  '<div class="beat">'+w9truth([['a','b'],['true','true'],['true','false'],['false','true'],['false','false']])+'</div>',
  'Four cases, one reveal. No extra repetitive intermediate screens.'));
 s.push(slide('Prove the first De Morgan identity',
  '<p class="q">Do <code>!(a &amp;&amp; b)</code> and <code>!a || !b</code> agree in every case?</p>'+
  '<div class="beat">'+w9truth([['a','b','!(a &amp;&amp; b)','!a || !b'],
   ['T','T','F','F'],['T','F','T','T'],['F','T','T','T'],['F','F','T','T']])+'</div>'+
  '<p class="scope-note">Matching result columns for every row prove equivalence.</p>',
  'One complete table, not four reveals.'));
 s.push(slide('De Morgan #1 — NOT of AND becomes OR',
  '<div class="w9-rule"><code>!(a &amp;&amp; b)</code><span>≡</span><code>!a || !b</code></div>'+
  '<p class="q">In ordinary English, how do you deny “both conditions are true”?</p>'+
  w9ans('<p>At least one of the conditions is false. Change AND to OR and negate each part.</p>'),
  'Meaning before memorizing symbols.'));
 s.push(slide('Prove the second De Morgan identity',
  '<p class="q">Do <code>!(a || b)</code> and <code>!a &amp;&amp; !b</code> agree for all input pairs?</p>'+
  '<div class="beat">'+w9truth([['a','b','!(a || b)','!a &amp;&amp; !b'],
   ['T','T','F','F'],['T','F','F','F'],['F','T','F','F'],['F','F','T','T']])+'</div>',
  'Second table independently grounds the second rule.'));
 s.push(slide('De Morgan #2 — NOT of OR becomes AND',
  '<div class="w9-rule"><code>!(a || b)</code><span>≡</span><code>!a &amp;&amp; !b</code></div>'+
  '<p class="q">What must be true for “neither A nor B” to be true?</p>'+
  w9ans('<p>Both A and B must be false. Change OR to AND and negate each part.</p>'),
  'Recognize the change of operator AND/OR and negation of each operand.'));
 s.push(slide('Do NOT just remove a negation',
  '<p class="q">Is <code>!(a &amp;&amp; b)</code> equivalent to <code>!a &amp;&amp; !b</code>?</p>'+
  w9ans('<b>NO.</b><p>For a=true, b=false: the left is true, while the right is false. Negating both parts also requires swapping AND with OR.</p>'),
  'Counterexample to common wrong transformation.'));
 s.push(slide('Relational operators have complements',
  '<div class="w9-compare-ops"><div><code>!(x &lt; y)</code><code>x &gt;= y</code></div>'+
  '<div><code>!(x &gt; y)</code><code>x &lt;= y</code></div>'+
  '<div><code>!(x == y)</code><code>x != y</code></div></div>'+
  '<p class="scope-note">Flip BOTH the comparison direction and equality boundary where applicable.</p>',
  'Table shows 3 representative pairs. Reverse pairs in next application.'));
 s.push(slide('A boundary counterexample for negation',
  '<p class="q">When x=10, is NOT (x&lt;10) the same as x&gt;10?</p>'+
  w9ans('<b>NO.</b><p><code>!(x &lt; 10)</code> is true at x=10, but <code>x &gt; 10</code> is false. The equivalent expression is <code>x &gt;= 10</code>.</p>'),
  'Equality must be included in complement.'));
 s.push(slide('Negate an entire RANGE check',
  w9code(['boolean valid = x >= 5 && x <= 10;'])+
  '<p class="q">What single Boolean expression describes <b>invalid</b> values outside 5 through 10?</p>'+
  w9ans('<div class="w9-rule"><code>!(x &gt;= 5 &amp;&amp; x &lt;= 10)</code><span>≡</span><code>x &lt; 5 || x &gt; 10</code></div>'),
  'Uses De Morgan plus relational complement; no double negations left.'));
 s.push(slide('Negate an OUTSIDE-range expression',
  w9code(['boolean outside = x < 0 || x > 100;'])+
  '<p class="q">Which condition expresses the OPPOSITE — inside the legal range, endpoints included?</p>'+
  w9ans('<div class="w9-rule"><code>!(x &lt; 0 || x &gt; 100)</code><span>≡</span><code>x &gt;= 0 &amp;&amp; x &lt;= 100</code></div>'),
  'Converse transformation and explicit endpoints.'));
 s.push(slide('Disprove an equivalence with ONE example',
  '<p class="q">Someone claims <code>a || b</code> is equivalent to <code>a &amp;&amp; b</code>. Which input immediately disproves it?</p>'+
  w9ans(w9trace([['a','true'],['b','false']])+
   '<p>OR returns true, AND returns false. A single counterexample disproves universal equivalence.</p>'),
  'Contrast proof (all cases) vs disproof (one case).'));
 s.push(slide('Double negation cancels',
  w9code(['boolean allowed = true;','System.out.println(!!allowed);'])+
  '<p class="q">Does applying NOT twice preserve or change a Boolean value?</p>'+
  w9ans('<div class="console-box">true</div><p><code>!!a</code> is equivalent to <code>a</code> for every Boolean a.</p>'),
  'Useful simplification with a single expression.'));
 s.push(slide('Simplify a Boolean contradiction',
  '<p class="q">Can <code>ready &amp;&amp; !ready</code> EVER evaluate to true?</p>'+
  w9ans('<b>ALWAYS FALSE.</b><p>One Boolean variable cannot be true and false simultaneously.</p>'),
  'Pattern used in reference 2.6 AP practice.'));
 s.push(slide('A Boolean tautology is ALWAYS true',
  '<p class="q">What about <code>ready || !ready</code>? Could either part fail at the same time?</p>'+
  w9ans('<b>ALWAYS TRUE.</b><p>Either ready is true or its opposite is true.</p>'),
  'Distinct all-true contrast.'));
 s.push(slide('Two reference variables can be ALIASES',
  w9code(['String first = new String("Hi");','String second = first;','System.out.println(first == second);'])+
  '<p class="q">Do both variables refer to ONE object?</p>'+
  w9ans('<div class="console-box">true</div><p>The assignment copies the same object reference. These variables are <b>aliases</b>.</p>'),
  'CED 2.6.B.1 is not limited to De Morgan. Reinforce exact object identity.'));
 s.push(slide('Equal text does not mean SAME object',
  w9code(['String a = new String("Hi");','String b = new String("Hi");','System.out.println(a == b);','System.out.println(a.equals(b));'])+
  '<p class="q">What do the two comparisons test?</p>'+
  w9ans('<div class="console-box">false<br>true</div><p><code>==</code> checks reference identity; <code>equals</code> checks String contents.</p>'),
  'Uses new String twice to avoid literal interning ambiguity.'));
 s.push(slide('null means a reference has NO object',
  w9code(['String label = null;','System.out.println(label == null);','System.out.println(label != null);'])+
  '<p class="q">What do the null comparisons print?</p>'+
  w9ans('<div class="console-box">true<br>false</div><p>Comparing references to null is valid even though calling an instance method on null is not.</p>'),
  'CED 2.6.B.2.'));
 s.push(slide('Prevent a NullPointerException safely',
  w9code(['String label = null;','if (label != null && label.length() > 2) {','    System.out.println("Long");','} else {','    System.out.println("Missing or short");','}'])+
  '<p class="q">Does Java call length() on null?</p>'+
  w9ans('<div class="console-box">Missing or short</div><p>The false first operand short-circuits AND, so the unsafe method call is skipped.</p>'),
  '2.5 short-circuit applied to 2.6 reference null safeguard.'));
 s.push(slide('Reversing the null guard is NOT safe',
  w9code(['String label = null;','if (label.length() > 2 && label != null) {','    System.out.println("Long");','}'])+
  '<p class="q">Why is this NOT equivalent in run-time behavior to the safe condition?</p>'+
  w9ans('<b>RUNTIME ERROR.</b><p>The method call occurs before the null guard. Java throws <code>NullPointerException</code>.</p>'),
  'Different execution behavior, not Boolean algebra with total operands.'));
 s.push(slide('Classes can define equals semantics',
  '<p class="q">Why can <code>first.equals(second)</code> be different from <code>first == second</code> for objects?</p>'+
  w9ans('<p><code>==</code> checks identity. A class’s <code>equals</code> method may specify equivalence based on relevant attributes. Writing an overridden <code>equals</code> is <b>outside AP scope</b>.</p>'),
  'CED 2.6.B.3 and explicit exclusion. Do not implement equals overrides.'));
 s.push(w9quiz('Practice 1 — De Morgan transformation',
  'Which expression is equivalent to <code>!(a && b)</code>?',null,
  ['!a && !b','!a || !b','a || b','a && !b'],1,
  'NOT of AND becomes OR of the negated operands.'));
 s.push(w9quiz('Practice 2 — relational complement',
  'What is equivalent to <code>!(score >= 80)</code>?',null,
  ['score > 80','score <= 80','score < 80','score == 80'],2,
  'The complement of >= includes all values strictly below 80.'));
 s.push(w9quiz('Practice 3 — reference identity',
  'What is the output?',
  ['String a = new String("ok");','String b = a;','System.out.println(a == b);'],
  ['true','false','ok','Compiler error'],0,
  'Two variables hold the same reference, so identity comparison is true.'));
 s.push(slide('Coding challenge — equivalent range checks',
  '<p class="practice-kicker">WRITE & RUN JAVA · 10 MINUTES</p>'+
  w8steps(['Create a complete class CompareRanges with int x = 7','Print the value of !(x < 5 || x > 10)','Print the value of x >= 5 && x <= 10','Change x to 4, 5, 10 and 11 and compare each pair of outputs','Explain WHY they always agree using De Morgan and boundary rules'])+
  '<p class="scope-note">Use four edge cases, not just the first successful test.</p>',
  'Source aligned to CSAwesome 2.6 equivalent-expressions coding challenge; solution next slide.'));
 s.push(slide('Review — runnable equivalent range checks',
  '<p class="q">Check only after your own complete Java class and edge-case tests.</p>'+
  w9ans(w9code(['public class CompareRanges {','  public static void main(String[] args) {','    int x = 7;','    System.out.println(!(x < 5 || x > 10));','    System.out.println(x >= 5 && x <= 10);','  }','}'],true)+
  '<div class="console-box">true<br>true</div><p>Both represent x inside the inclusive range [5, 10].</p>'),
  'Complete compilable Java, compare each value with same x.'));
 s.push(slide('Topic 2.6 exit check',
  '<p class="q">Explain the difference between <b>proof by truth table</b> and <b>disproof by counterexample</b>. Then explain when to use <code>==</code>, <code>!= null</code> and <code>equals</code> on object references.</p>',
  'Teacher diagnostic only. No answer reveal.'));
 s.push(slide('Topic 2.6 official objectives and practice',resources(l.resources),
  'Reference includes De Morgan, truth tables, reference comparisons, null safeguards and equals semantics.'));
 return s.join('');
}

function buildWeek9Practice(l){
 // All on-slide questions are original AP-style MCQs, never copied official past exam items.
 const q=[
 // 2.4 — nested if, first-match else-if, dangling else, branch ownership.
 ['2.4','Outer condition false','What is printed?', 'int a = 2;\nint b = 9;\nif (a > 5) { if (b > 5) System.out.print("X"); }\nSystem.out.print("Y");',
 ['X','Y','XY','Nothing'],1,'The outer if is false; the inner if is skipped and Y prints after the block.'],
 ['2.4','Both conditions true','What is printed?', 'int age = 15;\nboolean pass = true;\nif (age >= 13) {\n  if (pass) System.out.print("Enter");\n}',
 ['Enter','Nothing','true','Compiler error'],0,'Both nested conditions are true and the inner body executes.'],
 ['2.4','Inner condition false','What is printed?', 'int age = 15;\nboolean pass = false;\nif (age >= 13) {\n  if (pass) System.out.print("Enter");\n}\nSystem.out.print("Done");',
 ['Enter','Done','EnterDone','Nothing'],1,'The outer branch runs but the inner body is skipped, then Done prints.'],
 ['2.4','Inner else','What is printed?', 'int a = 5, b = 0;\nif (a > 0) {\n  if (b > 0) System.out.print("A");\n  else System.out.print("B");\n}',
 ['A','B','AB','Nothing'],1,'The else belongs to inner if and runs because b>0 is false.'],
 ['2.4','Outer else','What prints?', 'int a = -1, b = 9;\nif (a >= 0) {\n  if (b >= 0) System.out.print("A");\n} else {\n  System.out.print("B");\n}',
 ['A','B','AB','Nothing'],1,'The outer condition is false so its else prints B.'],
 ['2.4','First match','What prints?', 'int n = 95;\nif (n >= 80) System.out.print("A");\nelse if (n >= 90) System.out.print("B");\nelse System.out.print("C");',
 ['A','B','C','AB'],0,'The first true branch wins; the later more selective test is skipped.'],
 ['2.4','Other branch','What prints?', 'int n = 67;\nif (n >= 90) System.out.print("A");\nelse if (n >= 70) System.out.print("B");\nelse System.out.print("C");',
 ['A','B','C','Nothing'],2,'67 satisfies neither >=90 nor >=70, so the trailing else executes.'],
 ['2.4','No final else','What prints?', 'int n = -2;\nif (n > 0) System.out.print("P");\nelse if (n == 0) System.out.print("Z");\nSystem.out.print("E");',
 ['P','Z','E','PE'],2,'No chain branch matches; only E outside the chain prints.'],
 ['2.4','Independent vs chain','What is printed?', 'int n = 7;\nif (n > 3) System.out.print("A");\nif (n > 5) System.out.print("B");',
 ['A','B','AB','Nothing'],2,'Both independent if statements are true and execute.'],
 ['2.4','Changed state','What is the final value of x?', 'int x = 2;\nif (x > 1) {\n  x += 2;\n  if (x > 3) x *= 2;\n}',
 ['2','4','6','8'],3,'The outer if adds 2 to reach 4, then the inner if doubles it to 8.'],
 ['2.4','Dangling else','What is printed?', 'int x = 2, y = 0;\nif (x > 0)\n  if (y > 0) System.out.print("A");\n  else System.out.print("B");',
 ['A','B','AB','Nothing'],1,'Without braces, else belongs to the nearest unmatched inner if.'],
 ['2.4','Outer skip with dangling else','What is printed?', 'int x = 0, y = 0;\nif (x > 0)\n  if (y > 0) System.out.print("A");\n  else System.out.print("B");\nSystem.out.print("C");',
 ['B','C','BC','Nothing'],1,'The outer condition is false, so the entire inner if/else is skipped and C prints.'],
 ['2.4','Never reached','Which condition is never evaluated in this execution?', 'int x = 3;\nif (x > 5) {\n  if (x == 3) System.out.print("A");\n}',
 ['x > 5','x == 3','Both are evaluated','Neither is evaluated'],1,'The outer false condition prevents evaluating its nested condition.'],
 ['2.4','Multiway output count','How many branch bodies can run during one if / else-if / else chain?', '',
 ['Exactly two','No more than one','Every true body','All bodies in order'],1,'Only the first true branch, or final else, runs.'],
 ['2.4','Boundary priority','What prints?', 'int score = 70;\nif (score >= 90) System.out.print("A");\nelse if (score >= 70) System.out.print("B");\nelse System.out.print("C");',
 ['A','B','C','Nothing'],1,'At exactly 70 the second threshold is true.'],
 ['2.4','Correct classification order','Which condition should appear FIRST in a descending score classification?', '',
 ['score >= 60','score >= 70','score >= 80','score >= 90'],3,'An if/else-if chain should test the highest threshold first so lower tests cannot hide higher grades.'],
 // 2.5 — Boolean algebra, precedence, short circuit.
 ['2.5','AND truth','What is the value of true && false?', '',
 ['true','false','1','Compiler error'],1,'AND is true only when both operands are true.'],
 ['2.5','OR truth','What is the value of true || true?', '',
 ['false','true','2','Compiler error'],1,'OR is inclusive: either or both true is true.'],
 ['2.5','NOT truth','What is the value of !false?', '',
 ['false','true','0','Compiler error'],1,'NOT flips false to true.'],
 ['2.5','Compound range','For which x is x >= 4 && x <= 7 true?', '',
 ['Only x=4','Integers 4,5,6,7','All integers except 4–7','Only x=7'],1,'Both boundary comparisons must hold, inclusive.'],
 ['2.5','Outside range','What condition is true when score is below 0 or above 100?', '',
 ['score < 0 && score > 100','score >= 0 && score <= 100','score < 0 || score > 100','score == 0 && score == 100'],2,'Either invalid boundary is sufficient, so OR is appropriate.'],
 ['2.5','NOT precedence','What is the value?', 'boolean a = false;\nSystem.out.println(!a);',
 ['true','false','0','Compile error'],0,'NOT reverses false.'],
 ['2.5','Logical precedence','What prints?', 'boolean a = true, b = false, c = false;\nSystem.out.println(a || b && c);',
 ['false','true','0','Compile error'],1,'Grouping is a || (b&&c); since a is true OR short-circuits to true.'],
 ['2.5','Explicit parentheses','What prints?', 'boolean a = true, b = false, c = false;\nSystem.out.println((a || b) && c);',
 ['true','false','0','Compile error'],1,'The parenthesized OR is true, then true && false is false.'],
 ['2.5','Three operators','Which logical operator has highest precedence in Java?', '',
 ['||','&&','!','They all share precedence'],2,'NOT is evaluated before AND, which groups before OR.'],
 ['2.5','Short circuit AND','What prints?', 'int d = 0;\nSystem.out.println(d != 0 && 10 / d > 1);',
 ['true','false','ArithmeticException','Compile error'],1,'A false first operand short-circuits AND; division is not attempted.'],
 ['2.5','Short circuit OR','What prints?', 'int d = 0;\nSystem.out.println(d == 0 || 10 / d > 1);',
 ['true','false','ArithmeticException','Compile error'],0,'A true first operand short-circuits OR; division is skipped.'],
 ['2.5','Unsafe guard order','What happens?', 'int d = 0;\nSystem.out.println(10 / d > 1 && d != 0);',
 ['Prints false','Prints true','Run-time ArithmeticException','Compile-time error'],2,'The division on the left executes before the right-hand guard.'],
 ['2.5','Null AND guard','What prints?', 'String s = null;\nSystem.out.println(s != null && s.length() > 0);',
 ['true','false','NullPointerException','Compile error'],1,'The first condition is false and the method call is skipped.'],
 ['2.5','Null OR guard','What prints?', 'String s = null;\nSystem.out.println(s == null || s.length() > 0);',
 ['true','false','NullPointerException','Compile error'],0,'The first condition is true so OR does not call length().'],
 ['2.5','Mixed operands','What is printed?', 'int n = 6;\nSystem.out.println(n > 0 && n % 2 == 0);',
 ['true','false','6','Compile error'],0,'6 is positive and even; both Boolean parts are true.'],
 ['2.5','Invalid Boolean operators','Which expression is valid Java for A AND B when A and B are boolean?', '',
 ['A and B','A & & B','A && B','A = B'],2,'The Java logical AND operator is &&.'],
 // 2.6 — equivalence, De Morgan, references and equals/null.
 ['2.6','Equivalence definition','When are two Boolean expressions logically equivalent?', '',
 ['When they agree for one tested input','When their source text is identical','When they agree for every possible input','When they both contain &&'],2,'Equivalence requires the same true/false result in all input cases.'],
 ['2.6','Number of cases','How many rows are needed in the truth table for two independent booleans?', '',
 ['2','3','4','8'],2,'Each Boolean has two possibilities; 2×2=4 cases.'],
 ['2.6','De Morgan AND','Which expression is equivalent to !(a && b)?', '',
 ['!a && !b','!a || !b','a || b','a && !b'],1,'Negating AND changes the operator to OR and negates each part.'],
 ['2.6','De Morgan OR','Which expression is equivalent to !(a || b)?', '',
 ['!a && !b','!a || !b','a && b','a || b'],0,'Negating OR changes it to AND with both operands negated.'],
 ['2.6','Relational complement','What is equivalent to !(x < 5)?', '',
 ['x > 5','x <= 5','x >= 5','x == 5'],2,'The complement includes all values greater than or equal to 5.'],
 ['2.6','Complement of >=','What is equivalent to !(score >= 80)?', '',
 ['score > 80','score <= 80','score < 80','score == 80'],2,'Negating >= gives strict <.'],
 ['2.6','Range complement','Which expression is equivalent to !(x >= 4 && x <= 9)?', '',
 ['x < 4 || x > 9','x < 4 && x > 9','x >= 4 || x <= 9','x == 4 || x == 9'],0,'De Morgan plus complement gives either side of the valid inclusive range.'],
 ['2.6','Outside complement','Which is equivalent to !(x < 0 || x > 10)?', '',
 ['x <= 0 || x >= 10','x > 0 && x < 10','x >= 0 && x <= 10','x < 0 && x > 10'],2,'Negating outside range gives the inclusive inside range.'],
 ['2.6','Counterexample','Which input disproves a || b equivalent to a && b?', '',
 ['a=true,b=true','a=false,b=false','a=true,b=false','All inputs have same result'],2,'With one true and one false, OR is true but AND is false.'],
 ['2.6','Contradiction','What is the value of a && !a for any boolean a?', '',
 ['Always true','Always false','Depends on a','Compiler error'],1,'A condition and its negation cannot both be true.'],
 ['2.6','Tautology','What is the value of a || !a for any boolean a?', '',
 ['Always true','Always false','Depends on a','Compiler error'],0,'Every Boolean a or its opposite must be true.'],
 ['2.6','Double NOT','Which is equivalent to !!ready?', '',
 ['!ready','ready','false','true'],1,'Applying NOT twice returns the original Boolean.'],
 ['2.6','Reference alias','What prints?', 'String a = new String("go");\nString b = a;\nSystem.out.println(a == b);',
 ['true','false','go','Compile error'],0,'Both variables refer to the same object.'],
 ['2.6','Separate equal Strings','What prints?', 'String a = new String("go");\nString b = new String("go");\nSystem.out.println(a == b);',
 ['true','false','go','Compile error'],1,'Two separate new calls create different objects despite matching characters.'],
 ['2.6','Content equality','What prints?', 'String a = new String("go");\nString b = new String("go");\nSystem.out.println(a.equals(b));',
 ['true','false','go','Compile error'],0,'String equals compares character content.'],
 ['2.6','null guard','What prints?', 'String s = null;\nSystem.out.println(s == null);',
 ['true','false','null','NullPointerException'],0,'Comparing a reference to null is valid and true when it holds no object.']
 ];
 const s=[];
 s.push(slide('Official AP question source — Unit 2 Part 1',
  '<p class="practice-kicker">OFFICIAL EXAM QUESTION ACCESS · ORIGINAL SOURCE ONLY</p>'+
  '<div class="w9-tasks"><p><a target="_blank" rel="noopener noreferrer" href="https://apclassroom.collegeboard.org/">AP Classroom — Unit 2 Part 1 Progress Check (Topics 2.1–2.6; select 2.4–2.6)</a></p>'+
  '<p><a target="_blank" rel="noopener noreferrer" href="https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf">Official College Board 2025 CED — Topic 2.4–2.6 and public sample questions</a></p>'+
  '<p><a target="_blank" rel="noopener noreferrer" href="https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam/past-exam-questions">Released AP FRQ archive — most questions integrate later topics</a></p></div>'+
  '<p class="scope-note">Official questions are accessed at the source. Every question below is original AP-style, not claimed to be a released AP exam item.</p>',
  'Question source slide only; no ordinary lecture content in Practice.'));
 s.push(slide('Open public CSAwesome2 chapter questions',
  '<p class="practice-kicker">TEXTBOOK QUESTIONS · SEPARATE FROM OFFICIAL EXAM</p>'+
  resources([{label:'Topic 2.4 — Nested if Statements AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-2-4-nested-ifs.html',kind:'Public textbook AP-style exercises'},
   {label:'Topic 2.5 — Compound Boolean Expressions AP Practice + game',url:'https://runestone.academy/ns/books/published/csawesome2/topic-2-5-compound-ifs.html',kind:'Public textbook AP-style exercises'},
   {label:'Topic 2.6 — De Morgan, references, null AP Practice',url:'https://runestone.academy/ns/books/published/csawesome2/topic-2-6-comparing-booleans.html',kind:'Public textbook AP-style exercises'}]),
  'Original textbook sources; do not reproduce proprietary online exam content.'));
 q.forEach(([topic,subject,question,code,choices,correct,reason],n)=>{
  s.push(w6quiz('Q'+String(n+1).padStart(2,'0')+' — '+esc(subject),
    'ORIGINAL AP-STYLE · TOPIC '+topic,question,code,choices,correct,reason,
    'Ask the student to choose one letter and justify their trace before revealing once.'));
 });
 return s.join('');
}
