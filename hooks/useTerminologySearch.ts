import useSWR from "swr";
import { shouldSearch } from "@/lib/search";
import type { TerminologySearchResponse } from "@/lib/types";

const fetcher = async (url: string): Promise<TerminologySearchResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not search tests (${response.status}).`);
  }
  return response.json() as Promise<TerminologySearchResponse>;
};

export const useTerminologySearch = (query: string) => {
  const key = shouldSearch(query)
    ? `/api/terminologies?q=${encodeURIComponent(query)}`
    : null;

  return useSWR<TerminologySearchResponse, Error>(key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });
};
