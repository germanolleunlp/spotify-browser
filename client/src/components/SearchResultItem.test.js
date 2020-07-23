import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import { ReactComponent as ArtistIcon } from "../assets/artist.svg";

import SearchResultItem from "./SearchResultItem";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("SearchResultItem", () => {
  const props = {
    href: "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q",
    name: "Tania Bowra",
    image: {
      url: "https://i.scdn.co/image/b414091165ea0f4172089c2fc67bb35aa37cfc55",
    },
    icon: <ArtistIcon />,
    title: "Tania Bowra",
    subtitle: "Popularity: 0/100",
    "data-testid": "search-result-item",
  };

  it("should renders without crashing", () => {
    const { getByTestId } = render(<SearchResultItem {...props} />);
    expect(getByTestId("search-result-item")).toBeInTheDocument();
  });

  it("should have props", () => {
    const { getByTestId } = render(<SearchResultItem {...props} />);

    const { href, title, subtitle } = props;
    const searchResultItem = getByTestId("search-result-item");

    expect(searchResultItem).toHaveAttribute("href", href);
    expect(searchResultItem).toHaveAttribute("target", "_blank");
    expect(searchResultItem).toHaveAttribute("rel", "noopener noreferrer");
    expect(getByTestId("search-result-item-title")).toHaveTextContent(title);
    expect(getByTestId("search-result-item-subtitle")).toHaveTextContent(
      subtitle
    );
  });
});
