import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import Tracks from "./Tracks";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Tracks", () => {
  it("should contains one <SearchResultsEmpty /> component when items are empty", () => {
    const { getByTestId } = render(<Tracks />);
    expect(getByTestId("search-results-empty")).toBeInTheDocument();
  });

  it("should at least one track when items are not empty", () => {
    const items = [
      {
        id: "0wBo4ynxstedkveYf9twMS",
        name: "It's Too Late to Apologize",
        album: {
          artists: [
            {
              name: "Varios Artistas",
            },
          ],
          external_urls: {
            spotify: "https://open.spotify.com/album/4uZRGAhIHbQRZome8mdGjn",
          },
          images: [
            {
              height: 640,
              url:
                "https://i.scdn.co/image/921746a9b51f6a41a7482afcdd3521807affa4a3",
              width: 640,
            },
            {
              height: 300,
              url:
                "https://i.scdn.co/image/cdad3ca8d44835d75384e81a8453b54bb264fbe2",
              width: 300,
            },
            {
              height: 64,
              url:
                "https://i.scdn.co/image/2765370b190ec801179e0d9ef355fb4f93eb9dca",
              width: 64,
            },
          ],
          name:
            "New Pop Stars: Homeaje a la Música de Onerepublic, Maroon 5, Sam Smith, Ed Sheran",
        },
      },
    ];

    const { getByTestId, queryAllByTestId } = render(<Tracks items={items} />);
    expect(queryAllByTestId("track")).toHaveLength(1);
    expect(getByTestId("tracks-title")).toHaveTextContent("Tracks");
  });
});
