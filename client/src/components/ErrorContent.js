import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ErrorIcon from "@material-ui/icons/Error";

import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    backgroundColor: theme.palette.grey.main,
    padding: theme.spacing(4),
    margin: `${theme.spacing(3)}px 0`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  icon: {
    color: theme.palette.common.white,
    width: 50,
    height: 50,
    marginRight: theme.spacing(1),
  },
  default: {
    color: theme.palette.common.white,
  },
}));

const ErrorContent = ({ message, children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="error-content">
      <Box className={classes.header}>
        <ErrorIcon data-testid="error-icon" className={classes.icon} />
        <Typography
          variant="subtitle1"
          className={clsx(classes.default)}
          data-testid="error-title"
        >
          Ops!
        </Typography>
      </Box>
      <Typography
        variant="subtitle1"
        className={clsx(classes.default)}
        data-testid="error-content-message"
      >
        {message}
      </Typography>
      {children}
    </Box>
  );
};

ErrorContent.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.any,
};

ErrorContent.defaultProps = {
  children: null,
};

export default ErrorContent;
