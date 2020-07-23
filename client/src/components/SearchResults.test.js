import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import SearchResults from "./SearchResults";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("SearchResults", () => {
  it("should have render tracks and artists based on results", () => {
    const { getByTestId } = render(<SearchResults />);
    expect(getByTestId("artists")).toBeInTheDocument();
    expect(getByTestId("tracks")).toBeInTheDocument();
  });
});
