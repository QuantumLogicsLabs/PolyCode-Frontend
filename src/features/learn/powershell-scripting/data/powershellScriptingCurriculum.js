export const POWERSHELLSCRIPTING_CHAPTERS = [
  {
    id: "ch-1",
    title: "Variables and Data Types",
    icon: "code",
    desc: "Working with data in scripts.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "Declaring Variables",
        chapterTitle: "Variables and Data Types",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Declaring Variables. How to declare variables." },
          { type: "code", language: "powershell", content: "$myVar = 'Hello World'" }
        ],
        challenge: {
          title: "Practice: Declaring Variables",
          description: [
            { type: "text", content: "Write a PowerShell command for Declaring Variables." }
          ],
          starterCode: "",
          solutionCode: "$myVar = 'Hello World'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$myVar"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-1-l2",
        title: "Strong Typing",
        chapterTitle: "Variables and Data Types",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Strong Typing. Enforcing data types." },
          { type: "code", language: "powershell", content: "[int]$number = 42" }
        ],
        challenge: {
          title: "Practice: Strong Typing",
          description: [
            { type: "text", content: "Write a PowerShell command for Strong Typing." }
          ],
          starterCode: "",
          solutionCode: "[int]$number = 42",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["[int]$number"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-2",
    title: "Arrays and Hash Tables",
    icon: "layers",
    desc: "Working with collections.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Arrays",
        chapterTitle: "Arrays and Hash Tables",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Arrays. Creating and accessing arrays." },
          { type: "code", language: "powershell", content: "$myArray = @(1, 2, 3); $myArray[0]" }
        ],
        challenge: {
          title: "Practice: Arrays",
          description: [
            { type: "text", content: "Write a PowerShell command for Arrays." }
          ],
          starterCode: "",
          solutionCode: "$myArray = @(1, 2, 3); $myArray[0]",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$myArray"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-2-l2",
        title: "Hash Tables",
        chapterTitle: "Arrays and Hash Tables",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Hash Tables. Key-Value pairs." },
          { type: "code", language: "powershell", content: "$hash = @{ Key='Value' }; $hash['Key']" }
        ],
        challenge: {
          title: "Practice: Hash Tables",
          description: [
            { type: "text", content: "Write a PowerShell command for Hash Tables." }
          ],
          starterCode: "",
          solutionCode: "$hash = @{ Key='Value' }; $hash['Key']",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$hash"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "Control Flow",
    icon: "git-branch",
    desc: "Logic and loops.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "If/Else Statements",
        chapterTitle: "Control Flow",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to If/Else Statements. Conditional logic." },
          { type: "code", language: "powershell", content: "if ($true) { Write-Host 'Yes' }" }
        ],
        challenge: {
          title: "Practice: If/Else Statements",
          description: [
            { type: "text", content: "Write a PowerShell command for If/Else Statements." }
          ],
          starterCode: "",
          solutionCode: "if ($true) { Write-Host 'Yes' }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["if"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Loops",
        chapterTitle: "Control Flow",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Loops. For, Foreach, While." },
          { type: "code", language: "powershell", content: "foreach ($item in $collection) { Write-Host $item }" }
        ],
        challenge: {
          title: "Practice: Loops",
          description: [
            { type: "text", content: "Write a PowerShell command for Loops." }
          ],
          starterCode: "",
          solutionCode: "foreach ($item in $collection) { Write-Host $item }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["foreach"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Error Handling",
    icon: "alert-triangle",
    desc: "Managing script errors.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Try/Catch",
        chapterTitle: "Error Handling",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Try/Catch. Catching exceptions." },
          { type: "code", language: "powershell", content: "try { 1/0 } catch { Write-Host 'Error' }" }
        ],
        challenge: {
          title: "Practice: Try/Catch",
          description: [
            { type: "text", content: "Write a PowerShell command for Try/Catch." }
          ],
          starterCode: "",
          solutionCode: "try { 1/0 } catch { Write-Host 'Error' }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["try"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "ErrorActionPreference",
        chapterTitle: "Error Handling",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to ErrorActionPreference. Controlling error behavior." },
          { type: "code", language: "powershell", content: "$ErrorActionPreference = 'Stop'" }
        ],
        challenge: {
          title: "Practice: ErrorActionPreference",
          description: [
            { type: "text", content: "Write a PowerShell command for ErrorActionPreference." }
          ],
          starterCode: "",
          solutionCode: "$ErrorActionPreference = 'Stop'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$ErrorActionPreference"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
];

export const POWERSHELLSCRIPTING_LESSONS = POWERSHELLSCRIPTING_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLSCRIPTING_TOTAL_XP = POWERSHELLSCRIPTING_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
