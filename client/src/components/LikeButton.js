import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Modal from "./Modal";

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

const LikeButton = ({ track }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const addToFavorite = () => {
    console.log(`Add to favorite ${track.name} - ${track.href}`);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="like"
        className={classes.root}
        onClick={toggleModal}
        disableRipple
      >
        <FavoriteIcon />
      </IconButton>
      <Modal
        title="Add to Favorites"
        message={`¿Are you sure you want to add "${
          track.name
        }" to your "Favorites" list?`}
        handleConfirm={addToFavorite}
        handleClose={toggleModal}
        isOpen={isOpen}
      />
    </Fragment>
  );
};

LikeButton.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }).isRequired,
};

export default LikeButton;
