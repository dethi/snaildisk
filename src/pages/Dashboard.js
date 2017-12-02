import React from 'react';

import Accounts from '../components/Accounts';
import AnalyseButton from '../components/AnalyseButton';
import Stats from '../components/Stats';

function Dashboard() {
  return (
    <section className="section">
      <div className="container">
        <Accounts />

        <nav className="level">
          <AnalyseButton />
          <Stats />
        </nav>
      </div>
    </section>
  );
}

export default Dashboard;
