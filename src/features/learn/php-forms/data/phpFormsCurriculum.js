// PolyCode — PHP Forms interactive course
// 6 chapters · 18 lessons · server/browser PHP challenges
// We simulate incoming request data the same way PHP Fundamentals does:
// assigning directly into $_GET / $_POST / $_FILES at the top of the script,
// since there's no real HTTP server in the sandbox.

const ACCENT = "#f97316";

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

export const PHP_FORMS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Handling Form Data
  // ─────────────────────────────────────────────────────────────
  {
    id: "handling-form-data",
    title: "Handling Form Data",
    icon: "📝",
    color: "#06b6d4",
    lessons: [
      {
        id: "forms-0",
        title: "GET vs POST",
        xp: 15,
        theory: [
          text(
            "HTML forms submit data using one of two HTTP methods. `method=\"get\"` appends data to the URL (visible, bookmarkable, limited size) — `method=\"post\"` sends it in the request body (hidden, no size limit, used for logins/uploads).",
            {
              label: "A form's method attribute",
              content: `<form method="post" action="/submit.php">
    <input type="text" name="username">
    <button type="submit">Send</button>
</form>
<!-- On submit.php: $_POST['username'] holds the value -->`,
            },
          ),
          diagram("GET vs POST", [
            { id: "get", label: "GET", color: "#3b82f6", items: ["Data in the URL", "?search=cats", "Good for searches, links"] },
            { id: "post", label: "POST", color: ACCENT, items: ["Data in the request body", "Not shown in URL", "Good for logins, uploads, sensitive data"] },
          ]),
          quiz(
            "Which HTTP method should a login form use?",
            ["GET, so the URL is bookmarkable", "POST, so credentials aren't exposed in the URL", "Either one works the same", "PUT"],
            1,
            "POST keeps form data out of the URL and browser history — critical for passwords and other sensitive fields. GET is fine for non-sensitive things like search queries.",
          ),
        ],
        challenge: {
          title: "Simulate a POST Submission",
          description: "We'll simulate an incoming POST request. Assign `$_POST['username'] = 'ada';` then echo it.",
          starterCode: `${PHP_MAIN}\n// Simulate the POST and echo it`,
          solutionCode: `${PHP_MAIN}$_POST['username'] = 'ada';\necho $_POST['username'];`,
          tests: [
            { id: 1, label: "Assigns $_POST['username']", keywords: [{ pattern: "\\$_POST\\['username'\\]\\s*=\\s*'ada'" }] },
            { id: 2, label: "Echoes it", keywords: [{ pattern: "echo\\s*\\$_POST" }] },
          ],
        },
      },
      {
        id: "forms-1",
        title: "Reading Input Safely with isset()",
        xp: 20,
        theory: [
          text(
            "Reading a missing form field directly (`$_POST['email']`) triggers a warning if the key doesn't exist. Always check with `isset()` first, or use the null coalescing operator `??`.",
            {
              label: "Safe reads",
              content: `if (isset($_POST['email'])) {
    echo $_POST['email'];
} else {
    echo "No email submitted";
}

// Shorter, equivalent form:
echo $_POST['email'] ?? "No email submitted";`,
            },
          ),
          callout("warning", "Never assume a field is present just because your HTML form has it — the request could come from anywhere, not just your form."),
          quiz(
            "Why check isset($_POST['field']) before reading it?",
            ["It makes the script run faster", "Reading a missing array key triggers a warning; isset() avoids that safely", "isset() is required by PHP syntax", "It validates the data type"],
            1,
            "isset() returns false for a missing or null key without triggering a warning, letting you handle the missing-field case gracefully.",
          ),
        ],
        challenge: {
          title: "Handle a Missing Field",
          description: "$_POST is empty (no 'email' key). Use `??` to echo $_POST['email'] with a fallback of \"No email submitted\".",
          starterCode: `${PHP_MAIN}\n// $_POST is empty here\n// echo email with a fallback`,
          solutionCode: `${PHP_MAIN}echo $_POST['email'] ?? "No email submitted";`,
          tests: [
            { id: 1, label: "Uses ??", keywords: [{ pattern: "\\?\\?" }] },
            { id: 2, label: "Fallback text present", keywords: [{ pattern: "No email submitted" }] },
          ],
        },
      },
      {
        id: "forms-2",
        title: "The $_REQUEST Superglobal",
        xp: 15,
        theory: [
          text(
            "`$_REQUEST` merges `$_GET`, `$_POST`, and `$_COOKIE` into one array — convenient, but it makes it unclear where data actually came from. Prefer `$_GET`/`$_POST` explicitly in real applications.",
            {
              label: "$_REQUEST merges everything",
              content: `$_GET['a'] = 1;
$_POST['b'] = 2;

echo $_REQUEST['a']; // 1 — from $_GET
echo $_REQUEST['b']; // 2 — from $_POST`,
            },
          ),
          quiz(
            "Why is $_POST/$_GET usually preferred over $_REQUEST in production code?",
            [
              "$_REQUEST is deprecated and removed in PHP 8",
              "$_REQUEST doesn't reveal which method (GET/POST/COOKIE) the data actually came from, which matters for security decisions",
              "$_REQUEST is slower",
              "$_REQUEST can only hold strings",
            ],
            1,
            "Being explicit about $_GET vs $_POST makes it clear whether data is a bookmarkable query param or should have come from a POST-only form — important context for validating and trusting the data correctly.",
          ),
        ],
        challenge: {
          title: "Merge GET and POST",
          description: "Assign `$_GET['a'] = 1;` and `$_POST['b'] = 2;`, then echo `$_REQUEST['a']` and `$_REQUEST['b']` separated by a comma.",
          starterCode: `${PHP_MAIN}\n// Assign both, then echo $_REQUEST['a'] . "," . $_REQUEST['b']`,
          solutionCode: `${PHP_MAIN}$_GET['a'] = 1;\n$_POST['b'] = 2;\necho $_REQUEST['a'] . "," . $_REQUEST['b'];`,
          tests: [
            { id: 1, label: "Reads via $_REQUEST", keywords: [{ pattern: "\\$_REQUEST" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Validation & Sanitization
  // ─────────────────────────────────────────────────────────────
  {
    id: "validation-sanitization",
    title: "Validation & Sanitization",
    icon: "🛡️",
    color: "#3b82f6",
    lessons: [
      {
        id: "forms-3",
        title: "Validating Required Fields",
        xp: 20,
        theory: [
          text(
            "Before processing a form, check that required fields exist AND aren't just empty strings. `empty()` catches both missing keys and blank values in one check.",
            {
              label: "Checking required fields",
              content: `$errors = [];
if (empty($_POST['name'])) {
    $errors[] = "Name is required";
}
if (empty($_POST['email'])) {
    $errors[] = "Email is required";
}

if (empty($errors)) {
    echo "Form is valid!";
} else {
    echo implode(", ", $errors);
}`,
            },
          ),
          quiz(
            "What does empty($_POST['name']) return if $_POST['name'] is an empty string \"\"?",
            ["false", "true", "null", "It throws an error"],
            1,
            "empty() returns true for missing keys, null, empty strings, and other 'falsy' values — exactly what you want when checking a required field was actually filled in.",
          ),
        ],
        challenge: {
          title: "Collect Validation Errors",
          description: "$_POST['name'] is set to \"Amy\" but $_POST['email'] is not set. Build an $errors array checking both fields, then echo them joined by \", \".",
          starterCode: `${PHP_MAIN}$_POST['name'] = 'Amy';\n\n$errors = [];\n// check name and email, add messages to $errors\n\necho implode(", ", $errors);`,
          solutionCode: `${PHP_MAIN}$_POST['name'] = 'Amy';\n\n$errors = [];\nif (empty($_POST['name'])) {\n    $errors[] = "Name is required";\n}\nif (empty($_POST['email'])) {\n    $errors[] = "Email is required";\n}\n\necho implode(", ", $errors);`,
          tests: [
            { id: 1, label: "Uses empty() to validate", hint: "empty($_POST['name'])", keywords: [{ pattern: "empty\\s*\\(" }] },
            { id: 2, label: "Collects into $errors", keywords: [{ pattern: "\\$errors\\[\\]" }] },
          ],
        },
      },
      {
        id: "forms-4",
        title: "Validating with filter_var()",
        xp: 25,
        theory: [
          text(
            "PHP's built-in `filter_var()` validates common formats — emails, URLs, integers — without writing your own regex. It returns the value if valid, or `false` if not.",
            {
              label: "filter_var for email validation",
              content: `$email = "not-an-email";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Valid email";
} else {
    echo "Invalid email";
}

// Also works for integers, URLs, floats, etc.
$age = filter_var("25", FILTER_VALIDATE_INT); // 25
$bad = filter_var("abc", FILTER_VALIDATE_INT); // false`,
            },
          ),
          quiz(
            "What does filter_var($value, FILTER_VALIDATE_EMAIL) return for an invalid email?",
            ["An empty string", "null", "false", "Throws an exception"],
            2,
            "filter_var() returns false when validation fails, letting you check the result directly in an if statement.",
          ),
        ],
        challenge: {
          title: "Validate an Email Field",
          description: "$_POST['email'] is set to \"not-an-email\". Use filter_var with FILTER_VALIDATE_EMAIL to check it, and echo \"Valid\" or \"Invalid\".",
          starterCode: `${PHP_MAIN}$_POST['email'] = 'not-an-email';\n\n// validate and echo "Valid" or "Invalid"`,
          solutionCode: `${PHP_MAIN}$_POST['email'] = 'not-an-email';\n\nif (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {\n    echo "Valid";\n} else {\n    echo "Invalid";\n}`,
          tests: [
            { id: 1, label: "Uses filter_var with FILTER_VALIDATE_EMAIL", keywords: [{ pattern: "FILTER_VALIDATE_EMAIL" }] },
          ],
        },
      },
      {
        id: "forms-5",
        title: "Sanitizing Output",
        xp: 20,
        theory: [
          text(
            "If you ever echo user input back into HTML, you must escape it with `htmlspecialchars()` — otherwise a malicious `<script>` tag in a form field becomes real, executable HTML (a **Cross-Site Scripting / XSS** attack).",
            {
              label: "Escaping before output",
              content: `$comment = "<script>alert('hacked')</script>";

// DANGEROUS — the script tag actually runs in the browser:
echo $comment;

// SAFE — special characters are escaped to harmless text:
echo htmlspecialchars($comment);
// Outputs: &lt;script&gt;alert('hacked')&lt;/script&gt;`,
            },
          ),
          callout("warning", "This is one of the most common real-world web vulnerabilities. Any time user input reaches HTML output, escape it with htmlspecialchars()."),
          quiz(
            "What attack does htmlspecialchars() protect against when echoing user input?",
            ["SQL injection", "Cross-Site Scripting (XSS)", "CSRF", "Denial of Service"],
            1,
            "htmlspecialchars() converts characters like < and > into HTML entities so injected <script> tags render as harmless text instead of executing — preventing XSS.",
          ),
        ],
        challenge: {
          title: "Escape Before Echoing",
          description: "$_POST['comment'] contains a script tag. Echo it safely using htmlspecialchars().",
          starterCode: `${PHP_MAIN}$_POST['comment'] = "<b>hi</b>";\n\n// echo it safely`,
          solutionCode: `${PHP_MAIN}$_POST['comment'] = "<b>hi</b>";\n\necho htmlspecialchars($_POST['comment']);`,
          tests: [
            { id: 1, label: "Uses htmlspecialchars", keywords: [{ pattern: "htmlspecialchars\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — File Uploads
  // ─────────────────────────────────────────────────────────────
  {
    id: "file-uploads",
    title: "File Uploads",
    icon: "📤",
    color: "#f59e0b",
    lessons: [
      {
        id: "forms-6",
        title: "The $_FILES Superglobal",
        xp: 20,
        theory: [
          text(
            "When a form has `enctype=\"multipart/form-data\"` and a `<input type=\"file\">`, uploaded file info lands in `$_FILES` — an array with the field name, temp path, size, and any upload error code.",
            {
              label: "Structure of $_FILES",
              content: `<form method="post" enctype="multipart/form-data">
    <input type="file" name="avatar">
</form>

// On the server:
$_FILES['avatar'] = [
    'name'     => 'photo.jpg',
    'type'     => 'image/jpeg',
    'tmp_name' => '/tmp/phpXXXXXX',
    'error'    => 0,   // 0 means success
    'size'     => 204800,
];`,
            },
          ),
          quiz(
            "What does an 'error' value of 0 in $_FILES mean?",
            ["The upload failed", "The upload succeeded with no errors", "The file is empty", "The file type is invalid"],
            1,
            "PHP's UPLOAD_ERR_OK constant is 0 — meaning the file uploaded without any error. Any nonzero value indicates a specific failure (too large, partial upload, etc.).",
          ),
        ],
        challenge: {
          title: "Read Upload Info",
          description: "Simulate an upload by assigning $_FILES['avatar'] with name \"photo.jpg\", error 0. Echo \"OK: photo.jpg\" if error is 0.",
          starterCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'name' => 'photo.jpg',\n    'error' => 0,\n];\n\n// check error === 0, echo "OK: <name>"`,
          solutionCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'name' => 'photo.jpg',\n    'error' => 0,\n];\n\nif ($_FILES['avatar']['error'] === 0) {\n    echo "OK: " . $_FILES['avatar']['name'];\n}`,
          tests: [
            { id: 1, label: "Checks the error field", keywords: [{ pattern: "\\$_FILES\\['avatar'\\]\\['error'\\]" }] },
          ],
        },
      },
      {
        id: "forms-7",
        title: "Validating Type & Size",
        xp: 25,
        theory: [
          text(
            "Never trust `$_FILES['file']['type']` alone — it's client-supplied and easy to fake. Always also check the file **size** against a limit, and ideally verify the actual content type server-side.",
            {
              label: "Validating an upload",
              content: `$file = $_FILES['avatar'];
$maxSize = 2 * 1024 * 1024; // 2MB
$allowedTypes = ['image/jpeg', 'image/png'];

if ($file['size'] > $maxSize) {
    echo "File too large";
} elseif (!in_array($file['type'], $allowedTypes)) {
    echo "Invalid file type";
} else {
    echo "File accepted";
}`,
            },
          ),
          quiz(
            "Why shouldn't you fully trust $_FILES['file']['type']?",
            [
              "It's always empty",
              "It's supplied by the client's browser and can be spoofed by an attacker",
              "PHP doesn't support checking file type",
              "It's only available for images",
            ],
            1,
            "The 'type' field comes from the upload request itself, which a malicious user can manipulate — real applications should verify content server-side (e.g. checking file signatures) for anything security-sensitive.",
          ),
        ],
        challenge: {
          title: "Validate Size and Type",
          description: "$_FILES['avatar'] has size 3000000 (3MB) and type 'image/png'. Max allowed size is 2MB (2*1024*1024). Echo \"File too large\", \"Invalid file type\", or \"File accepted\".",
          starterCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'size' => 3000000,\n    'type' => 'image/png',\n];\n$maxSize = 2 * 1024 * 1024;\n$allowedTypes = ['image/jpeg', 'image/png'];\n\n// validate and echo the right message`,
          solutionCode: `${PHP_MAIN}$_FILES['avatar'] = [\n    'size' => 3000000,\n    'type' => 'image/png',\n];\n$maxSize = 2 * 1024 * 1024;\n$allowedTypes = ['image/jpeg', 'image/png'];\n\nif ($_FILES['avatar']['size'] > $maxSize) {\n    echo "File too large";\n} elseif (!in_array($_FILES['avatar']['type'], $allowedTypes)) {\n    echo "Invalid file type";\n} else {\n    echo "File accepted";\n}`,
          tests: [
            { id: 1, label: "Checks size against maxSize", keywords: [{ pattern: "\\$maxSize" }] },
            { id: 2, label: "Checks type via in_array", keywords: [{ pattern: "in_array" }] },
          ],
        },
      },
      {
        id: "forms-8",
        title: "Storing the Uploaded File",
        xp: 20,
        theory: [
          text(
            "Once validated, `move_uploaded_file()` moves the file from PHP's temporary location to a permanent path. It's the only safe way to relocate an uploaded file — it also verifies the file really came from an upload.",
            {
              label: "Moving the file",
              content: `$destination = "uploads/" . basename($_FILES['avatar']['name']);

if (move_uploaded_file($_FILES['avatar']['tmp_name'], $destination)) {
    echo "Saved to $destination";
} else {
    echo "Upload failed";
}`,
            },
          ),
          callout("info", "basename() strips any directory info from the filename, preventing a malicious filename like '../../etc/passwd' from writing outside the intended folder."),
          quiz(
            "Why use basename() on the uploaded filename before building the destination path?",
            [
              "It's required by move_uploaded_file()",
              "It prevents a crafted filename containing '../' from writing files outside the intended upload folder",
              "It converts the filename to lowercase",
              "It removes the file extension",
            ],
            1,
            "A malicious filename like '../../config.php' could overwrite arbitrary files if used directly. basename() strips any path components, leaving just the safe filename.",
          ),
        ],
        challenge: {
          title: "Build a Safe Destination Path",
          description: "Given $_FILES['avatar']['name'] = \"../../evil.php\", build a safe destination path \"uploads/\" + basename(name), then echo it.",
          starterCode: `${PHP_MAIN}$_FILES['avatar'] = ['name' => '../../evil.php'];\n\n// build and echo the safe destination path`,
          solutionCode: `${PHP_MAIN}$_FILES['avatar'] = ['name' => '../../evil.php'];\n\n$destination = "uploads/" . basename($_FILES['avatar']['name']);\necho $destination;`,
          tests: [
            { id: 1, label: "Uses basename()", keywords: [{ pattern: "basename\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — CSRF Protection & Best Practices
  // ─────────────────────────────────────────────────────────────
  {
    id: "csrf-best-practices",
    title: "CSRF Protection & Best Practices",
    icon: "🔒",
    color: "#8b5cf6",
    lessons: [
      {
        id: "forms-9",
        title: "Understanding CSRF Attacks",
        xp: 20,
        theory: [
          text(
            "**Cross-Site Request Forgery (CSRF)** tricks a logged-in user's browser into submitting a request to your site from a different, malicious site — since cookies are sent automatically, the request looks legitimate.",
            {
              label: "The attack shape",
              content: `<!-- On evil-site.com, while you're logged into bank.com: -->
<form action="https://bank.com/transfer" method="post">
    <input type="hidden" name="amount" value="1000">
    <input type="hidden" name="to" value="attacker">
</form>
<script>document.forms[0].submit();</script>
<!-- Your browser sends your bank.com cookies automatically! -->`,
            },
          ),
          quiz(
            "Why does a CSRF attack succeed even though the request comes from a different website?",
            [
              "The attacker knows your password",
              "Browsers automatically attach cookies (including session cookies) to requests, regardless of which site initiated them",
              "CSRF only works if you're logged out",
              "It exploits a bug in PHP itself",
            ],
            1,
            "Cookies are sent based on the destination domain, not the origin page — so a form on any website can trigger an authenticated request to your site as long as your browser holds a valid session cookie for it.",
          ),
        ],
        challenge: {
          title: "Spot the Vulnerable Endpoint",
          description: "A transfer endpoint only checks if the user is logged in, not where the request came from. Assign $vulnerable = true; if it lacks a CSRF token check, then echo the result.",
          starterCode: `${PHP_MAIN}$hasCSRFCheck = false;\n\n// set $vulnerable based on whether hasCSRFCheck is false, echo it as "true" or "false"`,
          solutionCode: `${PHP_MAIN}$hasCSRFCheck = false;\n\n$vulnerable = !$hasCSRFCheck;\necho $vulnerable ? "true" : "false";`,
          tests: [
            { id: 1, label: "Derives vulnerability from hasCSRFCheck", keywords: [{ pattern: "\\$hasCSRFCheck" }] },
          ],
        },
      },
      {
        id: "forms-10",
        title: "CSRF Tokens",
        xp: 25,
        theory: [
          text(
            "The fix: generate a random, secret **CSRF token**, embed it as a hidden field in your form, and verify it matches on submission. An attacker's external form can't know this token.",
            {
              label: "Generating and checking a token",
              content: `// When rendering the form:
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
// <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">

// When processing the submission:
if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'] ?? '')) {
    die("Invalid CSRF token");
}`,
            },
          ),
          callout("info", "hash_equals() compares strings in constant time, preventing timing attacks that could be used to guess the token character by character."),
          quiz(
            "Why use hash_equals() instead of == to compare the CSRF token?",
            [
              "== doesn't work on strings",
              "hash_equals() runs in constant time, preventing timing-attack-based guessing of the correct token",
              "hash_equals() is faster",
              "There's no real difference",
            ],
            1,
            "A naive == comparison can leak timing information about how many leading characters match, letting an attacker guess the token byte by byte. hash_equals() avoids this by taking the same amount of time regardless of where a mismatch occurs.",
          ),
        ],
        challenge: {
          title: "Verify a CSRF Token",
          description: "Session token is \"abc123\", submitted token is \"abc123\". Use hash_equals() to check them match and echo \"Valid\" or \"Invalid\".",
          starterCode: `${PHP_MAIN}$sessionToken = "abc123";\n$submittedToken = "abc123";\n\n// compare with hash_equals, echo "Valid" or "Invalid"`,
          solutionCode: `${PHP_MAIN}$sessionToken = "abc123";\n$submittedToken = "abc123";\n\nif (hash_equals($sessionToken, $submittedToken)) {\n    echo "Valid";\n} else {\n    echo "Invalid";\n}`,
          tests: [
            { id: 1, label: "Uses hash_equals()", keywords: [{ pattern: "hash_equals\\s*\\(" }] },
          ],
        },
      },
      {
        id: "forms-11",
        title: "Putting It Together: A Safe Contact Form",
        xp: 30,
        theory: [
          text(
            "Chapter capstone: combine everything from the first four chapters into one handler — validate required fields, sanitize output, and only proceed if the CSRF token matches.",
            {
              label: "A complete, safe handler shape",
              content: `if (!hash_equals($sessionToken, $_POST['csrf_token'] ?? '')) {
    die("Invalid CSRF token");
}
if (empty($_POST['name']) || empty($_POST['message'])) {
    die("Missing required fields");
}
$safeName = htmlspecialchars($_POST['name']);
$safeMessage = htmlspecialchars($_POST['message']);
echo "Thanks, $safeName! Message received.";`,
            },
          ),
          quiz(
            "In what order should these checks generally happen: CSRF check, required-field validation, sanitization?",
            [
              "Sanitize, then validate, then CSRF",
              "CSRF check first, then required-field validation, then sanitize before using the data",
              "Order doesn't matter at all",
              "Validation must always come before CSRF",
            ],
            1,
            "Reject forged requests (CSRF) before doing any other work, then confirm the data is actually present (validation), and finally sanitize it right before it's used or displayed.",
          ),
        ],
        challenge: {
          title: "Build the Full Handler",
          description: "Given sessionToken=\"tok1\", $_POST with csrf_token=\"tok1\", name=\"Amy\", message=\"Hello\": verify the CSRF token, validate name and message aren't empty, then echo \"Thanks, Amy! Message received.\" using the sanitized name.",
          starterCode: `${PHP_MAIN}$sessionToken = "tok1";\n$_POST['csrf_token'] = "tok1";\n$_POST['name'] = "Amy";\n$_POST['message'] = "Hello";\n\n// verify CSRF, validate fields, echo the thank-you message`,
          solutionCode: `${PHP_MAIN}$sessionToken = "tok1";\n$_POST['csrf_token'] = "tok1";\n$_POST['name'] = "Amy";\n$_POST['message'] = "Hello";\n\nif (!hash_equals($sessionToken, $_POST['csrf_token'] ?? '')) {\n    die("Invalid CSRF token");\n}\nif (empty($_POST['name']) || empty($_POST['message'])) {\n    die("Missing required fields");\n}\n$safeName = htmlspecialchars($_POST['name']);\necho "Thanks, $safeName! Message received.";`,
          tests: [
            { id: 1, label: "Checks CSRF with hash_equals", keywords: [{ pattern: "hash_equals" }] },
            { id: 2, label: "Validates required fields", keywords: [{ pattern: "empty\\s*\\(" }] },
            { id: 3, label: "Sanitizes before output", keywords: [{ pattern: "htmlspecialchars" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Complex Inputs
  // ─────────────────────────────────────────────────────────────
  {
    id: "complex-inputs",
    title: "Complex Inputs",
    icon: "☑️",
    color: "#10b981",
    lessons: [
      {
        id: "forms-12",
        title: "Array Inputs with name=\"field[]\"",
        xp: 20,
        theory: [
          text(
            "Ending an input's name with `[]` tells PHP to collect every value with that name into an **array**. It's how you receive a list of tags, several phone numbers, or all ticked checkboxes. You can also use explicit keys, like `name=\"address[city]\"`, to receive a nested associative array.",
            {
              label: "Receiving lists and nested fields",
              content: `// <input name="tags[]" value="php">
// <input name="tags[]" value="forms">
// <input name="address[city]" value="Leeds">
$_POST['tags'] = ['php', 'forms'];
$_POST['address'] = ['city' => 'Leeds'];

foreach ($_POST['tags'] as $tag) {
    echo htmlspecialchars($tag) . "\\n";
}
echo $_POST['address']['city']; // Leeds`,
            },
          ),
          callout("warning", "Never assume the value is an array just because your HTML says tags[]. A crafted request can send tags=hello instead — check is_array() before looping."),
          quiz(
            "A form has three inputs all named skills[]. What does $_POST['skills'] contain after submission?",
            [
              "Only the last value",
              "An array holding all three values",
              "A comma-separated string",
              "Only the first value",
            ],
            1,
            "The [] suffix makes PHP append each submitted value to an array, so $_POST['skills'] is an indexed array with one entry per input.",
          ),
        ],
        challenge: {
          title: "Process a List of Skills",
          description: "$_POST['skills'] holds an array. If it really is an array, echo the count and then the skills joined by \", \" (for example \"3: php, sql, css\"); otherwise echo \"No skills\".",
          starterCode: `${PHP_MAIN}$_POST['skills'] = ['php', 'sql', 'css'];\n\n// check is_array(), then echo "<count>: <skills joined by , >"`,
          solutionCode: `${PHP_MAIN}$_POST['skills'] = ['php', 'sql', 'css'];\n\nif (isset($_POST['skills']) && is_array($_POST['skills'])) {\n    echo count($_POST['skills']) . ": " . implode(", ", $_POST['skills']);\n} else {\n    echo "No skills";\n}`,
          tests: [
            { id: 1, label: "Guards with is_array()", keywords: [{ pattern: "is_array\\s*\\(\\s*\\$_POST\\['skills'\\]" }] },
            { id: 2, label: "Joins the skills with implode", keywords: [{ pattern: "implode\\s*\\(" }] },
          ],
        },
      },
      {
        id: "forms-13",
        title: "Checkboxes, Radios & Selects",
        xp: 25,
        theory: [
          text(
            "Choice inputs have two quirks. An **unchecked checkbox is not sent at all**, so you test it with `isset()` rather than reading its value. And although a radio group or `<select>` only *offers* fixed options, the request can contain anything — so compare the submitted value against an **allow-list** with `in_array(..., true)` before trusting it.",
            {
              label: "Reading choice inputs safely",
              content: `$_POST['plan'] = 'pro';
// newsletter checkbox left unticked, so it's absent from $_POST

$allowedPlans = ['free', 'pro', 'team'];
$plan = in_array($_POST['plan'] ?? '', $allowedPlans, true)
    ? $_POST['plan']
    : 'free';

$wantsNewsletter = isset($_POST['newsletter']);

echo $plan;                            // pro
echo $wantsNewsletter ? " yes" : " no"; // no`,
            },
          ),
          diagram("Choice inputs", [
            { id: "checkbox", label: "Checkbox", color: "#10b981", items: ["Sent only when ticked", "Test with isset()"] },
            { id: "radio", label: "Radio / Select", color: "#3b82f6", items: ["One value sent", "Check against an allow-list"] },
          ]),
          quiz(
            "Why pass true as the third argument to in_array() when checking an allowed value?",
            [
              "It makes the search case-insensitive",
              "It uses strict comparison, so type juggling can't make an unexpected value match",
              "It returns the matching key instead of a boolean",
              "It is required for string arrays",
            ],
            1,
            "Strict mode compares with ===. Without it, loose comparison can make surprising values match an allow-list entry — strict matching only accepts the exact values you listed.",
          ),
        ],
        challenge: {
          title: "Validate a Size Choice",
          description: "Allowed sizes are S, M and L. Use in_array() in strict mode to accept $_POST['size'] or fall back to \"M\", then use isset() to read the gift-wrap checkbox. Echo \"<size>, gift wrap: yes|no\".",
          starterCode: `${PHP_MAIN}$_POST['size'] = 'XXL';\n// the giftwrap checkbox was not ticked\n\n$allowedSizes = ['S', 'M', 'L'];\n// pick the size (fallback "M") and detect the checkbox`,
          solutionCode: `${PHP_MAIN}$_POST['size'] = 'XXL';\n// the giftwrap checkbox was not ticked\n\n$allowedSizes = ['S', 'M', 'L'];\n$size = in_array($_POST['size'] ?? '', $allowedSizes, true) ? $_POST['size'] : 'M';\n$giftWrap = isset($_POST['giftwrap']);\n\necho "$size, gift wrap: " . ($giftWrap ? "yes" : "no");`,
          tests: [
            { id: 1, label: "Uses strict in_array()", keywords: [{ pattern: "in_array\\s*\\([^;]*,\\s*true\\s*\\)" }] },
            { id: 2, label: "Detects the checkbox with isset()", keywords: [{ pattern: "isset\\s*\\(\\s*\\$_POST\\['giftwrap'\\]" }] },
          ],
        },
      },
      {
        id: "forms-14",
        title: "Multiple File Uploads & Error Codes",
        xp: 25,
        theory: [
          text(
            "With `<input type=\"file\" name=\"photos[]\" multiple>`, `$_FILES['photos']` is organised **by attribute, not by file**: `name`, `size`, `error` and `tmp_name` are each an array, and index `0` in each belongs to the first file. Loop over one of them and use the same index for the rest. Each `error` value is one of PHP's `UPLOAD_ERR_*` constants.",
            {
              label: "Walking a multi-file upload",
              content: `$_FILES['photos'] = [
    'name'  => ['beach.jpg', 'huge.png'],
    'size'  => [120000, 0],
    'error' => [UPLOAD_ERR_OK, UPLOAD_ERR_INI_SIZE],
];

foreach ($_FILES['photos']['name'] as $i => $name) {
    $error = $_FILES['photos']['error'][$i];
    echo match ($error) {
        UPLOAD_ERR_OK       => "$name: ok",
        UPLOAD_ERR_INI_SIZE,
        UPLOAD_ERR_FORM_SIZE => "$name: too large",
        UPLOAD_ERR_NO_FILE  => "no file chosen",
        default             => "$name: upload failed",
    } . "\\n";
}`,
            },
          ),
          callout("info", "UPLOAD_ERR_OK is 0, UPLOAD_ERR_INI_SIZE is 1 (over upload_max_filesize), UPLOAD_ERR_FORM_SIZE is 2, UPLOAD_ERR_PARTIAL is 3 and UPLOAD_ERR_NO_FILE is 4. Compare against the constants, not the numbers."),
          quiz(
            "In a multi-file upload, where is the error code for the second file?",
            [
              "$_FILES['photos'][1]['error']",
              "$_FILES['photos']['error'][1]",
              "$_FILES['photos']['error']",
              "$_FILES[1]['photos']['error']",
            ],
            1,
            "PHP groups multi-file uploads by attribute first, so the error array is $_FILES['photos']['error'] and the second file's code is at index 1.",
          ),
        ],
        challenge: {
          title: "Report on Each Upload",
          description: "Loop over $_FILES['docs']['name'] and, using the same index into ['error'], echo \"<name>: ok\" for UPLOAD_ERR_OK or \"<name>: failed\" otherwise, one per line.",
          starterCode: `${PHP_MAIN}$_FILES['docs'] = [\n    'name'  => ['cv.pdf', 'letter.pdf'],\n    'error' => [UPLOAD_ERR_OK, UPLOAD_ERR_PARTIAL],\n];\n\n// loop with the index, echo one status line per file`,
          solutionCode: `${PHP_MAIN}$_FILES['docs'] = [\n    'name'  => ['cv.pdf', 'letter.pdf'],\n    'error' => [UPLOAD_ERR_OK, UPLOAD_ERR_PARTIAL],\n];\n\nforeach ($_FILES['docs']['name'] as $i => $name) {\n    $status = $_FILES['docs']['error'][$i] === UPLOAD_ERR_OK ? "ok" : "failed";\n    echo "$name: $status\\n";\n}`,
          tests: [
            { id: 1, label: "Loops with an index", keywords: [{ pattern: "foreach\\s*\\(\\s*\\$_FILES\\['docs'\\]\\['name'\\]\\s+as\\s+\\$\\w+\\s*=>" }] },
            { id: 2, label: "Compares against UPLOAD_ERR_OK", keywords: [{ pattern: "UPLOAD_ERR_OK" }] },
            { id: 3, label: "Reads the error at the same index", keywords: [{ pattern: "\\['error'\\]\\[\\$\\w+\\]" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Form Workflow Patterns
  // ─────────────────────────────────────────────────────────────
  {
    id: "form-workflow-patterns",
    title: "Form Workflow Patterns",
    icon: "🔁",
    color: "#ec4899",
    lessons: [
      {
        id: "forms-15",
        title: "Sticky Forms: Re-populating Fields",
        xp: 20,
        theory: [
          text(
            "When validation fails, nobody wants to retype the whole form. A **sticky form** writes the submitted values back into each field's `value` attribute (and re-ticks checkboxes with `checked`). Because this echoes user input into HTML, it must be escaped with `htmlspecialchars()`, which also turns quotes into entities so a value can't break out of the attribute.",
            {
              label: "Echoing submitted values back",
              content: `$_POST['name'] = 'Amy "The Coder"';
$_POST['terms'] = 'on';

$name = $_POST['name'] ?? '';
$terms = isset($_POST['terms']);
?>
<input type="text" name="name" value="<?= htmlspecialchars($name, ENT_QUOTES) ?>">
<input type="checkbox" name="terms" <?= $terms ? 'checked' : '' ?>>`,
            },
          ),
          callout("info", "Since PHP 8.1, htmlspecialchars() escapes both single and double quotes by default. Passing ENT_QUOTES explicitly keeps the intent obvious and stays safe on older versions."),
          quiz(
            "Why must a sticky form escape the value it writes into value=\"...\"?",
            [
              "Browsers refuse to display unescaped values",
              "A value containing a quote could close the attribute and inject new HTML or script",
              "It makes the form submit faster",
              "Escaping is only needed for passwords",
            ],
            1,
            "Echoing raw input into an attribute is an XSS hole: a value like \"><script>... ends the attribute and injects markup. htmlspecialchars() turns the quote into &quot; so it stays inside the value.",
          ),
        ],
        challenge: {
          title: "Re-fill the Email Field",
          description: "Read $_POST['email'] with a \"\" fallback and echo an input tag whose value is escaped with htmlspecialchars($email, ENT_QUOTES): <input name=\"email\" value=\"...\">.",
          starterCode: `${PHP_MAIN}$_POST['email'] = 'amy"@example.com';\n\n// echo <input name="email" value="..."> with the value escaped`,
          solutionCode: `${PHP_MAIN}$_POST['email'] = 'amy"@example.com';\n\n$email = $_POST['email'] ?? '';\necho '<input name="email" value="' . htmlspecialchars($email, ENT_QUOTES) . '">';`,
          tests: [
            { id: 1, label: "Reads the field with a fallback", keywords: [{ pattern: "\\$_POST\\['email'\\]\\s*\\?\\?" }] },
            { id: 2, label: "Escapes with ENT_QUOTES", keywords: [{ pattern: "htmlspecialchars\\s*\\(\\s*\\$email\\s*,\\s*ENT_QUOTES" }] },
          ],
        },
      },
      {
        id: "forms-16",
        title: "Reusable Validation Rules",
        xp: 25,
        theory: [
          text(
            "Hand-written `if` blocks for every field get repetitive. A common pattern is a small `validate()` function that takes the input and a list of rules per field and returns an **errors array keyed by field name** — so the form can show each message beside the right input. `filter_var()` accepts an `options` array for range checks, and `preg_match()` covers custom formats.",
            {
              label: "A rule-driven validator",
              content: `function validate(array $data): array {
    $errors = [];

    if (trim($data['username'] ?? '') === '') {
        $errors['username'] = 'Username is required';
    } elseif (!preg_match('/^[a-z0-9_]{3,16}$/', $data['username'])) {
        $errors['username'] = 'Use 3-16 lowercase letters, digits or _';
    }

    $age = filter_var($data['age'] ?? null, FILTER_VALIDATE_INT, [
        'options' => ['min_range' => 13, 'max_range' => 120],
    ]);
    if ($age === false) {
        $errors['age'] = 'Age must be a whole number from 13 to 120';
    }

    return $errors;
}

print_r(validate(['username' => 'Amy!', 'age' => '9']));`,
            },
          ),
          quiz(
            "Why return errors keyed by field name (['age' => '...']) rather than a plain list?",
            [
              "PHP arrays can't hold plain lists of strings",
              "The form can display each message next to the field it belongs to",
              "Keyed arrays are always sorted",
              "It makes validation faster",
            ],
            1,
            "With keys like 'username' and 'age', the template can check isset($errors['age']) and print that message under the age input — much clearer for the user than one list at the top.",
          ),
        ],
        challenge: {
          title: "Validate a Quantity Field",
          description: "Complete validate(): use filter_var() with FILTER_VALIDATE_INT and options min_range 1 / max_range 10 on $data['qty']; on failure set $errors['qty'] = \"Choose 1 to 10\". Echo the errors as \"field: message\" lines.",
          starterCode: `${PHP_MAIN}function validate(array $data): array {\n    $errors = [];\n    // validate qty as an int between 1 and 10\n\n    return $errors;\n}\n\n$errors = validate(['qty' => '25']);\nforeach ($errors as $field => $message) {\n    echo "$field: $message\\n";\n}`,
          solutionCode: `${PHP_MAIN}function validate(array $data): array {\n    $errors = [];\n    $qty = filter_var($data['qty'] ?? null, FILTER_VALIDATE_INT, [\n        'options' => ['min_range' => 1, 'max_range' => 10],\n    ]);\n    if ($qty === false) {\n        $errors['qty'] = "Choose 1 to 10";\n    }\n    return $errors;\n}\n\n$errors = validate(['qty' => '25']);\nforeach ($errors as $field => $message) {\n    echo "$field: $message\\n";\n}`,
          tests: [
            { id: 1, label: "Uses FILTER_VALIDATE_INT", keywords: [{ pattern: "FILTER_VALIDATE_INT" }] },
            { id: 2, label: "Sets min_range and max_range", keywords: [{ pattern: "'min_range'\\s*=>\\s*1" }, { pattern: "'max_range'\\s*=>\\s*10" }] },
            { id: 3, label: "Keys the error by field", keywords: [{ pattern: "\\$errors\\['qty'\\]\\s*=" }] },
          ],
        },
      },
      {
        id: "forms-17",
        title: "Post/Redirect/Get",
        xp: 25,
        theory: [
          text(
            "If a POST handler echoes a success page directly, pressing **refresh** re-submits the form — a second order, a duplicate comment. The **Post/Redirect/Get** pattern fixes this: after a successful POST, send a redirect (`303 See Other`) to a normal GET page and stop. Refreshing then only repeats the harmless GET. On validation failure you don't redirect — you re-show the sticky form with its errors.",
            {
              label: "Redirect after a successful POST",
              content: `function handle(string $method, array $post): string {
    if ($method !== 'POST') {
        return 'show form';
    }
    if (empty($post['comment'])) {
        return 'show form with errors'; // no redirect on failure
    }
    // ...save the comment...
    return 'redirect: /comments?saved=1';
}

echo handle('POST', ['comment' => 'Nice post!']);

// In a real request the success branch ends with:
// header('Location: /comments?saved=1', true, 303);
// exit;`,
            },
          ),
          diagram("Post/Redirect/Get", [
            { id: "post", label: "POST", color: "#f59e0b", items: ["Validate and save", "Send 303 redirect"] },
            { id: "redirect", label: "Redirect", color: "#ec4899", items: ["Browser follows Location", "No body to resubmit"] },
            { id: "get", label: "GET", color: "#10b981", items: ["Show the result page", "Safe to refresh"] },
          ]),
          callout("warning", "Always call exit after header('Location: ...'). The header only asks the browser to leave — without exit, the rest of your script keeps running."),
          quiz(
            "What problem does Post/Redirect/Get solve?",
            [
              "It makes forms submit without JavaScript",
              "Refreshing the page after a successful submission no longer re-sends the POST",
              "It encrypts form data",
              "It removes the need for validation",
            ],
            1,
            "After the redirect the browser is showing a GET page, so refresh repeats that GET instead of re-posting the form — no duplicate orders or comments.",
          ),
        ],
        challenge: {
          title: "Decide Where to Go",
          description: "Complete nextStep(): for a non-POST request return \"show form\"; for a POST with an empty 'title' return \"show errors\"; otherwise return \"redirect: /posts\". Echo the result for each of the three calls, one per line.",
          starterCode: `${PHP_MAIN}function nextStep(string $method, array $post): string {\n    // GET -> "show form", invalid POST -> "show errors", valid POST -> "redirect: /posts"\n\n}\n\necho nextStep('GET', []) . "\\n";\necho nextStep('POST', ['title' => '']) . "\\n";\necho nextStep('POST', ['title' => 'Hello']) . "\\n";`,
          solutionCode: `${PHP_MAIN}function nextStep(string $method, array $post): string {\n    if ($method !== 'POST') {\n        return "show form";\n    }\n    if (empty($post['title'])) {\n        return "show errors";\n    }\n    return "redirect: /posts";\n}\n\necho nextStep('GET', []) . "\\n";\necho nextStep('POST', ['title' => '']) . "\\n";\necho nextStep('POST', ['title' => 'Hello']) . "\\n";`,
          tests: [
            { id: 1, label: "Checks the request method", keywords: [{ pattern: "\\$method\\s*!==?\\s*'POST'|'POST'\\s*!==?\\s*\\$method|\\$method\\s*===?\\s*'POST'" }] },
            { id: 2, label: "Validates the title with empty()", keywords: [{ pattern: "empty\\s*\\(\\s*\\$post\\['title'\\]" }] },
            { id: 3, label: "Redirects on success", keywords: [{ pattern: "redirect: /posts" }] },
          ],
        },
      },
    ],
  },
];

export const PHP_FORMS_LESSONS = PHP_FORMS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PHP_FORMS_TOTAL_XP = PHP_FORMS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
