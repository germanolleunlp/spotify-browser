import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import LogoIcon from "./LogoIcon";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("LogoIcon", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(<LogoIcon />);
    expect(getByTestId("logo-icon")).toBeInTheDocument();
  });

  it("should have default props", () => {
    const { getByTestId } = render(<LogoIcon />);
    const logoIcon = getByTestId("logo-icon");
    expect(logoIcon).toHaveAttribute("width");
    expect(logoIcon).toHaveAttribute("height");
    expect(logoIcon).toHaveAttribute("color");
  });
});
