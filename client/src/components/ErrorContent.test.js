import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import Box from "@material-ui/core/Box";

import ErrorContent from "./ErrorContent";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("ErrorContent", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(
      <ErrorContent message="Some kind of error" />
    );
    expect(getByTestId("error-icon")).toBeInTheDocument();
    expect(getByTestId("error-title")).toHaveTextContent("Ops!");
    expect(getByTestId("error-content-message")).toHaveTextContent(
      "Some kind of error"
    );
  });

  it("should renders any child inside", () => {
    const { getByTestId } = render(
      <ErrorContent message="Some kind of error">
        <Box data-testid="extra-error-content">Extra error content</Box>
      </ErrorContent>
    );
    expect(getByTestId("extra-error-content")).toBeInTheDocument();
  });
});
