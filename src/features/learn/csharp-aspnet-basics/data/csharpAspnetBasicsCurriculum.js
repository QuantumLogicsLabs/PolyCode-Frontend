// PolyCode — C# ASP.NET Basics Interactive Course
// 6 chapters · 12 lessons · Pattern/theory-focused (ASP.NET needs a real web server,
// so this course follows the same un-runnable-content approach as Quantum Mechanics —
// challenges are graded on code patterns, not live execution)

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

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

const RAW_CSHARP_ASPNET_BASICS_CHAPTERS = [
  {
    id: "aspnet-fundamentals",
    title: "ASP.NET Core Fundamentals",
    icon: "🌐",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-0",
        title: "What is ASP.NET Core?",
        xp: 12,
        theory: [
          text(
            "**ASP.NET Core** is Microsoft's open-source, cross-platform framework for building web apps and APIs in C#. A minimal ASP.NET Core app can be just a few lines using **Minimal APIs**.",
            {
              label: "A minimal ASP.NET Core app",
              content: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, PolyCode!");

app.Run();`,
            },
          ),
          text(
            "`WebApplication.CreateBuilder` sets up configuration, logging, and dependency injection. `app.MapGet` registers a route. `app.Run()` starts listening for requests.",
          ),
          callout(
            "note",
            "This course covers the **patterns and syntax** of ASP.NET Core. Since it needs a real web server, challenges are checked by matching the shape of your code rather than running a live server in the browser.",
          ),
          quiz(
            "What does app.MapGet(\"/\", () => \"Hello\") do?",
            [
              "Defines a database migration",
              "Registers a route that responds to GET requests at \"/\"",
              "Starts the server immediately",
              "Configures logging",
            ],
            1,
            "MapGet registers an HTTP GET endpoint at the given route, with the lambda as its handler.",
          ),
        ],
        challenge: {
          title: "Hello World API",
          description:
            "Set up a minimal ASP.NET Core app: create the builder, build the app, map a GET route at `\"/\"` that returns `\"Hello, PolyCode!\"`, then call `app.Run()`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Map a GET route at "/" returning "Hello, PolyCode!"


// Start the app
`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello, PolyCode!");

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Creates the builder",
              keywords: [{ pattern: "WebApplication\\.CreateBuilder" }],
            },
            {
              id: 2,
              label: "Maps a GET route",
              keywords: [{ pattern: "app\\.MapGet\\(\"/\"" }],
            },
            {
              id: 3,
              label: "Calls app.Run()",
              keywords: [{ pattern: "app\\.Run\\(\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-1",
        title: "Routing and HTTP Verbs",
        xp: 13,
        theory: [
          text(
            "ASP.NET Core maps each HTTP verb to its own method: `MapGet`, `MapPost`, `MapPut`, `MapDelete`. Route parameters are captured with `{curly braces}` in the path.",
            {
              label: "Routes for each HTTP verb",
              content: `app.MapGet("/products/{id}", (int id) => $"Product {id}");
app.MapPost("/products", (Product p) => Results.Created($"/products/{p.Id}", p));
app.MapPut("/products/{id}", (int id, Product p) => Results.Ok(p));
app.MapDelete("/products/{id}", (int id) => Results.NoContent());`,
            },
          ),
          diagram("REST Verbs", [
            {
              id: "get",
              label: "GET",
              color: ACCENT,
              items: ["Read data", "No body"],
            },
            {
              id: "post",
              label: "POST",
              color: "#3b82f6",
              items: ["Create data", "Has body"],
            },
            {
              id: "put",
              label: "PUT",
              color: "#f59e0b",
              items: ["Replace/update", "Has body"],
            },
            {
              id: "delete",
              label: "DELETE",
              color: "#ef4444",
              items: ["Remove data", "No body"],
            },
          ]),
          quiz(
            "In app.MapGet(\"/products/{id}\", (int id) => ...), what does {id} do?",
            [
              "Nothing, it's just documentation",
              "Captures a route segment and binds it to the id parameter",
              "Forces the route to require authentication",
              "Sets a default value for id",
            ],
            1,
            "Route parameters in {curly braces} are bound automatically to matching handler parameters by name and type.",
          ),
        ],
        challenge: {
          title: "CRUD Routes for /tasks",
          description:
            "Add four routes for a `/tasks` resource: `MapGet(\"/tasks/{id}\")`, `MapPost(\"/tasks\")`, `MapPut(\"/tasks/{id}\")`, and `MapDelete(\"/tasks/{id}\")`. Handler bodies can be minimal.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add MapGet, MapPost, MapPut, MapDelete for /tasks


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/tasks/{id}", (int id) => $"Task {id}");
app.MapPost("/tasks", (Task t) => Results.Created($"/tasks/{t.Id}", t));
app.MapPut("/tasks/{id}", (int id, Task t) => Results.Ok(t));
app.MapDelete("/tasks/{id}", (int id) => Results.NoContent());

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Maps GET /tasks/{id}",
              keywords: [{ pattern: "MapGet\\(\"/tasks/\\{id\\}\"" }],
            },
            {
              id: 2,
              label: "Maps POST /tasks",
              keywords: [{ pattern: "MapPost\\(\"/tasks\"" }],
            },
            {
              id: 3,
              label: "Maps DELETE /tasks/{id}",
              keywords: [{ pattern: "MapDelete\\(\"/tasks/\\{id\\}\"" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "building-apis",
    title: "Building APIs",
    icon: "🔌",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-2",
        title: "Model Binding and DTOs",
        xp: 14,
        theory: [
          text(
            "A **DTO** (Data Transfer Object) is a plain class describing the shape of data sent to or from an endpoint. ASP.NET Core automatically deserializes JSON request bodies into a matching DTO — this is **model binding**.",
            {
              label: "Defining and using a DTO",
              content: `public class CreateProductRequest {
    public string Name { get; set; }
    public decimal Price { get; set; }
}

app.MapPost("/products", (CreateProductRequest req) => {
    return Results.Created("/products/1", new { req.Name, req.Price });
});`,
            },
          ),
          callout(
            "tip",
            "Properties use `{ get; set; }` — these are **auto-properties**, a shorthand for defining simple public fields with getters and setters.",
          ),
          quiz(
            "What is a DTO used for in a minimal API?",
            [
              "Connecting to the database directly",
              "Describing the shape of request/response data so it can be bound automatically",
              "Replacing the need for routes",
              "Handling authentication only",
            ],
            1,
            "A DTO defines the expected JSON shape. ASP.NET Core's model binding uses it to convert incoming JSON into a typed C# object automatically.",
          ),
        ],
        challenge: {
          title: "Create a Comment DTO",
          description:
            "Define a `CreateCommentRequest` class with `string Author` and `string Text` auto-properties. Then add a `MapPost(\"/comments\")` route that accepts a `CreateCommentRequest` and returns `Results.Created`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Define CreateCommentRequest with Author and Text


// Add the POST /comments route


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

public class CreateCommentRequest {
    public string Author { get; set; }
    public string Text { get; set; }
}

app.MapPost("/comments", (CreateCommentRequest req) => {
    return Results.Created("/comments/1", req);
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Defines CreateCommentRequest class",
              keywords: [{ pattern: "class\\s+CreateCommentRequest" }],
            },
            {
              id: 2,
              label: "Has Author and Text auto-properties",
              keywords: [{ pattern: "Author\\s*\\{\\s*get;\\s*set;\\s*\\}" }],
            },
            {
              id: 3,
              label: "Maps POST /comments",
              keywords: [{ pattern: "MapPost\\(\"/comments\"" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-3",
        title: "Returning Results and Status Codes",
        xp: 13,
        theory: [
          text(
            "The `Results` class provides helpers for returning proper HTTP responses with the right status code — instead of just returning raw data.",
            {
              label: "Common Results helpers",
              content: `app.MapGet("/products/{id}", (int id) => {
    var product = FindProduct(id);
    if (product == null) return Results.NotFound();
    return Results.Ok(product);
});

app.MapPost("/products", (Product p) =>
    Results.Created($"/products/{p.Id}", p));`,
            },
          ),
          diagram("Common Status Codes", [
            {
              id: "200",
              label: "200 OK",
              color: ACCENT,
              items: ["Results.Ok()", "Successful GET/PUT"],
            },
            {
              id: "201",
              label: "201 Created",
              color: "#3b82f6",
              items: ["Results.Created()", "Successful POST"],
            },
            {
              id: "404",
              label: "404 Not Found",
              color: "#f59e0b",
              items: ["Results.NotFound()", "Resource missing"],
            },
          ]),
          quiz(
            "Which Results helper should you return when a POST request successfully creates a new resource?",
            [
              "Results.Ok()",
              "Results.NotFound()",
              "Results.Created()",
              "Results.NoContent()",
            ],
            2,
            "Results.Created() returns a 201 status along with the location of the newly created resource — the conventional response for a successful POST.",
          ),
        ],
        challenge: {
          title: "Handle Missing Product",
          description:
            "Write a `MapGet(\"/products/{id}\")` handler. If `id` equals `0`, return `Results.NotFound()`. Otherwise, return `Results.Ok($\"Product {id}\")`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add the GET /products/{id} route with NotFound handling


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/products/{id}", (int id) => {
    if (id == 0) return Results.NotFound();
    return Results.Ok($"Product {id}");
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Maps GET /products/{id}",
              keywords: [{ pattern: "MapGet\\(\"/products/\\{id\\}\"" }],
            },
            {
              id: 2,
              label: "Returns Results.NotFound()",
              keywords: [{ pattern: "Results\\.NotFound\\(\\)" }],
            },
            {
              id: 3,
              label: "Returns Results.Ok()",
              keywords: [{ pattern: "Results\\.Ok\\(" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "di-middleware",
    title: "Dependency Injection & Middleware",
    icon: "🧱",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-4",
        title: "Dependency Injection Basics",
        xp: 15,
        theory: [
          text(
            "ASP.NET Core has a built-in **dependency injection (DI)** container. You register a service once with `builder.Services`, and the framework automatically supplies it wherever it's needed — including directly in route handlers.",
            {
              label: "Registering and injecting a service",
              content: `public interface IGreeter {
    string Greet(string name);
}

public class Greeter : IGreeter {
    public string Greet(string name) => $"Hello, {name}!";
}

// Registration
builder.Services.AddSingleton<IGreeter, Greeter>();

// Injection — ASP.NET Core supplies IGreeter automatically
app.MapGet("/greet/{name}", (string name, IGreeter greeter) =>
    greeter.Greet(name));`,
            },
          ),
          callout(
            "tip",
            "`AddSingleton` creates one shared instance for the whole app's lifetime. `AddScoped` creates one per request, and `AddTransient` creates a new one every time it's injected.",
          ),
          quiz(
            "What does builder.Services.AddSingleton<IGreeter, Greeter>() do?",
            [
              "Deletes the Greeter class",
              "Registers Greeter as the implementation to inject wherever IGreeter is requested, shared app-wide",
              "Creates a new Greeter for every request",
              "Registers a new HTTP route",
            ],
            1,
            "AddSingleton registers Greeter as the concrete type ASP.NET Core provides whenever an IGreeter is requested, with exactly one shared instance for the app's lifetime.",
          ),
        ],
        challenge: {
          title: "Inject a Logger Service",
          description:
            "Define an `ILogger` interface with `void Log(string message)`, and a `ConsoleLogger` class implementing it. Register it with `builder.Services.AddSingleton<ILogger, ConsoleLogger>()`, then use it in a `MapGet(\"/ping\")` route that calls `logger.Log(\"ping\")` and returns `\"pong\"`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);

// Define ILogger and ConsoleLogger


// Register the service


var app = builder.Build();

// Add GET /ping that logs and returns "pong"


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);

public interface ILogger {
    void Log(string message);
}

public class ConsoleLogger : ILogger {
    public void Log(string message) => Console.WriteLine(message);
}

builder.Services.AddSingleton<ILogger, ConsoleLogger>();

var app = builder.Build();

app.MapGet("/ping", (ILogger logger) => {
    logger.Log("ping");
    return "pong";
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Defines ILogger interface",
              keywords: [{ pattern: "interface\\s+ILogger" }],
            },
            {
              id: 2,
              label: "Registers the service with AddSingleton",
              keywords: [{ pattern: "AddSingleton<ILogger,\\s*ConsoleLogger>" }],
            },
            {
              id: 3,
              label: "Injects ILogger in the route handler",
              keywords: [{ pattern: "MapGet\\(\"/ping\",\\s*\\(ILogger\\s+logger\\)" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-5",
        title: "The Middleware Pipeline",
        xp: 14,
        theory: [
          text(
            "Every request flows through a **middleware pipeline** — a chain of components that can inspect, modify, short-circuit, or log requests before they reach your route handlers. Order matters: middleware runs in the order it's added.",
            {
              label: "A simple logging middleware",
              content: `var app = builder.Build();

app.Use(async (context, next) => {
    Console.WriteLine($"Request: {context.Request.Path}");
    await next(); // pass control to the next middleware
    Console.WriteLine($"Response: {context.Response.StatusCode}");
});

app.MapGet("/", () => "Hello!");

app.Run();`,
            },
          ),
          diagram("Request Pipeline", [
            {
              id: "logging",
              label: "Logging middleware",
              color: ACCENT,
              items: ["Runs first", "Logs the request"],
            },
            {
              id: "auth",
              label: "Auth middleware",
              color: "#3b82f6",
              items: ["Runs next", "Checks credentials"],
            },
            {
              id: "handler",
              label: "Route handler",
              color: "#f59e0b",
              items: ["Runs last", "Produces the response"],
            },
          ]),
          callout(
            "warn",
            "Forgetting to call `await next()` inside a middleware **stops the pipeline** — the request never reaches later middleware or the route handler.",
          ),
          quiz(
            "What happens if a middleware doesn't call await next()?",
            [
              "Nothing changes, next() is optional",
              "The pipeline short-circuits — later middleware and the route handler never run",
              "It throws a compile error",
              "It automatically calls the route handler anyway",
            ],
            1,
            "Skipping next() stops the request from reaching anything registered after that middleware — this is sometimes intentional (e.g. to reject unauthorized requests early), but easy to do by accident.",
          ),
        ],
        challenge: {
          title: "Add a Logging Middleware",
          description:
            "Use `app.Use(async (context, next) => { ... })` to log the request path with `Console.WriteLine(context.Request.Path)` before calling `await next()`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add a logging middleware here


app.MapGet("/", () => "Hello!");

app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.Use(async (context, next) => {
    Console.WriteLine(context.Request.Path);
    await next();
});

app.MapGet("/", () => "Hello!");

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Uses app.Use with async middleware",
              keywords: [{ pattern: "app\\.Use\\(async\\s*\\(context,\\s*next\\)" }],
            },
            {
              id: 2,
              label: "Logs the request path",
              keywords: [{ pattern: "context\\.Request\\.Path" }],
            },
            {
              id: 3,
              label: "Calls await next()",
              keywords: [{ pattern: "await\\s+next\\(\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "configuration-environments",
    title: "Configuration & Environments",
    icon: "⚙️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-6",
        title: "appsettings.json & IConfiguration",
        xp: 15,
        theory: [
          text(
            "Connection strings, API keys and feature flags do not belong in source code. ASP.NET Core reads them from **`appsettings.json`** and exposes them through `IConfiguration`.",
            {
              label: "A typical appsettings.json",
              content: `{
    "ConnectionStrings": {
        "Default": "Server=localhost;Database=Shop;"
    },
    "Api": {
        "PageSize": 20,
        "Title": "Shop API"
    }
}`,
            },
          ),
          text(
            "Read values with a colon-separated key path. `builder.Configuration` is available before the app is built, which is where most wiring happens.",
            {
              label: "Reading configuration",
              content: `var builder = WebApplication.CreateBuilder(args);

string conn = builder.Configuration.GetConnectionString("Default");
int pageSize = builder.Configuration.GetValue<int>("Api:PageSize");

var app = builder.Build();

app.MapGet("/config", (IConfiguration config) => config["Api:Title"]);

app.Run();`,
            },
          ),
          text(
            "Configuration is layered. Each source below overrides the one above it for the same key, so a server environment variable beats whatever is committed in the file.",
          ),
          diagram("Configuration precedence (last wins)", [
            {
              id: "appsettings",
              label: "appsettings.json",
              color: "#94a3b8",
              items: ["Committed defaults"],
            },
            {
              id: "envfile",
              label: "appsettings.{Environment}.json",
              color: "#0ea5e9",
              items: ["Per-environment overrides"],
            },
            {
              id: "secrets",
              label: "User Secrets",
              color: "#a855f7",
              items: ["Local dev only", "Never committed"],
            },
            {
              id: "envvars",
              label: "Environment variables",
              color: ACCENT,
              items: ["Production values", "Highest priority"],
            },
          ]),
          callout(
            "warning",
            "Never commit real secrets to `appsettings.json` — it ships with your source. Use `dotnet user-secrets` locally and environment variables in production.",
          ),
          quiz(
            "A key exists in both `appsettings.json` and an environment variable. Which value wins?",
            [
              "appsettings.json — files are more specific",
              "The environment variable — it is registered later",
              "Whichever was set first",
              "The app throws on the duplicate key",
            ],
            1,
            "Configuration providers are layered in registration order and later providers override earlier ones, so environment variables beat the JSON file.",
          ),
        ],
        challenge: {
          title: "Read a Config Value",
          description:
            "Read the connection string named `\"Default\"` into a `conn` variable using `builder.Configuration.GetConnectionString`, and map a `GET /title` route whose handler takes `IConfiguration config` and returns `config[\"Api:Title\"]`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);

// Read the "Default" connection string


var app = builder.Build();

// Map GET /title returning the Api:Title setting


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);

string conn = builder.Configuration.GetConnectionString("Default");

var app = builder.Build();

app.MapGet("/title", (IConfiguration config) => config["Api:Title"]);

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Reads the Default connection string",
              keywords: [{ pattern: "GetConnectionString\\(\"Default\"\\)" }],
            },
            {
              id: 2,
              label: "Maps GET /title",
              keywords: [{ pattern: "MapGet\\(\"/title\"" }],
            },
            {
              id: 3,
              label: "Reads the Api:Title key",
              keywords: [{ pattern: "Api:Title" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-7",
        title: "Environments & the Options Pattern",
        xp: 15,
        theory: [
          text(
            "ASP.NET Core reads the `ASPNETCORE_ENVIRONMENT` variable to decide which environment it is running in — conventionally `Development`, `Staging` or `Production`. It then loads `appsettings.{Environment}.json` on top of the base file.",
            {
              label: "Branching on the environment",
              content: `var app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage();   // detailed errors, dev only
} else {
    app.UseExceptionHandler("/error"); // generic message in production
}

app.Run();`,
            },
          ),
          text(
            "Reading config with string keys everywhere is fragile — a typo in `\"Api:PageSize\"` fails silently. The **options pattern** binds a config section to a class once, then injects it as a typed object.",
            {
              label: "Binding a section to a class",
              content: `class ApiOptions {
    public int PageSize { get; set; }
    public string Title { get; set; }
}

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ApiOptions>(
    builder.Configuration.GetSection("Api"));`,
            },
          ),
          text(
            "Handlers then take `IOptions<T>` through dependency injection and read `.Value` — typed, autocompleted, and checked by the compiler.",
            {
              label: "Injecting typed options",
              content: `app.MapGet("/info", (IOptions<ApiOptions> options) => {
    ApiOptions api = options.Value;
    return $"{api.Title} shows {api.PageSize} per page";
});`,
            },
          ),
          callout(
            "tip",
            "Property names on the options class must match the JSON keys in that section. A mismatch does not throw — the property silently keeps its default, which is why typos here are hard to spot.",
          ),
          quiz(
            "What does `builder.Services.Configure<ApiOptions>(...GetSection(\"Api\"))` accomplish?",
            [
              "Creates the appsettings.json file",
              "Binds the Api config section to ApiOptions so it can be injected as IOptions<ApiOptions>",
              "Validates that every key exists",
              "Switches the app to Development mode",
            ],
            1,
            "Configure binds a configuration section to a typed class and registers it in DI, so handlers can inject IOptions<ApiOptions> instead of using string keys.",
          ),
        ],
        challenge: {
          title: "Bind Typed Options",
          description:
            "Register `ApiOptions` bound to the `\"Api\"` configuration section with `builder.Services.Configure`, then map `GET /info` with a handler taking `IOptions<ApiOptions> options` that returns `options.Value.Title`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);

// Bind the "Api" section to ApiOptions


var app = builder.Build();

// Map GET /info using IOptions<ApiOptions>


app.Run();

class ApiOptions {
    public int PageSize { get; set; }
    public string Title { get; set; }
}`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ApiOptions>(
    builder.Configuration.GetSection("Api"));

var app = builder.Build();

app.MapGet("/info", (IOptions<ApiOptions> options) => options.Value.Title);

app.Run();

class ApiOptions {
    public int PageSize { get; set; }
    public string Title { get; set; }
}`,
          tests: [
            {
              id: 1,
              label: "Configures ApiOptions",
              keywords: [{ pattern: "Configure<ApiOptions>" }],
            },
            {
              id: 2,
              label: "Binds the Api section",
              keywords: [{ pattern: "GetSection\\(\"Api\"\\)" }],
            },
            {
              id: 3,
              label: "Injects IOptions<ApiOptions>",
              keywords: [{ pattern: "IOptions<ApiOptions>" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "data-access-ef-core",
    title: "Data Access with EF Core",
    icon: "🗄️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-8",
        title: "DbContext & Entity Models",
        xp: 16,
        theory: [
          text(
            "Entity Framework Core maps C# classes to database tables. An **entity** is a plain class; a **`DbContext`** is the session that tracks those entities and talks to the database.",
            {
              label: "An entity and its context",
              content: `class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

class ShopContext : DbContext {
    public ShopContext(DbContextOptions<ShopContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }
}`,
            },
          ),
          text(
            "Each `DbSet<T>` becomes a table, each property a column. A property named `Id` (or `ProductId`) is taken as the primary key by convention — no attribute needed.",
          ),
          text(
            "Register the context in DI with its provider and connection string, exactly like any other service.",
            {
              label: "Registering the context",
              content: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ShopContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();`,
            },
          ),
          text(
            "Because it is registered in DI, a route handler gets the context by simply declaring it as a parameter — the same injection you saw in the DI chapter.",
            {
              label: "Injecting the context into a handler",
              content: `app.MapGet("/products", async (ShopContext db) =>
    await db.Products.ToListAsync());`,
            },
          ),
          callout(
            "info",
            "`DbContext` is registered **scoped** — one instance per HTTP request. That is deliberate: it tracks changes for the lifetime of a request and is not thread-safe, so never share one across requests.",
          ),
          quiz(
            "What does a `DbSet<Product>` property on a DbContext represent?",
            [
              "A single product row",
              "The Products table, queryable as a collection",
              "The database connection string",
              "A migration script",
            ],
            1,
            "Each DbSet<T> maps to a table and acts as the queryable entry point for entities of that type.",
          ),
        ],
        challenge: {
          title: "Define a Context",
          description:
            "Create a `ShopContext` class inheriting `DbContext` with a constructor taking `DbContextOptions<ShopContext>` passed to `base`, and a `DbSet<Product> Products` property. Then register it with `builder.Services.AddDbContext<ShopContext>`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);

// Register the ShopContext with AddDbContext


var app = builder.Build();
app.Run();

class Product {
    public int Id { get; set; }
    public string Name { get; set; }
}

// Define ShopContext here
`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ShopContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();
app.Run();

class Product {
    public int Id { get; set; }
    public string Name { get; set; }
}

class ShopContext : DbContext {
    public ShopContext(DbContextOptions<ShopContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a DbContext subclass",
              keywords: [{ pattern: "ShopContext\\s*:\\s*DbContext" }],
            },
            {
              id: 2,
              label: "Exposes a DbSet<Product>",
              keywords: [{ pattern: "DbSet<Product>" }],
            },
            {
              id: 3,
              label: "Registers the context in DI",
              keywords: [{ pattern: "AddDbContext<ShopContext>" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-9",
        title: "CRUD Endpoints with EF Core",
        xp: 16,
        theory: [
          text(
            "Queries against a `DbSet` are LINQ queries translated into SQL. Use the **async** versions in a web app so the thread is freed while the database works.",
            {
              label: "Read endpoints",
              content: `app.MapGet("/products", async (ShopContext db) =>
    await db.Products.ToListAsync());

app.MapGet("/products/{id}", async (int id, ShopContext db) =>
    await db.Products.FindAsync(id) is Product p
        ? Results.Ok(p)
        : Results.NotFound());`,
            },
          ),
          text(
            "Writes are two steps: change the tracked graph, then call `SaveChangesAsync` once to commit. Nothing reaches the database until that call.",
            {
              label: "Create",
              content: `app.MapPost("/products", async (Product product, ShopContext db) => {
    db.Products.Add(product);
    await db.SaveChangesAsync();

    return Results.Created($"/products/{product.Id}", product);
});`,
            },
          ),
          text(
            "Update and delete follow the same shape: load the entity, modify or remove it, save once.",
            {
              label: "Update and delete",
              content: `app.MapPut("/products/{id}", async (int id, Product input, ShopContext db) => {
    Product product = await db.Products.FindAsync(id);
    if (product is null) return Results.NotFound();

    product.Name = input.Name;
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/products/{id}", async (int id, ShopContext db) => {
    Product product = await db.Products.FindAsync(id);
    if (product is null) return Results.NotFound();

    db.Products.Remove(product);
    await db.SaveChangesAsync();

    return Results.NoContent();
});`,
            },
          ),
          callout(
            "warning",
            "Calling `SaveChangesAsync` inside a loop issues a round trip per iteration. Make all your changes first, then save once — EF Core batches them into a single transaction.",
          ),
          quiz(
            "When does `db.Products.Add(product)` actually write a row to the database?",
            [
              "Immediately when Add is called",
              "When SaveChangesAsync is called",
              "When the response is returned",
              "When the DbContext is disposed",
            ],
            1,
            "Add only marks the entity as added in the change tracker. The INSERT is sent when SaveChangesAsync runs.",
          ),
        ],
        challenge: {
          title: "Create a Product Endpoint",
          description:
            "Map a `POST /products` route whose async handler takes `Product product` and `ShopContext db`, adds the product with `db.Products.Add`, awaits `db.SaveChangesAsync()`, and returns `Results.Created`.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Map an async POST /products endpoint


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/products", async (Product product, ShopContext db) => {
    db.Products.Add(product);
    await db.SaveChangesAsync();

    return Results.Created($"/products/{product.Id}", product);
});

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Maps an async POST /products",
              keywords: [{ pattern: "MapPost\\(\"/products\"" }, { pattern: "async" }],
            },
            {
              id: 2,
              label: "Adds and saves",
              keywords: [
                { pattern: "db\\.Products\\.Add" },
                { pattern: "await\\s+db\\.SaveChangesAsync" },
              ],
            },
            {
              id: 3,
              label: "Returns 201 Created",
              keywords: [{ pattern: "Results\\.Created" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "validation-security",
    title: "Validation, Errors & Security Basics",
    icon: "🔐",
    color: ACCENT,
    lessons: [
      {
        id: "cs-aspnet-10",
        title: "Validation & Error Handling",
        xp: 15,
        theory: [
          text(
            "Never trust request bodies. **Data annotations** declare the rules on the model itself, next to the properties they constrain.",
            {
              label: "Annotating a DTO",
              content: `using System.ComponentModel.DataAnnotations;

class CreateProductDto {
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; }

    [Range(0.01, 10000)]
    public decimal Price { get; set; }
}`,
            },
          ),
          text(
            "When validation fails, return **`Results.ValidationProblem`**. It produces an RFC-compliant `ProblemDetails` body with a 400 status and a dictionary of field errors — the shape API clients expect.",
            {
              label: "Returning a validation failure",
              content: `app.MapPost("/products", (CreateProductDto dto) => {
    if (string.IsNullOrWhiteSpace(dto.Name)) {
        return Results.ValidationProblem(new Dictionary<string, string[]> {
            ["Name"] = new[] { "Name is required." }
        });
    }

    return Results.Created("/products/1", dto);
});`,
            },
          ),
          text(
            "Unhandled exceptions are a separate concern. Register an exception handler once so a crash returns a clean error response instead of a stack trace.",
            {
              label: "Global exception handling",
              content: `var app = builder.Build();

if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler("/error");
}

app.Map("/error", () => Results.Problem("An unexpected error occurred."));`,
            },
          ),
          callout(
            "warning",
            "A stack trace in a production response tells an attacker your framework versions, file paths and query structure. Detailed errors belong in logs and in Development only.",
          ),
          quiz(
            "What does `Results.ValidationProblem(...)` return to the client?",
            [
              "500 with a stack trace",
              "400 with a ProblemDetails body listing field errors",
              "204 No Content",
              "A redirect to an error page",
            ],
            1,
            "ValidationProblem produces a 400 Bad Request with a standard ProblemDetails payload whose errors dictionary maps each field to its messages.",
          ),
        ],
        challenge: {
          title: "Validate a Product DTO",
          description:
            "Add `[Required]` and `[StringLength(100, MinimumLength = 2)]` to `Name`, and `[Range(0.01, 10000)]` to `Price` on `CreateProductDto`. In the handler, return `Results.ValidationProblem` when `Name` is empty.",
          starterCode: `using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/products", (CreateProductDto dto) => {
    // Return a validation problem when Name is empty


    return Results.Created("/products/1", dto);
});

app.Run();

class CreateProductDto {
    // Annotate Name and Price
    public string Name { get; set; }
    public decimal Price { get; set; }
}`,
          solutionCode: `using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/products", (CreateProductDto dto) => {
    if (string.IsNullOrWhiteSpace(dto.Name)) {
        return Results.ValidationProblem(new Dictionary<string, string[]> {
            ["Name"] = new[] { "Name is required." }
        });
    }

    return Results.Created("/products/1", dto);
});

app.Run();

class CreateProductDto {
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; }

    [Range(0.01, 10000)]
    public decimal Price { get; set; }
}`,
          tests: [
            {
              id: 1,
              label: "Marks Name as Required",
              keywords: [{ pattern: "\\[Required\\]" }],
            },
            {
              id: 2,
              label: "Constrains Price with Range",
              keywords: [{ pattern: "\\[Range\\(" }],
            },
            {
              id: 3,
              label: "Returns a validation problem",
              keywords: [{ pattern: "Results\\.ValidationProblem" }],
            },
          ],
        },
      },
      {
        id: "cs-aspnet-11",
        title: "Authentication, Authorization & CORS",
        xp: 16,
        theory: [
          text(
            "**Authentication** establishes who the caller is; **authorization** decides what they may do. They are separate steps, and the middleware for each must be added in that order.",
            {
              label: "Wiring both into the pipeline",
              content: `var app = builder.Build();

app.UseAuthentication();   // who are you?
app.UseAuthorization();    // are you allowed?

app.Run();`,
            },
          ),
          text(
            "APIs usually authenticate with **JWT bearer tokens**: the client sends `Authorization: Bearer <token>` and the framework validates the signature and claims on every request.",
            {
              label: "Registering JWT authentication",
              content: `builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer();

builder.Services.AddAuthorization();`,
            },
          ),
          text(
            "Protect an endpoint with `RequireAuthorization()`. Anonymous callers then get a 401 before the handler ever runs.",
            {
              label: "Protecting endpoints",
              content: `app.MapGet("/public", () => "anyone can read this");

app.MapGet("/orders", () => "your orders")
   .RequireAuthorization();

app.MapDelete("/admin/users/{id}", (int id) => Results.NoContent())
   .RequireAuthorization("AdminOnly");   // named policy`,
            },
          ),
          text(
            "Browsers block cross-origin calls unless the server opts in. **CORS** is that opt-in, and it must be configured for the front end's exact origin.",
            {
              label: "Allowing a front end origin",
              content: `builder.Services.AddCors(options =>
    options.AddPolicy("frontend", policy =>
        policy.WithOrigins("https://app.example.com")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();
app.UseCors("frontend");`,
            },
          ),
          callout(
            "warning",
            "`AllowAnyOrigin()` combined with credentials is rejected by browsers and is a bad default regardless — it invites any site to call your API. Name the origins you actually serve.",
          ),
          quiz(
            "What is the difference between `UseAuthentication()` and `UseAuthorization()`?",
            [
              "They are aliases for the same middleware",
              "Authentication identifies the caller; authorization decides what that caller may do",
              "Authentication is for APIs, authorization for web pages",
              "Authorization must be registered first",
            ],
            1,
            "Authentication establishes identity from the request's credentials, and authorization then evaluates policies against that identity — which is why it must run second.",
          ),
        ],
        challenge: {
          title: "Protect an Endpoint",
          description:
            "Add `app.UseAuthentication()` and `app.UseAuthorization()` in the correct order, then map `GET /orders` and chain `.RequireAuthorization()` so anonymous callers get a 401.",
          starterCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Add authentication then authorization middleware


// Map a protected GET /orders endpoint


app.Run();`,
          solutionCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/orders", () => "your orders")
   .RequireAuthorization();

app.Run();`,
          tests: [
            {
              id: 1,
              label: "Adds authentication middleware",
              keywords: [{ pattern: "UseAuthentication\\s*\\(" }],
            },
            {
              id: 2,
              label: "Adds authorization middleware",
              keywords: [{ pattern: "UseAuthorization\\s*\\(" }],
            },
            {
              id: 3,
              label: "Protects the /orders endpoint",
              keywords: [
                { pattern: "MapGet\\(\"/orders\"" },
                { pattern: "RequireAuthorization\\s*\\(" },
              ],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_ASPNET_BASICS_CHAPTERS = RAW_CSHARP_ASPNET_BASICS_CHAPTERS;

export const CSHARP_ASPNET_BASICS_LESSONS = CSHARP_ASPNET_BASICS_CHAPTERS.flatMap(
  (ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
);

export const CSHARP_ASPNET_BASICS_TOTAL_XP = CSHARP_ASPNET_BASICS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
