import { AlertTriangle, Files, GitCompareArrows, TrendingUp } from "lucide-react";
import { SimilarityResult } from "../types";

interface ResultsSummaryProps {
  totalFiles: number;
  threshold: number;
  results: SimilarityResult[];
}

export function ResultsSummary({
  totalFiles,
  threshold,
  results
}: ResultsSummaryProps) {
  const highestScore = results.reduce(
    (highest, result) => Math.max(highest, result.score),
    0
  );
  const flaggedCount = results.filter((result) => result.score >= threshold).length;
  const metrics = [
    {
      label: "Total Files",
      value: totalFiles.toString(),
      helper: "Uploaded submissions",
      icon: Files
    },
    {
      label: "Comparisons Made",
      value: results.length.toString(),
      helper: "Generated pairs",
      icon: GitCompareArrows
    },
    {
      label: "Flagged Matches",
      value: flaggedCount.toString(),
      helper: `Threshold ${Math.round(threshold * 100)}%`,
      icon: AlertTriangle
    },
    {
      label: "Highest Similarity Score",
      value: `${Math.round(highestScore * 100)}%`,
      helper: "Top result",
      icon: TrendingUp
    }
  ];

  return (
    <div className="summary-grid" aria-label="Analysis summary">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <article className="summary-card" key={metric.label}>
            <div className="summary-icon" aria-hidden="true">
              <Icon size={20} />
            </div>
            <div>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              <span>{metric.helper}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
