import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import NotFoundPage from "./NotFoundPage";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("NotFoundPage", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(<NotFoundPage />);
    expect(getByTestId("not-found-page")).toBeInTheDocument();
  });

  it("should contains one <ErrorContent /> component with correct message", () => {
    const { getByTestId } = render(<NotFoundPage />);
    expect(getByTestId("error-content")).toBeInTheDocument();
    expect(getByTestId("error-content-message")).toHaveTextContent(
      "We can not seem to find the page that you are looking for."
    );
  });
});
