import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Modal from "./Modal";

import { addToFavorites, setAlert } from "../redux/actions";

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

const LikeButton = ({ track, addToFavorites }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const addToFavorite = () => {
    addToFavorites(track);
    toggleModal();
    setAlert({
      message: `You have added "${
        track.title
      }" to your "Favorites" list successfully.`,
    });
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
          track.title
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
    id: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  addToFavorites,
  setAlert,
};

export default connect(
  null,
  mapDispatchToProps
)(LikeButton);
