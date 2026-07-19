// PolyCode — Ruby Blocks & Modules interactive course (Beginner → Pro)
// Comprehensive guide to blocks, procs, lambdas, modules, mixins, and advanced patterns

const ACCENT = "#701516"; 

export function quiz(question, options, answer, explanation) {
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
      code: { lang: "ruby", ...codeBlock },
    };
  }
  return { type: "text", content };
}

export const RUBY_BLOCKS_MODULES_CHAPTERS = [
  // ---------------------------------------------------------------------
  // Chapter 1 – Blocks Foundations (Beginner)
  // ---------------------------------------------------------------------
  {
    id: "blocks-foundation",
    title: "Ruby Blocks – Beginner",
    stage: "beginner",
    icon: "🔹",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-0",
        title: "What is a Block?",
        xp: 10,
        theory: [
          text(
            "A **block** is a chunk of code you can pass to a method. It is defined between `do…end` or curly braces `{}` and can be called with `yield` inside the method.",
            {
              label: "Simple block example",
              content: `def greet
  yield "World"
end

greet { |name| puts "Hello, #{name}!" }`
            }
          ),
          callout("info", "Blocks are the core of Ruby's internal iteration – they let you write concise, reusable code.")
        ],
        challenge: {
          title: "Yield Greeting",
          description: "Write a method `shout` that yields a string to a block. The block should receive the string and `puts` it in uppercase.",
          starterCode: `def shout
  # yield a string to the block
end

shout { |msg| puts msg.upcase }`
,
          solutionCode: `def shout
  yield "hello from block"
end

shout { |msg| puts msg.upcase }`
,
          tests: [
            { id: 1, label: "Defines shout method", keywords: [{ pattern: "def\\s+shout" }] },
            { id: 2, label: "Calls yield", keywords: [{ pattern: "yield" }] },
            { id: 3, label: "Prints uppercase", keywords: [{ pattern: "UPCASE" }] }
          ]
        }
      },
      {
        id: "rbm-1",
        title: "Block Parameters",
        xp: 12,
        theory: [
          text(
            "Blocks can accept parameters. The method passes arguments to the block via `yield(arg1, arg2…)` and the block receives them as parameters.",
            {
              label: "Block with parameters",
              content: `def repeat(times)
  yield(times)
end

repeat(3) { |n| puts "Repeating #{n} times" }`
            }
          ),
          callout("tip", "If a block expects no parameters, you can still call `yield` without arguments.")
        ],
        challenge: {
          title: "Sum with Block",
          description: "Create a method `calculate` that yields two numbers to a block. The block should return their sum. Print the result.",
          starterCode: `def calculate
  # yield two numbers
end

calculate { |a, b| puts a + b }`
,
          solutionCode: `def calculate
  yield 5, 7
end

calculate { |a, b| puts a + b }`
,
          tests: [
            { id: 1, label: "Defines calculate method", keywords: [{ pattern: "def\\s+calculate" }] },
            { id: 2, label: "Yields two arguments", keywords: [{ pattern: "yield\\s+5,\\s*7" }] },
            { id: 3, label: "Prints 12", keywords: [{ pattern: "12" }] }
          ]
        }
      }
    ]
  },
  // ---------------------------------------------------------------------
  // Chapter 2 – Procs & Lambdas (Intermediate)
  // ---------------------------------------------------------------------
  {
    id: "procs-lambdas",
    title: "Procs & Lambdas",
    stage: "beginner",
    icon: "⚡",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-2",
        title: "Introducing Proc",
        xp: 14,
        theory: [
          text(
            "A **Proc** is an object that holds a block. You can store it, pass it around, and call it with `call`.",
            {
              label: "Proc example",
              content: `my_proc = Proc.new { |x| x * 2 }
puts my_proc.call(4) # => 8`
            }
          ),
          callout("info", "Procs are useful when you need a reusable block that can be stored in a variable.")
        ],
        challenge: {
          title: "Double with Proc",
          description: "Define a Proc that doubles a number and call it with 6. Print the result.",
          starterCode: `# Define a Proc that doubles a value
my_proc = Proc.new { |n| /* ... */ }

puts my_proc.call(6)`
,
          solutionCode: `my_proc = Proc.new { |n| n * 2 }
puts my_proc.call(6)`
,
          tests: [
            { id: 1, label: "Creates Proc", keywords: [{ pattern: "Proc\\\\.new" }] },
            { id: 2, label: "Doubles value", keywords: [{ pattern: "12" }] }
          ]
        }
      },
      {
        id: "rbm-3",
        title: "Lambda vs Proc",
        xp: 16,
        theory: [
          text(
            "A **lambda** is a special kind of Proc with stricter argument checking and its own `return` semantics.",
            {
              label: "Lambda example",
              content: `my_lambda = ->(x) { x * 3 }
puts my_lambda.call(3) # => 9`
            }
          ),
          callout("warning", "`return` inside a lambda only exits the lambda, not the surrounding method.")
        ],
        challenge: {
          title: "Lambda Return",
          description: "Write a method `outer` that defines a lambda returning `:inside`. Call the lambda and return its value from `outer`. Print the result.",
          starterCode: `def outer
  # define lambda here
end

puts outer`
,
          solutionCode: `def outer
  l = -> { :inside }
  l.call
end

puts outer`
,
          tests: [
            { id: 1, label: "Defines lambda with ->", keywords: [{ pattern: "->" }] },
            { id: 2, label: "Returns :inside", keywords: [{ pattern: ":inside" }] }
          ]
        }
      }
    ]
  },
  // ---------------------------------------------------------------------
  // Chapter 3 – Modules & Mixins (Intermediate → Advanced)
  // ---------------------------------------------------------------------
  {
    id: "modules-mixins",
    title: "Modules & Mixins",
    stage: "intermediate",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-4",
        title: "Defining a Module",
        xp: 12,
        theory: [
          text(
            "A **module** groups related methods and constants. It cannot be instantiated, but can be mixed into classes.",
            {
              label: "Simple module",
              content: `module Greetings
  def hello
    "Hello!"
  end

  def goodbye
    "Goodbye!"
  end
end

class Person
  include Greetings
end

person = Person.new

puts person.hello
puts person.goodbye`
            }
          ),
          callout("info", "Modules are also a namespace, preventing name collisions.")
        ],
        challenge: {
          title: "Module Method",
          description: "Create a module `MathHelpers` with a method `square(x)` returning `x*x`. Include the module in a class `Calculator` and call `square(5)`.",
          starterCode: `module MathHelpers
  # define square method
end

class Calculator
  include MathHelpers
end

puts Calculator.new.square(5)`
,
          solutionCode: `module MathHelpers
  def square(x)
    x * x
  end
end

class Calculator
  include MathHelpers
end

puts Calculator.new.square(5)`
,
          tests: [
            { id: 1, label: "Defines module MathHelpers", keywords: [{ pattern: "module\\s+MathHelpers" }] },
            { id: 2, label: "Defines square method", keywords: [{ pattern: "def\\s+square" }] },
            { id: 3, label: "Prints 25", keywords: [{ pattern: "25" }] }
          ]
        }
      },
      {
        id: "rbm-5",
        title: "Mixins for Shared Behavior",
        xp: 14,
        theory: [
          text(
            "**Mixins** let you share behavior across unrelated classes by `include`‑ing a module.",
            {
              label: "Mixin example",
              content: `module Flyable
  def fly
    "Flying..."
  end
end

module Swimmable
  def swim
    "Swimming..."
  end
end

class Duck
  include Flyable
  include Swimmable
end

duck = Duck.new

puts duck.fly
puts duck.swim`
            }
          ),
          callout("tip", "A class can include multiple modules, stacking behaviors.")
        ],
        challenge: {
          title: "Flyable Mixin",
          description: "Define a module `Swimmable` with method `swim` returning \"I can swim!\". Include it in class `Fish` and print the result of `Fish.new.swim`.",
          starterCode: `module Swimmable
  # define swim method
end

class Fish
  include Swimmable
end

puts Fish.new.swim`
,
          solutionCode: `module Swimmable
  def swim
    "I can swim!"
  end
end

class Fish
  include Swimmable
end

puts Fish.new.swim`
,
          tests: [
            { id: 1, label: "Defines module Swimmable", keywords: [{ pattern: "module\\s+Swimmable" }] },
            { id: 2, label: "Defines swim method", keywords: [{ pattern: "def\\s+swim" }] },
            { id: 3, label: "Prints I can swim!", keywords: [{ pattern: "I can swim" }] }
          ]
        }
      }
    ]
  },
  // ---------------------------------------------------------------------
  // Chapter 4 – Advanced Patterns (Advanced)
  // ---------------------------------------------------------------------
  {
    id: "advanced-patterns",
    title: "Advanced Blocks & Modules",
    stage: "advanced",
    icon: "🚀",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-6",
        title: "Method Lookup Chain",
        xp: 16,
        theory: [
          text(
            "Ruby resolves method calls by searching the **ancestors chain**: the class, its included modules (in reverse order), its superclass, and so on.",
            {
              label: "Lookup chain demo",
              content: `module A; def hello; "A"; end; end
module B; def hello; "B"; end; end
class Base; include A; include B; end
puts Base.new.hello # => "B"`
            }
          ),
          callout("info", "The last included module wins because Ruby inserts it at the front of the ancestors list.")
        ],
        challenge: {
          title: "Ancestor Override",
          description: "Create modules `First` and `Second` each defining `msg` returning different strings. Include them in class `Demo` with `Second` included after `First`. Call `Demo.new.msg` and print the result.",
          starterCode: `module First
  def msg
    "first"
  end
end

module Second
  def msg
    "second"
  end
end

class Demo
  include First
  # include Second here
end

puts Demo.new.msg`
,
          solutionCode: `module First
  def msg
    "first"
  end
end

module Second
  def msg
    "second"
  end
end

class Demo
  include First
  include Second
end

puts Demo.new.msg`
,
          tests: [
            { id: 1, label: "Includes both modules", keywords: [{ pattern: "include\\s+First" }, { pattern: "include\\s+Second" }] },
            { id: 2, label: "Prints second", keywords: [{ pattern: "second" }] }
          ]
        }
      },
      {
        id: "rbm-7",
        title: "Block Passing with `&`",
        xp: 14,
        theory: [
          text(
            "You can convert a Proc to a block with the `&` operator when calling a method, and vice‑versa.",
            {
              label: "& operator example",
              content: `def call_twice(&blk)
  blk.call
  blk.call
end

my_proc = Proc.new { puts "twice" }
call_twice(&my_proc)`
            }
          ),
          callout("tip", "`&` is handy for forwarding blocks to other methods.")
        ],
        challenge: {
          title: "Forward Block",
          description: "Write a method `repeat_three(&block)` that calls the given block three times. Use it to print \"ping\" three times.",
          starterCode: `def repeat_three(&block)
  # call block three times
end

repeat_three { puts "ping" }`
,
          solutionCode: `def repeat_three(&block)
  3.times { block.call }
end

repeat_three { puts "ping" }`
,
          tests: [
            { id: 1, label: "Calls block three times", keywords: [{ pattern: "3.times" }] },
            { id: 2, label: "Prints ping three times", keywords: [{ pattern: "ping" }] }
          ]
        }
      }
    ]
  },

  // ---------------------------------------------------------------------
  // Chapter 5 – Closures & Scope (Intermediate)
  // ---------------------------------------------------------------------
  {
    id: "closures-scope",
    title: "Closures & Scope",
    stage: "intermediate",
    icon: "🔒",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-8",
        title: "What is a Closure?",
        xp: 12,
        theory: [
          text(
            "A **closure** is a function that captures its surrounding environment. In Ruby, blocks, procs, and lambdas are all closures — they 'remember' the variables from where they were defined.",
            {
              label: "Closure example",
              content: `x = 10

my_proc = Proc.new { x * 2 }
puts my_proc.call  # => 20

x = 20
puts my_proc.call  # => 40`
            }
          ),
          callout("info", "Closures capture *bindings*, not just values. Changing `x` later affects the closure's result.")
        ],
        challenge: {
          title: "Capture a Variable",
          description: "Create a proc that multiplies a captured `multiplier` variable by an argument. Demonstrate that changing the multiplier affects the result.",
          starterCode: `multiplier = 3

# Create your proc here

puts doubler.call(5)   # should print 15
multiplier = 10
puts doubler.call(5)   # should print 50`,
          solutionCode: `multiplier = 3

doubler = Proc.new { |n| multiplier * n }

puts doubler.call(5)   # => 15
multiplier = 10
puts doubler.call(5)   # => 50`,
          tests: [
            { id: 1, label: "Initial result is 15", keywords: [{ pattern: "15" }] },
            { id: 2, label: "Changed result is 50", keywords: [{ pattern: "50" }] }
          ]
        }
      },
      {
        id: "rbm-9",
        title: "Shared Scope & Binding",
        xp: 14,
        theory: [
          text(
            "Multiple closures can share the same scope. Ruby's `binding` object lets you capture the current execution context.",
            {
              label: "Shared scope",
              content: `counter = 0

increment = Proc.new { counter += 1 }
reset = Proc.new { counter = 0 }

increment.call
increment.call
puts counter  # => 2
reset.call
puts counter  # => 0`
            }
          ),
          callout("warning", "Shared mutable state through closures can cause bugs. Use with care in production code.")
        ],
        challenge: {
          title: "Build a Counter",
          description: "Create two procs: `inc` that increments a counter, and `dec` that decrements it. Use a shared `counter` variable.",
          starterCode: `counter = 0

# Create inc and dec procs here

inc.call
inc.call
dec.call
puts counter  # should print 1`,
          solutionCode: `counter = 0

inc = Proc.new { counter += 1 }
dec = Proc.new { counter -= 1 }

inc.call
inc.call
dec.call
puts counter  # => 1`,
          tests: [
            { id: 1, label: "Final counter is 1", keywords: [{ pattern: "1" }] }
          ]
        }
      }
    ]
  },

  // ---------------------------------------------------------------------
  // Chapter 6 – Enumerable Deep Dive (Intermediate)
  // ---------------------------------------------------------------------
  {
    id: "enumerable-deep-dive",
    title: "Enumerable Deep Dive",
    stage: "intermediate",
    icon: "🔄",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-10",
        title: "Custom Enumerables",
        xp: 15,
        theory: [
          text(
            "You can make any class enumerable by implementing `each`. Methods like `map`, `select`, and `reduce` all rely on `each`.",
            {
              label: "Custom enumerable",
              content: `class Stack
  # This line gives your class access to map, select, reduce, etc.
  include Enumerable

  def initialize
    @items = []
  end

  def each(&block)
    @items.each(&block)
  end

  def push(item)
    @items.push(item)
  end
end

stack = Stack.new
stack.push(1)
stack.push(2)
stack.push(3)

puts stack.map { |x| x * 2 }.inspect  # => [2, 4, 6]`
            }
          ),
          callout("tip", "Implementing `each` gives you dozens of methods for free: `map`, `select`, `reject`, `reduce`, `any?`, `all?`, `sort`, and more.")
        ],
        challenge: {
          title: "Make a Range Enumerable",
          description: "Create a `Range` class with `initialize(start, finish)`, `each(&block)`, and `map`. It should iterate from start to finish.",
          starterCode: `class Range
  def initialize(start, finish)
    # your code here
  end

  def each(&block)
    # your code here
  end
end

r = Range.new(1, 3)
puts r.map { |n| n * 2 }.inspect  # should print [2, 4, 6]`,
          solutionCode: `class Range
  def initialize(start, finish)
    @start = start
    @finish = finish
  end

  def each(&block)
    @start.upto(@finish).each(&block)
  end
end

r = Range.new(1, 3)
puts r.map { |n| n * 2 }.inspect  # => [2, 4, 6]`,
          tests: [
            { id: 1, label: "Map works correctly", keywords: [{ pattern: "\\[2, 4, 6\\]" }] }
          ]
        }
      },
      {
        id: "rbm-11",
        title: "Chaining Enumerable Methods",
        xp: 14,
        theory: [
          text(
            "One of Ruby's superpowers is chaining enumerable methods to build powerful data transformations.",
            {
              label: "Method chaining",
              content: `result = (1..10)
  .select { |n| n.even? }      # [2, 4, 6, 8, 10]
  .map { |n| n * n }            # [4, 16, 36, 64, 100]
  .reduce(:+)                   # 220

puts result  # => 220`
            }
          ),
          callout("info", "Each method returns a new array, so you can keep chaining. For very large datasets, consider using `lazy` to avoid creating intermediate arrays.")
        ],
        challenge: {
          title: "Chain It Up",
          description: "Given (1..20), select numbers divisible by 3, square them, then sum the result.",
          starterCode: `result = (1..20)
  .select { |n| # your code }
  .map { |n| # your code }
  .reduce(:+)

puts result  # should print 273`,
          solutionCode: `result = (1..20)
  .select { |n| n % 3 == 0 }
  .map { |n| n * n }
  .reduce(:+)

puts result  # => 273`,
          tests: [
            { id: 1, label: "Result is 273", keywords: [{ pattern: "273" }] }
          ]
        }
      }
    ]
  },

  // ---------------------------------------------------------------------
  // Chapter 7 – Advanced Module Patterns (Advanced)
  // ---------------------------------------------------------------------
  {
    id: "advanced-module-patterns",
    title: "Advanced Module Patterns",
    stage: "advanced",
    icon: "🧩",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-12",
        title: "Module Methods & Namespacing",
        xp: 15,
        theory: [
          text(
            "Modules can hold both instance methods *and* class methods. Use `module_function` to make methods callable on the module itself.",
            {
              label: "Module with methods",
              content: `module MathUtils
  def self.square(n)
    n * n
  end

  def sqrt(n)
    Math.sqrt(n)
  end
  
  # Put it after the method is defined
  module_function :sqrt
end

puts MathUtils.square(5)  # => 25
puts MathUtils.sqrt(16)   # => 4.0`
            }
          ),
          callout("tip", "`self.method_name` and `module_function` are two ways to define module-level methods. Choose based on whether you need the method to be callable as both a class method and an instance method.")
        ],
        challenge: {
          title: "Build a Namespaced Module",
          description: "Create a `Geometry` module with `self.circle_area(radius)` and `self.rectangle_area(width, height)` methods.",
          starterCode: `module Geometry
  # Add your methods here
end

puts Geometry.circle_area(3).round(2)      # should print 28.27
puts Geometry.rectangle_area(4, 5)         # should print 20`,
          solutionCode: `module Geometry
  def self.circle_area(radius)
    Math::PI * radius * radius
  end

  def self.rectangle_area(width, height)
    width * height
  end
end

puts Geometry.circle_area(3).round(2)      # => 28.27
puts Geometry.rectangle_area(4, 5)         # => 20`,
          tests: [
            { id: 1, label: "Circle area correct", keywords: [{ pattern: "28.27" }] },
            { id: 2, label: "Rectangle area correct", keywords: [{ pattern: "20" }] }
          ]
        }
      },
      {
        id: "rbm-13",
        title: "Constant Lookup & Namespaces",
        xp: 14,
        theory: [
          text(
            "Modules create namespaces that organize constants. Use `::` to access top-level constants from within a module.",
            {
              label: "Namespaced constants",
              content: `module App
  VERSION = "2.0"

  module Config
    DB_HOST = "localhost"

    def self.info
      "App #{::App::VERSION}, DB: #{DB_HOST}"
    end
  end
end

puts App::Config.info  # => "App 2.0, DB: localhost"`
            }
          ),
          callout("info", "Use `::` to reach top-level (global) constants from inside a module. Without it, Ruby searches the current scope first.")
        ],
        challenge: {
          title: "Nested Namespaces",
          description: "Create a `Store` module with a `Product` submodule. `Product` should have a `TAX_RATE` constant and a `total_price(price, quantity)` method.",
          starterCode: `module Store
  module Product
    # Add TAX_RATE constant and total_price method
  end
end

puts Store::Product::TAX_RATE           # should print 0.08
puts Store::Product.total_price(100, 2) # should print 216`,
          solutionCode: `module Store
  module Product
    TAX_RATE = 0.08

    def self.total_price(price, quantity)
      price * quantity * (1 + TAX_RATE)
    end
  end
end

puts Store::Product::TAX_RATE           # => 0.08
puts Store::Product.total_price(100, 2) # => 216.0`,
          tests: [
            { id: 1, label: "TAX_RATE is 0.08", keywords: [{ pattern: "0.08" }] },
            { id: 2, label: "Total price is 216", keywords: [{ pattern: "216" }] }
          ]
        }
      }
    ]
  },

  // ---------------------------------------------------------------------
  // Chapter 8 – Blocks in the Wild (Advanced)
  // ---------------------------------------------------------------------
  {
    id: "blocks-in-the-wild",
    title: "Blocks in the Wild",
    stage: "advanced",
    icon: "🌐",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-14",
        title: "Builder Pattern with Blocks",
        xp: 16,
        theory: [
          text(
            "Blocks are perfect for implementing the Builder pattern — a fluent API where method calls return `self` and a block configures the object.",
            {
              label: "Builder pattern",
              content: `class QueryBuilder
  def initialize
    @conditions = []
  end

  def where(condition)
    @conditions << condition
    self
  end

  def order_by(field)
    @conditions << "ORDER BY #{field}"
    self
  end

  def build
    "SELECT * FROM users " + @conditions.join(" ")
  end
end

query = QueryBuilder.new
  .where("active = true")
  .where("role = 'admin'")
  .order_by("created_at")
  .build

puts query
# SELECT * FROM users WHERE active = true WHERE role = 'admin' ORDER BY created_at`
            }
          ),
          callout("tip", "The `self` return is key — it lets you chain method calls and pass the object to a block for configuration.")
        ],
        challenge: {
          title: "HTML Builder",
          description: "Create an `HtmlBuilder` class with `tag(name, &block)` that opens a tag, yields to the block, then closes it. Support nesting.",
          starterCode: `class HtmlBuilder
  def initialize
    @html = ""
  end

  def tag(name, &block)
    # your code here
  end

  def to_s
    @html
  end
end

builder = HtmlBuilder.new
builder.tag(:div) do
  builder.tag(:p) { "Hello, Ruby!" }
end
puts builder.to_s`,
          solutionCode: `class HtmlBuilder
  def initialize
    @html = ""
  end

  def tag(name, &block)
    @html << "<#{name}>"
    yield if block_given?
    @html << "</#{name}>"
  end

  def to_s
    @html
  end
end

builder = HtmlBuilder.new
builder.tag(:div) do
  builder.tag(:p) { "Hello, Ruby!" }
end
puts builder.to_s  # => <div><p>Hello, Ruby!</p></div>`,
          tests: [
            { id: 1, label: "Outputs correct HTML", keywords: [{ pattern: "<div><p>Hello, Ruby!</p></div>" }] }
          ]
        }
      },
      {
        id: "rbm-15",
        title: "Resource Management with Blocks",
        xp: 15,
        theory: [
          text(
            "Blocks are ideal for resource management — acquire the resource, yield, then ensure cleanup. This pattern underpins Ruby's `File.open` with a block.",
            {
              label: "Resource management pattern",
              content: `class FileManager
  def self.open(filename, &block)
    file = nil # Declare file first so it's always in scope for ensure
    file = File.new(filename, "w")
    yield(file)
  ensure
    file.close if file
  end
end

FileManager.open("output.txt") do |f|
  f.puts "Hello from the block!"
  f.puts "Ruby handles cleanup automatically."
end

# Add a print statement so you see output in your browser terminal!
puts "File written and closed successfully! Check output.txt."`
            }
          ),
          callout("warning", "Always use `ensure` to guarantee cleanup, even if an exception is raised inside the block.")
        ],
        challenge: {
          title: "Database Connection Manager",
          description: "Create a `DB` module with `self.connect(uri, &block)` that opens a connection, yields it, and ensures it closes. Simulate with a simple class.",
          starterCode: `class DBConnection
  attr_reader :connected

  def initialize(uri)
    @uri = uri
    @connected = false
  end

  def connect
    @connected = true
    puts "Connected to #@uri"
  end

  def close
    @connected = false
    puts "Disconnected"
  end

  def query(sql)
    puts "Executing: #sql"
  end
end

module DB
  def self.connect(uri, &block)
    # your code here
  end
end

DB.connect("mysql://localhost") do |conn|
  conn.query("SELECT * FROM users")
end`,
          solutionCode: `class DBConnection
  attr_reader :connected

  def initialize(uri)
    @uri = uri
    @connected = false
  end

  def connect
    @connected = true
    puts "Connected to #@uri"
  end

  def close
    @connected = false
    puts "Disconnected"
  end

  def query(sql)
    puts "Executing: #sql"
  end
end

module DB
  def self.connect(uri, &block)
    conn = DBConnection.new(uri)
    conn.connect
    yield(conn)
  ensure
    conn.close if conn
  end
end

DB.connect("mysql://localhost") do |conn|
  conn.query("SELECT * FROM users")
end`,
          tests: [
            { id: 1, label: "Connects and disconnects", keywords: [{ pattern: "Connected" }, { pattern: "Disconnected" }] }
          ]
        }
      }
    ]
  },

  // ---------------------------------------------------------------------
  // Chapter 9 – Refinements & Advanced Topics (Pro)
  // ---------------------------------------------------------------------
  {
    id: "refinements-advanced",
    title: "Refinements & Advanced Topics",
    stage: "pro",
    icon: "💎",
    color: ACCENT,
    lessons: [
      {
        id: "rbm-16",
        title: "Ruby Refinements",
        xp: 18,
        theory: [
          text(
            "**Refinements** let you modify core classes locally. Unlike monkey-patching, refinements are only active within the file or module where they're used.",
            {
              label: "Refinements example",
              content: `# In refinement_file.rb
module StringExtensions
  refine String do
    def shout
      self.upcase + "!!!"
    end
  end
end

# Using refinements
using StringExtensions

puts "hello".shout  # => "HELLO!!!"
# Without 'using', shout is undefined`
            }
          ),
          callout("info", "Refinements are scoped — they only apply in the file where `using` is called. This makes them safer than global monkey-patches.")
        ],
        challenge: {
          title: "Create a Refinement",
          description: "Create a `NumericExtensions` refinement that adds a `to_currency` method to Numeric (formats as $XX.XX). Use it to format 99 and 9.5.",
          starterCode: `module NumericExtensions
  refine Numeric do
    def to_currency
      # your code here
    end
  end
end

using NumericExtensions

puts 99.to_currency   # should print $99.00
puts 9.5.to_currency # should print $9.50`,
          solutionCode: `module NumericExtensions
  refine Numeric do
    def to_currency
      "$#{'%.2f' % self}"
    end
  end
end

using NumericExtensions

puts 99.to_currency   # => $99.00
puts 9.5.to_currency # => $9.50`,
          tests: [
            { id: 1, label: "99 formats as $99.00", keywords: [{ pattern: "\\$99.00" }] },
            { id: 2, label: "9.5 formats as $9.50", keywords: [{ pattern: "\\$9.50" }] }
          ]
        }
      },
      {
        id: "rbm-17",
        title: "Fibers & Lazy Evaluation",
        xp: 18,
        theory: [
          text(
            "**Fibers** are lightweight coroutines that you can pause and resume manually. Combined with `Enumerator`, they enable powerful lazy evaluation patterns.",
            {
              label: "Lazy evaluation with fibers",
              content: `fibonacci = Fiber.new do
  a, b = 0, 1
  loop do
    Fiber.yield(a)
    a, b = b, a + b
  end
end

5.times { print "#{fibonacci.resume} " }
# => 0 1 1 2 3`
            }
          ),
          callout("tip", "Ruby's `Enumerator` class uses fibers internally. You can create lazy enumerators with `enum.lazy` to avoid building entire arrays in memory.")
        ],
        challenge: {
          title: "Lazy Prime Numbers",
          description: "Create a lazy enumerator that generates prime numbers. Get the first 10 primes using `.lazy` and `.first(10)`.",
          starterCode: `def primes
  # Return a lazy enumerator that yields prime numbers
  # Hint: use (2..Float::INFINITY).lazy and check divisibility
end

puts primes.first(10).inspect`,
          solutionCode: `def primes
  (2..Float::INFINITY).lazy.select do |n|
    (2..Math.sqrt(n)).none? { |d| n % d == 0 }
  end
end

puts primes.first(10).inspect  # => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`,
          tests: [
            { id: 1, label: "First 10 primes correct", keywords: [{ pattern: "2, 3, 5, 7, 11, 13, 17, 19, 23, 29" }] }
          ]
        }
      },
      {
        id: "rbm-18",
        title: "Blocks & Metaprogramming",
        xp: 20,
        theory: [
          text(
            "Blocks are central to Ruby's metaprogramming. Methods like `define_method` and `send` combined with blocks enable dynamic method creation.",
            {
              label: "Dynamic methods with blocks",
              content: `class Resource
  def initialize(data)
    @data = data
  end

  # Intercept methods that don't exist
  def method_missing(method_name, *args, &block)
    if @data.key?(method_name)
      @data[method_name]
    else
      super
    end
  end

  # Always override respond_to_missing? when overriding method_missing
  def respond_to_missing?(method_name, include_private = false)
    @data.key?(method_name) || super
  end
end

user = Resource.new(name: "Alice", email: "alice@example.com")
puts user.name   # => Alice
puts user.email  # => alice@example.com`
            }
          ),
          callout("warning", "Metaprogramming is powerful but can make code harder to understand. Document dynamic methods clearly and use them sparingly.")
        ],
        challenge: {
          title: "Dynamic Accessor Builder",
          description: "Create a `StructBuilder` class that takes a hash of field names and generates reader methods for each field using `define_method`.",
          starterCode: `class StructBuilder
  def initialize(fields)
    # Use define_method to create a reader for each field
  end
end

Person = StructBuilder.new(name: nil, age: 0, city: "")
alice = Person.new(name: "Alice", age: 30, city: "NYC")

puts alice.name  # => Alice
puts alice.age   # => 30`,
          solutionCode: `class StructBuilder
  def initialize(fields)
    fields.each do |field, default|
      define_method(field) { instance_variable_get("@#{field}") || default }
    end

    define_method(:initialize) do |values|
      values.each do |field, value|
        instance_variable_set("@#{field}", value)
      end
    end
  end
end

Person = StructBuilder.new(name: nil, age: 0, city: "")
alice = Person.new(name: "Alice", age: 30, city: "NYC")

puts alice.name  # => Alice
puts alice.age   # => 30`,
          tests: [
            { id: 1, label: "Name accessor works", keywords: [{ pattern: "Alice" }] },
            { id: 2, label: "Age accessor works", keywords: [{ pattern: "30" }] }
          ]
        }
      }
    ]
  }
];
// Export flattened lessons array and total XP for the course
export const RUBY_BLOCKS_MODULES_LESSONS = RUBY_BLOCKS_MODULES_CHAPTERS.flatMap(c => c.lessons);
export const RUBY_BLOCKS_MODULES_TOTAL_XP = RUBY_BLOCKS_MODULES_LESSONS.reduce((sum, l) => sum + l.xp, 0);
