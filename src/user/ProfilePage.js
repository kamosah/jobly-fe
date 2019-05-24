import React, { Component } from 'react';
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
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      photo_url: "",
      editing: false,
      isError: false,
      error: {}
    }
  }

  /** */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let username = localStorage.getItem('username');
      let { user } = await JoblyApi.request(`users/${username}`, {}, 'get');
      const { first_name, last_name, email, photo_url } = user;
      this.setState({ username, first_name, last_name, email, photo_url });
    } catch (e) {
      console.error(e.message);
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
          <button className="btn btn-primary btn-sm mb-2" onClick={this.editProfile}>Edit Info</button>
        </div>
      </div>
    );
  }

  /** */
  renderEditForm() {
    const { first_name, last_name, email, photo_url } = this.state;
    return (
      <div>
        <h2 className="mt-4 mb-3 text-center">Edit Info</h2>
        <form onSubmit={this.updateProfile} className="edit-user-form mb-5 mx-auto">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              className="form-control"
              id="first_name"
              type="text"
              onChange={this.handleChange}
              name="first_name"
              value={first_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="form-control"
              id="last_name"
              type="text"
              onChange={this.handleChange}
              name="last_name"
              value={last_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              type="text"
              onChange={this.handleChange}
              name="email"
              value={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="photo_url">Photo URL</label>
            <input
              className="form-control"
              id="photo_url"
              type="text"
              onChange={this.handleChange}
              name="photo_url"
              value={photo_url}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary mt-1 mb-1 mx-auto">Update</button>
            <br />
            <span className="btn btn-secondary btn-sm mt-3" onClick={this.editProfile}>Cancel</span>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        {this.state.editing ? this.renderEditForm() : this.renderProfileContent()}
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
