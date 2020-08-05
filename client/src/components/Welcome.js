import React from "react";
import { connect } from "react-redux";
import clsx from "clsx";
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
    color: theme.palette.common.white,
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
        variant="h4"
        className={clsx(classes.default)}
        data-testid="welcome-title"
      >
        Looking for music?
      </Typography>
      <Typography
        variant="h4"
        className={clsx(classes.default)}
        data-testid="welcome-subtitle"
        gutterBottom
      >
        Find your favorite tracks and artists.
      </Typography>
      {showFavorites && (
        <Link to={FAVORITES_URL}>
          <Button
            className={classes.button}
            data-testid="favorites-link-button"
          >
            <Typography variant="subtitle1" className={classes.default}>
              Go to favorites
            </Typography>
          </Button>
        </Link>
      )}
      <Alert />
    </Box>
  );
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

export default connect(mapStateToProps)(Welcome);
