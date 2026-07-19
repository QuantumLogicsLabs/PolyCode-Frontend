import {
  Boxes,
  FileText,
  Grid3x3,
  Globe,
  Layers3,
  Play,
  Brain,
  Table2,
  Terminal,
  Presentation,
  Coffee,
  BrainCircuit,
  Server,
  Cpu,
  HardDrive,
  FolderOpen,
  Database,
  Wrench,
} from "lucide-react";

export function languageKey(value = "") {
  const normalized = value.toLowerCase().replace(/\s+/g, "");
  if (normalized === "html&css") return "htmlcss";
  return normalized;
}

export const generalCourses = [
  {
    title: "Core Documentation Path",
    tag: "Docs",
    icon: FileText,
    description:
      "Read curated guides, examples, syntax notes, and reference material.",
    href: "/hub",
  },
  {
    title: "Practice Playground",
    tag: "Hands-on",
    icon: Play,
    description:
      "Experiment with code, run snippets, and test ideas as you learn.",
    href: "/playground",
  },
  {
    title: "Daily Challenge",
    tag: "Routine",
    icon: Brain,
    description: "Build a steady habit with small problems and feedback.",
    href: "/daily-challenge",
  },
];

/** Interactive courses shown on /language/:language (language-specific only). */
export const languageCourses = {
  sql: [
    { title: "SQL Fundamentals", tag: "Core Course", icon: Database, description: "Learn database basics, tables, and standard SQL syntax.", href: "/learn/sql-fundamentals", accent: "#00758f" },
    { title: "SQL Queries", tag: "Core Course", icon: Database, description: "Master SELECT, WHERE, ORDER BY, and basic data retrieval.", href: "/learn/sql-queries", accent: "#00758f" },
    { title: "SQL Joins", tag: "Core Course", icon: Database, description: "Combine data from multiple tables using INNER, LEFT, and RIGHT joins.", href: "/learn/sql-joins", accent: "#00758f" },
    { title: "SQL Aggregate Functions", tag: "Core Course", icon: Database, description: "Use COUNT, SUM, AVG, and GROUP BY to analyze data.", href: "/learn/sql-aggregate-functions", accent: "#00758f" },
    { title: "SQL Subqueries", tag: "Advanced Course", icon: Database, description: "Write nested queries to solve complex data problems.", href: "/learn/sql-subqueries", accent: "#00758f" },
    { title: "SQL Indexes", tag: "Advanced Course", icon: Database, description: "Optimize database performance with indexes.", href: "/learn/sql-indexes", accent: "#00758f" },
    { title: "SQL Views", tag: "Advanced Course", icon: Database, description: "Create virtual tables to simplify complex queries.", href: "/learn/sql-views", accent: "#00758f" },
    { title: "SQL Stored Procedures", tag: "Advanced Course", icon: Database, description: "Save and reuse SQL code with stored procedures.", href: "/learn/sql-stored-procedures", accent: "#00758f" },
    { title: "SQL Projects", tag: "Projects Course", icon: Database, description: "Build real-world database schemas and analyze datasets.", href: "/learn/sql-projects", accent: "#00758f" },
  ],

  c: [
    {
      title: "C Fundamentals",
      tag: "Core Course",
      icon: Terminal,
      description:
        "Variables, data types, operators, control flow, and I/O — the solid foundation every C programmer needs.",
      href: "/learn/c-fundamentals",
      accent: "#659ad2",
    },
    {
      title: "C Functions",
      tag: "Core Course",
      icon: Wrench,
      description:
        "Declare, call, and compose functions — pass by value, recursion, scope, and function pointers.",
      href: "/learn/c-functions",
      accent: "#e67e22",
    },
    {
      title: "C Pointers",
      tag: "Memory Course",
      icon: Cpu,
      description:
        "Addresses, dereferencing, pointer arithmetic, arrays, strings, and double pointers.",
      href: "/learn/c-pointers",
      accent: "#e74c3c",
    },
    {
      title: "C Memory Management",
      tag: "Memory Course",
      icon: HardDrive,
      description:
        "Stack vs heap, malloc, calloc, realloc, free — manage memory safely and avoid leaks.",
      href: "/learn/c-memory-management",
      accent: "#8e44ad",
    },
    {
      title: "C File Handling",
      tag: "I/O Course",
      icon: FolderOpen,
      description:
        "Open, read, write, seek, and close files — persist data beyond your program's lifetime.",
      href: "/learn/c-file-handling",
      accent: "#27ae60",
    },
    {
      title: "C Data Structures",
      tag: "Advanced Course",
      icon: Database,
      description:
        "Arrays, linked lists, stacks, queues, trees, and sorting — classic structures in pure C.",
      href: "/learn/c-data-structures",
      accent: "#2980b9",
    },
    {
      title: "C Projects",
      tag: "Projects Course",
      icon: Boxes,
      description:
        "Real-world C programs — calculator, student records, file-based to-do app, and a full capstone.",
      href: "/learn/c-projects",
      accent: "#f39c12",
    },
  ],
  cpp: [
    {
      title: "C++ Fundamentals",
      tag: "Interactive Course",
      icon: Terminal,
      description:
        "Beginner to advanced C++: variables, control flow, functions, arrays, pointers, structs, OOP preview, STL, and capstone projects.",
      href: "/learn/cpp-fundamentals",
      accent: "#f34b7d",
    },
    {
      title: "OOPs C++",
      tag: "Interactive Course",
      icon: Boxes,
      description:
        "Classes, constructors, inheritance, polymorphism, design principles, and real coding challenges.",
      href: "/learn/oops-cpp",
      accent: "#ffe566",
    },
    {
      title: "Pointers C++",
      tag: "Memory Course",
      icon: Layers3,
      description:
        "Addresses, dereferencing, nullptr, arrays, 2D arrays, smart pointers, callbacks, and safety.",
      href: "/learn/pointers-cpp",
      accent: "#00d4ff",
    },
    {
      title: "DSA C++",
      tag: "Advanced Course",
      icon: Database,
      description:
        "Data structures and algorithms in C++: arrays, linked lists, trees, graphs, dynamic programming, and performance-focused problem solving.",
      href: "/learn/dsa-cpp",
      accent: "#22c55e",
    },
  ],
  "c++": [
    {
      title: "C++ Fundamentals",
      tag: "Interactive Course",
      icon: Terminal,
      description:
        "Beginner to advanced C++: variables, control flow, functions, arrays, pointers, structs, OOP preview, STL, and capstone projects.",
      href: "/learn/cpp-fundamentals",
      accent: "#f34b7d",
    },
    {
      title: "OOPs C++",
      tag: "Interactive Course",
      icon: Boxes,
      description:
        "Classes, constructors, inheritance, polymorphism, design principles, and real coding challenges.",
      href: "/learn/oops-cpp",
      accent: "#ffe566",
    },
    {
      title: "Pointers C++",
      tag: "Memory Course",
      icon: Layers3,
      description:
        "Addresses, dereferencing, nullptr, arrays, 2D arrays, smart pointers, callbacks, and safety.",
      href: "/learn/pointers-cpp",
      accent: "#00d4ff",
    },
    {
      title: "DSA C++",
      tag: "Advanced Course",
      icon: Database,
      description:
        "Data structures and algorithms in C++: arrays, linked lists, trees, graphs, dynamic programming, and performance-focused problem solving.",
      href: "/learn/dsa-cpp",
      accent: "#22c55e",
    },
  ],
  python: [
    {
      title: "Python Fundamentals",
      tag: "Core Course",
      icon: Terminal,
      description:
        "Beginner → Pro: syntax, types, control flow, collections, functions, files, OOP basics, and modern Python habits — 8 chapters with hands-on challenges.",
      href: "/learn/python-fundamentals",
      accent: "#3776ab",
    },
    {
      title: "Python OOP · py",
      tag: "Core Course",
      icon: Boxes,
      description:
        "Beginner → Pro: classes, encapsulation, inheritance, polymorphism, design patterns, capstone project, and cheat sheet — 8 chapters, 25 lessons.",
      href: "/learn/python-oop-py",
      accent: "#7c3aed",
    },
    {
      title: "File Handling · py",
      tag: "Core Course",
      icon: FolderOpen,
      description:
        "Beginner → Pro: open(), pathlib, CSV, JSON, safe I/O, binary files, logging, ETL capstone, and cheat sheet — 8 chapters, 25 lessons.",
      href: "/learn/python-file-handling-py",
      accent: "#0891b2",
    },
    {
      title: "NumPy · py",
      tag: "Data Course",
      icon: Grid3x3,
      description:
        "ndarray basics, shape, dtype, vector math, and hands-on Python challenges with NumPy.",
      href: "/learn/numpy-py",
      accent: "#4dabdc",
    },
    {
      title: "Pandas · py",
      tag: "Data Course",
      icon: Table2,
      description:
        "Series, DataFrames, filtering, cleaning, groupby, merges, and CSV workflows with Pandas.",
      href: "/learn/pandas-py",
      accent: "#059669",
    },
    {
      title: "FastAPI · py",
      tag: "API Course",
      icon: Server,
      description:
        "Beginner → advanced REST APIs: routes, Pydantic, CRUD, dependencies, routers, testing, and capstone.",
      href: "/learn/fastapi-py",
      accent: "#009688",
    },
    {
      tag: "Data Visualization",
      title: "Matplotlib · py",
      description:
        "Beginner → Pro: line plots to publication dashboards — 8 chapters, objectives per lesson, cheat sheet, and hands-on challenges.",
      href: "/learn/matplotlib-py",
      accent: "#239120",
      icon: Presentation,
    },
    {
      title: "AI/ML · py",
      tag: "Data Course",
      icon: BrainCircuit,
      description:
        "Foundations of AI/ML: Machine Learning, Deep Learning, Neural Networks, Model Evaluation, and Deployment workflows with Python.",
      href: "/learn/ai_ml-py",
      accent: "#dfbe00",
    },
  ],
  javascript: [
    {
      title: "JavaScript Fundamentals",
      tag: "Core Course",
      icon: Grid3x3,
      description:
        "Core language skills: variables, logic, functions, arrays, objects, async, and classes with hands-on challenges.",
      href: "/learn/js-fundamentals",
      accent: "#f59e0b",
    },
    {
      title: "JavaScript DOM",
      tag: "DOM Course",
      icon: Globe,
      description:
        "Build interactive browser pages with the Document Object Model: select elements, update content, handle events, and create dynamic UI safely.",
      href: "/learn/js-dom",
      accent: "#22c55e",
    },
    {
      title: "JavaScript Web Development",
      tag: "Web Course",
      icon: Globe,
      description:
        "Beginner to advanced browser track: DOM, events, forms, fetch, storage, performance, routing, accessibility, security, and capstone projects.",
      href: "/learn/js-web-dev",
      accent: "#22c55e",
    },
    {
      title: "Node.js & npm",
      tag: "Server Course",
      icon: Server,
      description:
        "Deep dive into Node.js and npm — package.json, semver, scripts, modules, security, CI, publishing, and monorepo workspaces.",
      href: "/learn/node-npm",
      accent: "#339933",
    },
  ],
  htmlcss: [
    {
      title: "HTML & CSS Foundation",
      tag: "Web Foundation",
      icon: Globe,
      description:
        "Short foundation course for semantic HTML, CSS styling, responsive layout, and Bootstrap utilities with runnable examples.",
      href: "/learn/html-css-foundation",
      accent: "#0ea5e9",
    },
  ],
  php: [
    {
      title: "PHP Fundamentals",
      tag: "Core Course",
      icon: Terminal,
      description:
        "Modern server-side PHP: strict types, control flow, match expressions, associative arrays, superglobals, OOP constructor property promotion, and custom REST API endpoints.",
      href: "/learn/php-fundamentals",
      accent: "#777bb4",
    },
    {
      title: "PHP Forms",
      tag: "Interactive Course",
      icon: FileText,
      description:
        "Handle $_GET/$_POST, validate and sanitize input, manage file uploads, and protect against CSRF attacks — with real, runnable PHP challenges.",
      href: "/learn/php-forms",
      accent: "#f97316",
    },
    {
      title: "PHP Sessions & Cookies",
      tag: "Interactive Course",
      icon: Server,
      description:
        "Manage state across requests with $_SESSION, work with cookies, build login/logout flows, and secure sessions against fixation attacks.",
      href: "/learn/php-sessions",
      accent: "#3b82f6",
    },
    {
      title: "PHP MySQL",
      tag: "Interactive Course",
      icon: Database,
      description:
        "Connect with PDO, write prepared statements, handle transactions, and build repositories — with real, runnable PHP database challenges.",
      href: "/learn/php-mysql",
      accent: "#06b6d4",
    },
    {
      title: "PHP OOP",
      tag: "Interactive Course",
      icon: Boxes,
      description:
        "Classes, inheritance, interfaces, traits, magic methods, enums, and readonly properties — with theory, quizzes, and real PHP OOP challenges.",
      href: "/learn/php-oop",
      accent: "#f59e0b",
    },
    {
      title: "Laravel Basics",
      tag: "Interactive Course",
      icon: Layers3,
      description:
        "Routing, controllers, Blade templates, Eloquent ORM, and middleware — with theory, quizzes, and real challenges covering PHP's most popular framework.",
      href: "/learn/laravel-basics",
      accent: "#ef4444",
    },
    {
      title: "PHP Projects",
      tag: "Capstone Course",
      icon: Brain,
      description:
        "Build 4 real, growing projects — a contact book, a session-backed blog, a MySQL task tracker, and a mini Laravel-style API — applying everything from Fundamentals to Laravel.",
      href: "/learn/php-projects",
      accent: "#8b5cf6",
    },
  ],
  csharp: [
    {
      title: "C# Fundamentals",
      tag: "Interactive Course",
      icon: Terminal,
      description:
        "Master Object-Oriented syntax, variables, switch patterns, collections, and class encapsulation templates locally.",
      href: "/learn/c-sharp-fundamentals",
      accent: "#179c24",
    },
  ],
  "c#": [
    {
      title: "C# Fundamentals",
      tag: "Interactive Course",
      icon: Terminal,
      description:
        "Master Object-Oriented syntax, variables, switch patterns, collections, and class encapsulation templates locally.",
      href: "/learn/c-sharp-fundamentals",
      accent: "#179c24",
    },
  ],
  java: [
    {
      title: "Java Fundamentals",
      tag: "Core Course",
      icon: Coffee,
      description:
        "Variables, control flow, OOP, collections, and modern Java — with theory, quizzes, and real challenges compiled by javac in your browser.",
      href: "/learn/java-fundamentals",
      accent: "#e76f00",
    },
    {
      title: "Java OOP",
      tag: "Core Course",
      icon: Boxes,
      description:
        "Abstract classes, polymorphism, interfaces, generics, collections, File I/O, Streams, Optional, and Records.",
      href: "/learn/java-intermediate",
      accent: "#f59e0b",
    },
    {
      title: "Java Exception Handling",
      tag: "Intermediate Course",
      icon: Terminal,
      description:
        "Checked and unchecked exceptions, custom exceptions, try-with-resources, chaining, and real-world error handling patterns.",
      href: "/learn/java-exception",
      accent: "#ef4444",
    },
    {
      title: "Java Multithreading",
      tag: "Advanced Course",
      icon: Layers3,
      description:
        "Threads, synchronization, atomic classes, ExecutorService, concurrent collections, CompletableFuture, and deadlock prevention.",
      href: "/learn/java-multithreading",
      accent: "#3b82f6",
    },
    {
      title: "Java JDBC",
      tag: "Advanced Course",
      icon: Database,
      description:
        "Connect to databases with JDBC, PreparedStatement, transactions, batch updates, and the DAO pattern — with real, runnable challenges compiled by javac.",
      href: "/learn/java-jdbc",
      accent: "#0ea5e9",
    },
    {
      title: "Java Spring Boot",
      tag: "Professional Course",
      icon: Grid3x3,
      description:
        "Build REST APIs with Spring Boot: controllers, dependency injection, services, Spring Data JPA, and DTOs — with theory, quizzes, and real coding challenges.",
      href: "/learn/java-spring-boot",
      accent: "#22c55e",
    },
    {
      title: "Java Projects",
      tag: "Capstone Course",
      icon: Brain,
      description:
        "Build 4 real, growing projects — a task manager, a library system, a bank system, and an e-commerce backend — applying everything from Fundamentals to Spring Boot.",
      href: "/learn/java-projects",
      accent: "#f97316",
    },
  ],
  ruby: [
    {
      title: "Ruby Fundamentals",
      tag: "Interactive Course",
      icon: Terminal,
      description:
        "Foundational Ruby Programming: expressive syntax, block-based iteration, dynamic typing, core object-oriented principles, modules and mixins, error handling, and file I/O operations.",
      href: "/learn/ruby-fundamentals",
      accent: "#701516",
    },
    {
      title: "Ruby Gems",
      tag: "Interactive Course",
      icon: Boxes,
      description:
        "Master the RubyGems ecosystem: Bundler, Gemfiles, gemspecs, semver, dependency resolution, testing, publishing, and professional library design — with hands-on challenges.",
      href: "/learn/ruby-gems",
      accent: "#9333ea",
    },
  ],
  // ─── ADD GO TRACK DEFINITION ────────────────────────────────────────────────
  go: [
    {
      title: "Go Fundamentals",
      tag: "Core Track",
      icon: Terminal,
      description:
        "From variables and short declarations to slices, maps, struct composition, implicit interfaces, and concurrent goroutines.",
      href: "/learn/golang-fundamentals",
      accent: "#00add8",
    },
  ],
  powershell: [
    {
      title: "PowerShell Fundamentals",
      tag: "Core Course",
      icon: Terminal,
      description: "Variables, operators, data types, and basic pipeline usage.",
      href: "/learn/powershell-fundamentals",
      accent: "#5391fe",
    },
    {
      title: "PowerShell Scripting",
      tag: "Interactive Course",
      icon: Wrench,
      description: "Functions, control flow, file I/O, error handling, and scripts.",
      href: "/learn/powershell-scripting",
      accent: "#5391fe",
    },
    {
      title: "PowerShell Administration",
      tag: "Advanced Course",
      icon: Cpu,
      description: "WMI/CIM, Active Directory basics, networking, and system automation.",
      href: "/learn/powershell-administration",
      accent: "#5391fe",
    },
    {
      title: "PowerShell Projects",
      tag: "Projects Course",
      icon: Database,
      description: "Capstone real-world scripts (e.g., user onboarding automation, log parsing).",
      href: "/learn/powershell-projects",
      accent: "#5391fe",
    },
  ],
};

/** Ordered stacks for navbar grouping (one row per language, sub-courses inside). */
export const courseStackGroups = [
  {
    id: "sql",
    label: "SQL",
    accent: "#00758f",
    languagePath: "/language/SQL",
  },

  {
    id: "c",
    label: "C",
    accent: "#659ad2",
    languagePath: "/language/C",
  },
  {
    id: "cpp",
    label: "C++",
    accent: "#659ad2",
    languagePath: "/language/C++",
  },
  {
    id: "python",
    label: "Python",
    accent: "#3776ab",
    languagePath: "/language/Python",
  },
  {
    id: "java",
    label: "Java",
    accent: "#e76f00",
    languagePath: "/language/Java",
  },
  {
    id: "javascript",
    label: "JavaScript",
    accent: "#f7df1e",
    languagePath: "/language/JavaScript",
  },
  {
    id: "htmlcss",
    label: "HTML & CSS",
    accent: "#0ea5e9",
    languagePath: "/language/HTML%20%26%20CSS",
  },
  {
    id: "csharp",
    label: "C#",
    accent: "#179c24",
    languagePath: "/language/C%23",
  },
  {
    id: "php",
    label: "PHP",
    accent: "#777bb4",
    languagePath: "/language/PHP",
  },
  {
    id: "ruby",
    label: "Ruby",
    accent: "#701516",
    languagePath: "/language/Ruby",
  },
  {
    id: "go",
    label: "Go",
    accent: "#00add8",
    languagePath: "/language/Go",
  },
  {
    id: "powershell",
    label: "PowerShell",
    accent: "#5391fe",
    languagePath: "/language/PowerShell",
  },
];

/** Navbar learn links per language (mirrors languageCourses). */
export const learnNavByLanguage = {
  sql: [
    { label: "Fundamentals", to: "/learn/sql-fundamentals" },
    { label: "Queries", to: "/learn/sql-queries" },
    { label: "Joins", to: "/learn/sql-joins" },
    { label: "Aggregate Functions", to: "/learn/sql-aggregate-functions" },
    { label: "Subqueries", to: "/learn/sql-subqueries" },
    { label: "Indexes", to: "/learn/sql-indexes" },
    { label: "Views", to: "/learn/sql-views" },
    { label: "Stored Procedures", to: "/learn/sql-stored-procedures" },
    { label: "Projects", to: "/learn/sql-projects" },
  ],

  c: [
    { label: "Fundamentals", to: "/learn/c-fundamentals" },
    { label: "Functions", to: "/learn/c-functions" },
    { label: "Pointers", to: "/learn/c-pointers" },
    { label: "Memory", to: "/learn/c-memory-management" },
    { label: "File I/O", to: "/learn/c-file-handling" },
    { label: "Data Structures", to: "/learn/c-data-structures" },
    { label: "Projects", to: "/learn/c-projects" },
  ],
  cpp: [
    { label: "Basics", to: "/learn/cpp-fundamentals" },
    { label: "OOPs", to: "/learn/oops-cpp" },
    { label: "Pointers", to: "/learn/pointers-cpp" },
    { label: "DSA", to: "/learn/dsa-cpp" },
  ],
  "c++": [
    { label: "Basics", to: "/learn/cpp-fundamentals" },
    { label: "OOPs", to: "/learn/oops-cpp" },
    { label: "Pointers", to: "/learn/pointers-cpp" },
    { label: "DSA", to: "/learn/dsa-cpp" },
  ],
  python: [
    { label: "Fundamentals", to: "/learn/python-fundamentals" },
    { label: "OOP", to: "/learn/python-oop-py" },
    { label: "File I/O", to: "/learn/python-file-handling-py" },
    { label: "NumPy", to: "/learn/numpy-py" },
    { label: "Pandas", to: "/learn/pandas-py" },
    { label: "FastAPI", to: "/learn/fastapi-py" },
    { label: "Matplotlib", to: "/learn/matplotlib-py" },
    { label: "AI/ML", to: "/learn/ai_ml-py" },
  ],
  javascript: [
    { label: "Fundamentals", to: "/learn/js-fundamentals" },
    { label: "DOM", to: "/learn/js-dom" },
    { label: "Web Dev", to: "/learn/js-web-dev" },
    { label: "Node & npm", to: "/learn/node-npm" },
  ],
  htmlCss: [
    { label: "HTML & CSS", to: "/learn/html-css-foundation" },
  ],
  java: [
    { label: "Java Fundamentals", to: "/learn/java-fundamentals" },
    { label: "Java OOP", to: "/learn/java-intermediate" },
    { label: "Exception Handling", to: "/learn/java-exception" },
    { label: "Multithreading", to: "/learn/java-multithreading" },
    { label: "JDBC", to: "/learn/java-jdbc" },
    { label: "Spring Boot", to: "/learn/java-spring-boot" },
    { label: "Projects", to: "/learn/java-projects" },
  ],
  php: [
    { label: "PHP Fundamentals", to: "/learn/php-fundamentals" },
    { label: "PHP Forms", to: "/learn/php-forms" },
    { label: "Sessions & Cookies", to: "/learn/php-sessions" },
    { label: "MySQL", to: "/learn/php-mysql" },
    { label: "PHP OOP", to: "/learn/php-oop" },
    { label: "Laravel Basics", to: "/learn/laravel-basics" },
    { label: "PHP Projects", to: "/learn/php-projects" },
  ],
  csharp: [{ label: "C# Basics", to: "/learn/c-sharp-fundamentals" }],
  "c#": [{ label: "C# Basics", to: "/learn/c-sharp-fundamentals" }],
  ruby: [
    { label: "Ruby Basics", to: "/learn/ruby-fundamentals" },
    { label: "Ruby Gems", to: "/learn/ruby-gems" },
  ],
  // ─── ADD GO NAVIGATION ENTRIES ─────────────────────────────────────────────
  go: [{ label: "Go Basics", to: "/learn/golang-fundamentals" }],
  powershell: [
    { label: "Fundamentals", to: "/learn/powershell-fundamentals" },
    { label: "Scripting", to: "/learn/powershell-scripting" },
    { label: "Administration", to: "/learn/powershell-administration" },
    { label: "Projects", to: "/learn/powershell-projects" },
  ],
};

const learnNavLanguageAliases = {
  "c++": "cpp",
  "c#": "csharp",
  "html&css": "htmlcss",
};

function normalizeLearnNavLanguageKey(key = "") {
  return learnNavLanguageAliases[key] || key;
}

/** Infer stack from an active /learn/* route when language is not set. */
export function inferLanguageFromLearnPath(pathname = "") {
  if (
    pathname.startsWith("/learn/sql-fundamentals") ||
    pathname.startsWith("/learn/sql-queries") ||
    pathname.startsWith("/learn/sql-joins") ||
    pathname.startsWith("/learn/sql-aggregate-functions") ||
    pathname.startsWith("/learn/sql-subqueries") ||
    pathname.startsWith("/learn/sql-indexes") ||
    pathname.startsWith("/learn/sql-views") ||
    pathname.startsWith("/learn/sql-stored-procedures") ||
    pathname.startsWith("/learn/sql-projects")
  ) {
    return "sql";
  }

  if (
    pathname.startsWith("/learn/c-fundamentals") ||
    pathname.startsWith("/learn/c-functions") ||
    pathname.startsWith("/learn/c-pointers") ||
    pathname.startsWith("/learn/c-memory-management") ||
    pathname.startsWith("/learn/c-file-handling") ||
    pathname.startsWith("/learn/c-data-structures") ||
    pathname.startsWith("/learn/c-projects")
  ) {
    return "c";
  }
  if (
    pathname.startsWith("/learn/cpp-fundamentals") ||
    pathname.startsWith("/learn/oops-cpp") ||
    pathname.startsWith("/learn/pointers-cpp") ||
    pathname.startsWith("/learn/dsa-cpp")
  ) {
    return "cpp";
  }
  if (
    pathname.startsWith("/learn/python-fundamentals") ||
    pathname.startsWith("/learn/python-oop-py") ||
    pathname.startsWith("/learn/python-file-handling-py") ||
    pathname.startsWith("/learn/numpy-py") ||
    pathname.startsWith("/learn/pandas-py") ||
    pathname.startsWith("/learn/fastapi-py") ||
    pathname.startsWith("/learn/matplotlib-py") ||
    pathname.startsWith("/learn/ai_ml-py")
  ) {
    return "python";
  }
  if (
    pathname.startsWith("/learn/js-fundamentals") ||
    pathname.startsWith("/learn/js-dom") ||
    pathname.startsWith("/learn/js-web-dev") ||
    pathname.startsWith("/learn/node-npm")
  ) {
    return "javascript";
  }
  if (pathname.startsWith("/learn/html-css-foundation")) {
    return "htmlcss";
  }
  if (
    pathname.startsWith("/learn/php-fundamentals") ||
    pathname.startsWith("/learn/php-forms") ||
    pathname.startsWith("/learn/php-sessions") ||
    pathname.startsWith("/learn/php-mysql") ||
    pathname.startsWith("/learn/php-oop") ||
    pathname.startsWith("/learn/laravel-basics") ||
    pathname.startsWith("/learn/php-projects")
  ) {
    return "php";
  }
  if (
    pathname.startsWith("/learn/ruby-fundamentals") ||
    pathname.startsWith("/learn/ruby-gems")
  ) {
    return "ruby";
  }
  if (pathname.startsWith("/learn/c-sharp-fundamentals")) {
    return "csharp";
  }
  if (pathname.startsWith("/learn/golang-fundamentals")) {
    return "go";
  }
  if (
    pathname.startsWith("/learn/powershell-fundamentals") ||
    pathname.startsWith("/learn/powershell-scripting") ||
    pathname.startsWith("/learn/powershell-administration") ||
    pathname.startsWith("/learn/powershell-projects")
  ) {
    return "powershell";
  }
  if (
    pathname.startsWith("/learn/java-fundamentals") ||
    pathname.startsWith("/learn/java-intermediate") ||
    pathname.startsWith("/learn/java-exception") ||
    pathname.startsWith("/learn/java-multithreading") ||
    pathname.startsWith("/learn/java-jdbc") ||
    pathname.startsWith("/learn/java-spring-boot") ||
    pathname.startsWith("/learn/java-projects")
  ) {
    return "java";
  }
  return null;
}

export function getLearnNavLinks(selectedLanguage, pathname = "") {
  const group = getActiveLearnNavGroup(selectedLanguage, pathname);
  return group?.courses || [];
}

/**
 * Active language stack for navbar: one dropdown per stack instead of many top-level links.
 */
export function getActiveLearnNavGroup(selectedLanguage, pathname = "") {
  const rawKey =
    languageKey(selectedLanguage || "") ||
    inferLanguageFromLearnPath(pathname) ||
    "";
  if (!rawKey) return null;

  const stackKey = normalizeLearnNavLanguageKey(rawKey);
  const courses =
    learnNavByLanguage[rawKey] || learnNavByLanguage[stackKey] || [];
  if (!courses.length) return null;

  const stack =
    courseStackGroups.find((entry) => entry.id === stackKey) ||
    courseStackGroups.find((entry) => entry.id === rawKey);

  return {
    id: stackKey,
    label: stack?.label || selectedLanguage || stackKey,
    accent: stack?.accent,
    languagePath:
      stack?.languagePath ||
      `/language/${selectedLanguage || stack?.label || ""}`,
    courses,
  };
}

export function getLanguageLandingCourses(languageKeyValue) {
  return [...(languageCourses[languageKeyValue] || []), ...generalCourses];
}