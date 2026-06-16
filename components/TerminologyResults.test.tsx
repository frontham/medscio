import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Terminology } from "@/lib/types";
import { TerminologyResults } from "./TerminologyResults";

const sample: Terminology[] = [
  {
    id: "89579-7",
    class: "CHEM",
    component: "Troponin I.cardiac",
    longCommonName: "Troponin I.cardiac [Mass/volume] in Serum or Plasma",
    activeSince: "2025-09-12T12:33:00Z",
    version: 2.78,
  },
  {
    id: "89575-5",
    class: "CHEM",
    component: "Troponin T.cardiac",
    longCommonName: "Troponin T.cardiac [Interpretation] in Serum or Plasma",
    activeSince: "2025-06-12T17:05:00Z",
    version: 2.78,
  },
];

const base = {
  query: "troponin",
  results: [] as Terminology[],
  total: 0,
  isLoading: false,
  error: null as string | null,
  retry: () => {},
};

describe("TerminologyResults", () => {
  it("prompts to keep typing below two characters", () => {
    render(<TerminologyResults {...base} query="t" />);
    expect(screen.getByTestId("results-idle")).toBeInTheDocument();
  });

  it("shows a skeleton while loading", () => {
    render(<TerminologyResults {...base} isLoading />);
    expect(screen.getByTestId("results-skeleton")).toBeInTheDocument();
  });

  it("shows the error message and calls retry", async () => {
    const retry = vi.fn();
    render(<TerminologyResults {...base} error="Service down" retry={retry} />);

    expect(screen.getByTestId("results-error")).toHaveTextContent("Service down");
    await userEvent.setup().click(screen.getByTestId("retry"));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("shows the empty state when nothing matches", () => {
    render(<TerminologyResults {...base} />);
    expect(screen.getByTestId("results-empty")).toBeInTheDocument();
  });

  it("lists the results", () => {
    render(<TerminologyResults {...base} results={sample} total={6} />);

    const rows = screen.getAllByTestId("result-row");
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByTestId("result-id")).toHaveTextContent("89579-7");
  });
});
