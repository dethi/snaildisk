import React from 'react';
import { Redirect } from 'react-router-dom';

import { parse as parseQueryString } from 'query-string';

export default function Auth({ location }) {
  return <Redirect to="/" />;
}
