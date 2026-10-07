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
