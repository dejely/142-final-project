import { Play } from "lucide-react";
import { UploadedCodeFile } from "../types";

interface AnalysisSettingsProps {
  files: UploadedCodeFile[];
  threshold: number;
  isAnalyzing: boolean;
  onThresholdChange: (threshold: number) => void;
  onStart: () => void;
}

export function AnalysisSettings({
  files,
  threshold,
  isAnalyzing,
  onThresholdChange,
  onStart
}: AnalysisSettingsProps) {
  const canStart = files.length >= 2 && !isAnalyzing;

  return (
    <section className="panel settings-panel" id="settings-section">
      <div className="section-heading">
        <div>
          <h2>Run check</h2>
          <p>All uploaded files are compared against each other.</p>
        </div>
      </div>

      <div className="threshold-block">
        <div className="threshold-header">
          <label htmlFor="threshold-range">Flag threshold</label>
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
      </div>

      <button
        className="primary-action"
        type="button"
        disabled={!canStart || isAnalyzing}
        onClick={onStart}
      >
        <Play size={18} fill="currentColor" />
        {isAnalyzing ? "Checking..." : "Compare all pairs"}
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
