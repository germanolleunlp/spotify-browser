import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "@material-ui/core/styles";

import { ReactComponent as Logo } from "../assets/logo.svg";

const WIDTHS = {
  small: "131px",
  medium: "262px",
  large: "655px",
};

const HEIGHTS = {
  small: "40px",
  medium: "80px",
  large: "200px",
};

const LogoIcon = ({ className, size, color }) => {
  const theme = useTheme();

  const attrs = {
    className,
    width: WIDTHS[size],
    height: HEIGHTS[size],
    color: theme.palette[color].main,
  };

  return <Logo {...attrs} data-testid="logo-icon" />;
};

LogoIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
};

LogoIcon.defaultProps = {
  className: "",
  size: "small",
  color: "bg-default",
};

export default LogoIcon;
