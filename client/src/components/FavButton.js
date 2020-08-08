import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Button from "./Button";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    alignSelf: "center",
    marginTop: "5px",
  },
}));

const FavButton = () => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      figma="figma-button-display-btn-spotify-fav"
    >
      <FavoriteIcon />
    </Button>
  );
};

export default FavButton;
