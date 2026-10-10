export const SQLFUNDAMENTALS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Getting Started with SQL",
    icon: "🗄️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is SQL?",
        chapterTitle: "Getting Started with SQL",
        xp: 10,
        theory: [
          {
            type: "objectives",
            items: [
              "Understand what a relational database is.",
              "Learn what SQL stands for and its primary use.",
              "Understand the structure of a database table (rows and columns)."
            ]
          },
          {
            type: "text",
            content: "Welcome to the world of data! **SQL** (Structured Query Language) is the standard language used to communicate with Relational Database Management Systems (RDBMS). Whether you want to retrieve data, update records, or manage a whole database, SQL is the tool you need."
          },
          {
            type: "scenario",
            title: "Imagine a spreadsheet",
            content: "Think of a database table like an Excel spreadsheet. It has columns (which define the properties, like 'Name' or 'Age') and rows (which hold the actual data for each entry)."
          },
          {
            type: "table",
            title: "Example Table: users",
            columns: ["id", "username", "age", "country"],
            rows: [
              { label: "1", values: ["alice99", "24", "USA"] },
              { label: "2", values: ["bob_builder", "31", "UK"] },
              { label: "3", values: ["charlie_data", "28", "Canada"] }
            ],
            showTotals: false
          },
          {
            type: "callout",
            variant: "info",
            content: "A relational database usually contains multiple tables that are linked (related) to each other."
          },
          {
            type: "quiz",
            question: "What does SQL stand for?",
            options: [
              "Structured Query Language",
              "Simple Query Language",
              "Sequential Question Language",
              "Structured Question Logic"
            ],
            answer: 0,
            explanation: "SQL is the Structured Query Language, used to talk to relational databases."
          },
          {
            type: "quiz",
            question: "In a database table, what do the rows hold?",
            options: [
              "The property names, like 'Name' or 'Age'",
              "The actual data for each entry",
              "The links to other databases",
              "The SQL commands to run"
            ],
            answer: 1,
            explanation: "Columns define the properties; each row holds the data for one entry."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Check Your Understanding",
          description: "This is a concept lesson. Click Run & Submit to proceed!",
          starterCode: "-- Welcome to SQL!",
          solutionCode: "-- Welcome to SQL!",
          tests: [
            {
              id: "t1",
              label: "Concept grasped",
              keywords: ["Welcome"],
              hint: "Just run the code!"
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "Your First Query",
        chapterTitle: "Getting Started with SQL",
        xp: 15,
        theory: [
          {
            type: "objectives",
            items: [
              "Learn the SELECT statement.",
              "Use the asterisk (*) to select all columns.",
              "Retrieve all data from a table."
            ]
          },
          {
            type: "text",
            content: "The most common SQL command is `SELECT`. It is used to fetch data from a database. If you want to retrieve all columns from a table, you can use the asterisk `*` (which means 'everything')."
          },
          {
            type: "code",
            lang: "sql",
            label: "Basic SELECT Syntax",
            content: "SELECT * FROM users;"
          },
          {
            type: "callout",
            variant: "tip",
            content: "SQL keywords are not case-sensitive (select is the same as SELECT), but it's a best practice to write them in UPPERCASE to distinguish them from table and column names."
          },
          {
            type: "text",
            content: "Don't forget the semicolon `;` at the end of your query! It tells the database engine that the statement is complete."
          },
          {
            type: "quiz",
            question: "In `SELECT * FROM users;`, what does `*` mean?",
            options: [
              "Multiply the values",
              "Select only the first row",
              "Select every column",
              "Select only the rows that aren't empty"
            ],
            answer: 2,
            explanation: "The asterisk means 'everything': all columns of the table."
          },
          {
            type: "quiz",
            question: "What does the semicolon `;` at the end of a query do?",
            options: [
              "Comments out the rest of the line",
              "Selects all columns",
              "Makes the query case-sensitive",
              "Tells the database the statement is complete"
            ],
            answer: 3,
            explanation: "The semicolon marks the end of the statement."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Select Everything",
          description: [
            { type: "text", content: "We have a table named `employees`. Write a query to retrieve all columns and all rows from this table." }
          ],
          starterCode: "SELECT \n",
          solutionCode: "SELECT * FROM employees;",
          tests: [
            {
              id: "t1",
              label: "Uses SELECT keyword",
              keywords: ["SELECT"],
              hint: "Start your query with SELECT"
            },
            {
              id: "t2",
              label: "Selects all columns (*)",
              keywords: ["*"],
              hint: "Use the asterisk (*) to select all columns."
            },
            {
              id: "t3",
              label: "Queries the 'employees' table",
              keywords: ["FROM", "employees"],
              hint: "Use FROM employees to specify the table."
            }
          ]
        }
      },
      {
        id: "lesson-3",
        title: "Selecting Specific Columns",
        chapterTitle: "Getting Started with SQL",
        xp: 15,
        theory: [
          {
            type: "objectives",
            items: [
              "Retrieve only specific columns from a table.",
              "Understand how to separate column names with commas."
            ]
          },
          {
            type: "text",
            content: "Often, a table will have many columns, but you only care about a few. Instead of using `*`, you can specify the exact column names you want, separated by commas."
          },
          {
            type: "code",
            lang: "sql",
            label: "Selecting specific columns",
            content: "SELECT first_name, email FROM employees;"
          },
          {
            type: "callout",
            variant: "info",
            content: "Retrieving only the columns you need makes your queries faster and reduces the amount of data transferred across the network."
          },
          {
            type: "quiz",
            question: "How do you separate column names in a `SELECT`?",
            options: [
              "With commas",
              "With semicolons",
              "With the `AND` keyword",
              "With spaces only"
            ],
            answer: 0,
            explanation: "For example: `SELECT first_name, email FROM employees;`"
          },
          {
            type: "quiz",
            question: "Why select only the columns you need?",
            options: [
              "`*` isn't valid SQL",
              "Queries run faster and transfer less data",
              "It sorts the results automatically",
              "It removes duplicate rows"
            ],
            answer: 1,
            explanation: "Fewer columns means less data to read and send over the network."
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Just the Basics",
          description: [
            { type: "text", content: "Write a query to retrieve only the `title` and `release_year` columns from the `movies` table." }
          ],
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT title, release_year FROM movies;",
          tests: [
            {
              id: "t1",
              label: "Selects title and release_year",
              keywords: ["title", "release_year"],
              hint: "Make sure you typed the column names correctly, separated by a comma."
            },
            {
              id: "t2",
              label: "Queries the 'movies' table",
              keywords: ["FROM", "movies"],
              hint: "Use FROM movies."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Filtering Data",
    icon: "🔍",
    color: "#f24111",
    lessons: [
      {
        id: "lesson-4",
        title: "The WHERE Clause",
        chapterTitle: "Filtering Data",
        xp: 20,
        theory: [
          {
            type: "objectives",
            items: [
              "Filter records based on a condition using WHERE.",
              "Understand basic equality filtering."
            ]
          },
          {
            type: "text",
            content: "The `WHERE` clause is used to extract only those records that fulfill a specified condition."
          },
          {
            type: "code",
            lang: "sql",
            label: "Using WHERE",
            content: "SELECT * FROM customers WHERE country = 'Mexico';"
          },
          {
            type: "callout",
            variant: "warning",
            content: "SQL requires single quotes around text values (most database systems will accept double quotes, but single quotes are the standard). Numeric fields should not be enclosed in quotes."
          },
          {
            type: "quiz",
            question: "What does the `WHERE` clause do?",
            options: [
              "Sorts the records",
              "Chooses which columns to return",
              "Returns only the records that meet a condition",
              "Groups records that have the same values"
            ],
            answer: 2,
            explanation: "`WHERE` keeps only the rows where its condition is true."
          },
          {
            type: "quiz",
            question: "Which condition matches customers from Mexico?",
            options: [
              "`country = Mexico`",
              "`country == 'Mexico'`",
              "`'country' = Mexico`",
              "`country = 'Mexico'`"
            ],
            answer: 3,
            explanation: "Text values go in single quotes, and SQL uses a single `=` for equality."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Filter by City",
          description: [
            { type: "text", content: "Retrieve all columns from the `customers` table where the `city` is exactly 'Berlin'." }
          ],
          starterCode: "SELECT * \nFROM customers\n",
          solutionCode: "SELECT * FROM customers WHERE city = 'Berlin';",
          tests: [
            {
              id: "t1",
              label: "Uses WHERE clause",
              keywords: ["WHERE"],
              hint: "You need a WHERE clause to filter the results."
            },
            {
              id: "t2",
              label: "Filters by city",
              keywords: ["city"],
              hint: "Check the city column."
            },
            {
              id: "t3",
              label: "Matches 'Berlin'",
              keywords: ["'Berlin'"],
              hint: "Don't forget the single quotes around 'Berlin'."
            }
          ]
        }
      },
      {
        id: "lesson-5",
        title: "Comparison Operators",
        chapterTitle: "Filtering Data",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "You can use various operators in the `WHERE` clause beyond just `=` (equals). Here are some common ones:"
          },
          {
            type: "table",
            title: "SQL Operators",
            columns: ["Operator", "Description"],
            rows: [
              { label: "=", values: ["Equal"] },
              { label: ">", values: ["Greater than"] },
              { label: "<", values: ["Less than"] },
              { label: ">=", values: ["Greater than or equal"] },
              { label: "<=", values: ["Less than or equal"] },
              { label: "<> or !=", values: ["Not equal"] }
            ],
            showTotals: false
          },
          {
            type: "code",
            lang: "sql",
            label: "Finding expensive products",
            content: "SELECT name, price FROM products WHERE price > 50;"
          },
          {
            type: "quiz",
            question: "Which operator means 'not equal'?",
            options: [
              "`<>`",
              "`=!`",
              "`><`",
              "`=<>`"
            ],
            answer: 0,
            explanation: "`<>` means not equal. Most databases also accept `!=`."
          },
          {
            type: "quiz",
            question: "What does `WHERE price > 50` return?",
            options: [
              "Rows where the price is 50 or more",
              "Rows where the price is greater than 50",
              "Rows where the price is less than 50",
              "The first 50 rows"
            ],
            answer: 1,
            explanation: "`>` is strictly greater than, so a price of exactly 50 isn't included."
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "High Scores",
          description: [
            { type: "text", content: "Retrieve the `username` and `score` from the `leaderboard` table where the `score` is greater than or equal to 9000." }
          ],
          starterCode: "",
          solutionCode: "SELECT username, score FROM leaderboard WHERE score >= 9000;",
          tests: [
            {
              id: "t1",
              label: "Uses correct columns",
              keywords: ["username", "score"],
              hint: "Select username and score."
            },
            {
              id: "t2",
              label: "Uses >= operator",
              keywords: [">="],
              hint: "Use the >= operator for 'greater than or equal to'."
            },
            {
              id: "t3",
              label: "Checks for 9000",
              keywords: ["9000"],
              hint: "Numeric values do not need quotes."
            }
          ]
        }
      },
      {
        id: "lesson-6",
        title: "Logical Operators (AND, OR, NOT)",
        chapterTitle: "Filtering Data",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "The `WHERE` clause can be combined with `AND`, `OR`, and `NOT` operators to filter records based on more than one condition."
          },
          {
            type: "text",
            content: "- The **AND** operator displays a record if *all* the conditions separated by AND are TRUE.\n- The **OR** operator displays a record if *any* of the conditions separated by OR is TRUE.\n- The **NOT** operator displays a record if the condition(s) is NOT TRUE."
          },
          {
            type: "code",
            lang: "sql",
            label: "Using AND & OR",
            content: "SELECT * FROM customers WHERE country = 'Germany' AND (city = 'Berlin' OR city = 'Munich');"
          },
          {
            type: "quiz",
            question: "When does `AND` include a record?",
            options: [
              "When any one of its conditions is true",
              "When none of its conditions are true",
              "When all of its conditions are true",
              "When only the first condition is true"
            ],
            answer: 2,
            explanation: "`AND` needs every condition to be true. `OR` needs just one."
          },
          {
            type: "quiz",
            question: "`WHERE country = 'Germany' AND (city = 'Berlin' OR city = 'Munich')` returns customers who are…",
            options: [
              "In Germany, in Berlin, or in Munich",
              "In both Berlin and Munich at once",
              "In Germany but not in Berlin or Munich",
              "In Germany, and in either Berlin or Munich"
            ],
            answer: 3,
            explanation: "The parentheses group the `OR`, so the city must be Berlin or Munich and the country must be Germany."
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Complex Filtering",
          description: [
            { type: "text", content: "Retrieve all products from the `inventory` table where the `category` is 'Electronics' AND the `price` is less than 100." }
          ],
          starterCode: "",
          solutionCode: "SELECT * FROM inventory WHERE category = 'Electronics' AND price < 100;",
          tests: [
            {
              id: "t1",
              label: "Uses AND operator",
              keywords: ["AND"],
              hint: "Combine the conditions using AND."
            },
            {
              id: "t2",
              label: "Checks category",
              keywords: ["category", "'Electronics'"],
              hint: "Ensure category = 'Electronics'."
            },
            {
              id: "t3",
              label: "Checks price",
              keywords: ["price", "<", "100"],
              hint: "Ensure price < 100."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Shaping the Results",
    icon: "📐",
    color: "#22c55e",
    lessons: [
      {
        id: "lesson-7",
        title: "Sorting Results (ORDER BY)",
        chapterTitle: "Shaping the Results",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `ORDER BY` keyword is used to sort the result-set in ascending or descending order. By default, it sorts records in ascending order. To sort in descending order, use the `DESC` keyword."
          },
          {
            type: "code",
            lang: "sql",
            label: "Sorting alphabetically",
            content: "SELECT * FROM products ORDER BY name ASC;"
          },
          {
            type: "code",
            lang: "sql",
            label: "Sorting by highest price",
            content: "SELECT * FROM products ORDER BY price DESC;"
          },
          {
            type: "quiz",
            question: "What order does `ORDER BY` use by default?",
            options: [
              "Ascending",
              "Descending",
              "The order the rows were inserted",
              "Random"
            ],
            answer: 0,
            explanation: "Without `ASC` or `DESC`, `ORDER BY` sorts in ascending order."
          },
          {
            type: "quiz",
            question: "Which query lists products from the highest price to the lowest?",
            options: [
              "`SELECT * FROM products ORDER BY price ASC;`",
              "`SELECT * FROM products ORDER BY price DESC;`",
              "`SELECT * FROM products ORDER BY price;`",
              "`SELECT * FROM products SORT BY price DESC;`"
            ],
            answer: 1,
            explanation: "`DESC` sorts from highest to lowest. The keyword is `ORDER BY`, not `SORT BY`."
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Top Scores",
          description: [
            { type: "text", content: "Select all columns from the `players` table and sort the results by `score` in **descending** order." }
          ],
          starterCode: "SELECT * FROM players\n",
          solutionCode: "SELECT * FROM players ORDER BY score DESC;",
          tests: [
            {
              id: "t1",
              label: "Uses ORDER BY",
              keywords: ["ORDER", "BY", "score"],
              hint: "Use ORDER BY score"
            },
            {
              id: "t2",
              label: "Uses DESC",
              keywords: ["DESC"],
              hint: "Don't forget the DESC keyword for descending order."
            }
          ]
        }
      },
      {
        id: "lesson-8",
        title: "Limiting Results (LIMIT)",
        chapterTitle: "Shaping the Results",
        xp: 15,
        theory: [
          {
            type: "text",
            content: "The `LIMIT` clause is used to specify the number of records to return. This is highly useful on large tables returning thousands of records, to improve performance."
          },
          {
            type: "callout",
            variant: "info",
            content: "Different SQL dialects use different syntax for limiting. PostgreSQL and MySQL use LIMIT. SQL Server uses SELECT TOP, and Oracle uses FETCH FIRST. We will use standard LIMIT here."
          },
          {
            type: "code",
            lang: "sql",
            label: "Top 3 highest paid employees",
            content: "SELECT * FROM employees ORDER BY salary DESC LIMIT 3;"
          },
          {
            type: "quiz",
            question: "What does `LIMIT 3` do?",
            options: [
              "Skips the first 3 rows",
              "Returns rows whose value is under 3",
              "Returns at most 3 rows",
              "Splits the result into 3 pages"
            ],
            answer: 2,
            explanation: "`LIMIT` sets the maximum number of rows returned."
          },
          {
            type: "quiz",
            question: "Which syntax does SQL Server use instead of `LIMIT`?",
            options: [
              "`SELECT FIRST`",
              "`ROWNUM`",
              "`MAX ROWS`",
              "`SELECT TOP`"
            ],
            answer: 3,
            explanation: "SQL Server uses `SELECT TOP n`. PostgreSQL and MySQL use `LIMIT`, and Oracle uses `FETCH FIRST`."
          }
        ],
        challenge: {
          id: "challenge-8",
          title: "Podium Finish",
          description: [
            { type: "text", content: "Retrieve the `name` and `time` of the top 5 fastest runners from the `race_results` table. (Fastest means lowest time!). Sort by time ascending, and limit to 5." }
          ],
          starterCode: "",
          solutionCode: "SELECT name, time FROM race_results ORDER BY time ASC LIMIT 5;",
          tests: [
            {
              id: "t1",
              label: "Orders by time",
              keywords: ["ORDER", "BY", "time"],
              hint: "Sort by time first."
            },
            {
              id: "t2",
              label: "Limits to 5",
              keywords: ["LIMIT", "5"],
              hint: "Use LIMIT 5 at the end of the query."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Aggregation and Grouping",
    icon: "📊",
    color: "#6366f1",
    lessons: [
      {
        id: "lesson-9",
        title: "Aggregate Functions",
        chapterTitle: "Aggregation and Grouping",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "Aggregate functions perform a calculation on a set of values and return a single value. The most common are:"
          },
          {
            type: "table",
            title: "Common Aggregate Functions",
            columns: ["Function", "Description"],
            rows: [
              { label: "COUNT()", values: ["Returns the number of rows"] },
              { label: "SUM()", values: ["Returns the total sum of a numeric column"] },
              { label: "AVG()", values: ["Returns the average value of a numeric column"] },
              { label: "MIN()", values: ["Returns the smallest value"] },
              { label: "MAX()", values: ["Returns the largest value"] }
            ],
            showTotals: false
          },
          {
            type: "code",
            lang: "sql",
            label: "Counting total customers",
            content: "SELECT COUNT(*) FROM customers;"
          }
        ],
        challenge: {
          id: "challenge-9",
          title: "Total Revenue",
          description: [
            { type: "text", content: "Calculate the total sum of the `amount` column from the `orders` table." }
          ],
          starterCode: "",
          solutionCode: "SELECT SUM(amount) FROM orders;",
          tests: [
            {
              id: "t1",
              label: "Uses SUM()",
              keywords: ["SUM(amount)"],
              hint: "Wrap the column name in the SUM() function."
            }
          ]
        }
      },
      {
        id: "lesson-10",
        title: "Grouping Data (GROUP BY)",
        chapterTitle: "Aggregation and Grouping",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `GROUP BY` statement groups rows that have the same values into summary rows, like 'find the number of customers in each country'."
          },
          {
            type: "text",
            content: "It is often used with aggregate functions (`COUNT`, `MAX`, `MIN`, `SUM`, `AVG`) to group the result-set by one or more columns."
          },
          {
            type: "code",
            lang: "sql",
            label: "Customers per country",
            content: "SELECT country, COUNT(customer_id)\nFROM customers\nGROUP BY country;"
          }
        ],
        challenge: {
          id: "challenge-10",
          title: "Sales by Category",
          description: [
            { type: "text", content: "Select the `category` and the `SUM(sales)` from the `products` table, grouping the results by `category`." }
          ],
          starterCode: "",
          solutionCode: "SELECT category, SUM(sales) FROM products GROUP BY category;",
          tests: [
            {
              id: "t1",
              label: "Selects category and sum",
              keywords: ["category", "SUM(sales)"],
              hint: "Ensure you select both category and SUM(sales)."
            },
            {
              id: "t2",
              label: "Uses GROUP BY",
              keywords: ["GROUP", "BY", "category"],
              hint: "Use GROUP BY category at the end."
            }
          ]
        }
      }
    ]
  }
];

export const SQLFUNDAMENTALS_LESSONS = SQLFUNDAMENTALS_CHAPTERS.flatMap(c => c.lessons);
export const SQLFUNDAMENTALS_TOTAL_XP = SQLFUNDAMENTALS_LESSONS.reduce((acc, l) => acc + l.xp, 0);
