import React, { Component } from 'react';
import JobsList from '../job/JobsList';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import JoblyApi from '../helpers/joblyApi';
import Alert from '../misc/Alert';
import "./ProfilePage.css";


let imgDefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32fZtSx6C6gMJGp95NN5O09FtFIphVAeAVg11q8yD33TWA9Fu";

/**
 * 
 */
export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      isError: false,
      job: [],
      error: {}
    }
  }

  /** */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let username = localStorage.getItem('username');
      let { user } = await JoblyApi.request(`users/${username}`, {}, 'get');
      let { jobs } = await JoblyApi.request(`jobs/${username}`, {}, "get");
      const { first_name, last_name, email, photo_url } = user;
      this.setState({ username, first_name, last_name, email, photo_url, jobs });
    } catch (e) {
      console.error(e.message);
      this.props.history.push('/login');
    }
  }

  /** */
  defaultImgOnErr(e) {
    e.target.src = imgDefault;
  }

  /** */
  updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { first_name, last_name, email, photo_url } = this.state;
      let username = localStorage.getItem('username');
      await JoblyApi.request(`users/${username}`, { first_name, last_name, email, photo_url }, 'patch');
      this.setState({ editing: false });
    } catch (e) {
      this.setState({ isError: true, error: e });
    }
  }

  /** */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  /** */
  editProfile = () => {
    this.setState({ editing: !this.state.editing });
  }

  /** */
  renderProfileContent() {
    const { username, first_name, last_name, email, photo_url } = this.state;
    return (
      <div>
        <div className="user-jumbo jumbotron mt-5 mx-auto p-4 text-center">
          <h2 className="mb-3">{username}</h2>
          <img
            className="user-img"
            src={photo_url ? photo_url : imgDefault}
            alt={first_name}
            onError={this.defaultImgOnErr}
          />
          <hr className="my-4" />
          <div className="user-info">{`${first_name} ${last_name}`}</div>
          <div className="user-info mb-4">{email}</div>
          <Link to='/edit/Profile' className="btn btn-primary btn-sm mb-2" >Edit Info</Link>
        </div>
      </div>
    );
  }
 

  render() {
    return (
      <div className="text-center mt-3">
        <h1>User Job List</h1>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        {this.renderProfileContent()}
        <JobsList jobs={this.state.jobs} ensureLoggedIn={this.props.ensureLoggedIn}/>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  ensureLoggedIn: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object
}
