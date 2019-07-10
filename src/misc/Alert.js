import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

/**
 * displays alert card with error message passed as prop
 */
class Alert extends Component {
  render() {
    return (
      <div className="alert-card card mb-4 mx-auto bg-warning">
        <div className="card-body">
          {this.props.error}
        </div>
      </div>
    );
  }
}

Alert.defaultProps = {
  error: { data: "error" }
}

Alert.propTypes = {
  error: PropTypes.object
}

export default Alert;
