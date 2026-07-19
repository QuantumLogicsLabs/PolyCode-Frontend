export const POWERSHELLFUNDAMENTALS_CHAPTERS = [
  {
    id: "ch-1",
    title: "Cmdlets and Syntax",
    icon: "terminal",
    desc: "Basic PowerShell commands and syntax.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "What is a Cmdlet?",
        chapterTitle: "Cmdlets and Syntax",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to What is a Cmdlet?. Verb-Noun syntax." },
          { type: "code", language: "powershell", content: "Get-Command" }
        ],
        challenge: {
          title: "Practice: What is a Cmdlet?",
          description: [
            { type: "text", content: "Write a PowerShell command for What is a Cmdlet?." }
          ],
          starterCode: "",
          solutionCode: "Get-Command",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Command"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-1-l2",
        title: "Using Get-Help",
        chapterTitle: "Cmdlets and Syntax",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Using Get-Help. Finding help in PowerShell." },
          { type: "code", language: "powershell", content: "Get-Help Get-Process -Detailed" }
        ],
        challenge: {
          title: "Practice: Using Get-Help",
          description: [
            { type: "text", content: "Write a PowerShell command for Using Get-Help." }
          ],
          starterCode: "",
          solutionCode: "Get-Help Get-Process -Detailed",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Help"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-2",
    title: "Objects in PowerShell",
    icon: "box",
    desc: "Everything is an object.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Exploring Objects",
        chapterTitle: "Objects in PowerShell",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Exploring Objects. Using Get-Member." },
          { type: "code", language: "powershell", content: "Get-Process | Get-Member" }
        ],
        challenge: {
          title: "Practice: Exploring Objects",
          description: [
            { type: "text", content: "Write a PowerShell command for Exploring Objects." }
          ],
          starterCode: "",
          solutionCode: "Get-Process | Get-Member",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Process"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-2-l2",
        title: "Properties and Methods",
        chapterTitle: "Objects in PowerShell",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Properties and Methods. Accessing object data." },
          { type: "code", language: "powershell", content: "(Get-Date).DayOfWeek" }
        ],
        challenge: {
          title: "Practice: Properties and Methods",
          description: [
            { type: "text", content: "Write a PowerShell command for Properties and Methods." }
          ],
          starterCode: "",
          solutionCode: "(Get-Date).DayOfWeek",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["(Get-Date).DayOfWeek"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "The Pipeline",
    icon: "git-commit",
    desc: "Connecting commands together.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "Piping Output",
        chapterTitle: "The Pipeline",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Piping Output. Passing objects down the line." },
          { type: "code", language: "powershell", content: "Get-Process | Stop-Process -WhatIf" }
        ],
        challenge: {
          title: "Practice: Piping Output",
          description: [
            { type: "text", content: "Write a PowerShell command for Piping Output." }
          ],
          starterCode: "",
          solutionCode: "Get-Process | Stop-Process -WhatIf",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Process"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Filtering with Where-Object",
        chapterTitle: "The Pipeline",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Filtering with Where-Object. Filtering objects in the pipeline." },
          { type: "code", language: "powershell", content: "Get-Service | Where-Object Status -eq 'Running'" }
        ],
        challenge: {
          title: "Practice: Filtering with Where-Object",
          description: [
            { type: "text", content: "Write a PowerShell command for Filtering with Where-Object." }
          ],
          starterCode: "",
          solutionCode: "Get-Service | Where-Object Status -eq 'Running'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Service"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Formatting Output",
    icon: "list",
    desc: "Formatting object displays.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Format-Table",
        chapterTitle: "Formatting Output",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Format-Table. Display data as a table." },
          { type: "code", language: "powershell", content: "Get-Process | Format-Table Name, ID, CPU" }
        ],
        challenge: {
          title: "Practice: Format-Table",
          description: [
            { type: "text", content: "Write a PowerShell command for Format-Table." }
          ],
          starterCode: "",
          solutionCode: "Get-Process | Format-Table Name, ID, CPU",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Process"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "Format-List",
        chapterTitle: "Formatting Output",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Format-List. Display data as a list." },
          { type: "code", language: "powershell", content: "Get-Service | Format-List *" }
        ],
        challenge: {
          title: "Practice: Format-List",
          description: [
            { type: "text", content: "Write a PowerShell command for Format-List." }
          ],
          starterCode: "",
          solutionCode: "Get-Service | Format-List *",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-Service"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
];

export const POWERSHELLFUNDAMENTALS_LESSONS = POWERSHELLFUNDAMENTALS_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLFUNDAMENTALS_TOTAL_XP = POWERSHELLFUNDAMENTALS_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
