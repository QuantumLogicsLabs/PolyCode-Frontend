// PolyCode — C# LINQ Interactive Course
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

const RAW_CSHARP_LINQ_CHAPTERS = [
  {
    id: "linq-basics",
    title: "LINQ Basics",
    icon: "🔍",
    color: ACCENT,
    lessons: [
      {
        id: "cs-linq-0",
        title: "What is LINQ?",
        xp: 12,
        theory: [
          text(
            "**LINQ** (Language Integrated Query) lets you query collections — arrays, lists, dictionaries — using a consistent, readable syntax, instead of writing manual loops.",
            {
              label: "A loop vs. LINQ",
              content: `using System.Linq;
using System.Collections.Generic;

List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };

// Manual loop
List<int> evens1 = new List<int>();
foreach (int n in nums) {
    if (n % 2 == 0) evens1.Add(n);
}

// LINQ
var evens2 = nums.Where(n => n % 2 == 0).ToList();`,
            },
          ),
          text(
            "LINQ methods live in `System.Linq` and are called directly on any `IEnumerable<T>` — which includes arrays, `List<T>`, and `Dictionary<T>` values.",
          ),
          callout(
            "tip",
            "Always add `using System.Linq;` at the top of a file before using LINQ methods like `Where`, `Select`, or `OrderBy`.",
          ),
          quiz(
            "What does LINQ stand for?",
            [
              "Linear Iteration Query",
              "Language Integrated Query",
              "List Interface Query",
              "Logical In-memory Query",
            ],
            1,
            "LINQ = Language Integrated Query — it brings query syntax directly into C#.",
          ),
        ],
        challenge: {
          title: "Filter Evens with LINQ",
          description:
            "Given `List<int> nums = { 1, 2, 3, 4, 5, 6 }`, use `Where` to filter even numbers into a new list called `evens`, then print its count.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };
        // Use Where() to filter evens, store in "evens"


        // Print evens.Count

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };
        var evens = nums.Where(n => n % 2 == 0).ToList();
        Console.WriteLine(evens.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Where()",
              keywords: [{ pattern: "\\.Where\\(" }],
            },
            {
              id: 2,
              label: "Checks n % 2 == 0",
              keywords: [{ pattern: "%\\s*2\\s*==\\s*0" }],
            },
            {
              id: 3,
              label: "Prints evens.Count",
              keywords: [{ pattern: "evens\\.Count" }],
            },
          ],
        },
      },
      {
        id: "cs-linq-1",
        title: "Select — Projecting Data",
        xp: 13,
        theory: [
          text(
            "`Select` transforms every element in a collection into something new — it **projects** each item, similar to `.map()` in other languages.",
            {
              label: "Transforming with Select",
              content: `List<int> nums = new List<int> { 1, 2, 3 };
var squares = nums.Select(n => n * n).ToList();
// squares: [1, 4, 9]

List<string> names = new List<string> { "ana", "bo" };
var upper = names.Select(n => n.ToUpper()).ToList();
// upper: ["ANA", "BO"]`,
            },
          ),
          callout(
            "tip",
            "`Where` filters (keeps some elements), `Select` transforms (changes every element). They're often chained together: `nums.Where(...).Select(...)`.",
          ),
          quiz(
            "Which LINQ method transforms each element into a new shape?",
            ["Where", "Select", "First", "Count"],
            1,
            "`Select` projects each input element to a new output value — it always returns the same number of elements as the input.",
          ),
        ],
        challenge: {
          title: "Double the Prices",
          description:
            "Given `List<double> prices = { 10, 20, 30 }`, use `Select` to create a new list `doubled` where every price is multiplied by 2, then print the first element.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<double> prices = new List<double> { 10, 20, 30 };
        // Use Select() to double each price


        // Print doubled[0]

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<double> prices = new List<double> { 10, 20, 30 };
        var doubled = prices.Select(p => p * 2).ToList();
        Console.WriteLine(doubled[0]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Select()",
              keywords: [{ pattern: "\\.Select\\(" }],
            },
            {
              id: 2,
              label: "Multiplies by 2",
              keywords: [{ pattern: "\\*\\s*2" }],
            },
            {
              id: 3,
              label: "Prints doubled[0]",
              keywords: [{ pattern: "doubled\\[0\\]" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "linq-aggregation-ordering",
    title: "Aggregation & Ordering",
    icon: "📊",
    color: ACCENT,
    lessons: [
      {
        id: "cs-linq-2",
        title: "OrderBy and OrderByDescending",
        xp: 13,
        theory: [
          text(
            "`OrderBy` sorts a collection in ascending order by a chosen key; `OrderByDescending` sorts descending. Neither changes the original collection.",
            {
              label: "Sorting with LINQ",
              content: `List<int> nums = new List<int> { 5, 1, 4, 2 };
var asc = nums.OrderBy(n => n).ToList();       // [1,2,4,5]
var desc = nums.OrderByDescending(n => n).ToList(); // [5,4,2,1]`,
            },
          ),
          text(
            "You can order by any property, not just the value itself — useful for sorting objects.",
            {
              label: "Ordering objects by a property",
              content: `List<Player> players = GetPlayers();
var byScore = players.OrderByDescending(p => p.Score).ToList();`,
            },
          ),
          quiz(
            "Does OrderBy() modify the original list in place?",
            [
              "Yes, it sorts the original list",
              "No, it returns a new sorted sequence",
              "Only for List<T>, not arrays",
              "Only with ToList() appended",
            ],
            1,
            "LINQ methods are non-destructive — `OrderBy` always returns a new sequence, leaving the source collection untouched.",
          ),
        ],
        challenge: {
          title: "Sort Scores Descending",
          description:
            "Given `List<int> scores = { 42, 17, 99, 8 }`, use `OrderByDescending` to sort them and print the first (highest) value.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> scores = new List<int> { 42, 17, 99, 8 };
        // Sort descending into "sorted"


        // Print sorted[0]

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> scores = new List<int> { 42, 17, 99, 8 };
        var sorted = scores.OrderByDescending(s => s).ToList();
        Console.WriteLine(sorted[0]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses OrderByDescending()",
              keywords: [{ pattern: "OrderByDescending\\(" }],
            },
            {
              id: 2,
              label: "Converts to list",
              keywords: [{ pattern: "\\.ToList\\(\\)" }],
            },
            {
              id: 3,
              label: "Prints sorted[0]",
              keywords: [{ pattern: "sorted\\[0\\]" }],
            },
          ],
        },
      },
      {
        id: "cs-linq-3",
        title: "Aggregation: Count, Sum, Max, Min, Average",
        xp: 14,
        theory: [
          text(
            "LINQ provides one-line aggregation methods that collapse a collection into a single value.",
            {
              label: "Common aggregations",
              content: `List<int> nums = new List<int> { 4, 8, 15, 16, 23, 42 };

Console.WriteLine(nums.Count());   // 6
Console.WriteLine(nums.Sum());     // 108
Console.WriteLine(nums.Max());     // 42
Console.WriteLine(nums.Min());     // 4
Console.WriteLine(nums.Average()); // 18.0`,
            },
          ),
          callout(
            "warn",
            "Calling `.Average()`, `.Max()`, or `.Min()` on an **empty** collection throws an exception. Check `.Any()` first if the collection might be empty.",
          ),
          quiz(
            "What does nums.Average() return for List<int> { 2, 4, 6 }?",
            ["4", "3", "12", "2"],
            0,
            "(2 + 4 + 6) / 3 = 12 / 3 = 4.",
          ),
        ],
        challenge: {
          title: "Report Card Stats",
          description:
            "Given `List<int> grades = { 88, 92, 79, 95, 60 }`, print the `Sum()`, then the `Max()`, then the `Average()` — one per line.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> grades = new List<int> { 88, 92, 79, 95, 60 };
        // Print Sum(), Max(), Average()

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> grades = new List<int> { 88, 92, 79, 95, 60 };
        Console.WriteLine(grades.Sum());
        Console.WriteLine(grades.Max());
        Console.WriteLine(grades.Average());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Prints Sum()",
              keywords: [{ pattern: "grades\\.Sum\\(\\)" }],
            },
            {
              id: 2,
              label: "Prints Max()",
              keywords: [{ pattern: "grades\\.Max\\(\\)" }],
            },
            {
              id: 3,
              label: "Prints Average()",
              keywords: [{ pattern: "grades\\.Average\\(\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "linq-advanced",
    title: "Advanced Queries",
    icon: "🧩",
    color: ACCENT,
    lessons: [
      {
        id: "cs-linq-4",
        title: "First, FirstOrDefault, and Any",
        xp: 14,
        theory: [
          text(
            "`First()` returns the first matching element or throws if none exist. `FirstOrDefault()` returns the first match, or the type's default (`0`, `null`, etc.) if none exist — much safer.",
            {
              label: "First vs FirstOrDefault",
              content: `List<int> nums = new List<int> { 3, 7, 12, 18 };

int firstEven = nums.FirstOrDefault(n => n % 2 == 0); // 12
int firstOver100 = nums.FirstOrDefault(n => n > 100);  // 0 (default)

bool hasEven = nums.Any(n => n % 2 == 0); // true`,
            },
          ),
          callout(
            "tip",
            "Prefer `FirstOrDefault` over `First` unless you're certain a match exists — it avoids an `InvalidOperationException` on no matches.",
          ),
          quiz(
            "What does FirstOrDefault() return when no element matches the condition?",
            [
              "Throws an exception",
              "null always, regardless of type",
              "The type's default value (e.g. 0 for int, null for objects)",
              "The last element instead",
            ],
            2,
            "FirstOrDefault falls back to `default(T)` — `0` for numeric types, `null` for reference types.",
          ),
        ],
        challenge: {
          title: "Find the First Negative",
          description:
            "Given `List<int> nums = { 5, 3, -2, 8, -9 }`, use `FirstOrDefault` to find the first negative number and print it.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 5, 3, -2, 8, -9 };
        // Find and print the first negative number

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 5, 3, -2, 8, -9 };
        int firstNegative = nums.FirstOrDefault(n => n < 0);
        Console.WriteLine(firstNegative);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses FirstOrDefault()",
              keywords: [{ pattern: "FirstOrDefault\\(" }],
            },
            {
              id: 2,
              label: "Checks n < 0",
              keywords: [{ pattern: "n\\s*<\\s*0" }],
            },
            {
              id: 3,
              label: "Prints the result",
              keywords: [{ pattern: "Console\\.WriteLine\\(firstNegative\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-linq-5",
        title: "GroupBy",
        xp: 15,
        theory: [
          text(
            "`GroupBy` buckets elements by a shared key, producing groups you can iterate — similar to a `GROUP BY` in SQL.",
            {
              label: "Grouping data",
              content: `List<string> words = new List<string> { "cat", "car", "dog", "door" };

var groups = words.GroupBy(w => w[0]);

foreach (var g in groups) {
    Console.WriteLine(g.Key + ": " + g.Count());
}
// c: 2
// d: 2`,
            },
          ),
          callout(
            "tip",
            "Each group behaves like a mini-collection with a `.Key` property — you can `.Select()`, `.Count()`, or `foreach` over its contents.",
          ),
          quiz(
            "What property gives you the grouping value on each IGrouping result from GroupBy?",
            [".Value", ".Group", ".Key", ".Id"],
            2,
            "Each group returned by GroupBy is an IGrouping<TKey, TElement> — `.Key` holds the shared grouping value.",
          ),
        ],
        challenge: {
          title: "Group by First Letter",
          description:
            "Given `List<string> words = { \"cat\", \"car\", \"dog\" }`, group them by their first letter with `GroupBy`, then print how many groups there are using `.Count()` on the grouped result.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> words = new List<string> { "cat", "car", "dog" };
        // Group by first letter, print the number of groups

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> words = new List<string> { "cat", "car", "dog" };
        var groups = words.GroupBy(w => w[0]);
        Console.WriteLine(groups.Count());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses GroupBy()",
              keywords: [{ pattern: "GroupBy\\(" }],
            },
            {
              id: 2,
              label: "Groups by first character",
              keywords: [{ pattern: "w\\[0\\]" }],
            },
            {
              id: 3,
              label: "Prints group count",
              keywords: [{ pattern: "groups\\.Count\\(\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-linq-6",
        title: "Chaining LINQ Queries",
        xp: 15,
        theory: [
          text(
            "LINQ's real power comes from **chaining** methods together into a readable pipeline — filter, then transform, then order, then aggregate.",
            {
              label: "A full LINQ pipeline",
              content: `List<int> nums = new List<int> { 4, 8, 15, 16, 23, 42 };

var result = nums
    .Where(n => n % 2 == 0)      // keep evens
    .Select(n => n * 10)         // scale up
    .OrderByDescending(n => n)   // sort descending
    .ToList();

// result: [420, 160, 80, 40]`,
            },
          ),
          callout(
            "tip",
            "Read a LINQ chain top-to-bottom as a pipeline: each `.` step takes the previous result and transforms it further.",
          ),
          quiz(
            "In a chain like nums.Where(...).Select(...).OrderBy(...), what determines the final order of operations?",
            [
              "C# always runs OrderBy first internally",
              "The order the methods are written in the chain",
              "Alphabetical order of method names",
              "It's random",
            ],
            1,
            "LINQ chains execute in the order they're written — each method operates on the output of the one before it.",
          ),
        ],
        challenge: {
          title: "Top Even Score, Scaled",
          description:
            "Given `List<int> scores = { 12, 7, 18, 25, 4, 30 }`, chain `Where` (even only), `Select` (multiply by 10), and `OrderByDescending` to build `result`. Print `result[0]`.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> scores = new List<int> { 12, 7, 18, 25, 4, 30 };
        // Chain Where -> Select -> OrderByDescending into "result"


        // Print result[0]

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<int> scores = new List<int> { 12, 7, 18, 25, 4, 30 };
        var result = scores
            .Where(n => n % 2 == 0)
            .Select(n => n * 10)
            .OrderByDescending(n => n)
            .ToList();
        Console.WriteLine(result[0]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Where()",
              keywords: [{ pattern: "\\.Where\\(" }],
            },
            {
              id: 2,
              label: "Uses Select()",
              keywords: [{ pattern: "\\.Select\\(" }],
            },
            {
              id: 3,
              label: "Uses OrderByDescending()",
              keywords: [{ pattern: "OrderByDescending\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "linq-query-syntax",
    title: "Query Syntax",
    icon: "🗒️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-linq-7",
        title: "Query Syntax vs Method Syntax",
        xp: 14,
        theory: [
          text(
            "Everything you have written so far is **method syntax** — chained calls like `nums.Where(...).Select(...)`. C# offers a second spelling, **query syntax**, that reads like SQL and compiles to exactly the same thing.",
            {
              label: "The same query, two ways",
              content: `List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };

// Method syntax
var evensMethod = nums.Where(n => n % 2 == 0).Select(n => n * 10);

// Query syntax
var evensQuery = from n in nums
                 where n % 2 == 0
                 select n * 10;`,
            },
          ),
          text(
            "A query expression always starts with `from` and ends with `select` or `group`. The `from` clause names the range variable — `n` above — and every later clause uses that name.",
            {
              label: "Clause order",
              content: `var result = from p in players
             where p.Score > 50
             orderby p.Score descending
             select p.Name;`,
            },
          ),
          text(
            "The compiler rewrites query syntax into method calls before your program runs, so there is no performance difference — the choice is purely about readability. Query syntax wins for multi-clause queries with ordering and grouping; method syntax wins for short chains and for operators like `Count()` or `Any()` that have no query keyword.",
          ),
          callout(
            "info",
            "Query syntax needs `using System.Linq;` just like method syntax — the keywords compile down to the same extension methods.",
          ),
          quiz(
            "What is the performance difference between query syntax and method syntax?",
            [
              "Query syntax is faster",
              "Method syntax is faster",
              "None — query syntax compiles to method calls",
              "Query syntax runs on a background thread",
            ],
            2,
            "The compiler translates query expressions into the same extension method calls, so the two forms are identical at runtime. Pick whichever reads better.",
          ),
        ],
        challenge: {
          title: "Filter with Query Syntax",
          description:
            "Using **query syntax** (`from` / `where` / `select`), select every number from `nums` greater than `3` into `big`, then print the count. Remember `ToList()` or `Count()` to see a result.",
          starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };

        // Write a query expression that keeps numbers > 3


        // Print how many matched

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };

        var big = from n in nums
                  where n > 3
                  select n;

        Console.WriteLine(big.Count());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses a from clause",
              keywords: [{ pattern: "from\\s+\\w+\\s+in\\s+nums" }],
            },
            {
              id: 2,
              label: "Filters with where",
              keywords: [{ pattern: "where\\s+\\w+\\s*>\\s*3" }],
            },
            {
              id: 3,
              label: "Selects and prints a count",
              keywords: [{ pattern: "select" }, { pattern: "Console\\.WriteLine" }],
            },
          ],
        },
      },
      {
        id: "cs-linq-8",
        title: "let, orderby & into",
        xp: 15,
        theory: [
          text(
            "Query syntax has clauses with no direct method-syntax keyword. **`let`** introduces a named value computed once per element, so you do not repeat an expression in both `where` and `select`.",
            {
              label: "let avoids repeated work",
              content: `var report = from n in nums
             let square = n * n
             where square > 10
             select square;`,
            },
          ),
          text(
            "**`orderby`** sorts inside the query and accepts `descending` plus multiple keys separated by commas — the query-syntax equivalent of `OrderBy(...).ThenBy(...)`.",
            {
              label: "Sorting on two keys",
              content: `var ranked = from p in players
             orderby p.Score descending, p.Name
             select p;`,
            },
          ),
          text(
            "**`into`** continues a query after a `select` or `group`, feeding the result of the first half into a fresh range variable. It is how you filter groups after grouping them.",
            {
              label: "Filtering groups with into",
              content: `var busyTeams = from p in players
                group p by p.Team into team
                where team.Count() > 2
                select team.Key;`,
            },
          ),
          callout(
            "tip",
            "`let` is evaluated once per element, not once per use. Reach for it whenever the same calculation appears in more than one clause.",
          ),
          quiz(
            "What does `let square = n * n` do inside a query expression?",
            [
              "Declares a variable reused for every element in the source",
              "Computes a named value once per element, usable in later clauses",
              "Sorts the results by that value",
              "Forces the query to execute immediately",
            ],
            1,
            "A let clause introduces a per-element named value, so later clauses like where and select can use it without recomputing the expression.",
          ),
        ],
        challenge: {
          title: "Square, Filter, Order",
          description:
            "Write a query over `nums` that uses `let` to compute each number's square, keeps only squares greater than `10`, orders them `descending`, and selects the square. Print the first result with `.First()`.",
          starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 2, 3, 4, 5 };

        // Query with let, where, orderby descending, select


        // Print the first result

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 2, 3, 4, 5 };

        var squares = from n in nums
                      let square = n * n
                      where square > 10
                      orderby square descending
                      select square;

        Console.WriteLine(squares.First());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses a let clause",
              keywords: [{ pattern: "let\\s+\\w+\\s*=" }],
            },
            {
              id: 2,
              label: "Orders descending",
              keywords: [{ pattern: "orderby[\\s\\S]*descending" }],
            },
            {
              id: 3,
              label: "Prints the first result",
              keywords: [{ pattern: "\\.First\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "linq-combining",
    title: "Combining & Flattening Sequences",
    icon: "🔗",
    color: ACCENT,
    lessons: [
      {
        id: "cs-linq-9",
        title: "SelectMany — Flattening Nested Collections",
        xp: 15,
        theory: [
          text(
            "`Select` returns one output per input. When each element *contains* a collection, that gives you a sequence of sequences — rarely what you want. **`SelectMany`** flattens them into one stream.",
            {
              label: "Select vs SelectMany",
              content: `var teams = new List<List<string>> {
    new List<string> { "Ali", "Sara" },
    new List<string> { "Zara" }
};

// Select — a sequence of lists
var nested = teams.Select(t => t);        // IEnumerable<List<string>>

// SelectMany — one flat sequence of names
var flat = teams.SelectMany(t => t).ToList();
Console.WriteLine(flat.Count);            // 3
Console.WriteLine(flat[2]);               // Zara`,
            },
          ),
          text(
            "The lambda you pass to `SelectMany` picks the inner collection out of each element. With objects, that is usually a property.",
            {
              label: "Flattening a property",
              content: `class Student {
    public string Name { get; set; }
    public List<string> Courses { get; set; }
}

var allCourses = students
    .SelectMany(s => s.Courses)
    .Distinct()
    .ToList();`,
            },
          ),
          text(
            "In query syntax, a second `from` clause does the same job — that is exactly what it compiles to.",
            {
              label: "Two from clauses = SelectMany",
              content: `var pairs = from s in students
            from c in s.Courses
            select s.Name + " - " + c;`,
            },
          ),
          callout(
            "tip",
            "If a result comes back as `IEnumerable<List<T>>` and you wanted `IEnumerable<T>`, you reached for `Select` where `SelectMany` was needed.",
          ),
          quiz(
            "Each element of `teams` is a `List<string>`. What does `teams.SelectMany(t => t)` produce?",
            [
              "A list of lists, unchanged",
              "One flat sequence of all the strings",
              "Only the first list",
              "A count of the inner lists",
            ],
            1,
            "SelectMany concatenates every inner collection into a single sequence, turning IEnumerable<List<string>> into IEnumerable<string>.",
          ),
        ],
        challenge: {
          title: "Flatten the Teams",
          description:
            "Given a `List<List<string>>` named `teams`, use `SelectMany` to flatten it into a single list called `everyone`, then print the total number of names.",
          starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<List<string>> teams = new List<List<string>> {
            new List<string> { "Ali", "Sara" },
            new List<string> { "Zara" }
        };

        // Flatten with SelectMany


        // Print the total count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<List<string>> teams = new List<List<string>> {
            new List<string> { "Ali", "Sara" },
            new List<string> { "Zara" }
        };

        var everyone = teams.SelectMany(t => t).ToList();

        Console.WriteLine(everyone.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses SelectMany",
              keywords: [{ pattern: "\\.SelectMany\\s*\\(" }],
            },
            {
              id: 2,
              label: "Materialises the result",
              keywords: [{ pattern: "\\.ToList\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the count",
              keywords: [{ pattern: "\\.Count" }],
            },
          ],
        },
      },
      {
        id: "cs-linq-10",
        title: "Join & Set Operations",
        xp: 16,
        theory: [
          text(
            "**`Join`** matches elements from two sequences on a shared key — the LINQ equivalent of a SQL inner join. You supply the outer key, the inner key, and what to build from each matched pair.",
            {
              label: "Joining orders to customers",
              content: `var result = orders.Join(
    customers,
    order => order.CustomerId,   // key from the outer sequence
    customer => customer.Id,     // key from the inner sequence
    (order, customer) => customer.Name + " ordered " + order.Item
).ToList();`,
            },
          ),
          text(
            "Elements with no match on the other side are dropped — that is what makes it an *inner* join. Query syntax spells the same thing with the `join … on … equals …` clause.",
            {
              label: "Join in query syntax",
              content: `var result = from o in orders
             join c in customers on o.CustomerId equals c.Id
             select c.Name + " ordered " + o.Item;`,
            },
          ),
          text(
            "**Set operators** combine two sequences without a key. They compare elements directly, and all of them except `Concat` remove duplicates.",
            {
              label: "The set operators",
              content: `List<int> a = new List<int> { 1, 2, 3 };
List<int> b = new List<int> { 3, 4 };

a.Concat(b);      // 1,2,3,3,4 — everything, duplicates kept
a.Union(b);       // 1,2,3,4   — everything, duplicates removed
a.Intersect(b);   // 3         — only what appears in both
a.Except(b);      // 1,2       — in a but not in b
a.Distinct();     // 1,2,3     — duplicates removed from one sequence`,
            },
          ),
          callout(
            "warning",
            "Set operators compare with the type's equality. For your own classes that means reference equality unless you override `Equals`/`GetHashCode` or pass an `IEqualityComparer<T>` — two objects with identical fields will otherwise both survive `Distinct()`.",
          ),
          quiz(
            "Which operator returns the elements present in `a` but missing from `b`?",
            ["Concat", "Union", "Intersect", "Except"],
            3,
            "Except performs set difference: everything in the first sequence that does not appear in the second, with duplicates removed.",
          ),
        ],
        challenge: {
          title: "Find the Difference",
          description:
            "Given `List<int> a = { 1, 2, 3 }` and `List<int> b = { 3, 4 }`, use `Except` to get the values in `a` that are not in `b`, store them in `only`, and print how many there are.",
          starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> a = new List<int> { 1, 2, 3 };
        List<int> b = new List<int> { 3, 4 };

        // Use Except to find values only in a


        // Print the count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> a = new List<int> { 1, 2, 3 };
        List<int> b = new List<int> { 3, 4 };

        var only = a.Except(b).ToList();

        Console.WriteLine(only.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Except",
              keywords: [{ pattern: "\\.Except\\s*\\(" }],
            },
            {
              id: 2,
              label: "Materialises the result",
              keywords: [{ pattern: "\\.ToList\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the count",
              keywords: [{ pattern: "\\.Count" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "linq-execution",
    title: "Execution & Query Performance",
    icon: "⚡",
    color: ACCENT,
    lessons: [
      {
        id: "cs-linq-11",
        title: "Deferred vs Immediate Execution",
        xp: 15,
        theory: [
          text(
            "A LINQ query does not run when you write it. `Where`, `Select`, `OrderBy` and friends return a **description** of the query; the work happens when something iterates the result. This is **deferred execution**.",
            {
              label: "Nothing has run yet",
              content: `var query = nums.Where(n => {
    Console.WriteLine("checking " + n);
    return n > 2;
});

Console.WriteLine("query built");   // prints first — nothing checked yet

foreach (int n in query) {          // NOW the lambda runs
    Console.WriteLine(n);
}`,
            },
          ),
          text(
            "The consequence that bites: the source is re-read every time you iterate. Change the underlying list and the same query variable gives different answers.",
            {
              label: "A query is a live view, not a snapshot",
              content: `List<int> nums = new List<int> { 1, 2, 3 };
var big = nums.Where(n => n > 2);

Console.WriteLine(big.Count());   // 1

nums.Add(99);
Console.WriteLine(big.Count());   // 2 — the query re-ran`,
            },
          ),
          text(
            "**Immediate** operators force execution on the spot. `ToList()`, `ToArray()` and `ToDictionary()` materialise a fixed snapshot; `Count()`, `Sum()`, `First()` and `Any()` must produce a single value, so they run immediately too.",
            {
              label: "Freezing the result",
              content: `var snapshot = nums.Where(n => n > 2).ToList();  // runs now
nums.Add(100);
Console.WriteLine(snapshot.Count);              // unchanged`,
            },
          ),
          callout(
            "warning",
            "Iterating a deferred query twice does the work twice. If you loop a query more than once, call `ToList()` first — otherwise every pass re-filters, re-sorts and re-projects the whole source.",
          ),
          quiz(
            "`var q = nums.Where(n => n > 2);` then `nums.Add(99);`. What does `q.Count()` reflect?",
            [
              "The list as it was when q was declared",
              "The list including 99, because the query re-runs",
              "It throws, the collection changed",
              "Always zero until ToList() is called",
            ],
            1,
            "Deferred execution means q describes the query, not its results. Each enumeration re-reads the current contents of nums.",
          ),
        ],
        challenge: {
          title: "Freeze a Query",
          description:
            "Build a query over `nums` keeping values greater than `2`, materialise it immediately with `ToList()` into `snapshot`, then add `99` to `nums` and print `snapshot.Count` to show the snapshot did not change.",
          starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 1, 2, 3 };

        // Build the query and freeze it with ToList()


        nums.Add(99);

        // Print the snapshot count

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> nums = new List<int> { 1, 2, 3 };

        var snapshot = nums.Where(n => n > 2).ToList();

        nums.Add(99);

        Console.WriteLine(snapshot.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Filters with Where",
              keywords: [{ pattern: "\\.Where\\s*\\(" }],
            },
            {
              id: 2,
              label: "Materialises with ToList",
              keywords: [{ pattern: "\\.ToList\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the snapshot count",
              keywords: [{ pattern: "snapshot\\.Count" }],
            },
          ],
        },
      },
      {
        id: "cs-linq-12",
        title: "Paging & Writing Efficient Queries",
        xp: 16,
        theory: [
          text(
            "**`Skip`** and **`Take`** slice a sequence, which is all paging really is: skip the pages before this one, take a page's worth.",
            {
              label: "Page 3, ten items per page",
              content: `int page = 3;
int pageSize = 10;

var results = items
    .Skip((page - 1) * pageSize)
    .Take(pageSize)
    .ToList();`,
            },
          ),
          text(
            "Order matters in a chain. Filter before you sort — sorting a hundred items and then throwing most away costs far more than discarding them first.",
            {
              label: "Cheap order vs expensive order",
              content: `// Expensive — sorts everything, then filters
items.OrderBy(i => i.Name).Where(i => i.IsActive);

// Cheaper — filters first, sorts what survives
items.Where(i => i.IsActive).OrderBy(i => i.Name);`,
            },
          ),
          text(
            "Pick the operator that can stop early. `Any()` returns the moment it finds one match, while `Count() > 0` walks the entire sequence to build a number it then throws away.",
            {
              label: "Ask the cheaper question",
              content: `if (users.Any(u => u.IsAdmin)) { }        // stops at the first admin
if (users.Count(u => u.IsAdmin) > 0) { }  // counts every admin first

var first = users.FirstOrDefault(u => u.IsAdmin);  // stops at the first match`,
            },
          ),
          callout(
            "tip",
            "Paging without `OrderBy` is unreliable — without a defined order, \"the second page\" has no stable meaning. Always sort before you `Skip`/`Take`.",
          ),
          quiz(
            "Why is `Any(...)` usually cheaper than `Count(...) > 0`?",
            [
              "Any runs in parallel",
              "Any stops at the first match; Count walks the whole sequence",
              "Count is deferred, Any is not",
              "There is no difference",
            ],
            1,
            "Any short-circuits as soon as one element satisfies the predicate, while Count must examine every element to produce a total.",
          ),
        ],
        challenge: {
          title: "Take the Second Page",
          description:
            "Given a `List<int>` of `1..10` named `items`, order it ascending, then use `Skip` and `Take` with a page size of `3` to get page 2 into `page2`. Print the first value on that page.",
          starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> items = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // Order, then Skip and Take page 2 with a page size of 3


        // Print the first value on the page

    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;

class Program {
    static void Main() {
        List<int> items = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        var page2 = items
            .OrderBy(i => i)
            .Skip(3)
            .Take(3)
            .ToList();

        Console.WriteLine(page2[0]);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Orders before paging",
              keywords: [{ pattern: "\\.OrderBy\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses Skip and Take",
              keywords: [
                { pattern: "\\.Skip\\s*\\(\\s*3\\s*\\)" },
                { pattern: "\\.Take\\s*\\(\\s*3\\s*\\)" },
              ],
            },
            {
              id: 3,
              label: "Prints the first value of the page",
              keywords: [{ pattern: "page2\\s*\\[\\s*0\\s*\\]" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_LINQ_CHAPTERS = RAW_CSHARP_LINQ_CHAPTERS;

export const CSHARP_LINQ_LESSONS = CSHARP_LINQ_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const CSHARP_LINQ_TOTAL_XP = CSHARP_LINQ_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
