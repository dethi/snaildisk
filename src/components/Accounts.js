import React from 'react';
import { connect } from 'react-redux';

import { humanizeSize } from '../filters';

function mapStateToProps(state) {
  const account = state.account;

  return {
    firstname: account.firstname,
    usedSize: account.spaceUsage.used,
    allocatedSize: account.spaceUsage.allocated
  };
}

function AccountView({ firstname, usedSize, allocatedSize }) {
  const spaceUsage = Math.round(usedSize / allocatedSize * 100);

  return (
    <div>
      <p className="title is-3">
        <span>Welcome {firstname}</span>
        <span className="icon" style={{ paddingLeft: '15px' }}>
          <i className="fa fa-hand-peace-o" />
        </span>
      </p>

      <hr />

      <nav className="level">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Used Space</p>
            <p className="title">{humanizeSize(usedSize)}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Allocated Space</p>
            <p className="title">{humanizeSize(allocatedSize)}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Usage</p>
            <p className="title">{spaceUsage} %</p>
          </div>
        </div>
      </nav>

      <hr />
    </div>
  );
}

const Account = connect(mapStateToProps)(AccountView);

export default Account;
