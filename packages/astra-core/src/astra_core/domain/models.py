from dataclasses import dataclass
from typing import Dict, Any, List


@dataclass(frozen=True)
class CodeUnit:
    id: str
    content: str


@dataclass(frozen=True)
class SimilarityScore:
    unit_a: str
    unit_b: str
    score: float


@dataclass(frozen=True)
class AnalysisReport:
    threshold: float
    total_units: int
    scores: List[SimilarityScore]
    flagged_pairs: List[SimilarityScore]
    metadata: Dict[str, Any]
