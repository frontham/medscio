import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SWRConfig } from "swr";
import { afterEach, describe, expect, it, vi } from "vitest";
import data from "@/data/terminologies.json";
import { filterTerminologies, MAX_RESULTS } from "@/lib/search";
import type { TerminologiesResponse } from "@/lib/types";
import { TerminologySearch } from "./TerminologySearch";

const terminologies = (data as TerminologiesResponse).terminologies;

const stubFetch = () =>
  vi.fn((input: RequestInfo | URL) => {
    const query =
      new URL(String(input), "http://test").searchParams.get("q") ?? "";
    const matches = filterTerminologies(terminologies, query);
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          query,
          results: matches.slice(0, MAX_RESULTS),
          total: matches.length,
        }),
    } as Response);
  });

const renderSearch = () =>
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <TerminologySearch />
    </SWRConfig>,
  );

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("TerminologySearch (integration)", () => {
  it("searches as you type and shows the results", async () => {
    vi.stubGlobal("fetch", stubFetch());
    const user = userEvent.setup();
    renderSearch();

    await user.type(screen.getByTestId("search-input"), "troponin");

    expect(await screen.findByTestId("results-list")).toBeInTheDocument();
    expect(screen.getAllByTestId("result-row").length).toBeGreaterThan(0);
  });

  it("does not search below two characters", async () => {
    const fetch = stubFetch();
    vi.stubGlobal("fetch", fetch);
    const user = userEvent.setup();
    renderSearch();

    await user.type(screen.getByTestId("search-input"), "t");

    expect(screen.getByTestId("results-idle")).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("shows an error when the request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false, status: 500 } as Response)),
    );
    const user = userEvent.setup();
    renderSearch();

    await user.type(screen.getByTestId("search-input"), "troponin");

    expect(await screen.findByTestId("results-error")).toBeInTheDocument();
  });
});
