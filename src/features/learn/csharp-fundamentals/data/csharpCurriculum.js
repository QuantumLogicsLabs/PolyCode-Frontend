// PolyCode — C# Fundamentals Interactive Course
// 6 chapters · 20 lessons · Browser sandbox validation
// Extended reference architectures live in the backend Docs Hub

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { CSHARP_VIDEO_LINKS } from "./csharpVideoLinks";
import { applyChapterEnhancements } from "./csharpLessonEnhancements";

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

const RAW_CSHARP_CHAPTERS = [
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
              content: `using System;

class Program
{
    static void Main()
    {
        int points = 100;
        double price = 19.99;
        string player = "John";
        bool active = true;

        Console.WriteLine($"Player:" + player);
        Console.WriteLine($"Points:" + points);
        Console.WriteLine($"Price:" + price);
        Console.WriteLine($"Active:" + active);
    }
}`,
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
              content: `class Program
{
    static void Main()
    {
        double regularNumber = 45;
        double floatContainer = regularNumber;

        double fractionalPrice = 9.99;
        double truncatedWhole = fractionalPrice - (fractionalPrice % 1);

        Console.WriteLine("Implicit conversion (int -> double): " + floatContainer);
        Console.WriteLine("Explicit conversion (double -> int): " + truncatedWhole);
    }
}`,
            }
          ),
          text(
            "When turning parsed text inputs into true numeric datatypes for computing math, invoke the helper conversion structures.",
            {
              label: "Invoking the Convert class utilities",
              content: `using System;

class Program
{
    static void Main()
    {
        string inputString = "250";
        int parsedMetric = System.Convert.ToInt32(inputString);

        Console.WriteLine(parsedMetric + 5);
    }
}`,
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
            "**Conditionals** choose which code runs based on a boolean expression. Relational operators (`==`, `!=`, `>`, `<`, `>=`, `<=`) compare values and produce true or false.",
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
            "Which operator checks that both conditions are true?",
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
            "Which token is the catch-all default in a switch expression?",
            ["*", "default", "=>", "_"],
            3,
            "The underscore (_) matches any value not covered by earlier arms.",
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
            "The **`foreach` loop** walks every element in a collection without managing an index yourself. It is the idiomatic way to read arrays and lists.",
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
            "The loop variable in `foreach` is **read-only** — you cannot assign a new value to it inside the loop.",
          ),
        ],
        challenge: {
          title: "Summing Arrays Cleanly",
          description: "Use a `foreach` loop over `pointsArray` to add each value to `total`.",
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
            "When you need a collection that grows or shrinks at runtime, use **`List<T>`**. The type inside angle brackets (`T`) tells the list what it stores — for example `List<string>` or `List<int>`.",
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
            "Arrays use `.Length`; `List<T>` uses **`.Count`** to report how many elements are stored.",
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
            "A **class** is a blueprint; an **object** is a concrete instance created with `new`. Fields on the object hold that instance's data.",
            {
              label: "Defining a class and creating an object",
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
            "The **`public`** modifier lets code outside the class read and write that field.",
          ),
          quiz(
            "Which keyword creates a new object from a class?",
            ["create", "make", "new", "bind"],
            2,
            "`new` allocates an instance and runs any constructor.",
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
            "A **constructor** is a special method with the same name as the class. It runs automatically when you create an object and is the right place to set initial field values.",
            {
              label: "Parameterized constructor",
              content: `class Character {
    public string label;

    public Character(string startLabel) {
        label = startLabel;
    }
}`,
            }
          ),
          text(
            "**Properties** wrap fields with `{ get; set; }` so outside code reads and writes through a controlled accessor instead of a public field.",
            {
              label: "Auto-property encapsulation",
              content: `class BankAccount {
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
  {
    id: "intermediate",
    title: "Intermediate C#",
    icon: "⚙️",
    color: "#2563eb",
    lessons: [
      {
        id: "cs-13",
        title: "Dictionary & Key-Value Collections",
        xp: 16,
        theory: [
          text(
            "A **`Dictionary<TKey, TValue>`** maps unique keys to values — ideal for lookups by ID, SKU, or username. Average lookup is O(1).",
            {
              label: "Dictionary basics",
              content: `using System.Collections.Generic;

Dictionary<string, int> prices = new Dictionary<string, int>();
prices["SWORD"] = 150;
prices["SHIELD"] = 90;

Console.WriteLine(prices["SWORD"]); // 150
Console.WriteLine(prices.Count);`,
            }
          ),
          diagram("List vs Dictionary", [
            {
              id: "list",
              label: "List<T>",
              color: "#fb923c",
              items: ["Ordered sequence", "Index by position", "Duplicates allowed"],
            },
            {
              id: "dict",
              label: "Dictionary<K,V>",
              color: "#2563eb",
              items: ["Key → value map", "Fast lookup by key", "Keys must be unique"],
            },
          ]),
          callout(
            "warning",
            "Reading a missing key with `dict[key]` throws **KeyNotFoundException**. Use `TryGetValue` or `ContainsKey` when the key might not exist.",
          ),
          quiz(
            "Which collection is best for mapping product SKU strings to prices?",
            ["List<string>", "Dictionary<string, int>", "bool[]", "char"],
            1,
            "Dictionaries are designed for key-based lookup.",
          ),
        ],
        challenge: {
          title: "Build a Price Lookup",
          description:
            "Create `Dictionary<string, int> catalog`, add key `\"POTION\"` with value `25`, then print the value for `\"POTION\"` with `Console.WriteLine`.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create catalog, add POTION -> 25, print the price
    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Dictionary<string, int> catalog = new Dictionary<string, int>();
        catalog["POTION"] = 25;
        Console.WriteLine(catalog["POTION"]);
    }
}`,
          tests: [
            { id: 1, label: "Uses Dictionary", keywords: [{ pattern: "Dictionary\\s*<\\s*string\\s*,\\s*int\\s*>" }] },
            { id: 2, label: "Adds POTION key", keywords: [{ pattern: "[\"']POTION[\"']" }] },
            { id: 3, label: "Prints catalog value", keywords: [{ pattern: "Console\\.WriteLine\\s*\\(\\s*catalog\\s*\\[" }] },
          ],
        },
      },
      {
        id: "cs-14",
        title: "LINQ Basics",
        xp: 18,
        theory: [
          text(
            "**LINQ** (Language Integrated Query) filters and transforms collections with readable method chains. Common starters: `Where`, `Select`, and `OrderBy`.",
            {
              label: "Filter and project with LINQ",
              content: `using System.Linq;

int[] scores = { 40, 85, 92, 55 };
var passing = scores.Where(s => s >= 60).ToList();

foreach (int s in passing) {
    Console.WriteLine(s);
}`,
            }
          ),
          diagram("LINQ pipeline", [
            {
              id: "source",
              label: "Source data",
              color: ACCENT,
              items: ["Array, List, IEnumerable"],
            },
            {
              id: "where",
              label: "Where",
              color: "#2563eb",
              items: ["Filter items", "Keep matches only"],
            },
            {
              id: "select",
              label: "Select",
              color: "#7c3aed",
              items: ["Transform each item", "Project to new shape"],
            },
          ]),
          callout(
            "tip",
            "Add `using System.Linq;` at the top. LINQ methods work on any `IEnumerable<T>`.",
          ),
          quiz(
            "Which LINQ method keeps only elements that match a condition?",
            ["Select", "Where", "OrderBy", "Count"],
            1,
            "`Where` filters; `Select` transforms.",
          ),
        ],
        challenge: {
          title: "Filter High Scores",
          description:
            "Given `int[] scores = { 30, 70, 95, 50 };`, use LINQ `Where` to keep scores >= 60, call `.Count()` on the result, and print the count.",
          starterCode: `using System;
using System.Linq;

class Program {
    static void Main() {
        int[] scores = { 30, 70, 95, 50 };
        // Use Where and Count, then print
    }
}`,
          solutionCode: `using System;
using System.Linq;

class Program {
    static void Main() {
        int[] scores = { 30, 70, 95, 50 };
        int count = scores.Where(s => s >= 60).Count();
        Console.WriteLine(count);
    }
}`,
          tests: [
            { id: 1, label: "Uses Where", keywords: [{ pattern: "\\.Where\\s*\\(" }] },
            { id: 2, label: "Uses Count", keywords: [{ pattern: "\\.Count\\s*\\(" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "Console\\.WriteLine" }] },
          ],
        },
      },
      {
        id: "cs-15",
        title: "Exception Handling",
        xp: 16,
        theory: [
          text(
            "When something goes wrong at runtime, C# throws an **exception**. Wrap risky code in `try` / `catch` so your program can recover or show a helpful message instead of crashing.",
            {
              label: "try / catch pattern",
              content: `try {
    int value = int.Parse("not-a-number");
} catch (FormatException ex) {
    Console.WriteLine("Invalid number: " + ex.Message);
}`,
            }
          ),
          callout(
            "warning",
            "Catch **specific** exception types when you can. A bare `catch (Exception)` works but hides which failure mode occurred.",
          ),
          quiz(
            "Which block runs when int.Parse fails on non-numeric text?",
            ["try", "catch", "finally only", "Main"],
            1,
            "The matching catch block handles the thrown exception.",
          ),
        ],
        challenge: {
          title: "Safe Parse",
          description:
            "In a try/catch, parse `string raw = \"42\"` with `int.Parse` into `int n` and print `n`. Catch `FormatException` and print `\"invalid\"`.",
          starterCode: `using System;

class Program {
    static void Main() {
        string raw = "42";
        // try parse, catch FormatException
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        string raw = "42";
        try {
            int n = int.Parse(raw);
            Console.WriteLine(n);
        } catch (FormatException) {
            Console.WriteLine("invalid");
        }
    }
}`,
          tests: [
            { id: 1, label: "Uses try/catch", keywords: [{ pattern: "try\\s*\\{" }, { pattern: "catch\\s*\\(" }] },
            { id: 2, label: "Parses with int.Parse", keywords: [{ pattern: "int\\.Parse" }] },
            { id: 3, label: "Catches FormatException", keywords: [{ pattern: "FormatException" }] },
          ],
        },
      },
      {
        id: "cs-16",
        title: "async / await Intro",
        xp: 18,
        theory: [
          text(
            "**async** methods can **await** tasks that represent work finishing later — often network or file I/O. While awaiting, the thread is not blocked waiting on the slow operation.",
            {
              label: "Minimal async method",
              content: `using System.Threading.Tasks;

static async Task<int> FetchValueAsync() {
    await Task.Delay(100); // simulates I/O
    return 42;
}

static async Task Main() {
    int result = await FetchValueAsync();
    Console.WriteLine(result);
}`,
            }
          ),
          diagram("async flow", [
            {
              id: "start",
              label: "Call async method",
              color: ACCENT,
              items: ["Returns Task or Task<T>"],
            },
            {
              id: "await",
              label: "await",
              color: "#2563eb",
              items: ["Pause until work completes", "Thread can do other work"],
            },
            {
              id: "resume",
              label: "Resume",
              color: "#7c3aed",
              items: ["Continue after result", "Use return value"],
            },
          ]),
          callout(
            "info",
            "Mark the calling method `async` and use `await` on tasks inside it. `Task.Delay` is a stand-in for real I/O in exercises.",
          ),
          quiz(
            "What does await do inside an async method?",
            ["Deletes the task", "Waits for the task without blocking the thread unnecessarily", "Compiles synchronously", "Throws always"],
            1,
            "await suspends the async method until the task completes, then resumes with the result.",
          ),
        ],
        challenge: {
          title: "Await a Task",
          description:
            "Write `static async Task<int> GetMagicNumber()` that awaits `Task.Delay(1)` and returns `7`. In `static async Task Main()`, await it and print the result.",
          starterCode: `using System;
using System.Threading.Tasks;

class Program {
  // TODO: GetMagicNumber and async Main
}`,
          solutionCode: `using System;
using System.Threading.Tasks;

class Program {
    static async Task<int> GetMagicNumber() {
        await Task.Delay(1);
        return 7;
    }

    static async Task Main() {
        int n = await GetMagicNumber();
        Console.WriteLine(n);
    }
}`,
          tests: [
            { id: 1, label: "Defines async Task method", keywords: [{ pattern: "async\\s+Task" }] },
            { id: 2, label: "Uses await", keywords: [{ pattern: "await\\s+" }] },
            { id: 3, label: "Prints result", keywords: [{ pattern: "Console\\.WriteLine" }] },
          ],
        },
      },
      {
        id: "cs-17",
        title: "Interfaces",
        xp: 16,
        theory: [
          text(
            "An **interface** defines a contract — method signatures without bodies. Classes **implement** interfaces to promise they provide those members.",
            {
              label: "Interface and implementation",
              content: `interface ILogger {
    void Log(string message);
}

class ConsoleLogger : ILogger {
    public void Log(string message) {
        Console.WriteLine(message);
    }
}`,
            }
          ),
          callout(
            "tip",
            "Program against `ILogger`, not `ConsoleLogger`, so you can swap implementations without changing callers.",
          ),
          quiz(
            "Which keyword does a class use to adopt an interface?",
            [":", "implements", "extends", "using"],
            0,
            "C# uses colon syntax: `class Foo : IBar`.",
          ),
        ],
        challenge: {
          title: "Implement IGreeter",
          description:
            "Define `interface IGreeter { string Greet(string name); }`. Implement it on class `FriendlyGreeter` returning `$\"Hello, {name}!\"`. In Main, create `IGreeter g = new FriendlyGreeter();` and print `g.Greet(\"PolyCode\")`.",
          starterCode: `using System;

// TODO: IGreeter, FriendlyGreeter, Main

class Program {
    static void Main() {
    }
}`,
          solutionCode: `using System;

interface IGreeter {
    string Greet(string name);
}

class FriendlyGreeter : IGreeter {
    public string Greet(string name) {
        return $"Hello, {name}!";
    }
}

class Program {
    static void Main() {
        IGreeter g = new FriendlyGreeter();
        Console.WriteLine(g.Greet("PolyCode"));
    }
}`,
          tests: [
            { id: 1, label: "Defines IGreeter", keywords: [{ pattern: "interface\\s+IGreeter" }] },
            { id: 2, label: "Implements interface", keywords: [{ pattern: ":\\s*IGreeter" }] },
            { id: 3, label: "Prints greeting", keywords: [{ pattern: "Console\\.WriteLine" }, { pattern: "PolyCode" }] },
          ],
        },
      },
      {
        id: "cs-18",
        title: "Generics Intro",
        xp: 16,
        theory: [
          text(
            "**Generics** let you write code once and reuse it with different types. `List<int>` and `List<string>` share one `List<T>` definition — the compiler fills in `T` for you.",
            {
              label: "Generic method",
              content: `static void Swap<T>(ref T a, ref T b) {
    T temp = a;
    a = b;
    b = temp;
}`,
            }
          ),
          diagram("Generic type parameter", [
            {
              id: "def",
              label: "List<T>",
              color: ACCENT,
              items: ["T is a placeholder", "Defined once in library"],
            },
            {
              id: "int",
              label: "List<int>",
              color: "#2563eb",
              items: ["T becomes int", "Type-safe at compile time"],
            },
            {
              id: "str",
              label: "List<string>",
              color: "#7c3aed",
              items: ["T becomes string", "No casting needed"],
            },
          ]),
          quiz(
            "Why prefer List<int> over ArrayList for integers?",
            ["Generics avoid boxing and casting", "ArrayList is faster", "List cannot resize", "Generics are slower"],
            0,
            "Generic collections preserve type safety and skip boxing for value types.",
          ),
        ],
        challenge: {
          title: "Generic Identity",
          description:
            "Write `static T Identity<T>(T value)` that returns `value`. In Main, call `Identity<int>(99)` and print the result.",
          starterCode: `using System;

class Program {
    // TODO: Identity<T> and Main
}`,
          solutionCode: `using System;

class Program {
    static T Identity<T>(T value) {
        return value;
    }

    static void Main() {
        Console.WriteLine(Identity<int>(99));
    }
}`,
          tests: [
            { id: 1, label: "Generic method", keywords: [{ pattern: "Identity\\s*<\\s*T\\s*>" }] },
            { id: 2, label: "Returns value", keywords: [{ pattern: "return\\s+value" }] },
            { id: 3, label: "Calls with int", keywords: [{ pattern: "Identity\\s*<\\s*int\\s*>\\s*\\(\\s*99" }] },
          ],
        },
      },
      {
        id: "cs-19",
        title: "File I/O with StreamReader",
        xp: 18,
        theory: [
          text(
            "**StreamReader** reads text files line by line. Wrap it in a **`using`** statement so the file is closed automatically when the block ends.",
            {
              label: "Read all lines",
              content: `using System.IO;

using (StreamReader reader = new StreamReader("notes.txt")) {
    string line;
    while ((line = reader.ReadLine()) != null) {
        Console.WriteLine(line);
    }
}`,
            }
          ),
          callout(
            "tip",
            "`File.ReadAllText` is fine for small files. `StreamReader` is better when you process one line at a time or files may be large.",
          ),
          quiz(
            "Why use `using` with StreamReader?",
            ["It makes files read faster", "It disposes the file handle when done", "It converts bytes to strings", "It is required for async only"],
            1,
            "`using` calls Dispose on the reader so the OS file handle is released.",
          ),
        ],
        challenge: {
          title: "Count Non-Empty Lines",
          description:
            "Write `static int CountLines(string path)` that opens a `StreamReader` with `using`, counts lines where `ReadLine()` is not null and not empty, and returns the count. (Body can use a while loop.)",
          starterCode: `using System;
using System.IO;

class Program {
    static int CountLines(string path) {
        // TODO: StreamReader + using + count non-empty lines
        return 0;
    }

    static void Main() {
        Console.WriteLine(CountLines("data.txt"));
    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static int CountLines(string path) {
        int count = 0;
        using (StreamReader reader = new StreamReader(path)) {
            string line;
            while ((line = reader.ReadLine()) != null) {
                if (line.Length > 0) count++;
            }
        }
        return count;
    }

    static void Main() {
        Console.WriteLine(CountLines("data.txt"));
    }
}`,
          tests: [
            { id: 1, label: "Uses StreamReader", keywords: [{ pattern: "StreamReader" }] },
            { id: 2, label: "Uses using statement", keywords: [{ pattern: "using\\s*\\(" }] },
            { id: 3, label: "Reads with ReadLine", keywords: [{ pattern: "ReadLine\\s*\\(" }] },
          ],
        },
      },
    ],
  },
];

export const CSHARP_CHAPTERS = applyChapterEnhancements(RAW_CSHARP_CHAPTERS);

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