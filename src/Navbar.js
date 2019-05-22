import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <span className="navbar-brand text-light">Jobly</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <span className="nav-link text-light">Home</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-light">Jobs</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-light">Companies</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-light">Profile</span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
