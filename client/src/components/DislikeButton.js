import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: "#999999",
    width: 38,
    height: 38,
    alignSelf: "center",
    marginTop: 5,
    "&:hover": {
      backgroundColor: "#777777",
    },
  },
}));

const DislikeButton = ({ onClick, ...props }) => {
  const classes = useStyles();

  return (
    <IconButton
      aria-label="dislike"
      className={classes.root}
      {...props}
      onClick={onClick}
    >
      <DeleteOutlineIcon />
    </IconButton>
  );
};

DislikeButton.propTypes = {
  onClick: PropTypes.func,
};

DislikeButton.defaultProps = {
  onClick: null,
};

export default DislikeButton;
