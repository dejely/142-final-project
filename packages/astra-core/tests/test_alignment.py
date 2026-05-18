from astra_core.domain.models import ASTChunk
from astra_core.pipeline.alignment import compare_chunk_sequences


def test_compare_chunk_sequences_identical_inputs_perfect_score() -> None:
    chunks = [ASTChunk(index=0, kind="FunctionDef", tokens=("A", "B", "C"))]

    score, evidence = compare_chunk_sequences(chunks, chunks)

    assert score == 1.0
    assert len(evidence) == 1
    assert evidence[0].similarity == 1.0


def test_compare_chunk_sequences_empty_inputs_returns_perfect_score() -> None:
    score, evidence = compare_chunk_sequences([], [])

    assert score == 1.0
    assert evidence == ()


def test_compare_chunk_sequences_score_is_bounded() -> None:
    left = [ASTChunk(index=0, kind="Expr", tokens=("A", "B"))]
    right = [ASTChunk(index=0, kind="Expr", tokens=("B", "A"))]

    score, _ = compare_chunk_sequences(left, right)

    assert 0.0 <= score <= 1.0


def test_compare_chunk_sequences_non_identical_inputs_not_perfect() -> None:
    left = [ASTChunk(index=0, kind="Expr", tokens=("A", "B"))]
    right = [ASTChunk(index=0, kind="Expr", tokens=("A", "C"))]

    score, _ = compare_chunk_sequences(left, right)

    assert score < 1.0


def test_compare_chunk_sequences_is_symmetric() -> None:
    left = [ASTChunk(index=0, kind="Expr", tokens=("A", "B"))]
    right = [ASTChunk(index=0, kind="Expr", tokens=("B", "A"))]

    score_lr, _ = compare_chunk_sequences(left, right)
    score_rl, _ = compare_chunk_sequences(right, left)

    assert score_lr == score_rl


def test_compare_chunk_sequences_evidence_matches_chunk_counts() -> None:
    left = [
        ASTChunk(index=0, kind="Expr", tokens=("A", "B")),
        ASTChunk(index=1, kind="Expr", tokens=("C", "D")),
    ]
    right = [
        ASTChunk(index=0, kind="Expr", tokens=("A", "B")),
        ASTChunk(index=1, kind="Expr", tokens=("C", "D")),
    ]

    _, evidence = compare_chunk_sequences(left, right)

    assert len(evidence) <= max(len(left), len(right))


def test_compare_chunk_sequences_evidence_contains_valid_kinds() -> None:
    left = [ASTChunk(index=0, kind="FunctionDef", tokens=("A", "B"))]
    right = [ASTChunk(index=0, kind="FunctionDef", tokens=("B", "A"))]

    _, evidence = compare_chunk_sequences(left, right)

    assert evidence[0].left_kind == "FunctionDef"
    assert evidence[0].right_kind == "FunctionDef"


def test_compare_chunk_sequences_detects_reordered_tokens() -> None:
    left = [ASTChunk(index=0, kind="Expr", tokens=("A", "B"))]
    right = [ASTChunk(index=0, kind="Expr", tokens=("B", "A"))]

    score, evidence = compare_chunk_sequences(left, right)

    assert score < 1.0
    assert evidence[0].distance >= 0
