import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Button from "./Button";
import Modal from "./Modal";

import { removeFromFavorites } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    alignSelf: "center",
    marginTop: "5px",
  },
}));

const UnfavButton = ({ track, removeFromFavorites }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const removeFromFavs = () => {
    removeFromFavorites(track);
    toggleModal();
  };

  return (
    <Fragment>
      <Button
        className={classes.root}
        figma="figma-button-display-btn-spotify-unfav"
        onClick={toggleModal}
      >
        <DeleteOutlineIcon />
      </Button>
      <Modal
        title="Remove from Favorites"
        message={`¿Are you sure you want to remove "${
          track.title
        }" from your "Favorites" list?`}
        handleConfirm={removeFromFavs}
        handleClose={toggleModal}
        isOpen={isOpen}
      />
    </Fragment>
  );
};

UnfavButton.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  removeFromFavorites,
};

export default connect(
  null,
  mapDispatchToProps
)(UnfavButton);
