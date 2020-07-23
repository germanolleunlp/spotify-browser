import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Tracks from "./Tracks";
import Artists from "./Artists";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `0 ${theme.spacing(5)}px`,
  },
  items: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "baseline",
    margin: `${theme.spacing(3)}px 0`,
  },
  default: {
    color: `${theme.palette["bg-default"].main}`
  }
}));

const SearchResults = ({ results: { artists, tracks } }) => {
  const classes = useStyles();

  return (
    <Box style={{ width: "100%" }} data-testid="search-results">
      <Tracks classes={classes} items={tracks.items} />
      <Artists classes={classes} items={artists.items} />
    </Box>
  );
};

SearchResults.propTypes = {
  results: PropTypes.shape({
    artists: PropTypes.shape({
      items: PropTypes.array,
    }),
    tracks: PropTypes.shape({
      items: PropTypes.array,
    }),
  }),
};

SearchResults.defaultProps = {
  results: {
    artists: { items: [] },
    tracks: { items: [] },
  },
};

export default SearchResults;
