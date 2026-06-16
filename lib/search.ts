import type { Terminology } from "./types";

const SEARCHABLE_FIELDS = ["component", "longCommonName"] as const;

export const MIN_QUERY_LENGTH = 2;
export const MAX_RESULTS = 5;

export const shouldSearch = (query: string): boolean =>
  query.trim().length >= MIN_QUERY_LENGTH;

const matchesQuery = (item: Terminology, normalizedQuery: string): boolean =>
  SEARCHABLE_FIELDS.some((field) =>
    item[field].toLowerCase().includes(normalizedQuery),
  );

const sortByPop = (a: Terminology, b: Terminology, prop: keyof Terminology): number => {
  const diff =
    new Date(b[prop]).getTime() - new Date(a[prop]).getTime();
  return diff !== 0 ? diff : a.id.localeCompare(b.id);
};

export const filterTerminologies = (
  items: readonly Terminology[],
  query: string,
): Terminology[] => {
  if (!shouldSearch(query)) return [];

  const normalizedQuery = query.trim().toLowerCase();

  return items
    .filter((item) => matchesQuery(item, normalizedQuery))
    .sort((a, b) => sortByPop(a, b, "activeSince"));
};
