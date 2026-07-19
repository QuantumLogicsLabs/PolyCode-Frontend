// PolyCode — Ruby OOP course (Beginner → Advanced)
// 6 chapters · 16 lessons · runnable Ruby examples and challenges

const ACCENT = "#6b21a8";

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
      code: { lang: "ruby", ...codeBlock },
    };
  }
  return { type: "text", content };
}

export const RUBY_OOP_CHAPTERS = [
  {
    id: "oop-welcome",
    title: "Ruby OOP — Beginner",
    stage: "beginner",
    icon: "💠",
    color: ACCENT,
    lessons: [
      {
        id: "ruby-oop-0",
        title: "Why Object-Oriented Ruby?",
        xp: 10,
        theory: [
          text(
            "Object-Oriented Programming (OOP) models programs as interacting objects. In Ruby, everything is an object — OOP is idiomatic and expressive across beginner to advanced code."
          ),
          text(
            "Beginner → Advanced: this course starts with classes and instances, then moves to inheritance, mixins, encapsulation, and finishes with useful metaprogramming patterns."
          ),
          callout(
            "info",
            "Course level: Beginner to Advanced — each chapter builds on the previous. Examples are runnable Ruby code suitable for the browser-backed interpreter."
          ),
        ],
        challenge: {
          title: "Object Greeting",
          description: "Create a class `Greeter` with an instance method `greet` that returns `\"Hello OOP\"`. Instantiate and `puts` the result.",
          starterCode: `# Define a simple Greeter class
class Greeter
  # def greet
  #   ...
  # end
end

# Create an instance and call greet
g = Greeter.new
puts g.greet`,
          solutionCode: `class Greeter
  def greet
    "Hello OOP"
  end
end

g = Greeter.new
puts g.greet`,
          tests: [
            { id: 1, label: "Defines Greeter class", keywords: [{ pattern: "class\\s+Greeter" }] },
            { id: 2, label: "Defines greet method", keywords: [{ pattern: "def\\s+greet" }] },
            { id: 3, label: "Prints Hello OOP", keywords: [{ pattern: "Hello\\s*OOP" }] },
          ],
        },
      },
      {
        id: "ruby-oop-1",
        title: "Classes, Instances & initialize",
        xp: 12,
        theory: [
          text(
            "`class` defines a blueprint. `initialize` is the constructor called when `new` is used. Instance variables start with `@` and are unique per object.",
            {
              label: "Basic class with initialize",
              content: `class Cat
  def initialize(name)
    @name = name
  end

  def speak
    "Meow, I am #{@name}"
  end
end

kitty = Cat.new("Kitty")
puts kitty.speak`,
            },
          ),
          quiz(
            "What method does Ruby call after `Class.new`?",
            ["start", "initialize", "construct", "create"],
            1,
            "Ruby calls `initialize` on the newly allocated object when you call `.new`."
          ),
        ],
        challenge: {
          title: "Person Intro",
          description: "Create `Person` with `initialize(name, age)` and a method `info` that returns `\"<name> is <age>\"`. Instantiate and print.",
          starterCode: `# Implement Person with initialize and info
class Person
  def initialize(name, age)
    # set @name and @age
  end

  def info
    # return formatted string
  end
end

# Example: puts Person.new("Ava", 30).info`,
          solutionCode: `class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def info
    "#{@name} is #{@age}"
  end
end

puts Person.new("Ava", 30).info`,
          tests: [
            { id: 1, label: "Uses initialize", keywords: [{ pattern: "def\\s+initialize" }] },
            { id: 2, label: "Creates instance", keywords: [{ pattern: "Person\\.new" }] },
            { id: 3, label: "Prints info", keywords: [{ pattern: "is\\s*\\d+" }] },
          ],
        },
      },
    ],
  },

  {
    id: "oop-core",
    title: "Encapsulation & Accessors",
    stage: "beginner",
    icon: "🔐",
    color: "#db2777",
    lessons: [
      {
        id: "ruby-oop-2",
        title: "attr_reader / writer / accessor",
        xp: 14,
        theory: [
          text(
            "Ruby provides `attr_reader`, `attr_writer`, and `attr_accessor` macros to avoid boilerplate getters and setters.",
            {
              label: "Accessor example",
              content: `class Book
  attr_accessor :title, :author

  def initialize(title, author)
    @title = title
    @author = author
  end
end

book = Book.new("1984", "Orwell")
puts book.title`,
            },
          ),
          callout("tip", "Prefer `attr_reader` when you only need read access — it keeps invariants intact."),
        ],
        challenge: {
          title: "Immutable Record",
          description: "Define `Config` with `attr_reader :env` and initialize `env` to `'production'`. Print `env`.",
          starterCode: `# Implement Config with an env reader
class Config
  # attr_reader :env

  def initialize
    # @env = ...
  end
end

puts Config.new.env`,
          solutionCode: `class Config
  attr_reader :env

  def initialize
    @env = "production"
  end
end

puts Config.new.env`,
          tests: [
            { id: 1, label: "Uses attr_reader", keywords: [{ pattern: "attr_reader" }] },
            { id: 2, label: "Initializes env", keywords: [{ pattern: "@env" }] },
          ],
        },
      },
      {
        id: "ruby-oop-3",
        title: "Encapsulation & private methods",
        xp: 14,
        theory: [
          text(
            "Use `private` to hide internal helper methods. Private methods cannot be called with an explicit receiver from outside the object.",
            {
              label: "Private example",
              content: `class Wallet
  def initialize
    @balance = 0
  end

  def deposit(n)
    add(n)
  end

  def total
    @balance
  end

  private

  def add(n)
    @balance += n
  end
end

w = Wallet.new
w.deposit(25)
puts w.total`,
            },
          ),
        ],
        challenge: {
          title: "Protected Helper",
          description: "Create class `Counter` where `increment` calls a private method `step` to add 1. Print the value after one increment.",
          starterCode: `# Implement Counter using a private step helper
class Counter
  # def initialize; end
  # def increment; end
  # def value; end
  private
  # def step; end
end

c = Counter.new
c.increment
puts c.value`,
          solutionCode: `class Counter
  def initialize
    @v = 0
  end

  def increment
    step
  end

  def value
    @v
  end

  private

  def step
    @v += 1
  end
end

c = Counter.new
c.increment
puts c.value`,
          tests: [
            { id: 1, label: "Private step", keywords: [{ pattern: "private" }] },
            { id: 2, label: "Calls step from increment", keywords: [{ pattern: "step" }] },
          ],
        },
      },
    ],
  },

  {
    id: "inheritance",
    title: "Inheritance & Polymorphism",
    stage: "intermediate",
    icon: "🧬",
    color: "#f97316",
    lessons: [
      {
        id: "ruby-oop-4",
        title: "Subclassing & super",
        xp: 16,
        theory: [
          text(
            "Subclassing allows specialized behavior. Use `super` to call the parent implementation (often used inside `initialize`).",
            {
              label: "Subclass example",
              content: `class Animal
  def speak
    "..."
  end
end

class Dog < Animal
  def speak
    super + " Woof"
  end
end

puts Dog.new.speak`,
            },
          ),
          quiz(
            "What does `super` do when used inside a method?",
            ["Calls sibling method", "Calls the same method on the superclass", "Creates a new object", "Raises an exception"],
            1,
            "`super` invokes the parent's implementation of the current method." 
          ),
        ],
        challenge: {
          title: "Shape Area",
          description: "Create `class Shape` with `area` returning 0. Subclass `Square` with `initialize(side)` and override `area` to return `side*side`. Print Square.new(3).area.",
          starterCode: `# Implement Shape and Square
class Shape
  def area
    0
  end
end

class Square < Shape
  def initialize(side)
    # store side
  end

  def area
    # compute side*side
  end
end

puts Square.new(3).area`,
          solutionCode: `class Shape
  def area
    0
  end
end

class Square < Shape
  def initialize(side)
    @side = side
  end

  def area
    @side * @side
  end
end

puts Square.new(3).area`,
          tests: [
            { id: 1, label: "Defines subclass", keywords: [{ pattern: "class\\s+Square\\s+<\\s+Shape" }] },
            { id: 2, label: "Calculates area", keywords: [{ pattern: "area" }] },
          ],
        },
      },
      {
        id: "ruby-oop-5",
        title: "Polymorphism via duck-typing",
        xp: 14,
        theory: [
          text(
            "Ruby favors duck-typing: if an object responds to the required methods, it can be used even if it doesn't share a common ancestor. This enables flexible polymorphism.",
            {
              label: "Duck example",
              content: `def speak_twice(obj)
  puts obj.speak
  puts obj.speak
end

class Parrot
  def speak
    "Squawk"
  end
end

s = Parrot.new
speak_twice(s)`,
            },
          ),
        ],
        challenge: {
          title: "Duck Runner",
          description: "Write `run_all(things)` that calls `run` on each object in `things`. Given objects that implement `run`, print the results via `puts`.",
          starterCode: `# Implement run_all to call run on each object
def run_all(things)
  # return an array of results
end

class Car
  def run
    "vroom"
  end
end

puts run_all([Car.new]).inspect`,
          solutionCode: `def run_all(things)
  things.map { |t| t.run }
end

class Car
  def run
    "vroom"
  end
end

puts run_all([Car.new]).inspect`,
          tests: [
            { id: 1, label: "Implements run_all", keywords: [{ pattern: "def\\s+run_all" }] },
            { id: 2, label: "Calls run on objects", keywords: [{ pattern: "t.run" }] },
          ],
        },
      },
    ],
  },

  {
    id: "mixins",
    title: "Modules & Mixins — Intermediate",
    stage: "intermediate",
    icon: "🔀",
    color: "#7e22ce",
    lessons: [
      {
        id: "ruby-oop-6",
        title: "Modules as Mixins",
        xp: 16,
        theory: [
          text(
            "Modules provide shared behavior without classical multiple inheritance. Use `include` to mix instance methods and `extend` to add class methods.",
            {
              label: "Mixin example",
              content: `module Walkable
  def walk
    "walking"
  end
end

class Person
  include Walkable
end

puts Person.new.walk`,
            },
          ),
        ],
        challenge: {
          title: "Logger Mixin",
          description: "Create `module Logger` with `log(msg)` that prints `Log: <msg>`. Include it in `App` and call `App.new.log('Hi')`.",
          starterCode: `# Implement Logger mixin and include it into App
module Logger
  # def log(msg); end
end

class App
  # include Logger
end

App.new.log("Hi")`,
          solutionCode: `module Logger
  def log(msg)
    puts "Log: #{msg}"
  end
end

class App
  include Logger
end

App.new.log("Hi")`,
          tests: [
            { id: 1, label: "Defines module Logger", keywords: [{ pattern: "module\\s+Logger" }] },
            { id: 2, label: "Includes Logger", keywords: [{ pattern: "include\\s+Logger" }] },
          ],
        },
      },
    ],
  },

  {
    id: "advanced",
    title: "Advanced OOP Patterns",
    stage: "advanced",
    icon: "⚙️",
    color: "#1d4ed8",
    lessons: [
      {
        id: "ruby-oop-7",
        title: "Metaprogramming Basics",
        xp: 18,
        theory: [
          text(
            "Ruby's metaprogramming lets you define methods dynamically. Use `define_method` and `send` carefully — they enable powerful DSLs but can reduce readability if overused.",
            {
              label: "define_method example",
              content: `class Config
  %w[host port].each do |name|
    define_method(name) { @values ||= {}; @values[name] }
  end
end

cfg = Config.new
puts cfg.host.inspect`,
            },
          ),
        ],
        challenge: {
          title: "Dynamic Accessors",
          description: "Write `class Dyn` which creates reader methods for keys passed into `initialize(keys)` using `define_method`. Create Dyn.new([:a]).a and print `nil` (no error).",
          starterCode: `# Implement Dyn so instances respond to dynamic readers
class Dyn
  def initialize(keys)
    # create reader methods for keys
  end
end

puts Dyn.new([:a]).a.inspect`,
          solutionCode: `class Dyn
  def initialize(keys)
    keys.each do |k|
      self.class.send(:define_method, k) { nil }
    end
  end
end

puts Dyn.new([:a]).a.inspect`,
          tests: [
            { id: 1, label: "Uses define_singleton_method", keywords: [{ pattern: "define_singleton_method" }] },
            { id: 2, label: "Returns nil for missing value", keywords: [{ pattern: "nil" }] },
          ],
        },
      },
      {
        id: "ruby-oop-8",
        title: "Design Patterns & SOLID Notes",
        xp: 20,
        theory: [
          text(
            "A quick tour of common OOP patterns in Ruby: factories, decorators, and simple dependency injection. Focus on single responsibility and small, testable objects."
          ),
          callout("tip", "Prefer composition over inheritance when objects have loosely related behavior."),
        ],
        challenge: {
          title: "Factory Simple",
          description: "Implement `class AnimalFactory.build(type)` that returns `Dog.new` when `type == :dog` else `Animal.new`. Print the class name of the built object.",
          starterCode: `# Implement a simple factory method
class Animal; end
class Dog < Animal; end

class AnimalFactory
  def self.build(type)
    # return appropriate instance
  end
end

puts AnimalFactory.build(:dog).class`,
          solutionCode: `class Animal
end

class Dog < Animal
end

class AnimalFactory
  def self.build(type)
    return Dog.new if type == :dog
    Animal.new
  end
end

puts AnimalFactory.build(:dog).class`,
          tests: [
            { id: 1, label: "Defines AnimalFactory.build", keywords: [{ pattern: "def\\s+self\\.build" }] },
            { id: 2, label: "Returns Dog for :dog", keywords: [{ pattern: "Dog\\.new" }] },
          ],
        },
      },
    ],
  },
  // New Pro-level chapters added for deeper mastery
  {
    id: "concurrency",
    title: "Concurrency & Parallelism — Pro",
    stage: "pro",
    icon: "⚡",
    color: "#0ea5e9",
    lessons: [
      {
        id: "ruby-oop-9",
        title: "Threads Basics",
        xp: 18,
        theory: [
          text(
            "Ruby's `Thread` class allows concurrent execution. Threads share memory, so synchronization may be needed.",
            {
              label: "Thread example",
              content: `# Create a runnable block instead of a system thread
thread_mock = -> { puts "Hello from thread" }

# Execute it sequentially
thread_mock.call`
            }
          ),
        ],
        challenge: {
          title: "Thread Counter",
          description: "Create a shared counter variable. Spawn 5 threads, each incrementing the counter 10 times using a mutex. Print final counter value (should be 50).",
          starterCode: `require 'thread'\ncounter = 0\nmutex = Mutex.new\nthreads = 5.times.map do\n  Thread.new do\n    10.times do\n      # increment counter safely\n    end\n  end\nend\nthreads.each(&:join)\nputs counter`,
          solutionCode: `require 'thread'\ncounter = 0\nmutex = Mutex.new\nthreads = 5.times.map do\n  Thread.new do\n    10.times do\n      mutex.synchronize { counter += 1 }\n    end\n  end\nend\nthreads.each(&:join)\nputs counter`,
          tests: [
            { id: 1, label: "Uses Thread", keywords: [{ pattern: "Thread\\.new" }] },
            { id: 2, label: "Uses Mutex", keywords: [{ pattern: "Mutex" }] },
          ],
        },
      },
      {
        id: "ruby-oop-10",
        title: "Fiber Cooperative Scheduling",
        xp: 16,
        theory: [
          text(
            "Fibers provide lightweight cooperative concurrency. They must be resumed manually.",
            {
              label: "Fiber example",
              content: `fiber = Fiber.new { puts "inside fiber" }\nputs "before"\nfiber.resume\nputs "after"`
            }
          ),
        ],
        challenge: {
          title: "Fiber Sequence",
          description: "Create two fibers that each yield a number (1 and 2). Resume them alternately to produce output `1 2`. Print the numbers separated by space.",
          starterCode: `# Implement two fibers that yield numbers\nfib1 = Fiber.new { /* yield 1 */ }\nfib2 = Fiber.new { /* yield 2 */ }\n# resume alternately and collect results\nresult = []\n# ...\nputs result.join(' ')`,
          solutionCode: `fib1 = Fiber.new { Fiber.yield 1 }\nfib2 = Fiber.new { Fiber.yield 2 }\nresult = []\nresult << fib1.resume\nresult << fib2.resume\nputs result.join(' ')`,
          tests: [
            { id: 1, label: "Uses Fiber", keywords: [{ pattern: "Fiber\\.new" }] },
            { id: 2, label: "Yields values", keywords: [{ pattern: "Fiber\\.yield" }] },
          ],
        },
      },
    ],
  },
  {
    id: "gems",
    title: "Ruby Gems & Packaging — Pro",
    stage: "pro",
    icon: "📦",
    color: "#6d28d9",
    lessons: [
      {
        id: "ruby-oop-11",
        title: "Creating a Gem",
        xp: 20,
        theory: [
          text(
            "A gem is a packaged Ruby library. Use `bundle gem <name>` to scaffold. Include a version file and a simple class.",
            {
              label: "Gemfile example",
              content: `# my_gem.gemspec
spec = Gem::Specification.new do |spec|
  spec.name = "my_gem"
  spec.version = "0.1.0"
  spec.summary = "Example gem"
  spec.files = Dir["lib/**/*.rb"]
  
  # Note: RubyGems usually requires an author and email to fully validate!
  spec.author = "Your Name"
  spec.email = "you@example.com"
end

# Print the name and files list to verify it works in your browser terminal
puts "Gem Name: #{spec.name}"
puts "Included Files: #{spec.files.inspect}"`
            }
          ),
        ],
        challenge: {
          title: "Simple Gem Skeleton",
          description: "Write a minimal gemspec string for a gem named `awesome_gem` version `0.0.1` with summary `Awesome gem`. Return the gemspec content as a string.",
          starterCode: `def gemspec(name, version, summary)\n  # return gemspec string\nend\nputs gemspec('awesome_gem', '0.0.1', 'Awesome gem')`,
          solutionCode: `def gemspec(name, version, summary)\n  <<~GEMSPEC\n    Gem::Specification.new do |spec|\n      spec.name = "#{name}"\n      spec.version = "#{version}"\n      spec.summary = "#{summary}"\n      spec.files = []\n    end\n  GEMSPEC\nend\nputs gemspec('awesome_gem', '0.0.1', 'Awesome gem')`,
          tests: [
            { id: 1, label: "Returns Gem::Specification", keywords: [{ pattern: "Gem::Specification" }] },
          ],
        },
      },
      {
        id: "ruby-oop-12",
        title: "Using Bundler & Gemfile",
        xp: 14,
        theory: [
          text(
            "Bundler manages gem dependencies via a `Gemfile`. Use `bundle install` to install and `require` gems in code.",
            {
              label: "Gemfile example",
              content: `# A lightweight simulation of Bundler's DSL for restricted environments
class SandboxBundler
  def self.inline(&block)
    puts "=== [Bundler] Resolving dependencies... ==="
    context = new
    context.instance_eval(&block)
    puts "=== [Bundler] Environment locked and loaded! ===\n\n"
  end

  def source(url)
    puts "  -> Checking registry: #{url}"
  end

  def gem(name, version = nil)
    puts "  -> Loading dependency: '#{name}' #{version ? "(#{version})" : '(latest)'}"
    # Safely require the library (json is built-into the browser's Ruby)
    require name
  end
end

# --- RUNNABLE CODE ---
# This mimics the exact structure of your Gemfile inline code!
SandboxBundler.inline do
  source 'https://rubygems.org'
  gem 'json'
end

# Now you can use the loaded gem safely!
data = { 
  status: "success", 
  message: "Run successful! This simulation bypassed the browser's disk restrictions." 
}

puts JSON.pretty_generate(data)`
            }
          ),
        ],
        challenge: {
          title: "Gemfile Parser",
          description: "Write a method `list_gems(gemfile_content)` that returns an array of gem names defined in a Gemfile string (ignore version specs). Example input `'gem \"rails\", \"~>6.0\"\n gem \"puma\"'` should output `['rails','puma']`.",
          starterCode: `def list_gems(content)\n  # parse gem lines\nend\nputs list_gems("gem 'rails', '~>6.0'\n gem 'puma'").inspect`,
          solutionCode: `def list_gems(content)\n  content.lines.map do |line|\n    if line.strip.start_with?('gem')\n      line[/['"]([^'\\"]+)['"]/,1]\n    end\n  end.compact\nend\nputs list_gems("gem 'rails', '~>6.0'\n gem 'puma'").inspect`,
          tests: [
            { id: 1, label: "Parses gem names", keywords: [{ pattern: "gem'" }] },
          ],
        },
      },
    ],
  },
];

export const RUBY_OOP_LESSONS = RUBY_OOP_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUBY_OOP_TOTAL_XP = RUBY_OOP_LESSONS.reduce((s, l) => s + l.xp, 0);
