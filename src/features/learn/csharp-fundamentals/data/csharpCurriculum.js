// PolyCode — C# Fundamentals Interactive Course
// 5 chapters · 13 lessons · Browser sandbox validation
// Extended reference architectures live in the backend Docs Hub

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { CSHARP_VIDEO_LINKS } from "./csharpVideoLinks";

const ACCENT = "#179c24"; // Distinct .NET Green branding color

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function text(content, codeBlock = null) {
  if (codeBlock) {
    return {
      type: "text",
      content,
      code: { lang: "csharp", ...codeBlock },
    };
  }
  return { type: "text", content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const CSHARP_CHAPTERS = [
  {
    id: "basics",
    title: "C# Basics & Console I/O",
    icon: "🚀",
    color: ACCENT,
    lessons: [
      {
        id: "cs-0",
        title: "Introduction & Hello World",
        xp: 10,
        theory: [
          text(
            "**C#** is a modern, object-oriented programming language created by Microsoft. It runs on the cross-platform **.NET framework** and powers everything from enterprise web services to high-performance games inside the **Unity Engine**.",
            {
              label: "The anatomy of a basic program",
              content: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, PolyCode!");
    }
}`,
            }
          ),
          text(
            "C# is a **strongly-typed, compiled** language. Your source code is checked thoroughly by a compiler before it can execute. The compiler generates an intermediate bytecode format which runs securely inside the **Common Language Runtime (CLR)** engine.",
          ),
          diagram("The .NET compilation pipeline", [
            {
              id: "source",
              label: "Source Code",
              color: "#3b82f6",
              items: ["Your Program.cs file", "Strict syntax checks"],
            },
            {
              id: "compiler",
              label: "C# Compiler",
              color: ACCENT,
              items: ["Transforms to IL", "Builds executable binaries"],
            },
            {
              id: "clr",
              label: "Runtime (CLR)",
              color: "#f59e0b",
              items: ["JIT Compilation", "Machine executes code"],
            },
          ]),
          callout(
            "tip",
            "C# is case-sensitive, and **every single complete statement must end with a semicolon (;)**, or the compiler will refuse to run your application.",
          ),
          quiz(
            "Which engine is responsible for running your compiled C# program?",
            [
              "The browser layout engine",
              "The Common Language Runtime (CLR)",
              "A standard text parser framework",
              "The terminal bash pipeline",
            ],
            1,
            "The compiler outputs Intermediate Language (IL), which the CLR executes at runtime.",
          ),
        ],
        challenge: {
          title: "Hello, PolyCode!",
          description: "Modify the inner logic statement inside the Main method to print exactly: `Hello, PolyCode!`",
          starterCode: `using System;

class Program {
    static void Main() {
        // Write your output statement below
        
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, PolyCode!");
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Console.WriteLine",
              keywords: [{ pattern: "Console\\.WriteLine\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints target message string",
              keywords: [{ pattern: "Hello,\\s*PolyCode!" }],
            },
          ],
        },
      },
      {
        id: "cs-1",
        title: "Variables & Primitive Types",
        xp: 12,
        theory: [
          text(
            "Because C# is strongly-typed, every variable must have a designated type declaration. You cannot save words in an integer container or numbers inside a true/false container.",
            {
              label: "Explicit static type assignments",
              content: `int points = 100;
double price = 19.99;
string player = "John";
bool active = true;`,
            }
          ),
          text(
            "Strings are bound within **double quotes (`\"text\"`)**, whereas an isolated character (`char`) is bounded strictly with **single quotes (`'A'`)**.",
          ),
          callout(
            "warning",
            "Swapping quotes on strings or characters (e.g., matching a char with double quotes) will trigger an immediate compile failure.",
          ),
          quiz(
            "Which type is ideal for managing fractional float decimals like 99.45?",
            ["int", "double", "char", "bool"],
            1,
            "double manages fractional precision floating-point numbers.",
          ),
        ],
        challenge: {
          title: "Declaring Variables",
          description: "Declare an integer variable named `ammo` initialized to `30`, and a double variable named `speed` set to `5.5`.",
          starterCode: `using System;

class Program {
    static void Main() {
        // Declare your variables below
        
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int ammo = 30;
        double speed = 5.5;
    }
}`,
          tests: [
            { id: 1, label: "Declares int ammo", keywords: [{ pattern: "int\\s+ammo\\s*=\\s*30" }] },
            { id: 2, label: "Declares double speed", keywords: [{ pattern: "double\\s+speed\\s*=\\s*5\\.5" }] },
          ],
        },
      },
      {
        id: "cs-2",
        title: "Type Casting & Conversion",
        xp: 12,
        theory: [
          text(
            "Moving data between variable structures requires type conversion rules. **Implicit casting** is automatic because no data is lost. **Explicit casting** must be done manually because data fraction loss can occur.",
            {
              label: "Implicit vs Explicit conversion behaviors",
              content: `int regularNumber = 45;
double floatContainer = regularNumber; // Implicit - 100% safe automatic move

double fractionalPrice = 9.99;
int truncatedWhole = (int)fractionalPrice; // Explicit - drops decimals entirely (results in 9)`,
            }
          ),
          text(
            "When turning parsed text inputs into true numeric datatypes for computing math, invoke the helper conversion structures.",
            {
              label: "Invoking the Convert class utilities",
              content: `string inputString = "250";
int parsedMetric = Convert.ToInt32(inputString);
Console.WriteLine(parsedMetric + 5); // Compiles to 255`,
            }
          ),
          callout(
            "tip",
            "Explicit casting `(int)` does not round numbers up or down. It strictly cuts off the decimal fraction.",
          ),
          quiz(
            "What value remains inside x after executing: double y = 7.85; int x = (int)y;",
            ["7.85", "8", "7", "0"],
            2,
            "Manual explicit casting truncates decimals entirely, leaving exactly 7.",
          ),
        ],
        challenge: {
          title: "Parse the Input",
          description: "Convert the string variable `rawXp` into an integer variable named `addedXp` using `Convert.ToInt32()`.",
          starterCode: `using System;

class Program {
    static void Main() {
        string rawXp = "500";
        // Convert string to int below
        
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        string rawXp = "500";
        int addedXp = Convert.ToInt32(rawXp);
    }
}`,
          tests: [
            { id: 1, label: "Invokes Convert.ToInt32", keywords: [{ pattern: "Convert\\.ToInt32\\s*\\(" }] },
            { id: 2, label: "Saves into int addedXp", keywords: [{ pattern: "int\\s+addedXp\\s*=" }] },
          ],
        },
      },
    ],
  },
  {
    id: "logic",
    title: "Control Flow & Logic",
    icon: "🔤",
    color: "#eab308",
    lessons: [
      {
        id: "cs-3",
        title: "Conditional Logic (if/else)",
        xp: 12,
        theory: [
          text(
            "Conditionals dictate execution path tracking using boolean evaluation targets. Relational checks match typical operators (`==`, `!=`, `>`, `<`, `>=`, `<=`).",
            {
              label: "Conditional evaluation branching chains",
              content: `int life = 75;

if (life >= 90) {
    Console.WriteLine("Healthy");
} else if (life >= 50) {
    Console.WriteLine("Warning");
} else {
    Console.WriteLine("Danger");
}`,
            }
          ),
          text(
            "Shorthand evaluation queries can bypass multi-line conditions using inline **ternary expressions**.",
            {
              label: "Inline conditional assignment via ternary",
              content: `int points = 120;
string rank = points > 100 ? "Pro" : "Rookie";`,
            }
          ),
          quiz(
            "Which logical combination evaluation checks if both statements are simultaneously true?",
            ["||", "&&", "!", "=="],
            1,
            "The short-circuit AND operator (&&) verifies compound conditions.",
          ),
        ],
        challenge: {
          title: "Speed Trap Logic",
          description: "Write an if/else check: if `speed` is greater than `60`, write `\"Danger\"` using `Console.WriteLine`, else write `\"Safe\"`.",
          starterCode: `using System;

class Program {
    static void Main() {
        int speed = 80;
        // Construct your condition below
        
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int speed = 80;
        if (speed > 60) {
            Console.WriteLine("Danger");
        } else {
            Console.WriteLine("Safe");
        }
    }
}`,
          tests: [
            { id: 1, label: "Implements conditional branch structure", keywords: [{ pattern: "if\\s*\\(" }] },
            { id: 2, label: "Outputs correct evaluation string token", keywords: [{ pattern: "[\"']Danger[\"']" }] },
          ],
        },
      },
      {
        id: "cs-4",
        title: "Modern Switch Expressions",
        xp: 14,
        theory: [
          text(
            "Modern versions of C# feature a highly streamlined syntax layout alternative to traditional boilerplate switch blocks called **Switch Expressions**.",
            {
              label: "Direct assignment mapping syntax comparison",
              content: `int selectionCode = 2;
              
string productType = selectionCode switch {
    1 => "Weapon Upgrade",
    2 => "Shield Boost",
    3 => "Health Potion",
    _ => "Standard Item" // The underscore (_) is the default fallback
};

Console.WriteLine(productType);`,
            }
          ),
          callout(
            "tip",
            "The discard operator token (`_`) functions identically to a classic standard `default:` evaluation break case.",
          ),
          quiz(
            "What special discard literal token acts as the catch-all default fallback inside a switch expression pattern?",
            ["*", "default", "=>", "_"],
            3,
            "The underscore symbol (_) maps structural default fallback configurations.",
          ),
        ],
        challenge: {
          title: "Weapon Select Mapping",
          description: "Complete the switch expression to map id `1` to `\"Sword\"`, id `2` to `\"Shield\"`, and any fallback value to `\"Fists\"`.",
          starterCode: `using System;

class Program {
    static void Main() {
        int weaponId = 1;
        string choice = weaponId switch {
            // Write switch assignment expressions below
            
        };
        Console.WriteLine(choice);
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int weaponId = 1;
        string choice = weaponId switch {
            1 => "Sword",
            2 => "Shield",
            _ => "Fists"
        };
        Console.WriteLine(choice);
    }
}`,
          tests: [
            { id: 1, label: "Maps item token index 1 option", keywords: [{ pattern: "1\\s*=>\\s*[\"']Sword[\"']" }] },
            { id: 2, label: "Maps item token index 2 option", keywords: [{ pattern: "2\\s*=>\\s*[\"']Shield[\"']" }] },
            { id: 3, label: "Includes catch-all discard underscore", keywords: [{ pattern: "_\\s*=>\\s*[\"']Fists[\"']" }] },
          ],
        },
      },
      {
        id: "cs-5",
        title: "Loops (for & while)",
        xp: 14,
        theory: [
          text(
            "Loops repeat blocks of instructions dynamically. A standard `for` loop includes explicit initializer, constraint condition, and modification steps.",
            {
              label: "Loop sequencing types",
              content: `// Step iteration loop sequence counters
for (int i = 0; i < 3; i++) {
    Console.WriteLine(i);
}

// Logical conditional validation check loops
int trackingHealth = 3;
while (trackingHealth > 0) {
    trackingHealth--;
}`,
            }
          ),
          callout(
            "warning",
            "Always update your loop variable inside a `while` loop, or you risk creating an infinite loop that crashes your program.",
          ),
        ],
        challenge: {
          title: "Iteration Accumulator",
          description: "Construct a standard `for` loop starting tracking variable `int i = 1` up to and including `5`. Increment `sum` by `i` each cycle.",
          starterCode: `using System;

class Program {
    static void Main() {
        int sum = 0;
        // Write loop tracking operations below
        
        Console.WriteLine(sum);
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            sum += i;
        }
        Console.WriteLine(sum);
    }
}`,
          tests: [
            { id: 1, label: "Implements standard for initialization structure", keywords: [{ pattern: "for\\s*\\(\\s*int\\s+i\\s*=\\s*1" }] },
            { id: 2, label: "Updates accumulator index parameters", keywords: [{ pattern: "sum\\s*\\+=\\s*i" }] },
          ],
        },
      },
    ],
  },
  {
    id: "collections",
    title: "Arrays & Collections",
    icon: "📦",
    color: "#fb923c",
    lessons: [
      {
        id: "cs-6",
        title: "Fixed-Size Arrays",
        xp: 14,
        theory: [
          text(
            "Arrays are structured allocations grouping similar element blocks together. In C#, standard primitives arrays have **immutable static fixed dimensions** allocated upon instantiation.",
            {
              label: "Array creation syntaxes",
              content: `// Allocating empty tracking structures allocating 5 distinct indexing values
int[] scoresArray = new int[5];

// Instantiating static elements directly
string[] inventory = { "Sword", "Shield", "Potion" };`,
            }
          ),
          text(
            "Access individual elements using zero-based index parameters. Use the `.Length` attribute to query total item allocation limits.",
          ),
          quiz(
            "What runtime event triggers if an invalid index reference maps outside array constraints?",
            ["The collection resizes automatically", "An IndexOutOfRangeException exception occurs", "The value sets to null"],
            1,
            "Accessing an out-of-bounds array index triggers an immediate Exception error.",
          ),
        ],
        challenge: {
          title: "Target Index Remap",
          description: "Modify index `0` inside the initialization array target `names` to be assigned exactly to string value `\"John\"`.",
          starterCode: `using System;

class Program {
    static void Main() {
        string[] names = { "Unknown", "Ali", "Sara" };
        // Update index zero position parameter below
        
        Console.WriteLine(names[0]);
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        string[] names = { "Unknown", "Ali", "Sara" };
        names[0] = "John";
        Console.WriteLine(names[0]);
    }
}`,
          tests: [
            { id: 1, label: "Mutates index value zero directly", keywords: [{ pattern: "names\\s*\\[\\s*0\\s*\\]" }] },
            { id: 2, label: "Binds tracking data target update variable", keywords: [{ pattern: "=\\s*[\"']John[\"']" }] },
          ],
        },
      },
      {
        id: "cs-7",
        title: "The foreach Loop",
        xp: 14,
        theory: [
          text(
            "The **`foreach` loop** is a safe, clean alternative for stepping across list containers. It eliminates the need for manual counter trackers and index variable evaluations.",
            {
              label: "Iterating elements inside structural lists cleanly",
              content: `string[] skillTree = { "Melee", "Magic", "Stealth" };

foreach (string skill in skillTree) {
    Console.WriteLine($"Unlocked skill trait: {skill}");
}`,
            }
          ),
          callout(
            "warning",
            "The collection loop variable inside a `foreach` engine configuration loop context is completely **read-only** and cannot be reassigned.",
          ),
        ],
        challenge: {
          title: "Summing Arrays Cleanly",
          description: "Construct a `foreach` tracking configuration loop passing integers out of `pointsArray`, adding them sequentially to variable `total`.",
          starterCode: `using System;

class Program {
    static void Main() {
        int[] pointsArray = { 100, 200, 300 };
        int total = 0;
        // Write your loop statement below
        
        Console.WriteLine(total);
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int[] pointsArray = { 100, 200, 300 };
        int total = 0;
        foreach (int points in pointsArray) {
            total += points;
        }
        Console.WriteLine(total);
    }
}`,
          tests: [
            { id: 1, label: "Uses foreach keyword structure", keywords: [{ pattern: "foreach\\s*\\(" }] },
            { id: 2, label: "Accumulates values safely into the tracker target", keywords: [{ pattern: "total\\s*\\+=\\s*" }] },
          ],
        },
      },
      {
        id: "cs-8",
        title: "Dynamic Lists (List<T>)",
        xp: 16,
        theory: [
          text(
            "When compilation requirements necessitate data containers that resize dynamically, drop static structures and transition to **`List<T>`**. This tracking collection uses **Generics** parameters inside angle brackets.",
            {
              label: "Instantiating dynamic Generic arrays lists profiles",
              content: `using System.Collections.Generic;

List<string> guestList = new List<string>();
guestList.Add("John");
guestList.Add("Ali");

guestList.Remove("Ali"); // Removes an element cleanly
Console.WriteLine(guestList.Count); // Outputs 1`,
            }
          ),
          callout(
            "tip",
            "While arrays query length using `.Length`, Generic List configuration modules query item sizes using **`.Count`** properties instead.",
          ),
          quiz(
            "Which foundational import directive unlocks generic namespace structures such as List collections?",
            ["System", "System.IO", "System.Collections.Generic", "System.Net"],
            2,
            "System.Collections.Generic contains all core generic collection utilities like List<T>.",
          ),
        ],
        challenge: {
          title: "Dynamic Allocation Build",
          description: "Instantiate a new integer dynamic list named `scores`. Add numerical entry element item `99` into it.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Instantiate your list and append data item targets below
        
    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> scores = new List<int>();
        scores.Add(99);
    }
}`,
          tests: [
            { id: 1, label: "Instantiates dynamic Generic list structural parameters", keywords: [{ pattern: "List\\s*<\\s*int\\s*>\\s+scores\\s*=\\s*new\\s+List\\s*<\\s*int\\s*>\\s*\\(" }] },
            { id: 2, label: "Triggers append functionality operations successfully", keywords: [{ pattern: "scores\\.Add\\s*\\(\\s*99\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "methods",
    title: "Functions & Methods",
    icon: "⚡",
    color: "#f97316",
    lessons: [
      {
        id: "cs-9",
        title: "Creating Methods",
        xp: 14,
        theory: [
          text(
            "Methods group reusable logic code snippets under named actions. Every definition requires explicit scope keywords, a return parameter data declaration, unique identifier parameters, and arguments.",
            {
              label: "Constructing method definitions inside standard blocks",
              content: `class Program {
    // Retaining static modifiers for simple local execution pipelines
    static int ComputeSum(int a, int b) {
        return a + b;
    }

    static void Main() {
        int result = ComputeSum(10, 20);
        Console.WriteLine(result);
    }
}`,
            }
          ),
          callout(
            "tip",
            "If a custom utility tool acts as a command action executing updates but does not return data to its caller, declare the return identifier type explicitly as **`void`**.",
          ),
          quiz(
            "What return signature indicates that a target helper method triggers actions without passing values back?",
            ["null", "static", "void", "empty"],
            2,
            "void specifies that a structural block does not yield a functional evaluation value signature.",
          ),
        ],
        challenge: {
          title: "The Multiplier Method",
          description: "Create a static helper function declaration named `Multiply` that accepts two integer parameters (`int x`, `int y`), and yields their multiplied product.",
          starterCode: `using System;

class Program {
    // Construct your custom helper method here
    
    static void Main() {
        Console.WriteLine(Multiply(5, 5));
    }
}`,
          solutionCode: `using System;

class Program {
    static int Multiply(int x, int y) {
        return x * y;
    }
    static void Main() {
        Console.WriteLine(Multiply(5, 5));
    }
}`,
          tests: [
            { id: 1, label: "Declares function footprint mapping tracking parameters", keywords: [{ pattern: "static\\s+int\\s+Multiply\\s*\\(" }] },
            { id: 2, label: "Includes proper logic execution return metrics statements", keywords: [{ pattern: "return\\s+x\\s*\\*\\s*y" }] },
          ],
        },
      },
      {
        id: "cs-10",
        title: "Method Overloading",
        xp: 14,
        theory: [
          text(
            "Method Overloading lets you create multiple functions with the **exact same name but different signatures** (different parameters or input counts). This makes utilities more flexible.",
            {
              label: "Overloaded parameter evaluation setups",
              content: `static int AddNumbers(int a, int b) {
    return a + b;
}

static double AddNumbers(double a, double b) {
    return a + b; // Compiles cleanly since argument configurations are unique
}`,
            }
          ),
          quiz(
            "What criteria dictates valid overload tracking declarations inside a class file configuration?",
            ["Different return types only", "Unique method names", "Unique parameter lists or types", "Altering variable identifiers inside methods"],
            2,
            "The compiler uses unique parameter data configurations to map matching method calls safely.",
          ),
        ],
        challenge: {
          title: "Overloading Utilities",
          description: "Add an overloaded definition variant of `Print` that accepts a `double` variable type input parameter named `val`.",
          starterCode: `using System;

class Program {
    static void Print(string text) {
        Console.WriteLine(text);
    }

    // Write your overloaded configuration version here
    
    static void Main() {
        Print(4.5);
    }
}`,
          solutionCode: `using System;

class Program {
    static void Print(string text) {
        Console.WriteLine(text);
    }
    static void Print(double val) {
        Console.WriteLine(val);
    }
    static void Main() {
        Print(4.5);
    }
}`,
          tests: [
            { id: 1, label: "Implements valid tracking configurations signatures options", keywords: [{ pattern: "static\\s+void\\s+Print\\s*\\(\\s*double\\s+val\\s*\\)" }] },
          ],
        },
      },
    ],
  },
  {
    id: "oop",
    title: "Object-Oriented Basics",
    icon: "🏁",
    color: "#ea580c",
    lessons: [
      {
        id: "cs-11",
        title: "Classes & Objects",
        xp: 14,
        theory: [
          text(
            "Classes serve as **blueprints** modeling layout variables configurations. Objects represent distinct concrete **instances** of those blueprints created using the `new` keyword parameter configurations.",
            {
              label: "Constructing classes tracking properties and allocations",
              content: `class Wizard {
    public string name;
    public int spellPower;
}

class Program {
    static void Main() {
        Wizard userWizard = new Wizard(); // Dynamic memory instantiation
        userWizard.name = "John";
        Console.WriteLine(userWizard.name);
    }
}`,
            }
          ),
          callout(
            "info",
            "The access modifier keyword **`public`** opens attribute access tracking fields so external components can interact with them freely.",
          ),
          quiz(
            "Which keyword is invoked to instantiate a fresh concrete object configuration instance out of an existing blueprint class template?",
            ["create", "make", "new", "bind"],
            2,
            "The new keyword instantiates an instance object allocation in system memory profiles.",
          ),
        ],
        challenge: {
          title: "Object Extraction",
          description: "Inside the Main method, instantiate an object instance of class `Player` named `hero` using the `new` keyword.",
          starterCode: `using System;

class Player {
    public string tag = "PlayerOne";
}

class Program {
    static void Main() {
        // Instantiate your player configuration profile below
        
    }
}`,
          solutionCode: `using System;

class Player {
    public string tag = "PlayerOne";
}

class Program {
    static void Main() {
        Player hero = new Player();
    }
}`,
          tests: [
            { id: 1, label: "Instantiates constructor variable options", keywords: [{ pattern: "Player\\s+hero\\s*=\\s*new\\s+Player\\s*\\(" }] },
          ],
        },
      },
      {
        id: "cs-12",
        title: "Constructors & Properties",
        xp: 16,
        theory: [
          text(
            "**Constructors** are specialized method layout systems that trigger automatically the moment an object is created. They share the exact same identifier name as their parent Class.",
            {
              label: "Constructors initialization parameters assignments configurations",
              content: `class Character {
    public string label;

    // Parameterized constructor configuration layout profile
    public Character(string startLabel) {
        label = startLabel;
    }
}`,
            }
          ),
          text(
            "C# **Properties** use automatic shorthand templates `{ get; set; }` to protect internal variables, controlling how values are read or overwritten.",
            {
              label: "Shorthand encapsulation configuration layout parameters",
              content: `class BankAccount {
    // Encapsulated data control property assignments metrics configurations
    public double Balance { get; set; }
}`,
            }
          ),
          quiz(
            "Which property tracking component sets the initialization criteria parameter variables options of an object right at creation?",
            ["A switch modifier", "A Constructor", "A parsing list", "A static void method"],
            1,
            "Constructors initialize structural object states immediately upon creation.",
          ),
        ],
        challenge: {
          title: "The Constructor Build",
          description: "Add a constructor function declaration to class `Item` that accepts parameter variable `string name` and maps it directly to field variable `Title`.",
          starterCode: `using System;

class Item {
    public string Title;

    // Construct constructor matching allocation criteria assignments below
    
}

class Program {
    static void Main() {
        Item dynamicItem = new Item("Shield");
        Console.WriteLine(dynamicItem.Title);
    }
}`,
          solutionCode: `using System;

class Item {
    public string Title;
    public Item(string name) {
        Title = name;
    }
}

class Program {
    static void Main() {
        Item dynamicItem = new Item("Shield");
        Console.WriteLine(dynamicItem.Title);
    }
}`,
          tests: [
            { id: 1, label: "Implements matching signature target name constraints options", keywords: [{ pattern: "public\\s+Item\\s*\\(\\s*string\\s+" }] },
            { id: 2, label: "Assigns content fields parameters metrics value", keywords: [{ pattern: "Title\\s*=\\s*" }] },
          ],
        },
      },
    ],
  },
];

export const CSHARP_LESSONS = applyLessonVideoLinks(
  CSHARP_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  CSHARP_VIDEO_LINKS,
);

export const CSHARP_TOTAL_XP = CSHARP_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);