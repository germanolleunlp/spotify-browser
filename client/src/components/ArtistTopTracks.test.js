import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import ArtistTopTracks from "./ArtistTopTracks";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("ArtistTopTracks", () => {
  const tracks = [
    {
      id: "3ZFTkvIE7kyPt6Nu3PEa7V",
      name: "Hips Don't Lie",
      external_urls: {
        spotify: "https://open.spotify.com/track/3ZFTkvIE7kyPt6Nu3PEa7V",
      },
      album: {
        images: [
          {
            height: 64,
            url:
              "https://i.scdn.co/image/e234d27f81844acbd897c38776c39e66607b8f6f",
            width: 64,
          },
        ],
        name: "Oral Fixation, Vol. 2 (Expanded Edition)",
      },
      duration_ms: 218093,
    },
  ];

  it("should renders without crashing", () => {
    const { getByTestId, getAllByTestId } = render(
      <ArtistTopTracks tracks={tracks} />
    );
    expect(getByTestId("artist-top-tracks")).toBeInTheDocument();
    expect(getAllByTestId("track-row")).toHaveLength(1);
  });

  it("should renders correctly when tracks is empty", () => {
    const { getByTestId, queryAllByTestId } = render(<ArtistTopTracks />);
    expect(getByTestId("artist-top-tracks")).toBeInTheDocument();
    expect(queryAllByTestId("track-row")).toHaveLength(0);
  });
});
