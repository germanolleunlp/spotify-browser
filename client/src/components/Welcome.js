import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Typography from "./Typography";
import Alert from "./Alert";
import Button from "./Button";

import { FAVORITES_URL } from "../routes";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    textAlign: "center",
  },
  default: {
    color: `${theme.palette["bg-default"].main}`,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const Welcome = ({ favorites }) => {
  const classes = useStyles();
  const location = useLocation();

  const inFavoritesPage = location.pathname === FAVORITES_URL;
  const showFavorites = !!Object.keys(favorites).length && !inFavoritesPage;

  return (
    <Box className={classes.root} data-testid="welcome">
      <Typography
        figma={"figma-typography-display-4"}
        className={classes.default}
        data-testid="welcome-title"
      >
        Looking for music?
      </Typography>
      <Typography
        figma={"figma-typography-display-4"}
        className={classes.default}
        data-testid="welcome-subtitle"
        gutterBottom
      >
        Find your favorite tracks and artists.
      </Typography>
      {showFavorites && (
        <Link to={FAVORITES_URL}>
          <Button
            figma={"figma-button-display-btn-spotify-primary"}
            className={classes.button}
            data-testid="favorites-link-button"
          >
            <Typography
              figma={"figma-typography-text-1"}
              className={classes.default}
            >
              Go to favorites
            </Typography>
          </Button>
        </Link>
      )}
      <Alert fixed />
    </Box>
  );
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

export default connect(mapStateToProps)(Welcome);
