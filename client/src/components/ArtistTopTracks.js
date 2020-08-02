import React from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";

import TrackRow from "./TrackRow";

export const ArtistTopTracks = ({ tracks }) => {
  return (
    <List data-testid="artist-top-tracks">
      {tracks.map(({ id, external_urls, name, album, duration_ms }) => {
        const duration = new Date(duration_ms)
          .toISOString()
          .slice(11, -1)
          .match(/.*(\d{2}:\d{2}:\d{2})/gm)[0];

        return (
          <TrackRow
            key={id}
            id={id}
            href={external_urls.spotify}
            name={name}
            album={album}
            duration={duration}
          />
        );
      })}
    </List>
  );
};

ArtistTopTracks.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      external_urls: PropTypes.shape({
        spotify: PropTypes.string.isRequired,
      }).isRequired,
      album: PropTypes.shape({
        name: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          })
        ),
      }).isRequired,
      duration_ms: PropTypes.number.isRequired,
    })
  ),
};

ArtistTopTracks.defaultProps = {
  tracks: [],
};

export default ArtistTopTracks;
