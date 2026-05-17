from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

from astra_core import CodeUnit, analyze_code_similarity

app = FastAPI(title="ASTRA API")


class CodeUnitRequest(BaseModel):
    id: str
    content: str


class AnalyzeRequest(BaseModel):
    units: List[CodeUnitRequest]
    threshold: float = 0.8


@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    units = [CodeUnit(id=u.id, content=u.content) for u in req.units]

    result = analyze_code_similarity(
        units=units,
        threshold=req.threshold,
    )

    return result
