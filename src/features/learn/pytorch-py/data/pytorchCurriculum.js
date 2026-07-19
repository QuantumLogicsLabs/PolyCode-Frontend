// PolyCode — PyTorch interactive course
// 6 chapters · 18 lessons · browser Python challenges (Pyodide)
// Challenges use pure numpy/math since torch is not in Pyodide by default;
// theory and code examples show real PyTorch syntax.

import { applyLessonVideoLinks } from "../../shared/applyLessonVideoLinks";

const ACCENT = "#ee4c2c"; // PyTorch orange

const RAW_PYTORCH_CHAPTERS = [
  // ─────────────────────────────────────────────────────────────
  // CHAPTER 1 — PyTorch Foundations
  // ─────────────────────────────────────────────────────────────
  {
    id: "pytorch-foundations",
    title: "PyTorch Foundations",
    icon: "🔥",
    color: ACCENT,
    lessons: [
      {
        id: "pt-0",
        title: "What is PyTorch?",
        xp: 10,
        theory: [
          {
            type: "text",
            content:
              "**PyTorch** is an open-source deep learning framework developed by Meta AI. It is the most widely used framework in academic research and is rapidly growing in industry. Unlike older frameworks, PyTorch uses **dynamic computation graphs** — the graph is built as you run your code, making debugging natural and Pythonic.",
          },
          {
            type: "diagram",
            title: "Where PyTorch fits",
            nodes: [
              {
                id: "research",
                label: "Research",
                color: ACCENT,
                items: ["90%+ of ML papers", "Fast prototyping", "Easy debugging"],
              },
              {
                id: "industry",
                label: "Industry",
                color: "#2563eb",
                items: ["Production models", "TorchScript", "ONNX export"],
              },
              {
                id: "ecosystem",
                label: "Ecosystem",
                color: "#7c3aed",
                items: ["TorchVision", "TorchText", "TorchAudio", "HuggingFace"],
              },
            ],
          },
          {
            type: "code",
            lang: "python",
            label: "PyTorch hello world",
            content: `import torch

# Create a tensor
x = torch.tensor([1.0, 2.0, 3.0])
print(x)          # tensor([1., 2., 3.])
print(x.dtype)    # torch.float32
print(x.shape)    # torch.Size([3])`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "PyTorch tensors are similar to NumPy arrays but can run on a GPU and support automatic differentiation — the key ingredient for training neural networks.",
          },
          {
            type: "quiz",
            question: "What makes PyTorch's computation graph 'dynamic'?",
            options: [
              "It uses GPU by default",
              "The graph is built as code executes, not before",
              "It automatically optimises your code",
              "It only works with Python 3.10+",
            ],
            answer: 1,
            explanation:
              "Dynamic graphs (define-by-run) mean you can use regular Python control flow — if statements, loops, print statements — while building your model, making debugging far easier than static graph frameworks.",
          },
        ],
        challenge: {
          title: "Your First Tensor (NumPy)",
          description:
            "Since PyTorch isn't available in the browser, we simulate tensors with NumPy. Create a 1D array `x = [1.0, 2.0, 3.0]` using numpy, print it, and print its shape.",
          starterCode: `import numpy as np

# Create array x with values [1.0, 2.0, 3.0]
# Print x and x.shape
`,
          solutionCode: `import numpy as np

x = np.array([1.0, 2.0, 3.0])
print(x)
print(x.shape)`,
          tests: [
            { id: 1, label: "Imports numpy", keywords: [{ pattern: "import numpy" }] },
            { id: 2, label: "Creates array with np.array()", keywords: [{ pattern: "np\\.array\\s*\\(" }] },
            { id: 3, label: "Prints shape", keywords: [{ pattern: "\\.shape" }] },
          ],
        },
      },
      {
        id: "pt-1",
        title: "Tensors — The Building Block",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "A **tensor** is a generalisation of scalars, vectors, and matrices to any number of dimensions. Everything in PyTorch — inputs, weights, outputs, gradients — is a tensor.",
          },
          {
            type: "code",
            lang: "python",
            label: "Creating tensors",
            content: `import torch

# From data
a = torch.tensor([[1, 2], [3, 4]], dtype=torch.float32)

# Zeros and ones
z = torch.zeros(3, 4)      # 3×4 matrix of zeros
o = torch.ones(2, 3)       # 2×3 matrix of ones
r = torch.rand(3, 3)       # 3×3 uniform random [0,1)
n = torch.randn(2, 4)      # 2×4 standard normal

# Shape, dtype, device
print(a.shape)    # torch.Size([2, 2])
print(a.dtype)    # torch.float32
print(a.device)   # cpu`,
          },
          {
            type: "diagram",
            title: "Tensor dimensions",
            nodes: [
              { id: "scalar", label: "0D — Scalar", color: ACCENT, items: ["torch.tensor(3.14)", "Single number", "shape: []"] },
              { id: "vector", label: "1D — Vector", color: "#2563eb", items: ["torch.tensor([1,2,3])", "List of numbers", "shape: [3]"] },
              { id: "matrix", label: "2D — Matrix", color: "#7c3aed", items: ["torch.zeros(3,4)", "Rows × Columns", "shape: [3,4]"] },
              { id: "tensor3", label: "3D+ — Tensor", color: "#059669", items: ["torch.rand(2,3,4)", "Batch × H × W", "shape: [2,3,4]"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The shape of a tensor tells you everything. For image data: `[batch, channels, height, width]`. For text: `[batch, sequence_length, embedding_dim]`.",
          },
          {
            type: "quiz",
            question: "What is the shape of torch.zeros(4, 3)?",
            options: ["[3]", "[4]", "[4, 3]", "[3, 4]"],
            answer: 2,
            explanation: "torch.zeros(rows, cols) creates a matrix with 4 rows and 3 columns — shape [4, 3].",
          },
        ],
        challenge: {
          title: "Tensor Shapes",
          description:
            "Create three NumPy arrays: a 1D array of 5 zeros, a 2×3 matrix of ones, and a 3×3×3 array of random values. Print the shape of each.",
          starterCode: `import numpy as np

# 1D: 5 zeros
# 2D: 2x3 ones
# 3D: 3x3x3 random
# Print each shape
`,
          solutionCode: `import numpy as np

a = np.zeros(5)
b = np.ones((2, 3))
c = np.random.rand(3, 3, 3)

print(a.shape)
print(b.shape)
print(c.shape)`,
          tests: [
            { id: 1, label: "Creates zeros array", keywords: [{ pattern: "np\\.zeros\\s*\\(" }] },
            { id: 2, label: "Creates ones array", keywords: [{ pattern: "np\\.ones\\s*\\(" }] },
            { id: 3, label: "Creates random 3D array", keywords: [{ pattern: "np\\.random\\.rand\\s*\\(" }] },
            { id: 4, label: "Prints all shapes", keywords: [{ pattern: "\\.shape" }] },
          ],
        },
      },
      {
        id: "pt-2",
        title: "Tensor Operations",
        xp: 15,
        theory: [
          {
            type: "text",
            content:
              "PyTorch tensors support all standard mathematical operations — and they are **vectorised**, meaning they run on entire arrays at once without Python loops. This is what makes deep learning fast.",
          },
          {
            type: "code",
            lang: "python",
            label: "Arithmetic and reshaping",
            content: `import torch

a = torch.tensor([1., 2., 3.])
b = torch.tensor([4., 5., 6.])

# Element-wise operations
print(a + b)          # tensor([5., 7., 9.])
print(a * b)          # tensor([4., 10., 18.])
print(a ** 2)         # tensor([1., 4., 9.])
print(torch.sqrt(a))  # tensor([1., 1.41, 1.73])

# Matrix multiplication
A = torch.rand(3, 4)
B = torch.rand(4, 2)
C = A @ B             # torch.matmul(A, B) → shape [3, 2]
print(C.shape)        # torch.Size([3, 2])

# Reshape
x = torch.arange(12, dtype=torch.float32)
print(x.shape)        # [12]
x = x.reshape(3, 4)
print(x.shape)        # [3, 4]
x = x.view(-1)        # flatten back to [12]`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Matrix multiplication requires the inner dimensions to match: A [3, 4] @ B [4, 2] → [3, 2]. A common bug is mismatched shapes — always check `.shape` when debugging.",
          },
          {
            type: "quiz",
            question: "What does tensor.reshape(2, 6) do to a tensor of shape [3, 4]?",
            options: [
              "Fails — 3×4≠2×6",
              "Returns a tensor of shape [2, 6] with the same data",
              "Adds new elements to fill the shape",
              "Transposes the tensor",
            ],
            answer: 1,
            explanation: "3×4=12 and 2×6=12, so reshape works — same 12 elements, different shape.",
          },
        ],
        challenge: {
          title: "Matrix Multiply",
          description:
            "Create a 3×4 matrix A filled with ones and a 4×2 matrix B filled with twos. Multiply them (A @ B) and print the result and its shape.",
          starterCode: `import numpy as np

# A: 3x4 ones, B: 4x2 twos
# C = A @ B
# Print C and C.shape
`,
          solutionCode: `import numpy as np

A = np.ones((3, 4))
B = np.full((4, 2), 2.0)
C = A @ B
print(C)
print(C.shape)`,
          tests: [
            { id: 1, label: "Creates A with np.ones", keywords: [{ pattern: "np\\.ones\\s*\\(" }] },
            { id: 2, label: "Multiplies matrices with @", keywords: [{ pattern: "A\\s*@\\s*B|np\\.matmul" }] },
            { id: 3, label: "Prints result shape", keywords: [{ pattern: "\\.shape" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 2 — Autograd and Gradients
  // ─────────────────────────────────────────────────────────────
  {
    id: "autograd",
    title: "Autograd & Gradients",
    icon: "∂",
    color: "#2563eb",
    lessons: [
      {
        id: "pt-3",
        title: "Automatic Differentiation",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Autograd** is PyTorch's automatic differentiation engine. It tracks every operation on tensors that have `requires_grad=True`, building a computation graph. When you call `.backward()`, it computes all gradients automatically using the chain rule.",
          },
          {
            type: "code",
            lang: "python",
            label: "Autograd in action",
            content: `import torch

# Create a tensor that tracks gradients
x = torch.tensor(3.0, requires_grad=True)

# Forward pass: y = x² + 2x + 1
y = x**2 + 2*x + 1

# Backward pass: compute dy/dx
y.backward()

# Gradient: dy/dx = 2x + 2 = 2(3) + 2 = 8
print(x.grad)   # tensor(8.)`,
          },
          {
            type: "diagram",
            title: "Computation graph for y = x²",
            nodes: [
              { id: "x", label: "x = 3.0", color: ACCENT, items: ["Input tensor", "requires_grad=True"] },
              { id: "sq", label: "x ** 2 = 9.0", color: "#2563eb", items: ["Forward: square", "Backward: 2x"] },
              { id: "y", label: "y = 9.0", color: "#7c3aed", items: ["Output", ".backward() triggers grad"] },
            ],
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Gradients accumulate by default. Always call `optimizer.zero_grad()` (or `x.grad.zero_()`) before each backward pass to avoid adding up gradients from previous steps.",
          },
          {
            type: "quiz",
            question: "What does y.backward() compute?",
            options: [
              "The value of y",
              "The gradient dy/dx for all tensors with requires_grad=True",
              "The second derivative",
              "It runs the forward pass again",
            ],
            answer: 1,
            explanation:
              "backward() traverses the computation graph in reverse (backpropagation) and accumulates gradients in the .grad attribute of leaf tensors.",
          },
        ],
        challenge: {
          title: "Manual Gradient",
          description:
            "Compute the gradient of f(x) = x³ + 2x at x=2 manually (dy/dx = 3x² + 2). Print the analytical gradient.",
          starterCode: `# f(x) = x^3 + 2x
# df/dx = 3x^2 + 2
# Evaluate at x = 2

x = 2
# Compute gradient analytically and print it
`,
          solutionCode: `x = 2
gradient = 3 * x**2 + 2
print(gradient)`,
          tests: [
            { id: 1, label: "Uses x = 2", keywords: [{ pattern: "x\\s*=\\s*2" }] },
            { id: 2, label: "Computes 3*x**2 + 2", keywords: [{ pattern: "3.*x.*2|x.*\\*\\*.*2" }] },
            { id: 3, label: "Prints the gradient (14)", keywords: [{ pattern: "print\\s*\\(" }] },
          ],
        },
      },
      {
        id: "pt-4",
        title: "Gradient Descent from Scratch",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "**Gradient descent** is the optimisation algorithm that trains neural networks. The idea: compute how much the loss increases as each weight increases (the gradient), then move the weights in the opposite direction to reduce the loss.",
          },
          {
            type: "code",
            lang: "python",
            label: "Gradient descent loop",
            content: `import torch

# Simple linear problem: find w such that w*2 ≈ 4
w = torch.tensor(0.0, requires_grad=True)
lr = 0.1  # learning rate

for step in range(20):
    # Forward: prediction = w * 2
    pred = w * 2.0
    # Loss: mean squared error vs target 4.0
    loss = (pred - 4.0) ** 2

    # Backward
    loss.backward()

    # Update (no grad tracking for update)
    with torch.no_grad():
        w -= lr * w.grad
        w.grad.zero_()

    if step % 5 == 0:
        print(f"Step {step}: w={w.item():.4f}, loss={loss.item():.4f}")

print(f"Final w ≈ {w.item():.4f}")  # should be ≈ 2.0`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "The learning rate controls step size. Too large → overshoots and diverges. Too small → converges very slowly. Typical values: 0.001 to 0.1.",
          },
          {
            type: "quiz",
            question: "Why do we zero gradients before each backward pass?",
            options: [
              "To reset the model weights",
              "To speed up training",
              "Because PyTorch accumulates gradients by default",
              "To clear the computation graph",
            ],
            answer: 2,
            explanation:
              "PyTorch adds new gradients to existing ones by default (useful for some techniques). For standard training you zero them each step to get fresh gradients.",
          },
        ],
        challenge: {
          title: "Gradient Descent — Find the Minimum",
          description:
            "Implement gradient descent to minimise f(x) = (x - 3)². Start at x=0, use learning rate 0.1, run 20 steps. Print x after each 5 steps. It should converge to 3.0.",
          starterCode: `# Minimise f(x) = (x - 3)^2
# df/dx = 2*(x - 3)
# x_new = x - lr * gradient

x = 0.0
lr = 0.1

for step in range(20):
    gradient = 2 * (x - 3)
    x = x - lr * gradient
    if step % 5 == 0:
        print(f"Step {step}: x={x:.4f}")

print(f"Final x = {x:.4f}")
`,
          solutionCode: `x = 0.0
lr = 0.1

for step in range(20):
    gradient = 2 * (x - 3)
    x = x - lr * gradient
    if step % 5 == 0:
        print(f"Step {step}: x={x:.4f}")

print(f"Final x = {x:.4f}")`,
          tests: [
            { id: 1, label: "Computes gradient = 2*(x-3)", keywords: [{ pattern: "2.*x.*3|gradient" }] },
            { id: 2, label: "Updates x with learning rate", keywords: [{ pattern: "x\\s*=\\s*x\\s*-\\s*lr" }] },
            { id: 3, label: "Runs 20 steps", keywords: [{ pattern: "range\\s*\\(\\s*20\\s*\\)" }] },
            { id: 4, label: "Prints final x", keywords: [{ pattern: "Final x" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 3 — Building Neural Networks
  // ─────────────────────────────────────────────────────────────
  {
    id: "neural-networks",
    title: "Building Neural Networks",
    icon: "🧠",
    color: "#7c3aed",
    lessons: [
      {
        id: "pt-5",
        title: "nn.Module — The Base Class",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "Every PyTorch model is a subclass of `nn.Module`. You define the layers in `__init__` and the forward computation in `forward()`. PyTorch automatically tracks all parameters defined as `nn.Parameter` or submodules.",
          },
          {
            type: "code",
            lang: "python",
            label: "Your first neural network",
            content: `import torch
import torch.nn as nn

class LinearModel(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.layer1 = nn.Linear(input_size, hidden_size)
        self.relu   = nn.ReLU()
        self.layer2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.layer1(x)   # linear transform
        x = self.relu(x)     # activation
        x = self.layer2(x)   # output
        return x

# Create model: 4 inputs → 8 hidden → 2 outputs
model = LinearModel(4, 8, 2)
print(model)

# Count parameters
total = sum(p.numel() for p in model.parameters())
print(f"Total parameters: {total}")

# Forward pass
x = torch.rand(1, 4)   # batch of 1, 4 features
out = model(x)
print(out.shape)        # [1, 2]`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Always call `super().__init__()` first in your `__init__`. Without it, PyTorch cannot register your layers and parameters.",
          },
          {
            type: "quiz",
            question: "What does nn.Linear(4, 8) do?",
            options: [
              "Creates 4 layers with 8 neurons each",
              "Applies y = xW^T + b where W is 8×4 and b is 8",
              "Reduces input from 8 to 4 dimensions",
              "Applies 4×8 convolution",
            ],
            answer: 1,
            explanation:
              "nn.Linear(in_features, out_features) applies a linear transformation: output = input @ weight.T + bias, mapping from in_features to out_features.",
          },
        ],
        challenge: {
          title: "Count Network Parameters",
          description:
            "A network has: Linear(10, 20), Linear(20, 5). Count the total number of parameters manually (weights + biases for each layer) and print the total.",
          starterCode: `# Linear(10, 20): weights=10*20=200, bias=20 → 220 params
# Linear(20, 5):  weights=20*5=100, bias=5  → 105 params
# Total = ?

layer1_params = 10 * 20 + 20
layer2_params = 20 * 5 + 5
total = layer1_params + layer2_params
print(f"Total parameters: {total}")
`,
          solutionCode: `layer1_params = 10 * 20 + 20
layer2_params = 20 * 5 + 5
total = layer1_params + layer2_params
print(f"Total parameters: {total}")`,
          tests: [
            { id: 1, label: "Calculates layer1 params (220)", keywords: [{ pattern: "10.*20.*20|layer1" }] },
            { id: 2, label: "Calculates layer2 params (105)", keywords: [{ pattern: "20.*5.*5|layer2" }] },
            { id: 3, label: "Prints total (325)", keywords: [{ pattern: "print.*total|Total parameters" }] },
          ],
        },
      },
      {
        id: "pt-6",
        title: "Activation Functions",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "**Activation functions** introduce non-linearity. Without them, stacking linear layers is equivalent to a single linear transformation — no matter how deep the network. Each activation function has different properties suited to different tasks.",
          },
          {
            type: "code",
            lang: "python",
            label: "Common activations",
            content: `import torch
import torch.nn as nn

x = torch.tensor([-2., -1., 0., 1., 2.])

# ReLU: max(0, x) — most common for hidden layers
relu = nn.ReLU()
print(relu(x))   # [0, 0, 0, 1, 2]

# Sigmoid: 1/(1+e^-x) → (0,1) — binary classification output
sigmoid = nn.Sigmoid()
print(sigmoid(x))  # [0.12, 0.27, 0.5, 0.73, 0.88]

# Tanh: → (-1,1) — common in RNNs
tanh = nn.Tanh()
print(tanh(x))   # [-0.96, -0.76, 0, 0.76, 0.96]

# Softmax: → probabilities summing to 1 — multi-class output
softmax = nn.Softmax(dim=0)
print(softmax(x))`,
          },
          {
            type: "diagram",
            title: "When to use each activation",
            nodes: [
              { id: "relu", label: "ReLU", color: ACCENT, items: ["Hidden layers", "CNNs", "Most common choice"] },
              { id: "sigmoid", label: "Sigmoid", color: "#2563eb", items: ["Binary output", "Gates in LSTM", "Output: probability"] },
              { id: "softmax", label: "Softmax", color: "#7c3aed", items: ["Multi-class output", "Sums to 1", "With CrossEntropyLoss"] },
              { id: "tanh", label: "Tanh", color: "#059669", items: ["RNNs", "Normalised hidden state", "Range: (-1, 1)"] },
            ],
          },
          {
            type: "quiz",
            question: "ReLU(x) for x = -3 returns:",
            options: ["-3", "3", "0", "0.05"],
            answer: 2,
            explanation: "ReLU is max(0, x). For any negative input it returns 0.",
          },
        ],
        challenge: {
          title: "Implement ReLU and Sigmoid",
          description:
            "Implement relu(x) and sigmoid(x) as Python functions using math. Test with values [-2, -1, 0, 1, 2] and print results.",
          starterCode: `import math

def relu(x):
    return max(0, x)

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

values = [-2, -1, 0, 1, 2]
print("ReLU:")
for v in values:
    print(f"  relu({v}) = {relu(v)}")

print("Sigmoid:")
for v in values:
    print(f"  sigmoid({v}) = {sigmoid(v):.4f}")
`,
          solutionCode: `import math

def relu(x):
    return max(0, x)

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

values = [-2, -1, 0, 1, 2]
print("ReLU:")
for v in values:
    print(f"  relu({v}) = {relu(v)}")

print("Sigmoid:")
for v in values:
    print(f"  sigmoid({v}) = {sigmoid(v):.4f}")`,
          tests: [
            { id: 1, label: "Implements relu correctly", keywords: [{ pattern: "def\\s+relu\\s*\\(" }] },
            { id: 2, label: "Implements sigmoid correctly", keywords: [{ pattern: "def\\s+sigmoid\\s*\\(" }] },
            { id: 3, label: "Tests both on all values", keywords: [{ pattern: "for\\s+v\\s+in\\s+values" }] },
          ],
        },
      },
      {
        id: "pt-7",
        title: "Loss Functions and Optimisers",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "The **loss function** measures how wrong the model's predictions are. The **optimiser** uses the gradients to update weights. Together they form the training loop.",
          },
          {
            type: "code",
            lang: "python",
            label: "Loss + optimiser setup",
            content: `import torch
import torch.nn as nn

model = nn.Linear(4, 1)

# Loss functions
mse  = nn.MSELoss()       # regression
bce  = nn.BCELoss()       # binary classification
ce   = nn.CrossEntropyLoss()  # multi-class (includes softmax)

# Optimisers
sgd  = torch.optim.SGD(model.parameters(), lr=0.01)
adam = torch.optim.Adam(model.parameters(), lr=0.001)
adamw = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)

# Standard training step
x = torch.rand(8, 4)          # batch of 8
y = torch.rand(8, 1)          # targets

adam.zero_grad()               # 1. zero gradients
pred = model(x)                # 2. forward pass
loss = mse(pred, y)            # 3. compute loss
loss.backward()                # 4. backprop
adam.step()                    # 5. update weights

print(f"Loss: {loss.item():.4f}")`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "The 5-step training loop is always the same: zero_grad → forward → loss → backward → step. Memorise this pattern.",
          },
          {
            type: "quiz",
            question: "Which loss function should you use for a regression task (predicting house prices)?",
            options: ["CrossEntropyLoss", "BCELoss", "MSELoss", "NLLLoss"],
            answer: 2,
            explanation:
              "MSELoss (Mean Squared Error) penalises large errors more and is standard for regression. CrossEntropyLoss and BCELoss are for classification.",
          },
        ],
        challenge: {
          title: "MSE Loss from Scratch",
          description:
            "Implement mean squared error loss. Given predictions = [2.5, 0.5, 2.0] and targets = [3.0, 1.0, 2.0], compute and print the MSE.",
          starterCode: `predictions = [2.5, 0.5, 2.0]
targets     = [3.0, 1.0, 2.0]

# MSE = mean of (pred - target)^2
# Compute and print

`,
          solutionCode: `predictions = [2.5, 0.5, 2.0]
targets     = [3.0, 1.0, 2.0]

mse = sum((p - t)**2 for p, t in zip(predictions, targets)) / len(predictions)
print(f"MSE: {mse:.4f}")`,
          tests: [
            { id: 1, label: "Computes squared differences", keywords: [{ pattern: "\\*\\*\\s*2|\\*\\s*\\*" }] },
            { id: 2, label: "Averages them", keywords: [{ pattern: "sum.*len|mean|/ len\\s*\\(predictions\\)" }] },
            { id: 3, label: "Prints the MSE", keywords: [{ pattern: "print.*mse|MSE" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 4 — Training Pipeline
  // ─────────────────────────────────────────────────────────────
  {
    id: "training-pipeline",
    title: "Training Pipeline",
    icon: "🔄",
    color: "#059669",
    lessons: [
      {
        id: "pt-8",
        title: "Datasets and DataLoaders",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "PyTorch's `Dataset` and `DataLoader` handle data loading, batching, shuffling, and parallel loading. You either use built-in datasets or subclass `Dataset` for your own data.",
          },
          {
            type: "code",
            lang: "python",
            label: "Custom Dataset + DataLoader",
            content: `import torch
from torch.utils.data import Dataset, DataLoader

class TabularDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X, dtype=torch.float32)
        self.y = torch.tensor(y, dtype=torch.float32)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Create dummy data
import numpy as np
X = np.random.rand(100, 4)  # 100 samples, 4 features
y = np.random.rand(100, 1)

dataset = TabularDataset(X, y)
loader  = DataLoader(dataset, batch_size=16, shuffle=True)

for batch_X, batch_y in loader:
    print(f"Batch X: {batch_X.shape}, y: {batch_y.shape}")
    break  # just show first batch`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "Always shuffle training data (`shuffle=True`) to prevent the model from memorising the order. For validation/test sets, set `shuffle=False`.",
          },
          {
            type: "quiz",
            question: "What are the two methods every PyTorch Dataset must implement?",
            options: [
              "__init__ and forward",
              "__len__ and __getitem__",
              "__load__ and __batch__",
              "__size__ and __get__",
            ],
            answer: 1,
            explanation:
              "__len__ tells DataLoader how many samples exist. __getitem__ returns a single sample by index. DataLoader handles batching automatically.",
          },
        ],
        challenge: {
          title: "Dataset Stats",
          description:
            "Given a list of 20 random values as a dataset, implement a simple Dataset class with __len__ and __getitem__. Print the dataset length and first 3 items.",
          starterCode: `import random
random.seed(42)
data = [random.random() for _ in range(20)]

class SimpleDataset:
    def __init__(self, data):
        self.data = data

    def __len__(self):
        # return number of items

    def __getitem__(self, idx):
        # return item at idx

dataset = SimpleDataset(data)
print(f"Length: {len(dataset)}")
for i in range(3):
    print(f"Item {i}: {dataset[i]:.4f}")
`,
          solutionCode: `import random
random.seed(42)
data = [random.random() for _ in range(20)]

class SimpleDataset:
    def __init__(self, data):
        self.data = data

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.data[idx]

dataset = SimpleDataset(data)
print(f"Length: {len(dataset)}")
for i in range(3):
    print(f"Item {i}: {dataset[i]:.4f}")`,
          tests: [
            { id: 1, label: "Implements __len__", keywords: [{ pattern: "def\\s+__len__" }] },
            { id: 2, label: "Implements __getitem__", keywords: [{ pattern: "def\\s+__getitem__" }] },
            { id: 3, label: "Prints length and 3 items", keywords: [{ pattern: "Length:|Item 0" }] },
          ],
        },
      },
      {
        id: "pt-9",
        title: "Full Training Loop",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "The complete training loop iterates over epochs, runs batches through the model, computes loss, backpropagates, and updates weights. It also includes a **validation loop** to monitor generalisation.",
          },
          {
            type: "code",
            lang: "python",
            label: "Complete training loop",
            content: `import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

# Data
X_train = torch.rand(200, 4)
y_train = torch.rand(200, 1)
X_val   = torch.rand(50, 4)
y_val   = torch.rand(50, 1)

train_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=32, shuffle=True)
val_loader   = DataLoader(TensorDataset(X_val,   y_val),   batch_size=32)

# Model, loss, optimiser
model = nn.Sequential(nn.Linear(4, 16), nn.ReLU(), nn.Linear(16, 1))
loss_fn = nn.MSELoss()
optimiser = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    # ── Training ──
    model.train()
    train_loss = 0
    for X_batch, y_batch in train_loader:
        optimiser.zero_grad()
        pred = model(X_batch)
        loss = loss_fn(pred, y_batch)
        loss.backward()
        optimiser.step()
        train_loss += loss.item()

    # ── Validation ──
    model.eval()
    val_loss = 0
    with torch.no_grad():
        for X_batch, y_batch in val_loader:
            pred = model(X_batch)
            val_loss += loss_fn(pred, y_batch).item()

    print(f"Epoch {epoch+1:2d} | train={train_loss/len(train_loader):.4f} | val={val_loss/len(val_loader):.4f}")`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "Always call model.train() before the training loop and model.eval() before validation. These switch layers like Dropout and BatchNorm between training and inference modes.",
          },
          {
            type: "quiz",
            question: "Why wrap validation in torch.no_grad()?",
            options: [
              "It makes validation faster by skipping the forward pass",
              "It prevents gradient computation, saving memory and time",
              "It disables the model's layers",
              "It is required to compute accuracy",
            ],
            answer: 1,
            explanation:
              "During validation you only need predictions, not gradients. torch.no_grad() tells PyTorch not to build the computation graph, saving memory and computation.",
          },
        ],
        challenge: {
          title: "Mini Training Loop",
          description:
            "Simulate 5 epochs of training. Each epoch, compute a 'loss' = 1/epoch and print it. Simulate loss decreasing each epoch.",
          starterCode: `# Simulate 5 training epochs
# Each epoch: loss = 1.0 / (epoch + 1)
# Print: "Epoch X | Loss: Y.YYYY"

for epoch in range(5):
    loss = 1.0 / (epoch + 1)
    print(f"Epoch {epoch+1} | Loss: {loss:.4f}")
`,
          solutionCode: `for epoch in range(5):
    loss = 1.0 / (epoch + 1)
    print(f"Epoch {epoch+1} | Loss: {loss:.4f}")`,
          tests: [
            { id: 1, label: "Loops 5 epochs", keywords: [{ pattern: "range\\s*\\(\\s*5\\s*\\)" }] },
            { id: 2, label: "Computes decreasing loss", keywords: [{ pattern: "1\\.0\\s*/\\s*\\(epoch" }] },
            { id: 3, label: "Prints each epoch", keywords: [{ pattern: "Epoch.*Loss" }] },
          ],
        },
      },
      {
        id: "pt-10",
        title: "Saving and Loading Models",
        xp: 20,
        theory: [
          {
            type: "text",
            content:
              "PyTorch models are saved as **state dicts** — dictionaries mapping parameter names to tensors. This is more flexible than saving the whole model object.",
          },
          {
            type: "code",
            lang: "python",
            label: "Save and load",
            content: `import torch
import torch.nn as nn

model = nn.Linear(4, 2)

# Save
torch.save(model.state_dict(), "model.pth")

# Load into a new model
loaded = nn.Linear(4, 2)
loaded.load_state_dict(torch.load("model.pth"))
loaded.eval()

# Checkpoint — save training state
torch.save({
    "epoch": 10,
    "model_state": model.state_dict(),
    "optimiser_state": optimiser.state_dict(),
    "loss": 0.023,
}, "checkpoint.pth")

# Restore
checkpoint = torch.load("checkpoint.pth")
model.load_state_dict(checkpoint["model_state"])
epoch = checkpoint["epoch"]`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Save checkpoints regularly during long training runs. If training crashes at epoch 90 of 100, you can resume from epoch 80 instead of starting over.",
          },
          {
            type: "quiz",
            question: "What does model.state_dict() return?",
            options: [
              "The model architecture as a string",
              "A dictionary of parameter names to tensors",
              "The training loss history",
              "The model's Python class",
            ],
            answer: 1,
            explanation:
              "state_dict() returns an OrderedDict mapping layer names (like 'layer1.weight') to their parameter tensors. It's everything needed to reconstruct the learned weights.",
          },
        ],
        challenge: {
          title: "Checkpoint Dict",
          description:
            "Create a checkpoint dictionary with keys: 'epoch' (value: 5), 'loss' (value: 0.1234), 'model_name' (value: 'LinearModel'). Print each key and value.",
          starterCode: `checkpoint = {
    "epoch": 5,
    "loss": 0.1234,
    "model_name": "LinearModel",
}

for key, value in checkpoint.items():
    print(f"{key}: {value}")
`,
          solutionCode: `checkpoint = {
    "epoch": 5,
    "loss": 0.1234,
    "model_name": "LinearModel",
}

for key, value in checkpoint.items():
    print(f"{key}: {value}")`,
          tests: [
            { id: 1, label: "Creates checkpoint dict", keywords: [{ pattern: "checkpoint\\s*=" }] },
            { id: 2, label: "Has epoch key", keywords: [{ pattern: "epoch" }] },
            { id: 3, label: "Iterates and prints all keys", keywords: [{ pattern: "\\.items\\s*\\(\\s*\\)" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 5 — Convolutional Networks
  // ─────────────────────────────────────────────────────────────
  {
    id: "cnns",
    title: "Convolutional Neural Networks",
    icon: "🖼️",
    color: "#9333ea",
    lessons: [
      {
        id: "pt-11",
        title: "Convolutions and Pooling",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "**Convolutional Neural Networks (CNNs)** are designed for grid-like data (images, audio). A **convolution** slides a small filter across the input and detects local patterns — edges, textures, shapes. **Pooling** reduces spatial dimensions.",
          },
          {
            type: "code",
            lang: "python",
            label: "CNN layers",
            content: `import torch
import torch.nn as nn

# Conv2d(in_channels, out_channels, kernel_size)
conv = nn.Conv2d(3, 32, kernel_size=3, padding=1)
pool = nn.MaxPool2d(2, 2)  # halves spatial dimensions
relu = nn.ReLU()

# Image batch: [batch, channels, height, width]
x = torch.rand(4, 3, 32, 32)  # 4 images, 3 channels (RGB), 32×32

out = relu(conv(x))  # [4, 32, 32, 32]
out = pool(out)       # [4, 32, 16, 16]
print(out.shape)`,
          },
          {
            type: "diagram",
            title: "CNN architecture",
            nodes: [
              { id: "input", label: "Input", color: ACCENT, items: ["[B, 3, 224, 224]", "RGB image", "3 channels"] },
              { id: "conv", label: "Conv + ReLU", color: "#2563eb", items: ["Detect edges", "Local patterns", "[B, 32, 224, 224]"] },
              { id: "pool", label: "MaxPool", color: "#7c3aed", items: ["Downsample", "Translation invariance", "[B, 32, 112, 112]"] },
              { id: "fc", label: "Fully Connected", color: "#059669", items: ["Flatten", "Classify", "[B, num_classes]"] },
            ],
          },
          {
            type: "quiz",
            question: "What does MaxPool2d(2,2) do to a [4, 32, 16, 16] tensor?",
            options: [
              "Doubles spatial dimensions → [4, 32, 32, 32]",
              "Halves spatial dimensions → [4, 32, 8, 8]",
              "Changes channel count → [4, 64, 16, 16]",
              "Nothing — only changes dtype",
            ],
            answer: 1,
            explanation:
              "MaxPool2d(2,2) takes the maximum in each 2×2 window, halving height and width. [4,32,16,16] → [4,32,8,8].",
          },
        ],
        challenge: {
          title: "Convolution Output Size",
          description:
            "Given input size 32×32, kernel size 3×3, padding=1, stride=1. Compute and print the output spatial size using the formula: out = (in + 2*pad - kernel) // stride + 1.",
          starterCode: `# Formula: out = (in + 2*padding - kernel_size) // stride + 1
in_size = 32
kernel = 3
padding = 1
stride = 1

out_size = (in_size + 2 * padding - kernel) // stride + 1
print(f"Output size: {out_size}x{out_size}")
`,
          solutionCode: `in_size = 32
kernel = 3
padding = 1
stride = 1

out_size = (in_size + 2 * padding - kernel) // stride + 1
print(f"Output size: {out_size}x{out_size}")`,
          tests: [
            { id: 1, label: "Uses the convolution formula", keywords: [{ pattern: "2.*padding|in_size.*kernel" }] },
            { id: 2, label: "Prints output size (32x32)", keywords: [{ pattern: "Output size" }] },
          ],
        },
      },
      {
        id: "pt-12",
        title: "Building a CNN Classifier",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "A typical CNN classifier stacks convolutional blocks (Conv → BatchNorm → ReLU → Pool) then flattens and passes through fully-connected layers for the final prediction.",
          },
          {
            type: "code",
            lang: "python",
            label: "Complete CNN for CIFAR-10",
            content: `import torch
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()

        # Feature extractor
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2),                                     # 32→16
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.MaxPool2d(2),                                     # 16→8
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.MaxPool2d(2),                                     # 8→4
        )

        # Classifier
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 256),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(256, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        return self.classifier(x)

model = CNN(10)
x = torch.rand(8, 3, 32, 32)
print(model(x).shape)  # [8, 10]`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "BatchNorm2d normalises activations across a batch, making training faster and more stable. Dropout randomly zeros neurons during training to prevent overfitting.",
          },
          {
            type: "quiz",
            question: "What does nn.Flatten() do between conv layers and linear layers?",
            options: [
              "Removes all spatial dimensions",
              "Converts [B, C, H, W] to [B, C*H*W]",
              "Transposes the tensor",
              "Applies a 1×1 convolution",
            ],
            answer: 1,
            explanation:
              "Flatten converts multi-dimensional feature maps [B, 128, 4, 4] into 1D vectors [B, 2048] that linear layers can process.",
          },
        ],
        challenge: {
          title: "Flatten Size Calculator",
          description:
            "After 3 MaxPool2d(2) layers on a 32×32 input, what is the spatial size? Compute and print the total flatten size for 128 channels.",
          starterCode: `spatial = 32
# Each MaxPool2d(2) halves the spatial size
# Apply 3 times

for i in range(3):
    spatial = spatial // 2
    print(f"After pool {i+1}: {spatial}x{spatial}")

flatten_size = 128 * spatial * spatial
print(f"Flatten size (128 channels): {flatten_size}")
`,
          solutionCode: `spatial = 32
for i in range(3):
    spatial = spatial // 2
    print(f"After pool {i+1}: {spatial}x{spatial}")

flatten_size = 128 * spatial * spatial
print(f"Flatten size (128 channels): {flatten_size}")`,
          tests: [
            { id: 1, label: "Applies pooling 3 times", keywords: [{ pattern: "range\\s*\\(\\s*3\\s*\\)" }] },
            { id: 2, label: "Halves spatial each time", keywords: [{ pattern: "spatial\\s*//\\s*2" }] },
            { id: 3, label: "Computes flatten size", keywords: [{ pattern: "128.*spatial" }] },
          ],
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // CHAPTER 6 — Advanced PyTorch
  // ─────────────────────────────────────────────────────────────
  {
    id: "advanced-pytorch",
    title: "Advanced PyTorch",
    icon: "⚡",
    color: "#dc2626",
    lessons: [
      {
        id: "pt-13",
        title: "Transfer Learning",
        xp: 35,
        theory: [
          {
            type: "text",
            content:
              "**Transfer learning** reuses a model pre-trained on a large dataset (like ImageNet) for a new task. You freeze the feature extractor and replace the final layer. This achieves high accuracy with much less data and compute.",
          },
          {
            type: "code",
            lang: "python",
            label: "Fine-tuning ResNet18",
            content: `import torch
import torch.nn as nn
import torchvision.models as models

# Load pretrained ResNet18
model = models.resnet18(weights="IMAGENET1K_V1")

# Freeze all layers
for param in model.parameters():
    param.requires_grad = False

# Replace final layer for our task (e.g., 5 classes)
num_features = model.fc.in_features         # 512
model.fc = nn.Linear(num_features, 5)       # new trainable head

# Only the new head trains
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
total     = sum(p.numel() for p in model.parameters())
print(f"Trainable: {trainable:,} / {total:,} parameters")

# Move to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model  = model.to(device)`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Start with all layers frozen. If accuracy plateaus, gradually unfreeze the last few layers and fine-tune with a very small learning rate (1e-5 to 1e-4).",
          },
          {
            type: "quiz",
            question: "Why do we freeze pretrained layers during transfer learning?",
            options: [
              "To make training slower",
              "To prevent the useful learned features from being destroyed by large gradient updates",
              "Because frozen layers use less memory",
              "PyTorch requires it for pretrained models",
            ],
            answer: 1,
            explanation:
              "The pretrained features (edges, textures, shapes) are valuable. Freezing them lets the new head learn to use these features for the new task without overwriting them.",
          },
        ],
        challenge: {
          title: "Freeze vs Trainable Params",
          description:
            "Given a model with 1,000,000 total params and only the last layer (512 params) unfrozen, compute and print the number of trainable and frozen params, and the % trainable.",
          starterCode: `total_params = 1_000_000
trainable_params = 512
frozen_params = total_params - trainable_params
pct_trainable = (trainable_params / total_params) * 100

print(f"Total:     {total_params:,}")
print(f"Trainable: {trainable_params:,}")
print(f"Frozen:    {frozen_params:,}")
print(f"% Trainable: {pct_trainable:.4f}%")
`,
          solutionCode: `total_params = 1_000_000
trainable_params = 512
frozen_params = total_params - trainable_params
pct_trainable = (trainable_params / total_params) * 100

print(f"Total:     {total_params:,}")
print(f"Trainable: {trainable_params:,}")
print(f"Frozen:    {frozen_params:,}")
print(f"% Trainable: {pct_trainable:.4f}%")`,
          tests: [
            { id: 1, label: "Computes frozen params", keywords: [{ pattern: "frozen.*total|total.*trainable" }] },
            { id: 2, label: "Computes % trainable", keywords: [{ pattern: "trainable.*total|pct_trainable" }] },
            { id: 3, label: "Prints all four values", keywords: [{ pattern: "Trainable:|Frozen:|Total:" }] },
          ],
        },
      },
      {
        id: "pt-14",
        title: "GPU Training and Device Management",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "GPUs can parallelise matrix operations thousands of times faster than CPUs. PyTorch makes moving tensors and models to GPU simple with `.to(device)`. The golden rule: model and data must be on the same device.",
          },
          {
            type: "code",
            lang: "python",
            label: "GPU-ready training code",
            content: `import torch

# Standard device selection
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using: {device}")

# Move model to device
model = model.to(device)

# Move data to device in the training loop
for X_batch, y_batch in train_loader:
    X_batch = X_batch.to(device)
    y_batch = y_batch.to(device)

    pred = model(X_batch)  # both on same device ✓
    loss = loss_fn(pred, y_batch)

# GPU info (if available)
if torch.cuda.is_available():
    print(torch.cuda.get_device_name(0))
    print(f"Memory: {torch.cuda.memory_allocated()/1e9:.2f} GB used")

# Mixed precision training (faster on modern GPUs)
from torch.cuda.amp import autocast, GradScaler
scaler = GradScaler()
with autocast():
    pred = model(X_batch)
    loss = loss_fn(pred, y_batch)
scaler.scale(loss).backward()
scaler.step(optimiser)
scaler.update()`,
          },
          {
            type: "callout",
            variant: "warning",
            content:
              "The most common GPU error: 'Expected all tensors to be on the same device'. Always move both model AND data to device. Use `.to(device)` not `.cuda()` for portability.",
          },
          {
            type: "quiz",
            question: "What happens if your model is on GPU but input data is on CPU?",
            options: [
              "PyTorch automatically moves data to GPU",
              "Training is slower but works",
              "RuntimeError: tensors must be on the same device",
              "The model falls back to CPU",
            ],
            answer: 2,
            explanation:
              "PyTorch raises a RuntimeError when you try to mix CPU and GPU tensors in an operation. Always move both model and data to the same device.",
          },
        ],
        challenge: {
          title: "Device Selection",
          description:
            "Write a function get_device() that returns 'cuda' if available, else 'cpu'. Print the device and a message showing which hardware will be used.",
          starterCode: `import sys

# Simulate device check (no real GPU in browser)
cuda_available = False  # simulate no GPU

def get_device():
    if cuda_available:
        return "cuda"
    return "cpu"

device = get_device()
print(f"Device: {device}")
if device == "cuda":
    print("Using GPU — training will be fast!")
else:
    print("Using CPU — consider a GPU for large models.")
`,
          solutionCode: `cuda_available = False

def get_device():
    if cuda_available:
        return "cuda"
    return "cpu"

device = get_device()
print(f"Device: {device}")
if device == "cuda":
    print("Using GPU — training will be fast!")
else:
    print("Using CPU — consider a GPU for large models.")`,
          tests: [
            { id: 1, label: "Defines get_device function", keywords: [{ pattern: "def\\s+get_device" }] },
            { id: 2, label: "Returns cuda or cpu", keywords: [{ pattern: "return.*cuda|return.*cpu" }] },
            { id: 3, label: "Prints device info", keywords: [{ pattern: "Device:|Using" }] },
          ],
        },
      },
      {
        id: "pt-15",
        title: "Learning Rate Scheduling",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "A fixed learning rate is rarely optimal. **Learning rate schedulers** adjust the learning rate during training — starting high for fast initial progress, then decreasing for fine-grained convergence.",
          },
          {
            type: "code",
            lang: "python",
            label: "Common schedulers",
            content: `import torch
import torch.nn as nn

model = nn.Linear(4, 1)
optimiser = torch.optim.Adam(model.parameters(), lr=0.1)

# Step decay: multiply lr by gamma every step_size epochs
scheduler1 = torch.optim.lr_scheduler.StepLR(optimiser, step_size=10, gamma=0.5)

# Cosine annealing: smoothly decays to min_lr
scheduler2 = torch.optim.lr_scheduler.CosineAnnealingLR(optimiser, T_max=50, eta_min=1e-6)

# Reduce on plateau: decay when metric stops improving
scheduler3 = torch.optim.lr_scheduler.ReduceLROnPlateau(optimiser, patience=5, factor=0.5)

# Training loop with scheduler
for epoch in range(30):
    # ... train ...
    scheduler1.step()   # call after each epoch
    current_lr = optimiser.param_groups[0]["lr"]
    if epoch % 10 == 0:
        print(f"Epoch {epoch}: lr={current_lr:.6f}")`,
          },
          {
            type: "callout",
            variant: "tip",
            content:
              "Warm-up + cosine annealing is the most popular schedule in modern training: start low (1e-6), ramp up over a few epochs, then cosine-decay to near zero.",
          },
          {
            type: "quiz",
            question: "When should scheduler.step() be called?",
            options: [
              "Before the first forward pass",
              "Inside the batch loop, after each batch",
              "After each epoch (or after each batch for some schedulers)",
              "Only once at the start of training",
            ],
            answer: 2,
            explanation:
              "Most epoch-based schedulers (StepLR, CosineAnnealingLR) are called once per epoch. Some batch-based schedulers step every batch. Check the docs for each.",
          },
        ],
        challenge: {
          title: "Simulate Step Decay",
          description:
            "Simulate StepLR decay: start with lr=0.1, multiply by 0.5 every 10 epochs. Print the lr at epochs 0, 10, 20, 30.",
          starterCode: `lr = 0.1
gamma = 0.5
step_size = 10

for epoch in [0, 10, 20, 30]:
    steps = epoch // step_size
    current_lr = lr * (gamma ** steps)
    print(f"Epoch {epoch}: lr={current_lr:.6f}")
`,
          solutionCode: `lr = 0.1
gamma = 0.5
step_size = 10

for epoch in [0, 10, 20, 30]:
    steps = epoch // step_size
    current_lr = lr * (gamma ** steps)
    print(f"Epoch {epoch}: lr={current_lr:.6f}")`,
          tests: [
            { id: 1, label: "Starts with lr=0.1", keywords: [{ pattern: "lr\\s*=\\s*0\\.1" }] },
            { id: 2, label: "Applies gamma decay", keywords: [{ pattern: "gamma.*steps|\\*\\*\\s*steps" }] },
            { id: 3, label: "Prints lr at each epoch", keywords: [{ pattern: "Epoch.*lr=" }] },
          ],
        },
      },
      {
        id: "pt-16",
        title: "Regularisation Techniques",
        xp: 25,
        theory: [
          {
            type: "text",
            content:
              "**Overfitting** is when a model memorises training data but fails on new data. Regularisation techniques reduce overfitting by constraining the model during training.",
          },
          {
            type: "code",
            lang: "python",
            label: "Dropout, BatchNorm, Weight Decay",
            content: `import torch.nn as nn

# Dropout: randomly zeros p fraction of neurons during training
dropout = nn.Dropout(p=0.5)

# BatchNorm: normalises activations, reduces internal covariate shift
bn = nn.BatchNorm1d(128)   # for 1D features
bn2d = nn.BatchNorm2d(64)  # for conv feature maps

# Full model with regularisation
model = nn.Sequential(
    nn.Linear(100, 256),
    nn.BatchNorm1d(256),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(256, 128),
    nn.BatchNorm1d(128),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(128, 10),
)

# Weight decay (L2 regularisation) — add to optimiser
optimiser = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=1e-4)`,
          },
          {
            type: "diagram",
            title: "Regularisation techniques",
            nodes: [
              { id: "dropout", label: "Dropout", color: ACCENT, items: ["Randomly zeroes neurons", "p=0.5 is common", "Only during training"] },
              { id: "batchnorm", label: "BatchNorm", color: "#2563eb", items: ["Normalises per batch", "Faster training", "Before or after ReLU"] },
              { id: "weightdecay", label: "Weight Decay (L2)", color: "#7c3aed", items: ["Penalises large weights", "AdamW optimizer", "weight_decay=1e-4"] },
            ],
          },
          {
            type: "quiz",
            question: "Dropout is applied during:",
            options: [
              "Both training and inference",
              "Training only",
              "Inference only",
              "Only the first epoch",
            ],
            answer: 1,
            explanation:
              "Dropout is only applied during training to prevent co-adaptation of neurons. model.eval() automatically disables it for inference.",
          },
        ],
        challenge: {
          title: "Regularisation Comparison",
          description:
            "Compare L1 and L2 regularisation penalties for weights = [0.5, -0.3, 0.8, -0.1]. Compute and print both penalties with lambda=0.01.",
          starterCode: `weights = [0.5, -0.3, 0.8, -0.1]
lam = 0.01

# L1: lambda * sum(|w|)
l1 = lam * sum(abs(w) for w in weights)

# L2: lambda * sum(w^2)
l2 = lam * sum(w**2 for w in weights)

print(f"L1 penalty: {l1:.4f}")
print(f"L2 penalty: {l2:.4f}")
`,
          solutionCode: `weights = [0.5, -0.3, 0.8, -0.1]
lam = 0.01

l1 = lam * sum(abs(w) for w in weights)
l2 = lam * sum(w**2 for w in weights)

print(f"L1 penalty: {l1:.4f}")
print(f"L2 penalty: {l2:.4f}")`,
          tests: [
            { id: 1, label: "Computes L1 with abs()", keywords: [{ pattern: "abs\\s*\\(" }] },
            { id: 2, label: "Computes L2 with w**2", keywords: [{ pattern: "w\\*\\*2|w\\s*\\*\\s*w" }] },
            { id: 3, label: "Prints both penalties", keywords: [{ pattern: "L1 penalty:|L2 penalty:" }] },
          ],
        },
      },
      {
        id: "pt-17",
        title: "PyTorch in Production",
        xp: 30,
        theory: [
          {
            type: "text",
            content:
              "Once a model is trained, you need to deploy it. PyTorch offers several paths: **TorchScript** for serialising models, **ONNX** for cross-framework export, and **torch.compile** (PyTorch 2.0) for automatic kernel fusion.",
          },
          {
            type: "code",
            lang: "python",
            label: "Exporting a trained model",
            content: `import torch
import torch.nn as nn

model = nn.Linear(4, 2)
model.eval()

# ── TorchScript (trace) ──────────────────────────────────────
example_input = torch.rand(1, 4)
scripted = torch.jit.trace(model, example_input)
scripted.save("model_scripted.pt")

# Load anywhere without Python class definition
loaded = torch.jit.load("model_scripted.pt")
out = loaded(example_input)

# ── ONNX export ───────────────────────────────────────────────
torch.onnx.export(
    model,
    example_input,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={"input": {0: "batch"}, "output": {0: "batch"}},
)

# ── torch.compile (PyTorch 2.0+) ──────────────────────────────
compiled_model = torch.compile(model)  # JIT-compiles for speed`,
          },
          {
            type: "callout",
            variant: "info",
            content:
              "ONNX is the most portable format — you can run ONNX models in TensorFlow, CoreML, TensorRT, and browser via ONNX.js. Use it when you need cross-platform deployment.",
          },
          {
            type: "quiz",
            question: "What is the advantage of TorchScript over saving state_dict?",
            options: [
              "It is smaller in file size",
              "It serialises both the model structure AND weights, so no Python class is needed to load",
              "It trains faster",
              "It only works on GPU",
            ],
            answer: 1,
            explanation:
              "TorchScript bundles the model architecture and weights together. The receiver can load and run it without access to your Python class definition.",
          },
        ],
        challenge: {
          title: "Model Deployment Checklist",
          description:
            "Print a deployment checklist for a PyTorch model. Include at least 5 steps: eval mode, no_grad inference, input normalisation, batch handling, and export format.",
          starterCode: `checklist = [
    "1. Call model.eval() before inference",
    "2. Wrap inference in torch.no_grad()",
    "3. Normalise inputs to match training distribution",
    "4. Handle variable batch sizes",
    "5. Export with TorchScript or ONNX for production",
]

print("=== PyTorch Deployment Checklist ===")
for item in checklist:
    print(item)
`,
          solutionCode: `checklist = [
    "1. Call model.eval() before inference",
    "2. Wrap inference in torch.no_grad()",
    "3. Normalise inputs to match training distribution",
    "4. Handle variable batch sizes",
    "5. Export with TorchScript or ONNX for production",
]

print("=== PyTorch Deployment Checklist ===")
for item in checklist:
    print(item)`,
          tests: [
            { id: 1, label: "Creates a checklist list", keywords: [{ pattern: "checklist\\s*=" }] },
            { id: 2, label: "Has at least 5 items", keywords: [{ pattern: "5\\." }] },
            { id: 3, label: "Prints all items", keywords: [{ pattern: "for.*checklist" }] },
          ],
        },
      },
    ],
  },
];

export const PYTORCH_CHAPTERS = RAW_PYTORCH_CHAPTERS;

export const PYTORCH_LESSONS = PYTORCH_CHAPTERS.flatMap((ch) =>
  ch.lessons.map((l) => ({
    ...l,
    chapterId: ch.id,
    chapterTitle: ch.title,
    chapterColor: ch.color,
  })),
);

export const PYTORCH_TOTAL_XP = PYTORCH_LESSONS.reduce(
  (sum, l) => sum + (l.xp || 0),
  0,
);