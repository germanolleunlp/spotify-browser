import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import SearchContent from "./SearchContent";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("SearchContent", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(<SearchContent />);
    expect(getByTestId("search-content")).toBeInTheDocument();
  });

  it("should contains correct message initially", () => {
    const { getByTestId } = render(<SearchContent />);
    expect(getByTestId("search-message")).toHaveTextContent(
      "What are you waiting for? Click GO! :)"
    );
  });
});
