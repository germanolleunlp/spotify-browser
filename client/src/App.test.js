import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";

import App from "./App";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("App", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("main-container")).toBeInTheDocument();
  });

  it("should contains one <LogoIcon /> component", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("logo-icon")).toBeInTheDocument();
  });

  it("should contains one <Welcome /> component", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("welcome")).toBeInTheDocument();
  });

  it("should show <HomePage /> component", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("home-page")).toBeInTheDocument();
  });
});
