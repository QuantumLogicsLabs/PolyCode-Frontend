// PolyCode — PHP Projects capstone course
// 6 chapters · 24 lessons · server/browser PHP challenges
// Milestone-based: each lesson's starter code carries forward the accumulated
// classes from earlier lessons in the SAME chapter, building one real,
// growing project per chapter — reinforcing Fundamentals through Laravel.

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

const PHP_MAIN = `<?php\n`;

export const PHP_PROJECTS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Console Contact Book (Beginner)
  // ─────────────────────────────────────────────────────────────
  {
    id: "contact-book",
    title: "Console Contact Book",
    icon: "📇",
    color: "#06b6d4",
    lessons: [
      {
        id: "proj-0",
        title: "Milestone 1: Contact Class & Adding Contacts",
        xp: 25,
        theory: [
          text(
            "We're building a **Contact Book** across this chapter — a real, growing app, not isolated exercises. First milestone: model a `Contact` and store contacts in a growing array.",
            {
              label: "The Contact model",
              content: `class Contact {
    public function __construct(
        public int $id,
        public string $name,
        public string $phone,
    ) {}

    public function __toString(): string {
        return "#{$this->id} {$this->name} ({$this->phone})";
    }
}`,
            },
          ),
          callout("info", "Every lesson in this chapter builds on the last — the Contact class you write here carries forward into searching, sorting, and removing contacts."),
          quiz(
            "Why give Contact its own __toString() method?",
            [
              "It's required by PHP",
              "So printing a Contact directly (e.g. via echo) shows a clean, formatted string instead of a raw object dump",
              "It makes the class faster",
              "It's only for debugging",
            ],
            1,
            "__toString() controls how an object appears when treated as a string — echo $contact will call it automatically, giving us clean output throughout this project.",
          ),
        ],
        challenge: {
          title: "Build the Contact List",
          description: "Complete Contact's __toString(), then add two contacts — (1,\"Amy\",\"555-0101\") and (2,\"Ben\",\"555-0102\") — to an array, and echo them joined by newlines.",
          starterCode: `${PHP_MAIN}class Contact {\n    public function __construct(\n        public int $id,\n        public string $name,\n        public string $phone,\n    ) {}\n\n    public function __toString(): string {\n        // return "#<id> <name> (<phone>)"\n\n    }\n}\n\n$contacts = [];\n// add the two contacts, echo them joined by "\\n"`,
          solutionCode: `${PHP_MAIN}class Contact {\n    public function __construct(\n        public int $id,\n        public string $name,\n        public string $phone,\n    ) {}\n\n    public function __toString(): string {\n        return "#{$this->id} {$this->name} ({$this->phone})";\n    }\n}\n\n$contacts = [];\n$contacts[] = new Contact(1, "Amy", "555-0101");\n$contacts[] = new Contact(2, "Ben", "555-0102");\necho implode("\\n", $contacts);`,
          tests: [
            { id: 1, label: "Implements __toString()", keywords: [{ pattern: "function\\s+__toString" }] },
            { id: 2, label: "Adds two Contact instances", keywords: [{ pattern: "new\\s+Contact" }] },
          ],
        },
      },
      {
        id: "proj-1",
        title: "Milestone 2: Searching & Filtering Contacts",
        xp: 25,
        theory: [
          text(
            "Next milestone: search the contact list. We'll use `array_filter()` — the same filtering approach from PHP MySQL's query-simulation lesson — to find contacts by partial name match.",
            {
              label: "Searching contacts",
              content: `function searchByName(array $contacts, string $query): array {
    return array_filter(
        $contacts,
        fn(Contact $c) => stripos($c->name, $query) !== false
    );
}

$results = searchByName($contacts, "am"); // matches "Amy", "Samuel", etc.`,
            },
          ),
          quiz(
            "Why use stripos() instead of strpos() for the name search?",
            [
              "stripos() is faster",
              "stripos() is case-insensitive, so searching 'amy' also matches 'Amy'",
              "strpos() doesn't work with objects",
              "There's no real difference",
            ],
            1,
            "Users don't reliably match exact casing when searching — stripos() (the 'i' stands for insensitive) makes the search forgiving, matching regardless of case.",
          ),
        ],
        challenge: {
          title: "Search Contacts by Name",
          description: "Given contacts (1,\"Amy\"), (2,\"Ben\"), (3,\"Samuel\"), search for \"am\" (case-insensitive) and echo the count of matches.",
          starterCode: `${PHP_MAIN}class Contact {\n    public function __construct(\n        public int $id,\n        public string $name,\n        public string $phone = "",\n    ) {}\n}\n\n$contacts = [new Contact(1, "Amy"), new Contact(2, "Ben"), new Contact(3, "Samuel")];\n\nfunction searchByName(array $contacts, string $query): array {\n    // filter using stripos, case-insensitive\n\n}\n\necho count(searchByName($contacts, "am"));`,
          solutionCode: `${PHP_MAIN}class Contact {\n    public function __construct(\n        public int $id,\n        public string $name,\n        public string $phone = "",\n    ) {}\n}\n\n$contacts = [new Contact(1, "Amy"), new Contact(2, "Ben"), new Contact(3, "Samuel")];\n\nfunction searchByName(array $contacts, string $query): array {\n    return array_filter($contacts, fn(Contact $c) => stripos($c->name, $query) !== false);\n}\n\necho count(searchByName($contacts, "am"));`,
          tests: [
            { id: 1, label: "Uses stripos for matching", keywords: [{ pattern: "stripos" }] },
            { id: 2, label: "Uses array_filter", keywords: [{ pattern: "array_filter" }] },
          ],
        },
      },
      {
        id: "proj-2",
        title: "Milestone 3: Sorting Contacts Alphabetically",
        xp: 20,
        theory: [
          text(
            "Sort the contact list alphabetically by name using `usort()` with a comparator — same pattern used for the query-builder simulation in PHP MySQL.",
            {
              label: "Sorting contacts",
              content: `usort($contacts, fn(Contact $a, Contact $b) => strcmp($a->name, $b->name));`,
            },
          ),
          quiz(
            "What does strcmp($a, $b) return when $a comes alphabetically before $b?",
            ["A positive number", "Zero", "A negative number", "true"],
            2,
            "strcmp() follows the standard comparator convention: negative means $a sorts first, zero means equal, positive means $a sorts after $b — usort() uses this to order the array.",
          ),
        ],
        challenge: {
          title: "Sort Contacts by Name",
          description: "Given contacts \"Charlie\", \"Amy\", \"Ben\", sort alphabetically by name and echo the names joined by \", \".",
          starterCode: `${PHP_MAIN}class Contact {\n    public function __construct(public int $id, public string $name) {}\n}\n\n$contacts = [new Contact(1, "Charlie"), new Contact(2, "Amy"), new Contact(3, "Ben")];\n\n// sort by name, echo names joined by ", "`,
          solutionCode: `${PHP_MAIN}class Contact {\n    public function __construct(public int $id, public string $name) {}\n}\n\n$contacts = [new Contact(1, "Charlie"), new Contact(2, "Amy"), new Contact(3, "Ben")];\n\nusort($contacts, fn(Contact $a, Contact $b) => strcmp($a->name, $b->name));\necho implode(", ", array_map(fn($c) => $c->name, $contacts));`,
          tests: [
            { id: 1, label: "Uses usort with strcmp", keywords: [{ pattern: "usort" }] },
          ],
        },
      },
      {
        id: "proj-3",
        title: "Milestone 4: Removing a Contact",
        xp: 25,
        theory: [
          text(
            "Final milestone for this project: remove a contact by ID. `array_filter()` keeps everything *except* the matching one, and `array_values()` re-indexes the array afterward.",
            {
              label: "Removing a contact",
              content: `function removeContact(array $contacts, int $id): array {
    $filtered = array_filter($contacts, fn(Contact $c) => $c->id !== $id);
    return array_values($filtered); // re-index from 0
}`,
            },
          ),
          quiz(
            "Why call array_values() after array_filter() here?",
            [
              "It's not necessary",
              "array_filter() preserves original array keys, leaving gaps — array_values() re-indexes them sequentially from 0",
              "array_values() sorts the array",
              "array_filter() requires it to work at all",
            ],
            1,
            "After filtering out an element, PHP keeps the original keys (e.g. 0, 2 if index 1 was removed), which can be surprising — array_values() resets the keys to a clean, sequential 0, 1, 2...",
          ),
        ],
        challenge: {
          title: "Remove a Contact by ID",
          description: "Given contacts with ids 1, 2, 3, remove the contact with id 2, then echo the count and the remaining ids joined by \",\".",
          starterCode: `${PHP_MAIN}class Contact {\n    public function __construct(public int $id, public string $name) {}\n}\n\n$contacts = [new Contact(1, "Amy"), new Contact(2, "Ben"), new Contact(3, "Cid")];\n\nfunction removeContact(array $contacts, int $id): array {\n    // filter out the matching id, re-index\n\n}\n\n$remaining = removeContact($contacts, 2);\necho count($remaining) . ":" . implode(",", array_map(fn($c) => $c->id, $remaining));`,
          solutionCode: `${PHP_MAIN}class Contact {\n    public function __construct(public int $id, public string $name) {}\n}\n\n$contacts = [new Contact(1, "Amy"), new Contact(2, "Ben"), new Contact(3, "Cid")];\n\nfunction removeContact(array $contacts, int $id): array {\n    $filtered = array_filter($contacts, fn(Contact $c) => $c->id !== $id);\n    return array_values($filtered);\n}\n\n$remaining = removeContact($contacts, 2);\necho count($remaining) . ":" . implode(",", array_map(fn($c) => $c->id, $remaining));`,
          tests: [
            { id: 1, label: "Filters out the matching id", keywords: [{ pattern: "\\$c->id\\s*!==\\s*\\$id" }] },
            { id: 2, label: "Re-indexes with array_values", keywords: [{ pattern: "array_values" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Simple Blog with Sessions (Intermediate)
  // ─────────────────────────────────────────────────────────────
  {
    id: "blog-with-sessions",
    title: "Simple Blog with Sessions",
    icon: "📝",
    color: "#3b82f6",
    lessons: [
      {
        id: "proj-4",
        title: "Milestone 1: Post Class & Publishing",
        xp: 25,
        theory: [
          text(
            "New project: a **simple blog**. First milestone: a `Post` class and a function to publish new posts into a growing array.",
            {
              label: "The Post model",
              content: `class Post {
    public function __construct(
        public string $title,
        public string $body,
        public string $author,
    ) {}
}

function publish(array &$posts, Post $post): void {
    $posts[] = $post;
}`,
            },
          ),
          quiz(
            "Why does publish() take array &$posts (with an &) instead of just array $posts?",
            [
              "It's required syntax for functions",
              "The & passes the array by reference, so changes inside the function actually modify the original $posts array outside it",
              "It makes the function faster",
              "It converts the array to an object",
            ],
            1,
            "PHP arrays are normally passed by value (a copy) — without &, appending inside publish() wouldn't affect the caller's array at all. Pass-by-reference lets the function truly mutate the original.",
          ),
        ],
        challenge: {
          title: "Publish Posts",
          description: "Complete publish() to append by reference. Publish two posts: (\"Hello World\", \"My first post\", \"Amy\") and (\"Day Two\", \"Still going\", \"Amy\"). Echo the count.",
          starterCode: `${PHP_MAIN}class Post {\n    public function __construct(\n        public string $title,\n        public string $body,\n        public string $author,\n    ) {}\n}\n\nfunction publish(array &$posts, Post $post): void {\n    // append $post to $posts\n\n}\n\n$posts = [];\npublish($posts, new Post("Hello World", "My first post", "Amy"));\npublish($posts, new Post("Day Two", "Still going", "Amy"));\necho count($posts);`,
          solutionCode: `${PHP_MAIN}class Post {\n    public function __construct(\n        public string $title,\n        public string $body,\n        public string $author,\n    ) {}\n}\n\nfunction publish(array &$posts, Post $post): void {\n    $posts[] = $post;\n}\n\n$posts = [];\npublish($posts, new Post("Hello World", "My first post", "Amy"));\npublish($posts, new Post("Day Two", "Still going", "Amy"));\necho count($posts);`,
          tests: [
            { id: 1, label: "publish() appends to the referenced array", keywords: [{ pattern: "\\$posts\\[\\]\\s*=" }] },
          ],
        },
      },
      {
        id: "proj-5",
        title: "Milestone 2: Login-Gated Publishing",
        xp: 30,
        theory: [
          text(
            "Only logged-in users should publish — reusing the `requireLogin()` guard pattern from PHP Sessions to protect the publish action.",
            {
              label: "Guarding publish with a session check",
              content: `session_start();

function requireLogin(): bool {
    if (!isset($_SESSION['user'])) {
        echo "Access denied — please log in\\n";
        return false;
    }
    return true;
}

function publishIfAllowed(array &$posts, Post $post): void {
    if (requireLogin()) {
        $posts[] = $post;
        echo "Published!\\n";
    }
}`,
            },
          ),
          quiz(
            "Why check requireLogin() INSIDE publishIfAllowed() rather than trusting the caller already checked?",
            [
              "It's redundant and unnecessary",
              "Defense in depth — if some other code path calls publishIfAllowed() without checking login first, the guard still protects the action",
              "It makes the function faster",
              "PHP requires this pattern",
            ],
            1,
            "Centralizing the check inside the action itself (not just at the UI layer) means the protection can't accidentally be bypassed by a new caller that forgets to check first — the same principle as never trusting client-side validation alone.",
          ),
        ],
        challenge: {
          title: "Guard Publishing with Login",
          description: "No user is set in the session. Attempt publishIfAllowed() with a new Post — it should echo the denial message and NOT add to $posts. Then echo the final count.",
          starterCode: `${PHP_MAIN}session_start();\n\nclass Post {\n    public function __construct(public string $title) {}\n}\n\nfunction requireLogin(): bool {\n    // return false and echo denial message if not logged in\n\n}\n\nfunction publishIfAllowed(array &$posts, Post $post): void {\n    if (requireLogin()) {\n        $posts[] = $post;\n    }\n}\n\n$posts = [];\npublishIfAllowed($posts, new Post("Sneaky Post"));\necho count($posts);`,
          solutionCode: `${PHP_MAIN}session_start();\n\nclass Post {\n    public function __construct(public string $title) {}\n}\n\nfunction requireLogin(): bool {\n    if (!isset($_SESSION['user'])) {\n        echo "Access denied — please log in\\n";\n        return false;\n    }\n    return true;\n}\n\nfunction publishIfAllowed(array &$posts, Post $post): void {\n    if (requireLogin()) {\n        $posts[] = $post;\n    }\n}\n\n$posts = [];\npublishIfAllowed($posts, new Post("Sneaky Post"));\necho count($posts);`,
          tests: [
            { id: 1, label: "Checks $_SESSION['user']", keywords: [{ pattern: "\\$_SESSION\\['user'\\]" }] },
            { id: 2, label: "Only publishes if requireLogin() passes", keywords: [{ pattern: "if\\s*\\(\\s*requireLogin" }] },
          ],
        },
      },
      {
        id: "proj-6",
        title: "Milestone 3: Validating a New Post Form",
        xp: 25,
        theory: [
          text(
            "Reuse the validation pattern from PHP Forms: check required fields before publishing, collecting all errors instead of stopping at the first one.",
            {
              label: "Validating post data",
              content: `function validatePost(array $data): array {
    $errors = [];
    if (empty($data['title'])) $errors[] = "Title is required";
    if (empty($data['body'])) $errors[] = "Body is required";
    return $errors;
}`,
            },
          ),
          quiz(
            "Why collect all validation errors into an array instead of returning on the first failure?",
            [
              "It's slower to check everything",
              "Showing the user every problem at once (missing title AND body) is more helpful than making them fix one error, resubmit, and discover the next one",
              "PHP requires arrays for validation",
              "There's no real benefit",
            ],
            1,
            "This mirrors PHP Forms' validation lesson — a good UX shows all problems in one pass rather than a frustrating one-error-at-a-time loop.",
          ),
        ],
        challenge: {
          title: "Validate Post Data",
          description: "Given $_POST with title set but body missing, validate and echo the errors joined by \", \".",
          starterCode: `${PHP_MAIN}$_POST['title'] = "My Post";\n\nfunction validatePost(array $data): array {\n    // check title and body, collect errors\n\n}\n\necho implode(", ", validatePost($_POST));`,
          solutionCode: `${PHP_MAIN}$_POST['title'] = "My Post";\n\nfunction validatePost(array $data): array {\n    $errors = [];\n    if (empty($data['title'])) $errors[] = "Title is required";\n    if (empty($data['body'])) $errors[] = "Body is required";\n    return $errors;\n}\n\necho implode(", ", validatePost($_POST));`,
          tests: [
            { id: 1, label: "Checks both title and body", keywords: [{ pattern: "empty\\s*\\(\\s*\\$data\\['title'\\]" }, { pattern: "empty\\s*\\(\\s*\\$data\\['body'\\]" }] },
          ],
        },
      },
      {
        id: "proj-7",
        title: "Milestone 4: Comments with Custom Exceptions",
        xp: 30,
        theory: [
          text(
            "Final milestone: add comments to posts, throwing a custom exception if someone tries to comment on a post that doesn't exist — the OOP course's custom-exception pattern in action.",
            {
              label: "A custom exception for missing posts",
              content: `class PostNotFoundException extends Exception {}

function addComment(array $posts, int $postIndex, string $comment): string {
    if (!isset($posts[$postIndex])) {
        throw new PostNotFoundException("No post at index $postIndex");
    }
    return "Comment added to '{$posts[$postIndex]->title}': $comment";
}`,
            },
          ),
          quiz(
            "What's the benefit of PostNotFoundException extending Exception, over just throwing a generic Exception?",
            [
              "It's required by PHP",
              "Calling code can catch PostNotFoundException specifically, distinguishing 'the post doesn't exist' from any other unrelated error",
              "It makes the function run faster",
              "There's no real benefit",
            ],
            1,
            "Same principle as Java's custom exceptions — a named exception type lets callers handle this specific failure mode differently from other errors, and documents the failure clearly.",
          ),
        ],
        challenge: {
          title: "Handle a Missing Post",
          description: "Given one post at index 0, attempt to add a comment at index 5 — catch the PostNotFoundException and echo its message.",
          starterCode: `${PHP_MAIN}class Post {\n    public function __construct(public string $title) {}\n}\n\nclass PostNotFoundException extends Exception {}\n\nfunction addComment(array $posts, int $postIndex, string $comment): string {\n    // throw PostNotFoundException if the index doesn't exist\n\n}\n\n$posts = [new Post("Hello World")];\ntry {\n    echo addComment($posts, 5, "Nice post!");\n} catch (PostNotFoundException $e) {\n    echo $e->getMessage();\n}`,
          solutionCode: `${PHP_MAIN}class Post {\n    public function __construct(public string $title) {}\n}\n\nclass PostNotFoundException extends Exception {}\n\nfunction addComment(array $posts, int $postIndex, string $comment): string {\n    if (!isset($posts[$postIndex])) {\n        throw new PostNotFoundException("No post at index $postIndex");\n    }\n    return "Comment added to '{$posts[$postIndex]->title}': $comment";\n}\n\n$posts = [new Post("Hello World")];\ntry {\n    echo addComment($posts, 5, "Nice post!");\n} catch (PostNotFoundException $e) {\n    echo $e->getMessage();\n}`,
          tests: [
            { id: 1, label: "Throws PostNotFoundException", keywords: [{ pattern: "throw new PostNotFoundException" }] },
            { id: 2, label: "Catches it in the caller", keywords: [{ pattern: "catch\\s*\\(\\s*PostNotFoundException" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Task Tracker with MySQL (Advanced)
  // ─────────────────────────────────────────────────────────────
  {
    id: "task-tracker-mysql",
    title: "Task Tracker with MySQL",
    icon: "🗄️",
    color: "#f59e0b",
    lessons: [
      {
        id: "proj-8",
        title: "Milestone 1: TaskRepository with Mock PDO",
        xp: 30,
        theory: [
          text(
            "New project: a **database-backed task tracker**. First milestone: a `TaskRepository` DAO wrapping a mock PDO connection, mirroring the Repository pattern from PHP MySQL.",
            {
              label: "The repository layer",
              content: `class TaskRepository {
    public function __construct(private $pdo) {}

    public function all(): array {
        return $this->pdo->query("tasks");
    }

    public function add(string $title): void {
        $this->pdo->insert($title);
    }
}`,
            },
          ),
          quiz(
            "Why does TaskRepository take its $pdo connection via the constructor?",
            [
              "It's faster",
              "Dependency injection — the repository doesn't create its own connection, making it easy to swap in a fake one for testing (like we're doing here)",
              "PHP requires this pattern",
              "There's no benefit",
            ],
            1,
            "Same principle from PHP MySQL's dependency-injection lesson — injecting the connection means this exact repository code works with a real PDO in production and a mock one here in the sandbox.",
          ),
        ],
        challenge: {
          title: "Build the Task Repository",
          description: "Using MockPdo (query() returns a fixed list, insert() appends to it), implement TaskRepository.add() and all(). Add \"Buy milk\", then echo all() joined by \", \".",
          starterCode: `${PHP_MAIN}class MockPdo {\n    private $tasks = ["Write report"];\n    public function query() { return $this->tasks; }\n    public function insert($title) { $this->tasks[] = $title; }\n}\n\nclass TaskRepository {\n    public function __construct(private $pdo) {}\n\n    public function all(): array {\n        // delegate to $pdo->query()\n\n    }\n\n    public function add(string $title): void {\n        // delegate to $pdo->insert()\n\n    }\n}\n\n$repo = new TaskRepository(new MockPdo());\n$repo->add("Buy milk");\necho implode(", ", $repo->all());`,
          solutionCode: `${PHP_MAIN}class MockPdo {\n    private $tasks = ["Write report"];\n    public function query() { return $this->tasks; }\n    public function insert($title) { $this->tasks[] = $title; }\n}\n\nclass TaskRepository {\n    public function __construct(private $pdo) {}\n\n    public function all(): array {\n        return $this->pdo->query();\n    }\n\n    public function add(string $title): void {\n        $this->pdo->insert($title);\n    }\n}\n\n$repo = new TaskRepository(new MockPdo());\n$repo->add("Buy milk");\necho implode(", ", $repo->all());`,
          tests: [
            { id: 1, label: "all() delegates to $pdo", keywords: [{ pattern: "\\$this->pdo->query" }] },
            { id: 2, label: "add() delegates to $pdo", keywords: [{ pattern: "\\$this->pdo->insert" }] },
          ],
        },
      },
      {
        id: "proj-9",
        title: "Milestone 2: Marking Tasks Complete",
        xp: 25,
        theory: [
          text(
            "Add an `update()` method simulating a real `UPDATE tasks SET done = 1 WHERE id = ?` — the prepared-statement UPDATE pattern from PHP MySQL, now wired into our repository.",
            {
              label: "Updating a task",
              content: `class TaskRepository {
    // ... constructor, all(), add() from before ...

    public function markComplete(int $index): void {
        $this->pdo->update($index);
    }
}`,
            },
          ),
          quiz(
            "What real SQL statement does markComplete() conceptually represent?",
            [
              "SELECT * FROM tasks",
              "UPDATE tasks SET done = 1 WHERE id = ?",
              "DELETE FROM tasks WHERE id = ?",
              "INSERT INTO tasks (title) VALUES (?)",
            ],
            1,
            "Marking something complete changes existing data rather than creating or removing a row — that's the job of UPDATE, using a WHERE clause (via a prepared statement placeholder) to target the specific row.",
          ),
        ],
        challenge: {
          title: "Mark a Task Complete",
          description: "Using the given MockPdo tracking a 'done' array, add markComplete(index) to TaskRepository, call it for index 0, then echo whether tasks[0] is marked done (\"true\"/\"false\").",
          starterCode: `${PHP_MAIN}class MockPdo {\n    public $done = [false, false];\n    public function update($index) { $this->done[$index] = true; }\n}\n\nclass TaskRepository {\n    public function __construct(private $pdo) {}\n\n    public function markComplete(int $index): void {\n        // delegate to $pdo->update()\n\n    }\n}\n\n$mock = new MockPdo();\n$repo = new TaskRepository($mock);\n$repo->markComplete(0);\necho $mock->done[0] ? "true" : "false";`,
          solutionCode: `${PHP_MAIN}class MockPdo {\n    public $done = [false, false];\n    public function update($index) { $this->done[$index] = true; }\n}\n\nclass TaskRepository {\n    public function __construct(private $pdo) {}\n\n    public function markComplete(int $index): void {\n        $this->pdo->update($index);\n    }\n}\n\n$mock = new MockPdo();\n$repo = new TaskRepository($mock);\n$repo->markComplete(0);\necho $mock->done[0] ? "true" : "false";`,
          tests: [
            { id: 1, label: "markComplete delegates to $pdo->update", keywords: [{ pattern: "\\$this->pdo->update" }] },
          ],
        },
      },
      {
        id: "proj-10",
        title: "Milestone 3: Deleting Tasks & Handling Errors",
        xp: 25,
        theory: [
          text(
            "Deleting a task that doesn't exist should fail gracefully, not crash — catching a `PDOException`-style error the way PHP MySQL's transaction lesson did.",
            {
              label: "Safe deletion",
              content: `public function delete(int $index): string {
    try {
        $this->pdo->remove($index);
        return "Deleted";
    } catch (\\Exception $e) {
        return "Could not delete: " . $e->getMessage();
    }
}`,
            },
          ),
          quiz(
            "Why wrap the delete operation in try/catch instead of letting an invalid index crash the whole request?",
            [
              "It's slower with try/catch",
              "A single failed delete (like an invalid ID from a stale UI) shouldn't take down the whole application — catching it lets you respond gracefully",
              "PHP requires try/catch for delete operations",
              "There's no real benefit",
            ],
            1,
            "Real apps must handle bad input gracefully — an uncaught exception would show a fatal error page to the user; catching it lets you show a sensible message instead.",
          ),
        ],
        challenge: {
          title: "Handle a Failed Delete",
          description: "Using MockPdo.remove() which throws an Exception for index 99, implement TaskRepository.delete() with try/catch, call delete(99), and echo the result.",
          starterCode: `${PHP_MAIN}class MockPdo {\n    public function remove($index) {\n        if ($index === 99) {\n            throw new Exception("Task not found");\n        }\n    }\n}\n\nclass TaskRepository {\n    public function __construct(private $pdo) {}\n\n    public function delete(int $index): string {\n        // try/catch around $pdo->remove(), return "Deleted" or "Could not delete: <msg>"\n\n    }\n}\n\n$repo = new TaskRepository(new MockPdo());\necho $repo->delete(99);`,
          solutionCode: `${PHP_MAIN}class MockPdo {\n    public function remove($index) {\n        if ($index === 99) {\n            throw new Exception("Task not found");\n        }\n    }\n}\n\nclass TaskRepository {\n    public function __construct(private $pdo) {}\n\n    public function delete(int $index): string {\n        try {\n            $this->pdo->remove($index);\n            return "Deleted";\n        } catch (Exception $e) {\n            return "Could not delete: " . $e->getMessage();\n        }\n    }\n}\n\n$repo = new TaskRepository(new MockPdo());\necho $repo->delete(99);`,
          tests: [
            { id: 1, label: "Uses try/catch around remove()", keywords: [{ pattern: "try\\s*\\{" }] },
            { id: 2, label: "Catches Exception and returns its message", keywords: [{ pattern: "getMessage\\s*\\(" }] },
          ],
        },
      },
      {
        id: "proj-11",
        title: "Milestone 4: Task Statistics",
        xp: 30,
        theory: [
          text(
            "Final milestone: compute stats over the tasks — total count and percent complete — using `array_filter`/`count`, the same aggregation approach from PHP Collections-style examples.",
            {
              label: "Computing statistics",
              content: `public function stats(): array {
    $tasks = $this->pdo->all(); // e.g. [['done' => true], ['done' => false], ...]
    $total = count($tasks);
    $done = count(array_filter($tasks, fn($t) => $t['done']));
    $percent = $total > 0 ? round(($done / $total) * 100) : 0;
    return ['total' => $total, 'done' => $done, 'percent' => $percent];
}`,
            },
          ),
          quiz(
            "Why check '$total > 0 ?' before dividing $done / $total?",
            [
              "It's not necessary",
              "Dividing by zero (an empty task list) would cause an error or produce an invalid result — the guard avoids that edge case",
              "PHP requires this check syntax",
              "It makes the calculation faster",
            ],
            1,
            "An empty tasks array means $total is 0, and dividing by zero is undefined — always guard against empty collections before computing a percentage or average.",
          ),
        ],
        challenge: {
          title: "Compute Completion Percentage",
          description: "Given tasks [[\"done\"=>true], [\"done\"=>false], [\"done\"=>true], [\"done\"=>false]], compute total, done count, and percent complete, then echo \"<done>/<total> (<percent>%)\".",
          starterCode: `${PHP_MAIN}$tasks = [["done" => true], ["done" => false], ["done" => true], ["done" => false]];\n\n// compute total, done, percent; echo "<done>/<total> (<percent>%)"`,
          solutionCode: `${PHP_MAIN}$tasks = [["done" => true], ["done" => false], ["done" => true], ["done" => false]];\n\n$total = count($tasks);\n$done = count(array_filter($tasks, fn($t) => $t["done"]));\n$percent = $total > 0 ? round(($done / $total) * 100) : 0;\necho "$done/$total ($percent%)";`,
          tests: [
            { id: 1, label: "Guards against division by zero", keywords: [{ pattern: "\\$total\\s*>\\s*0\\s*\\?" }] },
            { id: 2, label: "Filters done tasks", keywords: [{ pattern: "array_filter" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Mini Laravel-Style API (Pro)
  // ─────────────────────────────────────────────────────────────
  {
    id: "mini-laravel-api",
    title: "Mini Laravel-Style API",
    icon: "🚀",
    color: "#8b5cf6",
    lessons: [
      {
        id: "proj-12",
        title: "Milestone 1: Building a Router",
        xp: 30,
        theory: [
          text(
            "The capstone project: a mini API backend, structured like Laravel. First milestone: a simple router mapping \"METHOD path\" strings to handler closures — the same concept as `Route::get()`.",
            {
              label: "A minimal router",
              content: `class Router {
    private array $routes = [];

    public function add(string $method, string $path, callable $handler): void {
        $this->routes["$method $path"] = $handler;
    }

    public function dispatch(string $method, string $path): string {
        $key = "$method $path";
        return isset($this->routes[$key]) ? ($this->routes[$key])() : "404 Not Found";
    }
}`,
            },
          ),
          quiz(
            "What does the Router's dispatch() method conceptually represent in a real Laravel app?",
            [
              "The database connection",
              "Laravel's own routing engine, matching an incoming request's method+URL to the registered route and invoking its handler",
              "A Blade template",
              "An Eloquent model",
            ],
            1,
            "This is exactly what Route::get()/Route::post() plus Laravel's internal dispatcher do — map a method+path combination to a handler, then invoke it when a matching request arrives.",
          ),
        ],
        challenge: {
          title: "Build a Mini Router",
          description: "Complete Router.add() and dispatch(). Register \"GET /products\" returning \"Product list\", then dispatch(\"GET\", \"/products\") and echo the result.",
          starterCode: `${PHP_MAIN}class Router {\n    private array $routes = [];\n\n    public function add(string $method, string $path, callable $handler): void {\n        // register the handler under "METHOD path"\n\n    }\n\n    public function dispatch(string $method, string $path): string {\n        // look up and call the handler, or return "404 Not Found"\n\n    }\n}\n\n$router = new Router();\n$router->add("GET", "/products", fn() => "Product list");\necho $router->dispatch("GET", "/products");`,
          solutionCode: `${PHP_MAIN}class Router {\n    private array $routes = [];\n\n    public function add(string $method, string $path, callable $handler): void {\n        $this->routes["$method $path"] = $handler;\n    }\n\n    public function dispatch(string $method, string $path): string {\n        $key = "$method $path";\n        return isset($this->routes[$key]) ? ($this->routes[$key])() : "404 Not Found";\n    }\n}\n\n$router = new Router();\n$router->add("GET", "/products", fn() => "Product list");\necho $router->dispatch("GET", "/products");`,
          tests: [
            { id: 1, label: "add() registers under 'METHOD path'", keywords: [{ pattern: "\\$this->routes\\[" }] },
            { id: 2, label: "dispatch() calls the matched handler", keywords: [{ pattern: "isset\\s*\\(\\s*\\$this->routes" }] },
          ],
        },
      },
      {
        id: "proj-13",
        title: "Milestone 2: A ProductController with Validation",
        xp: 30,
        theory: [
          text(
            "Wire a `ProductController` into the router, combining routing with the validation pattern from Laravel Basics — invalid input should be rejected before anything is created.",
            {
              label: "Controller + validation",
              content: `class ProductController {
    public function store(array $data): string {
        if (empty($data['name']) || !is_numeric($data['price'] ?? null)) {
            return "422 Validation failed";
        }
        return "Created: {$data['name']}";
    }
}

$router->add("POST", "/products", fn() => (new ProductController())->store($_POST));`,
            },
          ),
          quiz(
            "What HTTP status code convention does '422 Validation failed' follow?",
            [
              "422 means success",
              "422 (Unprocessable Entity) is the standard REST status for valid syntax but semantically invalid data — like a real Laravel validation failure",
              "422 is a server error code",
              "There's no real convention here",
            ],
            1,
            "Real APIs (including Laravel's) return 422 specifically for validation failures — distinct from 404 (not found) or 500 (server error) — so clients can handle each failure type appropriately.",
          ),
        ],
        challenge: {
          title: "Validate Before Creating",
          description: "Implement ProductController.store($data) rejecting if name is empty or price isn't numeric. Call it with [\"name\"=>\"\", \"price\"=>25] and echo the result.",
          starterCode: `${PHP_MAIN}class ProductController {\n    public function store(array $data): string {\n        // validate name and price, return "422 Validation failed" or "Created: <name>"\n\n    }\n}\n\n$controller = new ProductController();\necho $controller->store(["name" => "", "price" => 25]);`,
          solutionCode: `${PHP_MAIN}class ProductController {\n    public function store(array $data): string {\n        if (empty($data['name']) || !is_numeric($data['price'] ?? null)) {\n            return "422 Validation failed";\n        }\n        return "Created: {$data['name']}";\n    }\n}\n\n$controller = new ProductController();\necho $controller->store(["name" => "", "price" => 25]);`,
          tests: [
            { id: 1, label: "Validates name is not empty", keywords: [{ pattern: "empty\\s*\\(\\s*\\$data\\['name'\\]" }] },
            { id: 2, label: "Validates price is numeric", keywords: [{ pattern: "is_numeric" }] },
          ],
        },
      },
      {
        id: "proj-14",
        title: "Milestone 3: Middleware-Protected Routes",
        xp: 30,
        theory: [
          text(
            "Not every route should be public — wrap the router's dispatch with a middleware check, exactly like Laravel's `->middleware('auth')`, protecting the delete endpoint specifically.",
            {
              label: "Adding middleware",
              content: `function withAuth(bool $isLoggedIn, callable $handler): string {
    if (!$isLoggedIn) {
        return "401 Unauthorized";
    }
    return $handler();
}

$router->add("DELETE", "/products/1", fn() =>
    withAuth($isLoggedIn, fn() => "Product deleted")
);`,
            },
          ),
          quiz(
            "Why protect only the DELETE route with middleware, while leaving GET /products public?",
            [
              "All routes must have identical protection",
              "Reading a product list is safe for anyone, but deleting data is destructive and should require authentication — protection should match the action's risk",
              "DELETE routes are always slower",
              "There's no reason to differentiate",
            ],
            1,
            "Real APIs apply middleware selectively — read-only, harmless endpoints often stay public, while state-changing or sensitive actions (create, update, delete) get protected, matching Laravel's ->middleware() applied per-route.",
          ),
        ],
        challenge: {
          title: "Protect a Delete Action",
          description: "Implement withAuth($isLoggedIn, $handler) rejecting with \"401 Unauthorized\" if not logged in. Call it with false and a handler returning \"Product deleted\", echo the result.",
          starterCode: `${PHP_MAIN}function withAuth(bool $isLoggedIn, callable $handler): string {\n    // return "401 Unauthorized" if not logged in, else call $handler()\n\n}\n\necho withAuth(false, fn() => "Product deleted");`,
          solutionCode: `${PHP_MAIN}function withAuth(bool $isLoggedIn, callable $handler): string {\n    if (!$isLoggedIn) {\n        return "401 Unauthorized";\n    }\n    return $handler();\n}\n\necho withAuth(false, fn() => "Product deleted");`,
          tests: [
            { id: 1, label: "Checks $isLoggedIn before calling handler", keywords: [{ pattern: "if\\s*\\(\\s*!\\$isLoggedIn\\s*\\)" }] },
          ],
        },
      },
      {
        id: "proj-15",
        title: "Milestone 4: Putting It All Together",
        xp: 40,
        theory: [
          text(
            "Final milestone for this project: combine the router, controller, validation, and middleware into one complete, working mini API — every piece from this chapter, wired together.",
            {
              label: "The complete mini API",
              content: `class Router {
    private array $routes = [];
    public function add($method, $path, $handler) { $this->routes["$method $path"] = $handler; }
    public function dispatch($method, $path) {
        $key = "$method $path";
        return isset($this->routes[$key]) ? ($this->routes[$key])() : "404 Not Found";
    }
}

$router = new Router();
$router->add("GET", "/products", fn() => "Product list");
$router->add("POST", "/products", fn() =>
    (new ProductController())->store($_POST)
);
$router->add("DELETE", "/products/1", fn() =>
    withAuth(false, fn() => "Product deleted")
);

echo $router->dispatch("GET", "/products");`,
            },
          ),
          quiz(
            "Across this whole capstone chapter, what design principle connects the Router, ProductController, and withAuth pieces?",
            [
              "They're all unrelated, standalone utilities",
              "Separation of concerns — routing, business/validation logic, and cross-cutting auth checks each live in their own focused piece, composed together",
              "They must all be in the same class",
              "Only the Router matters; the rest are optional extras",
            ],
            1,
            "This mirrors real Laravel architecture: routes dispatch to controllers, controllers handle business logic and validation, and middleware wraps cross-cutting concerns like auth — each piece stays focused and they compose cleanly.",
          ),
        ],
        challenge: {
          title: "Assemble the Complete Mini API",
          description: "Wire up a Router with GET /products (returns \"Product list\") and POST /products (validates via ProductController, using $_POST with name=\"Mouse\", price=25). Dispatch both and echo them separated by \" | \".",
          starterCode: `${PHP_MAIN}class ProductController {\n    public function store(array $data): string {\n        if (empty($data['name']) || !is_numeric($data['price'] ?? null)) {\n            return "422 Validation failed";\n        }\n        return "Created: {$data['name']}";\n    }\n}\n\nclass Router {\n    private array $routes = [];\n    public function add($method, $path, $handler) { $this->routes["$method $path"] = $handler; }\n    public function dispatch($method, $path) {\n        $key = "$method $path";\n        return isset($this->routes[$key]) ? ($this->routes[$key])() : "404 Not Found";\n    }\n}\n\n$_POST = ["name" => "Mouse", "price" => 25];\n$router = new Router();\n// register GET /products and POST /products, dispatch both, echo joined by " | "`,
          solutionCode: `${PHP_MAIN}class ProductController {\n    public function store(array $data): string {\n        if (empty($data['name']) || !is_numeric($data['price'] ?? null)) {\n            return "422 Validation failed";\n        }\n        return "Created: {$data['name']}";\n    }\n}\n\nclass Router {\n    private array $routes = [];\n    public function add($method, $path, $handler) { $this->routes["$method $path"] = $handler; }\n    public function dispatch($method, $path) {\n        $key = "$method $path";\n        return isset($this->routes[$key]) ? ($this->routes[$key])() : "404 Not Found";\n    }\n}\n\n$_POST = ["name" => "Mouse", "price" => 25];\n$router = new Router();\n$router->add("GET", "/products", fn() => "Product list");\n$router->add("POST", "/products", fn() => (new ProductController())->store($_POST));\n\n$get = $router->dispatch("GET", "/products");\n$post = $router->dispatch("POST", "/products");\necho "$get | $post";`,
          tests: [
            { id: 1, label: "Registers both GET and POST /products", keywords: [{ pattern: "\"GET\",\\s*\"/products\"" }, { pattern: "\"POST\",\\s*\"/products\"" }] },
            { id: 2, label: "Dispatches both routes", keywords: [{ pattern: "dispatch\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Shopping Cart & Checkout
  // ─────────────────────────────────────────────────────────────
  {
    id: "shopping-cart-checkout",
    title: "Shopping Cart & Checkout",
    icon: "🛍️",
    color: "#10b981",
    lessons: [
      {
        id: "proj-16",
        title: "Milestone 1: Products & Cart Lines",
        xp: 25,
        theory: [
          text(
            "New project: a **shopping cart and checkout**, built over four milestones. Prices are stored as whole **pence** (integers), never floats — `0.1 + 0.2` is not exactly `0.3` in floating point, and money errors add up. The cart keys its lines by product SKU, so adding the same product twice raises the quantity instead of adding a second line.",
            {
              label: "Products and a cart keyed by SKU",
              content: `final class Product {
    public function __construct(
        public readonly string $sku,
        public readonly string $name,
        public readonly int $pricePence,
    ) {}
}

function money(int $pence): string {
    return "£" . number_format($pence / 100, 2);
}

class Cart {
    private array $lines = [];

    public function add(Product $product, int $qty = 1): void {
        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];
        $this->lines[$product->sku]['qty'] += $qty;
    }

    public function lines(): array {
        return array_values($this->lines);
    }
}

$cart = new Cart();
$mug = new Product("MUG-1", "Mug", 850);
$cart->add($mug);
$cart->add($mug, 2);
echo count($cart->lines()); // 1 line, qty 3`,
            },
          ),
          callout("info", "Every milestone in this chapter carries the previous one's code forward — Product, money() and Cart grow into a full checkout by milestone 4."),
          quiz(
            "Why store £8.50 as the integer 850 instead of the float 8.5?",
            [
              "Integers use less memory",
              "Floats can't represent many decimal amounts exactly, so totals drift; whole pence add up exactly",
              "number_format() only accepts integers",
              "PHP floats can't be negative",
            ],
            1,
            "Binary floating point can't store values like 0.1 exactly. Integer pence make every addition and multiplication exact, and you only convert to pounds for display.",
          ),
        ],
        challenge: {
          title: "Add Products to the Cart",
          description: "Complete Cart::add() so it creates a line for a new SKU with qty 0 (use ??=) and then adds $qty. Add 1 mug, 2 more mugs and 1 pen, then echo each line as \"<name> x<qty> <money(price)>\" on its own line.",
          starterCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        // create the line if needed, then add $qty\n\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n}\n\n$cart = new Cart();\n$mug = new Product("MUG-1", "Mug", 850);\n$pen = new Product("PEN-1", "Pen", 199);\n$cart->add($mug);\n$cart->add($mug, 2);\n$cart->add($pen);\n\nforeach ($cart->lines() as $line) {\n    echo "{$line['product']->name} x{$line['qty']} " . money($line['product']->pricePence) . "\\n";\n}`,
          solutionCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];\n        $this->lines[$product->sku]['qty'] += $qty;\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n}\n\n$cart = new Cart();\n$mug = new Product("MUG-1", "Mug", 850);\n$pen = new Product("PEN-1", "Pen", 199);\n$cart->add($mug);\n$cart->add($mug, 2);\n$cart->add($pen);\n\nforeach ($cart->lines() as $line) {\n    echo "{$line['product']->name} x{$line['qty']} " . money($line['product']->pricePence) . "\\n";\n}`,
          tests: [
            { id: 1, label: "Keys the line by SKU", keywords: [{ pattern: "\\$this->lines\\[\\$product->sku\\]" }] },
            { id: 2, label: "Increases the quantity", keywords: [{ pattern: "\\['qty'\\]\\s*\\+=\\s*\\$qty" }] },
          ],
        },
      },
      {
        id: "proj-17",
        title: "Milestone 2: Totals & Discount Codes",
        xp: 30,
        theory: [
          text(
            "Milestone 2 adds money maths to the Cart. `subtotal()` multiplies each line's price by its quantity. Discount codes live in a class constant mapping code → percent, and `discount()` uses `intdiv()` so the result stays whole pence — any fraction of a penny is dropped. An unknown or missing code simply gives 0%.",
            {
              label: "Subtotal, discount and total",
              content: `class Cart {
    private const CODES = ['SAVE10' => 10, 'HALF' => 50];
    // ...add() and lines() from milestone 1...

    public function subtotal(): int {
        $sum = 0;
        foreach ($this->lines as $line) {
            $sum += $line['product']->pricePence * $line['qty'];
        }
        return $sum;
    }

    public function discount(?string $code): int {
        $percent = self::CODES[$code] ?? 0;
        return intdiv($this->subtotal() * $percent, 100);
    }

    public function total(?string $code = null): int {
        return $this->subtotal() - $this->discount($code);
    }
}

// 3 mugs at £8.50 + 1 pen at £1.99 = £27.49
// SAVE10 → discount intdiv(2749 * 10, 100) = 274 → total £24.75`,
            },
          ),
          callout("warning", "Always look discount codes up on the server. A percentage sent from the browser could be edited to 100."),
          quiz(
            "Why use intdiv($subtotal * $percent, 100) rather than $subtotal * $percent / 100?",
            [
              "intdiv() is the only way to divide in PHP",
              "It keeps the discount a whole number of pence instead of producing a float like 274.9",
              "It rounds up so the shop earns more",
              "Division with / is slower",
            ],
            1,
            "/ returns a float when the division isn't exact. intdiv() performs integer division, so every amount in the cart stays in exact whole pence.",
          ),
        ],
        challenge: {
          title: "Compute the Totals",
          description: "Complete subtotal() (price × qty over every line) and discount() (percent from CODES, 0 for unknown codes, via intdiv). Echo the subtotal, the total with \"SAVE10\" and the total with \"BOGUS\" using money(), one per line.",
          starterCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private const CODES = ['SAVE10' => 10, 'HALF' => 50];\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];\n        $this->lines[$product->sku]['qty'] += $qty;\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n\n    public function subtotal(): int {\n        // sum price * qty for every line\n\n    }\n\n    public function discount(?string $code): int {\n        // percent from CODES (0 if unknown), as whole pence\n\n    }\n\n    public function total(?string $code = null): int {\n        return $this->subtotal() - $this->discount($code);\n    }\n}\n\n$cart = new Cart();\n$cart->add(new Product("MUG-1", "Mug", 850), 3);\n$cart->add(new Product("PEN-1", "Pen", 199));\n\necho money($cart->subtotal()) . "\\n";\necho money($cart->total("SAVE10")) . "\\n";\necho money($cart->total("BOGUS"));`,
          solutionCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private const CODES = ['SAVE10' => 10, 'HALF' => 50];\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];\n        $this->lines[$product->sku]['qty'] += $qty;\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n\n    public function subtotal(): int {\n        $sum = 0;\n        foreach ($this->lines as $line) {\n            $sum += $line['product']->pricePence * $line['qty'];\n        }\n        return $sum;\n    }\n\n    public function discount(?string $code): int {\n        $percent = self::CODES[$code] ?? 0;\n        return intdiv($this->subtotal() * $percent, 100);\n    }\n\n    public function total(?string $code = null): int {\n        return $this->subtotal() - $this->discount($code);\n    }\n}\n\n$cart = new Cart();\n$cart->add(new Product("MUG-1", "Mug", 850), 3);\n$cart->add(new Product("PEN-1", "Pen", 199));\n\necho money($cart->subtotal()) . "\\n";\necho money($cart->total("SAVE10")) . "\\n";\necho money($cart->total("BOGUS"));`,
          tests: [
            { id: 1, label: "Multiplies price by quantity", keywords: [{ pattern: "pricePence\\s*\\*\\s*\\$line\\['qty'\\]|\\$line\\['qty'\\]\\s*\\*\\s*\\$line\\['product'\\]->pricePence" }] },
            { id: 2, label: "Looks the code up with a 0 fallback", keywords: [{ pattern: "self::CODES\\[\\$code\\]\\s*\\?\\?\\s*0" }] },
            { id: 3, label: "Uses intdiv()", keywords: [{ pattern: "intdiv\\s*\\(" }] },
          ],
        },
      },
      {
        id: "proj-18",
        title: "Milestone 3: Stock Checks with Exceptions",
        xp: 30,
        theory: [
          text(
            "Checkout must not sell stock that isn't there. A `Checkout` service holds the stock levels and `place()` validates **every** line first, throwing a custom `OutOfStockException` for the first problem. Only when all lines pass does it reduce stock. Validating before changing anything means a failed checkout leaves stock untouched — the same all-or-nothing idea as a database transaction.",
            {
              label: "Validate everything, then commit",
              content: `class OutOfStockException extends Exception {}

class Checkout {
    public function __construct(private array $stock) {}

    public function place(Cart $cart, ?string $code = null): int {
        foreach ($cart->lines() as $line) {
            $available = $this->stock[$line['product']->sku] ?? 0;
            if ($line['qty'] > $available) {
                throw new OutOfStockException("Only $available left of {$line['product']->name}");
            }
        }
        foreach ($cart->lines() as $line) {
            $this->stock[$line['product']->sku] -= $line['qty'];
        }
        return $cart->total($code);
    }
}

try {
    $total = $checkout->place($cart, "SAVE10");
    echo "Order placed: " . money($total);
} catch (OutOfStockException $e) {
    echo "Sorry: " . $e->getMessage();
}`,
            },
          ),
          quiz(
            "Why does place() loop over the lines twice — once to check, once to reduce stock?",
            [
              "PHP can't throw inside a loop that modifies arrays",
              "If a later line is out of stock, the earlier lines' stock hasn't been reduced yet, so nothing needs undoing",
              "It makes checkout faster",
              "The second loop is only for logging",
            ],
            1,
            "Checking everything first means an exception can't leave stock half-updated. It's the in-memory version of wrapping the order in a transaction.",
          ),
        ],
        challenge: {
          title: "Guard Checkout Against Low Stock",
          description: "Define OutOfStockException and complete Checkout::place(): throw it with \"Only <n> left of <name>\" if any line's qty exceeds stock, otherwise reduce stock and return $cart->total($code). Try one order that fails and one that succeeds, echoing \"Sorry: <message>\" or \"Order placed: <money>\" on separate lines.",
          starterCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private const CODES = ['SAVE10' => 10, 'HALF' => 50];\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];\n        $this->lines[$product->sku]['qty'] += $qty;\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n\n    public function subtotal(): int {\n        $sum = 0;\n        foreach ($this->lines as $line) {\n            $sum += $line['product']->pricePence * $line['qty'];\n        }\n        return $sum;\n    }\n\n    public function discount(?string $code): int {\n        $percent = self::CODES[$code] ?? 0;\n        return intdiv($this->subtotal() * $percent, 100);\n    }\n\n    public function total(?string $code = null): int {\n        return $this->subtotal() - $this->discount($code);\n    }\n}\n\n// define OutOfStockException\n\nclass Checkout {\n    public function __construct(private array $stock) {}\n\n    public function place(Cart $cart, ?string $code = null): int {\n        // 1) throw if any line needs more than is in stock\n        // 2) reduce stock, return the total\n\n    }\n}\n\n$mug = new Product("MUG-1", "Mug", 850);\n$checkout = new Checkout(["MUG-1" => 2]);\n\nforeach ([3, 2] as $qty) {\n    $cart = new Cart();\n    $cart->add($mug, $qty);\n    try {\n        echo "Order placed: " . money($checkout->place($cart)) . "\\n";\n    } catch (OutOfStockException $e) {\n        echo "Sorry: " . $e->getMessage() . "\\n";\n    }\n}`,
          solutionCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private const CODES = ['SAVE10' => 10, 'HALF' => 50];\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];\n        $this->lines[$product->sku]['qty'] += $qty;\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n\n    public function subtotal(): int {\n        $sum = 0;\n        foreach ($this->lines as $line) {\n            $sum += $line['product']->pricePence * $line['qty'];\n        }\n        return $sum;\n    }\n\n    public function discount(?string $code): int {\n        $percent = self::CODES[$code] ?? 0;\n        return intdiv($this->subtotal() * $percent, 100);\n    }\n\n    public function total(?string $code = null): int {\n        return $this->subtotal() - $this->discount($code);\n    }\n}\n\nclass OutOfStockException extends Exception {}\n\nclass Checkout {\n    public function __construct(private array $stock) {}\n\n    public function place(Cart $cart, ?string $code = null): int {\n        foreach ($cart->lines() as $line) {\n            $available = $this->stock[$line['product']->sku] ?? 0;\n            if ($line['qty'] > $available) {\n                throw new OutOfStockException("Only $available left of {$line['product']->name}");\n            }\n        }\n        foreach ($cart->lines() as $line) {\n            $this->stock[$line['product']->sku] -= $line['qty'];\n        }\n        return $cart->total($code);\n    }\n}\n\n$mug = new Product("MUG-1", "Mug", 850);\n$checkout = new Checkout(["MUG-1" => 2]);\n\nforeach ([3, 2] as $qty) {\n    $cart = new Cart();\n    $cart->add($mug, $qty);\n    try {\n        echo "Order placed: " . money($checkout->place($cart)) . "\\n";\n    } catch (OutOfStockException $e) {\n        echo "Sorry: " . $e->getMessage() . "\\n";\n    }\n}`,
          tests: [
            { id: 1, label: "Defines OutOfStockException", keywords: [{ pattern: "class\\s+OutOfStockException\\s+extends\\s+\\\\?Exception" }] },
            { id: 2, label: "Throws when stock is short", keywords: [{ pattern: "throw\\s+new\\s+OutOfStockException\\s*\\(" }] },
            { id: 3, label: "Reduces stock after validating", keywords: [{ pattern: "\\$this->stock\\[.+\\]\\s*-=" }] },
          ],
        },
      },
      {
        id: "proj-19",
        title: "Milestone 4: Printing a Receipt",
        xp: 35,
        theory: [
          text(
            "The last milestone turns an order into a readable receipt. `sprintf()` formats each line into fixed-width columns: `%-10s` left-aligns text in 10 characters, `%3d` right-aligns a number in 3, and `%8s` right-aligns the price. `str_repeat()` draws the divider. Building the receipt as a string (instead of echoing as you go) means it can also be emailed or saved.",
            {
              label: "Fixed-width receipt lines",
              content: `function receiptLine(string $label, string $qty, string $amount): string {
    return sprintf("%-10s %3s %8s", $label, $qty, $amount);
}

echo receiptLine("Mug", "3", "£25.50") . "\\n";
echo receiptLine("Pen", "1", "£1.99") . "\\n";
echo str_repeat("-", 23) . "\\n";
echo receiptLine("TOTAL", "", "£27.49");`,
            },
          ),
          callout("info", "sprintf() pads by bytes, not characters, so a multi-byte symbol like £ makes that column one character narrower. For perfect alignment with symbols, use mb_str_pad() (PHP 8.3+) or put the symbol in its own column."),
          quiz(
            "What does the format %-10s do in sprintf()?",
            [
              "Cuts the string to 10 characters",
              "Pads the string with spaces to at least 10 characters, aligned left",
              "Right-aligns a number with 10 decimal places",
              "Removes 10 characters from the start",
            ],
            1,
            "The number sets a minimum width and the minus sign means left-align, so shorter labels are padded with spaces on the right and the columns line up.",
          ),
        ],
        challenge: {
          title: "Render the Receipt",
          description: "Complete receipt(): one sprintf(\"%-10s %3d %8s\", name, qty, amount) line per cart line (amount = price × qty as \"12.34\" via number_format), a divider of 23 dashes, then sprintf(\"%-14s %8s\", \"TOTAL\", total). Return the lines joined by \"\\n\" and echo it.",
          starterCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private const CODES = ['SAVE10' => 10, 'HALF' => 50];\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];\n        $this->lines[$product->sku]['qty'] += $qty;\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n\n    public function subtotal(): int {\n        $sum = 0;\n        foreach ($this->lines as $line) {\n            $sum += $line['product']->pricePence * $line['qty'];\n        }\n        return $sum;\n    }\n\n    public function discount(?string $code): int {\n        $percent = self::CODES[$code] ?? 0;\n        return intdiv($this->subtotal() * $percent, 100);\n    }\n\n    public function total(?string $code = null): int {\n        return $this->subtotal() - $this->discount($code);\n    }\n}\n\nfunction receipt(Cart $cart, ?string $code = null): string {\n    $lines = [];\n    // one formatted row per cart line, a divider, then the total\n\n    return implode("\\n", $lines);\n}\n\n$cart = new Cart();\n$cart->add(new Product("MUG-1", "Mug", 850), 3);\n$cart->add(new Product("PEN-1", "Pen", 199));\necho receipt($cart, "SAVE10");`,
          solutionCode: `${PHP_MAIN}final class Product {\n    public function __construct(\n        public readonly string $sku,\n        public readonly string $name,\n        public readonly int $pricePence,\n    ) {}\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nclass Cart {\n    private const CODES = ['SAVE10' => 10, 'HALF' => 50];\n    private array $lines = [];\n\n    public function add(Product $product, int $qty = 1): void {\n        $this->lines[$product->sku] ??= ['product' => $product, 'qty' => 0];\n        $this->lines[$product->sku]['qty'] += $qty;\n    }\n\n    public function lines(): array {\n        return array_values($this->lines);\n    }\n\n    public function subtotal(): int {\n        $sum = 0;\n        foreach ($this->lines as $line) {\n            $sum += $line['product']->pricePence * $line['qty'];\n        }\n        return $sum;\n    }\n\n    public function discount(?string $code): int {\n        $percent = self::CODES[$code] ?? 0;\n        return intdiv($this->subtotal() * $percent, 100);\n    }\n\n    public function total(?string $code = null): int {\n        return $this->subtotal() - $this->discount($code);\n    }\n}\n\nfunction receipt(Cart $cart, ?string $code = null): string {\n    $lines = [];\n    foreach ($cart->lines() as $line) {\n        $amount = number_format($line['product']->pricePence * $line['qty'] / 100, 2);\n        $lines[] = sprintf("%-10s %3d %8s", $line['product']->name, $line['qty'], $amount);\n    }\n    $lines[] = str_repeat("-", 23);\n    $lines[] = sprintf("%-14s %8s", "TOTAL", number_format($cart->total($code) / 100, 2));\n    return implode("\\n", $lines);\n}\n\n$cart = new Cart();\n$cart->add(new Product("MUG-1", "Mug", 850), 3);\n$cart->add(new Product("PEN-1", "Pen", 199));\necho receipt($cart, "SAVE10");`,
          tests: [
            { id: 1, label: "Formats rows with sprintf", keywords: [{ pattern: "sprintf\\s*\\(\\s*\"%-10s %3d %8s\"" }] },
            { id: 2, label: "Draws the divider", keywords: [{ pattern: "str_repeat\\s*\\(\\s*\"-\"\\s*,\\s*23\\s*\\)" }] },
            { id: 3, label: "Prints the discounted total", keywords: [{ pattern: "\\$cart->total\\s*\\(\\s*\\$code\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Expense Report from CSV
  // ─────────────────────────────────────────────────────────────
  {
    id: "expense-report-csv",
    title: "Expense Report from CSV",
    icon: "📑",
    color: "#ec4899",
    lessons: [
      {
        id: "proj-20",
        title: "Milestone 1: Parsing CSV Rows",
        xp: 25,
        theory: [
          text(
            "Final project: turn a bank-style **CSV export** into an expense report. Splitting lines on commas by hand breaks as soon as a field contains a comma, like `\"Coffee, large\"`. `str_getcsv()` understands quoting. Read the first line as the **header**, then `array_combine()` each row with it so you work with `$row['amount']` instead of `$row[2]`.",
            {
              label: "Header-aware CSV parsing",
              content: `$csv = <<<CSV
date,category,amount,note
2026-03-02,food,4.20,"Coffee, large"
2026-03-02,travel,12.50,Train
CSV;

$lines = explode("\\n", trim($csv));
$header = str_getcsv(array_shift($lines), ",", "\\"", "");

foreach ($lines as $line) {
    $row = array_combine($header, str_getcsv($line, ",", "\\"", ""));
    echo "{$row['category']}: {$row['note']}\\n";
}
// food: Coffee, large
// travel: Train`,
            },
          ),
          callout("info", "The explicit \",\", \"\\\"\", \"\" arguments set the separator, the quote character and an empty escape character. PHP 8.4 deprecates relying on the default escape character, so passing it keeps the code warning-free."),
          quiz(
            "Why use str_getcsv() instead of explode(',', $line)?",
            [
              "explode() can't split strings",
              "str_getcsv() respects quoted fields, so a comma inside \"Coffee, large\" doesn't split the field",
              "str_getcsv() is required for files over 1MB",
              "explode() removes the header row",
            ],
            1,
            "CSV allows commas inside quoted fields. explode() would split \"Coffee, large\" into two broken fields; str_getcsv() treats it as one value.",
          ),
        ],
        challenge: {
          title: "Turn CSV Lines into Keyed Rows",
          description: "Complete parseRows(): split the trimmed CSV into lines, read the header with csvFields(array_shift(...)), and array_combine() it with each remaining line. Echo the number of rows, then the first row's note.",
          starterCode: `${PHP_MAIN}function csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseRows(string $csv): array {\n    $rows = [];\n    // header first, then array_combine each line with it\n\n    return $rows;\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\nCSV;\n\n$rows = parseRows($csv);\necho count($rows) . "\\n";\necho $rows[0]['note'];`,
          solutionCode: `${PHP_MAIN}function csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseRows(string $csv): array {\n    $lines = explode("\\n", trim($csv));\n    $header = csvFields(array_shift($lines));\n    $rows = [];\n    foreach ($lines as $line) {\n        $rows[] = array_combine($header, csvFields($line));\n    }\n    return $rows;\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\nCSV;\n\n$rows = parseRows($csv);\necho count($rows) . "\\n";\necho $rows[0]['note'];`,
          tests: [
            { id: 1, label: "Reads the header row", keywords: [{ pattern: "array_shift\\s*\\(\\s*\\$lines\\s*\\)" }] },
            { id: 2, label: "Keys each row with array_combine", keywords: [{ pattern: "array_combine\\s*\\(\\s*\\$header" }] },
          ],
        },
      },
      {
        id: "proj-21",
        title: "Milestone 2: Validating & Skipping Bad Rows",
        xp: 30,
        theory: [
          text(
            "Real exports contain bad rows, and one bad row shouldn't stop the whole import. For each line, check the **column count** first (in PHP 8, `array_combine()` throws a `ValueError` when the counts differ), then the date and the amount. Skip invalid rows and record an error with the **line number**, so the user can fix the file. Date parsing needs care: `createFromFormat()` quietly rolls `2026-02-30` over into March, so format the result back and compare.",
            {
              label: "Strict dates and per-line errors",
              content: `function parseDate(string $value): ?DateTimeImmutable {
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    return $date && $date->format('Y-m-d') === $value ? $date : null;
}

var_dump(parseDate('2026-03-02') !== null); // bool(true)
var_dump(parseDate('2026-02-30') !== null); // bool(false) — no 30th of February
var_dump(parseDate('03/02/2026') !== null); // bool(false) — wrong format

// Inside the import loop:
// if (count($fields) !== count($header)) { $errors[] = "line $lineNo: ..."; continue; }`,
            },
          ),
          callout("info", "The ! at the start of the format resets the time fields to midnight, so two expenses on the same day compare as equal dates."),
          quiz(
            "Why compare $date->format('Y-m-d') with the original string after createFromFormat()?",
            [
              "createFromFormat() always returns null",
              "Out-of-range dates like 2026-02-30 are silently rolled over to a real date, and the round-trip check catches that",
              "It converts the date to UTC",
              "It is required before using DateTimeImmutable",
            ],
            1,
            "PHP accepts day 30 in February and turns it into 2 March. Formatting the parsed date back and comparing reveals that the input wasn't a real calendar date.",
          ),
        ],
        challenge: {
          title: "Import with Validation",
          description: "Complete importExpenses(): for each line (line numbers start at 2), record \"line N: expected 4 columns\", \"line N: invalid date\" or \"line N: invalid amount\" and skip it; otherwise create an Expense with the amount in pence (round(amount * 100)). Echo the number of imported expenses, then each error on its own line.",
          starterCode: `${PHP_MAIN}final class Expense {\n    public function __construct(\n        public readonly DateTimeImmutable $date,\n        public readonly string $category,\n        public readonly int $amountPence,\n        public readonly string $note,\n    ) {}\n}\n\nfunction csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseDate(string $value): ?DateTimeImmutable {\n    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);\n    return $date && $date->format('Y-m-d') === $value ? $date : null;\n}\n\nfunction importExpenses(string $csv): array {\n    $lines = explode("\\n", trim($csv));\n    $header = csvFields(array_shift($lines));\n    $expenses = [];\n    $errors = [];\n\n    foreach ($lines as $i => $line) {\n        $lineNo = $i + 2;\n        // check the column count, the date and the amount; skip bad rows\n\n    }\n\n    return ['expenses' => $expenses, 'errors' => $errors];\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\n2026-02-30,food,3.00,Bad date\n2026-03-05,food,abc,Bad amount\n2026-03-09,travel,6.00\n2026-04-01,food,18.75,Groceries\nCSV;\n\n$result = importExpenses($csv);\necho count($result['expenses']) . " imported\\n";\necho implode("\\n", $result['errors']);`,
          solutionCode: `${PHP_MAIN}final class Expense {\n    public function __construct(\n        public readonly DateTimeImmutable $date,\n        public readonly string $category,\n        public readonly int $amountPence,\n        public readonly string $note,\n    ) {}\n}\n\nfunction csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseDate(string $value): ?DateTimeImmutable {\n    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);\n    return $date && $date->format('Y-m-d') === $value ? $date : null;\n}\n\nfunction importExpenses(string $csv): array {\n    $lines = explode("\\n", trim($csv));\n    $header = csvFields(array_shift($lines));\n    $expenses = [];\n    $errors = [];\n\n    foreach ($lines as $i => $line) {\n        $lineNo = $i + 2; // +1 for the header, +1 because humans count from 1\n        $fields = csvFields($line);\n        if (count($fields) !== count($header)) {\n            $errors[] = "line $lineNo: expected " . count($header) . " columns";\n            continue;\n        }\n        $row = array_combine($header, $fields);\n        $date = parseDate($row['date']);\n        if ($date === null) {\n            $errors[] = "line $lineNo: invalid date";\n            continue;\n        }\n        if (!is_numeric($row['amount']) || $row['amount'] <= 0) {\n            $errors[] = "line $lineNo: invalid amount";\n            continue;\n        }\n        $expenses[] = new Expense($date, $row['category'], (int) round($row['amount'] * 100), $row['note']);\n    }\n\n    return ['expenses' => $expenses, 'errors' => $errors];\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\n2026-02-30,food,3.00,Bad date\n2026-03-05,food,abc,Bad amount\n2026-03-09,travel,6.00\n2026-04-01,food,18.75,Groceries\nCSV;\n\n$result = importExpenses($csv);\necho count($result['expenses']) . " imported\\n";\necho implode("\\n", $result['errors']);`,
          tests: [
            { id: 1, label: "Checks the column count before combining", keywords: [{ pattern: "count\\s*\\(\\s*\\$fields\\s*\\)\\s*!==?\\s*count\\s*\\(\\s*\\$header\\s*\\)" }] },
            { id: 2, label: "Validates the date and amount", keywords: [{ pattern: "parseDate\\s*\\(" }, { pattern: "is_numeric\\s*\\(" }] },
            { id: 3, label: "Stores the amount in pence", keywords: [{ pattern: "round\\s*\\([^;]*\\*\\s*100\\s*\\)" }] },
          ],
        },
      },
      {
        id: "proj-22",
        title: "Milestone 3: Grouping by Category & Month",
        xp: 30,
        theory: [
          text(
            "With clean `Expense` objects, the report is a pair of **group-and-sum** loops: one keyed by category, one keyed by month. The month key comes from `$expense->date->format('Y-m')`, which also sorts correctly as a string. `arsort()` orders categories by total, biggest first, keeping the keys; `ksort()` puts months in calendar order.",
            {
              label: "Two groupings over the same data",
              content: `function totalsByCategory(array $expenses): array {
    $totals = [];
    foreach ($expenses as $e) {
        $totals[$e->category] = ($totals[$e->category] ?? 0) + $e->amountPence;
    }
    arsort($totals);
    return $totals;
}

function totalsByMonth(array $expenses): array {
    $totals = [];
    foreach ($expenses as $e) {
        $month = $e->date->format('Y-m');
        $totals[$month] = ($totals[$month] ?? 0) + $e->amountPence;
    }
    ksort($totals);
    return $totals;
}

// totalsByCategory → ['food' => 2295, 'travel' => 1250]
// totalsByMonth    → ['2026-03' => 1670, '2026-04' => 1875]`,
            },
          ),
          quiz(
            "Why use arsort() rather than rsort() on ['food' => 2295, 'travel' => 1250]?",
            [
              "rsort() only works on strings",
              "arsort() sorts by value while keeping the category keys; rsort() would replace them with 0, 1, 2…",
              "arsort() sorts alphabetically",
              "They behave identically",
            ],
            1,
            "The a in arsort() means associative: keys stay attached to their values. rsort() reindexes the array and the category names would be lost.",
          ),
        ],
        challenge: {
          title: "Total by Category and Month",
          description: "Complete totalsByCategory() (sum pence per category, arsort) and totalsByMonth() (sum per $e->date->format('Y-m'), ksort). Echo each category as \"<category>: <money>\" and then each month the same way.",
          starterCode: `${PHP_MAIN}final class Expense {\n    public function __construct(\n        public readonly DateTimeImmutable $date,\n        public readonly string $category,\n        public readonly int $amountPence,\n        public readonly string $note,\n    ) {}\n}\n\nfunction csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseDate(string $value): ?DateTimeImmutable {\n    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);\n    return $date && $date->format('Y-m-d') === $value ? $date : null;\n}\n\nfunction importExpenses(string $csv): array {\n    $lines = explode("\\n", trim($csv));\n    $header = csvFields(array_shift($lines));\n    $expenses = [];\n    $errors = [];\n\n    foreach ($lines as $i => $line) {\n        $lineNo = $i + 2; // +1 for the header, +1 because humans count from 1\n        $fields = csvFields($line);\n        if (count($fields) !== count($header)) {\n            $errors[] = "line $lineNo: expected " . count($header) . " columns";\n            continue;\n        }\n        $row = array_combine($header, $fields);\n        $date = parseDate($row['date']);\n        if ($date === null) {\n            $errors[] = "line $lineNo: invalid date";\n            continue;\n        }\n        if (!is_numeric($row['amount']) || $row['amount'] <= 0) {\n            $errors[] = "line $lineNo: invalid amount";\n            continue;\n        }\n        $expenses[] = new Expense($date, $row['category'], (int) round($row['amount'] * 100), $row['note']);\n    }\n\n    return ['expenses' => $expenses, 'errors' => $errors];\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nfunction totalsByCategory(array $expenses): array {\n    $totals = [];\n    // sum per category, biggest first\n\n    return $totals;\n}\n\nfunction totalsByMonth(array $expenses): array {\n    $totals = [];\n    // sum per Y-m, in calendar order\n\n    return $totals;\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\n2026-02-30,food,3.00,Bad date\n2026-03-05,food,abc,Bad amount\n2026-03-09,travel,6.00\n2026-04-01,food,18.75,Groceries\nCSV;\n\n$expenses = importExpenses($csv)['expenses'];\nforeach (totalsByCategory($expenses) as $category => $pence) {\n    echo "$category: " . money($pence) . "\\n";\n}\nforeach (totalsByMonth($expenses) as $month => $pence) {\n    echo "$month: " . money($pence) . "\\n";\n}`,
          solutionCode: `${PHP_MAIN}final class Expense {\n    public function __construct(\n        public readonly DateTimeImmutable $date,\n        public readonly string $category,\n        public readonly int $amountPence,\n        public readonly string $note,\n    ) {}\n}\n\nfunction csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseDate(string $value): ?DateTimeImmutable {\n    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);\n    return $date && $date->format('Y-m-d') === $value ? $date : null;\n}\n\nfunction importExpenses(string $csv): array {\n    $lines = explode("\\n", trim($csv));\n    $header = csvFields(array_shift($lines));\n    $expenses = [];\n    $errors = [];\n\n    foreach ($lines as $i => $line) {\n        $lineNo = $i + 2; // +1 for the header, +1 because humans count from 1\n        $fields = csvFields($line);\n        if (count($fields) !== count($header)) {\n            $errors[] = "line $lineNo: expected " . count($header) . " columns";\n            continue;\n        }\n        $row = array_combine($header, $fields);\n        $date = parseDate($row['date']);\n        if ($date === null) {\n            $errors[] = "line $lineNo: invalid date";\n            continue;\n        }\n        if (!is_numeric($row['amount']) || $row['amount'] <= 0) {\n            $errors[] = "line $lineNo: invalid amount";\n            continue;\n        }\n        $expenses[] = new Expense($date, $row['category'], (int) round($row['amount'] * 100), $row['note']);\n    }\n\n    return ['expenses' => $expenses, 'errors' => $errors];\n}\n\nfunction money(int $pence): string {\n    return "£" . number_format($pence / 100, 2);\n}\n\nfunction totalsByCategory(array $expenses): array {\n    $totals = [];\n    foreach ($expenses as $e) {\n        $totals[$e->category] = ($totals[$e->category] ?? 0) + $e->amountPence;\n    }\n    arsort($totals);\n    return $totals;\n}\n\nfunction totalsByMonth(array $expenses): array {\n    $totals = [];\n    foreach ($expenses as $e) {\n        $month = $e->date->format('Y-m');\n        $totals[$month] = ($totals[$month] ?? 0) + $e->amountPence;\n    }\n    ksort($totals);\n    return $totals;\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\n2026-02-30,food,3.00,Bad date\n2026-03-05,food,abc,Bad amount\n2026-03-09,travel,6.00\n2026-04-01,food,18.75,Groceries\nCSV;\n\n$expenses = importExpenses($csv)['expenses'];\nforeach (totalsByCategory($expenses) as $category => $pence) {\n    echo "$category: " . money($pence) . "\\n";\n}\nforeach (totalsByMonth($expenses) as $month => $pence) {\n    echo "$month: " . money($pence) . "\\n";\n}`,
          tests: [
            { id: 1, label: "Groups by category", keywords: [{ pattern: "\\$totals\\[\\$e->category\\]" }] },
            { id: 2, label: "Groups by month with format('Y-m')", keywords: [{ pattern: "->format\\s*\\(\\s*'Y-m'\\s*\\)" }] },
            { id: 3, label: "Sorts both groupings", keywords: [{ pattern: "arsort\\s*\\(\\s*\\$totals\\s*\\)" }, { pattern: "ksort\\s*\\(\\s*\\$totals\\s*\\)" }] },
          ],
        },
      },
      {
        id: "proj-23",
        title: "Milestone 4: Exporting a JSON Summary",
        xp: 40,
        theory: [
          text(
            "Final milestone of the course: package the report as **JSON** so a dashboard or another service can use it. Build a plain array — counts, totals in pence, the groupings and the import errors — then `json_encode()` it. `JSON_PRETTY_PRINT` makes it readable, and `JSON_THROW_ON_ERROR` turns an encoding failure into an exception instead of a silent `false`. This project pulls together classes, validation, dates, sorting and serialization from across the PHP track.",
            {
              label: "Building the summary",
              content: `function summary(array $expenses, array $errors): array {
    $total = array_sum(array_map(fn(Expense $e) => $e->amountPence, $expenses));
    return [
        'imported' => count($expenses),
        'skipped' => count($errors),
        'total_pence' => $total,
        'by_category' => totalsByCategory($expenses),
        'by_month' => totalsByMonth($expenses),
        'errors' => $errors,
    ];
}

$result = importExpenses($csv);
echo json_encode(
    summary($result['expenses'], $result['errors']),
    JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR,
);`,
            },
          ),
          quiz(
            "What does JSON_THROW_ON_ERROR change about json_encode()?",
            [
              "It makes the output pretty-printed",
              "Encoding failures throw a JsonException instead of returning false",
              "It escapes all non-ASCII characters",
              "It validates the data against a schema",
            ],
            1,
            "Without the flag, json_encode() returns false on failure and you must remember to check json_last_error(). With it, a failure throws JsonException, which is much harder to miss.",
          ),
        ],
        challenge: {
          title: "Export the Report",
          description: "Complete summary() so it returns imported, skipped, total_pence (sum of amountPence) and by_category. Echo json_encode() of it with JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR.",
          starterCode: `${PHP_MAIN}final class Expense {\n    public function __construct(\n        public readonly DateTimeImmutable $date,\n        public readonly string $category,\n        public readonly int $amountPence,\n        public readonly string $note,\n    ) {}\n}\n\nfunction csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseDate(string $value): ?DateTimeImmutable {\n    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);\n    return $date && $date->format('Y-m-d') === $value ? $date : null;\n}\n\nfunction importExpenses(string $csv): array {\n    $lines = explode("\\n", trim($csv));\n    $header = csvFields(array_shift($lines));\n    $expenses = [];\n    $errors = [];\n\n    foreach ($lines as $i => $line) {\n        $lineNo = $i + 2; // +1 for the header, +1 because humans count from 1\n        $fields = csvFields($line);\n        if (count($fields) !== count($header)) {\n            $errors[] = "line $lineNo: expected " . count($header) . " columns";\n            continue;\n        }\n        $row = array_combine($header, $fields);\n        $date = parseDate($row['date']);\n        if ($date === null) {\n            $errors[] = "line $lineNo: invalid date";\n            continue;\n        }\n        if (!is_numeric($row['amount']) || $row['amount'] <= 0) {\n            $errors[] = "line $lineNo: invalid amount";\n            continue;\n        }\n        $expenses[] = new Expense($date, $row['category'], (int) round($row['amount'] * 100), $row['note']);\n    }\n\n    return ['expenses' => $expenses, 'errors' => $errors];\n}\n\nfunction totalsByCategory(array $expenses): array {\n    $totals = [];\n    foreach ($expenses as $e) {\n        $totals[$e->category] = ($totals[$e->category] ?? 0) + $e->amountPence;\n    }\n    arsort($totals);\n    return $totals;\n}\n\nfunction totalsByMonth(array $expenses): array {\n    $totals = [];\n    foreach ($expenses as $e) {\n        $month = $e->date->format('Y-m');\n        $totals[$month] = ($totals[$month] ?? 0) + $e->amountPence;\n    }\n    ksort($totals);\n    return $totals;\n}\n\nfunction summary(array $expenses, array $errors): array {\n    // imported, skipped, total_pence and by_category\n\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\n2026-02-30,food,3.00,Bad date\n2026-03-05,food,abc,Bad amount\n2026-03-09,travel,6.00\n2026-04-01,food,18.75,Groceries\nCSV;\n\n$result = importExpenses($csv);\necho json_encode(summary($result['expenses'], $result['errors']), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);`,
          solutionCode: `${PHP_MAIN}final class Expense {\n    public function __construct(\n        public readonly DateTimeImmutable $date,\n        public readonly string $category,\n        public readonly int $amountPence,\n        public readonly string $note,\n    ) {}\n}\n\nfunction csvFields(string $line): array {\n    return str_getcsv($line, ",", "\\"", "");\n}\n\nfunction parseDate(string $value): ?DateTimeImmutable {\n    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);\n    return $date && $date->format('Y-m-d') === $value ? $date : null;\n}\n\nfunction importExpenses(string $csv): array {\n    $lines = explode("\\n", trim($csv));\n    $header = csvFields(array_shift($lines));\n    $expenses = [];\n    $errors = [];\n\n    foreach ($lines as $i => $line) {\n        $lineNo = $i + 2; // +1 for the header, +1 because humans count from 1\n        $fields = csvFields($line);\n        if (count($fields) !== count($header)) {\n            $errors[] = "line $lineNo: expected " . count($header) . " columns";\n            continue;\n        }\n        $row = array_combine($header, $fields);\n        $date = parseDate($row['date']);\n        if ($date === null) {\n            $errors[] = "line $lineNo: invalid date";\n            continue;\n        }\n        if (!is_numeric($row['amount']) || $row['amount'] <= 0) {\n            $errors[] = "line $lineNo: invalid amount";\n            continue;\n        }\n        $expenses[] = new Expense($date, $row['category'], (int) round($row['amount'] * 100), $row['note']);\n    }\n\n    return ['expenses' => $expenses, 'errors' => $errors];\n}\n\nfunction totalsByCategory(array $expenses): array {\n    $totals = [];\n    foreach ($expenses as $e) {\n        $totals[$e->category] = ($totals[$e->category] ?? 0) + $e->amountPence;\n    }\n    arsort($totals);\n    return $totals;\n}\n\nfunction totalsByMonth(array $expenses): array {\n    $totals = [];\n    foreach ($expenses as $e) {\n        $month = $e->date->format('Y-m');\n        $totals[$month] = ($totals[$month] ?? 0) + $e->amountPence;\n    }\n    ksort($totals);\n    return $totals;\n}\n\nfunction summary(array $expenses, array $errors): array {\n    $total = array_sum(array_map(fn(Expense $e) => $e->amountPence, $expenses));\n    return [\n        'imported' => count($expenses),\n        'skipped' => count($errors),\n        'total_pence' => $total,\n        'by_category' => totalsByCategory($expenses),\n    ];\n}\n\n$csv = <<<CSV\ndate,category,amount,note\n2026-03-02,food,4.20,"Coffee, large"\n2026-03-02,travel,12.50,Train\n2026-02-30,food,3.00,Bad date\n2026-03-05,food,abc,Bad amount\n2026-03-09,travel,6.00\n2026-04-01,food,18.75,Groceries\nCSV;\n\n$result = importExpenses($csv);\necho json_encode(summary($result['expenses'], $result['errors']), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);`,
          tests: [
            { id: 1, label: "Returns the four summary keys", keywords: [{ pattern: "'imported'\\s*=>" }, { pattern: "'skipped'\\s*=>" }, { pattern: "'total_pence'\\s*=>" }, { pattern: "'by_category'\\s*=>" }] },
            { id: 2, label: "Sums the amounts in pence", keywords: [{ pattern: "amountPence" }] },
          ],
        },
      },
    ],
  },
];

export const PHP_PROJECTS_LESSONS = PHP_PROJECTS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PHP_PROJECTS_TOTAL_XP = PHP_PROJECTS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
