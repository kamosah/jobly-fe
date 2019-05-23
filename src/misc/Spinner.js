import React, { Component } from 'react';

export default class Spinner extends Component {
  render() {
    const spinnerStyles = {
      marginTop: "50px",
      fontSize: "6rem",
      color: "#333a3f"
    }
    return (
      <div>
        <i className="fas fa-spinner fa-spin" style={spinnerStyles}></i>
      </div>
    );
  }
}
