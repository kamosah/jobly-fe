import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JoblyApi from '../helpers/joblyApi';
import JobsList from '../job/JobsList';
import Spinner from '../misc/Spinner';
import Alert from '../misc/Alert';
import "./ProfilePage.css";

/**
 * *** ProfilePage.js ***
 * - displays information for specified user and jobs they've applied to
 */
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      photo_url: "",
      jobs: [],
      loaded: false,
      isError: false,
      error: null
    }
  }

  /** when component mounts, query db to get user info and jobs applied to */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let username = localStorage.getItem('username');
      if (!username) this.props.history.push('/login');
      let { user } = await JoblyApi.request(`users/${username}`, {}, 'get');
      let { jobs } = await JoblyApi.request(`jobs/${username}`, {}, "get");
      const { first_name, last_name, email, photo_url } = user;
      this.setState({ username, first_name, last_name, email, photo_url, jobs, loaded: true });
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e, loaded: true });
    }
  }

  /** if user has no image, render default image */
  defaultImgOnErr(e) {
    e.target.src = this.props.imgDefault;
  }

  /** render profile content */
  renderProfileContent() {
    const { username, first_name, last_name, email, photo_url } = this.state;
    return (
      <div>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        {username ? (
          <div>
            <div className="user-jumbo jumbotron mt-5 mx-auto p-4 text-center">
              <h2 className="mb-3">{username}</h2>
              <img
                className="user-img"
                src={photo_url ? photo_url : this.props.imgDefault}
                alt={first_name}
                onError={this.defaultImgOnErr}
              />
              <hr className="my-4" />
              <div className="user-info">{`${first_name} ${last_name}`}</div>
              <div className="user-info mb-4">{email}</div>
              <Link to='/edit/Profile' className="btn btn-primary btn-sm mb-2" >Edit Info</Link>
            </div>
            <JobsList jobs={this.state.jobs} ensureLoggedIn={this.props.ensureLoggedIn}/>
          </div>
        ) : null}
      </div>
    );
  }
 
  render() {
    return (
      <div className="text-center" data-testid="profile-page-container">
        {this.state.loaded ? this.renderProfileContent() : <div className="mt-5"><Spinner /></div>}
      </div>
    );
  }
}

ProfilePage.defaultProps = {
  ensureLoggedIn: () => null,
  history: { push: () => null },
  location: {},
  match: {},
  imgDefault: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32fZtSx6C6gMJGp95NN5O09FtFIphVAeAVg11q8yD33TWA9Fu"

}

ProfilePage.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  imgDefault: PropTypes.string
}

export default ProfilePage;
