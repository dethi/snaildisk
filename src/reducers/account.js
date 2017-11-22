import {
  FETCH_ACCOUNT_SUCCEEDED,
  FETCH_ACCOUNT_FAILED,
  FETCH_SPACE_USAGE_SUCCEEDED,
  FETCH_SPACE_USAGE_FAILED
} from '../actions/account';

const initialState = {
  email: '',
  firstname: '',
  lastname: '',
  initials: '',
  spaceUsage: {
    used: 0,
    allocated: 0
  }
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNT_SUCCEEDED:
      return { ...state, ...action.account };
    case FETCH_ACCOUNT_FAILED:
      return initialState;
    case FETCH_SPACE_USAGE_SUCCEEDED:
      return { ...state, spaceUsage: action.spaceUsage };
    case FETCH_SPACE_USAGE_FAILED:
      return { ...state, spaceUsage: { used: 0, allocated: 0 } };
    default:
      return state;
  }
}
