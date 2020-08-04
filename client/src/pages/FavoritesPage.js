import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Typography from "../components/Typography";
import ArtistTopTracks from "../components/ArtistTopTracks";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `0 ${theme.spacing(4)}px`,
    margin: `${theme.spacing(4)}px 0`,
  },
  default: {
    color: theme.palette.common.white,
  },
}));

export const FavoritesPage = ({ favorites }) => {
  const classes = useStyles();
  const tracks = Object.keys(favorites).map((key) => favorites[key]);

  return (
    <Box data-testid="favorites-page" className={classes.root}>
      <Typography variant="h2" className={classes.default}>
        Favorites
      </Typography>
      <ArtistTopTracks tracks={tracks} />
    </Box>
  );
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

export default connect(mapStateToProps)(FavoritesPage);
