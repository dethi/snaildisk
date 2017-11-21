import { SET_TOKEN } from '../actions/auth';

const initialState = {
  isLogged: false,
  token: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { isLogged: action.token !== null, token: action.token };
    default:
      return state;
  }
}
