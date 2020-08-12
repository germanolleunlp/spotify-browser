import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Box from "@material-ui/core/Box";

import { REACT_APP_API_VERSION } from "../constants";
import TokenStorage from "../TokenStorage";
import { SEARCH_URL, ERROR_URL } from "../routes";

import Loader from "../components/Loader";
import Button from "../components/Button";
import Typography from "../components/Typography";

const tokenStorage = new TokenStorage();

export const HomePage = ({ isLoading, error }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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
        <Button
          onClick={onLoginLinkClick}
          figma={"figma-button-display-btn-spotify-primary"}
          data-testid="login-link"
        >
          <Typography figma={"figma-typography-text-1"}>Login</Typography>
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
