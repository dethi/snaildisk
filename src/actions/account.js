import { makeActionCreator } from './helper';

export const FETCH_ACCOUNT_REQUESTED = 'account:fetch_account_requested';
export const FETCH_ACCOUNT_SUCCEEDED = 'account:fetch_account_succeeded';
export const FETCH_ACCOUNT_FAILED = 'account:fetch_account_failed';

export const FETCH_SPACE_USAGE_REQUESTED =
  'account:fetch_space_usage_requested';
export const FETCH_SPACE_USAGE_SUCCEEDED =
  'account:fetch_space_usage_succeeded';
export const FETCH_SPACE_USAGE_FAILED = 'account:fetch_space_usage_failed';

export const fetchAccount = makeActionCreator(FETCH_ACCOUNT_REQUESTED);
export const fetchAccountSucceeded = makeActionCreator(
  FETCH_ACCOUNT_SUCCEEDED,
  'account'
);
export const fetchAccountFailed = makeActionCreator(
  FETCH_ACCOUNT_FAILED,
  'error'
);

export const fetchSpaceUsage = makeActionCreator(FETCH_SPACE_USAGE_REQUESTED);
export const fetchSpaceUsageSucceeded = makeActionCreator(
  FETCH_SPACE_USAGE_SUCCEEDED,
  'spaceUsage'
);
export const fetchSpaceUsageFailed = makeActionCreator(
  FETCH_SPACE_USAGE_FAILED,
  'error'
);
