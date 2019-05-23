import React, { Component } from 'react';
import JoblyApi from '../helpers/joblyApi';
import Alert from '../misc/Alert';

let imgDefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS32fZtSx6C6gMJGp95NN5O09FtFIphVAeAVg11q8yD33TWA9Fu";

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

  defaultImgOnErr(e) {
    e.target.src = imgDefault;
  }

  updateProfile = async (e) => {
    e.preventDefault();
    try {
      const { first_name, last_name, email, photo_url } = this.state;
      let username = localStorage.getItem('username');
      await JoblyApi.request(`users/${username}`, { first_name, last_name, email, photo_url }, 'patch');
      this.setState({editing: false});
    } catch (e) {
      this.setState({ isError: true, error: e });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  editProfile = () => {
    this.setState({editing: !this.state.editing});
  }

  render() {
    const { username, first_name, last_name, email, photo_url } = this.state;
    let profileContent = (
      <div>
        <div className="jumbotron mt-5 mx-auto p-4 text-center" style={{ maxWidth: "900px" }}>
          <h2 className="mb-4">{username}</h2>
          <img
            src={photo_url ? photo_url : imgDefault}
            alt={first_name}
            onError={this.defaultImgOnErr}
          />
          <hr className="my-4" />
          <p>{`${first_name} ${last_name}`}</p>
          <p>{email}</p>
          <button className="btn btn-primary btn-sm mt-2" onClick={this.editProfile}>Edit Info</button>
        </div>
      </div>
    );
    let editForm = (
      <div>
        <h1 className="m-4 text-center">Edit Info</h1>
        <form onSubmit={this.updateProfile} className="mb-5 mx-auto" style={{ maxWidth: "480px" }}>
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
            <button className="btn btn-primary">Update</button>
            <br/>
            <span className="btn btn-primary btn-sm mt-2" onClick={this.editProfile}>Cancel</span>
          </div>
        </form>
      </div>

    );
    return (
      <div>
        {this.state.isError ? <Alert error={this.state.error} /> : null}
        {this.state.editing ? editForm : profileContent}
      </div>
    );
      
  }
}

