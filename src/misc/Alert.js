import React, { Component } from 'react';

export default class Alert extends Component {
  render() {
    return (
      <div className="card mb-4 mx-auto" style={{width: "400px"}}>
        <div className="card-body">
          {this.props.error}
        </div>
      </div>
    );
  }
}