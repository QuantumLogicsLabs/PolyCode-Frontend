// PolyCode - C++ Data Structures full curriculum
// 9 chapters - 43 lessons - every lesson has theory + quizzes + an in-browser
// C++ challenge (a few concept lessons use compileOptional keyword checks).
// YouTube links: edit cppDataStructuresVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { CPP_DATA_STRUCTURES_VIDEO_LINKS } from "./cppDataStructuresVideoLinks";

const ACCENT = "#8b5cf6";
const C_AMBER = "#f59e0b";
const C_GREEN = "#22c55e";
const C_RED = "#ef4444";
const C_SKY = "#0ea5e9";
const C_PINK = "#ec4899";

function text(content, codeBlock = null) {
  if (codeBlock) {
    return { type: "text", content, code: { lang: "cpp", ...codeBlock } };
  }
  return { type: "text", content };
}

function quiz(question, options, answer, explanation) {
  return { type: "quiz", question, options, answer, explanation };
}

function callout(variant, content) {
  return { type: "callout", variant, content };
}

function diagram(title, nodes) {
  return { type: "diagram", title, nodes };
}

function objectives(items) {
  return { type: "objectives", items };
}

function scenario(title, content) {
  return { type: "scenario", title, content };
}

// Styled comparison table. `rows` is an array of ["Row label", cell, cell, ...].
function table(title, columns, rows, options = {}) {
  return {
    type: "table",
    title,
    columns,
    rows: rows.map((r) => ({ label: r[0], values: r.slice(1) })),
    showTotals: false,
    ...options,
  };
}

// Cell-grid visual. `rows` is an array of
// { label, values: [...], colLabels?: [...], okIndexes?: [...], missingIndexes?: [...] }.
function arrayViz(title, rows, footnote) {
  return { type: "array", title, rows, footnote };
}

const RAW_CPP_DATA_STRUCTURES_CHAPTERS = [
  {
    id: "complexity",
    title: "Complexity & the Machine Model",
    icon: "🧮",
    color: ACCENT,
    lessons: [
      {
        id: "cpp-ds-0-0",
        title: "Time and space: the two budgets",
        xp: 10,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Say what \"time\" and \"space\" mean when we talk about the cost of a program",
            "Read the common speed labels: O(1), O(n), O(n log n), O(n^2)",
            "Explain why we care how a program *grows*, not how many seconds it takes today",
          ]),
          text(
            "**Introduction:** Every program spends its life doing the same handful of chores: put some information somewhere, find it again, remove it, go through all of it. How *quick* those chores feel depends almost entirely on how you decided to keep the information in the first place. A **data structure** is simply a tidy way of keeping your information so the things you do most often stay fast - and every tidy way charges you in one of two currencies: **time** and **space**.\n\n**Real-life example:** Two ways to look up a friend's number in a thick paper phone book. One: start at page 1 and flip forward until you find it. Two: open it near the middle, notice whether you've gone too far, and jump again. Both work. But as the phone book gets fatter, the first way turns into a slog while the second barely slows down. This whole course is about choosing the second way on purpose.",
          ),
          text(
            "In this topic you will learn:\n\n- what **time** and **space** mean when we talk about the cost of a program\n- why we describe a cost by the way it *grows*, not in seconds\n- how to read the everyday speed labels: O(1), O(log n), O(n), O(n log n), O(n^2)\n- why `5n + 100` is simply \"O(n)\", and why we normally quote the worst case",
          ),
          scenario(
            "Think of it like this",
            "You are packing for a trip. One big rucksack is light to carry, but every time you want your charger you have to dig through the whole thing. Ten labelled pouches let you grab the charger instantly - but they weigh more and eat up more room in the boot. Neither choice is \"correct\". One is spending space to save time; the other is spending time to save space. Every structure in this course is a different point on that same trade, and Big-O is just the shared language for saying where a structure sits.",
          ),
          text(
            "Every choice costs you one of two things:\n\n- **Time** - how many little steps the computer has to do.\n- **Space** - how much extra memory it needs while doing them.\n\nVery often you can trade one for the other: spend more memory to go faster, or use less memory and go slower. Knowing that trade is most of the skill.",
          ),
          text(
            "We don't measure cost in seconds, because seconds depend on the machine, the day, and whatever else is running. Instead we ask one question: **when the amount of data doubles, what happens to the work?** The shorthand for the answer is called **Big-O**, and you read it as \"grows like...\". The handful you'll see over and over:",
          ),
          text(
            "- **O(1)** - \"stays the same\". The work never changes, however much data there is. (Looking at the first item.)\n- **O(log n)** - grows *painfully slowly*. Double the data, add one step. (The phone-book jump.)\n- **O(n)** - \"in step\". Double the data, double the work. (Reading every item once.)\n- **O(n log n)** - a little worse than O(n). The speed of a good sort.\n- **O(n^2)** - double the data, *four times* the work. (Comparing every item with every other item.) Gets slow quickly.\n- **O(2^n)** - blows up. Only usable when the data is tiny.",
          ),
          diagram("If your data had 1,000,000 items, roughly how many steps?", [
            { id: "c1", label: "O(1)", color: C_GREEN, items: ["about 1 step", "instant"] },
            { id: "clog", label: "O(log n)", color: C_GREEN, items: ["about 20 steps", "still instant"] },
            { id: "cn", label: "O(n)", color: C_AMBER, items: ["about 1,000,000 steps", "a blink"] },
            { id: "cnl", label: "O(n log n)", color: C_AMBER, items: ["about 20,000,000 steps", "still fine"] },
            { id: "cn2", label: "O(n^2)", color: C_RED, items: ["about 1,000,000,000,000 steps", "minutes to hours"] },
          ]),
          text(
            "Two habits to pick up now. First, **we throw away the small stuff**: if something takes `5n + 100` steps we just call it **O(n)**, because once the data is large the `5` and the `100` stop mattering - only the *shape* of the growth does. Second, unless we say otherwise **we quote the worst case**: the slowest thing that could reasonably happen, so you're never caught out.",
          ),
          text(
            "**Space** is measured the same way. Turning a list around *in place* needs almost no extra room - **O(1)**. Making a full copy first needs room for every item - **O(n)**. Neither is \"bad\"; they're just different prices for the same result.",
          ),
          table(
            "A map of the whole course (typical everyday cost)",
            ["Jump to item #5", "Find a value", "Add one", "Remove one", "Kept in order?"],
            [
              ["Plain array", "instant", "slow", "slow", "slow", "by position"],
              ["Growable array", "instant", "slow", "fast*", "slow", "by position"],
              ["Linked list", "slow", "slow", "fast@", "fast@", "as you inserted"],
              ["Hash table", "-", "fast", "fast", "fast", "no order"],
              ["Balanced tree", "medium", "medium", "medium", "medium", "sorted"],
              ["Heap", "-", "slow", "medium", "medium", "smallest / largest only"],
            ],
            { rowLabelHeader: "Structure", footnote: "\"fast\" = O(1), \"medium\" = O(log n), \"slow\" = O(n).  * on average, when adding at the end.  @ only once you're already holding the spot." },
          ),
          callout(
            "tip",
            "Don't try to memorise this table. By the end of the course you'll be able to rebuild it from scratch, because you'll understand *why* every cell says what it says.",
          ),
          quiz(
            "A recipe app takes 5n + 300 steps to load n recipes. What's its Big-O?",
            ["O(5n)", "O(n)", "O(300)", "O(n^2)"],
            1,
            "Drop the multiplier and the constant - what's left is the shape: O(n). Double the recipes, roughly double the work.",
          ),
          quiz(
            "Your data doubles from 1,000 items to 2,000. An O(n^2) task that did 1,000,000 units of work now does about how much?",
            ["2,000,000", "4,000,000", "1,000,000", "3,000,000"],
            1,
            "O(n^2) means you square the size. Doubling the input multiplies the work by four - that's why quadratic tasks fall over on big data.",
          ),
        ],
        challenge: {
          title: "Count the steps",
          description:
            "Return how many basic steps each loop shape runs for input size n: `linearSteps` for one pass, `quadraticSteps` for a nested pass.",
          starterCode: `#include <iostream>
using namespace std;

// One pass: for i in [0, n).
long long linearSteps(int n) {
    // TODO
    return 0;
}

// Nested pass: for i in [0, n), for j in [0, n).
long long quadraticSteps(int n) {
    // TODO
    return 0;
}

int main() {
    cout << linearSteps(1000) << endl;     // 1000
    cout << quadraticSteps(1000) << endl;  // 1000000
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

long long linearSteps(int n) {
    return n;
}

long long quadraticSteps(int n) {
    return (long long)n * n;
}

int main() {
    cout << linearSteps(1000) << endl;     // 1000
    cout << quadraticSteps(1000) << endl;  // 1000000
    return 0;
}`,
          tests: [
            { id: 1, label: "linearSteps returns n", keywords: [{ pattern: "return n;" }], hint: "One pass over n items is n steps." },
            { id: 2, label: "quadraticSteps returns n * n", keywords: [{ pattern: "n \\* n" }], hint: "A nested pass is n * n steps." },
          ],
        },
      },
      {
        id: "cpp-ds-0-1",
        title: "How to guess a program's speed by looking at it",
        xp: 14,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Work out a program's speed by asking how often its repeated part runs",
            "Tell apart steps that run one-after-another from steps that run one-inside-another",
            "See with your own eyes why n^2 + n + 1 is simply \"O(n^2)\"",
          ]),
          text(
            "**Introduction:** You do not need to run a program to get a feel for how fast it is. Almost all of the cost lives in the **loops** - and a loop is just \"do this once for each item\". So you can usually size up a piece of code by asking one question: *how many times does the repeated part actually run?* Answer that, and the Big-O falls out on its own.\n\n**Real-life example:** A teacher marking homework. Reading each of 30 books once is one pass through the pile. But asking every pupil to swap books with every other pupil for peer marking is 30 x 30 handovers - the pile did not get bigger, the *pairing up* did. Same class, wildly different afternoon.",
          ),
          text(
            "In this topic you will learn:\n\n- how to read a program's speed straight off its loops\n- the difference between steps that run **one after another** and steps that run **one inside another**\n- why a loop that halves its data gives you `log n`\n- why `n^2 + n + 1` is simply \"O(n^2)\" - with the numbers to prove it",
          ),
          scenario(
            "Think of it like this",
            "Two chores in a house with n rooms. Chore one: sweep each room once - you walk the house a single time, so the work rises exactly in step with the number of rooms. Chore two: in every room, check the light switch against every other room's fuse - now you are pairing rooms up, and adding one room adds a whole extra lap. Chore one is O(n); chore two is O(n^2). Nothing about the rooms changed. What changed is whether the second loop sits *beside* the first or *inside* it.",
          ),
          text(
            "So the whole method is: find the repeated part, and count how often it runs.",
          ),
          text(
            "- Go through the list once -> **O(n)** (n items, one visit each).\n- For every item, go through the whole list again -> that's a loop **inside** a loop -> **O(n x n) = O(n^2)**.\n- Each step throws away half of what's left -> **O(log n)** (you finish in very few steps).\n- Do one full pass, then a second, *separate* full pass -> **O(n) + O(n)**, which is still just **O(n)** (two passes is a constant; we drop it).",
          ),
          text(
            "One trap: a step that *hands work off* to something else has to count that work too. \"For each of n customers, search a list of n orders\" is n searches of size n -> **O(n^2)**, even though on the page it looks like one plain loop.",
          ),
          diagram("The four shapes, in plain words", [
            { id: "one", label: "O(1) - stays the same", color: C_GREEN, items: ["A fixed amount of work", "More data changes nothing", "\"look at the first item\""] },
            { id: "n", label: "O(n) - in step", color: C_SKY, items: ["One unit of work per item", "Twice the data, twice the work", "\"visit every item once\""] },
            { id: "n2", label: "O(n^2) - the pair-up", color: C_RED, items: ["One unit per PAIR of items", "Twice the data, FOUR times the work", "\"compare everything with everything\""] },
            { id: "logn", label: "O(log n) - the halving", color: C_AMBER, items: ["Halve what's left each step", "Twice the data, one extra step", "\"the phone-book jump\""] },
          ]),
          text(
            "**Why do we throw away the smaller pieces?** Suppose a task really takes `n^2 + n + 1` steps. Look at what each part contributes as the data grows:",
          ),
          table(
            "n^2 + n + 1 : who actually does the work?",
            ["the n^2 part", "the n part", "the +1", "grand total", "n^2's share"],
            [
              ["10 items", "100", "10", "1", "111", "90%"],
              ["100 items", "10,000", "100", "1", "10,101", "99.0%"],
              ["1,000 items", "1,000,000", "1,000", "1", "1,001,001", "99.9%"],
              ["1,000,000 items", "a trillion", "a million", "1", "~a trillion", "99.9999%"],
            ],
            { rowLabelHeader: "Data size", highlightRows: [3], footnote: "The n^2 part swallows everything else. So we just say O(n^2) and forget the rest - even 3n^2 + 500n + 9 is still O(n^2)." },
          ),
          table(
            "The same idea as a picture: work done at each size",
            ["10", "100", "1,000", "1,000,000"],
            [
              ["O(1)", "1", "1", "1", "1"],
              ["O(log n)", "3", "7", "10", "20"],
              ["O(n)", "10", "100", "1,000", "1,000,000"],
              ["O(n log n)", "33", "664", "9,966", "~20 million"],
              ["O(n^2)", "100", "10,000", "1,000,000", "a trillion"],
              ["O(2^n)", "1,024", "huge", "off the chart", "off the chart"],
            ],
            { rowLabelHeader: "Shape", highlightRows: [4, 5], footnote: "O(n log n) and gentler stay usable at any size. O(n^2) is a warning past ~10,000 items. O(2^n) only for tiny inputs." },
          ),
          callout(
            "tip",
            "\"log n\" means: how many times can you halve n before you reach 1? For a million, that's about 20. The exact base doesn't matter for Big-O, so everyone just writes \"log n\".",
          ),
          quiz(
            "\"For each of 100 users, check all 100 of their photos.\" How many photo-checks, and what shape?",
            ["100, O(n)", "200, O(n)", "10,000, O(n^2)", "100, O(log n)"],
            2,
            "100 users x 100 photos = 10,000 checks. A loop inside a loop is O(n^2).",
          ),
          quiz(
            "Code makes one full pass over the list, then a completely separate second full pass. Overall shape?",
            ["O(n^2)", "O(2n), which we call O(n)", "O(n log n)", "O(1)"],
            1,
            "Passes that run one-after-another add: n + n = 2n. We drop the 2, so it's O(n). Only loops nested inside each other multiply.",
          ),
        ],
        challenge: {
          title: "Label the complexity",
          description:
            "Replace each `TODO` with the Big-O of that snippet: use exactly `O(n)`, `O(n^2)`, and `O(log n)`.",
          compileOptional: true,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    int n = 16;

    for (int i = 0; i < n; i++) cout << i << " ";
    // Snippet 1 is TODO

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cout << "*";
    // Snippet 2 is TODO

    for (int k = n; k > 1; k /= 2) cout << k << " ";
    // Snippet 3 is TODO

    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    int n = 16;

    for (int i = 0; i < n; i++) cout << i << " ";
    // Snippet 1 is O(n)

    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cout << "*";
    // Snippet 2 is O(n^2)

    for (int k = n; k > 1; k /= 2) cout << k << " ";
    // Snippet 3 is O(log n)

    return 0;
}`,
          tests: [
            { id: 1, label: "Single loop labelled O(n)", keywords: [{ pattern: "Snippet 1 is O\\(n\\)" }], hint: "One pass to n." },
            { id: 2, label: "Nested loop labelled O(n^2)", keywords: [{ pattern: "Snippet 2 is O\\(n\\^2\\)" }], hint: "Loop inside a loop." },
            { id: 3, label: "Halving loop labelled O(log n)", keywords: [{ pattern: "Snippet 3 is O\\(log n\\)" }], hint: "k /= 2 each step." },
          ],
        },
      },
      {
        id: "cpp-ds-0-1a",
        title: "Counting the exact steps: f(n) before Big-O",
        xp: 14,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Derive the exact operation count f(n) for a piece of code, line by line",
            "Reduce f(n) to Big-O with the standard rules",
            "Handle a triangular nested loop with a summation instead of a guess",
            "Check a derivation by counting operations at run time",
          ]),
          text(
            "**Introduction:** Big-O is the headline; **f(n)** is the receipt behind it. Where Big-O says \"this grows like n squared\", f(n) says exactly how many basic steps the code performs for an input of size n. Eyeballing the shape off a loop works most of the time - but when the loops are lopsided, when you have to *justify* the answer to somebody, or when two versions look equally fast, you work out f(n) first and simplify it afterwards.\n\n**Real-life example:** A restaurant bill. \"About fifty pounds\" is the Big-O - good enough to decide whether you can afford it. The itemised receipt is f(n) - it tells you the starter was £6 and the wine was £24, which is the only way to find out *where* the money actually went.",
          ),
          text(
            "In this topic you will learn:\n\n- how to count the exact steps of a program, line by line, to get **f(n)**\n- the five rules that turn f(n) into Big-O\n- how to handle a **triangular** nested loop with a sum instead of a guess\n- how to make the program count its own steps so you can check your working",
          ),
          scenario(
            "Think of it like this",
            "Imagine you are asked \"how long does the school run take?\" The Big-O answer is \"about twenty minutes\" - it tells you whether to leave now or after breakfast. The f(n) answer breaks it down: two minutes to get everyone in the car, four minutes per stop, one minute to park. That breakdown is what lets you notice that adding a third child adds four minutes, not twenty. Big-O tells you the shape of the cost; f(n) tells you its actual size - and when two programs share the same shape, f(n) is the only thing left that can tell them apart.",
          ),
          text(
            "Count one step per assignment, comparison, or arithmetic statement. Then ask of every line: **how many times does this line actually run?**",
            {
              label: "Deriving f(n) line by line",
              content: `int sum = 0;                 // 1 step, once
for (int i = 0; i < n; i++)  // the body below runs n times
    sum += a[i];             // 1 step per iteration -> n
cout << sum;                 // 1 step, once

// f(n) = 1 + n + 1 = n + 2   ->   O(n)`,
              output: `66

With a[] = {4, 8, 15, 16, 23}, so n = 5:
  1 step    int sum = 0;
  5 steps   sum += a[i];   (once per element)
  1 step    cout << sum;
  f(5) = 7 = n + 2`,
            },
          ),
          text(
            "Then reduce, with these five rules:\n\n- Constant factors are dropped: `5n` becomes `O(n)`.\n- Lower-order terms are dropped: `n^2 + 3n + 7` becomes `O(n^2)`.\n- Blocks that run one after another **add**: `O(n)` then `O(m)` is `O(n + m)`.\n- Loops nested inside each other **multiply**: an `O(n)` loop inside an `O(m)` loop is `O(n x m)`.\n- A loop variable that doubles or halves contributes a `log n` factor.",
          ),
          table(
            "The growth rates worth recognising on sight",
            ["Name", "Where it comes from"],
            [
              ["O(1)", "Constant", "Swapping two pointers; indexing an array"],
              ["O(log n)", "Logarithmic", "The loop variable doubles or halves"],
              ["O(n)", "Linear", "A single pass over n elements"],
              ["O(n log n)", "Linearithmic", "Efficient sorting"],
              ["O(n^2)", "Quadratic", "A nested pass over the same n elements"],
            ],
            { rowLabelHeader: "Big-O", highlightRows: [4] },
          ),
          text(
            "**Not every nested loop is n x n.** When the inner loop stops at `i` rather than `n`, the body runs 0 times, then 1, then 2, and so on. That is not something to eyeball - you add it up:",
            {
              label: "The triangular loop",
              content: `for (int i = 0; i < n; i++)
    for (int j = 0; j < i; j++)
        cout << i << j;      // runs 0 + 1 + 2 + ... + (n-1) times

// f(n) = 0 + 1 + ... + (n-1) = n(n-1)/2 = n^2/2 - n/2   ->   O(n^2)`,
              output: `102021303132

With n = 4 the body ran 6 times, printing one i-j pair each time:
0 + 1 + 2 + 3 = 4 x 3 / 2 = 6`,
            },
          ),
          table(
            "Half the work, same Big-O",
            ["Full nested loop: n^2", "Triangular loop: n(n-1)/2"],
            [
              ["n = 10", "100", "45"],
              ["n = 100", "10,000", "4,950"],
              ["n = 1,000", "1,000,000", "499,500"],
              ["n = 1,000,000", "a trillion", "about half a trillion"],
            ],
            {
              rowLabelHeader: "Data size",
              highlightRows: [3],
              footnote: "The 1/2 is a constant factor, so both columns are O(n^2) - but it is a real halving on the clock. Big-O gives you the shape; f(n) gives you the size.",
            },
          ),
          text(
            "The cheapest way to check a derivation is to make the program count for you: add a counter, increment it wherever you claimed a step happens, and compare the measurement against your formula. Press **Run**:",
            {
              label: "Verify f(n) at run time",
              content: `#include <iostream>
using namespace std;

int main() {
    for (int n : {4, 10, 100}) {
        long long ops = 0;

        for (int i = 0; i < n; i++)
            for (int j = 0; j < i; j++)
                ops++;                     // count every visit

        cout << "n = " << n << "  measured " << ops
             << "  predicted " << (long long)n * (n - 1) / 2 << "\\n";
    }
    return 0;
}`,
            },
          ),
          callout(
            "tip",
            "If the measured count and your f(n) disagree, one of them is wrong - and it is almost always the derivation. A counter costs two lines and settles the argument.",
          ),
          callout(
            "info",
            "Two functions can share a Big-O and still differ by a constant factor you can feel: `n^2/2` against `n^2`, or one cache-friendly pass against one that jumps around memory. Big-O is the first question, not the last one.",
          ),
          quiz(
            "`int sum = 0;` then a loop that runs n times doing one addition, then one `cout`. What is f(n)?",
            ["n", "n + 2", "2n", "n^2"],
            1,
            "1 for the initialisation, n for the additions, 1 for the print: f(n) = n + 2, which reduces to O(n).",
          ),
          quiz(
            "The triangular loop (inner condition `j < i`) with n = 1,000. Exactly how many times does the body run?",
            ["1,000,000", "499,500", "500,000", "1,000"],
            1,
            "n(n-1)/2 = 1000 x 999 / 2 = 499,500 - just under half of the full 1,000,000.",
          ),
          quiz(
            "One loop over n items, then a completely separate loop over m items. Complexity?",
            ["O(n x m)", "O(n + m)", "O(n^2)", "O(n log m)"],
            1,
            "Blocks that run one after another add. Only loops nested inside each other multiply.",
          ),
        ],
        challenge: {
          title: "Count the operations yourself",
          description:
            "Fill in `countOps` so it returns the exact number of times the inner body runs, and `predicted` so it returns the closed form n(n-1)/2. The two must agree for every n.",
          starterCode: `#include <iostream>
using namespace std;

long long countOps(int n) {
    long long ops = 0;
    // TODO: nested loop - the inner one stops at the outer index; count every visit
    return ops;
}

long long predicted(int n) {
    // TODO: closed form for 0 + 1 + 2 + ... + (n - 1)
    return 0;
}

int main() {
    cout << countOps(5) << " " << predicted(5) << endl;     // 10 10
    cout << countOps(100) << " " << predicted(100) << endl; // 4950 4950
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

long long countOps(int n) {
    long long ops = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < i; j++)
            ops++;
    return ops;
}

long long predicted(int n) {
    return (long long)n * (n - 1) / 2;
}

int main() {
    cout << countOps(5) << " " << predicted(5) << endl;     // 10 10
    cout << countOps(100) << " " << predicted(100) << endl; // 4950 4950
    return 0;
}`,
          tests: [
            { id: 1, label: "Inner loop stops at i", keywords: [{ pattern: "j\\s*<\\s*i" }], hint: "for (int j = 0; j < i; j++) - not j < n." },
            { id: 2, label: "Counts every visit", keywords: [{ pattern: "ops\\s*\\+\\+|ops\\s*\\+=\\s*1" }], hint: "ops++ inside the inner loop body." },
            { id: 3, label: "Uses the closed form n(n-1)/2", keywords: [{ pattern: "n\\s*-\\s*1\\s*\\)\\s*/\\s*2" }], hint: "return (long long)n * (n - 1) / 2;" },
          ],
        },
      },
      {
        id: "cpp-ds-0-1b",
        title: "Where log n and n log n come from",
        xp: 14,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Follow binary search step by step and see why it is O(log n)",
            "Follow merge sort step by step and see why it is O(n log n)",
            "Recognise the divide-and-conquer recurrence behind both",
          ]),
          text(
            "**Introduction:** Two of the labels from the last lesson look mysterious until you see where they come from - and they both come from the *same* single idea: **split the problem in half, again and again.** Binary search does almost no work at each split, so it costs `log n`. Merge sort does one full `O(n)` pass at each split, so it costs `n log n`. That one difference - nothing per level versus everything per level - is the whole story.\n\n**Real-life example:** Guessing a number between 1 and 1,000. If you guess 1, 2, 3... you might need 1,000 guesses. If you always guess the middle of whatever range is left and ask \"higher or lower?\", you are home in ten. Halving is not a small improvement - it is the difference between a thousand steps and ten.",
          ),
          text(
            "In this topic you will learn:\n\n- how **binary search** works step by step, and why halving gives `log n`\n- how **merge sort** works step by step, and why it gives `n log n`\n- the divide-and-conquer pattern sitting behind both\n- why binary search only works on **sorted** data",
          ),
          scenario(
            "Think of it like this",
            "You have lost one page in a 1,000-page book and you know the pages are numbered in order. You do not start at page 1. You open the middle, see whether your page is before or after, and throw away half the book. Then half of what's left, and half again. Ten opens and you are there. Now imagine a different job: sorting a shuffled 1,000-page manuscript. You split the pile in two, get each half sorted, then walk down the two sorted piles taking whichever page number is smaller. Splitting gives you about ten levels; each level has you touch all 1,000 pages once. Ten levels of a thousand pages - that is `n log n`.",
          ),
          text(
            "Below is each one, explained slowly, with a complete program you can run.",
          ),

          text(
            "**1. Binary search - find a value in a sorted array.**\n\nLook at the middle element and compare it to the target:\n\n- if it *is* the target, you are done\n- if the target is **smaller**, the answer (if any) is in the **left half** - throw away the middle and everything to its right\n- if the target is **larger**, the answer is in the **right half** - throw away the middle and everything to its left\n\nEvery comparison deletes half of what is left. Starting from `n` items you hit 1 after about `log2 n` comparisons: ~20 for a million, ~30 for a billion.",
          ),
          text(
            "A trace: searching for **44** in a 12-element array. Watch the range `[lo, hi]` collapse.\n\n- start: range [0, 11], values 2 5 9 14 20 23 31 38 40 44 50 61\n- step 1: mid = 5, a[5] = 23. 44 > 23 -> keep the right half -> range [6, 11]\n- step 2: mid = 8, a[8] = 40. 44 > 40 -> keep the right half -> range [9, 11]\n- step 3: mid = 10, a[10] = 50. 44 < 50 -> keep the left half -> range [9, 9]\n- step 4: mid = 9, a[9] = 44. Match. Found in 4 comparisons instead of 12.",
          ),
          text(
            "The whole program. Press **Run** - it prints every step so you can watch the range halve, then tries a value that is present at the start, and one that is missing.",
            {
              label: "Binary search - complete, runnable",
              content: `#include <iostream>
#include <vector>
using namespace std;

// Return the index of target in the SORTED vector a, or -1 if it is absent.
int binarySearch(const vector<int>& a, int target) {
    int lo = 0;
    int hi = (int)a.size() - 1;
    int steps = 0;

    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;   // midpoint, written this way to avoid overflow
        steps++;
        cout << "  step " << steps << ": a[" << mid << "] = " << a[mid]
             << "   range [" << lo << ", " << hi << "]\\n";

        if (a[mid] == target) {
            cout << "  -> found " << target << " at index " << mid
                 << " in " << steps << " step(s)\\n";
            return mid;
        }
        if (a[mid] < target)
            lo = mid + 1;              // target must be to the right
        else
            hi = mid - 1;              // target must be to the left
    }

    cout << "  -> " << target << " is not in the array (" << steps << " step(s))\\n";
    return -1;
}

int main() {
    vector<int> a = {2, 5, 9, 14, 20, 23, 31, 38, 40, 44, 50, 61};
    cout << "array of " << a.size() << " sorted values\\n\\n";

    cout << "search 44:\\n";
    binarySearch(a, 44);

    cout << "\\nsearch 2:\\n";
    binarySearch(a, 2);

    cout << "\\nsearch 7:\\n";
    binarySearch(a, 7);
    return 0;
}`,
            },
          ),
          table(
            "Comparisons to search n sorted items (that is log2 n)",
            ["about log2 n comparisons"],
            [
              ["n = 16", "4"],
              ["n = 1,024", "10"],
              ["n = 1,000,000", "20"],
              ["n = 1,000,000,000", "30"],
            ],
            {
              rowLabelHeader: "Array size",
              footnote:
                "Multiply n by 1,000 and you add only ~10 comparisons. That near-flat growth is what O(log n) means.",
            },
          ),
          callout(
            "warning",
            "Binary search needs the array **sorted**. On unordered data, `a[mid]` tells you nothing about which side the target is on, so you cannot discard half - and it degrades to an O(n) scan.",
          ),

          text(
            "**2. Merge sort - sort an array with the same split-in-half move.**\n\nThree steps, applied to every piece:\n\n1. **Split** the array into a left half and a right half.\n2. **Sort each half** by calling merge sort on it. The recursion bottoms out at length 0 or 1, which is already sorted.\n3. **Merge** the two now-sorted halves into one sorted run with a single left-to-right pass.",
          ),
          text(
            "The **merge** step is the heart of it. Given two sorted runs, keep taking the smaller of the two front values:\n\n- `[1 4 7 9]` and `[2 3 8 10]`\n- fronts 1 vs 2 -> take 1 -> result `[1]`\n- fronts 4 vs 2 -> take 2 -> `[1 2]`\n- fronts 4 vs 3 -> take 3 -> `[1 2 3]`\n- fronts 4 vs 8 -> take 4 -> `[1 2 3 4]`\n- fronts 7 vs 8 -> take 7 -> `[1 2 3 4 7]`\n- the left run is empty, copy the rest of the right -> `[1 2 3 4 7 8 9 10]`\n\nEach value is looked at exactly once, so merging `m` items is `O(m)`.",
          ),
          diagram("Why the merges add up to n log n", [
            { id: "d0", label: "Level 0", color: ACCENT, items: ["1 chunk of size n", "merge work: n"] },
            { id: "d1", label: "Level 1", color: C_SKY, items: ["2 chunks of size n/2", "merge work: 2 x n/2 = n"] },
            { id: "d2", label: "Level 2", color: C_SKY, items: ["4 chunks of size n/4", "merge work: 4 x n/4 = n"] },
            { id: "sum", label: "Total", color: C_GREEN, items: ["n work on every level", "log2 n levels (the size halves each time)", "n x log n"] },
          ]),
          text(
            "Every level of that tree touches all `n` elements once (the merges), and there are `log2 n` levels because the chunk size halves on the way down. `n` per level x `log n` levels = **O(n log n)** - and that is the best any comparison sort can do.",
          ),
          text(
            "The whole program. **Run** it - it prints the array before and after sorting.",
            {
              label: "Merge sort - complete, runnable",
              content: `#include <iostream>
#include <vector>
using namespace std;

// Merge the two sorted halves a[lo..mid] and a[mid+1..hi] back into a[lo..hi].
void merge(vector<int>& a, int lo, int mid, int hi) {
    vector<int> tmp;
    int i = lo;        // walks the left half
    int j = mid + 1;   // walks the right half

    while (i <= mid && j <= hi) {
        if (a[i] <= a[j]) tmp.push_back(a[i++]);
        else              tmp.push_back(a[j++]);
    }
    while (i <= mid) tmp.push_back(a[i++]);   // leftovers from the left half
    while (j <= hi)  tmp.push_back(a[j++]);   // leftovers from the right half

    for (int k = 0; k < (int)tmp.size(); k++) a[lo + k] = tmp[k];
}

// Sort a[lo..hi] in place: split, sort each half, merge.
void mergeSort(vector<int>& a, int lo, int hi) {
    if (lo >= hi) return;              // length 0 or 1 is already sorted
    int mid = lo + (hi - lo) / 2;
    mergeSort(a, lo, mid);            // sort the left half
    mergeSort(a, mid + 1, hi);        // sort the right half
    merge(a, lo, mid, hi);           // combine the two sorted halves
}

void print(const vector<int>& a) {
    for (int x : a) cout << x << " ";
    cout << "\\n";
}

int main() {
    vector<int> a = {8, 3, 11, 1, 6, 2, 10, 5, 9, 4, 7};
    cout << "before: ";
    print(a);

    mergeSort(a, 0, (int)a.size() - 1);

    cout << "after:  ";
    print(a);
    return 0;
}`,
            },
          ),
          table(
            "n vs n log n vs n^2",
            ["n = 1,000", "n = 1,000,000"],
            [
              ["n", "1,000", "1,000,000"],
              ["n log n", "~10,000", "~20,000,000"],
              ["n^2", "1,000,000", "1,000,000,000,000"],
            ],
            {
              rowLabelHeader: "Growth",
              highlightRows: [1],
              footnote:
                "n log n is only a small multiple of n, so it scales. n^2 is already a million times larger at n = 1,000.",
            },
          ),
          callout(
            "info",
            "As a recurrence: merge sort is `T(n) = 2*T(n/2) + O(n)` -> O(n log n). Binary search is `T(n) = T(n/2) + O(1)` -> O(log n). Same split; the O(n) vs O(1) per level is the whole difference.",
          ),
          callout(
            "tip",
            "Halving the problem puts a `log n` in the answer. Doing an `O(n)` pass at each halving level turns it into `n log n`.",
          ),
          quiz(
            "Binary search on a sorted array of 1,000,000 items takes roughly how many comparisons?",
            ["1,000,000", "1,000", "20", "1"],
            2,
            "log2(1,000,000) is about 20 - each comparison halves the remaining range.",
          ),
          quiz(
            "Merge sort is O(n log n) because it does...",
            [
              "O(log n) work one time",
              "O(n) work on each of O(log n) levels",
              "O(n) work one time",
              "O(n^2) work split into pieces",
            ],
            1,
            "Every level merges all n elements (O(n)); halving the chunk size gives O(log n) levels; n x log n total.",
          ),
          quiz(
            "Why must the array be sorted for binary search to work?",
            [
              "So that duplicates sit next to each other",
              "So one comparison tells you which half to throw away",
              "It does not need to be sorted",
              "To make the array take less memory",
            ],
            1,
            "On unsorted data, a[mid] gives you no information about which side the target is on, so you cannot discard half.",
          ),
        ],
        challenge: {
          title: "Binary search",
          description:
            "Implement the clean version: return the index of `target` in the sorted vector `a`, or -1 if it is absent. Halve the search range each step.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& a, int target) {
    // TODO: lo = 0, hi = a.size() - 1; while lo <= hi, test the midpoint
    return -1;
}

int main() {
    vector<int> a = {2, 5, 9, 14, 20, 23, 31, 38, 40, 44, 50, 61};
    cout << binarySearch(a, 23) << endl;  // 5
    cout << binarySearch(a, 44) << endl;  // 9
    cout << binarySearch(a, 7) << endl;   // -1
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& a, int target) {
    int lo = 0;
    int hi = (int)a.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] == target) return mid;
        if (a[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> a = {2, 5, 9, 14, 20, 23, 31, 38, 40, 44, 50, 61};
    cout << binarySearch(a, 23) << endl;  // 5
    cout << binarySearch(a, 44) << endl;  // 9
    cout << binarySearch(a, 7) << endl;   // -1
    return 0;
}`,
          tests: [
            { id: 1, label: "Overflow-safe midpoint", keywords: [{ pattern: "lo \\+ \\(hi - lo\\) / 2" }], hint: "mid = lo + (hi - lo) / 2." },
            { id: 2, label: "Returns the index on a match", keywords: [{ pattern: "return mid" }], hint: "a[mid] == target -> return mid." },
            { id: 3, label: "Discards the correct half", keywords: [{ pattern: "lo = mid \\+ 1" }], hint: "a[mid] < target means the answer is to the right." },
            { id: 4, label: "Returns -1 when absent", keywords: [{ pattern: "return -1" }], hint: "The loop exits once lo > hi." },
          ],
        },
      },
      {
        id: "cpp-ds-0-2",
        title: "CPU Cycle",
        xp: 12,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Describe the four stages the CPU repeats for every machine instruction",
            "Explain how one line of C++ becomes many instructions and memory accesses",
            "Connect \"one operation\" in Big-O to real CPU work, and why constants still matter",
          ]),
          text(
            "**Introduction:** Big-O counts \"steps\", so it is worth knowing what a step actually is down at the metal. A processor does not understand your C++ line; it understands thousands of tiny machine instructions, and for every single one of them it repeats the same four-part routine: **fetch, decode, execute, write-back**. That routine is called the **instruction cycle** (you will also hear \"CPU cycle\" or \"fetch-decode-execute cycle\"), and knowing it explains why two programs with identical Big-O can finish minutes apart.\n\n**Real-life example:** A cook at one station with a stack of index cards in front of them, each card carrying one tiny instruction: \"pick up the knife\", \"make one cut\", \"put the knife down\". For every card the cook does the same four things - take the next card, read it, do what it says, note the result - then reaches for the next card. A processor works exactly like that, just billions of cards a second.",
          ),
          text(
            "In this topic you will learn:\n\n- the four stages the CPU repeats for **every** machine instruction\n- how one innocent line of C++ turns into many instructions and memory trips\n- why \"one operation\" in Big-O is not one operation in real life\n- why the constants Big-O throws away can still be felt on the clock",
          ),
          scenario(
            "Think of it like this",
            "Two cooks are each handed 100 recipe cards, so on paper they have identical workloads. The first cook has every ingredient laid out within arm's reach. The second has to walk to the store cupboard for every single card. Both do 100 \"steps\" - and the second one finishes an hour later. Big-O is the card count. It is silent about how far the cook has to walk for each card, which in a real computer means: is the value already close to the processor, or does it have to be fetched from far away?",
          ),
          diagram("The four steps, repeated for every instruction", [
            { id: "fetch", label: "1. Fetch", color: ACCENT, items: ["Grab the next instruction", "The processor keeps a bookmark pointing at it", "Move the bookmark along"] },
            { id: "decode", label: "2. Decode", color: C_SKY, items: ["Work out what it's asking for", "Which action? Which values does it touch?"] },
            { id: "exec", label: "3. Execute", color: C_AMBER, items: ["Actually do it", "Add, compare, work out an address..."] },
            { id: "write", label: "4. Write-back", color: C_GREEN, items: ["Save the result", "Into a fast slot in the CPU, or out to memory", "Then go back to step 1"] },
          ]),
          text(
            "Here's what surprises beginners: a short instruction like \"add this number to the running total\" is **not one step** for the processor. It's more like - work out where that number lives, go fetch it from memory, add it to the total, put the total back. Four or five tiny cards. And if the number isn't already close at hand, the \"go fetch it\" part alone can cost as much as a *hundred* ordinary steps.",
          ),
          text(
            "This is why Big-O is a *rough* guide, not a stopwatch. Big-O counts every step as \"one\", whether it's a snappy add or a slow trip out to memory. So two methods that are both **O(n)** can still finish ten times apart in real life - the same number of steps on paper, very different work inside each one. The next lessons dig into that gap.",
          ),
          callout(
            "info",
            "Those \"fast slots in the CPU\" are called **registers** - only a few dozen exist, and they're where all the actual adding and comparing happens. Everything else (the caches, main memory) is slower and has to be pulled into a register first. \"Write-back\" is just the step where a finished result leaves a register.",
          ),
          quiz(
            "In the four-step cycle, which step saves the finished result?",
            ["Fetch", "Decode", "Execute", "Write-back"],
            3,
            "Write-back (also called \"store\") commits the result and nudges the bookmark to the next instruction, ready for the next Fetch.",
          ),
          quiz(
            "Two sorting methods are both O(n). One runs twice as fast as the other on the same laptop. How is that possible?",
            [
              "Big-O must be wrong for one of them",
              "One does lighter work per step and reaches memory in a friendlier pattern",
              "The slower one is secretly O(n^2)",
              "Faster laptops ignore Big-O",
            ],
            1,
            "Big-O counts steps but ignores how heavy each step is and how the data sits in memory - and both of those decide the real time.",
          ),
        ],
        challenge: {
          title: "Do the calculation",
          description:
            "An order has `price` per item, a `quantity`, and a flat `shipping` fee. Fill in `orderTotal` so it returns `price * quantity + shipping` - the kind of everyday arithmetic the Execute step does.",
          starterCode: `#include <iostream>
using namespace std;

int orderTotal(int price, int quantity, int shipping) {
    // TODO: return price times quantity, plus shipping
    return 0;
}

int main() {
    cout << orderTotal(20, 3, 5) << endl;   // 65
    cout << orderTotal(100, 1, 0) << endl;  // 100
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int orderTotal(int price, int quantity, int shipping) {
    return price * quantity + shipping;
}

int main() {
    cout << orderTotal(20, 3, 5) << endl;   // 65
    cout << orderTotal(100, 1, 0) << endl;  // 100
    return 0;
}`,
          tests: [
            { id: 1, label: "Multiplies price by quantity", keywords: [{ pattern: "price\\s*\\*\\s*quantity" }], hint: "price * quantity" },
            { id: 2, label: "Adds the shipping cost", keywords: [{ pattern: "\\+\\s*shipping" }], hint: "... + shipping" },
          ],
        },
      },
      {
        id: "cpp-ds-0-3",
        title: "Why data \"in a row\" is faster",
        xp: 12,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Explain why reaching out to main memory is so slow compared with the CPU",
            "Say what \"keep the things you use together, together\" buys you",
            "Explain why the same O(n) job can be much faster with data laid out in a row",
          ]),
          text(
            "**Introduction:** The processor is fast. Main memory is not - by comparison it is *glacial*. Asking memory for a value the CPU does not already have nearby can cost as much as running a few hundred ordinary instructions while it stands there waiting. That single fact is why *where* your data sits matters as much as how many steps your algorithm takes, and it is the reason a plain row of numbers so often beats a cleverer structure with the same Big-O.\n\n**Real-life example:** Cooking with the ingredients on the worktop versus fetching each one from a shop down the road. The recipe has the same number of steps either way. One version takes twenty minutes; the other takes all afternoon, because almost all the time goes on the trips, not the cooking.",
          ),
          text(
            "In simple words:\n\n- reaching out to main memory is *slow* - the CPU has to wait\n- so the CPU keeps recently used data in small, very fast holding areas called **caches**\n- and it never fetches one lonely value: it grabs a whole **chunk of neighbouring memory** at once (about 64 bytes, roughly 16 whole numbers), betting you will want the neighbours too\n- which means data laid out **in a row** gets most of its fetches for free",
          ),
          scenario(
            "Think of it like this",
            "You are a librarian fetching books for a reader. The books are on a shelf three floors down, so each trip is expensive - but you have a trolley, and the trolley holds sixteen books. If the reader wants sixteen books that sit next to each other on the shelf, that is **one** trip: you load the whole run onto the trolley and you are done. If they want sixteen books scattered across sixteen different shelves, that is sixteen trips down and back. Exactly the same number of books requested. Sixteen times the walking. That is the entire idea behind caches and why \"in a row\" wins.",
          ),
          table(
            "How far away is the data? (bigger gap = slower)",
            ["Rough wait", "If the closest one took 1 second..."],
            [
              ["Inside the CPU (a register)", "no wait", "instant"],
              ["Nearest cache", "a few ticks", "1 second"],
              ["Middle cache", "~3x that", "3 seconds"],
              ["Last cache", "~10x that", "10 seconds"],
              ["Main memory", "~50x that", "about a minute"],
              ["The disk (SSD)", "enormous", "about 7 hours"],
            ],
            { rowLabelHeader: "Where the value lives", highlightRows: [4], footnote: "Every step further out is roughly 3-5x slower. \"Fast code\" mostly means \"code whose data stays in the near caches\"." },
          ),
          text(
            "So the golden rule is: **keep the things you use together, together.** It pays off two ways:\n\n- Touch one value, and its neighbours become almost free - they came along in the same chunk.\n- Touch a value, and touching it *again* soon is almost free - it's still in cache.",
          ),
          arrayViz(
            "One fetch brings in a whole neighbourhood",
            [
              {
                label: "one 64-byte chunk",
                values: ["#0", "#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9", "#10", "#11", "#12", "#13", "#14", "#15"],
                colLabels: ["0", "4", "8", "12", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60"],
                okIndexes: [0],
              },
            ],
            "You ask for item #0 (green). The CPU quietly loads all 16 numbers sitting next to it. Items #1 to #15 are now free. Numbers laid out in a row get this for nothing.",
          ),
          text(
            "This is the real reason a **plain list of items sitting in a row** is faster to read through than the same items **scattered around memory, each with an arrow to the next**. The row: every fetched chunk is fully used, and the CPU even guesses ahead and pre-loads the next chunk. The scattered version: a fresh slow fetch for *every single item*, and part of each chunk wasted on the arrows.",
          ),
          diagram("Same O(n) walk, very different speed", [
            { id: "arr", label: "Items in a row", color: C_GREEN, items: ["1 fetch -> ~16 items", "CPU pre-loads the next chunk"] },
            { id: "list", label: "Scattered items + arrows", color: C_RED, items: ["1 fetch -> 1 item", "CPU can't guess where you'll jump"] },
            { id: "gap", label: "In practice", color: ACCENT, items: ["Big-O says they're equal", "The row is often 5-10x faster"] },
          ]),
          callout(
            "warning",
            "This is not \"always use a row\". Scattered-with-arrows structures (linked lists, coming up) shine when you constantly slip items into the middle and rarely read straight through. The lesson is: Big-O isn't the whole story - measure.",
          ),
          quiz(
            "One memory chunk holds about 16 numbers. You read 16 numbers laid out in a row, front to back. Roughly how many slow trips to memory?",
            ["16", "8", "1", "0"],
            2,
            "The first read triggers one trip that loads all 16. The other 15 are already there - free.",
          ),
          quiz(
            "Why is the \"scattered items with arrows\" layout slower to walk through, even at the same Big-O?",
            [
              "It has more items in it",
              "Each jump is a fresh slow memory trip, and the CPU can't pre-load what it can't predict",
              "Arrows are not allowed in C++",
              "It secretly becomes O(n^2)",
            ],
            1,
            "Every \"follow the arrow\" is an unpredictable jump to a new place in memory - the worst case for the cache.",
          ),
        ],
        challenge: {
          title: "Cache-friendly row-major sum",
          description:
            "Sum every element of a 2D array with the **inner** loop moving along contiguous memory (the last index is contiguous in C++).",
          starterCode: `#include <iostream>
using namespace std;

const int R = 3, C = 4;

long long sumRowMajor(int m[R][C]) {
    // TODO: outer loop over rows i, inner loop over columns j
    return 0;
}

int main() {
    int m[R][C] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    cout << sumRowMajor(m) << endl;   // 78
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

const int R = 3, C = 4;

long long sumRowMajor(int m[R][C]) {
    long long total = 0;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            total += m[i][j];
    return total;
}

int main() {
    int m[R][C] = {{1,2,3,4},{5,6,7,8},{9,10,11,12}};
    cout << sumRowMajor(m) << endl;   // 78
    return 0;
}`,
          tests: [
            { id: 1, label: "Inner loop over columns", keywords: [{ pattern: "for \\(int j" }], hint: "j is the contiguous index - keep it innermost." },
            { id: 2, label: "Accesses m[i][j]", keywords: [{ pattern: "m\\[i\\]\\[j\\]" }], hint: "Row i, column j." },
            { id: 3, label: "Accumulates the total", keywords: [{ pattern: "total \\+=" }], hint: "total += m[i][j]." },
          ],
        },
      },
      {
        id: "cpp-ds-0-4",
        title: "The rare slow step (and timing code)",
        xp: 12,
        chapterTitle: "Complexity & the Machine Model",
        theory: [
          objectives([
            "Explain \"amortised\" cost: cheap almost always, rarely expensive, cheap on average",
            "See why a growable list stays fast overall even though it sometimes moves everything",
            "Know the basic rules for timing code honestly",
          ]),
          text(
            "**Introduction:** Up to now we have talked about the cost of *one* operation. But some operations are cheap nearly every time and then, once in a while, expensive - and quoting only the expensive case would be badly misleading. The honest way to describe them is the **amortised** cost: the average price per operation once you spread the rare expensive one across all the cheap ones around it.\n\n**Real-life example:** A bookshelf. Adding a book is instant... until the shelf is full. Then you buy a bigger shelf and move every book across, which is a proper chore. But it happens rarely, and each new shelf is *twice* the size of the last, so the chore comes round less and less often. Averaged over all the books you ever shelve, adding a book is still basically instant.",
          ),
          text(
            "In this topic you will learn:\n\n- what **amortised** cost means: cheap almost always, rarely expensive, cheap on average\n- why a growable list stays fast overall even though it sometimes copies everything\n- why *doubling* is the trick that makes the maths work out\n- the basic rules for timing code honestly",
          ),
          scenario(
            "Think of it like this",
            "You pay for a bus pass once a month and then ride free for thirty days. On the first of the month a ride \"costs\" the whole pass; on the other twenty-nine days a ride costs nothing. Nobody sensibly describes that as \"an expensive way to travel\" - you divide the pass by the number of rides and quote *that*. Amortised analysis is exactly the same move applied to code: the rare resize is the monthly pass, and every cheap append that follows it is a free ride.",
          ),
          text(
            "A **growable list** (you'll meet it properly next chapter) behaves exactly like that bookshelf. Adding an item is instant, until it's full; then it grabs a block twice as big and copies everything over. The average cost, spread across *all* the adds, is what we call the **amortised** cost - and here it works out to basically instant per add.",
          ),
          text(
            "Why does doubling keep it cheap? Growing from empty to n items, the copies you pay are `1 + 2 + 4 + 8 + ...` up to about n. Add those up and the total is *less than 2n* - so n adds cost roughly n work altogether. Press **Run** and watch it happen:",
            {
              label: "See the rare slow step",
              content: `#include <iostream>
using namespace std;

int main() {
    int capacity = 1;   // how many items there is room for
    int size = 0;       // how many are actually stored
    long long moved = 0;

    for (int item = 1; item <= 16; item++) {
        if (size == capacity) {
            // the rare, expensive step: bigger block, copy everything across
            moved += size;
            capacity *= 2;
            cout << "  ...full! grew to hold " << capacity
                 << ", moved " << size << " items\\n";
        }
        size++;                       // the usual, instant step
        cout << "added item " << item << "\\n";
    }

    cout << "\\n16 items added. Items copied during all the grows: "
         << moved << "  (less than 2 x 16)\\n";
    return 0;
}`,
            },
          ),
          callout(
            "info",
            "If a program truly cannot afford the occasional pause (live audio, say), you tell the list its final size up front so it never has to grow - or you choose a structure that has no slow step at all.",
          ),
          callout(
            "tip",
            "Timing code fairly: run it many times (not once), let it \"warm up\" first, turn optimisations on, and decide whether you care about the *average* speed or the *worst single pause* - they answer different questions.",
          ),
          quiz(
            "Adding to a doubling list is \"amortised O(1)\". What does that actually promise?",
            [
              "Every single add is equally fast",
              "Across many adds, the average cost per add stays tiny - even though a few are slow",
              "It never has to copy anything",
              "It is only O(1) for the very first item",
            ],
            1,
            "Amortised is a promise about the whole run, not any one step. Most adds are instant; the rare copy is paid off by all the cheap ones around it.",
          ),
          quiz(
            "Growing a list from empty to 1,000 items (doubling each time), roughly how many item-copies happen in total?",
            ["About 1,000,000", "About 2,000", "About 10", "About 1,000,000,000"],
            1,
            "1 + 2 + 4 + ... + 1,000 is just under 2,000. That's why n adds cost about n overall - each one averages out to nearly free.",
          ),
        ],
        challenge: {
          title: "Total copies for n doubling pushes",
          description:
            "A dynamic array starts at capacity 1 and doubles when it fills. Return the total number of elements **copied** across every resize while growing to n items - it should come out below 2n.",
          starterCode: `#include <iostream>
using namespace std;

long long totalCopies(int n) {
    // TODO: cap = 1; while cap < n: copies += cap; cap *= 2;  return copies
    return 0;
}

int main() {
    cout << totalCopies(10) << endl;   // 15  (copied 1 + 2 + 4 + 8)
    cout << totalCopies(1) << endl;    // 0
    cout << totalCopies(100) << endl;  // 127
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

long long totalCopies(int n) {
    long long copies = 0;
    long long cap = 1;
    while (cap < n) {
        copies += cap;
        cap *= 2;
    }
    return copies;
}

int main() {
    cout << totalCopies(10) << endl;   // 15
    cout << totalCopies(1) << endl;    // 0
    cout << totalCopies(100) << endl;  // 127
    return 0;
}`,
          tests: [
            { id: 1, label: "Doubles the capacity", keywords: [{ pattern: "cap \\*= 2" }], hint: "Capacity doubles each resize." },
            { id: 2, label: "Adds the copied count", keywords: [{ pattern: "copies \\+= cap" }], hint: "Each resize copies `cap` elements." },
            { id: 3, label: "Loops until capacity reaches n", keywords: [{ pattern: "while \\(cap < n\\)" }], hint: "Stop once capacity covers n." },
          ],
        },
      },
    ],
  },
  {
    id: "linear-arrays",
    title: "Linear vs Non-Linear · Arrays & Lists",
    icon: "📏",
    color: C_SKY,
    lessons: [
      {
        id: "cpp-ds-1-0",
        title: "Linear vs non-linear: the map ahead",
        xp: 10,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Define linear and non-linear data structures",
            "Place arrays, lists, stacks, queues, trees, heaps, hash tables and graphs on the map",
            "Distinguish an abstract data type from a concrete implementation",
          ]),
          text(
            "**Introduction:** Before we start building things, it helps to have a map of what we are going to build. Every structure in this course falls into one of two families, and the family is decided by one question: does each item have exactly one \"next\", or can an item connect to many others? That is the difference between **linear** and **non-linear**, and it is the single most useful way to organise everything ahead.\n\n**Real-life example:** A queue at a bus stop is linear - you are behind exactly one person and in front of exactly one person. A family tree is not: one parent can have four children, so there is no single \"next person\". Same people, completely different shape, and completely different questions you can ask cheaply.",
          ),
          text(
            "In this topic you will learn:\n\n- what **linear** and **non-linear** data structures are\n- where arrays, lists, stacks, queues, trees, heaps, hash tables and graphs sit on the map\n- the difference between an **abstract data type** (what it promises) and an **implementation** (how it is built)",
          ),
          scenario(
            "Think of it like this",
            "\"Stack\" is a promise, not a thing. The promise is: you can put something on top, take the top thing off, and peek at the top thing - last in, first out. A cafeteria tray dispenser keeps that promise, and so does a pile of plates on a worktop, and so does a stack built out of an array or one built out of linked nodes. The promise is what your code depends on; the machinery underneath is a separate decision you can change later. That split - promise versus machinery - is what we mean by an **abstract data type**.",
          ),
          text(
            "In precise terms, a **data structure** organises data, while an **abstract data type (ADT)** is the *interface*: the operations and their guarantees, kept deliberately separate from how it is built. \"Stack\" is an ADT (`push` / `pop` / `top`, last-in-first-out). It can be *implemented* with an array or with linked nodes.",
          ),
          text(
            "Structures fall into two families, decided by how elements relate:\n\n- **Linear** - elements form one sequence; each has at most one predecessor and one successor. Arrays, linked lists, stacks, queues, deques. You traverse them one way.\n- **Non-linear** - an element can connect to many others; there is no single \"next\". Trees (one parent, many children), heaps, hash tables (buckets), graphs (any-to-any).",
          ),
          diagram("The two families", [
            { id: "lin", label: "Linear", color: C_SKY, items: ["Array", "Linked list (singly / doubly / circular)", "Stack", "Queue", "Deque"] },
            { id: "non", label: "Non-linear", color: ACCENT, items: ["Tree / BST / AVL", "Heap", "Hash table", "Graph"] },
          ]),
          text(
            "Linear structures are simple and cache-friendly. Non-linear structures buy sub-linear search (trees, hashing) or model real relationships (graphs), at the cost of more bookkeeping.",
          ),
          callout(
            "info",
            "\"Linear\" describes the *logical* structure, not the memory layout. A linked list is linear but not contiguous; a binary heap is non-linear but stored in a contiguous array.",
          ),
          quiz(
            "Which of these is a non-linear data structure?",
            ["Deque", "Circular linked list", "Binary search tree", "Stack"],
            2,
            "A BST node can have two children, so elements are not in a single sequence.",
          ),
        ],
        challenge: {
          title: "Sort the structures",
          description:
            "Replace each `TODO` with `LINEAR` or `NON-LINEAR` for that data structure.",
          compileOptional: true,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    // Stack              => TODO
    // Circular list      => TODO
    // Binary search tree => TODO
    // Hash table         => TODO
    // Deque              => TODO
    // Graph              => TODO
    cout << "done" << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    // Stack              => LINEAR
    // Circular list      => LINEAR
    // Binary search tree => NON-LINEAR
    // Hash table         => NON-LINEAR
    // Deque              => LINEAR
    // Graph              => NON-LINEAR
    cout << "done" << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Stack is LINEAR", keywords: [{ pattern: "Stack\\s+=> LINEAR" }], hint: "One sequence, one direction." },
            { id: 2, label: "Binary search tree is NON-LINEAR", keywords: [{ pattern: "Binary search tree => NON-LINEAR" }], hint: "Two children per node." },
            { id: 3, label: "Graph is NON-LINEAR", keywords: [{ pattern: "Graph\\s+=> NON-LINEAR" }], hint: "Any-to-any connections." },
          ],
        },
      },
      {
        id: "cpp-ds-1-1",
        title: "The List ADT and the static array",
        xp: 14,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "State the operations of the List ADT",
            "Explain why array indexing is O(1)",
            "Give the cost of access, search, and middle insert/erase on an array",
          ]),
          text(
            "**Introduction:** The most ordinary thing you can ask of a collection is \"give me the fifth one\". The **array** is the structure built to answer that instantly: one unbroken block of memory with every element the same size, side by side. Because the elements are evenly spaced, the computer can *calculate* where element five is instead of hunting for it - and that one property is where the array's whole personality comes from, the good parts and the bad.\n\n**Real-life example:** A street of identical houses, numbered from 0. To find number 37 nobody walks the street reading door plates - you know each house is one width apart, so you go straight there. But now try inserting a new house between 12 and 13: every house after it has to be renumbered and shifted along. Instant lookup, painful insertion. That is an array.",
          ),
          text(
            "In this topic you will learn:\n\n- what the **List ADT** promises: an ordered collection you can index, insert into and remove from\n- why `arr[i]` is `O(1)` no matter how big `i` is\n- what access, search, and inserting or erasing in the middle actually cost\n- why a fixed-size array cannot grow, and what C++ gives you instead",
          ),
          scenario(
            "Think of it like this",
            "Picture a row of numbered pigeonholes bolted to a wall, all the same size. Reaching into hole 9 takes exactly as long as reaching into hole 0 - you measure along the wall and put your hand in. That is `O(1)` access. But the row is bolted down: you cannot add a twenty-first hole because there is no wall left, and you cannot squeeze one in the middle without unbolting and re-hanging every hole to the right of it. Everything an array is good at, and everything it is bad at, comes from those holes being fixed and evenly spaced.",
          ),
          text(
            "In precise terms, the **List ADT** is an ordered collection you can index into, insert into, and remove from. The **array** is its most basic implementation: a fixed-size, contiguous block. Element `i` lives at `base + i * sizeof(T)`, so indexing is one multiply-add - **`O(1)` random access**.",
          ),
          text(
            "Costs on a static array:\n\n- read / write by index: `O(1)`\n- search by value: `O(n)` unsorted, `O(log n)` if sorted (binary search)\n- insert or erase in the middle: `O(n)` - every later element shifts\n- append: `O(1)` *only if there is room* - and a raw array has no room, its size is fixed at creation",
            {
              label: "Fixed-size arrays in C++",
              content: `int raw[4] = {10, 20, 30, 40};   // C-style, decays to a pointer
cout << raw[2] << "\\n";           // 30, one address calculation

#include <array>
std::array<int, 4> a = {10, 20, 30, 40};  // knows its own size
cout << a.size() << "\\n";                  // 4`,
            },
          ),
          arrayViz(
            "Random access is address arithmetic, not a search",
            [
              {
                label: "value",
                values: ["10", "20", "30", "40", "23", "42"],
                colLabels: ["0", "1", "2", "3", "4", "5"],
                okIndexes: [3],
              },
              {
                label: "address",
                values: ["base", "+4", "+8", "+12", "+16", "+20"],
                colLabels: ["0", "1", "2", "3", "4", "5"],
                okIndexes: [3],
              },
            ],
            "a[3] lives at base + 3 * 4 bytes. One multiply-add gets you there - O(1), whatever the index. Column labels are the indices.",
          ),
          callout(
            "warning",
            "A raw array does not carry its length - `sizeof` tricks break as soon as it is passed to a function. Prefer `std::array<T, N>` (size in the type) or `std::vector<T>` (next lesson).",
          ),
          quiz(
            "Why is arr[i] O(1) no matter how large i is?",
            [
              "The CPU searches the array for index i",
              "The address is base + i * element_size, a single calculation",
              "Arrays are always small",
              "The compiler unrolls the access",
            ],
            1,
            "Contiguous layout turns an index into constant-time address arithmetic.",
          ),
        ],
        challenge: {
          title: "Array toolkit",
          description:
            "Implement `sumRange` (inclusive sum of a[lo..hi]) and `indexOf` (first index of target, or -1).",
          starterCode: `#include <iostream>
using namespace std;

int sumRange(const int* a, int lo, int hi) {
    // TODO: add a[lo] .. a[hi] inclusive
    return 0;
}

int indexOf(const int* a, int n, int target) {
    // TODO: return first i where a[i] == target, else -1
    return -1;
}

int main() {
    int a[] = {4, 8, 15, 16, 23, 42};
    cout << sumRange(a, 1, 3) << endl;   // 39
    cout << indexOf(a, 6, 23) << endl;   // 4
    cout << indexOf(a, 6, 99) << endl;   // -1
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int sumRange(const int* a, int lo, int hi) {
    int sum = 0;
    for (int i = lo; i <= hi; i++) sum += a[i];
    return sum;
}

int indexOf(const int* a, int n, int target) {
    for (int i = 0; i < n; i++)
        if (a[i] == target) return i;
    return -1;
}

int main() {
    int a[] = {4, 8, 15, 16, 23, 42};
    cout << sumRange(a, 1, 3) << endl;   // 39
    cout << indexOf(a, 6, 23) << endl;   // 4
    cout << indexOf(a, 6, 99) << endl;   // -1
    return 0;
}`,
          tests: [
            { id: 1, label: "sumRange accumulates in a loop", keywords: [{ pattern: "sum \\+=" }], hint: "for i from lo to hi, sum += a[i]." },
            { id: 2, label: "indexOf compares against target", keywords: [{ pattern: "== target" }], hint: "Return i on the first match." },
            { id: 3, label: "indexOf returns -1 when absent", keywords: [{ pattern: "return -1" }], hint: "Fall through the loop to -1." },
          ],
        },
      },
      {
        id: "cpp-ds-1-1a",
        title: "Pointers on the heap: null, dangling, wild",
        xp: 14,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Tell null, void, dangling and wild pointers apart",
            "Step through a block with pointer arithmetic and know what one step means",
            "Match every new[] with exactly one delete[], then null the pointer",
          ]),
          text(
            "**Introduction:** Every structure from here on - dynamic arrays, linked lists, trees, graphs - is held together by **pointers** into the heap. A pointer is just a variable that stores *where* something lives rather than the thing itself, and that small idea is what lets a structure grow while the program is running. It also means a structure is only ever as safe as the pointer discipline around it, so this lesson gathers that discipline in one place before we start allocating in earnest.\n\n**Real-life example:** A cloakroom ticket. The ticket is not your coat - it is a slip of paper saying *where your coat is*. Hand the ticket over and you get the coat. Lose the ticket and the coat is still hanging there, unreachable. Keep the ticket after the cloakroom has already given your coat away and you are holding a slip that points at somebody else's belongings. Those three situations are, in order, a working pointer, a memory leak, and a dangling pointer.",
          ),
          text(
            "In this topic you will learn:\n\n- how to tell **null**, **void**, **dangling** and **wild** pointers apart\n- what one step of **pointer arithmetic** actually moves\n- why `p[3]` and `*(p + 3)` are the same thing\n- the rule that prevents most heap bugs: one `new[]`, one `delete[]`, then null the pointer",
          ),
          scenario(
            "Think of it like this",
            "A pointer is a house address written on a scrap of paper. `nullptr` is a blank scrap - honest, and if you try to visit it you fail immediately and loudly, which is exactly what you want. A **dangling** pointer is an address for a house that has since been demolished and rebuilt: the paper still looks perfectly fine, and the danger is that visiting it often *seems* to work. A **wild** pointer is a scrap you found on the floor and never wrote on - it holds whatever was already there. This is why the habit of writing `nullptr` straight after a `delete` matters so much: it turns the silent, dangerous case into the loud, obvious one.",
          ),
          text(
            "A pointer is a variable holding an **address**. `&` takes the address of something; `*` reads the value at that address.",
            {
              label: "The two operators",
              content: `int x = 10;        // a normal variable
int* p = &x;       // p holds the address of x
cout << *p;        // dereference -> prints 10
*p = 42;           // writes through the pointer; x is now 42`,
              output: `10

Only cout << *p prints. The last line writes through the pointer,
so x itself is 42 afterwards.`,
            },
          ),
          diagram("Four pointers, four situations", [
            { id: "null", label: "Null pointer", color: C_GREEN, items: ["`int* p = nullptr;`", "Deliberately points at nothing", "Dereferencing it crashes immediately - loudly, which is what you want"] },
            { id: "void", label: "Void pointer", color: C_SKY, items: ["`void* p = &x;`", "Holds any address, knows no type", "Must be cast before it can be dereferenced"] },
            { id: "dangling", label: "Dangling pointer", color: C_RED, items: ["Points at memory already freed", "The address is still there, the ownership is gone", "Undefined behaviour - and it usually *looks* fine at first"] },
            { id: "wild", label: "Wild pointer", color: C_AMBER, items: ["`int* p;` and never assigned", "Holds whatever was on the stack", "Undefined behaviour on the first read"] },
          ]),
          callout(
            "warning",
            "After every `delete`, assign `nullptr`. That single line turns a dangling pointer into a null pointer: instead of quietly reading whatever moved into that memory, the program fails at the exact line that is wrong.",
          ),
          text(
            "**Pointer arithmetic moves in elements, not bytes.** Adding 1 to an `int*` moves 4 bytes on a typical machine, adding 1 to a `char*` moves 1 - the compiler scales by `sizeof(T)` for you.",
          ),
          table(
            "What each expression means",
            ["Meaning"],
            [
              ["p++ / p--", "Move to the next / previous element"],
              ["p + n / p - n", "Move n elements forward / backward"],
              ["*(p + n)", "The value n elements along - exactly what `p[n]` means"],
              ["p2 - p1", "How many elements apart two pointers are"],
            ],
            { rowLabelHeader: "Expression", footnote: "`p2 - p1` is only meaningful when both pointers point into the same allocated block. Comparing or subtracting pointers from different blocks is undefined." },
          ),
          arrayViz(
            "Indexing is pointer arithmetic wearing a different hat",
            [
              {
                label: "value",
                values: ["0", "1", "4", "9", "16", "25"],
                colLabels: ["p+0", "p+1", "p+2", "p+3", "p+4", "p+5"],
                okIndexes: [3],
              },
            ],
            "`*(p + 3)` and `p[3]` compile to the same thing: base address + 3 x sizeof(int). That is why array indexing is O(1) - one multiply-add, no searching.",
          ),
          text(
            "Heap blocks come from `new[]` and must go back with exactly one `delete[]`. Not `delete`, not twice, not never.",
            {
              label: "Allocate, use, release, null",
              content: `int n = 5;
int* block = new int[n];              // one allocation

for (int i = 0; i < n; i++)
    *(block + i) = i * i;             // same as block[i] = i * i

delete[] block;                       // exactly one release
block = nullptr;                      // no dangling handle left behind`,
            },
          ),
          callout(
            "info",
            "`new` pairs with `delete`; `new[]` pairs with `delete[]`. Mixing them is undefined behaviour even when it appears to work. In production C++ you would reach for `std::vector` or `std::unique_ptr` - but you cannot reason about those until you have done it by hand once.",
          ),
          quiz(
            "You call `delete[] data;` and then read `data[0]`. What is `data` at that moment?",
            ["A null pointer", "A dangling pointer", "A void pointer", "A wild pointer"],
            1,
            "The address is still stored, but the memory is no longer yours - that is a dangling pointer, and reading through it is undefined behaviour. Assigning nullptr right after the delete prevents it.",
          ),
          quiz(
            "`int* p` points at the first of six ints. What does `*(p + 4)` read?",
            [
              "The byte 4 positions after p",
              "The fifth element, p[4]",
              "The address of the fifth element",
              "Nothing - you cannot add to a pointer",
            ],
            1,
            "Pointer arithmetic steps in elements. p + 4 is 4 x sizeof(int) bytes along, and *(p + 4) is exactly p[4].",
          ),
          quiz(
            "Which pointer has never been given a value at all?",
            ["A null pointer", "A dangling pointer", "A wild pointer", "A void pointer"],
            2,
            "A wild pointer is simply uninitialised - it holds whatever bits were already in that stack slot. Initialise every pointer, even if only to nullptr.",
          ),
        ],
        challenge: {
          title: "Walk a heap block with pointers",
          description:
            "Allocate the block in `buildSquares` and fill it through the pointer with `*(p + i)`. Then add up a range in `sumBlock` by walking a pointer from `first` up to (but not including) `last`.",
          starterCode: `#include <iostream>
using namespace std;

int* buildSquares(int n) {
    // TODO: allocate n ints on the heap, then write i * i through the pointer
    return nullptr;
}

int sumBlock(int* first, int* last) {   // last points one past the end
    // TODO: walk a pointer from first to last, adding *p
    return 0;
}

int main() {
    int n = 5;
    int* p = buildSquares(n);

    cout << *(p + 3) << endl;           // 9
    cout << sumBlock(p, p + n) << endl; // 30

    delete[] p;
    p = nullptr;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int* buildSquares(int n) {
    int* p = new int[n];
    for (int i = 0; i < n; i++) *(p + i) = i * i;
    return p;
}

int sumBlock(int* first, int* last) {
    int total = 0;
    for (int* p = first; p != last; p++) total += *p;
    return total;
}

int main() {
    int n = 5;
    int* p = buildSquares(n);

    cout << *(p + 3) << endl;           // 9
    cout << sumBlock(p, p + n) << endl; // 30

    delete[] p;
    p = nullptr;
    return 0;
}`,
          tests: [
            { id: 1, label: "Allocates the block with new[]", keywords: [{ pattern: "new\\s+int\\s*\\[" }], hint: "int* p = new int[n];" },
            { id: 2, label: "Writes through the pointer", keywords: [{ pattern: "\\*\\s*\\(\\s*p\\s*\\+\\s*i\\s*\\)" }], hint: "*(p + i) = i * i;" },
            { id: 3, label: "Walks first..last with a pointer", keywords: [{ pattern: "p\\s*(!=|<)\\s*last" }], hint: "for (int* p = first; p != last; p++)." },
          ],
        },
      },
      {
        id: "cpp-ds-1-1b",
        title: "Jagged arrays: rows that are not all the same length",
        xp: 16,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Allocate a T** grid whose rows each have their own length",
            "Free it in the right order, and say what leaks if you get the order wrong",
            "Swap two rows in O(1) by moving pointers instead of elements",
          ]),
          text(
            "**Introduction:** A 2D array is a rectangle, and a rectangle wastes space the moment the rows are not all the same length. A **jagged** (or ragged) array fits the data instead: rather than one big rectangle, you keep an array of row *pointers*, and every row is its own separate block of its own length. It costs you a little bookkeeping and buys you exact-fit memory - plus one very useful trick we get to at the end.\n\n**Real-life example:** A multi-storey car park with three levels of 4, 3 and 5 marked slots. Force it into a 3 x 5 rectangle and you have paid for 15 slots while 3 of them can never be used. A jagged layout paints exactly 12 slots, because each level is allowed to be its own size.",
          ),
          text(
            "In this topic you will learn:\n\n- how to allocate a `T**` grid where each row has its own length\n- the order you must free it in, and exactly what leaks if you get that order wrong\n- why a class holding a raw `T**` needs the **Rule of Three**\n- how to swap two rows in `O(1)` by moving pointers instead of elements",
          ),
          scenario(
            "Think of it like this",
            "A jagged array is a ring binder with a contents page. The contents page is the array of row pointers - it lists where each chapter starts, and nothing else. Each chapter is a separate bundle of pages, and the bundles are all different thicknesses. Two consequences follow immediately. First, if you shred the contents page before the chapters, the chapters are still sitting in the building but nobody can ever find them again - that is the leak. Second, swapping chapter one with chapter three does not mean retyping any pages: you just rewrite two lines on the contents page. That is the `O(1)` swap.",
          ),
          text(
            "Allocation happens in two steps: the array of row pointers first, then each row. A parallel `slots` array remembers how long each row is, because a raw row cannot tell you its own length.",
            {
              label: "Allocating a jagged grid",
              content: `int levels = 3;
int slots[] = {4, 3, 5};              // a different length per level

int** grid = new int*[levels];        // 1. the array of row pointers
for (int i = 0; i < levels; i++)
    grid[i] = new int[slots[i]];      // 2. each row, individually sized`,
            },
          ),
          diagram("Three things you are juggling", [
            { id: "outer", label: "grid (`int**`)", color: ACCENT, items: ["One block of `levels` pointers", "Knows where each row starts", "Knows nothing about row contents"] },
            { id: "rows", label: "each row (`int*`)", color: C_GREEN, items: ["Its own heap allocation", "Contiguous inside itself", "Rows are *not* contiguous with each other"] },
            { id: "sizes", label: "slots (`int*`)", color: C_SKY, items: ["Length of every row", "Not optional - a raw row has no size", "Must travel with the grid everywhere"] },
          ]),
          arrayViz(
            "Jagged fits the data; a rectangle pads it",
            [
              { label: "Level 1", values: ["5", "3", "0", "8", "-", "-"], colLabels: ["0", "1", "2", "3", "4", "5"], okIndexes: [0, 1, 2, 3], missingIndexes: [4, 5] },
              { label: "Level 2", values: ["2", "7", "4", "-", "-", "-"], colLabels: ["0", "1", "2", "3", "4", "5"], okIndexes: [0, 1, 2], missingIndexes: [3, 4, 5] },
              { label: "Level 3", values: ["6", "6", "1", "0", "9", "-"], colLabels: ["0", "1", "2", "3", "4", "5"], okIndexes: [0, 1, 2, 3, 4], missingIndexes: [5] },
            ],
            "Green cells are allocated, grey ones are what a 3 x 6 rectangle would have wasted. The jagged version allocates exactly 12 ints; total slots n = 12, not levels x maxSlots.",
          ),
          text(
            "**Release in the reverse order of allocation.** Rows first, then the array of pointers - and then null the handle.",
            {
              label: "Freeing a jagged grid",
              content: `for (int i = 0; i < levels; i++)
    delete[] grid[i];       // 1. every row first
delete[] grid;              // 2. then the array of pointers
grid = nullptr;             // 3. no dangling handle`,
            },
          ),
          callout(
            "warning",
            "Delete the outer array first and the row pointers vanish with it - every row is then unreachable and leaked for the life of the process. There is no way back: the only record of those addresses was the block you just freed.",
          ),
          callout(
            "warning",
            "**Rule of Three.** A class holding a raw `T**` gets a compiler-generated copy constructor that copies the *pointer*, not the data. Two objects then own one block and both will delete it - a double free. Either write the copy constructor and `operator=` yourself, or disable them outright: `Grid(const Grid&) = delete;` and `Grid& operator=(const Grid&) = delete;`.",
          ),
          text(
            "Now the payoff. To swap two rows, you do **not** move the elements - you move the two pointers, and the two sizes with them. The rows themselves never budge.",
            {
              label: "Swap by pointer, not by value",
              content: `void swapRows(int** grid, int* slots, int r1, int r2) {
    int* tmpRow = grid[r1];                 // 3 pointer assignments
    grid[r1] = grid[r2];
    grid[r2] = tmpRow;

    int tmpSize = slots[r1];                // 3 more for the sizes
    slots[r1] = slots[r2];
    slots[r2] = tmpSize;
}                                            // f(k) = 6, whatever k is`,
            },
          ),
          table(
            "Same visible result, very different bill",
            ["f(k) for a row of k elements", "Big-O", "Work for a 1,000,000-element row"],
            [
              ["Swap the pointers", "6 assignments", "O(1)", "6"],
              ["Copy element by element", "3k assignments", "O(k)", "3,000,000"],
            ],
            {
              rowLabelHeader: "Approach",
              highlightRows: [0],
              footnote: "The pointer version never touches the elements, so row length simply does not appear in its count. Copying also only makes sense when both rows are the same length - otherwise you would run off the end of the shorter one.",
            },
          ),
          callout(
            "tip",
            "Rearranging by moving pointers instead of elements is one of the load-bearing ideas of this whole course. It is why a linked list splices in O(1), why a heap stores pointers to big objects, and why sorting an array of pointers beats sorting an array of fat structs.",
          ),
          quiz(
            "In which order must a jagged grid be freed?",
            [
              "`delete[] grid` first, then each row",
              "Each row first, then `delete[] grid`",
              "Order does not matter",
              "Only `delete[] grid` is needed - it frees the rows too",
            ],
            1,
            "Rows first. Free the outer array first and you have thrown away the only pointers to the rows, leaking every one of them.",
          ),
          quiz(
            "Two rows hold 1,000,000 elements each. You swap them by exchanging the row pointers. How much work?",
            [
              "1,000,000 assignments",
              "2,000,000 assignments",
              "A fixed handful of assignments, whatever the row length",
              "It depends on the element type",
            ],
            2,
            "Six assignments: three for the row pointers, three for the sizes. The elements never move, so the cost is O(1).",
          ),
          quiz(
            "What does reading `grid[2][1]` actually do?",
            [
              "Searches level 2 for slot 1",
              "Two address calculations: fetch the row pointer, then index into that row - still O(1)",
              "Copies the whole row before indexing",
              "It is O(n) because the rows are different lengths",
            ],
            1,
            "One load to get grid[2] (the row pointer), one more to reach element 1 of that row. Two dereferences, constant time.",
          ),
        ],
        challenge: {
          title: "Jagged parking grid",
          description:
            "Build a jagged grid of occupancy hours, total it while counting every element read, and free it correctly - rows first, then the pointer array, then null the handle.",
          starterCode: `#include <iostream>
using namespace std;

int** buildGrid(int levels, const int* slots) {
    // TODO: allocate the row-pointer array, then each row (slots[i] wide), zero-filled
    return nullptr;
}

long long totalHours(int** grid, const int* slots, int levels, long long& reads) {
    // TODO: sum every slot on every level; count each element read into reads
    return 0;
}

void freeGrid(int**& grid, int levels) {
    // TODO: every row, then the outer array, then null the handle
}

int main() {
    int slots[] = {4, 3, 5};
    int** grid = buildGrid(3, slots);

    grid[0][0] = 5; grid[0][3] = 8; grid[1][1] = 7; grid[2][4] = 9;

    long long reads = 0;
    cout << totalHours(grid, slots, 3, reads) << endl;  // 29
    cout << reads << endl;                              // 12

    freeGrid(grid, 3);
    cout << (grid == nullptr) << endl;                  // 1
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int** buildGrid(int levels, const int* slots) {
    int** grid = new int*[levels];
    for (int i = 0; i < levels; i++) {
        grid[i] = new int[slots[i]];
        for (int j = 0; j < slots[i]; j++) grid[i][j] = 0;
    }
    return grid;
}

long long totalHours(int** grid, const int* slots, int levels, long long& reads) {
    long long total = 0;
    for (int i = 0; i < levels; i++)
        for (int j = 0; j < slots[i]; j++) {
            total += grid[i][j];
            reads++;
        }
    return total;
}

void freeGrid(int**& grid, int levels) {
    for (int i = 0; i < levels; i++) delete[] grid[i];
    delete[] grid;
    grid = nullptr;
}

int main() {
    int slots[] = {4, 3, 5};
    int** grid = buildGrid(3, slots);

    grid[0][0] = 5; grid[0][3] = 8; grid[1][1] = 7; grid[2][4] = 9;

    long long reads = 0;
    cout << totalHours(grid, slots, 3, reads) << endl;  // 29
    cout << reads << endl;                              // 12

    freeGrid(grid, 3);
    cout << (grid == nullptr) << endl;                  // 1
    return 0;
}`,
          tests: [
            { id: 1, label: "Allocates the row-pointer array", keywords: [{ pattern: "new\\s+int\\s*\\*\\s*\\[" }], hint: "int** grid = new int*[levels];" },
            { id: 2, label: "Allocates each row separately", keywords: [{ pattern: "new\\s+int\\s*\\[\\s*slots\\s*\\[" }], hint: "grid[i] = new int[slots[i]];" },
            { id: 3, label: "Frees every row before the outer array", keywords: [{ pattern: "delete\\s*\\[\\s*\\]\\s*grid\\s*\\[" }], hint: "delete[] grid[i]; inside the loop, then delete[] grid;" },
            { id: 4, label: "Nulls the handle after freeing", keywords: [{ pattern: "grid\\s*=\\s*nullptr" }], hint: "grid = nullptr; at the end of freeGrid." },
          ],
        },
      },
      {
        id: "cpp-ds-1-2",
        title: "Dynamic arrays: vector, ArrayList, amortised growth",
        xp: 16,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Explain the size vs capacity split inside a dynamic array",
            "Trace what push_back does when capacity is full",
            "Explain why push_back is amortised O(1) but insert-middle is O(n)",
          ]),
          text(
            "**Introduction:** A plain array cannot grow, which is a serious problem when you do not know in advance how much data is coming. A **dynamic array** solves it with one honest trick: always own a block that is a bit bigger than you currently need, and when you finally fill it, quietly move into a block twice the size. This is the structure you will reach for more than any other - it is `std::vector` in C++, `ArrayList` in Java, `list` in Python, `List<T>` in C#.\n\n**Real-life example:** Renting a storage unit with more shelves than you have boxes. Adding a box is instant while there are spare shelves. When the unit fills, you rent a unit twice as big, carry everything over once, and carry on adding boxes instantly again.",
          ),
          text(
            "In this topic you will learn:\n\n- the difference between **size** (what you use) and **capacity** (what you own)\n- what `push_back` does when the block is full, step by step\n- why appending is **amortised `O(1)`** but inserting in the middle is still `O(n)`\n- how `reserve` removes every regrow when you already know the final size",
          ),
          scenario(
            "Think of it like this",
            "Think of a guest list written on a sheet with room for sixteen names, of which ten are filled in. **Size** is ten - the names actually on the list. **Capacity** is sixteen - the lines you have room for. Adding an eleventh name is instant because the line is already there. When all sixteen are used you fetch a sheet with thirty-two lines, copy the sixteen names across once, and go back to adding names instantly. Deleting a name from the *middle*, though, means rewriting every name below it - which is why a vector is brilliant at the end and clumsy in the middle.",
          ),
          text(
            "In precise terms, a dynamic array wraps a raw array plus two numbers: **size** (elements in use) and **capacity** (slots allocated). `push_back` writes at index `size` and increments it - `O(1)` - until `size == capacity`. Then it allocates a larger block (usually 2x; MSVC uses 1.5x), moves the elements over, frees the old block, and continues. That resize is `O(n)`, but rare enough to be **amortised `O(1)`**.",
          ),
          text(
            "`insert` and `erase` in the middle stay `O(n)` - the tail still shifts. `pop_back` is `O(1)`. Iteration is contiguous and cache-friendly.",
            {
              label: "size, capacity, reserve",
              content: `#include <vector>
using namespace std;

vector<int> v;              // size 0, capacity 0
v.reserve(1000);            // capacity >= 1000, size still 0, no more reallocs
for (int i = 0; i < 1000; i++) v.push_back(i);   // all O(1), zero moves`,
            },
          ),
          diagram("push_back when the buffer is full", [
            { id: "room", label: "Has room", color: C_GREEN, items: ["write at data[size]", "size++", "O(1)"] },
            { id: "full", label: "size == capacity", color: C_AMBER, items: ["allocate ~2x", "move n elements", "free old block", "O(n) this once"] },
            { id: "amort", label: "Over n pushes", color: ACCENT, items: ["total moves < 2n", "amortised O(1) each"] },
          ]),
          arrayViz(
            "size is what you use; capacity is what you own",
            [
              {
                label: "buffer",
                values: ["7", "1", "9", "4", "2", "8", "5", "3", "6", "0", "-", "-", "-", "-", "-", "-"],
                colLabels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
                okIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                missingIndexes: [10, 11, 12, 13, 14, 15],
              },
            ],
            "size = 10 (green, live elements), capacity = 16 (green + grey spare slots). push_back writes into a grey slot in O(1); when the greys run out it allocates 32, moves the 16, and frees the old block.",
          ),
          callout(
            "tip",
            "If you know the final size, call `reserve(n)` once - it removes every reallocation and every element move.",
          ),
          quiz(
            "A vector has size 8 and capacity 8. You push_back one more element. What happens?",
            [
              "It fails - the vector is full",
              "It allocates ~16 slots, moves the 8 elements, then writes the 9th",
              "It shifts everything left by one",
              "It stores the element in a linked overflow list",
            ],
            1,
            "Full capacity triggers a grow-and-move; capacity roughly doubles.",
          ),
        ],
        challenge: {
          title: "Grow-your-own IntVector",
          description:
            "Finish `push_back`: when `size == capacity`, grow (start at 1, then double), copy, and free the old buffer.",
          starterCode: `#include <iostream>
using namespace std;

struct IntVector {
    int* data = nullptr;
    int size = 0;
    int capacity = 0;

    void push_back(int x) {
        // TODO: grow if full, then data[size++] = x;
    }
    int get(int i) { return data[i]; }
};

int main() {
    IntVector v;
    for (int i = 0; i < 10; i++) v.push_back(i * i);
    cout << v.size << " " << v.capacity << endl; // 10 16
    cout << v.get(9) << endl;                    // 81
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct IntVector {
    int* data = nullptr;
    int size = 0;
    int capacity = 0;

    void push_back(int x) {
        if (size == capacity) {
            int newCap = capacity == 0 ? 1 : capacity * 2;
            int* fresh = new int[newCap];
            for (int i = 0; i < size; i++) fresh[i] = data[i];
            delete[] data;
            data = fresh;
            capacity = newCap;
        }
        data[size++] = x;
    }
    int get(int i) { return data[i]; }
};

int main() {
    IntVector v;
    for (int i = 0; i < 10; i++) v.push_back(i * i);
    cout << v.size << " " << v.capacity << endl; // 10 16
    cout << v.get(9) << endl;                    // 81
    return 0;
}`,
          tests: [
            { id: 1, label: "Doubles the capacity", keywords: [{ pattern: "capacity \\* 2" }], hint: "newCap = capacity == 0 ? 1 : capacity * 2." },
            { id: 2, label: "Allocates a fresh buffer", keywords: [{ pattern: "new int\\[" }], hint: "new int[newCap]." },
            { id: 3, label: "Frees the old buffer", keywords: [{ pattern: "delete\\[\\] data" }], hint: "delete[] data before reassigning it." },
          ],
        },
      },
      {
        id: "cpp-ds-1-3",
        title: "Array or list? Choosing the backbone",
        xp: 10,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Compare contiguous arrays and linked nodes across the core operations",
            "State a sensible default and when to deviate from it",
            "Explain where std::deque sits between the two",
          ]),
          text(
            "**Introduction:** Almost every linear structure in the rest of this course - stacks, queues, deques - is built on one of exactly two foundations: **a contiguous array** or **linked nodes**. You only get to make that choice once per structure, and it quietly decides the cost of every operation afterwards. So it is worth learning to make it deliberately rather than by habit.\n\n**Real-life example:** A printed book versus a chain of sticky notes, each one telling you where the next is stuck. The book flips straight to page 200 and reads beautifully cover to cover, but slipping a new page in the middle means reprinting the rest. The sticky notes let you insert one anywhere in seconds - but there is no way to \"go to note 200\" except by following 199 notes first.",
          ),
          text(
            "In this topic you will learn:\n\n- how contiguous arrays and linked nodes compare across the core operations\n- a sensible default, and the specific reasons to deviate from it\n- where `std::deque` sits between the two",
          ),
          scenario(
            "Think of it like this",
            "Two ways to keep a shopping list. Written on one sheet of paper, top to bottom: reading it in the shop is effortless, and you can glance at item four instantly - but squeezing \"milk\" in between items two and three means rewriting the bottom half. Written on separate cards clipped together in order: adding \"milk\" is one clip, no rewriting - but finding item four means going through the first three, and reading the whole list is a lot of card-shuffling. Neither is better. Ask yourself which you do more of - reading through, or inserting in the middle - and the answer picks itself.",
          ),
          text(
            "- index access: array `O(1)` / list `O(n)`\n- insert at front: array `O(n)` / list `O(1)`\n- insert/erase at a position you already hold: array `O(n)` / list `O(1)`\n- memory overhead: array ~0 / list 1-2 pointers per element\n- cache behaviour: array excellent / list poor\n- growth: array occasional realloc+move / list one allocation per node",
          ),
          table(
            "Contiguous array vs linked nodes",
            ["Dynamic array (vector)", "Linked list"],
            [
              ["Index access", "O(1)", "O(n)"],
              ["Insert / erase at front", "O(n)", "O(1)"],
              ["Insert / erase at a held position", "O(n)", "O(1)"],
              ["Memory overhead per element", "~0", "1-2 pointers"],
              ["Cache behaviour on a scan", "excellent", "poor"],
              ["Growth", "occasional realloc + move", "one alloc per node"],
            ],
            { rowLabelHeader: "Operation" },
          ),
          text(
            "Default to `std::vector` unless you have a specific reason not to - it wins on access, iteration, and memory. Choose a linked structure when you need `O(1)` splice or erase at a position you already hold and rarely random-access, or when you need pointers/iterators to stay valid across insertions elsewhere.",
          ),
          callout(
            "info",
            "`std::deque` is a hybrid - a sequence of fixed-size contiguous chunks - giving `O(1)` push/pop at *both* ends without moving or invalidating the middle.",
          ),
          quiz(
            "In which case does a linked list clearly beat a vector?",
            [
              "Summing every element",
              "Random access by index",
              "Repeatedly splicing nodes you already point to, with almost no iteration",
              "Binary search",
            ],
            2,
            "O(1) splice/erase at a held position is the linked list's real advantage; everything scan-heavy favours the vector.",
          ),
        ],
        challenge: {
          title: "Array or linked list?",
          description:
            "For each workload, replace `TODO` with `ARRAY` or `LINKED LIST` - whichever is the better backbone.",
          compileOptional: true,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    // Mostly random access by index         => TODO
    // Constant splicing at a held position   => TODO
    // Tight loop summing every element       => TODO
    cout << "done" << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    // Mostly random access by index         => ARRAY
    // Constant splicing at a held position   => LINKED LIST
    // Tight loop summing every element       => ARRAY
    cout << "done" << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Random access -> ARRAY", keywords: [{ pattern: "random access by index\\s+=> ARRAY" }], hint: "O(1) indexing is the array's edge." },
            { id: 2, label: "Splicing -> LINKED LIST", keywords: [{ pattern: "held position\\s+=> LINKED LIST" }], hint: "O(1) splice at a held node." },
            { id: 3, label: "Scanning -> ARRAY", keywords: [{ pattern: "summing every element\\s+=> ARRAY" }], hint: "Contiguous memory wins the scan." },
          ],
        },
      },
      {
        id: "cpp-ds-1-4",
        title: "Templates: one structure, every element type",
        xp: 16,
        chapterTitle: "Linear vs Non-Linear · Arrays & Lists",
        theory: [
          objectives([
            "Write a function template and a class template",
            "Say what the compiler actually generates when you write DynamicArray<int>",
            "Keep template definitions where the compiler can see them",
          ]),
          text(
            "**Introduction:** You have just written `IntVector`. Nobody wants to write `DoubleVector` and `StringVector` next to it and then fix the same bug three times over. A **template** is one definition with the element type left blank; the compiler fills the blank in and generates a separate, fully type-checked version for every type you actually use. Every structure from here on - list, stack, queue, tree, heap - is worth writing this way once.\n\n**Real-life example:** A biscuit cutter. You cut the shape once, in metal, and then stamp it out of shortbread, gingerbread or chocolate dough. You did not design three cutters; you designed one and let the dough decide what comes out.",
          ),
          text(
            "In this topic you will learn:\n\n- how to write a **function template** and a **class template**\n- what the compiler really produces when you write `DynamicArray<int>`\n- why templates cost you nothing at run time\n- the one-line rule that avoids the classic template linker error",
          ),
          scenario(
            "Think of it like this",
            "A template is a form with a blank on it, not a finished document. Writing `template <class T> class Box` is like printing a rental agreement that says \"vehicle: ______\". Nothing has been rented yet. The moment your code says `Box<int>`, the compiler fills in that blank and prints a real, complete, int-shaped agreement - and `Box<string>` prints a second, entirely separate one. This is why there is no run-time cost: all the filling-in happens before your program ever starts, and what runs is ordinary code that looks exactly like what you would have typed by hand.",
          ),
          text(
            "A **function template** puts the placeholder in the signature. `T` is not a type; it is a slot the compiler fills from the call.",
            {
              label: "One function, any type",
              content: `template <class T>
T getMax(T a, T b) {
    return (a > b) ? a : b;
}

cout << getMax(10, 20);      // T becomes int
cout << getMax(3.5, 2.1);    // T becomes double`,
              output: `203.5

That is 20 and 3.5 printed back to back - two separate functions
generated from one template: getMax<int> and getMax<double>.`,
            },
          ),
          text(
            "Two placeholders work the same way, and when the generic version is wrong for one specific type you **specialise** it.",
            {
              label: "Several parameters, and a special case",
              content: `template <class T1, class T2>
void showPair(T1 a, T2 b) { cout << a << " - " << b; }

#include <cctype>
template <>                                  // full specialisation for char
char getMax<char>(char a, char b) {
    return (toupper(a) > toupper(b)) ? a : b;   // compare case-insensitively
}`,
            },
          ),
          text(
            "A **class template** does the same for a whole type. One body, and the compiler emits an independent class for every element type you instantiate.",
            {
              label: "One class, any type",
              content: `template <class T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() { return value; }
};

Box<int> b1(10);
Box<string> b2("Hello");     // a second, separate class is generated`,
            },
          ),
          callout(
            "warning",
            "**The linker error that eats an hour.** Put a template class in a `.h` and its member function bodies in a `.cpp` and it compiles cleanly, then fails at link time with *undefined reference*. The compiler needs the body at the point of use, so keep template definitions and their member functions together in the same file.",
          ),
          text(
            "Templates and pointers combine happily - one `swap` for `int*`, `double*`, or your own node type:",
            {
              label: "Generic swap through pointers",
              content: `template <class T>
void swapPtr(T* a, T* b) {
    T temp = *a;
    *a = *b;
    *b = temp;
}`,
            },
          ),
          diagram("Why not just use void*?", [
            { id: "voidp", label: "The `void*` way", color: C_RED, items: ["One body, but no type checking", "A cast at every single use", "Wrong cast compiles happily, then corrupts"] },
            { id: "tmpl", label: "The template way", color: C_GREEN, items: ["One body you maintain", "The compiler checks every use", "No casts, so no cast to get wrong"] },
            { id: "cost", label: "What it costs", color: C_SKY, items: ["A separate copy per type used", "A bigger binary, longer compiles", "Zero run-time overhead - it all happens before the program starts"] },
          ]),
          callout(
            "info",
            "This is exactly how `std::vector<T>`, `std::list<T>` and `std::map<K, V>` are built. When you write `vector<int>`, the compiler stamps out an int-shaped vector for you - which is why the standard containers cost nothing over a hand-written one.",
          ),
          quiz(
            "A program contains `Box<int> a(1);` and `Box<string> b(\"hi\");`. How many Box classes end up in the compiled binary?",
            [
              "One - Box is generic at run time",
              "Two - one generated per type actually used",
              "None - templates are only checked, never compiled",
              "As many as there are types in the program",
            ],
            1,
            "The compiler instantiates a template once per type you actually use. Types you never instantiate cost nothing.",
          ),
          quiz(
            "You put `template <class T> class Stack` in stack.h and its member bodies in stack.cpp. What happens?",
            [
              "It works normally",
              "A compiler error on the first line",
              "It compiles, then fails at link time with `undefined reference`",
              "The template silently becomes non-generic",
            ],
            2,
            "Each translation unit that uses Stack<int> needs the bodies to generate the code. They are not in the header, so nothing is generated and the linker finds no definition.",
          ),
          quiz(
            "What do templates cost at run time compared with hand-writing one class per type?",
            [
              "Nothing - the work happens at compile time",
              "One extra pointer dereference per call",
              "A type check on every method call",
              "They allocate on the heap",
            ],
            0,
            "Instantiation is a compile-time activity. The generated code is the same code you would have written by hand; you pay in binary size and compile time, not in speed.",
          ),
        ],
        challenge: {
          title: "Make the dynamic array generic",
          description:
            "Turn the hand-written IntVector into `DynamicArray<T>`. Finish `grow` (double the capacity, copy, free the old block) and `push_back` (grow when full, then store).",
          starterCode: `#include <iostream>
using namespace std;

template <class T>
class DynamicArray {
    T* data;
    int count;   // elements stored
    int cap;     // elements the block can hold

    void grow() {
        // TODO: double the capacity (from 1 if empty), copy the elements over, release the old block
    }

public:
    DynamicArray(int initialCap = 2)
        : data(new T[initialCap]), count(0), cap(initialCap) {}
    ~DynamicArray() { delete[] data; }

    void push_back(const T& value) {
        // TODO: grow first if the block is full, then store the value and bump the count
    }

    T& at(int i) { return data[i]; }
    int size() const { return count; }
    int capacity() const { return cap; }
};

int main() {
    DynamicArray<int> a;
    for (int i = 1; i <= 5; i++) a.push_back(i * 10);
    cout << a.size() << " " << a.capacity() << endl;  // 5 8
    cout << a.at(4) << endl;                          // 50

    DynamicArray<char> letters;
    letters.push_back('D');
    letters.push_back('S');
    cout << letters.at(0) << letters.at(1) << endl;   // DS
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

template <class T>
class DynamicArray {
    T* data;
    int count;
    int cap;

    void grow() {
        int newCap = cap == 0 ? 1 : cap * 2;
        T* fresh = new T[newCap];
        for (int i = 0; i < count; i++) fresh[i] = data[i];
        delete[] data;
        data = fresh;
        cap = newCap;
    }

public:
    DynamicArray(int initialCap = 2)
        : data(new T[initialCap]), count(0), cap(initialCap) {}
    ~DynamicArray() { delete[] data; }

    void push_back(const T& value) {
        if (count == cap) grow();
        data[count++] = value;
    }

    T& at(int i) { return data[i]; }
    int size() const { return count; }
    int capacity() const { return cap; }
};

int main() {
    DynamicArray<int> a;
    for (int i = 1; i <= 5; i++) a.push_back(i * 10);
    cout << a.size() << " " << a.capacity() << endl;  // 5 8
    cout << a.at(4) << endl;                          // 50

    DynamicArray<char> letters;
    letters.push_back('D');
    letters.push_back('S');
    cout << letters.at(0) << letters.at(1) << endl;   // DS
    return 0;
}`,
          tests: [
            { id: 1, label: "Doubles the capacity", keywords: [{ pattern: "cap\\s*\\*\\s*2" }], hint: "int newCap = cap == 0 ? 1 : cap * 2;" },
            { id: 2, label: "Allocates a bigger block inside grow", keywords: [{ pattern: "T\\s*\\*\\s*\\w+\\s*=\\s*new\\s+T\\s*\\[" }], hint: "T* fresh = new T[newCap];" },
            { id: 3, label: "Copies the old elements across", keywords: [{ pattern: "=\\s*data\\s*\\[" }], hint: "for (int i = 0; i < count; i++) fresh[i] = data[i];" },
            { id: 4, label: "Grows only when the block is full", keywords: [{ pattern: "count\\s*==\\s*cap" }], hint: "if (count == cap) grow(); at the top of push_back." },
          ],
        },
      },
    ],
  },
  {
    id: "linked-lists",
    title: "Linked Lists",
    icon: "🔗",
    color: C_GREEN,
    lessons: [
      {
        id: "cpp-ds-2-0",
        title: "Nodes, pointers, and \"dynamically linked\"",
        xp: 14,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Define a node as data plus one or more links",
            "Allocate and free nodes on the heap with new / delete",
            "Explain why linked structures are called dynamic",
          ]),
          text(
            "**Introduction:** An array keeps everything side by side in one block of memory. A **linked structure** does the opposite: each item sits wherever there happens to be room, and carries the address of the next item with it. Nothing is next to anything else - the chain is held together entirely by those addresses, which are called **pointers**.\n\n**Real-life example:** A treasure hunt. Each clue is hidden in a different place, and every clue tells you where the next one is. The clues are scattered all over the park, but as long as you hold the first one you can reach every single one of them.",
          ),
          text(
            "In this topic you will learn:\n\n- what a **node** is: a value plus one or more links\n- how to create nodes at run time with `new` and release them with `delete`\n- why the whole list is just a single pointer called the **head**\n- what \"dynamic\" actually means and why it matters",
          ),
          scenario(
            "Think of it like this",
            "Picture a train made of carriages that are never coupled in a fixed yard. Each carriage carries a note saying which carriage comes next, and the last one's note says \"nothing follows\" - that is `nullptr`. You can add a carriage anywhere by rewriting two notes, and you never have to shunt the whole train to make room. The catch is the flip side: there is no such thing as \"carriage number 7\". To reach the seventh carriage you must walk through the first six, because the only way in is the front.",
          ),
          text(
            "In precise terms, a **node** is a small struct holding a value and one or more pointers to other nodes. Nodes are created on the **heap** at run time with `new` and released with `delete` - the list grows and shrinks one node at a time, with no big contiguous block and no resizing. That per-node, run-time allocation is exactly why linked structures are called **dynamic**.",
            {
              label: "A three-node chain by hand",
              content: `struct Node {
    int value;
    Node* next;
};

Node* head = new Node{10, nullptr};
head->next = new Node{20, nullptr};
head->next->next = new Node{30, nullptr};
// 10 -> 20 -> 30 -> nullptr`,
            },
          ),
          text(
            "The list *is* just a pointer to the first node - the **head**. `nullptr` marks the end. To free the list you walk it, saving `next` before you `delete` the current node.",
          ),
          diagram("Anatomy of a linked list", [
            { id: "head", label: "head pointer", color: ACCENT, items: ["points at the first node", "the whole list handle"] },
            { id: "node", label: "each node", color: C_GREEN, items: ["value + next pointer", "scattered on the heap"] },
            { id: "end", label: "last node", color: C_SKY, items: ["next == nullptr", "the terminator"] },
          ]),
          callout(
            "warning",
            "Every `new` needs a matching `delete`. Losing the only pointer to a node leaks it; deleting twice is undefined behaviour. In real code prefer `std::unique_ptr` or just `std::list`.",
          ),
          quiz(
            "What marks the end of a singly linked list?",
            ["A node whose value is 0", "The head pointer", "A node whose next is nullptr", "An empty string"],
            2,
            "Traversal stops when next is nullptr.",
          ),
        ],
        challenge: {
          title: "Build a chain",
          description:
            "Return the head of 1 -> 2 -> 3 from `buildChain`, and walk it in `sumChain`.",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

Node* buildChain() {
    // TODO: build 1 -> 2 -> 3 -> nullptr and return the head
    return nullptr;
}

int sumChain(Node* head) {
    // TODO: follow next from head, adding values
    return 0;
}

int main() {
    cout << sumChain(buildChain()) << endl; // 6
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

Node* buildChain() {
    Node* head = new Node{1, nullptr};
    head->next = new Node{2, nullptr};
    head->next->next = new Node{3, nullptr};
    return head;
}

int sumChain(Node* head) {
    int total = 0;
    while (head != nullptr) {
        total += head->value;
        head = head->next;
    }
    return total;
}

int main() {
    cout << sumChain(buildChain()) << endl; // 6
    return 0;
}`,
          tests: [
            { id: 1, label: "Allocates nodes on the heap", keywords: [{ pattern: "new Node" }], hint: "new Node{value, nullptr}." },
            { id: 2, label: "Links nodes through next", keywords: [{ pattern: "->next" }], hint: "head->next = ..." },
            { id: 3, label: "Walks the chain in a loop", keywords: [{ pattern: "while" }], hint: "while (head != nullptr) advance head = head->next." },
          ],
        },
      },
      {
        id: "cpp-ds-2-1",
        title: "Singly linked list: the core operations",
        xp: 16,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Implement push_front, traverse, search and erase on a singly linked list",
            "State the cost of each and why push_back needs a tail pointer to be O(1)",
            "Explain how a dummy head node removes edge cases",
          ]),
          text(
            "**Introduction:** Now that you can build a chain of nodes, you need the handful of operations that make it useful: adding at the front, adding at the back, walking through it, and removing an item. Each one is just a matter of rewriting a couple of pointers - but *which* pointers you can reach decides whether an operation is instant or slow.\n\n**Real-life example:** A queue of people where each person only knows who is behind them. Adding someone at the front is instant. Adding someone at the very back means walking down the whole line to find out who is currently last - unless somebody is standing there keeping track of the end.",
          ),
          text(
            "In this topic you will learn:\n\n- the four core operations: push_front, push_back, search and erase\n- what each one costs, and why\n- how a `tail` pointer turns `push_back` from `O(n)` into `O(1)`\n- the **dummy head** trick that makes deleting the first node stop being a special case",
          ),
          scenario(
            "Think of it like this",
            "Deleting from a linked list is like removing one carriage from a train. You cannot just unhook it - you have to find the carriage *in front* of it and hook that one directly onto whatever came after. Since each carriage only knows what follows it, you have to walk the train from the front keeping one hand on the previous carriage. And there is an annoying special case: if the carriage you are deleting is the very first one, there is no previous carriage, so the rule breaks. A **dummy head** - an empty carriage permanently parked at the front - makes that case disappear, because now there is always something in front.",
          ),
          text(
            "A **singly linked list** keeps a `head` pointer; each node points only forward.\n\n- **push_front(x)** - new node, its `next = head`, then `head = new node`. `O(1)`.\n- **push_back(x)** - walk to the last node, link it on. `O(n)` - or `O(1)` if you also keep a `tail` pointer.\n- **traverse / search** - follow `next` from `head`. `O(n)`.\n- **erase(value)** - keep a `prev` pointer, set `prev->next = cur->next`, `delete cur`. `O(n)` to find, `O(1)` to unlink.",
            {
              label: "push_front and print",
              content: `struct Node { int value; Node* next; };

Node* head = nullptr;
void push_front(int x) {
    head = new Node{x, head};   // new node points at old head
}

for (Node* p = head; p; p = p->next) cout << p->value << " ";`,
            },
          ),
          table(
            "Singly linked list operation costs",
            ["head pointer only", "head + tail pointers"],
            [
              ["push_front", "O(1)", "O(1)"],
              ["push_back", "O(n)", "O(1)"],
              ["pop_front", "O(1)", "O(1)"],
              ["pop_back", "O(n)", "O(n)"],
              ["search / access by index", "O(n)", "O(n)"],
            ],
            { rowLabelHeader: "Operation", footnote: "pop_back stays O(n) even with a tail pointer - a singly linked list can't step backward to find the new last node. That is what the doubly linked list fixes." },
          ),
          callout(
            "tip",
            "A **dummy head** - a sentinel node before the real first element - means `prev` always exists, so \"am I deleting the head?\" stops being a special case.",
          ),
          diagram("Pointer rewiring", [
            { id: "pf", label: "push_front", color: C_GREEN, items: ["set new->next = head", "set head = new", "2 writes, O(1)"] },
            { id: "er", label: "erase", color: C_AMBER, items: ["walk to find prev", "prev->next = cur->next", "delete cur"] },
          ]),
          quiz(
            "With only a head pointer (no tail), push_back is:",
            ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            2,
            "You must walk the whole list to reach the last node. A tail pointer makes it O(1).",
          ),
        ],
        challenge: {
          title: "Singly linked list",
          description:
            "Implement `push_front`, `length`, and `contains` on the given list struct.",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

struct SinglyLinkedList {
    Node* head = nullptr;

    void push_front(int x) {
        // TODO
    }
    int length() {
        // TODO
        return 0;
    }
    bool contains(int x) {
        // TODO
        return false;
    }
};

int main() {
    SinglyLinkedList list;
    list.push_front(3);
    list.push_front(2);
    list.push_front(1);              // 1 -> 2 -> 3
    cout << list.length() << endl;   // 3
    cout << list.contains(2) << endl; // 1
    cout << list.contains(9) << endl; // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

struct SinglyLinkedList {
    Node* head = nullptr;

    void push_front(int x) {
        head = new Node{x, head};
    }
    int length() {
        int n = 0;
        for (Node* p = head; p; p = p->next) n++;
        return n;
    }
    bool contains(int x) {
        for (Node* p = head; p; p = p->next)
            if (p->value == x) return true;
        return false;
    }
};

int main() {
    SinglyLinkedList list;
    list.push_front(3);
    list.push_front(2);
    list.push_front(1);              // 1 -> 2 -> 3
    cout << list.length() << endl;   // 3
    cout << list.contains(2) << endl; // 1
    cout << list.contains(9) << endl; // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "push_front allocates a node", keywords: [{ pattern: "new Node" }], hint: "new Node{x, head}." },
            { id: 2, label: "push_front updates head", keywords: [{ pattern: "head = " }], hint: "head must point at the new node." },
            { id: 3, label: "length / contains walk next", keywords: [{ pattern: "p->next" }], hint: "for (Node* p = head; p; p = p->next)." },
          ],
        },
      },
      {
        id: "cpp-ds-2-2",
        title: "Doubly linked list: two-way links, O(1) delete",
        xp: 16,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Describe the extra cost and the payoff of a prev pointer",
            "Explain why erase of a held node is O(1) on a doubly linked list",
            "Recognise std::list and the LRU-cache use case",
          ]),
          text(
            "**Introduction:** In a singly linked list every node points only forward, so you can never step backwards. A **doubly linked list** fixes that by giving each node a second pointer aimed at the node behind it. One extra pointer per node, and suddenly you can walk in either direction and remove a node without hunting for the one before it.\n\n**Real-life example:** Your browser's back and forward buttons. Each page you visit remembers both the page you came from and the page you went to next, so you can move either way through your history without reloading anything.",
          ),
          text(
            "In this topic you will learn:\n\n- what the extra `prev` pointer costs and what it buys you\n- why deleting a node you already hold becomes `O(1)`\n- how `head` and `tail` together make both ends cheap\n- why `std::list` is built this way, and where you would actually use it",
          ),
          scenario(
            "Think of it like this",
            "Think of a music playlist. Each song knows the song before it and the song after it, so **next** and **previous** both work instantly. Now suppose you are on track 7 and want to delete it. In a singly linked playlist you would have to start at track 1 and walk forward until you found the track pointing at 7, just to unhook it. In a doubly linked playlist track 7 already knows that track 6 is behind it - so you introduce 6 and 8 to each other, drop 7, and you are done without moving from where you stand.",
          ),
          text(
            "In precise terms, a **doubly linked list** node carries both `prev` and `next`. It costs an extra pointer per node and a few more pointer updates per operation, and buys:\n\n- **`O(1)` erase given a pointer to the node** - no walk from head to find `prev`\n- **`O(1)` push_back / pop_back** with a `tail` pointer\n- backward traversal",
            {
              label: "push_back with head and tail",
              content: `struct Node { int value; Node* prev; Node* next; };
Node* head = nullptr;
Node* tail = nullptr;

void push_back(int x) {
    Node* n = new Node{x, tail, nullptr};
    if (tail) tail->next = n;
    else head = n;      // list was empty
    tail = n;
}`,
            },
          ),
          text(
            "This is exactly what `std::list` is. It is the right pick for an **LRU cache** - the \"least recently used\" cache that keeps whatever you touched most recently at the front and throws away whatever has sat at the back longest. Every touch is a move-to-front of a node you already hold, which is `O(1)` here and `O(n)` on anything else. The same reasoning applies to any workload that splices nodes it already has a handle to.",
          ),
          diagram("Pointer updates", [
            { id: "ins", label: "insert between A and B", color: C_GREEN, items: ["4 pointers rewired", "A.next, B.prev, new.prev, new.next"] },
            { id: "del", label: "erase a held node X", color: C_AMBER, items: ["X.prev->next = X.next", "X.next->prev = X.prev", "O(1), no search"] },
          ]),
          callout(
            "info",
            "A **circular doubly linked list with a sentinel** (the real `std::list` layout) makes every case uniform - no nullptr checks, the ends wrap to the sentinel.",
          ),
          quiz(
            "The main thing a doubly linked list gives you over a singly linked one is:",
            [
              "Less memory per node",
              "O(1) erase of a node you already point to, plus backward traversal",
              "O(1) random access by index",
              "Automatic sorting",
            ],
            1,
            "The prev pointer removes the O(n) walk to find the predecessor.",
          ),
        ],
        challenge: {
          title: "Doubly linked list",
          description:
            "Implement `push_back` (maintaining `tail`) and `push_front` (maintaining `head`).",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* prev; Node* next; };

struct DoublyLinkedList {
    Node* head = nullptr;
    Node* tail = nullptr;

    void push_back(int x) {
        // TODO: link at tail; if empty, also set head
    }
    void push_front(int x) {
        // TODO: link at head; if empty, also set tail
    }
    int count() {
        int n = 0;
        for (Node* p = head; p; p = p->next) n++;
        return n;
    }
};

int main() {
    DoublyLinkedList d;
    d.push_back(2);
    d.push_back(3);
    d.push_front(1);              // 1 <-> 2 <-> 3
    cout << d.count() << endl;        // 3
    cout << d.head->value << endl;    // 1
    cout << d.tail->value << endl;    // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* prev; Node* next; };

struct DoublyLinkedList {
    Node* head = nullptr;
    Node* tail = nullptr;

    void push_back(int x) {
        Node* n = new Node{x, tail, nullptr};
        if (tail) tail->next = n;
        else head = n;
        tail = n;
    }
    void push_front(int x) {
        Node* n = new Node{x, nullptr, head};
        if (head) head->prev = n;
        else tail = n;
        head = n;
    }
    int count() {
        int n = 0;
        for (Node* p = head; p; p = p->next) n++;
        return n;
    }
};

int main() {
    DoublyLinkedList d;
    d.push_back(2);
    d.push_back(3);
    d.push_front(1);              // 1 <-> 2 <-> 3
    cout << d.count() << endl;        // 3
    cout << d.head->value << endl;    // 1
    cout << d.tail->value << endl;    // 3
    return 0;
}`,
          tests: [
            { id: 1, label: "Allocates nodes", keywords: [{ pattern: "new Node" }], hint: "new Node{x, prev, next}." },
            { id: 2, label: "Maintains the tail pointer", keywords: [{ pattern: "tail = n" }], hint: "push_back ends with tail = n." },
            { id: 3, label: "Sets prev links", keywords: [{ pattern: "->prev" }], hint: "push_front does head->prev = n." },
          ],
        },
      },
      {
        id: "cpp-ds-2-3",
        title: "Circular linked lists",
        xp: 10,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Describe how a circular list closes the loop instead of terminating",
            "List real uses: round-robin, ring buffers, turn order",
            "Write a traversal that stops after exactly one full pass",
          ]),
          text(
            "**Introduction:** A **circular linked list** has no end. Instead of the last node pointing at nothing, it points back at the first node, so the chain closes into a loop. That means there is no `nullptr` to stop you - you know you have finished a lap when you arrive back at the node you started from.\n\n**Real-life example:** Taking turns in a board game. After the last player it is the first player's turn again. Nobody \"reaches the end\" of the table; the turn order just keeps going round.",
          ),
          text(
            "In simple words:\n\n- the last node links back to the first instead of to `nullptr`\n- there is no natural end, so every loop needs its own stopping rule\n- it is the natural shape for anything that repeats forever",
          ),
          scenario(
            "Think of it like this",
            "A circular list is a carousel. There is no first horse and no last horse - just horses going round. If you want to look at every horse exactly once, you pick one, note it, and keep going until that same horse comes back around. That is the whole traversal rule, and it is also the whole danger: write the usual `while (p != nullptr)` here and your program will ride the carousel forever, because `nullptr` never comes.",
          ),
          text(
            "In precise terms: the last node's `next` points back to the first, and in a circular *doubly* linked list `head->prev` points to the tail as well. There is no `nullptr` terminator anywhere - you stop when you arrive back where you started.",
            {
              label: "Exactly one pass",
              content: `Node* p = head;
if (p) {
    do {
        cout << p->value << " ";
        p = p->next;
    } while (p != head);
}`,
            },
          ),
          text(
            "Uses: round-robin schedulers (cycle through tasks forever), the buffer behind a **circular queue** (next lesson), turn order in a board game, repeating playlists, and Josephus-style elimination problems.",
          ),
          diagram("Linear end vs circular end", [
            { id: "lin", label: "Singly linked (linear)", color: C_GREEN, items: ["head -> A -> B -> C -> nullptr", "stop when next == nullptr"] },
            { id: "cir", label: "Circular singly linked", color: ACCENT, items: ["head -> A -> B -> C -+", "C.next points back to A", "stop when you reach head again"] },
            { id: "cird", label: "Circular doubly linked", color: C_SKY, items: ["head.prev == tail", "tail.next == head", "no nullptr anywhere - the std::list layout"] },
          ]),
          callout(
            "warning",
            "Every traversal needs an explicit stop condition. A plain `while (p != nullptr)` never ends on a circular list - it spins forever.",
          ),
          quiz(
            "How do you detect the end of one full pass over a circular list?",
            [
              "When next is nullptr",
              "When the pointer returns to the start node",
              "When the value repeats",
              "After exactly 10 steps",
            ],
            1,
            "There is no nullptr; you have looped once when you are back at the node you started from.",
          ),
        ],
        challenge: {
          title: "Count a circular list",
          description:
            "Count the nodes in a circular singly linked list - the last node's `next` points back to `head`. An empty list (`head == nullptr`) has 0.",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

int countCircular(Node* head) {
    // TODO: walk with a do/while, stopping when you return to head
    return 0;
}

int main() {
    Node a{1, nullptr}, b{2, nullptr}, c{3, nullptr}, d{4, nullptr};
    a.next = &b; b.next = &c; c.next = &d; d.next = &a;   // circular
    cout << countCircular(&a) << endl;      // 4
    cout << countCircular(nullptr) << endl; // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int value; Node* next; };

int countCircular(Node* head) {
    if (head == nullptr) return 0;
    int n = 0;
    Node* p = head;
    do {
        n++;
        p = p->next;
    } while (p != head);
    return n;
}

int main() {
    Node a{1, nullptr}, b{2, nullptr}, c{3, nullptr}, d{4, nullptr};
    a.next = &b; b.next = &c; c.next = &d; d.next = &a;
    cout << countCircular(&a) << endl;      // 4
    cout << countCircular(nullptr) << endl; // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses a do/while loop", keywords: [{ pattern: "do \\{" }], hint: "Count the first node before checking the stop condition." },
            { id: 2, label: "Stops when back at head", keywords: [{ pattern: "while \\(p != head\\)" }], hint: "One full lap ends at head." },
            { id: 3, label: "Handles the empty list", keywords: [{ pattern: "head == nullptr" }], hint: "Return 0 before entering the loop." },
          ],
        },
      },
      {
        id: "cpp-ds-2-4",
        title: "Skip lists: a linked list that searches in O(log n)",
        xp: 12,
        chapterTitle: "Linked Lists",
        theory: [
          objectives([
            "Explain how stacked express lanes turn O(n) list search into O(log n)",
            "Describe how a random coin flip sets each node's height",
            "Compare a skip list to a balanced BST",
          ]),
          text(
            "**Introduction:** Searching a sorted linked list is slow, because you cannot jump to the middle - you have to walk. A **skip list** solves that by building extra lists on top of the real one, each holding roughly half the nodes of the list below. Those upper lists let you cover ground in big strides and only drop down to the slow, complete list when you are already close.\n\n**Real-life example:** A city rail network. The express line stops only at four major stations, the semi-fast line stops at twelve, and the local line stops everywhere. To reach a small station you ride the express as far as you can, switch down to the semi-fast, then finish on the local - far quicker than taking the local the entire way.",
          ),
          text(
            "In this topic you will learn:\n\n- why a sorted linked list cannot be binary searched\n- how stacked \"express lanes\" bring search down to `O(log n)`\n- how a coin flip decides each node's height, with no rebalancing needed\n- how a skip list compares with a balanced BST",
          ),
          scenario(
            "Think of it like this",
            "The clever part is how a skip list decides which nodes get to be express stops - it flips a coin. Every node is on the bottom line. Flip heads and it also joins the line above; flip heads again and it joins the one above that; stop at the first tails. Nobody plans it, nobody rebalances anything, and yet about half the nodes land on level 1, a quarter on level 2, and so on - which is exactly the spacing you wanted. Randomness does the job that rotations do in an AVL tree, and it does it with far less code.",
          ),
          text(
            "In precise terms: level 0 holds every node; level 1 holds about half of them; level 2 about a quarter; and so on up. **Search** starts at the top-left, moves right while the next value is <= the target, drops down a level whenever moving right would overshoot, and repeats. Each level roughly halves the distance still to cover, so search, insert and delete are all **`O(log n)` expected**.",
          ),
          text(
            "A new node's **height** is set by coin flips: it is always on level 0; with probability 1/2 also on level 1; with probability 1/4 also on level 2; and so on. No rotations, no rebalancing - the randomness keeps the level populations right on average.",
          ),
          diagram("Skip-list levels (searching for 25)", [
            { id: "l2", label: "Level 2", color: ACCENT, items: ["head -> 17 -> nil"] },
            { id: "l1", label: "Level 1", color: C_SKY, items: ["head -> 9 -> 17 -> 25 -> nil"] },
            { id: "l0", label: "Level 0", color: C_GREEN, items: ["3 - 9 - 12 - 17 - 21 - 25 - 30"] },
          ]),
          table(
            "Why the express lanes work: level populations",
            ["Appears on this level with probability", "Nodes in a 1,000-node list"],
            [
              ["Level 0 (every node)", "1", "1000"],
              ["Level 1", "1/2", "~500"],
              ["Level 2", "1/4", "~250"],
              ["Level 3", "1/8", "~125"],
              ["Level k", "1 / 2^k", "~1000 / 2^k"],
            ],
            { rowLabelHeader: "Level", footnote: "Each level up halves the population, so the tallest tower is about log2(n) high - and search drops one level per step." },
          ),
          callout(
            "info",
            "Redis uses skip lists for its sorted sets. They are popular in concurrent code because localised pointer updates are easier to make lock-free than tree rotations.",
          ),
          quiz(
            "What decides how many express lanes a skip-list node appears in?",
            [
              "Its value",
              "A random coin flip, one per level",
              "Its insertion order",
              "The total number of nodes",
            ],
            1,
            "Repeated 50/50 coin flips give the geometric level distribution that keeps search at O(log n) expected.",
          ),
        ],
        challenge: {
          title: "Search with an express lane",
          description:
            "`full` is sorted; `express` holds `full[0], full[4], full[8], ...` (stride 4). Use `express` to jump near `x`, then scan a short stretch of `full`.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

bool search(const vector<int>& full, const vector<int>& express, int x) {
    // TODO:
    //  1) advance e while express[e + 1] <= x
    //  2) scan full from e * 4 forward while full[i] <= x
    return false;
}

int main() {
    vector<int> full = {2, 5, 9, 14, 20, 25, 31, 38, 40, 44, 50, 61};
    vector<int> express = {2, 20, 40};   // full[0], full[4], full[8]
    cout << search(full, express, 25) << endl; // 1
    cout << search(full, express, 44) << endl; // 1
    cout << search(full, express, 30) << endl; // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

bool search(const vector<int>& full, const vector<int>& express, int x) {
    int e = 0;
    while (e + 1 < (int)express.size() && express[e + 1] <= x) e++;
    for (int i = e * 4; i < (int)full.size() && full[i] <= x; i++) {
        if (full[i] == x) return true;
    }
    return false;
}

int main() {
    vector<int> full = {2, 5, 9, 14, 20, 25, 31, 38, 40, 44, 50, 61};
    vector<int> express = {2, 20, 40};
    cout << search(full, express, 25) << endl; // 1
    cout << search(full, express, 44) << endl; // 1
    cout << search(full, express, 30) << endl; // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "Walks the express lane", keywords: [{ pattern: "express\\[e \\+ 1\\]" }], hint: "Advance e while the next express value is still <= x." },
            { id: 2, label: "Drops into the right block of full", keywords: [{ pattern: "e \\* 4" }], hint: "Express index e maps to full index e * 4." },
            { id: 3, label: "Finds the value", keywords: [{ pattern: "full\\[i\\] == x" }], hint: "Return true on an exact match." },
          ],
        },
      },
    ],
  },
  {
    id: "stack-queue-deque",
    title: "Stacks, Queues, Deques",
    icon: "📚",
    color: C_AMBER,
    lessons: [
      {
        id: "cpp-ds-3-0",
        title: "Stack: last in, first out",
        xp: 14,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "State the three O(1) stack operations and the LIFO rule",
            "Compare array-backed and list-backed stacks",
            "Name real systems built on a stack",
          ]),
          text(
            "**Introduction:** A **stack** is a container that only lets you touch one end. You add on top, you remove from the top, and you can look at the top - that is all. The most recently added item is always the first one to leave, which is why it is called **LIFO**: last in, first out.\n\n**Real-life example:** A stack of plates in a kitchen. You put clean plates on top and you take the top plate off. Getting to a plate in the middle would mean lifting everything above it first, so nobody does.",
          ),
          text(
            "In simple words:\n\n- three operations, all `O(1)`: `push`, `pop`, `top`\n- the newest item always leaves first\n- restricting yourself to one end is what makes every operation cheap",
          ),
          scenario(
            "Think of it like this",
            "Think about the undo button. You typed a word, then bolded it, then changed the colour. Press undo and the colour change is reversed first - the most recent action, not the oldest. Press again and the bolding goes. Your editor is holding those actions on a stack, and undo is simply `pop`. The same shape shows up everywhere once you notice it: the browser back button, the trail of function calls your program is inside right now, and the breadcrumb of turns you retrace when a maze path dead-ends.",
          ),
          text(
            "In precise terms, a stack exposes three `O(1)` operations at **one end**, the *top*: `push` (add), `pop` (remove the most recent), and `top` / `peek` (look without removing).",
          ),
          text(
            "Two natural implementations, both `O(1)`:\n\n- **array / vector-backed** - `push` is `push_back`, `pop` is `pop_back`. Cache-friendly, amortised `O(1)`. This is what `std::stack` uses by default.\n- **linked-list-backed** - push and pop at the head. True worst-case `O(1)`, no reallocation, but one node allocation per push.",
            {
              label: "std::stack and a vector as a stack",
              content: `#include <stack>
#include <vector>
using namespace std;

stack<int> s;
s.push(1); s.push(2);
cout << s.top() << "\\n";   // 2
s.pop();

vector<int> v;
v.push_back(10);           // push
int x = v.back(); v.pop_back();   // top + pop`,
            },
          ),
          text(
            "Where stacks show up: the **call stack** (function frames), expression parsing (shunting-yard), undo/redo, backtracking and DFS, balanced-bracket checking, the browser back button.",
          ),
          quiz(
            "You push A, then B, then C. In what order do three pops return them?",
            ["A, B, C", "C, B, A", "B, A, C", "C, A, B"],
            1,
            "LIFO: the last pushed (C) comes out first.",
          ),
        ],
        challenge: {
          title: "Balanced brackets",
          description:
            "Return true iff every `(`, `[`, `{` in `s` is closed by the matching bracket in the right order.",
          starterCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(const string& s) {
    // TODO: push openers; on a closer, check the top matches
    return true;
}

int main() {
    cout << isBalanced("{[()()]}") << endl; // 1
    cout << isBalanced("([)]") << endl;     // 0
    cout << isBalanced("(((") << endl;      // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isBalanced(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else if (c == ')' || c == ']' || c == '}') {
            if (st.empty()) return false;
            char open = st.top();
            st.pop();
            if ((c == ')' && open != '(') ||
                (c == ']' && open != '[') ||
                (c == '}' && open != '{')) return false;
        }
    }
    return st.empty();
}

int main() {
    cout << isBalanced("{[()()]}") << endl; // 1
    cout << isBalanced("([)]") << endl;     // 0
    cout << isBalanced("(((") << endl;      // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "Pushes opening brackets", keywords: [{ pattern: "\\.push\\(" }], hint: "st.push(c) for openers." },
            { id: 2, label: "Pops on a closing bracket", keywords: [{ pattern: "\\.pop\\(\\)" }], hint: "st.pop() after reading the top." },
            { id: 3, label: "Rejects a mismatch", keywords: [{ pattern: "return false" }], hint: "Return false on empty stack or wrong opener." },
          ],
        },
      },
      {
        id: "cpp-ds-3-1",
        title: "Queue: first in, first out (and the ring buffer)",
        xp: 16,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "State the FIFO rule and the O(1) queue operations",
            "Explain why a plain array makes a poor queue",
            "Implement a circular buffer with wrap-around indices",
          ]),
          text(
            "**Introduction:** A **queue** is the opposite of a stack. You add at the back and remove from the front, so whoever arrived first also leaves first. That is **FIFO**: first in, first out - the rule people mean when they say something is fair.\n\n**Real-life example:** The line at a shop counter. New customers join at the back, the cashier serves the person at the front, and nobody jumps in the middle.",
          ),
          text(
            "In this topic you will learn:\n\n- the FIFO rule and the two `O(1)` operations, `enqueue` and `dequeue`\n- why a plain array makes a surprisingly bad queue\n- how a **ring buffer** gets `O(1)` at both ends out of a fixed array\n- where queues show up in real systems",
          ),
          scenario(
            "Think of it like this",
            "Here is the problem with using a plain array. When the front person is served, everybody else shuffles forward one place - and if there are a thousand people in line, that is a thousand movements for a single customer served. A **ring buffer** fixes this the way a cinema usher would: instead of making everyone shuffle, you just move the sign that says \"the line starts here\". The people never move at all. When the sign reaches the last seat it wraps round to seat one, which is what `% capacity` does in the code.",
          ),
          text(
            "So a plain array is a bad fit: removing the front by shifting everything down is `O(n)`. Two good implementations instead:\n\n- **linked list with head + tail** - dequeue at head, enqueue at tail, both `O(1)`.\n- **circular buffer (ring buffer)** - a fixed array with `front` and `count` indices that wrap with `% capacity`. `O(1)`, zero per-operation allocation, contiguous memory. The backbone of bounded producer/consumer queues, audio buffers, and network stacks.",
            {
              label: "Ring buffer core",
              content: `int data[CAP], front = 0, count = 0;

void enqueue(int x) {
    data[(front + count) % CAP] = x;
    count++;
}
int dequeue() {
    int x = data[front];
    front = (front + 1) % CAP;
    count--;
    return x;
}`,
            },
          ),
          text(
            "`std::queue` is an adapter over `std::deque`. Queues drive BFS (Chapter 8), job scheduling, and request buffering.",
          ),
          arrayViz(
            "A ring buffer wraps the indices, it never shifts data",
            [
              {
                label: "slots",
                values: ["-", "-", "C", "D", "E", "-", "-", "-"],
                colLabels: ["0", "1", "2", "3", "4", "5", "6", "7"],
                okIndexes: [2, 3, 4],
              },
            ],
            "front = 2, count = 3. dequeue returns slots[2] and sets front = 3. enqueue writes at (front + count) % 8 = (2 + 3) % 8 = 5. When an index runs past 7 it wraps back to 0 - no element ever moves.",
          ),
          callout(
            "warning",
            "A ring buffer is **bounded**. Decide up front what a full buffer does: block, drop the oldest, drop the newest, or grow.",
          ),
          quiz(
            "In a circular buffer of capacity 8 with front = 6 and count = 4, which index holds the newest element?",
            ["6", "9", "1", "10"],
            2,
            "(front + count - 1) % 8 = (6 + 3) % 8 = 1.",
          ),
        ],
        challenge: {
          title: "Ring buffer queue",
          description:
            "Implement `enqueue`, `dequeue`, and `empty` on a fixed `int data[CAP]` using `front` and `count` with `% CAP`.",
          starterCode: `#include <iostream>
using namespace std;

struct RingQueue {
    static const int CAP = 8;
    int data[CAP];
    int front = 0;
    int count = 0;

    bool empty() { return count == 0; }
    void enqueue(int x) {
        // TODO: write at (front + count) % CAP, then count++
    }
    int dequeue() {
        // TODO: read data[front], advance front with % CAP, count--
        return -1;
    }
};

int main() {
    RingQueue q;
    for (int i = 1; i <= 5; i++) q.enqueue(i);
    cout << q.dequeue() << endl; // 1
    cout << q.dequeue() << endl; // 2
    q.enqueue(6);
    q.enqueue(7);
    int sum = 0;
    while (!q.empty()) sum += q.dequeue();
    cout << sum << endl;         // 3+4+5+6+7 = 25
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct RingQueue {
    static const int CAP = 8;
    int data[CAP];
    int front = 0;
    int count = 0;

    bool empty() { return count == 0; }
    void enqueue(int x) {
        data[(front + count) % CAP] = x;
        count++;
    }
    int dequeue() {
        int x = data[front];
        front = (front + 1) % CAP;
        count--;
        return x;
    }
};

int main() {
    RingQueue q;
    for (int i = 1; i <= 5; i++) q.enqueue(i);
    cout << q.dequeue() << endl; // 1
    cout << q.dequeue() << endl; // 2
    q.enqueue(6);
    q.enqueue(7);
    int sum = 0;
    while (!q.empty()) sum += q.dequeue();
    cout << sum << endl;         // 3+4+5+6+7 = 25
    return 0;
}`,
          tests: [
            { id: 1, label: "Wraps indices with % CAP", keywords: [{ pattern: "% CAP" }], hint: "(front + count) % CAP and (front + 1) % CAP." },
            { id: 2, label: "Advances front on dequeue", keywords: [{ pattern: "front = " }], hint: "front = (front + 1) % CAP." },
            { id: 3, label: "Tracks the element count", keywords: [{ pattern: "count" }], hint: "count++ on enqueue, count-- on dequeue." },
          ],
        },
      },
      {
        id: "cpp-ds-3-2",
        title: "Deque: both ends open",
        xp: 10,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "State the four O(1) deque operations",
            "Describe how std::deque is laid out and what that costs",
            "Recognise the sliding-window (monotonic deque) use case",
          ]),
          text(
            "**Introduction:** A **deque** (short for double-ended queue, said \"deck\") opens up both ends. You can add and remove at the front *and* at the back, and all four of those operations are `O(1)`. Anything a stack can do and anything a queue can do, a deque can do too.\n\n**Real-life example:** A queue at a hospital reception where urgent patients are added at the front while everyone else joins at the back, and people can also give up and leave from either end.",
          ),
          text(
            "In simple words:\n\n- four `O(1)` operations: `push_front`, `push_back`, `pop_front`, `pop_back`\n- it does everything a stack does and everything a queue does\n- `std::stack` and `std::queue` are literally built on top of it",
          ),
          scenario(
            "Think of it like this",
            "Think of a train platform with doors at both ends of the carriage. People can board or step off at either door, so the carriage does not care which end is \"the front\". That flexibility is why a deque solves **sliding-window** problems: as your window moves along the data you add the new item at one end and drop the expired item off the other end, both instantly. With a stack or a plain queue one of those two moves would cost you `O(n)`.",
          ),
          text(
            "In precise terms, a deque supports `O(1)` insert and remove at **both** ends: `push_front`, `push_back`, `pop_front`, `pop_back`. It is a strict superset of a stack and a queue.",
          ),
          text(
            "`std::deque` is a **map of fixed-size chunks** - an array of pointers to blocks. That gives `O(1)` push/pop at both ends, `O(1)` indexed access (two lookups), and - unlike `vector` - references to existing elements survive a push at either end. The trade: slightly slower iteration than `vector`, more overhead, non-contiguous storage.",
          ),
          text(
            "Uses: work-stealing schedulers (owner takes from one end, thieves from the other), **sliding-window** algorithms (the monotonic deque solves sliding-window max/min in `O(n)`), palindrome checks, and any \"add or remove at either end\" buffer.",
          ),
          diagram("Deque vs its adapters", [
            { id: "dq", label: "std::deque", color: C_AMBER, items: ["push/pop both ends", "index access", "reference-stable at the ends"] },
            { id: "ad", label: "stack & queue", color: ACCENT, items: ["adapters over deque", "expose a restricted subset"] },
          ]),
          quiz(
            "Which operation is O(1) and reference-safe on std::deque but not guaranteed cheap on std::vector?",
            ["push_back", "operator[]", "push_front", "size"],
            2,
            "vector::push_front does not exist; inserting at the front is O(n) and may reallocate.",
          ),
        ],
        challenge: {
          title: "Palindrome from both ends",
          description:
            "Treat the string as a deque: compare the two ends and move inward. Return true if it reads the same forwards and backwards.",
          starterCode: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(const string& s) {
    // TODO: left = 0, right = s.size() - 1; step inward
    return true;
}

int main() {
    cout << isPalindrome("racecar") << endl; // 1
    cout << isPalindrome("level") << endl;   // 1
    cout << isPalindrome("crane") << endl;   // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

bool isPalindrome(const string& s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    cout << isPalindrome("racecar") << endl; // 1
    cout << isPalindrome("level") << endl;   // 1
    cout << isPalindrome("crane") << endl;   // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "Compares the two ends", keywords: [{ pattern: "s\\[left\\] != s\\[right\\]" }], hint: "Mismatch means not a palindrome." },
            { id: 2, label: "Moves the left index in", keywords: [{ pattern: "left\\+\\+" }], hint: "Advance from the front." },
            { id: 3, label: "Moves the right index in", keywords: [{ pattern: "right--" }], hint: "Retreat from the back." },
          ],
        },
      },
      {
        id: "cpp-ds-3-3",
        title: "Picking the right adapter",
        xp: 10,
        chapterTitle: "Stacks, Queues, Deques",
        theory: [
          objectives([
            "Choose stack / queue / deque by which ends you touch",
            "Know when the answer is actually a heap instead",
            "Recognise monotonic stack / deque as one extra invariant",
          ]),
          text(
            "**Introduction:** Stack, queue and deque are all the same underlying idea - a line of items with cheap ends. What separates them is simply **which ends you are allowed to touch**. Once you can name the ends a problem needs, the choice makes itself.\n\n**Real-life example:** Three ways of handling a pile of paperwork. Deal with the newest form first and you have a stack. Deal with them in the order they arrived and you have a queue. Handle the newest *and* the oldest depending on the situation and you have a deque.",
          ),
          text(
            "In simple words:\n\n- one end only, in and out -> **stack**\n- in at one end, out at the other -> **queue**\n- both ends, both ways -> **deque**\n- you need the biggest or smallest item rather than the oldest or newest -> that is a **heap**, not any of these",
          ),
          scenario(
            "Think of it like this",
            "The trap to avoid is reaching for a queue when what you actually want is a heap. A queue answers \"who has been waiting longest?\". A heap answers \"who is most important?\". A hospital that served patients purely in arrival order would be a queue - and it would also be a scandal. Ask yourself which question your problem is really asking before you pick the container.",
          ),
          text(
            "All three are linear and give `O(1)` ends. Choose by *which* ends you use:\n\n- only one end -> **stack**\n- add at one end, remove at the other -> **queue**\n- both ends -> **deque**\n- you need the current **minimum or maximum** fast, not insertion order -> that is a **heap / priority queue** (Chapter 7), not one of these",
          ),
          text(
            "There is one variation worth knowing. A **monotonic stack** is an ordinary stack with a single added rule: before pushing a new item, throw away anything already on the stack that the newcomer beats. Nothing you discarded can ever be the answer again, so the stack stays sorted for free. That one rule solves \"next greater element\" and \"largest rectangle in a histogram\" in `O(n)`. The same idea on a deque solves sliding-window maximum in `O(n)`. Same containers as before - just one extra rule about what you are allowed to keep.",
          ),
          table(
            "The three adapters side by side",
            ["Add", "Remove", "Rule", "Reach for it when"],
            [
              ["Stack", "top", "top", "LIFO", "undo, DFS, expression parsing, backtracking"],
              ["Queue", "back", "front", "FIFO", "BFS, job scheduling, request buffering"],
              ["Deque", "front or back", "front or back", "both ends", "sliding window, work-stealing, palindromes"],
            ],
            { rowLabelHeader: "Structure" },
          ),
          callout(
            "tip",
            "Use `std::stack` / `std::queue` for intent-revealing code; drop to `std::vector` / `std::deque` directly when you also need to iterate or index the underlying data.",
          ),
          quiz(
            "You process tasks in arrival order but must also peek at the oldest and newest pending task. Best fit?",
            ["Stack", "Deque", "Priority queue", "Singly linked list"],
            1,
            "Both ends are needed, in O(1): a deque.",
          ),
        ],
        challenge: {
          title: "Pick the adapter",
          description:
            "Replace each `TODO` with `STACK`, `QUEUE`, or `DEQUE` - the right fit for that job.",
          compileOptional: true,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    // Undo history                       => TODO
    // Print jobs served in arrival order => TODO
    // Sliding-window maximum             => TODO
    cout << "done" << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    // Undo history                       => STACK
    // Print jobs served in arrival order => QUEUE
    // Sliding-window maximum             => DEQUE
    cout << "done" << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Undo -> STACK", keywords: [{ pattern: "Undo history\\s+=> STACK" }], hint: "Most recent action undone first: LIFO." },
            { id: 2, label: "Arrival order -> QUEUE", keywords: [{ pattern: "arrival order\\s+=> QUEUE" }], hint: "First in, first out." },
            { id: 3, label: "Sliding window -> DEQUE", keywords: [{ pattern: "Sliding-window maximum\\s+=> DEQUE" }], hint: "Add and drop at both ends." },
          ],
        },
      },
    ],
  },
  {
    id: "hashing",
    title: "Hashing: Tables, Maps, Collisions, Indexing",
    icon: "🔑",
    color: C_PINK,
    lessons: [
      {
        id: "cpp-ds-4-0",
        title: "Hash tables: turning a key into an address",
        xp: 12,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Explain the roles of a hash function and a bucket array",
            "State the average and worst-case costs of hash-table operations",
            "List the three properties of a good hash function",
          ]),
          text(
            "**Introduction:** A **hash table** stores pairs of key and value, and finds any of them almost instantly. The trick is that it never searches. It runs the key through a small calculation called a **hash function**, and that calculation *tells* it which slot of an array the entry lives in. One computation, one jump, done.\n\n**Real-life example:** Lockers at a gym. Instead of trying every locker until you find your bag, the front desk turns your membership number into a locker number. You walk straight to that locker.",
          ),
          text(
            "In this topic you will learn:\n\n- what a **hash function** does and what the **bucket array** is\n- why lookup is `O(1)` on average but can degrade to `O(n)`\n- the three things a good hash function must do\n- why a hash table can never give you its keys in sorted order",
          ),
          scenario(
            "Think of it like this",
            "Think of a library that files books by a rule instead of by searching. The rule takes the book's title, does a bit of arithmetic on the letters, and produces a shelf number. Putting a book away and fetching it are the *same* calculation, so both are instant no matter how many books the library holds. Two things follow from this. First, the rule must spread books evenly - if half the titles land on shelf 7, that shelf becomes a pile you have to dig through. Second, the shelves are in no meaningful order, so \"show me every book starting with M\" is impossible; you would have to walk the whole library.",
          ),
          text(
            "In precise terms: a hash function maps a key to an integer, and `hash(key) % bucket_count` turns that integer into a slot in an array. Lookup, insert and delete are all **`O(1)` on average** because you compute the location instead of hunting for it.",
          ),
          text(
            "A good hash function is:\n\n- **deterministic** - the same key always hashes the same\n- **fast** - it runs on every single operation\n- **uniform** - it spreads keys evenly across buckets, so no slot gets overloaded; similar keys like `user1` and `user2` should land far apart",
          ),
          text(
            "Costs: **average `O(1)`** for search / insert / erase. **Worst case `O(n)`** - if every key hashes to the same bucket, the table degenerates into one long list. And there is **no order** - you cannot ask a hash table for the smallest key or iterate in sorted order (use a tree for that, Chapter 6).",
          ),
          diagram("keys -> hash -> bucket", [
            { id: "a", label: "\"alice\"", color: C_PINK, items: ["hash -> bucket 3"] },
            { id: "b", label: "\"bob\"", color: C_SKY, items: ["hash -> bucket 0"] },
            { id: "c", label: "\"carol\"", color: C_RED, items: ["hash -> bucket 3", "collision with alice"] },
          ]),
          arrayViz(
            "hash(key) % 8 picks the bucket - collisions share one",
            [
              {
                label: "bucket",
                values: ["bob", "-", "-", "alice / carol", "-", "dave", "-", "-"],
                colLabels: ["0", "1", "2", "3", "4", "5", "6", "7"],
                okIndexes: [0, 5],
                missingIndexes: [3],
              },
            ],
            "\"alice\" and \"carol\" both hash into bucket 3 (red) - a collision the table must resolve. Buckets 0 and 5 hold one key each; the rest are empty.",
          ),
          callout(
            "info",
            "`%` only distributes well if the hash is already thoroughly mixed. Real tables force `bucket_count` to a power of two (mask instead of modulo) or a prime (defends against patterned hashes).",
          ),
          quiz(
            "Hash-table lookup is O(1) average but O(?) in the worst case.",
            ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
            2,
            "If every key collides into one bucket you scan a length-n list.",
          ),
        ],
        challenge: {
          title: "Bucket index for any key",
          description:
            "Map an int key (which may be negative) to a bucket in `[0, nbuckets)` - the classic `((key % n) + n) % n` guard so a negative key never gives a negative index.",
          starterCode: `#include <iostream>
using namespace std;

int bucketOf(int key, int nbuckets) {
    // TODO
    return 0;
}

int main() {
    cout << bucketOf(37, 8) << endl;  // 5
    cout << bucketOf(-3, 8) << endl;  // 5
    cout << bucketOf(16, 8) << endl;  // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int bucketOf(int key, int nbuckets) {
    return ((key % nbuckets) + nbuckets) % nbuckets;
}

int main() {
    cout << bucketOf(37, 8) << endl;  // 5
    cout << bucketOf(-3, 8) << endl;  // 5
    cout << bucketOf(16, 8) << endl;  // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "Reduces modulo the bucket count", keywords: [{ pattern: "% nbuckets" }], hint: "Two modulo operations, one add." },
            { id: 2, label: "Adds nbuckets to fix a negative remainder", keywords: [{ pattern: "\\+ nbuckets\\) % nbuckets" }], hint: "((key % n) + n) % n." },
          ],
        },
      },
      {
        id: "cpp-ds-4-1",
        title: "Collisions: chaining vs open addressing",
        xp: 16,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Define a collision and why every hash table needs a resolution strategy",
            "Contrast separate chaining with open addressing",
            "Name the three probe sequences and the clustering problem",
          ]),
          text(
            "**Introduction:** A hash function turns a key into a slot number, but there are only so many slots and unlimited possible keys. Sooner or later two different keys are handed the same slot. That is a **collision**, and every hash table needs a plan for it. There are two families of plan: let the slot hold more than one entry, or send the newcomer to a different slot.\n\n**Real-life example:** Two students at the gym are assigned locker 42. Either you make locker 42 big enough to hold both bags, or you tell the second student to take the next free locker down the row.",
          ),
          text(
            "In simple words:\n\n- **separate chaining** - each slot holds a little list, and colliding keys simply join that list\n- **open addressing** - each slot holds one entry, and a collision sends you hunting for another free slot\n- neither is wrong; they trade memory against cache friendliness",
          ),
          scenario(
            "Think of it like this",
            "Picture a cloakroom with numbered hooks. **Chaining** means each hook can take several coats stacked on it - when you come back you look at that one hook and flick through its two or three coats. **Open addressing** means one coat per hook, so if your hook is taken the attendant hangs your coat on the next free hook along and remembers the rule. Chaining stays calm when the room is crowded. Open addressing is quicker to walk to while there is space, but once the room is nearly full the attendant is walking further and further down the row for every single coat.",
          ),
          text(
            "Both approaches solve the same problem - two different keys landing on the same bucket. Here is how each one works in detail.",
          ),
          text(
            "**Separate chaining** - each bucket holds a short list (or small vector) of entries. Insert pushes onto the bucket's list; lookup hashes, then scans that one short list. Simple, degrades gracefully, tolerates load factor above 1. Cost: pointers plus a node allocation per entry. This is what `std::unordered_map` uses.",
          ),
          text(
            "**Open addressing** - one entry per slot, no lists. On a collision you **probe** to another slot by a rule:\n\n- **linear probing**: slot+1, slot+2, ... great cache behaviour, but causes **primary clustering** (runs of full slots that merge and grow)\n- **quadratic probing**: slot+1, slot+4, slot+9, ... breaks up clustering\n- **double hashing**: step size is a second hash of the key - best distribution\n\nDeletions need a **tombstone** marker so probe chains do not break.",
          ),
          diagram("Same collision, two fixes", [
            { id: "ch", label: "Chaining", color: C_PINK, items: ["bucket 3 -> [carol] -> [alice]", "scan a 2-element list"] },
            { id: "oa", label: "Open addressing (linear)", color: C_AMBER, items: ["alice in slot 3", "carol spills into slot 4"] },
          ]),
          table(
            "Separate chaining vs open addressing",
            ["Separate chaining", "Open addressing"],
            [
              ["Layout", "bucket -> list of entries", "one entry per slot, probe on clash"],
              ["Load factor it tolerates", "> 1 is fine", "keep below ~0.75"],
              ["Cache behaviour", "pointer-chases the list", "stays in one contiguous array"],
              ["Deletion", "unlink a node", "leave a tombstone marker"],
              ["Extra memory", "a pointer + node per entry", "just spare empty slots"],
              ["Used by", "std::unordered_map", "Python dict, many game engines"],
            ],
            { rowLabelHeader: "Aspect" },
          ),
          callout(
            "warning",
            "Open addressing performance falls off a cliff as load factor approaches 1 - probe sequences get long. Keep it well under ~0.75 and resize early.",
          ),
          quiz(
            "Linear probing suffers from ___, where consecutive occupied slots merge into long runs.",
            ["tombstoning", "primary clustering", "rehashing", "chaining"],
            1,
            "Primary clustering: any hash landing near a run extends it, making future probes longer.",
          ),
        ],
        challenge: {
          title: "Chaining hash set",
          description:
            "Implement a 16-bucket set of ints: `add` (skip duplicates) and `contains`, using `x` mapped to a bucket and separate chaining.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct HashSet {
    static const int B = 16;
    vector<int> buckets[B];

    int slot(int x) { return ((x % B) + B) % B; }

    void add(int x) {
        // TODO: if not already present, push x into buckets[slot(x)]
    }
    bool contains(int x) {
        // TODO: scan only buckets[slot(x)]
        return false;
    }
};

int main() {
    HashSet s;
    int items[] = {3, 19, 35, 8, 3};   // 3, 19, 35 all collide mod 16
    for (int x : items) s.add(x);
    cout << s.contains(19) << endl; // 1
    cout << s.contains(35) << endl; // 1
    cout << s.contains(4) << endl;  // 0
    int total = 0;
    for (int i = 0; i < HashSet::B; i++) total += s.buckets[i].size();
    cout << total << endl;          // 4 (duplicate 3 skipped)
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct HashSet {
    static const int B = 16;
    vector<int> buckets[B];

    int slot(int x) { return ((x % B) + B) % B; }

    void add(int x) {
        if (contains(x)) return;
        buckets[slot(x)].push_back(x);
    }
    bool contains(int x) {
        for (int v : buckets[slot(x)])
            if (v == x) return true;
        return false;
    }
};

int main() {
    HashSet s;
    int items[] = {3, 19, 35, 8, 3};
    for (int x : items) s.add(x);
    cout << s.contains(19) << endl; // 1
    cout << s.contains(35) << endl; // 1
    cout << s.contains(4) << endl;  // 0
    int total = 0;
    for (int i = 0; i < HashSet::B; i++) total += s.buckets[i].size();
    cout << total << endl;          // 4
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses the bucket function", keywords: [{ pattern: "slot\\(x\\)" }], hint: "Index with buckets[slot(x)]." },
            { id: 2, label: "Chains with push_back", keywords: [{ pattern: "push_back" }], hint: "buckets[slot(x)].push_back(x)." },
            { id: 3, label: "Scans one bucket in contains", keywords: [{ pattern: "buckets\\[slot" }], hint: "Only the key's own bucket is scanned." },
          ],
        },
      },
      {
        id: "cpp-ds-4-2",
        title: "Load factor, resizing, and the C++ maps",
        xp: 12,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Define load factor and the space/speed trade it controls",
            "Explain rehashing and why insert stays amortised O(1)",
            "Choose between unordered_map and map",
          ]),
          text(
            "**Introduction:** A hash table is only fast while it has room to breathe. The **load factor** is simply how full it is - the number of entries divided by the number of slots. As it climbs, collisions climb with it and lookups slow down. So when the table gets too crowded it builds a bigger one and moves everything across, which is called **rehashing**.\n\n**Real-life example:** A car park. Half full, you drive in and park immediately. Ninety percent full, you crawl up and down the rows hunting for the one free space. Once it is like that every day, the owner builds a bigger car park.",
          ),
          text(
            "In this topic you will learn:\n\n- what the **load factor** is and what it trades away\n- what happens during a **rehash** and why it costs `O(n)`\n- why a single insert is still **amortised `O(1)`** despite that\n- when to pick `unordered_map` and when to pick `map`",
          ),
          scenario(
            "Think of it like this",
            "Moving to the bigger car park is genuinely expensive - every car has to be driven across. But you only do it when the number of cars has *doubled*, so the cost is spread over all the cars that arrived since the last move. Averaged out, each car pays a tiny fixed share of the moving cost. That is what **amortised `O(1)`** means: one operation is occasionally slow, but the long-run average per operation stays constant. It is the exact same argument as a `vector` doubling its capacity.",
          ),
          text(
            "In precise terms: **load factor** a = entries / buckets. It is the dial trading space for speed - a low a means few collisions but many wasted slots; a high a means compact storage but slower probes. Chaining aims for a around 1; open addressing wants 0.5 to 0.7.",
          ),
          text(
            "When a crosses `max_load_factor`, the table **rehashes**: it allocates a bucket array about 2x bigger, recomputes every key's slot (the slot depends on the bucket count, so old positions are meaningless), and moves the entries across. That one operation is `O(n)`, but spread over the inserts that triggered it, insert stays **amortised `O(1)`**.",
          ),
          text(
            "The C++ tools:\n\n- `std::unordered_map` / `unordered_set` - hash table, average `O(1)`, no order, has `bucket_count()`, `load_factor()`, `reserve()`\n- `std::map` / `set` - balanced BST (Chapter 6), `O(log n)`, **keys stay sorted**, supports range queries",
            {
              label: "unordered_map with reserve",
              content: `#include <unordered_map>
#include <string>
using namespace std;

unordered_map<string, int> counts;
counts.reserve(100000);           // size the buckets once
counts["apple"]++;                // insert-or-update, O(1) average
if (counts.count("pear")) { /* ... */ }`,
            },
          ),
          table(
            "Load factor is a dial: probes vs wasted space (open addressing)",
            ["Avg probes on a hit", "Avg probes on a miss", "Feel"],
            [
              ["0.50", "1.5", "2.5", "roomy, fast, half-empty"],
              ["0.75", "2.5", "8.5", "the usual resize trigger"],
              ["0.90", "5.5", "50", "getting slow"],
              ["0.99", "50", "5000", "effectively broken"],
            ],
            { rowLabelHeader: "Load factor", highlightRows: [1, 3] },
          ),
          callout(
            "tip",
            "Going to insert n entries? Call `reserve(n)` first - it sizes the buckets once and skips every intermediate rehash.",
          ),
          quiz(
            "Rehashing is O(n). Why is a single insert still amortised O(1)?",
            [
              "Rehashing never actually happens",
              "Doubling makes the total rehash work across n inserts O(n)",
              "The compiler caches the buckets",
              "Inserts are actually O(log n)",
            ],
            1,
            "Same argument as the doubling vector: total work is linear, so per-insert it averages constant.",
          ),
        ],
        challenge: {
          title: "Load factor and the resize trigger",
          description:
            "Implement `loadFactor` (entries / buckets, as a double) and `needsResize` (true when adding **one more** entry would push the load factor past `maxLoad`).",
          starterCode: `#include <iostream>
using namespace std;

double loadFactor(int entries, int buckets) {
    // TODO
    return 0.0;
}

bool needsResize(int entries, int buckets, double maxLoad) {
    // TODO: would (entries + 1) / buckets exceed maxLoad?
    return false;
}

int main() {
    cout << loadFactor(6, 8) << endl;            // 0.75
    cout << needsResize(6, 8, 0.75) << endl;     // 1  (7/8 = 0.875)
    cout << needsResize(3, 8, 0.75) << endl;     // 0
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

double loadFactor(int entries, int buckets) {
    return (double)entries / buckets;
}

bool needsResize(int entries, int buckets, double maxLoad) {
    return (double)(entries + 1) / buckets > maxLoad;
}

int main() {
    cout << loadFactor(6, 8) << endl;            // 0.75
    cout << needsResize(6, 8, 0.75) << endl;     // 1
    cout << needsResize(3, 8, 0.75) << endl;     // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "loadFactor divides as a double", keywords: [{ pattern: "\\(double\\)entries / buckets" }], hint: "Cast so it is not integer division." },
            { id: 2, label: "needsResize looks one entry ahead", keywords: [{ pattern: "entries \\+ 1" }], hint: "Check the load factor after the next insert." },
            { id: 3, label: "Compares against maxLoad", keywords: [{ pattern: "> maxLoad" }], hint: "Resize when it would cross the ceiling." },
          ],
        },
      },
      {
        id: "cpp-ds-4-3",
        title: "Indexing: hash indexes and ordered indexes",
        xp: 12,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "Define an index as an auxiliary structure that speeds lookups",
            "Contrast a hash index with an ordered (tree) index",
            "Explain primary vs secondary indexes and their write cost",
          ]),
          text(
            "**Introduction:** An **index** is an extra structure kept alongside your real data whose only job is to tell you where something is, so you never have to look through everything. The data itself does not move; the index just points at it.\n\n**Real-life example:** The index at the back of a textbook. The chapters are the real content; the index is a small sorted list of topics with page numbers. You look up \"photosynthesis\", get page 214, and turn straight there instead of skimming 400 pages.",
          ),
          text(
            "In simple words:\n\n- a **hash index** answers \"find exactly this one\" instantly, but nothing else\n- an **ordered index** is sorted, so it also answers ranges and \"give me these in order\"\n- every index you add speeds up reads and slows down writes, because each write must update it too",
          ),
          scenario(
            "Think of it like this",
            "Compare a book's index with its table of contents. The index is alphabetical: perfect for \"where is the word *enzyme* mentioned?\", useless for \"what comes after chapter 5?\". The table of contents is in page order: perfect for ranges and sequence. That is exactly the hash-versus-ordered split. And here is the catch nobody mentions - if you add a new page to the book, you now have to correct *both* the index and the contents. That is why a database table with six indexes is fast to read and sluggish to write.",
          ),
          text(
            "In precise terms: an index maps a search key to the location of the full record. A hash table *is* an in-memory index; databases and file systems build the same idea on disk, sized around disk pages rather than cache lines.",
          ),
          text(
            "**Hash index** - key -> bucket -> record location. `O(1)` average for **equality** (\"find user 42\"). Cannot do ranges or ordered scans.\n\n**Ordered index** - a sorted structure, almost always a **B-tree / B+ tree** (a broad, shallow balanced tree tuned for disk pages) or an in-memory balanced BST. `O(log n)` for equality *and* for **ranges** (\"all orders between two dates\"), plus sorted iteration.",
          ),
          text(
            "**Primary index** - built on the key that decides where the record itself is stored (often keeps the table physically sorted; one per table). **Secondary index** - an extra index on another column that points back to the row. You can have many, and each one adds write cost: every insert or update must maintain every index.",
          ),
          diagram("Query shape -> index type", [
            { id: "eq", label: "equality only", color: C_PINK, items: ["WHERE id = 42", "hash index, O(1)"] },
            { id: "rg", label: "range / sort / prefix", color: C_SKY, items: ["WHERE ts BETWEEN a AND b", "ordered (B-tree) index, O(log n)"] },
          ]),
          callout(
            "info",
            "This is why `CREATE INDEX` speeds up reads but slows down writes, and why a hash index cannot satisfy `ORDER BY` or `BETWEEN`.",
          ),
          quiz(
            "You need WHERE created_at BETWEEN x AND y. Which index type can serve it?",
            [
              "Hash index",
              "Ordered / B-tree index",
              "Neither - it must be a full scan",
              "Any index works equally",
            ],
            1,
            "Range predicates need sorted order; a hash index only supports equality.",
          ),
        ],
        challenge: {
          title: "Which index serves the query?",
          description:
            "Replace each `TODO` with `HASH` or `ORDERED` - the index type that can answer that query efficiently.",
          compileOptional: true,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    // WHERE id = 42            => TODO
    // WHERE ts BETWEEN a AND b => TODO
    // ORDER BY name            => TODO
    // WHERE email = 'x@y.com'  => TODO
    cout << "done" << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    // WHERE id = 42            => HASH
    // WHERE ts BETWEEN a AND b => ORDERED
    // ORDER BY name            => ORDERED
    // WHERE email = 'x@y.com'  => HASH
    cout << "done" << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Equality -> HASH", keywords: [{ pattern: "id = 42\\s+=> HASH" }], hint: "Point lookup: hash index." },
            { id: 2, label: "Range -> ORDERED", keywords: [{ pattern: "BETWEEN a AND b => ORDERED" }], hint: "Ranges need sorted order." },
            { id: 3, label: "Sort -> ORDERED", keywords: [{ pattern: "ORDER BY name\\s+=> ORDERED" }], hint: "A hash index has no order to walk." },
          ],
        },
      },
      {
        id: "cpp-ds-4-4",
        title: "When hashing goes wrong",
        xp: 10,
        chapterTitle: "Hashing: Tables, Maps, Collisions, Indexing",
        theory: [
          objectives([
            "List the common hash-table failure modes",
            "Explain the hash-flooding denial-of-service attack and its fix",
            "Know how to supply a hash for a custom key type",
          ]),
          text(
            "**Introduction:** Everything good about a hash table depends on one assumption: that keys spread evenly across the slots. Break that assumption and the whole structure quietly collapses into a single long list, and your `O(1)` lookups become `O(n)` without a single error message.\n\n**Real-life example:** A gym whose locker rule is \"first letter of your surname\". It works fine until a group of forty people with surnames starting with K arrive at once - now one locker area is a scrum and the rest of the room is empty.",
          ),
          text(
            "In this topic you will learn:\n\n- the common ways a hash table goes wrong in practice\n- what a **hash-flooding** attack is and how libraries defend against it\n- why you must never depend on `unordered_map`'s iteration order\n- how to supply your own hash function for a custom key type",
          ),
          scenario(
            "Think of it like this",
            "Now imagine somebody works out your locker rule and deliberately signs up forty accounts whose surnames all start with K. That is a **hash-flooding attack**: an attacker feeds a server keys engineered to collide, so an operation that should be instant turns into a full scan, and the server grinds to a halt under a trivial amount of traffic. The defence is simple - pick a fresh secret ingredient for the rule each time the program starts, so nobody can work the rule out in advance. That is also the reason iteration order changes between runs, and why you must never save it or rely on it.",
          ),
          text(
            "The failure modes, precisely:\n\n- **bad hash function** - collisions pile up and every operation drifts toward `O(n)`\n- **clustering** - open addressing with linear probing under high load builds long runs of full slots\n- **hash-flood DoS** - an attacker sends keys chosen to all collide, turning an `O(1)` service into `O(n^2)`; the fix is a **randomly seeded** hash per process, which is exactly why iteration order is deliberately unspecified\n- **expensive keys** - hashing a huge string on every single lookup; cache the hash if the same keys are reused",
            {
              label: "A hash for a struct key",
              content: `#include <unordered_map>
struct Point { int x, y; };

struct PointHash {
    size_t operator()(const Point& p) const {
        return std::hash<int>()(p.x) * 1000003u ^ std::hash<int>()(p.y);
    }
};
struct PointEq {
    bool operator()(const Point& a, const Point& b) const {
        return a.x == b.x && a.y == b.y;
    }
};
std::unordered_map<Point, int, PointHash, PointEq> grid;`,
            },
          ),
          callout(
            "warning",
            "Never rely on `unordered_map` iteration order, and never persist it - it changes across runs, library versions, and after any rehash.",
          ),
          quiz(
            "Why is hash-table iteration order intentionally randomised in modern libraries?",
            [
              "To make debugging harder",
              "To prevent collision-flooding denial-of-service attacks",
              "It is a bug",
              "To save memory",
            ],
            1,
            "A per-process random seed means an attacker cannot precompute a set of all-colliding keys.",
          ),
        ],
        challenge: {
          title: "A better hash mix",
          description:
            "Fill in an avalanche step so sequential keys 1, 2, 3, ... scatter across buckets instead of clustering: `x ^= x >> 33; x *= 0xff51afd7ed558ccdULL; x ^= x >> 33;`.",
          starterCode: `#include <iostream>
#include <cstdint>
using namespace std;

uint64_t mix(uint64_t x) {
    // TODO: xor-shift, multiply by a large odd constant, xor-shift again
    return x;
}

int main() {
    for (uint64_t k = 1; k <= 5; k++) cout << (mix(k) % 8) << " ";
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <cstdint>
using namespace std;

uint64_t mix(uint64_t x) {
    x ^= x >> 33;
    x *= 0xff51afd7ed558ccdULL;
    x ^= x >> 33;
    return x;
}

int main() {
    for (uint64_t k = 1; k <= 5; k++) cout << (mix(k) % 8) << " ";
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Xor-shifts the bits", keywords: [{ pattern: "x \\^= x >> 33" }], hint: "Mixing high bits into low bits." },
            { id: 2, label: "Multiplies by a large constant", keywords: [{ pattern: "x \\*=" }], hint: "An odd 64-bit multiplier spreads influence across all bits." },
          ],
        },
      },
    ],
  },
  {
    id: "trees",
    title: "Non-Linear: Trees",
    icon: "🌳",
    color: C_GREEN,
    lessons: [
      {
        id: "cpp-ds-5-0",
        title: "Trees and binary trees",
        xp: 14,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "Define root, parent/child, leaf, height, depth, balanced",
            "Describe the four traversal orders and what each is used for",
            "Implement a recursive in-order traversal",
          ]),
          text(
            "**Introduction:** A **tree** is a way of holding data that branches out instead of sitting in one straight line. One item sits at the top, and every other item hangs underneath exactly one item above it. Nothing ever loops back to where it came from, so if you keep walking downward you always finish.\n\n**Real-life example:** The folders on your computer. There is one folder at the top; inside it are more folders; inside those are files. Every folder sits inside exactly one other folder, and you never walk in a circle.",
          ),
          text(
            "In this topic you will learn:\n\n- the names for the parts of a tree - root, parent, child, leaf\n- how to measure a tree using **height** and **depth**\n- what a **balanced** tree is and why balance decides your speed\n- the four orders in which you can visit every node, and what each one is good for",
          ),
          scenario(
            "Think of it like this",
            "A tree is a company org chart. The CEO at the top is the **root** - the one person with nobody above them. Everyone else reports to exactly one manager, and that manager is their **parent**. People with nobody reporting to them are **leaves**. Your **depth** is how many steps down from the CEO you sit. The **height** of the chart is the number of steps from the CEO down to the deepest person in the company. If one branch runs ten levels deep while the rest are two levels deep, the chart is lopsided - and lopsided is exactly what makes a tree slow.",
          ),
          text(
            "Now the exact wording. A **tree** is non-linear: one **root**, every other node has exactly one **parent**, and there are no cycles. A **binary tree** is a tree where each node has at most two children, called `left` and `right`.\n\n- **leaf** - a node with no children at all\n- **height** - the number of edges on the longest path from the root down to a leaf\n- **depth** - the number of edges from the root down to one particular node\n- **balanced** - at every node, the two child subtrees differ in height by at most 1",
          ),
          text(
            "A **traversal** is simply an order in which you visit every node exactly once. Think of walking through every room in a house: you always see every room, but the route changes depending on which door you take first. There are four standard routes.\n\n- **pre-order** (node, left, right) - copy or serialise a tree\n- **in-order** (left, node, right) - on a BST, visits keys in **sorted** order\n- **post-order** (left, right, node) - delete children before the parent; evaluate expression trees\n- **level-order** (breadth-first, by depth) - uses a **queue**, not recursion",
            {
              label: "Recursive traversal shape",
              content: `struct Node { int key; Node* left; Node* right; };

void inorder(Node* n) {
    if (!n) return;
    inorder(n->left);
    visit(n->key);
    inorder(n->right);
}`,
            },
          ),
          table(
            "The four traversal orders",
            ["Visit order", "On this tree (4 / 2,6 / 1,3,-,7)", "Reach for it to"],
            [
              ["Pre-order", "node, left, right", "4 2 1 3 6 7", "copy or serialise a tree"],
              ["In-order", "left, node, right", "1 2 3 4 6 7", "read a BST in sorted order"],
              ["Post-order", "left, right, node", "1 3 2 7 6 4", "free children before the parent"],
              ["Level-order", "by depth, left to right", "4 2 6 1 3 7", "shortest path in edges; uses a queue"],
            ],
            { rowLabelHeader: "Traversal" },
          ),
          callout(
            "tip",
            "An easy way to remember the names: the word **pre**, **in** or **post** tells you when the node itself is visited - *before* its children, *between* them, or *after* them. The left child is always handled before the right one.",
          ),
          callout(
            "info",
            "Recursion on a tree of height h uses `O(h)` call-stack space. A balanced tree gives h = `O(log n)`; a lopsided one gives h = n, which is as slow as a plain list.",
          ),
          quiz(
            "Which traversal of a binary search tree visits the keys in ascending order?",
            ["Pre-order", "In-order", "Post-order", "Level-order"],
            1,
            "Left subtree (smaller), then the node, then the right subtree (larger).",
          ),
        ],
        challenge: {
          title: "In-order traversal",
          description:
            "Fill `inorder` so it appends the tree's keys to `out` in left, node, right order.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct Node { int key; Node* left; Node* right; };

void inorder(Node* root, vector<int>& out) {
    // TODO: recurse left, push root->key, recurse right
}

int main() {
    Node d{1, nullptr, nullptr}, e{3, nullptr, nullptr}, f{7, nullptr, nullptr};
    Node b{2, &d, &e}, c{6, nullptr, &f};
    Node a{4, &b, &c};
    vector<int> out;
    inorder(&a, out);
    for (int v : out) cout << v << " ";   // 1 2 3 4 6 7
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct Node { int key; Node* left; Node* right; };

void inorder(Node* root, vector<int>& out) {
    if (!root) return;
    inorder(root->left, out);
    out.push_back(root->key);
    inorder(root->right, out);
}

int main() {
    Node d{1, nullptr, nullptr}, e{3, nullptr, nullptr}, f{7, nullptr, nullptr};
    Node b{2, &d, &e}, c{6, nullptr, &f};
    Node a{4, &b, &c};
    vector<int> out;
    inorder(&a, out);
    for (int v : out) cout << v << " ";   // 1 2 3 4 6 7
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Recurses left first", keywords: [{ pattern: "inorder\\(root->left" }], hint: "Visit the left subtree before the node." },
            { id: 2, label: "Emits the node key", keywords: [{ pattern: "out.push_back\\(root->key\\)" }], hint: "push_back between the two recursions." },
            { id: 3, label: "Recurses right last", keywords: [{ pattern: "inorder\\(root->right" }], hint: "Right subtree after the node." },
          ],
        },
      },
      {
        id: "cpp-ds-5-1",
        title: "Binary search tree: ordered, O(h)",
        xp: 16,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "State the BST ordering invariant",
            "Give the algorithm for search, insert and the three erase cases",
            "Explain why insertion order can make a plain BST degenerate",
          ]),
          text(
            "**Introduction:** A **binary search tree** (BST) is a binary tree that keeps its values in order. At every node, everything smaller sits on the left and everything larger sits on the right. Because of that one rule, you never have to look at most of the tree - at each step you throw away a whole side.\n\n**Real-life example:** Looking up a word in a paper dictionary. You open it near the middle, see you have landed too far along the alphabet, and flip backwards. You never read the pages you skipped, and each flip cuts the remaining pages roughly in half.",
          ),
          text(
            "In this topic you will learn:\n\n- the one ordering rule that makes a tree a BST\n- how search, insert and erase work step by step\n- why the tree's **height** decides whether it is fast or slow\n- how a badly ordered set of inserts can ruin the whole thing",
          ),
          scenario(
            "Think of it like this",
            "Picture the number-guessing game: someone thinks of a number from 1 to 100 and you guess. You say 50, they say \"higher\", so every number from 1 to 50 is gone in one move. You say 75, they say \"lower\", and half of what is left disappears again. A BST is that game frozen into a shape: the value at each node is the guess, and \"higher / lower\" tells you to walk right or left. Now imagine the same game where every answer is \"higher\" - you would be counting 1, 2, 3, 4 one at a time. That is exactly what happens when you build a BST from already-sorted data.",
          ),
          text(
            "The rule in precise words: for every node, all keys in the **left** subtree are smaller and all keys in the **right** subtree are larger. Searching is then just a series of left/right decisions.\n\n- **search / insert** - compare at the root, go left or right, repeat. Costs `O(h)`, where `h` is the height.\n- **erase** - a leaf is simply removed. A node with one child is spliced past. A node with two children takes the value of its **in-order successor** (the smallest key in its right subtree), and that successor node is deleted instead.\n- **min / max** - walk all the way left, or all the way right.",
          ),
          text(
            "`h` is the whole story. A **balanced** BST gives h = `O(log n)`, so every operation is `O(log n)`. But inserting **already-sorted** data makes every node a right child - the tree becomes a straight line, a \"linked list in disguise\", with h = n and operations back to `O(n)`. That is exactly why self-balancing trees exist (next lesson).",
          ),
          diagram("Same 7 keys, two shapes", [
            { id: "bal", label: "Balanced", color: C_GREEN, items: ["inserted 4,2,6,1,3,5,7", "height 3", "O(log n) ops"] },
            { id: "deg", label: "Degenerate", color: C_RED, items: ["inserted 1,2,3,4,5,6,7", "height 7", "O(n) ops"] },
          ]),
          callout(
            "warning",
            "A plain BST is only as good as its insertion order. Never build one from sorted input without shuffling or a balancing scheme.",
          ),
          quiz(
            "Insert 1, 2, 3, 4, 5 in that order into a plain BST. Its height is:",
            ["1", "2 (log 5)", "3", "5"],
            3,
            "Each key is larger than the last, so every node is a right child - a straight line of height 5.",
          ),
        ],
        challenge: {
          title: "BST insert & search",
          description:
            "Implement recursive `insert` (returns the subtree root) and `contains`.",
          starterCode: `#include <iostream>
using namespace std;

struct Node { int key; Node* left = nullptr; Node* right = nullptr; };

Node* insert(Node* root, int key) {
    // TODO: create a node at an empty spot; else recurse left/right by comparison
    return root;
}
bool contains(Node* root, int key) {
    // TODO
    return false;
}

int main() {
    Node* root = nullptr;
    int keys[] = {5, 3, 8, 1, 4, 7, 9};
    for (int k : keys) root = insert(root, k);
    cout << contains(root, 4) << endl; // 1
    cout << contains(root, 6) << endl; // 0
    cout << root->key << endl;         // 5
    cout << root->left->key << endl;   // 3
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

struct Node { int key; Node* left = nullptr; Node* right = nullptr; };

Node* insert(Node* root, int key) {
    if (root == nullptr) return new Node{key, nullptr, nullptr};
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    return root;
}
bool contains(Node* root, int key) {
    if (root == nullptr) return false;
    if (key == root->key) return true;
    if (key < root->key) return contains(root->left, key);
    return contains(root->right, key);
}

int main() {
    Node* root = nullptr;
    int keys[] = {5, 3, 8, 1, 4, 7, 9};
    for (int k : keys) root = insert(root, k);
    cout << contains(root, 4) << endl; // 1
    cout << contains(root, 6) << endl; // 0
    cout << root->key << endl;         // 5
    cout << root->left->key << endl;   // 3
    return 0;
}`,
          tests: [
            { id: 1, label: "Creates a node at an empty spot", keywords: [{ pattern: "new Node" }], hint: "Return new Node when root == nullptr." },
            { id: 2, label: "Branches by key comparison", keywords: [{ pattern: "key < root->key" }], hint: "Go left when key < root->key." },
            { id: 3, label: "contains recurses", keywords: [{ pattern: "return contains" }], hint: "Recurse into the correct child." },
          ],
        },
      },
      {
        id: "cpp-ds-5-2",
        title: "AVL trees: staying balanced with rotations",
        xp: 14,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "State the AVL balance condition",
            "Explain what a rotation does and name the four cases",
            "Give AVL's guaranteed complexities and the trade against red-black trees",
          ]),
          text(
            "**Introduction:** An **AVL tree** is a binary search tree that fixes its own shape. Every time you add or remove a value, it checks whether one side has grown taller than the other, and if so it shuffles a few nodes to even things out. You never end up with the long, slow, straight-line tree from the previous lesson.\n\n**Real-life example:** Stacking books on a shelf that tips over. Each time you add a book you glance at the shelf, and if one side is clearly heavier you move a book across. The shelf stays upright by itself and you never have to rebuild it from scratch.",
          ),
          text(
            "In this topic you will learn:\n\n- the balance rule an AVL tree promises to keep\n- what a **rotation** actually does to the pointers\n- the four situations you can land in, and the fix for each\n- what AVL guarantees you, and what it costs compared with a red-black tree",
          ),
          scenario(
            "Think of it like this",
            "Think of a mobile hanging over a baby's cot. Hang one more toy on the left arm and the whole thing tilts. You do not take the mobile apart - you just unhook one arm and re-hook it a level up or down, and it hangs straight again. A **rotation** is that small re-hooking: three pointers move, the sorted order of everything is untouched, and the tall side gets shorter. And just as with the mobile, the fix is local - you never disturb the whole tree.",
          ),
          text(
            "The precise rule: for every node, `height(left) - height(right)` - called the **balance factor** - must be -1, 0, or +1. If an insert or erase pushes any node outside that range, the tree repairs itself before the operation finishes.",
          ),
          text(
            "A **rotation** re-hangs three pointers to lower the height on the heavy side while *keeping the BST order intact*. After an insert you walk back up toward the root; at the first node whose balance factor reaches +/-2 you apply one of four fixes:\n\n- **LL** (heavy left-left) -> one right rotation\n- **RR** (heavy right-right) -> one left rotation\n- **LR** (heavy left-right) -> left-rotate the child, then right-rotate\n- **RL** (heavy right-left) -> right-rotate the child, then left-rotate",
          ),
          diagram("RR case -> single left rotation", [
            { id: "before", label: "Before", color: C_RED, items: ["A - B - C leaning right", "A balance factor -2"] },
            { id: "after", label: "After", color: C_GREEN, items: ["B is the new root", "A and C are its children", "height reduced by 1"] },
          ]),
          text(
            "Result: height is guaranteed <= about 1.44 * log2(n), so **search, insert and erase are worst-case `O(log n)`** - no degenerate case, ever. The price: a height/balance field per node and `O(log n)` rotation work on updates. **Red-black trees** (what `std::map` uses) allow slightly looser balance for fewer rotations on write-heavy workloads.",
          ),
          table(
            "The four rebalancing cases",
            ["Shape after the bad insert", "Fix"],
            [
              ["LL", "heavy left, then left again", "one right rotation"],
              ["RR", "heavy right, then right again", "one left rotation"],
              ["LR", "heavy left, then right", "left-rotate the child, then right-rotate"],
              ["RL", "heavy right, then left", "right-rotate the child, then left-rotate"],
            ],
            { rowLabelHeader: "Case", footnote: "You detect the case at the lowest node whose balance factor reached +/-2 while unwinding the insert." },
          ),
          callout(
            "info",
            "A single rotation is `O(1)` - just pointer and height updates. An insert triggers at most one (single or double) rotation; an erase may rotate once per level, still `O(log n)` total.",
          ),
          quiz(
            "A node's left subtree has height 4 and its right has height 2, with the extra height in the left child's LEFT subtree. Which fix?",
            ["RR -> left rotation", "LL -> right rotation", "LR -> double rotation", "RL -> double rotation"],
            1,
            "Heavy on the left, and the imbalance is left-left, so a single right rotation rebalances it.",
          ),
        ],
        challenge: {
          title: "Height and balance factor",
          description:
            "Implement recursive `height` (edges on the longest path; a single node is 0, `nullptr` is -1) and `balanceFactor` (`height(left) - height(right)`).",
          starterCode: `#include <iostream>
#include <algorithm>
using namespace std;

struct Node { int key; Node* left = nullptr; Node* right = nullptr; };

int height(Node* n) {
    // TODO
    return -1;
}

int balanceFactor(Node* n) {
    // TODO
    return 0;
}

int main() {
    Node d{4}, c{3}, b{2}, a{1};
    a.left = &b; b.left = &c; c.left = &d;   // left-leaning spine
    cout << height(&a) << endl;         // 3
    cout << balanceFactor(&a) << endl;  // 3 - (-1) = 4
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <algorithm>
using namespace std;

struct Node { int key; Node* left = nullptr; Node* right = nullptr; };

int height(Node* n) {
    if (n == nullptr) return -1;
    return 1 + max(height(n->left), height(n->right));
}

int balanceFactor(Node* n) {
    if (n == nullptr) return 0;
    return height(n->left) - height(n->right);
}

int main() {
    Node d{4}, c{3}, b{2}, a{1};
    a.left = &b; b.left = &c; c.left = &d;
    cout << height(&a) << endl;         // 3
    cout << balanceFactor(&a) << endl;  // 4
    return 0;
}`,
          tests: [
            { id: 1, label: "height recurses on both children", keywords: [{ pattern: "1 \\+ max\\(height\\(n->left\\), height\\(n->right\\)\\)" }], hint: "One plus the taller subtree." },
            { id: 2, label: "balanceFactor subtracts the subtree heights", keywords: [{ pattern: "height\\(n->left\\) - height\\(n->right\\)" }], hint: "Left minus right." },
          ],
        },
      },
      {
        id: "cpp-ds-5-3",
        title: "Trees vs hashing: which map do you want?",
        xp: 10,
        chapterTitle: "Non-Linear: Trees",
        theory: [
          objectives([
            "Choose between a hash map and a balanced-tree map by required operations",
            "Recall the memory and pause-time differences",
            "Spot when a plain array beats both",
          ]),
          text(
            "**Introduction:** A **map** is anything that stores pairs - a key and the value that belongs to it - and hands you the value back when you give it the key. Both a balanced tree and a hash table do that job. This lesson is about picking the right one, because they behave very differently once you want more than plain lookups.\n\n**Real-life example:** Your phone's contacts app. Typing an exact name and getting one number is a hash-table job. Scrolling through everyone from **A** to **D** in alphabetical order is a tree job. The app needs the sorted view, so it uses the ordered one.",
          ),
          text(
            "In simple words:\n\n- if you only ever look up one exact key, a **hash table** is fastest on average\n- if you need things in sorted order, or ranges, or a guaranteed worst case, use a **balanced tree**\n- if your keys are small whole numbers, skip both and use a plain array",
          ),
          scenario(
            "Think of it like this",
            "A hash table is the coat check at an event: you hand over a ticket number and the attendant walks straight to that hook. Instant - but if you asked \"give me every coat handed in between 7pm and 8pm\", they could not help, because the hooks are in no meaningful order. A balanced tree is a shelf of files sorted by date: finding one file takes a few more steps, but \"everything from March\" is easy because the neighbours are already next to each other.",
          ),
          text(
            "Choose by what you need beyond `get` / `put`:\n\n- equality lookups only, order irrelevant, want the best average case -> **hash table** (`unordered_map`), `O(1)` average\n- need sorted iteration, `lower_bound` / range queries, or **worst-case** guarantees -> **balanced BST** (`map`), `O(log n)` always\n- keys are integers in a small known range -> skip both, use a plain **array** (direct addressing, `O(1)` worst case)",
          ),
          text(
            "Memory: hash tables waste empty buckets and store a hash per entry; trees store two or three pointers plus balance metadata per node. Hash tables have `O(n)` rehash pauses; trees give steady `O(log n)`.",
          ),
          table(
            "unordered_map (hash) vs map (balanced tree)",
            ["unordered_map", "map"],
            [
              ["Lookup / insert / erase", "O(1) average", "O(log n) always"],
              ["Worst case", "O(n) on a bad rehash burst", "O(log n)"],
              ["Key order", "none", "sorted"],
              ["Range / lower_bound", "not supported", "O(log n)"],
              ["Pause behaviour", "O(n) rehash spikes", "steady"],
              ["Iterator stability", "all invalidated on rehash", "only the erased one"],
            ],
            { rowLabelHeader: "Property" },
          ),
          callout(
            "tip",
            "`std::map` also wins when you need iterators that stay valid while *other* elements are inserted or erased - `unordered_map` invalidates all iterators on a rehash.",
          ),
          quiz(
            "A leaderboard needs \"show me players ranked between X and Y\". Which structure?",
            ["unordered_map", "A balanced BST / ordered map", "A stack", "A hash set"],
            1,
            "Range-by-rank needs sorted order, which only the tree provides.",
          ),
        ],
        challenge: {
          title: "Hash map, ordered map, or array?",
          description:
            "Replace each `TODO` with `HASH_MAP`, `ORDERED_MAP`, or `ARRAY` - the best fit for that requirement.",
          compileOptional: true,
          starterCode: `#include <iostream>
using namespace std;

int main() {
    // Fastest average get/put, order irrelevant => TODO
    // Need lower_bound and range scans          => TODO
    // Keys are ints in [0, 1000)                => TODO
    cout << "done" << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
using namespace std;

int main() {
    // Fastest average get/put, order irrelevant => HASH_MAP
    // Need lower_bound and range scans          => ORDERED_MAP
    // Keys are ints in [0, 1000)                => ARRAY
    cout << "done" << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Unordered speed -> HASH_MAP", keywords: [{ pattern: "order irrelevant => HASH_MAP" }], hint: "O(1) average, no order." },
            { id: 2, label: "Ranges -> ORDERED_MAP", keywords: [{ pattern: "range scans\\s+=> ORDERED_MAP" }], hint: "lower_bound needs a sorted tree." },
            { id: 3, label: "Small dense key range -> ARRAY", keywords: [{ pattern: "\\[0, 1000\\)\\s+=> ARRAY" }], hint: "Direct addressing, O(1) worst case." },
          ],
        },
      },
    ],
  },
  {
    id: "heaps",
    title: "Non-Linear: Heaps & Priority Queues",
    icon: "⛰️",
    color: C_RED,
    lessons: [
      {
        id: "cpp-ds-6-0",
        title: "Heaps: a tree that lives in an array",
        xp: 12,
        chapterTitle: "Non-Linear: Heaps & Priority Queues",
        theory: [
          objectives([
            "State the shape and order properties of a binary heap",
            "Map parent and child indices in the array representation",
            "Explain why a heap gives O(1) peek and O(log n) update but O(n) search",
          ]),
          text(
            "**Introduction:** A **heap** is a tree with one job: always keep the most important item at the very top, so you can grab it instantly. It does *not* keep everything sorted - it only promises that no item sits above a more important one. That weaker promise is what makes it cheap to maintain.\n\n**Real-life example:** A hospital emergency room. Nobody sorts every waiting patient into a perfect order. All the staff guarantee is that the most urgent case is the one called next. When a new patient arrives, they are slotted in relative to the people around them, not ranked against the whole room.",
          ),
          text(
            "In this topic you will learn:\n\n- the two rules every binary heap keeps: its **shape** and its **order**\n- why a heap needs no pointers at all and lives happily inside a plain array\n- the small index formulas that find a node's parent and children\n- why peeking is instant but searching for an ordinary value is slow",
          ),
          scenario(
            "Think of it like this",
            "Picture boarding a plane by priority group. Group 1 boards before group 2, and group 2 before group 3 - but inside group 2 nobody cares who stands where. That is a heap exactly: a strict rule going *down* the levels, and no rule at all *across* a level. So the gate agent can always answer \"who boards next?\" instantly, but \"is passenger Khan somewhere in the queue?\" still means looking at everybody.",
          ),
          text(
            "In precise terms, a **binary heap** is a **complete** binary tree - every level is full except possibly the last, which fills in from the left - that also keeps the **heap-order** property: every node compares `>=` its children (a max-heap) or `<=` its children (a min-heap). So the root is always the largest or the smallest item, which makes peeking **`O(1)`**.",
          ),
          text(
            "Because the tree is complete there are no gaps, so it packs perfectly into an array with **no pointers at all**. For a node at index `i` (0-based):\n\n- parent = `(i - 1) / 2`\n- left child = `2 * i + 1`\n- right child = `2 * i + 2`",
            {
              label: "Heap as an array",
              content: `// max-heap
// index:  0   1   2   3   4   5
// value: 50  30  40  10  20  35
//
//          50
//        /    \\
//      30      40
//     /  \\    /
//   10   20  35`,
            },
          ),
          text(
            "This is the ideal layout from Chapter 1 - contiguous, cache-friendly, zero allocation per element.",
          ),
          arrayViz(
            "The same max-heap as a tree and as a flat array",
            [
              {
                label: "value",
                values: ["50", "30", "40", "10", "20", "35"],
                colLabels: ["0", "1", "2", "3", "4", "5"],
                okIndexes: [0],
              },
            ],
            "Node at index i: parent = (i - 1) / 2, left = 2i + 1, right = 2i + 2. So index 1 (value 30) has parent 0 (50) and children 3 (10) and 4 (20). No pointers, perfect cache use.",
          ),
          callout(
            "info",
            "A heap is only *partially* ordered - siblings have no relationship. You cannot search a heap in better than `O(n)`, and in-order traversal is meaningless. It does exactly one job well: hand you the extreme element.",
          ),
          quiz(
            "In a 0-indexed array heap, the left child of index 4 is at index:",
            ["5", "8", "9", "10"],
            2,
            "left = 2 * i + 1 = 2 * 4 + 1 = 9.",
          ),
        ],
        challenge: {
          title: "Validate a min-heap array",
          description:
            "Return true if the array satisfies the min-heap property: every node is `<=` each of its children (at `2*i+1` and `2*i+2`, when they exist).",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

bool isMinHeap(const vector<int>& a) {
    // TODO: for each i, check a[i] <= its children
    return true;
}

int main() {
    cout << isMinHeap({1, 3, 2, 7, 8, 4, 5}) << endl;    // 1
    cout << isMinHeap({1, 3, 2, 7, 8, 9, 1, 0}) << endl; // 0  (a[3]=7 > a[7]=0)
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

bool isMinHeap(const vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n; i++) {
        int l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && a[i] > a[l]) return false;
        if (r < n && a[i] > a[r]) return false;
    }
    return true;
}

int main() {
    cout << isMinHeap({1, 3, 2, 7, 8, 4, 5}) << endl;    // 1
    cout << isMinHeap({1, 3, 2, 7, 8, 9, 1, 0}) << endl; // 0
    return 0;
}`,
          tests: [
            { id: 1, label: "Checks the left child", keywords: [{ pattern: "2 \\* i \\+ 1" }], hint: "l = 2 * i + 1." },
            { id: 2, label: "Checks the right child", keywords: [{ pattern: "2 \\* i \\+ 2" }], hint: "r = 2 * i + 2." },
            { id: 3, label: "Rejects a violated node", keywords: [{ pattern: "return false" }], hint: "Any parent > child breaks the property." },
          ],
        },
      },
      {
        id: "cpp-ds-6-1",
        title: "Min-heap and max-heap: sift-up, sift-down, build-heap",
        xp: 16,
        chapterTitle: "Non-Linear: Heaps & Priority Queues",
        theory: [
          objectives([
            "Implement push (sift-up) and pop (sift-down)",
            "Explain why build-heap is O(n), not O(n log n)",
            "Use std::priority_queue as a max-heap and as a min-heap",
          ]),
          text(
            "**Introduction:** A heap only has to fix itself along one path, not across the whole structure. When you add an item you drop it at the bottom and let it climb until it is in a sensible spot - that is **sift-up**. When you remove the top item you move the last item up to fill the hole and let it sink back down - that is **sift-down**. Each of those walks is at most the height of the tree.\n\n**Real-life example:** A new patient walks into the emergency room with chest pain. The nurse does not re-rank the entire waiting room. She compares this patient with the one just ahead, swaps them, compares again with the next one up, and stops as soon as the person ahead is more urgent.",
          ),
          text(
            "In this topic you will learn:\n\n- how **push** works by adding at the end and bubbling upward\n- how **pop** works by filling the hole and sinking downward\n- why turning a whole array into a heap is `O(n)`, not `O(n log n)`\n- how to use `std::priority_queue` as either a max-heap or a min-heap",
          ),
          scenario(
            "Think of it like this",
            "**Sift-up** is a bubble rising in a glass of water: it starts at the bottom, keeps floating past anything lighter than itself, and stops when it reaches its level. **Sift-down** is a stone dropped in the same glass: it keeps sinking past anything heavier until nothing below it can beat it. In both cases the item only ever moves along one straight path from top to bottom, and that path is at most `log n` steps long - which is why both operations are `O(log n)`.",
          ),
          text(
            "Two operations keep the heap ordered:\n\n- **push(x)** - append at the end, then **sift-up**: while it beats its parent, swap with the parent. `O(log n)`.\n- **pop()** - save the root, move the last element to index 0, shrink, then **sift-down**: while it loses to its better child, swap with that child. `O(log n)`.\n- **peek** - `arr[0]`. `O(1)`.",
            {
              label: "sift-up (min-heap)",
              content: `void siftUp(vector<int>& a, int i) {
    while (i > 0) {
        int parent = (i - 1) / 2;
        if (a[i] >= a[parent]) break;
        swap(a[i], a[parent]);
        i = parent;
    }
}`,
            },
          ),
          text(
            "**build-heap** - given an array, call sift-down on every non-leaf from the middle back to index 0. It looks like `O(n log n)`; a tighter sum shows it is **`O(n)`** (most nodes are near the bottom and barely move).",
          ),
          text(
            "`std::priority_queue<T>` is a **max-heap** by default. For a min-heap use `std::priority_queue<T, vector<T>, greater<T>>`. The free functions `make_heap` / `push_heap` / `pop_heap` work on any random-access range.",
          ),
          callout(
            "warning",
            "`priority_queue` gives you `top()` / `push()` / `pop()` only - no iteration, no \"find\", no \"change the priority of an arbitrary element\" (that needs an indexed heap).",
          ),
          quiz(
            "pop() on a binary heap is O(log n) because:",
            [
              "It scans the whole array",
              "sift-down walks at most the height of the tree",
              "It rebuilds the heap from scratch",
              "It sorts the array",
            ],
            1,
            "The moved root sinks at most log n levels.",
          ),
        ],
        challenge: {
          title: "Min-heap",
          description:
            "Implement `push` (append + sift-up) and `pop` (swap root with last, shrink, sift-down) on a vector<int>.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

struct MinHeap {
    vector<int> a;

    void push(int x) {
        // TODO: a.push_back(x); sift up while smaller than parent at (i - 1) / 2
    }
    int pop() {
        // TODO: save a[0]; move last to front; pop_back; sift down using 2 * i + 1
        return 0;
    }
    bool empty() { return a.empty(); }
};

int main() {
    MinHeap h;
    int xs[] = {5, 1, 8, 3, 9, 2, 7};
    for (int x : xs) h.push(x);
    while (!h.empty()) cout << h.pop() << " ";   // 1 2 3 5 7 8 9
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

struct MinHeap {
    vector<int> a;

    void push(int x) {
        a.push_back(x);
        int i = a.size() - 1;
        while (i > 0) {
            int parent = (i - 1) / 2;
            if (a[i] >= a[parent]) break;
            swap(a[i], a[parent]);
            i = parent;
        }
    }
    int pop() {
        int top = a[0];
        a[0] = a.back();
        a.pop_back();
        int i = 0, n = a.size();
        while (true) {
            int l = 2 * i + 1, r = 2 * i + 2, smallest = i;
            if (l < n && a[l] < a[smallest]) smallest = l;
            if (r < n && a[r] < a[smallest]) smallest = r;
            if (smallest == i) break;
            swap(a[i], a[smallest]);
            i = smallest;
        }
        return top;
    }
    bool empty() { return a.empty(); }
};

int main() {
    MinHeap h;
    int xs[] = {5, 1, 8, 3, 9, 2, 7};
    for (int x : xs) h.push(x);
    while (!h.empty()) cout << h.pop() << " ";   // 1 2 3 5 7 8 9
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses the parent index formula", keywords: [{ pattern: "\\(i - 1\\) / 2" }], hint: "parent = (i - 1) / 2." },
            { id: 2, label: "Uses the child index formula", keywords: [{ pattern: "2 \\* i \\+ 1" }], hint: "left child = 2 * i + 1." },
            { id: 3, label: "Swaps elements to restore order", keywords: [{ pattern: "swap\\(a\\[" }], hint: "swap(a[i], a[parent]) / swap(a[i], a[smallest])." },
          ],
        },
      },
      {
        id: "cpp-ds-6-2",
        title: "Heapsort, top-k, and streaming",
        xp: 12,
        chapterTitle: "Non-Linear: Heaps & Priority Queues",
        theory: [
          objectives([
            "Describe heapsort and its place next to quicksort",
            "Use a size-k heap to find the k largest of n items",
            "List the algorithms that lean on a priority queue",
          ]),
          text(
            "**Introduction:** Once you can pull the largest item out of a heap cheaply, two useful things follow. Pull *everything* out one at a time and you have sorted the data - that is **heapsort**. Or keep the heap deliberately small and you can find the best few items out of a huge stream without ever holding the whole stream in memory - that is **top-k**.\n\n**Real-life example:** A talent show where thousands of people audition but only the top 10 scores matter. Nobody writes down and sorts every score. The judges keep a small board of the current best 10, and the moment an 11th score appears, the weakest one on the board is wiped off.",
          ),
          text(
            "In this topic you will learn:\n\n- how heapsort works and where it sits next to quicksort and merge sort\n- the size-k heap trick for finding the k largest of n items\n- why that trick works on data too big to fit in memory\n- which well-known algorithms are quietly built on a priority queue",
          ),
          scenario(
            "Think of it like this",
            "For top-k, the surprising part is which heap you use. To keep the **10 largest** scores you keep a **min**-heap of size 10, so the *weakest* survivor sits on top where you can see it. Every new score is compared against that weakest one: if the newcomer is worse, throw it away immediately; if it is better, push it in and evict the weakest. The root of the heap is the doorman - it is the bar a newcomer has to clear to get in.",
          ),
          text(
            "**Heapsort**: build-heap in `O(n)`, then pop the max `n` times, each pop `O(log n)`, placing it at the shrinking end of the array -> **`O(n log n)`**, **in-place**, **not stable**. Its worst case is reliable (unlike quicksort), but its cache behaviour is poorer, so it is often the *fallback*: `std::sort` is introsort - quicksort that switches to heapsort when recursion goes too deep.",
          ),
          text(
            "**Top-k of n items**: keep a heap of size `k`. For the `k` **largest**, use a **min-heap** - push each item, and when the size exceeds `k`, pop the smallest. `O(n log k)` time, `O(k)` space, and it works on a **stream** you cannot hold in memory. Far better than sorting all `n` when `k` is much smaller than `n`.",
          ),
          text(
            "Other heap uses: Dijkstra and Prim pull the closest frontier node; event-driven simulation pulls the next event by timestamp; Huffman coding (next chapter) repeatedly pulls the two lowest frequencies; \"merge k sorted lists\" uses a k-way heap.",
          ),
          table(
            "Where heapsort sits among the O(n log n) sorts",
            ["Time (worst)", "Extra space", "Stable?", "Notes"],
            [
              ["Heapsort", "O(n log n)", "O(1)", "no", "reliable worst case, weak cache use"],
              ["Quicksort", "O(n^2)", "O(log n)", "no", "fastest in practice, bad pivots hurt"],
              ["Merge sort", "O(n log n)", "O(n)", "yes", "stable, great for linked lists / external"],
              ["std::sort (introsort)", "O(n log n)", "O(log n)", "no", "quicksort, falls back to heapsort"],
            ],
            { rowLabelHeader: "Algorithm", highlightRows: [0] },
          ),
          callout(
            "tip",
            "\"k largest\" -> min-heap of size k. \"k smallest\" -> max-heap of size k. The heap holds the *boundary*; its root is the next thing to evict.",
          ),
          quiz(
            "Streaming 10^9 numbers, you need the 100 largest. Best approach?",
            [
              "Sort all 10^9 numbers, O(n log n)",
              "A size-100 min-heap, O(n log k)",
              "A hash set",
              "A stack",
            ],
            1,
            "The heap keeps only the current top 100; anything smaller than its root is discarded immediately.",
          ),
        ],
        challenge: {
          title: "k largest with a size-k min-heap",
          description:
            "Return the `k` largest values of `v` (any order). Push each value into a **min-heap**; whenever it grows past `k`, pop the smallest.",
          starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> kLargest(const vector<int>& v, int k) {
    // TODO: min-heap of size k, then drain it
    return {};
}

int main() {
    vector<int> out = kLargest({4, 1, 7, 3, 9, 2, 8, 5}, 3);
    long long sum = 0;
    for (int x : out) sum += x;
    cout << out.size() << " " << sum << endl;   // 3 24  (7 + 8 + 9)
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

vector<int> kLargest(const vector<int>& v, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int x : v) {
        pq.push(x);
        if ((int)pq.size() > k) pq.pop();
    }
    vector<int> out;
    while (!pq.empty()) {
        out.push_back(pq.top());
        pq.pop();
    }
    return out;
}

int main() {
    vector<int> out = kLargest({4, 1, 7, 3, 9, 2, 8, 5}, 3);
    long long sum = 0;
    for (int x : out) sum += x;
    cout << out.size() << " " << sum << endl;   // 3 24
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses a min-heap", keywords: [{ pattern: "priority_queue<int, vector<int>, greater<int>>" }], hint: "greater<int> makes priority_queue a min-heap." },
            { id: 2, label: "Caps the heap at k", keywords: [{ pattern: "pq.size\\(\\) > k" }], hint: "Pop the smallest once size exceeds k." },
            { id: 3, label: "Evicts the smallest", keywords: [{ pattern: "pq.pop\\(\\)" }], hint: "The root is the boundary element to drop." },
          ],
        },
      },
    ],
  },
  {
    id: "graphs",
    title: "Graphs",
    icon: "🕸️",
    color: C_SKY,
    lessons: [
      {
        id: "cpp-ds-7-0",
        title: "Graph vocabulary: directed, weighted, and the rest",
        xp: 12,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "Define vertices, edges, degree, path, cycle, connectivity",
            "Distinguish directed vs undirected and weighted vs unweighted",
            "Recognise dense vs sparse and why a DAG matters",
          ]),
          text(
            "**Introduction:** A **graph** is just a set of things plus the connections between them. The things are called **vertices** (or nodes) and the connections are called **edges**. Unlike a tree, a graph has no top and no rules about who connects to whom - anything can link to anything, and loops are allowed.\n\n**Real-life example:** A city map. Each junction is a vertex and each road between two junctions is an edge. Some roads are one-way, some take longer than others, and you can absolutely drive in a circle and end up back where you started.",
          ),
          text(
            "In this topic you will learn:\n\n- the vocabulary: vertex, edge, degree, path, cycle, connected\n- the difference between **directed** and **undirected** connections\n- what **weights** on edges mean and when you need them\n- what a **DAG** is, and why \"dense\" versus \"sparse\" changes how you store a graph",
          ),
          scenario(
            "Think of it like this",
            "Compare two social apps. On Facebook, friendship goes both ways - if you are my friend, I am yours - so the graph is **undirected**. On Instagram you can follow someone who does not follow you back, so the graph is **directed** and the arrow matters. Now add flight routes between cities: each route has a direction *and* a price, so those edges carry a number. That number is the **weight**, and it is the whole reason \"fewest stops\" and \"cheapest ticket\" are two different questions.",
          ),
          text(
            "Written formally, a graph G = (V, E) is a set of **vertices** and a set of **edges** connecting them. It is the most general structure in the course - trees and linked lists are just graphs with extra restrictions bolted on.",
          ),
          text(
            "Pin these down before writing any code:\n\n- **directed vs undirected** - does edge (u, v) also mean (v, u)? One-way streets vs friendship.\n- **weighted vs unweighted** - does each edge carry a number (distance, cost, capacity)? Unweighted means every edge costs 1.\n- **cyclic vs acyclic** - a **DAG** (directed acyclic graph) models dependencies, build order and schedules, and enables topological sort.\n- **connected?** - is every vertex reachable? (Undirected: connected components. Directed: strongly connected components.)",
          ),
          text(
            "**Dense** (|E| about |V|^2) vs **sparse** (|E| about |V|) decides the representation (next lesson). Most real graphs - road networks, the web, social graphs - are very sparse.",
          ),
          diagram("Four nodes, three graphs", [
            { id: "u", label: "Undirected, unweighted", color: C_SKY, items: ["edges are symmetric", "every edge costs 1"] },
            { id: "d", label: "Directed", color: ACCENT, items: ["u -> v is not v -> u", "models one-way relations"] },
            { id: "w", label: "Weighted", color: C_AMBER, items: ["each edge has a number", "distance / cost / capacity"] },
          ]),
          callout(
            "info",
            "A **tree** is a connected undirected graph with exactly |V| - 1 edges and no cycles. A linked list is a tree where every node has at most one child.",
          ),
          quiz(
            "A table of one-way flight routes, each with a ticket price, is a ___ graph.",
            ["undirected, unweighted", "undirected, weighted", "directed, unweighted", "directed, weighted"],
            3,
            "Routes have a direction and carry a number, so it is directed and weighted.",
          ),
        ],
        challenge: {
          title: "Degree of every vertex",
          description:
            "Undirected graph. Return `deg` where `deg[v]` is the number of edges touching vertex `v` - each edge `(u, v)` adds one to both endpoints.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> degrees(int n, const vector<pair<int,int>>& edges) {
    vector<int> deg(n, 0);
    // TODO: for each edge, bump deg[u] and deg[v]
    return deg;
}

int main() {
    vector<pair<int,int>> e = {{0,1},{0,2},{1,2},{2,3}};
    vector<int> d = degrees(4, e);
    for (int x : d) cout << x << " ";   // 2 2 3 1
    cout << endl;
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

vector<int> degrees(int n, const vector<pair<int,int>>& edges) {
    vector<int> deg(n, 0);
    for (size_t i = 0; i < edges.size(); i++) {
        deg[edges[i].first]++;
        deg[edges[i].second]++;
    }
    return deg;
}

int main() {
    vector<pair<int,int>> e = {{0,1},{0,2},{1,2},{2,3}};
    vector<int> d = degrees(4, e);
    for (int x : d) cout << x << " ";   // 2 2 3 1
    cout << endl;
    return 0;
}`,
          tests: [
            { id: 1, label: "Counts the first endpoint", keywords: [{ pattern: "deg\\[edges\\[i\\].first\\]\\+\\+" }], hint: "Every edge touches u." },
            { id: 2, label: "Counts the second endpoint", keywords: [{ pattern: "deg\\[edges\\[i\\].second\\]\\+\\+" }], hint: "Undirected: it also touches v." },
          ],
        },
      },
      {
        id: "cpp-ds-7-1",
        title: "Representations: adjacency list vs adjacency matrix",
        xp: 16,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "State the space and per-operation costs of each representation",
            "Match each to dense vs sparse graphs",
            "Build an adjacency list from an edge list",
          ]),
          text(
            "**Introduction:** Knowing what a graph *is* does not tell you how to store one in memory. There are two standard ways. You can keep a big grid with a row and a column for every vertex and tick the boxes where edges exist - an **adjacency matrix**. Or you can give each vertex a short list of just its own neighbours - an **adjacency list**. The choice matters enormously once graphs get big.\n\n**Real-life example:** Recording who in a class of 30 knows whom. The grid version is a 30x30 attendance-style sheet with a tick in every box where two people know each other. The list version is 30 short lines: \"Ali: Sara, Omar\", \"Sara: Ali\", and so on.",
          ),
          text(
            "In simple words:\n\n- a **matrix** answers \"are these two connected?\" instantly, but always takes |V| x |V| space even if there are barely any edges\n- a **list** only stores edges that actually exist, and gives you a vertex's neighbours directly\n- almost every real graph has far fewer edges than the maximum possible, so the list usually wins",
          ),
          scenario(
            "Think of it like this",
            "Imagine a wedding seating problem with 1,000 guests. The matrix is a million-cell spreadsheet where you tick a box for every pair who know each other - and since a typical guest knows maybe 20 others, over 99.9% of that spreadsheet is blank. The list is 1,000 short lines, one per guest, naming only the people they actually know. Same information, but one fits on a page and the other needs a warehouse. That gap is the difference between `O(V^2)` and `O(V + E)`.",
          ),
          text(
            "**Adjacency matrix** - a |V| x |V| grid, `M[u][v] = 1` (or the weight) if the edge exists.\n\n- edge lookup \"is u -> v there?\" is `O(1)`\n- space is `O(|V|^2)` regardless of edge count\n- iterating one vertex's neighbours is `O(|V|)` even if it has two\n- great for **dense** graphs and algorithms that probe random edges (Floyd-Warshall)",
          ),
          text(
            "**Adjacency list** - an array of |V| lists; `adj[u]` holds u's neighbours (with weights if any).\n\n- space is `O(|V| + |E|)`\n- iterating a vertex's neighbours is `O(degree)` - optimal\n- edge lookup is `O(degree)`\n- the default for **sparse** graphs and for BFS / DFS / Dijkstra. In C++: `vector<vector<int>>`, or `vector<vector<pair<int,int>>>` with weights.",
          ),
          diagram("5 nodes, 4 edges", [
            { id: "m", label: "Matrix", color: C_RED, items: ["25 cells", "mostly zero", "O(V^2) memory"] },
            { id: "l", label: "List", color: C_GREEN, items: ["5 short rows", "8 entries total", "O(V + E) memory"] },
          ]),
          table(
            "Adjacency list vs adjacency matrix",
            ["Adjacency list", "Adjacency matrix"],
            [
              ["Space", "O(V + E)", "O(V^2)"],
              ["\"Is there an edge u-v?\"", "O(degree)", "O(1)"],
              ["Iterate a vertex's neighbours", "O(degree)", "O(V)"],
              ["Add an edge", "O(1)", "O(1)"],
              ["Best for", "sparse graphs, BFS/DFS/Dijkstra", "dense graphs, Floyd-Warshall"],
            ],
            { rowLabelHeader: "Operation" },
          ),
          callout(
            "tip",
            "Unless you know the graph is dense, or you need `O(1)` edge-existence checks, use an adjacency list.",
          ),
          quiz(
            "A social graph has 10^9 users averaging 200 friends. Which representation is feasible?",
            ["Adjacency matrix", "Adjacency list", "Both work fine", "Neither"],
            1,
            "A matrix would need 10^18 cells; the list needs about 2 * 10^11 entries.",
          ),
        ],
        challenge: {
          title: "Build an adjacency list",
          description:
            "Fill `buildAdj` for an UNDIRECTED graph: for each edge (u, v), record v in adj[u] and u in adj[v].",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildAdj(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    // TODO: for each edge, push both directions
    return adj;
}

int main() {
    vector<pair<int,int>> edges = {{0,1},{0,2},{1,2},{2,3},{3,4}};
    vector<vector<int>> adj = buildAdj(5, edges);
    cout << adj[2].size() << endl; // 3
    cout << adj[0].size() << endl; // 2
    cout << adj[4].size() << endl; // 1
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> buildAdj(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    for (size_t i = 0; i < edges.size(); i++) {
        int u = edges[i].first;
        int v = edges[i].second;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    return adj;
}

int main() {
    vector<pair<int,int>> edges = {{0,1},{0,2},{1,2},{2,3},{3,4}};
    vector<vector<int>> adj = buildAdj(5, edges);
    cout << adj[2].size() << endl; // 3
    cout << adj[0].size() << endl; // 2
    cout << adj[4].size() << endl; // 1
    return 0;
}`,
          tests: [
            { id: 1, label: "Records the forward direction", keywords: [{ pattern: "adj\\[u\\].push_back\\(v\\)" }], hint: "adj[u].push_back(v)." },
            { id: 2, label: "Records the reverse direction", keywords: [{ pattern: "adj\\[v\\].push_back\\(u\\)" }], hint: "Undirected: also adj[v].push_back(u)." },
            { id: 3, label: "Iterates the edge list", keywords: [{ pattern: "edges\\[i\\]" }], hint: "Use .first and .second of each pair." },
          ],
        },
      },
      {
        id: "cpp-ds-7-2",
        title: "Traversal: BFS and DFS",
        xp: 16,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "Contrast BFS (queue) and DFS (stack / recursion)",
            "State what each traversal computes and its complexity",
            "Explain why you mark a node visited when you enqueue it",
          ]),
          text(
            "**Introduction:** **Traversal** means visiting every vertex you can reach from a starting point, without visiting anything twice. There are two ways to do it. **BFS** (breadth-first search) explores everything one step away, then everything two steps away, and so on. **DFS** (depth-first search) picks one direction and follows it as far as it goes before backing up and trying another.\n\n**Real-life example:** Looking for a friend in a shopping mall. BFS is checking every shop on your floor first, then every shop on the next floor. DFS is walking down one corridor to the very end, checking each shop, then coming back and taking the next corridor.",
          ),
          text(
            "In this topic you will learn:\n\n- why BFS uses a **queue** and DFS uses a **stack** (or recursion)\n- what each traversal is actually good at computing\n- why both cost `O(|V| + |E|)` on an adjacency list\n- the one bug almost everybody writes: marking a node visited too late",
          ),
          scenario(
            "Think of it like this",
            "BFS is a drop of ink spreading in water: it moves outward in perfect rings, so everything one step away is coloured before anything two steps away is touched. That is exactly why BFS finds the **shortest path in edges** - the first time the ink reaches a vertex, it got there by the shortest possible route. DFS is following a thread through a maze: you keep going deeper until you hit a dead end, then reel back to the last junction and try a different turn. Neither is better; they answer different questions.",
          ),
          text(
            "Both visit every reachable vertex once, in `O(|V| + |E|)` on an adjacency list. They differ only by the container holding the frontier:\n\n- **BFS** - a **queue** (FIFO). Explores in rings of increasing distance. Gives the **shortest path in an unweighted graph** (fewest edges), plus connected components and bipartite checks.\n- **DFS** - a **stack** (explicit, or the call stack via recursion). Plunges down one path, then backtracks. Powers cycle detection, topological sort, strongly connected components, and maze / backtracking problems.",
            {
              label: "BFS with a queue",
              content: `#include <queue>
#include <vector>
using namespace std;

vector<int> bfs(const vector<vector<int>>& adj, int src) {
    vector<int> dist(adj.size(), -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {      // first time seen
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    return dist;
}`,
            },
          ),
          text(
            "Key detail: mark a node **visited the moment you push it onto the frontier**, not when you later pop it off. If you wait, the same vertex can be pushed by several different neighbours before it is ever processed, and it ends up sitting in the queue many times over. It is the same reason a shop takes your name when you join the waiting list, not when you finally reach the counter.",
          ),
          table(
            "BFS vs DFS",
            ["BFS", "DFS"],
            [
              ["Frontier held in", "a queue (FIFO)", "a stack / recursion (LIFO)"],
              ["Explores", "in rings of equal distance", "one path to the end, then backtracks"],
              ["Extra space", "O(width) of the graph", "O(depth) of the graph"],
              ["Signature use", "shortest path in edges", "cycle detection, topological sort, SCC"],
            ],
            { rowLabelHeader: "Aspect", footnote: "Both are O(V + E) on an adjacency list and visit each vertex once." },
          ),
          callout(
            "warning",
            "Recursive DFS on a graph with a long path can overflow the call stack (roughly 10^4 - 10^5 deep). Use an explicit stack for large graphs.",
          ),
          quiz(
            "Which traversal finds the minimum number of edges between two nodes in an unweighted graph?",
            ["DFS", "BFS", "Either one", "Neither"],
            1,
            "BFS visits nodes in nondecreasing distance order, so the first time it reaches the target is via a shortest path.",
          ),
        ],
        challenge: {
          title: "BFS reachability",
          description:
            "Return true iff `target` is reachable from `start` in the adjacency list, using a queue and a visited array.",
          starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool reachable(const vector<vector<int>>& adj, int start, int target) {
    // TODO: BFS from start; return true if you dequeue target
    return false;
}

int main() {
    vector<vector<int>> adj = {
        {1, 2}, {0, 3}, {0}, {1, 4}, {3}, {6}, {5}
    };
    cout << reachable(adj, 0, 4) << endl; // 1
    cout << reachable(adj, 0, 5) << endl; // 0
    cout << reachable(adj, 5, 6) << endl; // 1
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

bool reachable(const vector<vector<int>>& adj, int start, int target) {
    if (start == target) return true;
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (v == target) return true;
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    return false;
}

int main() {
    vector<vector<int>> adj = {
        {1, 2}, {0, 3}, {0}, {1, 4}, {3}, {6}, {5}
    };
    cout << reachable(adj, 0, 4) << endl; // 1
    cout << reachable(adj, 0, 5) << endl; // 0
    cout << reachable(adj, 5, 6) << endl; // 1
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses a queue for the frontier", keywords: [{ pattern: "queue<int>" }], hint: "queue<int> q;" },
            { id: 2, label: "Tracks visited nodes", keywords: [{ pattern: "visited" }], hint: "vector<bool> visited(adj.size())." },
            { id: 3, label: "Pushes neighbours", keywords: [{ pattern: "q.push\\(" }], hint: "Enqueue each unvisited neighbour." },
          ],
        },
      },
      {
        id: "cpp-ds-7-3",
        title: "Adding weights: from BFS to Dijkstra",
        xp: 12,
        chapterTitle: "Graphs",
        theory: [
          objectives([
            "Explain why BFS fails on weighted graphs",
            "Describe Dijkstra as BFS with a min-heap and edge relaxation",
            "Name the algorithm to reach for when Dijkstra's assumptions break",
          ]),
          text(
            "**Introduction:** BFS treats every edge as costing exactly the same. The moment edges carry different costs - kilometres, minutes, money - the route with the fewest steps stops being the cheapest route. **Dijkstra's algorithm** is the fix: it is BFS with the plain queue swapped for a min-heap, so you always expand the vertex that is cheapest to reach so far.\n\n**Real-life example:** Google Maps. The route with the fewest turns is rarely the fastest one - a single motorway stretch can beat six short residential streets. Maps compares total travel time, not number of roads.",
          ),
          text(
            "In this topic you will learn:\n\n- exactly why BFS gives wrong answers on a weighted graph\n- how Dijkstra uses a min-heap and a step called **relaxation**\n- the one condition Dijkstra needs in order to be correct\n- which algorithm to reach for when that condition does not hold",
          ),
          scenario(
            "Think of it like this",
            "Imagine planning a trip and always choosing to visit next whichever city you can currently reach most cheaply. Each time you arrive somewhere, you check its onward routes and ask: \"does going through here make any other city cheaper than my current best guess?\" If yes, you write down the better price. That check is **relaxation**, and repeating it while always picking the cheapest-so-far city is all Dijkstra is. It only works because prices are never negative - nobody pays you to travel - so once a city is reached at its cheapest price, no later route can beat it.",
          ),
          text(
            "In precise terms, Dijkstra replaces BFS's plain queue with a **min-heap / priority queue** keyed by distance-so-far:\n\n- start: `dist[src] = 0`, all others infinity, push (0, src)\n- repeatedly pop the closest unfinished vertex and **relax** each outgoing edge: if `dist[u] + w < dist[v]`, update `dist[v]` and push (dist[v], v)\n- `O((|V| + |E|) log |V|)` with a binary heap",
          ),
          text(
            "Requirements and relatives:\n\n- Dijkstra needs **non-negative** weights. Negative edges -> **Bellman-Ford**, `O(|V| * |E|)`.\n- all-pairs shortest paths -> **Floyd-Warshall**, `O(|V|^3)`, matrix-friendly\n- minimum spanning tree -> **Prim** (heap, like Dijkstra) or **Kruskal** (sort edges + **union-find**)\n- shortest/longest path on a DAG -> topological order + one relax pass, `O(|V| + |E|)`",
          ),
          table(
            "Pick the path algorithm by the graph you have",
            ["Solves", "Needs", "Time", "Key structure"],
            [
              ["BFS", "shortest path, unweighted", "-", "O(V + E)", "queue"],
              ["Dijkstra", "shortest path, 1 source", "weights >= 0", "O((V + E) log V)", "min-heap"],
              ["Bellman-Ford", "shortest path, 1 source", "any weights", "O(V * E)", "edge list"],
              ["Floyd-Warshall", "shortest path, all pairs", "any weights", "O(V^3)", "matrix"],
              ["Topological + relax", "shortest / longest on a DAG", "acyclic", "O(V + E)", "queue / stack"],
              ["Kruskal / Prim", "minimum spanning tree", "undirected", "O(E log V)", "union-find / min-heap"],
            ],
            { rowLabelHeader: "Algorithm" },
          ),
          callout(
            "info",
            "Dijkstra *is* BFS when every weight is 1 - the priority queue just degenerates into a plain queue.",
          ),
          text(
            "Where to go next: union-find (disjoint set) for connectivity and Kruskal; Fenwick / segment trees for range queries; tries for string keys; A* for heuristic-guided shortest path.",
          ),
          quiz(
            "Dijkstra swaps BFS's plain queue for a:",
            ["Stack", "Min-priority-queue keyed by distance", "Hash table", "Deque"],
            1,
            "Always expanding the closest known vertex is what makes the greedy choice correct for non-negative weights.",
          ),
        ],
        challenge: {
          title: "One relaxation step",
          description:
            "Relax edge `u -> v` with weight `w`. If going through `u` gives a shorter path to `v`, update `dist[v]` and return true; otherwise return false. Treat `INF` as unreachable.",
          starterCode: `#include <iostream>
#include <vector>
using namespace std;

const int INF = 1000000000;

bool relax(vector<int>& dist, int u, int v, int w) {
    // TODO
    return false;
}

int main() {
    vector<int> dist = {0, INF, INF};
    cout << relax(dist, 0, 1, 5) << endl;   // 1  (dist[1] becomes 5)
    cout << relax(dist, 0, 1, 8) << endl;   // 0  (no improvement)
    cout << dist[1] << endl;                // 5
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
using namespace std;

const int INF = 1000000000;

bool relax(vector<int>& dist, int u, int v, int w) {
    if (dist[u] != INF && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        return true;
    }
    return false;
}

int main() {
    vector<int> dist = {0, INF, INF};
    cout << relax(dist, 0, 1, 5) << endl;   // 1
    cout << relax(dist, 0, 1, 8) << endl;   // 0
    cout << dist[1] << endl;                // 5
    return 0;
}`,
          tests: [
            { id: 1, label: "Skips an unreachable source", keywords: [{ pattern: "dist\\[u\\] != INF" }], hint: "Can't extend a path you don't have yet." },
            { id: 2, label: "Tests for a shorter path", keywords: [{ pattern: "dist\\[u\\] \\+ w < dist\\[v\\]" }], hint: "Only update on a strict improvement." },
            { id: 3, label: "Writes the new distance", keywords: [{ pattern: "dist\\[v\\] = dist\\[u\\] \\+ w" }], hint: "Commit the shorter path." },
          ],
        },
      },
    ],
  },
  {
    id: "compression",
    title: "Data Compression & Huffman Encoding",
    icon: "🗜️",
    color: ACCENT,
    lessons: [
      {
        id: "cpp-ds-8-0",
        title: "Why compression works: redundancy and entropy",
        xp: 12,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Explain compression as removing statistical redundancy",
            "Define entropy as the lower bound on lossless size",
            "Distinguish lossless from lossy and know when each is acceptable",
          ]),
          text(
            "**Introduction:** **Compression** works because real data repeats itself. Some letters appear far more often than others, whole phrases come back again and again, and neighbouring values are usually close together. If you give the common things short descriptions and the rare things long ones, the total gets smaller - and nothing is lost.\n\n**Real-life example:** Note-taking shorthand. You write \"govt\" instead of \"government\" because you write that word constantly, and you spell rare words out in full. Fewer strokes, same meaning.",
          ),
          text(
            "In this topic you will learn:\n\n- what **redundancy** means and why it is the thing compression removes\n- what **entropy** is: the hard limit on how small data can get\n- why already-compressed or encrypted files refuse to shrink further\n- the difference between **lossless** and **lossy**, and when each is acceptable",
          ),
          scenario(
            "Think of it like this",
            "Think about how you describe where you live. To a neighbour you say \"three doors down\" - very few words, because most of the information is already shared between you. To a courier from another city you have to give the full address. Compression is the same trick: the more predictable something is, the fewer bits you need to pin it down. And that gives you the limit too - if every possibility were equally likely, like a truly random lottery number, there would be no shortcut and nothing to save.",
          ),
          text(
            "That limit has a name. **Entropy** (Shannon) is the average amount of information per symbol, `H = -sum p(s) * log2 p(s)` bits. It is a hard floor: no lossless coder can average fewer than `H` bits per symbol, ever. English text carries roughly 4 - 4.5 bits per character of entropy but is stored at 8 bits per character, so about 2x shrinkage is free for the taking. Data that is already random - encrypted, or already compressed - has `H` near 8, which is why zipping a `.zip` gains you nothing.",
          ),
          text(
            "**Lossless** (ZIP, PNG, FLAC, gzip) - decompresses to the exact original bytes; required for text, code, archives. **Lossy** (JPEG, MP3, H.264) - discards detail humans barely perceive for much higher ratios; fine for photos, audio and video, never for a spreadsheet.",
          ),
          callout(
            "info",
            "Most real codecs are **two stages**: a *model / transform* that exposes redundancy (RLE, an LZ dictionary, a delta filter, the DCT) followed by an *entropy coder* (Huffman or arithmetic / range coding) that cashes in the skewed probabilities.",
          ),
          diagram("Compression pipeline", [
            { id: "model", label: "1. Model / transform", color: C_SKY, items: ["expose repetition & structure", "RLE, LZ, delta, DCT"] },
            { id: "entropy", label: "2. Entropy coder", color: ACCENT, items: ["short codes for frequent symbols", "Huffman / arithmetic"] },
          ]),
          quiz(
            "What is the theoretical lower bound on lossless bits per symbol?",
            ["0", "1 bit", "The source's entropy H", "8 bits"],
            2,
            "Shannon's source coding theorem: you cannot beat the entropy of the source without losing information.",
          ),
        ],
        challenge: {
          title: "Shannon entropy",
          description:
            "Compute `H = -sum p * log2(p)` over a probability distribution, skipping any `p == 0` (log of zero is undefined).",
          starterCode: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

double entropy(const vector<double>& p) {
    // TODO
    return 0.0;
}

int main() {
    cout << entropy({0.5, 0.5}) << endl;             // 1
    cout << entropy({1.0, 0.0}) << endl;             // 0
    cout << entropy({0.25, 0.25, 0.25, 0.25}) << endl; // 2
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

double entropy(const vector<double>& p) {
    double h = 0.0;
    for (double pi : p) {
        if (pi > 0.0) h -= pi * log2(pi);
    }
    return h;
}

int main() {
    cout << entropy({0.5, 0.5}) << endl;             // 1
    cout << entropy({1.0, 0.0}) << endl;             // 0
    cout << entropy({0.25, 0.25, 0.25, 0.25}) << endl; // 2
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses log base 2", keywords: [{ pattern: "log2\\(pi\\)" }], hint: "Entropy is measured in bits." },
            { id: 2, label: "Subtracts each term", keywords: [{ pattern: "h -= pi \\* log2\\(pi\\)" }], hint: "H = -sum p * log2(p)." },
            { id: 3, label: "Skips zero probabilities", keywords: [{ pattern: "pi > 0" }], hint: "log2(0) is undefined - treat its contribution as 0." },
          ],
        },
      },
      {
        id: "cpp-ds-8-1",
        title: "Core techniques: RLE, dictionary, delta",
        xp: 16,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Describe run-length, dictionary (LZ), and delta coding",
            "Match each technique to the data shape it suits",
            "See how these front-ends feed an entropy coder",
          ]),
          text(
            "**Introduction:** Before any clever bit-level maths happens, a compressor first rearranges the data to make its repetition obvious. There are three classic ways to do that: note down long runs of the same value (**RLE**), point back to something you already wrote (**dictionary / LZ**), or store only how much each value changed from the last one (**delta**).\n\n**Real-life example:** Writing up meeting minutes. You write \"all six voted yes\" instead of six separate lines (that is RLE), you write \"same as last week's point 3\" instead of retyping it (that is a dictionary reference), and you write \"budget up by 2%\" instead of the full figure (that is delta).",
          ),
          text(
            "In this topic you will learn:\n\n- how **run-length encoding** collapses repeated values, and when it backfires\n- how the **LZ family** points backwards at text it has already seen\n- how **delta coding** turns smooth data into small numbers near zero\n- why all three are only the first half of a real compressor",
          ),
          scenario(
            "Think of it like this",
            "Picture describing a knitting pattern out loud. \"Thirty red, then one white, then thirty red\" is **RLE** - you say the count instead of naming each stitch. \"Rows 5 to 9 are the same as rows 1 to 4\" is the **LZ dictionary** idea - you refer back rather than repeat. \"Each row is one stitch wider than the one before\" is **delta** - you describe the change, not the value. None of these three invents information; they just move the repetition somewhere a bit-counter can cash it in.",
          ),
          text(
            "**Run-length encoding (RLE)** - replace a run of one value with (value, count). `AAAAABBB` -> `A5B3`. Brilliant on data with long runs (bitmap masks, fax, simple graphics); it *expands* data with no runs at all, so real formats switch it on only where it helps.",
          ),
          text(
            "**Dictionary / LZ family** - replace a repeated sequence with a reference to its earlier occurrence.\n\n- **LZ77** (gzip, zip, PNG): emit `(distance back, length, next literal)` over a sliding window\n- **LZ78 / LZW** (GIF, old `compress`): build an explicit dictionary of seen strings, emit dictionary indices",
          ),
          text(
            "**Delta / predictive coding** - store the *difference* from a prediction (the previous sample, the pixel to the left, the previous video frame). Smoothly varying data becomes small numbers clustered near zero, which the entropy stage then crushes. **BWT + move-to-front** (bzip2) is a reversible reordering that groups similar contexts so RLE and entropy do better.",
          ),
          diagram("Technique -> data it suits", [
            { id: "rle", label: "RLE", color: C_GREEN, items: ["long runs of one value"] },
            { id: "lz", label: "LZ dictionary", color: C_SKY, items: ["repeated substrings anywhere"] },
            { id: "delta", label: "Delta", color: C_AMBER, items: ["smooth series: audio, sensors, images"] },
          ]),
          table(
            "Which technique for which data",
            ["Turns this...", "...into this", "Seen in"],
            [
              ["RLE", "long runs of one value", "(value, count) pairs", "fax, PCX, PackBits"],
              ["LZ77", "any repeated substring", "(distance, length, literal)", "gzip, zip, PNG"],
              ["LZ78 / LZW", "repeated substrings", "dictionary indices", "GIF, TIFF, old compress"],
              ["Delta", "smooth series", "small values near zero", "audio (FLAC), sensor logs, video"],
              ["BWT + MTF", "text with local structure", "runs the entropy stage loves", "bzip2"],
            ],
            { rowLabelHeader: "Technique" },
          ),
          callout(
            "tip",
            "These are *front-ends*. Their job is to hand a skewed symbol distribution to Huffman or arithmetic coding, which does the actual bit-shaving.",
          ),
          quiz(
            "`WWWWWWWWWWWWBWWWWWW` compresses well under which technique?",
            ["Delta coding", "Run-length encoding", "It cannot be compressed", "Double hashing"],
            1,
            "Two long runs of W around a single B: RLE turns 19 chars into three (value, count) pairs.",
          ),
        ],
        challenge: {
          title: "Run-length encoding",
          description:
            "Implement `rleEncode` (\"aaabbc\" -> \"a3b2c1\") and `rleDecode` (\"a3b2c1\" -> \"aaabbc\"); counts are single digits.",
          starterCode: `#include <iostream>
#include <string>
using namespace std;

string rleEncode(const string& s) {
    // TODO: for each run of equal chars, append char then its count
    return "";
}
string rleDecode(const string& s) {
    // TODO: read (char, digit) pairs, repeat char digit times
    return "";
}

int main() {
    cout << rleEncode("aaabbc") << endl;              // a3b2c1
    cout << rleDecode("a3b2c1") << endl;              // aaabbc
    cout << rleDecode(rleEncode("wwwww")) << endl;    // wwwww
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

string rleEncode(const string& s) {
    string out;
    for (size_t i = 0; i < s.size(); ) {
        size_t j = i;
        int count = 0;
        while (j < s.size() && s[j] == s[i]) { j++; count++; }
        out += s[i];
        out += to_string(count);
        i = j;
    }
    return out;
}
string rleDecode(const string& s) {
    string out;
    for (size_t i = 0; i + 1 < s.size(); i += 2) {
        char c = s[i];
        int count = s[i + 1] - '0';
        for (int k = 0; k < count; k++) out += c;
    }
    return out;
}

int main() {
    cout << rleEncode("aaabbc") << endl;              // a3b2c1
    cout << rleDecode("a3b2c1") << endl;              // aaabbc
    cout << rleDecode(rleEncode("wwwww")) << endl;    // wwwww
    return 0;
}`,
          tests: [
            { id: 1, label: "Encoder writes the run length", keywords: [{ pattern: "to_string" }], hint: "Append to_string(count) after the char." },
            { id: 2, label: "Encoder counts consecutive equal chars", keywords: [{ pattern: "count" }], hint: "Advance while s[j] == s[i]." },
            { id: 3, label: "Decoder turns a digit char into a number", keywords: [{ pattern: "- '0'" }], hint: "s[i + 1] - '0' is the repeat count." },
          ],
        },
      },
      {
        id: "cpp-ds-8-2",
        title: "Huffman encoding: optimal prefix codes with a min-heap",
        xp: 18,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Build a Huffman tree from symbol frequencies using a min-heap",
            "Explain the prefix property and why it enables unambiguous decoding",
            "Argue informally why the greedy merge is optimal",
          ]),
          text(
            "**Introduction:** **Huffman coding** gives every symbol its own pattern of bits, and it deliberately makes common symbols short and rare symbols long. It builds those codes by repeatedly joining the two rarest items together - and a min-heap is exactly the tool that hands you the two rarest items quickly.\n\n**Real-life example:** Morse code. The letter E is the most common letter in English, so it is a single dot. Q is rare, so it is dash-dash-dot-dash. Same idea, chosen by hand a century before Huffman proved how to choose it optimally.",
          ),
          text(
            "In this topic you will learn:\n\n- how to build a Huffman tree from symbol frequencies using a min-heap\n- what the **prefix property** is and why it makes decoding unambiguous\n- how to read a symbol's code off the tree\n- why merging the two rarest items every time really does give the best possible answer",
          ),
          scenario(
            "Think of it like this",
            "The **prefix property** is the reason phone numbers work. No country's dialling code is the start of another country's number - otherwise the phone network would never know when your number had finished. Huffman codes keep the same promise: because every symbol sits at a *leaf* of the tree, no symbol's bit pattern is ever the beginning of another symbol's. So a decoder can read bits one at a time and always know exactly where one symbol ends and the next begins - no commas, no lengths, no lookahead.",
          ),
          text(
            "The algorithm itself is a greedy merge driven by a **min-heap** (Chapter 7):\n\n1. Make a leaf node for each symbol with its frequency; push all leaves into a min-heap keyed by frequency.\n2. While the heap has more than one node: **pop the two smallest**, make a new internal node whose frequency is their sum and whose children are those two, **push it back**.\n3. The last node left is the **root**. The path to each leaf (left = 0, right = 1) is that symbol's code.",
            {
              label: "The merge loop",
              content: `#include <queue>
#include <vector>
using namespace std;

struct HNode { int freq; HNode* l; HNode* r; };
struct Cmp { bool operator()(HNode* a, HNode* b) const { return a->freq > b->freq; } };

priority_queue<HNode*, vector<HNode*>, Cmp> pq;   // min-heap by freq
// ... push one leaf per symbol ...
while (pq.size() > 1) {
    HNode* a = pq.top(); pq.pop();
    HNode* b = pq.top(); pq.pop();
    pq.push(new HNode{a->freq + b->freq, a, b});
}
HNode* root = pq.top();`,
            },
          ),
          diagram("Merge order for A:5 B:2 C:1 D:1", [
            { id: "s1", label: "Step 1", color: C_SKY, items: ["pop C(1), D(1) -> node(2)"] },
            { id: "s2", label: "Step 2", color: C_SKY, items: ["pop node(2), B(2) -> node(4)"] },
            { id: "s3", label: "Step 3", color: C_SKY, items: ["pop node(4), A(5) -> root(9)"] },
            { id: "codes", label: "Codes", color: C_GREEN, items: ["A=0  B=10  C=110  D=111"] },
          ]),
          text(
            "**Why greedy is optimal**: the two rarest symbols should end up furthest from the root, because depth is cost and you want to spend your longest codes on the symbols you use least. You can always swap them down to be the deepest pair of siblings without making the total any worse. Once they are paired, treat them as a single combined symbol - now you have one fewer symbol and exactly the same problem, so repeating the argument all the way down proves the result. The total encoded size is `sum freq(s) * depth(s)`, which Huffman minimises; it lands within 1 bit/symbol of entropy. **Arithmetic / range coding** closes that last gap by not rounding to whole bits.",
          ),
          table(
            "The finished code table for A:5 B:2 C:1 D:1",
            ["Frequency", "Huffman code", "Code length", "Bits contributed"],
            [
              ["A", "5", "0", "1", "5"],
              ["B", "2", "10", "2", "4"],
              ["C", "1", "110", "3", "3"],
              ["D", "1", "111", "3", "3"],
              ["Total (9 symbols)", "9", "-", "-", "15 bits"],
            ],
            { rowLabelHeader: "Symbol", highlightRows: [4], footnote: "A fixed-width 2-bit code would need 9 x 2 = 18 bits. Huffman spends 15 - and no code is a prefix of another, so decoding is unambiguous." },
          ),
          callout(
            "info",
            "The decoder needs the same tree - real formats store the code lengths in a header (**canonical Huffman**) or rebuild them adaptively. DEFLATE (zip / gzip) is LZ77 **then** Huffman.",
          ),
          quiz(
            "Repeatedly taking the two lowest-frequency nodes and reinserting their combined node is done efficiently with which structure?",
            ["A stack", "A min-heap / priority queue", "A hash table", "A plain array, rescanned each time"],
            1,
            "Each of the k - 1 merges is two pops and one push, O(log k) apiece.",
          ),
        ],
        challenge: {
          title: "Huffman code length",
          description:
            "Return the minimum total bits to Huffman-encode symbols with these frequencies: repeatedly pop the two smallest, add their sum to the answer, and push the sum back.",
          starterCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

long long huffmanBits(const vector<int>& freq) {
    // TODO: min-heap of frequencies; while size > 1, pop 2, bits += a + b, push a + b
    return 0;
}

int main() {
    cout << huffmanBits({5, 2, 1, 1}) << endl; // 15
    cout << huffmanBits({10}) << endl;         // 0
    cout << huffmanBits({1, 1, 1, 1}) << endl; // 8
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

long long huffmanBits(const vector<int>& freq) {
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int f : freq) pq.push(f);
    long long bits = 0;
    while (pq.size() > 1) {
        long long a = pq.top(); pq.pop();
        long long b = pq.top(); pq.pop();
        bits += a + b;
        pq.push(a + b);
    }
    return bits;
}

int main() {
    cout << huffmanBits({5, 2, 1, 1}) << endl; // 15
    cout << huffmanBits({10}) << endl;         // 0
    cout << huffmanBits({1, 1, 1, 1}) << endl; // 8
    return 0;
}`,
          tests: [
            { id: 1, label: "Uses a priority queue", keywords: [{ pattern: "priority_queue" }], hint: "priority_queue<long long, vector<long long>, greater<long long>>." },
            { id: 2, label: "Makes it a min-heap", keywords: [{ pattern: "greater<" }], hint: "greater<> flips the default max-heap." },
            { id: 3, label: "Accumulates each merged weight", keywords: [{ pattern: "bits \\+=" }], hint: "bits += a + b on every merge." },
          ],
        },
      },
      {
        id: "cpp-ds-8-3",
        title: "Decoding, and the whole toolbox in one algorithm",
        xp: 12,
        chapterTitle: "Data Compression & Huffman Encoding",
        theory: [
          objectives([
            "Describe Huffman decoding as a bit-driven tree walk",
            "Identify every course structure that appears inside Huffman coding",
            "State the time and space complexity of the full pipeline",
          ]),
          text(
            "**Introduction:** Decoding is the easy half. You hold the same tree the encoder built, start at the root, and let the incoming bits steer you: 0 means go left, 1 means go right. The moment you land on a leaf you have decoded one whole symbol, so you write it out and jump straight back to the root for the next one.\n\n**Real-life example:** Following spoken directions with no map. \"Left, left, right\" - and you are at the shop. You then walk back to the same starting corner before following the next set of directions.",
          ),
          text(
            "In simple words:\n\n- decoding is one walk down the tree per symbol\n- you never need to know a code's length in advance - the leaf tells you when to stop\n- every structure from this course shows up somewhere inside Huffman coding",
          ),
          scenario(
            "Think of it like this",
            "Decoding is a game of twenty questions where the answers arrive in advance. Each bit answers one yes/no question about which half of the remaining symbols you are in, and you keep narrowing until only one symbol is left - that is the leaf. Then the game restarts from the top for the next symbol. Because common symbols were placed near the root, most of these games finish in one or two questions.",
          ),
          text(
            "Written precisely: start at the root, read one bit at a time, go left on 0 and right on 1; on reaching a leaf, emit that symbol and jump back to the root. Total cost is `O(total bits)`. Production decoders speed this up with a lookup table indexed by the next `k` bits, so several levels of the walk happen in one array read.",
          ),
          text(
            "Huffman coding is a tour of the whole course:\n\n- a **hash map** counts symbol frequencies in one `O(n)` pass\n- a **min-heap** yields the two rarest nodes in `O(log k)` each\n- a **binary tree** encodes the prefix code; the **path** to a leaf (a walk, like tree traversal) is the codeword\n- an array-backed **bitstream** is the output\n- decoding is tree traversal driven by input bits",
          ),
          text(
            "Complexity: counting `O(n)`; building the tree `O(k log k)` for `k` distinct symbols; encoding `O(n)`; decoding `O(output bits)`. Space `O(k)` for the tree.",
          ),
          diagram("Encode / decode round trip", [
            { id: "enc", label: "Encode", color: C_SKY, items: ["count -> heap -> tree -> code table", "replace each symbol with its bits"] },
            { id: "dec", label: "Decode", color: C_GREEN, items: ["walk the tree bit by bit", "leaf -> emit symbol, back to root"] },
          ]),
          callout(
            "success",
            "If you followed the hashing, heap and tree chapters, you can now read the source of gzip's Huffman stage and recognise every moving part.",
          ),
          quiz(
            "During Huffman decoding, what do you do on reaching a leaf?",
            [
              "Stop decoding entirely",
              "Emit that leaf's symbol and return to the root",
              "Go back up one level",
              "Read 8 more bits",
            ],
            1,
            "Each root-to-leaf walk decodes exactly one symbol; then you restart at the root for the next.",
          ),
        ],
        challenge: {
          title: "Decode a Huffman bitstring",
          description:
            "Walk from the root: `'0'` goes left, `'1'` goes right. On reaching a leaf, append its symbol and jump back to the root.",
          starterCode: `#include <iostream>
#include <string>
using namespace std;

struct HNode { char sym; HNode* left; HNode* right; };  // sym unused on internal nodes

string decode(HNode* root, const string& bits) {
    // TODO
    return "";
}

int main() {
    // Codes: A = 0, B = 10, C = 11
    HNode A{'A', nullptr, nullptr};
    HNode B{'B', nullptr, nullptr};
    HNode C{'C', nullptr, nullptr};
    HNode bc{'?', &B, &C};
    HNode root{'?', &A, &bc};
    cout << decode(&root, "010110") << endl;   // ABCA
    return 0;
}`,
          solutionCode: `#include <iostream>
#include <string>
using namespace std;

struct HNode { char sym; HNode* left; HNode* right; };

string decode(HNode* root, const string& bits) {
    string out;
    HNode* cur = root;
    for (char b : bits) {
        cur = (b == '0') ? cur->left : cur->right;
        if (cur->left == nullptr && cur->right == nullptr) {
            out += cur->sym;
            cur = root;
        }
    }
    return out;
}

int main() {
    HNode A{'A', nullptr, nullptr};
    HNode B{'B', nullptr, nullptr};
    HNode C{'C', nullptr, nullptr};
    HNode bc{'?', &B, &C};
    HNode root{'?', &A, &bc};
    cout << decode(&root, "010110") << endl;   // ABCA
    return 0;
}`,
          tests: [
            { id: 1, label: "Branches on the bit", keywords: [{ pattern: "b == '0'" }], hint: "'0' -> left child, otherwise right." },
            { id: 2, label: "Detects a leaf", keywords: [{ pattern: "cur->left == nullptr" }], hint: "A leaf has no children." },
            { id: 3, label: "Restarts at the root", keywords: [{ pattern: "cur = root" }], hint: "After emitting a symbol, walk again from the top." },
          ],
        },
      },
    ],
  },
];

export const CPP_DATA_STRUCTURES_CHAPTERS = RAW_CPP_DATA_STRUCTURES_CHAPTERS;

export const CPP_DATA_STRUCTURES_LESSONS = applyLessonVideoLinks(
  CPP_DATA_STRUCTURES_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  CPP_DATA_STRUCTURES_VIDEO_LINKS,
);

export const CPP_DATA_STRUCTURES_TOTAL_XP = CPP_DATA_STRUCTURES_LESSONS.reduce(
  (sum, lesson) => sum + lesson.xp,
  0,
);
