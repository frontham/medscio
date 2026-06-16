import { describe, expect, it } from "vitest";
import { splitOnMatch } from "./highlight";

describe("splitOnMatch", () => {
  it("flags the matching part case-insensitively, preserving original case", () => {
    expect(splitOnMatch("Troponin", "tr")).toEqual([
      { value: "Tr", match: true },
      { value: "oponin", match: false },
    ]);
  });

  it("highlights every occurrence", () => {
    expect(splitOnMatch("trotr", "tr")).toEqual([
      { value: "tr", match: true },
      { value: "o", match: false },
      { value: "tr", match: true },
    ]);
  });

  it("returns the whole string when nothing matches", () => {
    expect(splitOnMatch("Hemoglobin", "xyz")).toEqual([
      { value: "Hemoglobin", match: false },
    ]);
  });
});
