export const SET_TOKEN = 'auth:set_token';

export function setToken(token) {
  return { type: SET_TOKEN, token };
}
