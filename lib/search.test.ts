import { describe, expect, it } from "vitest";
import data from "@/data/terminologies.json";
import { filterTerminologies } from "./search";
import type { TerminologiesResponse, Terminology } from "./types";

const allTerminologies = (data as TerminologiesResponse).terminologies;

const make = (overrides: Partial<Terminology>): Terminology => ({
  id: "0000-0",
  class: "CHEM",
  component: "Component",
  longCommonName: "Long common name in Serum",
  activeSince: "2025-01-01T00:00:00Z",
  version: 2.78,
  ...overrides,
});

const fixture: Terminology[] = [
  make({ id: "A", component: "Alpha", activeSince: "2025-01-01T00:00:00Z" }),
  make({
    id: "B",
    component: "Beta",
    longCommonName: "Beta alpha-marker in Plasma",
    activeSince: "2025-03-01T00:00:00Z",
  }),
  make({ id: "C", component: "Gamma", activeSince: "2024-12-01T00:00:00Z" }),
  make({ id: "D", component: "Beta", activeSince: "2025-03-01T00:00:00Z" }),
];

describe("filterTerminologies", () => {
  it("returns nothing below two characters", () => {
    expect(filterTerminologies(fixture, "")).toEqual([]);
    expect(filterTerminologies(fixture, "a")).toEqual([]);
    expect(filterTerminologies(fixture, "  a  ")).toEqual([]);
  });

  it("matches names case-insensitively across component and long name", () => {
    expect(filterTerminologies(fixture, "alpha").map((t) => t.id)).toEqual([
      "B",
      "A",
    ]);
    expect(filterTerminologies(fixture, "ALPHA").map((t) => t.id)).toEqual([
      "B",
      "A",
    ]);
  });

  it("sorts most recent first", () => {
    expect(filterTerminologies(fixture, "beta").map((t) => t.id)).toEqual([
      "B",
      "D",
    ]);
  });

  it("does not mutate the input", () => {
    const snapshot = structuredClone(fixture);
    filterTerminologies(fixture, "beta");
    expect(fixture).toEqual(snapshot);
  });

  it("returns every troponin, most recent first", () => {
    const results = filterTerminologies(allTerminologies, "troponin");
    expect(results).toHaveLength(6);
    expect(results[0].id).toBe("89579-7");
  });
});
