import React from "react";
import clsx from "clsx";

import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import SearchResults from "./SearchResults";
import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column nowrap",
    margin: `${theme.spacing(3)}px 0`,
  },
  default: {
    color: theme.palette.common.white,
  },
}));

const SearchContent = ({ results }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="search-content">
      {(!results && (
        <Typography
          variant="h4"
          className={clsx(classes.default)}
          data-testid="search-message"
        >
          What are you waiting for? Search now!
        </Typography>
      )) || <SearchResults results={results} />}
    </Box>
  );
};

export default SearchContent;
