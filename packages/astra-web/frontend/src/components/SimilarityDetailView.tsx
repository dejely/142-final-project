import { CheckCircle2, Columns2, X } from "lucide-react";
import { SimilarityResult, UploadedCodeFile } from "../types";
import { StatusBadge } from "./ResultsTable";

interface SimilarityDetailViewProps {
  result: SimilarityResult;
  onClose: () => void;
}

export function SimilarityDetailView({
  result,
  onClose
}: SimilarityDetailViewProps) {
  return (
    <section className="panel detail-panel" aria-label="Similarity details">
      <div className="detail-header">
        <div>
          <p className="eyebrow">Similarity detail</p>
          <h2>{Math.round(result.score * 100)}% match</h2>
          <div className="detail-meta">
            <span>{result.fileA.name}</span>
            <Columns2 size={15} />
            <span>{result.fileB.name}</span>
            <StatusBadge status={result.status} />
          </div>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label="Close detail view"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>

      <div className="finding-row" aria-label="Similarity findings">
        {result.findings.map((finding) => (
          <span key={finding}>
            <CheckCircle2 size={16} />
            {finding}
          </span>
        ))}
      </div>

      <div className="code-split">
        <CodePane
          title={result.fileA.name}
          file={result.fileA}
          highlightedLines={result.highlights.left}
        />
        <CodePane
          title={result.fileB.name}
          file={result.fileB}
          highlightedLines={result.highlights.right}
        />
      </div>
    </section>
  );
}

function CodePane({
  title,
  file,
  highlightedLines
}: {
  title: string;
  file: UploadedCodeFile;
  highlightedLines: number[];
}) {
  const lines = ensureDisplayLines(file);
  const highlightSet = new Set(highlightedLines);

  return (
    <article className="code-pane">
      <header>
        <strong>{title}</strong>
        <span>{file.extension}</span>
      </header>
      <pre>
        {lines.map((line, index) => {
          const lineNumber = index + 1;
          const isHighlighted = highlightSet.has(lineNumber);

          return (
            <code
              className={isHighlighted ? "is-highlighted" : ""}
              key={`${file.id}-${lineNumber}`}
            >
              <span className="line-number">{lineNumber}</span>
              <span className="line-code">{line || " "}</span>
            </code>
          );
        })}
      </pre>
    </article>
  );
}

function ensureDisplayLines(file: UploadedCodeFile): string[] {
  const realLines = file.content.split(/\r?\n/);
  if (realLines.length > 1 || realLines[0]?.trim()) {
    return realLines;
  }

  return [
    `// ${file.name}`,
    "function normalizeSubmission(input) {",
    "  const tokens = tokenize(input);",
    "  const cleaned = tokens.filter(Boolean);",
    "  return cleaned.map((token) => token.toLowerCase());",
    "}",
    "",
    "export function compareSubmission(source, target) {",
    "  return normalizeSubmission(source).join('|') ===",
    "    normalizeSubmission(target).join('|');",
    "}"
  ];
}
