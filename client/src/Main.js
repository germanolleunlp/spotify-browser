import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import LogoIcon from "./components/LogoIcon";
import Welcome from "./components/Welcome";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import ArtistPage from "./pages/ArtistPage";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

import {
  HOME_URL,
  SEARCH_URL,
  AUTH_CALLBACK_URL,
  ARTIST_URL,
  ERROR_URL,
  NOT_FOUND_URL,
} from "./routes";

import "./Main.css";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette["bg-inverse"].main,
  },
}));

const Main = () => {
  const classes = useStyles();

  return (
    <Box
      id="main"
      className={classes.main}
      style={{ justifyContent: "center" }}
    >
      <LogoIcon className="logo" size="medium" />
      <Welcome />
      <Switch>
        <Route exact path={HOME_URL} component={HomePage} />
        <Route exact path={SEARCH_URL} component={SearchPage} />
        <Route path={AUTH_CALLBACK_URL} component={AuthCallbackPage} />
        <Route path={ARTIST_URL} component={ArtistPage} />
        <Route path={ERROR_URL} component={ErrorPage} />
        <Route path={NOT_FOUND_URL} component={NotFoundPage} />
        <Redirect to={NOT_FOUND_URL} />
      </Switch>
    </Box>
  );
};

export default Main;
