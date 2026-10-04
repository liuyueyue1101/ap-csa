
(()=>{
const D=window.COURSE_DATA;
const R={
  2:[
    {label:"CSAwesome2 Unit 2: Selection and Iteration",url:"https://runestone.academy/ns/books/published/csawesome2/unit2.html",kind:"Free interactive text/practice"},
    {label:"Current-framework video tutorials (CodeHS / AP CS Exam Prep)",url:"https://www.apcsexamprep.com/pages/codehs-ap-computer-science-a-2025-revisions-video-tutorials",kind:"Free video"},
    {label:"College Board CED — verify required content and exclusions",url:"https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",kind:"Official"},
    {label:"Bill Barnum AP CSA review playlist (older unit numbering; concepts remain useful)",url:"https://www.youtube.com/playlist?list=PLmpmyPywZ440vPqpAPeUkE-TeKifbS45W",kind:"YouTube"}
  ],
  3:[
    {label:"CSAwesome2 Unit 3: Class Creation",url:"https://runestone.academy/ns/books/published/csawesome2/unit3.html",kind:"Free interactive text/practice"},
    {label:"Current-framework video tutorials (CodeHS / AP CS Exam Prep)",url:"https://www.apcsexamprep.com/pages/codehs-ap-computer-science-a-2025-revisions-video-tutorials",kind:"Free video"},
    {label:"College Board CED — current Class Creation requirements",url:"https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",kind:"Official"},
    {label:"Bill Barnum AP CSA review playlist (older unit numbering; concepts remain useful)",url:"https://www.youtube.com/playlist?list=PLmpmyPywZ440vPqpAPeUkE-TeKifbS45W",kind:"YouTube"}
  ],
  4:[
    {label:"CSAwesome2 Unit 4: Data Collections",url:"https://runestone.academy/ns/books/published/csawesome2/unit4.html",kind:"Free interactive text/practice"},
    {label:"Current-framework video tutorials (CodeHS / AP CS Exam Prep)",url:"https://www.apcsexamprep.com/pages/codehs-ap-computer-science-a-2025-revisions-video-tutorials",kind:"Free video"},
    {label:"College Board CED — current Data Collections requirements",url:"https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",kind:"Official"},
    {label:"Bill Barnum AP CSA review playlist (older unit numbering; concepts remain useful)",url:"https://www.youtube.com/playlist?list=PLmpmyPywZ440vPqpAPeUkE-TeKifbS45W",kind:"YouTube"}
  ],
  exam:[
    {label:"Official 2026 FRQs",url:"https://apcentral.collegeboard.org/media/pdf/ap26-frq-computer-science-a.pdf",kind:"Official"},
    {label:"Past FRQs and scoring information",url:"https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam/past-exam-questions",kind:"Official"},
    {label:"CSAwesome2 practice",url:"https://runestone.academy/ns/books/published/csawesome2/csawesome2.html",kind:"Free practice"},
    {label:"Bluebook",url:"https://bluebook.collegeboard.org/students/download-bluebook",kind:"Official"}
  ]
};
const weight={2:"25–35%",3:"10–18%",4:"30–40%"};
let seq=37, week=10;
function details(t,title){
 const special={
 "2.7":["A while loop repeats while its Boolean condition remains true.",["Initialize state before the loop.","Make progress toward termination.","Trace the condition before every iteration."],"int n = 3;\nwhile (n > 0) {\n    System.out.println(n);\n    n--;\n}"],
 "2.8":["A for loop packages initialization, condition, and update for predictable repetition.",["Trace initialization once.","Check the condition before each iteration.","Apply the update after each body execution."],"for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}"],
 "2.9":["Selection and iteration combine into algorithms that accumulate, count, search, and filter.",["Identify the changing state.","Choose conditions that match the specification.","Test boundary and no-match cases."],"int count = 0;\nfor (int x = 1; x <= 10; x++) {\n    if (x % 2 == 0) count++;\n}"],
 "2.10":["String algorithms process characters or substrings systematically using indexes and loops.",["Track valid String indexes.","Combine iteration with substring/char access.","Watch off-by-one boundaries."],"String s = \"{{student}}\";\nfor (int i = 0; i < s.length(); i++) {\n    System.out.println(s.substring(i, i + 1));\n}"],
 "2.11":["Nested iteration means a complete inner repetition happens for each outer iteration.",["Trace outer and inner counters separately.","Count total iterations as a product when appropriate.","Use a table to visualize repeated pairs."],"for (int r = 0; r < 3; r++) {\n    for (int c = 0; c < 4; c++) {\n        System.out.print(\"*\");\n    }\n    System.out.println();\n}"],
 "2.12":["Informal run-time analysis compares how work grows as the input size grows.",["Count repeated operations approximately.","Distinguish one loop from nested loops.","Compare approaches without overformalizing notation."],""],
 "3.1":["Abstraction hides unnecessary detail so we can design around meaningful responsibilities.",["Identify what a class should know.","Identify what a class should do.","Separate public behavior from implementation details."],""],
 "3.2":["Program design choices affect readability, reuse, testing, and maintainability.",["Prefer cohesive responsibilities.","Reduce duplicated logic.","Choose interfaces that make correct use easier."],""],
 "3.3":["A class groups state, constructors, and methods into one type.",["Instance variables store object state.","Constructors establish initial state.","Methods expose behavior."],"public class Athlete {\n    private String name;\n    private int minutes;\n\n    public Athlete(String n) {\n        name = n;\n        minutes = 0;\n    }\n}"],
 "3.4":["A constructor runs when an object is created and establishes a valid initial state.",["Constructor name matches class name.","Constructors have no return type.","Parameters provide initial values."],"public Athlete(String n, int m) {\n    name = n;\n    minutes = m;\n}"],
 "3.5":["A method has a contract: inputs through parameters, behavior in its body, and possibly a returned result.",["Match return statements to return type.","Use parameters instead of hidden assumptions.","Keep one method focused on one job."],"public int totalMinutes(int extra) {\n    return minutes + extra;\n}"],
 "3.6":["Passing an object reference lets a method access the same object; returning a reference can expose an object to the caller.",["Distinguish primitive values from object references.","Draw alias arrows when needed.","Reason about mutation through shared references."],""],
 "3.7":["static members belong to the class; instance members belong to each object.",["Use static for class-wide data/behavior.","Use instance fields for per-object state.","Know which context can access which members."],"private static int athleteCount = 0;"],
 "3.8":["Scope determines where a name is visible; access modifiers determine which code may use a member.",["Local variables live inside their block/method.","private protects implementation state.","Parameter and local names can shadow fields."],""],
 "3.9":["this refers to the current object and is useful when parameter names match instance-variable names.",["Use this.field to name the current object's field.","Recognize this in constructor assignments.","Avoid using it as decoration when unnecessary."],"public Athlete(String name) {\n    this.name = name;\n}"],
 "4.1":["Data collection choices have ethical and social consequences, including privacy, bias, consent, and representation.",["Ask who supplied the data and why.","Look for missing or overrepresented groups.","Separate technical possibility from responsible use."],""],
 "4.2":["A data set becomes useful when its structure, meaning, and limitations are understood before analysis.",["Identify observations and attributes.","Check representation and missing data.","Choose a collection structure that matches the task."],""],
 "4.3":["An array stores a fixed-size indexed sequence of values of one element type.",["Create arrays with a length.","Use indexes from 0 through length-1.","Distinguish array length from last valid index."],"int[] times = new int[4];\ntimes[0] = 12;"],
 "4.4":["Traversing an array means visiting elements systematically without stepping outside valid indexes.",["Use index-based loops when position matters.","Use enhanced for loops when only values matter.","Trace index and element separately."],"for (int i = 0; i < times.length; i++) {\n    System.out.println(times[i]);\n}"],
 "4.5":["Array algorithms use traversal patterns to count, sum, search, compare, and transform elements.",["Initialize accumulators correctly.","Update exactly when the condition is satisfied.","Test empty-like and boundary patterns allowed by the specification."],""],
 "4.6":["Programs can read structured data from text files and then process it with familiar algorithms.",["Separate input/parsing from analysis.","Know what each line/token represents.","Handle the course-prescribed file pattern rather than memorizing unrelated APIs."],""],
 "4.7":["Wrapper classes let primitive-like values participate in object-based APIs such as ArrayList.",["Connect Integer with int and Double with double.","Recognize autoboxing and unboxing.","Know when an object wrapper is required."],"Integer score = 95;\nint x = score;"],
 "4.8":["ArrayList stores a resizable indexed sequence and provides methods to add, get, set, remove, and measure size.",["Indexes shift after removal.","size() is a method.","Choose ArrayList when resizing is useful."],"ArrayList<String> names = new ArrayList<String>();\nnames.add(\"{{student}}\");\nnames.add(\"Alex\");"],
 "4.9":["ArrayList traversal is similar to array traversal but must respect size changes during mutation.",["Use get(i) for indexed access.","Be careful when removing while moving forward.","Use enhanced for only when structural mutation is not needed."],""],
 "4.10":["ArrayList algorithms combine traversal with method calls such as add, set, and remove.",["Track both index and list size.","Use backward traversal or controlled index updates for removal patterns.","Verify postconditions with small examples."],""],
 "4.11":["A 2D array is an array of arrays, commonly modeled as rows and columns.",["Access with row and column indexes.","Know rows.length and rows[r].length.","Draw a grid before tracing."],"int[][] grid = new int[3][4];\ngrid[1][2] = 7;"],
 "4.12":["2D array traversal usually uses nested loops to visit rows and their elements.",["Outer loop often selects a row.","Inner loop visits columns/elements.","Trace row/column pairs."],""],
 "4.13":["2D array algorithms apply familiar count, sum, search, and transform patterns across a grid.",["Define whether the result is per-row, per-column, or whole-grid.","Choose traversal order intentionally.","Test corners and boundaries."],""],
 "4.14":["Searching algorithms inspect data to determine whether or where a target occurs.",["Linear search works by checking candidates systematically.","Binary-search reasoning requires ordered data.","State the search invariant and termination condition."],""],
 "4.15":["Sorting algorithms repeatedly move values toward an ordered arrangement; AP questions emphasize tracing and reasoning about the prescribed algorithms.",["Trace swaps/shifts carefully.","Separate one pass from the whole algorithm.","Use the current CED's named sorting expectations."],""],
 "4.16":["Recursion solves a problem by reducing it to a smaller version of the same problem plus a base case.",["Identify the base case first.","Track the smaller recursive call.","Trace returns as the call stack unwinds."],"public static int sumTo(int n) {\n    if (n <= 1) return n;\n    return n + sumTo(n - 1);\n}"],
 "4.17":["Recursive searching and sorting apply divide/reduce-and-solve reasoning to data collections.",["Identify what gets smaller each call.","Verify the base/stop condition.","Trace both calls and returned results."],""],
 "Unit 4 Synthesis":["Data-collection problems are solved by choosing the right representation and combining traversal, algorithms, and careful testing.",["Choose array, ArrayList, or 2D array based on the specification.","Reuse known algorithm patterns.","Explain correctness with representative cases."],""]
 };
 return special[t]||[`${title} should be understood through program state, specification, and test cases.`,[`Explain the core rule for ${title}.`,`Trace a small example before running it.`,`Test a boundary or common mistake.`],""];
}
function lesson(unit,apTopic,title,phase){
 const [model,points,code]=details(apTopic,title);
 return {id:`u${unit}-${String(apTopic).replace(unit+'.','').replace(/[^a-z0-9]+/gi,'-').toLowerCase()}`,kind:"lesson",phase,unit,apTopic,title,subtitle:`AP Topic ${apTopic} • ${D.units[unit]?.title||phase}`,model,points,code,
 think:`How would you prove your understanding of ${title} using a tiny concrete example rather than a definition?`,
 activity:`Work through one AP-style example focused on ${title}. Predict first, trace or run second, explain the result, then modify one input or condition and repeat.`,
 homework:`Complete three short problems on ${title}; add one mistake or uncertainty to the Error Log.`,
 resources:R[unit],apConnection:`Required AP CSA Topic ${apTopic}. Unit ${unit} carries about ${weight[unit]} of the multiple-choice section.`,sequence:seq++,week,sessionInWeek:""};
}
function addWeek(unit,phase,topics){
 const labels=["Lesson A","Lesson B","Lesson C"]; const made=[];
 topics.forEach((x,i)=>{const l=lesson(unit,x[0],x[1],phase);l.sessionInWeek=labels[i];D.lessons.push(l);made.push(l);});
 D.lessons.push({id:`p-${week}`,kind:"practice",phase,unit,apTopic:"Practice",title:`Practice — ${topics[0][0]}–${topics[2][0]}`,subtitle:`${phase} Retrieval + AP-Style Practice`,covers:made.map(x=>x.title),resources:R[unit].slice(0,2),sequence:seq++,week,sessionInWeek:"Practice"});
 week++;
}
addWeek(2,"Unit 2",[["2.7","while Loops"],["2.8","for Loops"],["2.9","Implementing Selection and Iteration Algorithms"]]);
addWeek(2,"Unit 2",[["2.10","Implementing String Algorithms"],["2.11","Nested Iteration"],["2.12","Informal Run-Time Analysis"]]);
addWeek(3,"Unit 3",[["3.1","Abstraction and Program Design"],["3.2","Impact of Program Design"],["3.3","Anatomy of a Class"]]);
addWeek(3,"Unit 3",[["3.4","Constructors"],["3.5","Methods: How to Write Them"],["3.6","Methods: Passing and Returning References of an Object"]]);
addWeek(3,"Unit 3",[["3.7","Class Variables and Methods"],["3.8","Scope and Access"],["3.9","this Keyword"]]);
addWeek(4,"Unit 4",[["4.1","Ethical and Social Issues Around Data Collection"],["4.2","Introduction to Using Data Sets"],["4.3","Array Creation and Access"]]);
addWeek(4,"Unit 4",[["4.4","Array Traversals"],["4.5","Implementing Array Algorithms"],["4.6","Using Text Files"]]);
addWeek(4,"Unit 4",[["4.7","Wrapper Classes"],["4.8","ArrayList Methods"],["4.9","ArrayList Traversals"]]);
addWeek(4,"Unit 4",[["4.10","Implementing ArrayList Algorithms"],["4.11","2D Array Creation and Access"],["4.12","2D Array Traversals"]]);
addWeek(4,"Unit 4",[["4.13","Implementing 2D Array Algorithms"],["4.14","Searching Algorithms"],["4.15","Sorting Algorithms"]]);
addWeek(4,"Unit 4",[["4.16","Recursion"],["4.17","Recursive Searching and Sorting"],["Unit 4 Synthesis","Data Collections Synthesis"]]);
const examWeeks=[
 ["Code Tracing Bootcamp","Error Analysis Bootcamp","Equivalent Code & Conditions"],
 ["MCQ Patterns — Objects, Methods & Strings","MCQ Patterns — Selection & Iteration","MCQ Patterns — Data Collections"],
 ["FRQ 1 — Methods & Control Structures","FRQ 1 — String Methods","FRQ 1 — Timed Practice"],
 ["FRQ 2 — Class Design: State","FRQ 2 — Class Design: Behavior","FRQ 2 — Timed Practice"],
 ["FRQ 3 — ArrayList Data Analysis","FRQ 3 — Mutation & Removal","FRQ 3 — Timed Practice"],
 ["FRQ 4 — 2D Array Traversal","FRQ 4 — 2D Array Algorithms","FRQ 4 — Timed Practice"],
 ["Full Timed MCQ — 42 Questions","Full Timed FRQ — 4 Questions","Error Repair Workshop"],
 ["Digital Exam & Bluebook Rehearsal","Java Quick Reference & Pacing","Final Weak-Area Repair"]
];
function examLesson(title,label){
 const timed=/Timed|Full/.test(title), blue=/Bluebook/.test(title), error=/Error/.test(title);
 const model=blue?"Exam familiarity reduces avoidable cognitive load: know the interface before exam day.":error?"Every missed question is evidence about a failure mode that can be repaired.":timed?"Timed practice is useful only when followed by careful analysis of errors and pacing.":"AP success combines accurate tracing, specification reading, Java fluency, and deliberate checking.";
 return {id:`r-${seq}`,kind:"lesson",phase:"Exam Mode",unit:5,apTopic:"Exam Prep",title,subtitle:"AP CSA Exam Preparation",model,
 points:["Attempt before reviewing.","Explain every miss in the Error Log.","Separate concept errors, reading errors, Java errors, algorithm errors, and time-pressure errors."],code:"",
 think:`What is the most likely way a careful student could still lose points on “${title}”?`,
 activity:timed?`Complete a timed set focused on ${title}, then spend at least as long reviewing every miss and slow item.`:`Complete a focused drill on ${title}; verbalize reasoning before checking the answer.`,
 homework:"Repair one recurring weakness from today's Error Log with two fresh examples.",resources:R.exam,
 apConnection:"Direct preparation for the current fully digital AP CSA exam: 42 MCQ in 90 minutes and 4 FRQs in 90 minutes.",sequence:seq++,week,sessionInWeek:label};
}
examWeeks.forEach((titles,idx)=>{
 const labels=["Lesson A","Lesson B","Lesson C"],made=[];
 titles.forEach((t,i)=>{const l=examLesson(t,labels[i]);D.lessons.push(l);made.push(l);});
 D.lessons.push({id:`p-exam-${idx+1}`,kind:"practice",phase:"Exam Mode",unit:5,apTopic:"Practice",title:`Exam Practice ${idx+1}`,subtitle:"Mixed timed practice + Error Log",covers:made.map(x=>x.title),resources:R.exam,sequence:seq++,week,sessionInWeek:"Practice"});
 week++;
});
})();