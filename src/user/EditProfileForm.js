
import React, { Component } from 'react'

export default class EditProfileForm extends Component {
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
      this.props.history.push('/login');
    }
  }
  
  render() {
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
}


renderEditForm() {
  
  
}