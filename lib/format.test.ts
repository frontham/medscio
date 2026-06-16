import { describe, expect, it } from "vitest";
import { formatActiveDate, formatActiveTime } from "./format";

describe("date formatting", () => {
  it("formats the date in UTC", () => {
    expect(formatActiveDate("2025-06-12T17:05:00Z")).toBe("12 Jun 2025");
  });

  it("formats the time in 24-hour UTC", () => {
    expect(formatActiveTime("2025-06-12T17:05:00Z")).toBe("17:05");
  });

  it("returns an empty string for an invalid value", () => {
    expect(formatActiveDate("nope")).toBe("");
    expect(formatActiveTime("nope")).toBe("");
  });
});
