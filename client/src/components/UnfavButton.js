import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Button from "./Button";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    alignSelf: "center",
    marginTop: "5px",
  },
}));

const UnfavButton = () => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      figma="figma-button-display-btn-spotify-unfav"
    >
      <DeleteOutlineIcon />
    </Button>
  );
};

UnfavButton.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default UnfavButton;
