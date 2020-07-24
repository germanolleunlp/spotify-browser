import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import clsx from "clsx";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { REACT_APP_API_VERSION } from "../constants";
import TokenStorage from "../TokenStorage";
import { SEARCH_URL, ERROR_URL } from "../routes";

import Loader from "../components/Loader";
import Button from "../components/Button";
import Typography from "../components/Typography";

const tokenStorage = new TokenStorage();

const useStyles = makeStyles((theme) => ({
  buttonText: {
    color: theme.palette.common.white,
  },
}));

export const HomePage = ({ isLoading, error }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const classes = useStyles();

  if (isLoading || isLoggingIn) {
    return <Loader />;
  }

  if (error) {
    return <Redirect to={ERROR_URL} />;
  }

  const onLoginLinkClick = () => {
    setIsLoggingIn(true);

    axios
      .get(`api/${REACT_APP_API_VERSION}/login`)
      .then(({ data: { url } }) => {
        window.location = url;
      })
      .catch(() => {
        setIsLoggingIn(false);
      });
  };

  if (!tokenStorage.hasToken()) {
    return (
      <Box textAlign="center" data-testid="home-page">
        <Button onClick={onLoginLinkClick} data-testid="login-link">
          <Typography variant="subtitle1" className={clsx(classes.buttonText)}>
            Login
          </Typography>
        </Button>
      </Box>
    );
  }

  return <Redirect to={SEARCH_URL} />;
};

const mapStateToProps = ({ root: { isLoading, error } }) => ({
  isLoading,
  error,
});

export default connect(mapStateToProps)(HomePage);
