export const SQLINDEXES_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Indexes",
    icon: "📇",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is an Index?",
        chapterTitle: "Intro to Indexes",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "Indexes are used to retrieve data from the database very fast. An index is like an index in the back of a book. It helps the database find data without scanning every single row in a table (a full table scan).",
          },
          {
            type: "callout",
            variant: "warning",
            title: "Performance Cost",
            content: "While indexes speed up SELECT queries drastically, they slow down UPDATE, INSERT, and DELETE statements because the index must be updated every time data is changed. Don't index every column!"
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Create an Index",
          description: "Write a statement to create an index named `idx_lastname` on the `last_name` column of the `persons` table.",
          starterCode: "CREATE INDEX idx_lastname\n-- specify the table and column here\n",
          solutionCode: "CREATE INDEX idx_lastname\nON persons (last_name);",
          tests: [
            {
              id: "t1",
              label: "Creates an index named idx_lastname",
              keywords: [{ pattern: "\\bCREATE\\s+INDEX\\s+idx_lastname\\b", flags: "i" }],
              hint: "Start with CREATE INDEX idx_lastname."
            },
            {
              id: "t2",
              label: "Indexes last_name in the persons table",
              keywords: [{ pattern: "\\bON\\s+persons\\s*\\(\\s*last_name\\s*\\)", flags: "i" }],
              hint: "Add ON persons (last_name)."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "Unique Indexes",
        chapterTitle: "Intro to Indexes",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "A Unique Index is exactly like a regular index, but it adds a constraint: it does not allow duplicate values to be inserted into the indexed column(s)."
          },
          {
            type: "code",
            lang: "sql",
            label: "Unique Index Example",
            content: "CREATE UNIQUE INDEX idx_email\nON users (email);"
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Enforce Unique Emails",
          description: "Create a unique index named `uq_email` on the `email` column in the `employees` table.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "CREATE UNIQUE INDEX uq_email\nON employees (email);",
          tests: [
            {
              id: "t1",
              label: "Creates a unique index named uq_email",
              keywords: [{ pattern: "\\bCREATE\\s+UNIQUE\\s+INDEX\\s+uq_email\\b", flags: "i" }],
              hint: "Start with CREATE UNIQUE INDEX uq_email."
            },
            {
              id: "t2",
              label: "Indexes email in the employees table",
              keywords: [{ pattern: "\\bON\\s+employees\\s*\\(\\s*email\\s*\\)", flags: "i" }],
              hint: "Add ON employees (email)."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Multi-Column Indexes",
    icon: "📑",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Composite Indexes",
        chapterTitle: "Multi-Column Indexes",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "An index can be created on a combination of columns. This is known as a composite index. It is useful for queries that frequently filter or sort by those specific columns together."
          },
          {
            type: "code",
            lang: "sql",
            label: "Composite Index Syntax",
            content: "CREATE INDEX idx_name\nON persons (last_name, first_name);"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Create a Composite Index",
          description: "Create an index named `idx_fullname` on the `first_name` and `last_name` columns of the `customers` table.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "CREATE INDEX idx_fullname\nON customers (first_name, last_name);",
          tests: [
            {
              id: "t1",
              label: "Creates an index named idx_fullname",
              keywords: [{ pattern: "\\bCREATE\\s+INDEX\\s+idx_fullname\\b", flags: "i" }],
              hint: "Start with CREATE INDEX idx_fullname."
            },
            {
              id: "t2",
              label: "Indexes first_name and last_name in customers",
              keywords: [{ pattern: "\\bON\\s+customers\\s*\\(\\s*(first_name\\s*,\\s*last_name|last_name\\s*,\\s*first_name)\\s*\\)", flags: "i" }],
              hint: "List both columns: ON customers (first_name, last_name)."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Managing Indexes",
    icon: "🧹",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-4",
        title: "Dropping Indexes",
        chapterTitle: "Managing Indexes",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "If an index is no longer used, or if it is slowing down writes too much, you can drop it. The syntax varies depending on the database."
          },
          {
            type: "code",
            lang: "sql",
            label: "Drop Index Syntax (PostgreSQL/MySQL)",
            content: "DROP INDEX index_name;"
          },
          {
            type: "code",
            lang: "sql",
            label: "Drop Index Syntax (SQL Server)",
            content: "DROP INDEX table_name.index_name;"
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Drop an Old Index",
          description: "Write a standard SQL statement to drop the index named `idx_old_data`.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "DROP INDEX idx_old_data;",
          tests: [
            {
              id: "t1",
              label: "Drops the idx_old_data index",
              keywords: [{ pattern: "\\bDROP\\s+INDEX\\s+(\\w+\\.)?idx_old_data\\b", flags: "i" }],
              hint: "Use DROP INDEX idx_old_data."
            }
          ]
        }
      }
    ]
  }
];

export const SQLINDEXES_LESSONS = SQLINDEXES_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLINDEXES_TOTAL_XP = SQLINDEXES_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
