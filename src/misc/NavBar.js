import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import navLogo from '../img/joblyicon.png';
import './NavBar.css';

/**
 * if user is logged in: shows jobs, companies, profile, and logout links
 * if user is not logged in: shows login and register links
 */
class NavBar extends Component {

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.props.history.push('/');
  }

  render() {
    // to display while user is logged in
    let loggedInNav = (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <NavLink exact to="/" className="navbar-brand">
              <img
                className="nav-logo"
                src={navLogo}
                alt="jobly-logo-sm"
              />
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink exact to="/jobs" activeClassName="active-nav" className="nav-link">Jobs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/companies" activeClassName="active-nav" className="nav-link">Companies</NavLink>
                </li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact to="/profile" activeClassName="active-nav" className="nav-link">Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/" onClick={this.handleLogout} className="nav-link">Logout</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
    // to display while no user is logged in
    let loggedOutNav = (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <NavLink exact to="/" className="navbar-brand">
              <img
                className="nav-logo"
                src={navLogo}
                alt="jobly-logo-sm"
              />
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li></li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact to="/login" activeClassName="active-nav" className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/register" activeClassName="active-nav" className="nav-link">Register</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
    return this.props.loggedIn ? loggedInNav : loggedOutNav;
  }
}

NavBar.defaultProps = {
  loggedIn: false
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool
}

export default withRouter(NavBar);
