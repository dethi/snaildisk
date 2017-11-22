import React from 'react';

import api from '../api';

export default function LoginButton() {
  const authUrl = api.getAuthenticationUrl();

  return (
    <a className="button is-outlined is-info is-large" href={authUrl}>
      <span className="icon is-medium">
        <i className="fa fa-dropbox" />
      </span>
      <span>Login with Dropbox</span>
    </a>
  );
}
