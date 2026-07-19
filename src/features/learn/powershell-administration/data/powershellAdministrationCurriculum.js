export const POWERSHELLADMINISTRATION_CHAPTERS = [
  {
    id: "ch-1",
    title: "WMI and CIM",
    icon: "cpu",
    desc: "Managing systems via WMI and CIM.",
    lessons: [
      {
        id: "ch-1-l1",
        title: "Introduction to WMI",
        chapterTitle: "WMI and CIM",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Introduction to WMI. Understand Windows Management Instrumentation basics." },
          { type: "code", language: "powershell", content: "Get-WmiObject -Class Win32_OperatingSystem" }
        ],
        challenge: {
          title: "Practice: Introduction to WMI",
          description: [
            { type: "text", content: "Write a PowerShell command for Introduction to WMI." }
          ],
          starterCode: "",
          solutionCode: "Get-WmiObject -Class Win32_OperatingSystem",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Get-WmiObject"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-1-l2",
        title: "Using CIM Cmdlets",
        chapterTitle: "WMI and CIM",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Using CIM Cmdlets. Modern management with Common Information Model." },
          { type: "code", language: "powershell", content: "Get-CimInstance -ClassName Win32_ComputerSystem" }
        ],
        challenge: {
          title: "Practice: Using CIM Cmdlets",
          description: [
            { type: "text", content: "Write a PowerShell command for Using CIM Cmdlets." }
          ],
          starterCode: "",
          solutionCode: "Get-CimInstance -ClassName Win32_ComputerSystem",
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
    ]
  },
  {
    id: "ch-2",
    title: "Active Directory",
    icon: "users",
    desc: "Managing AD with PowerShell.",
    lessons: [
      {
        id: "ch-2-l1",
        title: "Managing Users",
        chapterTitle: "Active Directory",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Managing Users. Create and modify AD Users." },
          { type: "code", language: "powershell", content: "New-ADUser -Name 'JohnDoe'" }
        ],
        challenge: {
          title: "Practice: Managing Users",
          description: [
            { type: "text", content: "Write a PowerShell command for Managing Users." }
          ],
          starterCode: "",
          solutionCode: "New-ADUser -Name 'JohnDoe'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["New-ADUser"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-2-l2",
        title: "Managing Groups",
        chapterTitle: "Active Directory",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Managing Groups. Working with AD Groups." },
          { type: "code", language: "powershell", content: "Add-ADGroupMember -Identity 'IT' -Members 'JohnDoe'" }
        ],
        challenge: {
          title: "Practice: Managing Groups",
          description: [
            { type: "text", content: "Write a PowerShell command for Managing Groups." }
          ],
          starterCode: "",
          solutionCode: "Add-ADGroupMember -Identity 'IT' -Members 'JohnDoe'",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Add-ADGroupMember"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-3",
    title: "Remote Management",
    icon: "globe",
    desc: "PowerShell Remoting concepts.",
    lessons: [
      {
        id: "ch-3-l1",
        title: "Enable PS Remoting",
        chapterTitle: "Remote Management",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Enable PS Remoting. Configure systems for remote management." },
          { type: "code", language: "powershell", content: "Enable-PSRemoting -Force" }
        ],
        challenge: {
          title: "Practice: Enable PS Remoting",
          description: [
            { type: "text", content: "Write a PowerShell command for Enable PS Remoting." }
          ],
          starterCode: "",
          solutionCode: "Enable-PSRemoting -Force",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Enable-PSRemoting"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-3-l2",
        title: "Invoke-Command",
        chapterTitle: "Remote Management",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Invoke-Command. Running commands on remote systems." },
          { type: "code", language: "powershell", content: "Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process }" }
        ],
        challenge: {
          title: "Practice: Invoke-Command",
          description: [
            { type: "text", content: "Write a PowerShell command for Invoke-Command." }
          ],
          starterCode: "",
          solutionCode: "Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Invoke-Command"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
  {
    id: "ch-4",
    title: "Advanced Administration",
    icon: "shield",
    desc: "Pro-level administration techniques.",
    lessons: [
      {
        id: "ch-4-l1",
        title: "Desired State Configuration",
        chapterTitle: "Advanced Administration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Desired State Configuration. Introduction to DSC." },
          { type: "code", language: "powershell", content: "Configuration WebServer { Node localhost { WindowsFeature IIS { Ensure='Present'; Name='Web-Server' } } }" }
        ],
        challenge: {
          title: "Practice: Desired State Configuration",
          description: [
            { type: "text", content: "Write a PowerShell command for Desired State Configuration." }
          ],
          starterCode: "",
          solutionCode: "Configuration WebServer { Node localhost { WindowsFeature IIS { Ensure='Present'; Name='Web-Server' } } }",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["Configuration"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
      {
        id: "ch-4-l2",
        title: "Just Enough Administration",
        chapterTitle: "Advanced Administration",
        xp: 20,
        theory: [
          { type: "text", content: "Welcome to Just Enough Administration. JEA Concepts." },
          { type: "code", language: "powershell", content: "New-PSSessionConfigurationFile -Path .\jea.pssc" }
        ],
        challenge: {
          title: "Practice: Just Enough Administration",
          description: [
            { type: "text", content: "Write a PowerShell command for Just Enough Administration." }
          ],
          starterCode: "",
          solutionCode: "New-PSSessionConfigurationFile -Path .\jea.pssc",
          tests: [
            {
              id: "t1",
              label: "Uses valid syntax",
              keywords: ["New-PSSessionConfigurationFile"],
              hint: "Make sure you use the correct cmdlet."
            }
          ]
        }
      },
    ]
  },
];

export const POWERSHELLADMINISTRATION_LESSONS = POWERSHELLADMINISTRATION_CHAPTERS.flatMap(ch => ch.lessons);
export const POWERSHELLADMINISTRATION_TOTAL_XP = POWERSHELLADMINISTRATION_LESSONS.reduce((sum, lesson) => sum + lesson.xp, 0);
