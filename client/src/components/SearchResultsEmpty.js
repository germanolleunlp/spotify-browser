import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import Typography from "./Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(3),
  },
  default: {
    color: `${theme.palette["bg-default"].main}`
  }
}));

const SearchResultsEmpty = ({ entity }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="search-results-empty">
      <Typography
        figma={"figma-typography-text-1"}
        className={clsx(classes.default)}
        gutterBottom
        data-testid="search-results-empty-query"
      >
        {`No ${entity} results found`}
      </Typography>
      <Typography
        figma={"figma-typography-text-1"}
        className={clsx(classes.default)}
        data-testid="search-results-empty-message"
      >
        Please make sure your words are spelled correctly or use less or
        different keywords.
      </Typography>
    </Box>
  );
};

SearchResultsEmpty.propTypes = {
  entity: PropTypes.string,
};

SearchResultsEmpty.defaultProps = {
  entity: "",
};

export default SearchResultsEmpty;
