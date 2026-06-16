export interface Terminology {
  id: string;
  class: string;
  component: string;
  longCommonName: string;
  activeSince: string;
  version: number;
}

export interface TerminologiesResponse {
  terminologies: Terminology[];
}

export interface TerminologySearchResponse {
  query: string;
  results: Terminology[];
  total: number;
}
