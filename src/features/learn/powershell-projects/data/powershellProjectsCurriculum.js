export const POWERSHELLPROJECTS_CHAPTERS = [
  {
    id: "ch-1",
    title: "System Audit Script",
    icon: "clipboard",
    desc: "Create a basic system audit script.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "Gathering System Info",
        chapterTitle: "System Audit Script",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Gathering System Info. Collecting basic computer info." },
          { type: "code", language: "powershell", content: "Get-CimInstance Win32_ComputerSystem" }
        ],
        challenge: {
          title: "Practice: Gathering System Info",
          description: [
            { type: "text", content: "Write a PowerShell command for Gathering System Info." }
          ],
          starterCode: "",
          solutionCode: "Get-CimInstance Win32_ComputerSystem",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-CimInstance"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-1-l2",
        title: "Exporting to CSV",
        chapterTitle: "System Audit Script",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Exporting to CSV. Exporting the collected data." },
          { type: "code", language: "powershell", content: "$data | Export-Csv -Path C:\\audit.csv -NoTypeInformation" }
        ],
        challenge: {
          title: "Practice: Exporting to CSV",
          description: [
            { type: "text", content: "Write a PowerShell command for Exporting to CSV." }
          ],
          starterCode: "",
          solutionCode: "$data | Export-Csv -Path C:\\audit.csv -NoTypeInformation",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$data"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-2",
    title: "Log Parsing Tool",
    icon: "file-text",
    desc: "Parse and analyze log files.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Reading Event Logs",
        chapterTitle: "Log Parsing Tool",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Reading Event Logs. Getting event log entries." },
          { type: "code", language: "powershell", content: "Get-EventLog -LogName System -Newest 50" }
        ],
        challenge: {
          title: "Practice: Reading Event Logs",
          description: [
            { type: "text", content: "Write a PowerShell command for Reading Event Logs." }
          ],
          starterCode: "",
          solutionCode: "Get-EventLog -LogName System -Newest 50",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-EventLog"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-2-l2",
        title: "Filtering Errors",
        chapterTitle: "Log Parsing Tool",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Filtering Errors. Extracting only Error entries." },
          { type: "code", language: "powershell", content: "Get-EventLog -LogName System -EntryType Error" }
        ],
        challenge: {
          title: "Practice: Filtering Errors",
          description: [
            { type: "text", content: "Write a PowerShell command for Filtering Errors." }
          ],
          starterCode: "",
          solutionCode: "Get-EventLog -LogName System -EntryType Error",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-EventLog"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "User Onboarding",
    icon: "user-plus",
    desc: "Automate user creation.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "Creating the Template",
        chapterTitle: "User Onboarding",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Creating the Template. Defining a user template." },
          { type: "code", language: "powershell", content: "$user = @{Name='Jane'; Department='IT'}" }
        ],
        challenge: {
          title: "Practice: Creating the Template",
          description: [
            { type: "text", content: "Write a PowerShell command for Creating the Template." }
          ],
          starterCode: "",
          solutionCode: "$user = @{Name='Jane'; Department='IT'}",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$user"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Bulk Provisioning",
        chapterTitle: "User Onboarding",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Bulk Provisioning. Reading from CSV to create users." },
          { type: "code", language: "powershell", content: "Import-Csv users.csv | ForEach-Object { New-ADUser -Name $_.Name }" }
        ],
        challenge: {
          title: "Practice: Bulk Provisioning",
          description: [
            { type: "text", content: "Write a PowerShell command for Bulk Provisioning." }
          ],
          starterCode: "",
          solutionCode: "Import-Csv users.csv | ForEach-Object { New-ADUser -Name $_.Name }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Import-Csv"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Advanced API Integration",
    icon: "link",
    desc: "Working with REST APIs.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Invoke-RestMethod",
        chapterTitle: "Advanced API Integration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Invoke-RestMethod. Calling a REST API." },
          { type: "code", language: "powershell", content: "Invoke-RestMethod -Uri 'https://api.github.com/users'" }
        ],
        challenge: {
          title: "Practice: Invoke-RestMethod",
          description: [
            { type: "text", content: "Write a PowerShell command for Invoke-RestMethod." }
          ],
          starterCode: "",
          solutionCode: "Invoke-RestMethod -Uri 'https://api.github.com/users'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Invoke-RestMethod"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "Parsing JSON Responses",
        chapterTitle: "Advanced API Integration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Parsing JSON Responses. Handling JSON data." },
          { type: "code", language: "powershell", content: "$response.data[0].name" }
        ],
        challenge: {
          title: "Practice: Parsing JSON Responses",
          description: [
            { type: "text", content: "Write a PowerShell command for Parsing JSON Responses." }
          ],
          starterCode: "",
          solutionCode: "$response.data[0].name",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["$response.data[0].name"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
];

export const POWERSHELLPROJECTS_LESSONS = POWERSHELLPROJECTS_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLPROJECTS_TOTAL_XP = POWERSHELLPROJECTS_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
