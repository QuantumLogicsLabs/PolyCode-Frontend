mkdir -p /home/claude/c-final
cat > /home/claude/c-final/cFundamentalsCurriculum.js << 'JSEOF'
// PolyCode — C Fundamentals full curriculum
// 5 chapters · 15 lessons · C challenges
// YouTube links: edit cFundamentalsVideoLinks.js

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_FUNDAMENTALS_VIDEO_LINKS } from "./cFundamentalsVideoLinks";

const ACCENT = "#659ad2";

const RAW_C_FUNDAMENTALS_CHAPTERS = [
  {
    id: "welcome-c",
    title: "Welcome to C",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "cf-0",
        title: "What is C?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**C** is a general-purpose, compiled programming language created by **Dennis Ritchie** at Bell Labs in **1972**. It was originally designed to write the Unix operating system. Today, C powers everything from operating system kernels to microcontrollers to high-performance databases. Learning C gives you deep insight into how computers actually work.",
          },
          {
            type: "diagram",
            title: "Where C is used today",
            nodes: [
              {
                id: "os",
                label: "Operating Systems",
                color: ACCENT,
                items: ["Linux kernel", "Windows NT core", "macOS internals"],
              },
              {
                id: "embed",
                label: "Embedded & IoT",
                color: "#4a86c8",
                items: ["Arduino / STM32", "Firmware", "Device drivers"],
              },
              {
                id: "perf",
                label: "High-Performance Apps",
                color: "#2e6da4",
                items: ["Databases (SQLite)", "Game engines", "Compilers"],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "C is often called the **mother of all languages**. C++, Java, JavaScript, Python, and PHP all borrowed syntax and ideas from C. Master C and you understand the foundation every modern language is built on.",
          },
          {
            type: "quiz",
            question: "Who created the C programming language?",
            options: ["Linus Torvalds", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"],
            answer: 1,
            explanation:
              "Dennis Ritchie created C at Bell Labs in 1972 to write the Unix operating system. Bjarne Stroustrup later created C++ as an extension of C.",
          },
        ],
        challenge: {
          title: "Hello, C World!",
          description: "Write a C program that prints exactly: `Hello, C World!`",
          starterCode: `#include <stdio.h>\n\nint main() {\n    // Print Hello, C World!\n    \n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello, C World!\\n");\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Includes stdio.h", keywords: [{ pattern: "#include\\s*<stdio\\.h>" }] },
            { id: 2, label: "Has main function", keywords: [{ pattern: "int\\s+main" }] },
            { id: 3, label: "Uses printf", keywords: [{ pattern: "printf\\s*\\(" }] },
            { id: 4, label: "Prints Hello, C World!", keywords: [{ pattern: "Hello,\\s*C\\s*World!" }] },
          ],
        },
      },
      {
        id: "cf-1",
        title: "Your First C Program",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "Every C program follows a fixed structure. Understanding each part is essential before writing more complex programs.",
          },
          {
            type: "code",
            lang: "c",
            label: "Anatomy of a C program",
            content: `#include <stdio.h>   /* 1. Preprocessor directive */

int main() {          /* 2. Main function — entry point */
    printf("Hello!\\n");  /* 3. Print to console */
    return 0;         /* 4. Return 0 = success */
}`,
          },
          {
            type: "text",
            content:
              "**Line by line breakdown:**\n\n`#include <stdio.h>` — Loads the Standard Input/Output library. Without it, `printf` and `scanf` are unknown.\n\n`int main()` — Every C program starts here. The `int` means main returns an integer.\n\n`printf(\"Hello!\\n\")` — Prints text. `\\n` is a newline character (moves cursor to next line).\n\n`return 0` — Tells the operating system the program finished successfully. Any other number means error.",
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The `\\n` inside a printf string is called an **escape sequence**. It represents a newline character. Without it, the terminal prompt appears right after your output on the same line.",
          },
          {
            type: "quiz",
            question: "What does `return 0;` at the end of main() signify?",
            options: [
              "The program printed 0 outputs",
              "The program exited with an error",
              "The program finished successfully",
              "Main() must always return 0 or it won't compile",
            ],
            answer: 2,
            explanation:
              "By convention, returning 0 from main signals success to the operating system. A non-zero return value signals an error condition.",
          },
        ],
        challenge: {
          title: "Personal Introduction",
          description:
            "Write a C program that prints two lines: `My name is: C Programmer` then `I am learning: C`",
          starterCode: `#include <stdio.h>\n\nint main() {\n    // Print two lines\n    \n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("My name is: C Programmer\\n");\n    printf("I am learning: C\\n");\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Two printf statements", keywords: [{ pattern: "printf" }] },
            { id: 2, label: "Prints My name is", keywords: [{ pattern: "My name is" }] },
            { id: 3, label: "Prints I am learning", keywords: [{ pattern: "I am learning" }] },
          ],
        },
      },
      {
        id: "cf-2",
        title: "How C Compiles",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Unlike Python (interpreted line by line), C is a **compiled language**. Your source code goes through a 4-stage pipeline before it becomes a runnable program. Understanding this helps you fix errors faster.",
          },
          {
            type: "diagram",
            title: "C compilation pipeline",
            nodes: [
              {
                id: "pre",
                label: "1. Preprocessor",
                color: ACCENT,
                items: ["Expands #include", "Expands #define macros", "Removes comments"],
              },
              {
                id: "comp",
                label: "2. Compiler",
                color: "#4a86c8",
                items: ["Checks syntax", "Converts to assembly (.s)"],
              },
              {
                id: "asm",
                label: "3. Assembler",
                color: "#2e6da4",
                items: ["Assembly → binary (.o object file)"],
              },
              {
                id: "link",
                label: "4. Linker",
                color: "#1a4f7a",
                items: ["Joins .o files + libraries", "Creates final executable"],
              },
            ],
          },
          {
            type: "code",
            lang: "c",
            label: "Compile and run with GCC",
            content: `// Step 1 — Compile
// gcc -Wall -o hello hello.c
//   -Wall   = enable all warnings
//   -o hello = name the output file

// Step 2 — Run
// ./hello         (Linux/macOS)
// hello.exe       (Windows)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Always compile with **`-Wall`** (all warnings). Warnings often reveal real bugs — treat every warning as an error during learning. A clean compile with no warnings is the goal.",
          },
          {
            type: "quiz",
            question: "What is the role of the LINKER in C compilation?",
            options: [
              "Checks grammar and syntax",
              "Converts C code to assembly language",
              "Combines object files and libraries into a runnable executable",
              "Expands #include and #define directives",
            ],
            answer: 2,
            explanation:
              "The linker is the final stage. It takes .o object files, resolves references to library functions like printf (from libc), and produces the final executable binary.",
          },
        ],
        challenge: {
          title: "Compilation Steps",
          description:
            "Write a program that prints the GCC command to compile itself: `gcc -Wall -o program source.c` then on the next line prints `Compilation successful!`",
          starterCode: `#include <stdio.h>\n\nint main() {\n    // Print gcc command then success message\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("gcc -Wall -o program source.c\\n");\n    printf("Compilation successful!\\n");\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses printf", keywords: [{ pattern: "printf" }] },
            { id: 2, label: "Prints gcc command", keywords: [{ pattern: "gcc" }] },
            { id: 3, label: "Prints Compilation successful", keywords: [{ pattern: "successful" }] },
          ],
        },
      },
    ],
  },
  {
    id: "variables-types",
    title: "Variables & Data Types",
    icon: "📦",
    color: "#4a86c8",
    lessons: [
      {
        id: "cf-3",
        title: "Variables and Basic Data Types",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "C is a **statically typed** language — you must declare a variable's type before using it. The type tells the compiler how much memory to allocate and how to interpret the bits stored there.",
          },
          {
            type: "code",
            lang: "c",
            label: "The four fundamental types",
            content: `#include <stdio.h>

int main() {
    int    age    = 20;          /* whole numbers */
    float  price  = 9.99f;       /* ~7 decimal digits */
    double pi     = 3.14159265;  /* ~15 decimal digits */
    char   grade  = 'A';         /* single character */

    printf("Age:   %d\\n",   age);
    printf("Price: %.2f\\n", price);
    printf("Pi:    %.5lf\\n", pi);
    printf("Grade: %c\\n",   grade);
    return 0;
}`,
          },
          {
            type: "diagram",
            title: "C primitive types at a glance",
            nodes: [
              { id: "int", label: "int", color: ACCENT, items: ["Whole numbers", "4 bytes typically", "Format: %d"] },
              { id: "float", label: "float", color: "#4a86c8", items: ["~7 decimal digits", "4 bytes", "Format: %f"] },
              { id: "double", label: "double", color: "#2e6da4", items: ["~15 decimal digits", "8 bytes", "Format: %lf"] },
              { id: "char", label: "char", color: "#1a4f7a", items: ["Single character", "1 byte", "Format: %c"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use **`double`** over `float` for most calculations — it has more precision and modern CPUs handle both at the same speed. Use `float` only when memory is severely constrained (embedded systems).",
          },
          {
            type: "quiz",
            question: "Which format specifier prints an integer with printf?",
            options: ["%f", "%s", "%d", "%c"],
            answer: 2,
            explanation:
              "%d is the format specifier for decimal integers. %f is for float, %lf for double, %s for strings, %c for characters.",
          },
        ],
        challenge: {
          title: "Student Profile",
          description:
            "Declare: `int age = 21`, `double gpa = 3.75`, `char initial = 'S'`. Print each on its own line using correct format specifiers.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    /* Declare age, gpa, initial and print each */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    int age = 21;\n    double gpa = 3.75;\n    char initial = 'S';\n    printf("%d\\n", age);\n    printf("%.2lf\\n", gpa);\n    printf("%c\\n", initial);\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Declares int age", keywords: [{ pattern: "int\\s+age" }] },
            { id: 2, label: "Declares double gpa", keywords: [{ pattern: "double\\s+gpa" }] },
            { id: 3, label: "Declares char initial", keywords: [{ pattern: "char\\s+initial" }] },
            { id: 4, label: "Prints all three", keywords: [{ pattern: "printf" }] },
          ],
        },
      },
      {
        id: "cf-4",
        title: "sizeof and Type Sizes",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "The `sizeof` operator returns the size in **bytes** of a type or variable. This is crucial in C because type sizes can vary between platforms (32-bit vs 64-bit systems). Always use `sizeof` instead of hardcoding sizes.",
          },
          {
            type: "code",
            lang: "c",
            label: "sizeof in action",
            content: `#include <stdio.h>

int main() {
    printf("char:   %zu bytes\\n", sizeof(char));
    printf("int:    %zu bytes\\n", sizeof(int));
    printf("float:  %zu bytes\\n", sizeof(float));
    printf("double: %zu bytes\\n", sizeof(double));
    printf("long:   %zu bytes\\n", sizeof(long));

    int arr[10];
    printf("arr:    %zu bytes\\n", sizeof(arr));
    printf("elements: %zu\\n", sizeof(arr) / sizeof(arr[0]));
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Use `%zu` (not `%d`) with `sizeof` — it returns a `size_t` which is an unsigned type. On 64-bit systems `size_t` is 8 bytes, so `%d` can print wrong values for large sizes.",
          },
          {
            type: "quiz",
            question: "What does `sizeof(arr) / sizeof(arr[0])` calculate for an array?",
            options: [
              "The sum of all elements",
              "The number of elements in the array",
              "The memory address of arr",
              "The largest element",
            ],
            answer: 1,
            explanation:
              "sizeof(arr) gives total bytes, sizeof(arr[0]) gives bytes per element. Dividing gives the count of elements — the standard C idiom for array length.",
          },
        ],
        challenge: {
          title: "Size Explorer",
          description:
            "Print the sizeof `int`, `float`, `double`, and `char` each on its own line using the format `int: X bytes`.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    /* Print sizes of all four types */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("int: %zu bytes\\n",    sizeof(int));\n    printf("float: %zu bytes\\n",  sizeof(float));\n    printf("double: %zu bytes\\n", sizeof(double));\n    printf("char: %zu bytes\\n",   sizeof(char));\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses sizeof", keywords: [{ pattern: "sizeof\\s*\\(" }] },
            { id: 2, label: "Prints int size", keywords: [{ pattern: "int" }] },
            { id: 3, label: "Uses %zu format", keywords: [{ pattern: "%zu" }] },
          ],
        },
      },
      {
        id: "cf-5",
        title: "Constants and #define",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Constants are values that should never change during program execution. C provides two ways: `const` (type-safe, compiler-checked) and `#define` (preprocessor text replacement, no type). Both have important uses.",
          },
          {
            type: "code",
            lang: "c",
            label: "const vs #define",
            content: `#include <stdio.h>

/* #define: preprocessor replaces text before compilation */
#define MAX_STUDENTS 50
#define PI           3.14159

int main() {
    /* const: type-safe, exists in memory, debugger-visible */
    const int PASSING_GRADE = 50;
    const double TAX_RATE   = 0.17;

    printf("Max students: %d\\n",   MAX_STUDENTS);
    printf("Pi:           %.5f\\n", PI);
    printf("Passing mark: %d\\n",   PASSING_GRADE);
    printf("Tax rate:     %.0f%%\\n", TAX_RATE * 100);
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Never put a semicolon after `#define` values — `#define PI 3.14159;` would replace PI with `3.14159;` including the semicolon, causing compile errors like `printf(3.14159;;)`.",
          },
          {
            type: "quiz",
            question: "What is the key advantage of `const` over `#define`?",
            options: [
              "const runs faster at runtime",
              "const values can be changed later if needed",
              "const is type-safe and visible to the debugger",
              "#define values can only be integers",
            ],
            answer: 2,
            explanation:
              "const has a data type (compiler checks usage) and exists as a real variable (debugger can inspect it). #define is pure text substitution with no type checking.",
          },
        ],
        challenge: {
          title: "Circle Calculator",
          description:
            "Define `#define PI 3.14159` and `const int RADIUS = 7`. Calculate area = PI * RADIUS * RADIUS and print `Area = X.XX` with 2 decimal places.",
          starterCode: `#include <stdio.h>\n\n#define PI 3.14159\n\nint main() {\n    const int RADIUS = 7;\n    /* Calculate and print area */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\n#define PI 3.14159\n\nint main() {\n    const int RADIUS = 7;\n    double area = PI * RADIUS * RADIUS;\n    printf("Area = %.2f\\n", area);\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Defines PI macro", keywords: [{ pattern: "#define\\s+PI" }] },
            { id: 2, label: "Uses const RADIUS", keywords: [{ pattern: "const\\s+int\\s+RADIUS" }] },
            { id: 3, label: "Prints Area", keywords: [{ pattern: "Area" }] },
          ],
        },
      },
      {
        id: "cf-6",
        title: "Type Casting",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Type casting** converts a value from one type to another. C has two kinds: **implicit** (automatic, can silently lose data) and **explicit** (you write the cast, clear intent). Always prefer explicit casts to show you know what you're doing.",
          },
          {
            type: "code",
            lang: "c",
            label: "Implicit vs explicit casting",
            content: `#include <stdio.h>

int main() {
    /* Implicit: int/int = int (truncates remainder!) */
    int a = 7, b = 2;
    printf("7 / 2 (int):    %d\\n", a / b);      /* 3 */

    /* Explicit: cast to double FIRST, then divide */
    printf("7 / 2 (double): %.1f\\n", (double)a / b); /* 3.5 */

    /* double to int: truncates (does NOT round) */
    double pi = 3.99;
    int truncated = (int)pi;
    printf("(int)3.99 = %d\\n", truncated);       /* 3 */

    /* char to int: gives ASCII value */
    char ch = 'A';
    printf("ASCII of 'A' = %d\\n", (int)ch);      /* 65 */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Integer division silently truncates!** `7 / 2` gives `3` in C, not `3.5`. This is one of the most common beginner mistakes. Always cast at least one operand to `double` when you need decimal results.",
          },
          {
            type: "quiz",
            question: "What does (int)4.9 evaluate to in C?",
            options: ["5 (rounds up)", "4 (truncates)", "4.9 (no change)", "Compile error"],
            answer: 1,
            explanation:
              "Casting a floating-point value to int always TRUNCATES (cuts off the decimal part) — it never rounds. So 4.9 becomes 4, and -4.9 becomes -4.",
          },
        ],
        challenge: {
          title: "Fix Integer Division",
          description:
            "Given `int total = 10` and `int count = 3`, print the result as a double with 2 decimal places. Expected output: `3.33`",
          starterCode: `#include <stdio.h>\n\nint main() {\n    int total = 10;\n    int count = 3;\n    /* Print division as double with 2 dp */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    int total = 10;\n    int count = 3;\n    printf("%.2f\\n", (double)total / count);\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses explicit cast to double", keywords: [{ pattern: "\\(double\\)" }] },
            { id: 2, label: "Uses %.2f format", keywords: [{ pattern: "%.2f" }] },
          ],
        },
      },
    ],
  },
  {
    id: "operators",
    title: "Operators & Expressions",
    icon: "➗",
    color: "#2e6da4",
    lessons: [
      {
        id: "cf-7",
        title: "Arithmetic & Assignment Operators",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "C supports all standard arithmetic operators plus **compound assignment operators** that combine an operation with assignment. Compound operators like `+=` are shorter and often appear in real code.",
          },
          {
            type: "code",
            lang: "c",
            label: "Arithmetic and compound assignment",
            content: `#include <stdio.h>

int main() {
    int a = 17, b = 5;

    /* Basic arithmetic */
    printf("17 + 5  = %d\\n", a + b);  /* 22 */
    printf("17 - 5  = %d\\n", a - b);  /* 12 */
    printf("17 * 5  = %d\\n", a * b);  /* 85 */
    printf("17 / 5  = %d\\n", a / b);  /* 3  (integer!) */
    printf("17 %% 5 = %d\\n", a % b);  /* 2  (remainder) */

    /* Compound assignment */
    int x = 10;
    x += 5;   printf("x += 5:  %d\\n", x);  /* 15 */
    x -= 3;   printf("x -= 3:  %d\\n", x);  /* 12 */
    x *= 2;   printf("x *= 2:  %d\\n", x);  /* 24 */
    x /= 4;   printf("x /= 4:  %d\\n", x);  /* 6  */
    x %= 4;   printf("x %%= 4: %d\\n", x);  /* 2  */

    /* Increment / Decrement */
    int n = 5;
    printf("n++: %d\\n", n++);  /* 5 (post: use then increment) */
    printf("n:   %d\\n", n);    /* 6 */
    printf("++n: %d\\n", ++n);  /* 7 (pre: increment then use) */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**`%%` in printf prints a literal `%`** — because `%` alone starts a format specifier. So `printf(\"100%%\")` prints `100%`.",
          },
          {
            type: "quiz",
            question: "What is the result of `17 % 5` in C?",
            options: ["3", "2", "3.4", "0"],
            answer: 1,
            explanation:
              "The modulo operator `%` returns the remainder after integer division. 17 ÷ 5 = 3 remainder 2, so 17 % 5 = 2.",
          },
        ],
        challenge: {
          title: "Remainder and Even/Odd",
          description:
            "Given `int num = 29`, print `29 % 2 = X` (where X is the result), then print `Even` or `Odd` based on the remainder.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    int num = 29;\n    /* Print remainder and even/odd */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    int num = 29;\n    printf("29 %% 2 = %d\\n", num % 2);\n    if (num % 2 == 0)\n        printf("Even\\n");\n    else\n        printf("Odd\\n");\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses modulo %", keywords: [{ pattern: "num\\s*%\\s*2" }] },
            { id: 2, label: "Prints Odd", keywords: [{ pattern: "Odd" }] },
          ],
        },
      },
      {
        id: "cf-8",
        title: "Relational & Logical Operators",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Relational operators** compare two values and return 1 (true) or 0 (false). **Logical operators** combine multiple conditions. In C, any non-zero value is true; zero is false.",
          },
          {
            type: "code",
            lang: "c",
            label: "Relational and logical operators",
            content: `#include <stdio.h>

int main() {
    int age = 20;
    int hasID = 1;  /* 1 = true in C */

    /* Relational operators */
    printf("age > 18:  %d\\n", age > 18);   /* 1 */
    printf("age == 20: %d\\n", age == 20);  /* 1 */
    printf("age != 21: %d\\n", age != 21);  /* 1 */
    printf("age <= 18: %d\\n", age <= 18);  /* 0 */

    /* Logical AND (&&): BOTH must be true */
    if (age >= 18 && hasID) {
        printf("Access granted\\n");
    }

    /* Logical OR (||): AT LEAST ONE must be true */
    int isStudent = 0;
    if (isStudent || age < 25) {
        printf("Discount applies\\n");
    }

    /* Logical NOT (!): inverts */
    if (!isStudent) {
        printf("Not a student\\n");
    }
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Never confuse `=` and `==`!** Writing `if (x = 5)` assigns 5 to x (always true). You want `if (x == 5)` to compare. This is the most common C bug — it compiles without error but behaves wrongly.",
          },
          {
            type: "quiz",
            question: "What is the result of `5 > 3 && 2 > 8` in C?",
            options: ["1 (true)", "0 (false)", "Compile error", "5"],
            answer: 1,
            explanation:
              "AND requires BOTH conditions to be true. 5 > 3 is true (1) BUT 2 > 8 is false (0). 1 && 0 = 0 (false).",
          },
        ],
        challenge: {
          title: "Grade Gate",
          description:
            "Given `int score = 75` and `int attendance = 80`. Print `Pass` if score >= 50 AND attendance >= 75, otherwise print `Fail`.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    int score = 75;\n    int attendance = 80;\n    /* Check both conditions with && */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    int score = 75;\n    int attendance = 80;\n    if (score >= 50 && attendance >= 75)\n        printf("Pass\\n");\n    else\n        printf("Fail\\n");\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses && operator", keywords: [{ pattern: "&&" }] },
            { id: 2, label: "Checks score >= 50", keywords: [{ pattern: "score\\s*>=\\s*50" }] },
            { id: 3, label: "Prints Pass", keywords: [{ pattern: "Pass" }] },
          ],
        },
      },
      {
        id: "cf-9",
        title: "Bitwise Operators",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "Bitwise operators work directly on individual bits. They are used in embedded systems, graphics programming, network protocols, and anywhere you need to manipulate flags or extract specific bits from a value.",
          },
          {
            type: "code",
            lang: "c",
            label: "All bitwise operators",
            content: `#include <stdio.h>

int main() {
    unsigned int a = 12;  /* 0000 1100 */
    unsigned int b = 10;  /* 0000 1010 */

    printf("a & b  = %u\\n", a & b);   /* AND:  8  = 0000 1000 */
    printf("a | b  = %u\\n", a | b);   /* OR:  14  = 0000 1110 */
    printf("a ^ b  = %u\\n", a ^ b);   /* XOR:  6  = 0000 0110 */
    printf("~a     = %d\\n", ~a);       /* NOT: -13 (flips all bits) */
    printf("a << 1 = %u\\n", a << 1);  /* LEFT  SHIFT:  24 = *2 */
    printf("a >> 1 = %u\\n", a >> 1);  /* RIGHT SHIFT:   6 = /2 */

    /* Practical: using flags */
    unsigned int flags = 0;
    flags |= (1 << 3);   /* Set bit 3 */
    flags |= (1 << 0);   /* Set bit 0 */
    printf("flags = %u\\n", flags);    /* 9 = 0000 1001 */

    /* Check if bit 3 is set */
    if (flags & (1 << 3))
        printf("Bit 3 is ON\\n");
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**Left shift `<< n` multiplies by 2ⁿ** — much faster than multiplication. **Right shift `>> n` divides by 2ⁿ** (for unsigned values). These tricks appear in performance-critical code, graphics, and compression algorithms.",
          },
          {
            type: "quiz",
            question: "What is `8 << 2` (8 left-shifted by 2 positions)?",
            options: ["16", "32", "4", "64"],
            answer: 1,
            explanation:
              "Left shifting by 2 multiplies by 4 (2²). 8 × 4 = 32. In binary: 00001000 → 00100000.",
          },
        ],
        challenge: {
          title: "Flag Manager",
          description:
            "Start with `unsigned int flags = 0`. Set bit 3 using bitwise OR. Then check if bit 3 is set and print `Bit 3 is set: 1`.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    unsigned int flags = 0;\n    /* Set bit 3 using |= */\n    /* Check bit 3 and print result */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    unsigned int flags = 0;\n    flags |= (1 << 3);\n    printf("Bit 3 is set: %d\\n", (flags & (1 << 3)) ? 1 : 0);\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses bitwise OR to set bit", keywords: [{ pattern: "\\|=" }] },
            { id: 2, label: "Checks bit with &", keywords: [{ pattern: "flags\\s*&" }] },
          ],
        },
      },
    ],
  },
  {
    id: "control-flow",
    title: "Control Flow",
    icon: "🔀",
    color: "#1a4f7a",
    lessons: [
      {
        id: "cf-10",
        title: "if, else if, else",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Control flow determines which code runs under which conditions. The `if` statement is the most fundamental decision-making tool in C. Chain conditions with `else if` and use `else` as the default case.",
          },
          {
            type: "code",
            lang: "c",
            label: "Grade classifier",
            content: `#include <stdio.h>

int main() {
    int score = 78;

    if (score >= 90) {
        printf("Grade: A — Excellent!\\n");
    } else if (score >= 80) {
        printf("Grade: B — Good\\n");
    } else if (score >= 70) {
        printf("Grade: C — Average\\n");
    } else if (score >= 60) {
        printf("Grade: D — Below Average\\n");
    } else {
        printf("Grade: F — Fail\\n");
    }
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Always use curly braces `{}`** even for single-statement if bodies. Without them, only the very next line is in the if — the line after always runs. This is a famous source of bugs (the goto fail bug in iOS SSL had this exact issue).",
          },
          {
            type: "quiz",
            question: "With `int x = 15`, what does `if (x > 20) {...} else if (x > 10) {...} else {...}` print?",
            options: ["The first if block", "The else if block", "The else block", "Nothing"],
            answer: 1,
            explanation:
              "x=15 fails `x > 20` (15 is not > 20), but passes `x > 10` (15 > 10 is true), so the else if block runs.",
          },
        ],
        challenge: {
          title: "Electricity Bill",
          description:
            "Given `int units = 350`. Print slab: `Low (0-100)` for 0-100, `Medium (101-300)` for 101-300, `High (301+)` for over 300.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    int units = 350;\n    /* Classify electricity usage */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    int units = 350;\n    if (units <= 100) {\n        printf("Low (0-100)\\n");\n    } else if (units <= 300) {\n        printf("Medium (101-300)\\n");\n    } else {\n        printf("High (301+)\\n");\n    }\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses if/else if/else", keywords: [{ pattern: "else\\s+if" }] },
            { id: 2, label: "Prints High", keywords: [{ pattern: "High" }] },
          ],
        },
      },
      {
        id: "cf-11",
        title: "switch Statement",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "A `switch` statement efficiently handles multiple discrete values of an integer or char. It is cleaner than a long chain of `else if` when matching exact values. Each `case` matches one value; `break` exits the switch.",
          },
          {
            type: "code",
            lang: "c",
            label: "Day of week with switch",
            content: `#include <stdio.h>

int main() {
    int day = 3;

    switch (day) {
        case 1:  printf("Monday\\n");    break;
        case 2:  printf("Tuesday\\n");   break;
        case 3:  printf("Wednesday\\n"); break;
        case 4:  printf("Thursday\\n");  break;
        case 5:  printf("Friday\\n");    break;
        case 6:
        case 7:  printf("Weekend!\\n");  break;  /* fall-through */
        default: printf("Invalid day\\n");
    }

    /* Fall-through for seasons */
    int month = 7;
    switch (month) {
        case 12: case 1: case 2:
            printf("Winter\\n"); break;
        case 3: case 4: case 5:
            printf("Spring\\n"); break;
        case 6: case 7: case 8:
            printf("Summer\\n"); break;
        case 9: case 10: case 11:
            printf("Autumn\\n"); break;
    }
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Always include `break`** after each case unless you intentionally want fall-through. Without `break`, execution continues into the next case regardless of the value — this is one of the most common C bugs.",
          },
          {
            type: "quiz",
            question: "What happens if you forget `break` in a switch case?",
            options: [
              "Compile error",
              "The program crashes",
              "Execution falls through to the next case",
              "The switch exits automatically",
            ],
            answer: 2,
            explanation:
              "Without break, control 'falls through' into the next case body even if that case doesn't match. This can be intentional (grouping cases) but is usually a bug.",
          },
        ],
        challenge: {
          title: "Season Finder",
          description:
            "Given `int month = 7`. Use switch with fall-through to print the season: months 12,1,2=Winter; 3,4,5=Spring; 6,7,8=Summer; 9,10,11=Autumn.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    int month = 7;\n    switch (month) {\n        /* Add cases */\n    }\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    int month = 7;\n    switch (month) {\n        case 12: case 1: case 2:\n            printf("Winter\\n"); break;\n        case 3: case 4: case 5:\n            printf("Spring\\n"); break;\n        case 6: case 7: case 8:\n            printf("Summer\\n"); break;\n        case 9: case 10: case 11:\n            printf("Autumn\\n"); break;\n        default:\n            printf("Invalid\\n");\n    }\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses switch", keywords: [{ pattern: "switch\\s*\\(" }] },
            { id: 2, label: "Case 6, 7, 8 for Summer", keywords: [{ pattern: "case\\s+6" }] },
            { id: 3, label: "Prints Summer", keywords: [{ pattern: "Summer" }] },
          ],
        },
      },
      {
        id: "cf-12",
        title: "Loops: for, while, do-while",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "C has three loop types. **`for`** is ideal when the count is known upfront. **`while`** tests condition before each iteration. **`do-while`** always runs at least once, then tests. Choose based on the situation.",
          },
          {
            type: "code",
            lang: "c",
            label: "All three loop types",
            content: `#include <stdio.h>

int main() {
    /* for: known count */
    printf("for: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\\n");

    /* while: condition-driven */
    printf("while: ");
    int n = 1;
    while (n <= 5) {
        printf("%d ", n++);
    }
    printf("\\n");

    /* do-while: runs at least once */
    printf("do-while: ");
    int x = 10;
    do {
        printf("ran! ");  /* runs even though x > 5 */
    } while (x < 5);
    printf("\\n");

    /* Nested loops: multiplication table */
    for (int r = 1; r <= 3; r++) {
        for (int c = 1; c <= 3; c++) {
            printf("%3d", r * c);
        }
        printf("\\n");
    }
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The `for` header has three optional parts: `for (init; condition; update)`. You can omit any of them: `for(;;)` is an **infinite loop** — useful with `break` inside. Real systems software uses infinite loops all the time.",
          },
          {
            type: "quiz",
            question: "How many times does `do { printf(\"hi\"); } while(0);` print 'hi'?",
            options: ["0 times", "1 time", "Infinite times", "Compile error"],
            answer: 1,
            explanation:
              "do-while always executes the body BEFORE checking the condition. The condition `0` is false, so it only runs once.",
          },
        ],
        challenge: {
          title: "Multiplication Table",
          description:
            "Use a `for` loop to print the 7-times table from 7×1 to 7×10. Format: `7 x 1 = 7` on each line.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    /* Print 7 times table using for loop */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        printf("7 x %d = %d\\n", i, 7 * i);\n    }\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses for loop", keywords: [{ pattern: "for\\s*\\(" }] },
            { id: 2, label: "Loop goes to 10", keywords: [{ pattern: "i\\s*<=\\s*10" }] },
            { id: 3, label: "Multiplies by 7", keywords: [{ pattern: "7\\s*\\*\\s*i" }] },
          ],
        },
      },
      {
        id: "cf-13",
        title: "break, continue, and goto",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "`break` exits the nearest loop or switch immediately. `continue` skips the rest of the current iteration and jumps to the next one. Used wisely, they make loops cleaner and avoid deeply nested if statements.",
          },
          {
            type: "code",
            lang: "c",
            label: "break and continue",
            content: `#include <stdio.h>

int main() {
    /* break: stop when we find first multiple of 7 > 20 */
    printf("First multiple of 7 > 20: ");
    for (int i = 1; i <= 100; i++) {
        if (i > 20 && i % 7 == 0) {
            printf("%d\\n", i);
            break;  /* exit the loop immediately */
        }
    }

    /* continue: print only odd numbers 1-10 */
    printf("Odd numbers: ");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;  /* skip evens */
        printf("%d ", i);
    }
    printf("\\n");

    /* Nested loops: break only exits INNER loop */
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (j == 1) break;    /* exits inner only */
            printf("(%d,%d) ", i, j);
        }
    }
    printf("\\n");
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**`break` only exits the INNERMOST loop or switch.** If you need to exit multiple levels of nested loops, use a flag variable (`int done = 0`) or restructure into a function and use `return`.",
          },
          {
            type: "quiz",
            question: "What does `continue` do in a for loop?",
            options: [
              "Exits the entire loop",
              "Restarts the loop from i = 0",
              "Skips the current iteration's remaining code and goes to the next iteration",
              "Pauses execution temporarily",
            ],
            answer: 2,
            explanation:
              "continue skips the remaining code in the current loop body and jumps to the update expression (i++) then checks the condition. The loop keeps going.",
          },
        ],
        challenge: {
          title: "Skip Multiples of 3",
          description:
            "Print numbers 1 to 20. Skip any number that is a multiple of 3 using `continue`. Print all on one line separated by spaces.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 20; i++) {\n        /* Skip multiples of 3 with continue */\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 20; i++) {\n        if (i % 3 == 0) continue;\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses continue", keywords: [{ pattern: "continue" }] },
            { id: 2, label: "Checks divisibility by 3", keywords: [{ pattern: "i\\s*%\\s*3" }] },
          ],
        },
      },
    ],
  },
  {
    id: "input-output",
    title: "Input & Output",
    icon: "🖥️",
    color: "#0d6b9a",
    lessons: [
      {
        id: "cf-14",
        title: "printf and Format Specifiers",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`printf` is C's primary output function from the `stdio.h` library. Its format string contains literal text mixed with **format specifiers** (starting with `%`) that get replaced by the corresponding arguments.",
          },
          {
            type: "code",
            lang: "c",
            label: "Complete format specifier reference",
            content: `#include <stdio.h>

int main() {
    int   i  = 42;
    float f  = 3.14f;
    double d = 2.71828;
    char  c  = 'Z';
    char  s[] = "PolyCode";

    printf("%d\\n",     i);        /* integer */
    printf("%f\\n",     f);        /* float (6 dp default) */
    printf("%.2f\\n",   f);        /* float, 2 decimal places */
    printf("%lf\\n",    d);        /* double */
    printf("%.5lf\\n",  d);        /* double, 5 decimal places */
    printf("%c\\n",     c);        /* character */
    printf("%s\\n",     s);        /* string */
    printf("%u\\n",     42u);      /* unsigned int */
    printf("%x\\n",     255);      /* hex lowercase: ff */
    printf("%X\\n",     255);      /* hex uppercase: FF */
    printf("%05d\\n",   i);        /* zero-padded: 00042 */
    printf("%-10s|\\n", s);        /* left-aligned */
    printf("%10s|\\n",  s);        /* right-aligned */
    printf("%%\\n");               /* literal percent sign */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Width and precision**: `%8.2f` means at least 8 characters wide with 2 decimal places. `%-8.2f` left-aligns. These are essential for printing aligned tables of data.",
          },
          {
            type: "quiz",
            question: "Which format specifier prints a double with exactly 3 decimal places?",
            options: ["%d", "%f", "%.3lf", "%3d"],
            answer: 2,
            explanation:
              "%.3lf means double (%lf) with precision of 3 digits after the decimal point. The dot followed by a number controls precision.",
          },
        ],
        challenge: {
          title: "Formatted Receipt",
          description:
            "Print a mini receipt. Item `Tea` costs `2.50`, `Coffee` costs `3.75`. Each line: item name left-aligned in 12 chars, price with 2 decimal places.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    /* Print formatted receipt */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("%-12s%.2f\\n", "Tea",    2.50);\n    printf("%-12s%.2f\\n", "Coffee", 3.75);\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses %-12s for alignment", keywords: [{ pattern: "%-12s" }] },
            { id: 2, label: "Uses %.2f for price", keywords: [{ pattern: "%.2f" }] },
            { id: 3, label: "Prints Tea", keywords: [{ pattern: "Tea" }] },
          ],
        },
      },
      {
        id: "cf-15",
        title: "scanf and User Input",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "`scanf` reads formatted input from the keyboard. You pass format specifiers AND the **addresses** of variables using `&` (address-of operator). `scanf` writes the value directly into memory at that address.",
          },
          {
            type: "code",
            lang: "c",
            label: "scanf fundamentals",
            content: `#include <stdio.h>

int main() {
    int    age;
    double gpa;
    char   name[50];

    printf("Enter your age: ");
    scanf("%d", &age);           /* & gives the ADDRESS of age */

    printf("Enter your GPA: ");
    scanf("%lf", &gpa);          /* %lf for double (NOT %f) */

    printf("Enter your name: ");
    scanf("%49s", name);         /* No & for arrays! name IS an address */

    printf("\\nHello %s!\\n", name);
    printf("Age: %d, GPA: %.2lf\\n", age, gpa);
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Always use `&` with scalar variables in scanf** (int, double, char, etc.). Arrays like `char name[]` are already addresses — no `&` needed. Forgetting `&` causes crashes or undefined behavior.",
          },
          {
            type: "quiz",
            question: "Why do we write `scanf(\"%d\", &age)` with `&`?",
            options: [
              "& makes scanf run faster",
              "scanf needs the memory address so it can store the value into the variable",
              "% requires & as a matching pair",
              "age alone would print rather than read",
            ],
            answer: 1,
            explanation:
              "scanf writes to memory. Without &, it gets the current value of age, not its address, and tries to write to that arbitrary location — causing a crash or data corruption.",
          },
        ],
        challenge: {
          title: "BMI Calculator",
          description:
            "Read `weight` (double, kg) and `height` (double, m) with scanf. Calculate BMI = weight / (height * height). Print `BMI: X.XX`.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    double weight, height, bmi;\n    printf("Weight (kg): ");\n    /* Read weight */\n    printf("Height (m): ");\n    /* Read height */\n    /* Calculate and print BMI */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    double weight, height, bmi;\n    printf("Weight (kg): ");\n    scanf("%lf", &weight);\n    printf("Height (m): ");\n    scanf("%lf", &height);\n    bmi = weight / (height * height);\n    printf("BMI: %.2f\\n", bmi);\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses scanf for weight", keywords: [{ pattern: "scanf.*weight" }] },
            { id: 2, label: "Uses & operator", keywords: [{ pattern: "&weight" }] },
            { id: 3, label: "Calculates BMI", keywords: [{ pattern: "height\\s*\\*\\s*height" }] },
            { id: 4, label: "Prints BMI", keywords: [{ pattern: "BMI" }] },
          ],
        },
      },
      {
        id: "cf-16",
        title: "Capstone: Simple Calculator",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Now combine everything: variables, I/O, operators, and control flow into a real working calculator. This is a classic first C project that tests all the fundamentals together.",
          },
          {
            type: "code",
            lang: "c",
            label: "Complete calculator implementation",
            content: `#include <stdio.h>

int main() {
    double num1, num2, result;
    char op;

    printf("=== C Calculator ===\\n");
    printf("Enter: number operator number\\n");
    printf("Example: 10 + 5\\n");
    printf("> ");
    scanf("%lf %c %lf", &num1, &op, &num2);

    switch (op) {
        case '+':
            result = num1 + num2;
            printf("%.2lf + %.2lf = %.2lf\\n", num1, num2, result);
            break;
        case '-':
            result = num1 - num2;
            printf("%.2lf - %.2lf = %.2lf\\n", num1, num2, result);
            break;
        case '*':
            result = num1 * num2;
            printf("%.2lf * %.2lf = %.2lf\\n", num1, num2, result);
            break;
        case '/':
            if (num2 == 0) {
                printf("Error: Division by zero!\\n");
            } else {
                result = num1 / num2;
                printf("%.2lf / %.2lf = %.2lf\\n", num1, num2, result);
            }
            break;
        default:
            printf("Error: Unknown operator '%c'\\n", op);
    }
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Always check for division by zero** before dividing. Integer division by zero crashes the program (SIGFPE signal). Double division by zero produces `inf` or `nan` — still wrong for a calculator.",
          },
          {
            type: "quiz",
            question: "Why must we check `if (num2 == 0)` before dividing?",
            options: [
              "Division is very slow",
              "printf cannot display the result",
              "Division by zero crashes the program or gives invalid results",
              "C does not have a / operator",
            ],
            answer: 2,
            explanation:
              "Integer division by zero raises SIGFPE (floating point exception) and crashes the program. Always guard division with a zero check.",
          },
        ],
        challenge: {
          title: "Build the Calculator",
          description:
            "Complete a calculator that reads `num1 op num2` via scanf. Use switch for +,-,*,/. Handle division by zero with `Error: Division by zero`. Print results with 2 decimal places.",
          starterCode: `#include <stdio.h>\n\nint main() {\n    double num1, num2;\n    char op;\n    printf("Enter: num1 op num2: ");\n    scanf("%lf %c %lf", &num1, &op, &num2);\n    switch (op) {\n        /* Add cases for +, -, *, / */\n        default: printf("Unknown operator\\n");\n    }\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint main() {\n    double num1, num2;\n    char op;\n    printf("Enter: num1 op num2: ");\n    scanf("%lf %c %lf", &num1, &op, &num2);\n    switch (op) {\n        case '+': printf("%.2f\\n", num1 + num2); break;\n        case '-': printf("%.2f\\n", num1 - num2); break;\n        case '*': printf("%.2f\\n", num1 * num2); break;\n        case '/':\n            if (num2 == 0) printf("Error: Division by zero\\n");\n            else printf("%.2f\\n", num1 / num2);\n            break;\n        default: printf("Unknown operator\\n");\n    }\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses scanf", keywords: [{ pattern: "scanf" }] },
            { id: 2, label: "Uses switch on operator", keywords: [{ pattern: "switch\\s*\\(\\s*op" }] },
            { id: 3, label: "Handles all 4 operators", keywords: [{ pattern: "case\\s*'\\+'" }] },
            { id: 4, label: "Checks division by zero", keywords: [{ pattern: "num2\\s*==\\s*0" }] },
          ],
        },
      },
    ],
  },
];

export const C_FUNDAMENTALS_CHAPTERS = RAW_C_FUNDAMENTALS_CHAPTERS;

export const C_FUNDAMENTALS_LESSONS = applyLessonVideoLinks(
  C_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  C_FUNDAMENTALS_VIDEO_LINKS,
);

export const C_FUNDAMENTALS_TOTAL_XP = C_FUNDAMENTALS_LESSONS.reduce(
  (sum, l) => sum + l.xp,
  0,
);



