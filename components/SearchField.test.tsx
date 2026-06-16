import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("calls onChange as the user types", async () => {
    const onChange = vi.fn();
    render(<SearchField id="q" value="" onChange={onChange} />);

    await userEvent.setup().type(screen.getByTestId("search-input"), "t");
    expect(onChange).toHaveBeenCalledWith("t");
  });

  it("clears the value via the clear button", async () => {
    const onChange = vi.fn();
    render(<SearchField id="q" value="troponin" onChange={onChange} />);

    await userEvent.setup().click(screen.getByTestId("search-clear"));
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("hides the clear button while loading", () => {
    render(<SearchField id="q" value="troponin" onChange={() => {}} isLoading />);
    expect(screen.queryByTestId("search-clear")).not.toBeInTheDocument();
  });
});
