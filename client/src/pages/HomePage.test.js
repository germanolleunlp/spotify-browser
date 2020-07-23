import React from "react";
import { render, cleanup, fireEvent } from "../utils/test-utils";
import "jest-dom/extend-expect";

import { getSpy } from "axios";

import { REACT_APP_API_VERSION } from "../constants";

import TokenStorage, { hasTokenSpy } from "../TokenStorage";
jest.mock("../TokenStorage");

import { HomePage } from "./HomePage";

beforeEach(() => {
  TokenStorage.mockClear();
  hasTokenSpy.mockClear();
  getSpy.mockClear();
});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("HomePage", () => {
  it("should call to get link when there is not token", () => {
    hasTokenSpy.mockReturnValue(false);
    const { getByTestId } = render(<HomePage />);
    expect(getByTestId("home-page")).toBeInTheDocument();
    const loginLink = getByTestId("login-link");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveTextContent("Login");
    fireEvent.click(loginLink);
    expect(getSpy).toBeCalledWith(`api/${REACT_APP_API_VERSION}/login`);
  });

  it("should contains one <Loader /> while is loading", () => {
    const { getByTestId } = render(<HomePage isLoading={true} />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should contains one <Loader /> while is logging in", () => {
    const { getByTestId } = render(<HomePage />);
    fireEvent.click(getByTestId("login-link"));
    expect(getByTestId("loader")).toBeInTheDocument();
  });
});
