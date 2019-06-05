import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HomePage.css';

/**
 * *** HomePage.js ***
 * - main landing page for application
 * - if not logged in, shows login and register buttons
 * - if logged in, welcomes user back and shows button for jobs list
 */
class HomePage extends Component {
  
  /** if user is not logged in, removes any user data from local storage */
  componentDidMount() {
    this.props.ensureLoggedIn();
  }

  render() {
    return (
      <div className="home d-flex justify-content-center align-items-center">
        <img
          className="bg"
          src={this.props.bgImgUrl}
          alt="background"
        />
        <div className="home-content text-center mx-auto">
          <img
            className="logo mx-auto"
            src={this.props.logoUrl}
            alt="jobly-logo"
          />
          <p className="slogan mt-1">All the jobs in one, convenient place.</p>
          {!localStorage.getItem('token') ? (
            <div className="mt-4 mb-4">
              <Link to={`/login`}>
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link to={`/register`}>
                <button className="btn btn-primary ml-3">Register</button>
              </Link>
            </div>
          ) : (
              <div className="mb-4">
                <p className="welcome-back m-0">Welcome back!</p>
                <br />
                <Link to={`/jobs`}>
                  <button className="btn btn-primary">Jobs</button>
                </Link>
              </div>
            )}
        </div>
      </div>
    );
  }
}

HomePage.defaultProps = {
  bgImgUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  logoUrl: "https://res.cloudinary.com/dxklaorw6/image/upload/v1558661557/jobly.png"
}

HomePage.propTypes = {
  ensureLoggedIn: PropTypes.func,
  bgImgUrl: PropTypes.string,
  logoUrl: PropTypes.string
}

export default HomePage;
