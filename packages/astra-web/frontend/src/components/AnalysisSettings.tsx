import { Play, SlidersHorizontal } from "lucide-react";
import { ComparisonMode, UploadedCodeFile } from "../types";

interface AnalysisSettingsProps {
  files: UploadedCodeFile[];
  comparisonMode: ComparisonMode;
  threshold: number;
  referenceFileId: string;
  isAnalyzing: boolean;
  onModeChange: (mode: ComparisonMode) => void;
  onThresholdChange: (threshold: number) => void;
  onReferenceFileChange: (fileId: string) => void;
  onStart: () => void;
}

export function AnalysisSettings({
  files,
  comparisonMode,
  threshold,
  referenceFileId,
  isAnalyzing,
  onModeChange,
  onThresholdChange,
  onReferenceFileChange,
  onStart
}: AnalysisSettingsProps) {
  const canStart =
    files.length >= 2 &&
    (!isAnalyzing || files.length >= 2) &&
    (comparisonMode === "all_pairs" || Boolean(referenceFileId));

  return (
    <section className="panel settings-panel" id="settings-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Analysis setup</p>
          <h2>Comparison settings</h2>
        </div>
        <SlidersHorizontal size={21} />
      </div>

      <div className="mode-grid" role="radiogroup" aria-label="Comparison mode">
        <button
          type="button"
          className={`mode-card ${
            comparisonMode === "all_pairs" ? "is-selected" : ""
          }`}
          onClick={() => onModeChange("all_pairs")}
          role="radio"
          aria-checked={comparisonMode === "all_pairs"}
        >
          <span>All-Pairs Comparison</span>
          <p>Compare every uploaded file against every other file.</p>
          <small>A vs B, A vs C, B vs C</small>
        </button>

        <button
          type="button"
          className={`mode-card ${
            comparisonMode === "reference_file" ? "is-selected" : ""
          }`}
          onClick={() => onModeChange("reference_file")}
          role="radio"
          aria-checked={comparisonMode === "reference_file"}
        >
          <span>Reference File Comparison</span>
          <p>Choose one main file and compare all other files against it.</p>
          <small>Main file vs Submission 1, Main file vs Submission 2</small>
        </button>
      </div>

      {comparisonMode === "reference_file" ? (
        <label className="field-label" htmlFor="reference-file">
          Reference file
          <select
            id="reference-file"
            value={referenceFileId}
            onChange={(event) => onReferenceFileChange(event.target.value)}
            disabled={files.length === 0}
          >
            {files.length === 0 ? (
              <option value="">Upload files first</option>
            ) : (
              files.map((file) => (
                <option key={file.id} value={file.id}>
                  {file.name}
                </option>
              ))
            )}
          </select>
        </label>
      ) : null}

      <div className="threshold-block">
        <div className="threshold-header">
          <label htmlFor="threshold-range">Similarity Threshold</label>
          <input
            id="threshold-number"
            className="threshold-number"
            type="number"
            min={0}
            max={1}
            step={0.01}
            value={threshold.toFixed(2)}
            onChange={(event) =>
              onThresholdChange(clampThreshold(Number(event.target.value)))
            }
            aria-label="Similarity threshold number"
          />
        </div>
        <input
          id="threshold-range"
          className="threshold-range"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={threshold}
          onChange={(event) => onThresholdChange(Number(event.target.value))}
        />
        <p>Pairs above this score will be flagged as potentially similar.</p>
      </div>

      <button
        className="primary-action"
        type="button"
        disabled={!canStart || isAnalyzing}
        onClick={onStart}
      >
        <Play size={18} fill="currentColor" />
        {isAnalyzing ? "Running analysis..." : "Start Similarity Check"}
      </button>
    </section>
  );
}

function clampThreshold(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(1, Math.max(0, value));
}
