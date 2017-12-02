import React, { Component } from 'react';

import classNames from 'classnames';

export default class AnalyseButton extends Component {
  state = {
    isLoading: false
  };

  handleAnalyse = () => {
    this.setState({ isLoading: true });
  };

  handleCancel = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const analyseBtnClass = classNames('button', 'is-primary', {
      'is-loading': isLoading
    });

    return (
      <div className="level-left">
        <div className="level-item">
          <div className="field is-grouped">
            <div className="control">
              <button className={analyseBtnClass} onClick={this.handleAnalyse}>
                <span className="icon">
                  <i className="fa fa-bolt" />
                </span>
                <span>Analyse</span>
              </button>
            </div>

            <div className="control">
              <button
                className="button is-danger"
                onClick={this.handleCancel}
                disabled={!isLoading}
              >
                <span className="icon">
                  <i className="fa fa-ban" />
                </span>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
