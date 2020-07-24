import React, { Fragment } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import { Provider } from "react-redux";
import { store } from "./redux";

import theme from "./theme";

import Router from "./Router";
import "./App.css";

const App = () => {
  const muiTheme = createMuiTheme({ ...theme });

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={muiTheme}>
        <Container id="container" fixed data-testid="main-container">
          <Box id="box">
            <Provider store={store}>
              <Router />
            </Provider>
          </Box>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
