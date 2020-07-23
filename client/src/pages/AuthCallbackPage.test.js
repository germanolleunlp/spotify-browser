import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import TokenStorage, { hasTokenSpy } from "../TokenStorage";
jest.mock("../TokenStorage");

import { ACCESS_DENIED_ERROR_CODE } from "../errors";

import { AuthCallbackPage } from "./AuthCallbackPage";

beforeEach(() => {
  TokenStorage.mockClear();
  hasTokenSpy.mockClear();
});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("AuthCallbackPage", () => {
  it("should contains one <Loader /> while there is not token", () => {
    hasTokenSpy.mockReturnValue(false);
    const { getByTestId } = render(
      <AuthCallbackPage location={{ search: "" }} isLoading={true} />
    );
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should call setError when there is an error", () => {
    hasTokenSpy.mockReturnValue(false);
    const setErrorSpy = jest.fn();
    render(
      <AuthCallbackPage
        setError={setErrorSpy}
        location={{ search: "code=foo&error=access_denied" }}
      />
    );
    expect(setErrorSpy).toBeCalledWith({
      code: ACCESS_DENIED_ERROR_CODE,
      message: "Access denied",
    });
  });

  it("should call getToken when there is a code and no error", () => {
    hasTokenSpy.mockReturnValue(false);
    const code = "bar";
    const getTokenSpy = jest.fn();
    render(
      <AuthCallbackPage
        getToken={getTokenSpy}
        location={{ search: `code=${code}&error=` }}
      />
    );
    expect(getTokenSpy).toBeCalledWith(code);
  });
});
