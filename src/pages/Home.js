import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import Landing from './Landing';

function mapStateToProps(state) {
  return {
    isLogged: state.auth.isLogged
  };
}

function HomeView({ isLogged }) {
  return isLogged ? <Dashboard /> : <Landing />;
}

const Home = connect(mapStateToProps)(HomeView);

export default Home;
