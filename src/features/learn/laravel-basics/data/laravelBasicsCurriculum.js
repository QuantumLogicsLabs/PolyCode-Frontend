// PolyCode — Laravel Basics interactive course
// 6 chapters · 24 lessons · server/browser PHP challenges
// NOTE: Laravel itself isn't installed in this sandbox (no framework, no
// artisan, no real router/ORM), so theory shows real Laravel syntax while
// challenges use plain-PHP simulations of the same concepts — same approach
// as the Java Spring Boot course.

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

export const LARAVEL_BASICS_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — Routing & Controllers
  // ─────────────────────────────────────────────────────────────
  {
    id: "routing-controllers",
    title: "Routing & Controllers",
    icon: "🛣️",
    color: "#ef4444",
    lessons: [
      {
        id: "laravel-0",
        title: "What is Laravel?",
        xp: 20,
        theory: [
          text(
            "**Laravel** is PHP's most popular framework — it provides routing, an ORM (Eloquent), templating (Blade), authentication, and much more, all following the **MVC** pattern (Model–View–Controller) you've already used in the JDBC/MySQL and OOP courses.",
            {
              label: "MVC in Laravel",
              content: `// routes/web.php — maps a URL to a Controller
Route::get('/products', [ProductController::class, 'index']);

// app/Http/Controllers/ProductController.php — the "C"
class ProductController extends Controller {
    public function index() {
        $products = Product::all(); // "M" — Eloquent model
        return view('products.index', ['products' => $products]); // "V" — Blade
    }
}`,
            },
          ),
          diagram("MVC Flow", [
            { id: "route", label: "Route", color: "#ef4444", items: ["Maps a URL to a controller method"] },
            { id: "controller", label: "Controller", color: "#3b82f6", items: ["Handles the request, talks to Models"] },
            { id: "model", label: "Model (Eloquent)", color: "#f59e0b", items: ["Represents a database table"] },
            { id: "view", label: "View (Blade)", color: "#8b5cf6", items: ["Renders the HTML response"] },
          ]),
          callout("info", "Laravel isn't installed in this sandbox, so challenges in this course use plain PHP to simulate the same patterns you'd write in a real Laravel project — the concepts transfer directly."),
          quiz(
            "In MVC, which layer is responsible for talking to the database?",
            ["View", "Controller", "Model", "Route"],
            2,
            "The Model (in Laravel, an Eloquent model) represents and interacts with a database table — Controllers orchestrate, Views render, Routes just dispatch.",
          ),
        ],
        challenge: {
          title: "Simulate the MVC Flow",
          description: "Implement a plain-PHP ProductModel::all() returning [\"Mouse\", \"Keyboard\"], and a controller function index() that calls it and returns a comma-joined string (simulating a rendered view).",
          starterCode: `${PHP_MAIN}class ProductModel {\n    public static function all() {\n        return ["Mouse", "Keyboard"];\n    }\n}\n\nfunction index() {\n    // call ProductModel::all(), return implode(", ", ...)\n\n}\n\necho index();`,
          solutionCode: `${PHP_MAIN}class ProductModel {\n    public static function all() {\n        return ["Mouse", "Keyboard"];\n    }\n}\n\nfunction index() {\n    return implode(", ", ProductModel::all());\n}\n\necho index();`,
          tests: [
            { id: 1, label: "Calls ProductModel::all()", keywords: [{ pattern: "ProductModel::all" }] },
          ],
        },
      },
      {
        id: "laravel-1",
        title: "Defining Routes",
        xp: 20,
        theory: [
          text(
            "Routes live in `routes/web.php` (or `api.php` for APIs). Each maps an HTTP method + URL pattern to a handler — a closure, or a `[Controller::class, 'method']` pair.",
            {
              label: "Basic routes",
              content: `Route::get('/', function () {
    return 'Welcome!';
});

Route::get('/about', [PageController::class, 'about']);
Route::post('/products', [ProductController::class, 'store']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);`,
            },
          ),
          quiz(
            "Which HTTP method would you use to define a route for creating a new resource?",
            ["Route::get()", "Route::post()", "Route::view()", "Route::delete()"],
            1,
            "POST is the conventional HTTP method for creating new resources — GET is for reading, DELETE for removing, matching standard REST conventions (the same ones from the Spring Boot course).",
          ),
        ],
        challenge: {
          title: "Simulate a Route Table",
          description: "Build an associative array $routes mapping \"GET /\" to \"home\" and \"POST /products\" to \"store\". Echo the handler for \"POST /products\".",
          starterCode: `${PHP_MAIN}\n// build $routes, echo the handler for "POST /products"`,
          solutionCode: `${PHP_MAIN}$routes = [\n    "GET /" => "home",\n    "POST /products" => "store",\n];\necho $routes["POST /products"];`,
          tests: [
            { id: 1, label: "Builds a routes array", keywords: [{ pattern: "\\$routes\\s*=" }] },
          ],
        },
      },
      {
        id: "laravel-2",
        title: "Controllers",
        xp: 25,
        theory: [
          text(
            "A **Controller** groups related route logic into a class instead of scattering closures across `web.php`. Laravel's `php artisan make:controller` generates the boilerplate for you.",
            {
              label: "A resource controller",
              content: `class ProductController extends Controller {
    public function index() {
        return Product::all(); // list all
    }
    public function show($id) {
        return Product::findOrFail($id); // one product
    }
    public function store(Request $request) {
        return Product::create($request->all()); // create new
    }
}`,
            },
          ),
          quiz(
            "Why group related route handlers into a Controller class instead of separate closures?",
            [
              "Controllers are required by PHP",
              "It keeps related logic (like all Product operations) organized together, and enables features like dependency injection and middleware per method",
              "Controllers run faster",
              "There's no real benefit",
            ],
            1,
            "As an app grows, routes.php would become unmanageable with dozens of inline closures — Controllers keep related logic (all things 'Product') together in one testable, organized class.",
          ),
        ],
        challenge: {
          title: "Build a Simple Controller",
          description: "Implement ProductController with index() returning [\"Mouse\", \"Keyboard\"] and show($id) returning the item at that index. Call show(1) and echo it.",
          starterCode: `${PHP_MAIN}class ProductController {\n    public function index() {\n        return ["Mouse", "Keyboard"];\n    }\n    public function show($id) {\n        // return the item at index $id from index()\n\n    }\n}\n\n$controller = new ProductController();\necho $controller->show(1);`,
          solutionCode: `${PHP_MAIN}class ProductController {\n    public function index() {\n        return ["Mouse", "Keyboard"];\n    }\n    public function show($id) {\n        return $this->index()[$id];\n    }\n}\n\n$controller = new ProductController();\necho $controller->show(1);`,
          tests: [
            { id: 1, label: "show() uses index()", keywords: [{ pattern: "\\$this->index\\s*\\(" }] },
          ],
        },
      },
      {
        id: "laravel-3",
        title: "Route Parameters",
        xp: 20,
        theory: [
          text(
            "Routes can capture dynamic segments with `{param}` syntax — Laravel automatically passes them as arguments to your controller method, the same idea as `@PathVariable` in Spring Boot.",
            {
              label: "Route parameters",
              content: `Route::get('/products/{id}', [ProductController::class, 'show']);
// GET /products/5 → calls show(5)

Route::get('/users/{userId}/orders/{orderId}', [OrderController::class, 'show']);
// GET /users/3/orders/12 → calls show(3, 12)

// Optional parameters use a ?
Route::get('/posts/{id?}', [PostController::class, 'show']);`,
            },
          ),
          quiz(
            "For the route '/users/{userId}/orders/{orderId}', what does GET /users/3/orders/12 pass to the controller?",
            [
              "A single array ['3', '12']",
              "userId=3 and orderId=12 as two separate method arguments",
              "Nothing — multiple parameters aren't supported",
              "Just the URL string",
            ],
            1,
            "Laravel extracts each {param} segment in order and passes them as positional arguments to your controller method — here, show($userId, $orderId).",
          ),
        ],
        challenge: {
          title: "Extract Route Parameters",
          description: "Given the URL \"/users/3/orders/12\" and pattern \"/users/{userId}/orders/{orderId}\", write a function extracting the two numeric segments and echo \"userId=3, orderId=12\".",
          starterCode: `${PHP_MAIN}$url = "/users/3/orders/12";\n\n// extract the two numbers, echo "userId=<x>, orderId=<y>"`,
          solutionCode: `${PHP_MAIN}$url = "/users/3/orders/12";\n\npreg_match('/\\/users\\/(\\d+)\\/orders\\/(\\d+)/', $url, $matches);\necho "userId={$matches[1]}, orderId={$matches[2]}";`,
          tests: [
            { id: 1, label: "Uses preg_match to extract segments", keywords: [{ pattern: "preg_match" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Blade Templates
  // ─────────────────────────────────────────────────────────────
  {
    id: "blade-templates",
    title: "Blade Templates",
    icon: "🔥",
    color: "#f59e0b",
    lessons: [
      {
        id: "laravel-4",
        title: "Blade Basics",
        xp: 20,
        theory: [
          text(
            "**Blade** is Laravel's templating engine. `{{ $var }}` outputs escaped data (safe against XSS, like `htmlspecialchars()` from PHP Forms). `@if`/`@foreach` give clean control-flow syntax inside HTML.",
            {
              label: "A Blade template",
              content: `{{-- resources/views/products/index.blade.php --}}
<h1>Products</h1>

@if (count($products) === 0)
    <p>No products yet.</p>
@else
    <ul>
    @foreach ($products as $product)
        <li>{{ $product->name }} — \${{ $product->price }}</li>
    @endforeach
    </ul>
@endif`,
            },
          ),
          callout("info", "{{ }} auto-escapes output — equivalent to htmlspecialchars() automatically, protecting against XSS by default, same concern as PHP Forms."),
          quiz(
            "What does {{ $product->name }} do differently from plain PHP's <?= $product->name ?>?",
            [
              "Nothing, they're identical",
              "{{ }} automatically escapes the output for safe HTML display, like an automatic htmlspecialchars()",
              "{{ }} is slower",
              "{{ }} only works with numbers",
            ],
            1,
            "Blade's {{ }} syntax compiles down to htmlspecialchars() automatically — you get XSS protection by default without remembering to call it yourself.",
          ),
        ],
        challenge: {
          title: "Simulate Blade's {{ }} Escaping",
          description: "Write an escape($value) function using htmlspecialchars() to simulate Blade's {{ }}. Use it on \"<script>bad</script>\" and echo the result.",
          starterCode: `${PHP_MAIN}function escape($value) {\n    // simulate {{ }} using htmlspecialchars\n\n}\n\necho escape("<script>bad</script>");`,
          solutionCode: `${PHP_MAIN}function escape($value) {\n    return htmlspecialchars($value);\n}\n\necho escape("<script>bad</script>");`,
          tests: [
            { id: 1, label: "Uses htmlspecialchars", keywords: [{ pattern: "htmlspecialchars" }] },
          ],
        },
      },
      {
        id: "laravel-5",
        title: "Layouts with @extends and @section",
        xp: 25,
        theory: [
          text(
            "Rather than repeating `<html><head>...` in every view, Blade lets child views `@extends` a shared layout and fill in named `@section`s — the layout defines `@yield` placeholders for that content.",
            {
              label: "Layout inheritance",
              content: `{{-- layouts/app.blade.php --}}
<html>
<head><title>@yield('title', 'My Site')</title></head>
<body>
    @yield('content')
</body>
</html>

{{-- products/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Products')

@section('content')
    <h1>Our Products</h1>
@endsection`,
            },
          ),
          quiz(
            "What does @yield('content') do in the layout file?",
            [
              "It stops the page from rendering",
              "It marks a placeholder that gets filled in by whatever @section('content') the child view provides",
              "It's a loop construct",
              "It defines a new route",
            ],
            1,
            "@yield defines where in the layout a section's content should be inserted — child views 'fill in the blanks' with @section, keeping the shared HTML skeleton (head, nav, footer) in one place.",
          ),
        ],
        challenge: {
          title: "Simulate Layout Inheritance",
          description: "Given a $layout template \"<html>{{content}}</html>\" and a $content of \"<h1>Products</h1>\", replace the {{content}} placeholder and echo the result.",
          starterCode: `${PHP_MAIN}$layout = "<html>{{content}}</html>";\n$content = "<h1>Products</h1>";\n\n// replace {{content}} with $content, echo the result`,
          solutionCode: `${PHP_MAIN}$layout = "<html>{{content}}</html>";\n$content = "<h1>Products</h1>";\n\necho str_replace("{{content}}", $content, $layout);`,
          tests: [
            { id: 1, label: "Uses str_replace to fill the placeholder", keywords: [{ pattern: "str_replace" }] },
          ],
        },
      },
      {
        id: "laravel-6",
        title: "Passing Data to Views",
        xp: 20,
        theory: [
          text(
            "Controllers pass data to Blade views via the `view()` helper's second argument — an associative array where each key becomes a variable available inside the template.",
            {
              label: "Passing data",
              content: `class ProductController extends Controller {
    public function index() {
        $products = Product::all();
        return view('products.index', [
            'products' => $products,
            'pageTitle' => 'All Products',
        ]);
        // in the Blade file: {{ $pageTitle }} and @foreach($products as ...)
    }
}`,
            },
          ),
          quiz(
            "In view('products.index', ['products' => $products]), how does the Blade template access $products?",
            [
              "It can't — you have to pass it globally",
              "The array key 'products' automatically becomes a $products variable available inside the view",
              "You need to call request()->get('products')",
              "Only through a special ViewData class",
            ],
            1,
            "Laravel automatically extracts each key in the data array into a variable with that name inside the compiled view — 'products' => $products becomes an accessible $products variable in the template.",
          ),
        ],
        challenge: {
          title: "Simulate Passing View Data",
          description: "Write a renderView($template, $data) function that replaces {{name}} in $template with $data['name']. Call it with \"Hello, {{name}}!\" and ['name' => 'Amy'].",
          starterCode: `${PHP_MAIN}function renderView($template, $data) {\n    // replace {{name}} with $data['name']\n\n}\n\necho renderView("Hello, {{name}}!", ['name' => 'Amy']);`,
          solutionCode: `${PHP_MAIN}function renderView($template, $data) {\n    return str_replace("{{name}}", $data['name'], $template);\n}\n\necho renderView("Hello, {{name}}!", ['name' => 'Amy']);`,
          tests: [
            { id: 1, label: "Uses the $data array", keywords: [{ pattern: "\\$data\\['name'\\]" }] },
          ],
        },
      },
      {
        id: "laravel-7",
        title: "Components & Includes",
        xp: 25,
        theory: [
          text(
            "For reusable UI pieces (a card, a button, a nav bar), Blade offers `@include` for simple partial views and **components** (`<x-alert>`) for reusable pieces that accept their own props.",
            {
              label: "Includes vs components",
              content: `{{-- Simple include --}}
@include('partials.nav')

{{-- A component with props --}}
<x-alert type="success" message="Saved!" />

{{-- resources/views/components/alert.blade.php --}}
<div class="alert alert-{{ $type }}">
    {{ $message }}
</div>`,
            },
          ),
          quiz(
            "When would you reach for a Blade component over a simple @include?",
            [
              "Components are always required",
              "When the reusable piece needs its own configurable props (like an alert's type and message), not just static shared markup",
              "@include doesn't work with HTML",
              "There's no real difference",
            ],
            1,
            "@include just pulls in another view's markup as-is. A component is more like a reusable function for UI — it accepts props/attributes to customize its output each time it's used.",
          ),
        ],
        challenge: {
          title: "Simulate a Reusable Component",
          description: "Write an alertComponent($type, $message) function returning \"<div class='alert alert-<type>'><message></div>\". Call it with \"success\", \"Saved!\" and echo the result.",
          starterCode: `${PHP_MAIN}function alertComponent($type, $message) {\n    // return the formatted alert HTML\n\n}\n\necho alertComponent("success", "Saved!");`,
          solutionCode: `${PHP_MAIN}function alertComponent($type, $message) {\n    return "<div class='alert alert-$type'>$message</div>";\n}\n\necho alertComponent("success", "Saved!");`,
          tests: [
            { id: 1, label: "Uses both parameters in the output", keywords: [{ pattern: "\\$type" }, { pattern: "\\$message" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Eloquent ORM
  // ─────────────────────────────────────────────────────────────
  {
    id: "eloquent-orm",
    title: "Eloquent ORM",
    icon: "🗃️",
    color: "#3b82f6",
    lessons: [
      {
        id: "laravel-8",
        title: "Models & Migrations",
        xp: 25,
        theory: [
          text(
            "An **Eloquent Model** represents a database table — one class per table, one instance per row. **Migrations** are version-controlled files that define your schema in PHP instead of raw SQL, so your whole team stays in sync.",
            {
              label: "A model and its migration",
              content: `// app/Models/Product.php
class Product extends Model {
    // Eloquent assumes table name "products" automatically
}

// database/migrations/xxxx_create_products_table.php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->decimal('price', 8, 2);
    $table->timestamps();
});`,
            },
          ),
          quiz(
            "By Laravel's naming convention, what table name does a 'Product' model map to automatically?",
            ["Product", "product", "products", "ProductTable"],
            2,
            "Eloquent conventionally maps a singular model name to its plural, snake_case table name — Product → products, OrderItem → order_items.",
          ),
        ],
        challenge: {
          title: "Simulate a Model's Table Name",
          description: "Write a function tableNameFor($modelName) that lowercases the model name and appends 's'. Call it with \"Product\" and echo the result.",
          starterCode: `${PHP_MAIN}function tableNameFor($modelName) {\n    // lowercase and pluralize with 's'\n\n}\n\necho tableNameFor("Product");`,
          solutionCode: `${PHP_MAIN}function tableNameFor($modelName) {\n    return strtolower($modelName) . "s";\n}\n\necho tableNameFor("Product");`,
          tests: [
            { id: 1, label: "Uses strtolower", keywords: [{ pattern: "strtolower" }] },
          ],
        },
      },
      {
        id: "laravel-9",
        title: "Querying with Eloquent",
        xp: 25,
        theory: [
          text(
            "Eloquent gives you a fluent, chainable query builder instead of raw SQL — `Product::where('price', '<', 50)->orderBy('name')->get()` reads almost like English, and compiles to real prepared-statement SQL under the hood.",
            {
              label: "Eloquent queries",
              content: `$cheapProducts = Product::where('price', '<', 50)
    ->orderBy('name')
    ->get();

$first = Product::where('name', 'Mouse')->first();

$product = Product::find(5); // find by primary key

$count = Product::where('in_stock', true)->count();`,
            },
          ),
          quiz(
            "What does Product::find(5) do?",
            [
              "Returns all products",
              "Finds and returns the single product with primary key 5, or null if not found",
              "Deletes product 5",
              "Counts 5 products",
            ],
            1,
            "find() is a shortcut for looking up a single row by its primary key — the Eloquent equivalent of the JDBC/PDO 'findById' pattern from earlier courses.",
          ),
        ],
        challenge: {
          title: "Simulate a Query Builder",
          description: "Given a plain array of products with 'name' and 'price', filter to those under $50 and sort by name. Echo the result as a comma-joined list of names.",
          starterCode: `${PHP_MAIN}$products = [\n    ["name" => "Mouse", "price" => 25],\n    ["name" => "Monitor", "price" => 200],\n    ["name" => "Cable", "price" => 10],\n];\n\n// filter price < 50, sort by name, echo names joined by ", "`,
          solutionCode: `${PHP_MAIN}$products = [\n    ["name" => "Mouse", "price" => 25],\n    ["name" => "Monitor", "price" => 200],\n    ["name" => "Cable", "price" => 10],\n];\n\n$cheap = array_filter($products, fn($p) => $p["price"] < 50);\nusort($cheap, fn($a, $b) => strcmp($a["name"], $b["name"]));\necho implode(", ", array_column($cheap, "name"));`,
          tests: [
            { id: 1, label: "Filters with array_filter", keywords: [{ pattern: "array_filter" }] },
            { id: 2, label: "Sorts with usort", keywords: [{ pattern: "usort" }] },
          ],
        },
      },
      {
        id: "laravel-10",
        title: "Relationships: hasMany & belongsTo",
        xp: 30,
        theory: [
          text(
            "Real data is relational — a User `hasMany` Orders, and each Order `belongsTo` a User. Defining these once on the model lets you traverse relationships as if they were plain properties: `$user->orders`.",
            {
              label: "Defining relationships",
              content: `class User extends Model {
    public function orders() {
        return $this->hasMany(Order::class);
    }
}

class Order extends Model {
    public function user() {
        return $this->belongsTo(User::class);
    }
}

$user = User::find(1);
foreach ($user->orders as $order) { // Eloquent loads them automatically
    echo $order->total;
}`,
            },
          ),
          quiz(
            "If a User hasMany Orders, what should the inverse relationship on Order be?",
            ["hasMany(User::class)", "belongsTo(User::class)", "hasOne(User::class)", "No inverse is needed"],
            1,
            "hasMany/belongsTo are always paired — the 'many' side (Order) belongsTo the 'one' side (User), matching a foreign key (user_id) on the orders table.",
          ),
        ],
        challenge: {
          title: "Simulate a hasMany Relationship",
          description: "Given $users and $orders arrays (orders have 'user_id'), write ordersFor($userId, $orders) filtering orders belonging to that user. Call it for user 1 and echo the count.",
          starterCode: `${PHP_MAIN}$orders = [\n    ["id" => 1, "user_id" => 1, "total" => 50],\n    ["id" => 2, "user_id" => 2, "total" => 30],\n    ["id" => 3, "user_id" => 1, "total" => 20],\n];\n\nfunction ordersFor($userId, $orders) {\n    // filter orders where user_id matches\n\n}\n\necho count(ordersFor(1, $orders));`,
          solutionCode: `${PHP_MAIN}$orders = [\n    ["id" => 1, "user_id" => 1, "total" => 50],\n    ["id" => 2, "user_id" => 2, "total" => 30],\n    ["id" => 3, "user_id" => 1, "total" => 20],\n];\n\nfunction ordersFor($userId, $orders) {\n    return array_filter($orders, fn($o) => $o["user_id"] === $userId);\n}\n\necho count(ordersFor(1, $orders));`,
          tests: [
            { id: 1, label: "Filters by user_id", keywords: [{ pattern: "user_id" }] },
          ],
        },
      },
      {
        id: "laravel-11",
        title: "Mass Assignment & $fillable",
        xp: 25,
        theory: [
          text(
            "`Product::create($request->all())` is convenient but dangerous — it would let a malicious request set ANY column, including ones you never intended (like `is_admin`). `$fillable` whitelists exactly which fields can be mass-assigned.",
            {
              label: "Protecting against mass assignment",
              content: `class Product extends Model {
    protected $fillable = ['name', 'price']; // ONLY these can be mass-assigned
}

// A malicious request body: {"name": "Mouse", "price": 25, "is_featured": true}
$product = Product::create($request->all());
// is_featured is silently ignored — it's not in $fillable`,
            },
          ),
          callout("warning", "Forgetting $fillable (or using $guarded = [] to disable protection entirely) is a classic Laravel security mistake — always whitelist explicitly."),
          quiz(
            "What problem does $fillable protect against?",
            [
              "SQL injection",
              "A malicious or unexpected request setting fields you never intended to be mass-assignable, like an admin flag",
              "Slow queries",
              "Missing required fields",
            ],
            1,
            "Without $fillable, Product::create($request->all()) would blindly accept every key in the request — an attacker could smuggle in fields like 'is_admin' => true if your table happened to have that column.",
          ),
        ],
        challenge: {
          title: "Simulate Mass Assignment Protection",
          description: "Given $fillable = ['name', 'price'] and $input containing an extra 'is_admin' key, write a function filtering $input to only $fillable keys, then echo the result as JSON-like via print_r replaced with implode of keys.",
          starterCode: `${PHP_MAIN}$fillable = ["name", "price"];\n$input = ["name" => "Mouse", "price" => 25, "is_admin" => true];\n\n// filter $input to only keys in $fillable, echo the resulting keys joined by ","`,
          solutionCode: `${PHP_MAIN}$fillable = ["name", "price"];\n$input = ["name" => "Mouse", "price" => 25, "is_admin" => true];\n\n$safe = array_intersect_key($input, array_flip($fillable));\necho implode(",", array_keys($safe));`,
          tests: [
            { id: 1, label: "Filters using $fillable", keywords: [{ pattern: "\\$fillable" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Middleware & Modern Laravel
  // ─────────────────────────────────────────────────────────────
  {
    id: "middleware-modern-laravel",
    title: "Middleware & Modern Laravel",
    icon: "🛡️",
    color: "#8b5cf6",
    lessons: [
      {
        id: "laravel-12",
        title: "Middleware",
        xp: 25,
        theory: [
          text(
            "**Middleware** runs code before (and/or after) a request reaches its route handler — perfect for cross-cutting concerns like authentication, logging, or rate limiting that apply to many routes at once.",
            {
              label: "Middleware in action",
              content: `class EnsureLoggedIn {
    public function handle($request, Closure $next) {
        if (!auth()->check()) {
            return redirect('/login');
        }
        return $next($request); // pass control to the next step
    }
}

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware('auth'); // this route requires the middleware first`,
            },
          ),
          quiz(
            "What does calling $next($request) inside a middleware's handle() method do?",
            [
              "Ends the request immediately",
              "Passes control forward — either to the next middleware in the chain, or to the route's actual handler",
              "Logs the request to a file",
              "Restarts the request from the beginning",
            ],
            1,
            "Middleware form a chain — each one decides whether to stop the request (e.g. redirect to login) or call $next() to let it continue toward the eventual controller.",
          ),
        ],
        challenge: {
          title: "Simulate Middleware",
          description: "Write a requireAuth($isLoggedIn, $next) function that calls $next() only if $isLoggedIn is true, else returns \"Redirect to login\". Call it with false.",
          starterCode: `${PHP_MAIN}function requireAuth($isLoggedIn, $next) {\n    // call $next() if logged in, else return "Redirect to login"\n\n}\n\n$result = requireAuth(false, fn() => "Dashboard");\necho $result;`,
          solutionCode: `${PHP_MAIN}function requireAuth($isLoggedIn, $next) {\n    if (!$isLoggedIn) {\n        return "Redirect to login";\n    }\n    return $next();\n}\n\n$result = requireAuth(false, fn() => "Dashboard");\necho $result;`,
          tests: [
            { id: 1, label: "Checks $isLoggedIn", keywords: [{ pattern: "\\$isLoggedIn" }] },
          ],
        },
      },
      {
        id: "laravel-13",
        title: "Form Requests & Validation",
        xp: 25,
        theory: [
          text(
            "Laravel's `validate()` (or dedicated **Form Request** classes) checks incoming data against rules before your controller logic even runs — similar to the validation patterns from PHP Forms, but declarative.",
            {
              label: "Validating a request",
              content: `public function store(Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'email' => 'required|email',
    ]);
    // if validation fails, Laravel auto-redirects back with errors —
    // this line only runs if $validated data passed every rule
    Product::create($validated);
}`,
            },
          ),
          quiz(
            "What happens if the incoming request fails one of the validate() rules?",
            [
              "The controller method continues running with invalid data",
              "Laravel automatically stops execution and returns validation errors — the rest of the controller method never runs",
              "It throws a fatal, uncatchable PHP error",
              "Nothing — validation is only a hint, not enforced",
            ],
            1,
            "validate() short-circuits the request on failure — Laravel handles returning a 422 response (API) or redirecting back with errors (web) automatically, so your controller code after it only runs with clean data.",
          ),
        ],
        challenge: {
          title: "Simulate Validation Rules",
          description: "Write a validate($data, $rules) simulating 'required' checks — given $data missing 'price', return an array of missing field names. Echo them joined by \",\".",
          starterCode: `${PHP_MAIN}$data = ["name" => "Mouse"];\n$rules = ["name", "price"];\n\nfunction validate($data, $rules) {\n    // return the fields in $rules missing from $data\n\n}\n\necho implode(",", validate($data, $rules));`,
          solutionCode: `${PHP_MAIN}$data = ["name" => "Mouse"];\n$rules = ["name", "price"];\n\nfunction validate($data, $rules) {\n    $missing = [];\n    foreach ($rules as $field) {\n        if (!isset($data[$field])) {\n            $missing[] = $field;\n        }\n    }\n    return $missing;\n}\n\necho implode(",", validate($data, $rules));`,
          tests: [
            { id: 1, label: "Checks isset for each rule", keywords: [{ pattern: "isset\\s*\\(\\s*\\$data" }] },
          ],
        },
      },
      {
        id: "laravel-14",
        title: "Route Model Binding",
        xp: 25,
        theory: [
          text(
            "Instead of manually looking up a model by the ID in a route parameter, Laravel's **route model binding** does it automatically — your controller method just receives the fully-loaded model.",
            {
              label: "Implicit route model binding",
              content: `// Without binding:
Route::get('/products/{id}', [ProductController::class, 'show']);
public function show($id) {
    $product = Product::findOrFail($id); // manual lookup every time
}

// With route model binding — Laravel does the lookup for you:
Route::get('/products/{product}', [ProductController::class, 'show']);
public function show(Product $product) {
    return $product; // already loaded! 404s automatically if not found
}`,
            },
          ),
          quiz(
            "What's the main benefit of route model binding?",
            [
              "It makes routes load faster",
              "It removes the repetitive 'look up this model by ID' boilerplate from every controller method that needs a single record",
              "It's required for all Laravel routes",
              "It replaces the need for a database",
            ],
            1,
            "Every 'show', 'edit', 'update', 'destroy' method needs to fetch a specific record by ID — binding automates that lookup (and the 404-if-missing behavior) so you don't repeat it everywhere.",
          ),
        ],
        challenge: {
          title: "Simulate Route Model Binding",
          description: "Write a resolveBinding($id, $products) that looks up a product by id in the array, or returns null. Simulate binding for id=2, echo the product's name or \"Not found\".",
          starterCode: `${PHP_MAIN}$products = [\n    ["id" => 1, "name" => "Mouse"],\n    ["id" => 2, "name" => "Keyboard"],\n];\n\nfunction resolveBinding($id, $products) {\n    // find the product with matching id, or return null\n\n}\n\n$product = resolveBinding(2, $products);\necho $product ? $product["name"] : "Not found";`,
          solutionCode: `${PHP_MAIN}$products = [\n    ["id" => 1, "name" => "Mouse"],\n    ["id" => 2, "name" => "Keyboard"],\n];\n\nfunction resolveBinding($id, $products) {\n    foreach ($products as $p) {\n        if ($p["id"] === $id) return $p;\n    }\n    return null;\n}\n\n$product = resolveBinding(2, $products);\necho $product ? $product["name"] : "Not found";`,
          tests: [
            { id: 1, label: "Loops to find a matching id", keywords: [{ pattern: "foreach\\s*\\(\\s*\\$products" }] },
          ],
        },
      },
      {
        id: "laravel-15",
        title: "Putting It Together: A Mini CRUD Resource",
        xp: 35,
        theory: [
          text(
            "Chapter capstone: combine routing, a controller, validation, and Eloquent-style querying into one small, realistic CRUD flow for a `Product` resource — the same shape as a real `Route::resource('products', ProductController::class)`.",
            {
              label: "A resource controller shape",
              content: `Route::resource('products', ProductController::class);
// generates: index, create, store, show, edit, update, destroy — all 7 routes

class ProductController extends Controller {
    public function index() { return Product::all(); }
    public function show(Product $product) { return $product; }
    public function store(Request $request) {
        $validated = $request->validate(['name' => 'required', 'price' => 'required|numeric']);
        return Product::create($validated);
    }
}`,
            },
          ),
          quiz(
            "What does Route::resource('products', ProductController::class) do in one line?",
            [
              "Creates a single route for the products page",
              "Generates all 7 conventional RESTful routes (index, show, store, update, destroy, etc.) pointing to matching controller methods",
              "Creates the products database table",
              "Validates all product data automatically",
            ],
            1,
            "Route::resource() is a shortcut that wires up the full standard REST route set in one call, following Laravel's naming conventions for each HTTP verb + method pairing.",
          ),
        ],
        challenge: {
          title: "Build a Mini CRUD Flow",
          description: "Implement a ProductController with a private $products array, index() returning all, store($name, $price) validating both are non-empty/positive before adding (return \"Invalid\" if not), and a call sequence: store(\"Mouse\", 25), then echo count of index().",
          starterCode: `${PHP_MAIN}class ProductController {\n    private $products = [];\n\n    public function index() {\n        return $this->products;\n    }\n\n    public function store($name, $price) {\n        // validate name is non-empty and price > 0, else return "Invalid"\n        // otherwise add ["name" => $name, "price" => $price] to $products\n\n    }\n}\n\n$controller = new ProductController();\n$controller->store("Mouse", 25);\necho count($controller->index());`,
          solutionCode: `${PHP_MAIN}class ProductController {\n    private $products = [];\n\n    public function index() {\n        return $this->products;\n    }\n\n    public function store($name, $price) {\n        if (empty($name) || $price <= 0) {\n            return "Invalid";\n        }\n        $this->products[] = ["name" => $name, "price" => $price];\n        return "Created";\n    }\n}\n\n$controller = new ProductController();\n$controller->store("Mouse", 25);\necho count($controller->index());`,
          tests: [
            { id: 1, label: "Validates before storing", keywords: [{ pattern: "empty\\s*\\(\\s*\\$name\\s*\\)" }] },
            { id: 2, label: "Adds to $products on success", keywords: [{ pattern: "\\$this->products\\[\\]" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Eloquent in Depth
  // ─────────────────────────────────────────────────────────────
  {
    id: "eloquent-in-depth",
    title: "Eloquent in Depth",
    icon: "🧠",
    color: "#10b981",
    lessons: [
      {
        id: "laravel-16",
        title: "Eager Loading with with()",
        xp: 25,
        theory: [
          text(
            "Relationships like `$post->author` are **lazy** by default: Eloquent runs a query the first time you touch them. Inside a loop over 50 posts that's 1 query for the posts plus 50 for the authors — the N+1 problem. `with('author')` **eager loads** the relationship: Eloquent fetches all the authors in one extra query and attaches them, so the loop runs no more queries.",
            {
              label: "Lazy vs eager loading",
              content: `// Lazy: 1 query for posts + 1 per post for its author
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name;
}

// Eager: 2 queries in total
$posts = Post::with('author')->get();

// Several relations, and nested ones with dot notation
$posts = Post::with(['author', 'comments.user'])->get();

// Already have the models? Load the relation afterwards
$posts->load('tags');

// In AppServiceProvider::boot() — fail loudly on lazy loading during development
Model::preventLazyLoading(! app()->isProduction());`,
            },
          ),
          callout("info", "Eager loading runs a query like SELECT * FROM users WHERE id IN (...) — the same batching technique the PHP MySQL course uses to fix N+1 by hand."),
          quiz(
            "How many queries does Post::with('author')->get() run for 30 posts?",
            [
              "1",
              "2",
              "30",
              "31",
            ],
            1,
            "One query loads the posts, then one query loads every needed author with WHERE id IN (...). The count stays at 2 however many posts there are.",
          ),
        ],
        challenge: {
          title: "Simulate Eager Loading",
          description: "Instead of calling findUser() once per post, collect the unique author ids with array_unique(array_column(...)), load them with one findUsers() call, and echo \"<title> by <name>\" per post, then \"queries: <n>\".",
          starterCode: `${PHP_MAIN}$queries = 1; // loading $posts was query #1\n$users = [1 => 'Amy', 2 => 'Ben'];\n$posts = [\n    ['title' => 'Routing 101', 'user_id' => 1],\n    ['title' => 'Blade Tips', 'user_id' => 2],\n    ['title' => 'Eloquent', 'user_id' => 1],\n];\n\nfunction findUser(int $id): string {\n    global $queries, $users;\n    $queries++;\n    return $users[$id];\n}\n\nfunction findUsers(array $ids): array {\n    global $queries, $users;\n    $queries++;\n    return array_intersect_key($users, array_flip($ids));\n}\n\n// Lazy version — replace with one findUsers() call\nforeach ($posts as $post) {\n    echo $post['title'] . " by " . findUser($post['user_id']) . "\\n";\n}\necho "queries: $queries";`,
          solutionCode: `${PHP_MAIN}$queries = 1; // loading $posts was query #1\n$users = [1 => 'Amy', 2 => 'Ben'];\n$posts = [\n    ['title' => 'Routing 101', 'user_id' => 1],\n    ['title' => 'Blade Tips', 'user_id' => 2],\n    ['title' => 'Eloquent', 'user_id' => 1],\n];\n\nfunction findUser(int $id): string {\n    global $queries, $users;\n    $queries++;\n    return $users[$id];\n}\n\nfunction findUsers(array $ids): array {\n    global $queries, $users;\n    $queries++;\n    return array_intersect_key($users, array_flip($ids));\n}\n\n$authors = findUsers(array_unique(array_column($posts, 'user_id')));\nforeach ($posts as $post) {\n    echo $post['title'] . " by " . $authors[$post['user_id']] . "\\n";\n}\necho "queries: $queries";`,
          tests: [
            { id: 1, label: "Collects unique author ids", keywords: [{ pattern: "array_unique\\s*\\(\\s*array_column\\s*\\(\\s*\\$posts\\s*,\\s*'user_id'\\s*\\)" }] },
            { id: 2, label: "Loads authors with one findUsers() call", keywords: [{ pattern: "findUsers\\s*\\(\\s*array_unique" }] },
            { id: 3, label: "No findUser() call inside the loop", keywords: [{ pattern: "^(?![\\s\\S]*\\bfindUser\\s*\\(\\s*\\$post)" }] },
          ],
        },
      },
      {
        id: "laravel-17",
        title: "Query Scopes",
        xp: 25,
        theory: [
          text(
            "When the same `where()` conditions appear all over your controllers — only published posts, only active users — move them onto the model as a **local scope**. A method named `scopePublished(Builder $query)` becomes a chainable `published()` call on the query builder. Scopes can take arguments too, and they compose with each other and with normal query methods.",
            {
              label: "Defining and chaining scopes",
              content: `use Illuminate\\Database\\Eloquent\\Builder;

class Post extends Model {
    public function scopePublished(Builder $query): void {
        $query->whereNotNull('published_at')
              ->where('published_at', '<=', now());
    }

    public function scopeInCategory(Builder $query, string $slug): void {
        $query->where('category', $slug);
    }
}

// Reads like a sentence, and every controller uses the same rule
$posts = Post::published()->inCategory('php')->latest()->get();`,
            },
          ),
          quiz(
            "You define scopePopular(Builder $query) on a model. How do you call it?",
            [
              "Post::scopePopular()->get()",
              "Post::popular()->get()",
              "Post::where('popular')->get()",
              "Post::scope('popular')->get()",
            ],
            1,
            "Eloquent strips the scope prefix and lower-cases the first letter, so scopePopular is called as popular(). Laravel passes the query builder in for you.",
          ),
        ],
        challenge: {
          title: "Build Chainable Scopes",
          description: "Complete PostQuery's published() and inCategory() so each filters $this->rows and returns $this for chaining. Echo the titles of published PHP posts joined by \", \".",
          starterCode: `${PHP_MAIN}class PostQuery {\n    public function __construct(private array $rows) {}\n\n    public function published(): static {\n        // keep rows where published is true\n\n    }\n\n    public function inCategory(string $category): static {\n        // keep rows in $category\n\n    }\n\n    public function titles(): array {\n        return array_column($this->rows, 'title');\n    }\n}\n\n$rows = [\n    ['title' => 'Traits', 'category' => 'php', 'published' => true],\n    ['title' => 'Drafted', 'category' => 'php', 'published' => false],\n    ['title' => 'Flexbox', 'category' => 'css', 'published' => true],\n    ['title' => 'Enums', 'category' => 'php', 'published' => true],\n];\n\necho implode(", ", (new PostQuery($rows))->published()->inCategory('php')->titles());`,
          solutionCode: `${PHP_MAIN}class PostQuery {\n    public function __construct(private array $rows) {}\n\n    public function published(): static {\n        $this->rows = array_filter($this->rows, fn($r) => $r['published']);\n        return $this;\n    }\n\n    public function inCategory(string $category): static {\n        $this->rows = array_filter($this->rows, fn($r) => $r['category'] === $category);\n        return $this;\n    }\n\n    public function titles(): array {\n        return array_column($this->rows, 'title');\n    }\n}\n\n$rows = [\n    ['title' => 'Traits', 'category' => 'php', 'published' => true],\n    ['title' => 'Drafted', 'category' => 'php', 'published' => false],\n    ['title' => 'Flexbox', 'category' => 'css', 'published' => true],\n    ['title' => 'Enums', 'category' => 'php', 'published' => true],\n];\n\necho implode(", ", (new PostQuery($rows))->published()->inCategory('php')->titles());`,
          tests: [
            { id: 1, label: "Filters the rows", keywords: [{ pattern: "array_filter\\s*\\(\\s*\\$this->rows" }] },
            { id: 2, label: "Returns $this for chaining", keywords: [{ pattern: "return\\s+\\$this\\s*;" }] },
          ],
        },
      },
      {
        id: "laravel-18",
        title: "Casts & Accessors",
        xp: 25,
        theory: [
          text(
            "Database columns arrive as simple values — `0`/`1`, JSON text, date strings. **Casts** convert them automatically: declare them in the model's `casts()` method (Laravel 11+; older versions use a `$casts` property) and `$user->is_admin` becomes a real boolean, `settings` a PHP array, `published_at` a Carbon date. An **accessor** adds a computed attribute: a method returning `Attribute::make(get: ...)` named `fullName` is read as `$user->full_name`.",
            {
              label: "Casting columns and computing attributes",
              content: `use Illuminate\\Database\\Eloquent\\Casts\\Attribute;

class User extends Model {
    protected function casts(): array {
        return [
            'is_admin' => 'boolean',
            'settings' => 'array',       // JSON column <-> PHP array
            'email_verified_at' => 'datetime',
        ];
    }

    protected function fullName(): Attribute {
        return Attribute::make(
            get: fn () => "{$this->first_name} {$this->last_name}",
        );
    }

    protected function email(): Attribute {
        return Attribute::make(
            set: fn (string $value) => strtolower($value), // a mutator
        );
    }
}

$user->is_admin;          // true, not "1"
$user->settings['theme']; // decoded from JSON
$user->full_name;         // "Amy Lee"`,
            },
          ),
          quiz(
            "What does the 'array' cast do for a settings column?",
            [
              "Splits the column on commas",
              "Decodes the stored JSON into a PHP array when reading, and encodes it back to JSON when saving",
              "Stores each array item in a separate row",
              "Validates that the column isn't empty",
            ],
            1,
            "The array cast handles json_decode on read and json_encode on write, so your code works with a normal PHP array and the database stores JSON text.",
          ),
        ],
        challenge: {
          title: "Cast Raw Column Values",
          description: "Complete castRow(): convert is_admin to bool, settings from JSON to an array (json_decode with true), and add a full_name built from first_name and last_name. Echo the full name, then \"admin\"/\"user\", then the theme setting, one per line.",
          starterCode: `${PHP_MAIN}$raw = [\n    'first_name' => 'Amy',\n    'last_name' => 'Lee',\n    'is_admin' => '1',\n    'settings' => '{"theme":"dark"}',\n];\n\nfunction castRow(array $row): array {\n    // cast is_admin and settings, add full_name\n\n    return $row;\n}\n\n$user = castRow($raw);\necho $user['full_name'] . "\\n";\necho ($user['is_admin'] === true ? "admin" : "user") . "\\n";\necho $user['settings']['theme'];`,
          solutionCode: `${PHP_MAIN}$raw = [\n    'first_name' => 'Amy',\n    'last_name' => 'Lee',\n    'is_admin' => '1',\n    'settings' => '{"theme":"dark"}',\n];\n\nfunction castRow(array $row): array {\n    $row['is_admin'] = (bool) $row['is_admin'];\n    $row['settings'] = json_decode($row['settings'], true);\n    $row['full_name'] = "{$row['first_name']} {$row['last_name']}";\n    return $row;\n}\n\n$user = castRow($raw);\necho $user['full_name'] . "\\n";\necho ($user['is_admin'] === true ? "admin" : "user") . "\\n";\necho $user['settings']['theme'];`,
          tests: [
            { id: 1, label: "Casts is_admin to bool", keywords: [{ pattern: "\\(bool\\)\\s*\\$row\\['is_admin'\\]|filter_var\\s*\\(\\s*\\$row\\['is_admin'\\]\\s*,\\s*FILTER_VALIDATE_BOOL" }] },
            { id: 2, label: "Decodes settings into an array", keywords: [{ pattern: "json_decode\\s*\\(\\s*\\$row\\['settings'\\]\\s*,\\s*true\\s*\\)" }] },
            { id: 3, label: "Adds full_name", keywords: [{ pattern: "\\$row\\['full_name'\\]\\s*=" }] },
          ],
        },
      },
      {
        id: "laravel-19",
        title: "Working with Collections",
        xp: 25,
        theory: [
          text(
            "Every `get()` returns an Eloquent **Collection** — a wrapper around an array with dozens of chainable methods: `filter`, `map`, `pluck`, `sum`, `groupBy`, `sortBy`, `first`. Each method returns a **new** collection, so chains read top to bottom without temporary variables. `collect([...])` wraps any plain array the same way.",
            {
              label: "Chaining collection methods",
              content: `$orders = Order::all();

$revenue = $orders
    ->where('status', 'paid')
    ->sum('total');

$topCustomers = $orders
    ->groupBy('customer_id')
    ->map(fn ($group) => $group->sum('total'))
    ->sortDesc()
    ->take(3);

$names = collect(['amy', 'ben'])
    ->map(fn ($n) => ucfirst($n))
    ->implode(', '); // "Amy, Ben"`,
            },
          ),
          callout("warning", "Collection methods run in PHP on rows already loaded. Order::all()->where(...) fetches every order first; Order::where(...)->get() filters in SQL. Filter in the query when the table is large."),
          quiz(
            "What's the difference between Order::where('status', 'paid')->get() and Order::all()->where('status', 'paid')?",
            [
              "There is no difference",
              "The first filters in the database; the second loads every order and filters the collection in PHP",
              "The second one is always faster",
              "The first returns an array, the second a collection",
            ],
            1,
            "Before get(), where() builds SQL. After all() or get(), you're holding a Collection and its where() filters in memory — fine for small sets, wasteful for big tables.",
          ),
        ],
        challenge: {
          title: "Build a Mini Collection",
          description: "Complete filter() and map() so each returns a NEW Collection (new static(...)) wrapping the result, keeping sum() as it is. Use them to sum the doubled prices of in-stock items and echo the total.",
          starterCode: `${PHP_MAIN}class Collection {\n    public function __construct(private array $items) {}\n\n    public function filter(callable $fn): static {\n        // return a new collection of matching items\n\n    }\n\n    public function map(callable $fn): static {\n        // return a new collection of transformed items\n\n    }\n\n    public function sum(): float {\n        return array_sum($this->items);\n    }\n}\n\n$items = [\n    ['price' => 10, 'in_stock' => true],\n    ['price' => 5, 'in_stock' => false],\n    ['price' => 7.5, 'in_stock' => true],\n];\n\necho (new Collection($items))\n    ->filter(fn($i) => $i['in_stock'])\n    ->map(fn($i) => $i['price'] * 2)\n    ->sum();`,
          solutionCode: `${PHP_MAIN}class Collection {\n    public function __construct(private array $items) {}\n\n    public function filter(callable $fn): static {\n        return new static(array_values(array_filter($this->items, $fn)));\n    }\n\n    public function map(callable $fn): static {\n        return new static(array_map($fn, $this->items));\n    }\n\n    public function sum(): float {\n        return array_sum($this->items);\n    }\n}\n\n$items = [\n    ['price' => 10, 'in_stock' => true],\n    ['price' => 5, 'in_stock' => false],\n    ['price' => 7.5, 'in_stock' => true],\n];\n\necho (new Collection($items))\n    ->filter(fn($i) => $i['in_stock'])\n    ->map(fn($i) => $i['price'] * 2)\n    ->sum();`,
          tests: [
            { id: 1, label: "filter() returns a new collection", keywords: [{ pattern: "new\\s+static\\s*\\([^;]*array_filter" }] },
            { id: 2, label: "map() returns a new collection", keywords: [{ pattern: "new\\s+static\\s*\\([^;]*array_map" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — APIs, Authorization & Testing
  // ─────────────────────────────────────────────────────────────
  {
    id: "apis-authorization-testing",
    title: "APIs, Authorization & Testing",
    icon: "🧪",
    color: "#ec4899",
    lessons: [
      {
        id: "laravel-20",
        title: "Named Routes & Route Groups",
        xp: 20,
        theory: [
          text(
            "Hard-coding URLs like `/admin/users/5/edit` in views breaks the moment a path changes. Give routes a **name** with `->name()` and build links with `route('name', $params)` — change the URI once and every link follows. **Route groups** share a URL prefix, middleware and name prefix across many routes, so an admin area is declared once.",
            {
              label: "Names and groups",
              content: `Route::get('/posts/{post}', [PostController::class, 'show'])
    ->name('posts.show');

// In a controller or Blade view:
route('posts.show', ['post' => 5]); // "http://your-app.test/posts/5"
redirect()->route('posts.show', $post);

Route::prefix('admin')
    ->middleware('auth')
    ->name('admin.')
    ->group(function () {
        Route::get('/users', [UserController::class, 'index'])
            ->name('users.index'); // URL /admin/users, name admin.users.index
    });`,
            },
          ),
          callout("info", "Route::resource() from the previous chapter names its seven routes for you: posts.index, posts.create, posts.store, posts.show, posts.edit, posts.update and posts.destroy."),
          quiz(
            "Inside Route::prefix('admin')->name('admin.')->group(...), a route is defined as Route::get('/reports', ...)->name('reports'). What are its URL and name?",
            [
              "/reports and reports",
              "/admin/reports and admin.reports",
              "/admin/reports and reports",
              "/reports and admin.reports",
            ],
            1,
            "The group's prefix is added to the URI and its name prefix is added to the route name, so the route answers /admin/reports and is referenced as admin.reports.",
          ),
        ],
        challenge: {
          title: "Build a route() Helper",
          description: "Complete route(): look up the named URI in $routes, replace each {key} with its value from $params (str_replace), and return the path. Echo route('posts.show', ['post' => 42]) and route('admin.users.edit', ['user' => 7]) on separate lines.",
          starterCode: `${PHP_MAIN}$routes = [\n    'posts.show' => '/posts/{post}',\n    'admin.users.edit' => '/admin/users/{user}/edit',\n];\n\nfunction route(array $routes, string $name, array $params = []): string {\n    // look up the URI and fill in each {key}\n\n}\n\necho route($routes, 'posts.show', ['post' => 42]) . "\\n";\necho route($routes, 'admin.users.edit', ['user' => 7]);`,
          solutionCode: `${PHP_MAIN}$routes = [\n    'posts.show' => '/posts/{post}',\n    'admin.users.edit' => '/admin/users/{user}/edit',\n];\n\nfunction route(array $routes, string $name, array $params = []): string {\n    $uri = $routes[$name];\n    foreach ($params as $key => $value) {\n        $uri = str_replace('{' . $key . '}', (string) $value, $uri);\n    }\n    return $uri;\n}\n\necho route($routes, 'posts.show', ['post' => 42]) . "\\n";\necho route($routes, 'admin.users.edit', ['user' => 7]);`,
          tests: [
            { id: 1, label: "Looks the route up by name", keywords: [{ pattern: "\\$routes\\[\\$name\\]" }] },
            { id: 2, label: "Fills parameters with str_replace", keywords: [{ pattern: "str_replace\\s*\\(" }] },
          ],
        },
      },
      {
        id: "laravel-21",
        title: "JSON APIs & API Resources",
        xp: 25,
        theory: [
          text(
            "Returning an array or a model from a route makes Laravel send it as JSON automatically, and `response()->json($data, 201)` sets the status code too. Returning models directly exposes every column, though. An **API Resource** (`php artisan make:resource UserResource`) is a transformation layer: its `toArray()` decides the public shape, and the response is wrapped in a `data` key. API routes live in `routes/api.php` (added in Laravel 11 with `php artisan install:api`) and get the `/api` prefix.",
            {
              label: "Shaping API output",
              content: `use Illuminate\\Http\\Request;
use Illuminate\\Http\\Resources\\Json\\JsonResource;

class UserResource extends JsonResource {
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'member_since' => $this->created_at->toDateString(),
        ]; // no password hash, no remember_token
    }
}

// routes/api.php
Route::get('/users/{user}', fn (User $user) => new UserResource($user));
Route::get('/users', fn () => UserResource::collection(User::paginate(20)));

Route::post('/users', function (Request $request) {
    $user = User::create($request->validate(['name' => 'required']));
    return response()->json(new UserResource($user), 201);
});
// GET /api/users/1 → {"data":{"id":1,"name":"Amy","member_since":"2026-01-04"}}`,
            },
          ),
          quiz(
            "Why return new UserResource($user) instead of the $user model itself?",
            [
              "Models can't be converted to JSON",
              "The resource defines exactly which fields the API exposes, so hidden or internal columns can't leak",
              "Resources make queries faster",
              "It's required for routes/api.php",
            ],
            1,
            "The resource is the API contract. Adding a column to the table no longer changes the API by accident, and fields can be renamed or formatted in one place.",
          ),
        ],
        challenge: {
          title: "Write a Resource Transformer",
          description: "Complete UserResource::toArray() to return only id, name and email_verified (true when email_verified_at isn't null). Echo json_encode(['data' => $resource->toArray()]).",
          starterCode: `${PHP_MAIN}class UserResource {\n    public function __construct(private array $user) {}\n\n    public function toArray(): array {\n        // expose only id, name and email_verified\n\n    }\n}\n\n$user = [\n    'id' => 1,\n    'name' => 'Amy',\n    'password' => '$2y$10$abc...',\n    'email_verified_at' => '2026-01-04 10:00:00',\n];\n\n$resource = new UserResource($user);\necho json_encode(['data' => $resource->toArray()]);`,
          solutionCode: `${PHP_MAIN}class UserResource {\n    public function __construct(private array $user) {}\n\n    public function toArray(): array {\n        return [\n            'id' => $this->user['id'],\n            'name' => $this->user['name'],\n            'email_verified' => $this->user['email_verified_at'] !== null,\n        ];\n    }\n}\n\n$user = [\n    'id' => 1,\n    'name' => 'Amy',\n    'password' => '$2y$10$abc...',\n    'email_verified_at' => '2026-01-04 10:00:00',\n];\n\n$resource = new UserResource($user);\necho json_encode(['data' => $resource->toArray()]);`,
          tests: [
            { id: 1, label: "Returns id and name", keywords: [{ pattern: "'id'\\s*=>\\s*\\$this->user\\['id'\\]" }, { pattern: "'name'\\s*=>\\s*\\$this->user\\['name'\\]" }] },
            { id: 2, label: "Derives email_verified", keywords: [{ pattern: "'email_verified'\\s*=>" }] },
            { id: 3, label: "Never exposes the password", keywords: [{ pattern: "^(?![\\s\\S]*=>\\s*\\$this->user\\['password'\\])" }] },
          ],
        },
      },
      {
        id: "laravel-22",
        title: "Authorization with Gates & Policies",
        xp: 25,
        theory: [
          text(
            "Middleware decides whether someone is logged in; **authorization** decides whether *this* user may act on *this* record. A **Gate** is a closure for a one-off check. A **Policy** (`php artisan make:policy PostPolicy --model=Post`) groups the rules for one model into methods like `update()` and `delete()`. Laravel finds `PostPolicy` for `Post` by naming convention, and `Gate::authorize()` throws a 403 when a check fails.",
            {
              label: "Policies in controllers and views",
              content: `class PostPolicy {
    public function update(User $user, Post $post): bool {
        return $user->id === $post->user_id;
    }

    public function delete(User $user, Post $post): bool {
        return $user->id === $post->user_id || $user->is_admin;
    }
}

// A one-off gate, e.g. in AppServiceProvider::boot()
Gate::define('view-reports', fn (User $user) => $user->is_admin);

class PostController extends Controller {
    public function update(Request $request, Post $post) {
        Gate::authorize('update', $post); // 403 if the policy returns false
        $post->update($request->validate(['title' => 'required']));
        return redirect()->route('posts.show', $post);
    }
}

// Blade
// @can('delete', $post) <button>Delete</button> @endcan`,
            },
          ),
          diagram("Where each check lives", [
            { id: "mw", label: "Middleware", color: "#8b5cf6", items: ["Is anyone logged in?", "Applies to whole routes"] },
            { id: "policy", label: "Policy", color: "#ec4899", items: ["May this user change this record?", "One class per model"] },
          ]),
          quiz(
            "What happens when Gate::authorize('update', $post) finds the policy returns false?",
            [
              "It returns false and the controller continues",
              "It throws an authorization exception, which Laravel turns into a 403 Forbidden response",
              "It logs the user out",
              "It redirects to the home page",
            ],
            1,
            "authorize() stops the request by throwing an AuthorizationException, rendered as 403. Use Gate::allows() instead when you want a boolean to branch on.",
          ),
        ],
        challenge: {
          title: "Write a Post Policy",
          description: "Complete PostPolicy: update() allows only the post's owner; delete() allows the owner or an admin. Echo the four results as \"yes\"/\"no\" on one line separated by spaces: ben update, ben delete, admin update, admin delete.",
          starterCode: `${PHP_MAIN}class PostPolicy {\n    public function update(array $user, array $post): bool {\n        // owner only\n\n    }\n\n    public function delete(array $user, array $post): bool {\n        // owner or admin\n\n    }\n}\n\n$policy = new PostPolicy();\n$post = ['id' => 9, 'user_id' => 2];\n$ben = ['id' => 2, 'is_admin' => false];\n$admin = ['id' => 1, 'is_admin' => true];\n\n$results = [\n    $policy->update($ben, $post),\n    $policy->delete($ben, $post),\n    $policy->update($admin, $post),\n    $policy->delete($admin, $post),\n];\necho implode(" ", array_map(fn($ok) => $ok ? "yes" : "no", $results));`,
          solutionCode: `${PHP_MAIN}class PostPolicy {\n    public function update(array $user, array $post): bool {\n        return $user['id'] === $post['user_id'];\n    }\n\n    public function delete(array $user, array $post): bool {\n        return $user['id'] === $post['user_id'] || $user['is_admin'];\n    }\n}\n\n$policy = new PostPolicy();\n$post = ['id' => 9, 'user_id' => 2];\n$ben = ['id' => 2, 'is_admin' => false];\n$admin = ['id' => 1, 'is_admin' => true];\n\n$results = [\n    $policy->update($ben, $post),\n    $policy->delete($ben, $post),\n    $policy->update($admin, $post),\n    $policy->delete($admin, $post),\n];\necho implode(" ", array_map(fn($ok) => $ok ? "yes" : "no", $results));`,
          tests: [
            { id: 1, label: "Compares the user with the post owner", keywords: [{ pattern: "\\$user\\['id'\\]\\s*===?\\s*\\$post\\['user_id'\\]" }] },
            { id: 2, label: "delete() also allows admins", keywords: [{ pattern: "\\|\\|\\s*\\$user\\['is_admin'\\]|\\$user\\['is_admin'\\]\\s*\\|\\|" }] },
          ],
        },
      },
      {
        id: "laravel-23",
        title: "Feature Tests",
        xp: 30,
        theory: [
          text(
            "A **feature test** sends a fake HTTP request through your whole app — routes, middleware, controller, database — and asserts on the response. Laravel's test case gives you `$this->get()`/`post()`, `actingAs($user)` to log in, and assertions like `assertOk()`, `assertRedirect()` and `assertDatabaseHas()`. The `RefreshDatabase` trait resets the database for each test, and `php artisan test` runs the suite. New Laravel apps can use Pest instead of PHPUnit; the assertions are the same.",
            {
              label: "Testing a protected route",
              content: `use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Tests\\TestCase;

class PostTest extends TestCase {
    use RefreshDatabase;

    public function test_guests_are_redirected_to_login(): void {
        $this->get('/posts/create')->assertRedirect('/login');
    }

    public function test_users_can_create_posts(): void {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/posts', ['title' => 'Hello'])
            ->assertRedirect();

        $this->assertDatabaseHas('posts', ['title' => 'Hello', 'user_id' => $user->id]);
    }

    public function test_title_is_required(): void {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/posts', ['title' => ''])
            ->assertSessionHasErrors('title');
    }
}`,
            },
          ),
          callout("info", "Test the behaviour a user sees — who can reach a page, what gets saved, which errors appear — rather than private methods. Those tests keep passing when you refactor the internals."),
          quiz(
            "What does the RefreshDatabase trait give each test?",
            [
              "A copy of the production database",
              "A clean database state, so data created by one test can't affect another",
              "Faster HTTP requests",
              "Automatic login as an admin",
            ],
            1,
            "RefreshDatabase migrates the test database and wraps each test in a transaction that is rolled back, so every test starts from the same known state.",
          ),
        ],
        challenge: {
          title: "Assert on a Fake Response",
          description: "Complete assertStatus() and assertRedirect() so they throw an Exception with a helpful message when the response doesn't match. Run the two checks inside try/catch and echo \"PASS\" or \"FAIL: <message>\".",
          starterCode: `${PHP_MAIN}function handle(string $method, string $uri, ?array $user): array {\n    if ($uri === '/posts/create' && $user === null) {\n        return ['status' => 302, 'location' => '/login'];\n    }\n    return ['status' => 200, 'location' => null];\n}\n\nfunction assertStatus(array $response, int $expected): void {\n    // throw an Exception if the status differs\n\n}\n\nfunction assertRedirect(array $response, string $to): void {\n    // throw an Exception unless status is 302 and location matches\n\n}\n\ntry {\n    assertRedirect(handle('GET', '/posts/create', null), '/login');\n    assertStatus(handle('GET', '/posts/create', ['id' => 1]), 200);\n    echo "PASS";\n} catch (Exception $e) {\n    echo "FAIL: " . $e->getMessage();\n}`,
          solutionCode: `${PHP_MAIN}function handle(string $method, string $uri, ?array $user): array {\n    if ($uri === '/posts/create' && $user === null) {\n        return ['status' => 302, 'location' => '/login'];\n    }\n    return ['status' => 200, 'location' => null];\n}\n\nfunction assertStatus(array $response, int $expected): void {\n    if ($response['status'] !== $expected) {\n        throw new Exception("Expected status $expected, got {$response['status']}");\n    }\n}\n\nfunction assertRedirect(array $response, string $to): void {\n    assertStatus($response, 302);\n    if ($response['location'] !== $to) {\n        throw new Exception("Expected redirect to $to, got {$response['location']}");\n    }\n}\n\ntry {\n    assertRedirect(handle('GET', '/posts/create', null), '/login');\n    assertStatus(handle('GET', '/posts/create', ['id' => 1]), 200);\n    echo "PASS";\n} catch (Exception $e) {\n    echo "FAIL: " . $e->getMessage();\n}`,
          tests: [
            { id: 1, label: "Throws when an assertion fails", keywords: [{ pattern: "throw\\s+new\\s+Exception\\s*\\(" }] },
            { id: 2, label: "Checks the status code", keywords: [{ pattern: "\\$response\\['status'\\]\\s*!==?" }] },
            { id: 3, label: "Checks the redirect location", keywords: [{ pattern: "\\$response\\['location'\\]\\s*!==?\\s*\\$to" }] },
          ],
        },
      },
    ],
  },
];

export const LARAVEL_BASICS_LESSONS = LARAVEL_BASICS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const LARAVEL_BASICS_TOTAL_XP = LARAVEL_BASICS_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);
