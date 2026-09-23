// PolyCode — C# File Handling Interactive Course
// 6 chapters · 12 lessons · Browser sandbox validation
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

const RAW_CSHARP_FILE_HANDLING_CHAPTERS = [
  {
    id: "reading-writing-files",
    title: "Reading & Writing Files",
    icon: "📄",
    color: ACCENT,
    lessons: [
      {
        id: "cs-file-0",
        title: "Writing Text Files",
        xp: 13,
        theory: [
          text(
            "The `System.IO` namespace's `File` class provides simple static methods for reading and writing files without manually managing streams.",
            {
              label: "Writing a text file",
              content: `using System.IO;

File.WriteAllText("notes.txt", "Hello, PolyCode!");

// Append instead of overwrite
File.AppendAllText("notes.txt", "\\nSecond line.");`,
            },
          ),
          text(
            "`WriteAllText` **overwrites** the file each time it's called. Use `AppendAllText` if you want to add to the end without erasing what's already there.",
          ),
          callout(
            "warn",
            "`WriteAllText` will happily overwrite an existing file with no warning — always double check the path before writing.",
          ),
          quiz(
            "What's the difference between File.WriteAllText and File.AppendAllText?",
            [
              "There is no difference",
              "WriteAllText overwrites the file; AppendAllText adds to the end",
              "AppendAllText only works with numbers",
              "WriteAllText is faster but less safe",
            ],
            1,
            "WriteAllText replaces the file's entire contents. AppendAllText adds new content to the end, keeping what was already there.",
          ),
        ],
        challenge: {
          title: "Write a Log Entry",
          description:
            "Use `File.WriteAllText` to write the string `\"Log started\"` to a file named `\"log.txt\"`. Then use `File.AppendAllText` to add `\"\\nUser logged in\"`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Write "Log started" to log.txt


        // Append "\\nUser logged in"

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        File.WriteAllText("log.txt", "Log started");
        File.AppendAllText("log.txt", "\\nUser logged in");
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses File.WriteAllText",
              keywords: [{ pattern: "File\\.WriteAllText" }],
            },
            {
              id: 2,
              label: "Uses File.AppendAllText",
              keywords: [{ pattern: "File\\.AppendAllText" }],
            },
            {
              id: 3,
              label: "Writes to log.txt",
              keywords: [{ pattern: "\"log\\.txt\"" }],
            },
          ],
        },
      },
      {
        id: "cs-file-1",
        title: "Reading Text Files",
        xp: 13,
        theory: [
          text(
            "`File.ReadAllText` reads an entire file into a single string. `File.ReadAllLines` reads it into a `string[]`, one entry per line — often more useful for processing.",
            {
              label: "Reading a file",
              content: `using System.IO;

string content = File.ReadAllText("notes.txt");
Console.WriteLine(content);

string[] lines = File.ReadAllLines("notes.txt");
foreach (string line in lines) {
    Console.WriteLine(line);
}`,
            },
          ),
          callout(
            "tip",
            "Reading a file that doesn't exist throws a `FileNotFoundException`. Check `File.Exists(path)` first if the file might be missing.",
          ),
          quiz(
            "Which method reads a file into a string[] with one entry per line?",
            [
              "File.ReadAllText",
              "File.ReadAllLines",
              "File.ReadLine",
              "File.OpenText",
            ],
            1,
            "`File.ReadAllLines` splits the file content by line breaks and returns a `string[]`.",
          ),
        ],
        challenge: {
          title: "Count Lines in a File",
          description:
            "Use `File.ReadAllLines(\"notes.txt\")` to read the file into a `string[]` named `lines`, then print `lines.Length`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Read notes.txt into "lines" and print its length

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        string[] lines = File.ReadAllLines("notes.txt");
        Console.WriteLine(lines.Length);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses File.ReadAllLines",
              keywords: [{ pattern: "File\\.ReadAllLines" }],
            },
            {
              id: 2,
              label: "Stores result in a string array",
              keywords: [{ pattern: "string\\[\\]\\s+lines" }],
            },
            {
              id: 3,
              label: "Prints lines.Length",
              keywords: [{ pattern: "lines\\.Length" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "checking-managing-files",
    title: "Checking & Managing Files",
    icon: "🗂️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-file-2",
        title: "File.Exists, Delete, and Copy",
        xp: 14,
        theory: [
          text(
            "Before reading or writing, it's good practice to check whether a file exists using `File.Exists(path)`, which returns a `bool` and never throws.",
            {
              label: "Checking, deleting, copying",
              content: `using System.IO;

if (File.Exists("notes.txt")) {
    Console.WriteLine("File found!");
}

File.Copy("notes.txt", "notes_backup.txt", overwrite: true);
File.Delete("old_log.txt");`,
            },
          ),
          callout(
            "warn",
            "`File.Delete` does not throw if the file is missing — it simply does nothing. Always confirm important deletes with `File.Exists` first if you need to know whether anything was actually removed.",
          ),
          quiz(
            "What does File.Exists(path) return if the path doesn't point to a real file?",
            [
              "Throws a FileNotFoundException",
              "false",
              "null",
              "Creates the file automatically",
            ],
            1,
            "File.Exists safely returns false for a missing path — it never throws, which is why it's the standard way to guard file operations.",
          ),
        ],
        challenge: {
          title: "Safe Backup",
          description:
            "Check if `\"data.txt\"` exists with `File.Exists`. If it does, copy it to `\"data_backup.txt\"` using `File.Copy` with `overwrite: true`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // If data.txt exists, copy it to data_backup.txt

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        if (File.Exists("data.txt")) {
            File.Copy("data.txt", "data_backup.txt", overwrite: true);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses File.Exists",
              keywords: [{ pattern: "File\\.Exists" }],
            },
            {
              id: 2,
              label: "Uses File.Copy",
              keywords: [{ pattern: "File\\.Copy" }],
            },
            {
              id: 3,
              label: "Copies to data_backup.txt",
              keywords: [{ pattern: "\"data_backup\\.txt\"" }],
            },
          ],
        },
      },
      {
        id: "cs-file-3",
        title: "Working with Directories",
        xp: 13,
        theory: [
          text(
            "The `Directory` class mirrors `File` but works on folders — creating them, checking existence, and listing their contents.",
            {
              label: "Directory operations",
              content: `using System.IO;

if (!Directory.Exists("logs")) {
    Directory.CreateDirectory("logs");
}

string[] files = Directory.GetFiles("logs");
Console.WriteLine(files.Length);`,
            },
          ),
          callout(
            "tip",
            "`Directory.CreateDirectory` is safe to call even if the directory already exists — it just does nothing in that case, unlike some other languages' APIs.",
          ),
          quiz(
            "What happens if you call Directory.CreateDirectory on a folder that already exists?",
            [
              "It throws an exception",
              "It silently succeeds with no error",
              "It deletes and recreates the folder",
              "It renames the existing folder",
            ],
            1,
            "Directory.CreateDirectory is idempotent — calling it on an existing directory is a safe no-op.",
          ),
        ],
        challenge: {
          title: "Ensure Logs Folder Exists",
          description:
            "Check if a directory named `\"logs\"` exists using `Directory.Exists`. If it doesn't, create it with `Directory.CreateDirectory`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Ensure the "logs" directory exists

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        if (!Directory.Exists("logs")) {
            Directory.CreateDirectory("logs");
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses Directory.Exists",
              keywords: [{ pattern: "Directory\\.Exists" }],
            },
            {
              id: 2,
              label: "Uses Directory.CreateDirectory",
              keywords: [{ pattern: "Directory\\.CreateDirectory" }],
            },
            {
              id: 3,
              label: "Targets the logs folder",
              keywords: [{ pattern: "\"logs\"" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "streams-exceptions",
    title: "Streams & Exception Safety",
    icon: "🛡️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-file-4",
        title: "StreamWriter and StreamReader",
        xp: 14,
        theory: [
          text(
            "For large files or line-by-line processing, `StreamWriter` and `StreamReader` are more efficient than loading everything into memory at once. Wrap them in a `using` block so they're closed automatically.",
            {
              label: "Streaming reads and writes",
              content: `using System.IO;

using (StreamWriter writer = new StreamWriter("big.txt")) {
    writer.WriteLine("Line one");
    writer.WriteLine("Line two");
}

using (StreamReader reader = new StreamReader("big.txt")) {
    string line;
    while ((line = reader.ReadLine()) != null) {
        Console.WriteLine(line);
    }
}`,
            },
          ),
          callout(
            "tip",
            "A `using` block automatically calls `Dispose()` on the stream when the block ends — even if an exception is thrown — which releases the file handle. Always wrap streams this way.",
          ),
          quiz(
            "Why wrap a StreamWriter in a using block?",
            [
              "It's required by the compiler",
              "It automatically closes and releases the file when done, even on error",
              "It makes the code run faster",
              "It's only needed for reading, not writing",
            ],
            1,
            "The using block guarantees Dispose() runs, closing the file handle — critical for avoiding locked or corrupted files, especially if an exception occurs mid-write.",
          ),
        ],
        challenge: {
          title: "Stream-Write Three Lines",
          description:
            "Use a `using (StreamWriter writer = new StreamWriter(\"out.txt\"))` block to write three lines: `\"one\"`, `\"two\"`, `\"three\"`, each with `writer.WriteLine`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Use a StreamWriter in a using block to write three lines

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        using (StreamWriter writer = new StreamWriter("out.txt")) {
            writer.WriteLine("one");
            writer.WriteLine("two");
            writer.WriteLine("three");
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses a using block with StreamWriter",
              keywords: [{ pattern: "using\\s*\\(StreamWriter" }],
            },
            {
              id: 2,
              label: "Calls WriteLine at least once",
              keywords: [{ pattern: "writer\\.WriteLine" }],
            },
            {
              id: 3,
              label: "Writes to out.txt",
              keywords: [{ pattern: "\"out\\.txt\"" }],
            },
          ],
        },
      },
      {
        id: "cs-file-5",
        title: "Handling File Errors with try/catch",
        xp: 13,
        theory: [
          text(
            "File operations can fail for reasons outside your control — missing files, permissions, a locked file. Wrap risky file code in `try`/`catch` to handle these gracefully instead of crashing.",
            {
              label: "Safe file reading",
              content: `using System;
using System.IO;

try {
    string content = File.ReadAllText("config.txt");
    Console.WriteLine(content);
} catch (FileNotFoundException) {
    Console.WriteLine("Config file is missing — using defaults.");
} catch (UnauthorizedAccessException) {
    Console.WriteLine("No permission to read this file.");
}`,
            },
          ),
          callout(
            "tip",
            "Catch the **most specific** exception type first (like `FileNotFoundException`), and fall back to a general `catch (Exception ex)` only if you need a catch-all.",
          ),
          quiz(
            "Why catch specific exception types like FileNotFoundException instead of just Exception?",
            [
              "It's not possible to catch specific types in C#",
              "Specific catches let you respond differently to different failure causes",
              "General Exception catches run faster",
              "It has no practical difference",
            ],
            1,
            "Catching specific exception types lets your program react appropriately — e.g. use default settings for a missing file vs. prompting for permissions on access errors.",
          ),
        ],
        challenge: {
          title: "Safe Config Read",
          description:
            "Wrap `File.ReadAllText(\"config.txt\")` in a `try`/`catch` block. In the `catch (FileNotFoundException)` block, print `\"Config file is missing\"`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Try reading config.txt; catch FileNotFoundException

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        try {
            string content = File.ReadAllText("config.txt");
            Console.WriteLine(content);
        } catch (FileNotFoundException) {
            Console.WriteLine("Config file is missing");
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Uses a try block",
              keywords: [{ pattern: "try\\s*\\{" }],
            },
            {
              id: 2,
              label: "Catches FileNotFoundException",
              keywords: [{ pattern: "catch\\s*\\(FileNotFoundException\\)" }],
            },
            {
              id: 3,
              label: "Reads config.txt",
              keywords: [{ pattern: "\"config\\.txt\"" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "paths-metadata",
    title: "Paths & File Metadata",
    icon: "📍",
    color: ACCENT,
    lessons: [
      {
        id: "cs-file-6",
        title: "Building Paths with Path",
        xp: 14,
        theory: [
          text(
            "Gluing paths together with `+` works on your machine and breaks on someone else's. Windows separates folders with `\\\\`, Linux and macOS with `/`. The **`Path`** class picks the right one for the platform your code is running on.",
            {
              label: "Path.Combine instead of string concatenation",
              content: `using System.IO;

// Fragile — hard-codes a separator, doubles up if data already ends with one
string bad = "data" + "\\\\" + "report.txt";

// Correct — Path inserts exactly one platform-appropriate separator
string good = Path.Combine("data", "report.txt");`,
            },
          ),
          text(
            "`Path` also pulls a path apart. These are pure string operations — they do not touch the disk, so they work on paths for files that do not exist yet.",
            {
              label: "Taking a path apart",
              content: `string full = Path.Combine("reports", "2026", "sales.csv");

Console.WriteLine(Path.GetFileName(full));              // sales.csv
Console.WriteLine(Path.GetFileNameWithoutExtension(full)); // sales
Console.WriteLine(Path.GetExtension(full));             // .csv
Console.WriteLine(Path.GetDirectoryName(full));         // reports/2026`,
            },
          ),
          text(
            "A **relative** path is resolved against the process's current directory; an **absolute** path is complete on its own. `Path.GetFullPath` converts one to the other, and `Path.IsPathRooted` tells you which you are holding.",
            {
              label: "Relative vs absolute",
              content: `Console.WriteLine(Path.IsPathRooted("data/report.txt"));   // False
Console.WriteLine(Path.GetFullPath("data/report.txt"));   // /current/dir/data/report.txt`,
            },
          ),
          callout(
            "tip",
            "`Path.Combine` ignores everything before an absolute segment: `Path.Combine(\"data\", \"/etc/passwd\")` returns `/etc/passwd`. Never build a path from untrusted input without validating it first.",
          ),
          quiz(
            "Why use `Path.Combine(\"data\", \"report.txt\")` instead of `\"data/\" + \"report.txt\"`?",
            [
              "It is faster",
              "It uses the correct separator for the current platform and avoids doubled separators",
              "It creates the file if missing",
              "It returns an absolute path",
            ],
            1,
            "Path.Combine inserts exactly one platform-appropriate separator, so the same code produces valid paths on Windows, Linux and macOS.",
          ),
        ],
        challenge: {
          title: "Assemble a Report Path",
          description:
            "Use `Path.Combine` to build a path from `\"reports\"`, `\"2026\"` and `\"sales.csv\"` into a variable named `full`. Then print the file name with `Path.GetFileName` and the extension with `Path.GetExtension`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Combine the three segments into full


        // Print the file name and the extension

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        string full = Path.Combine("reports", "2026", "sales.csv");

        Console.WriteLine(Path.GetFileName(full));
        Console.WriteLine(Path.GetExtension(full));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Builds the path with Path.Combine",
              keywords: [{ pattern: "Path\\.Combine\\s*\\(" }],
            },
            {
              id: 2,
              label: "Prints the file name",
              keywords: [{ pattern: "Path\\.GetFileName\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the extension",
              keywords: [{ pattern: "Path\\.GetExtension\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "cs-file-7",
        title: "FileInfo & DirectoryInfo",
        xp: 15,
        theory: [
          text(
            "`File` and `Directory` are **static** helpers — each call looks the path up again. `FileInfo` and `DirectoryInfo` are **instance** classes that wrap one path, which is cheaper when you ask several questions about the same file.",
            {
              label: "Static vs instance APIs",
              content: `using System.IO;

// Static — three separate lookups
bool exists = File.Exists("report.txt");
DateTime written = File.GetLastWriteTime("report.txt");

// Instance — one object, many properties
FileInfo info = new FileInfo("report.txt");
Console.WriteLine(info.Exists);
Console.WriteLine(info.Length);          // size in bytes
Console.WriteLine(info.Extension);       // .txt
Console.WriteLine(info.LastWriteTime);`,
            },
          ),
          text(
            "`FileInfo` reads its values once and caches them. If the file changes while your program runs, call `Refresh()` to see the new state.",
            {
              label: "Refreshing cached metadata",
              content: `FileInfo info = new FileInfo("log.txt");
Console.WriteLine(info.Length);

File.AppendAllText("log.txt", "more data");

info.Refresh();                 // without this, Length is stale
Console.WriteLine(info.Length);`,
            },
          ),
          text(
            "`DirectoryInfo` does the same for folders and can list what is inside, returning `FileInfo` objects you can inspect without a second disk lookup.",
            {
              label: "Listing a folder",
              content: `DirectoryInfo dir = new DirectoryInfo("reports");

foreach (FileInfo file in dir.GetFiles("*.csv")) {
    Console.WriteLine(file.Name + " - " + file.Length + " bytes");
}`,
            },
          ),
          callout(
            "warning",
            "Reading `Length` on a file that does not exist throws `FileNotFoundException`. Check `info.Exists` first — unlike `Length`, that property is safe on a missing file.",
          ),
          quiz(
            "You need the size, extension and last-write time of one file. Which is the better choice?",
            [
              "Three separate static File calls",
              "One FileInfo instance",
              "A DirectoryInfo instance",
              "Path.GetFullPath",
            ],
            1,
            "A FileInfo wraps one path and exposes all of its metadata from a single lookup, instead of resolving the path once per static call.",
          ),
        ],
        challenge: {
          title: "Inspect a File",
          description:
            "Create a `FileInfo` for `\"report.txt\"` named `info`. Print its `Exists` value, and inside an `if (info.Exists)` block print its `Length` and `Extension`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Create the FileInfo


        // Print Exists, then Length and Extension if it exists

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        FileInfo info = new FileInfo("report.txt");

        Console.WriteLine(info.Exists);

        if (info.Exists) {
            Console.WriteLine(info.Length);
            Console.WriteLine(info.Extension);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Creates a FileInfo",
              keywords: [{ pattern: "new\\s+FileInfo\\s*\\(" }],
            },
            {
              id: 2,
              label: "Guards on Exists",
              keywords: [{ pattern: "info\\.Exists" }],
            },
            {
              id: 3,
              label: "Reads Length and Extension",
              keywords: [{ pattern: "info\\.Length" }, { pattern: "info\\.Extension" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "structured-data-files",
    title: "Structured Data: CSV & JSON",
    icon: "🧾",
    color: ACCENT,
    lessons: [
      {
        id: "cs-file-8",
        title: "Reading & Writing CSV",
        xp: 15,
        theory: [
          text(
            "A CSV file is plain text where each line is a record and commas separate the fields. Writing one is `string.Join` per row; reading one is `Split` per line.",
            {
              label: "Writing rows",
              content: `using System.IO;
using System.Collections.Generic;

List<string> lines = new List<string> { "Name,Score" };
lines.Add(string.Join(",", "Ali", 80));
lines.Add(string.Join(",", "Sara", 92));

File.WriteAllLines("scores.csv", lines);`,
            },
          ),
          text(
            "Reading it back means splitting each line and converting the text to the type you need. The header row is data too — skip it explicitly.",
            {
              label: "Parsing rows",
              content: `string[] lines = File.ReadAllLines("scores.csv");

for (int i = 1; i < lines.Length; i++) {     // start at 1 to skip the header
    string[] parts = lines[i].Split(',');
    string name = parts[0];
    int score = int.Parse(parts[1]);
    Console.WriteLine(name + " scored " + score);
}`,
            },
          ),
          text(
            "Use `int.TryParse` rather than `int.Parse` on real files. One malformed row should not crash the whole import.",
            {
              label: "Parsing defensively",
              content: `if (int.TryParse(parts[1], out int score)) {
    Console.WriteLine(name + " scored " + score);
} else {
    Console.WriteLine("Skipping bad row: " + lines[i]);
}`,
            },
          ),
          callout(
            "warning",
            "Naive `Split(',')` breaks on quoted fields containing commas — `\"Ali, Jr\",80` splits into three parts, not two. Hand-rolled parsing is fine for data you control; use a CSV library for data you do not.",
          ),
          quiz(
            "Why start the read loop at index 1 instead of 0?",
            [
              "Arrays in C# start at 1",
              "Index 0 holds the header row, which is not a data record",
              "The first line is always empty",
              "To skip the file's encoding marker",
            ],
            1,
            "File.ReadAllLines returns every line including the header. Starting at index 1 skips the column names so they are not parsed as a record.",
          ),
        ],
        challenge: {
          title: "Parse a Scores File",
          description:
            "Read `\"scores.csv\"` with `File.ReadAllLines`, loop from index `1` to skip the header, `Split` each line on `','`, and print the name from `parts[0]`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Read all lines


        // Loop from 1, split each line, print the name

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        string[] lines = File.ReadAllLines("scores.csv");

        for (int i = 1; i < lines.Length; i++) {
            string[] parts = lines[i].Split(',');
            Console.WriteLine(parts[0]);
        }
    }
}`,
          tests: [
            {
              id: 1,
              label: "Reads every line",
              keywords: [{ pattern: "File\\.ReadAllLines\\s*\\(" }],
            },
            {
              id: 2,
              label: "Skips the header row",
              keywords: [{ pattern: "i\\s*=\\s*1" }],
            },
            {
              id: 3,
              label: "Splits on a comma",
              keywords: [{ pattern: "\\.Split\\s*\\(\\s*','" }],
            },
          ],
        },
      },
      {
        id: "cs-file-9",
        title: "JSON with System.Text.Json",
        xp: 16,
        theory: [
          text(
            "CSV only stores flat rows. For nested objects, use JSON — and .NET has a built-in serialiser, `System.Text.Json`, with no package to install.",
            {
              label: "Object to JSON file",
              content: `using System.IO;
using System.Text.Json;

class Player {
    public string Name { get; set; }
    public int Score { get; set; }
}

Player p = new Player { Name = "Ali", Score = 80 };

string json = JsonSerializer.Serialize(p);
File.WriteAllText("player.json", json);

Console.WriteLine(json);   // {"Name":"Ali","Score":80}`,
            },
          ),
          text(
            "Reading it back is the mirror image. `Deserialize<T>` needs to know the target type, and that type needs **public properties with setters** and a parameterless constructor.",
            {
              label: "JSON file to object",
              content: `string text = File.ReadAllText("player.json");
Player loaded = JsonSerializer.Deserialize<Player>(text);

Console.WriteLine(loaded.Name);   // Ali`,
            },
          ),
          text(
            "Collections serialise the same way — no extra work for a whole list of objects.",
            {
              label: "Serialising a list, formatted",
              content: `List<Player> players = GetPlayers();

var options = new JsonSerializerOptions { WriteIndented = true };
string json = JsonSerializer.Serialize(players, options);

File.WriteAllText("players.json", json);`,
            },
          ),
          callout(
            "info",
            "`WriteIndented = true` produces readable, multi-line JSON for config files and debugging. Leave it off for data you only ever read back in code — it is smaller and faster.",
          ),
          quiz(
            "What does `JsonSerializer.Deserialize<Player>(text)` require of the `Player` class?",
            [
              "Nothing — any class works",
              "Public properties with setters and a parameterless constructor",
              "It must inherit from JsonObject",
              "Every field must be a string",
            ],
            1,
            "The serialiser constructs the object and sets its properties, so it needs a parameterless constructor and accessible setters to populate.",
          ),
        ],
        challenge: {
          title: "Save a Player as JSON",
          description:
            "Create a `Player` with `Name = \"Ali\"` and `Score = 80`, serialise it with `JsonSerializer.Serialize`, write it to `\"player.json\"` with `File.WriteAllText`, and print the JSON string.",
          starterCode: `using System;
using System.IO;
using System.Text.Json;

class Player {
    public string Name { get; set; }
    public int Score { get; set; }
}

class Program {
    static void Main() {
        // Create the player


        // Serialise, write to file, and print the JSON

    }
}`,
          solutionCode: `using System;
using System.IO;
using System.Text.Json;

class Player {
    public string Name { get; set; }
    public int Score { get; set; }
}

class Program {
    static void Main() {
        Player p = new Player { Name = "Ali", Score = 80 };

        string json = JsonSerializer.Serialize(p);
        File.WriteAllText("player.json", json);

        Console.WriteLine(json);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Serialises with JsonSerializer",
              keywords: [{ pattern: "JsonSerializer\\.Serialize\\s*\\(" }],
            },
            {
              id: 2,
              label: "Writes the JSON to a file",
              keywords: [{ pattern: "File\\.WriteAllText\\s*\\(" }],
            },
            {
              id: 3,
              label: "Prints the JSON string",
              keywords: [{ pattern: "Console\\.WriteLine\\s*\\(\\s*json" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "binary-async-io",
    title: "Binary Files & Async I/O",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-file-10",
        title: "Binary Files & Byte Arrays",
        xp: 15,
        theory: [
          text(
            "Images, audio and compiled files are not text. Reading them with `ReadAllText` corrupts them, because the bytes get run through a character decoder. Use the byte-level API instead.",
            {
              label: "Whole-file byte access",
              content: `using System.IO;

byte[] data = File.ReadAllBytes("logo.png");
Console.WriteLine(data.Length + " bytes");

File.WriteAllBytes("copy.png", data);`,
            },
          ),
          text(
            "For structured binary — your own save format, say — `BinaryWriter` and `BinaryReader` write and read typed values, each one preceded by nothing but its own bytes.",
            {
              label: "Writing typed values",
              content: `using (BinaryWriter writer = new BinaryWriter(File.Open("save.dat", FileMode.Create))) {
    writer.Write(42);           // int
    writer.Write("Ali");        // string
    writer.Write(3.5);          // double
}`,
            },
          ),
          text(
            "Reading must happen in **exactly the same order and types** as writing — the file holds no field names to guide you. One mismatched read desynchronises everything after it.",
            {
              label: "Reading in the same order",
              content: `using (BinaryReader reader = new BinaryReader(File.Open("save.dat", FileMode.Open))) {
    int score = reader.ReadInt32();
    string name = reader.ReadString();
    double time = reader.ReadDouble();

    Console.WriteLine(name + " " + score);
}`,
            },
          ),
          callout(
            "warning",
            "`ReadAllBytes` loads the entire file into memory. For a large file, open a `FileStream` and process it in chunks instead of allocating hundreds of megabytes at once.",
          ),
          quiz(
            "Why must `BinaryReader` calls match the order and types used by `BinaryWriter`?",
            [
              "The file stores field names that must match",
              "The file is a raw byte sequence with no structure to guide reads",
              "BinaryReader sorts values alphabetically",
              "It does not matter — the reader detects types",
            ],
            1,
            "A binary file is just bytes. The reader trusts you to ask for the same types in the same order; reading an int where a string was written desynchronises the whole stream.",
          ),
        ],
        challenge: {
          title: "Copy a File as Bytes",
          description:
            "Read `\"logo.png\"` into a `byte[]` named `data` with `File.ReadAllBytes`, print `data.Length`, then write the bytes to `\"copy.png\"` with `File.WriteAllBytes`.",
          starterCode: `using System;
using System.IO;

class Program {
    static void Main() {
        // Read the file as bytes


        // Print the length and write the copy

    }
}`,
          solutionCode: `using System;
using System.IO;

class Program {
    static void Main() {
        byte[] data = File.ReadAllBytes("logo.png");

        Console.WriteLine(data.Length);

        File.WriteAllBytes("copy.png", data);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Reads the file as bytes",
              keywords: [{ pattern: "File\\.ReadAllBytes\\s*\\(" }],
            },
            {
              id: 2,
              label: "Declares a byte array",
              keywords: [{ pattern: "byte\\s*\\[\\s*\\]\\s+data" }],
            },
            {
              id: 3,
              label: "Writes the copy",
              keywords: [{ pattern: "File\\.WriteAllBytes\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "cs-file-11",
        title: "Async File I/O",
        xp: 16,
        theory: [
          text(
            "Disk access is slow compared with the CPU. A synchronous `File.ReadAllText` blocks its thread until the disk answers — fine in a console tool, but in a server or a UI it wastes a thread that could be serving someone else.",
            {
              label: "The async versions",
              content: `using System.IO;
using System.Threading.Tasks;

static async Task SaveAsync() {
    await File.WriteAllTextAsync("log.txt", "started");

    string text = await File.ReadAllTextAsync("log.txt");
    Console.WriteLine(text);
}`,
            },
          ),
          text(
            "Any method using `await` must be marked `async` and return `Task` (or `Task<T>` when it produces a value). `Main` can be async too.",
            {
              label: "An async Main",
              content: `static async Task Main() {
    string text = await File.ReadAllTextAsync("log.txt");
    Console.WriteLine(text);
}`,
            },
          ),
          text(
            "`await` does not make the read faster — it frees the thread while the disk works, so the program can do something else meanwhile. The payoff is throughput under load, not raw speed.",
          ),
          callout(
            "warning",
            "Never call `.Result` or `.Wait()` on a file task to \"avoid\" async. In UI and server contexts that can deadlock. Let `async` flow all the way up to `Main`.",
          ),
          quiz(
            "What does `await File.ReadAllTextAsync(...)` gain over the synchronous version?",
            [
              "The disk reads faster",
              "The thread is released while the disk works, instead of blocking",
              "The file is cached in memory",
              "It skips exception handling",
            ],
            1,
            "Async I/O does not speed up the disk — it stops a thread sitting idle waiting for it, which matters when many operations run at once.",
          ),
        ],
        challenge: {
          title: "Write and Read Asynchronously",
          description:
            "Write a `static async Task Main()` that awaits `File.WriteAllTextAsync` to put `\"started\"` in `\"log.txt\"`, then awaits `File.ReadAllTextAsync` to read it back and prints the result.",
          starterCode: `using System;
using System.IO;
using System.Threading.Tasks;

class Program {
    // Make Main async and return Task
    static void Main() {
        // await the write, then the read, then print

    }
}`,
          solutionCode: `using System;
using System.IO;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        await File.WriteAllTextAsync("log.txt", "started");

        string text = await File.ReadAllTextAsync("log.txt");

        Console.WriteLine(text);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares an async Task Main",
              keywords: [{ pattern: "async\\s+Task\\s+Main" }],
            },
            {
              id: 2,
              label: "Awaits the async write",
              keywords: [{ pattern: "await\\s+File\\.WriteAllTextAsync" }],
            },
            {
              id: 3,
              label: "Awaits the async read",
              keywords: [{ pattern: "await\\s+File\\.ReadAllTextAsync" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_FILE_HANDLING_CHAPTERS = RAW_CSHARP_FILE_HANDLING_CHAPTERS;

export const CSHARP_FILE_HANDLING_LESSONS = CSHARP_FILE_HANDLING_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const CSHARP_FILE_HANDLING_TOTAL_XP = CSHARP_FILE_HANDLING_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
