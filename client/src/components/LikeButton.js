import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Modal from "./Modal";

import { addToFavorites } from "../redux/actions";

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

const LikeButton = ({ track, addToFavorites, favorites }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const addToFavorite = () => {
    addToFavorites(track);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (favorites[track.id]) {
    return null;
  }

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

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

const mapDispatchToProps = {
  addToFavorites,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeButton);
