import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

import Typography from "./Typography";

import { setAlert } from "../redux/actions";

const useStyles = makeStyles(() => ({
  root: ({ fixed }) => {
    if (!fixed) {
      return {};
    }

    return {
      zIndex: 1600,
      position: "fixed",
      top: "10%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  },
}));

export const Alert = ({ fixed, figma, alert, setAlert }) => {
  const classes = useStyles({ fixed });

  const onClose = () => {
    setAlert(null);
  };

  return (
    alert && (
      <MuiAlert
        className={clsx(classes.root, figma)}
        icon={false}
        onClose={onClose}
      >
        <Typography figma="figma-typography-text-1">{alert.message}</Typography>
      </MuiAlert>
    )
  );
};

Alert.propTypes = {
  figma: PropTypes.string,
  fixed: PropTypes.bool,
};

Alert.defaultProps = {
  figma: "",
  fixed: false,
  setAlert: () => {
    console.debug("This is a default func");
  },
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
