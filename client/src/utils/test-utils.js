import React from "react";
import { MemoryRouter } from "react-router";
import { render } from "react-testing-library";

import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";

const wrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper, ...options });

// re-export everything
export * from "react-testing-library";

// override render method
export { customRender as render };
