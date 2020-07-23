import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    textAlign: "center",
  },
  default: {
    color: `${theme.palette["bg-default"].main}`
  }
}));

const Welcome = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} data-testid="welcome">
      <Typography
        figma={"figma-typography-display-4"}
        className={clsx(classes.default)}
        data-testid="welcome-title"
      >
        Looking for music?
      </Typography>
      <Typography
        figma={"figma-typography-display-4"}
        className={clsx(classes.default)}
        data-testid="welcome-subtitle"
        gutterBottom
      >
        Find your favorite tracks and artists.
      </Typography>
    </Box>
  );
};

export default Welcome;
