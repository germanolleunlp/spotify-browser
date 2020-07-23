import React from "react";
import { render, cleanup } from "../utils/test-utils";
import "jest-dom/extend-expect";

import TrackRow from "./TrackRow";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("TrackRow", () => {
  const props = {
    href: "https://open.spotify.com/track/3ZFTkvIE7kyPt6Nu3PEa7V",
    name: "Hips Don't Lie",
    album: {
      name: "Oral Fixation, Vol. 2 (Expanded Edition)",
      images: [
        {
          url:
            "https://i.scdn.co/image/e234d27f81844acbd897c38776c39e66607b8f6f",
        },
      ],
    },
    duration: "00:03:08",
  };

  it("should renders without crashing", () => {
    const { getByTestId } = render(<TrackRow {...props} />);
    expect(getByTestId("track-row")).toBeInTheDocument();
  });

  it("should have correct attrs", () => {
    const { getByTestId, queryByTestId } = render(<TrackRow {...props} />);
    const trackRow = getByTestId("track-row");
    const trackAvatar = getByTestId("track-avatar").querySelector("img");
    const { href, name, album } = props;

    expect(trackRow).toHaveAttribute("href", href);
    expect(trackRow).toHaveAttribute("target", "_blank");
    expect(trackRow).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      getByTestId("track-avatar").querySelector("img")
    ).toBeInTheDocument();
    expect(getByTestId("track-name")).toHaveTextContent(name);
    expect(getByTestId("track-album-name")).toHaveTextContent(album.name);
  });

  it("should have an image when is possible", () => {
    const { getByTestId, queryByTestId } = render(<TrackRow {...props} />);
    const { album } = props;
    const trackAvatar = getByTestId("track-avatar").querySelector("img");
    expect(trackAvatar).toHaveAttribute("src", album.images[0].url);
    expect(trackAvatar).toHaveAttribute("alt", album.name);
    expect(queryByTestId("album-icon")).not.toBeInTheDocument();
  });

  it("should have an icon when is image is not possible", () => {
    const newProps = {
      ...props,
      album: {
        name: "New album",
        images: [],
      },
    };

    const { getByTestId, queryByTestId } = render(<TrackRow {...newProps} />);
    expect(
      getByTestId("track-avatar").querySelector("img")
    ).not.toBeInTheDocument();
    expect(getByTestId("album-icon")).toBeInTheDocument();
  });
});
