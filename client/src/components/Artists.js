import React from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";

import Box from "@material-ui/core/Box";

import { ReactComponent as ArtistIcon } from "../assets/artist.svg";
import SearchResultItem from "./SearchResultItem";
import SearchResultsEmpty from "./SearchResultsEmpty";
import Typography from "./Typography";

import { ARTIST_URL } from "../routes";

const Artists = ({ classes, items, history }) => {
  const handleClick = (id) => (event) => {
    event.preventDefault();
    history.push(ARTIST_URL.replace(":artistId", id));
  };

  return (
    <Box className={classes.root} data-testid="artists">
      <Typography
        variant="h1"
        data-testid="artists-title"
        className={clsx(classes.default)}
      >
        Artists
      </Typography>
      {(!!items.length && (
        <Box className={classes.items}>
          {items.map(({ id, name, images, external_urls, popularity }) => (
            <SearchResultItem
              data-testid="artist"
              key={id}
              href={external_urls.spotify}
              name={name}
              image={images[1]}
              icon={<ArtistIcon />}
              title={name}
              subtitle={`Popularity: ${popularity}/100`}
              onClick={handleClick(id)}
            />
          ))}
        </Box>
      )) || <SearchResultsEmpty entity="artists" />}
    </Box>
  );
};

Artists.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.string,
  }),
  items: PropTypes.array,
};

Artists.defaultProps = {
  classes: {
    root: "",
    title: "",
    items: "",
  },
  items: [],
};

export default withRouter(Artists);
