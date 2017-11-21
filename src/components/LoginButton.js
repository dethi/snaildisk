import React from 'react';

import Dropbox from 'dropbox';

export default function LoginButton() {
  const clientId = process.env.REACT_APP_DROPBOX_CLIENT_ID;
  const loginUrl = process.env.REACT_APP_DROPBOX_REDIRECT_URL;

  const dropbox = new Dropbox({ clientId });
  const authUrl = dropbox.getAuthenticationUrl(loginUrl);

  return (
    <a className="button is-outlined is-info is-large" href={authUrl}>
      <span className="icon is-medium">
        <i className="fa fa-dropbox" />
      </span>
      <span>Login with Dropbox</span>
    </a>
  );
}
