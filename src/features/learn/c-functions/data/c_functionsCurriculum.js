// PolyCode — C Functions full curriculum
// 5 chapters · 13 lessons · C challenges

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { C_FUNCTIONS_VIDEO_LINKS } from "./c_functionsVideoLinks";

const ACCENT = "#e67e22";

const RAW_C_FUNCTIONS_CHAPTERS = [
  {
    id: "func-basics",
    title: "Function Basics",
    icon: "🔧",
    color: ACCENT,
    lessons: [
      {
        id: "cfn-0",
        title: "Declaring and Calling Functions",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "A **function** is a named, reusable block of code. Instead of repeating the same code, you write it once in a function and call it whenever needed. Every C program already uses one function: `main()`. Now you will write your own.",
          },
          {
            type: "code",
            lang: "c",
            label: "Your first custom functions",
            content: `#include <stdio.h>

/* Function DEFINITION: return_type name(parameters) { body } */
void greet(void) {
    printf("Hello from a function!\\n");
}

int square(int n) {
    return n * n;
}

double average(double a, double b) {
    return (a + b) / 2.0;
}

int main() {
    greet();                          /* Call: no return value */
    printf("%d\\n",   square(7));     /* Call: use return value */
    printf("%.1f\\n", average(10, 20)); /* 15.0 */
    return 0;
}`,
          },
          {
            type: "diagram",
            title: "Function anatomy",
            nodes: [
              { id: "ret", label: "Return Type", color: ACCENT, items: ["int, double, void...", "What the function gives back"] },
              { id: "name", label: "Name", color: "#d35400", items: ["Descriptive verb", "square, greet, calculate"] },
              { id: "params", label: "Parameters", color: "#b84000", items: ["Input values", "Type and name each one"] },
              { id: "body", label: "Body", color: "#9a3200", items: ["The code that runs", "return sends result back"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Name functions with **verbs** that describe what they do: `calculateArea()`, `printReport()`, `isValid()`. A good function name makes code self-documenting — you understand what it does without reading the body.",
          },
          {
            type: "quiz",
            question: "What is a function PROTOTYPE in C?",
            options: [
              "The entire function body",
              "A declaration telling the compiler the function name, return type, and parameter types",
              "A comment describing the function",
              "The main() function",
            ],
            answer: 1,
            explanation:
              "A prototype like `int square(int n);` lets you call a function before its full definition appears. It tells the compiler what to expect.",
          },
        ],
        challenge: {
          title: "Cube Function",
          description:
            "Write a function `int cube(int n)` that returns n³. In main, print `Cube of 4 = 64`.",
          starterCode: `#include <stdio.h>\n\n/* Define cube function here */\n\nint main() {\n    /* Call cube(4) and print */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint cube(int n) {\n    return n * n * n;\n}\n\nint main() {\n    printf("Cube of 4 = %d\\n", cube(4));\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Defines cube function", keywords: [{ pattern: "int\\s+cube\\s*\\(" }] },
            { id: 2, label: "Returns n*n*n", keywords: [{ pattern: "n\\s*\\*\\s*n\\s*\\*\\s*n" }] },
            { id: 3, label: "Calls cube(4)", keywords: [{ pattern: "cube\\s*\\(\\s*4\\s*\\)" }] },
          ],
        },
      },
      {
        id: "cfn-1",
        title: "Return Types and void",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "Every C function has a **return type** declared before its name. `void` means the function returns nothing (it just does something). Non-void functions MUST have a `return` statement that sends a value back to the caller.",
          },
          {
            type: "code",
            lang: "c",
            label: "Different return types in action",
            content: `#include <stdio.h>

/* Returns int */
int add(int a, int b) {
    return a + b;
}

/* Returns double */
double celsiusToFahrenheit(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

/* Returns char */
char getGrade(int score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'F';
}

/* Returns nothing — void */
void printDivider(void) {
    printf("--------------------\\n");
}

int main() {
    printf("5 + 3 = %d\\n",       add(5, 3));
    printf("100°C = %.1f°F\\n",   celsiusToFahrenheit(100));
    printf("Grade 85 = %c\\n",    getGrade(85));
    printDivider();
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "A non-void function that reaches the end WITHOUT a `return` statement causes **undefined behavior**. The compiler warns about this with `-Wall`. Always ensure every code path in a non-void function has a `return`.",
          },
          {
            type: "quiz",
            question: "When should you use `void` as a return type?",
            options: [
              "When the function returns 0",
              "When the function performs an action but does not need to send a value back",
              "When the function has no parameters",
              "void is not valid in modern C",
            ],
            answer: 1,
            explanation:
              "void means 'no return value'. Functions that print output, modify global state, or perform side effects without needing to send data back use void.",
          },
        ],
        challenge: {
          title: "Max of Two",
          description:
            "Write `int max(int a, int b)` that returns the larger number using if-else. Test with max(15, 23) — print `Max: 23`.",
          starterCode: `#include <stdio.h>\n\nint max(int a, int b) {\n    /* Return the larger value */\n}\n\nint main() {\n    printf("Max: %d\\n", max(15, 23));\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint max(int a, int b) {\n    if (a > b) return a;\n    return b;\n}\n\nint main() {\n    printf("Max: %d\\n", max(15, 23));\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Function returns the larger value", keywords: [{ pattern: "return\\s+a|return\\s+b" }] },
            { id: 2, label: "Calls max(15, 23)", keywords: [{ pattern: "max\\s*\\(\\s*15" }] },
            { id: 3, label: "Prints Max: 23", keywords: [{ pattern: "Max" }] },
          ],
        },
      },
      {
        id: "cfn-2",
        title: "Function Prototypes and Headers",
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              "In real C projects, functions are split across multiple files. A **header file** (`.h`) contains prototypes. Source files include the header and provide implementations. **Header guards** prevent double inclusion.",
          },
          {
            type: "code",
            lang: "c",
            label: "Header file and source file pattern",
            content: `/* ===== math_utils.h ===== */
#ifndef MATH_UTILS_H    /* Header guard: prevent double inclusion */
#define MATH_UTILS_H

/* Function prototypes — just the signatures, no bodies */
int     factorial(int n);
int     isPrime(int n);
double  circleArea(double radius);

#endif  /* MATH_UTILS_H */

/* ===== math_utils.c ===== */
#include "math_utils.h"
#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int isPrime(int n) {
    if (n < 2) return 0;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return 0;
    return 1;
}

/* ===== main.c ===== */
/* #include "math_utils.h" */
/* int main() { printf("%d\\n", factorial(5)); } */`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**`#include <stdio.h>`** (angle brackets) searches the system include path for standard library headers. **`#include \"math_utils.h\"`** (quotes) searches the current directory first, then system paths. Use quotes for your own headers.",
          },
          {
            type: "quiz",
            question: "What do header guards (`#ifndef / #define / #endif`) prevent?",
            options: [
              "Runtime errors",
              "A header file from being included more than once in the same compilation unit",
              "Syntax errors in the header",
              "Memory leaks",
            ],
            answer: 1,
            explanation:
              "Including a header twice would cause duplicate declarations/definitions, leading to compile errors. Header guards ensure the content is only processed once.",
          },
        ],
        challenge: {
          title: "Prototype First",
          description:
            "Write a prototype for `double power(double base, int exp)` ABOVE main. Define the function BELOW main. In main print `power(2.0, 10)` → `1024.00`.",
          starterCode: `#include <stdio.h>\n\n/* Write prototype here */\n\nint main() {\n    printf("%.2f\\n", power(2.0, 10));\n    return 0;\n}\n\n/* Write implementation here */`,
          solutionCode: `#include <stdio.h>\n\ndouble power(double base, int exp);\n\nint main() {\n    printf("%.2f\\n", power(2.0, 10));\n    return 0;\n}\n\ndouble power(double base, int exp) {\n    double result = 1.0;\n    for (int i = 0; i < exp; i++) result *= base;\n    return result;\n}`,
          tests: [
            { id: 1, label: "Has prototype before main", keywords: [{ pattern: "double\\s+power\\s*\\(double" }] },
            { id: 2, label: "Has implementation after main", keywords: [{ pattern: "result\\s*\\*=\\s*base" }] },
          ],
        },
      },
    ],
  },
  {
    id: "params-args",
    title: "Parameters & Arguments",
    icon: "📤",
    color: "#d35400",
    lessons: [
      {
        id: "cfn-3",
        title: "Pass by Value",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "C passes function arguments **by value** — the function receives a **copy** of each argument. Changes inside the function do NOT affect the original variables. This is safe but means you cannot modify the caller's variables directly.",
          },
          {
            type: "code",
            lang: "c",
            label: "Pass by value demonstration",
            content: `#include <stdio.h>

void tryToDouble(int x) {
    x = x * 2;    /* Modifies the LOCAL copy — not the original */
    printf("Inside tryToDouble: x = %d\\n", x);
}

void addTen(double value) {
    value += 10;  /* Local copy only */
    printf("Inside addTen: value = %.1f\\n", value);
}

int main() {
    int num = 10;
    tryToDouble(num);
    printf("After call: num = %d\\n", num);   /* Still 10! */

    double price = 29.99;
    addTen(price);
    printf("After call: price = %.2f\\n", price); /* Still 29.99! */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "To actually MODIFY a variable from inside a function, you must pass its **address** (a pointer — covered in C Pointers course). Pass by value is perfect for reading and computing; pointers are needed for writing back.",
          },
          {
            type: "quiz",
            question: "After calling `tryToDouble(num)`, what is the value of `num` in main?",
            options: [
              "It doubled — pass by value modifies the original",
              "Unchanged — pass by value copies the variable",
              "Zero — functions reset variables",
              "Undefined",
            ],
            answer: 1,
            explanation:
              "Pass by value gives the function its own copy. The function's `x` and main's `num` are completely separate variables in different memory locations.",
          },
        ],
        challenge: {
          title: "Swap Demonstration",
          description:
            "Write `void swap(int a, int b)` that swaps inside and prints `Inside: a=20 b=10`. Show main prints `Outside: x=10 y=20` (unchanged).",
          starterCode: `#include <stdio.h>\n\nvoid swap(int a, int b) {\n    /* Swap a and b, print them */\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(x, y);\n    printf("Outside: x=%d y=%d\\n", x, y);\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nvoid swap(int a, int b) {\n    int temp = a;\n    a = b;\n    b = temp;\n    printf("Inside: a=%d b=%d\\n", a, b);\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(x, y);\n    printf("Outside: x=%d y=%d\\n", x, y);\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses temp variable for swap", keywords: [{ pattern: "temp" }] },
            { id: 2, label: "Prints Inside values", keywords: [{ pattern: "Inside" }] },
            { id: 3, label: "Prints Outside values unchanged", keywords: [{ pattern: "Outside" }] },
          ],
        },
      },
      {
        id: "cfn-4",
        title: "Multiple Parameters",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "Functions can take multiple parameters of different types. Each parameter is declared with its type. C can only return ONE value — for multiple outputs, use pointers or structs (covered in later courses).",
          },
          {
            type: "code",
            lang: "c",
            label: "Functions with multiple parameters",
            content: `#include <stdio.h>

/* Rectangle calculations */
double area(double w, double h) {
    return w * h;
}

double perimeter(double w, double h) {
    return 2 * (w + h);
}

/* Three parameters */
int clamp(int value, int minVal, int maxVal) {
    if (value < minVal) return minVal;
    if (value > maxVal) return maxVal;
    return value;
}

/* Returns 1 (true) or 0 (false) */
int isBetween(int n, int low, int high) {
    return (n >= low && n <= high);
}

int main() {
    printf("Area:       %.2f\\n", area(5.0, 3.0));
    printf("Perimeter:  %.2f\\n", perimeter(5.0, 3.0));
    printf("Clamp 150:  %d\\n",   clamp(150, 0, 100));
    printf("Is 42 in [1,100]? %s\\n", isBetween(42,1,100) ? "Yes" : "No");
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "**Ternary operator** `condition ? value_if_true : value_if_false` is a compact way to choose between two values. `isBetween(42,1,100) ? \"Yes\" : \"No\"` is shorter than a full if-else block.",
          },
          {
            type: "quiz",
            question: "How many values can a C function return with a single `return` statement?",
            options: ["As many as needed", "Two at most", "Exactly one", "None — return is optional"],
            answer: 2,
            explanation:
              "A C function returns exactly one value (or void). For multiple return values, use output pointer parameters or pack values into a struct.",
          },
        ],
        challenge: {
          title: "Temperature Converter",
          description:
            "Write `double celsiusToFahrenheit(double c)` returning `c*9/5+32`. Also `double fahrenheitToCelsius(double f)` returning `(f-32)*5/9`. Print both for 100°C and 212°F.",
          starterCode: `#include <stdio.h>\n\ndouble celsiusToFahrenheit(double c) {\n    /* formula: c*9/5+32 */\n}\n\ndouble fahrenheitToCelsius(double f) {\n    /* formula: (f-32)*5/9 */\n}\n\nint main() {\n    printf("100C = %.1fF\\n", celsiusToFahrenheit(100.0));\n    printf("212F = %.1fC\\n", fahrenheitToCelsius(212.0));\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\ndouble celsiusToFahrenheit(double c) {\n    return c * 9.0 / 5.0 + 32.0;\n}\n\ndouble fahrenheitToCelsius(double f) {\n    return (f - 32.0) * 5.0 / 9.0;\n}\n\nint main() {\n    printf("100C = %.1fF\\n", celsiusToFahrenheit(100.0));\n    printf("212F = %.1fC\\n", fahrenheitToCelsius(212.0));\n    return 0;\n}`,
          tests: [
            { id: 1, label: "celsiusToFahrenheit defined", keywords: [{ pattern: "celsiusToFahrenheit" }] },
            { id: 2, label: "fahrenheitToCelsius defined", keywords: [{ pattern: "fahrenheitToCelsius" }] },
            { id: 3, label: "Uses 9.0/5.0 formula", keywords: [{ pattern: "9\\.0" }] },
          ],
        },
      },
    ],
  },
  {
    id: "recursion",
    title: "Recursion",
    icon: "🔁",
    color: "#b84000",
    lessons: [
      {
        id: "cfn-5",
        title: "What is Recursion?",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "A **recursive function** calls itself. Every recursive function needs exactly two things: a **base case** (stops the recursion) and a **recursive case** (calls itself with a simpler/smaller problem). Without a reachable base case, recursion runs forever and crashes with a stack overflow.",
          },
          {
            type: "code",
            lang: "c",
            label: "Countdown — your first recursive function",
            content: `#include <stdio.h>

void countdown(int n) {
    /* BASE CASE: stop when n reaches 0 */
    if (n <= 0) {
        printf("Blast off!\\n");
        return;
    }
    /* RECURSIVE CASE: print, then call with smaller n */
    printf("%d...\\n", n);
    countdown(n - 1);  /* Same function, simpler problem */
}

/* Recursive sum: 1 + 2 + ... + n */
int sum(int n) {
    if (n <= 0) return 0;          /* base case */
    return n + sum(n - 1);         /* recursive case */
}

int main() {
    countdown(5);
    printf("Sum 1-10 = %d\\n", sum(10));  /* 55 */
    return 0;
}`,
          },
          {
            type: "diagram",
            title: "How countdown(3) unwinds",
            nodes: [
              { id: "c3", label: "countdown(3)", color: ACCENT, items: ["prints 3...", "calls countdown(2)"] },
              { id: "c2", label: "countdown(2)", color: "#d35400", items: ["prints 2...", "calls countdown(1)"] },
              { id: "c1", label: "countdown(1)", color: "#b84000", items: ["prints 1...", "calls countdown(0)"] },
              { id: "c0", label: "countdown(0)", color: "#9a3200", items: ["BASE CASE!", "prints Blast off!"] },
            ],
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Stack overflow** happens when recursion goes too deep (no base case, or base case never reached). Each function call uses stack memory. Typically C allows around 1,000–10,000 nested calls before the stack is exhausted.",
          },
          {
            type: "quiz",
            question: "What causes a stack overflow in a recursive function?",
            options: [
              "Having too many parameters",
              "Missing or unreachable base case — recursion never stops",
              "Using printf inside the function",
              "Returning a value",
            ],
            answer: 1,
            explanation:
              "Each call adds a stack frame. Without a reachable base case, calls pile up until the stack runs out of memory — stack overflow.",
          },
        ],
        challenge: {
          title: "Recursive Power",
          description:
            "Write `long long power(int base, int exp)` recursively. Base case: `power(x, 0) = 1`. Recursive: `base * power(base, exp-1)`. Print `power(3, 5)` → `243`.",
          starterCode: `#include <stdio.h>\n\nlong long power(int base, int exp) {\n    /* Base case + recursive case */\n}\n\nint main() {\n    printf("3^5 = %lld\\n", power(3, 5));\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nlong long power(int base, int exp) {\n    if (exp == 0) return 1;\n    return base * power(base, exp - 1);\n}\n\nint main() {\n    printf("3^5 = %lld\\n", power(3, 5));\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Base case exp == 0 returns 1", keywords: [{ pattern: "exp\\s*==\\s*0" }] },
            { id: 2, label: "Recursive multiplication", keywords: [{ pattern: "base\\s*\\*\\s*power" }] },
            { id: 3, label: "Calls power(3,5)", keywords: [{ pattern: "power\\s*\\(\\s*3\\s*,\\s*5" }] },
          ],
        },
      },
      {
        id: "cfn-6",
        title: "Factorial and Fibonacci",
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              "**Factorial** (n!) multiplies all positive integers up to n. **Fibonacci** produces a sequence where each number is the sum of the two before it. Both have elegant recursive solutions that mirror their mathematical definitions.",
          },
          {
            type: "code",
            lang: "c",
            label: "Factorial and Fibonacci recursion",
            content: `#include <stdio.h>

/* n! = n × (n-1) × ... × 1    (0! = 1 by definition) */
long long factorial(int n) {
    if (n <= 1) return 1;           /* base case: 0! = 1! = 1 */
    return n * factorial(n - 1);    /* recursive case */
}

/* fib(0)=0, fib(1)=1, fib(n)=fib(n-1)+fib(n-2) */
int fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    /* Print factorials 0! to 10! */
    for (int i = 0; i <= 10; i++)
        printf("%2d! = %lld\\n", i, factorial(i));

    /* Print first 10 Fibonacci numbers */
    printf("\\nFibonacci: ");
    for (int i = 0; i < 10; i++)
        printf("%d ", fibonacci(i));
    printf("\\n");
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Naive recursive Fibonacci is exponentially slow!** `fibonacci(40)` makes over 300 million calls. For large n, use an iterative approach or memoization (store previously computed values). Recursive Fibonacci is great for learning, not production.",
          },
          {
            type: "quiz",
            question: "What is the base case for recursive factorial?",
            options: ["n == 10", "n >= 1", "n <= 1 returns 1", "n == 0 returns n"],
            answer: 2,
            explanation:
              "Both 0! and 1! equal 1 by definition. The condition `n <= 1 return 1` handles both cases correctly.",
          },
        ],
        challenge: {
          title: "Fibonacci with Memoization",
          description:
            "Write recursive `int fib(int n)` for Fibonacci. Print the first 10 numbers: `0 1 1 2 3 5 8 13 21 34`.",
          starterCode: `#include <stdio.h>\n\nint fib(int n) {\n    /* Two base cases + recursive case */\n}\n\nint main() {\n    for (int i = 0; i < 10; i++)\n        printf("%d ", fib(i));\n    printf("\\n");\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fib(n-1) + fib(n-2);\n}\n\nint main() {\n    for (int i = 0; i < 10; i++)\n        printf("%d ", fib(i));\n    printf("\\n");\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Two base cases", keywords: [{ pattern: "n\\s*==\\s*1" }] },
            { id: 2, label: "Recursive sum", keywords: [{ pattern: "fib\\s*\\(\\s*n\\s*-\\s*1\\s*\\)\\s*\\+\\s*fib" }] },
          ],
        },
      },
    ],
  },
  {
    id: "scope-storage",
    title: "Scope & Storage Classes",
    icon: "📦",
    color: "#9a4800",
    lessons: [
      {
        id: "cfn-7",
        title: "Local vs Global Variables",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "**Scope** defines where a variable is accessible. **Local variables** exist only inside the function or block where they are declared. **Global variables** are declared outside all functions and accessible everywhere in the file.",
          },
          {
            type: "code",
            lang: "c",
            label: "Local and global scope",
            content: `#include <stdio.h>

int globalCount = 0;    /* GLOBAL: lives for entire program */

void increment(void) {
    int localTemp = 10; /* LOCAL: created each call, destroyed on return */
    globalCount++;
    printf("localTemp=%d, globalCount=%d\\n", localTemp, globalCount);
}

/* Block scope: variables in {} blocks */
void blockScope(void) {
    int x = 1;
    {
        int x = 2;          /* Different x — shadows outer x */
        printf("Inner x: %d\\n", x);   /* 2 */
    }
    printf("Outer x: %d\\n", x);       /* 1 */
}

int main() {
    increment();   /* localTemp=10, globalCount=1 */
    increment();   /* localTemp=10, globalCount=2 */
    increment();   /* localTemp=10, globalCount=3 */
    blockScope();
    /* printf("%d", localTemp); ERROR: not in scope */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "**Minimize global variables!** They make programs hard to debug because any function can modify them. If two functions both change a global, tracking bugs becomes very difficult. Use function parameters and return values instead.",
          },
          {
            type: "quiz",
            question: "A local variable declared inside a function is accessible:",
            options: [
              "Everywhere in the program",
              "Only inside that specific function",
              "Only in main()",
              "Only after the function returns",
            ],
            answer: 1,
            explanation:
              "Local variables have function scope — they are born when the function is called and die when it returns. They are completely invisible outside the function.",
          },
        ],
        challenge: {
          title: "Call Counter",
          description:
            "Use a global `int count = 0`. Write `void tick()` that increments count and prints `Count: N`. Call tick() 3 times. Output: Count: 1, Count: 2, Count: 3.",
          starterCode: `#include <stdio.h>\n\nint count = 0;\n\nvoid tick(void) {\n    /* Increment count and print */\n}\n\nint main() {\n    tick(); tick(); tick();\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint count = 0;\n\nvoid tick(void) {\n    count++;\n    printf("Count: %d\\n", count);\n}\n\nint main() {\n    tick(); tick(); tick();\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Global count variable", keywords: [{ pattern: "int\\s+count\\s*=\\s*0" }] },
            { id: 2, label: "Increments count", keywords: [{ pattern: "count\\+\\+" }] },
            { id: 3, label: "Prints Count:", keywords: [{ pattern: "Count:" }] },
          ],
        },
      },
      {
        id: "cfn-8",
        title: "static Variables and extern",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A **static local variable** is initialized only once and retains its value between function calls — unlike regular locals which reset each call. **extern** allows one source file to access a global variable defined in another file.",
          },
          {
            type: "code",
            lang: "c",
            label: "static vs regular local",
            content: `#include <stdio.h>

void withStatic(void) {
    static int callCount = 0;  /* Initialized ONCE, persists */
    callCount++;
    printf("Called %d time(s)\\n", callCount);
}

void withoutStatic(void) {
    int callCount = 0;         /* Reset every call */
    callCount++;
    printf("Always: %d\\n", callCount);  /* Always 1 */
}

/* Automatic ID generator using static */
int nextID(void) {
    static int id = 100;   /* Starts at 100, increments each call */
    return id++;
}

int main() {
    withStatic();     /* Called 1 time(s) */
    withStatic();     /* Called 2 time(s) */
    withStatic();     /* Called 3 time(s) */
    withoutStatic();  /* Always: 1 */
    withoutStatic();  /* Always: 1 */

    printf("IDs: %d %d %d\\n", nextID(), nextID(), nextID());
    /* 100 101 102 */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**static** has TWO different meanings in C: 1) For local variables — persists between calls. 2) For global variables/functions — limits visibility to the current file only (prevents name clashes between files). The keyword is overloaded!",
          },
          {
            type: "quiz",
            question: "A `static` local variable inside a function:",
            options: [
              "Resets to its initial value on every function call",
              "Is visible to all other functions",
              "Retains its value between calls to that function",
              "Cannot be modified",
            ],
            answer: 2,
            explanation:
              "Static locals are stored in the data segment (not the stack) so they survive between calls, while remaining scoped to the function.",
          },
        ],
        challenge: {
          title: "ID Generator",
          description:
            "Write `int generateID()` using a static variable starting at 1000. Each call returns the next ID. Call it 5 times and print each. Expected: 1000 1001 1002 1003 1004.",
          starterCode: `#include <stdio.h>\n\nint generateID(void) {\n    /* Use static variable */\n}\n\nint main() {\n    for (int i = 0; i < 5; i++)\n        printf("ID: %d\\n", generateID());\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint generateID(void) {\n    static int id = 1000;\n    return id++;\n}\n\nint main() {\n    for (int i = 0; i < 5; i++)\n        printf("ID: %d\\n", generateID());\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Uses static variable", keywords: [{ pattern: "static\\s+int" }] },
            { id: 2, label: "Starts at 1000", keywords: [{ pattern: "1000" }] },
            { id: 3, label: "Returns and increments", keywords: [{ pattern: "return\\s+id\\+\\+|return\\s+id" }] },
          ],
        },
      },
    ],
  },
  {
    id: "func-pointers",
    title: "Function Pointers & Callbacks",
    icon: "👉",
    color: "#7a3a00",
    lessons: [
      {
        id: "cfn-9",
        title: "Pointers to Functions",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "In C, functions have memory addresses just like variables. A **function pointer** stores the address of a function and lets you call it indirectly. This enables callbacks, plugin systems, and sorting with custom comparators.",
          },
          {
            type: "code",
            lang: "c",
            label: "Function pointers step by step",
            content: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main() {
    /* Declare a function pointer: return_type (*name)(param_types) */
    int (*operation)(int, int);

    operation = add;
    printf("add(10,5) = %d\\n", operation(10, 5));  /* 15 */

    operation = sub;
    printf("sub(10,5) = %d\\n", operation(10, 5));  /* 5  */

    operation = mul;
    printf("mul(10,5) = %d\\n", operation(10, 5));  /* 50 */

    /* Array of function pointers */
    int (*ops[3])(int, int) = {add, sub, mul};
    char *names[] = {"add", "sub", "mul"};
    for (int i = 0; i < 3; i++)
        printf("%s(8,4) = %d\\n", names[i], ops[i](8, 4));

    /* typedef makes it readable */
    typedef int (*MathOp)(int, int);
    MathOp op = add;
    printf("via typedef: %d\\n", op(3, 4));  /* 7 */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Use `typedef` to give function pointer types a readable name: `typedef int (*MathOp)(int, int);` then use `MathOp op = add;` instead of `int (*op)(int,int) = add;`. Much cleaner in real code.",
          },
          {
            type: "quiz",
            question: "What is the correct way to declare a pointer to `double compute(double x)`?",
            options: ["double *compute(double x)", "double (*ptr)(double)", "ptr *double(double)", "function<double(double)> ptr"],
            answer: 1,
            explanation:
              "The pattern is: return_type (*pointer_name)(parameter_types). Parentheses around *ptr are required — without them `double *ptr(double)` means a function returning double*.",
          },
        ],
        challenge: {
          title: "Math Operation Table",
          description:
            "Store add, sub, mul in array `int (*ops[3])(int,int)`. Loop through and print results with operands (8, 4): `add=12`, `sub=4`, `mul=32`.",
          starterCode: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main() {\n    char *names[] = {"add", "sub", "mul"};\n    int (*ops[3])(int, int) = {add, sub, mul};\n    /* Loop and call each */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nint mul(int a, int b) { return a * b; }\n\nint main() {\n    char *names[] = {"add", "sub", "mul"};\n    int (*ops[3])(int, int) = {add, sub, mul};\n    for (int i = 0; i < 3; i++)\n        printf("%s=%d\\n", names[i], ops[i](8, 4));\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Array of function pointers", keywords: [{ pattern: "\\(\\*ops\\[" }] },
            { id: 2, label: "Calls through pointer in loop", keywords: [{ pattern: "ops\\[i\\]\\(8" }] },
          ],
        },
      },
      {
        id: "cfn-10",
        title: "Callbacks: qsort and Custom Comparators",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A **callback** is a function you pass to another function as an argument. The classic C example is `qsort()` from `<stdlib.h>` — it sorts any array using a comparator function you provide. This is C's way of doing what modern languages call higher-order functions.",
          },
          {
            type: "code",
            lang: "c",
            label: "qsort with custom comparators",
            content: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Comparator for ascending int sort */
int ascInt(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
    /* Negative: a before b | Zero: equal | Positive: b before a */
}

/* Comparator for descending int sort */
int descInt(const void *a, const void *b) {
    return (*(int*)b - *(int*)a);
}

/* Comparator for string sort */
int strComp(const void *a, const void *b) {
    return strcmp(*(char**)a, *(char**)b);
}

void printArr(int *arr, int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int nums[] = {5, 2, 8, 1, 9, 3, 7};
    int n = 7;

    qsort(nums, n, sizeof(int), ascInt);
    printf("Ascending:  "); printArr(nums, n);
    /* 1 2 3 5 7 8 9 */

    qsort(nums, n, sizeof(int), descInt);
    printf("Descending: "); printArr(nums, n);
    /* 9 8 7 5 3 2 1 */

    char *words[] = {"banana", "apple", "cherry", "date"};
    qsort(words, 4, sizeof(char*), strComp);
    for (int i = 0; i < 4; i++) printf("%s ", words[i]);
    printf("\\n");  /* apple banana cherry date */
    return 0;
}`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "**qsort comparator rules**: Return NEGATIVE if a should come BEFORE b. Return ZERO if equal. Return POSITIVE if b should come BEFORE a. For integers, `a - b` gives ascending order, `b - a` gives descending.",
          },
          {
            type: "quiz",
            question: "In a qsort comparator, what should you return if element `a` should come BEFORE element `b`?",
            options: ["A positive number", "Zero", "A negative number", "1 always"],
            answer: 2,
            explanation:
              "Negative return = a comes first (a < b). Zero = equal, keep order. Positive = b comes first (a > b).",
          },
        ],
        challenge: {
          title: "Command Dispatcher",
          description:
            "Create a struct `Command` with `name` and `handler` (void function pointer). Map 3 commands (hello→Hello!, bye→Goodbye!, time→No time!) and dispatch each.",
          starterCode: `#include <stdio.h>\n#include <string.h>\n\nvoid cmdHello(void) { printf("Hello!\\n"); }\nvoid cmdBye(void)   { printf("Goodbye!\\n"); }\nvoid cmdTime(void)  { printf("No time!\\n"); }\n\ntypedef struct {\n    char name[20];\n    void (*handler)(void);\n} Command;\n\nint main() {\n    Command cmds[] = {\n        {"hello", cmdHello},\n        {"bye",   cmdBye},\n        {"time",  cmdTime},\n    };\n    char *inputs[] = {"hello", "bye", "time"};\n    /* Dispatch each input to its handler */\n    return 0;\n}`,
          solutionCode: `#include <stdio.h>\n#include <string.h>\n\nvoid cmdHello(void) { printf("Hello!\\n"); }\nvoid cmdBye(void)   { printf("Goodbye!\\n"); }\nvoid cmdTime(void)  { printf("No time!\\n"); }\n\ntypedef struct {\n    char name[20];\n    void (*handler)(void);\n} Command;\n\nint main() {\n    Command cmds[] = {\n        {"hello", cmdHello},\n        {"bye",   cmdBye},\n        {"time",  cmdTime},\n    };\n    char *inputs[] = {"hello", "bye", "time"};\n    for (int i = 0; i < 3; i++)\n        for (int j = 0; j < 3; j++)\n            if (strcmp(inputs[i], cmds[j].name) == 0)\n                cmds[j].handler();\n    return 0;\n}`,
          tests: [
            { id: 1, label: "Struct with function pointer", keywords: [{ pattern: "void\\s*\\(\\*handler\\)" }] },
            { id: 2, label: "Uses strcmp for dispatch", keywords: [{ pattern: "strcmp" }] },
            { id: 3, label: "Calls handler", keywords: [{ pattern: "\\.handler\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },
];

export const C_FUNCTIONS_CHAPTERS = RAW_C_FUNCTIONS_CHAPTERS;

export const C_FUNCTIONS_LESSONS = applyLessonVideoLinks(
  C_FUNCTIONS_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  C_FUNCTIONS_VIDEO_LINKS,
);

export const C_FUNCTIONS_TOTAL_XP = C_FUNCTIONS_LESSONS.reduce(
  (sum, l) => sum + l.xp,
  0,
);
