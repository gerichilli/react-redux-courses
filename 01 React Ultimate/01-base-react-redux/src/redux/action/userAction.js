export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";

export function doLogin(data) {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
}
