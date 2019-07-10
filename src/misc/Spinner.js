import React, { Component } from 'react';
import "./Spinner.css"

/**
 * simple loading spinner component
 */
class Spinner extends Component {
  render() {
    return (
      <div>
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }
}

export default Spinner;
