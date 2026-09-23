// PolyCode — C# OOP Interactive Course
// 6 chapters · 13 lessons · Browser sandbox validation
// Follows the exact same content shape as csharp-fundamentals/data/csharpCurriculum.js

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

const RAW_CSHARP_OOP_CHAPTERS = [
  {
    id: "classes-objects",
    title: "Classes & Objects",
    icon: "🏗️",
    color: ACCENT,
    lessons: [
      {
        id: "cs-oop-0",
        title: "Classes, Fields, and Methods",
        xp: 12,
        theory: [
          text(
            "A **class** is a blueprint for creating objects. It groups related data (**fields**) and behavior (**methods**) into a single reusable unit — the foundation of object-oriented programming in C#.",
            {
              label: "Defining and using a class",
              content: `class Dog {
    public string Name;
    public int Age;

    public void Bark() {
        Console.WriteLine(Name + " says woof!");
    }
}

Dog rex = new Dog();
rex.Name = "Rex";
rex.Age = 3;
rex.Bark();`,
            },
          ),
          text(
            "Each `Dog` you create with `new Dog()` is a separate **object** (an instance of the class). Every instance gets its own copy of the fields, so `rex.Name` and another dog's `Name` don't interfere with each other.",
          ),
          diagram("Class vs. Object", [
            {
              id: "class",
              label: "class Dog",
              color: ACCENT,
              items: ["Blueprint", "Defines Name, Age, Bark()"],
            },
            {
              id: "obj1",
              label: "rex (object)",
              color: "#3b82f6",
              items: ["Name = \"Rex\"", "Age = 3"],
            },
            {
              id: "obj2",
              label: "buddy (object)",
              color: "#f59e0b",
              items: ["Name = \"Buddy\"", "Age = 5"],
            },
          ]),
          callout(
            "tip",
            "By convention, C# class names use **PascalCase** (e.g. `Dog`, `BankAccount`), while local variables use **camelCase** (e.g. `rex`, `bankAccount`).",
          ),
          quiz(
            "What does `new Dog()` create?",
            [
              "A copy of the class definition itself",
              "A new object (instance) of the Dog class",
              "A static field",
              "A method",
            ],
            1,
            "`new` allocates memory for a fresh object based on the class blueprint and returns a reference to it.",
          ),
        ],
        challenge: {
          title: "Build a Car Class",
          description:
            "Create a `Car` class with a public string field `Model` and a method `Honk()` that prints `\"Beep beep!\"`. Then create an instance, set its `Model` to `\"Civic\"`, and call `Honk()`.",
          starterCode: `using System;

class Car {
    // Declare a public string field named Model


    // Add a Honk method that prints "Beep beep!"

}

class Program {
    static void Main() {
        // Create a Car, set its Model, and call Honk()

    }
}`,
          solutionCode: `using System;

class Car {
    public string Model;

    public void Honk() {
        Console.WriteLine("Beep beep!");
    }
}

class Program {
    static void Main() {
        Car myCar = new Car();
        myCar.Model = "Civic";
        myCar.Honk();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a public Model field",
              keywords: [{ pattern: "public\\s+string\\s+Model" }],
            },
            {
              id: 2,
              label: "Defines a Honk method",
              keywords: [{ pattern: "void\\s+Honk\\s*\\(" }],
            },
            {
              id: 3,
              label: "Creates a Car instance",
              keywords: [{ pattern: "new\\s+Car\\s*\\(" }],
            },
            {
              id: 4,
              label: "Calls Honk()",
              keywords: [{ pattern: "\\.Honk\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-1",
        title: "Constructors & this",
        xp: 14,
        theory: [
          text(
            "A **constructor** is a special method that runs automatically when an object is created with `new`. It has the same name as the class and no return type — its job is to set up the object's initial state.",
            {
              label: "A constructor in action",
              content: `class Dog {
    public string Name;

    public Dog(string name) {
        Name = name;
    }
}

Dog rex = new Dog("Rex"); // constructor runs immediately`,
            },
          ),
          text(
            "The **`this`** keyword refers to the current instance. It's especially useful when a constructor parameter has the same name as a field — `this.Name` clearly means \"the field\", not the parameter.",
            {
              label: "Resolving a naming clash with this",
              content: `class Dog {
    public string Name;

    public Dog(string name) {
        this.Name = name; // this.Name = field, name = parameter
    }
}`,
            },
          ),
          callout(
            "info",
            "If you don't write any constructor, C# silently provides a free **default constructor** that takes no arguments. As soon as you write your own constructor, that free one disappears.",
          ),
          quiz(
            "What is the main purpose of a constructor?",
            [
              "To destroy an object",
              "To initialize an object's state when it's created",
              "To define a static field",
              "To print output to the console",
            ],
            1,
            "Constructors run once, right when `new` creates the object, to set it up with valid starting values.",
          ),
        ],
        challenge: {
          title: "Add a Constructor",
          description:
            "Give the `Car` class a constructor that takes a `string model` parameter and assigns it to the `Model` field using `this.Model`. Create a car with model `\"Tesla\"` in one line.",
          starterCode: `using System;

class Car {
    public string Model;

    // Add a constructor here

}

class Program {
    static void Main() {
        // Create a Car passing "Tesla" directly to the constructor
        Console.WriteLine(myCar.Model);
    }
}`,
          solutionCode: `using System;

class Car {
    public string Model;

    public Car(string model) {
        this.Model = model;
    }
}

class Program {
    static void Main() {
        Car myCar = new Car("Tesla");
        Console.WriteLine(myCar.Model);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines a Car constructor",
              keywords: [{ pattern: "public\\s+Car\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses this.Model to assign",
              keywords: [{ pattern: "this\\.Model\\s*=" }],
            },
            {
              id: 3,
              label: "Constructs Car with \"Tesla\"",
              keywords: [{ pattern: "new\\s+Car\\s*\\(\\s*\"Tesla\"\\s*\\)" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "encapsulation",
    title: "Encapsulation",
    icon: "🔒",
    color: "#0ea5e9",
    lessons: [
      {
        id: "cs-oop-2",
        title: "Access Modifiers & Properties",
        xp: 14,
        theory: [
          text(
            "**Encapsulation** means hiding an object's internal data and only exposing controlled ways to interact with it. `public` members are accessible from anywhere; `private` members are only accessible inside the class itself.",
            {
              label: "private field + public property",
              content: `class BankAccount {
    private double balance; // hidden from outside

    public double Balance {
        get { return balance; }
        set {
            if (value >= 0) balance = value;
        }
    }
}`,
            },
          ),
          text(
            "A **property** looks like a field from the outside (`account.Balance`) but is backed by `get` and `set` blocks you control. This lets you validate data — like rejecting a negative balance — without the caller ever seeing the raw field.",
          ),
          callout(
            "warning",
            "Making every field `public` defeats the purpose of encapsulation — any code anywhere could set `Balance = -9999` with no validation. Keep fields `private` and expose safe `public` properties instead.",
          ),
          quiz(
            "Why use a private field with a public property instead of just a public field?",
            [
              "Properties run faster than fields",
              "It lets you validate or control access to the data",
              "Private fields use less memory",
              "There is no real difference",
            ],
            1,
            "Properties give you a controlled gateway — you can validate, log, or transform values on the way in or out.",
          ),
        ],
        challenge: {
          title: "Protect the Balance",
          description:
            "Create a `BankAccount` class with a `private double balance` field and a `public Balance` property. The setter should only update `balance` if the incoming `value` is `>= 0`.",
          starterCode: `using System;

class BankAccount {
    // private field


    // public Balance property with get/set

}

class Program {
    static void Main() {
        BankAccount acc = new BankAccount();
        acc.Balance = 500;
        Console.WriteLine(acc.Balance);
    }
}`,
          solutionCode: `using System;

class BankAccount {
    private double balance;

    public double Balance {
        get { return balance; }
        set {
            if (value >= 0) balance = value;
        }
    }
}

class Program {
    static void Main() {
        BankAccount acc = new BankAccount();
        acc.Balance = 500;
        Console.WriteLine(acc.Balance);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a private balance field",
              keywords: [{ pattern: "private\\s+double\\s+balance" }],
            },
            {
              id: 2,
              label: "Defines a public Balance property",
              keywords: [{ pattern: "public\\s+double\\s+Balance" }],
            },
            {
              id: 3,
              label: "Has a get accessor",
              keywords: [{ pattern: "get\\s*{" }],
            },
            {
              id: 4,
              label: "Setter checks value >= 0",
              keywords: [{ pattern: "value\\s*>=\\s*0" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-3",
        title: "Auto-Properties & readonly",
        xp: 12,
        theory: [
          text(
            "When a property doesn't need custom validation logic, C# lets you skip the manual backing field entirely with an **auto-property** — the compiler generates the hidden field for you.",
            {
              label: "Auto-property shorthand",
              content: `class Book {
    public string Title { get; set; }
    public string Author { get; set; }
}

Book b = new Book();
b.Title = "Dune";`,
            },
          ),
          text(
            "Adding **`readonly`** to a field (or using `{ get; }` with no setter on a property) means it can only be assigned once — typically inside the constructor. This is great for values that should never change after an object is created, like an `Id`.",
            {
              label: "A read-only property set only in the constructor",
              content: `class Book {
    public string Title { get; }

    public Book(string title) {
        Title = title;
    }
}`,
            },
          ),
          callout(
            "tip",
            "Auto-properties with `{ get; set; }` are the C# default for simple data-holding classes — you only need a full manual property when you need custom logic in the getter or setter.",
          ),
          quiz(
            "What does `public string Title { get; }` (no setter) mean?",
            [
              "Title can be changed anywhere in the program",
              "Title can only be set once, typically in the constructor",
              "Title is a private field",
              "This is invalid C# syntax",
            ],
            1,
            "A get-only auto-property can be assigned in the constructor (or as an initializer) but not modified afterward — making the object immutable for that value.",
          ),
        ],
        challenge: {
          title: "Immutable Book",
          description:
            "Create a `Book` class with a get-only auto-property `Title` (type `string`). Add a constructor that takes a `title` parameter and assigns it to `Title`.",
          starterCode: `using System;

class Book {
    // get-only auto-property Title


    // constructor

}

class Program {
    static void Main() {
        Book b = new Book("Dune");
        Console.WriteLine(b.Title);
    }
}`,
          solutionCode: `using System;

class Book {
    public string Title { get; }

    public Book(string title) {
        Title = title;
    }
}

class Program {
    static void Main() {
        Book b = new Book("Dune");
        Console.WriteLine(b.Title);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares get-only Title property",
              keywords: [{ pattern: "public\\s+string\\s+Title\\s*{\\s*get;\\s*}" }],
            },
            {
              id: 2,
              label: "Defines a Book constructor",
              keywords: [{ pattern: "public\\s+Book\\s*\\(" }],
            },
            {
              id: 3,
              label: "Assigns Title in constructor",
              keywords: [{ pattern: "Title\\s*=\\s*title" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "inheritance-polymorphism",
    title: "Inheritance & Polymorphism",
    icon: "🧬",
    color: "#a855f7",
    lessons: [
      {
        id: "cs-oop-4",
        title: "Inheritance & base",
        xp: 16,
        theory: [
          text(
            "**Inheritance** lets one class (the derived/child class) reuse and extend the members of another (the base/parent class), using the `:` symbol. This models \"is-a\" relationships — a `Cat` **is an** `Animal`.",
            {
              label: "A derived class",
              content: `class Animal {
    public string Name;
    public void Eat() {
        Console.WriteLine(Name + " is eating.");
    }
}

class Cat : Animal {
    public void Meow() {
        Console.WriteLine(Name + " says meow!");
    }
}

Cat c = new Cat();
c.Name = "Whiskers";
c.Eat();  // inherited from Animal
c.Meow(); // defined in Cat`,
            },
          ),
          text(
            "Use **`base(...)`** inside a derived class's constructor to call the parent class's constructor and let it handle setting up inherited fields.",
            {
              label: "Calling the base constructor",
              content: `class Animal {
    public string Name;
    public Animal(string name) { Name = name; }
}

class Cat : Animal {
    public Cat(string name) : base(name) { }
}`,
            },
          ),
          diagram("Inheritance hierarchy", [
            {
              id: "animal",
              label: "Animal (base)",
              color: "#f59e0b",
              items: ["Name", "Eat()"],
            },
            {
              id: "cat",
              label: "Cat : Animal",
              color: "#a855f7",
              items: ["Inherits Name, Eat()", "Adds Meow()"],
            },
          ]),
          quiz(
            "What does `class Cat : Animal` mean?",
            [
              "Cat and Animal are unrelated",
              "Cat inherits from (extends) Animal",
              "Animal inherits from Cat",
              "Cat implements an interface called Animal",
            ],
            1,
            "The colon `:` after a class name means \"inherits from\" — Cat gets all of Animal's public/protected members plus whatever it adds itself.",
          ),
        ],
        challenge: {
          title: "Extend the Animal Class",
          description:
            "Create a base `Animal` class with a public string `Name` and a method `Eat()` that prints `Name + \" is eating.\"`. Then create a `Cat` class that inherits from `Animal` and adds a `Meow()` method that prints `Name + \" says meow!\"`.",
          starterCode: `using System;

class Animal {
    public string Name;
    public void Eat() {
        Console.WriteLine(Name + " is eating.");
    }
}

// Create class Cat that inherits from Animal


class Program {
    static void Main() {
        Cat c = new Cat();
        c.Name = "Whiskers";
        c.Eat();
        c.Meow();
    }
}`,
          solutionCode: `using System;

class Animal {
    public string Name;
    public void Eat() {
        Console.WriteLine(Name + " is eating.");
    }
}

class Cat : Animal {
    public void Meow() {
        Console.WriteLine(Name + " says meow!");
    }
}

class Program {
    static void Main() {
        Cat c = new Cat();
        c.Name = "Whiskers";
        c.Eat();
        c.Meow();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Cat inherits from Animal",
              keywords: [{ pattern: "class\\s+Cat\\s*:\\s*Animal" }],
            },
            {
              id: 2,
              label: "Cat defines Meow()",
              keywords: [{ pattern: "void\\s+Meow\\s*\\(" }],
            },
            {
              id: 3,
              label: "Meow prints \"says meow!\"",
              keywords: [{ pattern: "says meow!" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-5",
        title: "Overriding with virtual & override",
        xp: 16,
        theory: [
          text(
            "By default, a derived class can't change how an inherited method behaves. Marking a base method **`virtual`** allows a derived class to replace it using **`override`** — this is the core of **polymorphism**.",
            {
              label: "virtual + override",
              content: `class Animal {
    public virtual void Speak() {
        Console.WriteLine("Some generic animal sound");
    }
}

class Dog : Animal {
    public override void Speak() {
        Console.WriteLine("Woof!");
    }
}`,
            },
          ),
          text(
            "Polymorphism means you can treat a `Dog` as an `Animal` and still get dog-specific behavior. `Animal a = new Dog(); a.Speak();` prints `\"Woof!\"`, not the generic sound — C# calls the *actual* object's overridden method, not the variable's declared type.",
          ),
          callout(
            "tip",
            "Inside an override, you can still call the original base behavior with `base.MethodName()` if you want to extend it rather than fully replace it.",
          ),
          quiz(
            "Given `Animal a = new Dog();` where Dog overrides Speak(), what does `a.Speak()` print?",
            [
              "The Animal base version, since a is typed as Animal",
              "The Dog override, since that's the actual object",
              "A compile error",
              "Nothing — Speak() is never called",
            ],
            1,
            "Polymorphism resolves the call based on the object's real type at runtime, not the variable's declared type — this is called 'dynamic dispatch'.",
          ),
        ],
        challenge: {
          title: "Override Speak()",
          description:
            "Make `Speak()` on `Animal` virtual, printing `\"...\"`. Create a `Dog` class inheriting from `Animal` that overrides `Speak()` to print `\"Woof!\"`.",
          starterCode: `using System;

class Animal {
    // make Speak virtual, printing "..."

}

// Create Dog : Animal, overriding Speak() to print "Woof!"


class Program {
    static void Main() {
        Animal a = new Dog();
        a.Speak();
    }
}`,
          solutionCode: `using System;

class Animal {
    public virtual void Speak() {
        Console.WriteLine("...");
    }
}

class Dog : Animal {
    public override void Speak() {
        Console.WriteLine("Woof!");
    }
}

class Program {
    static void Main() {
        Animal a = new Dog();
        a.Speak();
    }
}`,
          tests: [
            {
              id: 1,
              label: "Speak() is virtual on Animal",
              keywords: [{ pattern: "virtual\\s+void\\s+Speak" }],
            },
            {
              id: 2,
              label: "Dog overrides Speak()",
              keywords: [{ pattern: "override\\s+void\\s+Speak" }],
            },
            {
              id: 3,
              label: "Override prints Woof!",
              keywords: [{ pattern: "Woof!" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-6",
        title: "Abstract Classes & Interfaces",
        xp: 18,
        theory: [
          text(
            "An **abstract class** can't be instantiated directly (`new Shape()` is illegal) and can declare **abstract methods** with no body — every non-abstract derived class *must* implement them.",
            {
              label: "An abstract base class",
              content: `abstract class Shape {
    public abstract double Area();
}

class Circle : Shape {
    public double Radius;
    public override double Area() {
        return Math.PI * Radius * Radius;
    }
}`,
            },
          ),
          text(
            "An **interface** (declared with `interface`) is a pure contract — it only lists method signatures, no implementation at all. A class can inherit from only *one* base class, but can implement *many* interfaces.",
            {
              label: "Implementing an interface",
              content: `interface IShape {
    double Area();
}

class Square : IShape {
    public double Side;
    public double Area() {
        return Side * Side;
    }
}`,
            },
          ),
          callout(
            "info",
            "Rule of thumb: use an **abstract class** when related classes share common code and state; use an **interface** when unrelated classes just need to guarantee the same capability (like `IComparable` or `IDisposable`).",
          ),
          quiz(
            "How many interfaces can a single C# class implement?",
            [
              "Zero",
              "Exactly one",
              "As many as it needs",
              "Only if it's abstract",
            ],
            2,
            "Unlike single class inheritance, a class can implement any number of interfaces, since interfaces only define contracts, not shared state.",
          ),
        ],
        challenge: {
          title: "Shape Interface",
          description:
            "Define an `IShape` interface with a method `Area()` returning `double`. Create a `Square` class implementing `IShape`, with a public `double Side` field, where `Area()` returns `Side * Side`.",
          starterCode: `using System;

// Define interface IShape with Area() returning double


// Create class Square : IShape


class Program {
    static void Main() {
        Square sq = new Square();
        sq.Side = 4;
        Console.WriteLine(sq.Area());
    }
}`,
          solutionCode: `using System;

interface IShape {
    double Area();
}

class Square : IShape {
    public double Side;
    public double Area() {
        return Side * Side;
    }
}

class Program {
    static void Main() {
        Square sq = new Square();
        sq.Side = 4;
        Console.WriteLine(sq.Area());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Defines IShape interface",
              keywords: [{ pattern: "interface\\s+IShape" }],
            },
            {
              id: 2,
              label: "Square implements IShape",
              keywords: [{ pattern: "class\\s+Square\\s*:\\s*IShape" }],
            },
            {
              id: 3,
              label: "Area returns Side * Side",
              keywords: [{ pattern: "Side\\s*\\*\\s*Side" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "static-members",
    title: "Static Members",
    icon: "📌",
    color: "#dc2626",
    lessons: [
      {
        id: "cs-oop-7",
        title: "Static Fields & Methods",
        xp: 14,
        theory: [
          text(
            "A **`static`** member belongs to the class itself, not to any individual object. Every instance shares the exact same static field — change it through one object, and every reference sees the update.",
            {
              label: "A static counter shared by all instances",
              content: `class Dog {
    public static int Count = 0;

    public Dog() {
        Count++; // every new Dog increments the shared counter
    }
}

Dog a = new Dog();
Dog b = new Dog();
Console.WriteLine(Dog.Count); // 2`,
            },
          ),
          text(
            "You call a static member through the **class name**, not an instance — `Dog.Count`, never `a.Count`. Static methods can only directly access other static members, since they don't run in the context of any particular object.",
          ),
          callout(
            "warning",
            "Overusing static state can make code harder to test and reason about, since it's essentially global. Use it deliberately — for things like shared counters, constants, or utility methods — not as a default.",
          ),
          quiz(
            "If `Dog.Count` is static and two Dog objects are created, how many separate copies of Count exist?",
            [
              "Two — one per object",
              "One — shared across all Dog instances",
              "Zero, until accessed",
              "It depends on the constructor",
            ],
            1,
            "Static fields exist exactly once per class, no matter how many instances you create — that's what makes them useful as shared counters.",
          ),
        ],
        challenge: {
          title: "Track Instance Count",
          description:
            "Add a `public static int Count` field to `Dog`, starting at 0. In the constructor, increment `Count` each time a new `Dog` is created. Print `Dog.Count` after creating two dogs.",
          starterCode: `using System;

class Dog {
    // static Count field


    public Dog() {
        // increment Count

    }
}

class Program {
    static void Main() {
        Dog a = new Dog();
        Dog b = new Dog();
        Console.WriteLine(Dog.Count);
    }
}`,
          solutionCode: `using System;

class Dog {
    public static int Count = 0;

    public Dog() {
        Count++;
    }
}

class Program {
    static void Main() {
        Dog a = new Dog();
        Dog b = new Dog();
        Console.WriteLine(Dog.Count);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares static int Count",
              keywords: [{ pattern: "static\\s+int\\s+Count" }],
            },
            {
              id: 2,
              label: "Constructor increments Count",
              keywords: [{ pattern: "Count\\+\\+" }],
            },
            {
              id: 3,
              label: "Prints Dog.Count",
              keywords: [{ pattern: "Dog\\.Count" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "records-value-semantics",
    title: "Records & Value Semantics",
    icon: "🧾",
    color: "#f59e0b",
    lessons: [
      {
        id: "cs-oop-8",
        title: "Records & Immutability",
        xp: 14,
        theory: [
          text(
            "A **`record`** is a class the compiler writes for you when what you want is *data*, not behaviour. You declare the properties in the header — called a **positional record** — and C# generates the constructor, the properties, `ToString()`, and value-based equality.",
            {
              label: "A positional record",
              content: `public record Person(string Name, int Age);

Person p = new Person("Ayesha", 30);
Console.WriteLine(p.Name);   // Ayesha
Console.WriteLine(p);        // Person { Name = Ayesha, Age = 30 }`,
            },
          ),
          text(
            "The biggest difference from a normal class is **equality**. Two classes are equal only if they are literally the same object in memory. Two records are equal when every property matches — that is *value semantics*.",
            {
              label: "Value equality vs reference equality",
              content: `public record PersonRecord(string Name);
public class PersonClass {
    public string Name { get; init; }
}

var r1 = new PersonRecord("Sara");
var r2 = new PersonRecord("Sara");
Console.WriteLine(r1 == r2);  // True — same values

var c1 = new PersonClass { Name = "Sara" };
var c2 = new PersonClass { Name = "Sara" };
Console.WriteLine(c1 == c2);  // False — different objects`,
            },
          ),
          text(
            "Record properties are read-only after construction, so you don't mutate a record — you copy it with changes using a **`with` expression**. The original is left untouched, which is exactly what you want for values like money, dates, or coordinates.",
            {
              label: "Copying with `with`",
              content: `Person original = new Person("Ayesha", 30);
Person older = original with { Age = 31 };

Console.WriteLine(original.Age);  // 30 — unchanged
Console.WriteLine(older.Age);     // 31`,
            },
          ),
          callout(
            "info",
            "A record is still a reference type — it lives on the heap like any class. What changes is how it *behaves*: equality compares contents, and `with` gives you copies instead of mutation.",
          ),
          quiz(
            "Two `record Point(int X, int Y)` values are both created as `new Point(1, 2)`. What does `p1 == p2` return?",
            [
              "False — they are two separate objects",
              "True — records compare by property values",
              "It throws, records can't use ==",
              "True only if you override Equals",
            ],
            1,
            "Records get value-based equality generated by the compiler, so two records with identical property values are equal even though they are distinct objects.",
          ),
        ],
        challenge: {
          title: "Build a Point Record",
          description:
            "Declare a positional `record Point(int X, int Y)`. Create `p1` as `(2, 3)`, then use a `with` expression to make `p2` a copy of `p1` with `Y` set to `9`. Print `p1`, `p2`, and the result of `p1 == p2`.",
          starterCode: `using System;

// Declare the Point record here


class Program {
    static void Main() {
        // Create p1 as (2, 3)


        // Create p2 from p1 using a with expression


        // Print p1, p2, and p1 == p2

    }
}`,
          solutionCode: `using System;

public record Point(int X, int Y);

class Program {
    static void Main() {
        Point p1 = new Point(2, 3);
        Point p2 = p1 with { Y = 9 };

        Console.WriteLine(p1);
        Console.WriteLine(p2);
        Console.WriteLine(p1 == p2);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a positional Point record",
              keywords: [{ pattern: "record\\s+Point\\s*\\(" }],
            },
            {
              id: 2,
              label: "Uses a with expression",
              keywords: [{ pattern: "with\\s*\\{" }],
            },
            {
              id: 3,
              label: "Compares the two points",
              keywords: [{ pattern: "p1\\s*==\\s*p2" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-9",
        title: "Structs vs Classes",
        xp: 14,
        theory: [
          text(
            "A **`struct`** is a value type. When you assign a struct to another variable, or pass it to a method, C# copies the whole thing. A class variable only copies the *reference* — both names still point at one shared object.",
            {
              label: "Copy semantics, side by side",
              content: `struct PointStruct { public int X; }
class PointClass  { public int X; }

PointStruct s1 = new PointStruct { X = 1 };
PointStruct s2 = s1;   // full copy
s2.X = 99;
Console.WriteLine(s1.X);  // 1 — original untouched

PointClass c1 = new PointClass { X = 1 };
PointClass c2 = c1;    // reference copy
c2.X = 99;
Console.WriteLine(c1.X);  // 99 — same object`,
            },
          ),
          text(
            "Structs also compare by value out of the box, cannot inherit from another struct or class, and always have a parameterless constructor that zeroes every field. That makes them a good fit for small, immutable bundles of data — a coordinate, a colour, a money amount — and a poor fit for large objects you pass around constantly.",
            {
              label: "A readonly struct",
              content: `public readonly struct Money {
    public int Amount { get; }
    public string Currency { get; }

    public Money(int amount, string currency) {
        Amount = amount;
        Currency = currency;
    }
}`,
            },
          ),
          callout(
            "warning",
            "Marking a struct `readonly` tells the compiler nothing inside it can change after construction. A mutable struct is a classic source of bugs — you edit a copy and wonder why the original never updated.",
          ),
          quiz(
            "You pass a struct into a method and the method changes one of its fields. What does the caller see?",
            [
              "The change — structs are shared",
              "Nothing — the method received a copy",
              "A compiler error",
              "Only if the field is public",
            ],
            1,
            "Structs are value types, so the method works on its own copy. Use `ref` if you genuinely need the method to modify the caller's value.",
          ),
        ],
        challenge: {
          title: "Prove Value Semantics",
          description:
            "Declare a `struct Counter` with a public `int Value` field. In `Main`, create `a` with `Value = 1`, assign it to `b`, set `b.Value` to `50`, then print `a.Value` and `b.Value` to show the original was not affected.",
          starterCode: `using System;

// Declare the Counter struct here


class Program {
    static void Main() {
        // Create a with Value = 1, copy it into b


        // Change b.Value to 50


        // Print a.Value and b.Value

    }
}`,
          solutionCode: `using System;

struct Counter {
    public int Value;
}

class Program {
    static void Main() {
        Counter a = new Counter { Value = 1 };
        Counter b = a;
        b.Value = 50;

        Console.WriteLine(a.Value);
        Console.WriteLine(b.Value);
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a Counter struct",
              keywords: [{ pattern: "struct\\s+Counter" }],
            },
            {
              id: 2,
              label: "Copies a into b",
              keywords: [{ pattern: "Counter\\s+b\\s*=\\s*a" }],
            },
            {
              id: 3,
              label: "Prints both values",
              keywords: [{ pattern: "a\\.Value" }, { pattern: "b\\.Value" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-10",
        title: "Overriding Equals, GetHashCode & ToString",
        xp: 15,
        theory: [
          text(
            "Every type in C# inherits `Equals()`, `GetHashCode()`, and `ToString()` from `object`. The defaults are rarely what you want: `Equals` compares references, and `ToString` just prints the type name.",
            {
              label: "The unhelpful defaults",
              content: `class Money {
    public int Amount;
}

Money a = new Money { Amount = 100 };
Money b = new Money { Amount = 100 };

Console.WriteLine(a.Equals(b));  // False
Console.WriteLine(a);            // Money`,
            },
          ),
          text(
            "Override `ToString()` to make your objects readable in logs and output, and override `Equals()` when two distinct objects with the same contents should count as equal.",
            {
              label: "Meaningful overrides",
              content: `class Money {
    public int Amount { get; init; }
    public string Currency { get; init; }

    public override string ToString() => $"{Amount} {Currency}";

    public override bool Equals(object obj) {
        if (obj is Money other) {
            return Amount == other.Amount && Currency == other.Currency;
        }
        return false;
    }

    public override int GetHashCode() => HashCode.Combine(Amount, Currency);
}`,
            },
          ),
          text(
            "`GetHashCode()` is not optional. Dictionaries and hash sets bucket objects by hash code first and only then call `Equals`. If two equal objects return different hash codes they land in different buckets, and your dictionary silently loses entries.",
          ),
          callout(
            "warning",
            "The contract: equal objects must return the same hash code. Override `Equals` without `GetHashCode` and the compiler warns you — listen to it.",
          ),
          quiz(
            "Why must `GetHashCode()` be overridden whenever `Equals()` is?",
            [
              "For nicer console output",
              "So hash-based collections can find equal objects in the same bucket",
              "It is required to compile",
              "To make the class immutable",
            ],
            1,
            "Dictionary and HashSet locate items by hash code before comparing with Equals. Mismatched hash codes mean equal objects are never even compared.",
          ),
        ],
        challenge: {
          title: "Make Money Comparable",
          description:
            "Give the `Money` class a `ToString()` override returning `Amount` and `Currency` as one string, an `Equals(object obj)` override that compares both properties, and a `GetHashCode()` override built from both properties.",
          starterCode: `using System;

class Money {
    public int Amount { get; init; }
    public string Currency { get; init; }

    // Override ToString


    // Override Equals


    // Override GetHashCode

}

class Program {
    static void Main() {
        Money a = new Money { Amount = 100, Currency = "PKR" };
        Money b = new Money { Amount = 100, Currency = "PKR" };
        Console.WriteLine(a);
        Console.WriteLine(a.Equals(b));
    }
}`,
          solutionCode: `using System;

class Money {
    public int Amount { get; init; }
    public string Currency { get; init; }

    public override string ToString() => $"{Amount} {Currency}";

    public override bool Equals(object obj) {
        if (obj is Money other) {
            return Amount == other.Amount && Currency == other.Currency;
        }
        return false;
    }

    public override int GetHashCode() => HashCode.Combine(Amount, Currency);
}

class Program {
    static void Main() {
        Money a = new Money { Amount = 100, Currency = "PKR" };
        Money b = new Money { Amount = 100, Currency = "PKR" };
        Console.WriteLine(a);
        Console.WriteLine(a.Equals(b));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Overrides ToString",
              keywords: [{ pattern: "override\\s+string\\s+ToString" }],
            },
            {
              id: 2,
              label: "Overrides Equals",
              keywords: [{ pattern: "override\\s+bool\\s+Equals" }],
            },
            {
              id: 3,
              label: "Overrides GetHashCode",
              keywords: [{ pattern: "override\\s+int\\s+GetHashCode" }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "generics",
    title: "Generics & Type Constraints",
    icon: "🧩",
    color: "#14b8a6",
    lessons: [
      {
        id: "cs-oop-11",
        title: "Generic Classes & Methods",
        xp: 15,
        theory: [
          text(
            "A **generic** type takes another type as a parameter. Instead of writing one box for `int` and another for `string`, you write `Box<T>` once and the caller decides what `T` is.",
            {
              label: "A generic class",
              content: `class Box<T> {
    public T Value { get; set; }

    public string Describe() => $"Box holding: {Value}";
}

Box<int> numbers = new Box<int> { Value = 42 };
Box<string> words = new Box<string> { Value = "hello" };

Console.WriteLine(numbers.Describe());
Console.WriteLine(words.Describe());`,
            },
          ),
          text(
            "The alternative — storing everything as `object` — compiles but loses type safety. You have to cast on the way out, and a wrong cast only explodes at runtime. Generics catch the mistake at compile time.",
            {
              label: "Why not just use object?",
              content: `// Without generics — unsafe
class ObjectBox {
    public object Value { get; set; }
}

ObjectBox box = new ObjectBox { Value = "hello" };
int n = (int)box.Value;   // compiles, crashes at runtime

// With generics — the compiler stops you
Box<string> safeBox = new Box<string> { Value = "hello" };
// int m = safeBox.Value;  // compiler error, caught immediately`,
            },
          ),
          text(
            "Methods can be generic too, even inside a non-generic class. The type parameter sits after the method name and is usually inferred from the arguments.",
            {
              label: "A generic method",
              content: `static void Swap<T>(ref T a, ref T b) {
    T temp = a;
    a = b;
    b = temp;
}

int x = 1, y = 2;
Swap(ref x, ref y);   // T inferred as int
Console.WriteLine($"{x} {y}");  // 2 1`,
            },
          ),
          callout(
            "info",
            "`List<T>`, `Dictionary<TKey, TValue>`, and `Nullable<T>` are all just generic classes from the standard library — nothing you cannot write yourself.",
          ),
          quiz(
            "What does `Box<T>` gain over a class that stores its value as `object`?",
            [
              "It runs faster in every case",
              "Type safety at compile time, with no casting",
              "It allows inheritance",
              "It makes the class immutable",
            ],
            1,
            "Generics let the compiler check types up front and remove the casts, so a wrong type is a build error instead of a runtime crash.",
          ),
        ],
        challenge: {
          title: "Write a Generic Box",
          description:
            "Create a generic class `Box<T>` with a public `T Value` property and a `Describe()` method returning a string containing `Value`. In `Main`, create a `Box<int>` holding `7` and a `Box<string>` holding `\"polycode\"`, then print both descriptions.",
          starterCode: `using System;

// Declare the generic Box<T> class here


class Program {
    static void Main() {
        // Create a Box<int> and a Box<string>


        // Print both descriptions

    }
}`,
          solutionCode: `using System;

class Box<T> {
    public T Value { get; set; }

    public string Describe() => $"Box holding: {Value}";
}

class Program {
    static void Main() {
        Box<int> numbers = new Box<int> { Value = 7 };
        Box<string> words = new Box<string> { Value = "polycode" };

        Console.WriteLine(numbers.Describe());
        Console.WriteLine(words.Describe());
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a generic Box<T>",
              keywords: [{ pattern: "class\\s+Box\\s*<\\s*T\\s*>" }],
            },
            {
              id: 2,
              label: "Uses Box with int and string",
              keywords: [
                { pattern: "Box\\s*<\\s*int\\s*>" },
                { pattern: "Box\\s*<\\s*string\\s*>" },
              ],
            },
            {
              id: 3,
              label: "Calls Describe()",
              keywords: [{ pattern: "Describe\\s*\\(" }],
            },
          ],
        },
      },
      {
        id: "cs-oop-12",
        title: "Type Constraints & Generic Interfaces",
        xp: 16,
        theory: [
          text(
            "By default a generic method knows nothing about `T`, so it can only call the members every object has. A **constraint** narrows what `T` can be, and in exchange the compiler lets you use that type's members.",
            {
              label: "Constraining T with where",
              content: `static T Max<T>(T a, T b) where T : IComparable<T> {
    return a.CompareTo(b) > 0 ? a : b;
}

Console.WriteLine(Max(3, 9));          // 9
Console.WriteLine(Max("apple", "pear")); // pear`,
            },
          ),
          text(
            "Without `where T : IComparable<T>` the call to `CompareTo` would not compile — `object` has no such method. The constraint is a promise the caller must keep and the method body can rely on.",
          ),
          text(
            "Several constraint kinds exist, and they can be combined on one type parameter.",
            {
              label: "The common constraints",
              content: `where T : class        // T must be a reference type
where T : struct       // T must be a value type
where T : new()        // T must have a parameterless constructor
where T : IComparable  // T must implement this interface
where T : Animal       // T must be Animal or derive from it

// Combined, in that required order
static void Setup<T>(T item) where T : Animal, IComparable<T>, new() { }`,
            },
          ),
          text(
            "Interfaces can be generic too. A generic interface lets you describe one contract that works for any entity type — the classic example being a repository.",
            {
              label: "A generic interface",
              content: `interface IRepository<T> where T : class {
    void Add(T item);
    T GetFirst();
}

class MemoryRepository<T> : IRepository<T> where T : class {
    private readonly List<T> items = new List<T>();

    public void Add(T item) => items.Add(item);
    public T GetFirst() => items[0];
}`,
            },
          ),
          callout(
            "info",
            "Constrain as loosely as the body allows. Every constraint you add is a restriction on everyone who calls your code — take only what you actually use.",
          ),
          quiz(
            "Why does `Max<T>` need `where T : IComparable<T>`?",
            [
              "To make T a value type",
              "So the body can call CompareTo on T",
              "To allow T to be null",
              "It is only for documentation",
            ],
            1,
            "Without the constraint the compiler treats T as object, which has no CompareTo method, so the body would not compile.",
          ),
        ],
        challenge: {
          title: "Constrain a Generic Max",
          description:
            "Write a static generic method `Max<T>(T a, T b)` constrained with `where T : IComparable<T>` that returns the larger value using `CompareTo`. Call it once with two `int` values and once with two `string` values, printing each result.",
          starterCode: `using System;

class Program {
    // Write the constrained Max<T> method here


    static void Main() {
        // Call Max with ints and with strings, print both

    }
}`,
          solutionCode: `using System;

class Program {
    static T Max<T>(T a, T b) where T : IComparable<T> {
        return a.CompareTo(b) > 0 ? a : b;
    }

    static void Main() {
        Console.WriteLine(Max(3, 9));
        Console.WriteLine(Max("apple", "pear"));
    }
}`,
          tests: [
            {
              id: 1,
              label: "Declares a generic Max<T> method",
              keywords: [{ pattern: "Max\\s*<\\s*T\\s*>" }],
            },
            {
              id: 2,
              label: "Constrains T to IComparable<T>",
              keywords: [{ pattern: "where\\s+T\\s*:\\s*IComparable" }],
            },
            {
              id: 3,
              label: "Uses CompareTo in the body",
              keywords: [{ pattern: "CompareTo\\s*\\(" }],
            },
          ],
        },
      },
    ],
  },
];

export const CSHARP_OOP_CHAPTERS = RAW_CSHARP_OOP_CHAPTERS;

export const CSHARP_OOP_LESSONS = CSHARP_OOP_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const CSHARP_OOP_TOTAL_XP = CSHARP_OOP_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);
