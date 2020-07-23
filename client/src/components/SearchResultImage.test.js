import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import { ReactComponent as ArtistIcon } from "../assets/artist.svg";
import { ReactComponent as AlbumIcon } from "../assets/album.svg";

import SearchResultImage from "./SearchResultImage";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("SearchResultImage", () => {
  it("should have an icon when image is not given", () => {
    const { getByTestId } = render(<SearchResultImage icon={<ArtistIcon />} />);
    expect(getByTestId("result-icon")).toBeInTheDocument();
  });

  it("should have img props when image is given", () => {
    const image = {
      url: "https://i.scdn.co/image/b414091165ea0f4172089c2fc67bb35aa37cfc55",
    };

    const { getByTestId } = render(
      <SearchResultImage
        name="Tania Bowra"
        image={image}
        icon={<AlbumIcon />}
      />
    );

    const searchResultImage = getByTestId("search-result-image");
    expect(searchResultImage).toBeInTheDocument();
    expect(searchResultImage).toHaveAttribute("src", image.url);
    expect(searchResultImage).toHaveAttribute("alt", "Tania Bowra");
  });
});
