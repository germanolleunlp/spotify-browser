import React from "react";

import theme from "../theme";
import useFigmaTheme from "../hooks/useFigmaTheme";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Loader from "../components/Loader";

const FigmaThemeProvider = ({ children }) => {
  const figmaTheme = useFigmaTheme();

  if (!figmaTheme) {
    return <Loader />;
  }

  const muiTheme = createMuiTheme({ ...theme, ...figmaTheme });
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};

export default FigmaThemeProvider;
