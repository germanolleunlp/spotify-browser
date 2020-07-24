import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import MuiTypography from "@material-ui/core/Typography";

const Typography = ({ children, className, ...props }) => {
  return (
    <MuiTypography className={clsx(className)} {...props}>
      {children}
    </MuiTypography>
  );
};

Typography.propTypes = {
  className: PropTypes.any,
};

Typography.defaultProps = {
  className: "",
};

export default Typography;
