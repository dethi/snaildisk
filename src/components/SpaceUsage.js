import React from 'react';
import { connect } from 'react-redux';

import { humanizeSize } from '../filters';

function mapStateToProps(state) {
  const account = state.account;

  return {
    usedSize: account.spaceUsage.used,
    allocatedSize: account.spaceUsage.allocated
  };
}

function SpaceUsageView({ usedSize, allocatedSize }) {
  const spaceUsage = Math.round(usedSize / allocatedSize * 100) || 0;

  return (
    <div>
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

const SpaceUsage = connect(mapStateToProps)(SpaceUsageView);

export default SpaceUsage;
