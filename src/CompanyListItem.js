import React, { Component } from 'react';

let imgDefault = "https://static.licdn.com/sc/p/com.linkedin.organization-guest-frontend%3Aorganization-guest-frontend-static-content%2B0.1.345/f/%2Forganization-guest-frontend%2Fimages%2Foverview%2Fcompany-logo-ghost.png";

export default class CompanyListItem extends Component {
  render() {
    const { description, handle, logo_url, name } = this.props;
    return (

        <li className="card mb-3" style={{ maxWidth: "80%" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={logo_url ? logo_url : imgDefault} className="card-img" alt={handle} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </div>
        </li>

    )
  }
}
