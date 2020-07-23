import React from "react";

import Box from "@material-ui/core/Box";

import ErrorContent from "../components/ErrorContent";

const NotFoundPage = () => (
  <Box data-testid="not-found-page">
    <ErrorContent message="We can not seem to find the page that you are looking for." />
  </Box>
);

export default NotFoundPage;
