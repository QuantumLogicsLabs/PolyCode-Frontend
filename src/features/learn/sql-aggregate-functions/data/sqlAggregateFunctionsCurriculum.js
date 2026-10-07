export const SQLAGGREGATEFUNCTIONS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Basic Math Functions",
    icon: "🧮",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "The COUNT Function",
        chapterTitle: "Basic Math Functions",
        xp: 15,
        theory: [
          {
            type: "text",
            content: "Aggregate functions perform a calculation on a set of values and return a single value. The `COUNT()` function returns the number of rows that matches a specified criterion.",
          },
          {
            type: "code",
            lang: "sql",
            label: "Count Example",
            content: "SELECT COUNT(product_id)\nFROM products;"
          },
          {
            type: "callout",
            variant: "info",
            title: "COUNT(*)",
            content: "Using `COUNT(*)` returns the total number of rows in the table, including rows with NULL values."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Count the Users",
          description: "Write a query to count the total number of records in the `users` table. Alias the result as `total_users`.",
          starterCode: "SELECT COUNT(*) AS -- add the alias here\nFROM users;",
          solutionCode: "SELECT COUNT(*) AS total_users\nFROM users;",
          tests: [
            {
              id: "t1",
              label: "Counts every row with COUNT(*)",
              keywords: [{ pattern: "\\bCOUNT\\s*\\(\\s*\\*\\s*\\)", flags: "i" }],
              hint: "Use COUNT(*) to count all rows."
            },
            {
              id: "t2",
              label: "Names the result total_users",
              keywords: [{ pattern: "\\bAS\\s+total_users\\b", flags: "i" }],
              hint: "Add AS total_users after COUNT(*)."
            },
            {
              id: "t3",
              label: "Queries the users table",
              keywords: [{ pattern: "\\bFROM\\s+users\\b", flags: "i" }],
              hint: "Use FROM users."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "The SUM Function",
        chapterTitle: "Basic Math Functions",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `SUM()` function calculates the total sum of a numeric column."
          },
          {
            type: "code",
            lang: "sql",
            label: "Sum Example",
            content: "SELECT SUM(quantity)\nFROM order_details;"
          },
          {
            type: "quiz",
            question: "What does `SUM()` return?",
            options: [
              "The total of all values in a numeric column",
              "The number of rows in the table",
              "The average value of a numeric column",
              "The largest value in the column"
            ],
            answer: 0,
            explanation: "`SUM()` adds up every value in a numeric column and returns the total."
          },
          {
            type: "quiz",
            question: "Which query adds up every `quantity` in `order_details`?",
            options: [
              "`SELECT COUNT(quantity) FROM order_details;`",
              "`SELECT SUM(quantity) FROM order_details;`",
              "`SELECT MAX(quantity) FROM order_details;`",
              "`SELECT quantity FROM order_details;`"
            ],
            answer: 1,
            explanation: "`SUM(quantity)` totals the column. `COUNT` counts rows and `MAX` returns the largest value."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Calculate Total Revenue",
          description: "Find the total sum of the `amount` column in the `sales` table. Alias it as `total_revenue`.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT SUM(amount) AS total_revenue\nFROM sales;",
          tests: [
            {
              id: "t1",
              label: "Adds up the amount column",
              keywords: [{ pattern: "\\bSUM\\s*\\(\\s*amount\\s*\\)", flags: "i" }],
              hint: "Use SUM(amount)."
            },
            {
              id: "t2",
              label: "Names the result total_revenue",
              keywords: [{ pattern: "\\bAS\\s+total_revenue\\b", flags: "i" }],
              hint: "Add AS total_revenue after SUM(amount)."
            },
            {
              id: "t3",
              label: "Queries the sales table",
              keywords: [{ pattern: "\\bFROM\\s+sales\\b", flags: "i" }],
              hint: "Use FROM sales."
            }
          ]
        }
      },
      {
        id: "lesson-3",
        title: "The AVG Function",
        chapterTitle: "Basic Math Functions",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `AVG()` function returns the average value of a numeric column. Note that NULL values are ignored by the AVG function."
          },
          {
            type: "code",
            lang: "sql",
            label: "Average Example",
            content: "SELECT AVG(price)\nFROM products;"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Find the Average Rating",
          description: "Calculate the average `rating` of all movies in the `movies` table. Alias the result as `avg_rating`.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT AVG(rating) AS avg_rating\nFROM movies;",
          tests: [
            {
              id: "t1",
              label: "Averages the rating column",
              keywords: [{ pattern: "\\bAVG\\s*\\(\\s*rating\\s*\\)", flags: "i" }],
              hint: "Use AVG(rating)."
            },
            {
              id: "t2",
              label: "Names the result avg_rating",
              keywords: [{ pattern: "\\bAS\\s+avg_rating\\b", flags: "i" }],
              hint: "Add AS avg_rating after AVG(rating)."
            },
            {
              id: "t3",
              label: "Queries the movies table",
              keywords: [{ pattern: "\\bFROM\\s+movies\\b", flags: "i" }],
              hint: "Use FROM movies."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Min, Max, and Round",
    icon: "📈",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-4",
        title: "MIN and MAX",
        chapterTitle: "Min, Max, and Round",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `MIN()` function returns the smallest value of the selected column. The `MAX()` function returns the largest value."
          },
          {
            type: "text",
            content: "These functions can be used on numeric, text, and date columns. For text, MIN returns the first value alphabetically."
          },
          {
            type: "code",
            lang: "sql",
            label: "Min and Max Example",
            content: "SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive\nFROM products;"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Find Salary Extremes",
          description: "Write a query to find the minimum `salary` (as `lowest_salary`) and maximum `salary` (as `highest_salary`) in the `employees` table.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT MIN(salary) AS lowest_salary, MAX(salary) AS highest_salary\nFROM employees;",
          tests: [
            {
              id: "t1",
              label: "Finds the lowest salary as lowest_salary",
              keywords: [{ pattern: "\\bMIN\\s*\\(\\s*salary\\s*\\)\\s+AS\\s+lowest_salary\\b", flags: "i" }],
              hint: "Use MIN(salary) AS lowest_salary."
            },
            {
              id: "t2",
              label: "Finds the highest salary as highest_salary",
              keywords: [{ pattern: "\\bMAX\\s*\\(\\s*salary\\s*\\)\\s+AS\\s+highest_salary\\b", flags: "i" }],
              hint: "Use MAX(salary) AS highest_salary."
            },
            {
              id: "t3",
              label: "Queries the employees table",
              keywords: [{ pattern: "\\bFROM\\s+employees\\b", flags: "i" }],
              hint: "Use FROM employees."
            }
          ]
        }
      },
      {
        id: "lesson-5",
        title: "The ROUND Function",
        chapterTitle: "Min, Max, and Round",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "When using functions like `AVG()`, you often get long decimal values. The `ROUND()` function is used to round a numeric field to the number of decimals specified."
          },
          {
            type: "code",
            lang: "sql",
            label: "Round Example",
            content: "SELECT ROUND(AVG(price), 2)\nFROM products;"
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Round the Average",
          description: "Calculate the average `score` from the `exams` table, and round the result to 1 decimal place. Alias it as `rounded_avg`.",
          starterCode: "SELECT -- combine the two functions here\nFROM exams;",
          solutionCode: "SELECT ROUND(AVG(score), 1) AS rounded_avg\nFROM exams;",
          tests: [
            {
              id: "t1",
              label: "Averages the score column",
              keywords: [{ pattern: "\\bAVG\\s*\\(\\s*score\\s*\\)", flags: "i" }],
              hint: "Use AVG(score)."
            },
            {
              id: "t2",
              label: "Rounds the average to 1 decimal place",
              keywords: [{ pattern: "\\bROUND\\s*\\(\\s*AVG\\s*\\(\\s*score\\s*\\)\\s*,\\s*1\\s*\\)", flags: "i" }],
              hint: "Wrap the average: ROUND(AVG(score), 1)."
            },
            {
              id: "t3",
              label: "Names the result rounded_avg",
              keywords: [{ pattern: "\\bAS\\s+rounded_avg\\b", flags: "i" }],
              hint: "Add AS rounded_avg."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Grouping Data",
    icon: "🗂️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "The GROUP BY Clause",
        chapterTitle: "Grouping Data",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `GROUP BY` statement groups rows that have the same values into summary rows. It is often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG) to group the result-set by one or more columns."
          },
          {
            type: "code",
            lang: "sql",
            label: "Group By Syntax",
            content: "SELECT country, COUNT(customer_id)\nFROM customers\nGROUP BY country;"
          },
          {
            type: "callout",
            variant: "warning",
            title: "Rule of Thumb",
            content: "Any column in your SELECT clause that is NOT inside an aggregate function MUST be included in the GROUP BY clause."
          },
          {
            type: "quiz",
            question: "What does `GROUP BY` do?",
            options: [
              "Sorts the rows in ascending order",
              "Removes duplicate rows from the result",
              "Groups rows that have the same values into summary rows",
              "Filters out rows that don't match a condition"
            ],
            answer: 2,
            explanation: "`GROUP BY` collapses rows with the same values into one summary row, usually with an aggregate function."
          },
          {
            type: "quiz",
            question: "A query selects `country, COUNT(customer_id)` from `customers`. Which clause does it need?",
            options: [
              "`GROUP BY customer_id`",
              "`ORDER BY country`",
              "`WHERE COUNT(customer_id) > 0`",
              "`GROUP BY country`"
            ],
            answer: 3,
            explanation: "Every selected column that isn't inside an aggregate function must be in the `GROUP BY` clause, so `country` must be grouped."
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Count Employees by Department",
          description: "Count the number of employees in each `department`. Return `department` and the count (as `employee_count`).",
          starterCode: "SELECT department, -- add the count here\nFROM employees\n-- group the rows here\n",
          solutionCode: "SELECT department, COUNT(id) AS employee_count\nFROM employees\nGROUP BY department;",
          tests: [
            {
              id: "t1",
              label: "Counts the employees as employee_count",
              keywords: [{ pattern: "\\bCOUNT\\s*\\(\\s*(\\*|id)\\s*\\)\\s+AS\\s+employee_count\\b", flags: "i" }],
              hint: "Use COUNT(id) AS employee_count."
            },
            {
              id: "t2",
              label: "Groups the rows by department",
              keywords: [{ pattern: "\\bGROUP\\s+BY\\s+department\\b", flags: "i" }],
              hint: "Add GROUP BY department at the end."
            }
          ]
        }
      },
      {
        id: "lesson-7",
        title: "Grouping by Multiple Columns",
        chapterTitle: "Grouping Data",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "You can group by multiple columns to create more granular summaries. For example, grouping by `country` and then by `city`."
          },
          {
            type: "code",
            lang: "sql",
            label: "Multiple Group By",
            content: "SELECT country, city, COUNT(id)\nFROM customers\nGROUP BY country, city;"
          },
          {
            type: "quiz",
            question: "How do you group by both `country` and `city`?",
            options: [
              "`GROUP BY country, city`",
              "`GROUP BY country AND city`",
              "`GROUP BY country GROUP BY city`",
              "`GROUP BY country; city`"
            ],
            answer: 0,
            explanation: "List the columns in one `GROUP BY`, separated by commas."
          },
          {
            type: "quiz",
            question: "Why group by more than one column?",
            options: [
              "To sort the results by both columns",
              "To get more granular summaries, e.g. one row per country and city",
              "To avoid needing an aggregate function",
              "To join two tables together"
            ],
            answer: 1,
            explanation: "Each extra column splits the groups further, giving a more detailed summary."
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Granular Grouping",
          description: "Group the `sales` table by both `year` and `region`. Return `year`, `region`, and the sum of `amount` (as `total_sales`).",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT year, region, SUM(amount) AS total_sales\nFROM sales\nGROUP BY year, region;",
          tests: [
            {
              id: "t1",
              label: "Returns year and region",
              keywords: [{ pattern: "\\bSELECT\\s+(year\\s*,\\s*region|region\\s*,\\s*year)\\b", flags: "i" }],
              hint: "Start with SELECT year, region."
            },
            {
              id: "t2",
              label: "Sums amount as total_sales",
              keywords: [{ pattern: "\\bSUM\\s*\\(\\s*amount\\s*\\)\\s+AS\\s+total_sales\\b", flags: "i" }],
              hint: "Use SUM(amount) AS total_sales."
            },
            {
              id: "t3",
              label: "Groups by both year and region",
              keywords: [{ pattern: "\\bGROUP\\s+BY\\s+(year\\s*,\\s*region|region\\s*,\\s*year)\\b", flags: "i" }],
              hint: "List both columns: GROUP BY year, region."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Filtering Groups",
    icon: "🚰",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-8",
        title: "The HAVING Clause",
        chapterTitle: "Filtering Groups",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "The `HAVING` clause was added to SQL because the `WHERE` keyword cannot be used with aggregate functions."
          },
          {
            type: "code",
            lang: "sql",
            label: "Having Example",
            content: "SELECT country, COUNT(customer_id)\nFROM customers\nGROUP BY country\nHAVING COUNT(customer_id) > 5;"
          },
          {
            type: "callout",
            variant: "info",
            title: "WHERE vs HAVING",
            content: "`WHERE` filters individual rows BEFORE they are grouped. `HAVING` filters the summary groups AFTER they are grouped."
          },
          {
            type: "quiz",
            question: "Why was `HAVING` added to SQL?",
            options: [
              "Because `WHERE` can't filter text values",
              "To sort the groups after they are created",
              "Because `WHERE` can't be used with aggregate functions",
              "To replace `GROUP BY` in simple queries"
            ],
            answer: 2,
            explanation: "`WHERE` can't contain aggregates like `COUNT()`, so `HAVING` was added to filter on them."
          },
          {
            type: "quiz",
            question: "When does `HAVING` filter?",
            options: [
              "Before the rows are grouped, on individual rows",
              "Before the table is read",
              "Only when the query has no `GROUP BY`",
              "After the rows are grouped, on the summary groups"
            ],
            answer: 3,
            explanation: "`WHERE` filters rows before grouping. `HAVING` filters the groups after grouping."
          }
        ],
        challenge: {
          id: "challenge-8",
          title: "Filter the Groups",
          description: "Group `employees` by `department` and count them. Only return departments `HAVING` more than 1 employee.",
          starterCode: "SELECT department, COUNT(id) AS emp_count\nFROM employees\nGROUP BY department\n-- filter the groups here\n",
          solutionCode: "SELECT department, COUNT(id) AS emp_count\nFROM employees\nGROUP BY department\nHAVING COUNT(id) > 1;",
          tests: [
            {
              id: "t1",
              label: "Groups the rows by department",
              keywords: [{ pattern: "\\bGROUP\\s+BY\\s+department\\b", flags: "i" }],
              hint: "Keep GROUP BY department."
            },
            {
              id: "t2",
              label: "Keeps only departments with more than 1 employee",
              keywords: [{ pattern: "\\bHAVING\\s+COUNT\\s*\\(\\s*(\\*|id)\\s*\\)\\s*(>\\s*1|>=\\s*2)\\b", flags: "i" }],
              hint: "Add HAVING COUNT(id) > 1 after GROUP BY."
            }
          ]
        }
      },
      {
        id: "lesson-9",
        title: "Combining WHERE and HAVING",
        chapterTitle: "Filtering Groups",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "You can use both `WHERE` and `HAVING` in the same query. The `WHERE` clause filters rows before grouping, and the `HAVING` clause filters the resulting groups."
          },
          {
            type: "code",
            lang: "sql",
            label: "Complex Example",
            content: "SELECT department, SUM(salary)\nFROM employees\nWHERE status = 'Active'\nGROUP BY department\nHAVING SUM(salary) > 100000;"
          }
        ],
        challenge: {
          id: "challenge-9",
          title: "Filter Rows, Then Groups",
          description: "Calculate the total `sales_amount` by `salesperson` for all sales made in '2023' (using `WHERE year = 2023`). Only show salespeople whose total sales exceed 500 (using `HAVING`).",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT salesperson, SUM(sales_amount) AS total_sales\nFROM sales\nWHERE year = 2023\nGROUP BY salesperson\nHAVING SUM(sales_amount) > 500;",
          tests: [
            {
              id: "t1",
              label: "Keeps only sales from 2023 with WHERE",
              keywords: [{ pattern: "\\bWHERE\\s+year\\s*=\\s*'?2023\\b", flags: "i" }],
              hint: "Use WHERE year = 2023."
            },
            {
              id: "t2",
              label: "Totals sales_amount for each salesperson",
              keywords: [{ pattern: "\\bSUM\\s*\\(\\s*sales_amount\\s*\\)", flags: "i" }, { pattern: "\\bGROUP\\s+BY\\s+salesperson\\b", flags: "i" }],
              hint: "Use SUM(sales_amount) and GROUP BY salesperson."
            },
            {
              id: "t3",
              label: "Keeps only totals over 500 with HAVING",
              keywords: [{ pattern: "\\bHAVING\\s+SUM\\s*\\(\\s*sales_amount\\s*\\)\\s*>\\s*500\\b", flags: "i" }],
              hint: "Add HAVING SUM(sales_amount) > 500."
            },
            {
              id: "t4",
              label: "Filters rows before grouping them",
              keywords: [{ pattern: "\\bWHERE\\b[\\s\\S]*\\bGROUP\\s+BY\\b[\\s\\S]*\\bHAVING\\b", flags: "i" }],
              hint: "The order is WHERE, then GROUP BY, then HAVING."
            }
          ]
        }
      }
    ]
  }
];

export const SQLAGGREGATEFUNCTIONS_LESSONS = SQLAGGREGATEFUNCTIONS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLAGGREGATEFUNCTIONS_TOTAL_XP = SQLAGGREGATEFUNCTIONS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
