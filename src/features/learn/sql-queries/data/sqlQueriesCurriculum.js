export const SQLQUERIES_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Data Retrieval Basics",
    icon: "🔍",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "The SELECT Statement",
        chapterTitle: "Data Retrieval Basics",
        xp: 15,
        theory: [
          {
            type: "text",
            content: "The `SELECT` statement is the foundation of SQL. It is used to fetch data from a database table. The data returned is stored in a result table, called the result-set.",
          },
          {
            type: "code",
            lang: "sql",
            label: "Select Specific Columns",
            content: "SELECT first_name, last_name\nFROM users;"
          },
          {
            type: "callout",
            variant: "warning",
            title: "Avoid SELECT *",
            content: "You can select all columns using the asterisk `*` character (e.g., `SELECT * FROM users;`). However, it is generally considered a bad practice in production systems because it retrieves unnecessary data, consuming extra memory and network bandwidth."
          },
          {
            type: "quiz",
            question: "What is the table of data returned by a `SELECT` called?",
            options: [
              "The result-set",
              "The schema",
              "The index",
              "The view"
            ],
            answer: 0,
            explanation: "`SELECT` returns its rows in a result table called the result-set."
          },
          {
            type: "quiz",
            question: "Why is `SELECT *` considered bad practice in production?",
            options: [
              "It isn't valid SQL",
              "It fetches columns you don't need, wasting memory and bandwidth",
              "It only returns the first row",
              "It changes the data in the table"
            ],
            answer: 1,
            explanation: "`SELECT *` is valid, but it retrieves unnecessary data."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Select Specific Columns",
          description: "Write a query to retrieve only the `title` and `release_year` columns from the `movies` table.",
          starterCode: "SELECT\n  -- add the columns here\nFROM movies;",
          solutionCode: "SELECT title, release_year\nFROM movies;",
          tests: [
            {
              id: "t1",
              label: "Selects title and release_year",
              keywords: [{ pattern: "\\bSELECT\\s+(title\\s*,\\s*release_year|release_year\\s*,\\s*title)\\s+FROM\\b", flags: "i" }],
              hint: "Use SELECT title, release_year."
            },
            {
              id: "t2",
              label: "Queries the movies table",
              keywords: [{ pattern: "\\bFROM\\s+movies\\b", flags: "i" }],
              hint: "Use FROM movies."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "SELECT DISTINCT",
        chapterTitle: "Data Retrieval Basics",
        xp: 15,
        theory: [
          {
            type: "text",
            content: "The `SELECT DISTINCT` statement is used to return only distinct (different) values."
          },
          {
            type: "text",
            content: "Inside a table, a column often contains many duplicate values; and sometimes you only want to list the different (distinct) values."
          },
          {
            type: "code",
            lang: "sql",
            label: "Distinct Example",
            content: "SELECT DISTINCT country\nFROM customers;"
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Find Unique Directors",
          description: "Write a query to retrieve a list of unique `director` names from the `movies` table.",
          starterCode: "-- Make the director names unique\nSELECT director\nFROM movies;",
          solutionCode: "SELECT DISTINCT director\nFROM movies;",
          tests: [
            {
              id: "t1",
              label: "Removes duplicates with DISTINCT",
              keywords: [{ pattern: "\\bSELECT\\s+DISTINCT\\s+director\\b", flags: "i" }],
              hint: "Use SELECT DISTINCT director."
            },
            {
              id: "t2",
              label: "Queries the movies table",
              keywords: [{ pattern: "\\bFROM\\s+movies\\b", flags: "i" }],
              hint: "Use FROM movies."
            }
          ]
        }
      },
      {
        id: "lesson-3",
        title: "Column Aliases (AS)",
        chapterTitle: "Data Retrieval Basics",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "SQL aliases are used to give a table, or a column in a table, a temporary name. This is often used to make column names more readable in the final result-set."
          },
          {
            type: "code",
            lang: "sql",
            label: "Alias Syntax",
            content: "SELECT first_name AS Name, phone_number AS Phone\nFROM employees;"
          },
          {
            type: "callout",
            variant: "info",
            title: "Quotes in Aliases",
            content: "If your alias contains spaces (e.g., 'First Name'), you must wrap it in quotes."
          },
          {
            type: "quiz",
            question: "What does `first_name AS Name` do?",
            options: [
              "Renames the column in the table permanently",
              "Copies the column into a new column",
              "Shows the column as `Name` in the result-set",
              "Keeps only rows where first_name is Name"
            ],
            answer: 2,
            explanation: "An alias is a temporary name used only in the query's result."
          },
          {
            type: "quiz",
            question: "When must an alias be wrapped in quotes?",
            options: [
              "Always",
              "When it's longer than 10 characters",
              "When it's used on a numeric column",
              "When it contains spaces"
            ],
            answer: 3,
            explanation: "For example: `first_name AS 'First Name'`."
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Alias the Result",
          description: "Select the `title` column but rename it to `movie_name`, and select `release_year` but rename it to `year_released`.",
          starterCode: "SELECT title AS -- add the alias here\nFROM movies;",
          solutionCode: "SELECT title AS movie_name, release_year AS year_released\nFROM movies;",
          tests: [
            {
              id: "t1",
              label: "Renames title to movie_name",
              keywords: [{ pattern: "\\btitle\\s+AS\\s+movie_name\\b", flags: "i" }],
              hint: "Use title AS movie_name."
            },
            {
              id: "t2",
              label: "Renames release_year to year_released",
              keywords: [{ pattern: "\\brelease_year\\s+AS\\s+year_released\\b", flags: "i" }],
              hint: "Use release_year AS year_released."
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
    title: "Filtering Data",
    icon: "🗂️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-4",
        title: "The WHERE Clause",
        chapterTitle: "Filtering Data",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "The `WHERE` clause is used to filter records. It is used to extract only those records that fulfill a specified condition."
          },
          {
            type: "callout",
            variant: "info",
            title: "Text Fields vs Numeric Fields",
            content: "SQL requires single quotes around text values. Numeric fields should not be enclosed in quotes."
          },
          {
            type: "code",
            lang: "sql",
            label: "Where Clause Example",
            content: "SELECT * FROM users\nWHERE country = 'Mexico';"
          },
          {
            type: "quiz",
            question: "What does the `WHERE` clause do?",
            options: [
              "Extracts only the records that meet a condition",
              "Sorts the records",
              "Chooses which columns to return",
              "Groups records that have the same values"
            ],
            answer: 0,
            explanation: "`WHERE` filters the rows."
          },
          {
            type: "quiz",
            question: "How should text and numbers be written in a `WHERE` condition?",
            options: [
              "Both in single quotes",
              "Text in single quotes, numbers without quotes",
              "Both without quotes",
              "Numbers in quotes, text without"
            ],
            answer: 1,
            explanation: "For example: `WHERE country = 'Mexico' AND age = 30`."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Filter by Text",
          description: "Write a query to retrieve all columns from the `movies` table where the `director` is 'Nolan'.",
          starterCode: "SELECT *\nFROM movies\nWHERE -- add the condition here\n",
          solutionCode: "SELECT *\nFROM movies\nWHERE director = 'Nolan';",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from movies",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+movies\\b", flags: "i" }],
              hint: "Use SELECT * FROM movies."
            },
            {
              id: "t2",
              label: "Keeps only movies directed by Nolan",
              keywords: [{ pattern: "\\bWHERE\\s+director\\s*=\\s*'Nolan'", flags: "i" }],
              hint: "Use WHERE director = 'Nolan' (text goes in single quotes)."
            }
          ]
        }
      },
      {
        id: "lesson-5",
        title: "Comparison Operators",
        chapterTitle: "Filtering Data",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "The `WHERE` clause supports standard comparison operators:"
          },
          {
            type: "text",
            content: "• `=` Equal\n• `>` Greater than\n• `<` Less than\n• `>=` Greater than or equal\n• `<=` Less than or equal\n• `<>` Not equal (or `!=`)"
          },
          {
            type: "code",
            lang: "sql",
            label: "Numeric Comparison",
            content: "SELECT title, rating\nFROM movies\nWHERE rating >= 8.5;"
          },
          {
            type: "quiz",
            question: "Which operator means 'greater than or equal'?",
            options: [
              "`=>`",
              "`>>`",
              "`>=`",
              "`+=`"
            ],
            answer: 2,
            explanation: "`>=` is greater than or equal; `<=` is less than or equal."
          },
          {
            type: "quiz",
            question: "Which two operators both mean 'not equal'?",
            options: [
              "`<>` and `=!`",
              "`!=` and `><`",
              "`<=` and `>=`",
              "`<>` and `!=`"
            ],
            answer: 3,
            explanation: "Both `<>` and `!=` mean not equal."
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Filter by Number",
          description: "Retrieve all columns for movies that have a `release_year` older than 2000 (meaning less than the year 2000).",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT *\nFROM movies\nWHERE release_year < 2000;",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from movies",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+movies\\b", flags: "i" }],
              hint: "Use SELECT * FROM movies."
            },
            {
              id: "t2",
              label: "Keeps only movies released before 2000",
              keywords: [{ pattern: "\\bWHERE\\s+release_year\\s*<\\s*2000\\b", flags: "i" }],
              hint: "Use WHERE release_year < 2000."
            }
          ]
        }
      },
      {
        id: "lesson-6",
        title: "Logical Operators (AND / OR)",
        chapterTitle: "Filtering Data",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "You can combine multiple conditions in a `WHERE` clause using logical operators like `AND`, `OR`, and `NOT`."
          },
          {
            type: "text",
            content: "• `AND` displays a record if all the conditions separated by AND are TRUE.\n• `OR` displays a record if any of the conditions separated by OR is TRUE."
          },
          {
            type: "code",
            lang: "sql",
            label: "Logical Operators Example",
            content: "SELECT *\nFROM movies\nWHERE rating > 8.0 AND release_year < 2010;"
          },
          {
            type: "quiz",
            question: "When does `OR` include a record?",
            options: [
              "When any of its conditions is true",
              "Only when all of its conditions are true",
              "Only when exactly one condition is true",
              "When none of its conditions are true"
            ],
            answer: 0,
            explanation: "`OR` needs at least one true condition. `AND` needs all of them."
          },
          {
            type: "quiz",
            question: "`WHERE rating > 8.0 AND release_year < 2010` returns movies that are…",
            options: [
              "Rated above 8.0 or released before 2010",
              "Rated above 8.0 and released before 2010",
              "Rated 8.0 or below and released before 2010",
              "Rated above 8.0 and released in or after 2010"
            ],
            answer: 1,
            explanation: "With `AND`, both conditions must be true."
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Complex Filtering",
          description: "Write a query to retrieve all columns from `movies` where the `director` is 'Nolan' AND the `release_year` is greater than 2005.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT *\nFROM movies\nWHERE director = 'Nolan' AND release_year > 2005;",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from movies",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+movies\\b", flags: "i" }],
              hint: "Use SELECT * FROM movies."
            },
            {
              id: "t2",
              label: "Checks the director is Nolan",
              keywords: [{ pattern: "\\bdirector\\s*=\\s*'Nolan'", flags: "i" }],
              hint: "Use director = 'Nolan'."
            },
            {
              id: "t3",
              label: "Checks the release year is after 2005",
              keywords: [{ pattern: "\\brelease_year\\s*>\\s*2005\\b", flags: "i" }],
              hint: "Use release_year > 2005."
            },
            {
              id: "t4",
              label: "Combines both conditions with AND",
              keywords: [{ pattern: "\\bWHERE\\b[\\s\\S]*\\bAND\\b", flags: "i" }],
              hint: "Join the two conditions with AND."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Advanced Filtering",
    icon: "🔬",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-7",
        title: "The IN Operator",
        chapterTitle: "Advanced Filtering",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `IN` operator allows you to specify multiple values in a `WHERE` clause. It acts as a shorthand for multiple `OR` conditions."
          },
          {
            type: "code",
            lang: "sql",
            label: "IN Operator Example",
            content: "SELECT *\nFROM customers\nWHERE country IN ('Germany', 'France', 'UK');"
          },
          {
            type: "callout",
            variant: "info",
            title: "NOT IN",
            content: "You can also use `NOT IN` to exclude records that match the list of values."
          },
          {
            type: "quiz",
            question: "What is `IN` a shorthand for?",
            options: [
              "Several `AND` conditions",
              "A `BETWEEN` range",
              "Several `OR` conditions on the same column",
              "A join with another table"
            ],
            answer: 2,
            explanation: "`country IN ('Germany', 'France')` means `country = 'Germany' OR country = 'France'`."
          },
          {
            type: "quiz",
            question: "Which keyword excludes the listed values?",
            options: [
              "`OUT`",
              "`EXCEPT IN`",
              "`IN NOT`",
              "`NOT IN`"
            ],
            answer: 3,
            explanation: "`NOT IN` keeps the rows whose value isn't in the list."
          }
        ],
        challenge: {
          id: "challenge-7",
          title: "Using the IN Operator",
          description: "Retrieve all columns from the `movies` table where the `genre` is either 'Action', 'Sci-Fi', or 'Drama'. Use the `IN` operator.",
          starterCode: "SELECT *\nFROM movies\nWHERE genre -- list the genres here\n",
          solutionCode: "SELECT *\nFROM movies\nWHERE genre IN ('Action', 'Sci-Fi', 'Drama');",
          tests: [
            {
              id: "t1",
              label: "Uses IN on the genre column",
              keywords: [{ pattern: "\\bgenre\\s+IN\\s*\\(", flags: "i" }],
              hint: "Use WHERE genre IN ( ... )."
            },
            {
              id: "t2",
              label: "Lists Action, Sci-Fi and Drama",
              keywords: [{ pattern: "'Action'", flags: "i" }, { pattern: "'Sci-Fi'", flags: "i" }, { pattern: "'Drama'", flags: "i" }],
              hint: "Put all three genres in the list, each in single quotes."
            }
          ]
        }
      },
      {
        id: "lesson-8",
        title: "The BETWEEN Operator",
        chapterTitle: "Advanced Filtering",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `BETWEEN` operator selects values within a given range. The values can be numbers, text, or dates."
          },
          {
            type: "text",
            content: "The `BETWEEN` operator is inclusive: begin and end values are included."
          },
          {
            type: "code",
            lang: "sql",
            label: "BETWEEN Operator Example",
            content: "SELECT *\nFROM products\nWHERE price BETWEEN 10 AND 20;"
          },
          {
            type: "quiz",
            question: "Does `price BETWEEN 10 AND 20` include 10 and 20?",
            options: [
              "Yes, both ends are included",
              "No, both ends are excluded",
              "Only 10 is included",
              "Only 20 is included"
            ],
            answer: 0,
            explanation: "`BETWEEN` is inclusive."
          },
          {
            type: "quiz",
            question: "Which kinds of values can `BETWEEN` compare?",
            options: [
              "Numbers only",
              "Numbers, text and dates",
              "Dates only",
              "Numbers and dates, but not text"
            ],
            answer: 1,
            explanation: "`BETWEEN` works on any values that can be ordered."
          }
        ],
        challenge: {
          id: "challenge-8",
          title: "Querying a Range",
          description: "Retrieve all movies released `BETWEEN` 2000 and 2010 (inclusive).",
          starterCode: "SELECT *\nFROM movies\nWHERE release_year -- add the range here\n",
          solutionCode: "SELECT *\nFROM movies\nWHERE release_year BETWEEN 2000 AND 2010;",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from movies",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+movies\\b", flags: "i" }],
              hint: "Use SELECT * FROM movies."
            },
            {
              id: "t2",
              label: "Keeps release years from 2000 to 2010",
              keywords: [{ pattern: "\\brelease_year\\s+BETWEEN\\s+2000\\s+AND\\s+2010\\b", flags: "i" }],
              hint: "Use WHERE release_year BETWEEN 2000 AND 2010."
            }
          ]
        }
      },
      {
        id: "lesson-9",
        title: "IS NULL / IS NOT NULL",
        chapterTitle: "Advanced Filtering",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "A field with a NULL value is a field with no value. It is very important to understand that a NULL value is different from a zero value or a field that contains spaces."
          },
          {
            type: "callout",
            variant: "warning",
            title: "Testing for NULL",
            content: "You cannot test for NULL values using comparison operators like `=`. You must use the `IS NULL` or `IS NOT NULL` operators instead."
          },
          {
            type: "code",
            lang: "sql",
            label: "NULL Checking Example",
            content: "SELECT name\nFROM employees\nWHERE manager_id IS NULL;"
          },
          {
            type: "quiz",
            question: "What is a NULL value?",
            options: [
              "Zero",
              "A field that contains spaces",
              "A field with no value",
              "The text 'NULL'"
            ],
            answer: 2,
            explanation: "NULL means no value. It's different from zero or spaces."
          },
          {
            type: "quiz",
            question: "How do you find rows where `manager_id` is missing?",
            options: [
              "`WHERE manager_id = NULL`",
              "`WHERE manager_id = 0`",
              "`WHERE manager_id = ''`",
              "`WHERE manager_id IS NULL`"
            ],
            answer: 3,
            explanation: "Comparison operators like `=` don't work with NULL; use `IS NULL`."
          }
        ],
        challenge: {
          id: "challenge-9",
          title: "Find Missing Data",
          description: "Find all movies in the database where the `director` column is missing (NULL).",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT *\nFROM movies\nWHERE director IS NULL;",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from movies",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+movies\\b", flags: "i" }],
              hint: "Use SELECT * FROM movies."
            },
            {
              id: "t2",
              label: "Finds rows where director is NULL",
              keywords: [{ pattern: "\\bWHERE\\s+director\\s+IS\\s+NULL\\b", flags: "i" }],
              hint: "Use WHERE director IS NULL. (= NULL never matches.)"
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Sorting and Limiting",
    icon: "🧮",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-10",
        title: "ORDER BY",
        chapterTitle: "Sorting and Limiting",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "The `ORDER BY` keyword is used to sort the result-set in ascending or descending order. By default, it sorts records in ascending order."
          },
          {
            type: "code",
            lang: "sql",
            label: "Order By Example",
            content: "SELECT * FROM customers\nORDER BY country;"
          },
          {
            type: "text",
            content: "To sort the records in descending order, use the `DESC` keyword."
          },
          {
            type: "quiz",
            question: "What order does `ORDER BY country` use?",
            options: [
              "Ascending (A to Z)",
              "Descending (Z to A)",
              "The order the rows were added",
              "Random"
            ],
            answer: 0,
            explanation: "`ORDER BY` sorts in ascending order by default."
          },
          {
            type: "quiz",
            question: "Which keyword sorts in descending order?",
            options: [
              "`DOWN`",
              "`DESC`",
              "`REVERSE`",
              "`LOWEST`"
            ],
            answer: 1,
            explanation: "Add `DESC` after the column, e.g. `ORDER BY country DESC`."
          }
        ],
        challenge: {
          id: "challenge-10",
          title: "Sort the Results",
          description: "Retrieve all columns from the `movies` table, but sort the results by `release_year` in descending order (newest movies first).",
          starterCode: "SELECT *\nFROM movies\n-- sort the results here\n",
          solutionCode: "SELECT *\nFROM movies\nORDER BY release_year DESC;",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from movies",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+movies\\b", flags: "i" }],
              hint: "Keep SELECT * FROM movies."
            },
            {
              id: "t2",
              label: "Sorts by release_year, newest first",
              keywords: [{ pattern: "\\bORDER\\s+BY\\s+release_year\\s+DESC\\b", flags: "i" }],
              hint: "Add ORDER BY release_year DESC."
            }
          ]
        }
      },
      {
        id: "lesson-11",
        title: "LIMIT",
        chapterTitle: "Sorting and Limiting",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "The `LIMIT` clause is used to specify the number of records to return. This is useful on large tables with thousands of records to prevent performance issues."
          },
          {
            type: "code",
            lang: "sql",
            label: "Limit Example",
            content: "SELECT * FROM customers\nORDER BY points DESC\nLIMIT 3;"
          },
          {
            type: "callout",
            variant: "info",
            title: "Top N Queries",
            content: "Combining `ORDER BY` and `LIMIT` is the standard way to find the 'Top N' or 'Bottom N' records in a table."
          }
        ],
        challenge: {
          id: "challenge-11",
          title: "Top 2 Movies",
          description: "Find the top 2 movies with the highest `rating`. Return all columns, sorted by `rating` in descending order, and limit the result to 2.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT *\nFROM movies\nORDER BY rating DESC\nLIMIT 2;",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from movies",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+movies\\b", flags: "i" }],
              hint: "Use SELECT * FROM movies."
            },
            {
              id: "t2",
              label: "Sorts by rating, highest first",
              keywords: [{ pattern: "\\bORDER\\s+BY\\s+rating\\s+DESC\\b", flags: "i" }],
              hint: "Add ORDER BY rating DESC."
            },
            {
              id: "t3",
              label: "Returns only 2 rows",
              keywords: [{ pattern: "\\bLIMIT\\s+2\\b", flags: "i" }],
              hint: "End with LIMIT 2."
            }
          ]
        }
      }
    ]
  }
];

export const SQLQUERIES_LESSONS = SQLQUERIES_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLQUERIES_TOTAL_XP = SQLQUERIES_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
