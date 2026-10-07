export const SQLSUBQUERIES_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Subqueries",
    icon: "🪆",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is a Subquery?",
        chapterTitle: "Intro to Subqueries",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A Subquery (or Inner Query) is a query nested inside another SQL query. It is usually embedded within the `WHERE` clause of the main query (Outer Query).",
          },
          {
            type: "callout",
            variant: "info",
            title: "Execution Order",
            content: "The subquery executes *first*. Its result is then passed to the outer query, which uses that result to evaluate its own `WHERE` condition."
          },
          {
            type: "code",
            lang: "sql",
            label: "Basic Subquery",
            content: "SELECT * FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);"
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Above Average",
          description: "Write a query to find all `products` whose `price` is greater than the average price of all products. Return all columns.",
          starterCode: "SELECT *\nFROM products\nWHERE price > (\n  -- write the subquery here\n);",
          solutionCode: "SELECT *\nFROM products\nWHERE price > (\n  SELECT AVG(price)\n  FROM products\n);",
          tests: [
            {
              id: "t1",
              label: "Compares price to a subquery",
              keywords: [{ pattern: "\\bprice\\s*>\\s*\\(\\s*SELECT\\b", flags: "i" }],
              hint: "Put a SELECT inside the parentheses after price >."
            },
            {
              id: "t2",
              label: "The subquery averages price across products",
              keywords: [{ pattern: "\\bSELECT\\s+AVG\\s*\\(\\s*price\\s*\\)\\s+FROM\\s+products\\b", flags: "i" }],
              hint: "The subquery is SELECT AVG(price) FROM products."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "Single Value vs Multiple Values",
        chapterTitle: "Intro to Subqueries",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "If you use a comparison operator like `=`, `>`, or `<`, the subquery **must** return exactly one single value (one column, one row). If it returns multiple rows, the query will crash."
          },
          {
            type: "code",
            lang: "sql",
            label: "Single-Value Subquery",
            content: "SELECT name, age\nFROM employees\nWHERE age = (SELECT MIN(age) FROM employees);"
          },
          {
            type: "quiz",
            question: "With `=`, `>` or `<`, how many values must the subquery return?",
            options: [
              "Exactly one (one column, one row)",
              "At least one row",
              "Any number of rows",
              "One column with any number of rows"
            ],
            answer: 0,
            explanation: "Comparison operators compare against a single value."
          },
          {
            type: "quiz",
            question: "What happens if a subquery used with `=` returns several rows?",
            options: [
              "Only the first row is used",
              "The query fails with an error",
              "The rows are averaged",
              "The outer query returns no rows"
            ],
            answer: 1,
            explanation: "`=` can't compare against a list, so the query errors."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Find the Youngest",
          description: "Find the employee(s) who have the minimum `age` in the `employees` table. Return their `name` and `age`.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT name, age\nFROM employees\nWHERE age = (\n  SELECT MIN(age)\n  FROM employees\n);",
          tests: [
            {
              id: "t1",
              label: "Selects name and age from employees",
              keywords: [{ pattern: "\\bSELECT\\s+name\\s*,\\s*age\\s+FROM\\s+employees\\b", flags: "i" }],
              hint: "Use SELECT name, age FROM employees."
            },
            {
              id: "t2",
              label: "Matches age to the minimum age from a subquery",
              keywords: [{ pattern: "\\bage\\s*=\\s*\\(\\s*SELECT\\s+MIN\\s*\\(\\s*age\\s*\\)\\s+FROM\\s+employees\\b", flags: "i" }],
              hint: "Use WHERE age = (SELECT MIN(age) FROM employees)."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Subqueries with IN",
    icon: "📥",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "The IN Operator",
        chapterTitle: "Subqueries with IN",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "If a subquery returns a column with *multiple rows*, you cannot use `=`. Instead, you use the `IN` operator in the outer query."
          },
          {
            type: "code",
            lang: "sql",
            label: "IN with Subquery",
            content: "SELECT name FROM customers\nWHERE id IN (SELECT customer_id FROM orders WHERE amount > 100);"
          },
          {
            type: "quiz",
            question: "Which operator do you use when the subquery returns many rows?",
            options: [
              "`=`",
              "`>`",
              "`IN`",
              "`LIKE`"
            ],
            answer: 2,
            explanation: "`IN` checks whether a value is in the subquery's list."
          },
          {
            type: "quiz",
            question: "What does `WHERE id IN (SELECT customer_id FROM orders WHERE amount > 100)` find?",
            options: [
              "The orders over 100",
              "Customers with no orders over 100",
              "The total of all orders over 100",
              "Customers who have an order over 100"
            ],
            answer: 3,
            explanation: "The subquery lists customers with a big order; the outer query keeps those customers."
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Find Active Users",
          description: "Select the `name` of all `users` who have made at least one post. Use a subquery with `IN` on the `posts` table (which has a `user_id` column).",
          starterCode: "SELECT name\nFROM users\nWHERE id IN (\n  -- write the subquery here\n);",
          solutionCode: "SELECT name\nFROM users\nWHERE id IN (\n  SELECT user_id\n  FROM posts\n);",
          tests: [
            {
              id: "t1",
              label: "Uses IN with a subquery",
              keywords: [{ pattern: "\\bid\\s+IN\\s*\\(\\s*SELECT\\b", flags: "i" }],
              hint: "Put a SELECT inside the parentheses after id IN."
            },
            {
              id: "t2",
              label: "The subquery returns user_id from posts",
              keywords: [{ pattern: "\\bSELECT\\s+(DISTINCT\\s+)?user_id\\s+FROM\\s+posts\\b", flags: "i" }],
              hint: "The subquery is SELECT user_id FROM posts."
            }
          ]
        }
      },
      {
        id: "lesson-4",
        title: "The NOT IN Operator",
        chapterTitle: "Subqueries with IN",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "Conversely, `NOT IN` is used to find rows in the outer query that do *not* have a match in the subquery's result list."
          },
          {
            type: "code",
            lang: "sql",
            label: "NOT IN with Subquery",
            content: "SELECT name FROM customers\nWHERE id NOT IN (SELECT customer_id FROM orders);"
          },
          {
            type: "quiz",
            question: "What does `NOT IN` find?",
            options: [
              "Rows in the outer query with no match in the subquery's list",
              "Rows that match the subquery's list",
              "Rows where the subquery returns NULL",
              "Rows that appear in both tables"
            ],
            answer: 0,
            explanation: "`NOT IN` is the opposite of `IN`."
          },
          {
            type: "quiz",
            question: "Which query finds customers who have never placed an order?",
            options: [
              "`SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders);`",
              "`SELECT name FROM customers WHERE id NOT IN (SELECT customer_id FROM orders);`",
              "`SELECT name FROM customers WHERE id <> (SELECT customer_id FROM orders);`",
              "`SELECT name FROM orders WHERE customer_id NOT IN (SELECT id FROM customers);`"
            ],
            answer: 1,
            explanation: "Keep the customers whose `id` isn't in the list of ordering customers."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Find Inactive Users",
          description: "Using the same tables, write a query to find all `users` who have **never** made a post. Return their `name`.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT name\nFROM users\nWHERE id NOT IN (\n  SELECT user_id\n  FROM posts\n);",
          tests: [
            {
              id: "t1",
              label: "Selects name from users",
              keywords: [{ pattern: "\\bSELECT\\s+name\\s+FROM\\s+users\\b", flags: "i" }],
              hint: "Use SELECT name FROM users."
            },
            {
              id: "t2",
              label: "Uses NOT IN with a subquery",
              keywords: [{ pattern: "\\bid\\s+NOT\\s+IN\\s*\\(\\s*SELECT\\b", flags: "i" }],
              hint: "Use WHERE id NOT IN ( SELECT ... )."
            },
            {
              id: "t3",
              label: "The subquery returns user_id from posts",
              keywords: [{ pattern: "\\bSELECT\\s+(DISTINCT\\s+)?user_id\\s+FROM\\s+posts\\b", flags: "i" }],
              hint: "The subquery is SELECT user_id FROM posts."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Derived Tables",
    icon: "📦",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-5",
        title: "Subqueries in FROM",
        chapterTitle: "Derived Tables",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "You can place a subquery inside the `FROM` clause. When you do this, the result of the subquery acts like a temporary table (called a derived table) that the outer query can select from."
          },
          {
            type: "callout",
            variant: "warning",
            title: "Alias Required",
            content: "In most SQL dialects, a derived table MUST be given an alias."
          },
          {
            type: "code",
            lang: "sql",
            label: "Derived Table",
            content: "SELECT MAX(avg_salary)\nFROM (\n  SELECT department, AVG(salary) AS avg_salary\n  FROM employees\n  GROUP BY department\n) AS dept_averages;"
          },
          {
            type: "quiz",
            question: "What is a subquery in the `FROM` clause called?",
            options: [
              "A correlated subquery",
              "A view",
              "A derived table",
              "A temporary index"
            ],
            answer: 2,
            explanation: "Its result acts like a temporary table that the outer query selects from."
          },
          {
            type: "quiz",
            question: "What must a derived table have in most SQL dialects?",
            options: [
              "A primary key",
              "An `ORDER BY` clause",
              "A `GROUP BY` clause",
              "An alias"
            ],
            answer: 3,
            explanation: "For example: `) AS dept_averages`."
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Highest Average Score",
          description: "Find the highest average score across all classes. First, write a subquery to calculate the average `score` (as `avg_score`) grouped by `class_id` in the `student_scores` table. Then, select the `MAX()` of that `avg_score` from the derived table. Alias the derived table as `class_averages`.",
          starterCode: "SELECT -- select the highest average here\nFROM (\n  -- write the grouped subquery here\n) AS class_averages;",
          solutionCode: "SELECT MAX(avg_score) AS max_avg\nFROM (\n  SELECT class_id, AVG(score) AS avg_score\n  FROM student_scores\n  GROUP BY class_id\n) AS class_averages;",
          tests: [
            {
              id: "t1",
              label: "Selects MAX(avg_score)",
              keywords: [{ pattern: "\\bSELECT\\s+MAX\\s*\\(\\s*(class_averages\\.)?avg_score\\s*\\)", flags: "i" }],
              hint: "Start with SELECT MAX(avg_score)."
            },
            {
              id: "t2",
              label: "The subquery averages score per class as avg_score",
              keywords: [{ pattern: "\\bAVG\\s*\\(\\s*score\\s*\\)\\s+AS\\s+avg_score\\b", flags: "i" }, { pattern: "\\bFROM\\s+student_scores\\b", flags: "i" }, { pattern: "\\bGROUP\\s+BY\\s+class_id\\b", flags: "i" }],
              hint: "Inside FROM ( ), write SELECT class_id, AVG(score) AS avg_score FROM student_scores GROUP BY class_id."
            },
            {
              id: "t3",
              label: "Names the derived table class_averages",
              keywords: [{ pattern: "\\)\\s*(AS\\s+)?class_averages\\b", flags: "i" }],
              hint: "Keep AS class_averages after the closing parenthesis."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Correlated Subqueries",
    icon: "🔄",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "What is Correlation?",
        chapterTitle: "Correlated Subqueries",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "A correlated subquery is a subquery that uses values from the outer query. Because of this dependency, it cannot be executed independently. Instead, it is evaluated once for *each row* processed by the outer query."
          },
          {
            type: "code",
            lang: "sql",
            label: "Correlated Example",
            content: "SELECT e1.name, e1.salary\nFROM employees e1\nWHERE e1.salary > (\n  SELECT AVG(salary)\n  FROM employees e2\n  WHERE e1.department = e2.department\n);"
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Above Department Average",
          description: "Find employees whose `salary` is greater than the average salary of their specific `department`.",
          starterCode: "SELECT name\nFROM employees e1\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM employees e2\n  -- link the departments here\n);",
          solutionCode: "SELECT name\nFROM employees e1\nWHERE salary > (\n  SELECT AVG(salary)\n  FROM employees e2\n  WHERE e2.department = e1.department\n);",
          tests: [
            {
              id: "t1",
              label: "Compares salary to an average from a subquery",
              keywords: [{ pattern: "\\bsalary\\s*>\\s*\\(\\s*SELECT\\s+AVG\\s*\\(\\s*salary\\s*\\)", flags: "i" }],
              hint: "Keep WHERE salary > (SELECT AVG(salary) ...)."
            },
            {
              id: "t2",
              label: "Links the subquery to the same department",
              keywords: [{ pattern: "\\bWHERE\\s+(e2\\.department\\s*=\\s*e1\\.department|e1\\.department\\s*=\\s*e2\\.department)\\b", flags: "i" }],
              hint: "Inside the subquery, add WHERE e2.department = e1.department."
            }
          ]
        }
      },
      {
        id: "lesson-7",
        title: "The EXISTS Operator",
        chapterTitle: "Correlated Subqueries",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "The `EXISTS` operator is used to test for the existence of any record in a subquery. It returns TRUE if the subquery returns one or more records."
          },
          {
            type: "text",
            content: "`EXISTS` is almost always used with a correlated subquery, because you are checking if a related record exists for the current row."
          },
          {
            type: "code",
            lang: "sql",
            label: "EXISTS Syntax",
            content: "SELECT name\nFROM suppliers s\nWHERE EXISTS (\n  SELECT 1 FROM products p \n  WHERE p.supplier_id = s.id AND p.price > 100\n);"
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Find Suppliers",
          description: "Use the `EXISTS` operator to find the `name` of all `suppliers` who supply at least one product with a `price` strictly less than 10. (`products.supplier_id` links to `suppliers.id`.)",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT name\nFROM suppliers s\nWHERE EXISTS (\n  SELECT 1\n  FROM products p\n  WHERE p.supplier_id = s.id\n    AND p.price < 10\n);",
          tests: [
            {
              id: "t1",
              label: "Selects name from suppliers",
              keywords: [{ pattern: "\\bSELECT\\s+(\\w+\\.)?name\\s+FROM\\s+suppliers\\b", flags: "i" }],
              hint: "Use SELECT name FROM suppliers s."
            },
            {
              id: "t2",
              label: "Uses EXISTS with a subquery on products",
              keywords: [{ pattern: "\\bEXISTS\\s*\\(\\s*SELECT\\b[\\s\\S]*\\bFROM\\s+products\\b", flags: "i" }],
              hint: "Use WHERE EXISTS (SELECT 1 FROM products p ...)."
            },
            {
              id: "t3",
              label: "Links each product to its supplier",
              keywords: [{ pattern: "(\\b(\\w+\\.)?supplier_id\\s*=\\s*\\w+\\.id\\b|\\b\\w+\\.id\\s*=\\s*(\\w+\\.)?supplier_id\\b)", flags: "i" }],
              hint: "In the subquery, use p.supplier_id = s.id."
            },
            {
              id: "t4",
              label: "Looks for prices under 10",
              keywords: [{ pattern: "\\bprice\\s*<\\s*10\\b", flags: "i" }],
              hint: "Add AND p.price < 10."
            }
          ]
        }
      }
    ]
  }
];

export const SQLSUBQUERIES_LESSONS = SQLSUBQUERIES_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLSUBQUERIES_TOTAL_XP = SQLSUBQUERIES_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
