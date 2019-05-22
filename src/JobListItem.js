import React, { Component } from 'react';

export default class JobListItem extends Component {
  render() {
    const { title, salary, equity } = this.props;
    return (

        <li className="card mb-3" style={{ maxWidth: "80%" }}>
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Salary: {salary}</p>
                <p className="card-text">Equity: {equity}</p>
              </div>
            </div>
          </div>
        </li>

    )
  }
}
