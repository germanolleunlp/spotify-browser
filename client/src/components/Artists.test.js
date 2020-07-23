import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import Artists from "./Artists";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Artists", () => {
  it("should contains one <SearchResultsEmpty /> component when items are empty", () => {
    const { getByTestId } = render(<Artists />);
    expect(getByTestId("search-results-empty")).toBeInTheDocument();
  });

  it("should have at least one artist when items are not empty", () => {
    const items = [
      {
        id: "08td7MxkoHQkXnWAYD8d6Q",
        name: "Tania Bowra",
        images: [
          {
            height: 640,
            url:
              "https://i.scdn.co/image/f2798ddab0c7b76dc2d270b65c4f67ddef7f6718",
            width: 640,
          },
          {
            height: 300,
            url:
              "https://i.scdn.co/image/b414091165ea0f4172089c2fc67bb35aa37cfc55",
            width: 300,
          },
          {
            height: 64,
            url:
              "https://i.scdn.co/image/8522fc78be4bf4e83fea8e67bb742e7d3dfe21b4",
            width: 64,
          },
        ],
        external_urls: {
          spotify: "https://open.spotify.com/artist/08td7MxkoHQkXnWAYD8d6Q",
        },
        popularity: 0,
      },
    ];

    const { getByTestId, queryAllByTestId } = render(<Artists items={items} />);
    expect(queryAllByTestId("artist")).toHaveLength(1);
    expect(getByTestId("artists-title")).toHaveTextContent("Artists");
  });
});
