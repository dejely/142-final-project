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

### CLI

Install the workspace dependencies first:

```bash
uv sync
```

Run ASTRA against two or more Python files:

```bash
uv run --package astra-cli astra path/to/file_a.py path/to/file_b.py
```

Example using files already in this repository:

```bash
uv run --package astra-cli astra packages/astra-core/tests/test_distance.py packages/astra-core/tests/test_alignment.py
```

The CLI prints a similarity report with the configured threshold, number of files,
compared pairs, flagged pairs, and top scores.

Common options:

```bash
uv run --package astra-cli astra file_a.py file_b.py --threshold 0.9
uv run --package astra-cli astra file_a.py file_b.py --top 5
uv run --package astra-cli astra file_a.py file_b.py --json
```

- `--threshold` sets the minimum score for a pair to be flagged. It must be
  between `0.0` and `1.0`.
- `--top` controls how many top pair scores are shown in text output.
- `--json` prints the full report, including detailed evidence, as JSON.

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

- Python 3.11+
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
