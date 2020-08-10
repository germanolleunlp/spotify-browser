import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Button from "../components/Button";
import Typography from "../components/Typography";
import ArtistTopTracks from "../components/ArtistTopTracks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: theme.spacing(4),
  },
  default: {
    color: theme.palette.common.white,
  },
  empty: {
    padding: theme.spacing(2),
  },
  back: {
    alignSelf: "center",
  },
}));

export const FavoritesPage = ({ favorites }) => {
  const classes = useStyles();
  const history = useHistory();

  const tracks = Object.keys(favorites).map((key) => favorites[key]);

  return (
    <Box data-testid="favorites-page" className={classes.root}>
      <Button
        figma={"figma-button-display-btn-spotify-primary"}
        className={classes.back}
        onClick={history.goBack}
      >
        <Typography
          figma={"figma-typography-text-1"}
          className={classes.default}
        >
          Back
        </Typography>
      </Button>
      <Typography
        figma={"figma-typography-display-1"}
        className={classes.default}
      >
        Favorites
      </Typography>
      <ArtistTopTracks tracks={tracks} />
      {!tracks.length && (
        <Box className={classes.empty} data-testid="favorites-empty">
          <Typography
            figma={"figma-typography-display-4"}
            className={classes.default}
            gutterBottom
          >
            Your list of favorites is empty.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

export default connect(mapStateToProps)(FavoritesPage);
