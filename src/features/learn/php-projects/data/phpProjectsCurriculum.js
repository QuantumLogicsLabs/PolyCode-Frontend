// PolyCode — PHP Projects capstone course
// 4 chapters · 16 lessons · server/browser PHP challenges
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
function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
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
            "Final lesson of the final course: combine the router, controller, validation, and middleware into one complete, working mini API — every piece from this chapter, wired together.",
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
