import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";

const MUI_BUTTON = "MuiButton";

const useStyles = makeStyles((theme) => ({
  root: ({ figma }) => {
    const btn = (figma.match(/figma-.*-btn-(.*)/) || [])[1];
    const style = {};

    if (btn) {
      const buttons = theme.overrides[MUI_BUTTON]["root"];
      const disabled = buttons[`&.figma-button-display-disabled-btn-${btn}`];
      const hover = buttons[`&.figma-button-hover-active-btn-${btn}`];

      if (hover) {
        style["&:hover"] = { backgroundColor: hover.background };
        style["&:focused"] = { backgroundColor: hover.background };
      }

      if (disabled) {
        style["&:disabled"] = { backgroundColor: disabled.background };
      }
    }

    return style;
  },
}));

const Button = ({ children, className, figma, ...props }) => {
  const classes = useStyles({ figma });

  return (
    <MuiButton
      className={clsx(classes.root, className, figma)}
      {...props}
      disableRipple
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  className: PropTypes.any,
  figma: PropTypes.string,
};

Button.defaultProps = {
  className: "",
  figma: "",
};

export default Button;
