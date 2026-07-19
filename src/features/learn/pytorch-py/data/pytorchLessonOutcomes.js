// Plain-English learning outcomes per PyTorch lesson (shown at top of theory view).

export const PYTORCH_LESSON_OUTCOMES = {
  "pytorch-0": [
    "Say what PyTorch is and why people use it for deep learning",
    "Import `torch` and recognize a tensor as PyTorch's main data container",
    "Spot real apps where neural networks help (photos, text, recommendations)",
  ],
  "pytorch-1": [
    "Compare a NumPy array with a PyTorch tensor in plain words",
    "Know when tensors add GPU support and automatic gradients",
    "Move between familiar NumPy habits and PyTorch basics",
  ],
  "pytorch-2": [
    "Create your first tensor with `torch.tensor()`",
    "Print shape and dtype to inspect a tensor",
    "Do simple math on tensors like adding a number to every value",
  ],
  "pytorch-3": [
    "Build tensors from Python lists with `torch.tensor()`",
    "Create 2D tensors (small tables of numbers)",
    "Check `.shape` to read rows and columns",
  ],
  "pytorch-4": [
    "Make tensors full of zeros or ones with `torch.zeros` and `torch.ones`",
    "Fill tensors with random numbers using `torch.rand`",
    "Pick the right factory function for the job",
  ],
  "pytorch-5": [
    "Read a tensor's shape, dtype, and device",
    "Choose float vs integer dtypes on purpose",
    "Move a tensor to CPU or GPU with `.to(device)`",
  ],
  "pytorch-6": [
    "Convert NumPy arrays to tensors with `torch.from_numpy`",
    "Send tensors back to NumPy with `.numpy()` on CPU tensors",
    "Avoid surprises when NumPy and PyTorch share memory",
  ],
  "pytorch-7": [
    "Add, multiply, and divide tensors element-wise",
    "Use `.sum()` and `.mean()` to reduce a tensor to one number",
    "Combine tensors with matching shapes",
  ],
  "pytorch-8": [
    "Explain broadcasting in simple terms",
    "Add a row vector to every row of a matrix without loops",
    "Spot shape errors before they crash your code",
  ],
  "pytorch-9": [
    "Slice 1D and 2D tensors like NumPy arrays",
    "Pick rows, columns, and ranges with `[` `]` indexing",
    "Use negative indexes to count from the end",
  ],
  "pytorch-10": [
    "Turn on gradient tracking with `requires_grad=True`",
    "See `.grad` after calling `.backward()`",
    "Know which tensors need gradients for training",
  ],
  "pytorch-11": [
    "Call `.backward()` on a scalar loss to compute gradients",
    "Update weights manually with `.grad` (conceptual step)",
    "Understand the chain rule idea in one training step",
  ],
  "pytorch-12": [
    "Use `torch.no_grad()` when you do not need gradients",
    "Detach tensors with `.detach()` for inference or logging",
    "Save memory and speed during evaluation",
  ],
  "pytorch-13": [
    "Subclass `nn.Module` to define a small neural network",
    "Implement `forward()` to describe the computation",
    "Inspect parameters with `.parameters()`",
  ],
  "pytorch-14": [
    "Use `nn.Linear` for a fully connected layer",
    "Match input features and output size correctly",
    "Pass a tensor through a layer and read the output shape",
  ],
  "pytorch-15": [
    "Apply ReLU to introduce non-linearity",
    "Know why activations help models learn curves, not just lines",
    "Stack Linear + ReLU blocks in `forward()`",
  ],
  "pytorch-16": [
    "Pick a loss function like `MSELoss` or `CrossEntropyLoss`",
    "Compute loss between predictions and targets",
    "Treat loss as the number the model tries to minimize",
  ],
  "pytorch-17": [
    "Run one forward pass, compute loss, call backward, and step an optimizer",
    "Zero gradients with `optimizer.zero_grad()` before each step",
    "See the full training micro-loop in code",
  ],
  "pytorch-18": [
    "Wrap samples in a `Dataset` class",
    "Batch data with `DataLoader` for efficient training",
    "Loop over batches instead of one sample at a time",
  ],
  "pytorch-19": [
    "Write a tiny training loop over several epochs",
    "Print loss each epoch to watch learning",
    "Keep models and data small for fast experiments",
  ],
  "pytorch-20": [
    "Use `nn.Conv2d` for image-like inputs",
    "Understand channels, kernel size, and spatial dimensions at a high level",
    "Build a minimal CNN block for classification",
  ],
  "pytorch-21": [
    "Save model weights with `torch.save` and `state_dict`",
    "Load weights back into a matching model architecture",
    "Share or resume training from a checkpoint file",
  ],
  "pytorch-22": [
    "Check `torch.cuda.is_available()` before using a GPU",
    "Move models and tensors with `.to(device)`",
    "Follow simple tips to avoid CPU/GPU mismatches",
  ],
  "pytorch-23": [
    "Combine tensors, layers, loss, and a loop into a mini classifier",
    "Train on synthetic or tiny data end-to-end",
    "Read predictions after training",
  ],
  "pytorch-24": [
    "Review core PyTorch vocabulary from tensors to training",
    "Use a cheat sheet of common imports and patterns",
    "Plan your next steps after this course",
  ],
};
