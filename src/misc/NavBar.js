import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
          <NavLink exact to="/" className="navbar-brand text-light">Jobly</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink exact to="/jobs" className="nav-link text-light">Jobs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/companies" className="nav-link text-light">Companies</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact to="/login" className="nav-link text-light">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/register" className="nav-link text-light">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/profile" className="nav-link text-light">Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/logout" className="nav-link text-light">Logout</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
