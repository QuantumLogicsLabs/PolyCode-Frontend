// Starter code per language for CodePlayground
export const STARTERS = {
  javascript: `// JavaScript — runs in a sandboxed iframe
console.log("Hello, PolyCode! 🚀");

const nums = [1, 2, 3, 4, 5];
const sum  = nums.reduce((a, b) => a + b, 0);
console.log("Sum:", sum);

// Objects
const user = { name: "Dev", lang: "JS" };
console.log("User:", JSON.stringify(user));`,

  typescript: `// TypeScript — transpiled via Babel
interface User {
  name: string;
  score: number;
}

const greet = (u: User): string =>
  \`Hello \${u.name}! Score: \${u.score}\`;

const u: User = { name: "PolyCode", score: 100 };
console.log(greet(u));`,

  python: `# Python — Pyodide WebAssembly
print("Hello, PolyCode! 🐍")

# Fibonacci
def fib(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("Fib:", list(fib(10)))

# List comprehension
squares = [x**2 for x in range(1, 6)]
print("Squares:", squares)`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #0d1117;
           color: #e6edf3; padding: 2rem; }
    h1   { color: #58a6ff; margin-bottom: 1rem; }
    .btn { background: #238636; color: #fff; border: none;
           padding: .5rem 1.2rem; border-radius: 6px; cursor: pointer;
           font-size: 1rem; transition: background .2s; }
    .btn:hover { background: #2ea043; }
    #out { margin-top: 1rem; color: #3fb950; font-weight: bold; }
  </style>
</head>
<body>
  <h1>🌐 Live HTML Preview</h1>
  <p style="margin-bottom:1rem">Edit and run to see changes instantly!</p>
  <button class="btn" onclick="document.getElementById('out').textContent='Clicked! ✓'">
    Click me
  </button>
  <div id="out"></div>
</body>
</html>`,

  css: `/* CSS Preview — common elements are rendered automatically */

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f4f8;
  color: #1a202c;
  padding: 2rem;
}

h1 { color: #5a67d8; border-bottom: 3px solid #5a67d8; padding-bottom: .3em; }
h2 { color: #805ad5; }

p { line-height: 1.7; margin-bottom: 1em; }

a { color: #5a67d8; text-decoration: none; }
a:hover { text-decoration: underline; }

button {
  background: #5a67d8;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform .1s;
}
button:hover { transform: translateY(-2px); }

ul { padding-left: 1.5rem; }
li { margin-bottom: .5em; }

.box {
  background: white;
  border: 2px solid #5a67d8;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 20px rgba(90,103,216,.15);
}`,

  sql: `-- SQL — SQLite via sql.js (WebAssembly)
CREATE TABLE students (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  grade TEXT,
  score INTEGER
);

INSERT INTO students VALUES (1, 'Alice',   'A', 95);
INSERT INTO students VALUES (2, 'Bob',     'B', 82);
INSERT INTO students VALUES (3, 'Carol',   'A', 91);
INSERT INTO students VALUES (4, 'Dave',    'C', 74);
INSERT INTO students VALUES (5, 'Eve',     'A', 98);

-- Top students
SELECT name, grade, score
FROM   students
WHERE  score >= 90
ORDER  BY score DESC;`,

  json: `{
  "project": "PolyCode",
  "version": "2.0.0",
  "features": [
    "Multi-language IDE",
    "Browser-only execution",
    "Monaco Editor",
    "Live HTML preview"
  ],
  "languages": {
    "browser": ["JS", "TS", "Python", "HTML", "CSS", "SQL", "JSON", "Markdown"],
    "server":  ["C", "C++", "Java", "Go", "Rust"]
  },
  "stats": {
    "docs": 1000,
    "languages": 20
  }
}`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="1">
    <title>Clean Code</title>
    <author>Robert C. Martin</author>
    <year>2008</year>
    <genre>Programming</genre>
  </book>
  <book id="2">
    <title>The Pragmatic Programmer</title>
    <author>Andrew Hunt</author>
    <year>1999</year>
    <genre>Programming</genre>
  </book>
</library>`,

  markdown: `# PolyCode IDE 🚀

> Write, run, and explore in **any language**, right in the browser.

## Features

- **Monaco Editor** — same editor as VS Code
- **Python via Pyodide** — full CPython in WebAssembly
- **SQL via sql.js** — SQLite in the browser
- **Live HTML preview** — see your pages instantly
- **Editable code blocks** — tweak and re-run any example

## Code Example

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

---

*Built for PolyCode — March 2026*`,

  brainfuck: `++++++++++
[
  >+++++++>++++++++++>+++>+<<<<-
]
>++.
>+.
++++++.
.
++.
>++.
<<+++++++++++++++.
>.
++.
------.
--------.
>+.
>.`,

  regex: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
---
test@example.com
invalid-email
hello@world.org
notanemail
user.name+tag@domain.co.uk`,

  php: `<?php
// Basic PHP simulation
$name = "PolyCode";
$version = 2;

echo "Hello from PHP!\\n";
echo "Project: " . $name . "\\n";
echo "Version: " . $version . "\\n";

// Array simulation
$langs = array("PHP", "Python", "JS");
foreach ($langs as $lang) {
    echo "Language: " . $lang . "\\n";
}
?>`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    // Fibonacci
    int n = 10, a = 0, b = 1;
    printf("Fibonacci: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", a);
        int tmp = a + b;
        a = b;
        b = tmp;
    }
    printf("\\n");
    return 0;
}`,

  cpp: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::cout << "Hello from C++!" << std::endl;
    
    std::vector<int> v = {5, 2, 8, 1, 9, 3};
    std::sort(v.begin(), v.end());
    
    std::cout << "Sorted: ";
    for (int x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
        
        // Fibonacci
        int a = 0, b = 1;
        System.out.print("Fibonacci: ");
        for (int i = 0; i < 10; i++) {
            System.out.print(a + " ");
            int tmp = a + b;
            a = b;
            b = tmp;
        }
        System.out.println();
    }
}`,

  go: `package main

import "fmt"

func fibonacci(n int) []int {
    result := make([]int, n)
    a, b := 0, 1
    for i := 0; i < n; i++ {
        result[i] = a
        a, b = b, a+b
    }
    return result
}

func main() {
    fmt.Println("Hello from Go!")
    fmt.Println("Fibonacci:", fibonacci(10))
}`,

  rust: `fn fibonacci(n: u32) -> Vec<u64> {
    let mut result = Vec::new();
    let (mut a, mut b) = (0u64, 1u64);
    for _ in 0..n {
        result.push(a);
        let tmp = a + b;
        a = b;
        b = tmp;
    }
    result
}

fn main() {
    println!("Hello from Rust! 🦀");
    println!("Fibonacci: {:?}", fibonacci(10));
}`,

  bash: `#!/bin/bash
# Bash script example

echo "Hello from Bash!"

# Variables
NAME="PolyCode"
VERSION=2

echo "Project: $NAME v$VERSION"

# Loop
for i in {1..5}; do
    echo "Iteration $i"
done

# Conditional
if [ $VERSION -ge 2 ]; then
    echo "Running latest version!"
fi`,

  ruby: `# Ruby example
puts "Hello from Ruby! 💎"

# Array methods
nums = [1, 2, 3, 4, 5]
puts "Sum: #{nums.sum}"
puts "Squares: #{nums.map { |n| n**2 }}"

# Fibonacci
def fib(n)
  return n if n <= 1
  fib(n-1) + fib(n-2)
end

puts "Fibonacci: #{(0..9).map { |i| fib(i) }}"`,

  kotlin: `fun fibonacci(n: Int): List<Int> {
    val result = mutableListOf<Int>()
    var a = 0; var b = 1
    repeat(n) {
        result.add(a)
        val tmp = a + b; a = b; b = tmp
    }
    return result
}
fun main() {
    println("Hello from Kotlin! 🎯")
    println("Fibonacci: " + fibonacci(10))
} `,

  swift: `import Foundation

func fibonacci(_ n: Int) -> [Int] {
    var result = [Int]()
    var (a, b) = (0, 1)
    for _ in 0..<n {
        result.append(a)
        (a, b) = (b, a + b)
    }
    return result
}

print("Hello from Swift! 🍎")
print("Fibonacci: \\(fibonacci(10))")`,

  csharp: `using System;
using System.Collections.Generic;

class Program {
    static List<int> Fibonacci(int n) {
        var result = new List<int>();
        int a = 0, b = 1;
        for (int i = 0; i < n; i++) {
            result.Add(a);
            (a, b) = (b, a + b);
        }
        return result;
    }
    
    static void Main() {
        Console.WriteLine("Hello from C#! 🔵");
        Console.WriteLine("Fibonacci: " + string.Join(", ", Fibonacci(10)));
    }
}`,

  r: `# R example
cat("Hello from R! 📊\\n")

# Fibonacci
fib <- function(n) {
  result <- numeric(n)
  a <- 0; b <- 1
  for (i in 1:n) {
    result[i] <- a
    tmp <- a + b; a <- b; b <- tmp
  }
  result
}

cat("Fibonacci:", fib(10), "\\n")

# Statistics
data <- c(23, 45, 12, 67, 34, 89, 11)
cat("Mean:", mean(data), "\\n")
cat("SD:  ", sd(data), "\\n")`,

  lua: `-- Lua example
print("Hello from Lua! 🌙")

-- Fibonacci
local function fib(n)
    local a, b = 0, 1
    local result = {}
    for i = 1, n do
        table.insert(result, a)
        a, b = b, a + b
    end
    return result
end

local fibs = fib(10)
io.write("Fibonacci: ")
for _, v in ipairs(fibs) do
    io.write(v .. " ")
end
print()`,

  powershell: `# PowerShell example
Write-Host "Hello from PowerShell! 🔷"

# Variables
$name = "PolyCode"
$version = 2
Write-Host "Project: $name v$version"

# Array and loop
$languages = @("PowerShell", "Python", "JavaScript")
foreach ($lang in $languages) {
    Write-Host "Language: $lang"
}

# Fibonacci
function Get-Fibonacci($n) {
    $a, $b = 0, 1
    0..($n-1) | ForEach-Object {
        $a; $a, $b = $b, ($a + $b)
    }
}

Write-Host "Fibonacci: $(Get-Fibonacci 10)"`,

  batch: `@echo off
REM Batch script example

echo Hello from Batch! 🪟
echo.

SET NAME=PolyCode
SET VERSION=2

echo Project: %NAME%
echo Version: %VERSION%

echo.
echo Counting:
FOR /L %%i IN (1,1,5) DO echo Count: %%i`,

  dart: `void main() {
  print('Hello from Dart! 🎯');
  
  // Fibonacci
  List<int> fibonacci(int n) {
    var result = <int>[];
    var a = 0, b = 1;
    for (var i = 0; i < n; i++) {
      result.add(a);
      var tmp = a + b; a = b; b = tmp;
    }
    return result;
  }
  
  print('Fibonacci: \${fibonacci(10)}');
}`,

  perl: `#!/usr/bin/perl
use strict;
use warnings;

print "Hello from Perl! 🐪\\n";

# Fibonacci
sub fibonacci {
    my ($n) = @_;
    my @result;
    my ($a, $b) = (0, 1);
    for (1..$n) {
        push @result, $a;
        ($a, $b) = ($b, $a + $b);
    }
    return @result;
}

my @fibs = fibonacci(10);
print "Fibonacci: @fibs\\n";`,

  scala: `object Main extends App {
  println("Hello from Scala! ⭕")
  
  def fibonacci(n: Int): List[Int] = {
    def go(a: Int, b: Int, count: Int): List[Int] =
      if (count == 0) Nil
      else a :: go(b, a + b, count - 1)
    go(0, 1, n)
  }
  
  println(s"Fibonacci: \${fibonacci(10)}")
}`,
};
