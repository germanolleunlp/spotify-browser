import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import TokenStorage from "../TokenStorage";
import { search } from "../redux/actions";
import { HOME_URL, ERROR_URL } from "../routes";

import Box from "@material-ui/core/Box";
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";
import SearchContent from "../components/SearchContent";

const tokenStorage = new TokenStorage();

export const SearchPage = ({
  isLoading,
  error,
  queryTerm,
  search,
  results,
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Redirect to={ERROR_URL} />;
  }

  if (!tokenStorage.hasToken()) {
    return <Redirect to={HOME_URL} />;
  }

  return (
    <Box data-testid="search-page">
      <SearchInput queryTerm={queryTerm} search={search} />
      <SearchContent results={results} />
    </Box>
  );
};

const mapStateToProps = ({
  root: { queryTerm, results, isLoading, error },
}) => ({
  queryTerm,
  results,
  isLoading,
  error,
});

const mapDispatchToProps = {
  search,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
