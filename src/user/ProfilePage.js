import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JoblyApi from '../helpers/joblyApi';
import JobsList from '../job/JobsList';
import Spinner from '../misc/Spinner';
import userImg from '../img/user.png';
import "./ProfilePage.css";
import UserContext from './UserContext';

/**
 * displays user information
 * username, avatar, name, email, jobs applied to
 */
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loaded: false,
      isError: false,
      error: {}
    }
  }

  async componentDidMount() {
    this.context();
    try {
      let username = localStorage.getItem('username');
      if (!username) this.props.history.push('/login');
      let { user } = await JoblyApi.request(`users/${username}`, {}, 'get');
      let { jobs } = await JoblyApi.request(`jobs/${username}`, {}, "get");
      const { first_name, last_name, email, photo_url } = user;
      this.setState({ username, first_name, last_name, email, photo_url, jobs, loaded: true });
    } catch (e) {
      console.error(e);
    }
  }

  // if user has no image, render default image
  defaultImgOnErr = (e) => {
    e.target.src = userImg;
  }

  updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { first_name, last_name, email, photo_url } = this.state;
      let username = localStorage.getItem('username');
      await JoblyApi.request(`users/${username}`, { first_name, last_name, email, photo_url }, 'patch');
      this.setState({ editing: false });
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  editProfile = () => {
    this.setState({ editing: !this.state.editing });
  }

  renderProfileContent() {
    const { username, first_name, last_name, email, photo_url, jobs } = this.state;
    return (
      <div>
        <div className="user-jumbo jumbotron mt-5 mx-auto p-4 text-center">
          <h2 className="mb-3">{username}</h2>
          <img
            className="user-img"
            src={photo_url ? photo_url : userImg}
            alt={first_name}
            onError={this.defaultImgOnErr}
          />
          <hr className="my-4" />
          <div className="user-info">{`${first_name} ${last_name}`}</div>
          <div className="user-info mb-4">{email}</div>
          <Link to='/edit/Profile' className="btn btn-primary btn-sm mb-2" >Edit Info</Link>
        </div>
        { jobs.length ? (
          <JobsList jobs={this.state.jobs} />
        ) : null }
      </div>
    );
  }
 
  render() {
    return (
      <div className="text-center">
        {this.state.loaded ? this.renderProfileContent() : <div className="mt-5"><Spinner /></div>}
      </div>
    );
  }
}

ProfilePage.contextType = UserContext;

ProfilePage.defaultProps = {
  history: { push: () => null },
  location: {},
  match: {}
}

ProfilePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
}

export default ProfilePage;
