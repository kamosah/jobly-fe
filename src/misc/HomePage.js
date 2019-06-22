import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HomePage.css';
import UserContext from '../user/UserContext';

/**
 * 
 */
class HomePage extends Component {

  /** */
  async componentDidMount() {
    await this.context();
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

HomePage.contextType = UserContext;

HomePage.defaultProps = {
  bgImgUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  logoUrl: "https://res.cloudinary.com/dxklaorw6/image/upload/v1558661557/jobly.png"
}

HomePage.propTypes = {
  bgImgUrl: PropTypes.string,
  logoUrl: PropTypes.string
}

export default HomePage;
