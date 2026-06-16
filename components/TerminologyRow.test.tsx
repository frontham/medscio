import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Terminology } from "@/lib/types";
import { TerminologyRow } from "./TerminologyRow";

const terminology: Terminology = {
  id: "89579-7",
  class: "CHEM",
  component: "Troponin I.cardiac",
  longCommonName:
    "Troponin I.cardiac [Mass/volume] in Serum or Plasma by High sensitivity method",
  activeSince: "2025-06-12T17:05:00Z",
  version: 2.78,
};

describe("TerminologyRow", () => {
  it("expands and collapses the card on click", async () => {
    const user = userEvent.setup();
    render(
      <ul>
        <TerminologyRow terminology={terminology} index={0} query="tro" />
      </ul>,
    );

    const row = screen.getByTestId("result-row");
    expect(row).toHaveAttribute("aria-expanded", "false");

    await user.click(row);
    expect(row).toHaveAttribute("aria-expanded", "true");

    await user.click(row);
    expect(row).toHaveAttribute("aria-expanded", "false");
  });
});
