export const SQLVIEWS_CHAPTERS = [
  {
    id: "chapter-1",
    title: "Intro to Views",
    icon: "🖼️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-1",
        title: "What is a View?",
        chapterTitle: "Intro to Views",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "In SQL, a view is a virtual table based on the result-set of an SQL statement. It contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.",
          },
          {
            type: "callout",
            variant: "info",
            title: "Why use Views?",
            content: "Views can hide complex queries, restrict data access (showing only certain columns to certain users), and provide a consistent interface even if underlying tables change."
          }
        ],
        challenge: {
          id: "challenge-1",
          title: "Querying a View",
          description: "Once a view is created, you query it exactly like a normal table. Query the `active_users` view to get all columns.",
          starterCode: "-- Write your query here\n",
          solutionCode: "SELECT *\nFROM active_users;",
          tests: [
            {
              id: "t1",
              label: "Selects all columns from active_users",
              keywords: [{ pattern: "\\bSELECT\\s+\\*\\s+FROM\\s+active_users\\b", flags: "i" }],
              hint: "Query the view like a table: SELECT * FROM active_users."
            }
          ]
        }
      },
      {
        id: "lesson-2",
        title: "Creating a View",
        chapterTitle: "Intro to Views",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "You create a view using the `CREATE VIEW` statement."
          },
          {
            type: "code",
            lang: "sql",
            label: "Create View Syntax",
            content: "CREATE VIEW Brazil_Customers AS\nSELECT CustomerName, ContactName\nFROM Customers\nWHERE Country = 'Brazil';"
          }
        ],
        challenge: {
          id: "challenge-2",
          title: "Create High Scores View",
          description: "Write a query to create a view called `high_scores` that selects `player_name` and `score` from the `game_scores` table where `score > 1000`.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "CREATE VIEW high_scores AS\nSELECT player_name, score\nFROM game_scores\nWHERE score > 1000;",
          tests: [
            {
              id: "t1",
              label: "Creates a view named high_scores",
              keywords: [{ pattern: "\\bCREATE\\s+VIEW\\s+high_scores\\s+AS\\s+SELECT\\b", flags: "i" }],
              hint: "Start with CREATE VIEW high_scores AS SELECT ..."
            },
            {
              id: "t2",
              label: "Selects player_name and score from game_scores",
              keywords: [{ pattern: "\\bSELECT\\s+player_name\\s*,\\s*score\\s+FROM\\s+game_scores\\b", flags: "i" }],
              hint: "Use SELECT player_name, score FROM game_scores."
            },
            {
              id: "t3",
              label: "Keeps only scores over 1000",
              keywords: [{ pattern: "\\bWHERE\\s+score\\s*>\\s*1000\\b", flags: "i" }],
              hint: "Add WHERE score > 1000."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-2",
    title: "Managing Views",
    icon: "🛠️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-3",
        title: "Updating a View Definition",
        chapterTitle: "Managing Views",
        xp: 25,
        theory: [
          {
            type: "text",
            content: "You can update the definition of an existing view by using the `CREATE OR REPLACE VIEW` statement (or `ALTER VIEW` depending on the database engine)."
          },
          {
            type: "code",
            lang: "sql",
            label: "Replace View Example",
            content: "CREATE OR REPLACE VIEW Brazil_Customers AS\nSELECT CustomerName, ContactName, City\nFROM Customers\nWHERE Country = 'Brazil';"
          }
        ],
        challenge: {
          id: "challenge-3",
          title: "Replace the View",
          description: "Update the `high_scores` view to also include the `game_date` column. (Assume the table is `game_scores` and condition is `score > 1000`).",
          starterCode: "-- Write your statement here\n",
          solutionCode: "CREATE OR REPLACE VIEW high_scores AS\nSELECT player_name, score, game_date\nFROM game_scores\nWHERE score > 1000;",
          tests: [
            {
              id: "t1",
              label: "Replaces the high_scores view",
              keywords: [{ pattern: "\\bCREATE\\s+OR\\s+REPLACE\\s+VIEW\\s+high_scores\\s+AS\\s+SELECT\\b", flags: "i" }],
              hint: "Start with CREATE OR REPLACE VIEW high_scores AS SELECT ..."
            },
            {
              id: "t2",
              label: "Selects player_name, score and game_date",
              keywords: [{ pattern: "\\bSELECT\\s+[\\w\\s,]*\\bplayer_name\\b[\\w\\s,]*\\bFROM\\s+game_scores\\b", flags: "i" }, { pattern: "\\bSELECT\\s+[\\w\\s,]*\\bgame_date\\b[\\w\\s,]*\\bFROM\\s+game_scores\\b", flags: "i" }],
              hint: "Use SELECT player_name, score, game_date FROM game_scores."
            },
            {
              id: "t3",
              label: "Keeps only scores over 1000",
              keywords: [{ pattern: "\\bWHERE\\s+score\\s*>\\s*1000\\b", flags: "i" }],
              hint: "Keep WHERE score > 1000."
            }
          ]
        }
      },
      {
        id: "lesson-4",
        title: "Dropping a View",
        chapterTitle: "Managing Views",
        xp: 20,
        theory: [
          {
            type: "text",
            content: "A view is deleted with the `DROP VIEW` command."
          }
        ],
        challenge: {
          id: "challenge-4",
          title: "Drop the View",
          description: "Write a command to delete the view named `old_records`.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "DROP VIEW old_records;",
          tests: [
            {
              id: "t1",
              label: "Drops the old_records view",
              keywords: [{ pattern: "\\bDROP\\s+VIEW\\s+(IF\\s+EXISTS\\s+)?old_records\\b", flags: "i" }],
              hint: "Use DROP VIEW old_records."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-3",
    title: "Updatable Views",
    icon: "🔄",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-5",
        title: "What makes a View Updatable?",
        chapterTitle: "Updatable Views",
        xp: 30,
        theory: [
          {
            type: "text",
            content: "In SQL, some views are 'updatable', meaning you can run `INSERT`, `UPDATE`, or `DELETE` statements on the view itself, and it will modify the underlying base table."
          },
          {
            type: "callout",
            variant: "warning",
            title: "Restrictions",
            content: "A view is generally updatable only if it maps directly to a single table without using aggregates (SUM, COUNT), DISTINCT, GROUP BY, or complex JOINs."
          }
        ],
        challenge: {
          id: "challenge-5",
          title: "Update via View",
          description: "Write an `UPDATE` statement that changes the `status` to 'premium' for the user with `id = 1` inside the `active_users` view.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "UPDATE active_users\nSET status = 'premium'\nWHERE id = 1;",
          tests: [
            {
              id: "t1",
              label: "Updates the active_users view",
              keywords: [{ pattern: "\\bUPDATE\\s+active_users\\s+SET\\b", flags: "i" }],
              hint: "Start with UPDATE active_users SET ..."
            },
            {
              id: "t2",
              label: "Sets status to 'premium'",
              keywords: [{ pattern: "\\bSET\\s+status\\s*=\\s*'premium'", flags: "i" }],
              hint: "Use SET status = 'premium'."
            },
            {
              id: "t3",
              label: "Changes only the user with id 1",
              keywords: [{ pattern: "\\bWHERE\\s+id\\s*=\\s*1\\b", flags: "i" }],
              hint: "Add WHERE id = 1, or every row is changed."
            }
          ]
        }
      }
    ]
  },
  {
    id: "chapter-4",
    title: "Advanced View Features",
    icon: "🛡️",
    color: "#f29111",
    lessons: [
      {
        id: "lesson-6",
        title: "WITH CHECK OPTION",
        chapterTitle: "Advanced View Features",
        xp: 40,
        theory: [
          {
            type: "text",
            content: "The `WITH CHECK OPTION` is a constraint applied to a view. It ensures that all `UPDATE` and `INSERT` statements executed against the view satisfy the condition in the view's `WHERE` clause."
          },
          {
            type: "code",
            lang: "sql",
            label: "Check Option Syntax",
            content: "CREATE VIEW USA_Customers AS\nSELECT * FROM Customers WHERE Country = 'USA'\nWITH CHECK OPTION;"
          },
          {
            type: "text",
            content: "If you try to insert a customer with `Country = 'Canada'` through this view, the database will throw an error."
          }
        ],
        challenge: {
          id: "challenge-6",
          title: "Create a Secure View",
          description: "Create a view named `teens` that selects all columns from `users` where `age BETWEEN 13 AND 19`. Add `WITH CHECK OPTION` at the end.",
          starterCode: "-- Write your statement here\n",
          solutionCode: "CREATE VIEW teens AS\nSELECT *\nFROM users\nWHERE age BETWEEN 13 AND 19\nWITH CHECK OPTION;",
          tests: [
            {
              id: "t1",
              label: "Creates a view named teens over users",
              keywords: [{ pattern: "\\bCREATE\\s+VIEW\\s+teens\\s+AS\\s+SELECT\\s+\\*\\s+FROM\\s+users\\b", flags: "i" }],
              hint: "Use CREATE VIEW teens AS SELECT * FROM users."
            },
            {
              id: "t2",
              label: "Keeps ages 13 to 19",
              keywords: [{ pattern: "\\bWHERE\\s+age\\s+BETWEEN\\s+13\\s+AND\\s+19\\b", flags: "i" }],
              hint: "Add WHERE age BETWEEN 13 AND 19."
            },
            {
              id: "t3",
              label: "Ends with WITH CHECK OPTION",
              keywords: [{ pattern: "\\bWHERE\\b[\\s\\S]*\\bWITH\\s+CHECK\\s+OPTION\\b", flags: "i" }],
              hint: "Add WITH CHECK OPTION after the WHERE clause."
            }
          ]
        }
      }
    ]
  }
];

export const SQLVIEWS_LESSONS = SQLVIEWS_CHAPTERS.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({
    ...lesson,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterColor: chapter.color,
    chapterIcon: chapter.icon,
  }))
);

export const SQLVIEWS_TOTAL_XP = SQLVIEWS_LESSONS.reduce(
  (total, lesson) => total + (lesson.xp || 0),
  0
);
