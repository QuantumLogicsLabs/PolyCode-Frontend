// PolyCode — Ruby OOP course (Beginner → Advanced)

const ACCENT = "#10b981"; // Green accent for OOP course

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

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

export const RUBY_OOP_CHAPTERS = [
  {
    id: "oop-basics",
    title: "Classes & Objects — Beginner",
    stage: "beginner",
    icon: "📦",
    color: ACCENT,
    lessons: [
      {
        id: "oop-0",
        title: "Introduction to Classes and Objects",
        xp: 10,
        theory: [
          text(
            "Object-Oriented Programming (OOP) is a programming paradigm based on 'objects' which contain data (attributes) and behavior (methods). In Ruby, absolutely everything is an object."
          ),
          text(
            "A class serves as a blueprint for creating objects. You define a class using the `class` keyword and instantiate new objects using `.new`.",
            {
              label: "Basic Class Example with Comments",
              content: `# Define the Car class
class Car
  # attr_accessor creates getter and setter methods automatically
  attr_accessor :brand, :model

  # Constructor method to initialize object attributes
  def initialize(brand, model)
    @brand = brand
    @model = model
  end

  # Instance method
  def start_engine
    "The #{@brand} #{@model} engine is now running. Vroom!"
  end
end

# Instantiate a new object from the Car class
my_car = Car.new("Toyota", "Corolla")
puts my_car.start_engine`,
            }
          ),
        ],
        challenge: {
          title: "Create a Dog Class",
          description: "Define a `Dog` class with `name` and `breed` attributes via `initialize`, and a `bark` method that returns 'Woof! My name is [name].'",
          starterCode: `class Dog
  # TODO: Define attr_accessor, initialize, and bark methods
end

dog = Dog.new("Rover", "Golden Retriever")
puts dog.bark`,
          solutionCode: `class Dog
  attr_accessor :name, :breed

  def initialize(name, breed)
    @name = name
    @breed = breed
  end

  def bark
    "Woof! My name is #{@name}."
  end
end

dog = Dog.new("Rover", "Golden Retriever")
puts dog.bark`,
          tests: [
            { id: 1, label: "Has Dog class", keywords: [{ pattern: "class Dog" }] },
            { id: 2, label: "Has initialize method", keywords: [{ pattern: "def initialize" }] },
            { id: 3, label: "Has bark method", keywords: [{ pattern: "def bark" }] },
          ],
        },
      },
    ],
  },
  {
    id: "oop-inheritance",
    title: "Inheritance & Polymorphism — Intermediate",
    stage: "intermediate",
    icon: "🧬",
    color: "#059669",
    lessons: [
      {
        id: "oop-1",
        title: "Class Inheritance and Super",
        xp: 15,
        theory: [
          text(
            "Inheritance allows a child class to inherit methods and attributes from a parent class using the `<` symbol. The `super` keyword passes arguments up to the parent class.",
            {
              label: "Inheritance Example",
              content: `# Parent (Superclass)
class Animal
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def speak
    "#{@name} makes a sound."
  end
end

# Child (Subclass) inheriting from Animal
class Cat < Animal
  def speak
    # Call parent's speak method using super and append text
    super + " Meow!"
  end
end

cat = Cat.new("Whiskers")
puts cat.speak`,
            }
          ),
        ],
        challenge: {
          title: "Manager Subclass",
          description: "Create an `Employee` base class and a `Manager` subclass that inherits from `Employee` using `super` to initialize department.",
          starterCode: `class Employee
  attr_accessor :name, :salary
  def initialize(name, salary)
    @name = name
    @salary = salary
  end
end

class Manager < Employee
  # TODO: Add department and call super
end`,
          solutionCode: `class Employee
  attr_accessor :name, :salary
  def initialize(name, salary)
    @name = name
    @salary = salary
  end
end

class Manager < Employee
  attr_accessor :department

  def initialize(name, salary, department)
    super(name, salary) # Passes name and salary to Employee
    @department = department
  end
end

mgr = Manager.new("Alice", 80000, "Engineering")
puts "#{mgr.name} manages #{mgr.department}"`,
          tests: [
            { id: 1, label: "Manager inherits from Employee", keywords: [{ pattern: "class Manager < Employee" }] },
            { id: 2, label: "Passes name and salary up with super(...)", keywords: [{ pattern: "super\\s*\\(" }] },
            { id: 3, label: "Stores the department", keywords: [{ pattern: "@department\\s*=" }] },
          ],
        },
      },
    ],
  },
  {
    id: "oop-equality",
    title: "Equality & Comparison — Intermediate",
    stage: "intermediate",
    icon: "⚖️",
    color: "#0d9488",
    lessons: [
      {
        id: "oop-3",
        title: "to_s and inspect",
        xp: 20,
        theory: [
          text(
            "Every Ruby object can describe itself in two ways, and both methods come from `Object`. `to_s` is the **friendly** version, meant for people reading your program's output. `inspect` is the **developer** version, meant for debugging. `puts` and string interpolation call `to_s`; `p` calls `inspect`.",
          ),
          text(
            "Without your own versions, Ruby prints the class name and a memory address, which tells a reader almost nothing. Overriding both methods gives each object a clear voice.",
            {
              label: "Default output vs custom to_s and inspect",
              content: `class Weight
  attr_reader :kilograms

  def initialize(kilograms)
    @kilograms = kilograms
  end
end

bag = Weight.new(2.5)
puts bag.to_s.start_with?("#<Weight")  # true - the default looks like #<Weight:0x...>

class Weight
  def to_s
    "#{kilograms} kg"
  end

  def inspect
    "#<Weight kilograms=#{kilograms}>"
  end
end

puts bag            # uses to_s
p bag               # uses inspect
puts "Pack #{bag}"  # interpolation uses to_s too`,
            },
          ),
          text(
            "Collections lean on the same two methods. `p` on an array calls `inspect` on every element, and so does interpolating an array, because `Array#to_s` is an alias of `inspect`. `puts` with an array is the odd one out: it prints each element on its own line using `to_s`.",
            {
              label: "How arrays print their elements",
              content: `class Weight
  attr_reader :kilograms

  def initialize(kilograms)
    @kilograms = kilograms
  end

  def to_s
    "#{kilograms} kg"
  end

  def inspect
    "#<Weight kilograms=#{kilograms}>"
  end
end

weights = [Weight.new(1), Weight.new(3.2)]
puts weights            # one line per element, each via to_s
p weights               # inspect on every element
puts "All: #{weights}"  # Array#to_s is inspect`,
            },
          ),
          callout(
            "tip",
            "Write `to_s` for your users and `inspect` for future you. A good `inspect` shows the class name and the fields that identify the object, so a debugging line like `p order` tells the whole story.",
          ),
          callout(
            "info",
            "`p` returns the object it printed, while `puts` returns `nil`. That makes `p` handy in the middle of an expression when you are debugging.",
          ),
          quiz(
            "Which method does `puts invoice` call to turn `invoice` into text?",
            ["inspect", "to_s", "to_str", "display"],
            1,
            "`puts` (and string interpolation) call `to_s`. `p` is the one that calls `inspect`.",
          ),
          quiz(
            "What does `p [item]` use to show `item`?",
            ["item.to_s", "item.inspect", "item.name", "Nothing: it prints the array's memory address"],
            1,
            "`p` calls `inspect` on the array, and an array's `inspect` calls `inspect` on every element.",
          ),
        ],
        challenge: {
          title: "Readable Prices",
          description:
            "The `Price` class stores an amount in **cents** plus a currency code. Give it a `to_s` that returns the amount with two decimals and the currency (`12.50 USD`), and an `inspect` that returns `#<Price 1250 USD>`. The program prints the price once with `puts` and once with `p`.",
          starterCode: `class Price
  attr_reader :cents, :currency

  def initialize(cents, currency)
    @cents = cents
    @currency = currency
  end

  # Add to_s and inspect below
end

lunch = Price.new(1250, "USD")
puts lunch
p lunch`,
          solutionCode: `class Price
  attr_reader :cents, :currency

  def initialize(cents, currency)
    @cents = cents
    @currency = currency
  end

  def to_s
    format("%.2f %s", cents / 100.0, currency)
  end

  def inspect
    "#<Price #{cents} #{currency}>"
  end
end

lunch = Price.new(1250, "USD")
puts lunch
p lunch`,
          tests: [
            { id: 1, label: "Defines to_s", keywords: [{ pattern: "def\\s+to_s\\b" }] },
            { id: 2, label: "Defines inspect", keywords: [{ pattern: "def\\s+inspect\\b" }] },
            { id: 3, label: "Formats the amount with two decimals", keywords: [{ pattern: "%\\.2f" }] },
            { id: 4, label: "Prints with puts and with p", keywords: [{ pattern: "puts\\s+lunch[\\s\\S]*\\bp\\s+lunch" }] },
          ],
        },
      },
      {
        id: "oop-4",
        title: "==, eql? and hash",
        xp: 20,
        theory: [
          text(
            "Ruby has several ways to ask \"are these the same?\", and they answer different questions. `equal?` asks whether two variables point at the **very same object**. `==` asks whether two objects have the **same value**. Out of the box, `Object#==` behaves just like `equal?`, so two objects built from identical data are *not* equal until you say what equality means for your class.",
          ),
          text(
            "Define `==` by comparing the fields that give the object its identity. Checking the class first stops a `GridPoint` from matching some unrelated object that happens to have `x` and `y` methods.",
            {
              label: "Value equality with ==",
              content: `class GridPoint
  attr_reader :x, :y

  def initialize(x, y)
    @x = x
    @y = y
  end

  def ==(other)
    other.is_a?(GridPoint) && x == other.x && y == other.y
  end
end

a = GridPoint.new(2, 3)
b = GridPoint.new(2, 3)

puts a == b        # true  - same value
puts a.equal?(b)   # false - still two separate objects
puts a == "2,3"    # false - a different kind of object`,
            },
          ),
          text(
            "`==` alone is not enough for hashes. `Hash` lookups, `Set` and `Array#uniq` group objects with `hash` (to pick a bucket) and `eql?` (to confirm a match). If you only define `==`, duplicates slip through and lookups miss. Build `hash` from the same fields that `==` compares.",
            {
              label: "Making objects work as hash keys",
              content: `require "set"

class GridPoint
  attr_reader :x, :y

  def initialize(x, y)
    @x = x
    @y = y
  end

  def ==(other)
    other.is_a?(GridPoint) && x == other.x && y == other.y
  end
  alias eql? ==

  def hash
    [GridPoint, x, y].hash
  end
end

visited = Set.new
visited << GridPoint.new(0, 0)
visited << GridPoint.new(0, 0)
puts visited.size                                        # 1

labels = { GridPoint.new(1, 1) => "start" }
puts labels[GridPoint.new(1, 1)]                         # start

puts [GridPoint.new(4, 4), GridPoint.new(4, 4)].uniq.size  # 1`,
            },
          ),
          diagram("Three kinds of sameness", [
            {
              id: "identity",
              label: "equal?",
              items: ["Same object in memory", "Never override it", "a.equal?(a.dup) is false"],
            },
            {
              id: "value",
              label: "==",
              items: ["Same meaningful value", "Used by include? and comparisons", "Override it for value objects"],
            },
            {
              id: "hashing",
              label: "eql? and hash",
              items: ["Used by Hash, Set and uniq", "eql? objects must share a hash", "Build hash from the fields == uses"],
            },
          ]),
          text(
            "Ruby's own numbers show the difference: `1 == 1.0` is `true`, but `1.eql?(1.0)` is `false`, because `eql?` also requires the same type. That is why `{ 1 => :a }[1.0]` returns `nil`.",
          ),
          callout(
            "warning",
            "Keep `hash` and `eql?` in step: whenever `a.eql?(b)` is true, `a.hash` must equal `b.hash`. And don't change an object's fields after using it as a hash key. Its `hash` changes, and the hash can no longer find it until you call `rehash`.",
          ),
          quiz(
            "Which pair of methods does a `Hash` use to find a key?",
            ["== and equal?", "hash and eql?", "<=> and ==", "to_s and inspect"],
            1,
            "A hash computes `hash` to find the right bucket, then uses `eql?` to confirm the key matches.",
          ),
          quiz(
            "You defined `==` on `Card` but not `eql?` or `hash`. Two cards have equal values. What does `[card_a, card_b].uniq.size` return?",
            ["1", "2", "It raises NoMethodError", "0"],
            1,
            "`uniq` relies on `hash` and `eql?`, which still compare object identity, so both cards are kept.",
          ),
        ],
        challenge: {
          title: "Deduplicate Library Books",
          description:
            "Two `LibraryBook` objects describe the same book when their **ISBN** matches, even if the titles are written differently. Define `==` to compare ISBNs, make `eql?` behave the same way, and define `hash` from the ISBN so `uniq` and hash lookups treat matching books as one. The program should print `2` and `Amina`.",
          starterCode: `class LibraryBook
  attr_reader :isbn, :title

  def initialize(isbn, title)
    @isbn = isbn
    @title = title
  end

  # Define equality based on the ISBN below
end

shelf = [
  LibraryBook.new("978-1-4028-9462-6", "The Quiet Compiler"),
  LibraryBook.new("978-1-4028-9462-6", "The Quiet Compiler (reprint)"),
  LibraryBook.new("978-0-3064-0615-7", "Gardens of Syntax")
]

puts shelf.uniq.size
loans = { shelf[0] => "Amina" }
puts loans[shelf[1]] || "not on loan"`,
          solutionCode: `class LibraryBook
  attr_reader :isbn, :title

  def initialize(isbn, title)
    @isbn = isbn
    @title = title
  end

  def ==(other)
    other.is_a?(LibraryBook) && isbn == other.isbn
  end
  alias eql? ==

  def hash
    isbn.hash
  end
end

shelf = [
  LibraryBook.new("978-1-4028-9462-6", "The Quiet Compiler"),
  LibraryBook.new("978-1-4028-9462-6", "The Quiet Compiler (reprint)"),
  LibraryBook.new("978-0-3064-0615-7", "Gardens of Syntax")
]

puts shelf.uniq.size
loans = { shelf[0] => "Amina" }
puts loans[shelf[1]] || "not on loan"`,
          tests: [
            { id: 1, label: "Defines ==", keywords: [{ pattern: "def\\s+==" }] },
            {
              id: 2,
              label: "Makes eql? behave like ==",
              keywords: [{ pattern: "alias\\s+:?eql\\?\\s+:?==|alias_method\\s+:eql\\?|def\\s+eql\\?" }],
            },
            { id: 3, label: "Defines hash from the ISBN", keywords: [{ pattern: "def\\s+hash\\b[\\s\\S]*?isbn" }] },
            {
              id: 4,
              label: "Compares ISBNs",
              keywords: [{ pattern: "isbn\\s*==\\s*other\\.isbn|other\\.isbn\\s*==\\s*isbn" }],
            },
          ],
        },
      },
      {
        id: "oop-5",
        title: "<=> and Comparable",
        xp: 20,
        theory: [
          text(
            "Sorting needs one question answered over and over: *which of these two comes first?* Ruby asks it with the **spaceship operator** `<=>`. It returns a negative number when the left side is smaller, `0` when the two are equal, a positive number when the left side is larger, and `nil` when they can't be compared at all.",
            {
              label: "The spaceship on built-in values",
              content: `puts 3 <=> 7            # -1
puts "b" <=> "a"        # 1
puts [1, 2] <=> [1, 2]  # 0
p 5 <=> "five"          # nil - not comparable`,
            },
          ),
          text(
            "Define `<=>` on your own class and `sort`, `min` and `max` start working. Mix in the `Comparable` module as well and you get `<`, `<=`, `==`, `>`, `>=`, `between?` and `clamp` for free, all built on your one method. Arrays compare element by element, which makes them handy for multi-part values like version numbers. Sorting the raw strings would wrongly put `1.10.0` first.",
            {
              label: "A comparable version number",
              content: `class AppVersion
  include Comparable
  attr_reader :major, :minor, :patch

  def initialize(text)
    @major, @minor, @patch = text.split(".").map(&:to_i)
  end

  def <=>(other)
    return nil unless other.is_a?(AppVersion)

    [major, minor, patch] <=> [other.major, other.minor, other.patch]
  end

  def to_s
    [major, minor, patch].join(".")
  end
end

releases = %w[1.10.0 1.2.5 1.2.10].map { |t| AppVersion.new(t) }
puts releases.sort.join(", ")  # 1.2.5, 1.2.10, 1.10.0
puts releases.max              # 1.10.0
puts AppVersion.new("2.0.0") > AppVersion.new("1.9.9")
puts AppVersion.new("1.5.0").between?(releases.min, releases.max)

begin
  AppVersion.new("1.0.0") < "1.0.0"
rescue ArgumentError => e
  puts e.message
end`,
            },
          ),
          text(
            "Returning `nil` for unrelated objects matters. `Comparable` turns that `nil` into a clear `ArgumentError` naming both sides, instead of a confusing crash deep inside your method when it calls `other.major` on a string.",
          ),
          callout(
            "tip",
            "`Comparable` gives you `==` too, based on `<=>` returning `0`. It does **not** give you `eql?` or `hash`, so objects you keep in a `Hash` or `Set` still need those from the previous lesson.",
          ),
          quiz(
            "What should `a <=> b` return when `a` should be sorted before `b`?",
            ["A negative number such as -1", "0", "true", "nil"],
            0,
            "Negative means the left side comes first, 0 means equal, positive means it comes after, and nil means the two can't be compared.",
          ),
          quiz(
            "After `include Comparable` and defining `<=>`, which method do you get for free?",
            ["sort_by", "between?", "each", "uniq"],
            1,
            "`Comparable` adds `<`, `<=`, `==`, `>`, `>=`, `between?` and `clamp`. `sort_by`, `each` and `uniq` come from `Enumerable` or `Array`.",
          ),
        ],
        challenge: {
          title: "Sortable Durations",
          description:
            "A `Duration` stores a length of time in seconds and prints itself as `m:ss`. Make durations comparable: include `Comparable` and define `<=>` using the seconds. Then the program sorts the track lengths, prints the longest, and checks whether 3:30 falls between the shortest and the longest.",
          starterCode: `class Duration
  attr_reader :seconds

  def initialize(seconds)
    @seconds = seconds
  end

  def to_s
    format("%d:%02d", seconds / 60, seconds % 60)
  end
end

tracks = [Duration.new(245), Duration.new(187), Duration.new(302)]
puts tracks.sort.join(", ")
puts tracks.max
puts Duration.new(210).between?(tracks.min, tracks.max)`,
          solutionCode: `class Duration
  include Comparable
  attr_reader :seconds

  def initialize(seconds)
    @seconds = seconds
  end

  def <=>(other)
    return nil unless other.is_a?(Duration)

    seconds <=> other.seconds
  end

  def to_s
    format("%d:%02d", seconds / 60, seconds % 60)
  end
end

tracks = [Duration.new(245), Duration.new(187), Duration.new(302)]
puts tracks.sort.join(", ")
puts tracks.max
puts Duration.new(210).between?(tracks.min, tracks.max)`,
          tests: [
            { id: 1, label: "Includes Comparable", keywords: [{ pattern: "include\\s+Comparable" }] },
            { id: 2, label: "Defines <=>", keywords: [{ pattern: "def\\s+<=>" }] },
            {
              id: 3,
              label: "Compares durations by seconds",
              keywords: [{ pattern: "seconds\\s*<=>\\s*other\\.seconds|other\\.seconds\\s*<=>\\s*seconds" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "oop-class-design",
    title: "Class-Level Design — Pro",
    stage: "pro",
    icon: "🏛️",
    color: "#7c3aed",
    lessons: [
      {
        id: "oop-6",
        title: "Class Methods & Factory Constructors",
        xp: 25,
        theory: [
          text(
            "Instance methods run on one object. **Class methods** run on the class itself, which is an object too. Define one with `def self.method_name`: inside a class body `self` refers to the class, so `self.` attaches the method to it. You have already used class methods such as `Time.now`, `File.read` and `Integer.sqrt`.",
          ),
          text(
            "A common use is a **factory**: a named constructor that converts some input and then calls `new`. The name tells readers what kind of input it expects, which `new` alone can't do.",
            {
              label: "Named constructors",
              content: `class Temperature
  attr_reader :celsius

  def initialize(celsius)
    @celsius = celsius
  end

  def self.from_fahrenheit(degrees)
    new((degrees - 32) * 5 / 9.0)
  end

  def self.freezing
    new(0)
  end

  def to_s
    format("%.1f°C", celsius)
  end
end

puts Temperature.new(21)
puts Temperature.from_fahrenheit(98.6)
puts Temperature.freezing`,
            },
          ),
          text(
            "When a class has several class methods, `class << self` opens the class's **singleton class**, so you can write them as ordinary `def`s. `private_class_method :new` goes one step further and forces callers through your factories, which is useful when every instance must pass validation.",
            {
              label: "class << self and a private new",
              content: `class InviteCode
  ALPHABET = ("A".."Z").to_a

  attr_reader :value

  def initialize(value)
    @value = value
  end
  private_class_method :new

  class << self
    def generate(length = 6)
      new(Array.new(length) { ALPHABET.sample }.join)
    end

    def parse(text)
      cleaned = text.strip.upcase
      raise ArgumentError, "invite codes are 6 letters" unless cleaned.match?(/\\A[A-Z]{6}\\z/)

      new(cleaned)
    end
  end
end

puts InviteCode.parse("  qwerty ").value
puts InviteCode.generate.value.length

begin
  InviteCode.new("HELLO!")
rescue NoMethodError => e
  puts "Blocked: #{e.message}"
end`,
            },
          ),
          callout(
            "tip",
            "Inside a class method, a bare `new(...)` means `self.new(...)`. Because `self` is whichever class received the call, a subclass that calls an inherited factory gets an instance of the subclass, not of the parent.",
          ),
          quiz(
            "Inside `class Report ... end` but outside any method, what does `self` refer to?",
            ["The first Report instance", "The Report class itself", "The main object", "nil"],
            1,
            "In the class body `self` is the class, which is why `def self.build` defines a method on the class.",
          ),
          quiz(
            "What does `private_class_method :new` do?",
            [
              "Makes every instance method private",
              "Stops outside code from calling ClassName.new directly",
              "Deletes the initialize method",
              "Prevents the class from being subclassed",
            ],
            1,
            "Afterwards only code inside the class, such as its factory methods, can call `new`. Outside callers get a NoMethodError.",
          ),
        ],
        challenge: {
          title: "Colours from Hex Codes",
          description:
            "Add a class method `HexColor.from_hex` that takes a string like `\"#ff8800\"`, removes the `#`, converts each pair of hex digits to a number with `to_i(16)`, and returns a new `HexColor`. The program should print `rgb(255, 136, 0)`.",
          starterCode: `class HexColor
  attr_reader :red, :green, :blue

  def initialize(red, green, blue)
    @red = red
    @green = green
    @blue = blue
  end

  def to_s
    "rgb(#{red}, #{green}, #{blue})"
  end
end

puts HexColor.from_hex("#ff8800")`,
          solutionCode: `class HexColor
  attr_reader :red, :green, :blue

  def initialize(red, green, blue)
    @red = red
    @green = green
    @blue = blue
  end

  def self.from_hex(hex)
    digits = hex.delete_prefix("#")
    red, green, blue = digits.scan(/../).map { |pair| pair.to_i(16) }
    new(red, green, blue)
  end

  def to_s
    "rgb(#{red}, #{green}, #{blue})"
  end
end

puts HexColor.from_hex("#ff8800")`,
          tests: [
            {
              id: 1,
              label: "Defines the from_hex class method",
              keywords: [{ pattern: "def\\s+self\\.from_hex|class\\s*<<\\s*self[\\s\\S]*def\\s+from_hex" }],
            },
            { id: 2, label: "Converts hex pairs with to_i(16)", keywords: [{ pattern: "to_i\\(\\s*16\\s*\\)|\\.hex\\b" }] },
            { id: 3, label: "Builds the colour with new", keywords: [{ pattern: "\\bnew\\(" }] },
          ],
        },
      },
      {
        id: "oop-7",
        title: "Class Variables vs Class Instance Variables",
        xp: 25,
        theory: [
          text(
            "Some data belongs to a class as a whole rather than to one object: how many instances exist, a registry of names, a default setting. Ruby has two places to keep it, and they behave very differently once inheritance enters the picture.",
          ),
          text(
            "A **class variable** starts with `@@`. It is shared by the class, all its instances **and every subclass**. There is only ever one copy, so subclasses all count into the same total.",
            {
              label: "@@ is shared across the whole hierarchy",
              content: `class Ticket
  @@issued = 0

  def initialize
    @@issued += 1
  end

  def self.issued
    @@issued
  end
end

class ConcertTicket < Ticket; end
class TrainTicket < Ticket; end

2.times { ConcertTicket.new }
TrainTicket.new

puts ConcertTicket.issued  # 3
puts TrainTicket.issued    # 3 - the same shared counter
puts Ticket.issued         # 3`,
            },
          ),
          text(
            "A **class instance variable** is an ordinary `@variable` that belongs to the class object itself. Each class, parent and subclasses alike, gets its own copy, so the counts stay separate. Read and write it through class-level methods, and use `self.class` to reach them from inside an instance.",
            {
              label: "One counter per class",
              content: `class Ticket
  class << self
    attr_writer :issued

    def issued
      @issued ||= 0
    end
  end

  def initialize
    self.class.issued += 1
  end
end

class ConcertTicket < Ticket; end
class TrainTicket < Ticket; end

2.times { ConcertTicket.new }
TrainTicket.new

puts ConcertTicket.issued  # 2
puts TrainTicket.issued    # 1
puts Ticket.issued         # 0 - no plain Ticket was created`,
            },
          ),
          diagram("Where class-level data lives", [
            {
              id: "classvar",
              label: "@@count",
              items: ["One copy for the class", "Shared with every subclass", "Visible inside instance methods"],
            },
            {
              id: "classivar",
              label: "@count in class methods",
              items: ["Belongs to one class object", "Each subclass gets its own", "Reach it with self.class.count"],
            },
            {
              id: "ivar",
              label: "@count in instance methods",
              items: ["Belongs to one object", "Usually set in initialize", "Different for every instance"],
            },
          ]),
          callout(
            "warning",
            "Because `@@` variables are shared with subclasses, a subclass that assigns one silently changes it for the parent and every sibling. Many teams avoid them: RuboCop's `Style/ClassVars` cop flags them and suggests class instance variables instead.",
          ),
          quiz(
            "`ConcertTicket` and `TrainTicket` both inherit from `Ticket`, which uses `@@issued`. How many `@@issued` variables exist?",
            ["One, shared by all three classes", "Two, one per subclass", "Three, one per class", "None until an instance is created"],
            0,
            "A class variable is shared by the class that defines it and every subclass.",
          ),
          quiz(
            "Inside an instance method, how do you reach a class instance variable that the class exposes as `issued`?",
            ["@issued", "@@issued", "self.class.issued", "super.issued"],
            2,
            "`@issued` inside an instance method is that object's own variable. Go through the class instead: `self.class.issued`.",
          ),
        ],
        challenge: {
          title: "Per-Plugin Registries",
          description:
            "Every plugin records its name when it is created. Right now `@@names` is shared, so both plugin types report all three names. Rewrite `Plugin` to use a **class instance variable**: give the class a `names` method that returns `@names ||= []`, append to `self.class.names` in `initialize`, and remove every `@@` variable. `Exporter` should report `[\"csv\", \"pdf\"]` and `Importer` `[\"json\"]`.",
          starterCode: `class Plugin
  @@names = []

  def self.names
    @@names
  end

  def initialize(name)
    @name = name
    @@names << name
  end
end

class Exporter < Plugin; end
class Importer < Plugin; end

Exporter.new("csv")
Exporter.new("pdf")
Importer.new("json")

p Exporter.names
p Importer.names`,
          solutionCode: `class Plugin
  def self.names
    @names ||= []
  end

  def initialize(name)
    @name = name
    self.class.names << name
  end
end

class Exporter < Plugin; end
class Importer < Plugin; end

Exporter.new("csv")
Exporter.new("pdf")
Importer.new("json")

p Exporter.names
p Importer.names`,
          tests: [
            { id: 1, label: "No @@ class variables left", keywords: [{ pattern: "^(?![\\s\\S]*@@)" }] },
            {
              id: 2,
              label: "Stores the names in a class instance variable",
              keywords: [{ pattern: "@names\\s*\\|\\|=" }],
            },
            {
              id: 3,
              label: "Appends to self.class.names",
              keywords: [{ pattern: "self\\.class\\.names\\s*(<<|\\.push)" }],
            },
          ],
        },
      },
      {
        id: "oop-8",
        title: "Abstract Classes & Duck Typing",
        xp: 25,
        theory: [
          text(
            "Ruby has no `abstract` keyword. When a parent class declares a method that every subclass must fill in, the convention is for the parent's version to raise `NotImplementedError` with a message saying what is missing. The parent still holds the shared logic (here `render`) and calls the missing piece.",
            {
              label: "A template with one required method",
              content: `class Report
  def render
    "== #{title} ==\\n#{body}"
  end

  def title
    self.class.name
  end

  def body
    raise NotImplementedError, "#{self.class.name} must implement body"
  end
end

class SalesReport < Report
  def body
    "Total sales: 42"
  end
end

puts SalesReport.new.render

begin
  Report.new.render
rescue NotImplementedError => e
  puts "Error: #{e.message}"
end`,
            },
          ),
          text(
            "One surprise: `NotImplementedError` inherits from `ScriptError`, not `StandardError`. A bare `rescue => e` only catches `StandardError`, so this error passes straight through it. That is usually what you want, because a missing method is a programming mistake rather than something to skip quietly. Name the class when you really do need to rescue it.",
          ),
          text(
            "**Duck typing** takes the idea further: code cares about what an object can *do*, not which class it belongs to. If an object responds to `deliver`, it can act as a channel, with no shared parent class required. `respond_to?` lets you check before calling.",
            {
              label: "Any object with deliver will do",
              content: `class EmailChannel
  def deliver(message)
    "Email sent: #{message}"
  end
end

class SmsChannel
  def deliver(message)
    "SMS sent: #{message[0, 20]}"
  end
end

class Notifier
  def initialize(channels)
    @channels = channels
  end

  def broadcast(message)
    @channels.map do |channel|
      if channel.respond_to?(:deliver)
        channel.deliver(message)
      else
        "Skipped #{channel.class}"
      end
    end
  end
end

notifier = Notifier.new([EmailChannel.new, SmsChannel.new, "not a channel"])
puts notifier.broadcast("Your order has shipped today")`,
            },
          ),
          callout(
            "tip",
            "Use a base class with `NotImplementedError` when subclasses genuinely share code, like `render` above. When they only share a method *name*, duck typing is lighter: no parent class is needed at all.",
          ),
          quiz(
            "Why doesn't `rescue => e` catch a `NotImplementedError`?",
            [
              "It is raised before the program runs",
              "It inherits from ScriptError, not StandardError",
              "Ruby never allows it to be rescued",
              "It is a warning, not an exception",
            ],
            1,
            "A bare `rescue` only catches `StandardError` and its subclasses. `NotImplementedError` sits under `ScriptError`, so you must name it to rescue it.",
          ),
          quiz(
            "With duck typing, what decides whether an object can be passed to `broadcast`?",
            [
              "It inherits from a Channel class",
              "It includes a Channel module",
              "It responds to the methods broadcast calls",
              "Its class name ends in Channel",
            ],
            2,
            "Duck typing only cares about behaviour: if the object responds to `deliver`, it works.",
          ),
        ],
        challenge: {
          title: "Shape Area Report",
          description:
            "`Shape#describe` prints a shape's name and area, but `area` has no real implementation yet. Make `Shape#area` raise `NotImplementedError`, then give `Circle` (π × r²) and `Rectangle` (width × height) their own `area` methods. The report prints each shape and the total area.",
          starterCode: `class Shape
  def area
    # Subclasses should provide this
  end

  def describe
    format("%s with area %.2f", self.class.name, area)
  end
end

class Circle < Shape
  def initialize(radius)
    @radius = radius
  end
end

class Rectangle < Shape
  def initialize(width, height)
    @width = width
    @height = height
  end
end

shapes = [Circle.new(1.5), Rectangle.new(2, 3)]
shapes.each { |shape| puts shape.describe }
puts format("Total area: %.2f", shapes.sum(&:area))`,
          solutionCode: `class Shape
  def area
    raise NotImplementedError, "#{self.class.name} must implement area"
  end

  def describe
    format("%s with area %.2f", self.class.name, area)
  end
end

class Circle < Shape
  def initialize(radius)
    @radius = radius
  end

  def area
    Math::PI * @radius**2
  end
end

class Rectangle < Shape
  def initialize(width, height)
    @width = width
    @height = height
  end

  def area
    @width * @height
  end
end

shapes = [Circle.new(1.5), Rectangle.new(2, 3)]
shapes.each { |shape| puts shape.describe }
puts format("Total area: %.2f", shapes.sum(&:area))`,
          tests: [
            {
              id: 1,
              label: "Shape#area raises NotImplementedError",
              keywords: [{ pattern: "raise\\s+NotImplementedError" }],
            },
            { id: 2, label: "Circle uses Math::PI", keywords: [{ pattern: "Math::PI" }] },
            {
              id: 3,
              label: "Rectangle multiplies width by height",
              keywords: [{ pattern: "@width\\s*\\*\\s*@height|@height\\s*\\*\\s*@width" }],
            },
            {
              id: 4,
              label: "Shape, Circle and Rectangle each define area",
              keywords: [{ pattern: "(def\\s+area\\b[\\s\\S]*){3}" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "oop-modules",
    title: "Modules & Mixins — Advanced",
    stage: "advanced",
    icon: "🧩",
    color: "#047857",
    lessons: [
      {
        id: "oop-2",
        title: "Mixins with Include",
        xp: 20,
        theory: [
          text(
            "Modules package methods and constants together. By using `include`, a module's methods become available as instance methods to any class that mixes it in.",
            {
              label: "Module Mixin Example",
              content: `# Define a module for logging behavior
module Loggable
  def log(message)
    puts "[LOG]: #{message}"
  end
end

class User
  # Mixin the module using include
  include Loggable
end

User.new.log("User logged in successfully.")`,
            }
          ),
        ],
        challenge: {
          title: "Walkable Module",
          description: "Create a `Walkable` module with a `walk` method, and include it in a `Robot` class.",
          starterCode: `module Walkable
  def walk
    "#{@name} is walking."
  end
end

class Robot
  # TODO: Include Walkable module
end`,
          solutionCode: `module Walkable
  def walk
    "#{@name} is walking."
  end
end

class Robot
  include Walkable
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end

bot = Robot.new("Unit-7")
puts bot.walk`,
          tests: [
            { id: 1, label: "Defines Walkable module", keywords: [{ pattern: "module Walkable" }] },
            { id: 2, label: "Includes module", keywords: [{ pattern: "include Walkable" }] },
          ],
        },
      },
    ],
  },
  {
    id: "oop-composition",
    title: "Composition & Value Objects — Advanced",
    stage: "advanced",
    icon: "🧱",
    color: "#b45309",
    lessons: [
      {
        id: "oop-9",
        title: "Composition over Inheritance",
        xp: 30,
        theory: [
          text(
            "Inheritance says an object **is a** kind of its parent. Composition says an object **has** other objects and hands them work. Inheritance fits when a subclass really is a specialised version of its parent and reuses most of its code. It gets awkward when behaviour varies in two independent directions.",
          ),
          text(
            "Picture a notifier that can format messages plainly or in capitals, and send them to the console or to a log. With inheritance you'd need a subclass for every pairing (`PlainConsoleNotifier`, `ShoutConsoleNotifier`, `PlainLogNotifier`, and so on), and every new format adds another row. With composition, the notifier **receives** a formatter and a sender and simply combines them.",
            {
              label: "Swapping parts instead of subclassing",
              content: `class PlainFormatter
  def render(order)
    "Order #{order[:id]} is #{order[:status]}"
  end
end

class ShoutFormatter
  def render(order)
    "ORDER #{order[:id]} IS #{order[:status].upcase}!"
  end
end

class ConsoleSender
  def deliver(text)
    puts text
  end
end

class OrderNotifier
  def initialize(formatter:, sender:)
    @formatter = formatter
    @sender = sender
  end

  def notify(order)
    @sender.deliver(@formatter.render(order))
  end
end

order = { id: 1042, status: "shipped" }
OrderNotifier.new(formatter: PlainFormatter.new, sender: ConsoleSender.new).notify(order)
OrderNotifier.new(formatter: ShoutFormatter.new, sender: ConsoleSender.new).notify(order)`,
            },
          ),
          text(
            "Because the parts arrive from outside (a technique called **dependency injection**), a test can pass in a fake. The fake below just records what it was asked to send, so a test can check the message without printing or emailing anything.",
            {
              label: "A fake sender for testing",
              content: `class PlainFormatter
  def render(order)
    "Order #{order[:id]} is #{order[:status]}"
  end
end

class FakeSender
  attr_reader :sent

  def initialize
    @sent = []
  end

  def deliver(text)
    @sent << text
  end
end

class OrderNotifier
  def initialize(formatter:, sender:)
    @formatter = formatter
    @sender = sender
  end

  def notify(order)
    @sender.deliver(@formatter.render(order))
  end
end

fake = FakeSender.new
OrderNotifier.new(formatter: PlainFormatter.new, sender: fake).notify({ id: 7, status: "packed" })
pp fake.sent`,
            },
          ),
          diagram("Two ways to vary behaviour", [
            {
              id: "inherit",
              label: "Inheritance",
              items: ["One subclass per combination", "3 formats x 3 senders = 9 classes", "Behaviour is fixed by the class you pick"],
            },
            {
              id: "compose",
              label: "Composition",
              items: ["One small class per part", "3 formats + 3 senders = 6 parts", "Swap parts at runtime or in tests"],
            },
          ]),
          callout(
            "tip",
            "A quick test: if you would describe the relationship with \"has a\" or \"uses a\" (a notifier *uses a* sender), reach for composition. Keep inheritance for true \"is a\" relationships where the subclass reuses most of the parent's code.",
          ),
          quiz(
            "A report can be exported in 3 formats and sent to 3 destinations. With one subclass per combination, how many subclasses do you need?",
            ["3", "6", "9", "27"],
            2,
            "Every format pairs with every destination: 3 × 3 = 9. With composition you write 3 formatters and 3 senders and combine them freely.",
          ),
          quiz(
            "What does passing a `FakeSender` into `OrderNotifier.new` let a test do?",
            [
              "Run Ruby faster",
              "Check what would be sent without really sending it",
              "Skip the formatter",
              "Turn OrderNotifier into a subclass of FakeSender",
            ],
            1,
            "Injected collaborators can be swapped for fakes, so tests can inspect the output without side effects.",
          ),
        ],
        challenge: {
          title: "Pluggable Discounts",
          description:
            "`Checkout` shouldn't know how discounts are calculated. Give its `initialize` a `discount:` keyword argument and store it in `@discount`, then make `total` subtract `@discount.apply(subtotal)` from the subtotal. The program checks out the same basket with no discount (`50`) and with 10% off (`45.0`).",
          starterCode: `class NoDiscount
  def apply(_subtotal)
    0
  end
end

class PercentOff
  def initialize(percent)
    @percent = percent
  end

  def apply(subtotal)
    subtotal * @percent / 100.0
  end
end

class Checkout
  def initialize
    # Accept and store a discount object
  end

  def total(prices)
    prices.sum
  end
end

basket = [20, 30]
puts Checkout.new(discount: NoDiscount.new).total(basket)
puts Checkout.new(discount: PercentOff.new(10)).total(basket)`,
          solutionCode: `class NoDiscount
  def apply(_subtotal)
    0
  end
end

class PercentOff
  def initialize(percent)
    @percent = percent
  end

  def apply(subtotal)
    subtotal * @percent / 100.0
  end
end

class Checkout
  def initialize(discount:)
    @discount = discount
  end

  def total(prices)
    subtotal = prices.sum
    subtotal - @discount.apply(subtotal)
  end
end

basket = [20, 30]
puts Checkout.new(discount: NoDiscount.new).total(basket)
puts Checkout.new(discount: PercentOff.new(10)).total(basket)`,
          tests: [
            {
              id: 1,
              label: "Takes a discount: keyword argument",
              keywords: [{ pattern: "def\\s+initialize\\s*\\(\\s*discount:" }],
            },
            { id: 2, label: "Stores it in @discount", keywords: [{ pattern: "@discount\\s*=\\s*discount\\b" }] },
            {
              id: 3,
              label: "Asks the discount object for the amount",
              keywords: [{ pattern: "@discount\\.apply\\(" }],
            },
          ],
        },
      },
      {
        id: "oop-10",
        title: "Delegation with Forwardable",
        xp: 30,
        theory: [
          text(
            "Often one object wraps another (a playlist wraps an array of songs) and should expose *some* of the inner object's methods. Writing each pass-through by hand (`def size = @songs.size`) gets tedious. The standard library's `Forwardable` module writes them for you.",
          ),
          text(
            "Load it with `require \"forwardable\"`, then `extend Forwardable` in the class. It is `extend`, not `include`, because `def_delegators` is a method you call on the class while defining it. `def_delegators` forwards several methods to the same target; `def_delegator` forwards one and can give it a new name. Forward `each` and include `Enumerable`, and the wrapper gains `map`, `select`, `sort` and the rest.",
            {
              label: "A playlist that forwards to its array",
              content: `require "forwardable"

class Playlist
  extend Forwardable
  include Enumerable

  def_delegators :@songs, :size, :each, :empty?
  def_delegator :@songs, :first, :now_playing

  def initialize(name)
    @name = name
    @songs = []
  end

  def add(title)
    raise ArgumentError, "title can't be blank" if title.strip.empty?

    @songs << title
    self
  end
end

mix = Playlist.new("Focus")
mix.add("Low Tide").add("Blue Hour").add("Night Drive")

puts mix.size          # 3
puts mix.now_playing   # Low Tide
puts mix.map(&:upcase).join(" | ")
p mix.select { |title| title.include?("i") }`,
            },
          ),
          text(
            "Why not subclass `Array` instead? A subclass inherits **every** array method, including `push`, `<<` and `clear`, which would bypass the check in `add`. Delegation exposes only the methods you list, so the wrapper stays in charge of its own rules.",
          ),
          callout(
            "info",
            "For a wrapper that should forward *everything* except a few methods, such as a decorator, the standard library also offers `SimpleDelegator` (`require \"delegate\"`). `Forwardable` fits better when you want a short, explicit list.",
          ),
          quiz(
            "What does `def_delegator :@songs, :first, :now_playing` create?",
            [
              "A method now_playing that returns @songs.first",
              "A method first that calls now_playing",
              "An alias for the @songs variable",
              "A class method on Playlist",
            ],
            0,
            "`def_delegator` forwards one method to the target and can rename it: `now_playing` calls `@songs.first`.",
          ),
          quiz(
            "Why does the class use `extend Forwardable` rather than `include Forwardable`?",
            [
              "Standard-library modules can't be included",
              "def_delegators is called on the class itself, so the class object needs the module's methods",
              "extend makes the forwarded methods private",
              "There is no difference",
            ],
            1,
            "`extend` adds the module's methods to the class object, and that is what you are calling when you write `def_delegators` in the class body.",
          ),
        ],
        challenge: {
          title: "Inventory Wrapper",
          description:
            "`Inventory` keeps a private array of item names and ignores duplicates in `add`. Use `Forwardable` to forward `size`, `include?` and `each` to `@items`, and include `Enumerable` so `sort` works. The program should print `3`, `true` and `bolt, nut, washer`.",
          starterCode: `class Inventory
  def initialize
    @items = []
  end

  def add(name)
    @items << name unless @items.include?(name)
    self
  end
end

stock = Inventory.new
stock.add("washer").add("bolt").add("nut").add("bolt")

puts stock.size
puts stock.include?("nut")
puts stock.sort.join(", ")`,
          solutionCode: `require "forwardable"

class Inventory
  extend Forwardable
  include Enumerable

  def_delegators :@items, :size, :include?, :each

  def initialize
    @items = []
  end

  def add(name)
    @items << name unless @items.include?(name)
    self
  end
end

stock = Inventory.new
stock.add("washer").add("bolt").add("nut").add("bolt")

puts stock.size
puts stock.include?("nut")
puts stock.sort.join(", ")`,
          tests: [
            { id: 1, label: "Requires forwardable", keywords: [{ pattern: "require\\s+[\"']forwardable[\"']" }] },
            { id: 2, label: "Extends Forwardable", keywords: [{ pattern: "extend\\s+Forwardable" }] },
            {
              id: 3,
              label: "Forwards size, include? and each to @items",
              keywords: [
                { pattern: "def_delegators?\\s+:@items" },
                { pattern: ":size\\b" },
                { pattern: ":include\\?" },
                { pattern: ":each\\b" },
              ],
            },
            { id: 4, label: "Includes Enumerable", keywords: [{ pattern: "include\\s+Enumerable" }] },
          ],
        },
      },
      {
        id: "oop-11",
        title: "Immutable Value Objects",
        xp: 30,
        theory: [
          text(
            "A **value object** is defined entirely by its data: an amount of money, a map coordinate, a date range. Two value objects with the same data are interchangeable. They are safest when **immutable**: instead of changing themselves, their methods return new objects, so nothing holding a reference gets surprised by a change it didn't make.",
          ),
          text(
            "`freeze` makes an object immutable: any later attempt to change its instance variables raises `FrozenError`. Calling it at the end of `initialize` locks the object as soon as it is built.",
            {
              label: "Freezing in initialize",
              content: `class Distance
  attr_reader :meters

  def initialize(meters)
    @meters = meters
    freeze
  end

  def +(other)
    Distance.new(meters + other.meters)
  end

  def stretch!
    @meters *= 2
  end
end

run = Distance.new(5000)
total = run + Distance.new(1200)
puts total.meters  # 6200
puts run.frozen?   # true

begin
  run.stretch!
rescue FrozenError => e
  puts "Refused: #{e.class}"
end`,
            },
          ),
          text(
            "Copying a frozen object shows how `dup` and `clone` differ. Both make a **shallow** copy, but `clone` keeps the frozen state while `dup` returns an unfrozen copy. Shallow also means freezing an object does not freeze the array or hash inside it, so freeze those too if they must not change.",
            {
              label: "dup, clone and shallow freezing",
              content: `class Route
  attr_reader :stops

  def initialize(stops)
    @stops = stops
    freeze
  end
end

route = Route.new(["Depot", "Market"])
puts route.dup.frozen?    # false
puts route.clone.frozen?  # true

route.stops << "Harbor"   # allowed: the array itself isn't frozen
p route.stops

safe = Route.new(["Depot", "Market"].freeze)
begin
  safe.stops << "Harbor"
rescue FrozenError
  puts "The frozen array refused the change"
end`,
            },
          ),
          text(
            "Ruby 3.2 added `Data.define`, which builds an immutable value class in one line. Unlike `Struct`, it has no setter methods, its instances are frozen, every field is required, and `with` returns a copy with some fields replaced. Value equality (`==`, `eql?` and `hash`) is built in, so instances work as hash keys straight away.",
            {
              label: "Struct vs Data.define",
              content: `MutablePoint = Struct.new(:lat, :lng)
spot = MutablePoint.new(51.5, -0.12)
spot.lat = 0                         # Struct allows this
p spot

Coordinate = Data.define(:lat, :lng) do
  def to_s
    format("(%.2f, %.2f)", lat, lng)
  end
end

home = Coordinate.new(lat: 51.5, lng: -0.12)
puts home
puts home.frozen?                    # true
puts home.with(lat: 48.86)           # a new Coordinate
puts home == Coordinate.new(51.5, -0.12)  # true - positional arguments work too
puts home.respond_to?(:lat=)         # false - no setters

begin
  Coordinate.new(lat: 1)
rescue ArgumentError => e
  puts e.message
end`,
            },
          ),
          callout(
            "info",
            "`Data.define` needs Ruby 3.2 or newer. On older versions, a hand-written class that calls `freeze` at the end of `initialize` gives you the same guarantee.",
          ),
          quiz(
            "`copy = frozen_object.dup`: is `copy` frozen?",
            [
              "Yes, dup always keeps the frozen state",
              "No, dup returns an unfrozen copy; clone keeps it",
              "Only if the object is a String",
              "dup raises FrozenError on frozen objects",
            ],
            1,
            "`clone` copies the frozen state and `dup` does not. Both are shallow copies.",
          ),
          quiz(
            "How do you get a copy of a `Data` object with one field changed?",
            [
              "Assign to the field with a setter",
              "Call with and pass the new value",
              "Call dup, then change the field",
              "You can't: Data objects can't be copied",
            ],
            1,
            "`Data` objects have no setters. `with(lat: 48.86)` returns a new instance with that field replaced.",
          ),
        ],
        challenge: {
          title: "Immutable Money",
          description:
            "Replace the mutable `Struct` with `Data.define(:cents, :currency)` and keep the `to_s` method. Add a `+` method that raises `ArgumentError` when the currencies differ, and otherwise returns a **new** Money built with `with`. The program should print `30.49 USD`, `true`, `true` and the mismatch message.",
          starterCode: `Money = Struct.new(:cents, :currency) do
  def to_s
    format("%.2f %s", cents / 100.0, currency)
  end
end

lunch = Money.new(1050, "USD")
dinner = Money.new(1999, "USD")

puts lunch + dinner
puts lunch.frozen?
puts lunch == Money.new(1050, "USD")

begin
  lunch + Money.new(500, "EUR")
rescue ArgumentError => e
  puts e.message
end`,
          solutionCode: `Money = Data.define(:cents, :currency) do
  def +(other)
    raise ArgumentError, "can't add #{other.currency} to #{currency}" unless other.currency == currency

    with(cents: cents + other.cents)
  end

  def to_s
    format("%.2f %s", cents / 100.0, currency)
  end
end

lunch = Money.new(1050, "USD")
dinner = Money.new(1999, "USD")

puts lunch + dinner
puts lunch.frozen?
puts lunch == Money.new(1050, "USD")

begin
  lunch + Money.new(500, "EUR")
rescue ArgumentError => e
  puts e.message
end`,
          tests: [
            {
              id: 1,
              label: "Uses Data.define(:cents, :currency)",
              keywords: [{ pattern: "Data\\.define\\(\\s*:cents\\s*,\\s*:currency\\s*\\)" }],
            },
            { id: 2, label: "Defines +", keywords: [{ pattern: "def\\s+\\+" }] },
            { id: 3, label: "Raises ArgumentError on a currency mismatch", keywords: [{ pattern: "raise\\s+ArgumentError" }] },
            { id: 4, label: "Returns a new value with with(...)", keywords: [{ pattern: "\\bwith\\(\\s*cents:" }] },
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
  }))
);

export const RUBY_OOP_TOTAL_XP = RUBY_OOP_LESSONS.reduce((s, l) => s + l.xp, 0);