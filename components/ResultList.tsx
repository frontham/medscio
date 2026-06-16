import type { Terminology } from "@/lib/types";
import { TerminologyRow } from "./TerminologyRow";

interface ResultListProps {
  query: string;
  results: Terminology[];
  total: number;
}

export const ResultList = ({ query, results, total }: ResultListProps) => (
  <>
    <div className="flex items-center justify-between gap-3 px-1 pb-3">
      <p className="text-sm text-body">
        Showing <span className="font-semibold text-ink">{results.length}</span>{" "}
        of <span className="font-semibold text-ink">{total}</span>
      </p>
      <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-accent">
        Most recent first
      </p>
    </div>
    <ul data-testid="results-list" className="space-y-3">
      {results.map((terminology, index) => (
        <TerminologyRow
          key={terminology.id}
          terminology={terminology}
          index={index}
          query={query}
        />
      ))}
    </ul>
  </>
);
