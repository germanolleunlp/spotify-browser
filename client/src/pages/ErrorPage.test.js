import React from "react";
import { render, cleanup, fireEvent } from "../utils/test-utils";
import "jest-dom/extend-expect";

import TokenStorage, { hasTokenSpy, isTokenExpiredSpy } from "../TokenStorage";
jest.mock("../TokenStorage");

import {
  ACCESS_DENIED_ERROR_CODE,
  INVALID_OR_EXPIRED_ACCESS_TOKEN_ERROR_CODE,
} from "../errors";

import { ErrorPage } from "./ErrorPage";

beforeEach(() => {
  TokenStorage.mockClear();
  hasTokenSpy.mockClear();
  isTokenExpiredSpy.mockClear();
});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const accessDeniedError = {
  code: ACCESS_DENIED_ERROR_CODE,
  message: "Access denied",
};

const invalidTokenError = {
  code: INVALID_OR_EXPIRED_ACCESS_TOKEN_ERROR_CODE,
  message: "Invalid token",
};

describe("ErrorPage", () => {
  it("should renders without crashing", () => {
    const { getByTestId } = render(<ErrorPage error={accessDeniedError} />);
    expect(getByTestId("error-page")).toBeInTheDocument();
  });

  it("should contains one <ErrorContent /> component with correct message", () => {
    const { getByTestId } = render(<ErrorPage error={accessDeniedError} />);
    expect(getByTestId("error-content")).toBeInTheDocument();
    expect(getByTestId("error-content-message")).toHaveTextContent(
      "Something went wrong :("
    );
  });

  it("should contains error message and a back button to reset the error", () => {
    const setErrorSpy = jest.fn();
    const { getByTestId } = render(
      <ErrorPage error={accessDeniedError} setError={setErrorSpy} />
    );
    expect(getByTestId("error-message")).toHaveTextContent("Access denied");

    const backButton = getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    expect(setErrorSpy).toBeCalledWith(null);
  });

  it("should call cleanToken when there is token and is not expired", () => {
    hasTokenSpy.mockReturnValue(true);
    isTokenExpiredSpy.mockReturnValue(false);
    const cleanTokenSpy = jest.fn();
    render(<ErrorPage error={invalidTokenError} cleanToken={cleanTokenSpy} />);
    expect(cleanTokenSpy).toBeCalled();
  });

  it("should call refreshToken when there is token and is expired", () => {
    hasTokenSpy.mockReturnValue(true);
    isTokenExpiredSpy.mockReturnValue(true);
    const refreshTokenSpy = jest.fn();
    render(
      <ErrorPage error={invalidTokenError} refreshToken={refreshTokenSpy} />
    );
    expect(refreshTokenSpy).toBeCalled();
  });
});
