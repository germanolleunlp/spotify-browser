import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import MuiAlert from "@material-ui/lab/Alert";

const Alert = ({ children, className, figma, ...props }) => {
  return (
    <MuiAlert className={clsx(className, figma)} {...props} icon={false}>
      {children}
    </MuiAlert>
  );
};

Alert.propTypes = {
  className: PropTypes.any,
  figma: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Alert.defaultProps = {
  className: "",
  figma: "",
};

export default Alert;
