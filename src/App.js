import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Auth from './pages/Auth';

const Home = ({ isLogged }) => (
  <div>{isLogged ? <Dashboard /> : <Landing />}</div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/auth" component={Auth} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
