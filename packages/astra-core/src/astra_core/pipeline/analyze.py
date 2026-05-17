from typing import List

from ..domain.models import CodeUnit, AnalysisReport, SimilarityScore


def analyze_code_similarity(
    units: List[CodeUnit],
    threshold: float = 0.8,
) -> AnalysisReport:
    scores = []

    # naive pair generation (stub logic)
    for i in range(len(units)):
        for j in range(i + 1, len(units)):
            scores.append(
                SimilarityScore(
                    unit_a=units[i].id,
                    unit_b=units[j].id,
                    score=0.0,  # placeholder
                )
            )

    flagged = [s for s in scores if s.score >= threshold]

    return AnalysisReport(
        threshold=threshold,
        total_units=len(units),
        scores=scores,
        flagged_pairs=flagged,
        metadata={},
    )
