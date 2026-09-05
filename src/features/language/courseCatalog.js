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
  Atom,
  ScanEye,
  Clock,
  Bot,
  Workflow,
} from "lucide-react";

export function languageKey(value = "") {
  const normalized = value.toLowerCase().replace(/\s+/g, "");
  if (normalized === "html&css") return "htmlcss";
  if (normalized === "q#" || normalized === "qsharp") return "qsharp";
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
  qsharp: [
    { title: "Q# Fundamentals", tag: "Core Course", icon: Atom, description: "Learn Q# language basics, operations, functions, qubit allocation, and measurement.", href: "/learn/qsharp-fundamentals", accent: "#0078d4" },
    { title: "Quantum Programming Basics", tag: "Basics Course", icon: BrainCircuit, description: "Master superposition, state preparation, single-qubit transformations, and qubit registers.", href: "/learn/qsharp-quantum-programming-basics", accent: "#0284c7" },
    { title: "Quantum Gates", tag: "Core Gates Course", icon: Cpu, description: "Deep dive into Pauli gates (X, Y, Z), rotation gates, phase gates, CNOT, CZ, SWAP, and Toffoli gates.", href: "/learn/qsharp-quantum-gates", accent: "#e11d48" },
    { title: "Quantum Algorithms", tag: "Algorithms Course", icon: Brain, description: "Implement Deutsch-Jozsa, Bernstein-Vazirani, Grover's Search, and Quantum Phase Estimation in Q#.", href: "/learn/qsharp-quantum-algorithms", accent: "#a855f7" },
    { title: "Quantum Projects", tag: "Projects Course", icon: Boxes, description: "Build end-to-end Q# quantum applications: Quantum Key Distribution (BB84), Teleportation, QRNG, and VQE Capstone.", href: "/learn/qsharp-quantum-projects", accent: "#ec4899" },
  ],
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
      title: "C++ Functions",
      tag: "Core Course",
      icon: Wrench,
      description:
        "Functions, parameters, references, lambdas, std::function, and callbacks — beginner to advanced hands-on guide.",
      href: "/learn/functions-cpp",
      accent: "#60a5fa",
    },
    {
      title: "Modern C++",
      tag: "Modern Course",
      icon: Atom,
      description:
        "Learn modern C++ features and idioms: auto, smart pointers, lambdas, constexpr, optionals, variants, threading, and clean API design.",
      href: "/learn/modern-cpp",
      accent: "#38bdf8",
    },
    {
      title: "C++ STL",
      tag: "Core Course",
      icon: Grid3x3,
      description:
        "Master the Standard Template Library: containers, iterators, algorithms, functors, adapters, allocators, and advanced patterns — beginner to pro.",
      href: "/learn/stl-cpp",
      accent: "#14b8a6",
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
    {
      title: "C++ Data Structures",
      tag: "Data Structures Course",
      icon: Cpu,
      description:
        "Complexity and the CPU cycle, pointer discipline and templates, linear vs non-linear structures, every linked-list variant, skip lists, stacks/queues/deques, hashing and collisions, BST/AVL, heaps, graphs, and Huffman compression.",
      href: "/learn/cpp-data-structures",
      accent: "#8b5cf6",
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
      title: "C++ Functions",
      tag: "Core Course",
      icon: Wrench,
      description:
        "Functions, parameters, references, lambdas, std::function, and callbacks — beginner to advanced hands-on guide.",
      href: "/learn/functions-cpp",
      accent: "#60a5fa",
    },
    {
      title: "Modern C++",
      tag: "Modern Course",
      icon: Atom,
      description:
        "Learn modern C++ features and idioms: auto, smart pointers, lambdas, constexpr, optionals, variants, threading, and clean API design.",
      href: "/learn/modern-cpp",
      accent: "#38bdf8",
    },
    {
      title: "C++ STL",
      tag: "Core Course",
      icon: Grid3x3,
      description:
        "Master the Standard Template Library: containers, iterators, algorithms, functors, adapters, allocators, and advanced patterns — beginner to pro.",
      href: "/learn/stl-cpp",
      accent: "#14b8a6",
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
    {
      title: "C++ Data Structures",
      tag: "Data Structures Course",
      icon: Cpu,
      description:
        "Complexity and the CPU cycle, pointer discipline and templates, linear vs non-linear structures, every linked-list variant, skip lists, stacks/queues/deques, hashing and collisions, BST/AVL, heaps, graphs, and Huffman compression.",
      href: "/learn/cpp-data-structures",
      accent: "#8b5cf6",
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
      title: "PyTorch · py",
      tag: "Deep Learning",
      icon: Cpu,
      description:
        "Tensors, autograd, nn.Module, training loops, and a hands-on deep learning track — 8 chapters, 25 lessons.",
      href: "/learn/pytorch-py",
      accent: "#EE4C2C",
    },
    {
      title: "Hugging Face · py",
      tag: "NLP & Transformers",
      icon: Bot,
      description:
        "Pipelines, tokenizers, datasets, the Model Hub, fine-tuning, PEFT/LoRA, and quantization — 9 chapters, 25 lessons.",
      href: "/learn/huggingface-py",
      accent: "#FF9D00",
    },
    {
      title: "SciPy · py",
      tag: "Science Lab",
      icon: Atom,
      description:
        "Beginner → capstone scientific Python: integrate, optimize, interpolate, stats, linalg, FFT — 8 chapters, 25 lessons.",
      href: "/learn/scipy-py",
      accent: "#0d9488",
    },
    {
      title: "OpenCV · py",
      tag: "Computer Vision",
      icon: ScanEye,
      description:
        "Beginner → Advanced: images, filters, edges, contours, features, video, detection, and a hands-on capstone — 11 chapters, 36 lessons.",
      href: "/learn/opencv-py",
      accent: "#5CBF2A",
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
    {
      title: "Machine Learning with Python",
      tag: "Interactive Course",
      icon: BrainCircuit,
      description:
        "Learn data preparation, supervised and unsupervised learning, evaluation, feature engineering, and responsible ML with runnable Python.",
      href: "/learn/ml-py",
      accent: "#00add8",
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
      title: "JS ES6+",
      tag: "Modern JS",
      icon: Grid3x3,
      description:
        "Focused ES6+ path: modern syntax, destructuring, spread, modules, async/await, classes, and advanced collections with runnable examples.",
      href: "/learn/js-es6-plus",
      accent: "#f59e0b",
    },
    {
      title: "JS APIs",
      tag: "API Course",
      icon: Globe,
      description:
        "Browser APIs from beginner to advanced: fetch, storage, URL helpers, history, navigator, performance, and reusable API helpers.",
      href: "/learn/js-apis",
      accent: "#0ea5e9",
    },
    {
      title: "Asynchronous JS",
      tag: "Async Course",
      icon: Clock,
      description:
        "Deep dive into async JavaScript: callbacks, promises, async/await, fetch, error handling, and concurrency patterns.",
      href: "/learn/js-async",
      accent: "#f59e0b",
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
    {
      title: "CSS Layouts",
      tag: "Core Course",
      icon: Layers3,
      description:
        "Flexbox, Grid, positioning, and the layout techniques that structure every modern web page.",
      href: "/learn/css-layouts",
      accent: "#264de4",
    },
    {
      title: "Responsive Design",
      tag: "Core Course",
      icon: Grid3x3,
      description:
        "Media queries, mobile-first design, fluid typography, and building layouts that work on any screen size.",
      href: "/learn/responsive-design",
      accent: "#e34c26",
    },
    {
      title: "CSS Animations",
      tag: "Advanced Course",
      icon: Play,
      description:
        "Transitions, keyframes, transforms, and bringing interfaces to life with smooth, performant CSS animation.",
      href: "/learn/css-animations",
      accent: "#9b59b6",
    },
    {
      title: "Forms & Semantic HTML",
      tag: "Advanced Course",
      icon: FileText,
      description:
        "Semantic tags, accessible forms, validation attributes, and building markup that's meaningful, not just visual.",
      href: "/learn/forms-semantic-html",
      accent: "#22c55e",
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
    {
      title: "C# OOP",
      tag: "Interactive Course",
      icon: Boxes,
      description:
        "Classes, instances, and initialize; encapsulation with properties; inheritance, polymorphism, and interfaces in C#.",
      href: "/learn/csharp-oop",
      accent: "#179c24",
    },
    {
      title: "C# Collections",
      tag: "Interactive Course",
      icon: Layers3,
      description:
        "Arrays, List<T>, Dictionary<TKey, TValue>, HashSet<T>, Stack<T>, and Queue<T> — and how to choose the right one.",
      href: "/learn/csharp-collections",
      accent: "#179c24",
    },
    {
      title: "C# LINQ",
      tag: "Interactive Course",
      icon: Table2,
      description:
        "Query collections with Where, Select, OrderBy, GroupBy, and aggregation methods — then chain them into readable pipelines.",
      href: "/learn/csharp-linq",
      accent: "#179c24",
    },
    {
      title: "C# File Handling",
      tag: "Interactive Course",
      icon: FolderOpen,
      description:
        "Read and write files, manage directories, stream large files safely, and handle file errors with try/catch.",
      href: "/learn/csharp-file-handling",
      accent: "#179c24",
    },
    {
      title: "C# ASP.NET Basics",
      tag: "Interactive Course",
      icon: Server,
      description:
        "Minimal APIs, routing, DTOs, dependency injection, and the middleware pipeline — the core patterns behind ASP.NET Core.",
      href: "/learn/csharp-aspnet-basics",
      accent: "#179c24",
    },
    {
      title: "C# Projects",
      tag: "Interactive Course",
      icon: Brain,
      description:
        "Build 4 real, growing projects — a contact book, a persistent todo list, a grade analyzer, and a mini task API — applying everything from Fundamentals to ASP.NET Basics.",
      href: "/learn/csharp-projects",
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
    {
      title: "C# OOP",
      tag: "Interactive Course",
      icon: Boxes,
      description:
        "Classes, instances, and initialize; encapsulation with properties; inheritance, polymorphism, and interfaces in C#.",
      href: "/learn/csharp-oop",
      accent: "#179c24",
    },
    {
      title: "C# Collections",
      tag: "Interactive Course",
      icon: Layers3,
      description:
        "Arrays, List<T>, Dictionary<TKey, TValue>, HashSet<T>, Stack<T>, and Queue<T> — and how to choose the right one.",
      href: "/learn/csharp-collections",
      accent: "#179c24",
    },
    {
      title: "C# LINQ",
      tag: "Interactive Course",
      icon: Table2,
      description:
        "Query collections with Where, Select, OrderBy, GroupBy, and aggregation methods — then chain them into readable pipelines.",
      href: "/learn/csharp-linq",
      accent: "#179c24",
    },
    {
      title: "C# File Handling",
      tag: "Interactive Course",
      icon: FolderOpen,
      description:
        "Read and write files, manage directories, stream large files safely, and handle file errors with try/catch.",
      href: "/learn/csharp-file-handling",
      accent: "#179c24",
    },
    {
      title: "C# ASP.NET Basics",
      tag: "Interactive Course",
      icon: Server,
      description:
        "Minimal APIs, routing, DTOs, dependency injection, and the middleware pipeline — the core patterns behind ASP.NET Core.",
      href: "/learn/csharp-aspnet-basics",
      accent: "#179c24",
    },
    {
      title: "C# Projects",
      tag: "Interactive Course",
      icon: Brain,
      description:
        "Build 4 real, growing projects — a contact book, a persistent todo list, a grade analyzer, and a mini task API — applying everything from Fundamentals to ASP.NET Basics.",
      href: "/learn/csharp-projects",
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
    {
      title: "Ruby File Handling",
      tag: "Interactive Course",
      icon: FolderOpen,
      description:
        "Read, write, and manage files in Ruby — from simple text files to CSV, JSON, YAML, and binary data with robust error handling.",
      href: "/learn/ruby-file-handling",
      accent: "#dc2626",
    },
    {
      title: "Ruby Blocks & Modules",
      tag: "Interactive Course",
      icon: Layers3,
      description:
        "Deep dive into Ruby blocks, procs, lambdas, modules, and mixins — the building blocks of Ruby's expressive and modular design.",
      href: "/learn/ruby-blocks-modules",
      accent: "#0891b2",
    },
    {
      title: "Ruby OOP",
      tag: "Interactive Course",
      icon: Boxes,
      description:
        "Master object-oriented programming in Ruby — classes, instances, and initialize; encapsulation with attr_reader/writer/accessor; inheritance, modules, and polymorphism in Ruby.",
      href: "/learn/ruby-oop",
      accent: "#9333ea",
    },
    {
      title: "Ruby on Rails",
      tag: "Interactive Course",
      icon: Server,
      description:
        "Build full-stack web apps with Rails: MVC architecture, routing, Active Record, views, controllers, and deployed app workflows.",
      href: "/learn/ruby-on-rails",
      accent: "#701516",
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
    {
      title: "Go Functions",
      tag: "Interactive Course",
      icon: Terminal,
      description:
        "Master Go functions, multiple return values, error handling, methods, interfaces, and concurrency patterns with applied examples.",
      href: "/learn/go-functions",
      accent: "#00add8",
    },
    {
      title: "Go Concurrency",
      tag: "Advanced Course",
      icon: Terminal,
      description:
        "Master goroutines, channels, mutexes, context cancellation, worker pools, and production-ready concurrency patterns in Go.",
      href: "/learn/go-concurrency",
      accent: "#00add8",
    },
    {
      title: "Go Web Development",
      tag: "Advanced Course",
      icon: Terminal,
      description:
        "Build reliable Go web services with HTTP, routing, JSON APIs, middleware, persistence, testing, and production operations.",
      href: "/learn/go-web-development",
      accent: "#00add8",
    },
    {
      title: "Go Modules",
      tag: "Advanced Course",
      icon: Terminal,
      description:
        "Learn Go modules, dependency management, versioning, replacements, workspaces, and production-ready module practices.",
      href: "/learn/go-modules",
      accent: "#00add8",
    },
    {
      title: "Go APIs",
      tag: "Advanced Course",
      icon: Terminal,
      description:
        "Build working Go APIs with HTTP, JSON, routing, middleware, authentication, testing, and production-ready design.",
      href: "/learn/go-apis",
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
  quantum: [
    {
      title: "Quantum Computing Fundamentals",
      tag: "Core Course",
      icon: Atom,
      description:
        "Qubits, superposition, entanglement, and measurement — the core ideas behind quantum computing, explained for programmers.",
      href: "/learn/quantum-computing-fundamentals",
      accent: "#6366f1",
    },
    {
      title: "Quantum Mechanics for Programmers",
      tag: "Theory Course",
      icon: BrainCircuit,
      description:
        "The physics behind the code: wavefunctions, probability amplitudes, and the linear algebra that quantum circuits run on.",
      href: "/learn/quantum-mechanics-for-programmers",
      accent: "#8b5cf6",
    },
    {
      title: "Quantum Algorithms",
      tag: "Algorithms Course",
      icon: Layers3,
      description:
        "Deutsch-Jozsa, Grover's search, and Shor's algorithm — how quantum circuits achieve speedups over classical approaches.",
      href: "/learn/quantum-algorithms",
      accent: "#a855f7",
    },
    {
      title: "Quantum Programming Projects",
      tag: "Projects Course",
      icon: Boxes,
      description:
        "Build real circuits and hybrid classical-quantum programs, from a Bell-state demo to a small variational algorithm.",
      href: "/learn/quantum-programming-projects",
      accent: "#c026d3",
    },
    {
      title: "Quantum Multi Syntax",
      tag: "Syntax Course",
      icon: Terminal,
      description: "Combine Python-style and C++-style expressions in one working Quantum .sa program.",
      href: "/learn/quantum-multi-syntax",
      accent: "#6366f1",
    },
    {
      title: "Quantum Paradigm Coding",
      tag: "Advanced Course",
      icon: Atom,
      description: "Design quantum programs around state, operations, measurement, and hybrid classical control.",
      href: "/learn/quantum-paradigm-coding",
      accent: "#c026d3",
    },
  ],
  // ─── ADD RUST TRACK DEFINITION ──────────────────────────────────────────────
  rust: [
    {
      title: "Rust Fundamentals",
      tag: "Core Course",
      icon: Terminal,
      description:
        "Learn Rust from the ground up — variables, ownership, structs, enums, and error handling, with hands-on Rust challenges.",
      href: "/learn/rust-fundamentals",
      accent: "#ce422b",
    },
    {
      title: "Rust Concurrency",
      tag: "Systems Course",
      icon: Cpu,
      description:
        "Master fearless concurrency — threads, channels, Mutex/Arc, sync primitives, and async/await with Tokio.",
      href: "/learn/rust-concurrency",
      accent: "#ce422b",
    },
    {
      title: "Rust Collections",
      tag: "Data Course",
      icon: Database,
      description:
        "Master Rust's collection types — Vec, String, HashMap, sets, ordered maps, and the Iterator trait.",
      href: "/learn/rust-collections",
      accent: "#ce422b",
    },
    {
      title: "Rust Memory",
      tag: "Memory Course",
      icon: HardDrive,
      description:
        "Go deep on memory — stack vs heap, ownership internals, lifetimes, smart pointers, and unsafe Rust.",
      href: "/learn/rust-memory",
      accent: "#ce422b",
    },
    {
      title: "Rust Projects",
      tag: "Capstone Course",
      icon: Terminal,
      description:
        "Apply everything to real projects — a CLI calculator, a struct-backed contact book, a file-based to-do app, and a capstone task manager.",
      href: "/learn/rust-projects",
      accent: "#ce422b",
    },
  ],
  batchfile: [
    {
      title: "Batchfile Fundamentals",
      tag: "Core Course",
      icon: Terminal,
      description:
        "Write, save, and run .bat scripts — variables, user input, if/else branching, labels, goto, and for loops.",
      href: "/learn/batchfile-fundamentals",
      accent: "#c5c5c5",
    },
    {
      title: "Batchfile Automation",
      tag: "Automation Course",
      icon: FolderOpen,
      description:
        "Schedule tasks, manage them from the command line, and run scripts silently for real Windows automation workflows.",
      href: "/learn/batchfile-automation",
      accent: "#c5c5c5",
    },
    {
      title: "Windows Scripting",
      tag: "Systems Course",
      icon: HardDrive,
      description:
        "System info, processes, the registry, networking, and Windows services and user accounts, from the command line.",
      href: "/learn/windows-scripting",
      accent: "#c5c5c5",
    },
    {
      title: "Batchfile Projects",
      tag: "Projects Course",
      icon: Boxes,
      description:
        "Apply everything to four real tools — a system info reporter, a file organizer, a backup utility, and a capstone menu toolkit.",
      href: "/learn/batchfile-projects",
      accent: "#c5c5c5",
    },
  ],
  // ─── ADD SOFTWARE ENGINEERING TRACK DEFINITION ─────────────────────────────
  softwareengineering: [
    {
      title: "Introduction to Software Engineering",
      tag: "Core Course",
      icon: Workflow,
      description:
        "Why software engineering exists, the $600B industry behind it, project success/failure rates, the SDLC, and how engineers solve problems by combining smaller solutions into one system.",
      href: "/learn/software-engineering-fundamentals",
      accent: "#f59e0b",
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
  {
    id: "quantum",
    label: "Quantum",
    accent: "#6366f1",
    languagePath: "/language/Quantum",
  },
  {
    id: "batchfile",
    label: "Batchfile",
    accent: "#c5c5c5",
    languagePath: "/language/Batchfile",
  },
  {
    id: "qsharp",
    label: "Q#",
    accent: "#0078d4",
    languagePath: "/language/Q%23",
  },
  {
    id: "rust",
    label: "Rust",
    accent: "#ce422b",
    languagePath: "/language/Rust",
  },
  {
    id: "softwareengineering",
    label: "Software Engineering",
    accent: "#f59e0b",
    languagePath: "/language/Software%20Engineering",
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
    { label: "Data Structures", to: "/learn/cpp-data-structures" },
  ],
  "c++": [
    { label: "Basics", to: "/learn/cpp-fundamentals" },
    { label: "OOPs", to: "/learn/oops-cpp" },
    { label: "Pointers", to: "/learn/pointers-cpp" },
    { label: "DSA", to: "/learn/dsa-cpp" },
    { label: "Data Structures", to: "/learn/cpp-data-structures" },
  ],
  python: [
    { label: "Fundamentals", to: "/learn/python-fundamentals" },
    { label: "OOP", to: "/learn/python-oop-py" },
    { label: "File I/O", to: "/learn/python-file-handling-py" },
    { label: "NumPy", to: "/learn/numpy-py" },
    { label: "Pandas", to: "/learn/pandas-py" },
    { label: "FastAPI", to: "/learn/fastapi-py" },
    { label: "Matplotlib", to: "/learn/matplotlib-py" },
    { label: "PyTorch", to: "/learn/pytorch-py" },
    { label: "Hugging Face", to: "/learn/huggingface-py" },
    { label: "SciPy", to: "/learn/scipy-py" },
    { label: "OpenCV", to: "/learn/opencv-py" },
    { label: "AI/ML", to: "/learn/ai_ml-py" },
  ],
  javascript: [
    { label: "Fundamentals", to: "/learn/js-fundamentals" },
    { label: "DOM", to: "/learn/js-dom" },
    { label: "Web Dev", to: "/learn/js-web-dev" },
    { label: "JS ES6+", to: "/learn/js-es6-plus" },
    { label: "JS APIs", to: "/learn/js-apis" },
    { label: "Asynchronous JS", to: "/learn/js-async" },
    { label: "Node & npm", to: "/learn/node-npm" },
  ],
  htmlCss: [
    { label: "HTML & CSS", to: "/learn/html-css-foundation" },
    { label: "CSS Layouts", to: "/learn/css-layouts" },
    { label: "Responsive Design", to: "/learn/responsive-design" },
    { label: "CSS Animations", to: "/learn/css-animations" },
    { label: "Forms & Semantic HTML", to: "/learn/forms-semantic-html" },
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
  csharp: [
    { label: "C# Basics", to: "/learn/c-sharp-fundamentals" },
    { label: "C# OOP", to: "/learn/csharp-oop" },
    { label: "C# Collections", to: "/learn/csharp-collections" },
    { label: "C# LINQ", to: "/learn/csharp-linq" },
    { label: "C# File Handling", to: "/learn/csharp-file-handling" },
    { label: "C# ASP.NET Basics", to: "/learn/csharp-aspnet-basics" },
    { label: "C# Projects", to: "/learn/csharp-projects" },
  ],
  "c#": [
    { label: "C# Basics", to: "/learn/c-sharp-fundamentals" },
    { label: "C# OOP", to: "/learn/csharp-oop" },
    { label: "C# Collections", to: "/learn/csharp-collections" },
    { label: "C# LINQ", to: "/learn/csharp-linq" },
    { label: "C# File Handling", to: "/learn/csharp-file-handling" },
    { label: "C# ASP.NET Basics", to: "/learn/csharp-aspnet-basics" },
    { label: "C# Projects", to: "/learn/csharp-projects" },
  ],
  ruby: [
    { label: "Ruby Basics", to: "/learn/ruby-fundamentals" },
    { label: "Ruby Gems", to: "/learn/ruby-gems" },
    { label: "File Handling", to: "/learn/ruby-file-handling" },
    { label: "Ruby OOP", to: "/learn/ruby-oop" },
    { label: "Blocks & Modules", to: "/learn/ruby-blocks-modules" },
    { label: "Ruby on Rails", to: "/learn/ruby-on-rails" },
  ],
  // ─── ADD GO NAVIGATION ENTRIES ─────────────────────────────────────────────
  go: [{ label: "Go Basics", to: "/learn/golang-fundamentals" }],
  powershell: [
    { label: "Fundamentals", to: "/learn/powershell-fundamentals" },
    { label: "Scripting", to: "/learn/powershell-scripting" },
    { label: "Administration", to: "/learn/powershell-administration" },
    { label: "Projects", to: "/learn/powershell-projects" },
  ],
  quantum: [
    { label: "Fundamentals", to: "/learn/quantum-computing-fundamentals" },
    { label: "Mechanics", to: "/learn/quantum-mechanics-for-programmers" },
    { label: "Algorithms", to: "/learn/quantum-algorithms" },
    { label: "Projects", to: "/learn/quantum-programming-projects" },
  ],
  rust: [
    { label: "Fundamentals", to: "/learn/rust-fundamentals" },
    { label: "Concurrency", to: "/learn/rust-concurrency" },
    { label: "Collections", to: "/learn/rust-collections" },
    { label: "Memory", to: "/learn/rust-memory" },
    { label: "Projects", to: "/learn/rust-projects" },
  ],
  batchfile: [
    { label: "Fundamentals", to: "/learn/batchfile-fundamentals" },
    { label: "Automation", to: "/learn/batchfile-automation" },
    { label: "Projects", to: "/learn/batchfile-projects" },
    { label: "Windows Scripting", to: "/learn/windows-scripting" },
  ],
  qsharp: [
    { label: "Q# Fundamentals", to: "/learn/qsharp-fundamentals" },
    { label: "Quantum Programming Basics", to: "/learn/qsharp-quantum-programming-basics" },
    { label: "Quantum Gates", to: "/learn/qsharp-quantum-gates" },
    { label: "Quantum Algorithms", to: "/learn/qsharp-quantum-algorithms" },
    { label: "Quantum Projects", to: "/learn/qsharp-quantum-projects" },
  ],
  softwareengineering: [
    { label: "Overview", to: "/learn/software-engineering-fundamentals" },
  ],
};

const learnNavLanguageAliases = {
  "c++": "cpp",
  "c#": "csharp",
  "html&css": "htmlcss",
  "q#": "qsharp",
};

function normalizeLearnNavLanguageKey(key = "") {
  return learnNavLanguageAliases[key] || key;
}

export { normalizeLearnNavLanguageKey };

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
    pathname.startsWith("/learn/dsa-cpp") ||
    pathname.startsWith("/learn/cpp-data-structures")
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
    pathname.startsWith("/learn/pytorch-py") ||
    pathname.startsWith("/learn/huggingface-py") ||
    pathname.startsWith("/learn/scipy-py") ||
    pathname.startsWith("/learn/opencv-py") ||
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
  if (
    pathname.startsWith("/learn/html-css-foundation") ||
    pathname.startsWith("/learn/css-layouts") ||
    pathname.startsWith("/learn/responsive-design") ||
    pathname.startsWith("/learn/css-animations") ||
    pathname.startsWith("/learn/forms-semantic-html")
  ) {
    return "htmlcss";
  }
  if (
    pathname.startsWith("/learn/php-fundamentals") ||
    pathname.startsWith("/learn/php-forms") ||
    pathname.startsWith("/learn/php-sessions") ||
    pathname.startsWith("/learn/php-mysql") ||
    pathname.startsWith("/learn/laravel-basics") ||
    pathname.startsWith("/learn/php-projects")
  ) {
    return "php";
  }
  if (
    pathname.startsWith("/learn/ruby-fundamentals") ||
    pathname.startsWith("/learn/ruby-gems") ||
    pathname.startsWith("/learn/ruby-file-handling") ||
    pathname.startsWith("/learn/ruby-oop") ||
    pathname.startsWith("/learn/ruby-blocks-modules") ||
    pathname.startsWith("/learn/ruby-on-rails")
  ) {
    return "ruby";
  }
  if (
    pathname.startsWith("/learn/c-sharp-fundamentals") ||
    pathname.startsWith("/learn/csharp-oop") ||
    pathname.startsWith("/learn/csharp-collections") ||
    pathname.startsWith("/learn/csharp-linq") ||
    pathname.startsWith("/learn/csharp-file-handling") ||
    pathname.startsWith("/learn/csharp-aspnet-basics") ||
    pathname.startsWith("/learn/csharp-projects")
  ) {
    return "csharp";
  }
  if (
    pathname.startsWith("/learn/golang-fundamentals") ||
    pathname.startsWith("/learn/go-functions")
  ) {
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
  if (
    pathname.startsWith("/learn/quantum-computing-fundamentals") ||
    pathname.startsWith("/learn/quantum-mechanics-for-programmers") ||
    pathname.startsWith("/learn/quantum-algorithms") ||
    pathname.startsWith("/learn/quantum-programming-projects")
  ) {
    return "quantum";
  }
  if (
    pathname.startsWith("/learn/batchfile-fundamentals") ||
    pathname.startsWith("/learn/batchfile-automation") ||
    pathname.startsWith("/learn/batchfile-projects") ||
    pathname.startsWith("/learn/windows-scripting")
  ) {
    return "batchfile";
  }
  if (
    pathname.startsWith("/learn/rust-fundamentals") ||
    pathname.startsWith("/learn/rust-concurrency") ||
    pathname.startsWith("/learn/rust-collections") ||
    pathname.startsWith("/learn/rust-memory") ||
    pathname.startsWith("/learn/rust-projects")
  ) {
    return "rust";
  }
  if (
    pathname.startsWith("/learn/qsharp-fundamentals") ||
    pathname.startsWith("/learn/qsharp-quantum-programming-basics") ||
    pathname.startsWith("/learn/qsharp-quantum-gates") ||
    pathname.startsWith("/learn/qsharp-quantum-algorithms") ||
    pathname.startsWith("/learn/qsharp-quantum-projects")
  ) {
    return "qsharp";
  }
  if (pathname.startsWith("/learn/software-engineering-fundamentals")) {
    return "softwareengineering";
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
  return [...(languageCourses[languageKeyValue] || [])];
}
