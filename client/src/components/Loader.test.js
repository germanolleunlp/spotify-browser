import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import Loader from "./Loader";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Loader", () => {
  it("should be visible", () => {
    const { getByTestId } = render(<Loader />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });
});
