import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Modal from "./Modal";

import { removeFromFavorites } from "../redux/actions";

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

const DislikeButton = ({ track, removeFromFavorites }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const removeFromFavs = () => {
    removeFromFavorites(track);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <IconButton
        aria-label="dislike"
        className={classes.root}
        onClick={toggleModal}
      >
        <DeleteOutlineIcon />
      </IconButton>
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

DislikeButton.propTypes = {
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
)(DislikeButton);
