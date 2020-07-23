import { REACT_APP_API_VERSION } from "../constants";

export const getSpy = jest.fn((url) => {
  if (url === `api/${REACT_APP_API_VERSION}/login`) {
    return Promise.resolve({ data: { url: "test.spotity.url" } });
  }
});

export const postSpy = jest.fn((url) => {
  if (url === `api/${REACT_APP_API_VERSION}/refresh_token`) {
    return Promise.resolve({
      data: {
        access_token: "foo",
        token_type: "Bearer",
        scope: "user-read-email",
        expires_in: 3600,
        refresh_token: "bar",
      },
    });
  }
});

const mock = {
  get: getSpy,
  post: postSpy,
};

export default mock;
