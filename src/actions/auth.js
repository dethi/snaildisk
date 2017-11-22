import { makeActionCreator } from './helper';

export const LOGIN = 'auth:login';
export const SET_TOKEN = 'auth:set_token';

export const login = makeActionCreator(LOGIN, 'token');
export const setToken = makeActionCreator(SET_TOKEN, 'token');
