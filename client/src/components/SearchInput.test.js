import React from "react";
import { render, cleanup, fireEvent } from "../utils/test-utils";
import "jest-dom/extend-expect";

import SearchInput from "./SearchInput";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const searchSpy = jest.fn();

describe("SearchInput", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(
      <SearchInput queryTerm="" search={searchSpy} />
    );
    const searchInput = getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Start typing here...");
    expect(searchInput).toHaveAttribute("value", "");
  });

  it("when changes should set token and search for tracks and artists", () => {
    const { getByTestId } = render(
      <SearchInput queryTerm="" search={searchSpy} />
    );
    const searchInput = getByTestId("search-input");
    fireEvent.change(searchInput, { target: { value: "Imagine Dragons" } });
    expect(searchInput).toHaveAttribute("value", "Imagine Dragons");
    fireEvent.click(getByTestId("search-submit-button"));
    expect(searchSpy).toBeCalledWith("Imagine Dragons");
  });
});
