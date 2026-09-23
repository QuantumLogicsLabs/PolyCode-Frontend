// PolyCode — C# Collections Interactive Course
// 6 chapters · 13 lessons · Browser sandbox validation
// Follows the exact same content shape as csharp-oop/data/csharpOopCurriculum.js

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

const RAW_CSHARP_COLLECTIONS_CHAPTERS = [
  {
    id: "arrays-lists",
    title: "Arrays & Lists",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-0",
        title: "Arrays",
        xp: 12,
        theory: [
          text(
            "An **array** is a fixed-size, ordered collection of elements of the same type. Once created, its length can't change — you index into it with square brackets starting at `0`.",
            {
              label: "Declaring and using an array",
              content: `int[] scores = { 90, 85, 77 };
Console.WriteLine(scores[0]);   // 90
scores[1] = 88;
Console.WriteLine(scores.Length); // 3`,
            },
          ),
          text(
            "You can also create an array with a fixed size and fill it in later using `new int[5]`, or loop over every element with a `foreach` loop.",
            {
              label: "Sizing and looping",
              content: `int[] nums = new int[3];
nums[0] = 1;
nums[1] = 2;
nums[2] = 3;

foreach (int n in nums) {
    Console.WriteLine(n);
}`,
            },
          ),
          callout(
            "warn",
            "Arrays have a **fixed length**. If you need a collection that grows and shrinks, reach for `List<T>` instead — covered next.",
          ),
          quiz(
            "What happens if you try to add a 4th element to an array declared as `int[3]`?",
            [
              "It silently grows to fit",
              "A compile-time or runtime error occurs — arrays can't resize",
              "The first element is overwritten",
              "Nothing, C# arrays are unbounded",
            ],
            1,
            "Array length is fixed at creation. Accessing or assigning an out-of-range index throws an `IndexOutOfRangeException`.",
          ),
        ],
        challenge: {
          title: "Sum an Array",
          description:
            "Create an `int[]` named `nums` containing `2, 4, 6, 8`. Loop over it with `foreach` and print the running total after each element is added, ending with the full sum.",
          starterCode: `using System;

class Program {
    static void Main() {
        // Declare the nums array


        // Loop and print the running total

    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int[] nums = { 2, 4, 6, 8 };
        int total = 0;
        foreach (int n in nums) {
            total += n;
            Console.WriteLine(total);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares an int array",
              keywords: [{ pattern: "int\\[\\]\\s+nums" }],
            },
            {
              id: 2,
              label: "Uses foreach to iterate",
              keywords: [{ pattern: "foreach" }],
            },
            {
              id: 3,
              label: "Prints a running total",
              keywords: [{ pattern: "total\\s*\\+=" }],
            },
          ],
        },
      },
      {
        id: "cs-col-1",
        title: "List<T>",
        xp: 14,
        theory: [
          text(
            "`List<T>` is a **resizable** collection from `System.Collections.Generic`. Unlike arrays, you can `Add`, `Remove`, and `Insert` elements at any time.",
            {
              label: "Working with List<T>",
              content: `using System.Collections.Generic;

List<string> names = new List<string>();
names.Add("Alice");
names.Add("Bob");
names.Remove("Alice");
Console.WriteLine(names.Count); // 1
Console.WriteLine(names[0]);    // Bob`,
            },
          ),
          diagram("Array vs. List<T>", [
            {
              id: "array",
              label: "Array",
              color: "#f59e0b",
              items: ["Fixed size", "Fast index access"],
            },
            {
              id: "list",
              label: "List<T>",
              color: ACCENT,
              items: ["Grows/shrinks", "Add(), Remove(), Insert()"],
            },
          ]),
          callout(
            "tip",
            "`List<T>` is generic — `T` is a stand-in for the element type. `List<int>`, `List<string>`, and `List<Car>` are all valid.",
          ),
          quiz(
            "Which method removes an element by value from a `List<T>`?",
            ["Delete()", "Pop()", "Remove()", "Clear()"],
            2,
            "`Remove(value)` finds the first matching element and removes it. `Clear()` empties the whole list instead.",
          ),
        ],
        challenge: {
          title: "Build a Todo List",
          description:
            "Create a `List<string>` named `todos`. Add `\"Buy milk\"` and `\"Walk dog\"`, then remove `\"Buy milk\"` and print the remaining count and the first item.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create and populate the todos list


        // Remove "Buy milk"


        // Print Count and todos[0]

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> todos = new List<string>();
        todos.Add("Buy milk");
        todos.Add("Walk dog");
        todos.Remove("Buy milk");
        Console.WriteLine(todos.Count);
        Console.WriteLine(todos[0]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares List<string> todos",
              keywords: [{ pattern: "List<string>\\s+todos" }],
            },
            {
              id: 2,
              label: "Adds two items",
              keywords: [{ pattern: "todos\\.Add" }],
            },
            {
              id: 3,
              label: "Removes an item",
              keywords: [{ pattern: "todos\\.Remove" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "dictionaries-sets",
    title: "Dictionaries & Sets",
    icon: "🔑",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-2",
        title: "Dictionary<TKey, TValue>",
        xp: 15,
        theory: [
          text(
            "A **`Dictionary<TKey, TValue>`** stores key-value pairs. Keys must be unique, and lookups by key are very fast — much faster than searching a list.",
            {
              label: "Using a Dictionary",
              content: `using System.Collections.Generic;

Dictionary<string, int> ages = new Dictionary<string, int>();
ages["Alice"] = 30;
ages["Bob"] = 25;

Console.WriteLine(ages["Alice"]); // 30
Console.WriteLine(ages.ContainsKey("Bob")); // True`,
            },
          ),
          text(
            "Use `TryGetValue` to safely look up a key without risking a `KeyNotFoundException` if it's missing.",
            {
              label: "Safe lookups",
              content: `if (ages.TryGetValue("Charlie", out int age)) {
    Console.WriteLine(age);
} else {
    Console.WriteLine("Not found");
}`,
            },
          ),
          callout(
            "warn",
            "Accessing a missing key with `ages[\"Charlie\"]` throws an exception. Always check `ContainsKey` or use `TryGetValue` first.",
          ),
          quiz(
            "What must be true of every key in a `Dictionary<TKey, TValue>`?",
            [
              "Keys must be sorted",
              "Keys must be unique",
              "Keys must be strings",
              "Keys must be numeric",
            ],
            1,
            "Dictionary keys must be unique — assigning to an existing key overwrites its value rather than adding a new entry.",
          ),
        ],
        challenge: {
          title: "Word Counter",
          description:
            "Create a `Dictionary<string, int>` named `counts`. Add `\"cat\" -> 2` and `\"dog\" -> 5`. Then print the value for `\"dog\"`.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the dictionary and add entries


        // Print counts["dog"]

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Dictionary<string, int> counts = new Dictionary<string, int>();
        counts["cat"] = 2;
        counts["dog"] = 5;
        Console.WriteLine(counts["dog"]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares Dictionary<string, int>",
              keywords: [{ pattern: "Dictionary<string,\\s*int>" }],
            },
            {
              id: 2,
              label: "Adds a dog entry",
              keywords: [{ pattern: "counts\\[\"dog\"\\]" }],
            },
            {
              id: 3,
              label: "Prints counts[\"dog\"]",
              keywords: [{ pattern: "Console\\.WriteLine\\(counts\\[\"dog\"\\]\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-col-3",
        title: "HashSet<T>",
        xp: 13,
        theory: [
          text(
            "A **`HashSet<T>`** stores only **unique** values with no guaranteed order. It's ideal for membership checks (\"have I seen this before?\") and removing duplicates.",
            {
              label: "Using a HashSet",
              content: `using System.Collections.Generic;

HashSet<string> seen = new HashSet<string>();
seen.Add("apple");
seen.Add("apple"); // ignored, already present
Console.WriteLine(seen.Count); // 1
Console.WriteLine(seen.Contains("apple")); // True`,
            },
          ),
          callout(
            "tip",
            "`HashSet<T>.Contains()` runs in roughly constant time, making it much faster than `List<T>.Contains()` for large collections.",
          ),
          quiz(
            "What happens when you Add() a value that's already in a HashSet<T>?",
            [
              "An exception is thrown",
              "The set silently ignores it — Add() returns false",
              "The value is added twice",
              "The set clears itself",
            ],
            1,
            "`Add()` returns a bool indicating whether the item was newly added. Duplicates are simply ignored.",
          ),
        ],
        challenge: {
          title: "Deduplicate Tags",
          description:
            "Create a `HashSet<string>` named `tags`. Add `\"c#\"`, `\"dotnet\"`, and `\"c#\"` again. Print `tags.Count` (should be 2).",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the set and add tags, including a duplicate


        // Print tags.Count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        HashSet<string> tags = new HashSet<string>();
        tags.Add("c#");
        tags.Add("dotnet");
        tags.Add("c#");
        Console.WriteLine(tags.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares HashSet<string> tags",
              keywords: [{ pattern: "HashSet<string>\\s+tags" }],
            },
            {
              id: 2,
              label: "Adds a duplicate value",
              keywords: [{ pattern: "tags\\.Add\\(\"c#\"\\)" }],
            },
            {
              id: 3,
              label: "Prints tags.Count",
              keywords: [{ pattern: "tags\\.Count" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "stacks-queues-iteration",
    title: "Stacks, Queues & Iteration",
    icon: "🔁",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-4",
        title: "Stack<T> and Queue<T>",
        xp: 14,
        theory: [
          text(
            "A **`Stack<T>`** is Last-In-First-Out (LIFO) — think of a stack of plates. A **`Queue<T>`** is First-In-First-Out (FIFO) — think of a line at a checkout.",
            {
              label: "Stack and Queue basics",
              content: `using System.Collections.Generic;

Stack<int> stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
Console.WriteLine(stack.Pop()); // 2

Queue<int> queue = new Queue<int>();
queue.Enqueue(1);
queue.Enqueue(2);
Console.WriteLine(queue.Dequeue()); // 1`,
            },
          ),
          diagram("Stack vs. Queue", [
            {
              id: "stack",
              label: "Stack<T>",
              color: ACCENT,
              items: ["Push() adds", "Pop() removes last added"],
            },
            {
              id: "queue",
              label: "Queue<T>",
              color: "#3b82f6",
              items: ["Enqueue() adds", "Dequeue() removes first added"],
            },
          ]),
          quiz(
            "After Push(1), Push(2), Push(3) on a Stack<int>, what does Pop() return?",
            ["1", "2", "3", "It's undefined"],
            2,
            "A stack is LIFO — the most recently pushed value (3) comes off first.",
          ),
        ],
        challenge: {
          title: "Undo Stack",
          description:
            "Create a `Stack<string>` named `undo`. Push `\"typed A\"`, then `\"typed B\"`. Pop once and print the result (should be `\"typed B\"`).",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the stack, push two actions


        // Pop and print the result

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Stack<string> undo = new Stack<string>();
        undo.Push("typed A");
        undo.Push("typed B");
        Console.WriteLine(undo.Pop());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares Stack<string> undo",
              keywords: [{ pattern: "Stack<string>\\s+undo" }],
            },
            {
              id: 2,
              label: "Pushes two actions",
              keywords: [{ pattern: "undo\\.Push" }],
            },
            {
              id: 3,
              label: "Pops and prints",
              keywords: [{ pattern: "undo\\.Pop\\(\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-col-5",
        title: "Iterating and Transforming Collections",
        xp: 16,
        theory: [
          text(
            "Beyond `foreach`, C# collections support useful built-in methods like `Sort()`, `Reverse()`, and `Contains()` directly on `List<T>`.",
            {
              label: "Sorting and searching a list",
              content: `List<int> nums = new List<int> { 5, 1, 4, 2 };
nums.Sort();
Console.WriteLine(string.Join(",", nums)); // 1,2,4,5
nums.Reverse();
Console.WriteLine(string.Join(",", nums)); // 5,4,2,1
Console.WriteLine(nums.Contains(4)); // True`,
            },
          ),
          callout(
            "tip",
            "`string.Join(separator, collection)` is a quick way to turn any collection into a printable string — handy for debugging.",
          ),
          quiz(
            "Which method sorts a List<T> in place, from smallest to largest by default?",
            ["Order()", "Sort()", "Arrange()", "ToSorted()"],
            1,
            "`List<T>.Sort()` sorts the list in place using the default comparer (ascending for numbers).",
          ),
        ],
        challenge: {
          title: "Sort and Report",
          description:
            "Create a `List<int>` named `scores` with `{ 42, 17, 99, 8 }`. Sort it, then print the smallest (`scores[0]`) and largest (`scores[scores.Count - 1]`) values.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the list, sort it, and print min/max

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> scores = new List<int> { 42, 17, 99, 8 };
        scores.Sort();
        Console.WriteLine(scores[0]);
        Console.WriteLine(scores[scores.Count - 1]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares List<int> scores",
              keywords: [{ pattern: "List<int>\\s+scores" }],
            },
            {
              id: 2,
              label: "Sorts the list",
              keywords: [{ pattern: "scores\\.Sort\\(\\)" }],
            },
            {
              id: 3,
              label: "Prints the max via Count - 1",
              keywords: [{ pattern: "scores\\.Count\\s*-\\s*1" }],
            },
          ],
        },
      },
      {
        id: "cs-col-6",
        title: "Choosing the Right Collection",
        xp: 16,
        theory: [
          text(
            "Picking the right collection matters for both clarity and performance. Here's a quick mental model for C#'s most common collection types.",
          ),
          diagram("Collection Cheat Sheet", [
            {
              id: "array",
              label: "Array",
              color: "#f59e0b",
              items: ["Fixed size", "Fastest raw access"],
            },
            {
              id: "list",
              label: "List<T>",
              color: ACCENT,
              items: ["Ordered, resizable", "Default choice"],
            },
            {
              id: "dict",
              label: "Dictionary<K,V>",
              color: "#3b82f6",
              items: ["Key lookup", "No duplicate keys"],
            },
            {
              id: "set",
              label: "HashSet<T>",
              color: "#a855f7",
              items: ["Unique values", "Fast Contains()"],
            },
          ]),
          callout(
            "tip",
            "Default to `List<T>` unless you specifically need fast key lookup (`Dictionary`), guaranteed uniqueness (`HashSet`), or strict LIFO/FIFO order (`Stack`/`Queue`).",
          ),
          quiz(
            "You need to check 'has this username been used?' as fast as possible, for thousands of usernames. Best choice?",
            ["Array", "List<T>", "HashSet<T>", "Stack<T>"],
            2,
            "HashSet<T>.Contains() is near-constant time, far faster than scanning a List<T> or Array for large collections.",
          ),
        ],
        challenge: {
          title: "Unique Visitor Counter",
          description:
            "Create a `HashSet<string>` named `visitors`. Add `\"ip1\"`, `\"ip2\"`, `\"ip1\"`, `\"ip3\"`. Print the total unique visitor count.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Track unique visitors and print the count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        HashSet<string> visitors = new HashSet<string>();
        visitors.Add("ip1");
        visitors.Add("ip2");
        visitors.Add("ip1");
        visitors.Add("ip3");
        Console.WriteLine(visitors.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares HashSet<string> visitors",
              keywords: [{ pattern: "HashSet<string>\\s+visitors" }],
            },
            {
              id: 2,
              label: "Adds a repeated ip",
              keywords: [{ pattern: "visitors\\.Add\\(\"ip1\"\\)" }],
            },
            {
              id: 3,
              label: "Prints visitors.Count",
              keywords: [{ pattern: "visitors\\.Count" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "sorting-comparers",
    title: "Sorting & Comparers",
    icon: "🔠",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-7",
        title: "Sorting Lists & IComparable<T>",
        xp: 14,
        theory: [
          text(
            "`List<T>.Sort()` orders a collection **in place** — it rearranges the existing list rather than returning a new one. For built-in types like `int` and `string`, C# already knows the natural order.",
            {
              label: "Sorting built-in types",
              content: `List<int> scores = new List<int> { 42, 7, 19 };
scores.Sort();
Console.WriteLine(scores[0]);   // 7

List<string> names = new List<string> { "Zara", "Ali", "Maryam" };
names.Sort();
Console.WriteLine(names[0]);    // Ali`,
            },
          ),
          text(
            "Try that with a class you wrote and it throws at runtime — C# has no idea whether one `Student` comes before another. You teach it by implementing **`IComparable<T>`** and its single method, `CompareTo`.",
            {
              label: "Making a class sortable",
              content: `class Student : IComparable<Student> {
    public string Name { get; set; }
    public int Grade { get; set; }

    public int CompareTo(Student other) {
        return Grade.CompareTo(other.Grade);
    }
}

List<Student> students = new List<Student> {
    new Student { Name = "Ali", Grade = 80 },
    new Student { Name = "Sara", Grade = 65 }
};

students.Sort();
Console.WriteLine(students[0].Name);  // Sara`,
            },
          ),
          text(
            "`CompareTo` returns a number, not a boolean: **negative** means \"I come first\", **zero** means \"we tie\", **positive** means \"I come after\". You rarely compute it by hand — delegate to the `CompareTo` of the field you are ordering by.",
          ),
          callout(
            "tip",
            "To reverse the order, flip the call: `other.Grade.CompareTo(Grade)`. Calling `List.Reverse()` after sorting works too, but it costs a second pass.",
          ),
          quiz(
            "What must `CompareTo` return when the current object should appear *before* the one passed in?",
            [
              "true",
              "A negative number",
              "A positive number",
              "Zero",
            ],
            1,
            "Sorting methods read the sign: negative means the current instance sorts first, zero means equal, positive means it sorts later.",
          ),
        ],
        challenge: {
          title: "Sort Students by Grade",
          description:
            "Make `Student` implement `IComparable<Student>` so that `CompareTo` orders students by `Grade` (lowest first). Then call `students.Sort()` and print the `Name` of the first student.",
          starterCode: `using System;
using System.Collections.Generic;

class Student {
    public string Name { get; set; }
    public int Grade { get; set; }

    // Implement IComparable<Student> and CompareTo here

}

class Program {
    static void Main() {
        List<Student> students = new List<Student> {
            new Student { Name = "Ali", Grade = 80 },
            new Student { Name = "Sara", Grade = 65 }
        };

        // Sort and print the first name

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Student : IComparable<Student> {
    public string Name { get; set; }
    public int Grade { get; set; }

    public int CompareTo(Student other) {
        return Grade.CompareTo(other.Grade);
    }
}

class Program {
    static void Main() {
        List<Student> students = new List<Student> {
            new Student { Name = "Ali", Grade = 80 },
            new Student { Name = "Sara", Grade = 65 }
        };

        students.Sort();
        Console.WriteLine(students[0].Name);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Student implements IComparable<Student>",
              keywords: [{ pattern: "Student\\s*:\\s*IComparable\\s*<\\s*Student\\s*>" }],
            },
            {
              id: 2,
              label: "Defines CompareTo using Grade",
              keywords: [{ pattern: "CompareTo" }, { pattern: "Grade" }],
            },
            {
              id: 3,
              label: "Sorts the list and prints a name",
              keywords: [{ pattern: "students\\.Sort\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "cs-col-8",
        title: "Custom Comparers & Comparison Delegates",
        xp: 15,
        theory: [
          text(
            "`IComparable<T>` gives a type **one** built-in order. Real data needs several — students by grade today, by name tomorrow. For that, you pass the ordering *into* `Sort()` instead of baking it into the class.",
            {
              label: "A Comparison<T> lambda",
              content: `List<Student> students = GetStudents();

// Order by name
students.Sort((a, b) => a.Name.CompareTo(b.Name));

// Order by grade, highest first
students.Sort((a, b) => b.Grade.CompareTo(a.Grade));`,
            },
          ),
          text(
            "The lambda is a **`Comparison<T>` delegate** — it takes two items and returns the same negative/zero/positive signal as `CompareTo`. Swapping `a` and `b` reverses the direction, which is the whole trick behind descending sorts.",
          ),
          text(
            "When the same ordering is reused across a codebase, wrap it in a reusable **`IComparer<T>`** class instead of repeating the lambda.",
            {
              label: "A reusable IComparer<T>",
              content: `class GradeDescending : IComparer<Student> {
    public int Compare(Student a, Student b) {
        return b.Grade.CompareTo(a.Grade);
    }
}

students.Sort(new GradeDescending());`,
            },
          ),
          text(
            "Comparers are not only for sorting. `Dictionary` and `HashSet` accept one to control how keys are matched — `StringComparer.OrdinalIgnoreCase` is the common case.",
            {
              label: "Case-insensitive keys",
              content: `var settings = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
settings["Theme"] = "dark";
Console.WriteLine(settings["theme"]);  // dark`,
            },
          ),
          callout(
            "info",
            "`IComparable<T>` answers \"how does this type sort by default?\" — `IComparer<T>` answers \"how do I want to sort it right now?\" Use the first for a natural order, the second for everything else.",
          ),
          quiz(
            "How do you turn `(a, b) => a.Grade.CompareTo(b.Grade)` into a descending sort?",
            [
              "Add .Reverse() inside the lambda",
              "Swap the operands: b.Grade.CompareTo(a.Grade)",
              "Return the negative of true",
              "Descending sorts need IComparer",
            ],
            1,
            "Swapping the two operands flips the sign the comparison returns, which reverses the resulting order — no extra pass needed.",
          ),
        ],
        challenge: {
          title: "Sort Names by Length",
          description:
            "Given a `List<string>` of names, call `Sort` with a comparison lambda that orders them by `Length`, shortest first, then print the first name in the sorted list.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> names = new List<string> { "Maryam", "Ali", "Zainab" };

        // Sort by length using a comparison lambda


        // Print the shortest name

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> names = new List<string> { "Maryam", "Ali", "Zainab" };

        names.Sort((a, b) => a.Length.CompareTo(b.Length));

        Console.WriteLine(names[0]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Sorts with a comparison lambda",
              keywords: [{ pattern: "names\\.Sort\\s*\\(\\s*\\(" }],
            },
            {
              id: 2,
              label: "Compares by Length",
              keywords: [{ pattern: "Length\\.CompareTo" }],
            },
            {
              id: 3,
              label: "Prints the first name",
              keywords: [{ pattern: "names\\[0\\]" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "nested-collections",
    title: "Nested & Multidimensional Collections",
    icon: "🧮",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-9",
        title: "2D & Jagged Arrays",
        xp: 14,
        theory: [
          text(
            "A **rectangular array** stores a grid in a single block of memory. You declare it with a comma inside the brackets and index it with two numbers: row first, then column.",
            {
              label: "A 2D array",
              content: `int[,] grid = new int[2, 3];   // 2 rows, 3 columns
grid[0, 0] = 1;
grid[1, 2] = 9;

Console.WriteLine(grid[1, 2]);        // 9
Console.WriteLine(grid.GetLength(0)); // 2 — rows
Console.WriteLine(grid.GetLength(1)); // 3 — columns`,
            },
          ),
          text(
            "`Length` on a 2D array gives the **total** number of cells, not the row count — that is what `GetLength(0)` and `GetLength(1)` are for. Nested `for` loops are the standard way to walk a grid.",
            {
              label: "Walking every cell",
              content: `int[,] grid = { { 1, 2, 3 }, { 4, 5, 6 } };
int total = 0;

for (int row = 0; row < grid.GetLength(0); row++) {
    for (int col = 0; col < grid.GetLength(1); col++) {
        total += grid[row, col];
    }
}

Console.WriteLine(total);  // 21`,
            },
          ),
          text(
            "A **jagged array** is an array *of arrays*, written `int[][]`. Each row is its own object, so rows can have different lengths — useful for ragged data like a list of scores per student.",
            {
              label: "Rows of different lengths",
              content: `int[][] scores = new int[2][];
scores[0] = new int[] { 90, 85 };
scores[1] = new int[] { 70, 75, 80 };

Console.WriteLine(scores[1][2]);      // 80
Console.WriteLine(scores[1].Length);  // 3`,
            },
          ),
          callout(
            "info",
            "Note the indexing difference: rectangular arrays use `grid[row, col]`, jagged arrays use `scores[row][col]`. Mixing the two up is the most common compile error here.",
          ),
          quiz(
            "For `int[,] grid = new int[4, 5];`, what does `grid.Length` return?",
            ["4", "5", "20", "It does not compile"],
            2,
            "Length counts every cell in the array — 4 rows × 5 columns = 20. Use GetLength(0) and GetLength(1) for the individual dimensions.",
          ),
        ],
        challenge: {
          title: "Sum a Grid",
          description:
            "Create an `int[,]` named `grid` holding `{ { 1, 2, 3 }, { 4, 5, 6 } }`. Use nested `for` loops with `GetLength` to add every cell into a `total`, then print it.",
          starterCode: `using System;

class Program {
    static void Main() {
        // Declare the 2D grid


        int total = 0;

        // Loop over every cell with nested for loops


        Console.WriteLine(total);
    }
}`,
          solutionCode: `using System;

class Program {
    static void Main() {
        int[,] grid = { { 1, 2, 3 }, { 4, 5, 6 } };

        int total = 0;

        for (int row = 0; row < grid.GetLength(0); row++) {
            for (int col = 0; col < grid.GetLength(1); col++) {
                total += grid[row, col];
            }
        }

        Console.WriteLine(total);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a 2D int array",
              keywords: [{ pattern: "int\\[\\s*,\\s*\\]" }],
            },
            {
              id: 2,
              label: "Uses GetLength for both dimensions",
              keywords: [
                { pattern: "GetLength\\s*\\(\\s*0\\s*\\)" },
                { pattern: "GetLength\\s*\\(\\s*1\\s*\\)" },
              ],
            },
            {
              id: 3,
              label: "Accumulates into total",
              keywords: [{ pattern: "total\\s*\\+=" }],
            },
          ],
        },
      },
      {
        id: "cs-col-10",
        title: "Collections Inside Collections",
        xp: 15,
        theory: [
          text(
            "Any collection can hold another collection. A `List<List<int>>` is a resizable grid where each row can grow independently — the flexible cousin of the jagged array.",
            {
              label: "A list of lists",
              content: `List<List<int>> rows = new List<List<int>>();
rows.Add(new List<int> { 1, 2 });
rows.Add(new List<int> { 3, 4, 5 });

rows[0].Add(99);

Console.WriteLine(rows[0].Count);  // 3
Console.WriteLine(rows[1][2]);     // 5`,
            },
          ),
          text(
            "The pattern you will reach for most often is a dictionary whose values are lists — one key, many items. Grouping members by team, orders by customer, or log lines by date all look like this.",
            {
              label: "Dictionary of lists",
              content: `var teams = new Dictionary<string, List<string>>();

teams["Backend"] = new List<string>();
teams["Backend"].Add("Ali");
teams["Backend"].Add("Sara");

Console.WriteLine(teams["Backend"].Count);  // 2`,
            },
          ),
          text(
            "The trap: the inner list does not exist until you create it. Calling `teams[\"Frontend\"].Add(...)` on a key you never initialised throws `KeyNotFoundException`. Check for the key first and create the list on demand.",
            {
              label: "Safe add-to-group",
              content: `void AddMember(Dictionary<string, List<string>> teams, string team, string person) {
    if (!teams.ContainsKey(team)) {
        teams[team] = new List<string>();
    }
    teams[team].Add(person);
}`,
            },
          ),
          callout(
            "warning",
            "`teams[\"X\"]` on a missing key throws, while `teams[\"X\"] = value` creates it. Reading and writing behave differently — use `ContainsKey` or `TryGetValue` before you read.",
          ),
          quiz(
            "What happens when you call `teams[\"Frontend\"].Add(\"Ali\")` and the key \"Frontend\" was never added?",
            [
              "The key is created automatically",
              "It throws KeyNotFoundException",
              "It returns null and does nothing",
              "It adds to the first team instead",
            ],
            1,
            "Reading a missing key with the indexer throws KeyNotFoundException. Initialise the inner list first, typically after a ContainsKey check.",
          ),
        ],
        challenge: {
          title: "Group Members by Team",
          description:
            "Create a `Dictionary<string, List<string>>` named `teams`. Initialise a `\"Backend\"` key with a new list, add `\"Ali\"` and `\"Sara\"` to it, then print the number of members on that team.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Create the dictionary of lists


        // Initialise the Backend list and add two members


        // Print the member count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Dictionary<string, List<string>> teams = new Dictionary<string, List<string>>();

        teams["Backend"] = new List<string>();
        teams["Backend"].Add("Ali");
        teams["Backend"].Add("Sara");

        Console.WriteLine(teams["Backend"].Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a dictionary of lists",
              keywords: [
                { pattern: "Dictionary\\s*<\\s*string\\s*,\\s*List\\s*<\\s*string\\s*>\\s*>" },
              ],
            },
            {
              id: 2,
              label: "Initialises the inner list",
              keywords: [{ pattern: "new\\s+List\\s*<\\s*string\\s*>" }],
            },
            {
              id: 3,
              label: "Prints the member count",
              keywords: [{ pattern: "\\.Count" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "collection-interfaces",
    title: "Collection Interfaces & Custom Iteration",
    icon: "🔌",
    color: ACCENT,
    lessons: [
      {
        id: "cs-col-11",
        title: "IEnumerable<T>, ICollection<T> & IList<T>",
        xp: 15,
        theory: [
          text(
            "Every collection in C# implements a stack of interfaces, each adding capability to the one below it. Knowing the layers tells you exactly how much power a method really needs.",
          ),
          diagram("The collection interface layers", [
            {
              id: "ienumerable",
              label: "IEnumerable<T>",
              color: "#f59e0b",
              items: ["foreach only", "Weakest, most flexible"],
            },
            {
              id: "icollection",
              label: "ICollection<T>",
              color: ACCENT,
              items: ["Adds Count, Add, Remove", "No indexing"],
            },
            {
              id: "ilist",
              label: "IList<T>",
              color: "#3b82f6",
              items: ["Adds list[i] indexing", "Full random access"],
            },
          ]),
          text(
            "`List<T>` implements all three, but a method that only loops should ask for the weakest one. Accepting `IEnumerable<T>` means arrays, lists, sets, and query results all work — accepting `List<T>` shuts most of them out.",
            {
              label: "Program to the interface",
              content: `// Works with List, array, HashSet, anything enumerable
static int Total(IEnumerable<int> numbers) {
    int sum = 0;
    foreach (int n in numbers) {
        sum += n;
    }
    return sum;
}

Console.WriteLine(Total(new List<int> { 1, 2, 3 }));
Console.WriteLine(Total(new int[] { 4, 5 }));
Console.WriteLine(Total(new HashSet<int> { 6 }));`,
            },
          ),
          text(
            "The same idea applies to what you return. Handing back `IReadOnlyList<T>` instead of `List<T>` lets callers read and index your data without quietly adding to or clearing the collection you own.",
          ),
          callout(
            "tip",
            "The rule of thumb: **accept the weakest interface you can work with, return the weakest one the caller needs.** It widens what your code accepts and narrows what callers can break.",
          ),
          quiz(
            "A method only needs to `foreach` over its argument. Which parameter type is the best choice?",
            [
              "List<T> — it is the most common",
              "IEnumerable<T>",
              "IList<T>",
              "Array, so it cannot be modified",
            ],
            1,
            "IEnumerable<T> is all a foreach requires, and accepting it lets callers pass lists, arrays, sets, or any other sequence.",
          ),
        ],
        challenge: {
          title: "Total Any Sequence",
          description:
            "Write a `static int Total(IEnumerable<int> numbers)` method that adds every value with a `foreach` loop and returns the sum. Call it once with a `List<int>` and once with an `int[]`, printing both results.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    // Write Total(IEnumerable<int> numbers) here


    static void Main() {
        // Call Total with a List<int> and with an int[]

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static int Total(IEnumerable<int> numbers) {
        int sum = 0;
        foreach (int n in numbers) {
            sum += n;
        }
        return sum;
    }

    static void Main() {
        Console.WriteLine(Total(new List<int> { 1, 2, 3 }));
        Console.WriteLine(Total(new int[] { 4, 5 }));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Accepts IEnumerable<int>",
              keywords: [{ pattern: "IEnumerable\\s*<\\s*int\\s*>" }],
            },
            {
              id: 2,
              label: "Sums with a foreach loop",
              keywords: [{ pattern: "foreach" }, { pattern: "sum\\s*\\+=" }],
            },
            {
              id: 3,
              label: "Calls Total with two different sequence types",
              keywords: [
                { pattern: "Total\\s*\\(\\s*new\\s+List" },
                { pattern: "Total\\s*\\(\\s*new\\s+int\\[" },
              ],
            },
          ],
        },
      },
      {
        id: "cs-col-12",
        title: "Writing Iterators with yield return",
        xp: 16,
        theory: [
          text(
            "You can produce a sequence without ever building a list to hold it. A method that returns `IEnumerable<T>` and uses **`yield return`** hands back one value at a time, resuming where it left off on each pass of the caller's `foreach`.",
            {
              label: "An iterator method",
              content: `static IEnumerable<int> EvenOnly(List<int> numbers) {
    foreach (int n in numbers) {
        if (n % 2 == 0) {
            yield return n;
        }
    }
}

foreach (int even in EvenOnly(new List<int> { 1, 2, 3, 4 })) {
    Console.WriteLine(even);   // 2, then 4
}`,
            },
          ),
          text(
            "Compare that with the manual version: build a `List<int>`, add matches, return it. The iterator never allocates that list — values are produced on demand, so a caller that stops after the first match never pays for the rest.",
          ),
          text(
            "This on-demand behaviour is called **deferred execution**. The body of an iterator does not run when you call it — it runs when something starts iterating the result.",
            {
              label: "Nothing runs until you loop",
              content: `var evens = EvenOnly(numbers);   // body has NOT run yet
Console.WriteLine("created");

foreach (int n in evens) {       // body starts running now
    Console.WriteLine(n);
}`,
            },
          ),
          text(
            "`yield break` ends the sequence early — useful for taking the first few items of something long or endless.",
            {
              label: "Stopping early with yield break",
              content: `static IEnumerable<int> FirstThree(List<int> numbers) {
    int count = 0;
    foreach (int n in numbers) {
        if (count == 3) {
            yield break;
        }
        yield return n;
        count++;
    }
}`,
            },
          ),
          callout(
            "warning",
            "Deferred execution means the sequence is re-evaluated every time you loop it. If the underlying collection changed in between, you get different results — call `ToList()` when you need a fixed snapshot.",
          ),
          quiz(
            "When does the body of a `yield return` iterator method actually execute?",
            [
              "Immediately when the method is called",
              "When something starts iterating the returned sequence",
              "Once per program run, cached",
              "Only if the collection is a List<T>",
            ],
            1,
            "Iterator methods use deferred execution — calling the method just creates the sequence, and the body runs as the caller iterates it.",
          ),
        ],
        challenge: {
          title: "Yield the Even Numbers",
          description:
            "Write a `static IEnumerable<int> EvenOnly(List<int> numbers)` method that uses `yield return` to produce only the even values. Loop over the result in `Main` and print each one.",
          starterCode: `using System;
using System.Collections.Generic;

class Program {
    // Write the EvenOnly iterator here


    static void Main() {
        List<int> numbers = new List<int> { 1, 2, 3, 4 };

        // foreach over EvenOnly(numbers) and print each value

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;

class Program {
    static IEnumerable<int> EvenOnly(List<int> numbers) {
        foreach (int n in numbers) {
            if (n % 2 == 0) {
                yield return n;
            }
        }
    }

    static void Main() {
        List<int> numbers = new List<int> { 1, 2, 3, 4 };

        foreach (int even in EvenOnly(numbers)) {
            Console.WriteLine(even);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Returns IEnumerable<int>",
              keywords: [{ pattern: "IEnumerable\\s*<\\s*int\\s*>\\s+EvenOnly" }],
            },
            {
              id: 2,
              label: "Uses yield return",
              keywords: [{ pattern: "yield\\s+return" }],
            },
            {
              id: 3,
              label: "Tests for even numbers and prints them",
              keywords: [{ pattern: "%\\s*2\\s*==\\s*0" }, { pattern: "Console\\.WriteLine" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_COLLECTIONS_CHAPTERS = RAW_CSHARP_COLLECTIONS_CHAPTERS;

export const CSHARP_COLLECTIONS_LESSONS = CSHARP_COLLECTIONS_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const CSHARP_COLLECTIONS_TOTAL_XP = CSHARP_COLLECTIONS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
