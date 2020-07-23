import React, { useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

import { getToken, setError } from "../redux/actions";
import { HOME_URL, ERROR_URL } from "../routes";
import { ACCESS_DENIED_ERROR_CODE } from "../errors";

import Loader from "../components/Loader";

export const AuthCallbackPage = ({
  location: { search },
  isLoading,
  error,
  getToken,
  setError,
}) => {
  useEffect(() => {
    const { code, error } = queryString.parse(search);

    if (error) {
      setError({
        code: ACCESS_DENIED_ERROR_CODE,
        message: "Access denied",
      });
      return;
    }

    if (code) {
      getToken(code);
      return;
    }
    // eslint-disable-next-line
	}, [search]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Redirect to={ERROR_URL} />;
  }

  return <Redirect to={HOME_URL} />;
};

const mapStateToProps = ({ root: { error, isLoading } }) => ({
  error,
  isLoading,
});

const mapDispatchToProps = {
  getToken,
  setError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCallbackPage);
