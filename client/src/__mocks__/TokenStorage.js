export const hasTokenSpy = jest.fn();
export const isTokenExpiredSpy = jest.fn();
export const cleanTokenSpy = jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {
    hasToken: hasTokenSpy,
    isTokenExpired: isTokenExpiredSpy,
    cleanToken: cleanTokenSpy,
  };
});

export default mock;
