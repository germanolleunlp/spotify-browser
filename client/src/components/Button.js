import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid",
    borderColor: "var(--parent-mainfill)",
    borderRadius: 0,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
    },
  },
}));

const Button = ({ children, className, color, ...props }) => {
  const classes = useStyles();

  return (
    <MuiButton
      className={clsx(className, classes.root)}
      {...props}
      color={color}
      variant="contained"
      disableFocusRipple
      disableRipple
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  className: PropTypes.any,
  color: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  color: "primary",
};

export default Button;
