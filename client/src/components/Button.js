import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import MuiButton from "@material-ui/core/Button";

const Button = ({ children, className, color, ...props }) => {
  return (
    <MuiButton
      className={clsx(className)}
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
