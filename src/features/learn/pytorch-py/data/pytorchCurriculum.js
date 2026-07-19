// PolyCode — PyTorch (Python) full curriculum
// 8 chapters · 25 lessons · Python coding challenges
// YouTube links: edit pytorchVideoLinks.js (not this file).

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";
import { PYTORCH_VIDEO_LINKS } from "./pytorchVideoLinks";
import { PYTORCH_LESSON_OUTCOMES } from "./pytorchLessonOutcomes";

export const PYTORCH_CHAPTERS = [
  {
    id: "intro",
    title: `Getting Started`,
    icon: "🔥",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-0",
        title: `What is PyTorch?`,
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              `**PyTorch** is a free Python library for **deep learning** — teaching computers to learn from examples. It powers photo apps, voice assistants, game bots, and recommendation engines.`,
          },
          {
            type: "scenario",
            title: `Predicting student marks`,
            content:
              `A tutor has past test scores for many students. Instead of hand-writing rules, you feed scores into a **model** that finds patterns and guesses the next mark. PyTorch gives you tensors, gradients, and neural network pieces to build that learner step by step.`,
          },
          {
            type: "diagram",
            title: `PyTorch in the learning pipeline`,
            nodes: [
              {
                id: "in",
                label: `Input data`,
                color: "#EE4C2C",
                items: [`Numbers`, `Images`, `Text tokens`],
              },
              {
                id: "pt",
                label: `PyTorch`,
                color: "#FF6B4A",
                items: [`Tensors`, `Autograd`, `nn.Module`],
              },
              {
                id: "out",
                label: `Output`,
                color: "#FF8A70",
                items: [`Predictions`, `Labels`, `Scores`],
              },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Always start with \`import torch\`. Tensors feel like NumPy arrays — but they can use a GPU and track gradients for training.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Your first PyTorch lines`,
            content: `import torch

print(torch.__version__)
x = torch.tensor([1.0, 2.0, 3.0])
print(x)`,
          },
          {
            type: "quiz",
            question: `What is PyTorch mainly used for?`,
            options: [
              `Writing website HTML`,
              `Building and training neural networks`,
              `Sending emails`,
              `Only drawing charts`,
            ],
            answer: 1,
            explanation:
              `PyTorch is a deep learning framework for tensors, automatic gradients, and training models.`,
          },
        ],
        challenge: {
          title: `Your First Tensor Print`,
          description:
            `Import \`torch\`, create \`scores = torch.tensor([72.0, 85.0, 91.0])\`, and print \`scores\`.`,
          starterCode: `# Import torch
# Create scores and print

`,
          solutionCode: `import torch

scores = torch.tensor([72.0, 85.0, 91.0])
print(scores)`,
          tests: [
            {
              id: 1,
              label: `Imports torch`,
              keywords: [{ pattern: `import\\s+torch` }],
            },
            {
              id: 2,
              label: `Uses torch.tensor`,
              hint: `torch.tensor([72.0, 85.0, 91.0])`,
              keywords: [{ pattern: `torch\\.tensor\\s*\\(` }],
            },
            {
              id: 3,
              label: `Prints scores`,
              keywords: [{ pattern: `print\\s*\\(\\s*scores\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-1",
        title: `Tensors vs NumPy`,
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              `**NumPy** arrays are perfect for classic number crunching on CPU. **PyTorch tensors** look similar but add **GPU support** and **autograd** — PyTorch remembers math steps so it can compute gradients during training.`,
          },
          {
            type: "scenario",
            title: `Sports scores spreadsheet`,
            content:
              `You store basketball points in a NumPy array to get quick averages. The same numbers as a PyTorch tensor can also feed a model that learns which stats predict wins — because tensors track gradients.`,
          },
          {
            type: "table",
            title: `NumPy vs PyTorch at a glance`,
            columns: [`Feature`, `NumPy`, `PyTorch tensor`],
            rows: [
              { label: `Main job`, values: [`Main job`, `Fast numeric arrays`, `Deep learning + GPU`] },
              { label: `Gradients`, values: [`Gradients`, `Not built in`, `Autograd built in`] },
              { label: `Typical import`, values: [`Typical import`, `import numpy as np`, `import torch`] },
            ],
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Many tutorials use both: NumPy for exploration, PyTorch for models. You can convert between them when needed.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Same math, two libraries`,
            content: `import numpy as np
import torch

a = np.array([10, 20, 30])
t = torch.tensor([10, 20, 30])
print(a + 5)
print(t + 5)`,
          },
          {
            type: "quiz",
            question: `What do PyTorch tensors add over NumPy arrays?`,
            options: [
              `Automatic gradient tracking for training`,
              `Built-in web server`,
              `Only string support`,
              `No math operators`,
            ],
            answer: 0,
            explanation:
              `Tensors support autograd and GPU devices — key for training neural networks.`,
          },
        ],
        challenge: {
          title: `NumPy and PyTorch Together`,
          description:
            `Import \`numpy as np\` and \`torch\`. Create \`arr = np.array([4, 5, 6])\` and \`t = torch.tensor([4, 5, 6])\`. Print both.`,
          starterCode: `# Import np and torch

`,
          solutionCode: `import numpy as np
import torch

arr = np.array([4, 5, 6])
t = torch.tensor([4, 5, 6])
print(arr)
print(t)`,
          tests: [
            {
              id: 1,
              label: `Imports numpy as np`,
              keywords: [{ pattern: `import\\s+numpy\\s+as\\s+np` }],
            },
            {
              id: 2,
              label: `Imports torch`,
              keywords: [{ pattern: `import\\s+torch` }],
            },
            {
              id: 3,
              label: `Uses np.array`,
              keywords: [{ pattern: `np\\.array\\s*\\(` }],
            },
            {
              id: 4,
              label: `Uses torch.tensor`,
              keywords: [{ pattern: `torch\\.tensor\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-2",
        title: `Your First Tensor`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `A **tensor** is PyTorch's main container for numbers — like a list or table, but optimized for math and training. Create one with \`torch.tensor()\` from a Python list.`,
          },
          {
            type: "scenario",
            title: `Daily step counts`,
            content:
              `Your fitness band records steps: 4000, 5200, 6100. Put them in a tensor and add 500 to every day in one line — no manual loop.`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `After creating a tensor, inspect it with \`print(x)\`, \`x.shape\`, and \`x.dtype\` — shape tells you rows/columns, dtype tells you int vs float.`,
          },
          {
            type: "diagram",
            title: `Parts of a tensor`,
            nodes: [
              {
                id: "vals",
                label: `Values`,
                color: "#EE4C2C",
                items: [`The actual numbers`, `Stored efficiently`],
              },
              {
                id: "shape",
                label: `Shape`,
                color: "#FF6B4A",
                items: [`Size of each dimension`, `Example: (3,) or (2, 2)`],
              },
              {
                id: "dtype",
                label: `dtype`,
                color: "#FF8A70",
                items: [`float32, int64, etc.`, `Pick types on purpose`],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: `Create and inspect`,
            content: `import torch

steps = torch.tensor([4000, 5200, 6100])
print(steps)
print(steps.shape)
print(steps + 500)`,
          },
          {
            type: "quiz",
            question: `Which function builds a tensor from a Python list?`,
            options: [
              `torch.list()`,
              `torch.tensor()`,
              `torch.array()`,
              `torch.table()`,
            ],
            answer: 1,
            explanation:
              `\`torch.tensor()\` converts Python numbers or nested lists into a tensor.`,
          },
        ],
        challenge: {
          title: `Steps Tensor`,
          description:
            `Import \`torch\`, create \`steps = torch.tensor([4000, 5200, 6100])\`, print \`steps.shape\`, then print \`steps + 500\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

steps = torch.tensor([4000, 5200, 6100])
print(steps.shape)
print(steps + 500)`,
          tests: [
            {
              id: 1,
              label: `Creates steps tensor`,
              keywords: [{ pattern: `torch\\.tensor\\s*\\(` }],
            },
            {
              id: 2,
              label: `Prints shape`,
              keywords: [{ pattern: `print\\s*\\(\\s*steps\\.shape\\s*\\)` }],
            },
            {
              id: 3,
              label: `Prints steps + 500`,
              keywords: [{ pattern: `print\\s*\\(\\s*steps\\s*\\+\\s*500\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "create",
    title: `Creating Tensors`,
    icon: "🧱",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-3",
        title: `torch.tensor from lists`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `\`torch.tensor()\` turns Python lists into tensors. A flat list makes a **1D** tensor. A list of lists makes a **2D** tensor — like a small grade table.`,
          },
          {
            type: "scenario",
            title: `Class grade table`,
            content:
              `Three students, two subjects: \`[[78, 85], [92, 88], [81, 79]]\`. One \`torch.tensor()\` call builds the whole table for fast averages.`,
          },
          {
            type: "code",
            lang: "python",
            label: `1D and 2D tensors`,
            content: `import torch

one_d = torch.tensor([1, 2, 3])
grades = torch.tensor([[78, 85], [92, 88]])
print(one_d.shape)
print(grades.shape)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Use \`torch.tensor()\` for fresh data. If you already have a NumPy array, prefer \`torch.from_numpy()\` — covered later.`,
          },
          {
            type: "quiz",
            question: `What shape does torch.tensor([[1,2],[3,4]]) have?`,
            options: [
              `(4,)`,
              `(2, 2)`,
              `(1, 4)`,
              `(2, 1)`,
            ],
            answer: 1,
            explanation:
              `Two rows and two columns → shape (2, 2).`,
          },
        ],
        challenge: {
          title: `Grade Table Tensor`,
          description:
            `Create \`grades = torch.tensor([[90, 88], [76, 82]])\` and print \`grades.shape\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

grades = torch.tensor([[90, 88], [76, 82]])
print(grades.shape)`,
          tests: [
            {
              id: 1,
              label: `Uses torch.tensor`,
              keywords: [{ pattern: `torch\\.tensor\\s*\\(` }],
            },
            {
              id: 2,
              label: `Prints grades.shape`,
              keywords: [{ pattern: `print\\s*\\(\\s*grades\\.shape\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-4",
        title: `zeros, ones, rand`,
        xp: 11,
        theory: [
          {
            type: "text",
            content:
              `PyTorch factory functions build tensors with a chosen shape: **\`torch.zeros\`**, **\`torch.ones\`**, and **\`torch.rand\`** (random values between 0 and 1).`,
          },
          {
            type: "scenario",
            title: `Blank canvas for a model`,
            content:
              `Before training, you often need weight matrices filled with zeros or small random numbers. Factories save you from typing every cell.`,
          },
          {
            type: "table",
            title: `Common factories`,
            columns: [`Function`, `Fills with`, `Typical use`],
            rows: [
              { label: `zeros`, values: [`torch.zeros`, `0.0`, `Padding, placeholders`] },
              { label: `ones`, values: [`torch.ones`, `1.0`, `Masks, scaling`] },
              { label: `rand`, values: [`torch.rand`, `Random 0–1`, `Random init weights`] },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: `Three quick tensors`,
            content: `import torch

z = torch.zeros(2, 3)
o = torch.ones(2, 3)
r = torch.rand(2, 3)
print(z)
print(r)`,
          },
          {
            type: "quiz",
            question: `Which function creates random values between 0 and 1?`,
            options: [
              `torch.zeros`,
              `torch.ones`,
              `torch.rand`,
              `torch.empty`,
            ],
            answer: 2,
            explanation:
              `\`torch.rand(shape)\` fills a tensor with uniform random values in [0, 1).`,
          },
        ],
        challenge: {
          title: `Random 2×3 Tensor`,
          description:
            `Create \`r = torch.rand(2, 3)\` and print \`r.shape\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

r = torch.rand(2, 3)
print(r.shape)`,
          tests: [
            {
              id: 1,
              label: `Uses torch.rand`,
              keywords: [{ pattern: `torch\\.rand\\s*\\(` }],
            },
            {
              id: 2,
              label: `Prints r.shape`,
              keywords: [{ pattern: `print\\s*\\(\\s*r\\.shape\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-5",
        title: `shape, dtype, device`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `Every tensor has a **shape** (sizes), **dtype** (number type), and **device** (CPU or GPU). Check them before big operations to avoid silent bugs.`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Use floats (\`dtype=torch.float32\`) for model weights. Use \`.to(device)\` to move tensors — \`device = 'cuda' if torch.cuda.is_available() else 'cpu'\`.`,
          },
          {
            type: "diagram",
            title: `Tensor metadata`,
            nodes: [
              {
                id: "sh",
                label: `shape`,
                color: "#EE4C2C",
                items: [`(rows, cols, ...)`, `Must match for math`],
              },
              {
                id: "dt",
                label: `dtype`,
                color: "#FF6B4A",
                items: [`float32, int64`, `Affects precision`],
              },
              {
                id: "dv",
                label: `device`,
                color: "#FF8A70",
                items: [`cpu or cuda`, `Same device for ops`],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: `Inspect and move`,
            content: `import torch

t = torch.tensor([1.0, 2.0], dtype=torch.float32)
print(t.shape, t.dtype, t.device)
device = 'cuda' if torch.cuda.is_available() else 'cpu'
t2 = t.to(device)
print(t2.device)`,
          },
          {
            type: "quiz",
            question: `How do you move a tensor to GPU (when available)?`,
            options: [
              `tensor.gpu()`,
              `tensor.to(device)`,
              `tensor.cuda_only()`,
              `tensor.move_gpu()`,
            ],
            answer: 1,
            explanation:
              `\`.to(device)\` works for both CPU and CUDA devices.`,
          },
        ],
        challenge: {
          title: `Float Tensor Metadata`,
          description:
            `Create \`x = torch.tensor([1.0, 2.0, 3.0], dtype=torch.float32)\` and print \`x.shape\`, \`x.dtype\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

x = torch.tensor([1.0, 2.0, 3.0], dtype=torch.float32)
print(x.shape)
print(x.dtype)`,
          tests: [
            {
              id: 1,
              label: `Uses float32 dtype`,
              keywords: [{ pattern: `dtype\\s*=\\s*torch\\.float32` }],
            },
            {
              id: 2,
              label: `Prints shape`,
              keywords: [{ pattern: `print\\s*\\(\\s*x\\.shape\\s*\\)` }],
            },
            {
              id: 3,
              label: `Prints dtype`,
              keywords: [{ pattern: `print\\s*\\(\\s*x\\.dtype\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-6",
        title: `NumPy ↔ PyTorch`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `Convert NumPy → PyTorch with **\`torch.from_numpy(arr)\`**. Convert back with **\`tensor.numpy()\`** on CPU tensors. They may **share memory** — changing one can change the other.`,
          },
          {
            type: "scenario",
            title: `Photo pixels as NumPy`,
            content:
              `An image loader gives you a NumPy array of pixel values. \`torch.from_numpy\` wraps it as a tensor so a CNN can train — no slow copy if dtypes match.`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `\`.numpy()\` only works on CPU tensors. Call \`.cpu()\` first if the tensor is on GPU.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Round trip`,
            content: `import numpy as np
import torch

arr = np.array([1.0, 2.0, 3.0])
t = torch.from_numpy(arr)
back = t.numpy()
print(back)`,
          },
          {
            type: "quiz",
            question: `Which converts a NumPy array to a tensor?`,
            options: [
              `torch.tensor_numpy()`,
              `torch.from_numpy()`,
              `np.to_torch()`,
              `torch.asarray()`,
            ],
            answer: 1,
            explanation:
              `\`torch.from_numpy()\` shares memory with the NumPy array when possible.`,
          },
        ],
        challenge: {
          title: `from_numpy Bridge`,
          description:
            `Import \`numpy as np\` and \`torch\`. Create \`arr = np.array([1.0, 2.0, 3.0])\`, then \`t = torch.from_numpy(arr)\`, and print \`t\`.`,
          starterCode: `# Import np and torch

`,
          solutionCode: `import numpy as np
import torch

arr = np.array([1.0, 2.0, 3.0])
t = torch.from_numpy(arr)
print(t)`,
          tests: [
            {
              id: 1,
              label: `Imports numpy`,
              keywords: [{ pattern: `import\\s+numpy\\s+as\\s+np` }],
            },
            {
              id: 2,
              label: `Uses from_numpy`,
              keywords: [{ pattern: `torch\\.from_numpy\\s*\\(` }],
            },
            {
              id: 3,
              label: `Prints t`,
              keywords: [{ pattern: `print\\s*\\(\\s*t\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "math",
    title: `Tensor Math`,
    icon: "➕",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-7",
        title: `Arithmetic & reductions`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `Tensors support **element-wise** math: \`+\`, \`-\`, \`*\`, \`/\`. **Reductions** like \`.sum()\` and \`.mean()\` collapse a tensor to fewer numbers — great for totals and averages.`,
          },
          {
            type: "scenario",
            title: `Weather weekly totals`,
            content:
              `Daily temps \`[18, 22, 19, 21]\` — add 3 for a heat wave forecast line, then \`.mean()\` for the week average.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Math and reductions`,
            content: `import torch

t = torch.tensor([18.0, 22.0, 19.0, 21.0])
print(t + 3)
print(t.mean())
print(t.sum())`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Use \`@\` or \`torch.matmul\` for matrix multiply — different from \`*\` which multiplies element-wise.`,
          },
          {
            type: "quiz",
            question: `Which method returns the average of all elements?`,
            options: [
              `.total()`,
              `.mean()`,
              `.avg()`,
              `.middle()`,
            ],
            answer: 1,
            explanation:
              `\`.mean()\` computes the arithmetic mean of tensor elements.`,
          },
        ],
        challenge: {
          title: `Temperature Stats`,
          description:
            `Create \`temps = torch.tensor([18.0, 22.0, 19.0])\`, print \`temps + 2\` and \`temps.mean()\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

temps = torch.tensor([18.0, 22.0, 19.0])
print(temps + 2)
print(temps.mean())`,
          tests: [
            {
              id: 1,
              label: `Adds 2`,
              keywords: [{ pattern: `temps\\s*\\+\\s*2` }],
            },
            {
              id: 2,
              label: `Uses mean`,
              keywords: [{ pattern: `temps\\.mean\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-8",
        title: `Broadcasting`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `**Broadcasting** lets PyTorch stretch smaller tensors to match bigger ones — no manual loops. A row of biases can be added to every row of a batch matrix.`,
          },
          {
            type: "scenario",
            title: `Bonus points per player`,
            content:
              `A matrix holds scores for 3 players × 4 games. A 1D tensor \`[2, 0, 1, 3]\` adds game bonuses to **every** player row at once.`,
          },
          {
            type: "diagram",
            title: `Broadcasting idea`,
            nodes: [
              {
                id: "big",
                label: `Big tensor`,
                color: "#EE4C2C",
                items: [`(3, 4) matrix`],
              },
              {
                id: "small",
                label: `Small tensor`,
                color: "#FF6B4A",
                items: [`(4,) row`, `Stretched across rows`],
              },
              {
                id: "out",
                label: `Result`,
                color: "#FF8A70",
                items: [`Same shape as big`, `Element-wise op`],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: `Add bias to every row`,
            content: `import torch

scores = torch.tensor([[10., 20.], [30., 40.]])
bonus = torch.tensor([1., 2.])
print(scores + bonus)`,
          },
          {
            type: "quiz",
            question: `Broadcasting avoids writing what?`,
            options: [
              `import statements`,
              `Manual Python loops for row-wise math`,
              `print calls`,
              `file paths`,
            ],
            answer: 1,
            explanation:
              `PyTorch repeats smaller shapes automatically so element-wise ops align.`,
          },
        ],
        challenge: {
          title: `Broadcast Bonus`,
          description:
            `Create \`m = torch.tensor([[1., 2.], [3., 4.]])\` and \`b = torch.tensor([10., 20.])\`. Print \`m + b\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

m = torch.tensor([[1., 2.], [3., 4.]])
b = torch.tensor([10., 20.])
print(m + b)`,
          tests: [
            {
              id: 1,
              label: `Prints m + b`,
              keywords: [{ pattern: `print\\s*\\(\\s*m\\s*\\+\\s*b\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-9",
        title: `Indexing & slicing`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `Index tensors like NumPy: \`t[0]\`, \`t[1:3]\`, \`t[:, 0]\` for columns. Negative indexes count from the end.`,
          },
          {
            type: "scenario",
            title: `Pick one student's marks`,
            content:
              `A \`(students, subjects)\` tensor — \`grades[0]\` is the first student, \`grades[:, 0]\` is everyone's first subject.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Slice a 2D tensor`,
            content: `import torch

g = torch.tensor([[90, 88], [76, 82], [95, 91]])
print(g[0])
print(g[:, 1])`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `Slicing often returns a **view** sharing memory — be careful if you mutate slices during training.`,
          },
          {
            type: "quiz",
            question: `What does grades[:, 0] select?`,
            options: [
              `First row only`,
              `First column of every row`,
              `Last column`,
              `Diagonal`,
            ],
            answer: 1,
            explanation:
              `\`:\` keeps all rows; \`0\` picks column index 0.`,
          },
        ],
        challenge: {
          title: `First Column`,
          description:
            `Create \`g = torch.tensor([[1, 2], [3, 4], [5, 6]])\` and print \`g[:, 0]\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

g = torch.tensor([[1, 2], [3, 4], [5, 6]])
print(g[:, 0])`,
          tests: [
            {
              id: 1,
              label: `Slices first column`,
              keywords: [{ pattern: `g\\[:,\\s*0\\]` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "autograd",
    title: `Autograd`,
    icon: "📈",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-10",
        title: `requires_grad`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `Set **\`requires_grad=True\`** on tensors you want to train (like weights). PyTorch builds a graph of operations to compute **gradients** later.`,
          },
          {
            type: "scenario",
            title: `Learning the best slope`,
            content:
              `A line \`y = w * x\` should fit data. The weight \`w\` gets \`requires_grad=True\` so PyTorch knows to adjust \`w\` when predictions are wrong.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Track a weight`,
            content: `import torch

w = torch.tensor(2.0, requires_grad=True)
y = w * 3
y.backward()
print(w.grad)`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Only tensors with floating point or complex dtypes can use autograd.`,
          },
          {
            type: "quiz",
            question: `What does requires_grad=True enable?`,
            options: [
              `GPU-only mode`,
              `Gradient tracking for training`,
              `Faster printing`,
              `Automatic file save`,
            ],
            answer: 1,
            explanation:
              `PyTorch records ops on that tensor so \`.backward()\` can compute gradients.`,
          },
        ],
        challenge: {
          title: `Track w`,
          description:
            `Create \`w = torch.tensor(2.0, requires_grad=True)\`, compute \`y = w * 4\`, call \`y.backward()\`, print \`w.grad\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

w = torch.tensor(2.0, requires_grad=True)
y = w * 4
y.backward()
print(w.grad)`,
          tests: [
            {
              id: 1,
              label: `requires_grad True`,
              keywords: [{ pattern: `requires_grad\\s*=\\s*True` }],
            },
            {
              id: 2,
              label: `Calls backward`,
              keywords: [{ pattern: `y\\.backward\\s*\\(` }],
            },
            {
              id: 3,
              label: `Prints w.grad`,
              keywords: [{ pattern: `print\\s*\\(\\s*w\\.grad\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-11",
        title: `backward()`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `After you compute a **scalar** loss, call **\`.backward()\`**. PyTorch fills \`.grad\` on every leaf tensor that had \`requires_grad=True\`.`,
          },
          {
            type: "scenario",
            title: `Minimize prediction error`,
            content:
              `Predict exam score 80 but target is 90 — loss is \`(pred - target)**2\`. backward() tells you how to nudge weights to reduce that error.`,
          },
          {
            type: "diagram",
            title: `Backward pass`,
            nodes: [
              {
                id: "fwd",
                label: `Forward`,
                color: "#EE4C2C",
                items: [`Compute prediction`, `Compute loss scalar`],
              },
              {
                id: "bwd",
                label: `backward()`,
                color: "#FF6B4A",
                items: [`Chain rule`, `Fill .grad fields`],
              },
              {
                id: "step",
                label: `Update`,
                color: "#FF8A70",
                items: [`optimizer.step()`, `New weights`],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: `Simple gradient`,
            content: `import torch

w = torch.tensor(1.0, requires_grad=True)
pred = w * 5
target = torch.tensor(20.0)
loss = (pred - target) ** 2
loss.backward()
print(w.grad)`,
          },
          {
            type: "quiz",
            question: `loss.backward() requires loss to be...`,
            options: [
              `A string`,
              `A scalar (0-D tensor)`,
              `Always zero`,
              `On GPU only`,
            ],
            answer: 1,
            explanation:
              `backward() starts from a scalar loss value.`,
          },
        ],
        challenge: {
          title: `Squared Error Grad`,
          description:
            `With \`w = torch.tensor(1.0, requires_grad=True)\`, set \`pred = w * 5\`, \`target = torch.tensor(20.0)\`, \`loss = (pred - target) ** 2\`, backward, print \`w.grad\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

w = torch.tensor(1.0, requires_grad=True)
pred = w * 5
target = torch.tensor(20.0)
loss = (pred - target) ** 2
loss.backward()
print(w.grad)`,
          tests: [
            {
              id: 1,
              label: `Computes squared loss`,
              keywords: [{ pattern: `\\(\\s*pred\\s*-\\s*target\\s*\\)\\s*\\*\\*\\s*2` }],
            },
            {
              id: 2,
              label: `Calls backward`,
              keywords: [{ pattern: `loss\\.backward\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-12",
        title: `no_grad & detach`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `Use **\`torch.no_grad()\`** or **\`.detach()\`** when you do **not** need gradients — inference, metrics, or printing. Saves memory and speed.`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Model.eval() plus torch.no_grad() is the usual pattern for validation and deployment.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Inference block`,
            content: `import torch

x = torch.tensor([1.0, 2.0], requires_grad=True)
with torch.no_grad():
    y = x * 2
print(y.requires_grad)`,
          },
          {
            type: "scenario",
            title: `Showing predictions to users`,
            content:
              `After training, you show photo labels in the app — no training happening, so wrap prediction code in no_grad().`,
          },
          {
            type: "quiz",
            question: `When should you use torch.no_grad()?`,
            options: [
              `Every training step`,
              `When computing validation predictions`,
              `When creating tensors`,
              `When importing torch`,
            ],
            answer: 1,
            explanation:
              `Skip gradient tracking during evaluation or inference.`,
          },
        ],
        challenge: {
          title: `No Grad Block`,
          description:
            `Create \`x = torch.tensor([1.0, 2.0], requires_grad=True)\`. Inside \`with torch.no_grad():\`, set \`y = x * 2\` and print \`y.requires_grad\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

x = torch.tensor([1.0, 2.0], requires_grad=True)
with torch.no_grad():
    y = x * 2
print(y.requires_grad)`,
          tests: [
            {
              id: 1,
              label: `Uses no_grad`,
              keywords: [{ pattern: `torch\\.no_grad\\s*\\(` }],
            },
            {
              id: 2,
              label: `Prints requires_grad`,
              keywords: [{ pattern: `print\\s*\\(\\s*y\\.requires_grad\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "nn",
    title: `Neural Network Blocks`,
    icon: "🧠",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-13",
        title: `nn.Module basics`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `Subclass **\`nn.Module\`** to define a network. Put layers in \`__init__\` and describe computation in **\`forward()\`**.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Tiny module`,
            content: `import torch
import torch.nn as nn

class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(2, 1)
    def forward(self, x):
        return self.fc(x)

model = TinyNet()
print(model)`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Call \`model(x)\` — PyTorch runs forward() for you. Use \`model.parameters()\` for the optimizer.`,
          },
          {
            type: "quiz",
            question: `Where do you define the forward computation?`,
            options: [
              `__init__ only`,
              `forward()`,
              `backward()`,
              `main()`,
            ],
            answer: 1,
            explanation:
              `forward() describes how input tensors become outputs.`,
          },
        ],
        challenge: {
          title: `Define TinyNet`,
          description:
            `Import torch and nn. Define class \`TinyNet(nn.Module)\` with \`self.fc = nn.Linear(2, 1)\` in __init__ and \`return self.fc(x)\` in forward. Create \`model = TinyNet()\` and print \`model\`.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(2, 1)
    def forward(self, x):
        return self.fc(x)

model = TinyNet()
print(model)`,
          tests: [
            {
              id: 1,
              label: `Subclasses nn.Module`,
              keywords: [{ pattern: `class\\s+TinyNet\\s*\\(\\s*nn\\.Module\\s*\\)` }],
            },
            {
              id: 2,
              label: `Uses nn.Linear`,
              keywords: [{ pattern: `nn\\.Linear\\s*\\(\\s*2\\s*,\\s*1\\s*\\)` }],
            },
            {
              id: 3,
              label: `Creates model`,
              keywords: [{ pattern: `model\\s*=\\s*TinyNet\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-14",
        title: `nn.Linear`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `**\`nn.Linear(in_features, out_features)\`** applies a weighted sum plus bias — the basic building block for tabular data and dense layers.`,
          },
          {
            type: "scenario",
            title: `House price from size & rooms`,
            content:
              `Two inputs (sq ft, bedrooms) → one output (price). Linear(2, 1) learns weights that best fit examples.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Linear layer`,
            content: `import torch
import torch.nn as nn

layer = nn.Linear(3, 2)
x = torch.randn(4, 3)
out = layer(x)
print(out.shape)`,
          },
          {
            type: "quiz",
            question: `nn.Linear(3, 2) with input shape (4, 3) gives output shape...`,
            options: [
              `(4, 2)`,
              `(3, 2)`,
              `(4, 3)`,
              `(2, 4)`,
            ],
            answer: 0,
            explanation:
              `Batch dimension stays; last dim becomes out_features.`,
          },
        ],
        challenge: {
          title: `Linear Forward`,
          description:
            `Create \`layer = nn.Linear(2, 1)\` and \`x = torch.tensor([[1.0, 2.0]])\`. Print \`layer(x)\`.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

layer = nn.Linear(2, 1)
x = torch.tensor([[1.0, 2.0]])
print(layer(x))`,
          tests: [
            {
              id: 1,
              label: `Creates Linear(2,1)`,
              keywords: [{ pattern: `nn\\.Linear\\s*\\(\\s*2\\s*,\\s*1\\s*\\)` }],
            },
            {
              id: 2,
              label: `Calls layer(x)`,
              keywords: [{ pattern: `layer\\s*\\(\\s*x\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-15",
        title: `Activations (ReLU)`,
        xp: 13,
        theory: [
          {
            type: "text",
            content:
              `**ReLU** (\`max(0, x)\`) adds non-linearity so networks learn curves, not just straight lines. Use **\`nn.ReLU()\`** or **\`torch.relu\`**.`,
          },
          {
            type: "diagram",
            title: `Linear + ReLU stack`,
            nodes: [
              {
                id: "in",
                label: `Input`,
                color: "#EE4C2C",
                items: [`Features x`],
              },
              {
                id: "lin",
                label: `Linear`,
                color: "#FF6B4A",
                items: [`Weighted sum`],
              },
              {
                id: "relu",
                label: `ReLU`,
                color: "#FF8A70",
                items: [`Zero negatives`, `Keep positives`],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: `ReLU example`,
            content: `import torch
import torch.nn as nn

x = torch.tensor([-2., 0., 3.])
print(torch.relu(x))
print(nn.ReLU()(x))`,
          },
          {
            type: "quiz",
            question: `What does ReLU do to negative numbers?`,
            options: [
              `Makes them 0`,
              `Doubles them`,
              `Squares them`,
              `Leaves unchanged`,
            ],
            answer: 0,
            explanation:
              `ReLU outputs zero for negative inputs.`,
          },
        ],
        challenge: {
          title: `Apply ReLU`,
          description:
            `Create \`x = torch.tensor([-1.0, 0.0, 2.0])\` and print \`torch.relu(x)\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

x = torch.tensor([-1.0, 0.0, 2.0])
print(torch.relu(x))`,
          tests: [
            {
              id: 1,
              label: `Uses torch.relu`,
              keywords: [{ pattern: `torch\\.relu\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-16",
        title: `Loss functions`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `A **loss function** scores how wrong predictions are. **\`nn.MSELoss\`** for regression, **\`nn.CrossEntropyLoss\`** for classification. Training minimizes this number.`,
          },
          {
            type: "scenario",
            title: `Guess vs actual score`,
            content:
              `Model predicts 72, real mark is 80. MSE penalizes big gaps more than small ones — pushes weights to improve.`,
          },
          {
            type: "code",
            lang: "python",
            label: `MSE loss`,
            content: `import torch
import torch.nn as nn

pred = torch.tensor([72.0])
target = torch.tensor([80.0])
loss_fn = nn.MSELoss()
print(loss_fn(pred, target))`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              `CrossEntropyLoss expects raw logits and integer class labels — common for image classifiers.`,
          },
          {
            type: "quiz",
            question: `What does the loss represent?`,
            options: [
              `How wrong the model is`,
              `GPU temperature`,
              `File size`,
              `Learning rate`,
            ],
            answer: 0,
            explanation:
              `Lower loss generally means better predictions on training examples.`,
          },
        ],
        challenge: {
          title: `Compute MSE`,
          description:
            `Use \`nn.MSELoss()\` with \`pred = torch.tensor([72.0])\` and \`target = torch.tensor([80.0])\`. Print the loss.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

pred = torch.tensor([72.0])
target = torch.tensor([80.0])
loss_fn = nn.MSELoss()
print(loss_fn(pred, target))`,
          tests: [
            {
              id: 1,
              label: `Uses MSELoss`,
              keywords: [{ pattern: `nn\\.MSELoss\\s*\\(` }],
            },
            {
              id: 2,
              label: `Calls loss_fn`,
              keywords: [{ pattern: `loss_fn\\s*\\(\\s*pred\\s*,\\s*target\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "train",
    title: `Training`,
    icon: "🏋️",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-17",
        title: `One training step`,
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              `One training step: **forward** → **loss** → **zero_grad** → **backward** → **optimizer.step()**. Repeat for many batches.`,
          },
          {
            type: "diagram",
            title: `Training micro-loop`,
            nodes: [
              {
                id: "f",
                label: `1. Forward`,
                color: "#EE4C2C",
                items: [`pred = model(x)`],
              },
              {
                id: "l",
                label: `2. Loss`,
                color: "#FF6B4A",
                items: [`Compare pred & y`],
              },
              {
                id: "b",
                label: `3. Backward`,
                color: "#FF8A70",
                items: [`loss.backward()`],
              },
              {
                id: "s",
                label: `4. Step`,
                color: "#FFB199",
                items: [`optimizer.step()`],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: `Single step`,
            content: `import torch
import torch.nn as nn

w = torch.tensor([1.0], requires_grad=True)
opt = torch.optim.SGD([w], lr=0.1)
target = torch.tensor([3.0])

pred = w * 2
loss = (pred - target) ** 2
opt.zero_grad()
loss.backward()
opt.step()
print(w)`,
          },
          {
            type: "quiz",
            question: `Why call optimizer.zero_grad()?`,
            options: [
              `Clear old gradients before backward`,
              `Delete the model`,
              `Save checkpoint`,
              `Move to GPU`,
            ],
            answer: 0,
            explanation:
              `Gradients accumulate by default; zero them each step.`,
          },
        ],
        challenge: {
          title: `One SGD Step`,
          description:
            `Use \`w = torch.tensor([1.0], requires_grad=True)\`, \`opt = torch.optim.SGD([w], lr=0.1)\`, target 3.0, pred = w*2, MSE loss, zero_grad, backward, step, print w.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

w = torch.tensor([1.0], requires_grad=True)
opt = torch.optim.SGD([w], lr=0.1)
target = torch.tensor([3.0])
pred = w * 2
loss = (pred - target) ** 2
opt.zero_grad()
loss.backward()
opt.step()
print(w)`,
          tests: [
            {
              id: 1,
              label: `Uses SGD optimizer`,
              keywords: [{ pattern: `torch\\.optim\\.SGD` }],
            },
            {
              id: 2,
              label: `Calls zero_grad`,
              keywords: [{ pattern: `zero_grad\\s*\\(` }],
            },
            {
              id: 3,
              label: `Calls step`,
              keywords: [{ pattern: `opt\\.step\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-18",
        title: `Dataset & DataLoader`,
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              `**Dataset** defines how to fetch one sample. **DataLoader** batches samples and shuffles for efficient training loops.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Tiny dataset`,
            content: `import torch
from torch.utils.data import Dataset, DataLoader

class Numbers(Dataset):
    def __len__(self):
        return 4
    def __getitem__(self, i):
        x = torch.tensor([float(i)])
        y = torch.tensor([float(i * 2)])
        return x, y

loader = DataLoader(Numbers(), batch_size=2, shuffle=True)
for xb, yb in loader:
    print(xb.shape, yb.shape)
    break`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `PyTorch includes MNIST, CIFAR helpers in torchvision — but custom Dataset works for any data.`,
          },
          {
            type: "quiz",
            question: `DataLoader mainly helps you...`,
            options: [
              `Batch and shuffle samples`,
              `Compile to C++`,
              `Draw plots`,
              `Send emails`,
            ],
            answer: 0,
            explanation:
              `Loaders iterate mini-batches for stochastic training.`,
          },
        ],
        challenge: {
          title: `Mini DataLoader`,
          description:
            `Define \`Numbers\` Dataset with 3 items returning \`(torch.tensor([float(i)]), torch.tensor([float(i)]))\`. Create \`DataLoader(Numbers(), batch_size=2)\`, loop once and print \`xb.shape\`.`,
          starterCode: `import torch
from torch.utils.data import Dataset, DataLoader

`,
          solutionCode: `import torch
from torch.utils.data import Dataset, DataLoader

class Numbers(Dataset):
    def __len__(self):
        return 3
    def __getitem__(self, i):
        return torch.tensor([float(i)]), torch.tensor([float(i)])

loader = DataLoader(Numbers(), batch_size=2)
for xb, yb in loader:
    print(xb.shape)
    break`,
          tests: [
            {
              id: 1,
              label: `Defines Dataset subclass`,
              keywords: [{ pattern: `class\\s+Numbers\\s*\\(\\s*Dataset\\s*\\)` }],
            },
            {
              id: 2,
              label: `Uses DataLoader`,
              keywords: [{ pattern: `DataLoader\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-19",
        title: `Tiny training loop`,
        xp: 16,
        theory: [
          {
            type: "text",
            content:
              `Wrap many steps in an **epoch** loop. Print loss occasionally to see learning. Keep data and models tiny while experimenting.`,
          },
          {
            type: "code",
            lang: "python",
            label: `3-epoch loop`,
            content: `import torch
import torch.nn as nn

x = torch.tensor([[1.0], [2.0], [3.0]])
y = torch.tensor([[2.0], [4.0], [6.0]])
model = nn.Linear(1, 1)
opt = torch.optim.SGD(model.parameters(), lr=0.1)
loss_fn = nn.MSELoss()

for epoch in range(3):
    pred = model(x)
    loss = loss_fn(pred, y)
    opt.zero_grad()
    loss.backward()
    opt.step()
    print(epoch, loss.item())`,
          },
          {
            type: "scenario",
            title: `Learning y = 2x`,
            content:
              `Three points on a line — a tiny Linear model should drive loss down in a few epochs.`,
          },
          {
            type: "quiz",
            question: `An epoch usually means...`,
            options: [
              `One pass through the training data`,
              `One GPU kernel`,
              `One file save`,
              `One import`,
            ],
            answer: 0,
            explanation:
              `Each epoch visits (or samples) the dataset for training.`,
          },
        ],
        challenge: {
          title: `Three Epochs`,
          description:
            `Train \`nn.Linear(1,1)\` on x=[[1],[2]] y=[[2],[4]] for 3 epochs with SGD lr=0.1 and MSELoss. Print \`loss.item()\` each epoch.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

x = torch.tensor([[1.0], [2.0]])
y = torch.tensor([[2.0], [4.0]])
model = nn.Linear(1, 1)
opt = torch.optim.SGD(model.parameters(), lr=0.1)
loss_fn = nn.MSELoss()

for epoch in range(3):
    pred = model(x)
    loss = loss_fn(pred, y)
    opt.zero_grad()
    loss.backward()
    opt.step()
    print(loss.item())`,
          tests: [
            {
              id: 1,
              label: `Uses epoch loop`,
              keywords: [{ pattern: `for\\s+epoch\\s+in\\s+range\\s*\\(\\s*3\\s*\\)` }],
            },
            {
              id: 2,
              label: `Prints loss.item`,
              keywords: [{ pattern: `print\\s*\\(\\s*loss\\.item\\s*\\(\\s*\\)\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "further",
    title: `Going Further`,
    icon: "🚀",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-20",
        title: `CNN intro`,
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              `**Convolutional layers** (\`nn.Conv2d\`) scan small filters across images to detect edges, shapes, and textures. Input shape: \`(batch, channels, height, width)\`.`,
          },
          {
            type: "scenario",
            title: `Photo thumbnail`,
            content:
              `A 28×28 grayscale digit — Conv2d slides 3×3 filters to build feature maps before classification.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Minimal Conv2d`,
            content: `import torch
import torch.nn as nn

x = torch.randn(1, 1, 8, 8)
conv = nn.Conv2d(1, 4, kernel_size=3)
out = conv(x)
print(out.shape)`,
          },
          {
            type: "quiz",
            question: `Conv2d is mainly used for...`,
            options: [
              `Image-like grid data`,
              `CSV row sorting`,
              `Email headers`,
              `JSON parsing`,
            ],
            answer: 0,
            explanation:
              `CNNs exploit spatial structure in pixels or grids.`,
          },
        ],
        challenge: {
          title: `Conv2d Forward`,
          description:
            `Create \`x = torch.randn(1, 1, 8, 8)\` and \`conv = nn.Conv2d(1, 2, kernel_size=3)\`. Print \`conv(x).shape\`.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

x = torch.randn(1, 1, 8, 8)
conv = nn.Conv2d(1, 2, kernel_size=3)
print(conv(x).shape)`,
          tests: [
            {
              id: 1,
              label: `Uses Conv2d`,
              keywords: [{ pattern: `nn\\.Conv2d\\s*\\(` }],
            },
            {
              id: 2,
              label: `Prints output shape`,
              keywords: [{ pattern: `print\\s*\\(\\s*conv\\s*\\(\\s*x\\s*\\)\\.shape\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-21",
        title: `Save & load models`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `Save learned weights with **\`torch.save(model.state_dict(), path)\`**. Load into the **same architecture** with **\`load_state_dict\`**.`,
          },
          {
            type: "code",
            lang: "python",
            label: `state_dict roundtrip`,
            content: `import torch
import torch.nn as nn

model = nn.Linear(2, 1)
torch.save(model.state_dict(), 'model.pt')
model2 = nn.Linear(2, 1)
model2.load_state_dict(torch.load('model.pt'))
print('loaded')`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              `Saving the whole model pickle works for demos, but state_dict + code is the flexible production pattern.`,
          },
          {
            type: "quiz",
            question: `Best practice is saving...`,
            options: [
              `state_dict weights`,
              `Only the loss value`,
              `Python random seed only`,
              `GPU driver`,
            ],
            answer: 0,
            explanation:
              `state_dict stores parameters; you rebuild the same Module class to load them.`,
          },
        ],
        challenge: {
          title: `Save state_dict`,
          description:
            `Create \`model = nn.Linear(2, 1)\`, save with \`torch.save(model.state_dict(), 'model.pt')\`, create fresh \`model2 = nn.Linear(2, 1)\`, load weights, print \`'loaded'\`.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

model = nn.Linear(2, 1)
torch.save(model.state_dict(), 'model.pt')
model2 = nn.Linear(2, 1)
model2.load_state_dict(torch.load('model.pt'))
print('loaded')`,
          tests: [
            {
              id: 1,
              label: `Saves state_dict`,
              keywords: [{ pattern: `torch\\.save\\s*\\(\\s*model\\.state_dict\\s*\\(` }],
            },
            {
              id: 2,
              label: `Loads state_dict`,
              keywords: [{ pattern: `load_state_dict\\s*\\(` }],
            },
          ],
        },
      },
      {
        id: "pytorch-22",
        title: `CPU vs GPU tips`,
        xp: 14,
        theory: [
          {
            type: "text",
            content:
              `GPUs speed up big tensor math. Check **\`torch.cuda.is_available()\`**, set **\`device\`**, and move **both model and data** with \`.to(device)\`.`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              `Mismatch error? Usually tensor on CPU, model on GPU — pick one device and stick to it for that step.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Device pattern`,
            content: `import torch
import torch.nn as nn

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = nn.Linear(2, 1).to(device)
x = torch.tensor([[1.0, 2.0]]).to(device)
print(model(x).device)`,
          },
          {
            type: "quiz",
            question: `Before using CUDA you should check...`,
            options: [
              `torch.cuda.is_available()`,
              `torch.has_gpu_file()`,
              `os.is_fast()`,
              `random.seed`,
            ],
            answer: 0,
            explanation:
              `Not every machine has a CUDA GPU.`,
          },
        ],
        challenge: {
          title: `Pick Device`,
          description:
            `Set \`device = 'cuda' if torch.cuda.is_available() else 'cpu'\`, create \`x = torch.tensor([1.0]).to(device)\`, print \`x.device\`.`,
          starterCode: `import torch

`,
          solutionCode: `import torch

device = 'cuda' if torch.cuda.is_available() else 'cpu'
x = torch.tensor([1.0]).to(device)
print(x.device)`,
          tests: [
            {
              id: 1,
              label: `Checks cuda available`,
              keywords: [{ pattern: `torch\\.cuda\\.is_available\\s*\\(` }],
            },
            {
              id: 2,
              label: `Uses to(device)`,
              keywords: [{ pattern: `\\.to\\s*\\(\\s*device\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
  {
    id: "capstone",
    title: `Capstone`,
    icon: "🏆",
    color: "#EE4C2C",
    lessons: [
      {
        id: "pytorch-23",
        title: `Mini classifier project`,
        xp: 18,
        theory: [
          {
            type: "text",
            content:
              `Combine layers, loss, optimizer, and a short loop to classify tiny 2D points — the same pattern scales to real image models.`,
          },
          {
            type: "scenario",
            title: `Pass or fail predictor`,
            content:
              `Two features (quiz1, quiz2) predict pass/fail. A small Linear + ReLU + Linear network learns from a handful of labeled examples.`,
          },
          {
            type: "code",
            lang: "python",
            label: `Mini classifier sketch`,
            content: `import torch
import torch.nn as nn

class Clf(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(2, 4), nn.ReLU(), nn.Linear(4, 2))
    def forward(self, x):
        return self.net(x)

X = torch.tensor([[0.1, 0.2], [0.9, 0.8]])
y = torch.tensor([0, 1])
model = Clf()
opt = torch.optim.SGD(model.parameters(), lr=0.5)
loss_fn = nn.CrossEntropyLoss()
for _ in range(20):
    logits = model(X)
    loss = loss_fn(logits, y)
    opt.zero_grad(); loss.backward(); opt.step()
print(model(X).argmax(dim=1))`,
          },
          {
            type: "callout",
            variant: "success",
            content:
              `You just ran the full deep learning recipe: data → model → loss → optimize → predict.`,
          },
          {
            type: "quiz",
            question: `CrossEntropyLoss expects class labels as...`,
            options: [
              `Integer class indices`,
              `One-hot PNG files`,
              `Strings only`,
              `Float infinity`,
            ],
            answer: 0,
            explanation:
              `Pass LongTensor labels like torch.tensor([0, 1]).`,
          },
        ],
        challenge: {
          title: `Train Mini Clf`,
          description:
            `Define \`Clf\` with \`nn.Sequential(Linear(2,4), ReLU(), Linear(4,2))\`. Train on X=[[0.1,0.2],[0.9,0.8]] y=[0,1] for 10 steps with SGD and CrossEntropyLoss. Print \`model(X).argmax(dim=1)\`.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

class Clf(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(nn.Linear(2, 4), nn.ReLU(), nn.Linear(4, 2))
    def forward(self, x):
        return self.net(x)

X = torch.tensor([[0.1, 0.2], [0.9, 0.8]])
y = torch.tensor([0, 1])
model = Clf()
opt = torch.optim.SGD(model.parameters(), lr=0.5)
loss_fn = nn.CrossEntropyLoss()
for _ in range(10):
    logits = model(X)
    loss = loss_fn(logits, y)
    opt.zero_grad()
    loss.backward()
    opt.step()
print(model(X).argmax(dim=1))`,
          tests: [
            {
              id: 1,
              label: `Uses CrossEntropyLoss`,
              keywords: [{ pattern: `nn\\.CrossEntropyLoss` }],
            },
            {
              id: 2,
              label: `Training loop`,
              keywords: [{ pattern: `for\\s+_` }],
            },
            {
              id: 3,
              label: `Prints argmax`,
              keywords: [{ pattern: `argmax\\s*\\(\\s*dim\\s*=\\s*1\\s*\\)` }],
            },
          ],
        },
      },
      {
        id: "pytorch-24",
        title: `Review & cheat sheet`,
        xp: 12,
        theory: [
          {
            type: "text",
            content:
              `You made it! Core PyTorch flow: **tensors → autograd → nn.Module → loss → optimizer → loop**. Keep this cheat sheet handy when starting new projects.`,
          },
          {
            type: "table",
            title: `PyTorch cheat sheet`,
            columns: [`Task`, `Snippet`],
            rows: [
              { label: `Import`, values: [`Import`, `import torch; import torch.nn as nn`] },
              { label: `Tensor`, values: [`Tensor`, `torch.tensor([1,2,3])`] },
              { label: `Train step`, values: [`Train step`, `zero_grad(); loss.backward(); opt.step()`] },
              { label: `Save`, values: [`Save`, `torch.save(model.state_dict(), 'model.pt')`] },
            ],
          },
          {
            type: "diagram",
            title: `Your learning path`,
            nodes: [
              {
                id: "t",
                label: `Tensors`,
                color: "#EE4C2C",
                items: [`create, math, slice`],
              },
              {
                id: "a",
                label: `Autograd`,
                color: "#FF6B4A",
                items: [`requires_grad, backward`],
              },
              {
                id: "n",
                label: `nn & train`,
                color: "#FF8A70",
                items: [`Module, loss, loop`],
              },
              {
                id: "c",
                label: `Capstone`,
                color: "#FFB199",
                items: [`CNN, save, GPU tips`],
              },
            ],
          },
          {
            type: "callout",
            variant: "success",
            content:
              `Next steps: try torchvision datasets, learning rate schedules, and TensorBoard — you have the foundation.`,
          },
          {
            type: "quiz",
            question: `Typical training order?`,
            options: [
              `step → backward → zero_grad → loss`,
              `forward → loss → zero_grad → backward → step`,
              `save → import only`,
              `backward before forward`,
            ],
            answer: 1,
            explanation:
              `Forward and loss first, then zero gradients, backward, optimizer step.`,
          },
        ],
        challenge: {
          title: `Cheat Sheet Print`,
          description:
            `Import torch and nn, create \`t = torch.tensor([1.0, 2.0, 3.0])\`, print \`t.mean()\` and \`torch.__version__\`.`,
          starterCode: `import torch
import torch.nn as nn

`,
          solutionCode: `import torch
import torch.nn as nn

t = torch.tensor([1.0, 2.0, 3.0])
print(t.mean())
print(torch.__version__)`,
          tests: [
            {
              id: 1,
              label: `Imports nn`,
              keywords: [{ pattern: `import\\s+torch\\.nn\\s+as\\s+nn` }],
            },
            {
              id: 2,
              label: `Prints mean`,
              keywords: [{ pattern: `print\\s*\\(\\s*t\\.mean\\s*\\(\\s*\\)\\s*\\)` }],
            },
            {
              id: 3,
              label: `Prints version`,
              keywords: [{ pattern: `print\\s*\\(\\s*torch\\.__version__\\s*\\)` }],
            },
          ],
        },
      },
    ],
  },
];

export const PYTORCH_LESSONS = applyLessonVideoLinks(
  PYTORCH_CHAPTERS.flatMap((ch) =>
    ch.lessons.map((l) => ({
      ...l,
      outcomes: l.outcomes ?? PYTORCH_LESSON_OUTCOMES[l.id] ?? [],
      chapterId: ch.id,
      chapterTitle: ch.title,
      chapterColor: ch.color,
    })),
  ),
  PYTORCH_VIDEO_LINKS,
);

export const PYTORCH_TOTAL_XP = PYTORCH_LESSONS.reduce((s, l) => s + l.xp, 0);
