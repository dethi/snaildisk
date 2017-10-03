import { parse as parseQueryString } from 'query-string';

const ACCESS_TOKEN_KEY = 'access_token';

function getAccessTokenFromHash() {
  const token = parseQueryString(window.location.hash).access_token;
  window.location.hash = '';

  return token || null;
}

function getAccessTokenFromLocalStorage() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || null;
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAndSetAccessToken() {
  const token = getAccessTokenFromHash() || getAccessTokenFromLocalStorage();
  setAccessToken(token);

  return token;
}
