"use client";

import { useId, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useTerminologySearch } from "@/hooks/useTerminologySearch";
import { SearchField } from "./SearchField";
import { TerminologyResults } from "./TerminologyResults";

export const TerminologySearch = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);

  const { data, error, isLoading, mutate } =
    useTerminologySearch(debouncedQuery);

  const fieldId = useId();

  return (
    <section className="rounded-2xl border border-line bg-canvas p-8 shadow-[0_2px_8px_rgba(21,52,61,0.06)]">
      <SearchField id={fieldId} value={query} onChange={setQuery} isLoading={isLoading} />
      <div className="mt-6 border-t border-line pt-4">
        <TerminologyResults
          query={debouncedQuery}
          results={data?.results ?? []}
          total={data?.total ?? 0}
          isLoading={isLoading}
          error={error ? error.message : null}
          retry={() => {
            void mutate();
          }}
        />
      </div>
    </section>
  );
};
