import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    firstname: state.account.firstname
  };
}

function WelcomeView({ firstname }) {
  return (
    <p className="title is-3">
      <span>Welcome {firstname}</span>
      <span className="icon" style={{ paddingLeft: '15px' }}>
        <i className="fa fa-hand-peace-o" />
      </span>
    </p>
  );
}

const Welcome = connect(mapStateToProps)(WelcomeView);

export default Welcome;
