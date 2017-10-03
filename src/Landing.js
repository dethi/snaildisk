import React from 'react';

import LoginButton from './components/LoginButton';

import brandIcon from './assets/brand-icon.png';

export default function Landing() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <img src={brandIcon} alt="SnailDisk Logo" />

          <div>
            <h1 className="title is-1">SnailDisk</h1>
            <h2 className="subtitle is-3">DaisyDisk like for Dropbox</h2>
          </div>

          <div className="section">
            <LoginButton />
          </div>
        </div>
      </div>
    </section>
  );
}
