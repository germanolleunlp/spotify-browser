import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: "#e75251",
    width: 38,
    height: 38,
    alignSelf: "center",
    marginTop: 5,
    "&:hover": {
      backgroundColor: "#ee302f",
    },
  },
}));

const LikeButton = ({ onClick, ...props }) => {
  const classes = useStyles();

  return (
    <IconButton
      aria-label="like"
      className={classes.root}
      {...props}
      onClick={onClick}
    >
      <FavoriteIcon />
    </IconButton>
  );
};

LikeButton.propTypes = {
  onClick: PropTypes.func,
};

LikeButton.defaultProps = {
  onClick: null,
};

export default LikeButton;
