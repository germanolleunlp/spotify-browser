import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import TokenStorage, { hasTokenSpy } from "../TokenStorage";
jest.mock("../TokenStorage");

import { SearchPage } from "./SearchPage";

beforeEach(() => {
  TokenStorage.mockClear();
  hasTokenSpy.mockClear();
});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("SearchPage", () => {
  it("should renders without crashing when there is a token", () => {
    hasTokenSpy.mockReturnValue(true);
    const searchSpy = jest.fn();
    const { getByTestId } = render(
      <SearchPage queryTerm="" search={searchSpy} />
    );
    expect(getByTestId("search-page")).toBeInTheDocument();
  });

  it("should contains one <Loader /> while is loading", () => {
    const { getByTestId } = render(<SearchPage isLoading={true} />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });
});
