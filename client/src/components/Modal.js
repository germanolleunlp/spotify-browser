import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import Button from "./Button";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  close: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: 0,
  },
  content: {
    padding: theme.spacing(4),
  },
  actions: {
    margin: 0,
    padding: theme.spacing(2),
  },
  cancel: {
    backgroundColor: "#d9534f",
    textTransform: "initial",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#bc1914",
    },
  },
  confirm: {
    backgroundColor: "#5cb85c",
    textTransform: "initial",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#2d7c2d",
    },
  },
}));

const Modal = ({ isOpen, title, message, handleClose, handleConfirm }) => {
  const classes = useStyles();

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="modal-dialog-title"
      open={isOpen}
    >
      <MuiDialogTitle
        id="modal-dialog-title"
        disableTypography
        className={classes.root}
      >
        <Typography variant="h4">{title}</Typography>
        <IconButton
          aria-label="close"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent className={classes.content} dividers>
        <Typography variant="subtitle1" gutterBottom>
          {message}
        </Typography>
      </MuiDialogContent>
      <MuiDialogActions className={classes.actions}>
        <Button className={classes.cancel} onClick={handleClose}>
          <Typography variant="subtitle1">Cancel</Typography>
        </Button>
        <Button className={classes.confirm} onClick={handleConfirm}>
          <Typography variant="subtitle1">Confirm</Typography>
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  isOpen: false,
};

export default Modal;
