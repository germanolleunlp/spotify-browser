import { NO_TOKEN_ERROR_CODE } from "./errors";

export const NO_TOKEN_ERROR = {
  code: NO_TOKEN_ERROR_CODE,
  message: "There is not token in the storage",
};

const SPOTIFY_TOKEN = "SPOTIFY_TOKEN";

export default class TokenStorage {
  hasToken() {
    return localStorage.hasOwnProperty(SPOTIFY_TOKEN);
  }

  getToken() {
    return JSON.parse(localStorage.getItem(SPOTIFY_TOKEN));
  }

  setToken({ expires_in, ...rest }) {
    const promise = new Promise((resolve) => {
      const newToken = {
        ...rest,
        expires_at: Date.now() + expires_in * 1000,
      };

      localStorage.setItem(SPOTIFY_TOKEN, JSON.stringify(newToken));
      resolve(true);
    });

    return promise;
  }

  isTokenExpired() {
    const { expires_at } = this.getToken();
    return Date.now() >= expires_at;
  }

  cleanToken() {
    const promise = new Promise((resolve) => {
      localStorage.removeItem(SPOTIFY_TOKEN);
      resolve(true);
    });

    return promise;
  }
}
