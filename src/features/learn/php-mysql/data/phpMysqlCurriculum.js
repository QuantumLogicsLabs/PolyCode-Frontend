// PolyCode — PHP MySQL interactive course
// 6 chapters · 18 lessons · server/browser PHP challenges
// NOTE: there's no live MySQL server in the sandbox, so challenges use small
// in-memory mock PDO-style classes (MockPDO, MockStatement) so real, idiomatic
// PDO syntax still runs and produces real output — same approach as the
// Java JDBC course's MockConnection/MockResultSet.

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}
function callout(variant, content) {
  return { type: "callout", variant, content };
}
function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "php", ...codeBlock } };
  }
  return { type: "text", content };
}
function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

const PHP_MAIN = `<?php\n`;

export const PHP_MYSQL_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Connecting with PDO
  // ─────────────────────────────────────────────────────────────
  {
    id: "connecting-pdo",
    title: "Connecting with PDO",
    icon: "🔌",
    color: "#06b6d4",
    lessons: [
      {
        id: "mysql-0",
        title: "What is PDO?",
        xp: 15,
        theory: [
          text(
            "**PDO** (PHP Data Objects) is PHP's modern, database-agnostic way to talk to SQL databases — the same PDO code works with MySQL, PostgreSQL, or SQLite by just changing the connection string. It's preferred over the older, MySQL-only `mysqli` extension.",
            {
              label: "PDO vs mysqli",
              content: `// mysqli — MySQL-specific
$conn = new mysqli("localhost", "root", "pass", "shopdb");

// PDO — works with any supported database
$pdo = new PDO("mysql:host=localhost;dbname=shopdb", "root", "pass");`,
            },
          ),
          diagram("Why PDO", [
            { id: "portable", label: "Portable", color: "#06b6d4", items: ["Same API for MySQL, PostgreSQL, SQLite"] },
            { id: "prepared", label: "Prepared Statements", color: "#3b82f6", items: ["Built-in protection against SQL injection"] },
            { id: "oop", label: "Object-Oriented", color: "#8b5cf6", items: ["Consistent, modern interface"] },
          ]),
          quiz(
            "What's the main advantage of PDO over mysqli?",
            [
              "PDO is faster at every query",
              "PDO works with multiple database types through the same API, not just MySQL",
              "PDO doesn't need a database at all",
              "mysqli is deprecated and unusable",
            ],
            1,
            "PDO abstracts away the specific database engine — switching from MySQL to PostgreSQL mostly just means changing the connection string, not rewriting your queries.",
          ),
        ],
        challenge: {
          title: "Compare Connection Approaches",
          description: "Print \"PDO\" if $usePdo is true, else print \"mysqli\".",
          starterCode: `${PHP_MAIN}$usePdo = true;\n\n// echo "PDO" or "mysqli" based on $usePdo`,
          solutionCode: `${PHP_MAIN}$usePdo = true;\n\necho $usePdo ? "PDO" : "mysqli";`,
          tests: [
            { id: 1, label: "Uses a conditional on $usePdo", keywords: [{ pattern: "\\$usePdo" }] },
          ],
        },
      },
      {
        id: "mysql-1",
        title: "Connecting Safely with try/catch",
        xp: 20,
        theory: [
          text(
            "Creating a `PDO` connection can throw a `PDOException` if the credentials are wrong or the server is unreachable. Always wrap it in try/catch — and never echo the raw exception message in production, since it can leak connection details.",
            {
              label: "A safe connection",
              content: `try {
    $pdo = new PDO("mysql:host=localhost;dbname=shopdb", "root", "wrongpass");
    echo "Connected!";
} catch (PDOException $e) {
    echo "Connection failed"; // don't leak $e->getMessage() to users!
}`,
            },
          ),
          callout("warning", "Showing raw PDOException messages to end users can leak your database host, username, or schema structure — log the details server-side instead."),
          quiz(
            "Why avoid echoing the raw PDOException message directly to users?",
            [
              "It's too long to display",
              "It can leak sensitive info like database hostnames, usernames, or schema details to an attacker",
              "PDOException messages are always empty",
              "PHP doesn't allow it",
            ],
            1,
            "Detailed error messages are useful for developers in logs, but exposing them to end users can hand an attacker a roadmap of your database setup — show a generic message instead.",
          ),
        ],
        challenge: {
          title: "Catch a Connection Failure",
          description: "Using the given MockPDO which throws a PDOException when password is \"wrong\", attempt a connection and catch the failure, echoing \"Connection failed\".",
          starterCode: `${PHP_MAIN}class MockPDO {\n    public function __construct($dsn, $user, $pass) {\n        if ($pass === "wrong") {\n            throw new PDOException("Access denied");\n        }\n    }\n}\n\n// try connecting with password "wrong", catch and echo "Connection failed"`,
          solutionCode: `${PHP_MAIN}class MockPDO {\n    public function __construct($dsn, $user, $pass) {\n        if ($pass === "wrong") {\n            throw new PDOException("Access denied");\n        }\n    }\n}\n\ntry {\n    $pdo = new MockPDO("mysql:host=localhost;dbname=shopdb", "root", "wrong");\n    echo "Connected!";\n} catch (PDOException $e) {\n    echo "Connection failed";\n}`,
          tests: [
            { id: 1, label: "Uses try/catch(PDOException)", keywords: [{ pattern: "catch\\s*\\(\\s*PDOException" }] },
          ],
        },
      },
      {
        id: "mysql-2",
        title: "DSN Strings & Options",
        xp: 15,
        theory: [
          text(
            "The **DSN** (Data Source Name) string tells PDO which driver, host, port, and database to use. You can also pass an options array to configure error handling and fetch behavior.",
            {
              label: "DSN and options",
              content: `$dsn = "mysql:host=localhost;port=3306;dbname=shopdb;charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // throw on errors
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // arrays, not objects
];

$pdo = new PDO($dsn, "root", "pass", $options);`,
            },
          ),
          quiz(
            "What does setting PDO::ATTR_ERRMODE to PDO::ERRMODE_EXCEPTION do?",
            [
              "Disables all error reporting",
              "Makes PDO throw exceptions on errors instead of silently failing or emitting warnings",
              "Speeds up queries",
              "Automatically retries failed queries",
            ],
            1,
            "By default, PDO's error mode can silently swallow issues — setting ERRMODE_EXCEPTION ensures failures surface as catchable PDOExceptions, which is the recommended, safer default.",
          ),
        ],
        challenge: {
          title: "Build a DSN String",
          description: "Build a DSN string for host \"localhost\", port 3306, database \"shopdb\", then echo it.",
          starterCode: `${PHP_MAIN}$host = "localhost";\n$port = 3306;\n$db = "shopdb";\n\n// build and echo "mysql:host=<host>;port=<port>;dbname=<db>"`,
          solutionCode: `${PHP_MAIN}$host = "localhost";\n$port = 3306;\n$db = "shopdb";\n\necho "mysql:host=$host;port=$port;dbname=$db";`,
          tests: [
            { id: 1, label: "Builds a mysql: DSN string", keywords: [{ pattern: "mysql:host" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Queries & Prepared Statements
  // ─────────────────────────────────────────────────────────────
  {
    id: "queries-prepared-statements",
    title: "Queries & Prepared Statements",
    icon: "📝",
    color: "#3b82f6",
    lessons: [
      {
        id: "mysql-3",
        title: "Prepared Statements & Placeholders",
        xp: 25,
        theory: [
          text(
            "Just like Java's PreparedStatement, PDO's `prepare()` + `execute()` separates the SQL template from user data, using `?` (positional) or `:name` (named) placeholders — preventing SQL injection.",
            {
              label: "Prepared statements in PDO",
              content: `$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$userId]);

// Or named placeholders:
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->execute(['email' => $userEmail]);`,
            },
          ),
          callout("warning", "Never build SQL with string concatenation of user input — always use placeholders, exactly like the PHP Forms/PDO pattern for user-supplied data."),
          quiz(
            "What's the difference between positional (?) and named (:name) placeholders?",
            [
              "Positional placeholders are faster",
              "Named placeholders let you reference parameters by name instead of relying on their order in the query",
              "Named placeholders don't prevent SQL injection",
              "There's no functional difference at all",
            ],
            1,
            "Both are equally safe against SQL injection — named placeholders are just more readable and less error-prone when a query has many parameters, since order doesn't matter.",
          ),
        ],
        challenge: {
          title: "Build a Prepared Query String",
          description: "Build a SQL string using a named placeholder to find a user by email: \"SELECT * FROM users WHERE email = :email\", then echo it.",
          starterCode: `${PHP_MAIN}\n// build and echo the SQL with a :email placeholder`,
          solutionCode: `${PHP_MAIN}$sql = "SELECT * FROM users WHERE email = :email";\necho $sql;`,
          tests: [
            { id: 1, label: "Uses a :email placeholder", keywords: [{ pattern: ":email" }] },
          ],
        },
      },
      {
        id: "mysql-4",
        title: "Fetching Results",
        xp: 25,
        theory: [
          text(
            "After executing a SELECT, `fetch()` pulls one row at a time; `fetchAll()` pulls every row at once. `PDO::FETCH_ASSOC` returns each row as an associative array keyed by column name.",
            {
              label: "Fetching rows",
              content: `$stmt = $pdo->prepare("SELECT id, name FROM users");
$stmt->execute();

// One row at a time:
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo $row['name'] . "\\n";
}

// Or all at once:
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);`,
            },
          ),
          quiz(
            "What does $stmt->fetch(PDO::FETCH_ASSOC) return when there are no more rows?",
            ["An empty array", "false", "null", "Throws an exception"],
            1,
            "fetch() returns false once the result set is exhausted, which is why it's commonly used directly as a while-loop condition — the same shape as ResultSet.next() in JDBC.",
          ),
        ],
        challenge: {
          title: "Fetch Rows with a Mock Statement",
          description: "Using MockStatement (simulating 2 rows: \"Alice\", \"Bob\"), loop with fetch() and echo each name on its own line.",
          starterCode: `${PHP_MAIN}class MockStatement {\n    private $rows = ["Alice", "Bob"];\n    private $i = -1;\n    public function fetch() {\n        $this->i++;\n        return $this->i < count($this->rows) ? ["name" => $this->rows[$this->i]] : false;\n    }\n}\n\n$stmt = new MockStatement();\n// loop using fetch(), echo each row's name`,
          solutionCode: `${PHP_MAIN}class MockStatement {\n    private $rows = ["Alice", "Bob"];\n    private $i = -1;\n    public function fetch() {\n        $this->i++;\n        return $this->i < count($this->rows) ? ["name" => $this->rows[$this->i]] : false;\n    }\n}\n\n$stmt = new MockStatement();\nwhile ($row = $stmt->fetch()) {\n    echo $row['name'] . "\\n";\n}`,
          tests: [
            { id: 1, label: "Loops with while ($row = $stmt->fetch())", keywords: [{ pattern: "while\\s*\\(\\s*\\$row\\s*=\\s*\\$stmt->fetch" }] },
          ],
        },
      },
      {
        id: "mysql-5",
        title: "INSERT, UPDATE, DELETE",
        xp: 20,
        theory: [
          text(
            "For statements that modify data, `execute()` still runs them — you just don't call `fetch()` afterward. `rowCount()` tells you how many rows were affected, and `lastInsertId()` gives you the new row's auto-increment ID.",
            {
              label: "Modifying data",
              content: `$stmt = $pdo->prepare("INSERT INTO users (name) VALUES (?)");
$stmt->execute(["Dana"]);
echo "New user ID: " . $pdo->lastInsertId();

$stmt = $pdo->prepare("UPDATE users SET name = ? WHERE id = ?");
$stmt->execute(["New Name", 5]);
echo $stmt->rowCount() . " row(s) updated";`,
            },
          ),
          quiz(
            "What does $pdo->lastInsertId() return?",
            [
              "The total number of rows in the table",
              "The auto-increment ID generated by the most recent INSERT",
              "The current timestamp",
              "The ID of a random row",
            ],
            1,
            "lastInsertId() gives you the primary key PDO's connection just generated — commonly used right after inserting a new row to get its new ID for further use.",
          ),
        ],
        challenge: {
          title: "Simulate an Insert and Get the New ID",
          description: "Using MockPDO with lastInsertId() returning 42 after insert(), call insert(), then echo \"New user ID: 42\".",
          starterCode: `${PHP_MAIN}class MockPDO {\n    private $lastId = 0;\n    public function insert() {\n        $this->lastId = 42;\n    }\n    public function lastInsertId() {\n        return $this->lastId;\n    }\n}\n\n$pdo = new MockPDO();\n// call insert(), then echo "New user ID: <id>"`,
          solutionCode: `${PHP_MAIN}class MockPDO {\n    private $lastId = 0;\n    public function insert() {\n        $this->lastId = 42;\n    }\n    public function lastInsertId() {\n        return $this->lastId;\n    }\n}\n\n$pdo = new MockPDO();\n$pdo->insert();\necho "New user ID: " . $pdo->lastInsertId();`,
          tests: [
            { id: 1, label: "Calls lastInsertId()", keywords: [{ pattern: "lastInsertId\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Transactions & Error Handling
  // ─────────────────────────────────────────────────────────────
  {
    id: "transactions-error-handling",
    title: "Transactions & Error Handling",
    icon: "🔄",
    color: "#f59e0b",
    lessons: [
      {
        id: "mysql-6",
        title: "Catching PDOException",
        xp: 20,
        theory: [
          text(
            "With `ERRMODE_EXCEPTION` set, every failed query throws a `PDOException` you can catch — covering syntax errors, constraint violations, and connection drops in one consistent way.",
            {
              label: "Catching query errors",
              content: `try {
    $stmt = $pdo->prepare("INSERT INTO users (email) VALUES (?)");
    $stmt->execute(["duplicate@example.com"]); // email has a UNIQUE constraint
} catch (PDOException $e) {
    echo "Could not save user";
    // log $e->getMessage() server-side for debugging
}`,
            },
          ),
          quiz(
            "What kinds of failures does PDOException typically cover?",
            [
              "Only network timeouts",
              "SQL syntax errors, constraint violations (like duplicate keys), and connection failures",
              "Only PHP syntax errors in your code",
              "Nothing — PDO never throws exceptions",
            ],
            1,
            "PDOException is PDO's general-purpose error type for anything the database layer reports as a failure — from a malformed query to a UNIQUE constraint violation.",
          ),
        ],
        challenge: {
          title: "Catch a Duplicate-Key Error",
          description: "Using MockPDO.insertEmail() which throws a PDOException with message \"Duplicate entry\" for \"dupe@example.com\", catch it and echo the message.",
          starterCode: `${PHP_MAIN}class MockPDO {\n    public function insertEmail($email) {\n        if ($email === "dupe@example.com") {\n            throw new PDOException("Duplicate entry");\n        }\n    }\n}\n\n$pdo = new MockPDO();\n// try inserting "dupe@example.com", catch and echo the message`,
          solutionCode: `${PHP_MAIN}class MockPDO {\n    public function insertEmail($email) {\n        if ($email === "dupe@example.com") {\n            throw new PDOException("Duplicate entry");\n        }\n    }\n}\n\n$pdo = new MockPDO();\ntry {\n    $pdo->insertEmail("dupe@example.com");\n} catch (PDOException $e) {\n    echo $e->getMessage();\n}`,
          tests: [
            { id: 1, label: "Catches PDOException", keywords: [{ pattern: "catch\\s*\\(\\s*PDOException" }] },
            { id: 2, label: "Echoes the exception message", keywords: [{ pattern: "getMessage\\s*\\(" }] },
          ],
        },
      },
      {
        id: "mysql-7",
        title: "Transactions",
        xp: 25,
        theory: [
          text(
            "Multi-step operations that must succeed together use `beginTransaction()`, `commit()`, and `rollBack()` — the same all-or-nothing guarantee as JDBC transactions.",
            {
              label: "A PDO transaction",
              content: `$pdo->beginTransaction();
try {
    $pdo->prepare("UPDATE accounts SET balance = balance - ? WHERE id = ?")
        ->execute([50, 1]);
    $pdo->prepare("UPDATE accounts SET balance = balance + ? WHERE id = ?")
        ->execute([50, 2]);
    $pdo->commit();
} catch (PDOException $e) {
    $pdo->rollBack();
    echo "Transfer failed, changes undone";
}`,
            },
          ),
          quiz(
            "What happens if an exception is thrown between beginTransaction() and commit(), and you call rollBack()?",
            [
              "Only the last statement is undone",
              "All changes made since beginTransaction() are undone, as if they never happened",
              "The transaction commits anyway",
              "The database connection is closed",
            ],
            1,
            "rollBack() reverts every change made in the current transaction back to the state before beginTransaction() — guaranteeing the multi-step operation is all-or-nothing.",
          ),
        ],
        challenge: {
          title: "Simulate a Transfer with Rollback",
          description: "Given MockAccount balances A=100, B=50: transfer 200 from A (more than A has). Check the balance first — if insufficient, don't apply any change, and echo \"Insufficient funds, rolled back\".",
          starterCode: `${PHP_MAIN}class Account {\n    public $balance;\n    public function __construct($balance) { $this->balance = $balance; }\n}\n\n$a = new Account(100);\n$b = new Account(50);\n$amount = 200;\n\n// check balance, only transfer if sufficient, else echo the rollback message`,
          solutionCode: `${PHP_MAIN}class Account {\n    public $balance;\n    public function __construct($balance) { $this->balance = $balance; }\n}\n\n$a = new Account(100);\n$b = new Account(50);\n$amount = 200;\n\nif ($a->balance < $amount) {\n    echo "Insufficient funds, rolled back";\n} else {\n    $a->balance -= $amount;\n    $b->balance += $amount;\n}`,
          tests: [
            { id: 1, label: "Checks balance before transferring", hint: "if ($a->balance < $amount)", keywords: [{ pattern: "\\$a->balance\\s*<\\s*\\$amount" }] },
          ],
        },
      },
      {
        id: "mysql-8",
        title: "Handling Constraint Violations",
        xp: 20,
        theory: [
          text(
            "Databases enforce rules like `UNIQUE` and `NOT NULL` at the schema level. When violated, PDO throws a `PDOException` — check `$e->getCode()` (a SQLSTATE code) to distinguish a duplicate-key error from other failures.",
            {
              label: "Distinguishing error types",
              content: `try {
    $stmt->execute(['duplicate@example.com']);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') { // integrity constraint violation
        echo "That email is already registered";
    } else {
        echo "Something went wrong";
    }
}`,
            },
          ),
          quiz(
            "Why check $e->getCode() instead of just showing a generic error for every PDOException?",
            [
              "getCode() is required by PHP",
              "It lets you give a specific, helpful message (like 'email already taken') instead of a vague failure for every kind of database error",
              "getCode() is faster than getMessage()",
              "There's no reason, it's just convention",
            ],
            1,
            "SQLSTATE codes let you distinguish between different failure types — a duplicate key deserves a different, more helpful message than a generic connection failure.",
          ),
        ],
        challenge: {
          title: "Branch on Error Code",
          description: "Given a caught exception with code \"23000\", echo \"That email is already registered\"; for any other code, echo \"Something went wrong\".",
          starterCode: `${PHP_MAIN}class FakeError {\n    public $code;\n    public function __construct($code) { $this->code = $code; }\n    public function getCode() { return $this->code; }\n}\n\n$e = new FakeError("23000");\n// branch on $e->getCode(), echo the right message`,
          solutionCode: `${PHP_MAIN}class FakeError {\n    public $code;\n    public function __construct($code) { $this->code = $code; }\n    public function getCode() { return $this->code; }\n}\n\n$e = new FakeError("23000");\nif ($e->getCode() === "23000") {\n    echo "That email is already registered";\n} else {\n    echo "Something went wrong";\n}`,
          tests: [
            { id: 1, label: "Checks getCode() against '23000'", keywords: [{ pattern: "getCode\\s*\\(\\s*\\)\\s*===?\\s*\"23000\"" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — DAO Pattern & Real Apps
  // ─────────────────────────────────────────────────────────────
  {
    id: "dao-pattern-real-apps",
    title: "DAO Pattern & Real Apps",
    icon: "🏗️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "mysql-9",
        title: "The Repository Pattern in PHP",
        xp: 25,
        theory: [
          text(
            "Just like Java's DAO pattern, PHP apps isolate database code behind a **Repository** class — the rest of the app never sees raw SQL or a PDO object directly.",
            {
              label: "A simple repository",
              content: `class UserRepository {
    public function __construct(private PDO $pdo) {}

    public function findById(int $id): ?array {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ?: null;
    }
}`,
            },
          ),
          quiz(
            "What's the benefit of a UserRepository over scattering SQL throughout the codebase?",
            [
              "It's required by PHP",
              "It centralizes all user-related queries in one place, making the code easier to test and maintain",
              "It makes queries run faster",
              "There's no real benefit",
            ],
            1,
            "Same principle as the DAO pattern in Java — one class owns 'how we access user data', so the rest of the application depends on a clean interface instead of raw SQL scattered everywhere.",
          ),
        ],
        challenge: {
          title: "Build a Simple Repository",
          description: "Implement InMemoryUserRepository with save($name) and findAll() methods backed by an array. Save \"Alice\" and \"Bob\", then echo findAll() joined by \", \".",
          starterCode: `${PHP_MAIN}class InMemoryUserRepository {\n    private $users = [];\n    // implement save() and findAll()\n\n}\n\n$repo = new InMemoryUserRepository();\n$repo->save("Alice");\n$repo->save("Bob");\necho implode(", ", $repo->findAll());`,
          solutionCode: `${PHP_MAIN}class InMemoryUserRepository {\n    private $users = [];\n    public function save($name) {\n        $this->users[] = $name;\n    }\n    public function findAll() {\n        return $this->users;\n    }\n}\n\n$repo = new InMemoryUserRepository();\n$repo->save("Alice");\n$repo->save("Bob");\necho implode(", ", $repo->findAll());`,
          tests: [
            { id: 1, label: "Implements save()", keywords: [{ pattern: "function\\s+save" }] },
            { id: 2, label: "Implements findAll()", keywords: [{ pattern: "function\\s+findAll" }] },
          ],
        },
      },
      {
        id: "mysql-10",
        title: "Constructor-Injecting the Connection",
        xp: 20,
        theory: [
          text(
            "Just like Java's Spring Boot services, a good PHP repository receives its `PDO` connection via the constructor rather than creating one internally — making it easy to reuse the same connection and to substitute a fake one in tests.",
            {
              label: "Dependency injection in plain PHP",
              content: `class ProductRepository {
    public function __construct(private PDO $pdo) {}

    public function count(): int {
        return (int) $this->pdo->query("SELECT COUNT(*) FROM products")->fetchColumn();
    }
}

$pdo = new PDO($dsn, $user, $pass);
$repo = new ProductRepository($pdo); // the connection is injected, not created inside</`,
            },
          ),
          quiz(
            "Why does ProductRepository take a PDO instance in its constructor instead of creating one with 'new PDO(...)' internally?",
            [
              "It's faster this way",
              "It decouples the repository from connection details, and lets tests substitute a fake connection",
              "PHP requires constructor injection",
              "There's no real benefit",
            ],
            1,
            "This mirrors the Spring Boot dependency-injection pattern — the repository doesn't need to know how the connection was built, just that it has one, making the class more flexible and testable.",
          ),
        ],
        challenge: {
          title: "Inject a Connection into a Repository",
          description: "Implement OrderRepository taking a MockPDO in its constructor, with a total() method that returns the injected connection's fixed total() value. Wire it up and echo the result.",
          starterCode: `${PHP_MAIN}class MockPDO {\n    public function total() {\n        return 275;\n    }\n}\n\nclass OrderRepository {\n    // store the injected MockPDO, add a total() method that delegates\n\n}\n\n$pdo = new MockPDO();\n$repo = new OrderRepository($pdo);\necho $repo->total();`,
          solutionCode: `${PHP_MAIN}class MockPDO {\n    public function total() {\n        return 275;\n    }\n}\n\nclass OrderRepository {\n    private $pdo;\n    public function __construct($pdo) {\n        $this->pdo = $pdo;\n    }\n    public function total() {\n        return $this->pdo->total();\n    }\n}\n\n$pdo = new MockPDO();\n$repo = new OrderRepository($pdo);\necho $repo->total();`,
          tests: [
            { id: 1, label: "Stores the injected connection", keywords: [{ pattern: "__construct\\s*\\(\\s*\\$pdo" }] },
            { id: 2, label: "Delegates total() to the connection", keywords: [{ pattern: "\\$this->pdo->total" }] },
          ],
        },
      },
      {
        id: "mysql-11",
        title: "Pagination with LIMIT & OFFSET",
        xp: 25,
        theory: [
          text(
            "Real tables can have thousands of rows — you rarely fetch them all at once. `LIMIT` caps how many rows come back, and `OFFSET` skips ahead, together implementing pagination.",
            {
              label: "Paginated queries",
              content: `function findPage(PDO $pdo, int $page, int $perPage = 10): array {
    $offset = ($page - 1) * $perPage;
    $stmt = $pdo->prepare("SELECT * FROM products LIMIT ? OFFSET ?");
    $stmt->bindValue(1, $perPage, PDO::PARAM_INT);
    $stmt->bindValue(2, $offset, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
// findPage($pdo, 1, 10) → rows 1-10
// findPage($pdo, 2, 10) → rows 11-20`,
            },
          ),
          quiz(
            "For page 3 with 10 items per page, what should OFFSET be?",
            ["10", "20", "30", "3"],
            1,
            "OFFSET skips the rows from earlier pages: page 1 skips 0, page 2 skips 10, page 3 skips 20 — the formula is (page - 1) * perPage.",
          ),
        ],
        challenge: {
          title: "Compute Pagination Offset",
          description: "Write a function computeOffset($page, $perPage) implementing (page - 1) * perPage. Call it for page 3, perPage 10, and echo the result.",
          starterCode: `${PHP_MAIN}function computeOffset($page, $perPage) {\n    // return (page - 1) * perPage\n\n}\n\necho computeOffset(3, 10);`,
          solutionCode: `${PHP_MAIN}function computeOffset($page, $perPage) {\n    return ($page - 1) * $perPage;\n}\n\necho computeOffset(3, 10);`,
          tests: [
            { id: 1, label: "Implements the offset formula", keywords: [{ pattern: "\\(\\s*\\$page\\s*-\\s*1\\s*\\)\\s*\\*\\s*\\$perPage" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Working with Result Data
  // ─────────────────────────────────────────────────────────────
  {
    id: "working-with-results",
    title: "Working with Result Data",
    icon: "📊",
    color: "#10b981",
    lessons: [
      {
        id: "mysql-12",
        title: "Mapping Rows to Objects",
        xp: 25,
        theory: [
          text(
            "`FETCH_ASSOC` gives you arrays, but the rest of your app is easier to work with when it receives real objects. `PDO::FETCH_CLASS` fills a class's properties straight from the columns — fine for simple classes with public properties. For classes with typed, promoted or readonly properties, a **named constructor** like `User::fromRow()` is clearer: it maps each column explicitly and casts the values, since MySQL often returns numbers as strings.",
            {
              label: "Two ways to hydrate objects",
              content: `// 1) Let PDO fill public properties
class UserRow {
    public $id;
    public $name;
}
$rows = $pdo->query("SELECT id, name FROM users")
    ->fetchAll(PDO::FETCH_CLASS, UserRow::class);

// 2) Map explicitly with a named constructor
final class User {
    public function __construct(
        public readonly int $id,
        public readonly string $name,
    ) {}

    public static function fromRow(array $row): self {
        return new self((int) $row['id'], $row['name']);
    }
}

$stmt = $pdo->query("SELECT id, name FROM users");
$users = array_map([User::class, 'fromRow'], $stmt->fetchAll(PDO::FETCH_ASSOC));`,
            },
          ),
          callout("info", "PDO::FETCH_CLASS assigns properties before the constructor runs. Add PDO::FETCH_PROPS_LATE if your constructor must run first."),
          quiz(
            "Why cast (int) $row['id'] inside fromRow()?",
            [
              "PDO always returns ids as floats",
              "Drivers commonly return numeric columns as strings, and the typed constructor parameter should receive a real int",
              "Casting makes the query faster",
              "It prevents SQL injection",
            ],
            1,
            "With the MySQL driver, especially with emulated prepares, numeric columns often arrive as strings like \"7\". Casting in one place gives every User a real int id.",
          ),
        ],
        challenge: {
          title: "Hydrate Products from Rows",
          description: "Complete Product::fromRow() so it builds a Product with (int) id, name, and (float) price. Map the fetched rows with array_map and echo each product as \"<id>: <name> £<price>\" (price with 2 decimals), one per line.",
          starterCode: `${PHP_MAIN}class MockStatement {\n    public function fetchAll(): array {\n        return [\n            ['id' => '1', 'name' => 'Kettle', 'price' => '24.5'],\n            ['id' => '2', 'name' => 'Toaster', 'price' => '31'],\n        ];\n    }\n}\n\nfinal class Product {\n    public function __construct(\n        public readonly int $id,\n        public readonly string $name,\n        public readonly float $price,\n    ) {}\n\n    public static function fromRow(array $row): self {\n        // cast and build a Product\n\n    }\n}\n\n$stmt = new MockStatement();\n// map rows to Products and echo each one`,
          solutionCode: `${PHP_MAIN}class MockStatement {\n    public function fetchAll(): array {\n        return [\n            ['id' => '1', 'name' => 'Kettle', 'price' => '24.5'],\n            ['id' => '2', 'name' => 'Toaster', 'price' => '31'],\n        ];\n    }\n}\n\nfinal class Product {\n    public function __construct(\n        public readonly int $id,\n        public readonly string $name,\n        public readonly float $price,\n    ) {}\n\n    public static function fromRow(array $row): self {\n        return new self((int) $row['id'], $row['name'], (float) $row['price']);\n    }\n}\n\n$stmt = new MockStatement();\n$products = array_map([Product::class, 'fromRow'], $stmt->fetchAll());\nforeach ($products as $p) {\n    echo "{$p->id}: {$p->name} £" . number_format($p->price, 2) . "\\n";\n}`,
          tests: [
            { id: 1, label: "Casts the id and price", keywords: [{ pattern: "\\(int\\)\\s*\\$row\\['id'\\]" }, { pattern: "\\(float\\)\\s*\\$row\\['price'\\]" }] },
            { id: 2, label: "Maps rows with array_map", keywords: [{ pattern: "array_map\\s*\\(" }] },
          ],
        },
      },
      {
        id: "mysql-13",
        title: "Dynamic IN() Lists",
        xp: 25,
        theory: [
          text(
            "A query like `WHERE id IN (...)` needs one bound parameter **per value**, and you can't bind a whole array to a single `?`. Build the list of `?` markers from the array's length, then pass the values to `execute()`. Never `implode()` the raw values into the SQL string — that reopens SQL injection.",
            {
              label: "One ? per value",
              content: `$ids = [4, 9, 15];

$markers = implode(', ', array_fill(0, count($ids), '?')); // "?, ?, ?"
$sql = "SELECT id, name FROM products WHERE id IN ($markers)";

echo $sql; // SELECT id, name FROM products WHERE id IN (?, ?, ?)

// $stmt = $pdo->prepare($sql);
// $stmt->execute($ids);`,
            },
          ),
          callout("warning", "An empty array would produce IN () — a SQL syntax error. Return an empty result early when there are no ids."),
          quiz(
            "Why not write \"... IN (\" . implode(',', $ids) . \")\"?",
            [
              "implode() doesn't work with integers",
              "The values go straight into the SQL text, so a crafted value can inject SQL — each value must be bound",
              "MySQL doesn't support IN()",
              "It returns the rows in the wrong order",
            ],
            1,
            "Concatenating values into SQL is exactly the injection risk prepared statements exist to prevent. Generating ?-markers keeps the SQL fixed and sends the values separately.",
          ),
        ],
        challenge: {
          title: "Build an IN() Query",
          description: "Complete inQuery(): return an empty string for an empty array; otherwise return \"SELECT * FROM orders WHERE status IN (?, ?)\" with one ? per status, built with array_fill and implode. Echo the SQL for ['paid', 'shipped', 'refunded'].",
          starterCode: `${PHP_MAIN}function inQuery(array $statuses): string {\n    // one ? per status, joined by ", "\n\n}\n\necho inQuery(['paid', 'shipped', 'refunded']);`,
          solutionCode: `${PHP_MAIN}function inQuery(array $statuses): string {\n    if (count($statuses) === 0) {\n        return "";\n    }\n    $markers = implode(', ', array_fill(0, count($statuses), '?'));\n    return "SELECT * FROM orders WHERE status IN ($markers)";\n}\n\necho inQuery(['paid', 'shipped', 'refunded']);`,
          tests: [
            { id: 1, label: "Generates markers with array_fill", keywords: [{ pattern: "array_fill\\s*\\(\\s*0\\s*,\\s*count\\s*\\(" }] },
            { id: 2, label: "Handles the empty case", keywords: [{ pattern: "count\\s*\\(\\s*\\$statuses\\s*\\)\\s*===?\\s*0|empty\\s*\\(\\s*\\$statuses\\s*\\)|!\\s*\\$statuses" }] },
          ],
        },
      },
      {
        id: "mysql-14",
        title: "Safe Sorting & LIKE Searches",
        xp: 25,
        theory: [
          text(
            "Bound parameters only work for **values**, not for identifiers like column names or keywords like `ASC`/`DESC`. To let users choose a sort order, map their input onto an **allow-list** of known columns. For search, bind the `LIKE` pattern as a value — but escape `%` and `_` in the user's text first, or a search for `50%` would match everything starting with 50.",
            {
              label: "Allow-listed ORDER BY and escaped LIKE",
              content: `function orderBy(string $column, string $dir): string {
    $columns = ['name' => 'name', 'price' => 'price', 'newest' => 'created_at'];
    $col = $columns[$column] ?? 'name';
    $direction = strtolower($dir) === 'desc' ? 'DESC' : 'ASC';
    return "ORDER BY $col $direction";
}

function likePattern(string $term): string {
    return '%' . addcslashes($term, '%_\\\\') . '%';
}

echo orderBy('price', 'desc') . "\\n";          // ORDER BY price DESC
echo orderBy('price; DROP TABLE x', 'up') . "\\n"; // ORDER BY name ASC
echo likePattern('50%_off');                    // %50\\%\\_off%

// $stmt = $pdo->prepare("SELECT * FROM products WHERE name LIKE ? " . orderBy($col, $dir));
// $stmt->execute([likePattern($term)]);`,
            },
          ),
          quiz(
            "Why can't you bind the column name in ORDER BY ? like a normal value?",
            [
              "PDO only supports one bound parameter per query",
              "Bound parameters are sent as values, so ORDER BY ? would sort by a constant string, not by the column",
              "Column names are case-sensitive",
              "MySQL forbids ORDER BY in prepared statements",
            ],
            1,
            "A bound parameter is always treated as data. The engine would sort by the literal text 'price', which is the same for every row. Identifiers have to come from your own allow-list.",
          ),
        ],
        challenge: {
          title: "Allow-list a Sort Column",
          description: "Complete sortClause(): map $input through $allowed (falling back to \"created_at\") and use \"DESC\" only when $dir is \"desc\", else \"ASC\". Echo the clause for (\"title\", \"desc\") and for (\"id; DELETE\", \"x\"), one per line.",
          starterCode: `${PHP_MAIN}function sortClause(string $input, string $dir): string {\n    $allowed = ['title' => 'title', 'date' => 'created_at'];\n    // pick a known column and direction\n\n}\n\necho sortClause('title', 'desc') . "\\n";\necho sortClause('id; DELETE', 'x');`,
          solutionCode: `${PHP_MAIN}function sortClause(string $input, string $dir): string {\n    $allowed = ['title' => 'title', 'date' => 'created_at'];\n    $column = $allowed[$input] ?? 'created_at';\n    $direction = $dir === 'desc' ? 'DESC' : 'ASC';\n    return "ORDER BY $column $direction";\n}\n\necho sortClause('title', 'desc') . "\\n";\necho sortClause('id; DELETE', 'x');`,
          tests: [
            { id: 1, label: "Looks the column up in the allow-list", keywords: [{ pattern: "\\$allowed\\[\\$input\\]\\s*\\?\\?" }] },
            { id: 2, label: "Only allows DESC or ASC", keywords: [{ pattern: "'DESC'" }, { pattern: "'ASC'" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Relations, Performance & Schema
  // ─────────────────────────────────────────────────────────────
  {
    id: "relations-performance-schema",
    title: "Relations, Performance & Schema",
    icon: "🧮",
    color: "#ec4899",
    lessons: [
      {
        id: "mysql-15",
        title: "JOINs: Nesting One-to-Many Rows",
        xp: 25,
        theory: [
          text(
            "A `JOIN` between customers and orders returns **flat rows**: a customer with three orders appears three times, once beside each order. Your PHP usually wants the opposite shape — each customer once, with a nested list of orders. Loop over the rows and group them by the parent's id. A `LEFT JOIN` also keeps customers with no orders, whose order columns come back as `null`.",
            {
              label: "Grouping flat JOIN rows",
              content: `// SELECT c.id, c.name, o.id AS order_id, o.total
// FROM customers c LEFT JOIN orders o ON o.customer_id = c.id
$rows = [
    ['id' => 1, 'name' => 'Amy', 'order_id' => 10, 'total' => 30],
    ['id' => 1, 'name' => 'Amy', 'order_id' => 11, 'total' => 12],
    ['id' => 2, 'name' => 'Ben', 'order_id' => null, 'total' => null],
];

$customers = [];
foreach ($rows as $row) {
    $customers[$row['id']] ??= ['name' => $row['name'], 'orders' => []];
    if ($row['order_id'] !== null) {
        $customers[$row['id']]['orders'][] = $row['total'];
    }
}

foreach ($customers as $c) {
    echo $c['name'] . ": " . count($c['orders']) . " orders\\n";
}
// Amy: 2 orders
// Ben: 0 orders`,
            },
          ),
          diagram("Same data, two shapes", [
            { id: "flat", label: "JOIN result", color: "#f59e0b", items: ["One row per order", "Customer columns repeated"] },
            { id: "nested", label: "Grouped in PHP", color: "#10b981", items: ["One entry per customer", "orders => [...]"] },
          ]),
          quiz(
            "With a LEFT JOIN, what do the order columns contain for a customer who has no orders?",
            [
              "The customer is left out of the result",
              "NULL — the customer row still appears once with empty order columns",
              "Zero for every column",
              "A copy of the previous customer's order",
            ],
            1,
            "LEFT JOIN keeps every row from the left table. When there's no matching order, the right-hand columns are NULL, which is why the loop checks order_id !== null before adding an order.",
          ),
        ],
        challenge: {
          title: "Group Posts with Their Comments",
          description: "Group the flat rows by post id into $posts[id] = ['title' => ..., 'comments' => [...]], skipping null comments. Echo \"<title> (<count>)\" for each post, one per line.",
          starterCode: `${PHP_MAIN}$rows = [\n    ['post_id' => 1, 'title' => 'Hello', 'comment' => 'Nice!'],\n    ['post_id' => 1, 'title' => 'Hello', 'comment' => 'Thanks'],\n    ['post_id' => 2, 'title' => 'Update', 'comment' => null],\n];\n\n$posts = [];\n// group rows by post_id\n\nforeach ($posts as $post) {\n    echo $post['title'] . " (" . count($post['comments']) . ")\\n";\n}`,
          solutionCode: `${PHP_MAIN}$rows = [\n    ['post_id' => 1, 'title' => 'Hello', 'comment' => 'Nice!'],\n    ['post_id' => 1, 'title' => 'Hello', 'comment' => 'Thanks'],\n    ['post_id' => 2, 'title' => 'Update', 'comment' => null],\n];\n\n$posts = [];\nforeach ($rows as $row) {\n    $posts[$row['post_id']] ??= ['title' => $row['title'], 'comments' => []];\n    if ($row['comment'] !== null) {\n        $posts[$row['post_id']]['comments'][] = $row['comment'];\n    }\n}\n\nforeach ($posts as $post) {\n    echo $post['title'] . " (" . count($post['comments']) . ")\\n";\n}`,
          tests: [
            { id: 1, label: "Groups by post_id", keywords: [{ pattern: "\\$posts\\[\\$row\\['post_id'\\]\\]" }] },
            { id: 2, label: "Skips null comments", keywords: [{ pattern: "\\$row\\['comment'\\]\\s*!==?\\s*null|isset\\s*\\(\\s*\\$row\\['comment'\\]\\s*\\)" }] },
          ],
        },
      },
      {
        id: "mysql-16",
        title: "Avoiding the N+1 Query Problem",
        xp: 30,
        theory: [
          text(
            "The **N+1 problem**: you run 1 query to load N authors, then 1 more query **per author** to load their books — 101 round trips for 100 authors. Each query is fast, but the total is slow. The fix is to load all the children in **one** query with `IN (...)`, then group them by the foreign key in PHP. That's 2 queries no matter how many authors there are.",
            {
              label: "From N+1 queries to 2",
              content: `// N+1: one query per author inside the loop
foreach ($authors as $i => $author) {
    $stmt = $pdo->prepare("SELECT title FROM books WHERE author_id = ?");
    $stmt->execute([$author['id']]);
    $authors[$i]['books'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
}

// Batched: one query for every author's books
$ids = array_column($authors, 'id');
$markers = implode(', ', array_fill(0, count($ids), '?'));
$stmt = $pdo->prepare("SELECT author_id, title FROM books WHERE author_id IN ($markers)");
$stmt->execute($ids);

$booksByAuthor = [];
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    $booksByAuthor[$row['author_id']][] = $row['title'];
}`,
            },
          ),
          callout("info", "ORMs have the same trap — it's why Laravel offers eager loading with ->with('books'). Counting queries per page during development is the easiest way to spot it."),
          quiz(
            "Loading 50 authors and then each author's books separately runs how many queries?",
            [
              "2",
              "50",
              "51",
              "100",
            ],
            2,
            "One query fetches the 50 authors, then the loop adds one query per author: 1 + 50 = 51. Batching the books with IN () brings it down to 2.",
          ),
        ],
        challenge: {
          title: "Batch-Load the Books",
          description: "MockDb counts every query. Replace the per-author loop with a single call to booksForAuthors() using array_column to collect the ids, group the rows by author_id, and echo \"<name>: <count>\" per author followed by \"queries: <n>\".",
          starterCode: `${PHP_MAIN}class MockDb {\n    public int $queries = 0;\n    private array $books = [\n        ['author_id' => 1, 'title' => 'Dune'],\n        ['author_id' => 1, 'title' => 'Children of Dune'],\n        ['author_id' => 2, 'title' => 'Emma'],\n    ];\n\n    public function authors(): array {\n        $this->queries++;\n        return [['id' => 1, 'name' => 'Herbert'], ['id' => 2, 'name' => 'Austen']];\n    }\n\n    public function booksForAuthor(int $id): array {\n        $this->queries++;\n        return array_values(array_filter($this->books, fn($b) => $b['author_id'] === $id));\n    }\n\n    public function booksForAuthors(array $ids): array {\n        $this->queries++;\n        return array_values(array_filter($this->books, fn($b) => in_array($b['author_id'], $ids, true)));\n    }\n}\n\n$db = new MockDb();\n$authors = $db->authors();\n\n// N+1 version — replace this loop with one booksForAuthors() call\nforeach ($authors as $author) {\n    $books = $db->booksForAuthor($author['id']);\n    echo $author['name'] . ": " . count($books) . "\\n";\n}\necho "queries: " . $db->queries;`,
          solutionCode: `${PHP_MAIN}class MockDb {\n    public int $queries = 0;\n    private array $books = [\n        ['author_id' => 1, 'title' => 'Dune'],\n        ['author_id' => 1, 'title' => 'Children of Dune'],\n        ['author_id' => 2, 'title' => 'Emma'],\n    ];\n\n    public function authors(): array {\n        $this->queries++;\n        return [['id' => 1, 'name' => 'Herbert'], ['id' => 2, 'name' => 'Austen']];\n    }\n\n    public function booksForAuthor(int $id): array {\n        $this->queries++;\n        return array_values(array_filter($this->books, fn($b) => $b['author_id'] === $id));\n    }\n\n    public function booksForAuthors(array $ids): array {\n        $this->queries++;\n        return array_values(array_filter($this->books, fn($b) => in_array($b['author_id'], $ids, true)));\n    }\n}\n\n$db = new MockDb();\n$authors = $db->authors();\n\n$byAuthor = [];\nforeach ($db->booksForAuthors(array_column($authors, 'id')) as $book) {\n    $byAuthor[$book['author_id']][] = $book['title'];\n}\n\nforeach ($authors as $author) {\n    echo $author['name'] . ": " . count($byAuthor[$author['id']] ?? []) . "\\n";\n}\necho "queries: " . $db->queries;`,
          tests: [
            { id: 1, label: "Collects ids with array_column", keywords: [{ pattern: "array_column\\s*\\(\\s*\\$authors\\s*,\\s*'id'\\s*\\)" }] },
            { id: 2, label: "Loads books in one batched call", keywords: [{ pattern: "->booksForAuthors\\s*\\(" }] },
            { id: 3, label: "No longer queries inside the loop", keywords: [{ pattern: "^(?![\\s\\S]*->booksForAuthor\\s*\\()" }] },
          ],
        },
      },
      {
        id: "mysql-17",
        title: "Schema Migrations",
        xp: 25,
        theory: [
          text(
            "Changing a table by hand on each server is how environments drift apart. **Migrations** are small, numbered SQL scripts kept in version control and applied in order. The database records which ones have already run in a `schema_migrations` table, so running the migrator again only applies the **pending** ones — every machine ends up with the same schema.",
            {
              label: "A tiny migration runner",
              content: `$migrations = [
    '001_create_users'    => "CREATE TABLE users (id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255) NOT NULL UNIQUE)",
    '002_add_users_name'  => "ALTER TABLE users ADD COLUMN name VARCHAR(100) NULL",
    '003_create_orders'   => "CREATE TABLE orders (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL)",
];

// Read from: SELECT version FROM schema_migrations
$applied = ['001_create_users'];

ksort($migrations); // numbered names sort into run order
foreach ($migrations as $version => $sql) {
    if (in_array($version, $applied, true)) {
        continue;
    }
    // $pdo->exec($sql);
    // $pdo->prepare("INSERT INTO schema_migrations (version) VALUES (?)")->execute([$version]);
    echo "applied $version\\n";
}`,
            },
          ),
          callout("warning", "Never edit a migration that has already run somewhere else — write a new one. Changing an applied script means other databases never receive the change."),
          quiz(
            "What is the schema_migrations table for?",
            [
              "It stores a backup of every table",
              "It records which migrations have run, so only pending ones are applied next time",
              "It holds the application's configuration",
              "MySQL creates it automatically for every database",
            ],
            1,
            "Each successful migration inserts its version into schema_migrations. The runner compares that list with the files it has and executes only the ones not yet recorded.",
          ),
        ],
        challenge: {
          title: "Apply Pending Migrations",
          description: "Complete pending(): sort the migrations by key and return only the versions not in $applied. Echo each pending version on its own line, then \"<n> to run\".",
          starterCode: `${PHP_MAIN}$migrations = [\n    '003_add_index' => "CREATE INDEX idx_email ON users (email)",\n    '001_users'     => "CREATE TABLE users (id INT PRIMARY KEY)",\n    '002_orders'    => "CREATE TABLE orders (id INT PRIMARY KEY)",\n];\n$applied = ['001_users'];\n\nfunction pending(array $migrations, array $applied): array {\n    // sort by version, keep only the ones not applied yet\n\n}\n\n$toRun = pending($migrations, $applied);\nforeach ($toRun as $version) {\n    echo $version . "\\n";\n}\necho count($toRun) . " to run";`,
          solutionCode: `${PHP_MAIN}$migrations = [\n    '003_add_index' => "CREATE INDEX idx_email ON users (email)",\n    '001_users'     => "CREATE TABLE users (id INT PRIMARY KEY)",\n    '002_orders'    => "CREATE TABLE orders (id INT PRIMARY KEY)",\n];\n$applied = ['001_users'];\n\nfunction pending(array $migrations, array $applied): array {\n    ksort($migrations);\n    $versions = [];\n    foreach (array_keys($migrations) as $version) {\n        if (!in_array($version, $applied, true)) {\n            $versions[] = $version;\n        }\n    }\n    return $versions;\n}\n\n$toRun = pending($migrations, $applied);\nforeach ($toRun as $version) {\n    echo $version . "\\n";\n}\necho count($toRun) . " to run";`,
          tests: [
            { id: 1, label: "Sorts migrations by version", keywords: [{ pattern: "ksort\\s*\\(\\s*\\$migrations\\s*\\)" }] },
            { id: 2, label: "Skips applied versions", keywords: [{ pattern: "in_array\\s*\\(\\s*\\$version\\s*,\\s*\\$applied|array_diff\\s*\\(" }] },
          ],
        },
      },
    ],
  },
];

export const PHP_MYSQL_LESSONS = PHP_MYSQL_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PHP_MYSQL_TOTAL_XP = PHP_MYSQL_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
