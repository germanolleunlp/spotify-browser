import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";

import { REACT_APP_API_VERSION } from "../constants";

import {
  SEARCH_STARTED,
  GET_ARTIST_STARTED,
  SET_QUERY_TERM,
  SET_RESULTS,
  SET_ARTIST,
  TOKEN_UPDATED,
  SET_ERROR,
  SET_IS_LOADING,
  ADD_TO_FAVORITES,
  SET_ALERT,
} from "./types";

import {
  GET_TOKEN_ERROR_CODE,
  REFRESH_TOKEN_ERROR_CODE,
  INVALID_OR_EXPIRED_ACCESS_TOKEN_ERROR_CODE,
  INVALID_ARTIST_ID_ERROR_CODE,
} from "../errors";

import TokenStorage, { NO_TOKEN_ERROR } from "../TokenStorage";
const tokenStorage = new TokenStorage();

const spotifyApi = new SpotifyWebApi();
const MARKET_CODE = "AR";

export const search = (queryTerm) => {
  return (dispatch) => {
    dispatch(searchStarted());
    dispatch(setQueryTerm(queryTerm));

    if (!tokenStorage.hasToken()) {
      dispatch(setError(NO_TOKEN_ERROR));
      return;
    }

    const { access_token } = tokenStorage.getToken();
    spotifyApi.setAccessToken(access_token);

    Promise.all([
      spotifyApi.searchTracks(queryTerm),
      spotifyApi.searchArtists(queryTerm),
    ])
      .then((values) => {
        const [tracks, artists] = values;
        dispatch(setResults({ ...tracks, ...artists }));
      })
      .catch(({ response }) => {
        const { error } = JSON.parse(response);
        dispatch(
          setError({
            code: INVALID_OR_EXPIRED_ACCESS_TOKEN_ERROR_CODE,
            message: "Invalid or expired access token",
            ...error,
          })
        );
      });
  };
};

export const getArtist = (artistId) => {
  return (dispatch) => {
    dispatch(getArtistStarted());

    if (!tokenStorage.hasToken()) {
      dispatch(setError(NO_TOKEN_ERROR));
      return;
    }

    const { access_token } = tokenStorage.getToken();
    spotifyApi.setAccessToken(access_token);

    Promise.all([
      spotifyApi.getArtist(artistId),
      spotifyApi.getArtistAlbums(artistId),
      spotifyApi.getArtistTopTracks(artistId, MARKET_CODE),
    ])
      .then((values) => {
        const [artist, albums, topTracks] = values;
        dispatch(
          setArtist({
            ...artist,
            albums: albums.items,
            topTracks: topTracks.tracks,
          })
        );
      })
      .catch(({ response }) => {
        const { error } = JSON.parse(response);
        dispatch(
          setError({
            code: INVALID_ARTIST_ID_ERROR_CODE,
            message: "Artist not found",
            ...error,
          })
        );
      });
  };
};

export const getToken = (code) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));

    axios
      .post(`api/${REACT_APP_API_VERSION}/get_token`, { code })
      .then(({ data }) => {
        tokenStorage.setToken(data).then(() => {
          dispatch(tokenUpdated());
        });
      })
      .catch(({ response: { data: error } }) => {
        dispatch(
          setError({
            code: GET_TOKEN_ERROR_CODE,
            message: "Invalid code",
            ...error,
          })
        );
      });
  };
};

export const refreshToken = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));

    if (!tokenStorage.hasToken()) {
      dispatch(setError(NO_TOKEN_ERROR));
      return;
    }

    const { refresh_token } = tokenStorage.getToken();

    axios
      .post(`api/${REACT_APP_API_VERSION}/refresh_token`, {
        refresh_token,
      })
      .then(({ data }) => {
        tokenStorage.setToken(data).then(() => {
          dispatch(tokenUpdated());
        });
      })
      .catch(({ response: { data: error } }) => {
        dispatch(
          setError({
            code: REFRESH_TOKEN_ERROR_CODE,
            message: "Invalid refresh code",
            ...error,
          })
        );
      });
  };
};

export const cleanToken = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    tokenStorage.cleanToken().then(() => {
      dispatch(tokenUpdated());
    });
  };
};

export const addToFavorites = (track) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: track,
    });
  };
};

export const setAlert = (alert) => {
  return (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: alert,
    });
  };
};

export const tokenUpdated = () => ({
  type: TOKEN_UPDATED,
});

export const searchStarted = () => ({
  type: SEARCH_STARTED,
});

export const getArtistStarted = () => ({
  type: GET_ARTIST_STARTED,
});

export const setQueryTerm = (queryTerm) => ({
  type: SET_QUERY_TERM,
  payload: queryTerm,
});

export const setResults = (results) => ({
  type: SET_RESULTS,
  payload: results,
});

export const setArtist = (artist) => ({
  type: SET_ARTIST,
  payload: artist,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setIsLoading = (isLoading) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});
