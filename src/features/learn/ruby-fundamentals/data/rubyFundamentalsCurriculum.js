// PolyCode — Ruby Fundamentals interactive course
// 10 chapters · 28 lessons · server/browser Ruby challenges

const ACCENT = "#701516";

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

export const RUBY_FUNDAMENTALS_CHAPTERS = [
  {
    id: "welcome",
    title: "Welcome to Ruby",
    stage: "beginner",
    icon: "💎",
    color: ACCENT,
    lessons: [
      {
        id: "ruby-0",
        title: "What is Ruby?",
        xp: 10,
        theory: [
          text(
            "**Ruby** is a dynamic, open-source programming language with a focus on simplicity and productivity. Created by Yukihiro 'Matz' Matsumoto, its philosophy is 'programmer happiness.' It has an elegant syntax that is natural to read and easy to write.",
            {
              label: "A tiny Ruby program",
              content: `puts "Hello, PolyCode!"`,
            },
          ),
          text(
            "Unlike C++, Ruby hides complex memory management and compilation steps. You write a script, and the Ruby interpreter runs it immediately. Everything in Ruby is an **object** — even numbers and booleans.",
          ),
          diagram("Where Ruby shines", [
            { id: "web", label: "Web Development", color: ACCENT, items: ["Ruby on Rails", "Stripe API backend", "Shopify"] },
            { id: "automation", label: "Automation", color: "#22c55e", items: ["DevOps tools", "Chef & Puppet", "Homebrew"] },
            { id: "scripting", label: "Data & Scripting", color: "#3b82f6", items: ["Text processing", "Web scraping", "CLI tools"] },
          ]),
          callout(
            "info",
            "Ruby does not require semicolons `;` at the end of lines, nor does it require a `main()` function wrapper. Execution simply starts at the top of the file and flows downward.",
          ),
          quiz(
            "What is the primary design philosophy behind Ruby?",
            ["Maximum execution speed", "Programmer happiness and readability", "Strict typing", "Manual memory management"],
            1,
            "Ruby was designed to be natural and enjoyable for humans to read and write.",
          ),
        ],
        challenge: {
          title: "Hello, PolyCode",
          description: "Use `puts` to print exactly: `Hello, PolyCode!`",
          starterCode: `# Print Hello, PolyCode!`,
          solutionCode: `puts "Hello, PolyCode!"`,
          tests: [
            { id: 1, label: "Uses puts", keywords: [{ pattern: "puts" }] },
            { id: 2, label: "Prints Hello, PolyCode!", keywords: [{ pattern: "Hello,\\s*PolyCode!" }] },
          ],
        },
      },
      {
        id: "ruby-1",
        title: "Your First Script",
        xp: 10,
        theory: [
          text(
            "Ruby gives you three common ways to output data to the terminal: `puts` (adds a newline after printing), `print` (does not add a newline), and `p` (prints the raw 'inspected' version of an object, great for debugging).",
            {
              label: "Output methods",
              content: `puts "Line 1"
print "Line 2 "
print "Still Line 2\\n"
p "Debugging text"`,
            },
          ),
          text(
            "Comments in Ruby start with the `#` symbol. Use them to leave notes for yourself or other developers.",
          ),
          callout(
            "tip",
            "You do not need parentheses to call basic methods in Ruby. `puts(\"Hi\")` and `puts \"Hi\"` do exactly the same thing. Rubyists prefer leaving parentheses off when they aren't necessary.",
          ),
          quiz(
            "Which output method automatically adds a newline character at the end?",
            ["print", "p", "puts", "echo"],
            2,
            "puts stands for 'put string' and appends a newline.",
          ),
        ],
        challenge: {
          title: "Ruby Status",
          description: "Print two separate lines using `puts`. First line: `Language: Ruby`, Second line: `Type: Dynamic`.",
          starterCode: `# Print the two lines here`,
          solutionCode: `puts "Language: Ruby"\nputs "Type: Dynamic"`,
          tests: [
            { id: 1, label: "Prints Language: Ruby", keywords: [{ pattern: "Language:\\s*Ruby" }] },
            { id: 2, label: "Prints Type: Dynamic", keywords: [{ pattern: "Type:\\s*Dynamic" }] },
            { id: 3, label: "Uses puts multiple times", keywords: [{ pattern: "puts.*puts", flags: "s" }] },
          ],
        },
      },
      {
        id: "ruby-2",
        title: "Interpreting Code",
        xp: 10,
        theory: [
          text(
            "Ruby is an **interpreted** language. Instead of a compiler generating an executable file (like C++), the Ruby Virtual Machine reads your `.rb` file top-to-bottom and executes the instructions on the fly.",
          ),
          diagram("Execution Flow", [
            { id: "write", label: "1. Write", color: ACCENT, items: ["script.rb file", "Clean syntax", "Save work"] },
            { id: "run", label: "2. Run", color: "#f97316", items: ["ruby script.rb", "Interpreter reads code", "No build step"] },
            { id: "exec", label: "3. Execute", color: "#22c55e", items: ["Line by line", "Output to console", "Errors halt script"] },
          ]),
          text(
            "Because it reads top-to-bottom, if an error occurs on line 10, lines 1 through 9 will still execute before the program crashes. This is different from C++, which won't even run if there is a syntax error.",
          ),
          callout("info", "In PolyCode, clicking 'Run & Submit' passes your script directly to the Ruby interpreter in the background."),
        ],
        challenge: {
          title: "Execution Check",
          description: "Write a script that outputs `Execution Complete`.",
          starterCode: `# Print Execution Complete`,
          solutionCode: `puts "Execution Complete"`,
          tests: [
            { id: 1, label: "Prints Execution Complete", keywords: [{ pattern: "Execution\\s*Complete" }] },
          ],
        },
      },
    ],
  },
  {
    id: "variables",
    title: "Variables & Core Types",
    stage: "beginner",
    icon: "📦",
    color: "#be123c",
    lessons: [
      {
        id: "ruby-3",
        title: "Variables & Objects",
        xp: 12,
        theory: [
          text(
            "A **variable** is a label pointing to an object in memory. Ruby is **dynamically typed** — you do not need to declare a variable's type. The interpreter figures it out based on the data you assign to it.",
            {
              label: "Dynamic assignment",
              content: `age = 14          # Integer
price = 9.99      # Float
grade = "A"       # String
passed = true     # TrueClass / Boolean`,
            },
          ),
          text(
            "In Ruby, literally everything is an object. `14` isn't just a primitive number; it's an instance of the `Integer` class and has its own methods. Variables use `snake_case` naming conventions by default.",
          ),
          callout("tip", "Because types are dynamic, you can reassign a variable to a different type later: `score = 100`, then `score = \"Perfect\"`. However, doing this is usually bad practice!"),
          quiz(
            "How do you declare a variable holding the number 42 in Ruby?",
            ["int meaning = 42;", "meaning = 42", "let meaning = 42", "var meaning = 42"],
            1,
            "Ruby requires no keywords like int, let, or var. Just assign the value.",
          ),
        ],
        challenge: {
          title: "Bank Balance",
          description: "Create a variable named `balance` assigned to `250.75` and print it using `puts`.",
          starterCode: `# Declare balance and print it`,
          solutionCode: `balance = 250.75\nputs balance`,
          tests: [
            { id: 1, label: "Declares balance", keywords: [{ pattern: "balance\\s*=\\s*250\\.75" }] },
            { id: 2, label: "Prints balance", keywords: [{ pattern: "puts\\s+balance" }] },
          ],
        },
      },
      {
        id: "ruby-4",
        title: "Constants & Mutability",
        xp: 12,
        theory: [
          text(
            "A **constant** is a variable whose value shouldn't change. In Ruby, any variable starting with a **Capital Letter** is considered a constant. The convention is to use `ALL_CAPS` for constants.",
            {
              label: "Constants",
              content: `MAX_HEALTH = 100
PI = 3.14159

# Ruby allows this, but issues a warning:
MAX_HEALTH = 200  # warning: already initialized constant`,
            },
          ),
          text(
            "Unlike other languages, Ruby won't crash if you reassign a constant; it just yells at you with a warning. We trust developers to respect the uppercase rule.",
          ),
          diagram("Variable Naming Rules", [
            { id: "local", label: "Local Variables", color: ACCENT, items: ["snake_case", "age, user_name", "Can change freely"] },
            { id: "const", label: "Constants", color: "#f97316", items: ["UPPER_CASE", "MAX_SPEED, API_KEY", "Should not change"] },
          ]),
          callout("info", "To completely lock an object from being modified in Ruby, you can call the `.freeze` method on it: `NAME = \"Poly\".freeze`."),
        ],
        challenge: {
          title: "Speed Limit",
          description: "Declare a constant `SPEED_LIMIT` assigned to `60` and print exactly: `Limit: 60`.",
          starterCode: `# Declare constant and print`,
          solutionCode: `SPEED_LIMIT = 60\nputs "Limit: #{SPEED_LIMIT}"`,
          tests: [
            { id: 1, label: "Uses constant SPEED_LIMIT", keywords: [{ pattern: "SPEED_LIMIT\\s*=\\s*60" }] },
            { id: 2, label: "Prints Limit: 60", keywords: [{ pattern: "Limit:\\s*60" }] },
          ],
        },
      },
      {
        id: "ruby-5",
        title: "Operators & Math",
        xp: 12,
        theory: [
          text(
            "Ruby handles math similarly to most languages: `+`, `-`, `*`, `/`, `%` (modulo/remainder), and `**` (exponentiation).",
            {
              label: "Math operations",
              content: `apples = 3
oranges = 2
total = apples + oranges  # 5
squared = 5 ** 2          # 25`,
            },
          ),
          text(
            "Integer division truncates decimals: `7 / 2` is `3`. If you need a decimal result, at least one number must be a Float: `7.0 / 2` is `3.5`.",
          ),
          callout("tip", "Ruby does not have `++` or `--` operators! Use `+= 1` or `-= 1` instead."),
          quiz(
            "What is the result of 2 ** 3 in Ruby?",
            ["6", "8", "5", "Error"],
            1,
            "** is the exponentiation operator. 2 to the power of 3 is 8.",
          ),
        ],
        challenge: {
          title: "Cart Total",
          description: "Given `price = 15` and `qty = 4`, compute `total = price * qty` and print `Total: 60`.",
          starterCode: `price = 15\nqty = 4\n# Compute total and print`,
          solutionCode: `price = 15\nqty = 4\ntotal = price * qty\nputs "Total: #{total}"`,
          tests: [
            { id: 1, label: "Multiplies price * qty", keywords: [{ pattern: "price\\s*\\*\\s*qty" }] },
            { id: 2, label: "Stores in total", keywords: [{ pattern: "total\\s*=" }] },
            { id: 3, label: "Prints Total: 60", keywords: [{ pattern: "Total:\\s*60" }] },
          ],
        },
      },
      {
        id: "ruby-6",
        title: "Interactive Terminal",
        xp: 15,
        theory: [
          text(
            "To get input from a user, use the `gets` method. It pauses the script and waits for the user to type and press Enter.",
            {
              label: "Reading input",
              content: `puts "Enter your name:"
input = gets&.chomp
name = (input.nil? || input.strip.empty?) ? "Guest" : input
puts "Welcome, #{name}!"`,
            },
          ),
          text(
            "When the user presses Enter, Ruby captures the text *and* the invisible newline character `\\n`. The `.chomp` method cleanly removes that trailing newline.",
          ),
          callout("warning", "`gets` always returns a String. If you want a number, chain `.to_i` (to integer) or `.to_f` (to float) like this: `age = gets.chomp.to_i`."),
          quiz(
            "What does .chomp do?",
            ["Deletes the entire string", "Removes trailing newline characters", "Converts text to an integer", "Makes text uppercase"],
            1,
            ".chomp removes the invisible newline '\\n' created when the user hits Enter.",
          ),
        ],
        challenge: {
          title: "Temperature Reader",
          description: "Use `gets` to read input, convert it to an integer using `.to_i`, and print `Temp: ` followed by the value.",
          starterCode: `temp = gets\n# Convert to int and print Temp: <value>`,
          solutionCode: `temp = gets.to_i\nputs "Temp: #{temp}"`,
          tests: [
            { id: 1, label: "Uses gets", keywords: [{ pattern: "gets" }] },
            { id: 2, label: "Converts to integer", keywords: [{ pattern: "\\.to_i" }] },
            { id: 3, label: "Prints Temp:", keywords: [{ pattern: "Temp:" }] },
          ],
        },
      },
    ],
  },
  {
    id: "control-flow",
    title: "Control Flow",
    stage: "beginner",
    icon: "🔀",
    color: "#e11d48",
    lessons: [
      {
        id: "ruby-7",
        title: "if, else, and unless",
        xp: 12,
        theory: [
          text(
            "Decisions allow your script to branch. `if` blocks execute when a condition is true. Ruby uses `end` to close blocks, not curly braces `{}`.",
            {
              label: "Pass or fail",
              content: `score = 72
if score >= 60
  puts "Pass"
else
  puts "Fail"
end`,
            },
          ),
          text(
            "Ruby introduces an elegant opposite to `if`: the `unless` statement. It executes only when a condition is **false**.",
            {
              label: "Using unless",
              content: `health = 0

unless health > 0
  puts "Game Over"
end
# Reads exactly like English: "Unless health is greater than 0, print Game Over."`,
            },
          ),
          callout("tip", "Ruby allows 'inline modifiers' for short conditions: `puts \"Win!\" if score == 100`."),
          quiz(
            "What is the equivalent of 'if not condition' in Ruby?",
            ["else if", "unless", "except", "without"],
            1,
            "unless runs code only when the condition evaluates to false.",
          ),
        ],
        challenge: {
          title: "Game Over Check",
          description: "If `health` is 0 or less, print `Game Over`; otherwise print `Keep playing`. Set `health = 0` and use an if/else block.",
          starterCode: `health = 0\n# Print Game Over or Keep playing`,
          solutionCode: `health = 0\nif health <= 0\n  puts "Game Over"\nelse\n  puts "Keep playing"\nend`,
          tests: [
            { id: 1, label: "Uses if", keywords: [{ pattern: "if\\s+" }] },
            { id: 2, label: "Uses else", keywords: [{ pattern: "else" }] },
            { id: 3, label: "Prints Game Over", keywords: [{ pattern: "Game Over" }] },
          ],
        },
      },
      {
        id: "ruby-8",
        title: "case expressions",
        xp: 12,
        theory: [
          text(
            "A `case` expression handles multiple equal choices gracefully. It replaces long chains of `elsif` statements. You match conditions using `when`.",
            {
              label: "Menu selection",
              content: `choice = 2
case choice
when 1
  puts "New Game"
when 2
  puts "Load Game"
else
  puts "Quit"
end`,
            },
          ),
          text(
            "Unlike C++ or JavaScript, Ruby's `case` statement does **not** fall through. You do not need to write `break` after every `when` block! Once a match is found, it runs and exits automatically.",
          ),
          callout("info", "Case statements in Ruby are incredibly powerful. They use the `===` operator under the hood, allowing you to match against ranges (like `when 1..10`) or even object classes (like `when String`)."),
        ],
        challenge: {
          title: "Traffic Light",
          description: "Set `light = 3`. Use a `case` block to print `Go` when light is 3, and print `Stop` in the `else` fallback block.",
          starterCode: `light = 3\n# case block: 3 -> Go, else -> Stop`,
          solutionCode: `light = 3\ncase light\nwhen 3\n  puts "Go"\nelse\n  puts "Stop"\nend`,
          tests: [
            { id: 1, label: "Uses case", keywords: [{ pattern: "case\\s+light" }] },
            { id: 2, label: "Uses when 3", keywords: [{ pattern: "when\\s+3" }] },
            { id: 3, label: "Prints Go", keywords: [{ pattern: "Go" }] },
          ],
        },
      },
    ],
  },
  {
    id: "loops",
    title: "Iteration & Loops",
    stage: "beginner",
    icon: "🔄",
    color: "#f43f5e",
    lessons: [
      {
        id: "ruby-9",
        title: "Traditional Loops",
        xp: 15,
        theory: [
          text(
            "Ruby supports traditional `while` loops that repeat as long as a condition remains true.",
            {
              label: "Countdown",
              content: `countdown = 3
while countdown > 0
  puts countdown
  countdown -= 1
end
puts "Liftoff!"`,
            },
          ),
          text(
            "Just as `unless` is the opposite of `if`, Ruby has `until` as the opposite of `while`. An `until` loop repeats as long as a condition is **false**.",
            {
              label: "Until loop",
              content: `balance = 0

until balance >= 100
  balance += 10
end

puts "Final balance: #{balance}"`,
            },
          ),
          callout("warning", "Always ensure something inside the loop modifies the condition over time. Otherwise, the loop runs forever!"),
        ],
        challenge: {
          title: "Savings Goal",
          description: "Start `balance = 0`. While balance is less than 30, add 10 to balance and print it.",
          starterCode: `balance = 0\n# while loop: add 10 until goal reached`,
          solutionCode: `balance = 0\nwhile balance < 30\n  balance += 10\n  puts balance\nend`,
          tests: [
            { id: 1, label: "Uses while loop", keywords: [{ pattern: "while\\s+balance" }] },
            { id: 2, label: "Adds 10", keywords: [{ pattern: "\\+=\\s*10" }] },
            { id: 3, label: "Prints balance", keywords: [{ pattern: "puts\\s+balance" }] },
          ],
        },
      },
      {
        id: "ruby-10",
        title: "Numeric Iterators",
        xp: 15,
        theory: [
          text(
            "While traditional loops exist, Rubyists rarely use them! Because numbers are objects, they have built-in methods for looping, like `.times`, `.upto`, and `.downto`.",
            {
              label: "The Ruby Way",
              content: `5.times do
  puts "Hello!"
end

1.upto(3) do |i|
  puts "Step #{i}"
end`,
            },
          ),
          text(
            "The `do ... end` structure attached to the method is called a **block**. The variable inside the pipes `|i|` receives the current counter value automatically. No more `i = 0; i < 5; i++`!",
          ),
          diagram("Numeric Iterators", [
            { id: "times", label: "5.times", color: ACCENT, items: ["Repeats N times", "Passes 0..(N-1)", "Cleanest loop"] },
            { id: "upto", label: "1.upto(5)", color: "#f97316", items: ["Counts upward", "Inclusive bounds", "Passes current int"] },
          ]),
          quiz(
            "What values will be passed to 'i' in `3.times do |i|`?",
            ["1, 2, 3", "0, 1, 2", "3, 3, 3", "0, 1, 2, 3"],
            1,
            ".times is zero-indexed, meaning 3.times yields 0, 1, and 2.",
          ),
        ],
        challenge: {
          title: "Multiplication Table",
          description: "Print `5 x 1 = 5` through `5 x 3 = 15` using the `1.upto(3)` iterator block.",
          starterCode: `# use 1.upto(3) do |i|`,
          solutionCode: `1.upto(3) do |i|\n  puts "5 x #{i} = #{5 * i}"\nend`,
          tests: [
            { id: 1, label: "Uses .upto(3)", keywords: [{ pattern: "1\\.upto\\(3\\)" }] },
            { id: 2, label: "Prints 5 x 1", keywords: [{ pattern: "5 x 1" }] },
            { id: 3, label: "Evaluates math dynamically", keywords: [{ pattern: "\\#\\{5 \\* i\\}" }] },
          ],
        },
      },
    ],
  },
  {
    id: "methods",
    title: "Methods & Scope",
    stage: "intermediate",
    icon: "🔧",
    color: "#db2777",
    lessons: [
      {
        id: "ruby-11",
        title: "Defining Methods",
        xp: 15,
        theory: [
          text(
            "A **method** is a reusable chunk of code. In Ruby, methods are defined using `def` and closed with `end`.",
            {
              label: "Simple method",
              content: `def say_hello
  puts "Welcome to PolyCode!"
end

say_hello # Calling the method`,
            },
          ),
          text(
            "**Implicit Return:** Ruby automatically returns the result of the *last evaluated expression* in a method. You rarely need to use the `return` keyword unless you are exiting a method early.",
            {
              label: "Implicit returns",
              content: `def double_score(s)
  s * 2  # The 'return' is invisible but happens automatically!
end

puts double_score(5)`,
            },
          ),
          callout("tip", "Method names should be written in `snake_case`. Methods that return true/false should end in a question mark, like `game_over?`."),
        ],
        challenge: {
          title: "Print Banner",
          description: "Define a method `print_banner` that displays `=== PolyCode ===`. Call it afterwards.",
          starterCode: `# Define print_banner here\n\n# Call it`,
          solutionCode: `def print_banner\n  puts "=== PolyCode ==="\nend\n\nprint_banner`,
          tests: [
            { id: 1, label: "Defines print_banner", keywords: [{ pattern: "def\\s+print_banner" }] },
            { id: 2, label: "Calls print_banner", keywords: [{ pattern: "print_banner" }] },
            { id: 3, label: "Prints exact string", keywords: [{ pattern: "=== PolyCode ===" }] },
          ],
        },
      },
      {
        id: "ruby-12",
        title: "Arguments & Defaults",
        xp: 15,
        theory: [
          text(
            "Methods can accept inputs called **arguments**. If you provide a default value, the argument becomes optional when the caller invokes the method.",
            {
              label: "Default parameters",
              content: `def greet(name = "Guest")
  puts "Hello, #{name}!"
end

greet("Ava")  # "Hello, Ava!"
greet         # "Hello, Guest!"`,
            },
          ),
          text(
            "Parentheses around arguments in method definitions are technically optional in Ruby, but it is highly recommended to use them for clarity.",
          ),
          quiz(
            "If a method ends with `name.upcase`, what does the method return?",
            ["Nothing", "The uppercased name", "True", "An error"],
            1,
            "Due to implicit returns, Ruby evaluates the last line and returns its result automatically.",
          ),
        ],
        challenge: {
          title: "Grade Points",
          description: "Write a method `to_points(grade)` that implicitly returns `grade * 10`. Outside the method, print the result of `to_points(8)`.",
          starterCode: `# def to_points(grade)\n\nputs to_points(8)`,
          solutionCode: `def to_points(grade)\n  grade * 10\nend\n\nputs to_points(8)`,
          tests: [
            { id: 1, label: "Defines to_points", keywords: [{ pattern: "def\\s+to_points" }] },
            { id: 2, label: "Implicit return", keywords: [{ pattern: "grade\\s*\\*\\s*10" }] },
            { id: 3, label: "Prints 80", keywords: [{ pattern: "puts.*to_points" }] },
          ],
        },
      },
      {
        id: "ruby-13",
        title: "Scope & Global Visibility",
        xp: 18,
        theory: [
          text(
            "**Scope** defines where a variable is visible. In Ruby, local variables defined outside a method are **not** visible inside it, and vice versa. Methods act like completely isolated rooms.",
            {
              label: "Scope barrier",
              content: `xp = 100
def gain_level
  # Cannot see 'xp' from outside here!
  bonus = 50
end
# Cannot see 'bonus' from inside here!`,
            },
          ),
          text(
            "To break scope, Ruby uses special variable prefixes:\n* `$global_var` : Visible everywhere (use rarely).\n* `@instance_var` : Used in Object-Oriented Ruby (next chapter).\n* `@@class_var` : Shared across a class.",
          ),
          callout("tip", "Always pass data into methods via arguments, and get data out via returns. Avoid using globals (`$`) as they make bugs hard to track."),
        ],
        challenge: {
          title: "Local State Fix",
          description: "Fix the broken scope! The method tries to access `xp`. Change the method so it accepts `xp` as an argument, adds 50, and returns the new value. Print the result.",
          starterCode: `def level_up\n  xp + 50\nend\n\nxp = 10\nputs level_up()`,
          solutionCode: `def level_up(xp)\n  xp + 50\nend\n\nxp = 10\nputs level_up(xp)`,
          tests: [
            { id: 1, label: "Takes argument", keywords: [{ pattern: "def\\s+level_up\\s*\\(\\s*xp\\s*\\)" }] },
            { id: 2, label: "Passes argument", keywords: [{ pattern: "level_up\\s*\\(\\s*xp\\s*\\)" }] },
            { id: 3, label: "Prints 60", keywords: [{ pattern: "puts" }] },
          ],
        },
      },
    ],
  },
  {
    id: "arrays-collections",
    title: "Collections & Enumerables",
    stage: "intermediate",
    icon: "📋",
    color: "#c026d3",
    lessons: [
      {
        id: "ruby-14",
        title: "Arrays",
        xp: 15,
        theory: [
          text(
            "An **Array** is an ordered list of items. Unlike strict C++ arrays, Ruby arrays dynamically resize and can hold a mix of different object types simultaneously.",
            {
              label: "Array Basics",
              content: `scores = [88, 92, 75]
puts scores[0]     # 88
puts scores[-1]    # 75 (Negative index gets last item)
scores << 100      # The shovel operator appends an item`,
            },
          ),
          text(
            "Ruby provides dozens of helpful array methods: `.length`, `.first`, `.last`, `.push`, `.pop`, and `.sort`.",
          ),
          callout("warning", "Arrays are zero-indexed. The first item is at `[0]`, not `[1]`."),
        ],
        challenge: {
          title: "Weekly Steps",
          description: "Create an array `steps = [4000, 6000, 5000]`. Use the shovel operator `<<` to add `7000`. Then print the element at index 1.",
          starterCode: `# create steps, shovel 7000, print index 1`,
          solutionCode: `steps = [4000, 6000, 5000]\nsteps << 7000\nputs steps[1]`,
          tests: [
            { id: 1, label: "Array declaration", keywords: [{ pattern: "\\[4000,\\s*6000,\\s*5000\\]" }] },
            { id: 2, label: "Uses shovel <<", keywords: [{ pattern: "<<\\s*7000" }] },
            { id: 3, label: "Prints index 1", keywords: [{ pattern: "puts\\s+steps\\[1\\]" }] },
          ],
        },
      },
      {
        id: "ruby-15",
        title: "Iterating Collections (.each)",
        xp: 15,
        theory: [
          text(
            "While you could use a `while` loop to traverse an array via index, the idiomatic Ruby approach uses the `.each` iterator paired with a block.",
            {
              label: "The .each iterator",
              content: `fruits = ["Apple", "Banana", "Cherry"]
fruits.each do |fruit|
  puts "I love #{fruit}s"
end`,
            },
          ),
          text(
            "`.each` grabs every element one by one, temporarily assigning it to the block variable (the word inside the pipes `| |`), and executes the code block.",
          ),
          diagram("Iteration methods", [
            { id: "each", label: ".each", color: ACCENT, items: ["Visits every item", "Good for printing/summing"] },
            { id: "map", label: ".map", color: "#f97316", items: ["Transforms items", "Returns a NEW array"] },
            { id: "select", label: ".select", color: "#22c55e", items: ["Filters items", "Like IF condition inside loop"] },
          ]),
          quiz(
            "What goes inside the pipes `| |` in an .each block?",
            ["The index number", "The current array element", "The length of the array", "The return value"],
            1,
            "The pipes define block parameters, which hold the current element being iterated over.",
          ),
        ],
        challenge: {
          title: "Class Average",
          description: "Given `grades = [70, 80, 90]`, start `sum = 0`. Use `.each` to add every grade to the sum. Finally, print `sum / 3`.",
          starterCode: `grades = [70, 80, 90]\nsum = 0\n# use .each to calculate sum\nputs sum / 3`,
          solutionCode: `grades = [70, 80, 90]\nsum = 0\ngrades.each do |grade|\n  sum += grade\nend\nputs sum / 3`,
          tests: [
            { id: 1, label: "Uses .each", keywords: [{ pattern: "\\.each\\s+do" }] },
            { id: 2, label: "Accumulates sum", keywords: [{ pattern: "sum\\s*\\+=" }] },
            { id: 3, label: "Prints 80", keywords: [{ pattern: "puts\\s+sum" }] },
          ],
        },
      },
    ],
  },
  {
    id: "hashes",
    title: "Hashes & Symbol Essentials",
    stage: "intermediate",
    icon: "🏷️",
    color: "#9333ea",
    lessons: [
      {
        id: "ruby-16",
        title: "Symbols",
        xp: 15,
        theory: [
          text(
            "A **Symbol** looks like a string but is prefixed with a colon, like `:name` or `:active`. They are lightweight, immutable labels used heavily in Ruby for identification.",
            {
              label: "Strings vs Symbols",
              content: `puts "hello".object_id  # 60
puts "hello".object_id  # 80 (Different memory locations)

puts :hello.object_id   # 1234
puts :hello.object_id   # 1234 (Exact same object in memory!)`,
            },
          ),
          text(
            "Every time you type a String, Ruby allocates new memory. Every time you type a Symbol, Ruby re-uses the exact same object. Because of this speed and efficiency, Symbols are the go-to choice for Hash keys.",
          ),
          callout("tip", "Use Strings for data you manipulate or print (names, messages). Use Symbols for internal programmatic labels (statuses, keys, flags)."),
        ],
        challenge: {
          title: "Symbol Tracking",
          description: "Create a variable `status` and assign the symbol `:pending` to it. Print the status.",
          starterCode: `# Assign :pending to status and print`,
          solutionCode: `status = :pending\nputs status`,
          tests: [
            { id: 1, label: "Assigns :pending", keywords: [{ pattern: "status\\s*=\\s*:pending" }] },
            { id: 2, label: "Prints status", keywords: [{ pattern: "puts\\s+status" }] },
          ],
        },
      },
      {
        id: "ruby-17",
        title: "Hashes",
        xp: 15,
        theory: [
          text(
            "A **Hash** is a dictionary-like collection of key-value pairs. While arrays use integer indexes (`[0]`), hashes let you use any object as an index — most commonly Symbols.",
            {
              label: "Creating a Hash",
              content: `user = {
  :name => "Ava",
  :age => 28
}
# Modern Ruby syntax shortcut for Symbol keys:
user = { name: "Ava", age: 28 }

puts user[:name]  # Retrieves "Ava"`,
            },
          ),
          text(
            "Hashes are incredibly fast for lookups. You will use them constantly for configurations, API JSON payloads, and keyword arguments.",
          ),
          quiz(
            "What is the modern, shortened syntax for writing `:price => 10` in a hash literal?",
            ["price => 10", "price: 10", "{price} = 10", "price == 10"],
            1,
            "Placing the colon at the end of the word inside the hash translates it to a Symbol key.",
          ),
        ],
        challenge: {
          title: "Price List",
          description: "Create a hash `prices` mapping `pen:` to 2 and `book:` to 8. Print the price of the book.",
          starterCode: `prices = { # fill in hash }\n# Print book price`,
          solutionCode: `prices = { pen: 2, book: 8 }\nputs prices[:book]`,
          tests: [
            { id: 1, label: "Creates Hash", keywords: [{ pattern: "\\{" }] },
            { id: 2, label: "Symbol keys", keywords: [{ pattern: "book:\\s*8" }] },
            { id: 3, label: "Accesses via :book", keywords: [{ pattern: "prices\\[:book\\]" }] },
          ],
        },
      },
    ],
  },
  {
    id: "blocks",
    title: "Blocks, Procs, & Lambdas",
    stage: "pro",
    icon: "🧱",
    color: "#7e22ce",
    lessons: [
      {
        id: "ruby-18",
        title: "Working with Blocks & yield",
        xp: 18,
        theory: [
          text(
            "You have used blocks with `.each` and `.times`. A block is simply an anonymous chunk of code passed to a method. Inside a method, you trigger that block using the `yield` keyword.",
            {
              label: "Yielding control",
              content: `def wrap_in_tags
  puts "<tag>"
  yield      # Runs the block provided by the caller
  puts "</tag>"
end

wrap_in_tags do
  puts "Hello World"
end`,
            },
          ),
          text(
            "You can even pass data to the block by yielding arguments: `yield(name)`. The block catches it in pipes: `do |name|`.",
          ),
          callout("info", "Blocks are not objects! They are syntactic structures. You cannot save a raw block to a variable."),
        ],
        challenge: {
          title: "Custom Wrapper",
          description: "Write a method `decorate` that prints `***`, calls `yield`, and prints `***` again. Call it, passing a block that prints `Title`.",
          starterCode: `def decorate\n  # implementation\nend\n\n# call it with a block`,
          solutionCode: `def decorate\n  puts "***"\n  yield\n  puts "***"\nend\n\ndecorate do\n  puts "Title"\nend`,
          tests: [
            { id: 1, label: "Uses yield", keywords: [{ pattern: "yield" }] },
            { id: 2, label: "Calls decorate with block", keywords: [{ pattern: "decorate\\s+do" }] },
            { id: 3, label: "Prints Title", keywords: [{ pattern: "Title" }] },
          ],
        },
      },
      {
        id: "ruby-19",
        title: "Procs & Lambdas",
        xp: 18,
        theory: [
          text(
            "Since raw blocks cannot be saved to variables, Ruby provides **Procs** (Procedures) to turn a block into an object. A **Lambda** is a special, strict type of Proc.",
            {
              label: "Stabby Lambda syntax",
              content: `multiplier = ->(x) { x * 2 }
puts multiplier.call(5)  # 10`,
            },
          ),
          text(
            "Lambdas enforce the exact number of arguments passed to them and handle `return` safely (returning control back to the calling method). Normal Procs are looser.",
          ),
          diagram("Closures in Ruby", [
            { id: "block", label: "Block", color: ACCENT, items: ["do...end", "Not an object", "Runs via yield"] },
            { id: "proc", label: "Proc", color: "#f97316", items: ["Proc.new { }", "Is an object", "Loose arguments"] },
            { id: "lambda", label: "Lambda", color: "#22c55e", items: ["->() { }", "Strict arguments", "Safe returns"] },
          ]),
          quiz(
            "Which method is used to execute a stored Lambda or Proc object?",
            [".run", ".execute", ".call", ".yield"],
            2,
            "You trigger a Proc/Lambda by using the .call method.",
          ),
        ],
        challenge: {
          title: "Lambda Multiplier",
          description: "Create a lambda named `double` that takes parameter `x` and multiplies it by 2. Print the result of `double.call(10)`.",
          starterCode: `double = ->(x) { # implement }\n# call with 10`,
          solutionCode: `double = ->(x) { x * 2 }\nputs double.call(10)`,
          tests: [
            { id: 1, label: "Defines lambda", keywords: [{ pattern: "->\\s*\\(x\\)" }] },
            { id: 2, label: "Uses .call", keywords: [{ pattern: "double\\.call" }] },
            { id: 3, label: "Prints 20", keywords: [{ pattern: "puts.*double" }] },
          ],
        },
      },
    ],
  },
  {
    id: "oop",
    title: "Pure Object-Oriented Ruby",
    stage: "pro",
    icon: "🏗️",
    color: "#6b21a8",
    lessons: [
      {
        id: "ruby-20",
        title: "Classes & Instances",
        xp: 18,
        theory: [
          text(
            "A **Class** is a blueprint. An **Instance** is an object built from that blueprint. To store data unique to each instance, we use **instance variables** prefixed with `@`.",
            {
              label: "Basic Class",
              content: `class Dog
  def bark
    puts "Woof!"
  end
end

rex = Dog.new
rex.bark`,
            },
          ),
          text(
            "Instance variables (`@name`, `@hp`) live inside the object. They are completely hidden from the outside world by default.",
          ),
          callout("tip", "Class names must be CamelCase (like `UserAccount`), while variables are snake_case (`current_user`)."),
        ],
        challenge: {
          title: "Counter Class",
          description: "Define `class Counter` with an `@value` initialized to `0` inside a method `increment` which adds `1` to it and returns it. Instantiate it and call increment.",
          starterCode: `class Counter\n  # define increment method\nend\n\nc = Counter.new\n# call c.increment and print`,
          solutionCode: `class Counter\n  def increment\n    @value ||= 0\n    @value += 1\n  end\nend\n\nc = Counter.new\nputs c.increment`,
          tests: [
            { id: 1, label: "Defines Counter class", keywords: [{ pattern: "class\\s+Counter" }] },
            { id: 2, label: "Uses @value instance var", keywords: [{ pattern: "@value" }] },
            { id: 3, label: "Calls Counter.new", keywords: [{ pattern: "Counter\\.new" }] },
          ],
        },
      },
      {
        id: "ruby-21",
        title: "Attribute Accessors",
        xp: 18,
        theory: [
          text(
            "When an object is created with `.new`, Ruby automatically calls its `initialize` method. This is the constructor where you set up instance variables.",
            {
              label: "Constructor",
              content: `class Hero
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

hero = Hero.new("Arthur")
puts hero.name`,
            },
          ),
          text(
            "Since `@name` is hidden, you can't read it directly from outside (`hero.name` fails). Instead of writing boilerplate getter/setter methods, Ruby provides macro shortcuts: `attr_reader`, `attr_writer`, and `attr_accessor`.",
            {
              label: "Macros",
              content: `class Hero
  attr_accessor :name  # Automatically creates getter and setter!
  
  def initialize(n)
    @name = n
  end
end

h = Hero.new("Nova")
h.name = "Super Nova"  # Setter works!`,
            },
          ),
          quiz(
            "Which macro creates both a getter AND a setter method for an instance variable?",
            ["attr_reader", "attr_writer", "attr_accessor", "attr_both"],
            2,
            "attr_accessor dynamically writes both read and write methods for you.",
          ),
        ],
        challenge: {
          title: "Item Shop",
          description: "Define `class Item`. Use `attr_accessor :name, :price`. Write an `initialize(n, p)` method setting `@name` and `@price`. Create `sword = Item.new(\"Sword\", 50)` and print its price.",
          starterCode: `class Item\n  # Setup accessors and initialize\nend\n\n# Instantiate sword and print price`,
          solutionCode: `class Item\n  attr_accessor :name, :price\n  def initialize(n, p)\n    @name = n\n    @price = p\n  end\nend\n\nsword = Item.new("Sword", 50)\nputs sword.price`,
          tests: [
            { id: 1, label: "Uses attr_accessor", keywords: [{ pattern: "attr_accessor" }] },
            { id: 2, label: "Defines initialize", keywords: [{ pattern: "def\\s+initialize" }] },
            { id: 3, label: "Prints 50", keywords: [{ pattern: "sword\\.price" }] },
          ],
        },
      },
      {
        id: "ruby-22",
        title: "Encapsulation & Visibility",
        xp: 20,
        theory: [
          text(
            "**Encapsulation** protects object integrity. You can restrict which methods are callable from the outside by using the `private` keyword. Any method defined below `private` can only be called from *inside* the object.",
            {
              label: "Private mechanics",
              content: `class BankAccount
  attr_reader :balance

  def initialize(initial_balance)
    @balance = initial_balance
  end

  def withdraw(amount)
    deduct_funds(amount) # Safe internal call
  end

  private

  def deduct_funds(amount)
    @balance -= amount
  end
end

account = BankAccount.new(100)
account.withdraw(30)
puts "Remaining balance: $#{account.balance}"`,
            },
          ),
          text(
            "Calling `account.deduct_funds(10)` from the outside will raise a `NoMethodError` because it is strictly protected.",
          ),
          callout("tip", "Make internal helpers and raw data modifiers private. Only expose a clean, safe public interface."),
        ],
        challenge: {
          title: "Safe Vault",
          description: "Define `class Vault` with a public method `add(n)` that calls a private method `store(n)` which updates `@coins`. Create a Vault, call add(30). (Print 30 at the end).",
          starterCode: `class Vault\n  def add(n)\n    store(n)\n  end\n\n  private\n  # def store\nend`,
          solutionCode: `class Vault\n  def add(n)\n    store(n)\n  end\n\n  def total\n    @coins\n  end\n\n  private\n\n  def store(n)\n    @coins ||= 0\n    @coins += n\n  end\nend\n\nv = Vault.new\nv.add(30)\nputs v.total`,
          tests: [
            { id: 1, label: "Uses private", keywords: [{ pattern: "private" }] },
            { id: 2, label: "Calls store from add", keywords: [{ pattern: "store\\s*\\(" }] },
          ],
        },
      },
    ],
  },
  {
    id: "modules-capstone",
    title: "Modules, Exceptions & Capstone",
    stage: "advanced",
    icon: "🏆",
    color: "#1d4ed8",
    lessons: [
      {
        id: "ruby-23",
        title: "Modules & Mixins",
        xp: 18,
        theory: [
          text(
            "A **Module** is like a class that cannot be instantiated. It serves two main purposes: Namespacing (grouping related classes) and Mixins (sharing abilities across classes).",
            {
              label: "Including a Mixin",
              content: `module Walkable
  def walk
    puts "Walking..."
  end
end

class Robot
  include Walkable
end

bot = Robot.new
bot.walk`,
            },
          ),
          text(
            "Ruby does not support multiple inheritance (a class cannot inherit from two parent classes). Instead, you `include` as many modules as you want to 'mix in' capabilities.",
          ),
          quiz(
            "Can you instantiate a Module via `Walkable.new`?",
            ["Yes, if it has an initialize method", "No, modules cannot be instantiated", "Yes, but it returns a Hash", "Only in Rails"],
            1,
            "Modules are purely for holding methods and constants; they cannot create objects.",
          ),
        ],
        challenge: {
          title: "Logger Mixin",
          description: "Create a `module Logger` with a method `log` that prints `\"Log: Action\"`. Create `class System`, `include Logger`, and call `.log` on a new instance.",
          starterCode: `module Logger\n  # def log\nend\n\nclass System\n  # include Logger\nend`,
          solutionCode: `module Logger\n  def log\n    puts "Log: Action"\n  end\nend\n\nclass System\n  include Logger\nend\n\ns = System.new\ns.log`,
          tests: [
            { id: 1, label: "Defines module", keywords: [{ pattern: "module\\s+Logger" }] },
            { id: 2, label: "Includes Logger", keywords: [{ pattern: "include\\s+Logger" }] },
            { id: 3, label: "Calls log", keywords: [{ pattern: "s\\.log" }] },
          ],
        },
      },
      {
        id: "ruby-24",
        title: "Strings & Regular Expressions",
        xp: 18,
        theory: [
          text(
            "Ruby strings have immense power. You can interpolate data using `#{}`. You can search strings using **Regular Expressions** (Regex), enclosed in forward slashes `/pattern/`.",
            {
              label: "Matching with Regex",
              content: `email = "test@example.com"
if email =~ /@/
  puts "Valid email format"
end`,
            },
          ),
          text(
            "The `=~` operator tests a string against a regex. If it finds a match, it returns the index number (which is truthy). If not, it returns `nil` (which is falsey).",
          ),
          callout("tip", "String interpolation `#{}` only works inside double quotes `\"\"`. Single quotes `''` treat text literally."),
        ],
        challenge: {
          title: "Regex Validator",
          description: "Given `code = \"AB-123\"`, write an `if` block using `=~` to check if it contains a hyphen `-` via Regex `/ - /` (without spaces). If true, print `Valid`.",
          starterCode: `code = "AB-123"\n# if regex matches hyphen, print Valid`,
          solutionCode: `code = "AB-123"\nif code =~ /-/\n  puts "Valid"\nend`,
          tests: [
            { id: 1, label: "Uses =~ operator", keywords: [{ pattern: "=~" }] },
            { id: 2, label: "Uses regex / - /", keywords: [{ pattern: "/-/" }] },
            { id: 3, label: "Prints Valid", keywords: [{ pattern: "puts\\s+\"Valid\"" }] },
          ],
        },
      },
      {
        id: "ruby-25",
        title: "Exception Handling",
        xp: 20,
        theory: [
          text(
            "Sometimes scripts hit fatal errors (like dividing by zero). Instead of crashing entirely, use a `begin` / `rescue` block to trap the error and handle it gracefully.",
            {
              label: "Trapping errors",
              content: `begin
  10 / 0
rescue ZeroDivisionError => e
  puts "Error caught: #{e.message}"
end
puts "Program continues safely!"`,
            },
          ),
          text(
            "You can forcefully trigger an error yourself using the `raise` keyword: `raise \"Invalid Input\"`.",
          ),
          diagram("Rescue Flow", [
            { id: "begin", label: "begin", color: ACCENT, items: ["Risky code", "raise manually", "Normal path"] },
            { id: "rescue", label: "rescue", color: "#ef4444", items: ["Catches failure", "e.message", "Recovery path"] },
          ]),
          quiz(
            "Which keyword is used to manually trigger an error in Ruby?",
            ["throw", "catch", "raise", "error"],
            2,
            "Ruby uses 'raise' to trigger exceptions (unlike 'throw' in C++ or JS).",
          ),
        ],
        challenge: {
          title: "Safe Division",
          description: "Write a `begin` block that calculates `10 / 0`. Catch the error in a `rescue` block and print exactly `Division Error`.",
          starterCode: `begin\n  # divide by zero\nrescue\n  # print error\nend`,
          solutionCode: `begin\n  10 / 0\nrescue\n  puts "Division Error"\nend`,
          tests: [
            { id: 1, label: "Uses begin/rescue", keywords: [{ pattern: "begin.*rescue", flags: "s" }] },
            { id: 2, label: "Divides by 0", keywords: [{ pattern: "10\\s*/\\s*0" }] },
            { id: 3, label: "Prints Error", keywords: [{ pattern: "puts\\s+\"Division\\s*Error\"" }] },
          ],
        },
      },
      {
        id: "ruby-26",
        title: "Capstone Project",
        xp: 25,
        theory: [
          text(
            "It is time to combine everything. A mini calculator processes data using methods, variables, control flow, and output.",
            {
              label: "Calculator blueprint",
              content: `def calculate(a, b, op)
  case op
  when "+" then a + b
  when "-" then a - b
  else "Invalid"
  end
end

puts calculate(10, 5, "+")
puts calculate(10, 5, "-")
puts calculate(10, 5, "*")`,
            },
          ),
          text(
            "In this challenge, construct the logic for a calculator method that accepts two integers and an operator string, runs the correct math, and returns the result.",
          ),
        ],
        challenge: {
          title: "Math Processor",
          description: "Create a method `calc(a, b, op)` using a `case` statement for `op`. Support `\"+\"` and `\"*\"`. Call `calc(3, 4, \"*\")` and print the result.",
          starterCode: `def calc(a, b, op)\n  # implement switch\nend\n\n# Call and print`,
          solutionCode: `def calc(a, b, op)\n  case op\n  when "+"\n    a + b\n  when "*"\n    a * b\n  end\nend\n\nputs calc(3, 4, "*")`,
          tests: [
            { id: 1, label: "Defines calc", keywords: [{ pattern: "def\\s+calc" }] },
            { id: 2, label: "Uses case statement", keywords: [{ pattern: "case\\s+op" }] },
            { id: 3, label: "Prints 12", keywords: [{ pattern: "puts\\s+calc\\(3,\\s*4,\\s*\"\\*\"\\)" }] },
          ],
        },
      },
      {
        id: "ruby-27",
        title: "Course Recap",
        xp: 25,
        theory: [
          text(
            "Congratulations! You've learned **Ruby Fundamentals**. From raw scripts and dynamic variables to pure object-oriented blueprints, you now have the tools to write expressive, elegant code.",
          ),
          diagram("Your Ruby Path", [
            { id: "basics", label: "Basics", color: ACCENT, items: ["Dynamic types", "puts / gets", "Symbols"] },
            { id: "flow", label: "Flow & Blocks", color: "#f97316", items: [".each & .times", "yield & Procs", "case logic"] },
            { id: "oop", label: "OOP", color: "#22c55e", items: ["Classes", "Mixins", "Encapsulation"] },
          ]),
          text(
            "**What's next?** With Ruby down, you are ready to tackle **Ruby on Rails** for full-stack web development, or dive into test-driven development with RSpec.",
          ),
          callout("tip", "Keep your scripts DRY (Don't Repeat Yourself) by continually extracting logic into small, reusable methods and objects."),
          quiz(
            "Which of the following is true about Ruby?",
            ["Types must be declared", "Everything is an object", "Parentheses are always required", "Multiple inheritance is allowed"],
            1,
            "Ruby's pure object-oriented nature means even raw numbers have methods.",
          ),
        ],
        challenge: {
          title: "Graduation Badge",
          description: "Print exactly two lines: `Ruby Fundamentals` then `Complete!`",
          starterCode: `# two-line graduation message`,
          solutionCode: `puts "Ruby Fundamentals"\nputs "Complete!"`,
          tests: [
            { id: 1, label: "Line 1 title", keywords: [{ pattern: "Ruby\\s*Fundamentals" }] },
            { id: 2, label: "Line 2 Complete", keywords: [{ pattern: "Complete!" }] },
            { id: 3, label: "Two puts lines", keywords: [{ pattern: "puts.*puts", flags: "s" }] },
          ],
        },
      },
    ],
  },
];

export const RUBY_FUNDAMENTALS_LESSONS = RUBY_FUNDAMENTALS_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const RUBY_FUNDAMENTALS_TOTAL_XP = RUBY_FUNDAMENTALS_LESSONS.reduce(
  (s, l) => s + l.xp,
  0,
);