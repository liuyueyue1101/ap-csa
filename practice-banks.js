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
  }
};
