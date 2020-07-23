import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import SearchResultsEmpty from "./SearchResultsEmpty";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("SearchResultsEmpty", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(<SearchResultsEmpty />);
    expect(getByTestId("search-results-empty")).toBeInTheDocument();
  });

  it("should have correct texts", () => {
    const { getByTestId } = render(<SearchResultsEmpty />);
    expect(getByTestId("search-results-empty-query")).toHaveTextContent(
      "No results found"
    );
    expect(getByTestId("search-results-empty-message")).toHaveTextContent(
      "Please make sure your words are spelled correctly or use less or different keywords."
    );
  });

  it("should have add entity text when is present", () => {
    const { getByTestId } = render(<SearchResultsEmpty entity="tracks" />);
    expect(getByTestId("search-results-empty-query")).toHaveTextContent(
      "No tracks results found"
    );
  });
});
