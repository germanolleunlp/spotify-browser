import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import Welcome from "./Welcome";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Welcome", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(<Welcome />);
    expect(getByTestId("welcome")).toBeInTheDocument();
  });

  it("should have correct texts", () => {
    const { getByTestId } = render(<Welcome />);
    expect(getByTestId("welcome-title")).toHaveTextContent(
      "Looking for music?"
    );
    expect(getByTestId("welcome-subtitle")).toHaveTextContent(
      "Find your favorite tracks and artists."
    );
  });
});
