import React from 'react';

import { pluralize } from '../filters';

export default function Stats() {
  const nbFiles = 103500;
  const nbFolders = 1;

  return (
    <div className="level-right">
      <div className="level-item">
        <p className="subtitle is-5">
          <strong>{nbFiles}</strong> file{pluralize(nbFiles)}
        </p>
      </div>
      <div className="level-item">
        <p className="subtitle is-5">
          <strong>{nbFolders}</strong> folder{pluralize(nbFolders)}
        </p>
      </div>
    </div>
  );
}
