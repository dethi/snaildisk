import React from 'react';

export default function LoginButton() {
  return (
    <a className="button is-outlined is-info is-large">
      <span className="icon is-medium">
        <i className="fa fa-dropbox" />
      </span>
      <span>Login with Dropbox</span>
    </a>
  );
}
