// PolyCode — Laravel Basics interactive course
// 4 chapters · 16 lessons · server/browser PHP challenges
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
            "Final lesson: combine routing, a controller, validation, and Eloquent-style querying into one small, realistic CRUD flow for a `Product` resource — the same shape as a real `Route::resource('products', ProductController::class)`.",
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
