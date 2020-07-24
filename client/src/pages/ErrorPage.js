import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import clsx from "clsx";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { refreshToken, cleanToken } from "../redux/actions";
import TokenStorage from "../TokenStorage";
import { INVALID_OR_EXPIRED_ACCESS_TOKEN_ERROR_CODE } from "../errors";
import { HOME_URL } from "../routes";

import ErrorContent from "../components/ErrorContent";
import Loader from "../components/Loader";
import Button from "../components/Button";
import Typography from "../components/Typography";

const tokenStorage = new TokenStorage();

const useStyles = makeStyles((theme) => ({
  default: {
    color: theme.palette.common.white,
  },
}));

export const ErrorPage = ({ isLoading, error, refreshToken, cleanToken }) => {
  const classes = useStyles();
  useEffect(() => {
    if (!error) return;

    if (error.code === INVALID_OR_EXPIRED_ACCESS_TOKEN_ERROR_CODE) {
      if (tokenStorage.hasToken() && tokenStorage.isTokenExpired()) {
        refreshToken();
        return;
      }

      cleanToken();
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!error) {
    return <Redirect to={HOME_URL} />;
  }

  const onBackClick = () => {
    cleanToken();
  };

  return (
    <Box data-testid="error-page">
      <ErrorContent message="Something went wrong :(">
        <Typography
          variant="subtitle1"
          className={clsx(classes.default)}
          data-testid="error-message"
        >
          {error.message}
        </Typography>
        <Button onClick={onBackClick} data-testid="back-button">
          <Typography variant="subtitle1" className={clsx(classes.default)}>
            Back
          </Typography>
        </Button>
      </ErrorContent>
    </Box>
  );
};

const mapStateToProps = ({ root: { isLoading, error } }) => ({
  isLoading,
  error,
});

const mapDispatchToProps = {
  refreshToken,
  cleanToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorPage);
