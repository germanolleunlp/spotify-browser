import { combineReducers } from "redux";

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
  REMOVE_FROM_FAVORITES,
  SET_ALERT,
} from "./types";

const INITIAL_STATE = {
  queryTerm: "",
  results: null,
  artist: null,
  isLoading: false,
  error: null,
  favorites: {},
  alert: null,
};

const rootReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SEARCH_STARTED:
      return {
        ...state,
        results: null,
        isLoading: true,
        error: null,
      };
    case GET_ARTIST_STARTED:
      return {
        ...state,
        artist: null,
        isLoading: true,
        error: null,
      };
    case SET_QUERY_TERM:
      return {
        ...state,
        queryTerm: payload,
      };
    case SET_RESULTS:
      return {
        ...state,
        results: payload,
        isLoading: false,
        error: null,
      };
    case SET_ARTIST:
      return {
        ...state,
        artist: payload,
        isLoading: false,
        error: null,
      };
    case TOKEN_UPDATED:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case ADD_TO_FAVORITES: {
      const { id, ...props } = payload;
      return {
        ...state,
        favorites: { ...state.favorites, ...{ [id]: props } },
      };
    }
    case REMOVE_FROM_FAVORITES: {
      const { id } = payload;

      return {
        ...state,
        favorites: { ...state.favorites, ...{ [id]: undefined } },
      };
    }
    case SET_ALERT: {
      return {
        ...state,
        alert: payload,
      };
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  root: rootReducer,
});

export default reducers;
