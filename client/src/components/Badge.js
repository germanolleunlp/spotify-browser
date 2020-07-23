import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import MuiBadge from "@material-ui/core/Badge";

const Badge = ({ children, className, figma, ...props }) => {
  return (
    <MuiBadge classes={{ badge: clsx(className, figma) }} {...props}>
      {children}
    </MuiBadge>
  );
};

Badge.propTypes = {
  className: PropTypes.any,
  figma: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

Badge.defaultProps = {
  className: "",
  figma: "",
};

export default Badge;
