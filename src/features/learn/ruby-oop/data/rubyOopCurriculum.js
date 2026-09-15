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
            { id: 2, label: "Uses super", keywords: [{ pattern: "super" }] },
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