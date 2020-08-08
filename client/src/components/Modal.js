import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Typography from "./Typography";
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
    textTransform: "initial",
  },
  confirm: {
    textTransform: "initial",
    color: theme.palette.common.white,
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
        <Typography figma="figma-typography-display-4">{title}</Typography>
        <IconButton
          aria-label="close"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent className={classes.content} dividers>
        <Typography figma="figma-typography-text-1" gutterBottom>
          {message}
        </Typography>
      </MuiDialogContent>
      <MuiDialogActions className={classes.actions}>
        <Button
          className={classes.cancel}
          figma="figma-button-display-btn-secondary"
          onClick={handleClose}
        >
          <Typography figma="figma-typography-text-1">Cancel</Typography>
        </Button>
        <Button
          className={classes.confirm}
          figma="figma-button-display-btn-primary"
          onClick={handleConfirm}
        >
          <Typography figma="figma-typography-text-1">Confirm</Typography>
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
