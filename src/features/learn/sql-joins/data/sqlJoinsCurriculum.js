export const SQLJOINS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Relational Concepts",
    icon: "🔗",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "Primary and Foreign Keys",
        chapterTitle: "Relational Concepts",
        xp: 15,
        theory: [
          {
            type: "text",
            content: "Before joining tables, you must understand how they relate. A **Primary Key** uniquely identifies each record in a table. A **Foreign Key** is a field (or collection of fields) in one table that refers to the Primary Key in another table.",
          },
          {
            type: "callout",
            variant: "info",
            title: "Relational Example",
            content: "In a `customers` table, `customer_id` is the Primary Key. In an `orders` table, the `customer_id` column is a Foreign Key that links back to the `customers` table."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Identify the Keys",
          description: "Write a simple query to retrieve the primary key `id` and the foreign key `department_id` from the `employees` table for the employee named 'Alice'.",
          starterCode: "SELECT\n  -- select the columns here\nFROM employees\nWHERE name = 'Alice';",
          solutionCode: "SELECT id, department_id\nFROM employees\nWHERE name = 'Alice';",
          tests: [
            {
              id: "t1",
              label: "Selects id and department_id",
              keywords: [{ pattern: "\\bSELECT\\s+(id\\s*,\\s*department_id|department_id\\s*,\\s*id)\\b", flags: "i" }],
              hint: "Use SELECT id, department_id."
            },
            {
              id: "t2",
              label: "Finds the employee named Alice",
              keywords: [{ pattern: "\\bFROM\\s+employees\\b", flags: "i" }, { pattern: "\\bWHERE\\s+name\\s*=\\s*'Alice'", flags: "i" }],
              hint: "Keep FROM employees and WHERE name = 'Alice'."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "Introduction to JOINs",
        chapterTitle: "Relational Concepts",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them."
          },
          {
            type: "text",
            content: "There are different types of JOINs in SQL:\n• `INNER JOIN` (Default): Returns records that have matching values in both tables.\n• `LEFT JOIN`: Returns all records from the left table, and the matched records from the right table.\n• `RIGHT JOIN`: Returns all records from the right table, and the matched records from the left table.\n• `FULL OUTER JOIN`: Returns all records when there is a match in either left or right table."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "The ON Clause",
          description: "When using a JOIN, you must specify the linking condition using the `ON` keyword. Write an `INNER JOIN` that links `orders` and `customers` where `orders.customer_id = customers.id`.",
          starterCode: "SELECT orders.id, customers.name\nFROM orders\nINNER JOIN customers ON -- add the link here\n",
          solutionCode: "SELECT orders.id, customers.name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.id;",
          tests: [
            {
              id: "t1",
              label: "Joins customers with INNER JOIN",
              keywords: [{ pattern: "\\bINNER\\s+JOIN\\s+customers\\b", flags: "i" }],
              hint: "Keep INNER JOIN customers."
            },
            {
              id: "t2",
              label: "Links orders.customer_id to customers.id",
              keywords: [{ pattern: "\\bON\\b", flags: "i" }, { pattern: "(\\borders\\.customer_id\\s*=\\s*customers\\.id\\b|\\bcustomers\\.id\\s*=\\s*orders\\.customer_id\\b)", flags: "i" }],
              hint: "After ON, write orders.customer_id = customers.id."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Inner Joins",
    icon: "🤝",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Basic INNER JOIN",
        chapterTitle: "Inner Joins",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "The `INNER JOIN` keyword selects records that have matching values in both tables. If there is a record in the 'left' table that does not have a match in the 'right' table, that record will NOT be shown."
          },
          {
            type: "code",
            lang: "sql",
            label: "Inner Join Syntax",
            content: "SELECT orders.order_id, customers.customer_name\nFROM orders\nINNER JOIN customers ON orders.customer_id = customers.customer_id;"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Join Movies and Directors",
          description: "Write an `INNER JOIN` query to select `movies.title` and `directors.name`. Join the `movies` and `directors` tables where `movies.director_id = directors.id`.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT movies.title, directors.name\nFROM movies\nINNER JOIN directors ON movies.director_id = directors.id;",
          tests: [
            {
              id: "t1",
              label: "Selects movies.title and directors.name",
              keywords: [{ pattern: "\\bmovies\\.title\\b", flags: "i" }, { pattern: "\\bdirectors\\.name\\b", flags: "i" }],
              hint: "Use SELECT movies.title, directors.name."
            },
            {
              id: "t2",
              label: "Joins movies and directors with INNER JOIN",
              keywords: [{ pattern: "\\bFROM\\s+(movies\\s+INNER\\s+JOIN\\s+directors|directors\\s+INNER\\s+JOIN\\s+movies)\\b", flags: "i" }],
              hint: "Use FROM movies INNER JOIN directors."
            },
            {
              id: "t3",
              label: "Links movies.director_id to directors.id",
              keywords: [{ pattern: "\\bON\\b", flags: "i" }, { pattern: "(\\bmovies\\.director_id\\s*=\\s*directors\\.id\\b|\\bdirectors\\.id\\s*=\\s*movies\\.director_id\\b)", flags: "i" }],
              hint: "Add ON movies.director_id = directors.id."
            }
          ]
        }
      },
      {
        id: "lesson-4",
        title: "Table Aliasing",
        chapterTitle: "Inner Joins",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "When joining tables, typing out the full table name repeatedly can get tedious. You can use Table Aliases (like Column Aliases) to assign a short temporary name to a table."
          },
          {
            type: "code",
            lang: "sql",
            label: "Table Alias Example",
            content: "SELECT o.order_id, c.customer_name\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id;"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Use Table Aliases",
          description: "Rewrite the previous query using `m` as the alias for `movies` and `d` as the alias for `directors`. Return `m.title` and `d.name`.",
          starterCode: "SELECT -- use the aliases here\nFROM movies m\nINNER JOIN directors d ON m.director_id = d.id;",
          solutionCode: "SELECT m.title, d.name\nFROM movies m\nINNER JOIN directors d ON m.director_id = d.id;",
          tests: [
            {
              id: "t1",
              label: "Selects m.title and d.name",
              keywords: [{ pattern: "\\bSELECT\\s+(m\\.title\\s*,\\s*d\\.name|d\\.name\\s*,\\s*m\\.title)\\b", flags: "i" }],
              hint: "Use SELECT m.title, d.name."
            },
            {
              id: "t2",
              label: "Aliases movies as m and directors as d",
              keywords: [{ pattern: "\\bmovies\\s+(AS\\s+)?m\\b", flags: "i" }, { pattern: "\\bdirectors\\s+(AS\\s+)?d\\b", flags: "i" }],
              hint: "Write FROM movies m and INNER JOIN directors d."
            },
            {
              id: "t3",
              label: "Links m.director_id to d.id",
              keywords: [{ pattern: "(\\bm\\.director_id\\s*=\\s*d\\.id\\b|\\bd\\.id\\s*=\\s*m\\.director_id\\b)", flags: "i" }],
              hint: "Use ON m.director_id = d.id."
            }
          ]
        }
      },
      {
        id: "lesson-5",
        title: "Joining Three Tables",
        chapterTitle: "Inner Joins",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "You can chain multiple `JOIN` clauses to join three, four, or even more tables in a single query."
          },
          {
            type: "code",
            lang: "sql",
            label: "Three Table Join",
            content: "SELECT o.order_id, c.customer_name, s.shipper_name\nFROM ((orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id)\nINNER JOIN shippers s ON o.shipper_id = s.shipper_id);"
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Join Three Tables",
          description: "Join `students`, `enrollments`, and `courses`. Return `students.name` and `courses.title`. The `enrollments` table has `student_id` and `course_id`.",
          starterCode: "-- Use aliases s, e, and c\n",
          solutionCode: "SELECT s.name, c.title\nFROM students s\nINNER JOIN enrollments e ON e.student_id = s.id\nINNER JOIN courses c ON c.id = e.course_id;",
          tests: [
            {
              id: "t1",
              label: "Selects s.name and c.title",
              keywords: [{ pattern: "\\bs\\.name\\b", flags: "i" }, { pattern: "\\bc\\.title\\b", flags: "i" }],
              hint: "Use SELECT s.name, c.title."
            },
            {
              id: "t2",
              label: "Joins all three tables with aliases s, e and c",
              keywords: [{ pattern: "\\bstudents\\s+(AS\\s+)?s\\b", flags: "i" }, { pattern: "\\benrollments\\s+(AS\\s+)?e\\b", flags: "i" }, { pattern: "\\bcourses\\s+(AS\\s+)?c\\b", flags: "i" }, { pattern: "\\bINNER\\s+JOIN\\b[\\s\\S]*\\bINNER\\s+JOIN\\b", flags: "i" }],
              hint: "Start FROM students s, then INNER JOIN enrollments e and INNER JOIN courses c."
            },
            {
              id: "t3",
              label: "Links enrollments to students",
              keywords: [{ pattern: "(\\be\\.student_id\\s*=\\s*s\\.id\\b|\\bs\\.id\\s*=\\s*e\\.student_id\\b)", flags: "i" }],
              hint: "Use ON e.student_id = s.id."
            },
            {
              id: "t4",
              label: "Links enrollments to courses",
              keywords: [{ pattern: "(\\be\\.course_id\\s*=\\s*c\\.id\\b|\\bc\\.id\\s*=\\s*e\\.course_id\\b)", flags: "i" }],
              hint: "Use ON c.id = e.course_id."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Outer Joins",
    icon: "🧩",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "LEFT JOIN",
        chapterTitle: "Outer Joins",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `LEFT JOIN` keyword returns all records from the left table (table1), and the matched records from the right table (table2). The result is NULL from the right side, if there is no match."
          },
          {
            type: "code",
            lang: "sql",
            label: "Left Join Syntax",
            content: "SELECT customers.customer_name, orders.order_id\nFROM customers\nLEFT JOIN orders ON customers.customer_id = orders.customer_id;"
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Find Unassigned Projects",
          description: "List ALL `projects` and the `employees` assigned to them (`employees.project_id` links to `projects.id`). Use a `LEFT JOIN` so that projects with no employees still show up (with NULL for employee). Return `projects.name` and `employees.name`.",
          starterCode: "SELECT p.name, e.name\nFROM projects p\n-- add the join here\n",
          solutionCode: "SELECT p.name, e.name\nFROM projects p\nLEFT JOIN employees e ON e.project_id = p.id;",
          tests: [
            {
              id: "t1",
              label: "LEFT JOINs employees onto projects",
              keywords: [{ pattern: "\\bFROM\\s+projects\\s+(AS\\s+)?p\\s+LEFT\\s+(OUTER\\s+)?JOIN\\s+employees\\s+(AS\\s+)?e\\b", flags: "i" }],
              hint: "Add LEFT JOIN employees e after FROM projects p."
            },
            {
              id: "t2",
              label: "Links e.project_id to p.id",
              keywords: [{ pattern: "\\bON\\b", flags: "i" }, { pattern: "(\\be\\.project_id\\s*=\\s*p\\.id\\b|\\bp\\.id\\s*=\\s*e\\.project_id\\b)", flags: "i" }],
              hint: "Use ON e.project_id = p.id."
            }
          ]
        }
      },
      {
        id: "lesson-7",
        title: "RIGHT JOIN",
        chapterTitle: "Outer Joins",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `RIGHT JOIN` keyword returns all records from the right table, and the matched records from the left table. It is the exact mirror image of the LEFT JOIN."
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Right Join the Tables",
          description: "Use a `RIGHT JOIN` to list all `employees` and their assigned `projects` (`employees.project_id` links to `projects.id`). Return `projects.name` and `employees.name`. If an employee has no project, they should still appear.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT projects.name, employees.name\nFROM projects\nRIGHT JOIN employees ON employees.project_id = projects.id;",
          tests: [
            {
              id: "t1",
              label: "Selects the project and employee names",
              keywords: [{ pattern: "\\bSELECT\\s+\\w+\\.name\\s*,\\s*\\w+\\.name\\b", flags: "i" }],
              hint: "Use SELECT projects.name, employees.name."
            },
            {
              id: "t2",
              label: "Starts from projects and RIGHT JOINs employees",
              keywords: [{ pattern: "\\bFROM\\s+projects(\\s+(AS\\s+)?\\w+)?\\s+RIGHT\\s+(OUTER\\s+)?JOIN\\s+employees\\b", flags: "i" }],
              hint: "Use FROM projects RIGHT JOIN employees, so every employee is kept."
            },
            {
              id: "t3",
              label: "Links employees.project_id to projects.id",
              keywords: [{ pattern: "\\bON\\b", flags: "i" }, { pattern: "(\\b\\w+\\.project_id\\s*=\\s*\\w+\\.id\\b|\\b\\w+\\.id\\s*=\\s*\\w+\\.project_id\\b)", flags: "i" }],
              hint: "Use ON employees.project_id = projects.id."
            }
          ]
        }
      },
      {
        id: "lesson-8",
        title: "FULL OUTER JOIN",
        chapterTitle: "Outer Joins",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "The `FULL OUTER JOIN` keyword returns all matching records from both tables whether the other table matches or not."
          },
          {
            type: "callout",
            variant: "warning",
            title: "Performance",
            content: "FULL OUTER JOINs can return very large result-sets and should be used cautiously!"
          }
        ],
        challenge: {
          id: "challenge-8",
          title: "Full Outer Join",
          description: "Write a `FULL OUTER JOIN` to select `customers.name` and `orders.amount` (`orders.customer_id` links to `customers.id`). Return all customers and all orders, regardless of whether they have a match.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT customers.name, orders.amount\nFROM customers\nFULL OUTER JOIN orders ON orders.customer_id = customers.id;",
          tests: [
            {
              id: "t1",
              label: "Selects customers.name and orders.amount",
              keywords: [{ pattern: "\\bSELECT\\s+\\w+\\.name\\s*,\\s*\\w+\\.amount\\b", flags: "i" }],
              hint: "Use SELECT customers.name, orders.amount."
            },
            {
              id: "t2",
              label: "Joins customers and orders with FULL OUTER JOIN",
              keywords: [{ pattern: "\\bFROM\\s+(customers(\\s+(AS\\s+)?\\w+)?\\s+FULL\\s+(OUTER\\s+)?JOIN\\s+orders|orders(\\s+(AS\\s+)?\\w+)?\\s+FULL\\s+(OUTER\\s+)?JOIN\\s+customers)\\b", flags: "i" }],
              hint: "Use FROM customers FULL OUTER JOIN orders."
            },
            {
              id: "t3",
              label: "Links orders.customer_id to customers.id",
              keywords: [{ pattern: "\\bON\\b", flags: "i" }, { pattern: "(\\b\\w+\\.customer_id\\s*=\\s*\\w+\\.id\\b|\\b\\w+\\.id\\s*=\\s*\\w+\\.customer_id\\b)", flags: "i" }],
              hint: "Use ON orders.customer_id = customers.id."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Advanced Joins",
    icon: "🪢",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-9",
        title: "Self JOIN",
        chapterTitle: "Advanced Joins",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "A self JOIN is a regular join, but the table is joined with itself. This is particularly useful for hierarchical data, such as a table of employees where each employee has a manager who is also an employee."
          },
          {
            type: "code",
            lang: "sql",
            label: "Self Join Syntax",
            content: "SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2\nFROM Customers A, Customers B\nWHERE A.CustomerID <> B.CustomerID;"
          }
        ],
        challenge: {
          id: "challenge-9",
          title: "Find Managers",
          description: "Write a Self Join on the `employees` table. The table has `id`, `name`, and `manager_id`. Return the employee's `name` (alias `employee_name`) and their manager's `name` (alias `manager_name`). Use `LEFT JOIN` so the CEO (no manager) is included.",
          starterCode: "SELECT e.name AS employee_name, m.name AS manager_name\nFROM employees e\n-- join the table to itself here\n",
          solutionCode: "SELECT e.name AS employee_name, m.name AS manager_name\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;",
          tests: [
            {
              id: "t1",
              label: "LEFT JOINs employees to itself as m",
              keywords: [{ pattern: "\\bLEFT\\s+(OUTER\\s+)?JOIN\\s+employees\\s+(AS\\s+)?m\\b", flags: "i" }],
              hint: "Add LEFT JOIN employees m."
            },
            {
              id: "t2",
              label: "Links e.manager_id to m.id",
              keywords: [{ pattern: "\\bON\\b", flags: "i" }, { pattern: "(\\be\\.manager_id\\s*=\\s*m\\.id\\b|\\bm\\.id\\s*=\\s*e\\.manager_id\\b)", flags: "i" }],
              hint: "Use ON e.manager_id = m.id."
            }
          ]
        }
      },
      {
        id: "lesson-10",
        title: "CROSS JOIN",
        chapterTitle: "Advanced Joins",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "The `CROSS JOIN` keyword returns all records from both tables (Cartesian product). If you cross join a table of 5 rows with a table of 10 rows, you get 50 rows!"
          },
          {
            type: "callout",
            variant: "warning",
            title: "No ON Clause",
            content: "Unlike other JOINs, CROSS JOIN does not use an ON clause because it matches every row to every row."
          }
        ],
        challenge: {
          id: "challenge-10",
          title: "Cartesian Product",
          description: "Create a list of all possible combinations of `colors` and `sizes`. Return `colors.color` and `sizes.size`.",
          starterCode: "SELECT colors.color, sizes.size\nFROM colors\n-- combine with every size here\n",
          solutionCode: "SELECT colors.color, sizes.size\nFROM colors\nCROSS JOIN sizes;",
          tests: [
            {
              id: "t1",
              label: "CROSS JOINs colors with sizes",
              keywords: [{ pattern: "\\bFROM\\s+colors(\\s+(AS\\s+)?\\w+)?\\s+CROSS\\s+JOIN\\s+sizes\\b", flags: "i" }],
              hint: "Add CROSS JOIN sizes after FROM colors."
            }
          ]
        }
      }
    ]
  }
];

export const SQLJOINS_LESSONS = SQLJOINS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLJOINS_TOTAL_XP = SQLJOINS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
