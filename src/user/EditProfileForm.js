import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from '../helpers/joblyApi';
import Alert from '../misc/Alert';

/**
 * *** EditProfileForm.js ***
 * - form allowing user to update their information
 */
class EditProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      photo_url: "",
      isError: false,
      error: null
    }
  }
  /** when component mounts, query db to get user info */
  async componentDidMount() {
    this.props.ensureLoggedIn();
    try {
      let username = localStorage.getItem('username');
      let { user } = await JoblyApi.request(`users/${username}`, {}, 'get');
      const { first_name, last_name, email, photo_url } = user;
      this.setState({ username, first_name, last_name, email, photo_url });
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
  }

  /** logic to be run on form submit */
  updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { first_name, last_name, email, photo_url } = this.state;
      let username = localStorage.getItem('username');
      await JoblyApi.request(`users/${username}`, { first_name, last_name, email, photo_url }, 'patch');
      this.setState({ editing: false });
      this.props.history.push('/profile');
    } catch (e) {
      console.error(e);
      this.setState({ isError: true, error: e });
    }
  }

  /** form state change logic */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    const { first_name, last_name, email, photo_url } = this.state;
    return (
      <div>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        <h2 className="mb-3 text-center">Edit Info</h2>
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
            <Link className="btn btn-secondary btn-sm mt-3" to="/profile">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default EditProfileForm;
