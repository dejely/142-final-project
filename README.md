# ASTRA

ASTRA is a Python-based system for detecting structural similarity between code samples using AST normalization and sequence alignment techniques.

## Project Structure

```
packages/
  astra-core/      # core similarity engine
  astra-cli/       # command-line interface
  astra-web/       # web service
```

## Setup

### Install uv

```bash
pip install uv
```

---

### Install dependencies

```bash
uv sync
```

### Run CLI

```bash
uv run astra analyze file1.py file2.py
```

### Run Web

```bash
uv run uvicorn astra_web.main:app --reload
```

## Core API

```python
from astra_core import analyze_code_similarity, CodeUnit

result = analyze_code_similarity([
    CodeUnit(id="a.py", content="..."),
    CodeUnit(id="b.py", content="...")
])
```
