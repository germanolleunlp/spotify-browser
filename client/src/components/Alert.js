import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

import { setAlert } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#dff0d8",
    border: "1px solid #d0e9c6",
    zIndex: theme.zIndex.alert,
  },
}));

const Alert = ({ setAlert, alert }) => {
  const classes = useStyles();

  const onClose = () => {
    setAlert(null);
  };

  return (
    alert && (
      <MuiAlert
        className={classes.root}
        color="success"
        severity="success"
        variant="standard"
        icon={false}
        onClose={onClose}
      >
        {alert.message}
      </MuiAlert>
    )
  );
};

const mapStateToProps = ({ root: { alert } }) => ({
  alert,
});

const mapDispatchToProps = {
  setAlert,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert);
