// PolyCode — C# Projects Interactive Course (Capstone)
// 6 chapters · 6 lessons · Browser sandbox validation
// Combines skills from C# Fundamentals, OOP, Collections, LINQ, File Handling,
// and ASP.NET Basics into growing, realistic projects — follows the same content
// shape as csharp-oop/data/csharpOopCurriculum.js

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

const RAW_CSHARP_PROJECTS_CHAPTERS = [
  {
    id: "project-contact-book",
    title: "Project 1: Contact Book",
    icon: "📇",
    color: ACCENT,
    lessons: [
      {
        id: "cs-proj-0",
        title: "Project 1: Contact Book",
        xp: 20,
        theory: [
          text(
            "Time to combine everything: a **Contact Book** using a `Contact` class (OOP), a `List<Contact>` (Collections), and simple LINQ to search — the same pattern behind most real CRUD tools.",
            {
              label: "Modeling and storing contacts",
              content: `class Contact {
    public string Name;
    public string Phone;
}

List<Contact> contacts = new List<Contact>();
contacts.Add(new Contact { Name = "Ana", Phone = "555-0101" });
contacts.Add(new Contact { Name = "Bo", Phone = "555-0102" });

var found = contacts.FirstOrDefault(c => c.Name == "Ana");
Console.WriteLine(found?.Phone);`,
            },
          ),
          callout(
            "tip",
            "The `?.` **null-conditional operator** safely accesses `.Phone` only if `found` isn't null — avoiding a `NullReferenceException` if the search comes up empty.",
          ),
          quiz(
            "Why use FirstOrDefault (not First) when searching for a contact that might not exist?",
            [
              "It's faster",
              "It returns null instead of throwing when nothing matches",
              "It searches in reverse order",
              "There's no difference",
            ],
            1,
            "FirstOrDefault returns null (for reference types) when no match is found, instead of throwing — much safer for a search that might legitimately come up empty.",
          ),
        ],
        challenge: {
          title: "Build the Contact Book",
          description:
            "Define a `Contact` class with `Name` and `Phone` fields. Create a `List<Contact>` named `contacts`, add two contacts, then use `FirstOrDefault` to find one by name and print its phone number.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Contact {
    // Add Name and Phone fields
}

class Program {
    static void Main() {
        // Build the contacts list, add two contacts


        // Find one by name and print its Phone

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Contact {
    public string Name;
    public string Phone;
}

class Program {
    static void Main() {
        List<Contact> contacts = new List<Contact>();
        contacts.Add(new Contact { Name = "Ana", Phone = "555-0101" });
        contacts.Add(new Contact { Name = "Bo", Phone = "555-0102" });

        var found = contacts.FirstOrDefault(c => c.Name == "Ana");
        Console.WriteLine(found?.Phone);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines Contact with Name and Phone",
              keywords: [{ pattern: "public string Name" }, { pattern: "public string Phone" }],
            },
            {
              id: 2,
              label: "Builds a List<Contact>",
              keywords: [{ pattern: "List<Contact>\\s+contacts" }],
            },
            {
              id: 3,
              label: "Uses FirstOrDefault to search",
              keywords: [{ pattern: "FirstOrDefault\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "project-todo-list",
    title: "Project 2: Persistent Todo List",
    icon: "🗒️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-proj-1",
        title: "Project 2: Persistent Todo List",
        xp: 22,
        theory: [
          text(
            "Real apps don't forget your data when they close. Let's extend a todo list with **file persistence**, saving each task as a line in a text file and reloading it on startup.",
            {
              label: "Saving and loading tasks",
              content: `using System.IO;
using System.Collections.Generic;

List<string> tasks = new List<string> { "Buy milk", "Walk dog" };

// Save
File.WriteAllLines("tasks.txt", tasks);

// Load back
List<string> loaded = new List<string>(File.ReadAllLines("tasks.txt"));
Console.WriteLine(loaded.Count);`,
            },
          ),
          callout(
            "tip",
            "`File.WriteAllLines` takes any `IEnumerable<string>` — including a `List<string>` — and writes each element as its own line, which pairs naturally with `File.ReadAllLines` for loading it back.",
          ),
          quiz(
            "Which method pairs naturally with File.WriteAllLines for loading a list of strings back from disk?",
            [
              "File.ReadAllText",
              "File.ReadAllLines",
              "File.OpenRead",
              "Directory.GetFiles",
            ],
            1,
            "File.ReadAllLines returns a string[] with one entry per line — the natural counterpart to File.WriteAllLines, which writes one line per element.",
          ),
        ],
        challenge: {
          title: "Save and Reload Tasks",
          description:
            "Create a `List<string> tasks` with `\"Buy milk\"` and `\"Walk dog\"`. Save it with `File.WriteAllLines(\"tasks.txt\", tasks)`, then reload it into `loaded` with `File.ReadAllLines` and print `loaded.Length`.",
          starterCode: `using System;
using System.IO;
using System.Collections.Generic;

class Program {
    static void Main() {
        // Build tasks, save to tasks.txt


        // Reload into "loaded" and print its length

    }
}`,
          solutionCode: `using System;
using System.IO;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> tasks = new List<string> { "Buy milk", "Walk dog" };
        File.WriteAllLines("tasks.txt", tasks);

        string[] loaded = File.ReadAllLines("tasks.txt");
        Console.WriteLine(loaded.Length);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Builds the tasks list",
              keywords: [{ pattern: "List<string>\\s+tasks" }],
            },
            {
              id: 2,
              label: "Writes tasks to tasks.txt",
              keywords: [{ pattern: "File\\.WriteAllLines\\(\"tasks\\.txt\"" }],
            },
            {
              id: 3,
              label: "Reloads with File.ReadAllLines",
              keywords: [{ pattern: "File\\.ReadAllLines\\(\"tasks\\.txt\"\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "project-grade-analyzer",
    title: "Project 3: Student Grade Analyzer",
    icon: "📊",
    color: ACCENT,
    lessons: [
      {
        id: "cs-proj-2",
        title: "Project 3: Student Grade Analyzer",
        xp: 22,
        theory: [
          text(
            "Combine **LINQ** aggregation with a class model to build a small analytics tool — the kind of report-generating code that shows up constantly in real business apps.",
            {
              label: "Analyzing grades with LINQ",
              content: `class Student {
    public string Name;
    public int Grade;
}

List<Student> students = new List<Student> {
    new Student { Name = "Ana", Grade = 92 },
    new Student { Name = "Bo", Grade = 68 },
    new Student { Name = "Cy", Grade = 77 },
};

double average = students.Average(s => s.Grade);
var topStudent = students.OrderByDescending(s => s.Grade).First();
var passing = students.Where(s => s.Grade >= 70).ToList();

Console.WriteLine(average);
Console.WriteLine(topStudent.Name);
Console.WriteLine(passing.Count);`,
            },
          ),
          callout(
            "tip",
            "Notice how `Average`, `OrderByDescending`, and `Where` all operate directly on `List<Student>` by reading a property off each object — LINQ works the same on objects as it does on plain numbers.",
          ),
          quiz(
            "In students.Average(s => s.Grade), what is s.Grade doing?",
            [
              "Filtering out ungraded students",
              "Selecting which property of each student to average",
              "Sorting students by grade",
              "Creating a new Student object",
            ],
            1,
            "The lambda tells Average which numeric property to read from each element — here, each student's Grade — before computing the mean.",
          ),
        ],
        challenge: {
          title: "Build the Grade Analyzer",
          description:
            "Define a `Student` class with `Name` and `Grade`. Build a `List<Student>` with three students. Print the class `Average()` grade, and the `Name` of the top student found via `OrderByDescending(...).First()`.",
          starterCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Student {
    // Add Name and Grade fields
}

class Program {
    static void Main() {
        // Build the students list


        // Print the average grade


        // Print the top student's name

    }
}`,
          solutionCode: `using System;
using System.Linq;
using System.Collections.Generic;

class Student {
    public string Name;
    public int Grade;
}

class Program {
    static void Main() {
        List<Student> students = new List<Student> {
            new Student { Name = "Ana", Grade = 92 },
            new Student { Name = "Bo", Grade = 68 },
            new Student { Name = "Cy", Grade = 77 },
        };

        Console.WriteLine(students.Average(s => s.Grade));

        var topStudent = students.OrderByDescending(s => s.Grade).First();
        Console.WriteLine(topStudent.Name);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines Student with Name and Grade",
              keywords: [{ pattern: "public string Name" }, { pattern: "public int Grade" }],
            },
            {
              id: 2,
              label: "Computes the average grade",
              keywords: [{ pattern: "\\.Average\\(s\\s*=>\\s*s\\.Grade\\)" }],
            },
            {
              id: 3,
              label: "Finds the top student",
              keywords: [{ pattern: "OrderByDescending\\(s\\s*=>\\s*s\\.Grade\\)\\.First\\(\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "project-task-api",
    title: "Project 4: Mini Task API",
    icon: "🔌",
    color: ACCENT,
    lessons: [
      {
        id: "cs-proj-3",
        title: "Project 4: Mini Task API",
        xp: 24,
        theory: [
          text(
            "Bring it all together with a small **ASP.NET Core Minimal API**: a `Task` DTO, an in-memory `List<Task>` acting as storage, and full CRUD routes built from everything in this track.",
            {
              label: "A minimal in-memory Task API",
              content: `public class Task {
    public int Id { get; set; }
    public string Title { get; set; }
    public bool Done { get; set; }
}

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Task> tasks = new List<Task>();

app.MapGet("/tasks", () => tasks);
app.MapPost("/tasks", (Task t) => {
    tasks.Add(t);
    return Results.Created($"/tasks/{t.Id}", t);
});
app.MapGet("/tasks/{id}", (int id) => {
    var task = tasks.FirstOrDefault(t => t.Id == id);
    return task is null ? Results.NotFound() : Results.Ok(task);
});

app.Run();`,
            },
          ),
          callout(
            "note",
            "This is the same pattern real production APIs start from — a DTO, in-memory (or database-backed) storage, and route handlers that use the LINQ and collection skills from earlier in this track.",
          ),
          quiz(
            "In the MapGet(\"/tasks/{id}\") handler above, why check `task is null` before returning?",
            [
              "It's required syntax, not meaningful",
              "To return a proper 404 Not Found instead of an error when no task matches",
              "To sort the tasks list",
              "To delete the task automatically",
            ],
            1,
            "FirstOrDefault returns null when nothing matches. Checking for null lets the API return a clean 404 instead of crashing or returning an empty/invalid response.",
          ),
        ],
        challenge: {
          title: "Add a GET-by-id Route",
          description:
            "Given an in-memory `List<Task> tasks`, add a `MapGet(\"/tasks/{id}\")` handler that finds the task with `FirstOrDefault`, returning `Results.NotFound()` if none matches, or `Results.Ok(task)` if found.",
          starterCode: `using System.Linq;
using System.Collections.Generic;

public class Task {
    public int Id { get; set; }
    public string Title { get; set; }
}

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Task> tasks = new List<Task>();

// Add the GET /tasks/{id} route


app.Run();`,
          solutionCode: `using System.Linq;
using System.Collections.Generic;

public class Task {
    public int Id { get; set; }
    public string Title { get; set; }
}

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Task> tasks = new List<Task>();

app.MapGet("/tasks/{id}", (int id) => {
    var task = tasks.FirstOrDefault(t => t.Id == id);
    return task is null ? Results.NotFound() : Results.Ok(task);
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Maps GET /tasks/{id}",
              keywords: [{ pattern: "MapGet\\(\"/tasks/\\{id\\}\"" }],
            },
            {
              id: 2,
              label: "Uses FirstOrDefault to find the task",
              keywords: [{ pattern: "FirstOrDefault\\(t\\s*=>\\s*t\\.Id\\s*==\\s*id\\)" }],
            },
            {
              id: 3,
              label: "Returns NotFound when missing",
              keywords: [{ pattern: "Results\\.NotFound\\(\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "project-inventory-manager",
    title: "Project 5: Inventory Manager",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "cs-proj-4",
        title: "Project 5: Inventory Manager",
        xp: 24,
        theory: [
          text(
            "Project 2 saved its task list as plain text lines. Real applications store **structured** data — objects with several fields, nested inside collections. This inventory manager keeps a catalogue of products on disk as JSON and reloads it on startup.",
            {
              label: "The model and the working set",
              content: `public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}

List<Product> inventory = new List<Product> {
    new Product { Id = 1, Name = "Keyboard", Category = "Input", Quantity = 4, Price = 25.00m },
    new Product { Id = 2, Name = "Monitor", Category = "Display", Quantity = 12, Price = 150.00m }
};`,
            },
          ),
          text(
            "Saving is one call to the serialiser and one file write. `WriteIndented` keeps the file readable so you can inspect it while developing.",
            {
              label: "Saving the catalogue",
              content: `static void SaveInventory(List<Product> items, string path) {
    var options = new JsonSerializerOptions { WriteIndented = true };
    string json = JsonSerializer.Serialize(items, options);
    File.WriteAllText(path, json);
}`,
            },
          ),
          text(
            "Loading has to survive the first run, when the file does not exist yet. Guard with `File.Exists` and return an empty list instead of letting the read throw.",
            {
              label: "Loading, safely",
              content: `static List<Product> LoadInventory(string path) {
    if (!File.Exists(path)) {
        return new List<Product>();
    }

    string json = File.ReadAllText(path);
    return JsonSerializer.Deserialize<List<Product>>(json);
}`,
            },
          ),
          text(
            "With the data in memory, the reporting is pure LINQ — the same operators from earlier in the track, now answering questions a shop owner would actually ask.",
            {
              label: "Three reports",
              content: `// Low stock alert
var lowStock = inventory
    .Where(p => p.Quantity < 5)
    .OrderBy(p => p.Quantity)
    .ToList();

// Total value of everything on the shelves
decimal totalValue = inventory.Sum(p => p.Quantity * p.Price);

// Value broken down by category
var byCategory = inventory
    .GroupBy(p => p.Category)
    .Select(g => new {
        Category = g.Key,
        Value = g.Sum(p => p.Quantity * p.Price)
    });`,
            },
          ),
          callout(
            "note",
            "This is the shape of most small business tools: a model class, a collection in memory, JSON on disk, and LINQ for every question you ask of the data. Swap the JSON file for a database and the reporting code does not change.",
          ),
          quiz(
            "Why does `LoadInventory` check `File.Exists` before reading?",
            [
              "Reading is faster when the file exists",
              "On the first run the file does not exist yet, and reading it would throw",
              "File.Exists creates the file if missing",
              "JSON files must be validated before reading",
            ],
            1,
            "Before the first save there is no file. Without the guard, ReadAllText throws FileNotFoundException and the app crashes on startup instead of beginning with an empty catalogue.",
          ),
        ],
        challenge: {
          title: "Save and Load the Catalogue",
          description:
            "Implement `SaveInventory` to serialise `items` with `JsonSerializer.Serialize` and write it using `File.WriteAllText`. Then implement `LoadInventory` to return a new empty list when the file is missing, otherwise read it and return `JsonSerializer.Deserialize<List<Product>>`.",
          starterCode: `using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
}

class Program {
    static void SaveInventory(List<Product> items, string path) {
        // Serialise items and write them to path

    }

    static List<Product> LoadInventory(string path) {
        // Return an empty list if the file is missing, otherwise load it

        return new List<Product>();
    }

    static void Main() {
        List<Product> inventory = new List<Product>();
        SaveInventory(inventory, "inventory.json");
        Console.WriteLine(LoadInventory("inventory.json").Count);
    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
}

class Program {
    static void SaveInventory(List<Product> items, string path) {
        string json = JsonSerializer.Serialize(items);
        File.WriteAllText(path, json);
    }

    static List<Product> LoadInventory(string path) {
        if (!File.Exists(path)) {
            return new List<Product>();
        }

        string json = File.ReadAllText(path);
        return JsonSerializer.Deserialize<List<Product>>(json);
    }

    static void Main() {
        List<Product> inventory = new List<Product>();
        SaveInventory(inventory, "inventory.json");
        Console.WriteLine(LoadInventory("inventory.json").Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Serialises the catalogue",
              keywords: [{ pattern: "JsonSerializer\\.Serialize" }],
            },
            {
              id: 2,
              label: "Writes the JSON to disk",
              keywords: [{ pattern: "File\\.WriteAllText" }],
            },
            {
              id: 3,
              label: "Guards on File.Exists and deserialises the list",
              keywords: [
                { pattern: "File\\.Exists" },
                { pattern: "Deserialize<List<Product>>" },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "project-library-lending",
    title: "Project 6: Library Lending System",
    icon: "📚",
    color: ACCENT,
    lessons: [
      {
        id: "cs-proj-5",
        title: "Project 6: Library Lending System",
        xp: 26,
        theory: [
          text(
            "The final project pulls in the parts of the track the earlier projects never touched: **records** for immutable facts, **custom comparers** for sorting, **nested collections** for grouping, and LINQ for the reports.",
            {
              label: "Books and loans",
              content: `public class Book : IComparable<Book> {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }

    public int CompareTo(Book other) {
        return Title.CompareTo(other.Title);
    }
}

// A loan is a historical fact — once recorded it should not mutate
public record Loan(int BookId, string Member, DateTime DueDate, bool Returned);`,
            },
          ),
          text(
            "Because `Book` implements `IComparable<Book>`, the catalogue sorts itself by title. A separate `IComparer<Book>` handles the alternative order without touching the class.",
            {
              label: "Two orderings, one type",
              content: `books.Sort();                      // by title, the natural order

class ByAuthor : IComparer<Book> {
    public int Compare(Book a, Book b) {
        return a.Author.CompareTo(b.Author);
    }
}

books.Sort(new ByAuthor());        // by author, on demand`,
            },
          ),
          text(
            "Loans per member is the dictionary-of-lists pattern. The inner list has to exist before you add to it, so create it on demand.",
            {
              label: "Grouping loans by member",
              content: `Dictionary<string, List<Loan>> byMember = new Dictionary<string, List<Loan>>();

static void Record(Dictionary<string, List<Loan>> store, Loan loan) {
    if (!store.ContainsKey(loan.Member)) {
        store[loan.Member] = new List<Loan>();
    }

    store[loan.Member].Add(loan);
}`,
            },
          ),
          text(
            "The reports are LINQ queries over those loans — overdue items first, then a ranking of what gets borrowed most.",
            {
              label: "Overdue and most-borrowed",
              content: `// Still out, and past the due date
var overdue = loans
    .Where(l => !l.Returned && l.DueDate < DateTime.Today)
    .OrderBy(l => l.DueDate)
    .ToList();

// Which books circulate most
var popular = loans
    .GroupBy(l => l.BookId)
    .Select(g => new { BookId = g.Key, Times = g.Count() })
    .OrderByDescending(x => x.Times)
    .ToList();`,
            },
          ),
          callout(
            "note",
            "Notice how little new machinery this needs. Records, comparers, nested collections and LINQ were each taught separately — a real project is mostly deciding which of them fits each part of the problem.",
          ),
          quiz(
            "Why is `Loan` declared as a `record` rather than a class?",
            [
              "Records are faster than classes",
              "A loan is an immutable fact with value equality — two identical loans are the same loan",
              "Only records can go in a Dictionary",
              "Records are required for LINQ queries",
            ],
            1,
            "A recorded loan should not change after the fact, and comparing loans by their contents rather than by object identity is exactly the value semantics a record provides.",
          ),
        ],
        challenge: {
          title: "Build the Overdue Report",
          description:
            "Implement `OverdueLoans(List<Loan> loans)` so it returns every loan that has **not** been returned and whose `DueDate` is earlier than `DateTime.Today`, ordered by `DueDate` with the oldest first.",
          starterCode: `using System;
using System.Collections.Generic;
using System.Linq;

public record Loan(int BookId, string Member, DateTime DueDate, bool Returned);

class Program {
    static List<Loan> OverdueLoans(List<Loan> loans) {
        // Filter out returned loans, keep those past their due date,
        // order by DueDate oldest first

        return new List<Loan>();
    }

    static void Main() {
        List<Loan> loans = new List<Loan> {
            new Loan(1, "Ali", DateTime.Today.AddDays(-3), false),
            new Loan(2, "Sara", DateTime.Today.AddDays(5), false)
        };

        Console.WriteLine(OverdueLoans(loans).Count);
    }
}`,
          solutionCode: `using System;
using System.Collections.Generic;
using System.Linq;

public record Loan(int BookId, string Member, DateTime DueDate, bool Returned);

class Program {
    static List<Loan> OverdueLoans(List<Loan> loans) {
        return loans
            .Where(l => !l.Returned && l.DueDate < DateTime.Today)
            .OrderBy(l => l.DueDate)
            .ToList();
    }

    static void Main() {
        List<Loan> loans = new List<Loan> {
            new Loan(1, "Ali", DateTime.Today.AddDays(-3), false),
            new Loan(2, "Sara", DateTime.Today.AddDays(5), false)
        };

        Console.WriteLine(OverdueLoans(loans).Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Filters unreturned, overdue loans",
              keywords: [
                { pattern: "\\.Where\\s*\\(" },
                { pattern: "!l\\.Returned" },
                { pattern: "DateTime\\.Today" },
              ],
            },
            {
              id: 2,
              label: "Orders by due date",
              keywords: [{ pattern: "OrderBy\\s*\\(\\s*l\\s*=>\\s*l\\.DueDate" }],
            },
            {
              id: 3,
              label: "Returns a materialised list",
              keywords: [{ pattern: "\\.ToList\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_PROJECTS_CHAPTERS = RAW_CSHARP_PROJECTS_CHAPTERS;

export const CSHARP_PROJECTS_LESSONS = CSHARP_PROJECTS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const CSHARP_PROJECTS_TOTAL_XP = CSHARP_PROJECTS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
