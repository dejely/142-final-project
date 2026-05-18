# astra

A system for detecting structural similarity between programming assignments using AST normalization and Damerau–Levenshtein sequence alignment.

Astra is designed for academic use in programming courses to identify potential plagiarism cases where students modify code superficially (renaming variables, reformatting, or minor structural edits) while preserving underlying logic.

## Features

- AST-based normalization using Python built-in `ast` module
- Structural chunking of code
- Deterministic AST-to-token conversion (preorder traversal)
- Damerau–Levenshtein dynamic programming similarity engine
- Chunk-level alignment with best-match pairing
- File-level similarity aggregation
- Ranked similarity reports with threshold-based flagging
- Optional detailed alignment evidence for interpretation

## Usage

### Core API

```python
from astra_core import analyze_code_similarity, CodeUnit

result = analyze_code_similarity([
    CodeUnit(id="a.py", content="def add(x, y): return x + y"),
    CodeUnit(id="b.py", content="def add(a, b): return a + b"),
])
```

## Development

### Requirements

- Python 3.10+
- uv

### Install dependencies

```bash
uv sync
```

### Run tests

```bash
uv run pytest
```

## Project Structure

```
packages/
  astra-core/      # core similarity engine (main logic)
  astra-cli/       # CLI wrapper
  astra-web/       # web service
```
