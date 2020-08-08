import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

import Button from "./Button";
import Modal from "./Modal";

import { addToFavorites, setAlert } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    alignSelf: "center",
    marginTop: "5px",
  },
}));

const FavButton = ({ track, addToFavorites, setAlert, favorites }) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const addToFav = () => {
    addToFavorites(track);
    toggleModal();
    setAlert({
      message: `You have added "${
        track.name
      }" to your "Favorites" list successfully.`,
    });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (favorites[track.id]) {
    return null;
  }

  return (
    <Fragment>
      <Button
        className={classes.root}
        figma="figma-button-display-btn-spotify-fav"
        onClick={toggleModal}
      >
        <FavoriteIcon />
      </Button>
      <Modal
        title="Add to Favorites"
        message={`¿Are you sure you want to add "${
          track.name
        }" to your "Favorites" list?`}
        handleConfirm={addToFav}
        handleClose={toggleModal}
        isOpen={isOpen}
      />
    </Fragment>
  );
};

FavButton.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    external_urls: PropTypes.shape({
      spotify: PropTypes.string.isRequired,
    }).isRequired,
    album: PropTypes.shape({
      name: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    duration_ms: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ root: { favorites } }) => ({
  favorites,
});

const mapDispatchToProps = {
  addToFavorites,
  setAlert,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavButton);
