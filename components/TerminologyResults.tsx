import { MIN_QUERY_LENGTH, shouldSearch } from "@/lib/search";
import type { Terminology } from "@/lib/types";
import { SearchIcon, SearchOffIcon } from "./icons";
import { ResultList } from "./ResultList";
import { ResultsError } from "./ResultsError";
import { ResultsSkeleton } from "./ResultsSkeleton";
import { StateMessage } from "./StateMessage";

interface TerminologyResultsProps {
  query: string;
  results: Terminology[];
  total: number;
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export const TerminologyResults = ({
  query,
  results,
  total,
  isLoading,
  error,
  retry,
}: TerminologyResultsProps) => {
  if (!shouldSearch(query)) {
    return (
      <StateMessage
        testId="results-idle"
        icon={<SearchIcon />}
        title="Start typing to search"
      >
        Enter at least {MIN_QUERY_LENGTH} characters to find matching tests.
      </StateMessage>
    );
  }

  if (isLoading) {
    return <ResultsSkeleton />;
  }

  if (error) {
    return <ResultsError message={error} onRetry={retry} />;
  }

  if (results.length === 0) {
    return (
      <StateMessage
        testId="results-empty"
        icon={<SearchOffIcon />}
        title="No matching tests"
      >
        Nothing matches{" "}
        <span className="font-medium text-ink">{query}</span>. Try a different
        term.
      </StateMessage>
    );
  }

  return <ResultList query={query} results={results} total={total} />;
};
