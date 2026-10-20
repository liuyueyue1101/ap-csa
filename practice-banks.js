window.REVIEW_PRACTICE_BANKS = {
  "p-foundation-1": {
    "scope": "Foundation Week 1 · computer model, files, terminal, Java compile/run",
    "official": false,
    "sources": [
      [
        "AP CSA CED — official framework (context only)",
        "https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",
        "Official syllabus; Foundation setup questions are not released AP exam items"
      ],
      [
        "CSAwesome2 Topic 1.1 — Java tools and first program",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-1-intro-algorithms.html",
        "Open reference practice; some questions overlap Week 3"
      ]
    ],
    "questions": [
      [
        "Input",
        "You type a URL and press Enter. What is the immediate input to the computer?",
        "",
        [
          "The displayed web page",
          "The typed address and Enter key",
          "The CPU temperature",
          "The browser icon"
        ],
        1,
        "Keyboard actions are input; the loaded page is output."
      ],
      [
        "Processing",
        "A calculator adds 7 and 8. Which action is processing?",
        "",
        [
          "Typing 7",
          "Seeing 15",
          "Computing 7 + 8",
          "Closing the application"
        ],
        2,
        "Computing the sum is processing; display is output."
      ],
      [
        "Output",
        "A weather app displays 16°C after looking up data. What is output?",
        "",
        [
          "The displayed temperature",
          "Tapping the search field",
          "Stored weather records",
          "The processor"
        ],
        0,
        "The displayed result is the program's output."
      ],
      [
        "Data",
        "Which is data rather than a program instruction?",
        "",
        [
          "Add two numbers",
          "Show the result",
          "Temperature reading 16",
          "Repeat for each user"
        ],
        2,
        "The temperature is information used or produced by instructions."
      ],
      [
        "Program",
        "What is a program?",
        "",
        [
          "Only a laptop",
          "A sequence of instructions that a computer can execute",
          "A physical file cabinet",
          "Every image on a screen"
        ],
        1,
        "A program is a set of instructions for a task."
      ],
      [
        "Application",
        "Which example is software?",
        "",
        [
          "Keyboard",
          "Screen",
          "Web browser",
          "CPU fan"
        ],
        2,
        "A web browser is an application/program."
      ],
      [
        "File",
        "Which filename normally indicates a Java source file?",
        "",
        [
          "Hello.java",
          "Hello.class",
          "Hello.png",
          "Hello.mp3"
        ],
        0,
        "Java source files have the .java extension."
      ],
      [
        "Bytecode",
        "Which filename normally stores compiled Java bytecode?",
        "",
        [
          "Hello.java",
          "Hello.class",
          "Hello.txt",
          "Hello.pdf"
        ],
        1,
        "javac produces a .class file containing bytecode."
      ],
      [
        "Folder",
        "Which statement best describes a folder?",
        "",
        [
          "It always stores running processes",
          "It organizes files and subfolders",
          "It compiles Java automatically",
          "It is the same as a CPU"
        ],
        1,
        "A folder/directory groups files and other directories."
      ],
      [
        "Editor",
        "Which tool is mainly used to change Java source text?",
        "",
        [
          "Text/code editor",
          "Java virtual machine",
          "Monitor",
          "Speaker"
        ],
        0,
        "Source is written and edited in a text editor or IDE."
      ],
      [
        "Finder and Terminal",
        "Finder and Terminal show the same directory. What is correct?",
        "",
        [
          "Each stores a separate copy",
          "They are two interfaces to the same file system",
          "Terminal creates a different disk",
          "Finder cannot show source files"
        ],
        1,
        "Two views can access the same underlying files."
      ],
      [
        "pwd",
        "Which command displays the current working directory in a Unix-like terminal?",
        "",
        [
          "ls",
          "cd",
          "pwd",
          "javac"
        ],
        2,
        "pwd shows the present working directory."
      ],
      [
        "ls",
        "Which command lists entries in the current directory?",
        "",
        [
          "ls",
          "pwd",
          "java",
          "mkdir"
        ],
        0,
        "ls lists files and folders."
      ],
      [
        "cd",
        "What is the usual purpose of the command below?",
        "cd CS-Learning",
        [
          "Compile a program",
          "Change current directory to CS-Learning",
          "Delete the directory",
          "Print the current filename"
        ],
        1,
        "cd changes the working directory."
      ],
      [
        "Relative path",
        "You are inside Projects. What does cd Java mean?",
        "",
        [
          "Open a Java application",
          "Move into child folder Java",
          "Copy a Java file",
          "Run the JVM"
        ],
        1,
        "It navigates to a directory relative to the current one."
      ],
      [
        "Compiling",
        "Which command compiles the file Hello.java?",
        "",
        [
          "java Hello",
          "javac Hello.java",
          "pwd Hello.java",
          "ls Hello"
        ],
        1,
        "javac is the Java compiler."
      ],
      [
        "Running",
        "After a successful compilation, which command normally executes class Hello?",
        "",
        [
          "javac Hello",
          "java Hello",
          "java Hello.java.class",
          "ls Hello"
        ],
        1,
        "The java launcher runs the compiled class."
      ],
      [
        "JDK",
        "Which item provides the Java compiler and development tools?",
        "",
        [
          "JDK",
          "Web browser",
          "Image editor",
          "Only the text file"
        ],
        0,
        "The JDK includes tools such as javac."
      ],
      [
        "JVM",
        "What is the JVM's role when running a compiled Java program?",
        "",
        [
          "Edit .java source",
          "Execute Java bytecode",
          "Rename the source file",
          "Create a folder"
        ],
        1,
        "The Java Virtual Machine executes bytecode."
      ],
      [
        "Syntax error",
        "A missing semicolon stops Java compilation. Which error category fits?",
        "",
        [
          "Logic error",
          "Syntax/compile-time error",
          "Hardware failure",
          "Successful execution"
        ],
        1,
        "Invalid Java syntax is rejected during compilation."
      ],
      [
        "Logic error",
        "A program compiles but calculates minutes using + instead of *. Which problem is most likely?",
        "",
        [
          "Syntax error",
          "Logic error",
          "Missing JDK",
          "File system error"
        ],
        1,
        "The program runs but implements the wrong calculation."
      ],
      [
        "Run-time error",
        "An int expression tries to divide by zero during execution. What kind of failure is this?",
        "",
        [
          "Compile-time syntax only",
          "Run-time exception",
          "Correct output",
          "A missing editor"
        ],
        1,
        "Integer division by zero triggers ArithmeticException at run time."
      ],
      [
        "Sequence",
        "Which order best represents a basic Java command-line workflow?",
        "",
        [
          "Run → edit → compile",
          "Edit → compile → run",
          "Compile → delete → run",
          "Run → compile → edit"
        ],
        1,
        "Write source first, compile, then run."
      ],
      [
        "Reading an error",
        "A compiler reports Hello.java:9. What is the first useful action?",
        "",
        [
          "Delete all files",
          "Inspect the reported source line and nearby syntax",
          "Restart the computer immediately",
          "Ignore the message"
        ],
        1,
        "Read the message and line context before changing code."
      ]
    ]
  },
  "p-foundation-2": {
    "scope": "Foundation Week 2 · Python output, input, variables, tracing and debugging",
    "official": false,
    "sources": [
      [
        "AP CSA CED — Java course scope (Python excluded)",
        "https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",
        "Official context only: Python syntax is not AP CSA Java exam content"
      ],
      [
        "CSAwesome2 Topic 1.1 — transition to Java",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-1-intro-algorithms.html",
        "Bridge resource, not an official Python question bank"
      ]
    ],
    "questions": [
      [
        "Arithmetic",
        "What does this Python program print?",
        "print(7 + 8)",
        [
          "7 + 8",
          "15",
          "78",
          "Error"
        ],
        1,
        "Without quotes, + adds two integers."
      ],
      [
        "String literal",
        "What does this Python program print?",
        "print('7 + 8')",
        [
          "15",
          "78",
          "7 + 8",
          "Error"
        ],
        2,
        "Quoted text is printed literally."
      ],
      [
        "Variable",
        "What is printed after the reassignment?",
        "score = 5\nscore = 9\nprint(score)",
        [
          "5",
          "9",
          "14",
          "score"
        ],
        1,
        "The second assignment replaces the stored value."
      ],
      [
        "Trace",
        "What does this print?",
        "x = 4\nx = x + 3\nprint(x)",
        [
          "4",
          "3",
          "7",
          "43"
        ],
        2,
        "Use old x=4, compute 7, then store it."
      ],
      [
        "Trace chain",
        "What does this print?",
        "x = 2\nx = x * 5\nx = x - 3\nprint(x)",
        [
          "7",
          "10",
          "13",
          "17"
        ],
        0,
        "2 * 5 - 3 = 7."
      ],
      [
        "Multiple values",
        "What is the final value of b?",
        "a = 3\nb = a\na = 10\nprint(b)",
        [
          "3",
          "10",
          "13",
          "Error"
        ],
        0,
        "b copied the integer value 3 before a changed."
      ],
      [
        "print spacing",
        "What does this Python statement normally display?",
        "print('Hi', 'Sam')",
        [
          "HiSam",
          "Hi Sam",
          "Hi,Sam",
          "Hi\\nSam"
        ],
        1,
        "print separates comma-separated arguments with a space by default."
      ],
      [
        "Input type",
        "What type does input() return by default?",
        "minutes = input('Minutes: ')",
        [
          "int",
          "float",
          "str",
          "bool"
        ],
        2,
        "Python input reads text as a string."
      ],
      [
        "Convert input",
        "Which code turns typed digits into an integer?",
        "",
        [
          "int(input('Minutes: '))",
          "input(int('Minutes: '))",
          "str(5)",
          "print('Minutes: ')"
        ],
        0,
        "int(input(...)) converts the returned text to int."
      ],
      [
        "String repetition",
        "What does this print?",
        "x = input('Number: ')\n# user types 3\nprint(x * 2)",
        [
          "6",
          "33",
          "5",
          "Error"
        ],
        1,
        "The typed value is string '3'; multiplied by 2 it repeats."
      ],
      [
        "Numeric multiplication",
        "What is printed if the user types 3?",
        "n = int(input('Number: '))\nprint(n * 2)",
        [
          "33",
          "6",
          "32",
          "Error"
        ],
        1,
        "int conversion changes the text to a number."
      ],
      [
        "Arithmetic precedence",
        "What does this print?",
        "print(2 + 3 * 4)",
        [
          "20",
          "14",
          "24",
          "9"
        ],
        1,
        "Multiplication occurs before addition."
      ],
      [
        "Parentheses",
        "What does this print?",
        "print((2 + 3) * 4)",
        [
          "14",
          "18",
          "20",
          "24"
        ],
        2,
        "Parentheses force the sum first."
      ],
      [
        "If condition",
        "What prints?",
        "score = 92\nif score >= 90:\n    print('A')",
        [
          "A",
          "B",
          "92",
          "Nothing"
        ],
        0,
        "92 is at least 90, so the body executes."
      ],
      [
        "If condition false",
        "What prints?",
        "score = 80\nif score >= 90:\n    print('A')\nprint('Done')",
        [
          "A",
          "Done",
          "A then Done",
          "Nothing"
        ],
        1,
        "The condition is false, but the unindented Done still runs."
      ],
      [
        "Indentation",
        "Which bug is most likely in Python when a line under if is not indented?",
        "",
        [
          "Run-time divide by zero",
          "IndentationError",
          "Integer overflow",
          "Missing javac"
        ],
        1,
        "Python uses indentation to delimit statement blocks."
      ],
      [
        "Missing quote",
        "Which error is most likely?",
        "print('Hello)",
        [
          "Valid output",
          "SyntaxError",
          "Arithmetic overflow",
          "NameError only"
        ],
        1,
        "The string literal is not closed."
      ],
      [
        "Wrong name",
        "What happens?",
        "total = 12\nprint(totals)",
        [
          "Prints 12",
          "Prints 0",
          "NameError",
          "Prints totals"
        ],
        2,
        "totals was not defined; total and totals differ."
      ],
      [
        "Comments",
        "What prints?",
        "# print('A')\nprint('B')",
        [
          "A",
          "B",
          "AB",
          "Nothing"
        ],
        1,
        "# begins a Python comment."
      ],
      [
        "Debug method",
        "After a failure, what should you do FIRST?",
        "",
        [
          "Randomly rewrite many lines",
          "Read the error type, line and message",
          "Delete the program",
          "Ignore the output"
        ],
        1,
        "Evidence from the error guides the smallest fix."
      ],
      [
        "Logic mistake",
        "A program for total minutes uses sessions + minutes instead of sessions * minutes. What category fits?",
        "",
        [
          "Syntax failure",
          "Logic error",
          "Indentation error",
          "JVM failure"
        ],
        1,
        "A legal expression computes the wrong specification."
      ],
      [
        "Function goal",
        "In a training-minutes program, which is the processing step?",
        "",
        [
          "Typing sessions and minutes",
          "Multiplying sessions * minutes",
          "Reading the result on screen",
          "Opening the editor"
        ],
        1,
        "Processing transforms numeric input into the total."
      ],
      [
        "Training challenge",
        "If sessions=4 and minutes=35, what should the calculator print?",
        "",
        [
          "39",
          "140",
          "31",
          "435"
        ],
        1,
        "4 sessions * 35 minutes = 140."
      ],
      [
        "Test case",
        "Which test best checks the multiplication behavior?",
        "",
        [
          "Always enter the same numbers",
          "Enter 0 sessions and then 4 sessions to compare outputs",
          "Only check the file name",
          "Never run the program"
        ],
        1,
        "Varied inputs including an edge case help verify behavior."
      ],
      [
        "Fix input",
        "Which replacement correctly computes a numeric training total?",
        "minutes = input('Minutes: ')\nsessions = input('Sessions: ')",
        [
          "total = minutes + sessions",
          "total = int(minutes) * int(sessions)",
          "total = minutes * sessions",
          "total = print(minutes, sessions)"
        ],
        1,
        "Convert both text inputs before arithmetic."
      ]
    ]
  },
  "p-1-1-1-3": {
    "scope": "AP CSA Week 3 · Topics 1.1–1.3 · algorithms, variables, types, expressions and output",
    "official": true,
    "sources": [
      [
        "Official AP Classroom — Unit 1 Part A Progress Check",
        "https://apclassroom.collegeboard.org/",
        "Official secure MCQs; use teacher/student access; choose Topics 1.1–1.3"
      ],
      [
        "Official 2025 AP CSA CED — Sample Exam Questions",
        "https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",
        "Published official sample MCQs with answer mappings; select only early-topic items"
      ],
      [
        "CSAwesome2 Topic 1.1 — AP Practice",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-1-intro-algorithms.html",
        "Public textbook questions, not official released exam items"
      ],
      [
        "CSAwesome2 Topic 1.2 — AP Practice",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-2-variables.html",
        "Public textbook questions, not official released exam items"
      ],
      [
        "CSAwesome2 Topic 1.3 — AP Practice",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-3-expressions.html",
        "Public textbook questions, not official released exam items"
      ],
      [
        "CSAwesome2 Unit 1A Multiple-Choice Bank",
        "https://runestone.academy/ns/books/published/csawesome2/Exercises-basics.html",
        "Filter to 1.1–1.3; the bank as a whole covers 1.1–1.6"
      ]
    ],
    "questions": [
      [
        "1.1 Algorithm",
        "Which is the most accurate description of an algorithm?",
        "",
        [
          "A sequence of steps for solving a problem",
          "Only Java code",
          "An installed compiler",
          "The data in memory"
        ],
        0,
        "An algorithm can be expressed in natural language or a diagram; it gives a sequence of steps."
      ],
      [
        "1.1 Order",
        "A plan says warm up, run, then stretch. Which sequence follows the specification?",
        "",
        [
          "Stretch → run → warm up",
          "Warm up → run → stretch",
          "Run → stretch → warm up",
          "Any order is equivalent"
        ],
        1,
        "Sequence matters when a plan specifies ordered actions."
      ],
      [
        "1.1 Branch trace",
        "A plan says if raining choose indoor gear, otherwise track gear. It is dry. What choice is taken?",
        "",
        [
          "Both gear sets",
          "Indoor gear",
          "Track gear",
          "No branch"
        ],
        2,
        "The false condition chooses the alternative branch, then execution continues."
      ],
      [
        "1.1 Program",
        "Which statement correctly distinguishes an algorithm from a program?",
        "",
        [
          "An algorithm is a plan; a program expresses executable instructions",
          "Algorithms always use braces",
          "Programs cannot implement algorithms",
          "Only programs have steps"
        ],
        0,
        "Programs can implement algorithms using a programming language."
      ],
      [
        "1.1 Syntax",
        "What kind of problem is a missing semicolon in an otherwise valid Java statement?",
        "",
        [
          "Run-time failure",
          "Syntax/compile-time error",
          "Logic flaw only",
          "Variable overflow"
        ],
        1,
        "The Java parser expects a semicolon at the end of statements."
      ],
      [
        "1.1 Runtime",
        "What happens when Java executes an int expression 10 / 0?",
        "",
        [
          "It prints 0",
          "It prints Infinity",
          "It throws a run-time ArithmeticException",
          "It silently returns 10"
        ],
        2,
        "Integer division by zero fails during execution."
      ],
      [
        "1.1 Logic",
        "A program compiles but prints steps in the wrong order. What kind of error is it?",
        "",
        [
          "Logic error",
          "Syntax error",
          "Missing compiler",
          "Invalid filename"
        ],
        0,
        "Legal Java can still fail to satisfy the specification."
      ],
      [
        "1.1 Java source",
        "Which file normally contains Java source code?",
        "",
        [
          "Main.class",
          "Main.java",
          "Main.exe",
          "Main.pptx"
        ],
        1,
        ".java holds the source that is compiled."
      ],
      [
        "1.1 Compiler",
        "What does javac Main.java normally produce after successful compilation?",
        "",
        [
          "Main.class",
          "Main.txt",
          "Main.py",
          "Main.pdf"
        ],
        0,
        "The compiler generates JVM bytecode in a .class file."
      ],
      [
        "1.1 Output call",
        "Which Java statement prints Hello and then moves to a new line?",
        "",
        [
          "print(Hello);",
          "System.out.print(\"Hello\");",
          "System.out.println(\"Hello\");",
          "println Hello;"
        ],
        2,
        "println prints the supplied value followed by a newline."
      ],
      [
        "1.2 Variable",
        "Which ideas are associated with a Java variable?",
        "",
        [
          "Only a name",
          "Storage with an associated name and type",
          "Only a screen label",
          "A Java compiler"
        ],
        1,
        "A variable is named storage with a defined type and a stored value when assigned."
      ],
      [
        "1.2 int",
        "Which data type best fits the number of students in a class?",
        "",
        [
          "boolean",
          "double",
          "int",
          "String method"
        ],
        2,
        "A count is a whole-number quantity."
      ],
      [
        "1.2 double",
        "Which data type best fits a measured race time of 12.75 seconds?",
        "",
        [
          "double",
          "boolean",
          "int",
          "class"
        ],
        0,
        "A double can represent fractional values."
      ],
      [
        "1.2 boolean",
        "Which primitive type holds true or false values?",
        "",
        [
          "String",
          "int",
          "double",
          "boolean"
        ],
        3,
        "Java Boolean literals are true and false."
      ],
      [
        "1.2 categories",
        "Which of the following is a reference type?",
        "",
        [
          "int",
          "boolean",
          "double",
          "String"
        ],
        3,
        "String is a class/reference type, unlike the three AP primitive types."
      ],
      [
        "1.2 declaration",
        "Which is a valid variable declaration without assignment?",
        "",
        [
          "score int;",
          "int score;",
          "int = score;",
          "score; int"
        ],
        1,
        "A Java declaration has type, identifier and a semicolon."
      ],
      [
        "1.2 naming",
        "Which variable name is invalid because it contains a space?",
        "",
        [
          "raceTime",
          "racetime",
          "race time",
          "_raceTime"
        ],
        2,
        "Java identifiers cannot include spaces."
      ],
      [
        "1.2 keyword",
        "Which cannot be a Java variable identifier?",
        "",
        [
          "total",
          "averageScore",
          "class",
          "player2"
        ],
        2,
        "class is a reserved keyword."
      ],
      [
        "1.2 case",
        "Which statement about score and Score in Java is true?",
        "",
        [
          "They are identical identifiers",
          "They are different identifiers",
          "Both are invalid",
          "Java ignores capitalization"
        ],
        1,
        "Java is case-sensitive."
      ],
      [
        "1.2 identifier",
        "A ZIP/postal code includes leading zeros and letters. Which model is most appropriate?",
        "",
        [
          "int because it looks numeric",
          "double because it might have a dot",
          "String because it is an identifier",
          "boolean because it has two states"
        ],
        2,
        "Identifiers should not be treated as arithmetic quantities."
      ],
      [
        "1.3 print",
        "What is the exact output?",
        "System.out.print(\"A\");\nSystem.out.print(\"B\");",
        [
          "A then B on different lines",
          "AB on one line",
          "A B on one line",
          "Compile-time error"
        ],
        1,
        "print does not add a line break."
      ],
      [
        "1.3 println",
        "Which output is correct?",
        "System.out.println(\"A\");\nSystem.out.print(\"B\");",
        [
          "AB on one line",
          "A and B on separate lines",
          "Only A",
          "Only B"
        ],
        1,
        "println starts a new line before the later print call."
      ],
      [
        "1.3 literal",
        "What does this display?",
        "System.out.println(\"4 + 6\");",
        [
          "10",
          "46",
          "4 + 6",
          "Compile-time error"
        ],
        2,
        "Quoted characters are text, not an arithmetic expression."
      ],
      [
        "1.3 arithmetic",
        "What does this display?",
        "System.out.println(4 + 6);",
        [
          "4 + 6",
          "46",
          "10",
          "false"
        ],
        2,
        "Without quotes, Java evaluates addition."
      ],
      [
        "1.3 escape newline",
        "Which escape sequence creates a line break INSIDE a Java string literal?",
        "",
        [
          "\\t",
          "\\n",
          "\\\\",
          "\\\""
        ],
        1,
        "\\n represents a newline."
      ],
      [
        "1.3 escaped quote",
        "Which source string contains an escaped quote so the code compiles?",
        "",
        [
          "\"Go \"now\"\"",
          "\"Go \\\"now\\\"\"",
          "'Go \"now\"'",
          "\"Go \\now\""
        ],
        1,
        "Use backslash before a quotation mark inside a string literal."
      ],
      [
        "1.3 escaped slash",
        "What does Java print here?",
        "System.out.println(\"C:\\\\games\");",
        [
          "C:\\\\games with two backslashes",
          "C:\\games with one backslash",
          "C:games",
          "Compiler error"
        ],
        1,
        "In a Java literal, \\\\ represents one displayed backslash."
      ],
      [
        "1.3 operators",
        "What is the output?",
        "System.out.println(2 + 3 * 4);",
        [
          "20",
          "14",
          "24",
          "9"
        ],
        1,
        "Multiplication has higher precedence."
      ],
      [
        "1.3 parentheses",
        "What is the output?",
        "System.out.println((2 + 3) * 4);",
        [
          "14",
          "20",
          "9",
          "24"
        ],
        1,
        "Parentheses are evaluated before multiplication."
      ],
      [
        "1.3 int division",
        "What is the output?",
        "System.out.println(11 / 4);",
        [
          "2.75",
          "2",
          "3",
          "2.0"
        ],
        1,
        "int / int discards the fractional part."
      ],
      [
        "1.3 double division",
        "What is the output?",
        "System.out.println(11.0 / 4);",
        [
          "2",
          "2.0",
          "2.75",
          "3"
        ],
        2,
        "One double operand makes this a double division."
      ],
      [
        "1.3 remainder",
        "What is the output?",
        "System.out.println(17 % 5);",
        [
          "2",
          "3",
          "5",
          "12"
        ],
        0,
        "17 = 3*5 + 2 so the remainder is 2."
      ],
      [
        "1.3 small remainder",
        "What is the output?",
        "System.out.println(3 % 8);",
        [
          "0",
          "5",
          "8",
          "3"
        ],
        3,
        "No full group of 8 fits in 3, so all 3 remain."
      ],
      [
        "1.3 left-to-right",
        "What is the result?",
        "System.out.println(18 / 3 * 2);",
        [
          "3",
          "6",
          "12",
          "18"
        ],
        2,
        "Equal-precedence / and * are evaluated left to right: 6*2=12."
      ],
      [
        "1.3 mixed",
        "What gets printed?",
        "System.out.println(5 + 18 / 4 * 2);",
        [
          "13",
          "14",
          "9",
          "16"
        ],
        0,
        "18/4=4; 4*2=8; 5+8=13."
      ],
      [
        "1.3 div zero",
        "Which statement triggers a run-time error rather than displaying a number?",
        "",
        [
          "System.out.println(10 % 3);",
          "System.out.println(10 / 2);",
          "System.out.println(10 / 0);",
          "System.out.println(10.0 / 2);"
        ],
        2,
        "Integer divide-by-zero is a run-time ArithmeticException."
      ],
      [
        "1.3 logic debug",
        "A conversion requires inches = centimeters / 2.54. What fixes the incorrect statement?",
        "System.out.println(100 * 2.54);",
        [
          "Replace * with /",
          "Replace 100 with true",
          "Use a semicolon inside comments",
          "Replace println with print"
        ],
        0,
        "The formula must divide centimeters by centimeters per inch."
      ],
      [
        "1.3 AP trace",
        "What is the result?",
        "System.out.println(8 + 5 % 3 * 2);",
        [
          "10",
          "12",
          "16",
          "18"
        ],
        1,
        "5%3=2, then 2*2=4 and 8+4=12."
      ]
    ]
  },
  "p-1-4-1-6": {
    "scope": "AP CSA Week 4 · Topics 1.4–1.6 · assignment, casting, range and compound operators",
    "official": true,
    "sources": [
      [
        "Official 2025 AP CSA CED — Sample Exam MCQ 1",
        "https://apcentral.collegeboard.org/media/pdf/ap-computer-science-a-course-and-exam-description.pdf",
        "Official published sample Q1 on casting and numeric division (see sample MCQ section and answer map)"
      ],
      [
        "Official AP Classroom — Unit 1 Part A/B Progress Checks",
        "https://apclassroom.collegeboard.org/",
        "Secure official topic practice. Filter to 1.4–1.6"
      ],
      [
        "College Board — Released FRQs and Scoring",
        "https://apcentral.collegeboard.org/courses/ap-computer-science-a/exam/past-exam-questions",
        "Released official FRQs; older questions often require later topics, so do not treat whole FRQs as 1.4–1.6 only"
      ],
      [
        "CSAwesome2 Topic 1.4 — AP Practice",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-4-assignment.html",
        "Free reference AP-style practice"
      ],
      [
        "CSAwesome2 Topic 1.5 — AP Practice",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-5-casting.html",
        "Free reference AP-style practice"
      ],
      [
        "CSAwesome2 Topic 1.6 — AP Practice",
        "https://runestone.academy/ns/books/published/csawesome2/topic-1-6-compound-operators.html",
        "Free reference AP-style practice"
      ],
      [
        "CSAwesome2 Unit 1A Multiple-Choice Exercises",
        "https://runestone.academy/ns/books/published/csawesome2/Exercises-basics.html",
        "Public cumulative bank for 1.1–1.6; select problems matching 1.4–1.6"
      ]
    ],
    "questions": [
      [
        "1.4 initialization",
        "What is initialization?",
        "",
        [
          "Assigning a variable its first value",
          "Declaring a class",
          "Compiling a file",
          "Printing any literal"
        ],
        0,
        "Initialization is the first assignment to a variable."
      ],
      [
        "1.4 uninitialized",
        "Which error best describes the local variable in this code?",
        "int n;\nSystem.out.println(n);",
        [
          "Integer overflow",
          "Using n before definite assignment",
          "Division by zero",
          "Valid output 0"
        ],
        1,
        "A local variable must be initialized before use."
      ],
      [
        "1.4 direction",
        "What value is stored at the end?",
        "int n = 5;\nn = 9;",
        [
          "5",
          "9",
          "14",
          "Uninitialized"
        ],
        1,
        "Assignment overwrites the value of n with 9."
      ],
      [
        "1.4 old value",
        "What is the final value of n?",
        "int n = 5;\nn = n + 3;",
        [
          "3",
          "5",
          "8",
          "15"
        ],
        2,
        "Evaluate n+3 using old n=5, then write 8."
      ],
      [
        "1.4 chained state",
        "What value is printed?",
        "int x = 2;\nx = x * 4;\nx = x - 3;\nSystem.out.println(x);",
        [
          "5",
          "8",
          "11",
          "-1"
        ],
        0,
        "2*4=8 and 8-3=5."
      ],
      [
        "1.4 copy",
        "What is the final value of y?",
        "int x = 3;\nint y = x;\nx = 10;",
        [
          "10",
          "3",
          "13",
          "Undefined"
        ],
        1,
        "Primitive assignment copies the current value, not a lasting link."
      ],
      [
        "1.4 swap failure",
        "What is the final state?",
        "int a = 2;\nint b = 7;\na = b;\nb = a;",
        [
          "a=7, b=2",
          "a=2, b=7",
          "a=7, b=7",
          "a=2, b=2"
        ],
        2,
        "The old a is overwritten before b can receive it."
      ],
      [
        "1.4 safe swap",
        "Which first statement makes a later a=b; b=temp; exchange possible?",
        "int a = 2;\nint b = 7;",
        [
          "int temp = a;",
          "int temp = b;",
          "a = b;",
          "b = a;"
        ],
        0,
        "Save the old a before overwriting it."
      ],
      [
        "1.4 type mismatch",
        "Which assignment fails because a double result cannot be implicitly assigned to int?",
        "",
        [
          "double x = 2;",
          "int x = 2;",
          "int x = 2.5;",
          "double x = 2.5;"
        ],
        2,
        "A fractional double literal cannot be assigned directly to int."
      ],
      [
        "1.4 null",
        "For a reference variable, what does null mean?",
        "",
        [
          "It equals numeric zero",
          "It is not associated with an object",
          "It is always an empty String",
          "It is boolean false"
        ],
        1,
        "null is a special reference value, not a primitive number."
      ],
      [
        "1.4 input",
        "Which is a valid broad source of program input?",
        "",
        [
          "Only keyboard text",
          "Keyboard, touch, sound or camera",
          "Only Java source code",
          "Only the CPU clock"
        ],
        1,
        "Input can come through different interfaces and sensors."
      ],
      [
        "1.4 no keyboard syntax",
        "What does this Scanner method do in its usual interactive context?",
        "input.nextLine();",
        [
          "Returns keyboard text",
          "Allocates an int array",
          "Compiles Java bytecode",
          "Calculates a remainder"
        ],
        0,
        "Scanner's nextLine can read a line of text; its API syntax is not exam-tested."
      ],
      [
        "1.4 diagnose",
        "What kind of issue is present?",
        "int total;\ntotal = total + 1;",
        [
          "Valid total becomes 1",
          "Cannot read uninitialized local total",
          "Runtime infinite loop",
          "Division by zero"
        ],
        1,
        "The RHS reads total before its first assignment."
      ],
      [
        "1.4 evaluate",
        "What is printed?",
        "int x = 0;\nint y = 1;\nx = y;\ny = 4;\nSystem.out.println(x);",
        [
          "0",
          "1",
          "4",
          "5"
        ],
        1,
        "x receives 1; a later change to y doesn't change x."
      ],
      [
        "1.5 cast truncate",
        "What is printed?",
        "System.out.println((int) 6.9);",
        [
          "6",
          "7",
          "6.9",
          "Compiler error"
        ],
        0,
        "Casting double to int truncates toward zero."
      ],
      [
        "1.5 negative truncate",
        "What does the expression produce?",
        "(int) -6.9",
        [
          "-7",
          "-6",
          "6",
          "6.9"
        ],
        1,
        "Truncation moves toward zero, even for negative values."
      ],
      [
        "1.5 order A",
        "What is printed?",
        "System.out.println((double) 9 / 4);",
        [
          "2",
          "2.0",
          "2.25",
          "3.0"
        ],
        2,
        "The cast changes one operand before the division."
      ],
      [
        "1.5 order B",
        "What is printed?",
        "System.out.println((double) (9 / 4));",
        [
          "2",
          "2.0",
          "2.25",
          "3.0"
        ],
        1,
        "int division gives 2 before the cast changes it to 2.0."
      ],
      [
        "1.5 implicit widening",
        "What is printed?",
        "int laps = 6;\ndouble distance = laps;\nSystem.out.println(distance);",
        [
          "6.0",
          "6",
          "Compiler error",
          "0.0"
        ],
        0,
        "Implicit int-to-double widening converts 6 to 6.0."
      ],
      [
        "1.5 round positive",
        "What is produced?",
        "(int) (4.7 + 0.5)",
        [
          "4",
          "5",
          "4.7",
          "6"
        ],
        1,
        "4.7+0.5=5.2; cast truncates to 5."
      ],
      [
        "1.5 round negative",
        "What is produced?",
        "(int) (-4.7 - 0.5)",
        [
          "-4",
          "-5",
          "5",
          "-6"
        ],
        1,
        "Subtract half for a negative value before truncation."
      ],
      [
        "1.5 rounding purpose",
        "Why does (int)(x + 0.5) work for standard nonnegative values within int range?",
        "",
        [
          "It multiplies by a fraction",
          "The shift makes truncation act like nearest integer rounding",
          "A double is stored exactly always",
          "It increments x variable"
        ],
        1,
        "The +0.5 offset moves the cutoff before truncating."
      ],
      [
        "1.5 int maximum",
        "What is Integer.MAX_VALUE in standard Java?",
        "",
        [
          "2147483647",
          "2147483648",
          "-2147483648",
          "4294967295"
        ],
        0,
        "A Java int is signed 32-bit, maximum 2^31-1."
      ],
      [
        "1.5 int minimum",
        "What is Integer.MIN_VALUE?",
        "",
        [
          "-2147483647",
          "0",
          "-2147483648",
          "2147483647"
        ],
        2,
        "A signed 32-bit int starts at -2^31."
      ],
      [
        "1.5 overflow",
        "What does this print?",
        "int n = Integer.MAX_VALUE;\nSystem.out.println(n + 1);",
        [
          "2147483648",
          "-2147483648",
          "0",
          "Run-time exception"
        ],
        1,
        "Integer arithmetic overflows and wraps to MIN_VALUE."
      ],
      [
        "1.5 invalid literal",
        "What happens?",
        "int n = 2147483648;",
        [
          "Valid max int",
          "Compile-time integer literal out of range",
          "Run-time overflow only",
          "Prints negative minimum"
        ],
        1,
        "The positive decimal literal is out of int range as written."
      ],
      [
        "1.5 underflow",
        "What does this print?",
        "int n = Integer.MIN_VALUE;\nSystem.out.println(n - 1);",
        [
          "-2147483649",
          "0",
          "2147483647",
          "Run-time exception"
        ],
        2,
        "Subtracting below the minimum wraps to the maximum."
      ],
      [
        "1.5 double precision",
        "Which statement best explains why 0.1 + 0.2 might print 0.30000000000000004?",
        "",
        [
          "Always integer division",
          "Finite binary floating-point precision",
          "Java changed the variable name",
          "Missing semicolon"
        ],
        1,
        "Some decimal fractions cannot be represented exactly in a finite double."
      ],
      [
        "1.5 average",
        "Which expression correctly preserves a fractional average of three int scores stored in total?",
        "",
        [
          "total / 3",
          "(int) total / 3",
          "(double) (total / 3)",
          "(double) total / 3"
        ],
        3,
        "Cast an operand before int division happens."
      ],
      [
        "1.6 equivalent",
        "Which expands score += 4; correctly?",
        "",
        [
          "score = 4;",
          "score = score + 4;",
          "score = score - 4;",
          "score =+ 4;"
        ],
        1,
        "Compound assignment adds to the old score, then stores the result."
      ],
      [
        "1.6 subtract",
        "What is the final value?",
        "int n = 15;\nn -= 6;",
        [
          "6",
          "21",
          "9",
          "15"
        ],
        2,
        "15-6=9."
      ],
      [
        "1.6 multiply",
        "What is the final value?",
        "int n = 4;\nn *= 3;",
        [
          "7",
          "12",
          "1",
          "43"
        ],
        1,
        "Multiply the current value by 3."
      ],
      [
        "1.6 divide",
        "What is the final value?",
        "int n = 19;\nn /= 4;",
        [
          "4",
          "4.75",
          "5",
          "3"
        ],
        0,
        "int arithmetic discards the fractional part: 19/4=4."
      ],
      [
        "1.6 remainder",
        "What is the final value?",
        "int n = 19;\nn %= 4;",
        [
          "4",
          "3",
          "1",
          "0"
        ],
        1,
        "19 divided by 4 leaves remainder 3."
      ],
      [
        "1.6 full RHS",
        "What is the final value of n?",
        "int n = 4;\nint y = 3;\nn *= y + 2;",
        [
          "14",
          "20",
          "18",
          "10"
        ],
        1,
        "The whole RHS y+2 evaluates to 5; 4*5=20."
      ],
      [
        "1.6 right variable",
        "What happens?",
        "int x = 6;\nx += x;",
        [
          "x becomes 7",
          "x becomes 12",
          "x is unchanged",
          "Compiler error"
        ],
        1,
        "Uses the old x=6 for both terms."
      ],
      [
        "1.6 increment",
        "What is x after the statement?",
        "int x = 8;\nx++;",
        [
          "8",
          "7",
          "9",
          "10"
        ],
        2,
        "Standalone x++ adds 1."
      ],
      [
        "1.6 decrement",
        "What is x after the statement?",
        "int x = 8;\nx--;",
        [
          "7",
          "9",
          "8",
          "0"
        ],
        0,
        "Standalone x-- subtracts 1."
      ],
      [
        "1.6 typo",
        "What is printed?",
        "int x = 10;\nx =+ 3;\nSystem.out.println(x);",
        [
          "13",
          "3",
          "10",
          "Compile error"
        ],
        1,
        "=+ is assignment of unary +3, not +=."
      ],
      [
        "1.6 trace",
        "What is printed?",
        "int x = 17;\nx /= 5;\nx %= 2;\nx++;\nSystem.out.println(x);",
        [
          "1",
          "2",
          "3",
          "4"
        ],
        1,
        "17/5=3; 3%2=1; ++ gives 2."
      ],
      [
        "1.6 exam scope",
        "Which expression is explicitly in the current AP CSA Topic 1.6 scope?",
        "",
        [
          "++x inside a larger expression",
          "x++ as a standalone statement",
          "x-- used as a method argument",
          "Prefix --x within arithmetic"
        ],
        1,
        "Exam scope includes standalone postfix increment/decrement updates."
      ],
      [
        "1.6 mixed",
        "Find final x.",
        "int x = 5;\nint y = 3;\nx *= y + 2;\nx %= 7;",
        [
          "2",
          "3",
          "4",
          "5"
        ],
        2,
        "x=5*(3+2)=25; 25%7=4."
      ]
    ]
  }
};
