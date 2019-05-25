import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

/**
 * 
 */
class Alert extends Component {
  render() {
    return (
      <div className="alert-card card mb-4 mx-auto">
        <div className="card-body">
          {this.props.error}
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  error: PropTypes.array
}

export default Alert;
