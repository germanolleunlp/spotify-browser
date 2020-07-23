import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import MuiTypography from "@material-ui/core/Typography";

const Typography = ({ children, className, figma, ...props }) => {
  return (
    <MuiTypography className={clsx(className, figma)} {...props}>
      {children}
    </MuiTypography>
  );
};

Typography.propTypes = {
  className: PropTypes.any,
  figma: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Typography.defaultProps = {
  className: "",
  figma: "",
};

export default Typography;
