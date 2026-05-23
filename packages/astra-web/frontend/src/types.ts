export type ComparisonMode = "all_pairs" | "reference_file";

export type SimilarityStatus = "low" | "medium" | "high";

export interface UploadedCodeFile {
  id: string;
  name: string;
  extension: string;
  type: string;
  size: number;
  content: string;
  lastModified: number;
}

export interface AnalysisPayload {
  units: Array<{
    id: string;
    content: string;
  }>;
  threshold: number;
  comparisonMode: ComparisonMode;
  referenceFileId?: string;
}

export interface SimilarityResult {
  id: string;
  fileA: UploadedCodeFile;
  fileB: UploadedCodeFile;
  score: number;
  status: SimilarityStatus;
  highlights: {
    left: number[];
    right: number[];
  };
  findings: string[];
}
