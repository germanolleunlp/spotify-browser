import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Typography from "./Typography";
import Alert from "./Alert";
import Button from "./Button";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    textAlign: "center",
  },
  default: {
    color: theme.palette.common.white,
  },
}));

const Welcome = () => {
  const classes = useStyles();
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
      <Button
        className={clsx(classes.button)}
        href="/favorites"
        data-testid="favorites-link-button"
      >
        <Typography variant="subtitle1" className={clsx(classes.default)}>
          Go to favorites
        </Typography>
      </Button>
      <Alert />
    </Box>
  );
};

export default Welcome;
