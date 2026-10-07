export const SQLPROJECTS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "E-Commerce Database",
    icon: "🛒",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "Top Selling Products",
        chapterTitle: "E-Commerce Database",
        xp: 50,
        theory: [
          {
            type: "text",
            content: "Welcome to the Capstone Projects! Here you will combine multiple concepts (JOINs, GROUP BY, aggregate functions) to solve real-world problems.",
          },
          {
            type: "text",
            content: "Our first database is an E-Commerce system with `users`, `products`, and `orders`. Each order contains a `product_id`, `user_id`, and `quantity`."
          },
          {
            type: "text",
            content: "To rank products by sales, join `orders` to `products` on `product_id`, group the rows by product, and add up `quantity` with `SUM()`. Then sort the totals with `ORDER BY ... DESC` and keep the top rows with `LIMIT`."
          },
          {
            type: "quiz",
            question: "In this e-commerce database, which columns does each order have?",
            options: [
              "`product_id`, `user_id` and `quantity`",
              "`product_id` and `price` only",
              "`user_id` and `total_spent`",
              "`name`, `price` and `quantity`"
            ],
            answer: 0,
            explanation: "Each order records which product, which user, and how many."
          },
          {
            type: "quiz",
            question: "Which steps find the best-selling products?",
            options: [
              "Count the rows in products and sort ascending",
              "Join orders to products, group by product, `SUM` the quantity, sort descending",
              "Take the first rows of orders without grouping",
              "Group orders by user and average the quantity"
            ],
            answer: 1,
            explanation: "Totals per product, sorted from highest to lowest, give the best sellers."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Find the Best Sellers",
          description: "Write a query to find the top 2 best-selling `products`. Join `products` and `orders` (`orders.product_id` links to `products.id`), group by `products.name`, sum the `quantity` as `total_sold`, order by `total_sold` descending, and limit to 2.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT products.name, SUM(orders.quantity) AS total_sold\nFROM products\nINNER JOIN orders ON orders.product_id = products.id\nGROUP BY products.name\nORDER BY total_sold DESC\nLIMIT 2;",
          tests: [
            {
              id: "t1",
              label: "Joins products and orders",
              keywords: [{ pattern: "\\bJOIN\\b", flags: "i" }, { pattern: "(\\b\\w+\\.product_id\\s*=\\s*\\w+\\.id\\b|\\b\\w+\\.id\\s*=\\s*\\w+\\.product_id\\b)", flags: "i" }],
              hint: "Use INNER JOIN orders ON orders.product_id = products.id."
            },
            {
              id: "t2",
              label: "Sums quantity as total_sold",
              keywords: [{ pattern: "\\bSUM\\s*\\(\\s*(\\w+\\.)?quantity\\s*\\)\\s+AS\\s+total_sold\\b", flags: "i" }],
              hint: "Use SUM(orders.quantity) AS total_sold."
            },
            {
              id: "t3",
              label: "Groups by product name",
              keywords: [{ pattern: "\\bGROUP\\s+BY\\s+(\\w+\\.)?name\\b", flags: "i" }],
              hint: "Add GROUP BY products.name."
            },
            {
              id: "t4",
              label: "Sorts by total_sold, highest first",
              keywords: [{ pattern: "\\bORDER\\s+BY\\s+(total_sold|SUM\\s*\\(\\s*(\\w+\\.)?quantity\\s*\\))\\s+DESC\\b", flags: "i" }],
              hint: "Add ORDER BY total_sold DESC."
            },
            {
              id: "t5",
              label: "Returns only the top 2",
              keywords: [{ pattern: "\\bLIMIT\\s+2\\b", flags: "i" }],
              hint: "End with LIMIT 2."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "Whales (Big Spenders)",
        chapterTitle: "E-Commerce Database",
        xp: 50,
        theory: [
          {
            type: "text",
            content: "A common business request is to find your most valuable customers, often called 'whales'."
          },
          {
            type: "text",
            content: "To find them, join `users` to `orders` and `orders` to `products`, then work out how much each user spent: `SUM(products.price * orders.quantity)`. Group by user, and keep only the big spenders with `HAVING`, because the filter is on a total."
          },
          {
            type: "quiz",
            question: "How do you calculate how much a user spent?",
            options: [
              "`SUM(orders.quantity)`",
              "`COUNT(products.price)`",
              "`SUM(products.price * orders.quantity)`",
              "`MAX(products.price * orders.quantity)`"
            ],
            answer: 2,
            explanation: "Each order costs price × quantity; `SUM` adds those up per user."
          },
          {
            type: "quiz",
            question: "Why filter the big spenders with `HAVING` instead of `WHERE`?",
            options: [
              "`WHERE` can't compare numbers",
              "`HAVING` runs before the join",
              "`WHERE` only works on one table",
              "The filter is on a total, which only exists after grouping"
            ],
            answer: 3,
            explanation: "`WHERE` runs before grouping, so it can't see `SUM()` totals."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Find the Whales",
          description: "Find the `users.name` and their total amount spent (sum of `products.price * orders.quantity` as `total_spent`). Only show users who spent more than $500 (using `HAVING`). `orders` has `user_id` and `product_id` columns that link to `users.id` and `products.id`.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT users.name, SUM(products.price * orders.quantity) AS total_spent\nFROM users\nINNER JOIN orders ON orders.user_id = users.id\nINNER JOIN products ON products.id = orders.product_id\nGROUP BY users.name\nHAVING SUM(products.price * orders.quantity) > 500;",
          tests: [
            {
              id: "t1",
              label: "Joins users, orders and products",
              keywords: [{ pattern: "(\\b\\w+\\.user_id\\s*=\\s*\\w+\\.id\\b|\\b\\w+\\.id\\s*=\\s*\\w+\\.user_id\\b)", flags: "i" }, { pattern: "(\\b\\w+\\.product_id\\s*=\\s*\\w+\\.id\\b|\\b\\w+\\.id\\s*=\\s*\\w+\\.product_id\\b)", flags: "i" }],
              hint: "Join orders ON orders.user_id = users.id, and products ON products.id = orders.product_id."
            },
            {
              id: "t2",
              label: "Totals price * quantity as total_spent",
              keywords: [{ pattern: "\\bSUM\\s*\\(\\s*((\\w+\\.)?price\\s*\\*\\s*(\\w+\\.)?quantity|(\\w+\\.)?quantity\\s*\\*\\s*(\\w+\\.)?price)\\s*\\)\\s+AS\\s+total_spent\\b", flags: "i" }],
              hint: "Use SUM(products.price * orders.quantity) AS total_spent."
            },
            {
              id: "t3",
              label: "Groups by user",
              keywords: [{ pattern: "\\bGROUP\\s+BY\\s+(\\w+\\.)?(name|id)\\b", flags: "i" }],
              hint: "Add GROUP BY users.name."
            },
            {
              id: "t4",
              label: "Keeps only users who spent more than 500",
              keywords: [{ pattern: "\\bHAVING\\s+SUM\\s*\\([^)]*\\)\\s*>\\s*500\\b", flags: "i" }],
              hint: "Add HAVING SUM(products.price * orders.quantity) > 500."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "HR System Database",
    icon: "👔",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Department Salary Costs",
        chapterTitle: "HR System Database",
        xp: 50,
        theory: [
          {
            type: "text",
            content: "In our HR database, we have `departments` and `employees`. You often need to analyze payroll."
          },
          {
            type: "text",
            content: "To list every department with its average salary, start from `departments` and `LEFT JOIN` `employees` on `department_id`. The `LEFT JOIN` keeps departments that have no employees. Their `AVG(salary)` is `NULL`, because there are no salaries to average."
          },
          {
            type: "quiz",
            question: "Why `LEFT JOIN` from departments to employees?",
            options: [
              "So departments with no employees still appear",
              "So employees without a department still appear",
              "Because `INNER JOIN` can't be used with `AVG`",
              "To make the query run faster"
            ],
            answer: 0,
            explanation: "An `INNER JOIN` would drop departments that have no matching employees."
          },
          {
            type: "quiz",
            question: "What is `AVG(salary)` for a department with no employees?",
            options: [
              "`0`",
              "`NULL`",
              "The company-wide average",
              "The query fails with an error"
            ],
            answer: 1,
            explanation: "There are no salaries to average, so the result is `NULL`."
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Analyze Payroll",
          description: "List every `departments.name` and the average `salary` of its employees (as `avg_salary`). Use a `LEFT JOIN` from departments to employees (`employees.department_id` links to `departments.id`) so that departments with 0 employees still show up (average will be NULL).",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT departments.name, AVG(employees.salary) AS avg_salary\nFROM departments\nLEFT JOIN employees ON employees.department_id = departments.id\nGROUP BY departments.name;",
          tests: [
            {
              id: "t1",
              label: "LEFT JOINs from departments to employees",
              keywords: [{ pattern: "\\bFROM\\s+departments(\\s+(AS\\s+)?\\w+)?\\s+LEFT\\s+(OUTER\\s+)?JOIN\\s+employees\\b", flags: "i" }],
              hint: "Use FROM departments LEFT JOIN employees."
            },
            {
              id: "t2",
              label: "Links employees.department_id to departments.id",
              keywords: [{ pattern: "\\bON\\b", flags: "i" }, { pattern: "(\\b\\w+\\.department_id\\s*=\\s*\\w+\\.id\\b|\\b\\w+\\.id\\s*=\\s*\\w+\\.department_id\\b)", flags: "i" }],
              hint: "Use ON employees.department_id = departments.id."
            },
            {
              id: "t3",
              label: "Averages salary as avg_salary",
              keywords: [{ pattern: "\\bAVG\\s*\\(\\s*(\\w+\\.)?salary\\s*\\)\\s+AS\\s+avg_salary\\b", flags: "i" }],
              hint: "Use AVG(employees.salary) AS avg_salary."
            },
            {
              id: "t4",
              label: "Groups by department",
              keywords: [{ pattern: "\\bGROUP\\s+BY\\s+(\\w+\\.)?(name|id)\\b", flags: "i" }],
              hint: "Add GROUP BY departments.name."
            }
          ]
        }
      },
      {
        id: "lesson-4",
        title: "The Ultimate Challenge",
        chapterTitle: "HR System Database",
        xp: 100,
        theory: [
          {
            type: "text",
            content: "This is it. The final challenge to prove your SQL mastery."
          },
          {
            type: "text",
            content: "A manager is an employee whose `id` appears in other employees' `manager_id` column. To find managers who manage at least one high earner, use `EXISTS` with a correlated subquery: for each manager `m`, look for an employee `e` where `e.manager_id = m.id` and the salary is above the limit."
          },
          {
            type: "quiz",
            question: "Which employees are managers in this database?",
            options: [
              "Employees whose `manager_id` is NULL",
              "The employees with the highest salaries",
              "Employees whose `id` appears in another employee's `manager_id`",
              "Employees listed in a separate managers table"
            ],
            answer: 2,
            explanation: "Managers are found through the `manager_id` links between employees."
          },
          {
            type: "quiz",
            question: "In the `EXISTS` subquery, which condition links each employee `e` to the manager `m`?",
            options: [
              "`e.id = m.manager_id`",
              "`e.id = m.id`",
              "`e.manager_id = m.manager_id`",
              "`e.manager_id = m.id`"
            ],
            answer: 3,
            explanation: "An employee reports to `m` when their `manager_id` equals `m.id`."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Managers with High Earners",
          description: "Find the `name` of all managers (an employee whose `id` appears in the `manager_id` column of other employees) who manage at least one employee earning more than $100,000. Use `EXISTS` and a correlated subquery.",
          starterCode: "SELECT m.name\nFROM employees m\nWHERE EXISTS (\n  -- write the correlated subquery here\n);",
          solutionCode: "SELECT m.name\nFROM employees m\nWHERE EXISTS (\n  SELECT 1\n  FROM employees e\n  WHERE e.manager_id = m.id\n    AND e.salary > 100000\n);",
          tests: [
            {
              id: "t1",
              label: "Uses EXISTS with a subquery",
              keywords: [{ pattern: "\\bEXISTS\\s*\\(\\s*SELECT\\b", flags: "i" }, { pattern: "\\bEXISTS\\s*\\(\\s*SELECT\\b[\\s\\S]*\\bFROM\\s+employees\\b", flags: "i" }],
              hint: "Inside EXISTS ( ), write SELECT 1 FROM employees e."
            },
            {
              id: "t2",
              label: "Links each employee to the manager m",
              keywords: [{ pattern: "(\\b\\w+\\.manager_id\\s*=\\s*m\\.id\\b|\\bm\\.id\\s*=\\s*\\w+\\.manager_id\\b)", flags: "i" }],
              hint: "In the subquery, use WHERE e.manager_id = m.id."
            },
            {
              id: "t3",
              label: "Looks for salaries over 100000",
              keywords: [{ pattern: "\\bsalary\\s*>\\s*100000\\b", flags: "i" }],
              hint: "Add AND e.salary > 100000."
            }
          ]
        }
      }
    ]
  }
];

export const SQLPROJECTS_LESSONS = SQLPROJECTS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLPROJECTS_TOTAL_XP = SQLPROJECTS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
