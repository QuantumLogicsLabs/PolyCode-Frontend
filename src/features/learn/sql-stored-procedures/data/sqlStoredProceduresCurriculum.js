export const SQLSTOREDPROCEDURES_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Stored Procedures",
    icon: "📦",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is a Stored Procedure?",
        chapterTitle: "Intro to Stored Procedures",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again.",
          },
          {
            type: "text",
            content: "If you have an SQL query that you write over and over again, save it as a stored procedure, and then just call it to execute it."
          },
          {
            type: "callout",
            variant: "info",
            title: "Performance",
            content: "Stored procedures can improve performance because the database engine compiles them once and caches the execution plan."
          },
          {
            type: "quiz",
            question: "What is a stored procedure?",
            options: [
              "Saved SQL code that can be reused again and again",
              "A copy of a table kept as a backup",
              "A query that runs automatically every night",
              "A virtual table based on a `SELECT`"
            ],
            answer: 0,
            explanation: "Save a query you write often as a procedure, then just call it."
          },
          {
            type: "quiz",
            question: "Why can stored procedures improve performance?",
            options: [
              "They save their results, so the query never runs again",
              "The engine compiles them once and caches the execution plan",
              "They skip the database's permission checks",
              "They run on the user's computer instead of the server"
            ],
            answer: 1,
            explanation: "Reusing the cached plan saves work on every call."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Create a Basic Procedure",
          description: "Write a SQL statement to create a stored procedure named `SelectAllCustomers` that selects everything from the `customers` table.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "CREATE PROCEDURE SelectAllCustomers\nAS\nSELECT * FROM customers;",
          tests: [
            {
              id: "t1",
              label: "Creates a procedure named SelectAllCustomers",
              keywords: [{ pattern: "\\bCREATE\\s+PROC(EDURE)?\\s+SelectAllCustomers\\b", flags: "i" }],
              hint: "Start with CREATE PROCEDURE SelectAllCustomers."
            },
            {
              id: "t2",
              label: "Selects everything from customers after AS",
              keywords: [{ pattern: "\\bAS\\s+(BEGIN\\s+)?SELECT\\s+\\*\\s+FROM\\s+customers\\b", flags: "i" }],
              hint: "Follow it with AS, then SELECT * FROM customers."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "Executing a Procedure",
        chapterTitle: "Intro to Stored Procedures",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "Once a stored procedure is created, you can execute (or call) it."
          },
          {
            type: "code",
            lang: "sql",
            label: "Execution Syntax (SQL Server)",
            content: "EXEC SelectAllCustomers;"
          },
          {
            type: "code",
            lang: "sql",
            label: "Execution Syntax (MySQL)",
            content: "CALL SelectAllCustomers();"
          },
          {
            type: "quiz",
            question: "How do you run the `SelectAllCustomers` procedure in SQL Server?",
            options: [
              "`RUN SelectAllCustomers;`",
              "`START SelectAllCustomers;`",
              "`EXEC SelectAllCustomers;`",
              "`SELECT SelectAllCustomers;`"
            ],
            answer: 2,
            explanation: "SQL Server uses `EXEC` (or `EXECUTE`)."
          },
          {
            type: "quiz",
            question: "How do you run it in MySQL?",
            options: [
              "`RUN SelectAllCustomers();`",
              "`START SelectAllCustomers();`",
              "`EXECUTE PROCEDURE SelectAllCustomers;`",
              "`CALL SelectAllCustomers();`"
            ],
            answer: 3,
            explanation: "MySQL uses `CALL`, followed by parentheses."
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Call the Procedure",
          description: "Write a statement to execute the stored procedure `GetDailyReport` using the standard `EXEC` keyword.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "EXEC GetDailyReport;",
          tests: [
            {
              id: "t1",
              label: "Runs GetDailyReport with EXEC",
              keywords: [{ pattern: "\\bEXEC(UTE)?\\s+GetDailyReport\\b", flags: "i" }],
              hint: "Use EXEC GetDailyReport."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Parameters",
    icon: "🎛️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Single Parameters",
        chapterTitle: "Parameters",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "Stored procedures become much more powerful when you pass parameters to them. A parameter acts as a variable that the procedure can use in its queries."
          },
          {
            type: "code",
            lang: "sql",
            label: "Parameter Example",
            content: "CREATE PROCEDURE SelectCustomersByCity @City nvarchar(30)\nAS\nSELECT * FROM Customers WHERE City = @City;"
          },
          {
            type: "quiz",
            question: "What does a parameter do in a stored procedure?",
            options: [
              "Acts as a variable the procedure's queries can use",
              "Stores the procedure's result permanently",
              "Names the table the procedure is saved in",
              "Sets how often the procedure runs"
            ],
            answer: 0,
            explanation: "The value passed in is used in the queries, e.g. `WHERE City = @City`."
          },
          {
            type: "quiz",
            question: "In `CREATE PROCEDURE SelectCustomersByCity @City nvarchar(30)`, what is `nvarchar(30)`?",
            options: [
              "The parameter's default value",
              "The parameter's data type: text of up to 30 characters",
              "The number of rows to return",
              "The name of the column to filter on"
            ],
            answer: 1,
            explanation: "Each parameter is declared with a name and a data type."
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Create Parameterized Procedure",
          description: "Create a stored procedure named `GetByStatus` that takes one parameter `@Status nvarchar(20)`. It should select all from `orders` where `status = @Status`.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "CREATE PROCEDURE GetByStatus @Status nvarchar(20)\nAS\nSELECT * FROM orders WHERE status = @Status;",
          tests: [
            {
              id: "t1",
              label: "Creates a procedure named GetByStatus",
              keywords: [{ pattern: "\\bCREATE\\s+PROC(EDURE)?\\s+GetByStatus\\b", flags: "i" }],
              hint: "Start with CREATE PROCEDURE GetByStatus."
            },
            {
              id: "t2",
              label: "Declares @Status as nvarchar(20)",
              keywords: [{ pattern: "\\bGetByStatus\\s*\\(?\\s*@Status\\s+nvarchar\\s*\\(\\s*20\\s*\\)", flags: "i" }],
              hint: "Put the parameter after the name: GetByStatus @Status nvarchar(20)."
            },
            {
              id: "t3",
              label: "Selects orders where status = @Status",
              keywords: [{ pattern: "\\bAS\\s+(BEGIN\\s+)?SELECT\\s+\\*\\s+FROM\\s+orders\\b", flags: "i" }, { pattern: "\\bWHERE\\s+status\\s*=\\s*@Status\\b", flags: "i" }],
              hint: "After AS, write SELECT * FROM orders WHERE status = @Status."
            }
          ]
        }
      },
      {
        id: "lesson-4",
        title: "Executing with Parameters",
        chapterTitle: "Parameters",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "To execute a stored procedure that requires parameters, you simply pass the values after the procedure name."
          },
          {
            type: "code",
            lang: "sql",
            label: "Execution with Params",
            content: "EXEC SelectCustomersByCity @City = 'London';"
          },
          {
            type: "quiz",
            question: "How do you pass 'London' to the `@City` parameter?",
            options: [
              "`EXEC SelectCustomersByCity WHERE City = 'London';`",
              "`EXEC SelectCustomersByCity(@City) = 'London';`",
              "`EXEC SelectCustomersByCity @City = 'London';`",
              "`EXEC SelectCustomersByCity; @City = 'London'`"
            ],
            answer: 2,
            explanation: "Name the parameter and give it a value after the procedure name."
          },
          {
            type: "quiz",
            question: "Where do the parameter values go when you execute a procedure?",
            options: [
              "Before the `EXEC` keyword",
              "Inside the `CREATE PROCEDURE` statement",
              "In a separate query that runs first",
              "After the procedure name"
            ],
            answer: 3,
            explanation: "For example: `EXEC SelectCustomersByCity @City = 'London';`"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Call with Parameters",
          description: "Execute the `GetByStatus` procedure, passing the value `'Shipped'` into the `@Status` parameter.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "EXEC GetByStatus @Status = 'Shipped';",
          tests: [
            {
              id: "t1",
              label: "Runs GetByStatus with EXEC",
              keywords: [{ pattern: "\\bEXEC(UTE)?\\s+GetByStatus\\b", flags: "i" }],
              hint: "Use EXEC GetByStatus."
            },
            {
              id: "t2",
              label: "Passes 'Shipped' to @Status",
              keywords: [{ pattern: "@Status\\s*=\\s*'Shipped'", flags: "i" }],
              hint: "Add @Status = 'Shipped' after the procedure name."
            }
          ]
        }
      },
      {
        id: "lesson-5",
        title: "Multiple Parameters",
        chapterTitle: "Parameters",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "You can define multiple parameters by separating them with commas."
          },
          {
            type: "code",
            lang: "sql",
            label: "Multiple Params",
            content: "CREATE PROCEDURE GetUsers @City nvarchar(30), @PostalCode nvarchar(10)\nAS\nSELECT * FROM Customers WHERE City = @City AND PostalCode = @PostalCode;"
          },
          {
            type: "quiz",
            question: "How do you define more than one parameter?",
            options: [
              "Separate them with commas",
              "Separate them with `AND`",
              "Write one `CREATE PROCEDURE` per parameter",
              "Wrap them in square brackets"
            ],
            answer: 0,
            explanation: "For example: `@City nvarchar(30), @PostalCode nvarchar(10)`."
          },
          {
            type: "quiz",
            question: "Which parameters does the lesson's `GetUsers` procedure define?",
            options: [
              "`@City` only",
              "`@City` and `@PostalCode`",
              "`@PostalCode` and `@Country`",
              "`@Name` and `@City`"
            ],
            answer: 1,
            explanation: "Both are used in its `WHERE` clause."
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Multiple Param Execution",
          description: "Execute the `GetUsers` procedure passing `@City = 'Paris'` and `@PostalCode = '75000'`.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "EXEC GetUsers @City = 'Paris', @PostalCode = '75000';",
          tests: [
            {
              id: "t1",
              label: "Runs GetUsers with EXEC",
              keywords: [{ pattern: "\\bEXEC(UTE)?\\s+GetUsers\\b", flags: "i" }],
              hint: "Use EXEC GetUsers."
            },
            {
              id: "t2",
              label: "Passes 'Paris' to @City",
              keywords: [{ pattern: "@City\\s*=\\s*'Paris'", flags: "i" }],
              hint: "Add @City = 'Paris'."
            },
            {
              id: "t3",
              label: "Passes '75000' to @PostalCode",
              keywords: [{ pattern: "@PostalCode\\s*=\\s*'75000'", flags: "i" }],
              hint: "Add @PostalCode = '75000'."
            },
            {
              id: "t4",
              label: "Separates the parameters with a comma",
              keywords: [{ pattern: "@\\w+\\s*=\\s*'[^']*'\\s*,\\s*@\\w+\\s*=", flags: "i" }],
              hint: "Put a comma between the two parameters."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Control Flow",
    icon: "🔀",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "IF...ELSE",
        chapterTitle: "Control Flow",
        xp: 35,
        theory: [
          {
            type: "text",
            content: "Stored procedures can contain procedural code, including `IF...ELSE` blocks to control the flow of execution based on conditions."
          },
          {
            type: "code",
            lang: "sql",
            label: "IF ELSE Example",
            content: "IF @count > 10\nBEGIN\n  PRINT 'Too many'\nEND\nELSE\nBEGIN\n  PRINT 'Acceptable'\nEND"
          },
          {
            type: "quiz",
            question: "What do `IF...ELSE` blocks let a stored procedure do?",
            options: [
              "Repeat a query a set number of times",
              "Return more than one result-set",
              "Run different code depending on a condition",
              "Undo changes when an error happens"
            ],
            answer: 2,
            explanation: "They control the flow of execution based on a condition."
          },
          {
            type: "quiz",
            question: "In the lesson's example, what is printed when `@count` is 5?",
            options: [
              "`Too many`",
              "Nothing",
              "Both messages",
              "`Acceptable`"
            ],
            answer: 3,
            explanation: "`5 > 10` is false, so the `ELSE` block runs."
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Write an IF Condition",
          description: "Write an `IF` statement checking if the variable `@stock` is less than `5`. If it is, `SELECT 'Low Stock'` inside a `BEGIN ... END` block. (You don't need to write the ELSE).",
          starterCode: "-- Write your statement here\n",
          solutionCode: "IF @stock < 5\nBEGIN\n  SELECT 'Low Stock';\nEND",
          tests: [
            {
              id: "t1",
              label: "Checks whether @stock is less than 5",
              keywords: [{ pattern: "\\bIF\\s+\\(?\\s*@stock\\s*<\\s*5\\b", flags: "i" }],
              hint: "Start with IF @stock < 5."
            },
            {
              id: "t2",
              label: "Selects 'Low Stock' inside BEGIN ... END",
              keywords: [{ pattern: "\\bBEGIN\\s+SELECT\\s+'Low Stock'\\s*;?\\s*END\\b", flags: "i" }],
              hint: "Wrap it in a block: BEGIN SELECT 'Low Stock'; END."
            }
          ]
        }
      }
    ]
  }
];

export const SQLSTOREDPROCEDURES_LESSONS = SQLSTOREDPROCEDURES_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLSTOREDPROCEDURES_TOTAL_XP = SQLSTOREDPROCEDURES_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
