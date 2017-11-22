import { makeActionCreator } from './helper';

export const SET_TOKEN = 'auth:set_token';

export const setToken = makeActionCreator(SET_TOKEN, 'token');
