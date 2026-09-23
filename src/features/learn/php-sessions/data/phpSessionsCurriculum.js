// PolyCode — PHP Sessions & Cookies interactive course
// 6 chapters · 18 lessons · server/browser PHP challenges
// $_SESSION works normally via session_start() even in this sandbox.
// Cookies are simulated by assigning directly into $_COOKIE (the same way
// PHP Fundamentals/PHP Forms simulate $_GET/$_POST), since setcookie()'s
// real effect is an HTTP response header, not something testable via output.

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

export const PHP_SESSIONS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Session Basics
  // ─────────────────────────────────────────────────────────────
  {
    id: "session-basics",
    title: "Session Basics",
    icon: "🔑",
    color: "#06b6d4",
    lessons: [
      {
        id: "sess-0",
        title: "Starting a Session & Storing Data",
        xp: 15,
        theory: [
          text(
            "HTTP is stateless — each request is independent, with no memory of previous ones. **Sessions** solve this: `session_start()` creates (or resumes) a per-visitor storage area on the server, accessible through the `$_SESSION` superglobal.",
            {
              label: "Starting a session",
              content: `session_start(); // must be called before any output

$_SESSION['username'] = 'ada';
$_SESSION['cart_count'] = 3;

echo $_SESSION['username']; // ada`,
            },
          ),
          callout("warning", "session_start() must run before any HTML or echo output — it needs to send a cookie header identifying the session."),
          quiz(
            "Why is $_SESSION useful when HTTP itself has no memory between requests?",
            [
              "It makes pages load faster",
              "It gives the server a place to persist data (like login state) tied to one visitor across multiple requests",
              "It replaces the need for a database entirely",
              "It's required by all PHP scripts",
            ],
            1,
            "Each request is normally independent, but session_start() links requests from the same browser to the same server-side storage bucket via a session ID cookie — letting you remember things like 'this user is logged in.'",
          ),
        ],
        challenge: {
          title: "Store Session Data",
          description: "Call session_start(), store $_SESSION['username'] = 'ada', then echo it back.",
          starterCode: `${PHP_MAIN}\n// start the session, store username, echo it`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['username'] = 'ada';\necho $_SESSION['username'];`,
          tests: [
            { id: 1, label: "Calls session_start()", keywords: [{ pattern: "session_start\\s*\\(" }] },
            { id: 2, label: "Sets $_SESSION['username']", keywords: [{ pattern: "\\$_SESSION\\['username'\\]" }] },
          ],
        },
      },
      {
        id: "sess-1",
        title: "Reading Session Data Safely",
        xp: 20,
        theory: [
          text(
            "Just like `$_POST`, reading a session key that was never set triggers a warning. Use `isset()` or `??` — especially important for things like login state, where a missing key should mean 'not logged in', not an error.",
            {
              label: "Safe session reads",
              content: `session_start();

if (isset($_SESSION['user_id'])) {
    echo "Logged in as user " . $_SESSION['user_id'];
} else {
    echo "Not logged in";
}

// Equivalent shorthand:
echo $_SESSION['user_id'] ?? "Not logged in";`,
            },
          ),
          quiz(
            "What should isset($_SESSION['user_id']) return for a brand-new visitor who never logged in?",
            ["true", "false", "null", "It throws a fatal error"],
            1,
            "isset() returns false for a key that was never set, which is exactly the signal you want: 'this visitor has no user_id in their session, so they're not logged in.'",
          ),
        ],
        challenge: {
          title: "Check Login State Safely",
          description: "The session has no 'user_id' key set. Echo the logged-in message or \"Not logged in\" using ??.",
          starterCode: `${PHP_MAIN}session_start();\n\n// echo login status using ??`,
          solutionCode: `${PHP_MAIN}session_start();\n\necho $_SESSION['user_id'] ?? "Not logged in";`,
          tests: [
            { id: 1, label: "Uses ?? for a safe read", keywords: [{ pattern: "\\?\\?" }] },
          ],
        },
      },
      {
        id: "sess-2",
        title: "Removing Session Data",
        xp: 20,
        theory: [
          text(
            "To remove a single key, use `unset()`. To clear the entire session's data (but keep the session itself alive), use `session_unset()`. To end the session completely, use `session_destroy()`.",
            {
              label: "Removing session data",
              content: `session_start();
$_SESSION['cart_count'] = 3;

unset($_SESSION['cart_count']); // removes just this key

$_SESSION['a'] = 1;
$_SESSION['b'] = 2;
session_unset(); // clears ALL session variables, session stays active

session_destroy(); // ends the session entirely`,
            },
          ),
          quiz(
            "What's the difference between session_unset() and session_destroy()?",
            [
              "They do the same thing",
              "session_unset() clears session variables but keeps the session active; session_destroy() ends the session entirely",
              "session_destroy() only removes cookies",
              "session_unset() deletes the session file from disk",
            ],
            1,
            "session_unset() empties $_SESSION but the session ID stays valid — session_destroy() invalidates the session itself, which is what you want on logout.",
          ),
        ],
        challenge: {
          title: "Remove a Single Key",
          description: "Set $_SESSION['cart_count'] = 3 and $_SESSION['username'] = 'ada'. Unset only cart_count, then echo whether it's set (\"still set\" or \"removed\") and print username.",
          starterCode: `${PHP_MAIN}session_start();\n$_SESSION['cart_count'] = 3;\n$_SESSION['username'] = 'ada';\n\n// unset cart_count, then echo "removed" or "still set", plus username`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['cart_count'] = 3;\n$_SESSION['username'] = 'ada';\n\nunset($_SESSION['cart_count']);\necho isset($_SESSION['cart_count']) ? "still set" : "removed";\necho " " . $_SESSION['username'];`,
          tests: [
            { id: 1, label: "Uses unset() on cart_count", keywords: [{ pattern: "unset\\s*\\(\\s*\\$_SESSION\\['cart_count'\\]" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Cookies
  // ─────────────────────────────────────────────────────────────
  {
    id: "cookies",
    title: "Cookies",
    icon: "🍪",
    color: "#3b82f6",
    lessons: [
      {
        id: "sess-3",
        title: "What is a Cookie?",
        xp: 15,
        theory: [
          text(
            "A **cookie** is a small piece of data the server asks the browser to store and send back on every future request. `setcookie()` sends it; on later requests, it shows up in `$_COOKIE`.",
            {
              label: "Setting a cookie",
              content: `// Sent to the browser (must be called before any output):
setcookie('theme', 'dark', time() + 3600); // expires in 1 hour

// On a LATER request, the browser sends it back automatically:
echo $_COOKIE['theme']; // "dark"`,
            },
          ),
          diagram("Sessions vs Cookies", [
            { id: "session", label: "Session", color: "#06b6d4", items: ["Stored on the SERVER", "Browser only holds a session ID", "Cleared when session ends"] },
            { id: "cookie", label: "Cookie", color: "#3b82f6", items: ["Stored in the BROWSER", "Sent back on every request", "Persists until it expires"] },
          ]),
          quiz(
            "Where is a cookie's actual data stored?",
            ["On the server, in a session file", "In the browser itself", "In the database", "In PHP's memory only"],
            1,
            "Unlike session data (which lives server-side), a cookie's value is stored by the browser and resent with every request to the site that set it.",
          ),
        ],
        challenge: {
          title: "Read a Simulated Cookie",
          description: "We simulate a returning visitor whose browser already has a cookie. Assign $_COOKIE['theme'] = 'dark', then echo it.",
          starterCode: `${PHP_MAIN}\n// simulate the cookie, echo it`,
          solutionCode: `${PHP_MAIN}$_COOKIE['theme'] = 'dark';\necho $_COOKIE['theme'];`,
          tests: [
            { id: 1, label: "Reads $_COOKIE", keywords: [{ pattern: "\\$_COOKIE\\['theme'\\]" }] },
          ],
        },
      },
      {
        id: "sess-4",
        title: "Cookie Expiration & Options",
        xp: 20,
        theory: [
          text(
            "`setcookie()` takes an expiration timestamp, a path, and more. Without an expiration, a cookie is a **session cookie** — it disappears when the browser closes. `time() + N` sets it to expire N seconds from now.",
            {
              label: "Common expiration patterns",
              content: `setcookie('session_pref', 'x'); // expires when browser closes

setcookie('remember_me', 'yes', time() + (86400 * 30)); // 30 days

setcookie('temp_flag', 'y', time() - 3600); // in the past = deletes the cookie`,
            },
          ),
          quiz(
            "How do you delete an existing cookie with setcookie()?",
            [
              "Call unset($_COOKIE['name'])",
              "Call setcookie() again with the same name and an expiration time in the past",
              "Cookies can't be deleted, only overwritten",
              "Set the value to an empty string only",
            ],
            1,
            "Since the browser (not PHP) actually owns the cookie storage, deleting one means telling the browser via a new setcookie() call with an already-past expiration time, so the browser discards it.",
          ),
        ],
        challenge: {
          title: "Compute a 30-Day Expiration",
          description: "Given a fixed 'now' of 1000000, compute the expiration timestamp for 30 days from now (86400 seconds/day) and echo it.",
          starterCode: `${PHP_MAIN}$now = 1000000;\n\n// compute expiration = now + 30 days, echo it`,
          solutionCode: `${PHP_MAIN}$now = 1000000;\n\n$expires = $now + (86400 * 30);\necho $expires;`,
          tests: [
            { id: 1, label: "Multiplies 86400 by 30", keywords: [{ pattern: "86400\\s*\\*\\s*30" }] },
          ],
        },
      },
      {
        id: "sess-5",
        title: "Reading Multiple Cookies",
        xp: 20,
        theory: [
          text(
            "`$_COOKIE` is a normal associative array — you can loop over it, check for specific keys, and combine cookie data with other logic, just like any other superglobal.",
            {
              label: "Looping over cookies",
              content: `$_COOKIE = ['theme' => 'dark', 'lang' => 'en'];

foreach ($_COOKIE as $name => $value) {
    echo "$name = $value\\n";
}`,
            },
          ),
          quiz(
            "What type of PHP value is $_COOKIE?",
            ["A string", "An associative array", "An object", "A boolean"],
            1,
            "Like $_GET, $_POST, and $_SESSION, $_COOKIE is a plain associative array mapping cookie names to their values.",
          ),
        ],
        challenge: {
          title: "Loop Over Cookies",
          description: "Given $_COOKIE with 'theme'=>'dark' and 'lang'=>'en', loop over it and echo each as \"name=value\" separated by a comma.",
          starterCode: `${PHP_MAIN}$_COOKIE = ['theme' => 'dark', 'lang' => 'en'];\n\n// loop and build "theme=dark,lang=en"`,
          solutionCode: `${PHP_MAIN}$_COOKIE = ['theme' => 'dark', 'lang' => 'en'];\n\n$parts = [];\nforeach ($_COOKIE as $name => $value) {\n    $parts[] = "$name=$value";\n}\necho implode(",", $parts);`,
          tests: [
            { id: 1, label: "Loops with foreach", keywords: [{ pattern: "foreach\\s*\\(\\s*\\$_COOKIE" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Login & Auth Patterns
  // ─────────────────────────────────────────────────────────────
  {
    id: "login-auth",
    title: "Login & Auth Patterns",
    icon: "🔐",
    color: "#f59e0b",
    lessons: [
      {
        id: "sess-6",
        title: "Storing Identity After Login",
        xp: 25,
        theory: [
          text(
            "The core login pattern: verify the submitted credentials, and if correct, store the user's identity in the session so future requests know who's logged in — never store the password itself.",
            {
              label: "A basic login handler",
              content: `session_start();
$validUsers = ['ada' => 'secret123'];

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (isset($validUsers[$username]) && $validUsers[$username] === $password) {
    $_SESSION['user_id'] = $username; // now "logged in"
    echo "Login successful";
} else {
    echo "Invalid credentials";
}`,
            },
          ),
          callout("warning", "Never store a plaintext password in $_SESSION or compare against one stored elsewhere in plaintext — always hash passwords with password_hash()/password_verify() in real applications."),
          quiz(
            "What should be stored in $_SESSION after a successful login?",
            [
              "The user's plaintext password, for convenience",
              "Just an identifier for who's logged in (like a user ID or username), never the password",
              "Nothing — sessions aren't used for login",
              "The entire user database row including sensitive fields",
            ],
            1,
            "The session should hold just enough to identify the user on future requests (e.g. user_id) — the password itself should never be stored in the session.",
          ),
        ],
        challenge: {
          title: "Log In a User",
          description: "$_POST has username='ada', password='secret123'. Given $validUsers=['ada'=>'secret123'], verify and set $_SESSION['user_id'] on success, echoing \"Login successful\" or \"Invalid credentials\".",
          starterCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n// verify and set session, echo the result`,
          solutionCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n$username = $_POST['username'] ?? '';\n$password = $_POST['password'] ?? '';\n\nif (isset($validUsers[$username]) && $validUsers[$username] === $password) {\n    $_SESSION['user_id'] = $username;\n    echo "Login successful";\n} else {\n    echo "Invalid credentials";\n}`,
          tests: [
            { id: 1, label: "Verifies against $validUsers", keywords: [{ pattern: "\\$validUsers\\[" }] },
            { id: 2, label: "Sets $_SESSION['user_id'] on success", keywords: [{ pattern: "\\$_SESSION\\['user_id'\\]" }] },
          ],
        },
      },
      {
        id: "sess-7",
        title: "Guarding Pages with requireLogin()",
        xp: 20,
        theory: [
          text(
            "Real apps have many pages that require login. Instead of repeating the same `isset($_SESSION['user_id'])` check everywhere, wrap it in a reusable guard function.",
            {
              label: "A reusable auth guard",
              content: `function requireLogin() {
    if (!isset($_SESSION['user_id'])) {
        echo "Access denied — please log in";
        return false;
    }
    return true;
}

session_start();
if (requireLogin()) {
    echo "Welcome, " . $_SESSION['user_id'];
}`,
            },
          ),
          quiz(
            "Why extract the login check into a requireLogin() function rather than repeating the isset() check on every page?",
            [
              "Functions run faster than inline code",
              "It avoids duplicating the same logic everywhere, and centralizes any future changes to how auth is checked",
              "PHP requires functions for session access",
              "It hides the check from other developers",
            ],
            1,
            "This is the DRY (Don't Repeat Yourself) principle — one function is the single source of truth for 'is this user logged in', so a future change (like adding role checks) only needs to happen in one place.",
          ),
        ],
        challenge: {
          title: "Guard an Unauthenticated Request",
          description: "No user_id is set in the session. Implement requireLogin() and call it — it should echo \"Access denied — please log in\".",
          starterCode: `${PHP_MAIN}session_start();\n\nfunction requireLogin() {\n    // return false and echo the denial message if not logged in\n\n}\n\nrequireLogin();`,
          solutionCode: `${PHP_MAIN}session_start();\n\nfunction requireLogin() {\n    if (!isset($_SESSION['user_id'])) {\n        echo "Access denied — please log in";\n        return false;\n    }\n    return true;\n}\n\nrequireLogin();`,
          tests: [
            { id: 1, label: "Defines requireLogin()", keywords: [{ pattern: "function\\s+requireLogin" }] },
            { id: 2, label: "Checks isset($_SESSION['user_id'])", keywords: [{ pattern: "isset\\s*\\(\\s*\\$_SESSION\\['user_id'\\]" }] },
          ],
        },
      },
      {
        id: "sess-8",
        title: "Logging Out",
        xp: 20,
        theory: [
          text(
            "A proper logout clears the session data AND destroys the session itself — leaving either step out can let stale data linger or the session be reused.",
            {
              label: "A complete logout",
              content: `session_start();
$_SESSION['user_id'] = 'ada'; // pretend they were logged in

session_unset();   // clear all session variables
session_destroy(); // invalidate the session itself

echo "Logged out";`,
            },
          ),
          quiz(
            "Why call both session_unset() AND session_destroy() on logout, not just one?",
            [
              "It's redundant — either alone is enough",
              "session_unset() clears the data, session_destroy() invalidates the session itself — doing both fully ends the login state",
              "session_destroy() alone would throw an error",
              "This is only needed in PHP CLI, not on a real server",
            ],
            1,
            "session_unset() empties the variables but the session ID could technically still be considered active; session_destroy() ends the session record entirely — together they're the standard, thorough logout pattern.",
          ),
        ],
        challenge: {
          title: "Implement Logout",
          description: "$_SESSION['user_id'] is 'ada'. Log the user out (clear session data and destroy the session), then echo \"Logged out\".",
          starterCode: `${PHP_MAIN}session_start();\n$_SESSION['user_id'] = 'ada';\n\n// log out fully, then echo "Logged out"`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['user_id'] = 'ada';\n\nsession_unset();\nsession_destroy();\necho "Logged out";`,
          tests: [
            { id: 1, label: "Calls session_unset()", keywords: [{ pattern: "session_unset\\s*\\(" }] },
            { id: 2, label: "Calls session_destroy()", keywords: [{ pattern: "session_destroy\\s*\\(" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Session Security
  // ─────────────────────────────────────────────────────────────
  {
    id: "session-security",
    title: "Session Security",
    icon: "🛡️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "sess-9",
        title: "Session Fixation & regenerate_id()",
        xp: 25,
        theory: [
          text(
            "**Session fixation** is an attack where an attacker tricks a victim into using a known session ID, then hijacks it once the victim logs in. The fix: call `session_regenerate_id()` immediately after a successful login, issuing a fresh ID.",
            {
              label: "Regenerating on login",
              content: `session_start();

// ... verify credentials ...

session_regenerate_id(true); // true = destroy the old session data too
$_SESSION['user_id'] = 'ada';
echo "Logged in with a fresh session ID";`,
            },
          ),
          callout("info", "Passing true to session_regenerate_id() deletes the old session file, closing the fixation window completely."),
          quiz(
            "When should you call session_regenerate_id()?",
            [
              "On every single page load",
              "Immediately after a successful login (and other privilege changes)",
              "Only when logging out",
              "It's not needed if you use HTTPS",
            ],
            1,
            "Regenerating the ID right after authentication ensures any session ID an attacker might have set before login becomes useless — the user is now operating under a brand-new, unguessable ID.",
          ),
        ],
        challenge: {
          title: "Regenerate on Login",
          description: "After verifying login succeeded, call session_regenerate_id(true), then set $_SESSION['user_id'] = 'ada' and echo \"Session regenerated\".",
          starterCode: `${PHP_MAIN}session_start();\n\n// regenerate session id, set user_id, echo confirmation`,
          solutionCode: `${PHP_MAIN}session_start();\n\nsession_regenerate_id(true);\n$_SESSION['user_id'] = 'ada';\necho "Session regenerated";`,
          tests: [
            { id: 1, label: "Calls session_regenerate_id(true)", keywords: [{ pattern: "session_regenerate_id\\s*\\(\\s*true\\s*\\)" }] },
          ],
        },
      },
      {
        id: "sess-10",
        title: "Secure Cookie Flags",
        xp: 20,
        theory: [
          text(
            "Cookies (including the session cookie) support security flags: `Secure` (only sent over HTTPS), `HttpOnly` (inaccessible to JavaScript, blocking many XSS-based theft attempts), and `SameSite` (restricts cross-site sending, helping prevent CSRF).",
            {
              label: "Setting flags on a cookie",
              content: `setcookie('session_id', 'abc123', [
    'expires' => time() + 3600,
    'path' => '/',
    'secure' => true,     // HTTPS only
    'httponly' => true,   // no JavaScript access
    'samesite' => 'Strict',
]);`,
            },
          ),
          quiz(
            "What does the HttpOnly flag protect against?",
            [
              "SQL injection",
              "JavaScript (e.g. from an XSS attack) reading the cookie's value",
              "The cookie expiring too soon",
              "CSRF attacks",
            ],
            1,
            "HttpOnly cookies are invisible to document.cookie in JavaScript — so even if an attacker manages to inject a script (XSS), they still can't steal the session cookie's value.",
          ),
        ],
        challenge: {
          title: "Build Secure Cookie Options",
          description: "Build an options array for a session cookie with secure=true, httponly=true, samesite='Strict', then echo the httponly value as \"true\" or \"false\".",
          starterCode: `${PHP_MAIN}\n// build the options array, echo httponly as "true"/"false"`,
          solutionCode: `${PHP_MAIN}$options = [\n    'secure' => true,\n    'httponly' => true,\n    'samesite' => 'Strict',\n];\necho $options['httponly'] ? "true" : "false";`,
          tests: [
            { id: 1, label: "Sets httponly to true", keywords: [{ pattern: "'httponly'\\s*=>\\s*true" }] },
            { id: 2, label: "Sets secure to true", keywords: [{ pattern: "'secure'\\s*=>\\s*true" }] },
          ],
        },
      },
      {
        id: "sess-11",
        title: "Putting It Together: A Secure Login Flow",
        xp: 30,
        theory: [
          text(
            "Chapter capstone: combine everything so far — verify credentials, regenerate the session ID, and store identity — into one complete, secure login handler.",
            {
              label: "The full secure flow",
              content: `session_start();
$validUsers = ['ada' => 'secret123'];
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (isset($validUsers[$username]) && $validUsers[$username] === $password) {
    session_regenerate_id(true);
    $_SESSION['user_id'] = $username;
    echo "Welcome, $username!";
} else {
    echo "Invalid credentials";
}`,
            },
          ),
          quiz(
            "In what order should credential verification and session_regenerate_id() happen?",
            [
              "Regenerate first, then verify credentials",
              "Verify credentials first — only regenerate the session ID after confirming the login is valid",
              "Order doesn't matter",
              "They should never be used together",
            ],
            1,
            "Regenerating the ID is a reward for a successful login, not something to do before you know the credentials are even valid — verify first, then regenerate.",
          ),
        ],
        challenge: {
          title: "Build the Complete Secure Login",
          description: "$_POST has username='ada', password='secret123'. Given $validUsers=['ada'=>'secret123'], verify, regenerate the session ID, store user_id, and echo \"Welcome, ada!\" or \"Invalid credentials\".",
          starterCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n// full secure login flow`,
          solutionCode: `${PHP_MAIN}session_start();\n$validUsers = ['ada' => 'secret123'];\n$_POST['username'] = 'ada';\n$_POST['password'] = 'secret123';\n\n$username = $_POST['username'] ?? '';\n$password = $_POST['password'] ?? '';\n\nif (isset($validUsers[$username]) && $validUsers[$username] === $password) {\n    session_regenerate_id(true);\n    $_SESSION['user_id'] = $username;\n    echo "Welcome, $username!";\n} else {\n    echo "Invalid credentials";\n}`,
          tests: [
            { id: 1, label: "Verifies credentials", keywords: [{ pattern: "\\$validUsers\\[" }] },
            { id: 2, label: "Regenerates session id", keywords: [{ pattern: "session_regenerate_id" }] },
            { id: 3, label: "Stores user_id", keywords: [{ pattern: "\\$_SESSION\\['user_id'\\]" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Session-Powered Features
  // ─────────────────────────────────────────────────────────────
  {
    id: "session-powered-features",
    title: "Session-Powered Features",
    icon: "🛒",
    color: "#10b981",
    lessons: [
      {
        id: "sess-12",
        title: "Flash Messages",
        xp: 20,
        theory: [
          text(
            "A **flash message** is a one-time notice — \"Profile saved\", \"Wrong password\" — that must survive exactly one redirect and then disappear. Store it in the session when the action happens, and on the next page **read it and remove it in the same step**, so a refresh doesn't show it again. It pairs naturally with Post/Redirect/Get.",
            {
              label: "Set once, show once",
              content: `session_start();

function flash(string $message): void {
    $_SESSION['flash'] = $message;
}

function takeFlash(): ?string {
    $message = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']); // gone after the first read
    return $message;
}

flash("Profile saved");          // during the POST, before redirecting
echo takeFlash() ?? "(none)";    // next page: Profile saved
echo "\\n";
echo takeFlash() ?? "(none)";    // refresh: (none)`,
            },
          ),
          quiz(
            "Why does takeFlash() unset the message as soon as it reads it?",
            [
              "Sessions can only hold one value at a time",
              "So the message appears on exactly one page view and not again on refresh or later pages",
              "unset() is required before echo",
              "To regenerate the session ID",
            ],
            1,
            "A flash message is meant to be seen once. Reading and removing it together guarantees the next page load finds nothing, so the notice never repeats.",
          ),
        ],
        challenge: {
          title: "Build a One-Time Notice",
          description: "Complete takeFlash(): read $_SESSION['flash'] (null if missing), unset it, and return it. The script sets a flash, then echoes takeFlash() twice using \"(none)\" as the fallback.",
          starterCode: `${PHP_MAIN}session_start();\n$_SESSION['flash'] = "Order placed";\n\nfunction takeFlash(): ?string {\n    // read, remove, return\n\n}\n\necho (takeFlash() ?? "(none)") . "\\n";\necho takeFlash() ?? "(none)";`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['flash'] = "Order placed";\n\nfunction takeFlash(): ?string {\n    $message = $_SESSION['flash'] ?? null;\n    unset($_SESSION['flash']);\n    return $message;\n}\n\necho (takeFlash() ?? "(none)") . "\\n";\necho takeFlash() ?? "(none)";`,
          tests: [
            { id: 1, label: "Reads the flash with a null fallback", keywords: [{ pattern: "\\$_SESSION\\['flash'\\]\\s*\\?\\?\\s*null" }] },
            { id: 2, label: "Removes it with unset()", keywords: [{ pattern: "unset\\s*\\(\\s*\\$_SESSION\\['flash'\\]\\s*\\)" }] },
          ],
        },
      },
      {
        id: "sess-13",
        title: "A Session Shopping Cart",
        xp: 25,
        theory: [
          text(
            "Sessions are ideal for state that belongs to one visitor but doesn't need a database yet — a shopping cart is the classic example. Store the cart as an array of **product id => quantity**, so adding the same product twice increases the quantity instead of creating a duplicate line. Keep prices on the server and look them up when totalling: never trust a price posted by the browser.",
            {
              label: "Cart helpers",
              content: `session_start();
$_SESSION['cart'] ??= [];

function addToCart(int $productId, int $qty = 1): void {
    $_SESSION['cart'][$productId] = ($_SESSION['cart'][$productId] ?? 0) + $qty;
}

function removeFromCart(int $productId): void {
    unset($_SESSION['cart'][$productId]);
}

$prices = [1 => 4.50, 2 => 12.00]; // looked up server-side

addToCart(1);
addToCart(1);
addToCart(2);

$total = 0;
foreach ($_SESSION['cart'] as $id => $qty) {
    $total += $prices[$id] * $qty;
}
echo $total; // 21`,
            },
          ),
          callout("warning", "Session data lives on the server, but a real shop should still re-check stock and prices at checkout — a cart built an hour ago may be out of date."),
          quiz(
            "Why store the cart as [productId => quantity] instead of a list of product ids?",
            [
              "PHP sessions can't store lists",
              "Adding the same product again just increases its quantity, and each product appears once",
              "It makes the session cookie smaller",
              "Lists can't be counted",
            ],
            1,
            "Keying by product id gives one entry per product. Adding again updates the quantity, and removing a product is a single unset() on its key.",
          ),
        ],
        challenge: {
          title: "Add to the Cart and Total It",
          description: "Complete addToCart() so it increases the quantity for an existing product id (starting from 0). Then loop over $_SESSION['cart'], multiply each quantity by $prices[$id], and echo the total.",
          starterCode: `${PHP_MAIN}session_start();\n$_SESSION['cart'] = [];\n$prices = [10 => 3.00, 20 => 5.00];\n\nfunction addToCart(int $productId, int $qty = 1): void {\n    // increase the quantity for this product\n\n}\n\naddToCart(10);\naddToCart(10);\naddToCart(20, 3);\n\n// total the cart and echo it`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['cart'] = [];\n$prices = [10 => 3.00, 20 => 5.00];\n\nfunction addToCart(int $productId, int $qty = 1): void {\n    $_SESSION['cart'][$productId] = ($_SESSION['cart'][$productId] ?? 0) + $qty;\n}\n\naddToCart(10);\naddToCart(10);\naddToCart(20, 3);\n\n$total = 0;\nforeach ($_SESSION['cart'] as $id => $qty) {\n    $total += $prices[$id] * $qty;\n}\necho $total;`,
          tests: [
            { id: 1, label: "Updates the quantity for that product", keywords: [{ pattern: "\\$_SESSION\\['cart'\\]\\[\\$productId\\]\\s*(=|\\+=)" }] },
            { id: 2, label: "Loops over the cart by id and quantity", keywords: [{ pattern: "foreach\\s*\\(\\s*\\$_SESSION\\['cart'\\]\\s+as\\s+\\$\\w+\\s*=>\\s*\\$\\w+" }] },
            { id: 3, label: "Uses server-side prices", keywords: [{ pattern: "\\$prices\\[\\$\\w+\\]" }] },
          ],
        },
      },
      {
        id: "sess-14",
        title: "Idle Timeouts & Absolute Expiry",
        xp: 25,
        theory: [
          text(
            "A session shouldn't live forever. An **idle timeout** logs the user out after a period of inactivity: store the time of the last request, and on each request compare it with the current time. An **absolute limit** caps the total session age even for someone who stays active. When either is exceeded, clear and destroy the session.",
            {
              label: "Enforcing both limits",
              content: `session_start();

const IDLE_LIMIT = 30 * 60;          // 30 minutes
const ABSOLUTE_LIMIT = 8 * 60 * 60;  // 8 hours

function sessionExpired(int $now): bool {
    $idle = $now - ($_SESSION['last_activity'] ?? $now);
    $age  = $now - ($_SESSION['created_at'] ?? $now);
    return $idle > IDLE_LIMIT || $age > ABSOLUTE_LIMIT;
}

$now = time();
$_SESSION['created_at'] = $now - 3600;    // logged in an hour ago
$_SESSION['last_activity'] = $now - 2400; // idle for 40 minutes

if (sessionExpired($now)) {
    session_unset();
    session_destroy();
    echo "Session expired, please log in again";
} else {
    $_SESSION['last_activity'] = $now; // refresh on every request
}`,
            },
          ),
          diagram("Two clocks", [
            { id: "idle", label: "Idle timeout", color: "#10b981", items: ["Resets on every request", "Catches abandoned tabs"] },
            { id: "absolute", label: "Absolute limit", color: "#8b5cf6", items: ["Never resets", "Caps a stolen session's lifetime"] },
          ]),
          quiz(
            "Why keep an absolute limit as well as an idle timeout?",
            [
              "Idle timeouts don't work in PHP",
              "An attacker using a stolen session can keep it active forever; an absolute limit ends it regardless of activity",
              "It makes sessions start faster",
              "Browsers require both",
            ],
            1,
            "Activity keeps resetting the idle clock, so on its own it can be kept alive indefinitely. The absolute limit is measured from login and never resets.",
          ),
        ],
        challenge: {
          title: "Check for an Idle Timeout",
          description: "With an idle limit of 1800 seconds, compute how long the session has been idle ($now minus $_SESSION['last_activity']). If it exceeds the limit echo \"expired\"; otherwise update last_activity to $now and echo \"active\".",
          starterCode: `${PHP_MAIN}session_start();\n$now = 1700000000;\n$_SESSION['last_activity'] = $now - 1900;\n$idleLimit = 1800;\n\n// compare the idle time with $idleLimit`,
          solutionCode: `${PHP_MAIN}session_start();\n$now = 1700000000;\n$_SESSION['last_activity'] = $now - 1900;\n$idleLimit = 1800;\n\n$idle = $now - $_SESSION['last_activity'];\nif ($idle > $idleLimit) {\n    echo "expired";\n} else {\n    $_SESSION['last_activity'] = $now;\n    echo "active";\n}`,
          tests: [
            { id: 1, label: "Computes the idle time", keywords: [{ pattern: "\\$now\\s*-\\s*\\$_SESSION\\['last_activity'\\]" }] },
            { id: 2, label: "Compares with the limit", keywords: [{ pattern: ">\\s*\\$idleLimit" }] },
            { id: 3, label: "Refreshes last_activity when active", keywords: [{ pattern: "\\$_SESSION\\['last_activity'\\]\\s*=\\s*\\$now\\s*;" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Hardening Authentication
  // ─────────────────────────────────────────────────────────────
  {
    id: "hardening-authentication",
    title: "Hardening Authentication",
    icon: "🧱",
    color: "#ec4899",
    lessons: [
      {
        id: "sess-15",
        title: "Hashing Passwords with password_hash()",
        xp: 25,
        theory: [
          text(
            "Earlier login lessons compared plaintext passwords to keep the focus on sessions. Real apps **never store the password itself**. `password_hash()` produces a salted, slow hash (bcrypt by default), and `password_verify()` checks a login attempt against it. The salt and algorithm are stored inside the hash string, so you save just that one value. `password_needs_rehash()` tells you when to upgrade an old hash after a successful login.",
            {
              label: "Hash on sign-up, verify on login",
              content: `// Sign-up: store only the hash
$hash = password_hash("correct horse", PASSWORD_DEFAULT);
echo strlen($hash) >= 60 ? "stored a hash\\n" : "";

// Login: verify the attempt
var_dump(password_verify("correct horse", $hash)); // bool(true)
var_dump(password_verify("wrong", $hash));         // bool(false)

// Hashing the same password twice gives different strings (new salt)
var_dump($hash === password_hash("correct horse", PASSWORD_DEFAULT)); // bool(false)`,
            },
          ),
          callout("warning", "Never use md5() or sha1() for passwords — they're built to be fast, which makes guessing billions of passwords cheap. password_hash() is deliberately slow and salted."),
          quiz(
            "Why can't you check a login by hashing the attempt and comparing with ===?",
            [
              "=== doesn't work on long strings",
              "Each hash includes its own random salt, so hashing the same password again gives a different string — password_verify() reads the salt from the stored hash",
              "password_hash() returns an array",
              "PHP forbids comparing hashes",
            ],
            1,
            "password_hash() generates a new salt every call. password_verify() extracts the salt and algorithm from the stored hash, re-hashes the attempt the same way, and compares safely.",
          ),
        ],
        challenge: {
          title: "Verify a Hashed Password",
          description: "Store the hash of \"s3cret!\" in $users['ada'] using password_hash() with PASSWORD_DEFAULT. Then use password_verify() to check the submitted password and echo \"Welcome, ada\" or \"Invalid credentials\".",
          starterCode: `${PHP_MAIN}$users = [];\n// store a hash for ada's password "s3cret!"\n\n$_POST['username'] = 'ada';\n$_POST['password'] = 's3cret!';\n\n// verify the submitted password against the stored hash`,
          solutionCode: `${PHP_MAIN}$users = [];\n$users['ada'] = password_hash("s3cret!", PASSWORD_DEFAULT);\n\n$_POST['username'] = 'ada';\n$_POST['password'] = 's3cret!';\n\n$username = $_POST['username'] ?? '';\n$hash = $users[$username] ?? null;\n\nif ($hash !== null && password_verify($_POST['password'] ?? '', $hash)) {\n    echo "Welcome, $username";\n} else {\n    echo "Invalid credentials";\n}`,
          tests: [
            { id: 1, label: "Hashes with password_hash()", keywords: [{ pattern: "password_hash\\s*\\([^)]*PASSWORD_DEFAULT" }] },
            { id: 2, label: "Checks with password_verify()", keywords: [{ pattern: "password_verify\\s*\\(" }] },
          ],
        },
      },
      {
        id: "sess-16",
        title: "Throttling Login Attempts",
        xp: 25,
        theory: [
          text(
            "Without a limit, a bot can try thousands of passwords a minute. **Throttling** counts failed attempts per account and locks further tries for a while once a threshold is reached. The counter must live on the **server** — in a database table or cache keyed by username (and often IP) — because a bot can simply discard its session cookie to reset anything stored in `$_SESSION`.",
            {
              label: "Counting failures per account",
              content: `const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 15 * 60;

// Stand-in for a database table: username => [count, lockedUntil]
$attempts = ['ada' => ['count' => 5, 'lockedUntil' => time() + 600]];

function isLocked(array $attempts, string $user, int $now): bool {
    return ($attempts[$user]['lockedUntil'] ?? 0) > $now;
}

function recordFailure(array &$attempts, string $user, int $now): void {
    $count = ($attempts[$user]['count'] ?? 0) + 1;
    $attempts[$user] = [
        'count' => $count,
        'lockedUntil' => $count >= MAX_ATTEMPTS ? $now + LOCK_SECONDS : 0,
    ];
}

echo isLocked($attempts, 'ada', time()) ? "Too many attempts, try later" : "OK to try";`,
            },
          ),
          callout("info", "Reset the counter after a successful login, and show the same \"Invalid credentials\" message for a wrong username and a wrong password so attackers can't discover which accounts exist."),
          quiz(
            "Why is a failed-attempt counter stored only in $_SESSION a weak defence?",
            [
              "$_SESSION can't store integers",
              "An attacker's script can drop the session cookie and get a fresh session with the counter back at zero",
              "Sessions expire after one request",
              "It's slower than a database",
            ],
            1,
            "The session is tied to a cookie the client controls. Throttling has to be keyed by something the attacker can't reset — the target username, and often the IP address — and stored server-side.",
          ),
        ],
        challenge: {
          title: "Lock an Account After Failures",
          description: "Complete recordFailure(): increase the count for $user (starting from 0) and set lockedUntil to $now + 900 once the count reaches 3, else 0. After three failures echo \"locked\" or \"open\" using isLocked().",
          starterCode: `${PHP_MAIN}$attempts = [];\n$now = 1700000000;\n\nfunction isLocked(array $attempts, string $user, int $now): bool {\n    return ($attempts[$user]['lockedUntil'] ?? 0) > $now;\n}\n\nfunction recordFailure(array &$attempts, string $user, int $now): void {\n    // bump the count, lock for 900 seconds at 3 failures\n\n}\n\nrecordFailure($attempts, 'ada', $now);\nrecordFailure($attempts, 'ada', $now);\nrecordFailure($attempts, 'ada', $now);\necho isLocked($attempts, 'ada', $now) ? "locked" : "open";`,
          solutionCode: `${PHP_MAIN}$attempts = [];\n$now = 1700000000;\n\nfunction isLocked(array $attempts, string $user, int $now): bool {\n    return ($attempts[$user]['lockedUntil'] ?? 0) > $now;\n}\n\nfunction recordFailure(array &$attempts, string $user, int $now): void {\n    $count = ($attempts[$user]['count'] ?? 0) + 1;\n    $attempts[$user] = [\n        'count' => $count,\n        'lockedUntil' => $count >= 3 ? $now + 900 : 0,\n    ];\n}\n\nrecordFailure($attempts, 'ada', $now);\nrecordFailure($attempts, 'ada', $now);\nrecordFailure($attempts, 'ada', $now);\necho isLocked($attempts, 'ada', $now) ? "locked" : "open";`,
          tests: [
            { id: 1, label: "Increments the failure count", keywords: [{ pattern: "'count'" }, { pattern: "\\+\\s*1|\\+\\+|\\+=\\s*1" }] },
            { id: 2, label: "Locks at 3 failures for 900 seconds", keywords: [{ pattern: ">=\\s*3" }, { pattern: "\\$now\\s*\\+\\s*900" }] },
          ],
        },
      },
      {
        id: "sess-17",
        title: "Role-Based Access Control",
        xp: 30,
        theory: [
          text(
            "Logging in answers *who* someone is (authentication); **authorization** answers *what they may do*. A simple, maintainable approach is to store the user's **role** in the session at login and map each role to a list of permissions. Pages then check a permission — `can('delete_posts')` — rather than hard-coding role names everywhere, so adding a new role means editing one map.",
            {
              label: "Roles mapped to permissions",
              content: `session_start();

const PERMISSIONS = [
    'viewer' => ['read_posts'],
    'editor' => ['read_posts', 'write_posts'],
    'admin'  => ['read_posts', 'write_posts', 'delete_posts'],
];

function can(string $permission): bool {
    $role = $_SESSION['role'] ?? null;
    return $role !== null && in_array($permission, PERMISSIONS[$role] ?? [], true);
}

$_SESSION['user_id'] = 7;
$_SESSION['role'] = 'editor'; // set at login from the users table

echo can('write_posts') ? "can write\\n" : "cannot write\\n";   // can write
echo can('delete_posts') ? "can delete\\n" : "403 Forbidden\\n"; // 403 Forbidden`,
            },
          ),
          diagram("Two separate questions", [
            { id: "authn", label: "Authentication", color: "#3b82f6", items: ["Who are you?", "Password check, session user_id"] },
            { id: "authz", label: "Authorization", color: "#ec4899", items: ["What may you do?", "Role and permission checks"] },
          ]),
          callout("warning", "Load the role from your database at login and keep it server-side in the session — never read it from a cookie or form field, or users could promote themselves."),
          quiz(
            "Why check can('delete_posts') instead of $_SESSION['role'] === 'admin' on each page?",
            [
              "String comparison is slow",
              "Permissions are defined in one map, so adding or changing a role doesn't require editing every page",
              "Roles can't be stored in sessions",
              "It avoids needing session_start()",
            ],
            1,
            "Checking permissions decouples pages from role names. If a new 'moderator' role should also delete posts, you add it to the map once instead of hunting down every admin check.",
          ),
        ],
        challenge: {
          title: "Guard an Admin Action",
          description: "Complete can(): read the role from $_SESSION['role'] and return whether $permission is in that role's list (strict in_array, empty list for unknown roles). Echo \"Deleted\" if the current user can 'delete_posts', otherwise \"403 Forbidden\".",
          starterCode: `${PHP_MAIN}session_start();\n$_SESSION['role'] = 'editor';\n\n$permissions = [\n    'editor' => ['read_posts', 'write_posts'],\n    'admin'  => ['read_posts', 'write_posts', 'delete_posts'],\n];\n\nfunction can(array $permissions, string $permission): bool {\n    // look up the session role's permissions\n\n}\n\necho can($permissions, 'delete_posts') ? "Deleted" : "403 Forbidden";`,
          solutionCode: `${PHP_MAIN}session_start();\n$_SESSION['role'] = 'editor';\n\n$permissions = [\n    'editor' => ['read_posts', 'write_posts'],\n    'admin'  => ['read_posts', 'write_posts', 'delete_posts'],\n];\n\nfunction can(array $permissions, string $permission): bool {\n    $role = $_SESSION['role'] ?? '';\n    return in_array($permission, $permissions[$role] ?? [], true);\n}\n\necho can($permissions, 'delete_posts') ? "Deleted" : "403 Forbidden";`,
          tests: [
            { id: 1, label: "Reads the role from the session", keywords: [{ pattern: "\\$_SESSION\\['role'\\]" }] },
            { id: 2, label: "Checks the permission with strict in_array", keywords: [{ pattern: "in_array\\s*\\(\\s*\\$permission\\s*,[^;]*,\\s*true\\s*\\)" }] },
          ],
        },
      },
    ],
  },
];

export const PHP_SESSIONS_LESSONS = PHP_SESSIONS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PHP_SESSIONS_TOTAL_XP = PHP_SESSIONS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
